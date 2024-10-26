export interface IBenefit {
  imageUrl: string;
  title: string;
  description: string;
  color: string;
}

export const BENEFIT_LIST: IBenefit[] = [
  {
    imageUrl: '../assets/images/benefit-1.png',
    title: 'Your Ticket, It’s Yours and Only Yours!',
    description:
      'With Tixly, your ticket is uniquely yours, so you’re all set for the event without any hassles or mix-ups. Just one ticket, one amazing experience!',
    color: 'bg-customLightBlack',
  },
  {
    imageUrl: '../assets/images/benefit-2.png',
    title: 'Unlock Collectible Rewards',
    description:
      'Unlock unique perks and rewards with every event, and keep your memories alive with special collectibles just for attending',
    color: 'bg-customLightBrown',
  },
  {
    imageUrl: '../assets/images/benefit-3.png',
    title: 'Easy Entry, Skip the Wait',
    description:
      'Say goodbye to lines and confusion. With a simple scan, Tixly ensures quick and secure entry so you can dive right into the fun!',
    color: 'bg-customMidPurple',
  },
];
