export interface VintageShirt {
  id: string;
  name: string;
  fabricName: string;
  price: number;
  currency: string;
  series: 'Retro Botanical' | 'Geometric Archival' | 'Abstract Camp' | 'Tailored Silk Weave';
  category: 'all' | 'tanika' | 'geometric' | 'abstract' | 'stripe';
  tagline: string;
  description: string;
  fabricDescription: string;
  sizes: string[];
  fabric: string;
  collar: string;
  cut: string;
  details: string[];
  image: string;
  backImage?: string;
  badge?: string;
  colorTheme: string;
  model3DConfig: {
    color: string;
    patternType: 'stripes' | 'botanical' | 'geometric' | 'abstract' | 'retro-dots';
    collarColor: string;
    accentColor: string;
    position: [number, number, number];
    initialRotation: [number, number, number];
  };
}

export interface ShirtCollection {
  id: string;
  title: string;
  subtitle: string;
  patternType: string;
  description: string;
  image: string;
  itemCount: number;
  tag: string;
}

// Visual assets: 6 distinct fabric designs tailored into RARE's signature shirt silhouette
export const FABRIC_IMAGES = {
  botanicalResort: '/images/fabrics/fabric-botanical-resort.jpg',
  geometric70s: '/images/fabrics/fabric-geometric-70s.jpg',
  abstractWaves: '/images/fabrics/fabric-abstract-waves.jpg',
  heritageStripe: '/images/fabrics/fabric-heritage-stripe.jpg',
  tanikaNoir: '/images/fabrics/fabric-tanika-noir.jpg',
  mosaicEarth: '/images/fabrics/fabric-mosaic-earth.jpg',
};

// Permanent references for archives/lookbook
export const REFERENCE_IMAGES = {
  printed: '/images/reference/rare-printed-shirts.jpg',
  textured: '/images/reference/rare-textured-shirts.jpg',
};

export const SHIRT_COLLECTIONS: ShirtCollection[] = [
  {
    id: 'retro-botanical-capsule',
    title: 'BOTANICAL RESORT',
    subtitle: 'RETRO MOTIF DROP / 01',
    patternType: 'Floral & Foliage Prints',
    description: 'Camp-collar short-sleeve shirts tailored from hand-mixed botanical vintage resort fabrics with Cuban lapels.',
    image: FABRIC_IMAGES.botanicalResort,
    itemCount: 6,
    tag: 'LIMITED RUN',
  },
  {
    id: 'geometric-70s-archive',
    title: '70s ARCHIVAL BLOCKS',
    subtitle: 'GEOMETRIC RETRO DROP / 02',
    patternType: 'Angular & Optical Prints',
    description: 'Mid-century modern geometric repeat patterns tailored on airy cotton-rayon with single-tailor stitch construction.',
    image: FABRIC_IMAGES.geometric70s,
    itemCount: 8,
    tag: 'NEW RELEASE',
  },
  {
    id: 'abstract-monochrome-drop',
    title: 'RETRO MONOCHROME',
    subtitle: 'STATEMENT SHIRTS / 03',
    patternType: 'Bold Abstract Brushwork',
    description: 'High-contrast monochrome undulating wave fabrics tailored into relaxed vintage statement button-ups.',
    image: FABRIC_IMAGES.abstractWaves,
    itemCount: 5,
    tag: 'RARE SPECIAL',
  },
];

export const VINTAGE_SHIRTS: VintageShirt[] = [
  {
    id: 'rare-shirt-001',
    name: 'Archival Palm Botanical Resort Shirt',
    fabricName: 'Lagos Palm Botanical Weave',
    price: 36000,
    currency: 'NGN',
    series: 'Retro Botanical',
    category: 'tanika',
    tagline: 'Earthy Terracotta & Indigo Botanical Viscose',
    description: 'Sourced from artisanal Nigerian textile markets, this rich botanical resort print features earthy terracotta, ochre, sage, and deep indigo foliage. Tailored into RARE’s signature boxy camp-collar silhouette.',
    fabricDescription: '100% Breathable Matte Drape Viscose featuring hand-pulled vintage resort botanical foliage.',
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Breathable Matte Drape Viscose',
    collar: 'Cuban Open Camp Collar',
    cut: 'Signature Boxy Relaxed Vintage Fit',
    details: [
      'Tailored & hand-stitched by bespoke artisans in Lagos',
      'Distressed antique horn buttons',
      'Twin side hem vents for natural drape over trousers',
      'Double-needle reinforced armholes',
      'Pre-shrunk cold vintage wash',
    ],
    image: FABRIC_IMAGES.botanicalResort,
    backImage: FABRIC_IMAGES.botanicalResort,
    badge: 'SIGNATURE SHIRT',
    colorTheme: '#2d4739',
    model3DConfig: {
      color: '#2b4436',
      patternType: 'botanical',
      collarColor: '#1d2e24',
      accentColor: '#d4a373',
      position: [-2.2, 0.2, 0],
      initialRotation: [0.1, 0.4, -0.05],
    },
  },
  {
    id: 'rare-shirt-002',
    name: '1974 Archival Geometric Mirage Shirt',
    fabricName: '1974 Optical Mirage Poplin',
    price: 38000,
    currency: 'NGN',
    series: 'Geometric Archival',
    category: 'geometric',
    tagline: 'Burnt Amber & Mustard Architectural Blocks',
    description: 'A genuine mid-century architectural textile motif with interlocking angular blocks in burnt amber, mustard yellow, and charcoal. Tailored with clean placket pattern alignment and bone buttons.',
    fabricDescription: 'High-density breathable cotton-rayon blend with crisp mid-century geometric print.',
    sizes: ['M', 'L', 'XL'],
    fabric: 'High-Density Breathable Poplin-Rayon',
    collar: 'Structured Retro Pointed Collar',
    cut: 'Signature Boxy Relaxed Vintage Fit',
    details: [
      'Hand-aligned pattern match across front placket',
      'Matte obsidian resin buttons',
      'Reinforced chest pocket with pattern alignment',
      'Crafted in limited batches of 25 pieces only',
    ],
    image: FABRIC_IMAGES.geometric70s,
    backImage: FABRIC_IMAGES.geometric70s,
    badge: 'LIMITED TO 25',
    colorTheme: '#b86a34',
    model3DConfig: {
      color: '#b86a34',
      patternType: 'geometric',
      collarColor: '#27272a',
      accentColor: '#e0a96d',
      position: [0, 0, 0.5],
      initialRotation: [-0.05, -0.2, 0.08],
    },
  },
  {
    id: 'rare-shirt-003',
    name: 'Monochrome Undulating Waves Shirt',
    fabricName: 'Distorted Ivory & Obsidian Brushwork',
    price: 35000,
    currency: 'NGN',
    series: 'Abstract Camp',
    category: 'abstract',
    tagline: 'High-Contrast Retro Statement Brushwork',
    description: 'Acid black and ivory distorted undulating wave print designed for noticeable presence. Made for effortless layering or unbuttoned styling with wide-leg trousers.',
    fabricDescription: 'Ultra-soft silky finish modal-cotton weave with high-contrast monochrome dye.',
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Silky Finish Modal-Cotton',
    collar: 'Convertible Loop Collar',
    cut: 'Signature Straight Silhouette with Drape Fold',
    details: [
      'Contrast monochrome reverse-print detailing',
      'Loop-collar top closure button',
      'Locally tailored in Yaba, Lagos',
      'Silky smooth skin feel with zero static',
    ],
    image: FABRIC_IMAGES.abstractWaves,
    backImage: FABRIC_IMAGES.abstractWaves,
    badge: 'POPULAR DROP',
    colorTheme: '#1f1f23',
    model3DConfig: {
      color: '#1f1f23',
      patternType: 'abstract',
      collarColor: '#e4e4e7',
      accentColor: '#f97316',
      position: [2.2, -0.1, 0],
      initialRotation: [0.15, -0.4, 0.05],
    },
  },
  {
    id: 'rare-shirt-004',
    name: 'Heritage Sunset Rhythm Stripe Shirt',
    fabricName: 'Terracotta & Sunburst Slub Cotton',
    price: 34000,
    currency: 'NGN',
    series: 'Retro Botanical',
    category: 'stripe',
    tagline: 'Vintage Multi-Tone Vertical Rhythm Stripes',
    description: 'Warm terracotta, sunburst ochre, and slate vintage vertical rhythm stripes. Tailored from textured slub cotton with relaxed drop sleeves for effortless ventilation under tropical heat.',
    fabricDescription: 'Pure textured slub cotton weave with rich tactile handfeel and vintage-dyed yarns.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fabric: 'Pure Textured Slub Cotton',
    collar: 'Cuban Open Camp Collar',
    cut: 'Signature Boxy Relaxed Vintage Fit',
    details: [
      'Locally sourced breathable slub cotton weave',
      'Tonal engraved wooden accent buttons',
      'Wide double-turned bottom hem',
      'Individually numbered bespoke garment tag',
    ],
    image: FABRIC_IMAGES.heritageStripe,
    backImage: FABRIC_IMAGES.heritageStripe,
    badge: 'RESTOCKED',
    colorTheme: '#c25e34',
    model3DConfig: {
      color: '#c25e34',
      patternType: 'stripes',
      collarColor: '#7c2d12',
      accentColor: '#fef08a',
      position: [-1.1, -1.8, -0.5],
      initialRotation: [-0.1, 0.3, -0.1],
    },
  },
  {
    id: 'rare-shirt-005',
    name: 'Tanika Archival Midnight Noir Shirt',
    fabricName: 'Copper Micro-Motif Noir Twill',
    price: 37000,
    currency: 'NGN',
    series: 'Abstract Camp',
    category: 'tanika',
    tagline: 'Midnight Noir with Burnished Copper Dots',
    description: 'An elegant vintage midnight noir textile accented with micro-motif botanical polka dots in burnished copper and gold. Hand-finished French seams ensure lasting luxury.',
    fabricDescription: 'Peach-skin micro-twill with delicate metallic copper micro-print.',
    sizes: ['M', 'L', 'XL'],
    fabric: 'Peach-Skin Micro Twill',
    collar: 'Classic Camp Collar with Notch',
    cut: 'Signature Tailored Vintage Fit',
    details: [
      'French seams for smooth, scratch-free interior wear',
      'Custom gunmetal shank bottom button',
      'Locally printed using eco-friendly non-fade reactive dye',
      'Dry clean or cold hand wash recommended',
    ],
    image: FABRIC_IMAGES.tanikaNoir,
    backImage: FABRIC_IMAGES.tanikaNoir,
    badge: 'EXCLUSIVE EDITION',
    colorTheme: '#18181b',
    model3DConfig: {
      color: '#18181b',
      patternType: 'retro-dots',
      collarColor: '#27272a',
      accentColor: '#f97316',
      position: [1.1, -1.8, -0.5],
      initialRotation: [0.1, -0.3, 0.1],
    },
  },
  {
    id: 'rare-shirt-006',
    name: 'West African Mosaic Earth Shirt',
    fabricName: 'Raw Earth Modernist Mosaic Linen',
    price: 39000,
    currency: 'NGN',
    series: 'Tailored Silk Weave',
    category: 'geometric',
    tagline: 'Modernist Mosaic Tile in Raw Earth Tones',
    description: 'Intricate vintage mosaic tile motifs in earthy sienna, forest olive, raw ochre, and warm ecru. Sourced from local fabric markets and tailored into RARE’s signature camp-collar cut with carved coconut shell buttons.',
    fabricDescription: 'Linen-cotton slub blend with West African modernist mosaic tile pattern print.',
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Lightweight Linen-Cotton Slub Blend',
    collar: 'Structured Retro Camp Collar',
    cut: 'Signature Boxy Relaxed Vintage Fit',
    details: [
      'Tailor-pressed collar with internal stay interfacing',
      'Dual pleated back yoke for expansive shoulder freedom',
      'Tailored in Lagos in limited editions of 30 units',
      'Natural coconut shell carved buttons',
    ],
    image: FABRIC_IMAGES.mosaicEarth,
    backImage: FABRIC_IMAGES.mosaicEarth,
    badge: 'LIMITED RUN',
    colorTheme: '#78350f',
    model3DConfig: {
      color: '#78350f',
      patternType: 'geometric',
      collarColor: '#451a03',
      accentColor: '#fde68a',
      position: [0, -2.0, -1],
      initialRotation: [0, 0, 0],
    },
  },
];
