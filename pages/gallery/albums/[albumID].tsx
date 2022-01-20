import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import toSlug from "../../../data/toSlug"

//components
import Layout from "../../../components/Layout"
//stylesheets
import styles from "../../../styles/pages/Album.module.scss"
import Effects from "../../../styles/Effects.module.scss"
//data
import GalleyAlbumsList from "../../../data/GalleyAlbumsList"

const ImagePost = () => {
    const router = useRouter()
    const { albumID } = router.query
    let album:any = GalleyAlbumsList.find(imageobject => imageobject.id.toString() === albumID)

    const [expandedImage, setExpandedImage] = useState<any>()
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const [showImage, setShowImage] = useState<boolean>(false)
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    const expandImage = (image: any, index: number) => {
        setCurrentIndex(index)
        setExpandedImage(image)
        setIsExpanded(true)
        setTimeout(() => {
            setShowImage(true)
        }, 10);
    }

    const nextImage = () => {
        
        if (album && currentIndex != (album?.images.length -1)) {
            setExpandedImage(album.images[currentIndex + 1].src)
            setCurrentIndex(currentIndex + 1)
        } else {
            setExpandedImage(album.images[0].src)
            setCurrentIndex(0)
        }
    }

    const prevImage = () => {

        if (album && currentIndex != 0) {
            setExpandedImage(album.images[currentIndex - 1].src)
            setCurrentIndex(currentIndex - 1)
        } else {
            setExpandedImage(album.images[album.images.length - 1].src)
            setCurrentIndex(album.images.length - 1)
        }
    }

    const closeExpandedImage = () => {
        setShowImage(false)
        setTimeout ( () => setIsExpanded(false), 100)
    }

    if (!album) {

        return (<>
            <Head>
                <title>Gallery | Album Not Found</title>
            </Head>

            <Layout skipTo="#title" overrideClasses={styles.main}>
                <h1 id="title">Album Not Found</h1>
            </Layout>
        </>)
    }
    
    return <>
        <Head>
            <title>Gallery | {album.title}</title>
        </Head>

        <Layout skipTo="#description" overrideClasses={styles.main}>
            <div>
                <Link href="/gallery"><a className={`${styles.back_button} ${Effects.button_hover_effect}`}>Back to Gallery</a></Link>
            </div>
            <h1 id="title">{album.title}</h1>
            <p id="description">{album.description}</p>
            <div className={styles.image_grid}>
                {album.images.map((image: any, index: any) => {
                    return (<div key={index} className={styles.image_container} onClick={() => expandImage(image.src, index)}>
                        <Image src={image.src} quality={20} alt={image.name} placeholder={"blur"}/>
                        <h2 id={toSlug(image.name)}>{image.name}</h2>
                    </div>)
                })}
            </div>
            {
                isExpanded && <div className={styles.expanded_image_container}>
                    <div className={styles.prev_button}  onClick={() => prevImage()} tabIndex={1}></div>
                    <div className={`${styles.expanded_image} ${showImage && styles.show}`}>
                        {expandedImage ? <>
                            <div className={styles.close_button} onClick={() => closeExpandedImage()} tabIndex={1}>X</div>
                            <Image src={expandedImage} alt={`Expanded Image: ${album.images[currentIndex].name}`} placeholder={"blur"}/>
                        </>: <h2>Image Not Found</h2>}
                    </div>
                    <div className={styles.next_button} onClick={() => nextImage()} tabIndex={1}></div>
                </div>
            }
        </Layout>
    </>
}

export default ImagePost