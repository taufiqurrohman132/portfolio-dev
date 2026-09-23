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

export type Project = {
  id: number;
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  /** Live demo / external URL. Leave empty (or equal to sourceCode) to render the demo button as disabled. */
  link?: string | null;
  /** Source repository URL. When empty, the "Source Code" button renders as disabled. */
  sourceCode?: string | null;
  /**
   * Device frame used by the detail-page carousel:
   * "web" → laptop frame (1 slide), "mobile" → phone-frame coverflow (3 visible).
   * Defaults to "mobile".
   */
  platform?: "web" | "mobile";
  role?: string;
  year?: string;
  overview?: string;
  highlights?: string[];
  /** Screenshots shown in the detail page carousel. Falls back to `img` when empty. */
  screenshots?: string[];
  /** Fallback tech topics shown when GitHub live data is unavailable. */
  tags?: string[];
};

export const RECENT_PROJECTS: Project[] = [
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
    platform: "mobile",
    role: "Android Developer",
    year: "2025",
    overview:
      "A social storytelling client built as the final project for the IDCamp Android expert track. It ships 10+ core requirements — from authentication and story submission with camera and location, to an offline-first feed that stays smooth on unreliable networks. The codebase follows modern Android conventions end to end, so it reads like a production app rather than a tutorial sample.",
    highlights: [
      "Offline-first feed using Paging 3 + RemoteMediator backed by a Room cache",
      "Clean MVVM architecture with a repository layer and structured error handling",
      "Camera, location, and runtime permission flows following Android 13+ guidelines",
      "Unit tests and Espresso UI tests covering the critical user journeys",
    ],
    screenshots: ["/projects/p-sosial-story.png"],
    tags: ["android", "kotlin", "offline-first", "mvvm"],
  },
  // {
  //   id: 2,
  //   title: "Fintrack - Personal Finance App",
  //   des: "A personal finance tracking app with transaction management, categories, and analytics built using MVVM architecture.",
  //   img: "/projects/fintrack.png",
  //   iconLists: [
  //     "/skills/kotlin.png",
  //     "/skills/room.png",
  //     "/skills/datastore.png",
  //     "/skills/hilt.png",
  //     "/skills/android.png"
  //   ],
  //   link: "https://github.com/taufiqurrohman132/finance-tracker-android",
  //   sourceCode: "https://github.com/taufiqurrohman132/finance-tracker-android",
  // },
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
    platform: "mobile",
    role: "Android Developer",
    year: "2025",
    overview:
      "An event discovery app built for Dicoding's intermediate Android program. It combines real-time search with favorites and a caching strategy that cut data retrieval time by more than half compared to a network-only implementation.",
    highlights: [
      "Debounced real-time search with response caching to avoid repeat network calls",
      "52% faster data retrieval through Retrofit integration + local caching",
      "Favorites and detail views persisted locally for a seamless experience",
      "MVVM with Coroutines/Flow, styled with Material Design components",
    ],
    screenshots: ["/projects/p-event-dicoding.png"],
    tags: ["android", "kotlin", "retrofit", "caching"],
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
    platform: "mobile",
    role: "Flutter Developer",
    year: "2024",
    overview:
      "A lightweight Flutter to-do app created for the Creating Flutter Apps for Beginners certification, and the first portfolio piece I used when applying for entry-level mobile roles. It focuses on a clean, interactive list experience with a Material-inspired UI.",
    highlights: [
      "Interactive to-do list with add, complete, and delete flows",
      "Material-inspired Flutter UI that scales across phone and tablet sizes",
      "Local persistence so tasks survive app restarts",
      "Structured to be extended — a solid base for adding sync and notifications later",
    ],
    screenshots: ["/projects/p-todo.png"],
    tags: ["flutter", "dart", "material-design"],
  },
  {
    id: 5,
    title: "Cafelion POS – Sistem Manajemen Kafe",
    des: "Aplikasi web point-of-sale dan manajemen kafe all-in-one: dashboard owner, transaksi kasir, kitchen queue, recipe costing (HPP & margin), inventory, hingga kontrol akses multi-role.",
    img: "/projects/cafelion-web/02-dashboard-owner.webp",
    iconLists: ["/skills/next.png", "/skills/tailwind.png"],
    // URL live demo menyusul — isi di sini agar tombol Live Demo aktif.
    link: null,
    // Repo private — biarkan null agar tombol Source Code tampil disabled.
    sourceCode: null,
    platform: "web",
    role: "Full-stack Web Developer",
    year: "2026",
    overview:
      "Cafelion POS adalah aplikasi web untuk mengoperasikan kafe dalam satu sistem — dari sisi kasir (POS, transaksi, kitchen queue), pekerjaan back-office (katalog menu, promo & bundling, recipe costing dengan HPP dan analisis margin, inventory, purchase order, supplier), sampai pandangan pemilik (pendapatan, estimasi laba bersih, rata-rata tiket, tren penjualan, target harian, dan alert stok rendah). Sistemnya berjalan multi-role — owner, admin, cashier, kitchen — dengan izin akses per modul, plus laporan bisnis dan analisis AOV untuk pengambilan keputusan.",
    highlights: [
      "Dashboard owner: pendapatan, estimasi laba bersih, rata-rata tiket, tren penjualan, dan goal harian",
      "Alur pesanan lengkap: Point of Sale → Riwayat Transaksi → Kitchen Queue",
      "Recipe costing dengan HPP, margin kotor, dan simulator What-If perubahan harga bahan",
      "Inventory, purchase order, dan supplier management dengan alert stok rendah serta saran restock",
      "Role-based access control: owner, admin, cashier, kitchen — izin per modul (view/create/edit/delete/export)",
      "Promo & bundling, katalog menu, laporan bisnis, dan analisis AOV serta target",
    ],
    screenshots: [
      "/projects/cafelion-web/01-login.webp",
      "/projects/cafelion-web/02-dashboard-owner.webp",
      "/projects/cafelion-web/03-point-of-sale.webp",
      "/projects/cafelion-web/04-transactions.webp",
      "/projects/cafelion-web/05-kitchen-queue.webp",
      "/projects/cafelion-web/06-menu-catalog.webp",
      "/projects/cafelion-web/07-promo-bundling.webp",
      "/projects/cafelion-web/08-recipe-costing.webp",
      "/projects/cafelion-web/09-inventory.webp",
      "/projects/cafelion-web/10-purchase-order.webp",
      "/projects/cafelion-web/11-supplier.webp",
      "/projects/cafelion-web/12-reports.webp",
      "/projects/cafelion-web/13-user-directory.webp",
      "/projects/cafelion-web/14-roles-permissions.webp",
    ],
    tags: ["nextjs", "tailwind", "pos", "web-app"],
  },
];

export const getProjectById = (
  id: string | number
): Project | undefined =>
  RECENT_PROJECTS.find((project) => String(project.id) === String(id));

/** Images for the detail carousel — falls back to the project thumbnail. */
export const getScreenshots = (project: Project): string[] =>
  project.screenshots && project.screenshots.length > 0
    ? project.screenshots
    : [project.img];

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
    title: "Menjadi Android Developer Mahir",
    issuer: "IDCamp 2024 (Indosat Ooredoo Hutchison)",
    date: "2025",
    credentialId: "IDCamp-Android-Mahir",
    link: "https://drive.google.com/file/d/1Tidye3YV7P4VQSpzAHFDYa5dScS2TzLZ/view?usp=drive_link",
    tags: ["Android", "Kotlin", "Clean Architecture", "Hilt"],
    icon: "/company/idcamp.jpg",
    image: "/certificate/IDCamp Android Mahir.png",
  },
  {
    id: 2,
    title: "Menjadi Android Developer Menengah",
    issuer: "IDCamp 2024 (Indosat Ooredoo Hutchison)",
    date: "2025",
    credentialId: "IDCamp-Android-Menengah",
    link: "https://drive.google.com/file/d/1djHOpXiHbWWNfpv2dlHMDxaBaIQZyIkH/view?usp=drive_link",
    tags: ["Android", "Kotlin", "Modern Android Development"],
    icon: "/company/idcamp.jpg",
    image: "/certificate/IDCamp Android Menengah.png",
  },
  {
    id: 3,
    title: "Belajar Pengembangan Aplikasi Android Intermediate",
    issuer: "Dicoding Indonesia",
    date: "Mar 2025",
    credentialId: "1OP8J015LPQK",
    link: "https://www.dicoding.com/certificates/1OP8J015LPQK",
    tags: ["Android", "Kotlin", "MVVM", "Retrofit"],
    icon: "/company/dicoding.jpg",
    image: "/certificate/android-intermediate.png",
  },
  {
    id: 4,
    title: "Belajar Fundamental Aplikasi Android",
    issuer: "Dicoding Indonesia",
    date: "Feb 2025",
    credentialId: "QLZ935KM7Z5D",
    link: "https://www.dicoding.com/certificates/QLZ935KM7Z5D",
    tags: ["Android", "Kotlin", "Architecture Component"],
    icon: "/company/dicoding.jpg",
    image: "/certificate/android-fundamental.png",
  },
  {
    id: 5,
    title: "Memulai Pemrograman dengan Kotlin",
    issuer: "Dicoding Indonesia",
    date: "Jan 2025",
    credentialId: "53XEQL6DVXRN",
    link: "https://www.dicoding.com/certificates/53XEQL6DVXRN",
    tags: ["Kotlin", "OOP", "Functional Programming"],
    icon: "/company/dicoding.jpg",
    image: "/certificate/kotlin.png",
  },
  {
    id: 6,
    title: "Belajar Prinsip Pemrograman SOLID",
    issuer: "Dicoding Indonesia",
    date: "Dec 2024",
    credentialId: "MEPJQDGOLX3V",
    link: "https://www.dicoding.com/certificates/MEPJQDGOLX3V",
    tags: ["SOLID", "Clean Code", "Design Patterns"],
    icon: "/company/dicoding.jpg",
    image: "/certificate/solid.png",
  },
  {
    id: 7,
    title: "Memulai Pemrograman dengan Dart",
    issuer: "Dicoding Indonesia",
    date: "Oct 2024",
    credentialId: "1OP8JMOKVPQK",
    link: "https://www.dicoding.com/certificates/1OP8JMOKVPQK",
    tags: ["Dart", "Programming", "Logic"],
    icon: "/company/dicoding.jpg",
    image: "/certificate/dart.png",
  },
  {
    id: 8,
    title: "Belajar Dasar Flutter",
    issuer: "Dicoding Indonesia",
    date: "2024",
    credentialId: "QLZ96YEWMZ5D",
    link: "https://www.dicoding.com/certificates/QLZ96YEWMZ5D",
    tags: ["Flutter", "Mobile", "UI/UX"],
    icon: "/company/dicoding.jpg",
    image: "/certificate/flutter-pemula.png",
  },
  {
    id: 9,
    title: "Belajar Dasar SQL",
    issuer: "Dicoding Indonesia",
    date: "2024",
    credentialId: "JMZVEW763PN9",
    link: "https://www.dicoding.com/certificates/JMZVEW763PN9",
    tags: ["SQL", "Database", "Query"],
    icon: "/company/dicoding.jpg",
    image: "/certificate/sql.png",
  },
] as const;

export const NAV_LINKS = [
  {
    title: "About me",
    link: "/#about-me",
  },
  {
    title: "Skills",
    link: "/#skills",
  },
  {
    title: "Projects",
    link: "/#projects",
  },
  {
    title: "Certificates",
    link: "/#certificates",
  },
] as const;

export const LINKS = {
  sourceCode: "https://github.com/sanidhyy/space-portfolio",
};
