import React from 'react'
import { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        setLoading(true)
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    const navItems = [
        {
            name: 'Login',
            slug: "/login",
            active: !authStatus
        },
    ]

    if (loading) {
        return (
            <div className='w-full py-16 text-center'>
                <Container>
                    <div className='text-white text-xl'>
                        Loading...
                    </div>
                </Container>
            </div>
        )
    }

    if (posts.length === 0 && authStatus) {
        return (
            <div className='w-full py-16 text-center'>
                <Container>
                    <div className='text-white text-2xl font-bold mb-4'>
                        No posts yet
                    </div>
                    <button
                        onClick={() => navigate('/add-post')}
                        className='px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-bold text-lg transition-colors'
                    >
                        Create Your First Post
                    </button>
                </Container>
            </div>
        )
    }

    if (posts.length === 0 && !authStatus) {
        return (
            <div className='w-full py-16 text-center min-h-[70vh] flex items-center justify-center'>
                <Container>
                    <div className='max-w-md mx-auto'>
                        <h1 className='text-3xl font-extrabold text-white mb-6'>
                            Welcome!
                        </h1>
                        <p className='text-gray-300 mb-8'>
                            Login to explore amazing content and share your thoughts with the community
                        </p>
                        {navItems.map((item) =>
                            item.active ? (
                                <button
                                    key={item.name}
                                    onClick={() => navigate(item.slug)}
                                    className='px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-bold text-lg transition-colors w-full max-w-xs'
                                >
                                    {item.name}
                                </button>
                            ) : null
                        )}
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8 min-h-screen bg-gradient-to-b from-[#0A2647] to-[#144272] '>
            <Container>
                <h1 className='text-3xl md:text-4xl font-bold text-white mb-8 text-center'>
                    {authStatus ? 'Latest Posts' : 'Featured Posts'}
                </h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {posts.map((post) => (
                        <div
                            key={post.$id}
                            className=' w-full max-w-sm mx-auto'
                        >
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
                {authStatus && posts.length > 0 && (
                    <div className='text-center mt-12'>
                        <button
                            onClick={() => navigate('/all-posts')}
                            className='px-6 py-3 border-2 border-blue-500 text-blue-300 hover:bg-blue-500 hover:text-white rounded-full font-bold text-lg transition-colors'
                        >
                            View All Posts
                        </button>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default Home
