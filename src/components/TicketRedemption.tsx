function TicketRedemption() {
  return (
    <div className="w-full bg-customWhite bg-opacity-10 p-8 rounded-2xl">
      <div className=" text-white drop-shadow-lg rounded-md">
        <ul className="list-disc list-inside space-y-2 pl-6 text-xl">
          <li className="text-customLightYellow font-bold">
            Save Your Ticket in the App
          </li>
          <p className="pl-6 font-medium">
            Once you purchase your ticket, it will be automatically saved in the
            Tixly app, complete with a QR code ready for use. Simple and
            convenient!
          </p>

          <li className="text-customLightYellow font-bold">
            Show Your QR at the Entrance
          </li>
          <p className="pl-6 font-medium">
            When you arrive at the venue, just open the Tixly app and display
            your ticket QR code on the "My Ticket" page to the staff at the
            entrance.
          </p>

          <li className="text-customLightYellow font-bold">
            Scan & Get In Instantly!
          </li>
          <p className="pl-6 font-medium">
            The staff will scan your QR code, and if your ticket is valid,
            you'll be all set to enter and enjoy the event!
          </p>

          <li className="text-customLightYellow font-bold">
            Enjoy the Event Without Distractions
          </li>
          <p className="pl-6 font-medium">
            Now it's time to have fun! Experience the unique vibes safely,
            without worrying about counterfeit tickets or any cheating.
          </p>

          <li className="text-customLightYellow font-bold">
            Claim Rewards After the Event
          </li>
          <p className="pl-6 font-medium">
            After the event, check the "My Ticket" section in Tixly to see any
            rewards or exclusive memorabilia from the event. Claim them whenever
            you like at your own pace!
          </p>
        </ul>
      </div>
    </div>
  );
}

export default TicketRedemption;