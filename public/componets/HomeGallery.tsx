import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/Gallery.module.scss'
import HomeGalleryImages from './HomeGalleryImages';

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
                <div key={index} className={index === currentSlide ? `${styles.image} ${styles.active}` : `${styles.image}`}>
                    {index === currentSlide && (
                        <Image
                            key={index} 
                            src={image.src} 
                            alt={image.alt} 
                            width={1920} 
                            height={1080} 
                            placeholder="blur"
                            layout='responsive'
                        />
                    )}
                </div>
                {index === currentSlide && (
                    <div className={styles.description} key={`${index}_text`}>
                        <h2>{image.title}</h2>
                        <p>{image.description}</p>
                    </div>
                )}
            </>)
        })}
        <div className={styles.vignette}></div>
    </div>)
}

export default HomeGallery