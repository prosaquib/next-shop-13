import Head from "next/head";
import { FC } from "react";
import Title from "./Title";
import Navbar from "./Navbar";

interface PageProps {
  title: string;
  children: React.ReactNode;
}

const Page: FC<PageProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{`${title} - Next Shop`}</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className='px-6 py-6'>
        <Title>Next Shop</Title>
        {children}
      </main>
    </>
  );
};

export default Page;
