import mongoose from 'mongoose'

const OptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    tag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
        required: true
    }
}, { timestamps: true })

const Option = mongoose.model('Option', OptionSchema)
export default Option
