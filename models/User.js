import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    cartItems: { type: Object, default: {} },
    isAdmin: { type: Boolean, default: false },
    role: { type: String, default: 'buyer' },
    status: { type: String, enum: ['active', 'blocked'], default: 'active' }
}, { minimize: false })

const User = mongoose.models.user || mongoose.model('user',userSchema)

export default User