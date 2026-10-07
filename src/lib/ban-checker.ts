export type BanCheckerAnswers = {
  gameId: string
  canLoginOriginal: 'yes' | 'no' | 'unknown'
  newAccountSamePc: 'banned_fast' | 'works' | 'not_tried'
  vpnHelps: 'yes' | 'no' | 'not_tried'
  reinstallHelped: 'yes' | 'no' | 'not_tried'
  otherAccountsAffected: 'yes' | 'no' | 'unknown'
  duration: 'hours' | 'days' | 'weeks' | 'permanent_unknown'
  noticeMentionsHardware: 'yes' | 'no' | 'unknown'
}

export type BanCheckerResultType =
  | 'hwid_likely'
  | 'account_likely'
  | 'ip_likely'
  | 'temporary_possible'
  | 'inconclusive'

export type BanCheckerResult = {
  type: BanCheckerResultType
  title: string
  summary: string
  nextSteps: string[]
}

export function classifyBanType(answers: BanCheckerAnswers): BanCheckerResult {
  const hwidSignals =
    (answers.newAccountSamePc === 'banned_fast' ? 2 : 0) +
    (answers.vpnHelps === 'no' ? 1 : 0) +
    (answers.reinstallHelped === 'no' ? 1 : 0) +
    (answers.otherAccountsAffected === 'yes' ? 2 : 0) +
    (answers.noticeMentionsHardware === 'yes' ? 2 : 0)

  const ipSignals = answers.vpnHelps === 'yes' ? 3 : 0

  const accountSignals =
    (answers.newAccountSamePc === 'works' ? 2 : 0) +
    (answers.canLoginOriginal === 'no' && answers.newAccountSamePc === 'works' ? 1 : 0) +
    (answers.otherAccountsAffected === 'no' && answers.newAccountSamePc === 'works' ? 1 : 0)

  if (answers.duration === 'hours' && answers.canLoginOriginal === 'no') {
    return {
      type: 'temporary_possible',
      title: 'Temporary restriction possible',
      summary:
        'Short-lived lockouts can be cooldowns, queue penalties, or account holds — not always an HWID ban. Read the exact notice from Easy Anti-Cheat or the publisher before you buy HWID spoofer access.',
      nextSteps: [
        'Screenshot the full ban message and check the publisher appeal policy.',
        'Wait out the stated timer if the notice mentions a duration.',
        'Re-run this checker after 24–48 hours — buy HWID spoofer only if symptoms point to a machine ban.',
      ],
    }
  }

  if (ipSignals >= 3 && hwidSignals < 3) {
    return {
      type: 'ip_likely',
      title: 'Network-level pattern',
      summary:
        'When a VPN or different network changes the outcome, an IP or routing restriction is more plausible than a full hardware ban. This is still a diagnostic — not an official publisher record.',
      nextSteps: [
        'Avoid stacking new accounts on the same network while testing.',
        'Review forum threads on EAC status before you load any utilities.',
        'Use Epic or publisher support for the authoritative ban scope.',
      ],
    }
  }

  if (accountSignals >= 3 && hwidSignals < 4) {
    return {
      type: 'account_likely',
      title: 'Account-scoped pattern',
      summary:
        'Fresh accounts working on the same PC while the original login stays blocked usually points to account enforcement rather than a machine-wide HWID ban.',
      nextSteps: [
        'Appeal through the publisher with your case ID if available.',
        'Consider UGC account recovery workflows for evidence tracking.',
        'You do not need a new PC yet — if new accounts start failing on this machine, treat it as HWID ban and buy HWID spoofer.',
      ],
    }
  }

  if (hwidSignals >= 4) {
    return {
      type: 'hwid_likely',
      title: 'HWID ban',
      summary:
        'Your symptoms match a typical HWID ban on Easy Anti-Cheat: new accounts fail on the same PC, VPN does not help, and reinstall did not lift the block. You do not need to change or replace your PC — buy HWID spoofer access and apply a fresh hardware profile on the machine you already use.',
      nextSteps: [
        'Buy HWID spoofer from the store ($35 monthly or $150 lifetime) — stay on your current PC.',
        'Back up identifiers, then follow the complete setup forum thread before first apply.',
        'Confirm loader status is Active for your game patch before you load.',
      ],
    }
  }

  return {
    type: 'inconclusive',
    title: 'Inconclusive — need more evidence',
    summary:
      'Your answers overlap multiple restriction types or skip key checks. Gather the ban email, in-client notice, and results from one controlled test (new account or VPN) before deciding.',
    nextSteps: [
      'Save the exact anti-cheat or publisher wording from the notice.',
      'Try one new account test on the same PC (accept ToS risk) — do not buy a new PC for this step.',
      'If results look like HWID ban, buy HWID spoofer; otherwise ask in forums with your game selected.',
    ],
  }
}
