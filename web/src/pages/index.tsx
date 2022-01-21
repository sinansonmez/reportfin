import {Alert, AlertIcon, Box, Button, Flex, LinkOverlay, Stack, Text} from "@chakra-ui/react";
import {withUrqlClient} from "next-urql";
import {createUrqlClient} from "../utils/createUrqlClient";
import Layout from "../components/Layout";
import {useIncreaseDownloadCountMutation, useMeQuery, useReportsQuery} from "../generated/graphql";
import React from "react";
import DetailUpdateDeleteReportButtons from "./detailUpdateDeleteReportButtons";

//TODO: create and admin page with create bank, edit bank, delete bank, create report, edit report, delete report
// TODO: why when I logged in, it doesn't show that I'm logged in?
const Index = () => {
  const [variables, setVariables] = React.useState({limit: 15, cursor: null as null | string});
  const [{data, error, fetching}] = useReportsQuery({variables});
  const [{data: user}] = useMeQuery()
  const [, increaseDownloadCount] = useIncreaseDownloadCountMutation()

  if (!fetching && !data) {
    return (
      <Box>
        <Alert mt={2} status='error'><AlertIcon/>Oops, something went wrong. Send me an email with the error message
          below, sinansonmez@outlook.com. Please try again later</Alert>
        <Alert mt={2} status='error'><AlertIcon/>{error?.message}</Alert>
      </Box>
    )
  }

  const reportsView = (data: any[]) => {
    return data.map(report => {
        return !report ? null : <Flex
          px={5}
          py={2}
          shadow="md"
          alignItems="center"
          justifyContent="space-between"
          borderWidth="1px"
          borderRadius="4px"
          key={report.id}>
          <Button width="20%" variant="link" colorScheme="blue">
            <LinkOverlay href={"//" + report.bank.website} isExternal>{report.bank.name}</LinkOverlay>
          </Button>

          <Text width="20%" textAlign="center">{report.bank.continent}</Text>
          <Text width="20%" textAlign="center">{report.bank.country}</Text>

          <Flex width="20%" ml={2} alignItems="center" justifyContent="center">
            <Text>{report.quarter}</Text>
            <Text>-</Text>
            <Text>{report.year}</Text>
          </Flex>
          <Button
            width="20%"
            ml={2}
            colorScheme="blue"
            variant="outline"
            onClick={() => increaseDownloadCount({id: report.id})}>
            <LinkOverlay href={report.link} isExternal>Download</LinkOverlay>
          </Button>
          {user?.me && <DetailUpdateDeleteReportButtons id={report.id}/>}
        </Flex>;
      }
    )
  }

  return (
    <Layout>
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
