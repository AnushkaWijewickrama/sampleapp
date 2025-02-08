
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_API_URL } from "../../util/common-util";
import { useNavigate } from "react-router-dom";

const User = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const deleteUser = (userId) => {

        const isConfirmed = window.confirm("Are you sure you want to delete this user?");
        if (isConfirmed) {
            axios.delete(SERVER_API_URL + `/api/user/${userId}`)
                .then(response => {
                    setUsers(users.filter((user) => user.id !== userId));
                })
                .catch(error => {
                    console.error(error);
                });

        }

    };

    useEffect(() => {
        axios
            .get(SERVER_API_URL + '/api/user') // Sample API
            .then((response) => {
                setUsers(response.data); // Store API response in state
                setLoading(false);
            })
            .catch((error) => {
                setError("Failed to fetch data"); // Handle errors
                setLoading(false);
            });
    }, []);

    return (
        <div className="container mt-4">
            <button type="button" className="btn btn-primary mb-3" onClick={() => navigate("/add-user")}>Add User</button>
            <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td ><button type="button" className="btn btn-success" onClick={() => navigate(`/add-user?id=${encodeURIComponent(user.id)}`)}>Update User</button></td>
                                <td ><button type="button" className="btn btn-danger" onClick={() => deleteUser(user.id)}>Delete User</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default User;