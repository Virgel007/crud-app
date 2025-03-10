import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateUserPage from './pages/CreateUserPage';
import GetUserPage from './pages/GetUserPage';
import UpdateUserPage from './pages/UpdateUserPage';
import DeleteUserPage from './pages/DeleteUserPage';
import UserListPage from './pages/UserListPage';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/user-list" element={<UserListPage />} />
                <Route path="/create-user" element={<CreateUserPage />} />
                <Route path="/get-user" element={<GetUserPage />} />
                <Route path="/update-user" element={<UpdateUserPage />} />
                <Route path="/delete-user" element={<DeleteUserPage />} />
            </Routes>
        </Router>
    );
};

export default App;