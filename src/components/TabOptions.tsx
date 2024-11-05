import FilterImage from '../assets/images/filter.png';

interface IProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

function TabOptions({ activeTab, onTabChange }: IProps) {
  const tabs = ['My Ticket', 'Upcoming War'];

  return (
    <div className="flex items-center gap-2 px-4 bg-customBlack">
      <button className="p-1 focus:outline-none">
        <img src={FilterImage} alt="Filter" className="w-10 h-10" />
      </button>

      <div className="w-64">
        <div className="relative flex items-center p-1 bg-customDarkGrey rounded-full">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`absolute px-4 py-2.5 text-sm font-medium rounded-full transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-customLightYellow text-black'
                  : 'bg-customDarkGrey text-customLightGrey'
              }`}
              style={{
                left: tab === 'My Ticket' ? '0' : '48%',
                transform:
                  activeTab === tab ? 'translateY(-1px)' : 'translateY(0)',
                zIndex: activeTab === tab ? 10 : 0,
                width: 'calc(50% + 10px)',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TabOptions;
