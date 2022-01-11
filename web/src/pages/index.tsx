import {AlertIcon, Alert, Button, Flex, LinkOverlay, Stack, Text} from "@chakra-ui/react";
import {withUrqlClient} from "next-urql";
import {createUrqlClient} from "../utils/createUrqlClient";
import Layout from "../components/Layout";
import {useReportsQuery} from "../generated/graphql";
import Nextlink from "next/link";
import React from "react";

//TODO: create and admin page with create bank, edit bank, delete bank, create report, edit report, delete report
// TODO: why when I logged in, it doesn't show that I'm logged in?
const Index = () => {
  const [variables, setVariables] = React.useState({limit: 10, cursor: null as null | string});
  const [{data, fetching}] = useReportsQuery({variables});

  if (!fetching && !data) {
    return <Alert mt={2} status='error'><AlertIcon/>Oops, something went wrong. Send me an email:
      sinansonmez@outlook.com. Please try again later</Alert>
  }


  const reportsView = (data: any[]) => {
    return data.map(report =>
      <Flex
        px={5}
        py={2}
        shadow="md"
        alignItems="center"
        justifyContent="space-evenly"
        borderWidth="1px"
        borderRadius="4px"
        key={report.id}>
        <Text flexGrow="2">{report.bankId}</Text>
        {/*TODO: show continent and country of the bank*/}
        <Flex flexGrow="1" ml={2} alignItems="center">
          <Text>{report.quarter}</Text>
          <Text>-</Text>
          <Text>{report.year}</Text>
        </Flex>
        <Button ml={2} colorScheme="blue" variant="outline">
          <LinkOverlay href={"//" + report.link} isExternal>Download</LinkOverlay>
        </Button>
      </Flex>
    )
  }
  return (
    <Layout>
      <Nextlink href="/create-report">
        <Button colorScheme="blue">Create Report</Button>
      </Nextlink>
      {!data?.reports.reports && fetching ? (
        <div>Loading...</div>
      ) : (
        <Stack mt={2} spacing={2}>
          {reportsView(data!.reports.reports)}
        </Stack>
      )
      }
      {data && data.reports.hasMore ? (
        <Flex p={8} justifyContent="center">
          <Button
            isLoading={fetching} colorScheme="blue" onClick={() => {
            setVariables({
              limit: variables.limit,
              cursor: data.reports.reports[data.reports.reports.length - 1].createdAt
            })
          }}>Load More</Button>
        </Flex>) : null}
    </Layout>
  )
}


export default withUrqlClient(createUrqlClient, {ssr: true})(Index)
