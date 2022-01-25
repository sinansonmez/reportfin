import React, {FunctionComponent} from 'react';
import {withUrqlClient} from "next-urql";
import {createUrqlClient} from "../utils/createUrqlClient";
import {useBanksQuery, useIncreaseDownloadCountMutation, useMeQuery, useReportsQuery} from "../generated/graphql";
import {Alert, AlertIcon, Box, Button, Flex, Image, LinkOverlay, Stack, Text} from "@chakra-ui/react";
import DetailUpdateDeleteReportButtons from "./detailUpdateDeleteReportButtons";
import Layout from "../components/Layout";
import Nextlink from "next/link";

interface OwnProps {
}

type Props = OwnProps;

const Banks: FunctionComponent<Props> = (props) => {
  const [{data, error, fetching}] = useBanksQuery();
  const [{data: user}] = useMeQuery()

  if (!fetching && !data) {
    return (
      <Box>
        <Alert mt={2} status='error'><AlertIcon/>Oops, something went wrong. Send me an email with the error message
          below, sinansonmez@outlook.com. Please try again later</Alert>
        <Alert mt={2} status='error'><AlertIcon/>{error?.message}</Alert>
      </Box>
    )
  }

  const banksView = (data: any[]) => {
    return data.map(bank => {
        return !bank ? null : <Flex
          px={5}
          py={2}
          shadow="md"
          alignItems="center"
          justifyContent="space-between"
          borderWidth="1px"
          borderRadius="4px"
          key={bank.id}>

          <Image src={bank.logo} w={24} />
          <Text width="40%" textAlign="center">{bank.name}</Text>
          <Text width="15%" textAlign="center">{bank.continent}</Text>
          <Text width="20%" textAlign="center">{bank.country}</Text>
          <Button
            width="25%"
            ml={2}
            colorScheme="blue"
            variant="outline">
            <LinkOverlay href={bank.website} isExternal>Investor Relations</LinkOverlay>
          </Button>

          {/*{user?.me && <DetailUpdateDeleteReportButtons id={bank.id}/>}*/}
        </Flex>;
      }
    )
  }

  return (
    <Layout>
      {!data?.banks && fetching ? (
        <div>Loading...</div>
      ) : (
        <Stack mt={2} spacing={2}>
          {banksView(data!.banks)}
        </Stack>
      )
      }
    </Layout>
  )
};

export default withUrqlClient(createUrqlClient, {ssr: true})(Banks)
