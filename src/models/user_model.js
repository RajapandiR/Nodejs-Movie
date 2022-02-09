import mongoose  from "mongoose";
import Bcrypt from '../utils/bcrypt';

const userSchema = mongoose.Schema({
    
    email: {type: String},
    password: { type: String},
    resetPasswordToken: { type: String},
    resetPasswordExpires: { type: Date},
}, {timestamps: true});


userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});


userSchema.pre('save', async function save() {
    if (!this.isModified('password') || !this.password) return true;
    const password = await Bcrypt.hash(this.password);
    this.password = password;
    return true;
});

const user = mongoose.model('users', userSchema,'users');

export default user;