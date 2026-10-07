export type ProductId = 'fortnite-spoofer' | 'fortnite-cheats' | 'ugc-account-recovery'

export type ProductStatus = 'Active' | 'Updating' | 'Undetected'

export type FeatureGroup = {
  name: string
  items: string[]
}

export type ProductPlan = {
  id: 'mon' | 'lifetime'
  label: string
  priceUsd: string
  durationLabel: string
  isoDuration: string
}

export type Product = {
  id: ProductId
  name: string
  shortName: string
  path: string
  checkoutUrl: string
  status: ProductStatus
  primaryKeyword: string
  tagline: string
  description: string
  heroEyebrow: string
  acquisitionSteps: { step: string; title: string; text: string }[]
  featureGroups: FeatureGroup[]
  highlightBullets: string[]
  systemRequirements: {
    securityPills: string[]
    bullets: string[]
  }
  seo: {
    title: string
    description: string
  }
  infoSections?: { heading: string; paragraphs: string[] }[]
}

export const PLANS: ProductPlan[] = [
  {
    id: 'mon',
    label: 'Monthly',
    priceUsd: '35',
    durationLabel: '30 days of access',
    isoDuration: 'P30D',
  },
  {
    id: 'lifetime',
    label: 'Lifetime',
    priceUsd: '150',
    durationLabel: 'Unlimited access',
    isoDuration: 'P99Y',
  },
]

const EAC_GAMES_GROUP: FeatureGroup = {
  name: 'Easy Anti-Cheat (EAC) — also supported',
  items: [
    'Rust (Cleaner Included)',
    'Fortnite (Cleaner Included)',
    'Fortnite Tournaments (Cleaner Included)',
    'Apex Legends (Cleaner Included)',
    'Bloodhunt',
    'Dead By Daylight',
    'Gray Zone Warfare',
    'Scum',
    'Sea Of Thieves',
    'Squad',
    'The Finals',
    'War Thunder',
    'Spoofing fine on all EAC games!',
  ],
}

export const PRODUCTS: Product[] = [
  {
    id: 'fortnite-spoofer',
    name: 'Fortnite Spoofer',
    shortName: 'Spoofer',
    path: '/fortnite-spoofer',
    checkoutUrl: 'https://zadeyo.com/go/UMAIR?to=%2Fproducts%2Fhwid-spoofer',
    status: 'Active',
    primaryKeyword: 'Fortnite Spoofer',
    tagline: 'HWID utilities for Fortnite and Easy Anti-Cheat titles',
    description:
      'Fortnite spoofer with hardware profile manager, session isolation, pre-change backup, and audit log — built for Fortnite Easy Anti-Cheat (EAC) and broader EAC recovery workflows on Windows PC.',
    heroEyebrow: 'Fortnite · Easy Anti-Cheat · Windows PC',
    acquisitionSteps: [
      {
        step: '01',
        title: 'Review EAC status',
        text: 'Check fortnitespoofer.com status before purchase so your build matches the current Fortnite patch.',
      },
      {
        step: '02',
        title: 'Choose spoofer access',
        text: 'Pick monthly or lifetime HWID utility access — same pricing as our full product line.',
      },
      {
        step: '03',
        title: 'Complete checkout',
        text: 'Secure checkout with instant digital delivery and license access through our partner store.',
      },
      {
        step: '04',
        title: 'Run guided setup',
        text: 'Follow the complete setup forum thread: backup, apply profile, verify identifiers, then launch Fortnite.',
      },
    ],
    featureGroups: [
      {
        name: 'Hardware coverage',
        items: [
          'Targets disk, MAC, motherboard and registry traces anti-cheat uses for HWID linkage.',
        ],
      },
      {
        name: 'Apply & revert',
        items: [
          'Profile apply for one session; reboot returns hardware IDs unless you re-apply.',
        ],
      },
      {
        name: 'Ban recovery context',
        items: [
          'Intended after Epic hardware bans — account appeals go through Epic support channels.',
        ],
      },
      {
        name: 'HWID utility modules',
        items: [
          'Hardware profile manager',
          'Session isolation',
          'Pre-change backup',
          'Audit log',
          'Compatibility checker',
          'Integrity verification',
          'Cleaner included for Fortnite',
        ],
      },
      EAC_GAMES_GROUP,
    ],
    highlightBullets: [
      'Fortnite + Fortnite Tournaments (cleaner included)',
      'Works across major Easy Anti-Cheat titles',
      'HVCI / Secure Boot friendly workflow in setup guide',
      '24/7 Discord support after purchase',
    ],
    systemRequirements: {
      securityPills: ['HVCI ON', 'CORE ISOLATION ON', 'TPM ON', 'SECURE BOOT ON'],
      bullets: [
        'Windows 10 / 11 (64-bit)',
        'Administrator rights for spoof and cleanup steps',
        'Stable internet for activation and updates',
        'Follow the guide before launching Fortnite or other protected games',
      ],
    },
    seo: {
      title: 'Fortnite Spoofer | HWID Utilities & EAC Recovery',
      description:
        'Buy Fortnite spoofer for HWID utilities on Windows PC. Profile manager, backups, session isolation, and EAC title support. Monthly $35 or lifetime $150.',
    },
  },
  {
    id: 'fortnite-cheats',
    name: 'Fortnite Cheats',
    shortName: 'Cheats',
    path: '/fortnite-cheats',
    checkoutUrl: 'https://zadeyo.com/go/UMAIR?to=%2Fproducts%2Ffortnite',
    status: 'Undetected',
    primaryKeyword: 'Fortnite cheats',
    tagline: 'Player ESP, tuned aim settings, and loot filters for Battle Royale',
    description:
      'Fortnite cheats with visual overlays, weapon configs, item ESP, and radar tools — updated for Easy Anti-Cheat (EAC) on Windows PC with stream-safe options and instant delivery.',
    heroEyebrow: 'Battle Royale · EAC · Windows PC',
    acquisitionSteps: [
      {
        step: '01',
        title: 'Confirm loader status',
        text: 'Read Active versus Updating on our status page after every Fortnite patch.',
      },
      {
        step: '02',
        title: 'Select Fortnite cheats',
        text: 'Monthly or lifetime access with the same $35 / $150 pricing as the rest of the store.',
      },
      {
        step: '03',
        title: 'Checkout & delivery',
        text: 'Instant license delivery with loader access and Discord notifications on updates.',
      },
      {
        step: '04',
        title: 'Configure & load',
        text: 'Start with legit ESP presets, save weapon configs, then tune aimbot smoothing in Creative first.',
      },
    ],
    featureGroups: [
      {
        name: 'Visual Features',
        items: [
          'Box (Corner Box, Full Box)',
          'Skeleton (Bezier, Sharp)',
          'Team ID',
          'Seperate TeamID Color',
          'Distance',
          'Held Weapon',
          'Show Team',
          'Show NPC',
          'Filled Box',
          'Show Kills',
          'Snaplines (Center, Top, Bottom)',
          'Visible Color',
          'Hidden Color',
          'Knocked Color',
          'Team Color',
          'NPC Color',
          'Target Color',
          'Text Color',
          'Skeleton Color',
          'Hidden Skeleton Color',
          'Radar Enabled',
          'Radar Team Visualizer',
          'Radar Distance Visualizer',
          'Radar Background Alpha',
          'Radar Player Size',
          'Radar Render Radius',
          'Radar Render Distance',
          'Radar Background Color',
          'Radar Enemy Color',
          'Radar Team Color',
          'Radar Automatic Distance Scaling',
          'Radar Orientation Lock',
        ],
      },
      {
        name: 'Aimbot Features',
        items: [
          'Weapon Configs for each type of weapon',
          'Aimbot Enabled',
          'Aimbot Prediction',
          'Aimbot Hitbox (Head, Neck, Chest, Pelvis)',
          'Aimbot Smoothing',
          'Aimbot Deadzone',
          'Weapon Aim FOV',
          'Aimbot Max Distance',
          'Triggerbot Enabled',
          'Triggerbot Hitbox (Head, Neck, Chest, Pelvis)',
          'Triggerbot Delay',
          'Draw FOV',
          'Filled FOV',
          'Visible Check',
          'Ignore Wounded',
          'Ignore Team',
          'Aimbot Keybind',
          'Aimbot Keybind #2',
          'Triggerbot Keybind',
        ],
      },
      {
        name: 'Item ESP',
        items: [
          'Enabled',
          'Item Config (Materials, Uncommon, Rare, Epic, Legendary, Exotic)',
          'Show Item',
          'Item Color',
          'Show Amount',
          'Show Rarity',
          'Show Distance',
          'Item Max Distance',
        ],
      },
      {
        name: 'Misc Features',
        items: [
          'Battlemode Toggle',
          'Configs',
          'VSync Toggle',
        ],
      },
    ],
    highlightBullets: [
      'Stream-proof overlays for OBS and capture tools',
      'Battle Royale, Zero Build, and Creative support',
      'Weapon-specific aim configs',
      'Loot rarity filters and radar scaling',
    ],
    systemRequirements: {
      securityPills: ['HVCI ON', 'CORE ISOLATION ON', 'TPM ON', 'SECURE BOOT ON'],
      bullets: [
        'Windows 10 (20H2+) or Windows 11',
        'Intel Core i5-7300U / AMD Ryzen 5 2600 or better',
        'Nvidia GTX 970 / AMD RX 580 or better',
        '8GB RAM minimum, 16GB recommended',
        'Fortnite via Epic Games Launcher (latest)',
        'Stable broadband for loader updates',
      ],
    },
    seo: {
      title: 'Fortnite Cheats | ESP, Aimbot & Loot Radar',
      description:
        'Buy Fortnite cheats for Windows PC — player ESP, aimbot, triggerbot, item ESP, and 2D radar. Easy Anti-Cheat status tracked. Monthly $35 or lifetime $150.',
    },
  },
  {
    id: 'ugc-account-recovery',
    name: 'UGC Account Recovery',
    shortName: 'UGC Tool',
    path: '/ugc-account-recovery',
    checkoutUrl: 'https://zadeyo.com/go/UMAIR?to=%2Fproducts%2Fugc',
    status: 'Active',
    primaryKeyword: 'UGC Account recovery',
    tagline: 'The ultimate account recovery workspace',
    description:
      'UGC (Unban & Governance Control) automates appeal workflows for locked gaming, social, and marketplace accounts — build custom recovery playbooks with templates, evidence logs, and restriction tracking.',
    heroEyebrow: 'Account recovery · Multi-platform · Windows PC',
    acquisitionSteps: [
      {
        step: '01',
        title: 'Map your lockout',
        text: 'Document platform, restriction type, and appeal deadlines before you import accounts into UGC.',
      },
      {
        step: '02',
        title: 'Choose UGC access',
        text: 'Monthly or lifetime license — $35 / $150 with the same delivery flow as spoofer and cheats.',
      },
      {
        step: '03',
        title: 'Checkout',
        text: 'Instant digital delivery with workspace templates and Discord onboarding.',
      },
      {
        step: '04',
        title: 'Run recovery workflows',
        text: 'Attach evidence, schedule follow-ups, and track Epic or publisher responses in one dashboard.',
      },
    ],
    featureGroups: [
      {
        name: 'Recovery workspace',
        items: [
          'Multi-account appeal board',
          'Evidence and attachment log',
          'Template library for gaming platforms',
          'Restriction timeline tracker',
          'Follow-up reminders',
          'Exportable audit trail',
        ],
      },
      {
        name: 'Automation',
        items: [
          'Custom appeal workflow builder',
          'Bulk status tagging',
          'Saved response snippets',
          'Platform-specific checklists',
        ],
      },
      {
        name: 'Governance',
        items: [
          'Role-based workspace notes',
          'Secure local credential vault hooks',
          'Activity history for disputes',
        ],
      },
    ],
    highlightBullets: [
      'Built for gaming, social, and storefront lockouts',
      'Pairs with Fortnite spoofer HWID utilities when hardware is involved',
      'Same $35 monthly / $150 lifetime as the full store',
      'Discord support for workflow setup',
    ],
    systemRequirements: {
      securityPills: ['HVCI ON', 'CORE ISOLATION ON', 'TPM ON', 'SECURE BOOT ON'],
      bullets: [
        'Windows 10 / 11 (64-bit)',
        'Stable internet for sync and template updates',
        'Administrator rights for optional local integrations',
        'Epic / platform credentials ready for appeal forms',
      ],
    },
    infoSections: [
      {
        heading: 'What UGC solves',
        paragraphs: [
          'Lockouts and bans stop progress across Fortnite, Epic, and other platforms. UGC is the all-in-one automation tool designed to recover accounts by organizing appeals, evidence, and follow-ups instead of scattered tickets.',
          'Whether the issue is a gaming profile, social handle, or digital marketplace storefront, UGC lets you build custom appeal workflows and automate complex dispute steps so you can rebuild presence with clear restrictions tracking.',
        ],
      },
      {
        heading: 'Connected to Fortnite Spoofer',
        paragraphs: [
          'When Epic ties enforcement to hardware identifiers, pair UGC appeal tracking with Fortnite Spoofer utilities on fortnitespoofer.com — backup profiles first, then document every appeal in UGC for a single paper trail.',
        ],
      },
    ],
    seo: {
      title: 'UGC Account Recovery | Appeal Automation Tool',
      description:
        'UGC account recovery for Windows PC — appeal workflows, evidence logs, and multi-platform lockout tracking. Monthly $35 or lifetime $150 with instant delivery.',
    },
  },
]

export function getProduct(id: ProductId) {
  return PRODUCTS.find((p) => p.id === id)
}

export function getProductByPath(path: string) {
  const normalized = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path
  return PRODUCTS.find((p) => p.path === normalized)
}
