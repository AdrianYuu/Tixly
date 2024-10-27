import Icon from './Icon';
import SearchBar from './InputBar';
import { Link } from 'react-router-dom';
import { FOOTER_LINK_LIST } from '../configs/FooterLinkConfig';

function Footer() {
  function onSubmit(query: string) {
    // Handle when send button clicked.
  }

  return (
    <div className="flex justify-center items-center flex-col text-customWhite w-full mt-24">
      <Icon className="w-28 mb-4" />
      <p className="text-xl font-semibold text-center px-8">
        Where Every Event Ticket is Secure,
      </p>
      <p className="text-xl font-semibold mb-8 text-center px-8">
        Accessible, and Designed for the Future.
      </p>
      <div className="xl:w-[48rem] w-4/5 mb-8">
        <SearchBar
          placeholder="Give us your feedback"
          buttonText="Send"
          onSubmit={onSubmit}
          haveIcon={true}
          iconUrl="../assets/images/bar.png"
        />
      </div>
      {/* Divider */}
      <div className="w-4/5 border-dashed border-t-2 border-customWhite opacity-30"></div>
      <div className="flex justify-between w-4/5 py-8">
        <p className="text-base font-normal">
          © 2024, tixly. All rights reserved.
        </p>
        <div className="flex gap-3">
          {FOOTER_LINK_LIST.map((footerLink, index) => (
            <Link key={index} to={footerLink.to}>
              <img src={footerLink.imageUrl} alt="" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Footer;
