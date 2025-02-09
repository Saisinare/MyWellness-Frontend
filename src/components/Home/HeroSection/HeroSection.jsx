import React from 'react'
import RightSide from './RightSide'
import LeftSide from './LeftSide'

export default function HeroSection() {
  return (
    <div className=' h-screen w-screen flex'>
      <RightSide/>
      <LeftSide/>
    </div>
  )
}
