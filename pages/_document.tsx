import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    render() {
        return <Html lang="en">
            <Head>
                <link rel="icon" href="/favicon.svg" />
                <meta name="description" content="Offical NuTopia Website | Season 1" />
            </Head>

            <body>
                <Main/>
            </body>

            <NextScript/>
        </Html>
    }
}