import React, {FunctionComponent} from 'react';
import Wrapper, {WrapperVariant} from "./Wrapper";
import Navbar from "./Navbar";

interface OwnProps {
  variant?: WrapperVariant;
}

type Props = OwnProps;

const Layout: FunctionComponent<Props> = (props) => {
  return (
    <>
      <Navbar/>
      <Wrapper variant={props.variant}>
        {props.children}
      </Wrapper>
    </>
  );
};

export default Layout;
