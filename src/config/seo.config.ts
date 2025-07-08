import { DefaultSeoProps } from "next-seo";
import { siteMetadata } from "@/data/siteMetaData";

const defaultSEOConfig: DefaultSeoProps = {
  title: "Alisher Sodiqov | Software Developer",
  titleTemplate: "%s | Alisher Sodiqov",
  defaultTitle: "Alisher Sodiqov | Software Developer",
  description:
    "Experienced Software Developer specializing in React, Next.js, and modern web technologies. Building scalable, user-friendly applications with clean code and innovative solutions.",
  canonical: siteMetadata.siteUrl,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.siteName,
    title: "Alisher Sodiqov | Software Developer",
    description:
      "Professional portfolio showcasing 2+ years of software development expertise. Specializing in React, Next.js, TypeScript, and modern web technologies.",
    images: [
      {
        url: `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`,
        width: 1200,
        height: 630,
        alt: "Alisher Sodiqov - Software Developer Portfolio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    handle: "@alisherdev",
    site: "@alisherdev",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    },
    {
      name: "robots",
      content: "index,follow",
    },
    {
      name: "author",
      content: siteMetadata.author,
    },
    {
      httpEquiv: "x-ua-compatible",
      content: "IE=edge",
    },
    {
      name: "theme-color",
      content: "#0ea5e9",
    },
    {
      name: "msapplication-TileColor",
      content: "#0ea5e9",
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/icons/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "manifest",
      href: "/manifest.json",
    },
  ],
};

export default defaultSEOConfig;
