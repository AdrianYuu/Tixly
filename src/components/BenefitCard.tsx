import { BENEFIT_LIST, IBenefit } from '../configs/BenefitConfig';

interface IProps {
  benefit: IBenefit;
  pos: number;
}

function BenefitCard({ benefit, pos }: IProps) {
  return (
    <div
      className={`-me-[2.5rem] xl:rounded-tr-[3rem] xl:rounded-br-[3rem] ${benefit.color} xl:w-full min-w-screen flex justify-center items-center flex-col px-16 py-36`}
      style={{
        marginLeft: pos !== 0 ? '-2.5rem' : '0',
        zIndex: BENEFIT_LIST.length - pos,
      }}
    >
      <img src={benefit.imageUrl} alt="" className="mb-6 w-32" />
      <p className="text-customLightYellow text-xl font-semibold mb-4 text-center">
        {benefit.title}
      </p>
      <p className="text-sm font-medium text-center px-8">
        {benefit.description}
      </p>
    </div>
  );
}

export default BenefitCard;
