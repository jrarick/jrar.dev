import type { Route } from './+types/home'
import '../styles/hero.css'
import { InView } from '~/components/motion/in-view'
import { TextEffect } from '~/components/motion/text-effect'
import PixelTrail from '~/components/motion/pixel-trail'
import { listAllProjects } from '~/lib/project.server'
import type { Project } from '~/types/project'
import { Link } from 'react-router'
import SimpleMarquee from '~/components/motion/simple-marquee'
import { motion } from 'motion/react'
import { cn } from '~/lib/utils'

type Icon = {
  url: string
  alt: string
}

const icons = [
  { url: '/assets/d3-icon.svg', alt: 'D3.js' },
  { url: '/assets/figma-icon.svg', alt: 'Figma' },
  { url: '/assets/gsap-icon.svg', alt: 'GSAP' },
  { url: '/assets/nextjs-icon.svg', alt: 'Next.js' },
  { url: '/assets/playwright-icon.svg', alt: 'Playwright' },
  { url: '/assets/postgres-icon.svg', alt: 'Postgres' },
  { url: '/assets/python-icon.svg', alt: 'Python' },
  { url: '/assets/react-icon.svg', alt: 'React' },
  { url: '/assets/react-router-icon.svg', alt: 'React Router' },
  { url: '/assets/sanity-icon.svg', alt: 'Sanity' },
  { url: '/assets/supabase-icon.svg', alt: 'Supabase' },
  { url: '/assets/tailwind-icon.svg', alt: 'Tailwind' },
  { url: '/assets/vite-icon.svg', alt: 'Vite' },
  { url: '/assets/remix-icon.svg', alt: 'Remix' },
  { url: '/assets/motion-icon.svg', alt: '(Framer) Motion' },
  { url: '/assets/nodejs-icon.svg', alt: 'Node.js' },
  { url: '/assets/tanstack-icon.svg', alt: 'Tanstack' },
  { url: '/assets/prisma-icon.svg', alt: 'Prisma' },
  { url: '/assets/typescript-icon.svg', alt: 'TypeScript' },
]

const firstHalfIcons = icons.slice(0, Math.floor(icons.length / 2))
const secondHalfIcons = icons.slice(Math.floor(icons.length / 2))

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
    <div className="relative flex h-[48rem] w-dvw flex-col items-center justify-center overflow-hidden sm:h-[56rem] md:h-[82rem]">
      <h2 className="text-accent absolute top-1/4 text-center text-3xl font-semibold sm:text-5xl md:text-6xl">
        The Tools I Use
      </h2>

      <div
        className="absolute top-0 -left-3/4 flex h-full w-[200%] flex-col items-center justify-center gap-y-24 perspective-near md:-mt-24 md:gap-y-36"
        style={{
          transform:
            'rotateX(45deg) rotateY(-15deg) rotateZ(35deg) translateZ(-200px)',
        }}
      >
        <SimpleMarquee
          className="w-full"
          baseVelocity={10}
          repeat={3}
          draggable={false}
          scrollSpringConfig={{ damping: 50, stiffness: 400 }}
          slowDownFactor={0.2}
          slowdownOnHover
          slowDownSpringConfig={{ damping: 60, stiffness: 300 }}
          direction="left"
        >
          {firstHalfIcons.map((icon, i) => (
            <MarqueeItem key={icon.alt} index={i} icon={icon} />
          ))}
        </SimpleMarquee>

        <SimpleMarquee
          className="w-full"
          baseVelocity={10}
          repeat={3}
          scrollSpringConfig={{ damping: 50, stiffness: 400 }}
          slowdownOnHover
          slowDownFactor={0.2}
          slowDownSpringConfig={{ damping: 60, stiffness: 300 }}
          draggable={false}
          direction="right"
        >
          {secondHalfIcons.map((icon, i) => (
            <MarqueeItem key={icon.alt} index={i} icon={icon} />
          ))}
        </SimpleMarquee>
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
                src="/assets/robot-on-computer.jpeg"
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

const MarqueeItem = ({ icon, index }: { icon: Icon; index: number }) => {
  const variants = {
    initial: {
      y: '0px',
      x: '0px',
      scale: 1,
      opacity: 1,
    },
    hover: {
      y: '-12px',
      x: '-12px',
      scale: 1.05,
      transition: {
        duration: 0.15,
        ease: 'easeOut',
      },
    },
  }

  const textVariants = {
    initial: {
      opacity: 0,
    },
    hover: {
      opacity: 1,
      transition: {
        duration: 0.15,
        ease: 'easeOut',
      },
    },
  }

  const imageVariants = {
    initial: {
      opacity: 1,
    },
    hover: {
      opacity: 0.45,
      transition: {
        duration: 0.15,
        ease: 'easeOut',
      },
    },
  }

  const containerClasses = cn(
    'mx-2 sm:mx-3 md:mx-4',
    'h-16 w-32 sm:h-20 sm:w-40 md:h-24 md:w-48',
    'relative flex',
    'flex-col transform-gpu'
  )

  const textContainerClasses = cn(
    'p-2 sm:p-2.5 md:p-3 h-full flex flex-col item-center justify-center',
    'leading-tight'
  )

  const imageClasses = cn('object-contain w-full h-full absolute')

  return (
    <motion.div
      className={containerClasses}
      initial="initial"
      whileHover="hover"
      variants={variants}
    >
      <motion.div className={textContainerClasses} variants={textVariants}>
        <h3 className="z-30 text-xl font-medium text-white md:text-3xl">
          {icon.alt}
        </h3>
      </motion.div>
      <motion.img
        src={icon.url}
        alt={icon.alt}
        draggable={false}
        className={imageClasses}
        variants={imageVariants}
      />
    </motion.div>
  )
}
