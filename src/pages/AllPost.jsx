import React from 'react'
import { useState, useEffect } from 'react'
import appwriteService from "../appwrite/config"
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux'

const AllPost = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    const authStatus = useSelector((state => state.auth.status))

    useEffect(() => {
        setLoading(true)
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    if (loading) {
        return (
            <div className='w-full py-16 text-center'>
                <Container>
                    <div className='text-white text-xl'>
                        Loading Posts...
                    </div>
                </Container>
            </div>
        )
    }

    if (!authStatus) {
        return (
            <div className='w-full py-16 text-center'>
                <Container>
                    <div className='text-white text-xl'>
                        Please login to view all posts
                    </div>
                </Container>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className='w-full py-16 text-center'>
                <Container>
                    <div className='text-white text-xl'>
                        No post found. Create your first post!
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8 min-h-screen bg-gradient-to-b from-[#0A2647] to-[#144272]'>
            <Container>
                <h1 className='text-3xl md:text-4xl font-bold text-white mb-8 text-center'>
                    All Posts
                </h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {posts.map((post) => (
                        <div
                            key={post.$id}
                            className='w-full h-full'
                        >
                            <PostCard
                                {...post}
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPost
