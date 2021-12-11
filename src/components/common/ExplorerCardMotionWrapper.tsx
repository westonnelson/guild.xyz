import { PropsWithChildren } from "react"
import { Rest } from "types"
import CardMotionWrapper from "./CardMotionWrapper"

const ExplorerCardMotionWrapper = ({
  children,
  ...rest
}: PropsWithChildren<Rest>) => (
  <CardMotionWrapper
    animateOnMount={
      process.browser ? document?.activeElement?.id === "searchBar" : false
    }
    {...rest}
  >
    {children}
  </CardMotionWrapper>
)

export default ExplorerCardMotionWrapper
