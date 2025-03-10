# Базовый образ Node.js
FROM node:18-alpine

# Установка рабочей директории
WORKDIR /app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование исходного кода
COPY . .

# Сборка приложения
RUN npm run build

# Экспозиция порта
EXPOSE 3000

# Запуск приложения
CMD ["npm", "start"]