import React from 'react';
import Link from 'next/link';
import styles from '../styles/components/Button.module.scss';
import { createPopup } from '@typeform/embed';
import '@typeform/embed/build/css/popup.css';

const Button: React.FC<{ text?: string; children?: React.ReactNode; href?: string }> = ({
  text,
  children,
  href,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault(); // Prevent default anchor tag behavior

    // Open the page in fullscreen mode
    const docEl = document.documentElement;
    if (docEl.requestFullscreen) {
      docEl.requestFullscreen();
    } else if ((docEl as any).mozRequestFullScreen) { // Firefox
      (docEl as any).mozRequestFullScreen();
    } else if ((docEl as any).webkitRequestFullscreen) { // Chrome, Safari and Opera
      (docEl as any).webkitRequestFullscreen();
    } else if ((docEl as any).msRequestFullscreen) { // IE/Edge
      (docEl as any).msRequestFullscreen();
    }

    const { open } = createPopup('UBaQ2F2X', {
      onSubmit: () => exitFullscreen(),
      onClose: () => exitFullscreen()
    });

    // Open the Typeform popup
    open();
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).mozCancelFullScreen) { // Firefox
      (document as any).mozCancelFullScreen();
    } else if ((document as any).webkitExitFullscreen) { // Chrome, Safari and Opera
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) { // IE/Edge
      (document as any).msExitFullscreen();
    }
  };

  return (
    <Link href={href ? href : ""}>
      <a href="#" className={styles.button} onClick={handleClick}>
        {children ? children : text}
      </a>
    </Link>
  );
};

export default Button;
