import { CurrencyDollarIcon, WalletIcon } from '@heroicons/react/24/solid';
import PaymentTypeEnum from '../enums/PaymentTypeEnum';
import { formatToRupiah } from '../lib/utils';
import IPaymentType from '../interfaces/IPaymentType';
import QrCodeImage from '../assets/images/qr-code.png';

interface IProps {
  payment: IPaymentType;
  onClick?: (type: IPaymentType) => void;
  isSelected?: boolean;
}

function PaymentType({ payment, onClick, isSelected }: IProps) {
  const handleClick = () => {
    if (payment && onClick) {
      onClick(payment);
    }
  };

  return (
    <div
      className="text-customWhite bg-customLightBlack p-5 rounded-xl mb-6 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          {payment.type === PaymentTypeEnum.WALLET ? (
            <WalletIcon className={`w-10 h-10 ${isSelected ? 'text-customSoLightPurple' : 'text-customWhite' }`} />
          ) : (
            <CurrencyDollarIcon className={`w-10 h-10 ${isSelected ? 'text-customSoLightPurple' : 'text-customWhite' }`} />
          )}

          <div className="flex flex-col">
            {payment.type === PaymentTypeEnum.WALLET ? (
              <>
                <p>My {PaymentTypeEnum.WALLET}</p>
                <p className={`text-xl ${isSelected ? 'text-customSoLightPurple' : 'text-customWhite' } font-medium`}>
                  {formatToRupiah(payment.balance)}
                </p>
              </>
            ) : (
              <p className='text-2xl font-medium'>{PaymentTypeEnum.QRIS}</p>
            )}
          </div>
        </div>

        {isSelected ? (
          <div className="relative flex items-center">
            <div className="w-8 h-8 rounded-full bg-customSoLightPurple border-none flex items-center justify-center">
              <div className="w-7 h-7 rounded-full border-2 bg-customSoLightPurple border-black"></div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>

      {isSelected && payment.type === PaymentTypeEnum.QRIS && (
        <div className="flex mt-4 justify-center">
          <img src={QrCodeImage} alt="QRIS Barcode" className="w-full max-w-xs" />
        </div>
      )}
    </div>
  );
}

export default PaymentType;
