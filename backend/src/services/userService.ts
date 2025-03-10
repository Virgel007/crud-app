import {User} from '../models/user';
import {ServiceEnum, StatusEnum, ValidationEnum} from '../utils/enums';
import {Validator} from "../utils/validator";
import mongoose from 'mongoose';

export class UserService {
    async createUser(firstName: string, lastName: string, phone: string) {
        const userPhoneValidation = await Validator.validateAttribute(phone, ValidationEnum.PHONE_DB);
        switch (userPhoneValidation) {
            case StatusEnum.NOT_FOUND:
                const user = new User({ firstName, lastName, phone });
                await user.save();
                return user;
            case StatusEnum.FOUND:
                return StatusEnum.BAD_REQUEST;
        }
    }

    async getUsers() {
        return await User.find();
    }

    async getUserById(userId: string) {
        const userIdValidation = await Validator.validateAttribute(userId, ServiceEnum.USER_SERVICE);
        switch (userIdValidation) {
            case StatusEnum.BAD_REQUEST:
                return StatusEnum.BAD_REQUEST;
            case StatusEnum.NOT_FOUND:
                return StatusEnum.NOT_FOUND;
            case StatusEnum.OK:
                return User.findById(userId);
            default:
                break;
        }
    }

    async updateUser(userId: string, firstName: string, lastName: string, phone: string) {
        // Валидация userId
        const userIdValidation = await Validator.validateAttribute(userId, ServiceEnum.USER_SERVICE);
        switch (userIdValidation) {
            case StatusEnum.BAD_REQUEST:
                return StatusEnum.BAD_REQUEST;
            case StatusEnum.NOT_FOUND:
                return StatusEnum.NOT_FOUND;
            case StatusEnum.OK:
                const user = await User.findById(userId);
                if (user) {
                    // Обновление пользователя
                    user.firstName = firstName;
                    user.lastName = lastName;
                    user.phone = phone;
                    await user.save();
                    return user;
                }
            default:
                break;
        }
    }

    async deleteUser(userId: string) {
        const userIdValidation = await Validator.validateAttribute(userId, ServiceEnum.USER_SERVICE);
        switch (userIdValidation) {
            case StatusEnum.BAD_REQUEST:
                return StatusEnum.BAD_REQUEST; // Некорректный ID
            case StatusEnum.NOT_FOUND:
                return StatusEnum.NOT_FOUND; // Пользователь не найден
            case StatusEnum.OK:
                await User.deleteOne({ _id: new mongoose.Types.ObjectId(userId) });
                return { message: 'Пользователь удален' };
            default:
                break;
        }
    }
}

export const userService = new UserService();