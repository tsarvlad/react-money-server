import express from 'express'
import { login, newPasswordEdit } from '../controllers/auth.js'

const router = express.Router()

router.post('/login', login)
router.post('/:id/newPassword', newPasswordEdit)


export default router;
