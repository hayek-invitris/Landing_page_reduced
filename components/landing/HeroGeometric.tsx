"use client"

import { motion } from "framer-motion"
import { Pacifico } from "next/font/google"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

/* 
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
}) {
  const randomOffset = Math.random() * 200 - 100

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, randomOffset, -randomOffset, 0],
          x: [0, -randomOffset, randomOffset, 0],
          rotate: [0, 15, -15, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 20 + Math.random() * 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-emerald-500/20",
            "backdrop-blur-[1px] border border-gray-300/40",
            "shadow-[0_8px_32px_0_rgba(0,0,0,0.08)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.15),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  )
}
*/

export function HeroGeometric({
  badge = "Kokonut UI",
  title1 = "Elevate Your",
  title2 = "Digital Vision",
}: {
  badge?: string
  title1?: string
  title2?: string
}) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Image
          src="/Images/image.png"
          alt="Invitris Hero Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
      </div>

      {/* 
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={300}
          height={80}
          rotate={12}
          className="left-[10%] top-[25%]"
        />

        <ElegantShape
          delay={0.5}
          width={250}
          height={70}
          rotate={-15}
          className="right-[15%] top-[65%]"
        />

        <ElegantShape
          delay={0.4}
          width={200}
          height={60}
          rotate={-8}
          className="left-[20%] bottom-[20%]"
        />

        <ElegantShape
          delay={0.6}
          width={180}
          height={50}
          rotate={20}
          className="right-[25%] top-[15%]"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          className="left-[30%] top-[10%]"
        />

        <ElegantShape
          delay={0.8}
          width={220}
          height={65}
          rotate={30}
          className="right-[35%] bottom-[25%]"
        />

        <ElegantShape
          delay={0.9}
          width={160}
          height={45}
          rotate={-20}
          className="left-[40%] top-[45%]"
        />

        <ElegantShape
          delay={1}
          width={190}
          height={55}
          rotate={25}
          className="right-[45%] top-[35%]"
        />
      </div>
      */}

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full"
          >
            <span className="text-sm text-white tracking-wide">{badge}</span>
          </motion.div>

          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="text-white">
                {title1}
              </span>
              <br />
              <span
                className={cn(
                  "text-red-500",
                  pacifico.className,
                )}
              >
                {title2}
              </span>
            </h1>
          </motion.div>

          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              Crafting exceptional digital experiences through innovative design and cutting-edge technology.
            </p>
          </motion.div>

          <motion.div custom={3} variants={fadeUpVariants} initial="hidden" animate="visible">
            <Link href="/technology">
              <Button 
                className="bg-transparent backdrop-blur-sm text-white hover:bg-white/10 border border-white/30 px-8 py-6 text-lg font-medium rounded-full transition-all"
              >
                Explore Our Technology
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}