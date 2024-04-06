
import { Post } from "@/typings";

export const fetchPosts = async () => {
    try {
        const baseUrl = process.env.SANITY_PUBLIC_BASE_URL || 'http://localhost:3000/';
        const res = await fetch(`${baseUrl}/api/getPosts`);


        if (!res.ok) {
            throw new Error('Failed to fetch posts');
        }

        const data = await res.json();
        const posts: Post[] = data.posts;

        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error; // Rethrow the error to handle it in the caller
    }
};




