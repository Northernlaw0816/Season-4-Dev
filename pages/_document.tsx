import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    render() {
        return <Html lang="en">
            <Head>
                <link rel="icon" href="/favicon.svg" />
                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="NuTopia" />
                <meta property="twitter:description" content="Offical NuTopia Website | Season 1" />
                <meta property="twitter:image" content="https://nutopia-beta.vercel.app/images/home-gallery/1.jpg" />
                
                {/* Open Graph */}
                <meta property="og:locale" content="en-US" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="NuTopia" />
                <meta property="og:url" content="https://www/nutopia.in/" />
                <meta property="og:title" content="NuTopia" />
                <meta property="og:description" content="Offical NuTopia Website | Season 1" />
                <meta property="og:image" content="https://nutopia-beta.vercel.app/images/home-gallery/1.jpg" />
                
                {/* Default */}
                <meta name="title" content="NuTopia" />
                <meta name="description" content="Offical NuTopia Website | Season 1" />
            </Head>

            <body>
                <Main/>
            </body>

            <NextScript/>
        </Html>
    }
}