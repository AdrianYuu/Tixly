import TransactionTypeEnum from '../enums/TransactionTypeEnum';

import DollarIncome from '../assets/images/dollar-income.png';
import DollarExpense from '../assets/images/dollar-expense.png';
import { formatToRupiah } from '../lib/utils';

interface IProps {
  type: TransactionTypeEnum;
  name: string;
  date: string;
  amount: string;
}

function TransactionCard({ type, name, date, amount }: IProps) {
  return (
    <div className="lg:flex lg:flex-row flex-col w-full bg-customWhite bg-opacity-5 p-4 justify-between rounded-2xl items-center mt-5">
      <div className="flex gap-4 items-center">
        <div className="flex items-center justify-center w-8 h-8 lg:w-16 lg:h-16 bg-white bg-opacity-10 rounded-full">
          {type === TransactionTypeEnum.EXPENSE ? (
            <img src={DollarExpense} className="w-6 h-6 lg:w-10 lg:h-10 object-contain" />
          ) : (
            <img src={DollarIncome} className="w-6 h-6 lg:w-10 lg:h-10 object-contain" />
          )}
        </div>

        <div className="flex flex-col">
          <p className='lg:text-xl text-md font-semibold'>{name}</p>
          <p>{date}</p>
        </div>
      </div>

      <p className={`mt-4 lg:mt-0 text-center text-2xl font-bold ${type === TransactionTypeEnum.EXPENSE ? 'text-customExpenseRed' : 'text-customGreen'}`}>
        {type === TransactionTypeEnum.EXPENSE ? "-" : "+"} {formatToRupiah(amount)}
      </p>
    </div>
  );
}

export default TransactionCard;
