import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


function AddStudents() {

    const nav = useNavigate();
    const [inputError, setInputError] = useState({})
    const [student, setStudent] = useState({
        name: '',
        course: '',
        email: '',
        phone: ''
    })

    const saveStudent = (e) => {
        e.preventDefault();
        const data = {
            name: student.name,
            course: student.course,
            email: student.email,
            phone: student.phone,
        }

        axios.post(`http://127.0.0.1:8000/api/students`, data)
            .then(res => {
                alert(res.data.message);
                nav('/')
            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status == 422) {
                        setInputError(error.response.data.errors);
                    }
                }
                if (error.response) {
                    if (error.response.status == 422) {
                        setInputError(error.response.data.errors);
                    }
                }
            })
    }
    const handleInput = (e) => {
        e.persist();
        setStudent({ ...student, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <div className='Container mt-5'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='card'>
                            <div className='card-header'>
                                <h4>Add Student
                                    < Link to="/students" className='btn btn-primary float-end'>Back</Link>
                                </h4>
                            </div>
                            <div className='card-body'>

                                <form onSubmit={saveStudent}>
                                    <div className="form-group row mb-2">
                                        <label for="inputPassword" className="col-sm-2 col-form-label">Name</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" value={student.name} name='name' placeholder="Name"
                                                onChange={handleInput} />
                                            <span className='text-danger'>{inputError.name}</span>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-2">
                                        <label for="course" className="col-sm-2 col-form-label">Course</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" name="course" value={student.course} id="inputPassword" placeholder="Course" onChange={handleInput} />
                                            <span className='text-danger'>{inputError.course}</span>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-2">
                                        <label for="email" className="col-sm-2 col-form-label">Email</label>
                                        <div className="col-sm-10">
                                            <input type="email" className="form-control" value={student.email} name='email' placeholder="Email" onChange={handleInput} />
                                            <span className='text-danger'>{inputError.email}</span>
                                        </div>

                                        <div className="form-group row mt-2">
                                            <label for="phone" className="col-sm-2 col-form-label">Phone</label>
                                            <div className="col-sm-10">
                                                <input type="number" className="form-control" value={student.phone} name='phone' placeholder="Phone" onChange={handleInput} />
                                                <span className='text-danger'>{inputError.phone}</span>
                                            </div>
                                        </div>

                                        <div className='mb-3'>
                                            <button type='submit' className='btn btn-primary p-2 mt-5 '>Add</button>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddStudents
