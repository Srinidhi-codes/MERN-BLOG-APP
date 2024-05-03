import React from 'react'
import Nature1 from '../../assets/feature-blog-2.jpg'
import Nature2 from '../../assets/feature-blog-3.jpg'
import Nature3 from '../../assets/feature-blog-4.jpg'
import FeaturedImage from '../featuredImage/FeaturedImage';
import Header from '../header/Header';

function FeaturedBlog() {
    return (
        <>
            <Header />
            <div className='flex flex-col justify-center'>
                <h1 className='text-center py-[2rem] text-[#3C91E6] text-[3rem] font-semibold'>Featured Blog</h1>
                <div className='flex md:flex-row flex-col justify-center items-center md:gap-[4rem] gap-[2rem]'>
                    <FeaturedImage img={Nature1} title={'Blog1'} author={'Srinidhi'} desc={'lorem sdfds gfdgfd'} className={'object-cover rounded-[20px] md:w-[60rem] w-[18rem] h-[15rem] md:h-[46.3rem]'} />
                    <div className='flex flex-col gap-y-[2.5rem]'>
                        <FeaturedImage img={Nature2} title={'Blog 2'} author={'Ganesh'} desc={'lorem sdfds gfdgfd'} className={'object-cover rounded-[20px] md:w-[35rem] w-[18rem] h-[15rem] md:h-[22rem]'} />
                        <FeaturedImage img={Nature3} title={'Blog 3'} author={'Suresh'} desc={'lorem sdfds gfdgfd'} className={'object-cover rounded-[20px] md:w-[35rem] w-[18rem] h-[15rem] md:h-[22rem]'} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeaturedBlog