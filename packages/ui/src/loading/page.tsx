import React from 'react'
import { PuffLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div className='flex flex-row justify-center'>
        <PuffLoader color="text-[#817994]" size={20}/>
    </div>
  )
}

export default Loading