export interface Airdrop {
  id: string;
  project: string;
  chain: 'Ethereum' | 'Solana' | 'Arbitrum' | 'Other';
  image: string;
  totalValueLocked: string;
  status: 'Live' | 'Upcoming' | 'Ended';
  requirements: string[];
  description: string;
  link: string;
}

export const allAirdrops: Airdrop[] = [
  {
    id: '1',
    project: 'Etherscan Pro',
    chain: 'Ethereum',
    image: 'https://cdn-images-1.medium.com/max/1200/1*I0xK9jK2FmQvM2Jm3-pUug.png',
    totalValueLocked: '$5M',
    status: 'Live',
    requirements: ['Connect Wallet', 'Hold 1 ETH', 'Follow on X'],
    description: 'Participate in the Etherscan Pro airdrop by holding a minimum of 1 ETH in your wallet and completing a few simple tasks.',
    link: 'https://etherscan.io',
  },
  {
    id: '2',
    project: 'Solana Labs',
    chain: 'Solana',
    image: 'https://solana.com/images/solana-logo.svg',
    totalValueLocked: '$10M',
    status: 'Upcoming',
    requirements: ['Stake SOL', 'Join Discord'],
    description: 'The highly anticipated airdrop from Solana Labs is coming soon. Stake your SOL tokens to be eligible for rewards.',
    link: 'https://solana.com',
  },
  {
    id: '3',
    project: 'Arbitrum Pro',
    chain: 'Arbitrum',
    image: 'https://arbitrum.io/wp-content/themes/arbitrum/assets/images/logo.svg',
    totalValueLocked: '$2M',
    status: 'Live',
    requirements: ['Connect Wallet', 'Trade on DEX'],
    description: 'Get a chance to win airdrop tokens by trading on select DEXs on the Arbitrum network. The more you trade, the higher your rewards.',
    link: 'https://arbitrum.io',
  },
  {
    id: '4',
    project: 'Aptos Ecosystem',
    chain: 'Other',
    image: 'https://miro.medium.com/v2/resize:fit:1400/1*v-Q174U0Yd1bX2V0eO54qA.jpeg',
    totalValueLocked: '$7M',
    status: 'Ended',
    requirements: ['Connect Wallet'],
    description: 'The Aptos Ecosystem airdrop has concluded. Stay tuned for future airdrops and opportunities from the Aptos network.',
    link: 'https://aptoslabs.com',
  },
  {
    id: '5',
    project: 'Base Chain',
    chain: 'Ethereum',
    image: 'https://assets-global.website-files.com/64b58476d05f36e4f3513a0c/64e8e19c35398a698a972c72_base-logo.svg',
    totalValueLocked: '$3M',
    status: 'Upcoming',
    requirements: ['Connect Wallet', 'Bridge funds to Base'],
    description: 'Bridge your funds to the Base network to become eligible for the upcoming airdrop. Don’t miss this opportunity.',
    link: 'https://base.org',
  },
];