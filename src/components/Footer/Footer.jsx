import { SpeakerIcon } from '@/src/assets/icons/icons'
import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col md:flex-row justify-between items-center fixed bottom-0 w-full p-4 mx-auto gap-4 md:gap-0'>
      <div className='flex flex-row gap-2 items-center'>
        <span className='text-[#5f5f5f] text-[12px] md:text-[14px] font-medium tracking-[-0.5px] md:tracking-[-1px]'>
          Labs Of Nothings
        </span>
        <span>
          <SpeakerIcon />
        </span>
      </div>

      <div className='flex flex-row gap-2 items-center'>
        <span className='text-[#5f5f5f] text-[12px] md:text-[14px] font-medium tracking-[-0.5px] md:tracking-[-1px]'>
          Labs Of Nothings
        </span>
      </div>
    </div>
  )
}

export default Footer
