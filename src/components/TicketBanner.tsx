import { CalendarDaysIcon, MapPinIcon } from '@heroicons/react/24/outline';
import TicketEnum from '../enums/ActivityEnum';

interface IProps {
  image: string;
  name: string;
  address: string;
  date: string;
  type: TicketEnum;
}

function TicketBanner({ image, name, address, date, type }: IProps) {
  return (
    <div className="grid grid-cols-3">
      {/* Image Section - 2/3 of the grid */}
      <div className="relative lg:col-span-2 col-span-3 h-full">
        <img
          src={image}
          alt="Product"
          className="w-full h-56 lg:h-80 object-fit rounded-l-3xl border border-transparent"
        />
        <div className="absolute top-0 right-0 w-8 h-8 rounded-bl-full bg-customBlack clip-hole"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 rounded-tl-full bg-customBlack clip-hole"></div>
      </div>

      {/* Text Section - 1/3 of the grid */}
      <div className="relative h-56 lg:h-80 lg:flex lg:flex-col bg-customDarkGrey p-8 rounded-r-3xl col-span-1 items-start justify-center border border-none hidden">
        <div className="flex flex-col gap-4 text-start ml-6">
          <p className="text-customWhite text-xl font-semibold">{name}</p>

          <div className="flex flex-col gap-2">
            <p className="flex gap-2 items-center text-customWhite text-md font-medium opacity-50">
              <MapPinIcon className="w-5 h-5" />
              {address}
            </p>
            <p className="flex gap-2 items-center text-customLightYellow text-md font-medium">
              {type !== TicketEnum.TOURIST_ATTRACTION ? (
                <>
                  <CalendarDaysIcon className="w-5 h-5" />
                  {date}
                </>
              ) : (
                ''
              )}
            </p>
          </div>
          <div className="absolute top-0 left-0 w-8 h-8 rounded-br-full bg-customBlack clip-hole"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 rounded-tr-full bg-customBlack clip-hole"></div>
        </div>
      </div>
    </div>
  );
}

export default TicketBanner;
