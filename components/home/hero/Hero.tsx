
import Image from "next/image";
import HeroImage from "@/public/images/home/hero.jpg";
import Link from "next/link";

type Stat = {
  value: string;
  label: string;
};

const stats: Stat[] = [
  { value: "50K+", label: "Job Seekers" },
  { value: "10K+", label: "Employers" },
  { value: "5K+", label: "Trainers" },
  { value: "100K+", label: "Connections" },
];

export default function Hero() {
  return (
    <section id="top" className="relative">
      {/* Hero image block */}
      <div className="relative h-160 md:h-180 w-full overflow-hidden">
        <Image
          src={HeroImage}
          alt="Electrician in a hard hat looking up at scaffolding on a job site"
          fill
          priority
          className="object-cover blur-[1px] brightness-70 contrast-100"
        />

        {/* Content — vertically centered, left aligned */}
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-navy shadow-sm">
            🚀 Built by electricians, for electricians
          </span>

          <h1 className="mt-5 max-w-2xl font-display text-4xl md:text-6xl font-extrabold leading-[1.05] text-white">
            Climb your path.<br/>
            <span className="text-white/90"> Find your community.</span>
            
          </h1>

          <p className="mt-5 max-w-lg text-lg text-white/85">
            From learning to earning — the tools, live calls, and mentors that
            help you climb from apprentice to top of the call list.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="#join">
              <button className="flex h-12.5 w-44 items-center justify-center rounded-lg bg-[#2563EB] px-4 text-center font-semibold text-white transition-colors hover:bg-blue-700 focus-ring">
                Join the network
              </button>
            </Link>

            <Link href="#jobs">
              <button className="flex h-12.5 w-44 items-center justify-center rounded-lg bg-white/90 px-6 text-center font-semibold text-navy transition-colors hover:bg-white focus-ring">
                Hire Talent
              </button>
            </Link>

            <Link href="#learn">
              <button className="flex h-12.5 w-52 items-center justify-center rounded-lg bg-white/90 px-6 text-center font-semibold text-navy transition-colors hover:bg-white focus-ring">
                Training &amp; Certificate
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats bar below the hero */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <dl className="grid grid-cols-2 gap-y-8 text-center sm:grid-cols-4 sm:gap-y-0">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-3xl font-extrabold text-navy md:text-5xl">
                  {stat.value}
                </dd>
                <div className="mt-1 text-sm text-navy/60 md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}