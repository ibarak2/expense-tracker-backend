import { dbService } from "../../services/db.service.js"
import { logger } from "../../services/logger.service.js"
import mongodb from "mongodb"
const { ObjectId } = mongodb

export const userService = {
    add, // Create (Signup)
    getByUsername, // Used for Login
}

async function add(user) {
    try {
        const userToAdd = {
            username: user.username,
            password: user.password,
        }
        const collection = await dbService.getCollection("user")
        await collection.insertOne(userToAdd)
        return userToAdd
    } catch (err) {
        logger.error("cannot add user", err)
        throw err
    }
}

async function getByUsername(username) {
    try {
        const collection = await dbService.getCollection("user")
        const user = await collection.findOne({ username })
        return user
    } catch (err) {
        logger.error(`while finding user by username: ${username}`, err)
        throw err
    }
}
