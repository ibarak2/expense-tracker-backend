import express from "express"
import {
    addExpense,
    getExpenses,
    removeExpense,
    updateExpense,
} from "./expense.controller.js"
import { requireAuth } from "../../middlewares/requireAuth.middleware.js"

const router = express.Router()

router.get("/", requireAuth, getExpenses)
router.delete("/:expenseId", requireAuth, removeExpense)
router.post("/", requireAuth, addExpense)
router.put("/:expenserId", requireAuth, updateExpense)

export const expenseRoutes = router
