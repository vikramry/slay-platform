import ModelFormContainer from '@/containers/ModelFormContainer'
import React from 'react'

const page = () => {
    return (
        <div className='w-full'>
            <ModelFormContainer edit={true} />
        </div>
    )
}

export default page