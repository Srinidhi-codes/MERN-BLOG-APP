import React from 'react'
import { FiSend } from 'react-icons/fi'

function NewsLetter() {
    return (
        <>
            <div className='flex flex-col md:gap-3 gap-5 justify-center items-center text-center border-t'>
                <div>
                    <h1 className='text-secondary md:text-[2rem] text-[1.5rem]'>Want to get latest updates?</h1>
                    <p className='md:text-[1rem] text-[0.8rem] font-semibold '>Send us your mail and will do rest!</p>
                </div>
                <div className='flex items-center gap-3'>
                    <input className='border border-secondary md:h-[2.5rem] h-[1.8rem] rounded-[15px] p-2 outline-none' type="email" placeholder='Type your mail' />
                    <FiSend className='md:text-[1.5rem] text-[1rem] cursor-pointer' />
                </div>
            </div>

        </>
    )
}

export default NewsLetter