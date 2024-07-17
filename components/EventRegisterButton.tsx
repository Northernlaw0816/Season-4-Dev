import React from 'react';
import Link from 'next/link';
import Main from '../data/Main';
import styles from '../styles/pages/Events.module.scss';
import { createPopup } from '@typeform/embed';
import '@typeform/embed/build/css/popup.css';

/**
 * Registration button on event page to redirect to registration
 * @param event - Event Title to pass as default event value
 */
const EventsRegisterButton = ({ pathname, text }: { pathname: string, text: string }) => {
  const { open } = createPopup('UBaQ2F2X'); // Replace with your Typeform form ID

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault(); // Prevent default anchor tag behavior

    // Open the Typeform popup
    open();
  };

  return (
    <div className={styles.register_link_align}>
      {Main.registrationClosingDate.getTime() <= new Date().getTime() ? (
        <a className={styles.register_link}>Registrations Closed</a>
      ) : (
        <a href="#" className={styles.register_link} onClick={handleClick}>
          {text}
        </a>
      )}
    </div>
  );
};

export default EventsRegisterButton;
