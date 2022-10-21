import type { NextPage } from "next";
import Head from "next/head";
import { Navbar } from "../components";

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      {/* Header */}
    </div>
  );
};

export default Home;
