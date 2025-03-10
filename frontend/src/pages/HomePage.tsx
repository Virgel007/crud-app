import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    return (
        <div style={styles.container}>
            <h1>Действия с пользователями</h1>
            <div style={styles.buttonContainer}>
                {/* Кнопка для просмотра списка пользователей */}
                <Link to="/user-list" style={styles.link}>
                    <button style={styles.button}>Список пользователей</button>
                </Link>

                {/* Кнопка для создания пользователя */}
                <Link to="/create-user" style={styles.link}>
                    <button style={styles.button}>Создать пользователя</button>
                </Link>

                {/* Кнопка для получения пользователя */}
                <Link to="/get-user" style={styles.link}>
                    <button style={styles.button}>Получить пользователя</button>
                </Link>

                {/* Кнопка для изменения пользователя */}
                <Link to="/update-user" style={styles.link}>
                    <button style={styles.button}>Изменить пользователя</button>
                </Link>

                {/* Кнопка для удаления пользователя */}
                <Link to="/delete-user" style={styles.link}>
                    <button style={styles.button}>Удалить пользователя</button>
                </Link>
            </div>
        </div>
    );
};

// Стили
const styles = {
    container: {
        textAlign: 'center',
        marginTop: '50px',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        marginTop: '20px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    link: {
        textDecoration: 'none',
    },
};

export default HomePage;