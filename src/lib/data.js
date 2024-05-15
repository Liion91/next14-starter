import { Post, User } from "./models";
import { connectToDb } from "./utils";
import {unstable_noStore as noStore} from 'next/cache';

// FAKE DATA FOR SIMULATE FETCH
// const users = [
//     { id: 1, name: 'John', username: 'User 1' },
//     { id: 2, name: 'Jane', username: 'User 2' },
//     { id: 3, name: 'Jane', username: 'User 3' },
//     { id: 4, name: 'Jane', username: 'User 4' },
//     { id: 5, name: 'Jane', username: 'User 5' }
// ]

// const posts = [
//     { id: 1, title: 'Post 1', body: '...body 1', userId: 1 },
//     { id: 2, title: 'Post 2', body: '...body 2', userId: 2 },
//     { id: 3, title: 'Post 3', body: '...body 3', userId: 3 },
//     { id: 4, title: 'Post 4', body: '...body 4', userId: 3 },
//     { id: 5, title: 'Post 5', body: '...body 5', userId: 3 }
// ]

export const getPosts = async () => {
    try {
        connectToDb();
        const posts = await Post.find();
        return posts;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch posts!");
    }
};

export const getPost = async (slug) => {
    try {
        noStore(); // disable cache into Next fetch
        connectToDb();
        const post = await Post.findOne({ slug });
        return post;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch post!");
    }
};

export const getUser = async (id) => {
    // noStore();
    try {
        connectToDb();
        const user = await User.findById(id);
        return user;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch user!");
    }
};

export const getUsers = async () => {
    try {
        connectToDb();
        const users = await User.find();
        return users;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch users!");
    }
};