import { body } from "express-validator"

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("firstName", "Укажите имя").isLength({ min: 3 }),
  body("lastName", "Укажите фамилию").isLength({ min: 3 }),
  body("password", "Пароль должен быть минимум 7 символов").isLength({
    min: 7,
  }),
  body("mobilePhone", "Введите номер телефона").isMobilePhone(),
  body("address", "Адрес должен содержать минимум 3 символа")
    .optional()
    .isLength({ min: 3 }),
  body("avatarURL", "Неверная ссылка на аватарку").optional().isURL(),
]

export const loginValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 5 символов").isLength({
    min: 7,
  }),
]
