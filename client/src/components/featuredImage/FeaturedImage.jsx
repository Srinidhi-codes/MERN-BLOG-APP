import React from 'react'
import { BsEye, BsHandThumbsUp } from 'react-icons/bs'

function FeaturedImage(props) {
    return (
        <>
            <div className='flex flex-col relative overflow-hidden'>
                <div className='relative'>
                    <img className={props.className} src={props.img} alt="" />
                </div>
                <div className='absolute w-full h-full rounded-[20px] p-5 text-white bg-[black] bg-opacity-50 md:bottom-[-17rem] bottom-[-11rem] transition-all delay-50 duration-500 ease-in-out md:hover:translate-y-[-17rem] hover:translate-y-[-10rem]'>
                    <div className='flex justify-center items-start md:gap-x-[5rem] gap-x-[1rem]'>
                        <div className='font-semibold md:text-[1rem] text-[0.5rem] capitalize rounded-xl px-2 py-[10px]'>{props.category || 'CATEGORY'}</div>
                        <div className='font-semibold gap-x-2 px-2 py-[10px] capitalize rounded-xl md:text-[1rem] text-[0.5rem]'>{props.likes} Likes</div>
                        <div className='font-semibold gap-x-2 px-2 py-[10px] capitalize rounded-xl md:text-[1rem] text-[0.5rem]'>{props.views} Views</div>
                    </div>
                    <div className='flex flex-col gap-y-[0.5rem] mt-[1rem]'>
                        <h1 className='md:text-[2.5rem] text-[1.5rem] font-bold md:font-semibold capitalize'>{props.title}</h1>
                        <p className='capitalize md:text-[1rem] text-[0.8rem]'>{props.desc}</p>
                        <h1 className='md:text-[1.5rem] text-[1rem] capitalize'>Author : {props.author}</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeaturedImage