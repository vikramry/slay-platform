import React from 'react'
import Link from 'next/link';

const Footer = () => {
  return (
    <div className='flex justify-center items-center mb-2 text-lg gap-2'>
        Presented by {'  '}
        <Link href="https://www.vithiit.com/" target="_blank"><span className='text-2xl font-bold hover:underline '>Vithi</span></Link>
    </div>
  )
}

export default Footer