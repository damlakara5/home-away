'use client'

import { ReloadIcon } from '@radix-ui/react-icons';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { SignInButton } from '@clerk/nextjs';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { LuTrash2, LuPenSquare } from 'react-icons/lu';

type btnSize = 'default' | 'lg' |'sm'

type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: btnSize
};


export const SubmitButton = ({className ='', text ='Submit', size='lg'}: SubmitButtonProps) => {
    const {pending,data, method, action} =useFormStatus()

    console.log("data",data)
    console.log("method",method)
    console.log("action",action)
  return (
    <Button type='submit' disabled={pending} className={`capitalize ${className}`} size={size}>
        {pending ? <>
            <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
            Please Wait...
        </> : text}
    </Button>
  )
}

export const CardsignInButton = () => {
  return <SignInButton mode='modal' >
    <Button type='button' size='icon' variant='outline' className='p-2 cursor-pointer' asChild>
      <FaRegHeart />
    </Button>
  </SignInButton>
}


export const CardSubmitButton = ({isFavorite} : {isFavorite:boolean}) => {
  const {pending} = useFormStatus();

  return <Button type='submit' size='icon' variant='outline' className='p-2 cursor-pointer'>
    {
      pending ? ( <ReloadIcon className='animate-spin' /> ) : isFavorite ?  ( <FaHeart /> ) : ( <FaRegHeart /> )
    }
  </Button>
}

type actionType = 'edit' | 'delete';

export const IconButton = ({ actionType }: { actionType: actionType }) => {
  const { pending } = useFormStatus();

  const renderIcon = () => {
    switch (actionType) {
      case 'edit':
        return <LuPenSquare />;
      case 'delete':
        return <LuTrash2 />;
      default:
        const never: never = actionType;
        throw new Error(`Invalid action type: ${never}`);
    }
  };

  return (
    <Button
      type='submit'
      size='icon'
      variant='link'
      className='p-2 cursor-pointer'
    >
      {pending ? <ReloadIcon className=' animate-spin' /> : renderIcon()}
    </Button>
  );
};