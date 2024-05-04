import React, { useEffect } from 'react'
import { useState } from 'react'
import './createBlog.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { request } from '../../utils/fetchApi'
import Header from '../header/Header'
import { FaCloudArrowUp } from 'react-icons/fa6'
import { IoIosCloudDone } from 'react-icons/io'
import toast from 'react-hot-toast'

const CreateBlog = () => {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [img, setImg] = useState("")
    const [category, setCategory] = useState("")
    const [isChanged, setIsChanged] = useState(false);
    const [isSaved, setIsSaved] = useState(true);
    const navigate = useNavigate()
    const { token } = useSelector((state) => state.auth)

    const categories = [
        'nature',
        'music',
        'travel',
        'design',
        'programming',
        'fun',
        'fashion'
    ]

    const handleCloseImg = () => {
        setImg(null)
    }

    useEffect(() => {
        let typingTimer;
        const handleTypingStopped = () => {
            if (isChanged) {
                setIsSaved(false);
                clearTimeout(typingTimer);
                typingTimer = setTimeout(handleCreateBlog, 3000);
            }
        };
        typingTimer = setTimeout(handleTypingStopped, 3000);
        return () => clearTimeout(typingTimer);
    }, [title, desc, category, img, isChanged]);

    const handleCreateBlog = async () => {
        try {
            const formData = new FormData()
            let filename = null
            if (img) {
                filename = crypto.randomUUID() + img.name
                formData.append("filename", filename)
                formData.append("image", img)

                await fetch(`https://mern-blog-app-8l09.onrender.com/upload`, {
                    method: "POST",
                    body: formData
                })
            } else {
                return
            }
            const options = {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
            const body = {
                title,
                desc,
                category,
                photo: filename
            }
            const data = await request('/blog', "POST", options, body)
            toast.success(data.message)
            setIsChanged(false);
            setIsSaved(true);
        } catch (error) {
            toast.error(error)
        }
    }

    const handleCreateManually = (e) => {
        e.preventDefault()
        handleCreateBlog();
        navigate(`/`)
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        setIsChanged(true);
        setIsSaved(false);
    };

    const handleDescChange = (e) => {
        setDesc(e.target.value);
        setIsChanged(true);
        setIsSaved(false);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setIsChanged(true);
        setIsSaved(false);
    };

    const handleImageChange = (e) => {
        setImg(e.target.files[0]);
        setIsChanged(true);
        setIsSaved(false);
    };

    return (
        <>
            <Header />
            <div className='flex flex-col justify-start items-center gap-y-[10rem] h-screen'>
                <h1 className='text-center py-[2rem] text-[#3C91E6] md:text-[3rem] text-[2rem] font-semibold'>Create Blog</h1>
                <div className='bg-primary p-5 md:w-auto w-[20rem] rounded-[20px]'>
                    <form onSubmit={handleCreateManually} encType="multipart/form-data">
                        <div className={'inputWrapper'}>
                            <label>Title: </label>
                            <input
                                type="text"
                                placeholder='Title...'
                                className={'input'}
                                onChange={handleTitleChange}
                            />
                        </div>
                        <div className={'inputWrapper'}>
                            <label>Description: </label>
                            <textarea
                                cols={40}
                                type="text"
                                placeholder='Description...'
                                className={'input'}
                                onChange={handleDescChange}
                            />
                        </div>
                        <div className={'inputWrapperSelect'}>
                            <label>Category: </label>
                            <select value={category} onChange={handleCategoryChange}>
                                <option value="" disabled hidden>Choose one</option>
                                {categories.map((category) => (
                                    <option key={crypto.randomUUID()} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                        <div className={'inputWrapperImg'}>
                            <label htmlFor='image' className={'labelFileInput '}>
                                Image: <span>Upload here</span>
                            </label>
                            <input
                                id="image"
                                type="file"
                                className={'input'}
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                            />
                            {img && <p className={'imageName'}>{img.name} <AiOutlineCloseCircle className={'closeIcon'} onClick={() => handleCloseImg()} /></p>}
                        </div>
                        <div className={'buttonWrapper'}>
                            {isSaved ? <p className="flex text-[1.3rem] gap-x-4 items-center text-green-500">Changes saved <IoIosCloudDone className='text-[2rem] text-green-500' /></p> : <p className="flex gap-x-4 text-[1.3rem] items-center text-blue-500">Saving  <FaCloudArrowUp className='text-[2rem] text-blue-300' /></p>}
                            <button className={'submitBtn'} type="submit">
                                Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateBlog