import React, {FunctionComponent} from 'react';
import {withUrqlClient} from "next-urql";
import {createUrqlClient} from "../utils/createUrqlClient";
import {Form, Formik} from "formik";
import InputField from "../components/InputField";
import {Box, Button} from "@chakra-ui/react";
import Wrapper from "../components/Wrapper";
import {useRouter} from "next/router";
import {useCreateBankMutation} from "../generated/graphql";
import RadioField from "../components/RadioField";

interface OwnProps {
}

type Props = OwnProps;

const CreateBank: FunctionComponent<Props> = (props) => {
  const router = useRouter()
  const [, createBank] = useCreateBankMutation()
  const continents = ["Africa", "Asia", "Europe", "North America", "Oceania", "South America"]
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{name: "", continent: "", country: "", logo: "", website: ""}}
        onSubmit={async (values) => {
          console.log("values: ", values)
          const response = await createBank({options: values})
          console.log("response: ", response)
          if (response.data?.createBank.name) await router.push("/")
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
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(CreateBank);
