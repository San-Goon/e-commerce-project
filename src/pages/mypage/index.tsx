import MyPageComponent from '@components/MyPage';
import HomeLayout from '@components/common/@Layout/HomeLayout';

const MyPage = () => {
  return <HomeLayout content={<MyPageComponent />} />;
};

export default MyPage;
