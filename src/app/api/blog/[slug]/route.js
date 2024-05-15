import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

// Api Route Next 14 example 

export const GET = async (request, {params}) =>{
    const {slug} = params;
    console.log(params)

    try {

        connectToDb();

        const post = await Post.findOne({slug});
        return NextResponse.json(post);
    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch the post!');
    }
}
