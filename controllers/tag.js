import Tag from '../models/Tag.js'
import Option from '../models/Option.js'

export const getTags = async (req, res) => {
    try {
        const tags = await Tag.find().populate('options')
        res.status(200).json(tags)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createTag = async (req, res) => {
    try {
        const { name } = req.body
        const newTag = new Tag({ name, options: [] })
        await newTag.save()
        const tags = await Tag.find().populate('options')
        res.status(201).json(tags)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const addOptionToTag = async (req, res) => {
    try {
        const { id } = req.params // tag id
        const { name } = req.body
        const newOption = new Option({ name, tag: id })
        await newOption.save()

        await Tag.findByIdAndUpdate(id, { $push: { options: newOption._id } })
        
        const tags = await Tag.find().populate('options')
        res.status(200).json(tags)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const renameTag = async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body
        await Tag.findByIdAndUpdate(id, { name })
        const tags = await Tag.find().populate('options')
        res.status(200).json(tags)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const deleteTag = async (req, res) => {
    try {
        const { id } = req.params
        // Delete all associated options first
        await Option.deleteMany({ tag: id })
        await Tag.findByIdAndDelete(id)
        const tags = await Tag.find().populate('options')
        res.status(200).json(tags)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const renameOption = async (req, res) => {
    try {
        const { id } = req.params // option id
        const { name } = req.body
        await Option.findByIdAndUpdate(id, { name })
        const tags = await Tag.find().populate('options')
        res.status(200).json(tags)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const deleteOption = async (req, res) => {
    try {
        const { id } = req.params // option id
        const option = await Option.findById(id)
        const tagId = option.tag
        
        await Option.findByIdAndDelete(id)
        
        // Remove reference from Tag
        await Tag.findByIdAndUpdate(tagId, { $pull: { options: id } })
        
        const tags = await Tag.find().populate('options')
        res.status(200).json(tags)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
