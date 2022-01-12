import { useState } from 'react'
import Image from 'next/image'
import styles from '../styles/HomeGallery.module.scss'
import HomeGalleryImages from '../data/HomeGalleryImages'
import Link from 'next/link'

const HomeGallery = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const length  = HomeGalleryImages.length

    const nextSlide = () => {
        setCurrentSlide(currentSlide === length - 1 ? 0 : currentSlide + 1)
    }

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? length - 1 : currentSlide - 1)
    }
    
    return (<div className={styles.gallery}>
        <div onClick={prevSlide} className={styles.prev}></div>
        <div onClick={nextSlide} className={styles.next}></div>
        {HomeGalleryImages.map((image, index) => {
            return (<>
                <div key={index} className={styles.slide_container}>
                    <div className={styles.vignette}></div>
                    <div className={index === currentSlide ? `${styles.image_container} ${styles.active}` : `${styles.image_container}`}>
                        {index === currentSlide && (
                            <div className={styles.image}>
                                <Image
                                    key={index}
                                    src={image.src}
                                    alt={image.alt}
                                    placeholder="blur"
                                    layout='responsive'
                                    priority={true}
                                />
                            </div>
                        )}
                    </div>
                    {index === currentSlide && (<>
                        <h2 className={styles.image_title}>{image.title}</h2>
                        <div className={styles.description} key={`${index}_text`}>
                            <h2>{image.title}</h2>
                            <p>{image.description}</p>
                        </div>
                        <Link href="/"><a className={styles.read_more_button}>Read More</a></Link>
                    </>)}
                </div>
            </>)
        })}
    </div>)
}

export default HomeGallery