import ModelFieldFormContainer from '@/containers/ModelFieldFormContainer'
import React from 'react'

const page = () => {
    return (
        <div className='w-full'>
            <ModelFieldFormContainer edit={true} />
        </div>
    )
}

export default page