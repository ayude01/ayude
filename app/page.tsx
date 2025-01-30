"use client"

import About from "@/components/about/About"
import Skill1 from "@/components/skill1/Skill1"
import Skills from "@/components/skill/Skills"
import Experience from "@/components/Experience/Experience"
import Certification from "@/components/Certification/Certification"

import Clients from "@/components/Client/Clients"
import Contact from "@/components/contact/Contact"
import Hero from "@/components/hero/Hero"
import Nav from "@/components/navbar/Nav"
import Preload from "@/components/preload/Preload"
import Projects from "@/components/projects/Projects"
import { AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export default function Home() {
  const [loadingPreloader, setLoadingPreloader] = useState<boolean>(true)
  const [endedLoading, setEndedLoading] = useState<boolean>(false)

  useEffect(() => {
    const body = document.querySelector("body")

    if (loadingPreloader) {
      body?.classList.add("overflow-hidden")
      setTimeout(() => {
        setLoadingPreloader(false)
      }, 4000)
      setTimeout(() => {
        setEndedLoading(true)
      }, 3000)
    } else {
      body?.classList.remove("overflow-hidden")
    }
  }, [loadingPreloader])

  if (loadingPreloader) {
    return (
      <>
        <AnimatePresence mode="wait" initial={true}>
          {loadingPreloader && <Preload endedLoading={endedLoading} />}
        </AnimatePresence>
      </>
    )
  }

  if (!loadingPreloader) {
    return (
      <>
        <Nav />
        <main data-scroll-container className="flex flex-col items-center">
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Skill1 />
          <Skills />
          <Clients />
          <Certification />
          <Contact />
         
        </main>
      </>
    )
  }
}
