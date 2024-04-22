import PostCard from "./card";
import { Post } from "./reducer";

function PostList(props: { posts: Post[] }) {
    return (
        <div>
            <h1>Posts</h1>
            <div className="row justify-content-center">
                <ul className="list-group list-group-flush">
                    {props.posts.toSorted((post1: Post, post2: Post) => {
                        return post2.date.localeCompare(post1.date);
                    }).map((post: Post) => {
                        return (<li className="list-group-item" key={post._id}>
                            <PostCard post={post} />
                        </li>)
                    })}
                </ul>
            </div>


        </div>
    )
}

export default PostList;