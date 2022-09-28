import CartPage from '@components/CartPage';
import HomeLayout from '@components/common/@Layout/HomeLayout';

const Cart = () => {
  return <HomeLayout content={<CartPage />} />;
};

export default Cart;
