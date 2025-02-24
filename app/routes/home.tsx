import type { Route } from './+types/home'
import '../styles/hero.css'
import { InView } from '~/components/motion/in-view'
import { TextEffect } from '~/components/motion/text-effect'
import { Link } from 'react-router'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Home' },
    { name: 'description', content: 'Welcome to my site' },
  ]
}

export default function Home() {
  return <Hero />
}

function Hero() {
  const headline = "I'm Josh, a full stack engineer"

  const titleVaraints = {
    hidden: {
      opacity: 0,
      filter: 'blur(5px)',
      rotateX: 90,
      scale: 1.05,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      rotateX: 0,
      scale: 1,
    },
  }

  const subtitleVariants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.015 },
      },
    },
    item: {
      hidden: {
        opacity: 0,
        filter: 'blur(2px) brightness(0%)',
        y: 0,
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px) brightness(100%)',
        transition: {
          duration: 1.5,
        },
      },
    },
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pt-20">
      <div className="overflow-hidden">
        <InView
          variants={titleVaraints}
          viewOptions={{ margin: '0px 0px -200px 0px' }}
          transition={{
            type: 'spring',
            duration: 0.5,
            delay: 0.2,
            ease: 'easeOut',
          }}
        >
          <h1
            id="hero-headline"
            className="relative mt-24 h-28 text-3xl *:absolute *:w-full *:text-center *:font-bold motion-safe:animate-[jerkwhole_8s_infinite] *:lg:text-5xl *:xl:text-6xl"
          >
            <span
              className="-ml-0.5 text-red-600 blur-[2px] select-none motion-safe:animate-[jerk_50ms_infinite,_blur_30ms_infinite]"
              aria-hidden="true"
            >
              {headline}
            </span>
            <span
              className="ml-0.5 text-green-600 blur-[2px] select-none motion-safe:animate-[jerkgreen_1s_infinite]"
              aria-hidden="true"
            >
              {headline}
            </span>
            <span
              className="text-blue-600 blur-[1px] select-none motion-safe:animate-[jerkblue_1s_infinite]"
              aria-hidden="true"
            >
              {headline}
            </span>
            <span className="text-black blur-[1px] motion-safe:animate-[jerk_50ms_infinite,_blur_30ms_infinite] dark:text-white">
              {headline}
            </span>
            <span
              className="text-black/40 blur-lg select-none motion-safe:animate-[jerk_50ms_infinite,_blur_30ms_infinite] dark:text-white/40"
              aria-hidden="true"
            >
              {headline}
            </span>
          </h1>
        </InView>
        <div className="flex flex-col items-center">
          <TextEffect
            delay={0.8}
            className="text-muted max-w-lg pt-24 text-center font-medium sm:text-lg"
            per="char"
            variants={subtitleVariants}
          >
            I build websites and web apps with React, Next.js, Remix, Python,
            ect. I also write stuff on my blog.
          </TextEffect>
        </div>
      </div>
    </div>
  )
}
