import { addPost, deletePost } from "@/lib/action";
import React from "react";

const ServerActionTestPage = () => {
  return (
    <div>
      <form action={addPost}>
        <input type="text" placeholder="title" name="title"></input>
        <input type="text" placeholder="desc" name="desc"></input>
        <input type="text" placeholder="slug" name="slug"></input>
        <input type="text" placeholder="userId" name="userId"></input>
        <button>Create</button>
      </form>

      <form action={deletePost}>
        <input type="text" placeholder="Post id" name="id"></input>
        <button>Delete</button>
      </form>

    </div>
  );
};

export default ServerActionTestPage;
