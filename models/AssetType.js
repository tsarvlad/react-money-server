import mongoose from 'mongoose'

const AssetTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        min: 2,
        max: 50
    }
}, { timestamps: true })

const AssetType = mongoose.model('AssetType', AssetTypeSchema)
export default AssetType
