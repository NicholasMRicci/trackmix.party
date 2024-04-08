import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Post } from "./reducer";
import store from "../store";
import { deletePost } from "./reducer";
import { sendDeletePost } from "../Client/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function PostCard(props: { post: Post }) {
    const profile = useSelector((state: RootState) => state.profileReducer.profile);
    const handleDelete = () => {
        sendDeletePost(props.post._id).then(() => {
            store.dispatch(deletePost(props.post._id));
        })
    };
    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h4 className=""><FontAwesomeIcon fill="solid" color="black" icon={faUser} /> {props.post.user.username}</h4>
                    <div className="">
                        {profile._id
                            && profile._id === props.post.user._id
                            && <button onClick={handleDelete} className="btn btn-danger">Delete</button>}
                    </div>
                </div>
                <hr></hr>

                {/* <p className="position-absolute top-0 start-0 m-2">{props.post.user_id}</p> */}
                <h5 className="card-title">{props.post.title}</h5>
                <p className="card-text">{props.post.description}</p>

            </div>

        </div>

    );
}

export default PostCard;