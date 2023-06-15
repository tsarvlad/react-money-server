import express from 'express'
import {
    getUser, getUserStats, getUserPortfolio,
    getUserChartData, postUserPortfolioReport
} from '../controllers/user.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/:id/portfolio', getUserPortfolio)
router.get('/:id/chartdata', getUserChartData)
router.get('/stats', getUserStats)

router.post('/:id/report', postUserPortfolioReport)

export default router