export const formatLocation = (
  venueName: string,
  city?: string,
  state?: string,
) => {
  if (!city) return venueName;
  return `${venueName} – ${city}${state ? `, ${state}` : ""}`;
};

export const strings = {
  sections: {
    categories: "Categorias",
    description: "Informações e Regras",
  },
  footer: {
    contactButton: "Fazer Inscrição",
  },
  error: {
    message: "Não foi possível carregar o campeonato.",
    back: "Voltar",
  },
};
