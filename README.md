# Tixly - Revolutionizing Ticketing with Web3
Welcome to the Tixly GitHub repository! Tixly is a decentralized ticketing platform leveraging Web3 technology to create a secure, transparent, and efficient system for purchasing and managing tickets.

## 🎬 Pitch Deck & Demo

- **Pitch Deck**: Learn more about Tixly's vision, problem-solving approach, and future plans in our [Pitch Deck video](https://youtu.be/KHzkNaTU84E).
- **Demo**: See Tixly in action with our [live demo](https://youtu.be/rZBbXBWNrRo), showcasing the core functionalities of the platform.

## 📄 Documentation

For a comprehensive guide to Tixly’s features, architecture, and user guide, please refer to our [Notion Documentation](https://marioorlando.notion.site/Documentation-of-Tixly-13924ae3a37f80ab993be44ae53b403d).

## 📌 Features

- **Blockchain-backed Verification**: Guarantees ticket authenticity and transparency.
- **Direct Sales and Minimal Fees**: Allows users to purchase tickets directly without middlemen.
- **Transparent Ownership**: Every ticket is traceable on the blockchain.
- **Revenue Model**:
  - **Event Organizer Fees**: 1% fee on each ticket sold.
  - **Sponsorships and Advertising**: Additional income from partnerships.
  - **User Fees**: Flat 1,000 IDR for wallet top-ups and 5% tax for purchases via QRIS.

## 📈 Future Plans

- **Enhanced Wallet Features**: A more versatile wallet to manage tickets.
- **Exclusive Partnerships with Event Organizers**: Direct, exclusive ticket sales through Tixly.
- **User Recommendations and Organizer Insights**: Personalized recommendations and detailed event analytics.
- **In-app Ticket Marketplace**: A secure marketplace for users to resell tickets they can’t use.

## 📦 Create a New Project

Make sure that [Node.js](https://nodejs.org/en/) `>= 16` and [`dfx`](https://internetcomputer.org/docs/current/developer-docs/build/install-upgrade-remove) `>= 0.14` are installed on your system.

Run the following commands in a new, empty project directory:

```sh
npx degit rvanasa/vite-react-motoko # Download this starter project
dfx start --clean --background # Run dfx in the background
npm run setup # Install packages, deploy canisters, and generate type bindings

npm start # Start the development server
```

When ready, run `dfx deploy --network ic` to deploy your application to the Internet Computer.
