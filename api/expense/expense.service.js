import { logger } from "../../services/logger.service.js"
import { dbService } from "../../services/db.service.js"
import { ObjectId } from "mongodb"
import { asyncLocalStorage } from "../../services/als.service.js"

export const expenseService = {
    query,
    remove,
    add,
    update,
}

const collectionName = "expense"

async function query(filterBy = {}, loggedinUser) {
    try {
        const criteria = _buildCriteria(filterBy, loggedinUser)
        const collection = await dbService.getCollection(collectionName)
        const expenseCursor = await collection.find(criteria)
        const expenses = expenseCursor.toArray()

        return expenses
    } catch (err) {
        logger.error("expense.service: cannot get expenses", err)
        throw err
    }
}

async function remove(expenseId) {
    try {
        const collection = await dbService.getCollection(collectionName)
        const { deletedCount } = await collection.deleteOne({
            _id: new ObjectId(expenseId),
        })
        return deletedCount
    } catch (err) {
        logger.error(`expense.service: cannot remove expense ${expenseId}`, err)
        throw err
    }
}

async function add(expenseToSave, loggedinUser) {
    try {
        expenseToSave.owner = loggedinUser
        expenseToSave.createdAt = Date.now()
        const collection = await dbService.getCollection(collectionName)
        await collection.insertOne(expenseToSave)
        return expenseToSave
    } catch (err) {
        logger.error("expense.service: can not add expense : " + err)
        throw err
    }
}

async function update(expense) {
    try {
        // Peek only updateable fields
        const expenseToSave = {
            title: expense.title,
            price: expense.price,
            category: expense.category,
        }
        const collection = await dbService.getCollection(collectionName)
        await collection.updateOne(
            { _id: new ObjectId(expense._id) },
            { $set: expenseToSave },
        )
        return expense
    } catch (err) {
        logger.error(
            `expense.service: cannot update expense ${expense._id}`,
            err,
        )
        throw err
    }
}

// local functions
function _buildCriteria(filterBy, loggedinUser) {
    const criteria = {}

    criteria.owner = { $eq: loggedinUser }

    if (filterBy.title) {
        criteria.title = { $regex: filterBy.title, $options: "i" }
    }

    if (filterBy.minPrice) {
        criteria.price = { $gt: filterBy.minPrice }
    }

    if (filterBy.category) {
        criteria.category = { $regex: filterBy.category, $options: "i" }
    }

    if (filterBy.fromDate || filterBy.toDate) {
        logger.debug("expense.service: filterBy", filterBy)
        const fromDate =
            filterBy.fromDate === "" ? {} : { $gte: filterBy.fromDate }
        const toDate = filterBy.toDate === "" ? {} : { $lte: filterBy.toDate }
        criteria.createdAt = { ...fromDate, ...toDate }
    }

    return criteria
}
