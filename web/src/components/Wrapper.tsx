import React, {FunctionComponent} from 'react';
import {Box} from "@chakra-ui/react";

export type WrapperVariant = 'regular' | 'small';

interface OwnProps {
  variant?: WrapperVariant // question mark means optional
}

type Props = OwnProps;

const Wrapper: FunctionComponent<Props> = ({children, variant = "regular"}) => {
  return (
    <Box mt={8} maxW={variant === "regular" ? "800px" : "400px"} w="100%" mx="auto">
      {children}
    </Box>
  );
};

export default Wrapper;
