import {Form, Formik} from 'formik';
import React, {FunctionComponent} from 'react';
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import {Box, Button} from "@chakra-ui/react";
import {toErrorMap} from "../utils/toErrorMap";
import {useRouter} from "next/router";
import {useLoginMutation} from "../generated/graphql";

interface OwnProps {
}

type Props = OwnProps;

const Login: FunctionComponent<Props> = (_props) => {
  const router = useRouter();
  const [, login] = useLoginMutation()
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{username: "", password: ""}}
        onSubmit={async (values, {setErrors}) => {
          const response = await login({options: values})
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors))
          } else if (response.data?.login.user) {
            await router.push("/")
          }
        }}>
        {({isSubmitting}) => (
          <Form>
            <InputField label="Username" name="username" placeholder="Username"/>
            <Box mt={4}>
              <InputField label="Password" name="password" placeholder="Password" type="password"/>
            </Box>
            <Button type="submit" mt={4} colorScheme="blue" isLoading={isSubmitting}>Login</Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
