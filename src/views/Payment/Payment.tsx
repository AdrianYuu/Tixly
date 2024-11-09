import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import PaymentBanner from '../../components/PaymentBanner';
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
import Unauthorized from '../../components/Unauthorized';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Payment() {
  const todayDate = new Date().toISOString().split('T')[0];
  const queryParams = new URLSearchParams(location.search);
  const ticketName = queryParams.get('ticketName');
  const price = queryParams.get('price');
  const activityId = queryParams.get('activityId');
  const { user, refetch } = useUserContext();
  const userBalance = user?.balance!;
  const navigate = useNavigate();

  const [selectedPayment, setSelectedPayment] =
    useState<PaymentTypeEnum | null>(null);
  const quantity = queryParams.get('quantity');
  const seats: string[] = queryParams.get('seats')?.split(',') || [];

  const [loading, setLoading] = useState<boolean>(true);
  const [ticket, setTickets] = useState<IActivity | null>(null);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [paymentAmount, setPaymentAmount] = useState<string>('');
  const [taxAmount, setTaxAmount] = useState<string>('');

  const handlePaymentSelect = (payment: PaymentTypeEnum) => {
    setSelectedPayment(payment);
  };

  const handleBuyTicket = async () => {
    const ticketPrice = BigInt(price!);
    let taxWithQRIS = BigInt(0);
    let totalAmount = ticketPrice;

    if (selectedPayment === PaymentTypeEnum.QRIS) {
      taxWithQRIS = (ticketPrice * BigInt(5)) / BigInt(100);
      totalAmount = ticketPrice + taxWithQRIS;
    }

    setPaymentAmount(totalAmount.toString());
    setTaxAmount(taxWithQRIS.toString());
    setIsConfirmModalOpen(true);
  };

  const handleConfirmPayment = async () => {
    let response;

    const ticketPrice = BigInt(price!);
    const totalAmount = BigInt(paymentAmount);

    if (ticket!.activityType === ActivityEnum.CONCERT) {
      response = await backend_transaction.createTransaction({
        id: BigInt(0),
        bookingCode: uuidv4(),
        bookingDate: todayDate,
        seatNumber: [''],
        concertTicketType: ticketName!,
        activityId: BigInt(ticket!.id!),
        principalId: user?.principalId!,
      });
    } else if (ticket!.activityType === ActivityEnum.MOVIE) {
      response = await backend_transaction.createTransaction({
        id: BigInt(0),
        bookingCode: uuidv4(),
        bookingDate: todayDate,
        seatNumber: seats,
        concertTicketType: '',
        activityId: BigInt(ticket!.id!),
        principalId: user?.principalId!,
      });
    } else if (ticket!.activityType === ActivityEnum.TOURIST_ATTRACTION) {
      response = await backend_transaction.createTransaction({
        id: BigInt(0),
        bookingCode: uuidv4(),
        bookingDate: todayDate,
        seatNumber: [''],
        concertTicketType: '',
        activityId: BigInt(ticket!.id!),
        principalId: user?.principalId!,
      });
    }

    if (selectedPayment === PaymentTypeEnum.WALLET) {
      await backend_user.updateUserBalance(
        user?.principalId!,
        BigInt(BigInt(user?.balance!) - ticketPrice),
      );
    } else if (selectedPayment === PaymentTypeEnum.QRIS) {
      await backend_user.updateUserBalance(
        user?.principalId!,
        BigInt(BigInt(user?.balance!) - totalAmount),
      );
    }

    await refetch();

    toast.success('Payment successful! Your ticket has been booked.', {
      position: 'top-right',
    });

    setIsConfirmModalOpen(false);

    navigate("/my-tickets");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchData() {
      const activity = await fetchActivityById(BigInt(activityId!));

      if (activity) {
        setTickets(activity);
        setLoading(false);
      }
    }
    fetchData();
  }, [activityId]);

  return (
    <>
      <Helmet>
        <title>Tixly | Payment</title>
      </Helmet>

      <motion.section
        className="flex flex-col gap-2 mt-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {user ? (
          <>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <>
                <div className="flex flex-col px-16 text-white">
                  {ticket?.activityType !== ActivityEnum.TOURIST_ATTRACTION && (
                    <PaymentBanner
                      image={changeBlobToUrl(ticket?.image!)}
                      name={ticketName ?? ''}
                      address={ticket?.address!}
                      date={ticket!.concert?.date! || ticket!.movie?.date!}
                      type={ticket?.activityType!}
                    />
                  )}
                  <div className="flex flex-col-reverse items-center lg:items-start lg:flex-row justify-between gap-6 mt-12">
                    <div className="flex flex-col lg:w-3/5">
                      {/* Wallet Payment Type */}
                      <PaymentType
                        payment={{
                          type: PaymentTypeEnum.WALLET,
                          balance: userBalance.toString(),
                        }}
                        onClick={() =>
                          handlePaymentSelect(PaymentTypeEnum.WALLET)
                        }
                        isSelected={selectedPayment === PaymentTypeEnum.WALLET}
                      />

                      {/* QRIS Payment Type */}
                      <PaymentType
                        payment={{ type: PaymentTypeEnum.QRIS }}
                        onClick={() =>
                          handlePaymentSelect(PaymentTypeEnum.QRIS)
                        }
                        isSelected={selectedPayment === PaymentTypeEnum.QRIS}
                      />
                    </div>

                    <div className="flex flex-col gap-4 bg-customDarkGrey p-10 rounded-3xl h-max w-max mb-6 lg:mb-0">
                      <p className="text-customWhite opacity-50 text-sm font-medium">
                        {ticketName ? `${ticketName}` : 'Select a Ticket'}
                      </p>
                      <div className="flex justify-between text-customWhite opacity-50 text-sm">
                        <p>
                          {ticketName
                            ? `${quantity}x ${ticketName} ticket`
                            : ''}
                        </p>
                        <p>{price ? formatToRupiah(price) : ''}</p>
                      </div>
                      {selectedPayment === PaymentTypeEnum.QRIS ? (
                        <div className="flex justify-between text-customWhite opacity-50 text-sm">
                          <p>Tax (5%)</p>
                          <p>
                            {formatToRupiah(
                              (
                                (BigInt(price!) * BigInt(5)) /
                                BigInt(100)
                              ).toString(),
                            )}
                          </p>
                        </div>
                      ) : (
                        ''
                      )}

                      <div className="border-dashed border-t-2 border-customWhite opacity-30"></div>
                      <div className="flex justify-between text-customWhite text-xl font-semibold">
                        <p>Total</p>
                        <p>
                          {selectedPayment === null
                            ? formatToRupiah(price!)
                            : selectedPayment === PaymentTypeEnum.WALLET
                            ? formatToRupiah(price!)
                            : formatToRupiah(
                                (
                                  (BigInt(price!) * BigInt(5)) / BigInt(100) +
                                  BigInt(price!)
                                ).toString(),
                              )}
                        </p>
                      </div>

                      <Button
                        className="p-2 px-24"
                        text="Buy Ticket"
                        disabledState={
                          !selectedPayment ||
                          userBalance <
                            (selectedPayment === PaymentTypeEnum.WALLET
                              ? BigInt(price!)
                              : BigInt(price!) +
                                (BigInt(price!) * BigInt(5)) / BigInt(100))
                        }
                        onClick={handleBuyTicket}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <Unauthorized />
        )}

        {isConfirmModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-customDarkGrey p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-semibold text-customWhite mb-4">
                Confirm Payment
              </h2>
              <p className="text-white">
                <strong>Amount:</strong> {formatToRupiah(price!)}
              </p>
              {selectedPayment === PaymentTypeEnum.QRIS && (
                <p className="text-white">
                  <strong>Tax (5%):</strong> {formatToRupiah(taxAmount)}
                </p>
              )}

              <p className="text-white mt-4">
                <strong>Total: </strong> {formatToRupiah(paymentAmount)}
              </p>

              <p className="text-white mt-4">
                Are you sure you want to proceed with this payment?
              </p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleConfirmPayment}
                  className="bg-customLightPurple text-white py-1 px-4 rounded-md mr-2"
                >
                  Yes, Confirm
                </button>
                <button
                  onClick={() => setIsConfirmModalOpen(false)}
                  className="bg-customWhite bg-opacity-10 text-customLightGrey py-1 px-4 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.section>
    </>
  );
}

export default Payment;
