import {Button, Flex, Text} from "@chakra-ui/react";
import {withUrqlClient} from "next-urql";
import {createUrqlClient} from "../utils/createUrqlClient";
import Layout from "../components/Layout";
import {useReportsQuery} from "../generated/graphql";
import Nextlink from "next/link";

//TODO: create and admin page with create bank, edit bank, delete bank, create report, edit report, delete report
// TODO: why when I logged in, it doesn't show that I'm logged in?
const Index = () => {
  const [{data}] = useReportsQuery({
      variables: {limit: 10}
    }
  );
  return (
    <Layout>
      <Nextlink href="/create-report">
        <Button colorScheme="blue">Create Report</Button>
      </Nextlink>
      {!data?.reports ? (
        <div>Loading...</div>
      ) : (
        data.reports.map(report =>
          <Flex key={report.id}>
            <Text>{report.bankId}</Text>
            <Text ml={2}>{report.link}</Text>
            <Text ml={2}>{report.quarter}</Text>
            <Text ml={2}>-</Text>
            <Text ml={2}>{report.year}</Text>
          </Flex>
        ))
      }
    </Layout>
  )
}


export default withUrqlClient(createUrqlClient, {ssr: true})(Index)
