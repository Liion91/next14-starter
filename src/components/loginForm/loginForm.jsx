"use client";

import React from "react";
// import { useEffect } from "react";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import { login } from "@/lib/action";
// import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);

  // const router = useRouter();
  // useEffect(() => {
  //   state?.success && router.push("/");
  // }, [state?.success, router]);

  return (
    <form action={formAction} className={styles.form}>
      <input type="text" placeholder="username" name="username"></input>
      <input type="password" placeholder="password" name="password"></input>
      <button>Login</button>
      {state?.error}
      <Link href={"/register"}>
        {"Don't have an account?"} <b>Regitìster</b>
      </Link>
    </form>
  );
};

export default LoginForm;
