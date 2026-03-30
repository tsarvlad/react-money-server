import express from 'express'
import { getTags, createTag, addOptionToTag, renameTag, deleteTag, renameOption, deleteOption } from '../controllers/tag.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/', verifyToken, getTags)
router.post('/', verifyToken, createTag)
router.patch('/:id/option', verifyToken, addOptionToTag)
router.patch('/:id/rename', verifyToken, renameTag)
router.delete('/:id', verifyToken, deleteTag)

router.patch('/option/:id/rename', verifyToken, renameOption)
router.delete('/option/:id', verifyToken, deleteOption)

export default router

