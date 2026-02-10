export const strings = {
  // Strings used in index.tsx
  login: {
    title: "Login",
    subtitle: "Bem-vindo ao Athlete App.",
    emailLabel: "E-mail",
    emailPlaceholder: "email@exemplo.com",
    passwordLabel: "Senha",
    passwordPlaceholder: "••••••••",
    buttonSubmit: "Entrar",
    buttonForgot: "Esqueci minha senha",
    divider: "Ou",
    buttonBiometrics: "Entrar com Biometria",
  },

  // Strings used in hooks.ts
  auth: {
    errorTitle: "Erro no Login",
    errorMessage: "E-mail ou senha incorretos.",
    genericError: "Ocorreu um erro ao tentar fazer login.",

    biometrics: {
      prompt: "Entrar com Biometria",
      fallback: "Usar Senha",
      notEnrolledTitle: "Ops",
      notEnrolledMessage:
        "Nenhuma biometria cadastrada. Por favor, configure a biometria no seu dispositivo e tente novamente.",
      notConcluded: "Autenticação não concluída",
      error: "Ocorreu um erro ao acessar a biometria.",
      failure: "Falha na autenticação biométrica. Tente novamente.",
    },

    config: {
      requiredTitle: "Configuração necessária",
      requiredMessage:
        "Por favor, faça login com e-mail e senha ao menos uma vez para ativar a biometria.",
    },

    success: {
      title: "Sucesso",
      biometricMsg: "Autenticação biométrica realizada com sucesso!",
      welcome: (name: string) => `Bem-vindo de volta, ${name}!`,
    },
  },
};
