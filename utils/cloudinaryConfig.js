import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Portfolio',
        allowed_formats: ['png', 'jpg', 'jpeg', 'gif'], // allows png, jpg, jpeg, and gif formats
        format: async (req, file) => 'png', // sets the format to png (you can change this if you want)
        transformation: [
            {
                width: 1000, // sets the maximum width to 1000 pixels
                height: 1000, // sets the maximum height to 1000 pixels
                crop: 'limit', // crops the image to fit within the specified dimensions
                quality: 'auto', // sets the image quality to auto
                fetch_format: 'auto', // sets the fetch format to auto
            },
        ],
        maxFileSize: 10 * 1024 * 1024
    },
})

const uploader = multer({ storage: storage })

export default uploader