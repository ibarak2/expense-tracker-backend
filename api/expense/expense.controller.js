import { expenseService } from "./expense.service.js"
import { logger } from "../../services/logger.service.js"

export async function getExpenses(req, res) {
    logger.debug("expense.controller: Getting expenses:", req.query)
    try {
        const { loggedinUser } = req
        const filterBy = {
            title: req.query.title || "",
            minPrice: +req.query.minPrice || "",
            category: req.query.category || "",
            fromDate: new Date(req.query.fromDate).getTime() || "",
            toDate: new Date(req.query.toDate).getTime() || "",
        }
        const expenses = await expenseService.query(filterBy, loggedinUser)
        res.json(expenses)
    } catch (err) {
        logger.error("expense.controller: Failed to get expenses", err)
        res.status(400).send({ error: "Failed to get expenses" })
    }
}

export async function addExpense(req, res) {
    logger.debug("expense.controller: Adding expense")
    try {
        const { loggedinUser } = req
        const expense = req.body
        const addedExpense = await expenseService.add(expense, loggedinUser)
        res.json(addedExpense)
    } catch (err) {
        logger.error("expense.controller: Failed to add expense", err)
        res.status(400).send({ error: "Failed to add expense" })
    }
}

export async function updateExpense(req, res) {
    logger.debug("expense.controller: Updating expense")
    try {
        // const { loggedinUser } = req
        const expense = req.body
        const updatedExpense = await expenseService.update(expense)
        res.json(updatedExpense)
    } catch (err) {
        logger.error("expense.controller: Failed to update expense", err)
        res.status(400).send({ error: "Failed to update expense" })
    }
}

export async function removeExpense(req, res) {
    logger.debug("expense.controller: Removing expense")
    try {
        // const { loggedinUser } = req
        const { expenseId } = req.params
        const deletedCount = await expenseService.remove(expenseId)
        res.json(deletedCount)
    } catch (err) {
        logger.error("expense.controller: Failed to remove expense", err)
        res.status(400).send({ error: "Failed to remove expense" })
    }
}
