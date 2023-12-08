import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { Link } from 'react-router-dom';
import { useStateContext } from '../components/contexts/ContextProvider';






const Users = () => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const { setNotification } = useStateContext();


    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        setLoading(true);
        axiosClient.get('/users')
            .then(({ data }) => {
                setLoading(false);
                console.log(data);
                setUsers(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const onDelete = (user) => {

        // ako ne e prifateno ova da ne retirectira na 
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return
        }

        axiosClient.delete(`/users/${user.id}`)
            .then(() => {
                //TODO show notification
                setNotification("User was succesfully deleted")
                getUsers(); // ke gi pokaze pak site useri 

            })

    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>
                    Users
                </h1>
                <Link to="/users/new" className='btn-add'> Add new</Link>
            </div>
            <div className='card animated fadeInDown'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading &&
                        <tbody>
                            <tr>
                                <td colSpan="5" className='text-center'></td>
                                Loading....
                            </tr>
                        </tbody>
                    }
                    {!loading && <tbody>
                        {users.map(u => (
                            <tr>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.created_at}</td>
                                <td>
                                    <Link to={'/users/' + u.id} className='btn-edit'>Edit</Link>
                                    &nbsp;
                                    <button onClick={ev => onDelete(u)} className='btn-delete'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    }
                    <button>2</button>
                </table>

            </div>


        </div>
    )
}

export default Users