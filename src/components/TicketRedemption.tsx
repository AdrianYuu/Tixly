function TicketRedemption() {
  return (
    <div className="w-full bg-customWhite bg-opacity-10 p-8 rounded-2xl">
      <div className=" text-white drop-shadow-lg rounded-md">
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li className="flex gap-2">
            <p className="text-customLightYellow font-medium">•</p>
            <div className="flex flex-col">
              <p className="text-customLightYellow font-medium">
                Your ticket is cryptographically secured and stored on the
                blockchain
              </p>
              <p>
                Once you purchase your ticket, it will be automatically saved in
                the Tixly app, complete with a QR code ready for use. Simple and
                convenient!
              </p>
            </div>
          </li>

          <li className="flex gap-2">
            <p className="text-customLightYellow font-medium">•</p>
            <div className="flex flex-col">
              <p className="text-customLightYellow font-medium">
                Show Your QR at the Entrance
              </p>
              <p>
                When you arrive at the venue, just open the Tixly app and
                display your ticket QR code on the "My Ticket" page to the staff
                at the entrance.
              </p>
            </div>
          </li>

          <li className="flex gap-2">
            <p className="text-customLightYellow font-medium">•</p>
            <div className="flex flex-col">
              <p className="text-customLightYellow font-medium">
                Scan & Get In Instantly!
              </p>
              <p>
                The staff will scan your QR code, and if your ticket is valid,
                you'll be all set to enter and enjoy the event!
              </p>
            </div>
          </li>

          <li className="flex gap-2">
            <p className="text-customLightYellow font-medium">•</p>
            <div className="flex flex-col">
              <p className="text-customLightYellow font-medium">
                Enjoy the Event Without Distractions
              </p>
              <p>
                Now it's time to have fun! Experience the unique vibes safely,
                without worrying about counterfeit tickets or any cheating.
              </p>
            </div>
          </li>

          <li className="flex gap-2">
            <p className="text-customLightYellow font-medium">•</p>
            <div className="flex flex-col">
              <p className="text-customLightYellow font-medium">
                Claim Rewards After the Event
              </p>
              <p>
                After the event, check the "My Ticket" section in Tixly to see
                any rewards or exclusive memorabilia from the event. Claim them
                whenever you like at your own pace!
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TicketRedemption;
