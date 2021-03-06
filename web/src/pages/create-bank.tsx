import React, {FunctionComponent, useEffect} from 'react';
import {withUrqlClient} from "next-urql";
import {createUrqlClient} from "../utils/createUrqlClient";
import {Form, Formik} from "formik";
import InputField from "../components/InputField";
import {Alert, AlertIcon, Box, Button, Select} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {useCreateBankMutation} from "../generated/graphql";
import RadioField from "../components/RadioField";
import Layout from "../components/Layout";
import {useIsAuth} from "../utils/useIsAuth";
import {
  africaCountriesArray,
  allCountriesArray,
  asiaCountriesArray,
  continentsArray,
  europeCountriesArray,
  northAmericaCountriesArray,
  oceaniaCountriesArray,
  southAmericaCountriesArray
} from "../utils/countriesList";

interface OwnProps {
}

type Props = OwnProps;

const CreateBank: FunctionComponent<Props> = (_props) => {
    useIsAuth()
    const router = useRouter()
    const [, createBank] = useCreateBankMutation()
    const [error, setError] = React.useState("")
    const [continent, setContinent] = React.useState("")
    let currentCountries: string[] = allCountriesArray

    useEffect(() => {
      updateCountries()
      countryView()
    }, [continent])

    const updateCountries = () => {
      if (continent === "Africa") {
        currentCountries = africaCountriesArray
      } else if (continent === "Asia") {
        currentCountries = asiaCountriesArray
      } else if (continent === "Europe") {
        currentCountries = europeCountriesArray
      } else if (continent === "North America") {
        currentCountries = northAmericaCountriesArray
      } else if (continent === "South America") {
        currentCountries = southAmericaCountriesArray
      } else if (continent === "Oceania") {
        currentCountries = oceaniaCountriesArray
      } else {
        currentCountries = allCountriesArray
      }
    }

    const countryView = () => currentCountries.map((country) => {
      return <option key={country} value={country}>{country}</option>
    })

    return (
      <Layout>
        <Formik
          initialValues={{name: "", continent: "", country: "", logo: "", website: ""}}
          onSubmit={async (values) => {
            const response = await createBank({options: values})
            console.log("create bank response", response)
            if (response.error) {
              setError(response.error.message)
            } else {
              await router.push("/")
            }
          }}>
          {({isSubmitting, handleChange}) => (
            <Form>
              <InputField label="Bank Name" name="name" placeholder="Bank Name"/>
              <Box mt={4}>
                <RadioField
                  label="Continent"
                  name="continent"
                  options={continentsArray}/>
              </Box>
              <Box mt={4}>
                <Select name="country" placeholder="Country" onChange={handleChange}>
                  {countryView()}
                </Select>
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
