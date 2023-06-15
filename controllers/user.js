import User from '../models/User.js'
import { v4 as uuidv4 } from 'uuid'

function toMMYY(datetimeString) {
    const datetime = new Date(datetimeString);
    const month = datetime.getMonth() + 1;
    const year = datetime.getFullYear() % 100;
    return `${month < 10 ? '0' + month : month}/${year}`;
}

function sortDataByQuantityPrice(data) {
    data.sort((a, b) => b.quantity * b.price - a.quantity * a.price);
    return data
}


function powerIndex(balance) {

    const tierList = {
        1_000: 125,
        10_000: 250,
        50_000: 333,
        100_000: 500,
        1_000_000: 1_000,
        1_000_000_000: 10_000
    }

    let count = 0
    let tier = 0

    for (let key in tierList) {
        while (tier < key && tier <= balance) {
            tier += tierList[key]
            count += 1
        }
    }
    return count - 1
}


function calculateChangeAndPercentage(value1y, today) {
    let returnable = { change: 'New Account', percentage: 'New Account' }

    if (!value1y || !today) {
        return returnable
    }
    let lastYear = value1y.slice(-13)[0]?.value


    if (lastYear) {
        if (today > lastYear) {
            const difference = today - lastYear
            const percentageChange = (difference / lastYear) * 100;
            returnable = {
                percentage: Math.round(percentageChange * 100) / 100,
                change: difference
            };
        } else {
            const difference = lastYear - today;
            const percentageChange = (difference / lastYear) * 100;
            returnable = {
                percentage: Math.round(percentageChange * 100) / 100 * -1,
                change: difference * -1
            };
        }
    }
    return returnable

}


export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id)
        if (!user) {
            res.status(404).json({ message: 'User not found!' })
        } else {
            res.status(200).json(user)
        }
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
export const getUserPortfolio = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id)
        if (!user) {
            res.status(404).json({ message: 'User not found!' })
        }
        const assets = user.portfolio
        res.status(200).json(assets)
    } catch (error) {
        res.status(500).json({ message: error })

    }
}

export const getUserChartData = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({ message: "User not found!" });
        }

        const portfolio = user.portfolio
        //LineChart
        let chartData = []
        let sum = 0
        for (let report of portfolio) {
            let assets = report.assets
            for (let asset of assets) {
                sum += asset.quantity * asset.price
            }

            if (chartData.length > 0) {
                let chartDataLastReport = chartData[chartData.length - 1]
                let lastReportTime = new Date(chartDataLastReport["name"])
                let reportTime = new Date(report.time)
                if (lastReportTime.getMonth() === reportTime.getMonth()) {
                    chartData.pop()
                }
            }
            chartData.push({ name: report.time, value: Math.round(sum) })
            sum = 0
        }

        const refactored = []
        for (let row of chartData) {
            refactored.push({ name: toMMYY(row.name), value: row.value })
        }

        //Stacked Area Chart
        const stackedAreaChart = []
        let assets, obj;
        for (let report of portfolio) {
            obj = { name: toMMYY(report.time) }
            assets = report.assets
            for (let asset of assets) {
                obj[asset.name] = asset.quantity * asset.price
            }
            stackedAreaChart.push(obj)
        }


        //Pie Chart
        let lastReport = portfolio.pop().assets
        sum = 0
        const pieData = []
        for (let asset of lastReport) {
            sum += asset.quantity * asset.price
        }
        for (let asset of lastReport) {
            pieData.push({ name: asset.name, value: asset.quantity * asset.price, sum: sum })
        }
        pieData.sort((a, b) => b.value - a.value)

        //All Assets
        const allAssets = [];
        lastReport = sortDataByQuantityPrice(lastReport)
        for (let asset of lastReport) {
            allAssets.push(asset.name)
        }


        res.status(200).json({ user: user, areaChart: refactored, pieChart: pieData, portfolio: user.portfolio, stackedAreaChart, allAssets })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const postUserPortfolioReport = async (req, res) => {
    try {
        const { report } = req.body
        console.log(req.body)
        const { id } = req.params
        const user = await User.findById(id)
        if (!user) {
            res.status(404).json({ message: "User not found!" })
        }
        let portfolio = [...user.portfolio]
        let lastReportDate = new Date(portfolio.pop().time)
        if (lastReportDate.getMonth() === new Date().getMonth() && lastReportDate.getFullYear() === new Date().getFullYear()) {
            user.portfolio.pop()
        }
        user.portfolio.push({ time: new Date(), assets: report })

        user.markModified('portfolio')
        await user.save()
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export const getUserStats = async (req, res) => {
    try {
        const info = []
        const users = await User.find({})

        for (let user of users) {
            let data = []
            let sum = 0

            for (let report of user.portfolio) {
                let assets = report.assets
                for (let asset of assets) {
                    sum += asset.quantity * asset.price
                }

                if (data.length > 0) {
                    let chartDataLastReport = data[data.length - 1]
                    let lastReportTime = new Date(chartDataLastReport["name"])
                    let reportTime = new Date(report.time)
                    if (lastReportTime.getMonth() === reportTime.getMonth()) {
                        data.pop()
                    }
                }
                data.push({ name: report.time, value: Math.round(sum) })
                sum = 0
            }

            let val = data[data.length - 1].value

            info.push(
                {
                    id: user._id,
                    index: powerIndex(val),
                    firstName: user.firstName,
                    lastName: user.lastName,
                    value: val,
                    picturePath: user.picturePath,
                    change: calculateChangeAndPercentage(data, val).change,
                    percentage: calculateChangeAndPercentage(data, val).percentage,
                }
            )
        }
        info.sort((a, b) => a.value > b.value ? -1 : 1)
        res.status(200).json(info)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
