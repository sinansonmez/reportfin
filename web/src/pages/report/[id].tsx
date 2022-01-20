import React, {FunctionComponent} from 'react';
import {createUrqlClient} from "../../utils/createUrqlClient";
import {withUrqlClient} from "next-urql";
import {useRouter} from "next/router";
import {Alert, AlertIcon, Badge, Box, Divider, Link, Text} from "@chakra-ui/react";
import Layout from "../../components/Layout";
import {useReportQuery} from "../../generated/graphql";
import DetailUpdateDeleteReportButtons from "../detailUpdateDeleteReportButtons";

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
          <Badge colorScheme="blue" fontSize="24px" mb={2}  >{data.report.bank.name}</Badge>
          <Divider/>
          <Text>id: {data.report.id}</Text>
          <Text>Year: {data.report.quarter} - {data.report.year}</Text>
          <Link href={"//" + data.report.link} isExternal >Link: {data.report.link}</Link>
          <Divider mb={2} />
          <DetailUpdateDeleteReportButtons id={data.report.id}/>
        </Box>
      ) : <Alert mt={2} status='error'><AlertIcon/>Post not found</Alert>}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Report);
