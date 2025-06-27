import { siteMetadata } from "@/data/siteMetaData.mjs";

// Person Schema for Developer Portfolio
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteMetadata.author,
  alternateName: "Alisher Sodiqov",
  description:
    "Software Developer specializing in React, Next.js, and modern web technologies",
  url: siteMetadata.siteUrl,
  image: `${siteMetadata.siteUrl}${siteMetadata.image}`,
  sameAs: [
    siteMetadata.github,
    siteMetadata.linkedin,
    siteMetadata.telegram,
    siteMetadata.instagram,
  ],
  jobTitle: "Software Developer",
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
  knowsAbout: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "Web Development",
    "Frontend Development",
    "Software Development",
  ],
  email: siteMetadata.email,
  birthPlace: {
    "@type": "Place",
    name: "Uzbekistan",
  },
  nationality: "Uzbek",
  alumniOf: {
    "@type": "Organization",
    name: "University/College", // Update with actual education
  },
};

// Website Schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "Website",
  name: siteMetadata.siteName,
  alternateName: "Alisher Sodiqov Portfolio",
  url: siteMetadata.siteUrl,
  description: "Professional portfolio of Alisher Sodiqov, Software Developer",
  publisher: {
    "@type": "Person",
    name: siteMetadata.author,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteMetadata.siteUrl}/projects?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

// Professional Service Schema
export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Alisher Sodiqov - Software Development Services",
  description:
    "Professional software development services specializing in web applications",
  provider: {
    "@type": "Person",
    name: siteMetadata.author,
    url: siteMetadata.siteUrl,
  },
  areaServed: "Worldwide",
  serviceType: "Software Development",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    itemOffered: {
      "@type": "Service",
      name: "Web Development",
      description:
        "Custom web application development using modern technologies",
    },
  },
};

// Portfolio WebPage Schema
export const portfolioPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Alisher Sodiqov - Software Developer Portfolio",
  description:
    "Professional portfolio showcasing software development projects and skills",
  url: siteMetadata.siteUrl,
  about: {
    "@type": "Person",
    name: siteMetadata.author,
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteMetadata.siteUrl,
      },
    ],
  },
};

// About Page Schema
export const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Alisher Sodiqov",
  description:
    "Learn about Alisher Sodiqov, Software Developer with expertise in modern web technologies",
  url: `${siteMetadata.siteUrl}/about`,
  mainEntity: {
    "@type": "Person",
    name: siteMetadata.author,
    jobTitle: "Software Developer",
    description: "Experienced developer with 2+ years in web development",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteMetadata.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: `${siteMetadata.siteUrl}/about`,
      },
    ],
  },
};

// Projects Collection Page Schema
export const projectsPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Projects by Alisher Sodiqov",
  description:
    "Portfolio of software development projects and web applications",
  url: `${siteMetadata.siteUrl}/projects`,
  about: {
    "@type": "CreativeWork",
    name: "Software Development Projects",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteMetadata.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${siteMetadata.siteUrl}/projects`,
      },
    ],
  },
};

// Individual Project Schema Generator
export const createProjectSchema = (project: {
  title: string;
  description: string;
  image?: string;
  url?: string;
  technologies: string[];
  dateCreated?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: project.title,
  description: project.description,
  image: project.image,
  url: project.url,
  applicationCategory: "WebApplication",
  operatingSystem: "Web Browser",
  programmingLanguage: project.technologies,
  author: {
    "@type": "Person",
    name: siteMetadata.author,
    url: siteMetadata.siteUrl,
  },
  dateCreated: project.dateCreated,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
});

// FAQ Schema for common questions
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What technologies does Alisher Sodiqov specialize in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Alisher specializes in React, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, and modern web development technologies.",
      },
    },
    {
      "@type": "Question",
      name: "How many years of experience does Alisher have?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Alisher has 2+ years of professional experience in software development, focusing on frontend and full-stack web applications.",
      },
    },
    {
      "@type": "Question",
      name: "What services does Alisher offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Alisher offers web development services including React application development, Next.js projects, responsive web design, and modern JavaScript solutions.",
      },
    },
  ],
};
