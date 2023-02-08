import Navbar from '@/components/Navbar'
import { GetStaticProps } from 'next'
import React, { Children } from 'react'
import PortableText from 'react-portable-text'
import {sanityClient,urlFor} from "sanity.js"
import { Post } from 'typings'
interface Props{
    post:Post;
}
function Post({post}:Props) {
  return (
    <div>
      <Navbar />
      <img className='w-full h-60 object-cover' src={urlFor(post.mainImage).url()!}/>
      <article className='mt-2 max-w-3xl mx-auto'>
        <h1 className='text-3xl p-4'>{post.title}</h1>
        <div className='flex items-center space-x-2 px-4 py-2'>
            <img className='h-10 w-10 rounded-full oject-cover' src={urlFor(post.author.image).url()!} />
            <p>Blog Post by<span className='text-green-400'> {post.author.name}</span> -Published at {new Date(post._createdAt).toLocaleString()}</p>
        </div>
<div className='m-4'>
    <PortableText 
        className='' 
        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
        content={post.body}
        serializers={
            {
                h1:(props:any) =>{
                    <h1 className='text-2xl font-bold my-5'>{...props}</h1>
                },
                h2:(props:any) =>{
                    <h1 className='text-xl font-bold my-5'>{...props}</h1>
                },
                li:({Children}:any) =>{
                    <h1 className='ml-4 list-disc'>{Children}</h1>
                },
                link:({href,children}:any) =>{
                    <a href={href} className="text-blue-500 hover:underline">{children}</a>
                }
            }
           
        }
        />

</div>
      </article>
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
