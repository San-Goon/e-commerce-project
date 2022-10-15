import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from '@chakra-ui/react';

const ShippingInfoSection = () => {
  return (
    <Accordion allowToggle bg="gray.100">
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
  );
};

export default ShippingInfoSection;
