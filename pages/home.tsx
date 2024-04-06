import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import { Post } from "@/typings";
import { Toaster } from 'react-hot-toast';
import { fetchPosts } from "@/utils/fetchPosts";
import { useRouter } from "next/router";
import useFetch from '../hooks/fetch.hook.js';
import {useAuthStore} from '../store/store.js';

interface Props{
  posts: Post[]
}

export default function home({posts}: Props) {

  const router = useRouter();
  const { username } = useAuthStore(state => state.auth)
  //console.log(username)
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)
  //console.log(apiData)
  

  return (
  <div className="mx-auto lg:max-w-6xl max-h-screen overflow-hidden">
    <Toaster />

    <main className="grid grid-cols-9">
    
    <Sidebar college={apiData?.college} username={username} />

    <Feed posts={posts} college={apiData?.college}/>

    
    <Widgets />
    
    </main>
  </div>
  );
}

export const getServerSideProps = async () =>  {
  const posts = await fetchPosts();
  return {
    props: {
      posts,
    }
  }
}

