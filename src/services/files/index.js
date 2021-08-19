import express from 'express'
import multer from 'multer'
import { getPDFReadableStreamPost, PostPicture } from '../../lib/fs-tool.js'
import { getPDFReadableStream } from '../../lib/pdf.js'
// import {cloudStorage} from 'multer-storage-cloudinary'
import { pipeline } from 'stream'
import json2csv from 'json2csv'
const {Transform} = json2csv





// const cloudStorage = new CloudStorage({
//   Cloudinary,
//   params: {
//     folder: "strive",
//   },
// })


const fileRouter = express.Router()


fileRouter.post("/upload", multer({}).single("blogPic"), async (req, res, next) => {
    try {
      console.log(req.file)
      await PostPicture(req.file.originalname, req.file.buffer)
      res.send("Uploaded!")
    } catch (error) {
      next(error)
    }
  })

  fileRouter.get("/Download", async (req, res, next) => {
    try {
      const filename = "file.pdf"
      res.setHeader("Content-Disposition", `attachment; filename=${filename}`) 
      const source = getPDFReadableStream()
      const destination = res
  
      pipeline(source, destination, err => {
        if (err) next(err)
      })
    } catch (error) {
      next(error)
    }
  })

  fileRouter.get("/FileCsv", async (req, res, next) => {
    try {
      const filename = "File.csv"
      res.setHeader("Content-Disposition", `attachment; filename=${filename}`) 
      const source = getPDFReadableStreamPost()
      const transform = new Transform({fields:["title","cover","author"]})
      const destination = res
  
      pipeline(source,transform, destination, err => {
        if (err) next(err)
      })
    } catch (error) {
      next(error)
    }
  })

  

  export default fileRouter