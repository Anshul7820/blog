import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import appwriteService from "../appwrite/config"
import { Button, Container } from "../components"
import parse from "html-react-parser"
import { useSelector } from 'react-redux'
import { Calendar, User, Edit, Trash2, ArrowLeft, Share2, Bookmark } from 'lucide-react'

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    const userData = useSelector((state) => state.auth.userData)
    const isAuthor = post && userData ? post.userId === userData.$id : false

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true)
            try {
                if (slug) {
                    const postData = await appwriteService.getPost(slug)
                    if (postData) {
                        setPost(postData)
                    } else {
                        navigate("/")
                    }
                } else {
                    navigate("/")
                }
            } catch (error) {
                console.error("Error fetching post:", error)
                navigate("/")
            } finally {
                setLoading(false)
            }
        }

        fetchPost()
    }, [slug, navigate])

    const deletePost = async () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                const status = await appwriteService.deletePost(post.$id)
                if (status) {
                    if (post.featuredImage) {
                        await appwriteService.deleteFile(post.featuredImage)
                    }
                    navigate("/")
                }
            } catch (error) {
                console.error("Error deleting post:", error)
                alert("Failed to delete post. Please try again.")
            }
        }
    }

    const sharePost = () => {
        if (navigator.share) {
            navigator.share({
                title: post.title,
                text: `Check out this post: ${post.title}`,
                url: window.location.href,
            })
        } else {
            navigator.clipboard.writeText(window.location.href)
            alert("Link copied to clipboard!")
        }
    }

    if (loading) {
        return (
            <div className='min-h-screen bg-gradient-to-b from-[#0A2647] to-[#144272] py-12'>
                <Container>
                    <div className='flex justify-center items-center min-h-[60vh]'>
                        <div className='text-center'>
                            <div className='w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'>
                            </div>
                            <p className='text-white text-lg '>
                                Loading post...
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    if (!post) {
        return (
            <div className='min-h-screen bg-gradient-to-b from-[#0A2647] to-[#144272] py-12'>
                <Container>
                    <div className='text-center py-16'>
                        <h1 className='text-3xl font-bold text-white mb-4'>
                            Post not found
                        </h1>
                        <p className='text-gray-300 mb-8'>
                            The post you're looking for doesn't exist or has been removed.
                        </p>
                        <button
                            onClick={() => navigate("/")}
                            className='bg-blue-600 hover:bg-blue-700 px-8 py-3'
                        >
                            <ArrowLeft
                                className='inline mr-2'
                                size={20}
                            />
                            Back to Home
                        </button>
                    </div>
                </Container>
            </div>
        )
    }

    //Format Date
    const formattedDate = post.$createdAt ?
        new Date(post.$createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : ''

    return (
        <div className='min-h-screen bg-gradient-to-b from-[#0A2647] to-[#144272]'>
            <Container>
                {/* Back button*/}
                <div className='pt-6 pb-4'>
                    <button
                        onClick={() => navigate("/")}
                        className='bg-transparent hover:bg-blue-900/30 text-blue-300 border border-blue-500 px-4 py-2 text-sm'
                    >
                        Back
                    </button>
                </div>
                {/* Hero Section */}
                <div className='relative rounded-2xl overflow-hidden mb-8 shadow-2xl'>
                    {post.featuredImage && (
                        <div className='relative h-64 md:h-96'>
                            <img
                                src={appwriteService.getFileView(post.featuredImage)}
                                alt={post.title}
                                className='w-full h-full object-cover'
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent'></div>
                        </div>
                    )}
                    {/* Action Buttons */}
                    {isAuthor && (
                        <div className='absolute top-4 right-4 flex gap-2 z-10'>
                            <Link
                                to={`/edit-post/${post.$id}`}
                            >
                                <button className='bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg backdrop-blur-sm'>
                                    <Edit size={18} className=' inline mr-2' />
                                    Edit
                                </button>
                            </Link>
                            <button
                                onClick={deletePost}
                                className='bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg backdrop-blur-sm'
                            >
                                <Trash2 size={18} className='mr-2 inline' />
                                Delete
                            </button>
                        </div>
                    )}
                </div>

                {/* Post Content */}
                <div className='max-w-4xl mx-auto'>
                    {/* Post Header */}
                    <div className='text-center mb-10'>
                        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight'>
                            {post.title}
                        </h1>
                        {/* Meta Information */}
                        <div className='flex flex-wrap justify-center items-center gap-6 text-gray-300 mb-8'>
                            <div className='flex items-center gap-2'>
                                <User size={18} />
                                <span>Author ID: {post.userId?.slice(0, 8)}...</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Calendar size={18} />
                                <span>Published: {formattedDate}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${post.status === 'active' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                                    {post.status}
                                </span>
                            </div>
                        </div>

                        {/* Share Button */}
                        <div className='flex justify-center gap-4 mb-8'>
                            <button
                                onClick={sharePost}
                                className='bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full'
                            >
                                <Share2 className='inline mr-2' size={20} />
                                Share Post
                            </button>
                            <button className='bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full'>
                                <Bookmark className='inline mr-2' size={20} />
                                Save
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <article className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-10 mb-12'>
                        <div className='prose prose-invert prose-lg max-w-none'>
                            <div className='prose-headings:text-white prose-p:text-gray-300 prose-li:text-gray-300 prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-strong:text-white'>
                                {parse(post.content)}
                            </div>
                        </div>
                    </article>

                    {/* Author Section */}
                    <div className='border-t  border-white/10 pt-8 mt-12'>
                        <h3 className='text-2xl font-bold text-white mb-6'>
                            About the Author
                        </h3>
                        <div className='flex items-center gap-4'>
                            <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold'>
                                {userData?.name?.charAt(0) || 'A'}
                            </div>
                            <div>
                                <h4 className='text-xl font-bold text-white'>
                                    {userData?.name || 'Anonymous Author'}
                                </h4>
                                <p className='text-gray-400'>
                                    {isAuthor ? 'You are the author of this post' : 'Member of this Community'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            {/* Footer Note */}
            <div className='mt-16 pt-8 border-t border-white/10 text-center text-gray-400 text-sm'>
                <p>© {new Date().getFullYear()} DevUI. All rights reserved</p>
                <p className='mt-2'>
                    This post was published on {formattedDate}
                </p>
            </div>
        </div>
    )
}
