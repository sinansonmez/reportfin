import {Box} from "@chakra-ui/react";
import {withUrqlClient} from "next-urql";
import {createUrqlClient} from "../utils/createUrqlClient";
import Layout from "../components/Layout";

//TODO: create and admin page with create bank, edit bank, delete bank, create report, edit report, delete report
const Index = () => (
  <Layout>
    <Box height="100vh">
      Hello world
    </Box>
  </Layout>
)

export default withUrqlClient(createUrqlClient, {ssr: true})(Index)
