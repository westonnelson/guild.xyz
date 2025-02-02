import { GroupBase, Props, Select, SelectInstance } from "chakra-react-select"
import { forwardRef, Ref } from "react"
import CustomClearIndicator from "./components/CustomClearIndicator"
import CustomMenuList from "./components/CustomMenuList"
import CustomSelectOption from "./components/CustomSelectOption"

const StyledSelect = forwardRef(
  (
    props: Props & { as?: any },
    ref: Ref<SelectInstance<unknown, boolean, GroupBase<unknown>>>
  ): JSX.Element => {
    const SelectComponent = props.as ?? Select
    return (
      <SelectComponent
        ref={ref}
        {...props}
        chakraStyles={{
          ...props.chakraStyles,
          container: (provided) => ({
            ...provided,
            width: "full",
            maxWidth: "full",
            overflow: "hidden",
            padding: "1px",
            ...props.chakraStyles?.container,
          }),
          control: (provided) => ({
            ...provided,
            width: "full",
            ...props.chakraStyles?.control,
          }),
          inputContainer: (provided) => ({
            ...provided,
            display: "flex",
            ...props.chakraStyles?.inputContainer,
          }),
          menu: (provided) => ({
            ...provided,
            overflow: "visible",
            ...props.chakraStyles?.menu,
          }),
          placeholder: (provided) => ({
            ...provided,
            maxWidth: "calc(100% - 2rem)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            pointerEvents: "none",
            ...props.chakraStyles?.placeholder,
          }),
        }}
        components={{
          Option: CustomSelectOption,
          MenuList: CustomMenuList,
          ClearIndicator: CustomClearIndicator,
          ...props.components,
        }}
        menuPortalTarget={document?.getElementById("chakra-react-select-portal")}
        menuShouldBlockScroll={true}
      />
    )
  }
)

export default StyledSelect
