const { VStack, Avatar, HStack, Divider, Text, Button, Stack } = require("@chakra-ui/react")

const ReferencesCard = ({ data }) => {
  return (
    <Stack direction={{ base: 'column', md: 'row' }} w={'100%'} justifyContent={'space-between'} alignItems={{ base: 'center' }}>
      <Avatar w={'128px'} h={'128px'} src={data?.image_url} />
      <VStack w={'100%'} alignItems={{ base: 'center', md: 'start' }}>
        <Text>{data?.full_name}</Text>
        <HStack>
          <Text fontSize={'xs'}>{data?.question_count} پرسش</Text>
          <Divider height={'20px'} orientation="vertical" />
          <Text color={'#29CCCC'} fontSize={'xs'}>{data?.answer_count} پاسخ</Text>
        </HStack>
        <Button bgColor={'#29CCCC'} fontWeight={'normal'}>پایگاه اطلاع‌رسانی</Button>
      </VStack>
    </Stack>
  )
}

export default ReferencesCard
