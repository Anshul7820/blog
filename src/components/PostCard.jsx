import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

const PostCard = ({ $id, title, featuredImage }) => {
    return (
        <Link
            to={`/post/${$id}`}
            className='block h-full'
        >
            <div className='bg-[#102F5F] border border-white/10 shadow-xl shadow-black/20 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/30 transition-all duration-300 w-full rounded-xl p-4 h-full flex flex-col'>
                <div className='w-full mb-4 overflow-hidden rounded-lg flex-shrink-0'>
                    {featuredImage ? (
                        <img
                            src={appwriteService.getFileView(featuredImage)}
                            alt={title}
                            className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className=" w-full h-48 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-lg flex items-center justify-center">
                            <span className='text-gray-400 text-lg font-medium'>No Image</span>
                        </div>
                    )}
                </div>
                <div className='flex-grow flex items-start'>
                    <h2 className='text-xl font-bold'>
                        {title}
                    </h2>
                </div>
                <div className='mt-4 pt-3 border-t border-white/10'>
                    <span className='text-sm text-blue-300 font-medium'>
                        Read More →
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default PostCard
