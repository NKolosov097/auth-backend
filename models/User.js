import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    mobilePhone: {
      type: String,
      required: true,
      unique: true,
    },
    address: String,
    avatarURL: String,
  },
  {
    timestamps: true,
  }
)

export default mongoose.model("User", UserSchema)
