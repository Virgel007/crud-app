import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware для парсинга JSON
app.use(express.json());

// Middleware для обработки CORS
app.use(
    cors({
        origin: 'http://localhost:5173', // Разрешаем только этот источник
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешенные методы
        allowedHeaders: ['Content-Type'], // Разрешенные заголовки
    })
);

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/crud-app')
    .then(() => console.log('Подключено к MongoDB'))
    .catch((err) => console.error('Ошибка подключения к MongoDB:', err));

// Маршруты
app.use('/api/users', userRoutes);

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});