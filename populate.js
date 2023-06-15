
const populateMyHistory = async () => {
    try {
        const user = await User.findById('6422a3be8c199c1e7ed94854')
        if (!user) {
            res.status(404).json({ message: "User not found!" })
        }

        const customPortfolio = [
            {
                time: new Date("11/1/2019"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 112
                    }
                ]
            },
            {
                time: new Date("11/15/2019"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 105,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 112
                    },
                ]
            },
            {
                time: new Date("11/21/2019"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 105,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 78
                    },
                ]
            },
            {
                time: new Date("12/1/2019"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 105,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 23
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 8
                    },
                ]
            },
            {
                time: new Date("12/4/2019"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 205,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 23
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 65
                    },
                ]
            },
            {
                time: new Date("1/1/2020"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 255,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 23
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 141
                    },
                ]
            },
            {
                time: new Date("2/1/2020"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 255,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 135
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 192
                    },
                ]
            },
            {
                time: new Date("3/1/2020"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 255,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 247
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 90
                    },
                ]
            },
            {
                time: new Date("4/1/2020"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 255,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 246
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 112
                    },
                ]
            },
            {
                time: new Date("4/1/2020"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 255,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 246
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 112
                    },
                ]
            },
            {
                time: new Date("5/1/2020"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 555,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 360
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 93
                    },
                ]
            },
            {
                time: new Date("6/1/2020"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 555,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 360
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 70
                    },
                ]
            },
            {
                time: new Date("8/1/2020"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 555,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 360
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 150
                    },
                ]
            },
            {
                time: new Date("10/1/2020"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 755,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 460
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 150
                    },
                ]
            },
            {
                time: new Date("11/1/2020"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 755,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 460
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 44
                    },
                ]
            },
            {
                time: new Date("12/1/2020"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 1000,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 630
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 135
                    },
                ]
            },
            {
                time: new Date("1/1/2021"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 1000,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 630
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 142
                    },
                ]
            },
            {
                time: new Date("2/1/2021"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 1100,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 685
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 111
                    },
                ]
            },
            {
                time: new Date("2/1/2021"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 1100,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 685
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 111
                    },
                ]
            },
            {
                time: new Date("3/1/2021"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 155,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 910
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 252
                    },
                ]
            },
            {
                time: new Date("4/1/2021"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 155,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 910
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 190
                    },
                ]
            },
            {
                time: new Date("4/15/2021"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 155,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 910
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 365
                    },
                ]
            },
            {
                time: new Date("5/1/2021"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 755,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 1214
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 476
                    },
                ]
            },
            {
                time: new Date("6/1/2021"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 800,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 1214
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 487
                    },
                ]
            },
            {
                time: new Date("7/1/2021"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 900,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 1270
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 416
                    },
                ]
            },
            {
                time: new Date("8/1/2021"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 1000,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 1327
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 63
                    },
                ]
            },
            {
                time: new Date("8/15/2021"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 1000,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 1551
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 122
                    },
                ]
            },
            {
                time: new Date("9/1/2021"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 1000,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 1731
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 170
                    },
                    {
                        id: uuidv4(),
                        name: "Crypto",
                        quantity: 1,
                        price: 110
                    },
                ]
            },
            {
                time: new Date("10/1/2021"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 300,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 2050
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 130
                    },
                    {
                        id: uuidv4(),
                        name: "Crypto",
                        quantity: 1,
                        price: 671
                    },
                ]
            },
            {
                time: new Date("11/1/2021"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 300,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 2050
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 100
                    },
                    {
                        id: uuidv4(),
                        name: "Crypto",
                        quantity: 1,
                        price: 880
                    },
                ]
            },
            {
                time: new Date("12/1/2021"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 300,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 711
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 75
                    },
                    {
                        id: uuidv4(),
                        name: "Crypto",
                        quantity: 1,
                        price: 1030
                    },
                ]
            },
            {
                time: new Date("12/15/2021"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 200,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 110
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 75
                    },
                    {
                        id: uuidv4(),
                        name: "Crypto",
                        quantity: 1,
                        price: 844
                    },
                ]
            },
            {
                time: new Date("12/21/2021"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 400,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 305
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 200
                    },
                    {
                        id: uuidv4(),
                        name: "Crypto",
                        quantity: 1,
                        price: 1202
                    },
                ]
            },
            {
                time: new Date("2/1/2022"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 400,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 416
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 70
                    },
                    {
                        id: uuidv4(),
                        name: "Crypto",
                        quantity: 1,
                        price: 1121
                    },
                ]
            },
            {
                time: new Date("3/20/2022"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 900,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 11
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 50
                    },
                    {
                        id: uuidv4(),
                        name: "Crypto",
                        quantity: 1,
                        price: 1740
                    },
                    {
                        id: uuidv4(),
                        name: "British Pound",
                        quantity: 1,
                        price: 131
                    },
                ]
            },
            {
                time: new Date("4/5/2022"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 900,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 11
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 40
                    },
                    {
                        id: uuidv4(),
                        name: "Crypto",
                        quantity: 1,
                        price: 2293
                    },
                    {
                        id: uuidv4(),
                        name: "British Pound",
                        quantity: 1,
                        price: 131
                    },
                ]
            },
            {
                time: new Date("5/11/2022"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 800,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 63
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 20
                    },
                    {
                        id: uuidv4(),
                        name: "Crypto",
                        quantity: 1,
                        price: 1070
                    },
                    {
                        id: uuidv4(),
                        name: "British Pound",
                        quantity: 1,
                        price: 125
                    },
                ]
            },
            {
                time: new Date("7/1/2022"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 900,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 63
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 164
                    },
                    {
                        id: uuidv4(),
                        name: "Crypto",
                        quantity: 1,
                        price: 960
                    },
                    {
                        id: uuidv4(),
                        name: "British Pound",
                        quantity: 1,
                        price: 120
                    },
                ]
            },
            {
                time: new Date("8/1/2022"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 900,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 63
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Crypto",
                        quantity: 1,
                        price: 1013
                    },
                    {
                        id: uuidv4(),
                        name: "British Pound",
                        quantity: 1,
                        price: 121
                    },
                ]
            },
            {
                time: new Date("9/1/2022"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 1904,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 70
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 1079
                    },
                    {
                        id: uuidv4(),
                        name: "Crypto",
                        quantity: 1,
                        price: 800
                    },
                    {
                        id: uuidv4(),
                        name: "British Pound",
                        quantity: 1,
                        price: 112
                    },
                ]
            },
            {
                time: new Date("10/1/2022"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 1904,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 70
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 1278
                    },
                    {
                        id: uuidv4(),
                        name: "Crypto",
                        quantity: 1,
                        price: 893
                    },
                    {
                        id: uuidv4(),
                        name: "British Pound",
                        quantity: 1,
                        price: 116
                    },
                ]
            },
            {
                time: new Date("1/1/2023"),
                assets: [
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: 1904,
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Euro",
                        quantity: 1,
                        price: 224
                    },
                    {
                        id: uuidv4(),
                        name: "Hryvnia",
                        quantity: 1,
                        price: 1640
                    },
                    {
                        id: uuidv4(),
                        name: "Crypto",
                        quantity: 1,
                        price: 804
                    },
                    {
                        id: uuidv4(),
                        name: "British Pound",
                        quantity: 1,
                        price: 120
                    },
                ]
            },
        ];

        user.portfolio = customPortfolio

        user.markModified('portfolio')
        await user.save()
    } catch (error) {
        console.log(error)
    }
}


// populateMyHistory()

