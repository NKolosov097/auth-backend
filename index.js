import express from "express"
import multer from "multer"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import { loginValidation, registerValidation } from "./validations/auth.js"
import { checkAuth, handleValidationErrors } from "./utils/index.js"
import { UserController, CardController } from "./controllers/index.js"
import { cardCreateValidation } from "./validations/card.js"

dotenv.config()
const PORT = process.env.PORT || 8001

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Database has been connected"))
  .catch((err) => console.log("Connection with database failed: ", err))

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads")
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

const app = express()
app.use(express.json())
app.use("/uploads", express.static("uploads"))
app.use(cors())

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  })
})

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

app.get("/cards", CardController.getAll)
app.get("/cards/:id", CardController.getOne)
app.post(
  "/cards",
  checkAuth,
  handleValidationErrors,
  cardCreateValidation,
  CardController.create
)
app.get(
  "/cards/:id",
  checkAuth,
  cardCreateValidation,
  handleValidationErrors,
  CardController.update
)

app.listen(PORT, (err) => {
  if (err) {
    console.log(err)
  }

  console.log(`Server has been started on PORT ${PORT}`)
})
