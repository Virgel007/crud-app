import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUser extends Document {
    _id: Types.ObjectId;
    firstName: string;
    lastName?: string;
    phone: string;
}

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    phone: { type: String, required: true, unique: true },
});

export const User = mongoose.model<IUser>('User', userSchema);