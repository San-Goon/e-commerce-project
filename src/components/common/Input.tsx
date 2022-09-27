import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { Input as InputComponent, InputProps } from '@chakra-ui/react';

interface IProps extends InputProps {
  fieldName: string;
  validate?: boolean;
}

const Input = ({ fieldName, validate, ...props }: IProps) => {
  const { register, formState } = useFormContext();

  const validateVariant = useMemo(() => {
    if (validate) {
      if (formState.errors[fieldName]) return 'error';
      return 'success';
    }
    return;
  }, [fieldName, formState, validate]);

  return (
    <InputComponent
      {...props}
      {...register(fieldName)}
      borderColor="black"
      focusBorderColor="primary.500"
      color="black"
      borderRadius="100px"
      autoComplete="off"
      spellCheck={false}
      variant={validateVariant}
    />
  );
};

export default Input;
