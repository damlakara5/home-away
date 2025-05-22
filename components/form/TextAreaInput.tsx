import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type TextAreaInputProps = {
  name: string;
  labelText?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextAreaInput = ({ name, labelText, defaultValue, value, onChange }: TextAreaInputProps) => {
  console.log("AAAAAAAAAAAAA",value)
  return (
    <div className='mb-2'>
      <Label className='capitalize' htmlFor={name}>{labelText || name}</Label>
      <Textarea
        id={name}
        name={name}
        value={value}       // Controlled
        onChange={onChange} // Change handler
        rows={5}
        required
        className='leading-loose'
      />
    </div>
  );
};

export default TextAreaInput;