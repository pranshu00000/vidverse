import React from 'react';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import ImgUploadPage from './components/ImgUploadPage';
import Homepg from './components/Homepg';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path='/img-upload' element={<ImgUploadPage/>}></Route>
                <Route path="/" element={<Homepg />} />
            </Routes>
        </Router>
    );
}

export default App;
