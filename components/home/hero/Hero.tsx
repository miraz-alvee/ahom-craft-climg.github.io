

const stats = [
  { value: '50K+', label: 'Job Seekers' },
  { value: '10K+', label: 'Employers' },
  { value: '5K+',  label: 'Trainers' },
  { value: '100K+',label: 'Connections' },
]

export default function HeroSection() {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #F8FAFC 25%, #EFF6FF 60.36%, #FAF5FF 95.71%)',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          maxWidth: '1617px',
          margin: '0 auto',
          padding: 'clamp(60px, 8vw, 100px) clamp(24px, 6vw, 100px)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          gap: 'clamp(40px, 5vw, 80px)',
          minHeight: '100vh',
        }}
        className="hero-grid"
      >
        {/* ── LEFT: Content ── */}
        <div className="-mt-8 md:-mt-16 lg:-mt-40" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>

          {/* Badge */}
          <div
            className="anim-badge font-inter text-[#2563EB] font-medium text-sm leading-5 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] w-max mt-5"
            style={{

              alignItems: 'center',
              gap: '8px',
              padding: '7px 18px',
              // width: 'fit-content',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}
          >
            🚀 <span>The Future of Career Growth</span>
          </div>

          {/* Heading */}
          <h1 className="anim-heading font-inter font-extrabold text-4xl md:text-6xl text-[#111827] leading-18"
            style={{
              letterSpacing: '0px',
              margin: 0,}}>

            Climb Your Career
          </h1>

          {/* Subtext */}
          <p
            className="anim-sub font-inter"
            style={{
              fontSize: 'clamp(14px, 1.2vw, 17px)',
              lineHeight: 1.65,
              color: '#4B5563',
              maxWidth: '500px',
              margin: 0,
            }}
          >
            Connect job seekers, employers, and trainers in one powerful
            platform. Find opportunities, hire talent, and grow skills.
          </p>

          {/* Buttons */}
          <div className="anim-buttons font-inter" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <button
              style={{
                padding: '13px 28px',
                borderRadius: '12px',
                border: 'none',
                background: '#2563EB',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '15px',
                cursor: 'pointer',
                boxShadow: '0 4px 18px rgba(37,99,235,0.28)',
                transition: 'transform 0.18s, background 0.18s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#1D4ED8'
                ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#2563EB'
                ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'
              }}
            >
              Find Jobs
            </button>

            <button
              style={{
                padding: '13px 28px',
                borderRadius: '12px',
                border: '1.5px solid #E2E8F0',
                background: '#fff',
                color: '#0F172A',
                fontWeight: 600,
                fontSize: '15px',
                cursor: 'pointer',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                transition: 'transform 0.18s, box-shadow 0.18s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'
                ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 14px rgba(0,0,0,0.09)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'
              }}
            >
              Hire Talent
            </button>

            <button
              style={{
                padding: '13px 28px',
                borderRadius: '12px',
                border: '1.5px solid #C4B5FD',
                background: 'transparent',
                color: '#7C3AED',
                fontWeight: 600,
                fontSize: '15px',
                cursor: 'pointer',
                transition: 'transform 0.18s, background 0.18s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#FAF5FF'
                ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'
              }}
            >
              Training &amp; Certificate
            </button>
          </div>

          {/* Stats */}
          <div className="anim-stats" style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(24px, 4vw, 52px)' }}>
            {stats.map(s => (
              <div key={s.label} className='font-inter leading-9' style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                <span
                  style={{
                    fontSize: 'clamp(18px, 2.5vw, 26px)',
                    fontWeight: 700,
                    color: '#111827',
                    letterSpacing: '-0.5px',
                  }}
                >
                  {s.value}
                </span>
                <span className='font-inter' style={{ fontSize: '12px', color: '#6B7280', fontWeight: 400 }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Phone Mockup ── */}
        <div
          className="anim-phone"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Glow blob */}
          <div
            style={{
              position: 'absolute',
              width: '65%',
              height: '65%',
              background: 'radial-gradient(ellipse, rgba(139,92,246,0.13) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(36px)',
              pointerEvents: 'none',
            }}
          />

          {/* Phone shell */}
          <div
            style={{
              position: 'relative',
              width: 'clamp(200px, 24vw, 300px)',
              height: 'clamp(410px, 50vw, 620px)',
              aspectRatio: '390/844',
              background: 'linear-gradient(160deg, #F1F5F9 0%, #E2E8F0 100%)',
              borderRadius: 'clamp(36px, 4vw, 50px)',
              boxShadow: '0 0 0 8px #CBD5E1, 0 32px 80px rgba(15,23,42,0.18), inset 0 1px 0 rgba(255,255,255,0.9)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '14px',
              zIndex: 1,
            }}
          >
            {/* Notch */}
            <div
              style={{
                position: 'absolute',
                top: 'clamp(10px, 1.5vw, 16px)',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'clamp(80px, 10vw, 110px)',
                height: 'clamp(22px, 2.8vw, 28px)',
                background: '#CBD5E1',
                borderRadius: '999px',
              }}
            />

            {/* Screen */}
            <div
              style={{
                background: '#fff',
                borderRadius: 'clamp(26px, 3.2vw, 38px)',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '14px',
              }}
            >
              {/* App icon */}
              <div
                style={{
                  width: 'clamp(52px, 6.5vw, 76px)',
                  height: 'clamp(52px, 6.5vw, 76px)',
                  borderRadius: 'clamp(14px, 1.6vw, 20px)',
                  background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(99,102,241,0.38)',
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round" style={{ width: '55%', height: '55%' }}>
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
              </div>

              <p style={{ fontSize: 'clamp(13px, 1.4vw, 17px)', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                CraftClimb
              </p>
              <p style={{ fontSize: 'clamp(10px, 1vw, 13px)', color: '#64748B', margin: 0 }}>
                Your Career Journey
              </p>
            </div>
          </div>

          {/* Floating cards */}
          <div
            className="float-card-1"
            style={{
              position: 'absolute',
              right: '0%',
              top: '18%',
              background: '#fff',
              borderRadius: '14px',
              boxShadow: '0 8px 28px rgba(15,23,42,0.12)',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap',
              fontSize: '12px',
              fontWeight: 600,
              color: '#0F172A',
              zIndex: 2,
            }}
          >
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E', flexShrink: 0 }} />
            New Job Match!
          </div>

          <div
            className="float-card-2"
            style={{
              position: 'absolute',
              left: '0%',
              bottom: '22%',
              background: '#fff',
              borderRadius: '14px',
              boxShadow: '0 8px 28px rgba(15,23,42,0.12)',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap',
              fontSize: '12px',
              fontWeight: 600,
              color: '#0F172A',
              zIndex: 2,
            }}
          >
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#6366F1', flexShrink: 0 }} />
            Certificate Earned 🎉
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }

        .anim-badge    { animation: fadeUp 0.5s 0.00s ease both; }
        .anim-heading  { animation: fadeUp 0.5s 0.08s ease both; }
        .anim-sub      { animation: fadeUp 0.5s 0.16s ease both; }
        .anim-buttons  { animation: fadeUp 0.5s 0.24s ease both; }
        .anim-stats    { animation: fadeUp 0.5s 0.32s ease both; }
        .anim-phone    { animation: fadeUp 0.6s 0.10s ease both; }

        .float-card-1  { animation: floatCard 4s ease-in-out infinite; }
        .float-card-2  { animation: floatCard 4s ease-in-out infinite 2s; }

        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
            min-height: auto !important;
            padding-top: 48px !important;
            padding-bottom: 64px !important;
          }
          .hero-grid > div:last-child { order: -1; }
          .float-card-1, .float-card-2 { display: none; }
        }
        @media (max-width: 480px) {
          .hero-grid { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>
    </section>
  )
}