import { NextSeo } from "next-seo";

import ProjectCard from "@/components/projects/project-card";
import StructuredData from "@/components/seo/structured-data";
import { PROJECTS_CARD } from "@/data/projects";
import { siteMetadata } from "@/data/siteMetaData";
import { projectsPageSchema } from "@/utils/structured-data";

export default function Projects() {
  return (
    <>
      <NextSeo
        title="Projects by Alisher Sodiqov - Software Developer Portfolio"
        description="Explore a collection of projects by Alisher Sodiqov, a seasoned Software Developer. From innovative web applications to responsive interfaces, discover the depth and diversity of my work."
        canonical={`${siteMetadata.siteUrl}/projects`}
        openGraph={{
          url: `${siteMetadata.siteUrl}/projects`,
          title: "Discover Projects by Alisher Sodiqov - Software Developer",
          description:
            "Explore a showcase of projects crafted by Alisher Sodiqov, a Software Developer. Witness the fusion of creativity and technology in web development.",
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
              "Alisher Sodiqov Projects, Portfolio Projects, Software Developer, React Developer, Frontend Developer, Web Development, JavaScript, HTML, CSS, UI/UX, Web Applications, Responsive Design, Next.js Projects",
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
      <StructuredData data={projectsPageSchema} />
      <section className="mx-auto mb-40 mt-6 w-full gap-20 px-6 sm:mt-12 sm:px-14 md:px-20">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-heading text-2xl font-bold text-foreground md:text-4xl">
            Projects
          </h1>
          <div className="my-2">
            <span className="text-sm text-muted-foreground">
              Here are some of the projects I&apos;d like to share
            </span>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-2">
            {PROJECTS_CARD.map((card, index) => (
              <ProjectCard key={index} {...card} />
            ))}
          </div>
          <div className="mx-auto mt-16 max-w-5xl text-center text-foreground md:mt-28">
            <span className="font-heading text-xl font-bold md:text-2xl">
              I am currently building new projects and learning backend
              development to expand my skill set beyond frontend.
            </span>
            <p className="mt-10 text-base md:text-xl font-normal">
              Visit my github to see some of the latest projects{" "}
              <a
                href={`${siteMetadata.github}?tab=repositories`}
                target="_blank"
                className="font-semibold text-accent underline underline-offset-2 hover:text-accent/70"
              >
                Github
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
