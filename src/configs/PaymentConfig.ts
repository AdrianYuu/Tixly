import { useEffect } from 'react';
import PaymentTypeEnum from '../enums/PaymentTypeEnum';
import IPaymentType from '../interfaces/IPaymentType';

export const PAYMENT_TYPE_LIST: IPaymentType[] = [
  {
    type: PaymentTypeEnum.WALLET,
    balance: '10000',
  },
  {
    type: PaymentTypeEnum.QRIS,
  },
];
