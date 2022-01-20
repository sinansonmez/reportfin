import React, {FunctionComponent} from 'react';
import Nextlink from "next/link";
import {Alert, Button, IconButton} from "@chakra-ui/react";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {useDeleteReportMutation} from "../generated/graphql";

interface OwnProps {
  id: number;
}

type Props = OwnProps;

const DetailUpdateDeleteReportButtons: FunctionComponent<Props> = ({id}) => {
  const [{error: deleteReportError}, deleteReport] = useDeleteReportMutation()

  if (deleteReportError) {
    return <Alert mt={2} status='error'>{deleteReportError.message}</Alert>
  }


  return (
    <>
      <Nextlink href="/report/[id]" as={`/report/${id}`}>
        <Button
          colorScheme="green"
          ml={1}>Details
        </Button>
      </Nextlink>
      <Nextlink href="/report/edit/[id]" as={`/report/edit/${id}`}>
        <IconButton
          icon={<EditIcon/>}
          ml={1}
          colorScheme="yellow"
          aria-label="Edit Report"/>
      </Nextlink>
      <IconButton
        icon={<DeleteIcon/>}
        ml={1}
        colorScheme="red"
        aria-label="Delete Report"
        onClick={() => deleteReport({id})}/>
    </>
  );
};

export default DetailUpdateDeleteReportButtons;
