# DevARENA – Event & Hackathon Hosting Platform

**DevARENA** is a modern, scalable platform for managing hackathons and developer events—packed with features for organizers, participants, judges, and now **blockchain-powered certificate issuance**.  

---

## 🚀 Features

### Core Functionality
- **User Authentication**: Registration and login using Azure SQL + JWT
- **Role-Based Access**: Participants, Organizers, Judges
- **Event Management**: Create/manage hackathons, schedules, prizes, sponsors
- **Team Registration**: Teams with submissions, managed by leaders
- **Project Submission & Evaluation**: Judges score and give feedback
- **Announcements & Q&A Chat**
- **Admin Dashboard**: Registrations, judges, analytics
- **Flexible Event Types**: Online/offline hackathons supported

### Blockchain Features
- **Certificate Issuance**: Create tamper-proof certificates on Ethereum
- **Verification**: Validate authenticity via blockchain transaction
- **Decentralized Storage**: IPFS (via Pinata) for certificate metadata/files
- **Wallet Integration**: MetaMask for blockchain interactions
- **Testnet Deployment**: Smart contracts deployed on **Sepolia** (free ETH faucet)

---

## 🛠 Tech Stack

| Layer          | Technology                                |
|----------------|--------------------------------------------|
| Backend        | Node.js, Express                          |
| Authentication | Azure SQL (Users, Events, Teams, Roles)   |
| NoSQL Store    | MongoDB (Submissions, Chat, Announcements)|
| Blockchain     | Solidity, Hardhat, Web3.js, IPFS (Pinata) |
| Deployment     | Azure Web App, Functions, Storage         |
| Frontend       | React, React Router, Tailwind CSS         |

---

## 📂 Project Structure

Synaphack/
├── client/ # React + Tailwind frontend
│ ├── public/
│ └── src/
├── server/ # Node/Express backend
│ ├── config/ # DB + Blockchain configs
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── middleware/
└── blockchain/ # Hardhat + smart contracts
├── contracts/
├── scripts/
└── test/

## ⚡ Installation & Setup

### Frontend (Client)
```bash
cd client
npm install
npm start

### Backend (Server)
```bash
cd server
npm install
npm start

⛓ Blockchain Setup (Sepolia)

Install dependencies:

cd blockchain
npm install


Configure .env:

PRIVATE_KEY=your_metamask_private_key
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/your_project_id
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_KEY=your_pinata_secret_key


Deploy smart contract to Sepolia:

npx hardhat run scripts/deploy.js --network sepolia


Run blockchain server (integration layer):

npm start

🛤 Roadmap

AI plagiarism detection

Automated certificate generation (with blockchain integration)

Sponsor showcase

Real-time leaderboard

Web3 POAP badges

###🤝 Contribution

Fork the repo

Create a feature branch (feature/blockchain-certificates)

Commit changes and push

Submit a PR

###📜 License & Maintainers

License: MIT

Maintainer: Rahul (Rahulgg22)
