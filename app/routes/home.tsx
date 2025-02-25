import type { Route } from './+types/home'
import '../styles/hero.css'
import { InView } from '~/components/motion/in-view'
import { TextEffect } from '~/components/motion/text-effect'
import { InfiniteSlider } from '~/components/motion/infinite-slider'
import d3Icon from '~/assets/d3-icon.svg?url'
import figmaIcon from '~/assets/figma-icon.svg?url'
import gsapIcon from '~/assets/gsap-icon.svg?url'
import nextjsIcon from '~/assets/nextjs-icon.svg?url'
import playwrightIcon from '~/assets/playwright-icon.svg?url'
import postgresIcon from '~/assets/postgres-icon.svg?url'
import pythonIcon from '~/assets/python-icon.svg?url'
import reactIcon from '~/assets/react-icon.svg?url'
import reactRouterIcon from '~/assets/react-router-icon.svg?url'
import sanityIcon from '~/assets/sanity-icon.svg?url'
import supabaseIcon from '~/assets/supabase-icon.svg?url'
import tailwindIcon from '~/assets/tailwind-icon.svg?url'
import viteIcon from '~/assets/vite-icon.svg?url'
import remixIcon from '~/assets/remix-icon.svg?url'
import motionIcon from '~/assets/motion-icon.svg?url'
import nodejsIcon from '~/assets/nodejs-icon.svg?url'
import tanstackIcon from '~/assets/tanstack-icon.svg?url'
import prismaIcon from '~/assets/prisma-icon.svg?url'
import typescriptIcon from '~/assets/typescript-icon.svg?url'
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'motion/react'
import { useRef } from 'react'

const icons = [
  { url: d3Icon, alt: 'D3.js' },
  { url: figmaIcon, alt: 'Figma' },
  { url: gsapIcon, alt: 'GSAP' },
  { url: nextjsIcon, alt: 'Next.js' },
  { url: playwrightIcon, alt: 'Playwright' },
  { url: postgresIcon, alt: 'Postgres' },
  { url: pythonIcon, alt: 'Python' },
  { url: reactIcon, alt: 'React' },
  { url: reactRouterIcon, alt: 'React Router' },
  { url: sanityIcon, alt: 'Sanity' },
  { url: supabaseIcon, alt: 'Supabase' },
  { url: tailwindIcon, alt: 'Tailwind' },
  { url: viteIcon, alt: 'Vite' },
  { url: remixIcon, alt: 'Remix' },
  { url: motionIcon, alt: 'Framer Motion' },
  { url: nodejsIcon, alt: 'Node.js' },
  { url: tanstackIcon, alt: 'Tanstack' },
  { url: prismaIcon, alt: 'Prisma' },
  { url: typescriptIcon, alt: 'TypeScript' },
]

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Home' },
    { name: 'description', content: 'Welcome to my site' },
  ]
}

export default function Home() {
  return (
    <>
      <Hero />
      <TechnologiesSlider />
      <div className="h-dvh" />
    </>
  )
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
    <div className="mx-auto max-w-7xl px-4 py-24">
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
            className="relative mt-12 h-28 text-3xl *:absolute *:w-full *:text-center *:font-bold motion-safe:animate-[jerkwhole_8s_infinite] sm:mt-24 *:lg:text-5xl *:xl:text-6xl"
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
            className="max-w-lg px-4 pt-12 text-center font-medium text-sky-100 sm:pt-24 sm:text-lg md:text-xl lg:max-w-xl lg:text-2xl"
            per="char"
            variants={subtitleVariants}
          >
            {`I build websites and web apps with Next.js, Remix, Python, Node ect. I also write stuff on my blog.`}
          </TextEffect>
        </div>
      </div>
    </div>
  )
}

function TechnologiesSlider() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const percentage = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <div className="relative mx-auto max-w-7xl py-64" ref={ref}>
      <motion.h2
        className="bg-[linear-gradient(-60deg,rgba(0,0,0,0)33.3%,rgba(0,0,0,1)50%)] bg-[length:500%_100%] bg-clip-text pb-32 text-center text-3xl font-semibold [-webkit-text-fill-color:transparent] md:text-5xl dark:bg-[linear-gradient(-60deg,rgba(255,129,0,0)33.3%,rgba(255,129,0,1)66.7%)]"
        style={{
          backgroundPositionX: useMotionTemplate`calc(100% - ${percentage}%)`,
        }}
      >
        The Tools I Use
      </motion.h2>
      <InfiniteSlider duration={20} gap={200}>
        {icons.map((icon) => (
          <img className="h-16" src={icon.url} alt={icon.alt} />
        ))}
      </InfiniteSlider>
      <div className="to-fill from-fill absolute inset-0 z-10 hidden bg-gradient-to-r from-10% via-transparent via-50% to-90% sm:block" />
    </div>
  )
}
