/**
 * Generates articles.ts, forums.ts, forum-replies.ts, and forum-index.ts for Fortnite Spoofer.
 */
import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const HOST = 'fortnitespoofer.com'
const BRAND = 'Fortnite Spoofer'
const GAME = 'Fortnite'
const AC = 'Easy Anti-Cheat (EAC)'

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 72)
}

/** One-line focus per article for unique deep-dive intros. */
const ARTICLE_FOCUS = {
  'ultimate-guide-dota-2-cheats':
    'how lobby cheats, sandbox practice, and third-party vision tools differ under VAC',
  'console-commands-cheat-dota-2':
    'binding the developer console and using cheat-gated commands without breaking public lobbies',
  'complete-dota-2-cheats-list':
    'cataloging economy and item commands players look up before custom games',
  'dota-2-cheats-item-commands':
    'spawning and upgrading gear quickly while `-sv_cheats` is enabled',
  'dota-2-cheats-neutral-items':
    'rolling and testing neutral tokens and tier drops in cheat lobbies',
  'cheat-code-dota-2-sandbox':
    '`-wtf`, `-refresh`, and other sandbox toggles for combo rehearsal',
  'cheat-dota-2-bot-commands':
    'populating lobbies with bots and tuning difficulty for last-hit drills',
  'cheat-dota-2-gold':
    '`-gold`, `-lvlup`, and economy shortcuts for item timing practice',
  'cheat-dota-2-lobby':
    'host permissions, cheat checkboxes, and inviting friends to test setups',
  'cheat-engine-dota-2':
    'why memory scanners conflict with VAC and what safer alternatives exist',
  'cheat-lobby-dota-2-training':
    'structuring training sessions so cheats reinforce muscle memory',
  'cheat-money-dota-2':
    'adjusting starting gold and buyback rules for scenario testing',
  'dota-2-cheats-lobby':
    'navigating lobby UI options that gate item and vision experiments',
  'best-dota-2-cheats-review-2026':
    'comparing overlay features, update cadence, and support quality in 2026',
  'hwid-spoofer-safety':
    'hardware ID concepts, ban families, and realistic expectations for PC users',
  'hero-esp-items-levels':
    'reading enemy levels, item timings, and talent spikes through ESP overlays',
  'full-map-hack-fog-of-war':
    'fog-of-war removal, minimap awareness, and vision discipline',
  'ability-cooldown-tracker':
    'tracking ultimate and talent cooldowns during skirmishes',
  'creep-spawn-timers':
    'stack timing, pull windows, and camp respawn math',
  'rune-spawn-indicators':
    'power rune and bounty spawn reminders for mid and off-lane rotations',
  'last-hit-prediction-helper':
    'using hit indicators to tighten last hits without autopiloting every creep',
  'auto-dodge-skillshots':
    'reaction assists, input latency, and when manual play still wins',
  'ward-placement-esp':
    'spotting observer and sentry placements to plan deward routes',
  'roshan-timer':
    'Aegis expiry, respawn windows, and smoke timing around the pit',
  'enemy-inventory-esp':
    'Blink, BKB, and save-item detection before you commit to fights',
  'performance-optimized-overlays':
    'keeping FPS stable while ESP and timers draw on screen',
  'support-24-7-gaming-software':
    'why round-the-clock loader support matters after patches and outages',
}

const TAG_DEEP_HEADING = {
  Guides: 'From backup to live queue',
  Lists: 'Reference lists that actually help',
  Tools: 'Third-party tools and risk',
  Reviews: 'Choosing software in 2026',
  Safety: 'Account and hardware safety',
  Features: 'Feature depth and defaults',
  Support: 'When the loader misbehaves',
  Buying: 'Checkout and plan choice',
}

const TAG_DEEP_PARAS = {
  Guides: [
    'Run a pre-change backup before you apply any HWID profile. Store the export offline so you can roll back if Fortnite or EAC rejects the session.',
    'Confirm loader status is Active on the site dashboard after every Epic patch — Updating builds may inject but fail mid-match.',
    `Official checkout and delivery stay on ${HOST}. Avoid Discord resellers and "free fortnite spoofer" bundles that ship incomplete rewrites.`,
    'The forums EAC & Fortnite status thread tracks loader compatibility in parallel with Epic patch notes.',
  ],
  Lists: [
    'List articles work best as checklists: which EAC titles share ban families, which identifiers matter on Windows, and what to log before contacting Support.',
    'Cross-check any list against the current season — Epic and EAC update often enough to invalidate copy-paste guides within a few months.',
    'Use the ban checker page to compare symptoms before you assume a hardware lock versus an account-only penalty.',
    'Keep references offline; do not paste loader paths or crack links in public Discord servers.',
  ],
  Tools: [
    'Kernel-level anti-cheat can inspect drivers and hardware fingerprints. Random "cleaners" from Reddit often break boot or miss the identifiers EAC actually stores.',
    'Memory editors and Cheat Engine scans stack risk on top of HWID enforcement — treat external editing as account-ending on mains.',
    'VPNs change IP visibility, not disk serials or SMBIOS values. Do not confuse network privacy with HWID recovery.',
    'If a tutorial promises undetected free cheats, assume scam or ban bait. Report those links in forums instead of spreading them.',
  ],
  Reviews: [
    'When comparing Fortnite spoofer products in 2026, weigh update speed after patches, transparent status pages, and support response time — not just feature bullet lists.',
    'Test HWID utilities on a smurf or Creative session before ranked. Record video proof for yourself, not for public streams.',
    `Price plans ($35 monthly vs $150 lifetime on ${HOST}) matter if you play multiple seasons; lifetime avoids rebilling but still depends on ongoing updates.`,
    'Read forum EAC threads alongside marketing copy. Delayed bans mean "I was fine for a week" is not a safety study.',
  ],
  Safety: [
    'HWID bans tie enforcement to hardware fingerprints when Epic and EAC escalate; utilities may help recovery in niche cases but are not a license to cheat on mains.',
    'Separate Epic accounts for testing reduce the cost of mistakes. Never link payment methods you cannot afford to lose on experimental accounts.',
    'Reports and manual review still apply independent of anti-cheat — playing suspiciously still gets flagged.',
    `Official checkout on ${HOST} avoids reseller scams; Support verifies orders by email, not Discord DMs.`,
  ],
  Features: [
    'Each cheats module maps to a skill Fortnite players already practice: vision, timing, or aim control. Enable one module per session until you understand its false-positive rate.',
    'ESP and radar features consume GPU compositing budget; lower Fortnite effects quality if you enable multiple draw layers.',
    'Spoofer features (profile manager, session isolation, audit log) should be configured once and re-verified after major Windows updates.',
    'After toggling a feature, play a full Creative match to see whether it helps decisions or adds noise. Disable anything you stop looking at within ten minutes.',
  ],
  Support: [
    'If the menu never opens, confirm Windows Defender or third-party AV did not quarantine the loader — restore and add exclusions before retrying.',
    'Secure Boot and TPM changes can invalidate yesterday’s profile. Re-run the compatibility checker after firmware edits.',
    'Do not reinstall Windows on repeat inject failures — wait for Active status and walk the complete setup forum thread first.',
    'Support tickets need order email, order ID, and screenshots of the status page plus any error text.',
  ],
  Buying: [
    'Monthly access is the safest way to confirm the loader fits your PC before a lifetime plan.',
    'Digital licenses arrive via checkout email — use only the official delivery link from your order.',
    'Updating status pauses new inject attempts; buying during a patch window still requires waiting for Active before ranked.',
    'One key is for one person on their own Windows PC — sharing breaks the Terms of Use.',
  ],
}

function deepSectionFor(def) {
  const focus =
    ARTICLE_FOCUS[def.slug] ??
    `${def.tag.toLowerCase()} topics tied to ${def.title.toLowerCase()}`
  const heading = TAG_DEEP_HEADING[def.tag] ?? 'Deep dive'
  const paras = TAG_DEEP_PARAS[def.tag] ?? TAG_DEEP_PARAS.Guides
  return {
    heading,
    body: [
      `This article focuses on ${focus}. ${GAME} runs ${AC} on live servers, so treat HWID changes and third-party loaders as high risk on accounts you care about.`,
      ...paras.slice(0, 3),
    ],
  }
}

function practiceWorkflowSection(def) {
  return {
    heading: 'Safe workflow',
    body: [
      `Read "${def.title}" fully before changing identifiers on your main PC. Use pre-change backup and session isolation from the ${BRAND} setup forum thread.`,
      `Check ${HOST}/status after every Fortnite patch; Updating means wait instead of forcing a profile apply.`,
      'Document original hardware values in the audit log so rollback testing is possible if Epic or EAC behavior shifts.',
      'Pair HWID utility steps with UGC appeal tracking when account recovery is part of the same incident.',
    ],
  }
}

function wordCount(sections) {
  return sections.flatMap((s) => s.body).join(' ').split(/\s+/).filter(Boolean).length
}

function readMinutesFromSections(sections) {
  return Math.max(9, Math.min(20, Math.round(wordCount(sections) / 200)))
}

function sectionsFor(def) {
  const { title, tag } = def
  const sections = [
    {
      heading: 'Overview',
      body: [
        `${title} — practical notes for ${GAME} players on Windows PC. ${BRAND} focuses on HWID utilities and hardware profile testing; this article covers informational ${tag.toLowerCase()} topics for fortnite spoofer buyers.`,
        `${GAME} uses ${AC} on Battle Royale. Hardware bans tie to machine identifiers — understand what changed before you re-launch Epic.`,
        `For the premium HWID utility on ${HOST}, confirm Active status on the status page before you apply profiles or load Fortnite.`,
      ],
    },
    deepSectionFor(def),
    practiceWorkflowSection(def),
    {
      heading: 'Key takeaways',
      body: [
        'Back up hardware profiles before any identifier test — pre-change backup is not optional on mains.',
        `${AC} remains the enforcement layer on ${GAME} — treat HWID utilities and third-party tools as high risk on accounts you care about.`,
        `Questions about delivery, billing, or loader errors belong on ${HOST} support, not blog comments.`,
      ],
    },
  ]
  return sections
}

const ARTICLE_DEFS = [
  { title: 'What Is HWID? Hardware IDs Explained for Fortnite Players', tag: 'Guides', slug: 'what-is-hwid', kw: 'fortnite hwid spoofer, hwid spoofer fortnite' },
  { title: 'What Is HWID Spoofing? (Fortnite & EAC Context)', tag: 'Guides', slug: 'what-is-hwid-spoofing', kw: 'hwid spoofer fortnite, spoofer fortnite' },
  { title: 'How HWID Bans Work on Fortnite and Easy Anti-Cheat', tag: 'Safety', slug: 'how-hwid-bans-work', kw: 'fortnite spoofer, fortnite perm spoofer' },
  { title: '8 HWID Ban Myths That Cost Fortnite Players Money', tag: 'Safety', slug: 'hwid-ban-myths', kw: 'hwid spoofer fortnite reddit, free fortnite spoofer' },
  { title: 'Can an HWID Spoofer Damage Your PC? (2026)', tag: 'Safety', slug: 'can-hwid-spoofer-damage-pc', kw: 'best fortnite hwid spoofer, hwid spoofer fortnite' },
  { title: 'Best HWID Spoofer for Fortnite — Buyers Guide 2026', tag: 'Reviews', slug: 'best-hwid-spoofer-fortnite', kw: 'best fortnite spoofer, best spoofer for fortnite' },
  { title: 'Free Fortnite Spoofer Downloads — What They Actually Cost', tag: 'Safety', slug: 'free-hwid-spoofer-fortnite', kw: 'free fortnite spoofer, fortnite spoofer free' },
  { title: 'HWID Spoofer Buyers Guide — Fortnite Spoofer Edition', tag: 'Reviews', slug: 'hwid-spoofer-buyers-guide', kw: 'best spoofer fortnite, perm spoofer fortnite' },
  { title: 'Fortnite Spoofer Setup Guide — Backup, Apply, Verify', tag: 'Guides', slug: 'fortnite-spoofer-setup-guide', kw: 'fortnite spoofer, hwid spoofer fortnite' },
  { title: 'HWID Spoofer Not Working? 2026 Troubleshooting', tag: 'Support', slug: 'hwid-spoofer-troubleshooting', kw: 'spoofer fortnite, fortnite hwid spoofer' },
  { title: 'TPM, Secure Boot, and EAC — What Fortnite Players Should Know', tag: 'Safety', slug: 'tpm-secure-boot-anti-cheat', kw: 'fortnite spoofer, hwid spoofer fortnite' },
  { title: 'How Anti-Cheat Detects Hardware on Fortnite PCs', tag: 'Tools', slug: 'how-anti-cheat-detects-hardware', kw: 'hwid spoofer fortnite, fortnite spoofer' },
  { title: 'Kernel-Level Anti-Cheat Explained for Fortnite', tag: 'Tools', slug: 'what-is-kernel-level-anti-cheat', kw: 'fortnite spoofer, hwid spoofer fortnite' },
  { title: 'Anti-Cheat Comparison — EAC, BE, and Vanguard vs HWID Utilities', tag: 'Guides', slug: 'anti-cheat-comparison', kw: 'fortnite hwid spoofer, hwid spoofer fortnite' },
  { title: 'VPN vs HWID Spoofer — What Fortnite Players Confuse', tag: 'Safety', slug: 'vpn-vs-hwid-spoofer', kw: 'hwid spoofer fortnite reddit, fortnite spoofer' },
  { title: 'Hardware Replacement vs Spoofer for Fortnite HWID Bans', tag: 'Safety', slug: 'hardware-vs-spoofer', kw: 'fortnite perm spoofer, perm spoofer fortnite' },
  { title: 'Permanent vs Temporary HWID Spoofer for Fortnite', tag: 'Guides', slug: 'permanent-vs-temporary-spoofer', kw: 'fortnite perm spoofer, best fortnite spoofer' },
  { title: 'HWID Spoofer vs Clean Windows Install — Fortnite Edition', tag: 'Guides', slug: 'hwid-spoofer-vs-clean-install', kw: 'hwid spoofer fortnite, spoofer fortnite' },
  { title: 'Do You Need to Format Windows After an HWID Ban?', tag: 'Guides', slug: 'do-i-need-to-format-windows', kw: 'fortnite hwid spoofer, hwid spoofer fortnite' },
  { title: 'What Triggers an HWID Ban in Fortnite?', tag: 'Safety', slug: 'what-triggers-hwid-ban', kw: 'fortnite spoofer, hwid spoofer fortnite' },
  { title: 'What to Do After a Fortnite HWID Ban', tag: 'Safety', slug: 'what-to-do-after-hwid-ban', kw: 'fortnite spoofer, best spoofer for fortnite' },
  { title: 'HWID Ban vs IP Ban — Fortnite & Epic Explained', tag: 'Safety', slug: 'hwid-ban-vs-ip-ban', kw: 'fortnite spoofer, hwid spoofer fortnite' },
  { title: 'Shadow Ban vs HWID Ban on Fortnite', tag: 'Safety', slug: 'shadow-ban-vs-hwid-ban', kw: 'fortnite spoofer, spoofer fortnite' },
  { title: 'HWID Ban Duration — What Fortnite Players Report', tag: 'Guides', slug: 'hwid-ban-duration-comparison', kw: 'fortnite perm spoofer, fortnite spoofer' },
  { title: 'HWID Ban Appeal Guide — Epic Support Workflow', tag: 'Guides', slug: 'hwid-ban-appeal-guide', kw: 'UGC account recovery, fortnite spoofer' },
  { title: 'Games That HWID Ban — EAC Titles Beyond Fortnite', tag: 'Lists', slug: 'games-that-hwid-ban', kw: 'hwid spoofer fortnite, fortnite hwid spoofer' },
  { title: 'How to Change HWID Safely Before Launching Fortnite', tag: 'Guides', slug: 'how-to-change-hwid', kw: 'how to change hwid, fortnite spoofer' },
  { title: 'Is HWID Spoofing Safe? Ban Risk vs PC Safety', tag: 'Safety', slug: 'is-hwid-spoofing-safe', kw: 'best free fortnite spoofer, fortnite spoofer' },
  { title: 'Best Fortnite Cheats Review 2026 — ESP, Aimbot, Radar', tag: 'Reviews', slug: 'best-fortnite-cheats', kw: 'best fortnite cheats, fortnite cheats' },
  { title: 'Cheats for Fortnite — Feature Overview & EAC Status', tag: 'Features', slug: 'cheats-for-fortnite-guide', kw: 'cheats for fortnite, cheats fortnite' },
  { title: 'Fortnite Cheats ESP and Aimbot — Creative Mode Testing', tag: 'Features', slug: 'fortnite-cheats-esp-aimbot', kw: 'cheats on fortnite, fortnite cheats' },
  { title: 'Free Fortnite Cheats — Why Reddit Links Fail in 2026', tag: 'Safety', slug: 'free-fortnite-cheats-myths', kw: 'free fortnite cheats, free cheats fortnite' },
  { title: 'Fortnite AI Cheats — Hype vs Real Loader Features', tag: 'Tools', slug: 'fortnite-ai-cheats-explained', kw: 'fortnite ai cheats, fortnite cheats' },
  { title: 'Fortnite Cheats Free Trials — Scams and Safe Checkout', tag: 'Buying', slug: 'fortnite-cheats-free-checkout', kw: 'fortnite cheats free, fortnite free cheats' },
]

const FORUM_DEFS = [
  { slug: 'fortnite-spoofer-discussion', title: 'Daily thread: fortnite spoofer, EAC patches, and loader status', tag: 'General', community: 'fnspoofer', author: 'EACWatcher', kw: 'fortnite spoofer, spoofer fortnite', excerpt: 'Open discussion for fortnite spoofer utilities, HWID profiles, and Easy Anti-Cheat rumors — read pinned rules first.' },
  { slug: 'hwid-spoofer-fortnite', title: 'hwid spoofer fortnite — setup, cleaner, and Fortnite tournaments', tag: 'Spoofer', community: 'HWIDFortnite', author: 'DiskSerial', kw: 'hwid spoofer fortnite, fortnite hwid spoofer', excerpt: 'Fortnite-focused HWID spoofer thread: cleaner order, tournament mode, and when to re-apply profiles.' },
  { slug: 'free-fortnite-spoofer-myths', title: 'free fortnite spoofer links — malware and incomplete rewrites', tag: 'Safety', community: 'ScamWatch', author: 'DefenderFan', kw: 'free fortnite spoofer, fortnite spoofer free', excerpt: 'Why free fortnite spoofer downloads fail EAC checks and often ship trojans — use official checkout only.' },
  { slug: 'best-fortnite-spoofer-picks', title: 'best fortnite spoofer / best spoofer for fortnite — 2026 comparison', tag: 'Reviews', community: 'SpooferDeals', author: 'PermSpoof', kw: 'best fortnite spoofer, best spoofer fortnite', excerpt: 'Compare paid HWID utilities for Fortnite: backup tools, EAC title list, and support response times.' },
  { slug: 'fortnite-cheats-discussion', title: 'fortnite cheats — ESP defaults, aim smoothing, and reports', tag: 'Cheats', community: 'FortniteCheats', author: 'BoxESP', kw: 'fortnite cheats, cheats for fortnite', excerpt: 'Community thread for fortnite cheats features — keep cheat keywords here, not on spoofer product pages.' },
  { slug: 'best-fortnite-cheats-thread', title: 'best fortnite cheats — legit presets vs rage configs', tag: 'Cheats', community: 'FortniteCheats', author: 'SmoothAim', kw: 'best fortnite cheats, cheats fortnite', excerpt: 'Share legit ESP and aimbot presets for fortnite cheats buyers; moderators lock crack links.' },
  { slug: 'free-fortnite-cheats-reddit', title: 'free fortnite cheats reddit — navigational megathread', tag: 'Cheats', community: 'FortniteCheats', author: 'ModTeam', kw: 'free fortnite cheats reddit, free fortnite cheats', excerpt: 'Central thread for free fortnite cheats reddit searches — points to official store and status page only.' },
  { slug: 'ugc-account-recovery-help', title: 'UGC account recovery — Epic appeals and evidence logs', tag: 'UGC', community: 'UGCRecovery', author: 'AppealBot', kw: 'UGC account recovery, fortnite spoofer', excerpt: 'Workflow tips for UGC tool buyers recovering Epic accounts alongside HWID utilities.' },
  { slug: 'complete-setup', title: 'Fortnite Spoofer complete setup — backup, apply, verify HWID', tag: 'Setup', community: 'FNSetup', author: 'support_fan', kw: 'fortnite spoofer, hwid spoofer fortnite', howTo: true, excerpt: 'Step-by-step fortnite spoofer setup on fortnitespoofer.com: Defender exclusions, profile apply, EAC launch order.' },
  { slug: 'features-list', title: 'Fortnite Spoofer feature list — hardware coverage & EAC games', tag: 'Features', community: 'fnspoofer', author: 'FortniteSpooferMod', kw: 'fortnite spoofer, hwid spoofer fortnite', excerpt: 'Official HWID utility checklist: disk, MAC, motherboard traces, cleaner, and supported EAC titles.' },
  { slug: 'fortnite-cheats-features', title: 'Fortnite cheats feature list — visuals, aimbot, item ESP', tag: 'Features', community: 'FortniteCheats', author: 'FortniteSpooferMod', kw: 'fortnite cheats, cheats for fortnite', excerpt: 'Full fortnite cheats module list: box ESP, skeleton, radar, weapon configs, and item filters.' },
  { slug: 'eac-fortnite-status', title: 'Fortnite EAC status — Active vs Updating after patches', tag: 'Patches', community: 'PatchWatch', author: 'patch_day_survivor', kw: 'fortnite spoofer, fortnite cheats', excerpt: 'When Epic ships a Fortnite update, loader status may flip Updating — wait for Active before load.' },
  { slug: 'loader-errors', title: 'Loader closes / menu missing — fortnite spoofer fix list', tag: 'Support', community: 'LoaderHelp', author: 'defender_hater', kw: 'fortnite spoofer, hwid spoofer fortnite', howTo: true, excerpt: 'Menu not opening, quarantine, wrong build — confirm Active status before re-applying HWID profiles.' },
  { slug: 'lifetime-vs-monthly', title: 'Lifetime vs monthly ($150 vs $35) for all store products', tag: 'Plans', community: 'FNDeals', author: 'longterm_core', kw: 'fortnite spoofer, fortnite cheats', excerpt: 'Compare monthly P30D and lifetime P99Y for spoofer, cheats, and UGC on fortnitespoofer.com.' },
  { slug: 'hwid-spoofer-reddit', title: 'hwid spoofer fortnite reddit — official links only', tag: 'Nav', community: 'fnspoofer', author: 'ModTeam', kw: 'hwid spoofer fortnite reddit, hwid spoofer free fortnite', excerpt: 'Navigational thread: use fortnitespoofer.com store and support — no third-party key resellers.' },
]

const AUTHORS = [
  'EACWatcher',
  'DiskSerial',
  'BoxESP',
  'SmoothAim',
  'PermSpoof',
  'DefenderFan',
  'patch_day_survivor',
  'defender_hater',
  'longterm_core',
  'HWID_anxious',
  'CreativeOnly',
  'LoaderGhost',
  'IT_guy_gaming',
  'FortniteSpooferMod',
  'irritated_panda',
]

const HAPPY = [
  'Followed the setup thread — profile backup and audit log came up first try after Defender exclusion.',
  'Session isolation plus low-opacity ESP feels readable in Creative.',
  'Lifetime plan paid off after the third month — still on Active after last Fortnite patch.',
  'Moderator @reply fixed my Updating loader mistake. Waited for Active like they said.',
  'Compatibility checker caught Secure Boot before I wasted a ban appeal — not magic but consistent.',
  'EAC thread scared me straight — staying on smurf for spoofer testing only.',
  'Status page matched menu after Epic patch; fewer surprise HWID locks.',
]

const UNHAPPY = [
  'Loaded during Updating after a patch — instant close. Status page was right.',
  'Wide ESP on stream looks obvious. Dialed opacity down per cheats thread.',
  'Expected free spoofer links here — mod locked it and pointed to safety FAQ. Fair.',
  'Ranked thread is depressing but accurate. Reports stack if you play blatant.',
  'Thought HWID spoofer replaces a ban — it does not. Read the safety blog.',
  'Menu never opened until I restored Defender quarantine. Skipped that step first time.',
  'Monthly vs lifetime pricing confused me until Support replied same day.',
]

function hashSlug(slug) {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0
  return h
}

function modIndex(n, length) {
  return ((n % length) + length) % length
}

function pickUniqueBody(used, candidates) {
  for (const body of candidates) {
    if (body && !used.has(body)) {
      used.add(body)
      return body
    }
  }
  const fallback = candidates[0] ?? 'Thanks for posting.'
  used.add(fallback)
  return fallback
}

function staffRepliesFor(post, used) {
  const h = hashSlug(post.slug)
  const editorPool = [
    `Editor: pinned ${post.tag} reference for r/${post.community}. Matches ${HOST} menu — confirm Active before ranked.`,
    `Editor: thread locked read-only. Billing and loader keys go through Support, not replies here.`,
    `Mod team: "${post.title.slice(0, 60)}…" refreshed after latest Fortnite / EAC patch notes.`,
  ]
  const modPool = [
    `Moderator: no key selling or Discord scams in replies. Official checkout only via ${HOST}.`,
    `Mod note — conservative ESP presets beat blatant rage configs in ranked. EAC delays exist.`,
    `Moderator: if status shows Updating, menu toggles will not fix inject — wait for Active.`,
  ]
  return [
    {
      author: 'FortniteSpoofer Editor',
      role: 'editor',
      date: `2026-03-${String(8 + (h % 6)).padStart(2, '0')}`,
      body: pickUniqueBody(used, editorPool),
    },
    {
      author: 'Forum Moderator',
      role: 'moderator',
      date: `2026-03-${String(12 + (h % 8)).padStart(2, '0')}`,
      body: pickUniqueBody(used, modPool),
    },
  ]
}

function communityRepliesFor(post, used) {
  const h = hashSlug(post.slug)
  const count = 2 + (h % 4)
  const out = []
  for (let i = 0; i < count; i++) {
    const pool = (h + i) % 3 !== 0 ? HAPPY : UNHAPPY
    out.push({
      author: AUTHORS[modIndex(h + i, AUTHORS.length)],
      role: 'member',
      date: `2026-03-${String(10 + modIndex(h + i, 18)).padStart(2, '0')}`,
      body: pickUniqueBody(used, [pool[modIndex(h + i * 3, pool.length)]]),
    })
  }
  return out
}

function modFollowUpReplies(post, community, used) {
  if (!community.length) return []
  const h = hashSlug(post.slug)
  const targets = [community[0], community[modIndex(h >>> 2, community.length)]].filter(Boolean)
  const unique = []
  const seen = new Set()
  for (const t of targets) {
    const k = `${t.author}\0${t.body}`
    if (!seen.has(k)) {
      seen.add(k)
      unique.push(t)
    }
  }
  return unique.slice(0, 2).map((target, variant) => ({
    author: variant % 2 === 0 ? 'Forum Moderator' : 'Fortnite Spoofer Support',
    role: 'moderator',
    date: `2026-03-${String(18 + variant).padStart(2, '0')}`,
    body: pickUniqueBody(used, [
      `@${target.author} — walk the ${post.tag} checklist in the OP, confirm Active on ${HOST}, then retry. Loader logs go to Support.`,
      `@${target.author} — EAC risk is real on mains. Test utilities on smurf or Creative first.`,
    ]),
    replyToAuthor: target.author,
  }))
}

function repliesForSlug(post) {
  const used = new Set()
  const staff = staffRepliesFor(post, used)
  const community = communityRepliesFor(post, used)
  const followUps = modFollowUpReplies(post, community, used)
  return [...staff, ...community, ...followUps]
}

function metaDescription(text) {
  const first = text.slice(0, 155)
  return first.endsWith('.') ? first : `${first}.`
}

function buildArticle(def, idx) {
  const excerpt = `${def.title} — ${BRAND} blog for Fortnite players worldwide (USD plans, Windows PC).`
  const sections = sectionsFor(def)
  return {
    slug: def.slug,
    title: def.title,
    excerpt,
    metaTitle: `${def.title} | ${BRAND}`,
    metaDescription: metaDescription(excerpt),
    searchTerms: (def.kw || 'fortnite spoofer, hwid spoofer fortnite').split(',').slice(0, 4).join(', '),
    date: `2026-03-${String(1 + (idx % 28)).padStart(2, '0')}`,
    readMinutes: readMinutesFromSections(sections),
    tag: def.tag,
    sections,
  }
}

function buildForum(def, idx) {
  const sections = [
    {
      heading: def.howTo ? '1) Check status' : 'Opening post',
      body: [
        def.excerpt,
        `Community: r/${def.community} · Game: ${GAME} · Anti-cheat: ${AC}. Official site: ${HOST}.`,
      ],
    },
    {
      heading: def.howTo ? '2) Configure modules' : 'Discussion norms',
      body: [
        'HWID utilities, fortnite spoofer setup, fortnite cheats modules, and UGC recovery workflows are documented on their respective feature threads.',
        'Moderators may lock threads that share crack links, stolen keys, or unrelated game cheats that cannibalize SEO.',
      ],
    },
  ]
  return {
    slug: def.slug,
    title: def.title,
    excerpt: def.excerpt,
    metaTitle: `${def.title} | ${BRAND} Forums`,
    metaDescription: metaDescription(def.excerpt),
    searchTerms: (def.kw || 'fortnite spoofer').split(',').slice(0, 4).join(', '),
    date: `2026-03-${String(5 + (idx % 20)).padStart(2, '0')}`,
    readMinutes: 6 + (idx % 4),
    tag: def.tag,
    community: def.community,
    author: def.author,
    score: 120 + (hashSlug(def.slug) % 880),
    sections,
    ...(def.howTo ? { howTo: true } : {}),
  }
}

const ARTICLES = ARTICLE_DEFS.map(buildArticle)
const FORUMS = FORUM_DEFS.map(buildForum)

const repliesObj = Object.fromEntries(FORUMS.map((p) => [p.slug, repliesForSlug(p)]))

const forumIndex = FORUMS.map((p) => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  tag: p.tag,
  community: p.community,
  author: p.author,
  score: p.score,
  commentCount: repliesObj[p.slug]?.length ?? 0,
}))

const articleTs = `/** Auto-generated by scripts/generate-fortnite-content.mjs */
import { orderArticlesForGrid } from '../lib/blog-order'

export type ArticleSection = {
  heading: string
  body: string[]
}

export type Article = {
  slug: string
  title: string
  excerpt: string
  metaTitle: string
  metaDescription: string
  searchTerms: string
  date: string
  readMinutes: number
  tag: string
  sections: ArticleSection[]
}

export const ARTICLES: Article[] = ${JSON.stringify(ARTICLES, null, 2)}

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug)
}

export function getRelatedArticles(slug: string, limit = 6): Article[] {
  const current = getArticle(slug)
  if (!current) return []
  const pool = ARTICLES.filter((a) => a.slug !== slug).sort((a, b) => {
    const tagRank = (p: Article) => (p.tag === current.tag ? 0 : 1)
    return tagRank(a) - tagRank(b) || a.title.localeCompare(b.title)
  })
  return orderArticlesForGrid(pool.slice(0, Math.max(limit, 12)), 4).slice(0, limit)
}

export { articlePath } from './blog-paths'
`

const forumsTs = `/** Auto-generated by scripts/generate-fortnite-content.mjs */
export type ForumSection = {
  heading: string
  body: string[]
}

export type ForumThread = {
  slug: string
  title: string
  excerpt: string
  metaTitle: string
  metaDescription: string
  searchTerms: string
  date: string
  readMinutes: number
  tag: string
  community: string
  author: string
  score: number
  sections: ForumSection[]
  howTo?: boolean
}

export const FORUM_THREADS: ForumThread[] = ${JSON.stringify(FORUMS, null, 2)}

export function getForumThread(slug: string) {
  return FORUM_THREADS.find((f) => f.slug === slug)
}

export function getRelatedForumThreads(slug: string, limit = 6): ForumThread[] {
  const current = getForumThread(slug)
  if (!current) return []
  return FORUM_THREADS.filter((f) => f.slug !== slug)
    .sort((a, b) => {
      const tagRank = (p: ForumThread) => (p.tag === current.tag ? 0 : 1)
      return tagRank(a) - tagRank(b) || a.title.localeCompare(b.title)
    })
    .slice(0, limit)
}

export { forumPath } from './blog-paths'
`

const repliesTs = `/** Auto-generated by scripts/generate-fortnite-content.mjs */
export type ForumReplyRole = 'editor' | 'moderator' | 'member'

export type ForumReply = {
  author: string
  date: string
  body: string
  role?: ForumReplyRole
  replyToAuthor?: string
}

export const FORUM_REPLIES: Record<string, ForumReply[]> = ${JSON.stringify(repliesObj, null, 2)}

export function getForumReplies(slug: string): ForumReply[] {
  return FORUM_REPLIES[slug] ?? []
}
`

const forumIndexTs = `/** Auto-generated — forum list for Reddit-style UI */
export type ForumIndexEntry = {
  slug: string
  title: string
  excerpt: string
  tag: string
  community: string
  author: string
  score: number
  commentCount: number
}

export const FORUM_INDEX: ForumIndexEntry[] = ${JSON.stringify(forumIndex, null, 2)}

export const FORUM_MODERATORS = [
  { name: 'FortniteSpooferMod', community: 'fnspoofer', flair: 'Head Mod' },
  { name: 'Forum Moderator', community: 'HWIDFortnite', flair: 'Mod' },
  { name: 'FortniteSpoofer Editor', community: 'FNSetup', flair: 'Editor' },
  { name: 'Fortnite Spoofer Support', community: 'LoaderHelp', flair: 'Support' },
] as const
`

writeFileSync(join(root, 'src/data/articles.ts'), articleTs)
writeFileSync(join(root, 'src/data/forums.ts'), forumsTs)
writeFileSync(join(root, 'src/data/forum-replies.ts'), repliesTs)
writeFileSync(join(root, 'src/data/forum-index.ts'), forumIndexTs)

console.log(`Generated ${ARTICLES.length} blog articles and ${FORUMS.length} forum threads`)
