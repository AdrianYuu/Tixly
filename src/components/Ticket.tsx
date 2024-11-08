import { ClockIcon } from '@heroicons/react/24/solid';
import { formatToRupiah } from '../lib/utils';
import TicketDetailEnum from '../enums/ActivityEnum';
import TicketEnum from '../enums/ActivityEnum';

interface IProps {
  ticketName: string;
  endDate?: string;
  price: string;
  type: TicketDetailEnum;
  ticketType?: ITicketType;
  onClick?: (ticket: ITicketType) => void;
  isSelected?: boolean;
  quantity?: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
}

function Ticket({
  ticketName,
  endDate,
  price,
  type,
  onClick,
  ticketType,
  isSelected,
  quantity,
  onIncrease,
  onDecrease,
}: IProps) {
  const handleClick = () => {
    if (ticketType && onClick) {
      onClick(ticketType);
    }
  };

  return (
    <div className={`grid grid-cols-3 cursor-pointer`} onClick={handleClick}>
      {/* Image Section - 2/3 of the grid */}
      <div className="relative col-span-2">
        <div
          className={`h-56 bg-customDarkGrey z-0 ${
            isSelected
              ? 'bg-customDarkPurpleV2 outline outline-customLightPurple border border-transparent'
              : ''
          } flex flex-col items-start justify-center border border-none rounded-l-3xl`}
        >
          <div className="flex flex-col gap-4 text-start lg:ml-20">
            <p className="text-customWhite text-xl font-semibold">
              {ticketName}
            </p>
            <div className="flex flex-col gap-3">
              {type === TicketEnum.CONCERT && (
                <p className="flex gap-2 items-center text-customWhite text-md font-medium opacity-50">
                  <ClockIcon className="w-5 h-5" />
                  Ends On: {endDate}
                </p>
              )}
              <p className="flex gap-2 items-center text-customLightYellow text-md font-medium">
                Detail
              </p>
            </div>
          </div>
        </div>
        <div className="absolute -top-1 -right-0.5 w-8 h-8 rounded-bl-full bg-customBlack clip-hole z-50"></div>
        <div className="absolute -bottom-1 -right-0.5 w-8 h-8 rounded-tl-full bg-customBlack clip-hole z-50"></div>
      </div>

      {/* Text Section - 1/3 of the grid */}
      <div className="relative">
        <div
          className={`h-56 flex flex-col bg-customDarkGrey z-0 ${
            isSelected
              ? 'bg-customDarkPurpleV2 outline outline-customLightPurple border border-transparent'
              : ''
          } p-8 rounded-r-3xl col-span-1 items-center justify-center border border-none`}
        >
          <div className="flex flex-col gap-4 text-center ml-6">
            <p className="text-customWhite text-xl font-semibold">
              {formatToRupiah(price)}
            </p>

            {type !== TicketDetailEnum.CONCERT && (
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={onDecrease}
                  className="bg-customLightGrey text-customWhite text-xl rounded-full w-10 h-10 flex items-center justify-center"
                >
                  -
                </button>
                <span className="text-customWhite text-xl">{quantity}</span>
                <button
                  onClick={onIncrease}
                  className="bg-customLightPurple text-customWhite text-xl rounded-full w-10 h-10 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="absolute -top-1 -left-0.5 w-8 h-8 rounded-br-full bg-customBlack clip-hole z-50"></div>
        <div className="absolute -bottom-1 -left-0.5 w-8 h-8 rounded-tr-full bg-customBlack clip-hole z-50"></div>
      </div>
    </div>
  );
}

export default Ticket;
