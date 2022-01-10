import React, {FunctionComponent} from 'react';
import {withUrqlClient} from "next-urql";
import {createUrqlClient} from "../utils/createUrqlClient";
import {Form, Formik} from "formik";
import InputField from "../components/InputField";
import {Box, Button} from "@chakra-ui/react";
import {useRouter} from "next/router";
import RadioField from "../components/RadioField";
import Layout from "../components/Layout";
import {useIsAuth} from "../utils/useIsAuth";
import {useCreateReportMutation} from "../generated/graphql";

interface OwnProps {
}

type Props = OwnProps;

const CreateReport: FunctionComponent<Props> = (props) => {
    useIsAuth()
    const router = useRouter()
    const [, createReport] = useCreateReportMutation()
    const quarters = ["1Q", "2Q", "3Q", "4Q"]
    return (
      <Layout>
        <Formik
          initialValues={{bank: "", link: "", quarter: "", year: ""}}
          onSubmit={async (values) => {
            const response = await createReport({options: values})
            console.log(response)
            if (!response.error) await router.push("/")
          }}>
          {({isSubmitting}) => (
            <Form>
              <InputField label="Bank Name" name="bank" placeholder="Bank Name"/>
              <Box mt={4}>
                <RadioField label="Quarter" name="quarter" options={quarters}/>
              </Box>
              <Box mt={4}>
                <InputField label="Year" name="year" placeholder="Year"/>
              </Box>
              <Box mt={4}>
                <InputField label="Link" name="link" placeholder="Link"/>
              </Box>
              <Button type="submit" mt={4} colorScheme="blue" isLoading={isSubmitting}>Submit</Button>
            </Form>
          )}
        </Formik>
      </Layout>
    );
  }
;

export default withUrqlClient(createUrqlClient)(CreateReport);
