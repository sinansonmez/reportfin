import {Form, Formik} from 'formik';
import React, {FunctionComponent} from 'react';
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import {Box, Button} from "@chakra-ui/react";
import {toErrorMap} from "../utils/toErrorMap";
import {useRouter} from "next/router";
import {useLoginMutation} from "../generated/graphql";
import {withUrqlClient} from "next-urql";
import {createUrqlClient} from "../utils/createUrqlClient";

interface OwnProps {
}

type Props = OwnProps;

const Login: FunctionComponent<Props> = (_props) => {
  const router = useRouter();
  const [, login] = useLoginMutation()
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{usernameOrEmail: "", password: ""}}
        onSubmit={async (values, {setErrors}) => {
          const response = await login(values)
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors))
          } else if (response.data?.login.user) {
            await router.push("/")
          }
        }}>
        {({isSubmitting}) => (
          <Form>
            <InputField label="Username or Email" name="usernameOrEmail" placeholder="Username or Email"/>
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

export default withUrqlClient(createUrqlClient)(Login);
