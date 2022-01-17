import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    render() {
        return <Html lang="en">
            <Head>
                <link rel="icon" href="/favicon.svg" />
                <meta name="description" content="Offical NuTopia Website | Season 1" />
                <meta property="og:image" content="../public/images/home-gallery/1.jpg" />
                <meta property="og:url" content="https://www/nutopia.in/" />
                <meta property="og:title" content="NuTopia" />
                <meta property="og:description" content="Offical NuTopia Website | Season 1" />
            </Head>

            <body>
                <Main/>
            </body>

            <NextScript/>
        </Html>
    }
}