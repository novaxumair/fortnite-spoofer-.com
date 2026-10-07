/** Easy Anti-Cheat titles supported for ban checker & spoofer context. */
export type EacGame = {
  id: string
  name: string
  cleanerIncluded?: boolean
}

export const EAC_BAN_CHECKER_GAMES: EacGame[] = [
  { id: 'rust', name: 'Rust', cleanerIncluded: true },
  { id: 'fortnite', name: 'Fortnite', cleanerIncluded: true },
  { id: 'fortnite-tournaments', name: 'Fortnite Tournaments', cleanerIncluded: true },
  { id: 'apex-legends', name: 'Apex Legends', cleanerIncluded: true },
  { id: 'bloodhunt', name: 'Bloodhunt' },
  { id: 'dead-by-daylight', name: 'Dead By Daylight' },
  { id: 'gray-zone-warfare', name: 'Gray Zone Warfare' },
  { id: 'scum', name: 'Scum' },
  { id: 'sea-of-thieves', name: 'Sea Of Thieves' },
  { id: 'squad', name: 'Squad' },
  { id: 'the-finals', name: 'The Finals' },
  { id: 'war-thunder', name: 'War Thunder' },
]

export function getEacGame(id: string) {
  return EAC_BAN_CHECKER_GAMES.find((g) => g.id === id)
}
