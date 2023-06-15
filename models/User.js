import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid';
const id = uuidv4()


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 5
    },
    picturePath: {
        type: String,
        default: ''
    },
    portfolio: {
        type: Array,
        default: [
            {
                time: new Date(new Date().setMonth(new Date().getMonth() - 1)),
                assets: [
                    {
                        id: id,
                        name: "United States Dollar",
                        quantity: 1,
                        price: 1,
                    }
                ]
            }
        ]
    }
}, { timestamps: true })

const User = mongoose.model('User', UserSchema)
export default User