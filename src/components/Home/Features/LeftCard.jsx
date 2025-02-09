import React from 'react'

export default function LeftCard() {
  return (
    <div className='w-2/3 h-5/6 bg-white p-14 rounded-xl transition-all duration-300 transform  hover:scale-95'>
        <div className=' w-full'>
          <h2 className=' font-madefor text-3xl font-normal mb-5'>
            Personalized Health Recomendation
          </h2>
          <p className=' font-madefor text-gray-700 text-start text-wrap'>
          Receive personalized fitness insights and recommendations tailored to your unique health goals. Achieve optimal health with bespoke advice.
          </p>
          <button className= ' mt-5 rounded-md p-3 px-5 bg-black text-white'>
            Go to the recommendations
          </button>
          <div className=' mt-6 w-full h-72 shadow-lg border rounded-lg'>

          </div>
        </div>
    </div>
  )
}
