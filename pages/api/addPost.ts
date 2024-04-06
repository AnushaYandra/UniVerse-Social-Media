import { PostBody } from '@/typings'
import type {NextApiRequest, NextApiResponse} from 'next'

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
){

    const data: PostBody = JSON.parse(req.body)
    
    const mutations = {
        mutations: [
            {
                create: {
                    _type:'post',
                    text: data.text,
                    username: data.username,
                    profileImg: data.profileImg,
                    image: data.image,
                    college: data.college,
                },
            },
        ],
    };

    const apiEndpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;

    const result = await fetch(apiEndpoint, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
        },
        body: JSON.stringify(mutations),
        method: "POST",
      });
    
      const json = await result.json();

    res.status(200).json({name: "Added" })
}