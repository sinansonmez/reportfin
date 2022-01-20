import React, {FunctionComponent} from 'react';
import {withUrqlClient} from "next-urql";
import {createUrqlClient} from "../../../utils/createUrqlClient";
import {useRouter} from "next/router";
import {useReportQuery, useUpdateReportMutation} from "../../../generated/graphql";
import Layout from "../../../components/Layout";
import {Alert, AlertIcon, Box, Button, Select} from "@chakra-ui/react";
import {Form, Formik} from "formik";
import RadioField from "../../../components/RadioField";
import InputField from "../../../components/InputField";
import {createYearArray} from "../../../utils/createYearArray";

interface OwnProps {
}

type Props = OwnProps;

const EditReport: FunctionComponent<Props> = (props) => {
  const [error, setError] = React.useState("")
  const quarters = ["1Q", "2Q", "3Q", "4Q"]

  const router = useRouter();
  const reportID = typeof router.query.id === 'string' ? parseInt(router.query.id) : -1;
  const [{data, fetching, error: reportError}] = useReportQuery({pause: reportID === -1, variables: {id: reportID}})
  const [, updateReport] = useUpdateReportMutation()

  if (fetching) return <Layout>Loading...</Layout>
  if (reportError) {
    return <Layout><Alert mt={2} status='error'><AlertIcon/>{reportError}</Alert></Layout>
  }

  if (!data?.report) {
    return <Layout>Could not find report</Layout>
  }

  const yearView = createYearArray().map(year => {
    return <option key={year} value={year} selected={data.report?.year === year.toString()}>{year}</option>
  })

  return (
    <Layout>
      <Formik
        initialValues={{link: data.report.link, quarter: data.report.quarter, year: data.report.year}}
        onSubmit={async (values) => {
          const response = await updateReport({
            id: reportID,
            link: values.link,
            quarter: values.quarter,
            year: values.year
          })
          if (response.error) {
            setError(response.error.message)
          } else {
            await router.push("/")
          }
        }}>
        {({isSubmitting, handleChange}) => (
          <Form>
            <Box mt={4}>
              <RadioField label="Quarter" name="quarter" options={quarters}/>
            </Box>
            <Box mt={4}>
              <Select name="year" placeholder="Year" onChange={handleChange}>
                {yearView}
              </Select>
            </Box>
            <Box mt={4}>
              <InputField label="Link" name="link" placeholder="Link"/>
            </Box>
            <Button type="submit" mt={4} colorScheme="blue" isLoading={isSubmitting}>Update Post</Button>
          </Form>
        )}
      </Formik>
      {error && <Alert mt={2} status='error'><AlertIcon/>{error}</Alert>}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditReport);
