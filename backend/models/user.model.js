import mongoose from "mongoose";
import bcrypt from "bcryptjs"

// user Model
const userSchema = new mongoose.Schema({
    name: {
        type: "String",
        required: true,
        trim: true
    },
    email: {
        type: "String",
        required: true,
        trim: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: "String",
        required: true,
        minLength: 6,
    },
    role: {
        type: "String",
        default: "customer",
        enum: ["customer", "admin"]
    },

}, { timestamps: true })

// Password Hash Middleware
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// Match User entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}
const User = mongoose.model("User", userSchema);

export default User