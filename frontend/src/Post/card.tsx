import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Post } from "./reducer";
import store from "../store";
import { deletePost } from "./reducer";
import { sendDeletePost } from "../Client/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function PostCard(props: { post: Post, showUser: boolean }) {
    const user = useSelector((state: RootState) => state.profileReducer.user);
    const handleDelete = () => {
        sendDeletePost(props.post._id).then(() => {
            store.dispatch(deletePost(props.post._id));
        })
    };
    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <div>
                        {
                            props.showUser && <Link to={"/profile/" + props.post.user._id}>
                                <button className="btn btn-primary">
                                    <h5><FontAwesomeIcon fill="solid" color="black" icon={faUser} /> {props.post.user.username}</h5>
                                </button>
                            </Link>
                        }
                    </div>
                    <div>
                        <Link to={`/post/${props.post._id}`} className="btn btn-primary me-1">View</Link>
                        {user
                            && (user._id === props.post.user._id || user.role === "admin")
                            && <button onClick={handleDelete} className="btn btn-danger">Delete</button>}
                    </div>
                </div>
                <hr></hr>

                <h5 className="card-title">{props.post.title}</h5>
                <p className="card-text">{props.post.description}</p>

            </div>

        </div>

    );
}

export default PostCard;