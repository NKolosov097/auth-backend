import express from "express"
import mongoose from "mongoose"
import { loginValidation, registerValidation } from "./validations/auth.js"
import { checkAuth, handleValidationErrors } from "./utils/index.js"
import { UserController } from "./controllers/index.js"
import dotenv from "dotenv"

dotenv.config()
const PORT = process.env.PORT || 8001

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Database has been connected"))
  .catch((err) => console.log("Connection with database failed: ", err))

const app = express()
app.use(express.json())

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
)

app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
)

app.get("/auth/me", checkAuth, UserController.getMe)

app.listen(PORT, (err) => {
  if (err) {
    console.log(err)
  }

  console.log(`Server has been started on PORT ${PORT}`)
})
