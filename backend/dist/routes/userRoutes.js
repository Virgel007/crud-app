"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
// Создание нового пользователя
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, phone } = req.body;
        const user = new User_1.User({ firstName, lastName, phone, contacts: [] });
        yield user.save();
        res.status(201).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Ошибка при создании пользователя' });
    }
}));
// Получение списка всех пользователей
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.find();
        res.json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка при получении пользователей' });
    }
}));
// Получение информации о конкретном пользователе
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findById(req.params.id);
        if (!user)
            return res.status(404).json({ error: 'Пользователь не найден' });
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка при получении пользователя' });
    }
}));
// Обновление данных пользователя
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, phone } = req.body;
        const user = yield User_1.User.findByIdAndUpdate(req.params.id, { firstName, lastName, phone }, { new: true });
        if (!user)
            return res.status(404).json({ error: 'Пользователь не найден' });
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Ошибка при обновлении пользователя' });
    }
}));
// Удаление пользователя
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findByIdAndDelete(req.params.id);
        if (!user)
            return res.status(404).json({ error: 'Пользователь не найден' });
        res.json({ message: 'Пользователь удален' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка при удалении пользователя' });
    }
}));
exports.default = router;
