import React, {FunctionComponent} from 'react';
import {createUrqlClient} from "../../utils/createUrqlClient";
import {withUrqlClient} from "next-urql";
import {useRouter} from "next/router";
import {Alert, AlertIcon, Box, Text} from "@chakra-ui/react";
import Layout from "../../components/Layout";
import {useReportQuery} from "../../generated/graphql";

interface OwnProps {
}

type Props = OwnProps;

const Report: FunctionComponent<Props> = (props) => {
  const router = useRouter();
  const reportID = typeof router.query.id === 'string' ? parseInt(router.query.id) : -1;
  const [{data, fetching, error}] = useReportQuery({pause: reportID === -1, variables: {id: reportID}})

  if (fetching) return <Layout>Loading...</Layout>
  if (error) {
    return <Layout><Alert mt={2} status='error'><AlertIcon/>{error}</Alert></Layout>
  }

  return (
    <Layout>
      {data && data.report ? (
        <Box>
          <Text>{data.report.id}</Text>
          <Text>{data.report.bank.name}</Text>
          <Text>{data.report.year}</Text>
          <Text>{data.report.quarter}</Text>
        </Box>
      ) : <Alert mt={2} status='error'><AlertIcon/>Post not found</Alert>}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Report);
