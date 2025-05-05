
import React from 'react'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';


type FormInputProps = {
    name: string;
    type:string;
    label?:string;
    defaultValue?:string;
    placeholder?:string;
}

const FormInput = (props:FormInputProps) => {
    const {label,name,type, defaultValue , placeholder} = props;
  return (
    <div className='mb-2'>
        <Label htmlFor={name} className='capitalize'> {label || name} </Label>
        <Input id={name} type={type} name={name} defaultValue={defaultValue} placeholder={placeholder} required />
    </div>
  )
}

export default FormInput