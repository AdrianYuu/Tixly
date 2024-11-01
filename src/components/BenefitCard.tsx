import { BENEFIT_LIST, IBenefit } from '../configs/BenefitConfig';

interface IProps {
  benefit: IBenefit;
  pos: number;
}

function BenefitCard({ benefit, pos }: IProps) {
  return (
    <div
      className={`relative xl:-me-[2.5rem] xl:rounded-tr-[3rem] xl:rounded-br-[3rem] ${benefit.color} xl:w-full min-w-screen flex justify-center items-center flex-col px-16 py-36`}
      style={{
        zIndex: BENEFIT_LIST.length - pos,
      }}
    >
      <div className="absolute inset-0 flex justify-center items-center z-0">
        <div
          className={`w-52 h-52 ${benefit.glowingColor} opacity-40 rounded-full blur-xl`}
        ></div>
      </div>

      <img src={benefit.imageUrl} alt="" className="mb-6 w-32 z-10" />
      <p className="text-customLightYellow text-xl font-semibold mb-4 text-center z-10">
        {benefit.title}
      </p>
      <p className="text-sm font-medium text-center px-8 z-10">
        {benefit.description}
      </p>
    </div>
  );
}

export default BenefitCard;
