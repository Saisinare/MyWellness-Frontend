import React from 'react'
import LoginCard from './LoginCard'
import RightCard from './RightCard'

export default function LoginPage() {
  return (
    <div className=' w-full flex '>
        <RightCard/>
        <LoginCard/>
    </div>
  )
}
