import { useState } from 'react';
import { motion } from 'framer-motion';
import WalletXIcon from '../../assets/images/wallet-x-icon.png';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Helmet } from 'react-helmet-async';
import TransactionCard from '../../components/TransactionCard';
import { TRANSACTION_LIST } from '../../configs/TransactionConfig';
import { MY_WALLET } from '../../configs/WalletConfig';
import { formatToRupiah } from '../../lib/utils';

function MyWallet() {
  const transactionList = TRANSACTION_LIST;
  const myWallet = MY_WALLET;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [topUpAmount, setTopUpAmount] = useState<string>('');

  const handleTopUp = () => {
    setIsModalOpen(false);
    setTopUpAmount('');
  };

  return (
    <>
      <Helmet>
        <title>Tixly | My Wallet</title>
      </Helmet>

      <motion.section
        className="flex flex-col xl:flex-row items-center justify-center text-customWhite xl:mt-0 mt-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col w-full px-16 mt-8 text-white">
          <div className="flex lg:flex-row flex-col gap-10">
            <div className="flex lg:w-2/3 w-full bg-customWhite bg-opacity-10 p-4 rounded-2xl">
              <div className="flex-col w-full">
                <div className="flex justify-between">
                  <p className="customLightPurple text-xl font-medium text-customSoLightPurple">
                    TixLet
                  </p>
                  <img
                    src={WalletXIcon}
                    className="w-6 h-6"
                    alt="Wallet Icon"
                  />
                </div>

                <div className="flex lg:flex-row flex-col lg:justify-between mt-36 lg:items-end">
                  <div className="flex flex-col">
                    <p className="text-xl">Balance</p>
                    <p className="bg-gradient-to-r from-customSoLightPurple to-customLightYellow bg-clip-text text-transparent text-5xl font-bold">
                      {formatToRupiah(myWallet.balance)}
                    </p>
                  </div>

                  <div className="flex items-center justify-end mt-4">
                    <button
                      onClick={() => setIsModalOpen(!isModalOpen)}
                      className="flex items-center text-customLightPurple font-semibold bg-white py-1 px-2 gap-2 rounded-full pr-4"
                    >
                      <div className="flex items-center justify-center w-8 h-8 bg-customLightPurple rounded-full text-white">
                        <PlusIcon className="w-6 h-6" />
                      </div>
                      Top Up
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex lg:w-1/3 flex-col justify-center gap-10">
              <div className="flex flex-col w-full bg-customWhite bg-opacity-10 gap-4 p-4 rounded-2xl border border-customExpenseRed shadow-md shadow-customExpenseRed">
                <p className="customLightPurple text-xl">Expenses This Month</p>
                <p className="text-3xl font-bold text-customExpenseRed">
                  {formatToRupiah(myWallet.expenseThisMonth)}
                </p>
              </div>

              <div className="flex flex-col w-full bg-customWhite bg-opacity-10 gap-4 p-4 rounded-2xl border border-customGreen shadow-md shadow-customGreen">
                <p className="customLightPurple text-xl">
                  Transfer Succeed This Month
                </p>
                <p className="text-3xl font-bold text-customGreen">
                  {formatToRupiah(myWallet.incomeThisMonth)}
                </p>
              </div>
            </div>
          </div>

          <p className="font-semibold text-2xl text-customWhite text-opacity-70 mt-10">
            Notifications
          </p>

          {transactionList.length > 0 ? (
            transactionList.map((transaction) => (
              <TransactionCard
                type={transaction.type}
                name={transaction.name}
                date={transaction.date}
                amount={transaction.amount}
              />
            ))
          ) : (
            <p>No Transaction!</p>
          )}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-customDarkGrey p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-semibold text-customWhite mb-4">Top Up Your Wallet</h2>
              <input
                type="text"
                placeholder="Enter amount"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full mb-4 text-customDarkGrey"
              />
              <div className="flex justify-end">
              <button
                  onClick={handleTopUp}
                  className="bg-customLightPurple text-white py-1 px-4 rounded-md mr-2"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
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

export default MyWallet;
