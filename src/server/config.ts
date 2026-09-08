const positiveNumber = (name: string, fallback: number): number => {
  const raw = process.env[name];
  if (raw === undefined || raw === '') return fallback;
  const value = Number(raw);
  if (!Number.isFinite(value) || value <= 0) throw new Error(`${name} must be a positive number`);
  return value;
};

export function retentionPolicy() {
  return {
    inquiryMonths: positiveNumber('KORA_INQUIRY_RETENTION_MONTHS', 24),
    spamDays: positiveNumber('KORA_SPAM_RETENTION_DAYS', 30),
  } as const;
}

export function inquiryRetentionMs(now = Date.now()): number {
  return now + retentionPolicy().inquiryMonths * 30 * 24 * 60 * 60 * 1000;
}

export function spamCutoffMs(now = Date.now()): number {
  return now - retentionPolicy().spamDays * 24 * 60 * 60 * 1000;
}
