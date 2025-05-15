import { calculateDaysBetween } from "./calendar";

type BookingDetails = {
    checkIn:Date;
    checkOut:Date;
    price: number
}


export const calculateTotals = ({checkIn, checkOut, price} : BookingDetails) => {
    const totalNights = calculateDaysBetween({checkIn,checkOut});
    const subTotal = totalNights * price;
    const cleaning = 21
    const service = 40;
    const tax = subTotal * 0.1;
    const orderTotal = subTotal + cleaning + service + tax

    return {
        orderTotal,
        cleaning,
        totalNights,
        subTotal,
        service,
        tax
    }

}