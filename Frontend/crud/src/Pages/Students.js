import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import axios from 'axios'

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true)

  const nav = useNavigate();
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/students`)
      .then(res => {
        setStudents(res.data.students);
        setLoading(false);
      })
  }, []);

  if (loading) {
    return (<h4>Fetching the data...</h4>)
  }

  const deleteStudent = (id) => {

    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) {
      alert("Deletion cancelled.");
      return; // Exit if the user cancels 
    }
    axios.delete(`http://127.0.0.1:8000/api/students/delete/${id}`)


      .then(res => {
        console.log("Delete Response:", res.data);
        alert(res.data.message);
        setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
        nav('/students');
      })
      .catch(error => {
        console.error("Delete Error:", error.response ? error.response.data : error);
        alert(error.response?.data?.message || "Failed to delete student");
      });
  };

  const studentDetails = students.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.course}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>
          <Link to={`/students/edit/${item.id}`} className='btn btn-success'>Edit</Link>
        </td>
        <td>
          <Link to={`/students/delete/${item.id}`} onClick={(e) => deleteStudent(item.id)} className='btn btn-danger'>Delete</Link>
        </td>
      </tr>
    )
  })

  return (
    <>
      <Navbar />
      <div className='Container mt-5'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header'>
                <h4>Students List
                  < Link to="/students/add" className='btn btn-primary float-end'>Add Student</Link>
                </h4>
              </div>
              <div className='card-body'>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Course</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentDetails}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}

export default Students
