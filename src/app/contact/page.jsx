import React from "react";
import Image from "next/image";
import styles from "./contact.module.css";

export const metadata = {
  title: 'Contact Page',
  description: 'Contact Description',
}

const ContactPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src={"/contact.png"} fill className={styles.img} alt=""></Image>
      </div>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <input type="text" placeholder="Name and Surname"></input>
          <input type="text" placeholder="Email Address"></input>
          <input type="text" placeholder="Phone Number (Optional)"></input>
          <textarea
            placeholder="Message"
            id=""
            name=""
            cols={30}
            rows={10}
          ></textarea>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
