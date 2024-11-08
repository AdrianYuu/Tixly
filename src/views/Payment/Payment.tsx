import { act, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import PaymentBanner from '../../components/PaymentBanner';
import { TICKET_LIST } from '../../configs/TicketConfig';
import { PAYMENT_TYPE_LIST } from '../../configs/PaymentConfig';
import IPaymentType from '../../interfaces/IPaymentType.d';
import PaymentType from '../../components/PaymentType';
import { changeBlobToUrl, formatToRupiah } from '../../lib/utils';
import Button from '../../components/Button';
import { fetchActivityById } from '../../services/ActivitiesService';
import { IActivity } from '../../interfaces/IActivity';
import LoadingSpinner from '../../components/LoadingSpinner';
import ActivityEnum from '../../enums/ActivityEnum';
import PaymentTypeEnum from '../../enums/PaymentTypeEnum';
import { useUserContext } from '../../contexts/UserContext';
import { backend_transaction } from '../../declarations/backend_transaction';
import { backend_user } from '../../declarations/backend_user';

function Payment() {
  const queryParams = new URLSearchParams(location.search);
  const ticketName = queryParams.get('ticketName');
  const price = queryParams.get('price');
  const activityId = queryParams.get('activityId');
  const id = queryParams.get('id');

  const { user, refetch } = useUserContext();

  const userBalance = user?.balance!;

  const [selectedPayment, setSelectedPayment] =
    useState<PaymentTypeEnum | null>(null);

  const quantity = queryParams.get('quantity');

  const currentTicket = TICKET_LIST[11];

  const paymentList = PAYMENT_TYPE_LIST;

  const [loading, setLoading] = useState<boolean>(true);

  const handlePaymentSelect = (payment: PaymentTypeEnum) => {
    setSelectedPayment(payment);
  };

  const handleBuyTicket = async () => {
    console.log('Selected Seats:', seats);
    console.log('Event/Movie/Attraction ID: ', activityId);
    console.log('Ticket Name: ', ticketName);
    console.log('Ticket ID {for concert only}: ', id);
    console.log('Name: ', currentTicket.name);

    console.log(ticket?.activityType!);

    let response;

    if (ticket!.activityType === ActivityEnum.CONCERT) {
      response = await backend_transaction.createTransaction({
        id: BigInt(0),
        bookingCode: 'Mario',
        bookingDate: 'Orlando',
        seatNumber: [''],
        concertTicketType: ticketName!,
        activityId: BigInt(ticket!.id!),
        principalId: user?.principalId!,
      });
    } else if (ticket!.activityType === ActivityEnum.MOVIE) {
      response = await backend_transaction.createTransaction({
        id: BigInt(0),
        bookingCode: 'Mario',
        bookingDate: '123',
        seatNumber: seats,
        concertTicketType: '',
        activityId: BigInt(ticket!.id!),
        principalId: user?.principalId!,
      });
    } else if (ticket!.activityType === ActivityEnum.TOURIST_ATTRACTION) {
      response = await backend_transaction.createTransaction({
        id: BigInt(0),
        bookingCode: 'Stefanus',
        bookingDate: 'Wilson',
        seatNumber: [''],
        concertTicketType: '',
        activityId: BigInt(ticket!.id!),
        principalId: user?.principalId!,
      });
    }

    if (selectedPayment === PaymentTypeEnum.WALLET) {
      await backend_user.updateUserBalance(
        user?.principalId!,
        BigInt(BigInt(user?.balance!) - BigInt(price!)),
      );
      await refetch();
    }
  };

  const seats: string[] = queryParams.get('seats')?.split(',') || [];

  const [ticket, setTickets] = useState<IActivity | null>(null);

  useEffect(() => {
    console.log(activityId!);
    async function fetchData() {
      const activity = await fetchActivityById(BigInt(activityId!));

      if (activity) {
        setTickets(activity);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

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
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="flex flex-col px-16 text-white">
              <>
                {ticket?.activityType != ActivityEnum.TOURIST_ATTRACTION && (
                  <PaymentBanner
                    image={changeBlobToUrl(ticket?.image!)}
                    name={ticketName ?? ''}
                    address={ticket?.address!}
                    date={ticket!.concert?.date! || ticket!.movie?.date!}
                    type={ticket?.activityType!}
                  />
                )}
              </>
              <div className="flex flex-col-reverse items-center lg:items-start lg:flex-row justify-between gap-6 mt-12">
                <div className="flex flex-col lg:w-3/5">
                  {/* Wallet Payment Type */}
                  <PaymentType
                    payment={{
                      type: PaymentTypeEnum.WALLET,
                      balance: userBalance.toString(),
                    }}
                    onClick={() => handlePaymentSelect(PaymentTypeEnum.WALLET)}
                    isSelected={selectedPayment === PaymentTypeEnum.WALLET}
                  />

                  {/* QRIS Payment Type */}
                  <PaymentType
                    payment={{ type: PaymentTypeEnum.QRIS }}
                    onClick={() => handlePaymentSelect(PaymentTypeEnum.QRIS)}
                    isSelected={selectedPayment === PaymentTypeEnum.QRIS}
                  />
                </div>

                <div className="flex flex-col gap-4 bg-customDarkGrey p-10 rounded-3xl h-max w-max mb-6 lg:mb-0">
                  <p className="text-customWhite opacity-50 text-sm font-medium">
                    {ticketName ? `${ticketName}` : 'Select a Ticket'}
                  </p>
                  <div className="flex justify-between text-customWhite opacity-50 text-sm">
                    <p>
                      {ticketName ? `${quantity}x ${ticketName} ticket` : ''}
                    </p>
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
                    disabledState={
                      !selectedPayment || userBalance < Number(price)
                    }
                    onClick={handleBuyTicket}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </motion.section>
    </>
  );
}

export default Payment;
