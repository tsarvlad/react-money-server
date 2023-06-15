import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'


export const register = async (req, res) => {
    try {
        const { firstName, lastName, email,
            password, confirmPassword } = req.body

        if (password !== confirmPassword) {
            return res.status(400).json({ msg: "Yours passwords didn't match. Try again" })
        }

        const checkEmail = await User.findOne({ email: email })
        if (checkEmail) {
            return res.status(400).json({ msg: "There is already user with this email" })
        }

        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath: req.file.path
        })

        const savedUser = await newUser.save()
        res.status(202).json({ savedUser })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' })
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' })
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
        delete user.password;
        res.status(200).json({ token, user })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const newPasswordEdit = async (req, res) => {
    try {
        const { id } = req.params
        const { currentPassword, newPassword, confirmNewPassword } = req.body

        const user = await User.findById(id)

        if (!user) return res.status(400).json({
            msg: "User does not exist"
        })

        const isMatch = await bcrypt.compare(currentPassword, user.password)

        if (!isMatch) return res.status(400).json({
            msg: 'Invalid current password!'
        })


        if (newPassword !== confirmNewPassword) return res.status(400).json({
            msg: 'Your new Passwords didn\'t match'
        })

        const salt = await bcrypt.genSalt()
        const newPasswordHash = await bcrypt.hash(newPassword, salt)

        user.password = newPasswordHash
        user.markModified('password')

        await user.save()

        res.status(200).json({ msg: 'success' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const editInformation = async (req, res) => {
    try {
        const { firstName, lastName, email, password, picturePath } = req.body

        let user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ msg: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' })
        }

        if (email !== user.email) {
            user.email = email
            user.markModified('email')
        }
        if (firstName !== user.firstName) {
            user.first = first
            user.markModified('firstName')
        }
        if (lastName !== user.lastName) {
            user.lastName = lastName
            user.markModified('lastName')
        }
        if (picturePath) {
            user.picturePath = req.file.path
            user.markModified('picturePath')
        }

        await user.save()

        user = await User.findOne({ email: email })

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)

        res.status(200).json({ token, user })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}