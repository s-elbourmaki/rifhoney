export type Weight = '250g' | '500g' | '1kg';

export interface Product {
  id: number;
  slug: string;
  name: string;
  subtitle: string;
  prices: Record<Weight, number>;
  image: string;
  pexels: string;
  description: string;
  expertReview: string;
  benefits: string[];
  usage: string;
  badge?: string;
  badgeColor?: string;
  tags: string[];
}

export const products: Product[] = [
  {
    id: 1,
    slug: 'wild-cedar-honey',
    name: 'Wild Cedar Honey',
    subtitle: 'Cedar Forest Reserve',
    prices: { '250g': 85, '500g': 160, '1kg': 300 },
    image: '/images/product-1.jpg',
    pexels: 'https://images.pexels.com/photos/35310735/pexels-photo-35310735.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'Directly from the high-altitude cedar forests of the Middle Atlas. This rare, dark honey is rich in minerals with a deep, woody flavor that represents the peak of Moroccan artisanal quality.',
    expertReview: 'An absolute masterpiece of nature. The Cedar Honey from RIF is remarkably complex—starting with a bold, malty sweetness that slowly gives way to resinous, earthy undertones. It’s not just honey; it’s a concentrated essence of the ancient forest. Its low glycemic index and high mineral content make it as healthy as it is delicious.',
    benefits: ['Rich in antioxidants', 'Supports respiratory health', 'Natural energy booster', 'Anti-inflammatory properties'],
    usage: 'Perfect for pairing with aged cheeses, drizzling over warm oats, or enjoyed by the spoonful for a daily wellness ritual.',
    badge: 'Best Seller',
    badgeColor: '#C8860A',
    tags: ['Raw', 'Unfiltered', 'Dark Amber'],
  },
  {
    id: 2,
    slug: 'mountain-wildflower',
    name: 'Mountain Wildflower',
    subtitle: 'Multi-Flora Blend',
    prices: { '250g': 65, '500g': 120, '1kg': 230 },
    image: '/images/product-2.jpg',
    pexels: 'https://images.pexels.com/photos/35282122/pexels-photo-35282122.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'A vibrant collection of nectar from over 15 wild alpine flowers. Perfectly balanced, fragrant, and light—this honey is a daily luxury for those who appreciate pure, natural sweetness.',
    expertReview: 'The quintessential mountain honey. This multi-flora blend captures the ephemeral beauty of the Chakrane peaks in spring. Each jar is a unique snapshot of the season—floral, sunny, and incredibly smooth. It’s the kind of honey that reminds you why nature is the greatest artist.',
    benefits: ['Aids digestion', 'Boosts immunity', 'Rich in natural enzymes', 'Promotes sleep quality'],
    usage: 'The ideal companion for herbal teas, fresh yogurt, or as a natural sweetener in refined pastry recipes.',
    badge: 'Signature',
    badgeColor: '#8B5E0A',
    tags: ['Raw', 'Multi-Flora', 'Golden'],
  },
  {
    id: 3,
    slug: 'wild-thyme-honey',
    name: 'Wild Thyme Honey',
    subtitle: 'Chakrane Highland Thyme',
    prices: { '250g': 95, '500g': 180, '1kg': 340 },
    image: '/images/product-1.jpg',
    pexels: 'https://images.pexels.com/photos/8500508/pexels-photo-8500508.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'Renowned for its powerful medicinal properties. Our Wild Thyme honey is harvested at 1,800m, offering an intense herbaceous aroma and unmatched antibacterial potency.',
    expertReview: 'In the world of functional foods, this Wild Thyme honey is a titan. Harvested at extreme altitudes, its thymol concentration is exceptionally high. It has a sharp, almost medicinal clarity that is immediately soothing. This is what we call "Living Medicine"—a staple for any natural first-aid kit.',
    benefits: ['Powerful antibacterial', 'Soothes sore throats', 'Improves gut health', 'High thymol content'],
    usage: 'Take a teaspoon directly when feeling under the weather, or mix with warm lemon water for a potent healing elixir.',
    badge: 'Premium',
    badgeColor: '#7A4E08',
    tags: ['Thyme', 'Medicinal', 'Amber'],
  },
  {
    id: 4,
    slug: 'black-seed-honey',
    name: 'Black Seed & Honey',
    subtitle: 'Healing Reserve',
    prices: { '250g': 110, '500g': 210, '1kg': 400 },
    image: '/images/product-3.jpg',
    pexels: 'https://images.pexels.com/photos/7990484/pexels-photo-7990484.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'The ultimate wellness blend. We combine our purest mountain honey with cold-pressed Nigella Sativa seeds to create a potent traditional remedy for immunity and vitality.',
    expertReview: 'This is the crown jewel of our wellness range. The synergy between the mountain honey and the freshly crushed black seeds (Nigella Sativa) is legendary in Moroccan tradition. It has a unique, slightly spicy kick that balances the sweetness. It’s a powerhouse of nutrition and a daily essential for holistic health.',
    benefits: ['Ultimate immune support', 'Anti-inflammatory', 'Vitality booster', 'Detoxifying properties'],
    usage: 'Best consumed on an empty stomach in the morning to maximize the absorption of its many healing compounds.',
    badge: 'Wellness',
    badgeColor: '#1A1208',
    tags: ['Black Seed', 'Healing', 'Dark'],
  },
  {
    id: 5,
    slug: 'eucalyptus-honey',
    name: 'Eucalyptus Honey',
    subtitle: 'Coastal Forest Pure',
    prices: { '250g': 60, '500g': 110, '1kg': 200 },
    image: '/images/product-2.jpg',
    pexels: 'https://images.pexels.com/photos/34944360/pexels-photo-34944360.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'Refreshing and distinct. Our Eucalyptus honey is favored for respiratory health, featuring a cooling finish and a smooth, medium-amber texture that melts on the tongue.',
    expertReview: 'Refreshing, clean, and incredibly efficient. This Eucalyptus honey is a masterclass in purity. It carries a distinct menthol-like freshness that clears the senses. It’s less about complexity and more about a singular, powerful focus on refreshment and respiratory comfort.',
    benefits: ['Clears airways', 'Natural cough suppressant', 'Antimicrobial', 'Rich in cineole'],
    usage: 'An excellent addition to mint tea or spread over toasted artisanal bread with a hint of sea salt.',
    badge: 'New',
    badgeColor: '#2C1F0A',
    tags: ['Eucalyptus', 'Fresh', 'Medicinal'],
  },
  {
    id: 6,
    slug: 'pure-honeycomb',
    name: 'Pure Honeycomb',
    subtitle: 'Untouched Nature',
    prices: { '250g': 120, '500g': 230, '1kg': 440 },
    image: '/images/product-3.jpg',
    pexels: 'https://images.pexels.com/photos/4921856/pexels-photo-4921856.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'Honey in its most primal state. Eaten directly from the wax comb, this is a gourmet experience that preserves all the natural pollens, enzymes, and delicate aromatics.',
    expertReview: 'The "Rawest" possible experience. When you bite into this honeycomb, you are tasting honey exactly as the bees intended—unheated, unfiltered, and perfectly sealed in wax. The texture contrast between the liquid gold and the delicate wax is a sensory delight that every honey lover must experience at least once.',
    benefits: ['High in natural pollen', 'Propolis benefits', 'Purest form of honey', 'Supports gum health'],
    usage: 'Serve on a charcuterie board with nuts and fruits, or place a small piece on a warm pancake to let it slowly melt.',
    badge: 'Rare',
    badgeColor: '#6B4226',
    tags: ['Comb', 'Unprocessed', 'Limited'],
  },
];
