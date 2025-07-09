import Head from 'next/head';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>AutoCase – Études de cas en 15 min</title>
        <meta
          name="description"
          content="Générez des études de cas percutantes à partir de vos données CRM en quelques minutes."
        />
      </Head>
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </>
  );
}
abc