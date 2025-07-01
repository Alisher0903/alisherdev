import Script from "next/script";
import React from "react";

const Scripts = React.memo(() => {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-P9N718S8WR`}
        strategy="afterInteractive"
      />
      <Script strategy="afterInteractive" id="gtag-config">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
    
            gtag('config', 'G-P9N718S8WR');
        `}
      </Script>
    </>
  );
});

Scripts.displayName = "Scripts";

export default Scripts;
