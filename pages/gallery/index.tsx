import Head from "next/head"

//components
import HeadTemplate from "../../components/HeadTemplate"
import GalleryAlbum from "../../components/GalleryAlbumCard"
import Layout from "../../components/Layout"
//stylesheets
import styles from "../../styles/pages/AlbumGallery.module.scss"
//data
import GalleyAlbumsList from "../../data/GalleyAlbumsList"

const Gallery = () => {
    return (<>
        <HeadTemplate title={`NuTopia | Gallery`} description="NuTopia Album Gallery"/>

        <Layout skipTo="#content" overrideClasses={styles.main}>
            <h1 id="#title">Gallery</h1>
            <div className={styles.card_container}>
                {GalleyAlbumsList.map((album, index) => {
                    return <GalleryAlbum key={index} album={album} />
                })}
            </div>
        </Layout>
    </>)
}

export default Gallery