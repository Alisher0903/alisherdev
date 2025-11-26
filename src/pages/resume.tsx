import {
  faqSchema,
  portfolioPageSchema,
  professionalServiceSchema,
} from "@/utils/structured-data";

import Head from "next/head";
import { NextSeo } from "next-seo";
import StructuredData from "@/components/seo/structured-data";
import { siteMetadata } from "@/data/siteMetaData";

const Resume = () => {
  return (
    <>
      <NextSeo
        title="Alisher Sodiqov | Resume builder"
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
      <div className="w-full">
        <div className="mx-auto max-w-7xl overflow-hidden">
          <iframe
            src="https://www.open-resume.com/resume-builder"
            className="w-full min-h-[80vh] -translate-y-14"
            title="Resume Builder by Alisher Sodiqov"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Resume;
