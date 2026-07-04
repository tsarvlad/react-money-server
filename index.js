import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import helmet, { crossOriginResourcePolicy } from 'helmet'
import morgan from 'morgan'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import tagRoutes from './routes/tag.js'
import { register, editInformation } from './controllers/auth.js'
import uploader from './utils/cloudinaryConfig.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use(cors())

app.post('/auth/register',
    uploader.single('picture'),
    register)

app.post('/user/:id/edit',
    uploader.single('picture'),
    editInformation)

app.use("/auth", authRoutes)

app.use("/user", userRoutes)

app.use("/tags", tagRoutes)

app.get("/", (req, res) => {
    res.send("This was a perfect experience, all is working")
})

app.get(["/ping-db", "/api/ping-db"], async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.db.admin().ping();
            res.status(200).send("Database pinged successfully.");
        } else {
            res.status(503).send(`Database connection is not ready. Current state: ${mongoose.connection.readyState}`);
        }
    } catch (error) {
        console.error("Database ping failed:", error);
        res.status(500).send(`Database ping failed: ${error.message}`);
    }
});


const PORT = process.env.PORT || 6001;
mongoose.set('strictQuery', false);
mongoose.set('debug', true)
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))

    // Ping database every 24 hours to keep MongoDB Atlas active (for persistent hosting environments)
    setInterval(async () => {
        try {
            console.log("Running scheduled database ping to keep cluster active...");
            if (mongoose.connection.readyState === 1) {
                await mongoose.connection.db.admin().ping();
                console.log("Database ping successful.");
            } else {
                console.log("Database connection not ready for ping.");
            }
        } catch (error) {
            console.error("Scheduled database ping failed:", error);
        }
    }, 24 * 60 * 60 * 1000); // 24 hours
}).catch((error) => console.log(`${error}, did not connect`))

export default app