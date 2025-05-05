const { VStack, Avatar, HStack, Divider, Text, Button } = require("@chakra-ui/react")

const UsersCard = ({t}) => {
  return (
    <VStack>
      <Avatar w={'100px'} h={'100px'} />
      <Text>حسن الماسی</Text>
      <HStack>
        <Text>۳۵۶ {t('question')}</Text>
        <Divider height={'20px'} orientation="vertical" />
        <Text color={'#29CCCC'}>۱۳۸ {t('answer')}</Text>
      </HStack>
      <Button bgColor={'#29CCCC'} fontWeight={'normal'}>{t('view_profile')}</Button>
    </VStack>
  )
}

export default UsersCard
