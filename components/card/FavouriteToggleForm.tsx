'use client';

import { usePathname } from 'next/navigation';
import FormContainer from '../form/FormContainer';
import { toggleFavoriteAction } from '@/utils/actions';
import { CardSubmitButton } from '../form/Button';

type FavoriteToggleFormProps = {
  propertyId: string;
  favoriteId: string | null;
};

const FavouriteToggleForm = ({favoriteId,propertyId} : FavoriteToggleFormProps) => {
  const pathname = usePathname()
  const toggleAction = toggleFavoriteAction.bind(null, {   //first argument (null) is for "this"
    propertyId,
    favoriteId,
    pathname
  })

  return (
    <FormContainer action={toggleAction} >
      <CardSubmitButton isFavorite={favoriteId ? true : false} />
    </FormContainer>
  )
}

export default FavouriteToggleForm