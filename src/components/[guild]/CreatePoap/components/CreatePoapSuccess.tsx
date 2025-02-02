import {
  Flex,
  HStack,
  Icon,
  Img,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react"
import Button from "components/common/Button"
import { Calendar } from "phosphor-react"
import { useCreatePoapContext } from "./CreatePoapContext"

type Props = {
  nextStep: () => void
}

const CreatePoapSuccess = ({ nextStep }: Props): JSX.Element => {
  const { poapData } = useCreatePoapContext()
  const { colorMode } = useColorMode()

  return (
    <VStack textAlign={{ base: "left", md: "center" }} spacing={6}>
      <Text fontSize="3xl" fontFamily="display" fontWeight="bold">
        Hooray!
        <br />
        You've created a new drop
      </Text>
      <Text maxW="xl">
        You requested{" "}
        <Skeleton isLoaded={!!poapData} display="inline">
          {poapData?.requested_codes || "unknown"}
        </Skeleton>{" "}
        mint links for your drop. The POAP Curation Body will review your petition
        according to the POAP drop policies and you'll receive a confirmation email
        after it is reviewed.
      </Text>

      <Stack
        p={4}
        bgColor={colorMode === "light" ? "gray.200" : "blackAlpha.300"}
        borderRadius="2xl"
        direction="row"
        alignItems="center"
        spacing={4}
      >
        <SkeletonCircle boxSize={24} isLoaded={!!poapData?.image}>
          <Img
            src={poapData?.image_url}
            alt={poapData?.name}
            boxSize={24}
            rounded="full"
          />
        </SkeletonCircle>
        <VStack alignItems="start">
          <Skeleton isLoaded={!!poapData}>
            <Text fontFamily="display" fontWeight="bold">
              {poapData
                ? `#${poapData?.id} - ${poapData?.name}`
                : "#0 - Unknown POAP"}
            </Text>
          </Skeleton>

          <Skeleton isLoaded={!!poapData}>
            <HStack>
              <Icon as={Calendar} />
              <Text>{poapData?.start_date || "Unknown date"}</Text>
            </HStack>
          </Skeleton>
        </VStack>
      </Stack>

      <Flex w="full" justifyContent="end">
        <Button colorScheme="indigo" isDisabled={!poapData} onClick={nextStep}>
          Upload mint links
        </Button>
      </Flex>
    </VStack>
  )
}

export default CreatePoapSuccess
