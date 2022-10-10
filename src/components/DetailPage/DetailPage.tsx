import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ChakraStylesConfig, Select } from 'chakra-react-select';
import dayjs from 'dayjs';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  Tag,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import cartApi from '@apis/cart/CartApi';
import {
  usePostCartItemMutation,
  usePostCartMutation,
} from '@apis/cart/CartApi.mutation';
import { useGetCartQuery } from '@apis/cart/CartApi.query';
import { useGetProductByIdQuery } from '@apis/product/ProductApi.query';
import { useGetMeQuery } from '@apis/user/UserApi.query';

import ImagesComponent from '@components/common/ImagesComponent';
import ArrowDown from '@icons/System/ArrowDown';
import ArrowUp from '@icons/System/ArrowUp';

import { formatAvgRate, formatPrice } from '@utils/format';
import { getToken } from '@utils/localStorage/token';
import { IProduct } from '@utils/types';

import { RatingStarIcon } from '../../generated/icons/MyIcons';
import useMoveScroll from '../../hooks/useMoveScroll';

const chakraSelectStyle: ChakraStylesConfig = {
  dropdownIndicator: (provided) => ({
    ...provided,
    p: 0,
    bg: 'gray.200',
  }),
  container: (provided) => ({
    ...provided,
    w: '86px',
    bg: 'gray.200',
    borderRadius: '5px',
    cursor: 'pointer',
  }),
  control: (provided) => ({
    ...provided,
    fontSize: '12px',
    fontWeight: '700',
    m: 0,
    borderRadius: '5px',
  }),
  menu: (provided) => ({
    ...provided,
    my: 0,
    bg: 'gray.200',
    borderRadius: '5px',
  }),
  menuList: (provided) => ({
    ...provided,
    bg: 'gray.200',
    border: '0px',
  }),
  option: (provided) => ({
    ...provided,
    fontSize: '12px',
    fontWeight: '700',
  }),
};

interface IProps {
  productData: IProduct;
}

const DetailPage = ({ productData }: IProps) => {
  const { mutate: cartMutate } = usePostCartItemMutation();
  const { mutate: postCartIdMutate, data: MutateData } = usePostCartMutation();
  const [cartId, setCartId] = useState('');
  useGetMeQuery({
    options: {
      onSuccess: async ({ data }) => {
        try {
          const myCart = await cartApi.getCart(data.id.toString());
          if (myCart.length === 0) {
            try {
              const postCart = await cartApi.postCart({
                userId: data.id.toString(),
              });
              console.log('postCart', postCart);
            } catch (error) {
              console.error('장바구니를 불러오는데 실패했습니다.', error);
            }
          } else {
            setCartId(myCart[0].id);
          }
        } catch (error) {
          console.error('장바구니를 불러오는데 실패했습니다.', error);
        }
      },
    },
  });

  const router = useRouter();
  useEffect(() => {
    const token = getToken();
    if (!token) {
      alert('로그인 후 이용해주세요.');
      router.push('/login');
    }
  }, []);
  const { id }: any = router.query;
  const { data } = useGetProductByIdQuery({
    variables: id,
    options: { initialData: productData },
  });
  const [countRate, setCountRate] = useState([0, 0, 0, 0, 0]);
  const [sortedArray, setSortedArray] = useState<any>([]);

  const [sortValue, setSortValue] = useState('최신순');
  const [showValue, setShowValue] = useState('전체보기');
  const [showAll, setShowAll] = useState(false);

  const [count, setCount] = useState(1);

  const { element: detail, onMoveToElement: onMoveToDetail } = useMoveScroll();
  const { element: info, onMoveToElement: onMoveToInfo } = useMoveScroll();
  const { element: review, onMoveToElement: onMoveToReview } = useMoveScroll();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const tempArr = [0, 0, 0, 0, 0];
    for (const review of data.reviewList) {
      tempArr[review.rate - 1] += 1;
    }
    setCountRate(tempArr);
  }, [data.reviewList]);

  console.log('data:', data);

  useEffect(() => {
    let tempArr = [...data.reviewList];
    if (sortValue === '최신순') {
      tempArr.sort(
        (a, b) => Number(new Date(b.created)) - Number(new Date(a.created)),
      );
    } else if (sortValue === '평점 높은순') {
      tempArr.sort((a, b) => b.rate - a.rate);
    } else if (sortValue === '평점 낮은순') {
      tempArr.sort((a, b) => a.rate - b.rate);
    }
    if (showValue === '포토리뷰') {
      tempArr = tempArr.filter((item) => item.reviewimageSet.length !== 0);
    }
    setSortedArray(tempArr);
  }, [sortValue, showValue, data.reviewList]);

  return (
    <Box mt="116px" mb="80px">
      <Center>
        <Image src={data.photo} alt={data.name} />
      </Center>
      <Box
        p="16px"
        boxShadow="0px 0px 10px rgba(26, 26, 26, 0.1)"
        borderRadius="20px 20px 0px 0px"
      >
        <Text textStyle="lg" fontWeight="700">
          {data.name}{' '}
          <Text as="span" fontWeight="400" color="gray.600">
            {data.capacity}ml
          </Text>
        </Text>
        <Text mt="14px" textStyle="lg">
          <Text as="span" color="primary.500" fontWeight="700">
            {formatPrice(data.price)}
          </Text>
          원
        </Text>
        <Text textStyle="sm">
          3만원 이상 구매시{' '}
          <Text as="span" color="primary.500">
            무료배송
          </Text>
        </Text>
        <Text mt="10px">{data.description}</Text>
        <Flex alignItems="center" mt="10px">
          <RatingStarIcon boxSize="16px" color="primary.500" />
          <Text textStyle="md" fontWeight="700">
            {formatAvgRate(data.avgRate)}
          </Text>
          <Text ml="5px" textStyle="md" textColor="gray.600">
            ({data.reviewCount}개 리뷰)
          </Text>
        </Flex>
        <Center mt="20px" flexDirection="column">
          <Button colorScheme="primary" mt="10px" onClick={onOpen}>
            상품담기
          </Button>
        </Center>
        <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent
            pt="20px"
            borderRadius="20px 20px 0px 0px"
            boxShadow=" 0px 0px 10px rgba(26, 26, 26, 0.1)"
          >
            <DrawerBody>
              <Box bg="gray.200" p="10px">
                <Text textStyle="md" color="gray.600">
                  {data.name}
                </Text>
                <Flex justifyContent="space-between">
                  <Flex textAlign="center" bg="white">
                    <Box
                      boxSize="25px"
                      border="1px"
                      borderColor="gray.300"
                      onClick={() => {
                        if (count > 1) {
                          setCount((prev) => prev - 1);
                        }
                      }}
                      cursor="pointer"
                    >
                      -
                    </Box>
                    <Box boxSize="25px" border="1px" borderColor="gray.300">
                      {count}
                    </Box>
                    <Box
                      boxSize="25px"
                      border="1px"
                      borderColor="gray.300"
                      onClick={() => {
                        setCount((prev) => prev + 1);
                      }}
                      cursor="pointer"
                    >
                      +
                    </Box>
                  </Flex>
                  <Text textStyle="md" color="gray.600" fontWeight="700">
                    {formatPrice(data.price * count)}원
                  </Text>
                </Flex>
              </Box>
              <Flex justifyContent="space-between" mt="5px">
                <Text textStyle="md">
                  총 수량{' '}
                  <Text as="span" color="primary.500" fontWeight="700">
                    {count}
                  </Text>{' '}
                  개
                </Text>
                <Text textStyle="md">
                  합계{' '}
                  <Text as="span" fontWeight="700">
                    {formatPrice(data.price * count)}원
                  </Text>
                </Text>
              </Flex>
              <Flex justifyContent="space-around" mt="15px" mb="30px">
                <Button
                  colorScheme="primary"
                  w="165px"
                  h="50px"
                  onClick={() => {
                    cartMutate({ productId: data.id, cartId, count });
                  }}
                >
                  장바구니
                </Button>
                <Button
                  colorScheme="primary"
                  w="165px"
                  h="50px"
                  onClick={() => {
                    router.push({
                      pathname: '/payment',
                      query: { id: id, count: count },
                    });
                  }}
                >
                  바로구매
                </Button>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
      <Flex justifyContent="space-around" my="26px">
        <Box onClick={onMoveToDetail} cursor="pointer">
          <Text textStyle="md" color="primary.500" fontWeight="700">
            상세정보
          </Text>
        </Box>
        <Box onClick={onMoveToInfo} cursor="pointer">
          <Text textStyle="md" color="gray.600">
            구매정보
          </Text>
        </Box>
        <Box onClick={onMoveToReview} cursor="pointer">
          <Text textStyle="md" color="gray.600">
            리뷰 ({data.reviewCount})
          </Text>
        </Box>
      </Flex>
      <Box>
        <Flex
          justifyContent="center"
          ref={detail}
          position="relative"
          {...(!showAll && { height: '500px' })}
          overflow="hidden"
        >
          <Box dangerouslySetInnerHTML={{ __html: data.detail }} />
          <Flex position="absolute" bottom="10px">
            <Button
              onClick={() => {
                setShowAll((prev) => !prev);
              }}
            >
              {showAll ? (
                <>
                  상세정보 접기 <ArrowUp boxSize="16px" />
                </>
              ) : (
                <>
                  상세정보 펼쳐보기
                  <ArrowDown boxSize="16px" />
                </>
              )}
            </Button>
          </Flex>
        </Flex>
        <Accordion allowToggle bg="gray.100" ref={info}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" textStyle="md" fontWeight="700">
                  주문 및 배송 안내
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb="20px">
              <Box>
                <Text textStyle="md" fontWeight="700">
                  [주문 및 배송 안내]
                </Text>
                <Box textStyle="md">
                  <Text mt="20px">배송방법: 인코스런 택배 </Text>
                  <Text mt="10px">배송지역: 전국</Text>
                  <Text mt="10px">
                    배송비용: 단품 상품 구매 시 3,000원의 배송비 발생 그 외 단품
                    묶음 구매의 경우 30,000원 이상 구매시 무료 배송
                  </Text>
                </Box>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Box m="16px" ref={review}>
          <Flex mt="50px" justifyContent="space-between">
            <Text textStyle="md" fontWeight="700">
              리뷰{' '}
              <Text as="span" color="primary.500">
                {data.reviewCount}
              </Text>
              건
            </Text>
            <Flex>
              <Box>
                <Select
                  size="sm"
                  instanceId="sortSelect"
                  focusBorderColor="gray.200"
                  isSearchable={false}
                  onChange={(e: any) => setSortValue(e.value)}
                  options={[
                    { value: '최신순', label: '최신순' },
                    { value: '평점 높은순', label: '평점 높은순' },
                    { value: '평점 낮은순', label: '평점 낮은순' },
                  ]}
                  defaultValue={{ value: '최신순', label: '최신순' }}
                  chakraStyles={chakraSelectStyle}
                />
              </Box>
              <Box ml="10px">
                <Select
                  size="sm"
                  instanceId="filterSelect"
                  isSearchable={false}
                  focusBorderColor="gray.200"
                  onChange={(e: any) => setShowValue(e.value)}
                  options={[
                    { value: '전체보기', label: '전체보기' },
                    { value: '포토리뷰', label: '포토리뷰' },
                  ]}
                  defaultValue={{ value: '전체보기', label: '전체보기' }}
                  chakraStyles={chakraSelectStyle}
                />
              </Box>
            </Flex>
          </Flex>
          <Flex mt="32px">
            <Flex w="50%" alignItems="center">
              <Tag bg="primary.500" size="md" color="white" borderRadius="15px">
                {formatAvgRate(data.avgRate)}
              </Tag>
              {[1, 2, 3, 4, 5].map((rate) => {
                return (
                  <RatingStarIcon
                    key={rate}
                    mx="3px"
                    boxSize="10px"
                    color={
                      rate <= formatAvgRate(data.avgRate)
                        ? 'primary.500'
                        : 'gray.400'
                    }
                  />
                );
              })}
            </Flex>
            <Box w="50%" borderLeft="1px" borderColor="gray.200">
              <Flex justifyContent="space-around">
                {[5, 4, 3, 2, 1].map((rate) => {
                  const height = (countRate[rate - 1] / data.reviewCount) * 50;
                  return (
                    <Box
                      key={rate}
                      bg="secondary.500"
                      w="10px"
                      h="50px"
                      borderRadius="5px 5px 0 0"
                      position="relative"
                    >
                      <Box
                        bg="primary.500"
                        w="10px"
                        h={`${height}px`}
                        borderRadius="5px 5px 0 0"
                        position="absolute"
                        bottom="0"
                      />
                    </Box>
                  );
                })}
              </Flex>
              <Divider />
              <Flex
                mt="4px"
                justifyContent="space-around"
                textStyle="sm"
                color="gray.600"
              >
                <Text>5점</Text>
                <Text>4점</Text>
                <Text>3점</Text>
                <Text>2점</Text>
                <Text>1점</Text>
              </Flex>
            </Box>
          </Flex>
          {sortedArray.map((item: any) => {
            return (
              <Box
                key={item.id}
                py="25px"
                borderBottom="1px"
                borderColor="gray.200"
              >
                <Flex justifyContent="space-between">
                  <Box>
                    <Text textStyle="sm" fontWeight="700">
                      {item.nickname}
                    </Text>
                    <Text mt="2px" textStyle="sm" color="gray.600">
                      {dayjs(item.created).format('YYYY-MM-DD')}
                    </Text>
                  </Box>
                  <Flex>
                    {[1, 2, 3, 4, 5].map((rate) => {
                      return (
                        <RatingStarIcon
                          key={rate}
                          mx="3px"
                          boxSize="10px"
                          color={rate <= item.rate ? 'primary.500' : 'gray.400'}
                        />
                      );
                    })}
                  </Flex>
                </Flex>
                <Text mt="17px">{item.content}</Text>
                <Flex mt="10px">
                  {item.reviewimageSet.map((item: any, idx: number) => {
                    return <ImagesComponent url={item.url} key={idx} />;
                  })}
                </Flex>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default DetailPage;
