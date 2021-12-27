import React, {FunctionComponent, InputHTMLAttributes} from 'react';
import {FormControl, FormErrorMessage, FormLabel, Input} from "@chakra-ui/react";
import {useField} from "formik";

interface OwnProps {
  name: string;
  label: string;
}

type Props = InputHTMLAttributes<HTMLInputElement> & OwnProps;

// "" -> false
// "error message" -> true

const InputField: FunctionComponent<Props> = ({label, size, ...props}) => {
  const [field, {error}] = useField(props)
  return (
    // error can be an empty string we cast it to false (boolean)
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input {...field} {...props} id={field.name} placeholder={props.placeholder}/>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputField;
