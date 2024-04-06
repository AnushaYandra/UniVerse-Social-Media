import React from 'react'
import { Post } from "@/typings";
import PostComponent from '../components/Post'; 
import { useRouter } from "next/router";

interface Props{
  post: Post
}

function enlarge({post}: Props) {{

  const router = useRouter();
  const {username} = router.query

  return (
    <div>    
      
    </div>
  )
}
}

export default enlarge
