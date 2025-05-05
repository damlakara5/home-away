import { fetchProperties } from '@/utils/actions';
import PropertiesList from './PropertiesList';
import EmptyList from './EmptyList';
import type { PropertyCardProps } from '@/utils/types';

const PropertiesContainer = async({category, search} : {category?: string, search?:string}) => {
    const properties: PropertyCardProps[] = await fetchProperties({
        category,search
    });

    if(properties.length === 0){
        return <EmptyList 
            heading='No results.'
            message='Try changing or removing some of your filters.'
            btnText='Clear filters'
        />
    }

  return (
    <PropertiesList properties={properties} />
  )
}

export default PropertiesContainer