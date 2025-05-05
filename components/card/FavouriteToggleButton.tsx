import {FaHeart} from 'react-icons/fa'
import { Button } from '../ui/button'
import { auth } from '@clerk/nextjs/server'
import { CardsignInButton } from '../form/Button';
import { fetchFavouriteId } from '@/utils/actions';
import FavouriteToggleForm from './FavouriteToggleForm';

const FavouriteToggleButton = async({propertyId} : {propertyId:string}) => {
  const {userId} = auth();

  if(!userId) return <CardsignInButton />

  const favoriteId = await fetchFavouriteId({propertyId});



  return (
    <FavouriteToggleForm favoriteId={favoriteId} propertyId={propertyId} />
  )
}

export default FavouriteToggleButton