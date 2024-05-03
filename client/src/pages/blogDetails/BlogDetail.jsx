import { React, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { request } from '../../utils/fetchApi'
import Header from '../../components/header/Header'
import { AiFillEdit, AiFillDelete, AiFillLike, AiOutlineLike, AiOutlineArrowLeft } from 'react-icons/ai'

function BlogDetail() {
    const [blogDetails, setBlogDetails] = useState({
        title: '',
        desc: '',
        category: '',
        likes: [],
        views: 0,
        userId: { _id: '', name: '' }, // Assuming structure of userId object
        photo: '' // Assuming the property name for the photo
    });
    const [isLiked, setIsLiked] = useState(false)
    const { id } = useParams()
    const { user, token } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const options = {
                    'Authorization': `${token}`
                }
                const data = await request(`/blog/${id}`, 'GET', options)
                setBlogDetails(data.blog)
                setIsLiked(data.blog.likes.includes(user._id))
            } catch (error) {
                console.log(error)
            }
        }
        fetchBlogDetails()
    }, [id])

    const handleLikePost = async () => {
        try {
            const options = {
                'Authorization': `${token}`
            }
            await request(`/blog/like/${id}`, 'PUT', options)
            setIsLiked((pre) => !pre)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (req, res) => {
        try {
            const options = {
                'Authorization': `${token}`
            }
            await request(`/blog/${id}`, 'DELETE', options)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Header />

            <div className='flex w-full relative justify-center items-center'>
                <Link to={'/'}>
                    <AiOutlineArrowLeft className='absolute top-[2rem] left-[2rem] md:text-[3rem] text-[1.5rem] hover:bg-secondary/40 rounded-full p-1' />
                </Link>
                <h1 className='text-center py-[2rem] text-[#3C91E6] md:text-[2.5rem] text-[1.5rem] font-semibold'>Blog Details</h1>
            </div>
            <div className='flex flex-col justify-center items-center gap-[2rem]'>
                <img className='object-cover rounded-[20px] md:w-[60rem] w-[30rem] h-[15rem] md:h-[46.3rem]' src={`http://localhost:8080/images/${blogDetails?.photo}`} alt="" />
                <div className='flex flex-col items-center justify-center md:px-[10rem]'>
                    <div className='flex md:w-[60rem] w-[18rem] items-center md:gap-x-[30rem] gap-x-12 md:font-medium font-bold'>
                        <h1 className='md:text-[3rem] text-[1.5rem] text-secondary max-w-[50rem]'>{blogDetails?.title}</h1>
                        {blogDetails?.userId?._id === user?._id ?
                            <div className='flex gap-x-[2rem]'>
                                <Link to={`/blog/update/${blogDetails?._id}`}>
                                    <AiFillEdit className='text-[2.5rem] text-blue-500 hover:text-blue-600 rounded-full p-1' />
                                </Link>
                                <div>
                                    <AiFillDelete onClick={handleDelete} className='text-[2rem] cursor-pointer text-red-600 hover:text-red-700' />
                                </div>
                            </div>
                            :
                            <div>
                                {isLiked ? <AiOutlineLike className='text-[2rem] cursor-pointer' onClick={handleLikePost} /> :
                                    <AiFillLike className='text-[2rem] cursor-pointer' onClick={handleLikePost} />}
                            </div>}
                    </div>
                    <div className='flex flex-col justify-center items-start md:w-[65%] w-[18rem] gap-y-[2rem] mt-[1rem]'>
                        <p className='md:text-[1.5rem] text-[0.8rem] text-justify'>
                            {blogDetails?.desc}
                        </p>
                        <div className='flex w-full justify-between items-end'>
                            <div>
                                <span className='text-secondary pr-[4rem]'>{blogDetails?.views} views</span>
                                <span className='text-secondary'>{blogDetails?.likes?.length} likes</span>
                            </div>
                            <div className='md:text-[1.5rem] text-[1rem] font-bold text-secondary'><span>By: </span>{blogDetails?.userId?.name}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogDetail