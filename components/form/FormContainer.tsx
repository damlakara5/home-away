'use client';

import { useFormState } from 'react-dom';
import { act, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { actionFunction } from '@/utils/types';

const initialState = {
  message: '',
  success:false
};


const FormContainer = ({
    action,
    children
} : {
    action:actionFunction,
    children:React.ReactNode
}) => {
    const [state, formAction] = useFormState(action, initialState);
    const {toast} = useToast();

    useEffect(() => {
        if(state.message){
            toast({description: state.message})
        }

        if (state.success) {
          const formElement = document.querySelector('form');
          if (formElement) formElement.reset();
        }
    }, [state])


  return (
    <form action={formAction}>
        {children}
    </form>
  )
}

export default FormContainer