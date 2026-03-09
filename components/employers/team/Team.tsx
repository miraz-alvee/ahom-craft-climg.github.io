import Link from 'next/link'
import { FaArrowRightLong } from 'react-icons/fa6'

export default function TeamSection() {
    return (

        <section className='bg-linear-to-l from-[#DB2777] to-[#9333EA]'>
            <div className="max-w-7xl mx-auto px-6 py-36 text-center">
                <h2 className="font-inter text-3xl md:text-[44px] font-bold text-white leading-12 mb-6">Ready to Build Your Dream Team?</h2>
                <p className="font-inter font-normal text-base text-[#DBEAFE] tracking-normal leading-7 mb-8">Join thousands of companies who have found top talent through CraftClimb.</p>
                <Link href="/login">
                    <div className="anim-buttons font-inter text-sm transition-all duration-300 drop-shadow-lg hover:drop-shadow-2xl hover:scale-105 transform whitespace-nowrap">
                        <button
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "20px",
                                background: "#FFFFFF",
                                color: "#9333EA",
                                border: "none",
                                borderRadius: "12px",
                                padding: "16px 28px",
                                fontWeight: 600,
                                cursor: "pointer",
                                letterSpacing: "0.01em",
                                boxShadow: "0 4px 20px rgba(37,99,235,0.28)",
                                transition: "background 0.18s, transform 0.15s, box-shadow 0.18s",
                            }}>
                            Post Your First Job Free 
                            <FaArrowRightLong size={20} />
                        </button>
                    </div>
                </Link>
            </div>
        </section>
    )
}

