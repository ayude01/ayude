"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// HeroParallax component with correct prop types
export const HeroParallax = ({
  projects,
  admin,
}: {
  projects: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
  admin: {
    name: string;
    introduction: string;
  };
}) => {
  const firstRow = projects?.slice(0, 5);
  const secondRow = projects?.slice(5, 10);
  const thirdRow = projects?.slice(10, 15);

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="hidden sm:flex h-[2200px] md:h-[2500px] py-10 overflow-hidden w-full antialiased relative flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header name={admin.name} introduction={admin.introduction} />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <motion.div className="flex flex-row-reverse mb-20 space-x-20 space-x-reverse">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-20 space-x-reverse">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

// Header Component
export const Header = ({
  name,
  introduction,
}: {
  name: string;
  introduction: string;
}) => {
  return (
    <div className="relative top-0 left-0 w-full px-4 py-20 mx-auto max-w-7xl md:py-40">
      <h1 className="text-2xl font-bold md:text-7xl dark:text-white">
        Hey! <br /> Im {name}
      </h1>
      <p className="max-w-2xl mt-8 text-base md:text-xl dark:text-neutral-200">
        {introduction}
      </p>
    </div>
  );
};

// ProductCard Component
export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      className="group/product h-96 w-[40rem] relative flex-shrink-0"
    >
      <Link href={product.link} target="_blank" className="block group-hover/product:shadow-2xl">
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          priority
          className="absolute inset-0 object-cover object-left-top w-full h-full"
          alt={product.title}
        />
      </Link>
      <div className="absolute inset-0 w-full h-full bg-black opacity-0 pointer-events-none group-hover/product:opacity-80"></div>
      <h2 className="absolute text-white opacity-0 bottom-4 left-4 group-hover/product:opacity-100">
        {product.title}
      </h2>
    </motion.div>
  );
};
