import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { request } from '../../utils/fetchApi';
import { FaCloudArrowUp } from "react-icons/fa6";
import { IoIosCloudDone } from "react-icons/io";


function UpdateBlog() {
    const [blogDetails, setBlogDetails] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('');
    const [isChanged, setIsChanged] = useState(false);
    const [isSaved, setIsSaved] = useState(true);
    const { token } = useSelector((state) => state.auth);
    const { id } = useParams();
    const navigate = useNavigate();
    const categories = [
        'nature',
        'music',
        'travel',
        'design',
        'programming',
        'fun',
        'fashion'
    ];

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const options = {
                    'Authorization': `${token}`
                };
                const data = await request(`/blog/${id}`, 'GET', options);
                setBlogDetails(data?.blog);
                setTitle(data?.blog?.title);
                setDesc(data?.blog?.desc);
                setCategory(data?.blog?.category);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBlogDetails();
    }, [id]);

    useEffect(() => {
        let typingTimer;
        const handleTypingStopped = () => {
            if (isChanged) {
                handleUpdateBlog();
            }
        };
        typingTimer = setTimeout(handleTypingStopped, 3000);
        return () => clearTimeout(typingTimer);
    }, [title, desc, category]);

    const handleUpdateBlog = async () => {
        try {
            const options = { 'Authorization': `${token}`, 'Content-Type': 'application/json' };
            await request(`/blog/${id}`, 'PUT', options, { title, desc, category });
            setIsChanged(false);
            setIsSaved(true);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSaveManually = () => {
        handleUpdateBlog();
        navigate(`/blog/${id}`)
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


    return (
        <>
            <Header />
            <div>
                <div className='flex flex-col items-center justify-center gap-y-[15rem]'>
                    <h1 className='text-center py-[2rem] text-[#3C91E6] md:text-[3rem] text-[2rem] font-semibold'>Upload Your Blog</h1>
                    <form className='flex flex-col gap-y-[2rem] items-center justify-center bg-primary md:w-[45rem] w-[18rem] h-[35rem] p-5 rounded-2xl'>
                        <div className='flex gap-3 items-center'>
                            <label className='hidden md:visible' htmlFor="">Title:</label>
                            <input type="text"
                                placeholder='Title'
                                value={title}
                                onChange={handleTitleChange}
                                className='md:w-[25rem] w-[15rem] md:h-[3.5rem] rounded-md p-2 outline-none'
                            />
                        </div>
                        <div className='flex gap-3 items-center'>
                            <label className='ml-[-4rem] hidden md:visible' htmlFor="">Description :</label>
                            <textarea type="text"
                                placeholder='Description'
                                value={desc}
                                onChange={handleDescChange}
                                className='md:w-[25rem] w-[15rem] h-[10rem] rounded-md p-2 outline-none' />
                        </div>
                        <div className='flex gap-3 items-center'>
                            <label className='ml-[-2.5rem] hidden md:visible' htmlFor="">Category :</label>
                            <select value={category} className='md:w-[25rem] w-[15rem] h-[3.5rem] capitalize rounded-md p-2 outline-none' onChange={handleCategoryChange}>
                                {categories.map((category) =>
                                    <option key={category} value={category}>{category}</option>
                                )}
                            </select>
                        </div>
                        <button className='text-[1.3rem] text-white bg-[#3C91E6] p-3 rounded-[10px]' type='button' onClick={handleSaveManually}>Save</button>
                        {isSaved ? <p className="flex text-[1.3rem] gap-x-4 items-center text-green-500">Changes saved <IoIosCloudDone className='text-[2rem] text-green-500' /></p> : <p className="flex gap-x-4 text-[1.3rem] items-center text-blue-500">Saving  <FaCloudArrowUp className='text-[2rem] text-blue-300' /></p>}
                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdateBlog;
