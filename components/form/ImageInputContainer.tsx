'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import FormContainer from './FormContainer';
import ImageInput from './ImageInput';
import { type actionFunction } from '@/utils/types';
import { LuUser2 } from 'react-icons/lu';
import { SubmitButton } from './Button';

type ImageInputContainerProps = {
  image: string;
  name: string;
  action: actionFunction;
  text: string;
  children?: React.ReactNode;
};

const ImageInputContainer = (props: ImageInputContainerProps) => {
    const {image, action, text,name} = props;
    const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);

    const userIcon = <LuUser2 className='w-24 h-24 bg-primary text-white mb-4 rounded' />

  return (
    <div>
        {image  ? <Image  src={image} alt={name} width={100} height={100} className='rounded object-cover mb-4 w-24 h-24'/> : userIcon}
        <Button variant='outline' size='sm'  onClick={() => setIsUpdateFormVisible((prev:any) => !prev)}>
            {text}
        </Button>
        {
            isUpdateFormVisible  && <div className='max-w-lg mt-4 '>
                <FormContainer  action={action}>
                    {props.children}
                    <ImageInput />
                    <SubmitButton size='sm' />
                </FormContainer>
            </div> 
        }
    </div>
  )
}

export default ImageInputContainer