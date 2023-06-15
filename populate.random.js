function getRandomNumber(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

const populateMyHistory = async (id) => {
    try {
        const user = await User.findById(id)
        if (!user) {
            return 0
        }

        const customPortfolio = []

        for (let i = 1; i <= 12; i++) {
            customPortfolio.push({
                time: new Date(`${i}/${i}/2022`),
                assets: [
                    {
                        id: uuidv4(),
                        name: "British Pound",
                        quantity: getRandomNumber(100, 1000),
                        price: 1.20
                    },
                    {
                        id: uuidv4(),
                        name: "United States Dollar",
                        quantity: getRandomNumber(300_000_000, 400_000_000),
                        price: 1
                    },
                    {
                        id: uuidv4(),
                        name: "Stocks",
                        quantity: 1,
                        price: getRandomNumber(500, 1200)
                    },
                    {
                        id: uuidv4(),
                        name: "Crypto",
                        quantity: 1,
                        price: getRandomNumber(1_000, 1_000)
                    },
                ]
            })
        }

        user.portfolio = customPortfolio

        user.markModified('portfolio')
        await user.save()
    } catch (error) {
        console.log(error)
    }
}


// populateMyHistory('64481835c5211752a1ab8013')


