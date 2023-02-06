import Navbar from '@/components/Navbar'
import { GetStaticProps } from 'next'
import React from 'react'
import {sanityClient,urlFor} from "sanity.js"
import { Post } from 'typings'
interface Props{
    post:Post;
}
function Post({post}:Props) {
  return (
    <div>
      <Navbar />
      <img src={urlFor(post.mainImage).url()!}/>
    </div>
  )
}

export default Post

export const getStaticPaths = async ()=>{
    const query=`
    *[_type=="post"]{
        _id,
      
        slug{
            current
        }
      }`;
    const posts  = await sanityClient.fetch(query)
    const paths = posts.map(function(post:Post){
        return(
        {params:{
                slug:post.slug.current
            }}
        )
        })
        return{
            paths,
            fallback:'blocking'
        }

        
}
export const getStaticProps:GetStaticProps=async({params})=>{
    const query= `
    *[_type=="post" && slug.current == 'my-first-post'][0]{
        _id,
        _createdAt,
        title,
        slug,
        author ->{
          name,
          image
        },
          mainImage,
          slug,
          body,
          'comments':*[
          _type == "comment"&&
          post._ref == ^._id &&
          approved == true],
      }
    `
    const post = await sanityClient.fetch(query,{
        slug:params?.slug,
    })
    if(!post){
        return{
        notfound:true,
        props:{}
     }}

     return{
         props:{post,},
         revalidate:60,
     }
}
