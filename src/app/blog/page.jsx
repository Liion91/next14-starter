import React from "react";
import styles from "./blog.module.css";
import PostCard from "@/components/postCard/PostCard";

// FETCH DATA WITH AN API ROUTES
// Call the GET method inside route.js file of api/blog folder
const getData = async () => {
  const res = await fetch("http://localhost:3000/api/blog", {next: {revalidate: 3600}}); // renew call everyone 1h 

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

const BlogPage = async () => {

  const posts = await getData();

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post._id}>
          <PostCard post={post}/>
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
