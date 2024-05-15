"use client";

import React from "react";
import styles from "./adminPostForm.module.css";
import { addPost } from "@/lib/action";
import { useFormState } from "react-dom";

const AdminPostForm = ({ userId }) => {
  const [state, formAction] = useFormState(addPost, undefined);

  return (
    <form action={formAction} className={styles.container}>
      <h1>Add New Post</h1>
      <input type="hidden" name="userId" value={userId}></input>
      <input type="text" name="title" placeholder="Title"></input>
      <input type="text" name="slug" placeholder="slug"></input>
      <input type="text" name="img" placeholder="img"></input>
      <textarea type="text" name="desc" rows={10} placeholder="desc"></textarea>
      <button>Create post</button>
      {state && state.error}
    </form>
  );
};

export default AdminPostForm;
