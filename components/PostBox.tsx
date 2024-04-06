"use client"; 
import { Post, PostBody } from '@/typings';
import { fetchPosts } from '@/utils/fetchPosts';
import { CalendarIcon, FaceSmileIcon, MagnifyingGlassCircleIcon, MapPinIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import useFetch from '../hooks/fetch.hook.js';
import {useAuthStore} from '../store/store.js';
import convertToBase from '../helper/convert';

interface Props{
  setPosts: Dispatch<SetStateAction<Post[]>>
}

function TweetBox({setPosts}: Props) {

    const router = useRouter();
    const [input, setInput] = useState('');
    const [image, setImage] = useState('');

    const { username } = useAuthStore(state => state.auth)
    const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)


    const imageInputRef = useRef<HTMLInputElement>(null)
    const[imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false);

  
    const imageBox = async () => {
      setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)
      console.log(imageUrlBoxIsOpen)
    }

    const onUpload = async e => {
      const base64= await convertToBase(e.target.files[0]);
      setImage(base64);
      //console.log(image)
  }

    const postPost = async () => {
      const postInfo: PostBody = {
        text: input,
        username: username ? (username as string) : 'Unknown User',
        profileImg:apiData? apiData.profileImg : 'https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png',
        image: image,
        college: apiData? apiData.college : '',
      }

      const result = await fetch(`/api/addPost`, {
        body: JSON.stringify(postInfo),
        method: 'POST'
      })

      const json = await result.json();

      const newPosts = await fetchPosts();
      setPosts(newPosts);
      
      toast.success('Posted!')

      return json
    }


    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
      e.preventDefault();

      postPost();

      setInput('')
      setImage('')
      setImageUrlBoxIsOpen(false)
    }

  return (
    <div className='flex space-x-2 p-5 pt-0 hover:bg-purple-50'>

      {<img className='h-10 w-10 mt-4 rounded-full object-cover' 
      src={apiData?.profileImg || "../images/a.jpg"} alt=''/> }

      <div className='flex flex-1 items-center pl-2 '>
        <form className='flex flex-1 flex-col'>
            <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type='text' 
            placeholder="What's Happening?"
            className='outline-none h-20 w-full bg-transparent'/>

            {image && (
              <img className='mt-1 h-40 w-full rounded-xl object-contain shadow-lg' src={image} alt=''/>
            )}


            <div className='flex items-center'>
                <div className='flex flex-1 space-x-3 text-purple-400'>{/*Icons*/}
                     <PhotoIcon onClick={(imageBox)} className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150'/>
                     <MagnifyingGlassCircleIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150'/>
                     <FaceSmileIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150'/>
                     <CalendarIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150'/>
                     <MapPinIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150'/>
                </div>

                <button onClick={handleSubmit}
                disabled={!input} className='bg-purple-400 px-4 py-2 font-bold text-white rounded-full disabled:opacity-50'>Post ♡ </button>
            </div>

            {imageUrlBoxIsOpen && (
              <div className='flex items-center'>
                <input onChange={onUpload} type="file" className='flex-1 mt-2 file:p-2 file:px-4 file:mx-2 file:rounded-full text-gray-900 cursor-pointer hover:file:bg-purple-300 file:bg-purple-200 file:border-0 '/>
              </div>
            )}


        </form>
      </div>
    </div>


  )
}

export default TweetBox

