export const strings = {
  stepTitles: {
    1: "Informações Básicas",
    2: "Categorias",
    3: "Premiação",
  } as Record<number, string>,

  stepIndicator: (current: number, total: number) =>
    `Passo ${current} de ${total}`,

  nextButton: "Próximo",
  submitButton: "Publicar Campeonato",

  draftGuard: {
    title: "Sair sem salvar?",
    message:
      "Você tem informações preenchidas. Deseja manter como rascunho para continuar depois ou descartar?",
    cancel: "Cancelar",
    discard: "Descartar",
    keepDraft: "Manter Rascunho",
  },
};
