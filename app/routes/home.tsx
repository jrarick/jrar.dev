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
import robotOnComputer from '~/assets/robot-on-computer.jpeg?url'
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'motion/react'
import { useRef } from 'react'
import PixelTrail from '~/components/motion/pixel-trail'
import { listAllProjects } from '~/lib/project.server'
import type { Project } from '~/types/project'
import { Link } from 'react-router'

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
  return (
    <div className="py-36">
      <div className="relative mx-auto max-w-7xl py-24">
        <h2 className="text-accent pb-32 text-center text-3xl font-semibold md:text-5xl">
          The Tools I Use
        </h2>
        <InfiniteSlider duration={15} gap={200}>
          {icons.map((icon) => (
            <img
              key={icon.alt}
              className="h-16"
              src={icon.url}
              alt={icon.alt}
            />
          ))}
        </InfiniteSlider>
        <div className="from-fill absolute inset-y-0 left-0 z-10 w-40 bg-gradient-to-r" />
        <div className="from-fill absolute inset-y-0 right-0 z-10 w-40 bg-gradient-to-l" />
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
