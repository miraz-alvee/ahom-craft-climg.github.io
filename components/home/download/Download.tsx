import React from 'react'
import { SiAndroid, SiApple } from 'react-icons/si'

export default function DownloadSection() {
    return (
        <section className='' style={{ background: "linear-gradient(135deg, #2563EB 25%, #7E22CE 95.71%)" }}>
            <div className="max-w-7xl mx-auto px-6 py-40 text-center">
                <h2 className="font-inter text-3xl md:text-[44px] font-bold text-white leading-12 mb-4">Ready to Craft Your Climb?</h2>
                <p className="font-inter font-normal text-sm text-[#DBEAFE] leading-7 mb-8">Download the app and start your journey today. Available on iOS and Android.</p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10">

                    <button className="flex items-center justify-center gap-3 font-inter bg-white text-[#111827] text-sm font-semibold py-4 px-6 rounded-xl w-full sm:w-auto">
                        <SiApple size={28} />
                        <p>Download on App Store</p>
                    </button>

                    <button className="flex items-center justify-center gap-3 font-inter bg-white text-[#111827] text-sm font-semibold py-4 px-6 rounded-xl w-full sm:w-auto">
                        <SiAndroid size={28} />
                        <p>Download on Google Play</p>
                    </button>

                </div>
            </div>
        </section>
    )
}
