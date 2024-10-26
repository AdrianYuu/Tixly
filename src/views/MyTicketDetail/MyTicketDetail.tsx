import FestivalBannerImage from '../../assets/images/festival.png';
import QRCodeImage from '../../assets/images/qr-code.png';
import TermsAndCondition from '../../components/TermsAndCondition';

function MyTicketDetail() {
  return (
    <div className="flex flex-col px-16 pt-4">
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        <img src={FestivalBannerImage} alt="" />
        <div className="flex flex-col gap-8 lg:items-start items-center">
          <div className="w-max bg-customDarkGrey p-2 px-12 rounded-full">
            <p className="bg-gradient-to-r from-customLightPurple to-customLightYellow bg-clip-text text-transparent font-medium text-xl">
              Festival
            </p>
          </div>

          <div className="flex flex-col gap-2 lg:text-start text-center">
            <p className="text-3xl text-customWhite font-semibold">
              WATERBOMB 2024 JAKARTA
            </p>
            <p className="text-customWhite opacity-70 text-xl">
              Jl. M.H. Thamrin No.69, Salembaran, Kec. Kosambi, Kabupaten
              Tangerang, Banten 15214
            </p>
          </div>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col text-customWhite items-center justify-between">
        <div className="flex flex-col gap-4 mt-6 w-full lg:text-start text-center">
          <div className="flex flex-col gap-2">
            <p className="text-xl opacity-50">Venue</p>
            <p className="text-3xl font-semibold">Phantom Ground Park, PIK 2</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xl opacity-50">Section</p>
            <p className="text-3xl font-semibold">FESTIVAL</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xl opacity-50">Date</p>
            <p className="text-3xl font-semibold">
              Saturday, 2nd November 2024
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-6 w-full lg:text-start text-center">
          <div className="flex flex-col gap-2">
            <p className="text-xl opacity-50">Booking Code</p>
            <p className="text-3xl font-semibold">BK-0xA1B2-654321-9f4d2e</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xl opacity-50">Row</p>
            <p className="text-3xl font-semibold">2</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xl opacity-50">Time</p>
            <p className="text-3xl font-semibold">
              19:00
            </p>
          </div>
        </div>

        <img src={QRCodeImage} alt="" className="w-80" />
      </div>

      <div className="mt-6">
        <TermsAndCondition />
      </div>

    </div>
  );
}

export default MyTicketDetail;