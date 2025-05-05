'use client';
import { useState } from 'react';
import { amenities, Amenity } from '@/utils/amenities';
import { Checkbox } from '@/components/ui/checkbox';

const AmenitiesInput = ({defaultValue} : {defaultValue ?: Amenity[]}) => {
    const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>(defaultValue || amenities)

    const handleChange = (amenity: Amenity) => {
        setSelectedAmenities((prev) => {
            return prev.map((a) => {
                if(a.name === amenity.name){
                    return {...a, selected: !a.selected}
                }
                return a
            })
        })
    }

  return (
    <section>
        <input type='hidden' name='amenities' value={JSON.stringify(selectedAmenities)} />
        <div className='grid grid-cols-2 gap-4'>
            {
                selectedAmenities.map((amenitiy) => {
                    return <div key={amenitiy.name} className='flex items-center space-x-2'>
                        <Checkbox id={amenitiy.name} checked={amenitiy.selected} onCheckedChange={() => handleChange(amenitiy)} />
                            <label htmlFor={amenitiy.name} className='text-sm font-medium leading-npne capitalize flex gap-x-2 items-center'>
                                {amenitiy.name} <amenitiy.icon className='w-4 h-4'/>
                            </label>
                    </div>
                })
            }
        </div>
    </section>
  )
}

export default AmenitiesInput