import express from "express";
import authenticateToken from "../middleware/auth.js";
import EmployeesController from "../controllers/employees.js";
const router = express.Router();

router.get("/", authenticateToken, EmployeesController.getAllEmployees);
router.get("/:id", authenticateToken, EmployeesController.getIdEmployees);
router.post("/add", authenticateToken, EmployeesController.addEmployees);
router.post(
  "/remove/:id",
  authenticateToken,
  EmployeesController.removeEmployees
);
router.put("/edit/:id", authenticateToken, EmployeesController.editEmployees);

export default router;
