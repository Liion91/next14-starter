import React from "react";
import styles from "./postuser.module.css";
import { getUser } from "@/lib/data";
import Image from "next/image";

// FETCH DATA WITH AN API
// const getData = async (id) => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {cache: 'no-store'});

//   if (!res.ok) {
//     throw new Error("Something went wrong");
//   }

//   return res.json();
// };

const PostUser = async ({ id }) => {
  // FETCH DATA WITH AN API
  // const user = await getData(id);

  const user = await getUser(id);

  return (
    <div className={styles.container}>
      <Image
        className={styles.avatar}
        src={user.img ? usr.img : "/noavatar.png"}
        width={50}
        height={50}
        alt=""
      ></Image>
      <div className={styles.texts}>
        <span className={styles.title}>Author</span>
        <span className={styles.username}>{user.username}</span>
      </div>
    </div>
  );
};

export default PostUser;
