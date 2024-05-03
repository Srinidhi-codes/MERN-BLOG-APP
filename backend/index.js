import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import DBConnection from './config/index.js';
import authRouter from './router/authRouter.js'
import blogRouter from './router/blogRouter.js'
import multer from 'multer';

// configure env
dotenv.config();

// Connect DB
DBConnection()

const app = express(); //instantiating or creating an instance of the Express framework.

//Middleware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, req.body.filename)
    }
})

const upload = multer({
    storage: storage
})

app.post('/upload', upload.single("image"), async (req, res) => {
    return res.status(200).json({ msg: "Successfully uploaded" })
})


//Routes
app.use('/images', express.static('public/images'))
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/blog', blogRouter)

app.listen(process.env.PORT, () => console.log(`Server running at ${process.env.PORT}`))

