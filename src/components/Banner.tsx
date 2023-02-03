import React from 'react'

function Banner() {
  return (
    <div className='border flex items-center max-w-7xl mx-auto p-5 px-7 bg-yellow-400'>
      <div>
          <h1 className='w-1/2 mb-5 text-5xl'><span className='underline'>Medium</span> is a place to write,read and connect</h1>
          <p className='font-semibold'>It's free and easy to post your thinking on any topic and connect with millions of readers.</p>
      </div>

          <img className='hidden md:inline-flex h-32 lg:h-80' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Cirila-%D0%9C-majuskla.svg/640px-Cirila-%D0%9C-majuskla.svg.png" alt="" />
    </div>
  )
}

export default Banner
