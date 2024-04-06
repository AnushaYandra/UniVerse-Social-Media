import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

interface UserData {
  "id": string;
  "name": string;
  "password": string;
  "email": string;
  "phone": string;
  "college": string;
  "gender": string;
  "profileImg": string;
}

function about() {

  const router = useRouter();
  const {college, username} = router.query
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/user/' + username);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    if (username) {
      fetchData();
    }
  }, [username]);


  const handleClick=()=> {
    router.push({
      pathname: '/home',
      query: {username, college}, // Include the state as a query parameter
    });
  }


  return (
  
    <div className="bg-cover bg-center h-screen items-center flex flex-col" style={{ backgroundImage: 'url("https://images.hdqwalls.com/download/better-without-you-jl-1920x1080.jpg")' }}>
      <h1 className='text-3xl font-semibold text-white mt-7 p-2 mb-5'>Welcome to UniVerse ⚝</h1>

     <div className='text-md text-purple-400 bg-white bg-opacity-90 p-4 shadow-xl rounded-xl mb-5 hover:bg-purple-100 cursor-pointer'>
       <p className='w-96'>♡ UniVerse is exclusively for students, ensuring a focused and relevant social experience. Only students with valid educational credentials can access the platform, maintaining the integrity of the community.</p>
     </div>

     <div className='text-md text-purple-400 bg-white bg-opacity-90 p-4 shadow-xl rounded-xl mb-5 hover:bg-purple-100 cursor-pointer'>
       <p className='w-96'>♡ UniVerse is designed with students in mind. From the interface to the features, everything is tailored to enhance the student experience. Students can post tweets, share pictures, and update their status to keep their friends informed about their activities, thoughts, and experiences.</p>
     </div>

     <div className='text-md text-purple-400 bg-white bg-opacity-90 p-4 shadow-xl rounded-xl mb-5 hover:bg-purple-100 cursor-pointer'>
       <p className='w-96'>♡ Organize and discover student-led events, workshops, and activities within your campus and beyond. UniVerse provides a platform to promote and participate in various student initiatives.  Expand your network and connect with students from different colleges, majors, and backgrounds. UniVerse breaks down geographical barriers, fostering connections and collaborations.</p>
     </div>

     <button onClick={handleClick} className='text-white text-md rounded-full p-2 hover:bg-white hover:text-purple-400  bg-opacity-90'>Back to Home ♡ </button>
      
    </div>

    
  )
}

export default about
