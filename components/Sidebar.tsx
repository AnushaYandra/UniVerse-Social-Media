import React, { useState } from "react"
import SidebarRow from "./SidebarRow"
import { BellIcon, BookmarkIcon, EllipsisHorizontalCircleIcon, EnvelopeIcon, HashtagIcon, HomeIcon, QueueListIcon, UserIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/router";

interface Props {
  username: string,
  college: string;
}

function Sidebar({username, college}: Props) {

  const router = useRouter();
  const[BoxIsOpen, setBoxIsOpen] = useState<boolean>(false)
  
  const handleAbout =() => {
    router.push({
      pathname: '/about',
      query: {username, college}, // Include the state as a query parameter
    });
  }

  const handleNo = () => {
    setBoxIsOpen(false)
  }

  const handleYes = () => {
    localStorage.removeItem('token');
    router.push('/')
  }

  const handleProfile =() => {
    router.push({
      pathname: '/profile',
      query: {username, college}, // Include the state as a query parameter
    });
  }

  const handleHome =() => {
    router.push({
      pathname: '/home',
      query: {username, college}, // Include the state as a query parameter
    });
  }

  return (
    <div className="flex flex-col h-screen col-span-2 px-4 items-center  md:items-start bg-purple-50">
     <div className="flex flex-col justify-between">
      <div className="flex items-center text-purple-400 font-semibold mt-2">
        <img className="m-3 ml-1 h-7 w-7 cursor-pointer " src="https://cdn-icons-png.flaticon.com/512/9104/9104104.png" alt="" />
        <h1 className=" hidden cursor-pointer text-xl  font-bold md:inline-flex">UniVerse 𐙚</h1>
      </div>

      <div onClick={handleHome}>
      <SidebarRow Icon={HomeIcon} title="Home"/>
      </div>

      <div onClick={handleAbout}>
        <SidebarRow Icon={HashtagIcon} title="About"/>
      </div>

      <div onClick={handleProfile}>
        <SidebarRow Icon={UserIcon} title="Profile"/>
      </div>

      <div onClick={()=> setBoxIsOpen(!BoxIsOpen)}>
        <SidebarRow Icon={BookmarkIcon} title="Log Out" />
      </div>

      {BoxIsOpen && (
       <div className="bg-white rounded-lg p-4 flex flex-col mt-3">
         <h1 className="text-purple-500 font-semibold pb-3">Do you want to Log out?</h1>

         <div className="flex justify-evenly">
          <button className="bg-purple-100 p-2 rounded-xl pl-4 pr-4 hover:bg-purple-300" onClick={handleYes}>Yes</button>
          <button className="bg-purple-100 p-2 rounded-xl pl-4 pr-4 hover:bg-purple-300" onClick={handleNo}>No</button>
         </div>

       </div>
      )}
     </div>

     <div className="mt-auto">
      <img className="opacity-50 mb-4"
      src="../images/—Pngtree—abstract line drawing girl celebrating_6449391.png"></img>
     </div>

    </div>
  )
}


































































export default Sidebar
