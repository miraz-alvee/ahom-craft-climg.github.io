import React from 'react'
import { SiAndroid, SiApple } from 'react-icons/si'

export default function DownloadSection() {
  return (
    <section className='' style={{background: "linear-gradient(135deg, #2563EB 25%, #7E22CE 95.71%)"}}>
        <div className="max-w-7xl mx-auto px-6 py-40 text-center">
            <h2 className="font-inter text-3xl md:text-[44px] font-bold text-white leading-12 mb-4">Ready to Craft Your Climb?</h2>
            <p className="font-inter font-normal text-sm text-[#DBEAFE] leading-7 mb-8">Download the app and start your journey today. Available on iOS and Android.</p>
            <div className="flex justify-center space-x-10">
                <button className="flex gap-3 font-inter bg-[#FFFFFF] text-[#111827] text-sm font-semibold py-4 px-6 rounded-xl">
                    <SiApple size={30}/> 
                    <p className='mt-2'>Download on App Store</p>
                </button>
                <button className="flex gap-3 font-inter bg-[#FFFFFF] text-[#111827] text-sm font-semibold py-4 px-6 rounded-xl">
                    <SiAndroid size={30} /> <p className='mt-2'>Download on Google Play</p>
                </button>
            </div>
        </div>
    </section>
  )
}
