import jwt from 'jsonwebtoken'
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

// Helper to extract requester id from Authorization header (if present)
function getRequesterIdFromHeader(req) {
    try {
        let token = req.header('Authorization') || '';
        if (!token) return null;
        if (token.startsWith('Bearer ')) token = token.slice(7).trim();
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        return verified?.id || verified?._id || null;
    } catch (err) {
        return null;
    }
}

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ message: 'User not found!' })
        }

        const requesterId = getRequesterIdFromHeader(req)
        const isOwner = requesterId && requesterId.toString() === user._id.toString()

        if (user.isPrivate && !isOwner) {
            const publicProfile = {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                picturePath: user.picturePath,
                createdAt: user.createdAt
            }
            return res.status(200).json(publicProfile)
        }

        return res.status(200).json(user)
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

export const getUserPortfolio = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ message: 'User not found!' })
        }

        const requesterId = getRequesterIdFromHeader(req)
        const isOwner = requesterId && requesterId.toString() === user._id.toString()

        if (user.isPrivate && !isOwner) {
            return res.status(403).json({ message: 'This account is private' })
        }

        const assets = user.portfolio
        return res.status(200).json(assets)
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

export const getUserChartData = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        const requesterId = getRequesterIdFromHeader(req)
        const isOwner = requesterId && requesterId.toString() === user._id.toString()

        if (user.isPrivate && !isOwner) {
            return res.status(403).json({ message: 'This account is private' })
        }

        const portfolio = user.portfolio
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

        let lastReport = portfolio.slice(-1)[0]?.assets || []
        sum = 0
        const pieData = []
        for (let asset of lastReport) {
            sum += asset.quantity * asset.price
        }
        for (let asset of lastReport) {
            pieData.push({ name: asset.name, value: asset.quantity * asset.price, sum: sum })
        }
        pieData.sort((a, b) => b.value - a.value)

        const allAssets = [];
        lastReport = sortDataByQuantityPrice(lastReport)
        for (let asset of lastReport) {
            allAssets.push(asset.name)
        }

        return res.status(200).json({ user: user, areaChart: refactored, pieChart: pieData, portfolio: user.portfolio, stackedAreaChart, allAssets })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const postUserPortfolioReport = async (req, res) => {
    try {
        const { report } = req.body
        const { id } = req.params
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ message: "User not found!" })
        }
        let portfolio = [...user.portfolio]
        let lastReportDate = new Date(portfolio.pop().time)
        if (lastReportDate.getMonth() === new Date().getMonth() && lastReportDate.getFullYear() === new Date().getFullYear()) {
            user.portfolio.pop()
        }
        user.portfolio.push({ time: new Date(), assets: report })

        user.markModified('portfolio')
        await user.save()
        return res.status(200).json({ user })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getUserStats = async (req, res) => {
    try {
        const info = []
        const requesterId = getRequesterIdFromHeader(req)
        const users = await User.find({})

        for (let user of users) {
            if (user.isPrivate && (!requesterId || requesterId.toString() !== user._id.toString())) {
                continue
            }

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

            if (data.length === 0) continue;

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
        return res.status(200).json(info)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
