import React from 'react';
import { Link } from 'react-router-dom';
import useFetchUsers from '../hooks/useFetchUsers';

const UserListPage: React.FC = () => {
    const { users, isLoading, error } = useFetchUsers();

    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;
    if (!users || users.length === 0) return <p>Нет пользователей.</p>;

    return (
        <div style={styles.container}>
            <h2>Список пользователей</h2>
            <ul style={styles.list}>
                {users.map((user: any) => (
                    <li key={user._id} style={styles.listItem}>
                        {user.firstName} {user.lastName || ''} ({user.phone})
                    </li>
                ))}
            </ul>
            <Link to="/" style={styles.link}>Вернуться на главную</Link>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        textAlign: 'center',
        marginTop: '50px',
    },
    list: {
        listStyleType: 'none',
        padding: 0,
    },
    listItem: {
        margin: '10px 0',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
    },
    link: {
        marginTop: '20px',
        textDecoration: 'none',
        color: '#007bff',
    },
};

export default UserListPage;