import { type SkillsShowcaseProps } from "@/components/skills/skills-showcase";
import { SiSocketdotio, SiNextdotjs, SiPug } from "react-icons/si";
import {
  FramerMotionIcon,
  ReactRouterDomIcon,
  VitePwaIcon,
} from "@/components/icons";
import { FaLess } from "react-icons/fa6";
import { FaMagic } from "react-icons/fa";
import HtmlSvg from "@/public/icons/html.svg";
import CsssSvg from "@/public/icons/css.svg";
import SassSvg from "@/public/icons/sass.svg";
import JavascriptSvg from "@/public/icons/javascript.svg";
import TypescriptSvg from "@/public/icons/typescript.svg";
import FaBootstrap from "@/public/icons/bootstrap.svg";
import ReactjsSvg from "@/public/icons/reactjs.svg";
import SolidjsSvg from "@/public/icons/solidjs.svg";
import TailwindcssSvg from "@/public/icons/tailwindcss.svg";
import MuiSvg from "@/public/icons/mui.svg";
import ViteSvg from "@/public/icons/vite.svg";
import GitSvg from "@/public/icons/git.svg";
import PostmanSvg from "@/public/icons/postman.svg";
import FaShadcn from "@/public/icons/shadcn.svg";
import FaAntd from "@/public/icons/antd.svg";
import FaAceternity from "@/public/icons/aceternity.svg";
import FaGsap from "@/public/icons/gsap.svg";
import FaZustand from "@/public/icons/zustand.svg";
import FaReactQuery from "@/public/icons/react-query.svg";
import FaGithub from "@/public/icons/github.svg";
import FaGitlab from "@/public/icons/GitLab.svg";
import FaAxios from "@/public/icons/axios.svg";
import FaWebsocket from "@/public/icons/websocket.svg";
import FaRestApi from "@/public/icons/rest-api-icon.svg";
import emailjs from "@/public/icons/emailjs.svg";
import cicd from "@/public/icons/ci-cd.svg";

export const SKILLS_DATA: SkillsShowcaseProps["skills"] = [
  {
    sectionName: "Markup & Styling",
    skills: [
      {
        name: "HTML",
        icon: HtmlSvg,
      },
      {
        name: "PUG",
        icon: SiPug,
      },
      {
        name: "CSS",
        icon: CsssSvg,
      },
      {
        name: "SCSS / SASS",
        icon: SassSvg,
      },
      {
        name: "Tailwind CSS",
        icon: TailwindcssSvg,
      },
      {
        name: "Bootstrap",
        icon: FaBootstrap,
      },
      {
        name: "Less",
        icon: FaLess,
      },
    ],
  },
  {
    sectionName: "UI Libraries / Component Frameworks",
    skills: [
      {
        name: "Ant Design",
        icon: FaAntd,
      },
      {
        name: "Material UI",
        icon: MuiSvg,
      },
      {
        name: "Shadcn UI",
        icon: FaShadcn,
      },
      {
        name: "Magic UI",
        icon: FaMagic,
      },
      {
        name: "Aceternity UI",
        icon: FaAceternity,
      },
    ],
  },
  {
    sectionName: "Animations & Motion",
    skills: [
      {
        name: "GSAP",
        icon: FaGsap,
      },
      {
        name: "Framer motion",
        icon: FramerMotionIcon,
      },
    ],
  },
  {
    sectionName: "Programming Languages",
    skills: [
      {
        name: "Javascript",
        icon: JavascriptSvg,
      },
      {
        name: "Typescript",
        icon: TypescriptSvg,
      },
    ],
  },
  {
    sectionName: "Frontend Frameworks & Libraries",
    skills: [
      {
        name: "React.js",
        icon: ReactjsSvg,
      },
      {
        name: "Next.js",
        icon: SiNextdotjs,
      },
      {
        name: "Solid.js",
        icon: SolidjsSvg,
      },
      {
        name: "React Native",
        icon: ReactjsSvg,
      },
      {
        name: "React Router Dom",
        icon: ReactRouterDomIcon,
      },
    ],
  },
  {
    sectionName: "Build Tools / Tooling",
    skills: [
      {
        name: "Vite",
        icon: ViteSvg,
      },
      {
        name: "Vite PWA",
        icon: VitePwaIcon,
      },
    ],
  },
  {
    sectionName: "State Management",
    skills: [
      {
        name: "Zustand",
        icon: FaZustand,
      },
    ],
  },
  {
    sectionName: "Data Fetching & Async Tools",
    skills: [
      {
        name: "React Query",
        icon: FaReactQuery,
      },
      {
        name: "Axios",
        icon: FaAxios,
      },
    ],
  },
  {
    sectionName: "Real-Time Communication",
    skills: [
      {
        name: "Socket.io",
        icon: SiSocketdotio,
      },
      {
        name: "Websocket",
        icon: FaWebsocket,
      },
    ],
  },
  {
    sectionName: "API Integration & Communication",
    skills: [
      {
        name: "Rest API",
        icon: FaRestApi,
      },
      {
        name: "EmailJS",
        icon: emailjs,
      },
    ],
  },
  {
    sectionName: "Version Control & DevOps",
    skills: [
      {
        name: "Git",
        icon: GitSvg,
      },
      {
        name: "GitHub",
        icon: FaGithub,
      },
      {
        name: "GitLab",
        icon: FaGitlab,
      },
      {
        name: "CI/CD (GitHub Actions)",
        icon: cicd,
      },
      {
        name: "Postman",
        icon: PostmanSvg,
      },
    ],
  },
];
