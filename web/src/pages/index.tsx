import {Box} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import {withUrqlClient} from "next-urql";
import {createUrqlClient} from "../utils/createUrqlClient";

const Index = () => (
  <>
    <Navbar/>
    <Box height="100vh">
      Hello world
    </Box>
  </>
)

export default withUrqlClient(createUrqlClient, {ssr: true})(Index)
