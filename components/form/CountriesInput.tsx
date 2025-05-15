import { Label } from '@/components/ui/label';
import { formattedCountries } from '@/utils/countries';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Flag from "react-world-flags";

const name = 'country';


const CountriesInput = ({defaultValue}: {defaultValue?: string}) => {
  return (
    <div>
      <Label htmlFor={name}  className='capitalize'>country</Label>

      <Select defaultValue={defaultValue || formattedCountries[0].code} name={name}>
          <SelectTrigger id={name}>
              <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {
              formattedCountries.map((item) => {
                return <SelectItem key={item.code} value={item.code}>
                  <span className='flex items-center gap-2'>
                  <Flag code={item.code} style={{ width: 20, height: 20 }} /> {item.name}
                  </span>
                </SelectItem>
              })
            }
          </SelectContent>
      </Select>
    </div>
  )
}

export default CountriesInput