import { body } from "express-validator"

export const cardCreateValidation = [
  body("title", "Введите заголовок статьи").isLength({ min: 3 }).isString(),
  body("description", "Введите текст статьи").isLength({ min: 3 }).isString(),
  body("price", "Укажите цену за товар").isNumeric(),
  body("tags", "Неверный формат тэгов (укажите массив)").optional().isArray(),
  body("imageURL", "Неверная ссылка на изображение").optional().isURL(),
]
