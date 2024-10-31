import { ClockIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { formatToRupiah } from '../lib/utils';
import TicketDetailEnum from '../enums/TicketDetailEnum';
import { ITicketType } from '../interfaces/IConcert';

interface IProps {
  ticketName: string;
  endDate?: string;
  price: number;
  type: TicketDetailEnum;
  ticketType?: ITicketType;
  onClick?: (ticket: ITicketType) => void;
}

function Ticket({
  ticketName,
  endDate,
  price,
  type,
  onClick,
  ticketType,
}: IProps) {
  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleClick = () => {
    if (ticketType && onClick) {
      onClick(ticketType);
    }
  };

  return (
    <div className="grid grid-cols-3 cursor-pointer" onClick={handleClick}>
      {/* Image Section - 2/3 of the grid */}
      <div className="relative col-span-2 h-56 lg:h-80 bg-customDarkGrey flex flex-col items-start justify-center border border-none rounded-l-3xl">
        <div className="flex flex-col gap-4 text-start lg:ml-20">
          <p className="text-customWhite text-xl font-semibold">{ticketName}</p>
          <div className="flex flex-col gap-3">
            <p className="flex gap-2 items-center text-customWhite text-md font-medium opacity-50">
              <ClockIcon className="w-5 h-5" />
              Ends On: {endDate}
            </p>
            <p className="flex gap-2 items-center text-customLightYellow text-md font-medium">
              Detail
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-8 h-8 rounded-bl-full bg-customBlack clip-hole"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 rounded-tl-full bg-customBlack clip-hole"></div>
      </div>

      {/* Text Section - 1/3 of the grid */}
      <div className="relative h-56 lg:h-80 flex flex-col bg-customDarkGrey p-8 rounded-r-3xl col-span-1 items-center justify-center border border-none">
        <div className="flex flex-col gap-4 text-center ml-6">
          <p className="text-customWhite text-xl font-semibold">
            {formatToRupiah(price)}
          </p>

          {type !== TicketDetailEnum.CONCERT ? (
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={decreaseQuantity}
                className="bg-customLightGrey text-customWhite text-xl rounded-full w-10 h-10 flex items-center justify-center"
              >
                -
              </button>
              <span className="text-customWhite text-xl">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="bg-customLightPurple text-customWhite text-xl rounded-full w-10 h-10 flex items-center justify-center"
              >
                +
              </button>
            </div>
          ) : (
            ''
          )}

          <div className="absolute top-0 left-0 w-8 h-8 rounded-br-full bg-customBlack clip-hole"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 rounded-tr-full bg-customBlack clip-hole"></div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
