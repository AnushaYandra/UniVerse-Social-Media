"use client";
import { ArrowPathIcon, HomeIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import PostBox from './PostBox'
import { useRouter } from 'next/navigation'
import { Post } from '@/typings';
import PostComponent from '../components/Post'; 
import { fetchPosts } from '@/utils/fetchPosts';
import toast, { Toaster } from 'react-hot-toast';

interface Props {
  posts: Post[];
  college: string;
}

function Feed({posts: postsProp, college}: Props) {

  const router = useRouter();

  const [posts, setPosts]= useState<Post[]>(postsProp || [])
  const [feedSelection, setFeedSelection]= useState("Home")
  
  const handleRefresh = async () => {
    const refreshToast = toast.loading('Refreshing...')

    const posts = await fetchPosts();
    setPosts(posts)

    toast.success('Feed Updated!', { 
      id: refreshToast, 
    })

    console.log(college);
  }

  return (
    
    <div className='col-span-7 lg:col-span-5 border-x max-h-screen overflow-y-scroll scrollbar-hide'>
      <Toaster />
      <div className='flex items-center justify-between mt-2'>
        <select value={feedSelection} onChange={e=> setFeedSelection(e.target.value)}
        className='m-1 p-2 text-xl rounded-full font-bold text-purple-400 bg-purple-100 outline-none '>  
           <option value="Home">Home 𐙚</option>
           <option value="Universe">{college} UniVerse 𐙚</option>
        </select>

        <ArrowPathIcon onClick={handleRefresh} className='mr-5 mt-5 h-6 w-6 cursor-pointer text-purple-400 transition-all 
        duration-500 ease-out hover:rotate-180 active:scale-125'/>
      </div>

     <div>
      <PostBox setPosts={setPosts} />
     </div>

    {/* FEED */}

    <div>
        {feedSelection === "Home" ?
          posts.map(post => (
            <PostComponent key={post._id} post={post} />
          ))
          : 
           posts.filter(post => post.college === college).map(post => (
            <PostComponent key={post._id} post={post} />
          ))
        }
      </div>
    </div>
  )
}

export default Feed
