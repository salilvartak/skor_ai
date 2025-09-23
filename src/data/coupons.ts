export interface Coupon {
  id: string;
  name: string;
  image: string;
  price: string;
  isGlobal: boolean;
  countrySpecific?: string;
  category: string;
}

export const allCoupons: Coupon[] = [
  // Gift Cards
  {
    id: "1",
    name: "Amazon Gift Card",
    image:
      "https://icones.pro/wp-content/uploads/2021/08/logo-amazon-orange.png",
    price: "$100",
    isGlobal: true,
    category: "Gift Cards",
  },
  {
    id: "2",
    name: "Apple Gift Card",
    image: "https://cdn-icons-png.flaticon.com/512/731/731985.png",
    price: "$50",
    isGlobal: true,
    category: "Gift Cards",
  },
  {
    id: "3",
    name: "Google Play Gift Card",
    image: "https://cdn-icons-png.flaticon.com/512/300/300218.png",
    price: "$25",
    isGlobal: true,
    category: "Gift Cards",
  },
  {
    id: "4",
    name: "Netflix Gift Card",
    image: "https://cdn-icons-png.flaticon.com/512/5977/5977590.png",
    price: "$30",
    isGlobal: true,
    category: "Gift Cards",
  },

  // Game Cards
  {
    id: "5",
    name: "PlayStation Store",
    image:
      "https://www.logo.wine/a/logo/PlayStation/PlayStation-Icon-Logo.wine.svg",
    price: "$20",
    isGlobal: false,
    countrySpecific: "United States",
    category: "Game Cards",
  },
  {
    id: "6",
    name: "Epic Games Voucher",
    image:
      "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/video-games/epic-games-hg3aynrgcuetqn170db1g9.png/epic-games-y5xqpgrdx4l1nft47f5gz7.png?_a=DATAg1AAZAA0",
    price: "$25",
    isGlobal: true,
    category: "Game Cards",
  },
  {
    id: "7",
    name: "Nintendo eShop",
    image:
      "https://cdn.freebiesupply.com/logos/large/2x/nintendo-2-logo-png-transparent.png",
    price: "$35",
    isGlobal: false,
    countrySpecific: "Japan",
    category: "Game Cards",
  },
  {
    id: "8",
    name: "Xbox Live Gold",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/2048px-Xbox_one_logo.svg.png",
    price: "$40",
    isGlobal: true,
    category: "Game Cards",
  },
  {
    id: "9",
    name: "Steam Wallet Card",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/1024px-Steam_icon_logo.svg.png",
    price: "$20",
    isGlobal: true,
    category: "Game Cards",
  },
  {
    id: "10",
    name: "Razer Gold",
    image:
      "https://cdn.freebiesupply.com/logos/large/2x/razer-logo-png-transparent.png",
    price: "$15",
    isGlobal: true,
    category: "Game Cards",
  },

  // Food & Shopping
  {
    id: "11",
    name: "Swiggy Coupon",
    image: "https://logos-world.net/wp-content/uploads/2020/11/Swiggy-Logo.png",
    price: "₹100",
    isGlobal: false,
    countrySpecific: "India",
    category: "Food",
  },
  {
    id: "12",
    name: "Zomato Gift Card",
    image:
      "https://static.vecteezy.com/system/resources/previews/020/975/587/non_2x/zomato-logo-zomato-icon-transparent-free-png.png",
    price: "₹200",
    isGlobal: false,
    countrySpecific: "India",
    category: "Food",
  },
  {
    id: "13",
    name: "Flipkart Gift Card",
    image:
      "https://bugbasev1.blob.core.windows.net/public/programs/flipkart-nyd/7ae67f2fd71b273481efa7316e4cf0c9d7ba7323/profile/1723544173323-hdflipkartroundlogoicontransparentpng701751694966204grvmunpzzfremovebgpreview.png",
    price: "₹500",
    isGlobal: false,
    countrySpecific: "India",
    category: "Shopping",
  },
  {
    id: "14",
    name: "Walmart Gift Card",
    image: "/assets/brand/walmart.svg",
    price: "$50",
    isGlobal: true,
    category: "Shopping",
  },
  {
    id: "15",
    name: "Starbucks Coupon",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1185px-Starbucks_Corporation_Logo_2011.svg.png",
    price: "$10",
    isGlobal: true,
    category: "Food",
  },

  // Subscriptions & Others
  {
    id: "16",
    name: "Spotify Premium",
    image: "https://cdn-icons-png.flaticon.com/512/2111/2111624.png",
    price: "$12",
    isGlobal: true,
    category: "Subscriptions",
  },
  {
    id: "17",
    name: "Disney+ Gift Card",
    image:
      "https://s.yimg.com/ny/api/res/1.2/cNR53AXUZ_fh4h5zLv5aCg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyNDI7aD0xMjQyO2NmPXdlYnA-/https://media.zenfs.com/en/evening_standard_239/be0710aaaf5abfdcfe63e97dda34ea9a",
    price: "$20",
    isGlobal: true,
    category: "Subscriptions",
  },
  {
    id: "18",
    name: "YouTube Premium",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/018/930/575/small_2x/youtube-logo-youtube-icon-transparent-free-png.png",
    price: "$15",
    isGlobal: true,
    category: "Subscriptions",
  },
  {
    id: "19",
    name: "Uber Ride Coupon",
    image:
      "https://s23.q4cdn.com/407969754/files/doc_multimedia/2024/10/1008919369/Uber_Logo_Black_RGB@lowres.png",
    price: "$25",
    isGlobal: true,
    category: "Transport",
  },
  {
    id: "20",
    name: "Airbnb Gift Card",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe3IU1RCsS4ozW3QOnKstCVJ8vKqhIR3PllQ&s",
    price: "$100",
    isGlobal: true,
    category: "Travel",
  },
];

// Categorized sets
export const trendingCoupons = allCoupons.slice(0, 4);
export const gamingCoupons = allCoupons.filter(
  (c) => c.category === "Game Cards"
);
export const otherCoupons = allCoupons.filter(
  (c) => !["Game Cards", "Gift Cards"].includes(c.category)
);
