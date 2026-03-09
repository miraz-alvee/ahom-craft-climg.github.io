"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import required modules
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// You might want to create a custom CSS file for specific testimonial card styling

const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    quote: 'Swiper is the best slider library I have ever used. Highly customizable and easy to integrate!',
    title: 'Software Engineer at Company A',
  },
  {
    id: 2,
    name: 'Jane Smith',
    quote: 'The performance and touch interactions are seamless. It really enhanced our website UX.',
    title: 'UI/UX Designer at Company B',
  },
  {
    id: 3,
    name: 'Sam Wilson',
    quote: 'A go-to solution for any developer needing full control and a smooth user experience.',
    title: 'Project Manager at Company C',
  },
];

export default function UsersFeedback() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`bg-[#F8FAFC] py-20 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <h2 className="font-inter text-3xl md:text-[44px] font-bold text-[#111827] leading-12 tracking-[-0.5px]">
            Trusted by Thousands
          </h2>

          <p className="font-inter text-[#6B7280] font-normal text-base leading-7 mt-3">
            See what our community has to say about their experience
          </p>
        </div>

        {/* your cards here */}
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={50}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          loop={true} // Enable looping for continuous sliding
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
          // Add custom styles for the container if needed
          style={{ padding: '40px 0' }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              {/* Custom Testimonial Card Content */}
              <div className="testimonial-card" style={{ textAlign: 'center', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                <p style={{ fontStyle: 'italic', marginBottom: '15px' }}>"{testimonial.quote}"</p>
                <h4 style={{ margin: '0' }}>{testimonial.name}</h4>
                <p style={{ fontSize: '0.9em', color: '#666' }}>{testimonial.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  )
}
