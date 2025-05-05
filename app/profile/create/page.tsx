import React from 'react'

import FormInput from '@/components/form/FormInput';
import SubmitButton from '@/components/form/Button';
import FormContainer from '@/components/form/FormContainer';
import { createProfileAction } from '@/utils/actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import PriceInput from '@/components/form/PriceInput';

const CreateProfilePage = async () => {
  const user =  await currentUser();

  //if user already has profile shouldn't be able to access the create profile page
  if(user?.privateMetadata?.hasProfile) redirect('/')
  return (
    <section>
        <h1 className='text-2xl mb-8 font-semibold capitalize'>new user</h1>
        <div className='border rounded-md p-8 '>
            <FormContainer action={createProfileAction}>
                <div className='grid md:grid-cols-2 gap-4 mt-4' >
                 <FormInput 
                        name='firstName'
                        type='text'
                        label='First Name'
                 />
                 <FormInput 
                        name='lastName'
                        type='text'
                        label='Last Name'
                 />
                 <FormInput 
                        name='username'
                        type='text'
                        label='Username'
                 />
                 </div>
                <SubmitButton text='Create Profile' className='mt-8'  />
            </FormContainer>
        </div>
    </section>
  )
}

export default CreateProfilePage