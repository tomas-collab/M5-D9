import express from 'express'
import { sendEmail } from '../../lib/email.js'

const userRouter = express.Router()

userRouter.post('/sendEmail', async(req,res,next)=>{
    const {email} = req.body
    await sendEmail(email)
    res.send('email has been sent')
})
export default userRouter