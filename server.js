import http from "http"
import path from "path"
import cors from "cors"
import express from "express"
import cookieParser from "cookie-parser"

const app = express()
const server = http.createServer(app)

// Express App Config
app.use(cookieParser())
app.use(express.json())

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve("public")))
} else {
    const corsOptions = {
        origin: [
            "http://127.0.0.1:3000",
            "http://localhost:3000",
            "http://127.0.0.1:5173",
            "http://localhost:5173",
        ],
        credentials: true,
    }
    app.use(cors(corsOptions))
}

import { authRoutes } from "./api/auth/auth.routes.js"
import { userRoutes } from "./api/user/user.routes.js"
import { expenseRoutes } from "./api/expense/expense.routes.js"

// Async Local Storage
import { setupAsyncLocalStorage } from "./middlewares/setupAls.middleware.js"
app.all("*", setupAsyncLocalStorage)

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/expense", expenseRoutes)

//
app.get("/api/test", (req, res) => {
    res.send("Test route is working.")
})

import { logger } from "./services/logger.service.js"
const port = process.env.PORT || 3030
server.listen(port, () => {
    console.log("Server is running on port: " + port)
    logger.info("Server is running on port: " + port)
})
