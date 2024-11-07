interface ISeat {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  isTaken: boolean;
}

export default ISeat;
