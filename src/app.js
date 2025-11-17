import express from "express";
import cors from "cors"
import morgan from "morgan";
import cookieParser from "cookie-parser";



const app = express()
app.use(morgan("dev"));
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))

import AuthRouter from "./routes/authRoutes.js"
import UserRouter from "./routes/userRoutes.js"
import BookRouter from "./routes/bookRoutes.js"
import ReviewRouter from "./routes/reviewRoutes.js"
import OrderRouter from "./routes/orderRoutes.js"
import NewsLetterRouter from "./routes/newsletterRoutes.js"


app.use("/api/auth", AuthRouter)
app.use("/api/users", UserRouter)
app.use("/api/books", BookRouter)
app.use("/api/reviews", ReviewRouter)
app.use("/api/orders", OrderRouter)
app.use("/api/newsletter", NewsLetterRouter)



export { app }
