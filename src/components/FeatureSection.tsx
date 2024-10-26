import EventCard from './EventCard';

interface IProps {
  title: string;
  description: string;
}

function FeatureSection({ title, description }: IProps) {
  return (
    <div>
      <section className="mt-24 text-customWhite flex justify-center items-center flex-col">
        <span className="text-5xl font-bold bg-gradient-to-r from-customLightPurple to-customLightYellow bg-clip-text text-transparent">
          {title}
        </span>
        <p className="text-sm font-medium mt-8">{description}</p>
        <div className="flex justify-center gap-8 items-center mt-16 px-16">
          {[1, 2, 3, 4].map((_, index) => (
            <EventCard
              key={index}
              imageUrl="../../assets/images/dummy-image.png"
              title="WATERBOMB 2024 JAKARTA"
              address="Phantom Ground Park, PIK 2"
              date="Saturday, 3nd November 2024"
              price={1400000}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default FeatureSection;
