import express from 'express'
import { connectDB } from './DB/Connection.js'
import { appRouter } from './src/app.router.js'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
const port = process.env.PORT


connectDB()
appRouter(app,express)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))