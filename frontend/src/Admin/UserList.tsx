import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../Client/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const myUser = useSelector((state: RootState) => state.profileReducer.user);
    useEffect(() => {
        getUsers().then((users) => {
            setUsers(users);
            setLoading(false);
        });
    }, [])
    const handleDelete = (userId: string) => {
        deleteUser(userId).then(() => {
            getUsers().then((users) => {
                setUsers(users);
            });
        });
    }
    return (
        <div>
            <h1>Users</h1>
            {loading ? <p>Loading...</p> :
                <ul className="list-group list-group-flush">
                    {users.map((user: any) => (
                        <li className="list-group-item" key={user._id}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <h4 className=""><FontAwesomeIcon fill="solid" color="black" icon={faUser} /> {user.username}</h4>
                                        <div className="">
                                            {user._id !== myUser._id && <button onClick={() => { handleDelete(user._id) }} className="btn btn-danger">Delete</button>}
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <h5 className="card-title">{user.firstName} {user.lastName}</h5>
                                    <p className="card-text">Role: {user.role}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>}
        </div>
    )
}