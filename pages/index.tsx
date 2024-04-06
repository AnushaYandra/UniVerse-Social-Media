import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';


export default function index() {
  const router = useRouter();

  const handleClick=()=> {

    toast('Welcome to UniVerse!', {
      icon: '💜',
    });

    router.push('/username');
  }


  return (
    <div>
      <Toaster />
      <main>
        <div>
          <div className='bg-cover bg-center h-screen  flex items-center justify-center '  style={{ backgroundImage: 'url("https://images.hdqwalls.com/download/better-without-you-jl-1920x1080.jpg")' }}>
              <button className='text-5xl flex items-center font-semibold hover:text-white text-white bg-white bg-opacity-5 p-9 hover:bg-opacity-40  shadow-xl rounded-xl transition-transform duration-150 ease-out hover:scale-125' onClick={handleClick}>
              Enter the UniVerse ⚝
              </button>
              
          </div>
        </div>

        
      </main>
    </div>
  )
}


