import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Students from './Pages/Students';
import AddStudents from './Pages/AddStudents';
import EditStudents from './Pages/EditStudent';
function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
        <Route path="/" element={<Home/>} />
          <Route path="/students" element={<Students/>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/students/add" element={<AddStudents />} />
          <Route path="/students/edit/:id" element={<EditStudents/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
