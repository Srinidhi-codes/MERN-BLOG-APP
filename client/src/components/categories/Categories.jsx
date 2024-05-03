import React, { useEffect, useState } from 'react'
import { request } from '../../utils/fetchApi'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { MdOutlinePreview } from 'react-icons/md'
import { AiFillLike } from 'react-icons/ai'
import { FiArrowRight } from 'react-icons/fi'
import FeaturedImage from '../featuredImage/FeaturedImage'
import NewsLetter from '../newsletter/NewsLetter'

function Categories() {
    const [blogs, setBlogs] = useState([])
    const [filteredBlogs, setFilteredBlogs] = useState([])
    const [activeCategory, setActiveCategory] = useState('all')
    const { token } = useSelector((state) => state.auth)
    const categories = [
        'all',
        'nature',
        'music',
        'travel',
        'design',
        'programming',
        'fun',
        'fashion'
    ]

    useEffect(() => {
        const fetchBlogs = async () => {
            const options = {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
            try {
                const data = await request('/blog', 'GET', options)
                setBlogs(data.blog)
                setFilteredBlogs(data.blog)
            } catch (error) {
                console.log(error)
            }
        }
        fetchBlogs()
    }, [])

    useEffect(() => {
        if (activeCategory === 'all') {
            setFilteredBlogs(blogs)
        } else {
            setFilteredBlogs((pre) => {
                const filteredBlogs = blogs.filter((blog) => blog.category.toLowerCase() === activeCategory.toLowerCase())
                return filteredBlogs
            })
        }
    }, [activeCategory])

    console.log(blogs)

    return (
        <>
            <div className='flex flex-col justify-start items-center h-[80vh] overflow-y-scroll mb-[4rem]'>
                <div>
                    <h1 className='text-center py-[2rem] text-[#3C91E6] text-[2rem] font-semibold'>Select a category</h1>
                    <div className='flex flex-col gap-[2rem]'>
                        <div className='flex flex-wrap md:gap-x-[2rem] gap-1 md:w-full justify-center text-center md:text-[1.3rem] text-[0.8rem] capitalize'>
                            {categories.map((category) =>
                                <span onClick={() => setActiveCategory(pre => category)} key={crypto.randomUUID()} className={`border p-2 rounded-[20px] md:min-w-[6rem] hover:bg-secondary hover:text-white ${activeCategory === category && 'bg-secondary text-white'}`}>
                                    {category}
                                </span>
                            )}
                        </div>
                        {filteredBlogs?.length > 0 ?
                            <div className='flex md:flex-row flex-col justify-center flex-wrap gap-[2rem]'>
                                {filteredBlogs.map((blog) =>
                                    <Link to={`/blog/${blog?._id}`}>
                                        <FeaturedImage className="object-cover rounded-[20px] md:w-[35rem] w-[20rem] h-[15rem] md:h-[22rem]" category={blog.category} img={`http://localhost:8080/images/${blog?.photo}`} title={blog?.title} desc={blog?.desc} author={blog?.userId?.name} likes={blog?.likes.length} views={blog?.views} />
                                    </Link>
                                )}
                            </div>
                            : <h1 className='flex justify-center items-center text-[2rem] text-primary'>No Blogs</h1>}
                    </div>
                </div >
            </div >
            <NewsLetter />
        </>
    )
}

export default Categories