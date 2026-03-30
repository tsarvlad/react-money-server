import AssetType from '../models/AssetType.js'

export const getAssetTypes = async (req, res) => {
    try {
        const types = await AssetType.find()
        res.status(200).json(types)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createAssetType = async (req, res) => {
    try {
        const { name } = req.body
        const newType = new AssetType({ name })
        await newType.save()
        const types = await AssetType.find()
        res.status(201).json(types)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}
