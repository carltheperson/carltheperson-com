import React from 'react'
import matter from 'gray-matter'
import ReactMarkdown from "react-markdown"
import { Header } from '../../components/Header'
import { Email } from '../../components/Email'

function PostTemplate({ data }) {

    if (data == null) {
        return (
            <div>
                <Header/>
                <p>
                    You're not supposed to see this... The post can't be found
                </p>
                <h1>
                    404
                </h1>
            </div>
        )
    }
    
    const metaData = data.data
    return (
        <div className={"reader "} >
        <Header/>
        <h1>{metaData.title}</h1>
        <p>Date: {metaData.date}</p>
        <hr/>
        <ReactMarkdown source={data.content}/>
        <hr/>

        <p style={{textAlign: "center"}}>Follow me on <a href="https://twitter.com/carltheperson">Twitter</a></p>
        <Email center={true}/>
    </div>
  )
}

export async function getStaticPaths() {
    const posts = process.env.posts

    const paths = posts.map((post) => ({
        params: {post: post.urlName}
    }))

    return {paths, fallback: false}    
}

export async function getStaticProps({params}) {
    const post = params.post
    
    let content = undefined
    try {
      content = await import(`../../content/${post}.md`)
    } catch {
       const data = null
      return { data }
    }
    const data = matter(content.default)

    delete data.orig // Unparseable and unneeded field
    
    return {props: { data }}
    
}


export default PostTemplate
