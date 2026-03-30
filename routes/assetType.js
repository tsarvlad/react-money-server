import express from 'express'
import { getAssetTypes, createAssetType } from '../controllers/assetType.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/', verifyToken, getAssetTypes)
router.post('/', verifyToken, createAssetType)

export default router
