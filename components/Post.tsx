import { CommentBody, MyComment, Post } from '@/typings'
import { fetchComments } from '@/utils/fetchComments';
import { ArrowUpIcon, ArrowsRightLeftIcon, ChatBubbleLeftEllipsisIcon, ChatBubbleLeftRightIcon, HeartIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import TimeAgo from 'react-timeago';
import useFetch from '../hooks/fetch.hook.js';
import {useAuthStore} from '../store/store.js';

interface Props{
    post: Post
}

function Post({post}: Props) {

  const router = useRouter();
  const [comments, setComments] = useState<MyComment[]>([])
  const [liked, setLiked] = useState(false);
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')
  const { username } = useAuthStore(state => state.auth)
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)
  const [likeNumber, setLikeNumber] = useState(() => {
    // Retrieve the like count from localStorage if available, otherwise default to 0
    const storedLikeCount = localStorage.getItem(`likeCount_${post._id}`);
    return storedLikeCount ? parseInt(storedLikeCount) : 0;
  });

  const refreshComments =  async () => {
    const comments: MyComment[] = await fetchComments(post._id)
    setComments(comments);
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      const commentToast = toast.loading('Posting Comment...')

      // Comment logic
      const comment: CommentBody = {
        comment: input,
        postId: post._id,
        username: post.username || 'Unknown User',
        profileImg: post.profileImg || 'https://links.papareact.com/gll',
      }
  
      const result = await fetch(`/api/addComment`, {
        body: JSON.stringify(comment),
        method: 'POST',
      })
      toast.success('Comment Posted!', {
        id: commentToast,
      })
  
      setInput('')
      setCommentBoxVisible(false)
      refreshComments()
    }

  const handleLikes = () =>{
    setLiked(!liked);
   
    if (!liked) {
      setLikeNumber(likeNumber + 1);
      localStorage.setItem(`likeCount_${post._id}`, (likeNumber + 1).toString());
      toast('You purpled a post!', {
        icon: '💜',
      });
    } else {
      setLikeNumber(likeNumber - 1);
      localStorage.setItem(`likeCount_${post._id}`, (likeNumber - 1).toString());
      toast('You unpurpled a post!', {
        icon: '☠︎︎',
      });
    }
  }

 
  useEffect(() => {
    refreshComments();
  }, [])
//<p className='hidden text-sm text-gray-500 sm:inline'>@{post.username.replace(/\s+/g, '').toLowerCase()} ·</p>

  return (
  <div>
    <div className='flex flex-col spaxe-x-3 border-y p-5 border-gray-100'>
     <div className='flex space-x-3'>
         <img src={post.profileImg || 'https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png'}  alt=''
         className='h-10 w-10 rounded-full object-cover'/>

         <div>
              <div className='flex items-center space-x-1'>
                 <p className='mr-1 font-bold'>{post.username}</p>
                 <p>·</p>
                 <TimeAgo 
                 className= "text-sm text-gray-500"
                 date= {post._createdAt}/>
                 <p className='text-sm text-gray-400'>({post.college})</p>
              </div>

              <p className='pt-1'>{post.text}</p>

              {post.image && <img src={post.image} alt=''
              className='m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm'/>}
         </div>
     </div> 

     <div className='flex mt-5 justify-between'>

         <div onClick={() => setCommentBoxVisible(!commentBoxVisible)} 
         className='flex cursor-pointer items-center space-x-3 text-gray-400'>
              <ChatBubbleLeftEllipsisIcon className='h-5 w-5'/>
              <p>{comments.length}</p>
         </div>

         <div className='flex cursor-pointer items-center space-x-3 text-gray-400 '> 
                <HeartIcon onClick={handleLikes} className={`h-5 w-5  ${liked ? 'text-purple-400' : 'text-purple-200'}`} />
                <p>{likeNumber}</p>
         </div>

         <div className='cursor-pointer items-center space-x-3 text-gray-400'>
                <ArrowUpIcon className='h-5 w-5'/>
         </div>
        
     </div>

     {/*COMMENTS*/}
    {commentBoxVisible && (
      <form className='mt-3 flex space-x-3'>
        <input value={input} onChange={e=> setInput(e.target.value)} className='flex-1 rounded-lg bg-gray-100 p-2 outline-none' 
        type='text' placeholder='Write a Comment'/>
        <button disabled={!input}  type='submit'  onClick={handleSubmit} className='bg-purple-400 disabled:bg-purple-200 font-semibold text-white rounded-3xl pl-4 pr-4'>Post ♡ </button>
      </form>
    )}

      {comments?.length>0 && commentBoxVisible && (
         <div className='my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t p-5 border-gray-100 '>
             {comments.map(comment =>(
                <div key={comment._id} className='relative flex space-x-2'>
                    <hr className='absolute left-5 top-10 h-8 border-x border-purple-100'/>
                    <img src={apiData?.profileImg} 
                    className='mt-2 h-7 w-7 object-cover rounded-full' alt=''/>
                    
                    <div>
                        <div className='flex items-center space-x-1'>
                           <p className='mr-1 font-bold'>{apiData?.username}</p>
                           <p className='hidden text-sm text-gray-500 sm:inline'>@{apiData?.username.replace(/\s+/g, '').toLowerCase()} ·</p>
                           <TimeAgo 
                            className= "text-sm text-gray-500"
                            date={comment._createdAt}/>
                         </div>
                         <p>{comment.comment}</p>
                    </div>
                </div>
             ))}
         </div>
      )}
    </div>
  </div>
  )
}

export default Post
