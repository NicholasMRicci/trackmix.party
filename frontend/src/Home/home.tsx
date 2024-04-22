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
        <div className="m-2">
            <h5>
                Welcome to trackmix.party! A music sharing and appreciation platform. Here you can share music you created and search for inspiration with our Search feature.
            </h5>
            <hr></hr>
            <br></br>
            {user && <>
                <h3>Welcome {user.username}</h3>
                <h5>You have made {user?.posts.length} post{(user?.posts.length > 1 || user?.posts.length) === 0 && "s"}</h5>
                {user.posts.length > 0 && <h5>Latest Post Title: {user?.posts[user.posts.length - 1].title}</h5>}
            </>}
            <PostList posts={posts} showUser={true} />
        </div>
    );
}

export default Home;