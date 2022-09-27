import Head from 'next/head';
import React from 'react';

import ReviewPage from '@components/ReviewPage';
import HomeLayout from '@components/common/@Layout/HomeLayout';

const Review = () => {
  return (
    <>
      <Head>
        <title>똑똑한 개발자 | 리뷰</title>
      </Head>
      <HomeLayout content={<ReviewPage />} />
    </>
  );
};

export default Review;
