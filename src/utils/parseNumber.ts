export const parseNumber = (value: string | undefined): number | null => {
  if (!value) return null;
  const clean = parseFloat(value.replace(",", ".").replace(/[^\d.]/g, ""));
  return isNaN(clean) ? null : clean;
};
