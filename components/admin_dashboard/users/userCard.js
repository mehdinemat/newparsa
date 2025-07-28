import { Avatar, Button, Card, Text, VStack } from "@chakra-ui/react"

const UserCard = () => {
  return (
    <Card as={VStack} padding={'6px'} height={'300px'} justifyContent={'space-between'} borderRadius={'13px'} variant={'unstyled'} bgColor={'#F3F3F3'}>
      <VStack w={'100%'}>
        <Avatar h={'195px'} w={'195px'} />
        <Text fontWeight={'900'} fontSize={'15px'}>محمد محمدی</Text>
        <Text>mohammadi@gmail.com</Text>
      </VStack>
      <Button w={'100%'} bgColor={'#29CCCC'} color={'white'} borderRadius={'10px'} minH={'29px'}>دنبال کردن</Button>
    </Card>
  )
}

export default UserCard
