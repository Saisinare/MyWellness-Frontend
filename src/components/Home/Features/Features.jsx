import React from 'react'
import RightCard from './RightCard'
import LeftCard from './LeftCard'

export default function Features() {
  return (
    <div className=' w-full h-screen flex items-center justify-between px-10 bg-gray-900 gap-4 '>
      <LeftCard/>
      <RightCard/>
    </div>
  )
}
