import { FaYoutube, FaFacebook } from "react-icons/fa";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";

import meta from "@/public/company/meta.png";
import starbucks from "@/public/company/starbucks.png";
import tesla from "@/public/company/tesla.png";
import shopify from "@/public/company/shopify.png";
import idcamp from "@/public/company/idcamp.jpg";
import tsd from "@/public/company/tsd.jpg";

// Experiences
// Experiences
export const EXPERIENCES = [
  {
    title: "Android Developer Intern",
    company_name: "PT Teknologi Sunan Drajat",
    icon: tsd, // Menggunakan icon android sebagai placeholder profesional
    iconBg: "#E6DEDD",
    date: "Jan 2026 – Mar 2026",
    points: [
      "Built a real-time network latency monitoring system (update every 5s) to improve network diagnostics.",
      "Designed local persistence using Room Database, supporting dynamic CRUD of monitored endpoints.",
      "Refactored the application using MVVM architecture, significantly improving scalability and code maintainability.",
      "Implemented Firebase Remote Config, FCM, and SSL Pinning to increase app security and configuration flexibility.",
    ],
  },
  {
    title: "Android Developer (Scholarship Recipient)",
    company_name: "IDCamp by Dicoding Indonesia",
    icon: idcamp, // Menggunakan icon kotlin
    iconBg: "#383E56",
    date: "Sep 2024 – Sep 2025",
    points: [
      "Developed a full-featured Social Story app implementing 10+ core requirements, earning a perfect 5-star rating.",
      "Architected an offline-first story feed using Paging 3 with RemoteMediator and Room database cache.",
      "Optimized event discovery application data retrieval by 52% through efficient Retrofit integration and local caching.",
      "Implemented comprehensive testing including Unit Tests and UI Testing (Espresso) to ensure high-quality code delivery.",
    ],
  },
] as const;


export const SOCIALS = [
  {
    name: "Instagram",
    icon: RxInstagramLogo,
    link: "https://instagram.com/taufiqurrohman.tr",
  },
  {
    name: "Facebook",
    icon: FaFacebook,
    link: "https://facebook.com",
  },
  {
    name: "Twitter",
    icon: RxTwitterLogo,
    link: "https://twitter.com",
  },
] as const;
export const SKILL_DATA = [
  {
    skill_name: "Kotlin",
    image: "/mobile/kotlin.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Android",
    image: "/mobile/android.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Jetpack Compose",
    image: "/mobile/jetpack-compose-logo.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Android Studio",
    image: "/mobile/android-studio-icon.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Firebase",
    image: "/mobile/firebase.svg",
    width: 75,
    height: 75,
  },
  {
    skill_name: "MySQL",
    image: "/mobile/MySQL.svg",
    width: 75,
    height: 75,
  },
  {
    skill_name: "JUnit",
    image: "/mobile/JUnit.svg",
    width: 75,
    height: 75,
  },
] as const;

export const FRONTEND_SKILL = [
  {
    skill_name: "Material Design",
    image: "/mobile/Material_Design.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Figma",
    image: "/mobile/Figma.svg",
    width: 50,
    height: 50,
  },
  {
    skill_name: "Dart",
    image: "/mobile/Dart.svg",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Flutter",
    image: "/mobile/Flutter.svg",
    width: 70,
    height: 70,
  },
] as const;

export const BACKEND_SKILL = [
] as const;

export const FULLSTACK_SKILL = [
] as const;

export const OTHER_SKILL = [
] as const;


export const gridItems = [
  {
    id: 1,
    title: "I prioritize client collaboration, fostering open communication ",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "I'm very flexible with time zone communications",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Tech enthusiast with a passion for development.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Currently building a JS Animation library",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
] as const;

export const RECENT_PROJECTS = [
  {
    id: 1,
    title: "Social Story App - Android",
    des: "A full-featured social media Android app with offline-first architecture, geolocation, and modern Android development practices.",
    img: "/projects/p-sosial-story.png",
    iconLists: [
      "/skills/mobile/kotlin.svg",
      "/skills/mobile/android.svg",
      "/skills/mobile/JUnit.svg",
      "/skills/mobile/glide.png",
    ],
    link: "https://github.com/taufiqurrohman132/story-android",
    sourceCode: "https://github.com/taufiqurrohman132/story-android",
  },
  {
    id: 2,
    title: "Fintrack - Personal Finance App",
    des: "A personal finance tracking app with transaction management, categories, and analytics built using MVVM architecture.",
    img: "/projects/fintrack.png",
    iconLists: [
      "/skills/kotlin.png",
      "/skills/room.png",
      "/skills/datastore.png",
      "/skills/hilt.png",
      "/skills/android.png"
    ],
    link: "https://github.com/taufiqurrohman132/finance-tracker-android",
    sourceCode: "https://github.com/taufiqurrohman132/finance-tracker-android",
  },
  {
    id: 3,
    title: "Event Discovery App",
    des: "An Android app for discovering events with real-time search, favorites, and optimized data loading using caching.",
    img: "/projects/p-event-dicoding.png",
    iconLists: [
      "/skills/mobile/kotlin.svg",
      "/skills/mobile/glide.png",
     ],
    link: "https://github.com/taufiqurrohman132/dicoding-event-android",
    sourceCode: "https://github.com/taufiqurrohman132/dicoding-event-android",
  },
  {
    id: 4,
    title: "Tasky Note – Aplikasi Todolist App",
    des: "A simple mobile application that presents a to-do list in an interactive list format. This application was developed to fulfill the final submission for the Creating Flutter Apps for Beginners class and also serves as an initial portfolio for an entry-level mobile developer position.",
    img: "/projects/p-todo.png",
    iconLists: [
      "/skills/mobile/Dart.svg",
      "/skills/mobile/Flutter.svg",
     ],
    link: "https://github.com/taufiqurrohman132/tasky-note-flutter",
    sourceCode: "https://github.com/taufiqurrohman132/tasky-note-flutter",
  },

] as const;

export const PROJECTS = [
  {
    title: "Modern Next.js 14 Portfolio",
    description:
      'Embark on a journey through my professional evolution with the "Modern Next.js Portfolio" - a dynamic showcase of my skills, experiences, and passion for web development. Crafted with precision and powered by Next.js, this portfolio is more than just a static display; it\'s an immersive experience that reflects the cutting edge of modern web technologies.',
    image: "/projects/project-1.png",
    link: "https://example.com",
  },
  {
    title: "Interactive Cards Portfolio",
    description:
      'Step into the extraordinary world of my professional journey through the "Interactive Cards Portfolio" - an innovative and visually captivating platform that redefines the traditional portfolio experience. Ditching the conventional static layout, this portfolio leverages interactive cards to showcase my skills, projects, and personality in an engaging and dynamic manner.',
    image: "/projects/project-2.png",
    link: "https://example.com",
  },
  {
    title: "Space Themed Website",
    description:
      'Embark on an interstellar journey with my "Space Themed Website", a mesmerizing space-themed website that invites you to explore the cosmic wonders beyond our world. Immerse yourself in an awe-inspiring digital experience that blends cutting-edge design with the mysteries of the universe.',
    image: "/projects/project-3.png",
    link: "https://example.com",
  },
] as const;

export const FOOTER_DATA = [
  {
    title: "Community",
    data: [
      {
        name: "YouTube",
        icon: FaYoutube,
        link: "https://youtube.com",
      },
      {
        name: "GitHub",
        icon: RxGithubLogo,
        link: "https://github.com/taufiqurrohman132",
      },
      {
        name: "Discord",
        icon: RxDiscordLogo,
        link: "https://discord.com",
      },
    ],
  },
  {
    title: "Social Media",
    data: [
      {
        name: "Instagram",
        icon: RxInstagramLogo,
        link: "https://instagram.com/taufiqurrohman.tr",
      },
      {
        name: "Twitter",
        icon: RxTwitterLogo,
        link: "https://twitter.com",
      },
      {
        name: "Linkedin",
        icon: RxLinkedinLogo,
        link: "https://linkedin.com/in/taufiqurrohman132",
      },
    ],
  },
  {
    title: "About",
    data: [
      {
        name: "Become Sponsor",
        icon: null,
        link: "https://youtube.com",
      },
      {
        name: "Learning about me",
        icon: null,
        link: "https://example.com",
      },
      {
        name: "Contact Me",
        icon: null,
        link: "mailto:taufiqurrohman132132@gmail.com",
      },
    ],
  },
] as const;

export const CERTIFICATES = [
  {
    id: 1,
    title: "Belajar Pengembangan Aplikasi Android Intermediate",
    issuer: "Dicoding Indonesia",
    date: "Mar 2025",
    credentialId: "EYX425712J",
    link: "https://www.dicoding.com/certificates/EYX425712J",
    tags: ["Android", "Kotlin", "MVVM", "Retrofit"],
    icon: "/company/idcamp.jpg",
  },
  {
    id: 2,
    title: "Belajar Fundamental Aplikasi Android",
    issuer: "Dicoding Indonesia",
    date: "Feb 2025",
    credentialId: "EYX4128NJP",
    link: "https://www.dicoding.com/certificates/EYX4128NJP",
    tags: ["Android", "Kotlin", "Architecture Component"],
    icon: "/company/idcamp.jpg",
  },
  {
    id: 3,
    title: "Memulai Pemrograman dengan Kotlin",
    issuer: "Dicoding Indonesia",
    date: "Jan 2025",
    credentialId: "JLX4234NJP",
    link: "https://www.dicoding.com/certificates/JLX4234NJP",
    tags: ["Kotlin", "OOP", "Functional Programming"],
    icon: "/company/idcamp.jpg",
  },
  {
    id: 4,
    title: "Belajar Prinsip Pemrograman SOLID",
    issuer: "Dicoding Indonesia",
    date: "Dec 2024",
    credentialId: "6RPNWV449Z",
    link: "https://www.dicoding.com/certificates/6RPNWV449Z",
    tags: ["SOLID", "Clean Code", "Design Patterns"],
    icon: "/company/idcamp.jpg",
  },
  {
    id: 5,
    title: "Belajar Dasar Git dengan GitHub",
    issuer: "Dicoding Indonesia",
    date: "Nov 2024",
    credentialId: "JLX4137NJP",
    link: "https://www.dicoding.com/certificates/JLX4137NJP",
    tags: ["Git", "GitHub", "Version Control"],
    icon: "/company/idcamp.jpg",
  },
  {
    id: 6,
    title: "Memulai Pemrograman dengan Dart",
    issuer: "Dicoding Indonesia",
    date: "Oct 2024",
    credentialId: "MRZM48QEQXYQ",
    link: "https://www.dicoding.com/certificates/MRZM48QEQXYQ",
    tags: ["Dart", "Flutter", "Mobile"],
    icon: "/company/idcamp.jpg",
  },
] as const;

export const NAV_LINKS = [
  {
    title: "About me",
    link: "#about-me",
  },
  {
    title: "Skills",
    link: "#skills",
  },
  {
    title: "Projects",
    link: "#projects",
  },
  {
    title: "Certificates",
    link: "#certificates",
  },
] as const;

export const LINKS = {
  sourceCode: "https://github.com/sanidhyy/space-portfolio",
};
