import {
  FormControl,
  FormLabel,
  IconButton,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
  useRadioGroup,
} from "@chakra-ui/react"
import GuildLogo from "components/common/GuildLogo"
import { Modal } from "components/common/Modal"
import LogicDivider from "components/[guild]/LogicDivider"
import { Uploader } from "hooks/usePinata/usePinata"
import { useController, useFormContext } from "react-hook-form"
import { GuildFormType } from "types"
import PhotoUploader from "./components/PhotoUploader"
import SelectorButton from "./components/SelectorButton"

type Props = {
  uploader: Uploader
}

const IconSelector = ({ uploader }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { control, setValue } = useFormContext<GuildFormType>()

  const { field } = useController({
    control,
    name: "imageUrl",
  })

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "imageUrl",
    onChange: (e) => {
      field.onChange(e)
      setValue("customImage", "")
      onClose()
    },
    value: field.value,
  })

  const group = getRootProps()

  return (
    <>
      <IconButton
        autoFocus
        onClick={onOpen}
        rounded="full"
        boxSize={12}
        flexShrink={0}
        colorScheme="gray"
        icon={<GuildLogo imageUrl={field.value} bgColor="transparent" />}
        aria-label="Guild logo"
        variant="outline"
        border="1px"
        bg="blackAlpha.300"
      />
      <Modal {...{ isOpen, onClose }} size="3xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose logo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PhotoUploader uploader={uploader} closeModal={onClose} />
            <LogicDivider logic="OR" px="0" my="5" />
            <FormControl>
              <FormLabel>Choose from default icons</FormLabel>
              <SimpleGrid
                minChildWidth="var(--chakra-sizes-10)"
                spacing="4"
                {...group}
              >
                {[...Array(285).keys()].map((i) => {
                  const radio = getRadioProps({
                    value: `/guildLogos/${i}.svg`,
                  })
                  return <SelectorButton key={i} {...radio} />
                })}
              </SimpleGrid>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default IconSelector
