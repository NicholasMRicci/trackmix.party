import { getUser } from "../Client/client";
import { useParams } from "react-router";
import { User } from "./reducer";
import { useEffect, useState } from "react";
import PostList from "../Post/list";

export function OtherProfile() {
    const { id } = useParams();
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        getUser(id!).then((user) => {
            setUser(user);
        })
    }, []);
    return (
        <div>
            {user &&
                <>
                    <h4>Username: {user.username}</h4>
                    <hr></hr>
                    <p>They have liked {user.songLikes?.length || 0} songs</p>
                    <hr></hr>
                    <PostList posts={user.posts} showUser={false} />
                </>
            }
        </div >

    );
}