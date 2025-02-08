import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { SERVER_API_URL } from "../../util/common-util";

const AddUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const navigate = useNavigate();
    // Retrieve query parameters
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get("id");  // Get the 'id' parameter

    const handleSubmit = (e) => {
        e?.preventDefault();
        if (!userId) {

            axios.post(SERVER_API_URL + '/api/user', {
                name: name,
                email: email
            })
                .then((response) => {
                    console.log(response);
                    // Navigate back to user list
                    navigate("/");
                    console.log(response)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            axios.put(SERVER_API_URL + `/api/user/${userId}`, {
                name: name,
                email: email
            })
                .then(response => {
                    navigate("/");
                })
                .catch(error => {
                    // Handle errors
                });

        }




    };
    useEffect(() => {
        if (userId) {
            setTitle('Update')
            axios.get(SERVER_API_URL + `/api/user/${userId}`)
                .then(response => {
                    // Handle the response
                    const userdata = response.data[0]
                    setEmail(userdata.email)
                    setName(userdata.name)
                })
                .catch(error => {
                    // Handle errors
                });
        }
        else {
            setTitle('Create')
        }
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">{title} New User</h2>
            <form className="p-4 border rounded shadow" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success">Save User</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/")}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default AddUser;

