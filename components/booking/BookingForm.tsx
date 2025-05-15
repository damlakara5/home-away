import { calculateTotals } from '@/utils/calculateTotals';
import { Card, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useProperty } from '@/utils/store';
import { formatCurrency } from '@/utils/format';
import BookingFormRow from './BookingFormRow';

const BookingForm = () => {
  const {range,price} = useProperty((state)=> state);

  const checkIn= range?.from as Date;
  const checkOut= range?.to as Date;
  const {totalNights, subTotal, cleaning, service,tax,orderTotal} = calculateTotals({checkIn,checkOut, price});


  return (
    <Card className='p-8 mb-4'>
    <CardTitle className='mb-8'>Summary </CardTitle>
    <BookingFormRow label={`$${price} x ${totalNights} nights`} amount={subTotal} />
    <BookingFormRow label='Cleaning Fee' amount={cleaning} />
    <BookingFormRow label='Service Fee' amount={service} />
    <BookingFormRow label='Tax' amount={tax} />
    <Separator className='mt-4' />
    <CardTitle className='mt-8'>
      <BookingFormRow label='Booking Total' amount={orderTotal} />
    </CardTitle>
  </Card>
  )
}

export default BookingForm