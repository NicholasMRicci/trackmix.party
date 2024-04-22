import { useSelector } from "react-redux";
import PostList from "../Post/list";
import store, { RootState } from "../store";
import { useEffect } from "react";
import { getPosts } from "../Client/client";
import { Post, setPosts } from "../Post/reducer";

function Home() {
    const user = useSelector((state: RootState) => state.profileReducer.user);
    const posts = useSelector((state: RootState) => state.postReducer.posts);
    useEffect(() => {
        getPosts().then((posts: Post[]) => store.dispatch(setPosts(posts)));
    }, []);
    return (
        <div className="Home">
            <br></br>
            {user && <>
                <h3>Welcome {user.username}</h3>
                <h5>You have made {user?.posts.length} post{(user?.posts.length > 1 || user?.posts.length) === 0 && "s"}</h5>
                {user.posts.length > 0 && <h5>Latest Post Title: {user?.posts[user.posts.length - 1].title}</h5>}
            </>}
            <PostList posts={posts} />
        </div>
    );
}

export default Home;