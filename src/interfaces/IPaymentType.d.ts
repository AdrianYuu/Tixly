import PaymentTypeEnum from "../enums/PaymentTypeEnum";

interface IPaymentType {
    type: PaymentTypeEnum;
    balance?: string;
}

export default IPaymentType