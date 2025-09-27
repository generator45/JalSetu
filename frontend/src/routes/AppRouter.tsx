import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Report from '../pages/Report';

const AppRouter: React.FC = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<Report />} />
        </Routes>
    </Router>
);

export default AppRouter;