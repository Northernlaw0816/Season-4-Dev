import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    render() {
        return <Html lang="en">
            <Head>
                <link rel="icon" href="/favicon.svg" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="og:locale" content="en-US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="NuTopia" />
                <meta property="og:site_name" content="NuTopia" />
                <meta property="og:url" content="https://www/nutopia.in/" />
                <meta name="description" content="Offical NuTopia Website | Season 1" />
                <meta property="og:description" content="Offical NuTopia Website | Season 1" />
                <meta data-react-helmet="true" property="og:image" content="https://nutopia-beta.vercel.app/images/home-gallery/1.jpg" />
                <meta data-react-helmet="true" property="twitter:image" content="https://nutopia-beta.vercel.app/images/home-gallery/1.jpg" />
            </Head>

            <body>
                <Main/>
            </body>

            <NextScript/>
        </Html>
    }
}