import Head from "next/head";
import React from "react";

interface StructuredDataProps {
  data: object | object[];
}

const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  const jsonLd = Array.isArray(data) ? data : [data];

  return (
    <Head>
      {jsonLd.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item),
          }}
        />
      ))}
    </Head>
  );
};

export default StructuredData;
