import React, {FunctionComponent} from 'react';
import Wrapper from "../components/Wrapper";
import {Form, Formik} from "formik";
import InputField from "../components/InputField";
import {Box, Button} from "@chakra-ui/react";
import {withUrqlClient} from "next-urql";
import {createUrqlClient} from "../utils/createUrqlClient";
import {useForgotPasswordMutation} from "../generated/graphql";

interface OwnProps {
}

type Props = OwnProps;

const ForgotPassword: FunctionComponent<Props> = (props) => {
  const [, forgotPassword] = useForgotPasswordMutation();
  const [complete, setComplete] = React.useState(false);
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{email: ""}}
        onSubmit={async (values) => {
          await forgotPassword(values)
          setComplete(true)
        }}>
        {({isSubmitting}) =>
          complete ? (
              <Box>
                Check your email for a reset link
              </Box>
            ) :
            (
              <Form>
                <InputField label="mail" name="email" placeholder="Email" type="email"/>
                <Button type="submit" mt={4} colorScheme="blue" isLoading={isSubmitting}>Forgot Password</Button>
              </Form>
            )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
