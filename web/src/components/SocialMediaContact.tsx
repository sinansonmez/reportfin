import React, {FunctionComponent} from 'react';
import {Box, IconButton, Link, Icon} from "@chakra-ui/react";
import {BsTwitter, BsGithub, BsLinkedin} from "react-icons/bs";

interface OwnProps {
}

type Props = OwnProps;

const SocialMediaContact: FunctionComponent<Props> = (props) => {
  return (
    <Box mr={2}>
      <Link href="http://linkedin.com/in/sinan-sonmez/" isExternal>
        <IconButton
          icon={<Icon as={BsLinkedin} w={6} h={6}/>}
          ml={1}
          colorScheme="blue"
          aria-label="Edit Report"/>
      </Link>
      <Link href="http://github.com/sinansonmez" isExternal>
        <IconButton
          icon={<Icon as={BsGithub} w={6} h={6}/>}
          ml={1}
          colorScheme="blue"
          aria-label="Edit Report"/>
      </Link>
      <Link href="https://twitter.com/Sinan_Sonmez" isExternal>
        <IconButton
          icon={<Icon as={BsTwitter} w={6} h={6}/>}
          ml={1}
          colorScheme="blue"
          aria-label="Edit Report"/>
      </Link>
    </Box>
  );
};

export default SocialMediaContact;
