import {Form, Formik} from 'formik';
import React, {FunctionComponent} from 'react';
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import {Box, Button} from "@chakra-ui/react";
import {useMutation} from "urql";

interface OwnProps {
}

type Props = OwnProps;

const REGISTER_MUT = `mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
}`

const Register: FunctionComponent<Props> = (props) => {
  const [, register] = useMutation(REGISTER_MUT);
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{username: "", password: ""}}
        onSubmit={values => {
          return register({options: values})
        }}>
        {({isSubmitting}) => (
          <Form>
            <InputField label="Username" name="username" placeholder="Username"/>
            <Box mt={4}>
              <InputField label="Password" name="password" placeholder="Password" type="password"/>
            </Box>
            <Button type="submit" mt={4} colorScheme="blue" isLoading={isSubmitting}>Register</Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
