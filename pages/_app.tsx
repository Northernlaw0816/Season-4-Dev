import '../styles/globals.css';
import '../styles/components/RegistrationForm.module.scss';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;