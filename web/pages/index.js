import React from 'react';
import Head from 'next/head';

const Home = () => {
  return (
    <div>
      <Head>
        <title>My Next.js App</title>
      </Head>
      <h1>Welcome to My Next.js App</h1>
      <p>This is the home page.</p>
      <button className="btn btn-primary">Click Me</button>
    </div>
  );
};

export default Home;
