import React, { useEffect, useState } from "react";
import Database_Service_Object from "../appwrite/data_config";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";

function Allposts() {
  const [posts, setposts] = useState([]);
  useEffect(() => {
    Database_Service_Object.getPosts([]).then((res) => {
      setposts(res.documents);
    });
  }, []);
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div className="p-2 w-1/4" key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Allposts;
