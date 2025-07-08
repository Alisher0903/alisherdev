import { NextSeo } from "next-seo";

import AboutHero from "@/components/about-hero";
import ExperienceShowcaseList from "@/components/experience/experience-showcase-list";
import StructuredData from "@/components/seo/structured-data";
import { EXPERIENCE } from "@/data/experience";
import { EDUCATION } from "@/data/education";
import { siteMetadata } from "@/data/siteMetaData";
import { aboutPageSchema } from "@/utils/structured-data";

export default function About() {
  return (
    <>
      <NextSeo
        title="About Alisher Sodiqov | Software Developer"
        description="Learn more about Alisher Sodiqov, a dedicated Software Developer with 2 years of experience. Discover the journey, skills, and passion that drive me to create innovative and user-friendly web solutions."
        canonical={`${siteMetadata.siteUrl}/about`}
        openGraph={{
          url: `${siteMetadata.siteUrl}/about`,
          title: "Learn About Alisher Sodiqov - Software Developer",
          description:
            "Dive into the story of Alisher Sodiqov, a Software Developer. Uncover the experiences, skills, and passion that fuel a commitment to delivering exceptional web solutions.",
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
              "Alisher Sodiqov About, Software Developer portfolio, Software Developer, React Developer, Frontend Developer, Web Developer, JavaScript, HTML, CSS, Professional Journey, Skills, Passion for Web Development, Experience, Education",
          },
          {
            name: "author",
            content: siteMetadata.author,
          },
          {
            name: "robots",
            content: "index, follow",
          },
        ]}
      />
      <StructuredData data={aboutPageSchema} />
      <AboutHero />
      <ExperienceShowcaseList title="Experience" details={EXPERIENCE} />
      <ExperienceShowcaseList title="Education" details={EDUCATION} />
    </>
  );
}
