import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

// Api Route Next 14 example 

export const GET = async () =>{
    try {

        connectToDb();

        const posts = await Post.find();
        return NextResponse.json(posts);
    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch the posts!');
    }
}

export const DELETE = async (request, {params}) =>{
    const {slug} = params;
    console.log(params)

    try {

        connectToDb();

        const post = await Post.deletOne({slug});
        return NextResponse.json('Post Deleted');
    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch the post!');
    }
}