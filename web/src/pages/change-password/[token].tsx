import React from 'react';
import {NextPage} from "next";
import {Form, Formik} from "formik";
import {toErrorMap} from "../../utils/toErrorMap";
import InputField from "../../components/InputField";
import {Box, Button, Flex} from "@chakra-ui/react";
import Wrapper from "../../components/Wrapper";
import {useChangePasswordMutation} from "../../generated/graphql";
import {useRouter} from "next/router";
import {createUrqlClient} from "../../utils/createUrqlClient";
import {withUrqlClient} from "next-urql";
import NextLink from "next/link";

interface OwnProps {
  token: string;
}

console.log("change password page is called")

type Props = OwnProps;

const ChangePassword: NextPage<Props> = (props) => {
  console.log("change password page is called", props)
  const [, changePassword] = useChangePasswordMutation()
  const router = useRouter();
  const [tokenError, setTokenError] = React.useState("");
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{newPassword: ""}}
        onSubmit={async (values, {setErrors}) => {
          const response = await changePassword({token: props.token, newPassword: values.newPassword})
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors)
            if ("token" in errorMap) setTokenError(errorMap.token)
            setErrors(errorMap)
          } else if (response.data?.changePassword.user) {
            await router.push("/")
          }
        }}>
        {({isSubmitting}) => (
          <Form>
            <InputField label="New Password" name="newPassword" placeholder="New Password" type="password"/>
            {tokenError &&
            <Flex>
              <Box color="tomato">{tokenError}</Box>
              <NextLink href={`/forgot-password`}>
                <Button ml={2} size="sm" variant="link" colorScheme="blue">Get a new token</Button>
              </NextLink>
            </Flex>}
            <Button
              type="submit"
              mt={4}
              colorScheme="blue"
              isLoading={isSubmitting}>
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = (query) => {
  return {
    token: query.query.token as string
  }
}

export default withUrqlClient(createUrqlClient)(ChangePassword);
