function TermsAndCondition() {
  return (
    <div className="w-full bg-customWhite bg-opacity-10 p-8 rounded-2xl">
      <div className=" text-white drop-shadow-lg rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Terms and Conditions</h2>
        <ul className="list-disc list-inside space-y-2 pl-6 text-xl">
          <li>
            <span className="text-customLightYellow font-bold">
              Your ticket is cryptographically secured and stored on the
              blockchain
            </span>
            , accessible solely via the private key linked to your device or
            Web3 account.
          </li>
          <li>
            <span className="text-customLightYellow font-bold">
              Single-Device/Single-Account Access:
            </span>{' '}
            This ticket can only be accessed from the device/account used to
            complete the purchase. You are solely responsible for ensuring the
            security of the device or Web3 account holding the private key.
          </li>
          <li>
            <span className="text-customLightYellow font-bold">
              Private Key Confidentiality:
            </span>{' '}
            The private key is essential for accessing and validating your
            ticket. If you lose access to your private key, you will lose access
            to your ticket. We are unable to recover or reset private keys.
          </li>
          <li>
            You are responsible for maintaining the confidentiality and security
            of your private key and device.{' '}
            <span className="text-customLightYellow font-bold">
              We recommend avoiding sharing your device or account credentials
              with any third party.
            </span>
          </li>
          <li>
            <span className="text-customLightYellow font-bold">
              Non-Transferability:
            </span>{' '}
            This ticket is non-transferable and cannot be accessed from multiple
            devices or accounts. Attempting to transfer access by any
            unauthorized means may invalidate your ticket.
          </li>
          <li>
            <span className="text-customLightYellow font-bold">
              Single Use:
            </span>{' '}
            The ticket is valid for a single admission to the specified event
            and cannot be reused once redeemed.
          </li>
          <li>
            <span className="text-customLightYellow font-bold">
              We are not liable for any direct or indirect loss
            </span>{' '}
            resulting from private key mismanagement, unauthorized device
            access, or technical failures outside our control. By purchasing
            this ticket, you agree that you are solely responsible for managing
            your Web3 wallet and ensuring secure access.
          </li>
          <li>
            We reserve the right to update these Terms and Conditions as needed.
            Any changes will be communicated prior to implementation, and
            continued use of the ticket constitutes acceptance of the updated
            Terms.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TermsAndCondition;
