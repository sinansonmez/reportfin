import React, {FunctionComponent} from 'react';
import {withUrqlClient} from "next-urql";
import {createUrqlClient} from "../utils/createUrqlClient";
import {Form, Formik} from "formik";
import InputField from "../components/InputField";
import {Alert, AlertIcon, Box, Button} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {useCreateBankMutation} from "../generated/graphql";
import RadioField from "../components/RadioField";
import Layout from "../components/Layout";
import {useIsAuth} from "../utils/useIsAuth";

interface OwnProps {
}

type Props = OwnProps;

const CreateBank: FunctionComponent<Props> = (props) => {
    useIsAuth()
    const router = useRouter()
    const [, createBank] = useCreateBankMutation()
    const [error, setError] = React.useState("")
    const continents = ["Africa", "Asia", "Europe", "North America", "Oceania", "South America"]
    return (
      <Layout>
        <Formik
          initialValues={{name: "", continent: "", country: "", logo: "", website: ""}}
          onSubmit={async (values) => {
            const response = await createBank({options: values})
            if (response.error) {
              setError(response.error.message)
            } else {
              await router.push("/")
            }
          }}>
          {({isSubmitting}) => (
            <Form>
              <InputField label="Bank Name" name="name" placeholder="Bank Name"/>
              <Box mt={4}>
                <RadioField label="Continent" name="continent" options={continents}/>
              </Box>
              <Box mt={4}>
                <InputField label="Country" name="country" placeholder="Country"/>
              </Box>
              <Box mt={4}>
                <InputField label="Website" name="website" placeholder="Website"/>
              </Box>
              <Box mt={4}>
                <InputField label="Logo" name="logo" placeholder="Logo"/>
              </Box>
              <Button type="submit" mt={4} colorScheme="blue" isLoading={isSubmitting}>Submit</Button>
            </Form>
          )}
        </Formik>
        {error && <Alert mt={2} status='error'><AlertIcon/>{error}</Alert>}
      </Layout>
    );
  }
;

export default withUrqlClient(createUrqlClient)(CreateBank);
