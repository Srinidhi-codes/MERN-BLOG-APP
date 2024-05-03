import React, { useState } from 'react'
import Logo from '../../assets/logo.svg'
import Profile from '../../assets/profile.png'
import { Link } from 'react-router-dom';
import './header.css'

function Header() {
    const [showModal, setShowModal] = useState(false)
    const [showMenu, setShowMenu] = useState(false);
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

    const toggleMobileMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <>
            <div className='flex items-center px-[1rem] md:px-[3rem] h-[7rem] bg-navBg'>
                <div className='flex items-center w-full justify-between'>
                    <div className="flex items-center">
                        <Link to={"/"} className='flex items-center'>
                            <img src={Logo} alt='' className='w-[30px] md:w-full' />
                            <h1 className='text-[1.5rem] md:text-[2rem] text-primary hover:text-secondary'>Blogs</h1>
                        </Link>
                        {/* Hamburger menu icon for mobile */}
                        <div className="ml-auto md:hidden">
                            <button onClick={toggleMobileMenu} className="block ml-[5rem] text-gray-500 hover:text-white focus:text-white focus:outline-none">
                                <svg className="h-6 w-6" fill="#000" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <ul className={`md:flex gap-x-[2rem] ${showMenu ? 'flex flex-col gap-y-[1rem] absolute bg-navBg top-[6.5rem] right-[0.5rem] w-[10rem] md:static md:bg-transparent md:relative md:top-auto md:right-auto md:w-auto' : 'hidden md:flex gap-x-[2rem]'}`}>
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
                        <img className="relative w-[30px] h-[30px] md:w-[40px] md:h-[40px] mr-[0.5rem] cursor-pointer" onClick={() => setShowModal(pre => !pre)} src={Profile} alt='' />
                        {showModal &&
                            <div className='absolute z-[100] top-[5rem] right-[0.5rem] w-[10rem] md:w-[12rem] bg-navBg text-center flex flex-col justify-center rounded-lg shadow-modal gap-2 text-[0.8rem] md:text-[1rem]'>
                                <Link to={'/create'} className='hover:bg-primary hover:bg-opacity-20  w-full'>Create</Link>
                                <span className='hover:bg-primary hover:bg-opacity-20'>Logout</span>
                            </div>
                        }
                    </div>
                </div>
            </div >
        </>
    )
}

export default Header
