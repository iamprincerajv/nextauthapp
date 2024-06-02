
import React from 'react'

const page = ({params}: any) => {
  return (
    <div className='flex flex-col justify-center items-center py-2 min-h-screen'>
      <h2 className='bg-gray-500 rounded'>
        {params.id}
      </h2>
    </div>
  )
}

export default page
