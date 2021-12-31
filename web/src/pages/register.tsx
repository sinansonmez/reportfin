import {Form, Formik} from 'formik';
import React, {FunctionComponent} from 'react';
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import {Box, Button} from "@chakra-ui/react";
import {useRegisterMutation} from "../generated/graphql";
import {toErrorMap} from "../utils/toErrorMap";
import {useRouter} from "next/router";

interface OwnProps {
}

type Props = OwnProps;

const Register: FunctionComponent<Props> = (_props) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{username: "", password: ""}}
        onSubmit={async (values, {setErrors}) => {
          const response = await register(values)
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors))
          } else if (response.data?.register.user) {
            await router.push("/")
          }
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
