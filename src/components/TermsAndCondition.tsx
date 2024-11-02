interface IProps {
  useTitle: boolean;
}

function TermsAndCondition({ useTitle }: IProps) {
  return (
    <div className="w-full bg-customWhite bg-opacity-10 p-8 rounded-2xl">
      <div className=" text-white drop-shadow-lg rounded-md">
        {useTitle ? (
          <p className="text-xl font-semibold mb-4">Terms & Condition</p>
        ) : (
          <p></p>
        )}
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li className="flex gap-2">
            <p className="text-customLightYellow font-medium">•</p>
            <p>
              <span className="text-customLightYellow font-medium">
                Your ticket is cryptographically secured and stored on the
                blockchain,{' '}
              </span>
              accessible solely via the private key linked to your device or
              Web3 account.
            </p>
          </li>

          <li className="flex gap-2">
            <p className="text-customLightYellow font-medium">•</p>
            <p>
              <span className="text-customLightYellow font-medium">
                Single-Device/Single-Account Access:{' '}
              </span>
              This ticket can only be accessed from the device/account used to
              complete the purchase. You are solely responsible for ensuring the
              security of the device or Web3 account holding the private key.
            </p>
          </li>

          <li className="flex gap-2">
            <p className="text-customLightYellow font-medium">•</p>
            <p>
              <span className="text-customLightYellow font-medium">
                Private Key Confidentiality:{' '}
              </span>
              The private key is essential for accessing and validating your
              ticket. If you lose access to your private key, you will lose
              access to your ticket. We are unable to recover or reset private
              keys.
            </p>
          </li>

          <li className="flex gap-2">
            <p className="text-customWhite font-medium">•</p>
            <p>
              You are responsible for maintaining the confidentiality and
              security of your private key and device.
              <span className="text-customLightYellow font-medium">
                {' '}
                We recommend avoiding sharing your device or account credentials
                with any third party.
              </span>
            </p>
          </li>

          <li className="flex gap-2">
            <p className="text-customLightYellow font-medium">•</p>
            <p>
              <span className="text-customLightYellow font-medium">
                Non-Transferability:{' '}
              </span>
              This ticket is non-transferable and cannot be accessed from
              multiple devices or accounts. Attempting to transfer access by any
              unauthorized means may invalidate your ticket.
            </p>
          </li>

          <li className="flex gap-2">
            <p className="text-customLightYellow font-medium">•</p>
            <p>
              <span className="text-customLightYellow font-medium">
                Single Use:{' '}
              </span>
              The ticket is valid for a single admission to the specified event
              and cannot be reused once redeemed.
            </p>
          </li>

          <li className="flex gap-2">
            <p className="text-customLightYellow font-medium">•</p>
            <p>
              <span className="text-customLightYellow font-medium">
                We are not liable for any direct or indirect loss{' '}
              </span>
              resulting from private key mismanagement, unauthorized device
              access, or technical failures outside our control. By purchasing
              this ticket, you agree that you are solely responsible for
              managing your Web3 wallet and ensuring secure access.
            </p>
          </li>

          <li className="flex gap-2">
            <p className="text-customWhite font-medium">•</p>
            <p>
              We reserve the right to update these Terms and Conditions as
              needed. Any changes will be communicated prior to implementation,
              and continued use of the ticket constitutes acceptance of the
              updated Terms.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TermsAndCondition;
