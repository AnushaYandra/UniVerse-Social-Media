import { Comment } from "@/typings"

export const fetchComments = async( postId: string)=> {

    const res = await fetch(`/api/getComments?postId=${postId}`)

    const comments: Comment[] = await res.json()

    return comments
}