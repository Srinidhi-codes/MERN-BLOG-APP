import React, { useState } from 'react'
import Logo from '../../assets/logo.svg'
import Profile from '../../assets/profile.png'
import { Link } from 'react-router-dom';
import './header.css'
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';

function Header() {
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    const navLinks = [
        {
            id: 1,
            name: 'Home',
            link: '/'
        },
        {
            id: 2,
            name: 'Featured',
            link: '/featured'
        },
        {
            id: 3,
            name: 'Contact',
            link: 'https://personal-portfolio-rho-blush.vercel.app/#contact',
            target: '_blank'
        }
    ];


    return (
        <>
            {<div className='flex items-center px-[1rem] md:px-[3rem] h-[7rem] bg-navBg'>
                <div className='flex items-center w-full justify-between'>
                    <div className="flex items-center">
                        <Link to={"/"} className='flex items-center'>
                            <img src={Logo} alt='' className='w-[30px] md:w-full' />
                            <h1 className='text-[1.5rem] md:text-[2rem] text-primary hover:text-secondary'>Blogs</h1>
                        </Link>
                    </div>
                    <ul className='flex gap-x-[2rem] hidden md:flex'>
                        {navLinks.map((data) => (
                            <li key={data.id} className='text-[1.5rem] md:text-[2rem] text-primary hover:text-secondary'>
                                <Link to={data.link} target={data?.target}>
                                    {data.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className='flex items-center gap-4'>
                        <Link to={'/create'}>
                            <h1 className='hidden md:block text-[1rem] md:text-[1.5rem] text-white bg-[#3C91E6] p-2 md:p-3 rounded-[20px]'>Create Blog</h1>
                        </Link>
                        <img className=" w-[30px] h-[30px] md:w-[40px] md:h-[40px] mr-[0.5rem] cursor-pointer" onClick={() => setShowModal(pre => !pre)} src={Profile} alt='' />
                        {showModal &&
                            <div className='absolute z-[100] top-[5rem] right-[0.5rem] w-[10rem] md:w-[12rem] bg-navBg text-center flex flex-col justify-center rounded-lg shadow-modal gap-2 text-[0.8rem] md:text-[1rem]'>
                                {navLinks.map((data) => (
                                    <p key={data.id} className='text-[1.5rem] md:text-[2rem] md:hidden visible text-primary hover:text-secondary'>
                                        <Link to={data.link} target={data?.target}>
                                            {data.name}
                                        </Link>
                                    </p>
                                ))}
                                <Link to={'/create'} className='hover:bg-primary hover:bg-opacity-20 text-[1.5rem] md:text-[2rem]  w-full'>Create</Link>
                                <div onClick={handleLogout} className='hover:bg-primary text-[1.5rem] md:text-[2rem] hover:bg-opacity-20'>Logout</div>
                            </div>
                        }
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Header
