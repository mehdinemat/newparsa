import { Avatar, Box, Button, Divider, HStack, Input, InputGroup, InputRightElement, Text, VStack } from "@chakra-ui/react"

const answer =
  ['لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و  متن از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت، لورم ایپسوم ساختگی با تولید سادگی از', 'لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و  متن  تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت، لورم ایپسوم ساختگی با تولید سادگی از', 'لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از  گرافیــک اســت، لورم ایپسوم ساختگی با تولید سادگی از لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت، لورم ایپسوم ساختگی با تولید سادگی از', 'لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و  متن ساختگی با تولید سادگی از صنعت چاپ، و  متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از طراحان گرافیــک اســت، لورم ایپسوم ساختگی با تولید سادگی از']


const QuestionAnswerCard = ({ registerAnswer, isMutatingQuestionAnswer, handleAddAnswer, handleSubmitAnswer, t }) => {
  return (
    <Box
      w={{ base: "full", md: "100%" }}
      padding={"20px"}
      bgColor={"#F7F7F7"}
      border={"1px"}
      borderColor={"gray.200"}
      borderRadius={"10px"}
      my={"10px"}
      mr={{ base: "-40px", md: "0px" }}
      as="form"
      onSubmit={handleSubmitAnswer(handleAddAnswer)}

    >
      <VStack w={'100%'} gap={'30px'} height={'452px'}
        overflowY={'auto'}>
        {
          answer?.map((item) => (
            <VStack bgColor={'white'} padding={'10px'} borderRadius={'10px'}>
              <HStack w={'100%'} alignItems={'start'}>
                <Avatar w={'35px'} h={'35px'} />
                <Text fontSize={'14px'}>
                  {item}
                </Text>
              </HStack>
              <Divider />
              <HStack w={'100%'} justifyContent={'end'} color={'#3646B3'}>
                <Text>1404/01/27</Text>
                <Text>15:30</Text>
              </HStack>
            </VStack>
          ))
        }
      </VStack>
      <VStack w={"100%"} alignItems={"start"} mt={'35px'}>
        <Text
          fontWeight={"bold"}
          fontSize={"22px"}
          mb={"4px"}
        >
          {t("your_answer")}
        </Text>
        <Text fontSize={"14px"}>{t("AI-generated")}</Text>
      </VStack>

      <InputGroup height={'61px'} mt={'14px'}>
        <Input height={'inherit'} bgColor={'white'} placeholder="نوشتن متن..." borderRadius={'10px'}  {...registerAnswer("content")}
        />
        <InputRightElement w={'150px'} height={'inherit'}>
          <Button bgColor={'#F9C96D'} padding={'20px'} w={'150px'} h={'inherit'} color={'black'} isLoading={isMutatingQuestionAnswer} type="submit">
            {t("submit_answer")}
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  )
}

export default QuestionAnswerCard
