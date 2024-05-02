import React from 'react'

const page = ({params}: {params: {fieldId: string}}) => {
    return (
        <div>
            {params.fieldId}
        </div>
    )
}

export default page