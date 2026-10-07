import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const path = join(root, 'scripts/generate-fortnite-content.mjs')
let s = readFileSync(path, 'utf8')

const ARTICLE_DEFS = `const ARTICLE_DEFS = [
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
]`

const FORUM_DEFS = `const FORUM_DEFS = [
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
]`

const aStart = s.indexOf('const ARTICLE_DEFS = [')
const fStart = s.indexOf('const FORUM_DEFS = [')
const authorsStart = s.indexOf('const AUTHORS = [')
if (aStart < 0 || fStart < 0) throw new Error('markers not found')
s = s.slice(0, aStart) + ARTICLE_DEFS + '\n\n' + FORUM_DEFS + '\n\n' + s.slice(authorsStart)
writeFileSync(path, s)
console.log('Patched ARTICLE_DEFS and FORUM_DEFS')
