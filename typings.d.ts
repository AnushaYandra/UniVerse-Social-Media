
export interface Post extends PostBody {
    _id: string
    _createdAt: string
    _updatedAt: string
    _rev: string
    _type: 'post'
    blockTweet: boolean
}

export type PostBody = {
    text: string
    username: string
    profileImg: string
    image?: string
    college: college
}

export type CommentBody = {
    comment: string
    username: string
    profileImg: string
    postId: string
}

export interface MyComment extends CommentBody {
    _id: string
    _createdAt: string
    _updatedAt: string
    _rev: string
    _type: 'comment'
    post: {
        _ref: string
        _type: reference
    }
}