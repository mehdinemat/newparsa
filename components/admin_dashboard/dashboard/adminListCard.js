import { Avatar, Box, Card, HStack, IconButton, Text, VStack } from "@chakra-ui/react"
import { IoEllipsisVerticalSharp } from "react-icons/io5"

const AdminListCard = () => {
  return (
    <Card height={'76px'} w={'100%'} bgColor={'#F7F7F7'} variant={'unstyled'} flexShrink={0} padding={'16px'}>
      <HStack w={'100%'} justifyContent={'space-between'}>
        <HStack position={'relative'}>
          <Box height={'7px'} width={'7px'} bgColor={'#00FF99'} borderRadius={'50%'} position={'absolute'} zIndex={999} right={'17px'} top={'37px'} />
          <Avatar height={'42px'} width={'42px'} />
          <VStack gap={0} w={'100%'} alignItems={'start'}>
            <Text fontWeight={'900'} fontSize={'15px'}>محمد محمدی</Text>
            <Text fontWeight={'300'} fontSize={'10px'}>mohammadi@gmail.com</Text>
          </VStack>
        </HStack>
        <IconButton icon={<IoEllipsisVerticalSharp />} colorScheme="gray" variant={'ghost'} />
      </HStack>
    </Card>
  )
}

export default AdminListCard
