import prisma from "../prisma/prisma-client.js";

const EmployeesController = {
  /**
   * @route GET /api/employees
   * @desc  Получение всех сотрудников
   */
  getAllEmployees: async (req, res) => {
    try {
      const employees = await prisma.employee.findMany();

      res.status(200).json(employees);
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Ошибка при получении всех сотрудников" });
    }
  },
  /**
   * @route GET /api/employees/:id
   * @desc  Получения сотрудника по ID
   */
  getIdEmployees: async (req, res) => {
    const { id } = req.params;
    try {
      const employees = await prisma.employee.findUnique({
        where: {
          id,
        },
      });

      return res.status(200).json(employees);
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Ошибка при получении сотрудника" });
    }
  },
  /**
   * @route POST /api/employees/add
   * @desc  Добавление сотрудника
   */
  addEmployees: async (req, res) => {
    const { firstName, lastName, address, age } = req.body;
    try {
      if (!firstName || !lastName || !address || !age) {
        return res
          .status(400)
          .json({ message: "Заполните все необходимые поля" });
      }

      const employee = await prisma.employee.create({
        data: {
          firstName: firstName,
          lastName: lastName,
          address: address,
          age: age,
          userId: req.user.id,
        },
      });
      return res.status(201).json(employee);
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Ошибка при добавлении сотрудника" });
    }
  },
  /**
   * @route POST /api/employees/remove/:id
   * @desc  Удаление сотрудника
   */
  removeEmployees: async (req, res) => {
    const { id } = req.params;
    try {
      const employee = await prisma.employee.delete({
        where: { id: id },
      });
      return res.status(200).json(employee);
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Ошибка при удалении сотрудника" });
    }
  },
  /**
   * @route PUT /api/employees/edit/:id
   * @desc  Редактирование сотрудника
   */
  editEmployees: async (req, res) => {
    const data = req.body;
    const { id } = req.params;

    try {
      const employee = await prisma.employee.update({
        where: {
          id,
        },
        data,
      });
      return res.status(200).json(employee);
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Ошибка при изменении сотрудника" });
    }
  },
};

export default EmployeesController;
