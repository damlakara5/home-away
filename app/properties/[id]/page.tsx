import FavouriteToggleButton from '@/components/card/FavouriteToggleButton';
import PropertyRating from '@/components/card/PropertyRating';
import Amenities from '@/components/properties/Amenities';
import BookingCalendar from '@/components/properties/BookingCalendar';
import BreadCrumbs from '@/components/properties/BreadCrumbs';
import Description from '@/components/properties/Description';
import ImageContainer from '@/components/properties/ImageContainer';
import PropertyDetails from '@/components/properties/PropertyDetails';
import PropertyMap from '@/components/properties/PropertyMap';
import { ShareButton } from '@/components/properties/ShareButton';
import UserInfo from '@/components/properties/UserInfo';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchPropertyDetails } from '@/utils/actions'
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import React from 'react'


const DynamicMap = dynamic(() => import('@/components/properties/PropertyMap'), {  //lazy load
  ssr:false,
  loading : () => <Skeleton className='h-[400px] w-full' />
})


const PropertyDetailsPage =async ({params}: {params: {id:string}}) => {
  const property = await fetchPropertyDetails(params.id);

  if(!property) redirect('/');
  
  const {baths, bedrooms, guests, beds} = property;
  const details  = {baths, bedrooms, guests, beds};
  const firstName = property.profile.firstName;
  const profileImage = property.profile.profileImage;

  return (
    <section>
      <BreadCrumbs  name={property.name}/>
      <header className='flex items-enter justify-between mt-4'>
        <h1 className='text-4xl font-bold capitalize'>{property.tagline} </h1>
        <div className='flex items-center gap-x-4'>
          <ShareButton propertyId={property.id} name={property.name} />
          <FavouriteToggleButton propertyId={property.id} />
        </div>
      </header>
      <ImageContainer mainImage={property.image} name={property.name} />
      <section className='lg:grid lg:grid-cols-12 gap-x-12 mt-12'>
        <div className='lg:col-span-8'>
          <div className='flex gap-x-4 items-center'>
            <h1 className='text-xl font-bold'> {property.name} </h1>
            <PropertyRating inPage propertyId={property.id} />
          </div>
          <PropertyDetails details={details} />
          <UserInfo profile={{firstName,profileImage}} />
          <Description description={property.description} />
          <Amenities amenities={property.amenities} />
          <DynamicMap countryCode={property.country} />
        </div>
        <div className='lg:col-span-4 flex flex-col items-center '>
          <BookingCalendar />
        </div>
      </section>
    </section>
  )
}

export default PropertyDetailsPage