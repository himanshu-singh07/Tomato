import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'


// App Config
const app = express()
const port = 4000;


// middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();

// API ENDPOINT
app.use('/api/food', foodRouter)
app.use('/images', express.static('uploads'))
app.use('/api/user',userRouter)


// res
app.get('/', (req,res) => {
    res.send("<b>Hello Woring API</b>")
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})

