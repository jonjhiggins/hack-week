import { AppProps } from 'next/app';
import Head from 'next/head';
import { createOrRetrieveUser } from '../services/createOrRetrieveUser';
import { NavBar } from '../components/NavBar';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  const { data, error } = createOrRetrieveUser()
  if (error) return "An error has occurred.";
  if (!data) return "Loading...";
  const { data: { data: profile } } = data
  return (
    <>
      <Head>
        <title>DCI Hood</title>
      </Head>
      <NavBar navLinks={[
        { name: 'Home', href: '/' },
        { name: 'Profile', href: '/profile' },
        { name: 'User Story State', href: '/user-story-state' },
        { name: 'User Timeline Hooks', href: '/user-timeline-hooks' }
      ]} />

      <main className="app">
        <Component {...pageProps} profile={profile} />
      </main>
    </>
  );

}

export default CustomApp;
