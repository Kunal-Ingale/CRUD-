import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditStudent() {
    const nav = useNavigate();
    const { id } = useParams();

    const [inputError, setInputError] = useState({});
    const [student, setStudent] = useState({
        name: '',
        course: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/students/${id}`)
            .then(res => {
                setStudent(res.data.student); // Ensure API returns `{ student: {...} }`
            })
            .catch(error => console.error("Error fetching student:", error));
    }, [id]);

    const saveStudent = (e) => {
        e.preventDefault();
        const data = {
            name: student.name,
            course: student.course,
            email: student.email,
            phone: student.phone,
        };

        axios.put(`http://127.0.0.1:8000/api/students/edit/${id}`, data)
            .then(res => {
                alert(res.data.message);
                nav('/');
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    setInputError(error.response.data.errors);
                }
            });
    };

    const handleInput = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Edit Student
                                <Link to="/students" className="btn btn-primary float-end">Back</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={saveStudent}>
                                <div className="form-group row mb-2">
                                    <label className="col-sm-2 col-form-label">Name</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" name="name" value={student.name} onChange={handleInput} placeholder="Name" />
                                        <span className="text-danger">{inputError.name}</span>
                                    </div>
                                </div>

                                <div className="form-group row mb-2">
                                    <label className="col-sm-2 col-form-label">Course</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" name="course" value={student.course} onChange={handleInput} placeholder="Course" />
                                        <span className="text-danger">{inputError.course}</span>
                                    </div>
                                </div>

                                <div className="form-group row mb-2">
                                    <label className="col-sm-2 col-form-label">Email</label>
                                    <div className="col-sm-10">
                                        <input type="email" className="form-control" name="email" value={student.email} onChange={handleInput} placeholder="Email" />
                                        <span className="text-danger">{inputError.email}</span>
                                    </div>
                                </div>

                                <div className="form-group row mb-2">
                                    <label className="col-sm-2 col-form-label">Phone</label>
                                    <div className="col-sm-10">
                                        <input type="number" className="form-control" name="phone" value={student.phone} onChange={handleInput} placeholder="Phone" />
                                        <span className="text-danger">{inputError.phone}</span>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <button type="submit" className="btn btn-primary p-2 mt-5">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditStudent;
