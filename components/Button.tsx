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
  const { open } = createPopup('UBaQ2F2X');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault(); // Prevent default anchor tag behavior (scrolling to top)

    // Open the Typeform popup
    open();
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
