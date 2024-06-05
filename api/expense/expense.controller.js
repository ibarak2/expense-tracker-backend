import { expenseService } from "./expense.service.js"
import { logger } from "../../services/logger.service.js"

export async function getExpenses(req, res) {
    try {
        logger.debug("expense.controller: Getting expenses:", req.query)
        const filterBy = {
            txt: req.query.txt || "",
            category: +req.query.category || "",
            createdAt: req.query.createdAt || undefined,
        }
        const expenses = await expenseService.query(filterBy)
        res.json(expenses)
    } catch (err) {
        logger.error("expense.controller: Failed to get expenses", err)
        res.status(400).send({ error: "Failed to get expenses" })
    }
}

export async function addExpense(req, res) {
    logger.debug("expense.controller: Adding expense")
    const { loggedinUser } = req

    try {
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

    const { loggedinUser } = req
    try {
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

    const { loggedinUser } = req
    const { expenseId } = req.params
    try {
        const deletedCount = await expenseService.remove(expenseId)
        res.json(deletedCount)
    } catch (err) {
        logger.error("expense.controller: Failed to remove expense", err)
        res.status(400).send({ error: "Failed to remove expense" })
    }
}
