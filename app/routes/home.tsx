import type { Route } from './+types/home'
import '../styles/hero.css'
import { InView } from '~/components/motion/in-view'
import { TextEffect } from '~/components/motion/text-effect'
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
import robotOnComputer from '~/assets/robot-on-computer.jpeg?url'
import PixelTrail from '~/components/motion/pixel-trail'
import { listAllProjects } from '~/lib/project.server'
import type { Project } from '~/types/project'
import { Link } from 'react-router'
import { useState } from 'react'
import VerticalCutReveal from '~/components/motion/vertical-cut-reveal'
import SimpleMarquee from '~/components/motion/simple-marquee'
import { motion } from 'motion/react'

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

const firstHalfIcons = icons.slice(0, Math.ceil(icons.length / 2))
const secondHalfIcons = icons.slice(Math.ceil(icons.length / 2), icons.length)

export async function loader({}: Route.LoaderArgs) {
  const projects = await listAllProjects()

  const firstThreeProjects = projects.slice(0, 3)

  return { projects: firstThreeProjects }
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Home' },
    { name: 'description', content: 'Welcome to my site' },
  ]
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { projects } = loaderData

  return (
    <>
      <Hero />
      <TechnologiesSlider />
      <Projects projects={projects} />
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
      once: true,
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
    <div className="relative mx-auto max-w-7xl px-4 py-24">
      <div className="absolute inset-0 z-[1]">
        <PixelTrail pixelSize={20} delay={130} pixelClassName="bg-accent/10" />
      </div>
      <div className="overflow-hidden">
        <InView
          variants={titleVaraints}
          viewOptions={{ margin: '0px 0px -200px 0px', once: true }}
          transition={{
            duration: 0.2,
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
            <span className="text-white blur-[1px] motion-safe:animate-[jerk_50ms_infinite,_blur_30ms_infinite]">
              {headline}
            </span>
            <span
              className="text-white/40 blur-lg select-none motion-safe:animate-[jerk_50ms_infinite,_blur_30ms_infinite]"
              aria-hidden="true"
            >
              {headline}
            </span>
          </h1>
        </InView>
        <div className="flex flex-col items-center">
          <TextEffect
            delay={0.8}
            className="max-w-lg px-4 pt-12 text-center font-medium text-sky-100 [text-shadow:var(--color-sky-100)_0px_0px_5px] sm:pt-24 sm:text-lg md:text-xl lg:max-w-xl lg:text-2xl"
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
  const [container, setContainer] = useState<HTMLElement | null>(null)

  return (
    <div
      className="relative mx-auto flex h-dvh max-w-7xl flex-col items-center justify-center overflow-x-hidden overflow-y-auto"
      ref={(node) => setContainer(node)}
    >
      <h1 className="text-accent absolute top-64 max-w-3/4 text-center text-3xl font-semibold sm:text-4xl md:text-5xl">
        <VerticalCutReveal splitBy="characters" staggerDuration={0.04}>
          The Tools I Use
        </VerticalCutReveal>
      </h1>
      <div className="absolute top-1/5 z-0 flex h-full w-full flex-col items-center justify-center space-y-32 sm:top-2/4">
        <SimpleMarquee
          className="relative z-10 w-full"
          baseVelocity={8}
          repeat={2}
          draggable={true}
          dragSensitivity={0.08}
          useScrollVelocity={true}
          scrollAwareDirection={true}
          scrollSpringConfig={{ damping: 50, stiffness: 400 }}
          scrollContainer={{ current: container! }}
          dragAwareDirection={true}
          grabCursor
          direction="left"
        >
          {firstHalfIcons.map((icon, i) => (
            <MarqueeItem key={icon.alt} index={i}>
              <motion.img
                src={icon.url}
                alt={icon.alt}
                draggable={false}
                className="h-12 select-none md:h-20"
              />
            </MarqueeItem>
          ))}
        </SimpleMarquee>

        <SimpleMarquee
          className="relative z-20 w-full"
          baseVelocity={8}
          repeat={2}
          draggable={true}
          dragSensitivity={0.08}
          useScrollVelocity={true}
          scrollAwareDirection={true}
          scrollSpringConfig={{ damping: 50, stiffness: 400 }}
          scrollContainer={{ current: container! }}
          dragAwareDirection={true}
          grabCursor
          direction="right"
        >
          {secondHalfIcons.map((icon, i) => (
            <MarqueeItem key={icon.alt} index={i}>
              <motion.img
                src={icon.url}
                alt={icon.alt}
                draggable={false}
                className="h-12 select-none md:h-20"
              />
            </MarqueeItem>
          ))}
        </SimpleMarquee>
        <div className="from-fill absolute bottom-0 left-0 z-30 h-full w-36 bg-gradient-to-r sm:w-56" />
        <div className="from-fill absolute right-0 bottom-0 z-30 h-full w-36 bg-gradient-to-l sm:w-56" />
      </div>
    </div>
  )
}

function Projects({ projects }: { projects: Project[] }) {
  return (
    <div className="py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
          <div className="w-full lg:max-w-lg lg:flex-auto">
            <h2 className="mt-6 text-2xl/9 font-semibold">
              The type of stuff I've been working on lately
            </h2>
            <figure>
              <img
                alt="Robot on typing on a computer in a candle lit room"
                src={robotOnComputer}
                className="bg-fill mt-16 aspect-6/5 w-full rounded-2xl object-cover lg:aspect-auto lg:h-[34.5rem]"
              />
              <figcaption className="text-muted mt-3 w-full text-center text-sm">
                me when i go on computer
              </figcaption>
            </figure>
          </div>
          <div className="w-full lg:max-w-xl lg:flex-auto">
            <h3 className="sr-only">Job openings</h3>
            <div className="space-y-4">
              {projects.map((project) => (
                <article
                  key={project.slug}
                  className="bg-fill hover:border-accent/50 hover:shadow-accent/20 relative flex flex-col space-y-2 rounded-md border border-neutral-800 to-80% p-5 shadow-md shadow-transparent transition-colors hover:bg-gradient-to-r hover:from-white/5"
                >
                  <Link
                    to={`/work/${project.slug}`}
                    className="text-xl"
                    prefetch="viewport"
                  >
                    {project.title}
                    <span className="absolute inset-0" />
                  </Link>
                  <p className="text-muted text-sm">{project.description}</p>
                </article>
              ))}
            </div>
            <div className="border-accent/50 mt-8 flex border-t pt-8">
              <Link
                to="/work"
                prefetch="intent"
                className="text-accent flex items-center space-x-2 text-sm/6 font-semibold"
              >
                <span>See all work</span>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const MarqueeItem = ({
  children,
  index,
}: {
  children: React.ReactNode
  index: number
}) => (
  <motion.div
    className="mx-16 flex rotate-y-45 rotate-z-12 flex-col items-center justify-center p-2 perspective-near transform-3d sm:p-3 md:p-4"
    initial={{ opacity: 0, y: 0, filter: 'blur(10px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 + 0.1 * index }}
    style={{
      transform: `translateZ(-150px) rotate(${index * 15}deg)`,
      transformStyle: 'preserve-3d',
    }}
  >
    {children}
  </motion.div>
)
