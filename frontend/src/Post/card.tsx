import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Post } from "./list";
import store from "../store";
import { deletePost } from "./reducer";
import { sendDeletePost } from "../Client/client";

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
                <h5 className="card-title">{props.post.title}</h5>
                <p className="card-text">{props.post.description}</p>
            </div>
            {profile._id
                && profile._id === props.post.user_id
                && <button onClick={handleDelete} className="btn btn-danger position-absolute top-0 end-0 m-2">Delete</button>}
        </div>
    );
}

export default PostCard;