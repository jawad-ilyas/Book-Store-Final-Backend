import mongoose from "mongoose";

const connectDb = async () => {

    try {
        const response = await mongoose.connect(process.env.DB_URI)
        return "db is connected "
    } catch (error) {
        console.log("error into db conneciton ")
        throw new Error(error)

    }
}



export { connectDb }