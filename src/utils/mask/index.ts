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

// "75" → "75 kg" | "755" → "75,5 kg"
export function maskWeight(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 3);

  if (digits.length === 0) return "";
  if (digits.length <= 2) return `${digits} kg`;

  return `${digits.slice(0, 2)},${digits[2]} kg`;
}
