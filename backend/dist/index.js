"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware для парсинга JSON
app.use(express_1.default.json());
// Подключение к MongoDB
mongoose_1.default.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/crud-app')
    .then(() => console.log('Подключено к MongoDB'))
    .catch((err) => console.error('Ошибка подключения к MongoDB:', err));
// Маршруты
app.use('/api/users', userRoutes_1.default);
// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
