export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function maskDate(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

export function maskCurrency(value: string): string {
  const digits = value.replace(/\D/g, "");

  if (!digits) return "";
  const number = parseInt(digits, 10) / 100;

  return number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// "173" → "1,73 m" | "17" → "1,7" | "1" → "1"
export function maskHeight(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 3);

  if (digits.length === 0) return "";
  if (digits.length === 1) return digits;
  if (digits.length === 2) return `${digits[0]},${digits[1]}`;

  return `${digits[0]},${digits.slice(1)} m`;
}

// "user" → "@user" | "@user" → "@user"
export function maskUsername(value: string): string {
  const raw = value.startsWith("@") ? value.slice(1) : value;
  const clean = raw.replace(/[^a-zA-Z0-9_.]/g, "").toLowerCase();
  if (!clean) return "";
  return `@${clean}`;
}

// Validates and formats HH:mm or H:mm (max 23:59)
// Invalid digits are silently discarded.
export function maskTime(value: string): string {
  const raw = value.replace(/\D/g, "");
  if (!raw) return "";

  const d0 = parseInt(raw[0], 10);

  if (d0 >= 3) {
    // single-digit hour (3–9)
    if (raw.length === 1) return raw[0];
    const m0 = parseInt(raw[1], 10);

    if (m0 > 5) return `${raw[0]}:`; // invalid minute first digit → discard
    if (raw.length === 2) return `${raw[0]}:${raw[1]}`;

    return `${raw[0]}:${raw[1]}${raw[2]}`;
  }

  // double-digit hour (0–2x)
  if (raw.length === 1) return raw[0];
  const d1 = parseInt(raw[1], 10);
  if (d0 === 2 && d1 > 3) return raw[0]; // e.g. "26" → discard "6"

  if (raw.length === 2) return `${raw[0]}${raw[1]}`;

  const m0 = parseInt(raw[2], 10);
  if (m0 > 5) return `${raw[0]}${raw[1]}:`; // invalid minute first digit → discard
  if (raw.length === 3) return `${raw[0]}${raw[1]}:${raw[2]}`;

  return `${raw[0]}${raw[1]}:${raw[2]}${raw[3]}`;
}

// "75" → "75 kg" | "755" → "75,5 kg"
export function maskWeight(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 3);

  if (digits.length === 0) return "";
  if (digits.length <= 2) return `${digits} kg`;

  return `${digits.slice(0, 2)},${digits[2]} kg`;
}
