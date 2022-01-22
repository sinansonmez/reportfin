import React, {FunctionComponent} from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Radio,
  RadioGroup,
  Stack
} from "@chakra-ui/react";
import {useField} from "formik";

interface OwnProps {
  label: string;
  options: string[];
  name: string;
  onChange: (value: string) => void;
}

type Props = OwnProps;

// "" -> false
// "error message" -> true

const RadioField: FunctionComponent<Props> = ({label, options, onChange, ...props}) => {
  const [field, {error}] = useField(props)
  return (
    // error can be an empty string we cast it to false (boolean)
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <RadioGroup id={props.name} {...field} {...props}>
        <Stack direction='row'>
          {options.map((value) => {
            return (
              <Radio {...field} key={value} value={value}>
                {value}
              </Radio>
            )
          })}
        </Stack>
      </RadioGroup>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default RadioField;
