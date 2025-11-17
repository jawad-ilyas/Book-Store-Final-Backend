import { app } from "./src/app.js";
import dotenv from "dotenv";
import { connectDb } from "./src/db/index.db.js";

dotenv.config();

const port = process.env.PORT || 3000;

// Define routes BEFORE listening
app.get("/", (req, res) => {
    console.log("Welcome to server");
    res.send("Welcome to server");
});

connectDb()
    .then(() => {
        // Start the server
        app.listen(port, () => {
            console.log("Server is listening on port:", port);
        });

    })
    .catch(() => {
        console.log("eror into server connection ")
    })