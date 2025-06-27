import { type ProjectCardProps } from "@/components/projects/project-card";
import { type ProjectShowcaseListItem } from "@/components/projects/project-showcase-list";

export const PROJECT_SHOWCASE: ProjectShowcaseListItem[] = [
  {
    index: 0,
    title: "Sfera IT Solution",
    href: "/projects",
    tags: [
      "Next.js",
      "Typescript",
      "Zustand",
      "Tailwindcss",
      "Framer motion",
      "Gsap",
      "Vercel",
    ],
    image: {
      LIGHT: "/images/projects/sfera-solution.webp",
      DARK: "/images/projects/sfera-solution.webp",
    },
  },
  {
    index: 1,
    title: "Geodeziya",
    href: "/projects",
    tags: ["React.js", "Typescript", "Tailwindcss", "Vite", "React-router-dom"],
    image: {
      LIGHT: "/images/projects/geodezistlight.webp",
      DARK: "/images/projects/geodezistdark.webp",
    },
  },
  {
    index: 2,
    title: "Bookers",
    href: "/projects",
    tags: [
      "React.js",
      "Typescript",
      "Vite",
      "Tailwindcss",
      "Zustand",
      "React-router-dom",
    ],
    image: {
      LIGHT: "/images/projects/bookerslight.webp",
      DARK: "/images/projects/bookersdark.webp",
    },
  },
];

export const PROJECTS_CARD: ProjectCardProps[] = [
  {
    name: "Sfera IT Solution",
    favicon: "/images/projects/logos/solution.ico",
    imageUrl: [
      "/images/projects/sfera-solution.webp",
      "/images/projects/sferacard1.webp",
      "/images/projects/sferacard2.webp",
      "/images/projects/sferacard3.webp",
      "/images/projects/sferacard4.webp",
    ],
    description:
      "SFERA IT SOLUTION is an IT outsourcing company that provides digital services such as web and mobile development, UI/UX design, software solutions, and IT consulting for businesses and startups.",
    sourceCodeHref: "https://github.com/Alisher0903/sfera-solutions",
    liveWebsiteHref: "https://sfera-solution.vercel.app",
  },
  {
    name: "Geodeziya",
    favicon: "/images/projects/logos/geodezist.ico",
    imageUrl: [
      "/images/projects/geodezistdark.webp",
      "/images/projects/geodezistlight.webp",
      "/images/projects/geodezistclientdark.webp",
      "/images/projects/geodezistclientlight.webp",
    ],
    description:
      "GEODEZIYA is a 3-panel website and the program is mainly managed by staff and admin. In the client panel, you can only test the fields. What does the site do? -those who want to be employed in the company are required to pass these tests first, here the employees enter the tests in the direction section and pass the theoretical and practical test there. This site will save the company valuable time and increase productivity.",
    sourceCodeHref: "https://github.com/Alisher0903/quiz-dashboard",
    liveWebsiteHref: "https://gts1.uz",
  },
  {
    name: "Bookers",
    favicon: "/images/projects/logos/bookers.ico",
    imageUrl: [
      "/images/projects/bookerslight.webp",
      "/images/projects/bookersdark.webp",
      "/images/projects/bookers1.webp",
      "/images/projects/bookers2.webp",
      "/images/projects/bookers3.webp",
      "/images/projects/bookers4.webp",
      "/images/projects/bookers5.webp",
    ],
    description:
      "This project is made for barbers to gather all barbers on one platform and systematize them, masters can accept online orders and help to maintain work schedules, and clients can also leave an online request to any master they want at any time.",
    sourceCodeHref: "https://github.com/Alisher0903/bookers-admin",
    liveWebsiteHref: "http://admin.bookers.uz:36080",
  },
  {
    name: "Sfera Academy",
    favicon: "/images/projects/logos/sfera.ico",
    imageUrl: [
      "/images/projects/sferacard1.webp",
      "/images/projects/sferacard2.webp",
    ],
    description:
      "SFERA ACADEMY is a website thatprovides complete information about sfera academy, it is a site that providesinformation about courses such asbusiness training, programming courses frontend and backend, computer literacy, systemization.",
    sourceCodeHref: "https://github.com/Alisher0903/sfera-education-center",
    liveWebsiteHref: "https://sferaacademy.uz",
  },
  {
    name: "Sfera Academy | Admin",
    favicon: "/images/projects/logos/sfera.ico",
    imageUrl: [
      "/images/projects/sferacard1.webp",
      "/images/projects/sferacard2.webp",
    ],
    description:
      "SFERA ACADEMY | ADMIN is the admin panel of SFERA ACADEMY that allows managing courses, users, content, and the overall educational system efficiently.",
    sourceCodeHref: "https://github.com/Alisher0903/sfera-academy-admin",
    liveWebsiteHref: "https://admin.sferaacademy.uz",
  },
  {
    name: "Edu platform",
    favicon: "/images/projects/logos/sfera.ico",
    imageUrl: [
      "/images/projects/sferaedu1.webp",
      "/images/projects/sferaedu2.webp",
      "/images/projects/sferaedu3.webp",
      "/images/projects/sferaedu4.webp",
      "/images/projects/sferaedu5.webp",
      "/images/projects/sferaedu6.webp",
    ],
    description:
      "Platform courses are delivered by experienced instructors and combine theoretical knowledge with practical projects. Students benefit from real-world assignments, mentorship, and career support, including assistance with job placement. Graduates receive official certificates upon successful completion.",
    sourceCodeHref: "https://github.com/Alisher0903/edu-platform",
    liveWebsiteHref: "http://sferaedu.uz",
  },
  {
    name: "Tunikafon",
    favicon: "/images/projects/logos/tunika.ico",
    imageUrl: ["/images/projects/tunikafon.webp"],
    description:
      "Tunikafon is an admin panel developed to streamline operations in the industry. It helps manage employee tasks, calculate workloads, and track material usage efficiently through a centralized dashboard.",
    sourceCodeHref: "https://github.com/Alisher0903/tunikafon",
    liveWebsiteHref: "https://ustaabdulloh777.uz",
  },
  {
    name: "Qr Pay",
    favicon: "/images/projects/logos/qrpay.ico",
    imageUrl: ["/images/projects/qrpay.webp", "/images/projects/qrpay2.webp"],
    description:
      "QRPay — A QR code-based payment system with a landing page (qrpay.uz) and an admin panel (my.qrpay.uz) for managing transactions.",
    sourceCodeHref: "https://github.com/Alisher0903/cross-pay-web",
    liveWebsiteHref: "https://qrpay.uz",
  },
  {
    name: "Railway",
    favicon: "/images/projects/logos/railway.ico",
    imageUrl: [
      "/images/projects/railway1.webp",
      "/images/projects/railway2.webp",
      "/images/projects/railway3.webp",
    ],
    description:
      "RAILWAY is a 3-panel site that gives you complete control over your railway workflow. This greatly facilitates the monitoring of employees, the accounting of used equipment and similar processes through the site.",
    sourceCodeHref: "https://github.com/Alisher0903/railway",
    liveWebsiteHref: "https://railwaycom.vercel.app",
  },
  {
    name: "GSR Logistic",
    favicon: "/images/projects/logos/logistic.ico",
    imageUrl: [
      "/images/projects/gsrlogistic1.webp",
      "/images/projects/gsrlogistic2.webp",
      "/images/projects/gsrlogistic3.webp",
    ],
    description:
      "GSR LOGISTIC is a website that controls and organizes bulk cargo transportation between Uzbekistan and China. Through this project, cargo control will be greatly strengthened, and the labor force will be enriched and facilitated. - in addition, the paperwork has been systematized with a much reduced amount. One of the useful aspects is that clients can track the location, status, and arrival of their orders online.",
    sourceCodeHref: "https://github.com/Alisher0903/gsr-logistic",
    liveWebsiteHref: "https://gsrlogistic.vercel.app",
  },
  {
    name: "Sfera Academy | Old",
    favicon: "/images/projects/logos/sfera.ico",
    imageUrl: [
      "/images/projects/sfera-old.webp",
      "/images/projects/sfera-old1.webp",
      "/images/projects/sfera-old2.webp",
    ],
    description:
      "SFERA ACADEMY is a website thatprovides complete information about sfera academy, it is a site that providesinformation about courses such asbusiness training, programming courses frontend and backend, computer literacy, systemization.",
    sourceCodeHref: "https://github.com/Alisher0903/sfera-academy",
    liveWebsiteHref: "https://sferaacademy.vercel.app",
  },
  {
    name: "Snake game",
    favicon: "/images/projects/logos/snake.ico",
    imageUrl: ["/images/projects/snake.webp"],
    description:
      "Snake Game is a classic snake game built with React.js for desktop browsers. It features smooth movement, collision detection, and score tracking — all implemented using component-based logic and React state management.",
    sourceCodeHref: "https://github.com/Alisher0903/snake-game",
    liveWebsiteHref: "https://snake-game-point.vercel.app",
  },
];
