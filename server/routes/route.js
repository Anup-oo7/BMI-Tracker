import express from 'express'
import {signupUser, loginUser, verifyEmail, useAuthcookies}  from '../controller/user-controller.js';
import { postBMI } from '../controller/postBmi.js';
import {getBMI} from '../controller/getBmi.js'

const router = express.Router()

router.post('/signup', signupUser)
router.post('/emailVerify', verifyEmail)
router.post('/login', loginUser)
router.post('/myBmi', postBMI)
router.get('/myBmi', getBMI)
router.get('/useAuth', useAuthcookies)

export default router;