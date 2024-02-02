import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter Name"],
    },
    email: {
      type: String,
      required: [true, "Please enter Email"],
    },
    rollNo: {
      type: String,
      required: [true, "Please enter Roll No"],
    },
    phoneNo: {
      type: String,
      required: [true, "Please enter Phone No."],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
export default User;
