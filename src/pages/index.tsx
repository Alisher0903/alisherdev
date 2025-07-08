import Head from "next/head";

import { NextSeo } from "next-seo";

import LandingHero from "@/components/landing-hero";
import SkillsShowcase from "@/components/skills/skills-showcase";
import ProjectShowcase from "@/components/projects/project-showcase";
import StructuredData from "@/components/seo/structured-data";
import { PROJECT_SHOWCASE } from "@/data/projects";
import { SKILLS_DATA } from "@/data/skills";
import { siteMetadata } from "@/data/siteMetaData";
import {
  portfolioPageSchema,
  professionalServiceSchema,
  faqSchema,
} from "@/utils/structured-data";

export default function Home() {
  return (
    <>
      <NextSeo
        title="Alisher Sodiqov | Software Developer"
        description="Explore the professional portfolio of Alisher Sodiqov, a skilled Software Developer with 2 years of hands-on experience. Discover innovative projects, expertise in modern web technologies, and a passion for creating seamless user experiences."
        canonical={siteMetadata.siteUrl}
        openGraph={{
          url: siteMetadata.siteUrl,
          title: "Alisher Sodiqov - Software Developer",
          description:
            "Dive into the world of web development with Alisher Sodiqov. Discover a Software Developer with 2 years of expertise, showcasing cutting-edge projects and a commitment to crafting exceptional user interfaces.",
          images: [
            {
              url: `${siteMetadata.siteUrl}${siteMetadata.twitterImage}`,
              alt: "Alisher Sodiqov - Portfolio Image",
            },
          ],
          siteName: siteMetadata.siteName,
          type: "website",
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "Alisher Sodiqov, Software Developer, React Developer, Frontend Developer, Next.js Developer, TypeScript Developer, Web Developer, JavaScript, HTML, CSS, Portfolio, UI/UX, React.js, Frontend Development, Web Development, JavaScript Developer, Responsive Design, Uzbekistan Developer",
          },
          {
            name: "author",
            content: siteMetadata.author,
          },
          {
            name: "robots",
            content: "index, follow",
          },
          {
            name: "language",
            content: "English",
          },
          {
            name: "revisit-after",
            content: "7 days",
          },
        ]}
      />
      <Head>
        {siteMetadata.googleSiteVerification && (
          <meta
            name="google-site-verification"
            content={siteMetadata.googleSiteVerification}
          />
        )}
      </Head>
      <StructuredData
        data={[portfolioPageSchema, professionalServiceSchema, faqSchema]}
      />
      <LandingHero />
      <SkillsShowcase skills={SKILLS_DATA} />
      <ProjectShowcase projects={PROJECT_SHOWCASE} />
    </>
  );
}
