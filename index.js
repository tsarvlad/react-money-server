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

app.get("/", (req, res) => {
    res.send("This was a perfect experience, all is working")
})


const PORT = process.env.PORT || 6001;
mongoose.set('strictQuery', false);
mongoose.set('debug', true)
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
}).catch((error) => console.log(`${error}, did not connect`))

export default app