"use server"
// if there are more functions that would be executed on server side 
// we could write only once on the top file for tell to Next that all functions 
// must be run on the server side 

import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from "bcrypt";

// prevState it is for can see returned errors inside the page  
export const addPost = async (prevState, formData) => {

    // all the server side functions must be async
    // they will be executed only on the server side
    // 'use server'

    const { title, desc, slug, userId } = Object.fromEntries(formData)

    try {
        connectToDb();
        const newPost = new Post({
            title,
            desc,
            slug,
            userId
        })
        await newPost.save();
        console.log('saved to Db')

        // tell to Next to re run the fetch & don't use the cached data
        revalidatePath('/blog');
        revalidatePath('/admin');
    } catch (error) {
        console.log(error)
        return { error: 'Something went wrong' }
    }

}

export const deletePost = async (formData) => {

    const { id } = Object.fromEntries(formData)
    try {
        connectToDb();

        await Post.findByIdAndDelete(id);
        console.log('removed from Db')

        revalidatePath('/blog');
        revalidatePath('/admin');
    } catch (error) {
        console.log(error)
        return { error: 'Something went wrong' }
    }
}

export const addUser = async (prevState, formData) => {

    const { username, email, password, img } = Object.fromEntries(formData)

    try {
        connectToDb();
        const newUser = new User({
            username, email, password, img
        })

        await newUser.save();
        console.log('saved to Db')

        revalidatePath('/admin');
    } catch (error) {
        console.log(error)
        return { error: 'Something went wrong' }
    }
}

export const deleteUser = async (formData) => {

    const { id } = Object.fromEntries(formData)
    try {
        connectToDb();

        await Post.deleteMany({ userId: id });
        await User.findByIdAndDelete(id);
        console.log('removed from Db')

        revalidatePath('/admin');
    } catch (error) {
        console.log(error)
        return { error: 'Something went wrong' }
    }
}

export const handleGithubLogin = async () => {
    // "use server";
    await signIn("github");
};

export const handleLogout = async () => {
    // "use server";
    await signOut();
};

export const register = async (prevState, formData) => {
    const { username, email, password, passwordRepeat, img } = Object.fromEntries(formData);

    if (password !== passwordRepeat) {
        return { error: 'Password do not match!' }
    }

    try {
        connectToDb();

        const user = await User.findOne({ username });

        if (user) {
            return { error: 'Username already exists' }
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            img,
        });
        await newUser.save();
        console.log('saved to db!')
        return { success: true }
    } catch (error) {
        console.log(error)
        return { error: 'Something went wrong!' };
    }
};

export const login = async (prevState, formData) => {
    const { username, password } = Object.fromEntries(formData);

    try {
        await signIn('credentials', { username, password })

    } catch (error) {
        // console.log(error)

        if (error.message.includes('CredentialsSignin')) {
            return { error: 'Wrong username or password' };
        }
        // return { error: 'Something went wrong!' };  
        // next in caso di success effettua un redirect e lancia un eccezzione
        // per evitare di effettuare il catch dell'eccezione dovuta al redirect
        // deve essere lanciato un error 
        // e non tornato un oggetto contenete un error 
        // così viene lanciato solamente in caso di errore effettivo 

        throw error
    }
};