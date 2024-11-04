import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import PaymentBanner from '../../components/PaymentBanner';
import { TICKET_LIST } from '../../configs/TicketConfig';
import { PAYMENT_TYPE_LIST } from '../../configs/PaymentConfig';
import IPaymentType from '../../interfaces/IPaymentType.d';
import PaymentType from '../../components/PaymentType';
import { formatToRupiah } from '../../lib/utils';
import Button from '../../components/Button';

function Payment() {
  const queryParams = new URLSearchParams(location.search);
  const ticketName = queryParams.get('ticketName');
  const price = queryParams.get('price');
  const id = queryParams.get('id');
  const [selectedPayment, setSelectedPayment] = useState<IPaymentType | null>(
    null,
  );

  const quantity = queryParams.get('quantity');

  const currentTicket = TICKET_LIST[11];

  const paymentList = PAYMENT_TYPE_LIST;

  const handlePaymentSelect = (payment: IPaymentType) => {
    setSelectedPayment(payment);
  };

  const handleBuyTicket = () => {
    console.log('Selected Seats:', seats);
    console.log('Event/Movie/Attraction ID: ', currentTicket.id);
    console.log('Ticket Name: ', ticketName);
    console.log('Ticket ID {for concert only}: ', id);
    console.log('Name: ', currentTicket.name);
    console.log('Selected Payment:', selectedPayment?.type ?? '');
  };

  const seats = queryParams.get('seats')?.split(',') || [];

  return (
    <>
      <Helmet>
        <title>Tixly | Payment</title>
      </Helmet>

      <motion.section
        className="flex flex-col gap-2 px-16 mt-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col px-16 text-white">
          <PaymentBanner
            image={currentTicket.imageUrl}
            name={ticketName ?? ''}
            address={currentTicket.address}
            date={currentTicket.concert?.concertDate ?? currentTicket.movie?.date}
            type={currentTicket.ticketType}
          />
          <div className="flex flex-col-reverse items-center lg:items-start lg:flex-row justify-between gap-6 mt-12">
            <div className="flex flex-col lg:w-3/5">
              {paymentList.length > 0 ? (
                paymentList.map((payment) => (
                  <PaymentType
                    key={payment.type}
                    payment={payment}
                    onClick={handlePaymentSelect}
                    isSelected={selectedPayment === payment}
                  />
                ))
              ) : (
                <p>No payment types available.</p>
              )}
            </div>

            <div className="flex flex-col gap-4 bg-customDarkGrey p-10 rounded-3xl h-max w-max mb-6 lg:mb-0">
              <p className="text-customWhite opacity-50 text-sm font-medium">
                {ticketName ? `${ticketName}` : 'Select a Ticket'}
              </p>
              <div className="flex justify-between text-customWhite opacity-50 text-sm">
                <p>{ticketName ? `${quantity}x ${ticketName} ticket` : ''}</p>
                <p>{price ? formatToRupiah(price) : ''}</p>
              </div>
              <div className="border-dashed border-t-2 border-customWhite opacity-30"></div>
              <div className="flex justify-between text-customWhite text-xl font-semibold">
                <p>Total</p>
                <p>{price ? formatToRupiah(price) : 'IDR 0'}</p>
              </div>
              <Button
                className="p-2 px-24"
                text="Buy Ticket"
                disabledState={!selectedPayment}
                onClick={handleBuyTicket}
              />
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}

export default Payment;