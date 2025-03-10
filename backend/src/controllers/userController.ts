import {Request, Response} from 'express';
import {userService} from '../services/userService';
import {Validator} from "../utils/validator";
import {ControllerEnum, StatusEnum, ActionEnum, ValidationEnum} from '../utils/enums';


class UserController {
    async createUser(req: Request, res: Response) {
        const {firstName, lastName, phone} = req.body;

        // Валидация firstName
        const firstNameValidation = Validator.validateAttribute(firstName, ControllerEnum.USER_CONTROLLER);
        if (firstNameValidation === StatusEnum.BAD_REQUEST) {
            return res.status(400).json({
                success: ActionEnum.ERROR,
                message: 'Ошибка валидации: Поле firstName не может быть пустым или некорректным.',
            });
        }


        // Валидация lastName
        const lastNameValidation = Validator.validateAttribute(lastName, ControllerEnum.USER_CONTROLLER);
        if (lastNameValidation === StatusEnum.BAD_REQUEST) {
            return res.status(400).json({
                success: ActionEnum.ERROR,
                message: 'Ошибка валидации: Поле lastName не может быть пустым или некорректным.',
            });
        }

        // Валидация phone
        const phoneValidation = Validator.validateAttribute(phone, ValidationEnum.PHONE);
        if (phoneValidation === StatusEnum.BAD_REQUEST) {
            return res.status(400).json({
                success: ActionEnum.ERROR,
                message: 'Ошибка валидации: Поле phone не может быть пустым или некорректным.',
            });
        }

        // Если все данные валидны, создаем пользователя
        const user = await userService.createUser(firstName, lastName, phone);
        switch (user) {
            case StatusEnum.BAD_REQUEST:
                return res.status(400).json({
                    success: ActionEnum.ERROR,
                    message: 'Пользователь с таким номером телефона уже существует',
                })
            default:
                res.status(201).json({
                    success: ActionEnum.CREATE,
                    message: 'Пользователь успешно создан',
                    data: user,
                });
        }
    }

    async getUsers(req: Request, res: Response) {
        const users = await userService.getUsers();
        res.json({
            success: ActionEnum.READ,
            message: 'Список пользователей',
            data: users,
        });
    }

    async getUserById(req: Request, res: Response) {
        const {id} = req.params;

        // Валидация ID
        const idValidation = Validator.validateAttribute(id, ControllerEnum.ID_CONTROLLER);
        if (idValidation === StatusEnum.BAD_REQUEST) {
            return res.status(400).json({
                success: ActionEnum.ERROR,
                message: 'Ошибка валидации: Некорректный ID пользователя.',
            });
        }

        const user = await userService.getUserById(id);
        switch (user) {
            case StatusEnum.NOT_FOUND:
                return res.status(404).json({
                    success: ActionEnum.ERROR,
                    message: 'Пользователь не найден',
                })
            case StatusEnum.BAD_REQUEST:
                return res.status(400).json({
                    success: ActionEnum.ERROR,
                    message: 'Ошибка валидации: Некорректный ID пользователя.',
                })
            default:
                res.json({
                    success: ActionEnum.READ,
                    message: 'Информация о пользователе',
                    data: user,
                });
        }
    }

    async updateUser(req: Request, res: Response) {
        const {id} = req.params;
        const {firstName, lastName, phone} = req.body;

        // Валидация ID
        const idValidation = Validator.validateAttribute(id, ControllerEnum.ID_CONTROLLER);
        if (idValidation === StatusEnum.BAD_REQUEST) {
            return res.status(400).json({
                success: ActionEnum.ERROR,
                message: 'Ошибка валидации: Некорректный ID пользователя.',
            });
        }

        // Валидация firstName
        const firstNameValidation = Validator.validateAttribute(firstName, ControllerEnum.USER_CONTROLLER);
        if (firstNameValidation === StatusEnum.BAD_REQUEST) {
            return res.status(400).json({
                success: ActionEnum.ERROR,
                message: 'Ошибка валидации: Поле firstName не может быть пустым или некорректным.',
            });
        }

        // Валидация lastName
        const lastNameValidation = Validator.validateAttribute(lastName, ControllerEnum.USER_CONTROLLER);
        if (lastNameValidation === StatusEnum.BAD_REQUEST) {
            return res.status(400).json({
                success: ActionEnum.ERROR,
                message: 'Ошибка валидации: Поле lastName не может быть пустым или некорректным.',
            });
        }

        // Валидация phone
        const phoneValidation = Validator.validateAttribute(phone, ValidationEnum.PHONE);
        if (phoneValidation === StatusEnum.BAD_REQUEST) {
            return res.status(400).json({
                success: ActionEnum.ERROR,
                message: 'Ошибка валидации: Поле phone не может быть пустым или некорректным.',
            });
        }

        const user = await userService.updateUser(id, firstName, lastName, phone);
        switch (user) {
            case StatusEnum.NOT_FOUND:
                return res.status(404).json({
                    success: ActionEnum.ERROR,
                    message: 'Пользователь не найден',
                })
            case StatusEnum.BAD_REQUEST:
                return res.status(400).json({
                    success: ActionEnum.ERROR,
                    message: 'Ошибка валидации: Некорректный ID пользователя.',
                })
            default:
                res.json({
                    success: ActionEnum.READ,
                    message: 'Информация об пользователе изменена',
                    data: user,
                });
        }
    }

    async deleteUser(req: Request, res: Response) {
        const {id} = req.params;

        // Валидация ID
        const idValidation = Validator.validateAttribute(id, ControllerEnum.ID_CONTROLLER);
        if (idValidation === StatusEnum.BAD_REQUEST) {
            return res.status(400).json({
                success: ActionEnum.ERROR,
                message: 'Ошибка валидации: Некорректный ID пользователя.',
            });
        }

        const user = await userService.deleteUser(id);
        switch (user) {
            case StatusEnum.NOT_FOUND:
                return res.status(404).json({
                    success: ActionEnum.ERROR,
                    message: 'Пользователь не найден',
                })
            case StatusEnum.BAD_REQUEST:
                return res.status(400).json({
                    success: ActionEnum.ERROR,
                    message: 'Ошибка валидации: Некорректный ID пользователя.',
                })
            default:
                res.json({
                    success: ActionEnum.DELETE,
                    message: 'Пользователь успешно удален',
                    data: user,
                });
        }
    }
}

export const userController = new UserController();