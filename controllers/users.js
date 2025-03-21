import prisma from "../prisma/prisma-client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserController = {
  /**
   * @route POST api/user/login
   * @desc Авторизация пользователя
   */
  login: async (req, res) => {
    const { email, password } = req.body;
    const secret = process.env.JWT_SECRET;
    try {
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Пожалуйста, заполните обязательные поля" });
      }

      const user = await prisma.user.findFirst({
        where: { email },
      });

      const isPasswordCorrect =
        user && (await bcrypt.compare(password, user.password));

      if (user && isPasswordCorrect && secret) {
        return res.status(200).json({
          id: user.id,
          email: user.email,
          name: user.name,
          token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
        });
      } else {
        return res
          .status(400)
          .json({ message: "Неверно введен логин или пароль" });
      }
    } catch (err) {
      return res.status(400).json({ message: "Ошибка при авторизации" });
    }
  },
  /**
   * @route POST api/user/register
   * @desc Регистрация пользователя
   */
  register: async (req, res) => {
    const { email, password, name } = req.body;
    const secret = process.env.JWT_SECRET;
    try {
      if (!email || !password || !name) {
        return res
          .status(400)
          .json({ message: "Пожалуйста, заполните обязательные поля" });
      }

      const registeredUser = await prisma.user.findFirst({
        where: { email },
      });

      if (registeredUser) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким email уже существует" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });

      if (user && secret) {
        return res.status(201).json({
          id: user.id,
          email: user.email,
          name: user.name,
          token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
        });
      } else {
        return res
          .status(400)
          .json({ message: "Не удалось создать пользователя" });
      }
    } catch (err) {
      return res.status(400).json({ message: "Ошибка при регистрации" });
    }
  },

  /**
   * @route GET api/user/current
   * @desc Текущий пользователь
   */
  current: async (req, res) => {
    try {
      return res.status(200).json(req.user);
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Ошибки при получении данного пользователя" });
    }
  },
};

export default UserController;
