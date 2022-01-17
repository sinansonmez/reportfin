import React, {FunctionComponent} from 'react';
import {Badge, Box, Button, Flex, Heading, Link} from "@chakra-ui/react";
import Nextlink from 'next/link';
import {useLogoutMutation, useMeQuery} from "../generated/graphql";

interface OwnProps {
}

type Props = OwnProps;

const Navbar: FunctionComponent<Props> = (_props) => {
  const [{fetching: logoutFetching}, logout] = useLogoutMutation()
  const [{data, fetching}] = useMeQuery()
  let body;

  if (fetching) {
    body = null;
    // user not logged in
  } else if (!data?.me) {
    body = (
      <Flex width="100%" justifyContent="space-between">
        <Nextlink href="/">
          <Link>
            <Heading color="white">ReportFin</Heading>
          </Link>
        </Nextlink>
        <Box>
          <Nextlink href="/login">
            <Button type="button" mr={2} colorScheme="blue">Login</Button>
          </Nextlink>
          <Nextlink href="/register">
            <Button type="button" mr={2} colorScheme="blue">Register</Button>
          </Nextlink>
        </Box>
      </Flex>
    )
    // user logged in
  } else {
    body = (
      <Flex width="100%" justifyContent="space-between">
        <Nextlink href="/">
          <Link>
            <Heading color="white">ReportFin</Heading>
          </Link>
        </Nextlink>
        <Flex>
          <Badge mr={2} colorScheme="green" display="flex" alignItems="center">{data.me.username}</Badge>
          <Nextlink href="/">
            <Button
              type="button"
              mr={2}
              colorScheme="blue"
              onClick={() => logout()}
              isLoading={logoutFetching}>Logout</Button>
          </Nextlink>
        </Flex>
      </Flex>
    )
  }

  return (
    <Flex justifyContent="space-between" zIndex={1} position="sticky" top={0} bgColor="blue.900" p={4} ml="auto">
      {body}
    </Flex>
  );
};

export default Navbar;
