import { Button, Image, Text, VStack } from "@chakra-ui/react"
import { useRouter } from "next/router"

const ProductCard = () => {

    const router = useRouter()

    const handleProductDetails = () => {
        router.replace('/product/1324')
    }

    return (
        <VStack  >
            <Image src="./questionlogo.png" w={"306px"} h={"300px"} />
            <Text fontWeight={'bold'} fontSize={'17px'}>سرویس اصلاح خطای نوشتاری</Text>
            <Text w={"320px"}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان</Text>
            <Button bgColor={'#29CCCC'} onClick={e => handleProductDetails()}>اطلاعات بیشتر</Button>
        </VStack>
    )

}

export default ProductCard