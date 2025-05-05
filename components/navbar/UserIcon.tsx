import { fetchProfileIcon } from '@/utils/actions'
import React from 'react'
import { LuUser } from 'react-icons/lu'

const UserIcon = async () => {
  const profileImage = await fetchProfileIcon();

  if(profileImage){
    return <img   src={profileImage} className='w-6 h-6 rounded-full object-cover'/>
  }

  
  return (
    <LuUser className='w-6 h-6 bg-primary rounded-full text-white' />
  )
}

export default UserIcon