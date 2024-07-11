import React from 'react'
import { HEADER } from '@/constants/constants'
const AccountRecievableNavbar = () => {
  return (
    <div className=' flex justify-between mt-8 mb-12'>
        <div>
              <h2 className=' text-2xl font-semibold'>Account Receivables</h2>
              <p className=' text-base text-disabledText'>View your teams sales and transaction.</p>
        </div>
  
        <div className=' flex gap-6'>
        {HEADER.map((item, key)=> (
          <div className=' w-[200px] h-[60px] rounded-xl bg-white flex items-center justify-center gap-6' style={{border: "1px solid #E2E5E8"}} key={key}>
            <span className={` w-[40px] h-[40px] rounded-full`} style={{background: `${item.color}`}}></span>
            <div className=' flex flex-col justify-center'>
              <span className=' text-xs text-gray-600'>{item.heading}</span>
              <span className=' text-lg text-black'>{item.transaction}</span>
            </div>
          </div>
        ))}
        </div>
        <div>

        </div>
      </div>
  )
}

export default AccountRecievableNavbar