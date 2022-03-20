// import { Html, Head, Main, NextScript } from "next/document"
import Image from "next/image"
import MainData from "../data/Main"

const Document = () => {
    const title = "NuTopia"
    const description = `Official NuTopia Website | Season ${MainData.season}`
    const thumbnail = "https://nutopia.in/images/thumbnail.png"

    return (
        // <Html lang="en">
        //     <Head>
        //         <link rel="icon" href="/favicon.svg" />
        //         {/* Twitter */}
        //         <meta property="twitter:card" content="summary_large_image" />
        //         <meta property="twitter:title" content={title} />
        //         <meta property="twitter:description" content={description} />
        //         <meta property="twitter:image" content={thumbnail} />
                
        //         {/* Open Graph */}
        //         <meta property="og:locale" content="en-US" />
        //         <meta property="og:type" content="website" />
        //         <meta property="og:site_name" content={title} />
        //         <meta property="og:url" content="https://www.nutopia.in/" />
        //         <meta property="og:title" content={title} />
        //         <meta property="og:description" content={description} />
        //         <meta property="og:image" content={thumbnail} />
                
        //         {/* Default */}
        //         <meta name="title" content={title} />
        //         <meta name="description" content={description} />
        //         <meta name="theme-color" content="#00cc22" />
        //     </Head>

        //     <body>
        //         <Main/>
        //     </body>

        //     <NextScript/>
        // </Html>
        <>
            {title}
            {description}
            <Image src={thumbnail} alt="thumbnail"/>
        </>
    )
}

export default Document