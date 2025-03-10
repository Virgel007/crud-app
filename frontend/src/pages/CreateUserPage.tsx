import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';

const CreateUserPage: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        try {
            const response = await api.post('/users', formData);
            if (response.data.success === 'create') {
                setSuccessMessage(response.data.message);
                setFormData({ firstName: '', lastName: '', phone: '' }); // Очищаем форму
            } else {
                setError(response.data.message || 'Ошибка при создании пользователя');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Неизвестная ошибка');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Создать пользователя</h2>
            {successMessage && <p style={styles.success}>{successMessage}</p>}
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <label>
                    Имя:
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </label>
                <label>
                    Фамилия:
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </label>
                <label>
                    Телефон:
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </label>
                <button type="submit" style={styles.button}>Создать</button>
            </form>
            <Link to="/" style={styles.link}>Вернуться на главную</Link>
        </div>
    );
};

// Стили
const styles = {
    container: {
        textAlign: 'center',
        marginTop: '50px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
    },
    input: {
        padding: '8px',
        width: '200px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    link: {
        marginTop: '20px',
        textDecoration: 'none',
        color: '#007bff',
    },
    success: {
        color: 'green',
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        fontWeight: 'bold',
    },
};

export default CreateUserPage;