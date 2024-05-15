"use client";

import React from "react";
import styles from "./adminUserForm.module.css";
import { addUser } from "@/lib/action";
import { useFormState } from "react-dom";

const AdminUserForm = () => {
  const [state, formAction] = useFormState(addUser, undefined);

  return (
    <form action={formAction} className={styles.container}>
      <h1>Add New User</h1>
      <input type="text" name="username" placeholder="Username"></input>
      <input type="text" name="email" placeholder="Email"></input>
      <input type="password" name="password" placeholder="Password"></input>
      <input type="text" name="img" placeholder="img"></input>
      <select name="isAdmin">
        <option value={false}>IsAdmin?</option>
        <option value={false}>No</option>
        <option value={true}>Yes</option>
      </select>
      <button>Create user</button>
      {state && state.error}
    </form>
  );
};

export default AdminUserForm;
