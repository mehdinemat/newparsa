import { Avatar, Badge, HStack, Text, VStack } from "@chakra-ui/react";
import moment from "moment-jalaali";
import { useRouter } from "next/router";
import { GiBigDiamondRing } from "react-icons/gi";
import { IoCheckmark, IoEyeOutline } from "react-icons/io5";

const QuestionMCard = ({ data, t }) => {
  const router = useRouter();

  const handleQuestionRouter = (id) => {
    router.push(`/question_answer/${id}`);
  };
  const handleClickTags = (item) => {
    router.replace(`/questions/tag/${item?.id}/${item?.name}`);
  };

  return (
    <VStack
      w={"calc( 100vw - 50px )"}
      fontFamily={'iransans'}
      alignItems={"start"}
      borderBottom={"1px solid #E2E8F0"}
      gap={"20px"}
      mb={"20px"}
      pb={"20px"}
      padding={'15px'}
      borderRadius={'15px'}
      bgColor={'#F7F7F7'}
      boxShadow={`
      0px 3px 6px 0px #0000000D,
      0px 11px 11px 0px #0000000A,
      0px 25px 15px 0px #00000008,
      0px 44px 18px 0px #00000003,
      0px 69px 19px 0px #00000000
    `}
      onClick={(e) => handleQuestionRouter(data?.id)}
      cursor={"pointer"}
    >
   
      <VStack w={"100%"} alignItems={"start"} gap={"20px"}>
        <Text
          fontSize={"14px"}
          fontWeight={'500'}
          w="100%"
          whiteSpace="normal"
          lineHeight={"taller"}
          textAlign={"justify"}
        >
          {data?.content}
        </Text>
      
        <HStack w={"100%"} justifyContent={'space-between'}>
        <HStack w={'140px'} flexWrap="wrap">
          {data?.tags?.map((item, index) => (
            <Badge
              onClick={(e) => handleClickTags(item)}
              key={index}
              color="#16A6A6"
              bgColor="#29CCCC2B"
              height="26px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize={"14px"}
              fontWeight={"100"}
              px="8px" // optional: add some horizontal padding
            >
              {item?.name}
            </Badge>
          ))}
        </HStack>
          {/* <Divider
            orientation="vertical"
            w={"5px"}
            borderColor={"gray.400"}
            height={"40px"}
          />
          */}
 <VStack>
        <HStack alignItems={"start"} gap={"10px"}>
        <HStack color={"#999999"} alignItems={'center'}>
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.4569 6.07786C10.0867 7.9289 8.69103 9.67185 6.73262 10.0613C5.77748 10.2515 4.78666 10.1355 3.90127 9.72989C3.01587 9.32423 2.28102 8.64958 1.80136 7.80199C1.3217 6.9544 1.12167 5.97708 1.22977 5.00919C1.33786 4.04131 1.74857 3.1322 2.4034 2.41131C3.74652 0.931952 6.01442 0.524722 7.86546 1.26514" stroke="#999999" stroke-width="0.888502" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.16406 5.33765L6.01511 7.18869L10.4576 2.37598" stroke="#999999" stroke-width="0.888502" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          <Text fontSize={"7px"}>
            {data?.like_count} {t("like")}
          </Text>
        </HStack>
        <HStack color={"#999999"} alignItems={'center'}>
        <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.24761 3.92258C1.24761 3.42028 1.24761 3.06073 1.2713 2.77937C1.29381 2.50157 1.33646 2.32564 1.40872 2.18407L0.881545 1.91515C0.759524 2.15387 0.706214 2.41686 0.680151 2.73139C0.655273 3.04237 0.655273 3.43035 0.655273 3.92258H1.24761ZM1.24761 4.63338V3.92258H0.655273V4.63338H1.24761ZM0.655273 4.63338V7.59505H1.24761V4.63338H0.655273ZM0.655273 7.59505V8.72878H1.24761V7.59505H0.655273ZM0.655273 8.72878C0.655273 9.22989 1.26123 9.48104 1.61604 9.12623L1.19726 8.70745C1.20236 8.70404 1.20795 8.70145 1.21384 8.69975L1.22925 8.70094C1.23416 8.70374 1.23834 8.70767 1.24143 8.71241C1.24452 8.71715 1.24644 8.72256 1.24702 8.72819L0.655273 8.72878ZM1.61604 9.12623L2.76458 7.9777L2.3458 7.55892L1.19667 8.70805L1.61604 9.12623ZM6.99325 7.29888H2.97367V7.89122H6.99325V7.29888ZM8.73175 7.13777C8.59019 7.21003 8.41426 7.25268 8.13646 7.27578C7.85451 7.29888 7.49555 7.29888 6.99325 7.29888V7.89122C7.48607 7.89122 7.87346 7.89122 8.18444 7.86575C8.49897 7.84028 8.76196 7.78697 9.00068 7.66554L8.73175 7.13777ZM9.37858 6.49035C9.23664 6.76882 9.01022 6.99582 8.73175 7.13777L9.00068 7.66554C9.3909 7.46675 9.70816 7.1495 9.90695 6.75927L9.37858 6.49035ZM9.54029 4.75184C9.54029 5.25414 9.54029 5.61369 9.5166 5.89505C9.49409 6.17285 9.45144 6.34878 9.37858 6.49035L9.90695 6.75927C10.0284 6.52056 10.0817 6.25756 10.1072 5.94303C10.1326 5.63205 10.1326 5.24407 10.1326 4.75184H9.54029ZM9.54029 3.92258V4.75184H10.1326V3.92258H9.54029ZM9.37858 2.18407C9.45085 2.32564 9.49409 2.50157 9.51719 2.77937C9.54029 3.06073 9.54029 3.42028 9.54029 3.92258H10.1326C10.1326 3.42975 10.1326 3.04237 10.1072 2.73139C10.0817 2.41686 10.0284 2.15387 9.90695 1.91515L9.37858 2.18407ZM8.73175 1.53665C9.01031 1.67875 9.23674 1.90538 9.37858 2.18407L9.90695 1.91515C9.70816 1.52492 9.3909 1.20767 9.00068 1.00888L8.73175 1.53665ZM6.99325 1.37554C7.49555 1.37554 7.85451 1.37554 8.13646 1.39923C8.41426 1.42174 8.59019 1.46439 8.73175 1.53665L9.00068 1.00888C8.76196 0.886862 8.49897 0.834144 8.18444 0.808081C7.87346 0.783203 7.48548 0.783203 6.99325 0.783203V1.37554ZM3.79465 1.37554H6.99325V0.783203H3.79465V1.37554ZM2.05614 1.53665C2.19771 1.46498 2.37364 1.42174 2.65144 1.39864C2.9328 1.37554 3.29235 1.37554 3.79465 1.37554V0.783203C3.30182 0.783203 2.91444 0.783203 2.60346 0.808674C2.28893 0.834144 2.02594 0.887454 1.78722 1.00888L2.05614 1.53665ZM1.40872 2.18407C1.55072 1.90529 1.77736 1.67865 2.05614 1.53665L1.78722 1.00888C1.39708 1.20751 1.08043 1.52514 0.881545 1.91515L1.40872 2.18407ZM2.76458 7.9777C2.82008 7.92233 2.89527 7.89123 2.97367 7.89122V7.29888C2.7381 7.29909 2.51226 7.39284 2.3458 7.55951L2.76458 7.9777Z" fill="#999999"/>
<path d="M3.32129 3.44922H7.46763M3.32129 5.22622H6.28296" stroke="#999999" stroke-width="0.592335" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          <Text fontSize={"7px"}>
            {data?.answer_count} {t("answer")}
          </Text>
        </HStack>
        <HStack color={"#999999"} alignItems={'center'}>
          <IoEyeOutline fontSize={"12px"} />
          <Text fontSize={"7px"}>
            {data?.view_count} {t("view")}
          </Text>
        </HStack>
      </HStack>
         <HStack w={'100%'} justifyContent={'end'} alignItems={'end'}>
         {data?.source && (
            <HStack>
              <Text color={"#999999"} w={"fit-content"} fontSize={'10px'}>
                {data?.source}
              </Text>
            </HStack>
          )}
         </HStack>
        </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default QuestionMCard;
