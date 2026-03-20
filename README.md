# isFTV App

Aplicativo mobile para a comunidade de futevôlei brasileiro. Desenvolvido com Expo e React Native, oferece um feed social de mídias, perfis de atletas, torneios e muito mais.

## Sumário

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Tech Stack](#tech-stack)
- [Arquitetura](#arquitetura)
- [Funcionalidades](#funcionalidades)
- [Variáveis de Ambiente](#variáveis-de-ambiente)

---

## Pré-requisitos

- Node.js 18+
- npm ou yarn
- Expo CLI
- iOS Simulator (macOS) ou Android Emulator

## Instalação

```bash
# Instalar dependências
npm install

# Rodar no iOS
npx expo run:ios

# Rodar no Android
npx expo run:android
```

---

## Tech Stack

| Categoria          | Tecnologia                    |
| ------------------ | ----------------------------- |
| Framework          | Expo SDK 54                   |
| Linguagem          | TypeScript                    |
| Navegação          | React Navigation 7            |
| Server State       | TanStack React Query v5       |
| Client State       | Zustand                       |
| Formulários        | React Hook Form + Zod         |
| Storage local      | MMKV (criptografado)          |
| Animações          | React Native Reanimated       |
| Autenticação       | Supabase Auth (Email/Senha)   |
| Backend            | Supabase (Database + Storage) |
| Lista performática | @shopify/flash-list           |
| Ícones             | @expo/vector-icons (Feather)  |

---

## Arquitetura

### Divisão de responsabilidades de estado

| Tipo de estado              | Solução              | Onde                    |
| --------------------------- | -------------------- | ----------------------- |
| Server state (feed, perfil) | TanStack React Query | `src/hooks/queries/`    |
| Client state (auth, tema)   | Zustand              | `src/store/`            |
| Form state                  | React Hook Form      | local nos hooks de tela |

### Estrutura de pastas

```
src/
├── components/            # Atomic Design
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
├── hooks/
│   └── queries/           # Hooks do React Query que consomem os services e gerenciam cache, loading e erros
├── models/                # Tipos e interfaces TypeScript que representam as entidades do domínio
├── navigation/            # Configuração de rotas e tipos
├── screens/
│   ├── Home/              # Feed principal (FlashList + paginação infinita)
│   ├── CreatePost/        # Criação de post com upload de imagem
│   ├── Profile/           # Perfil do atleta logado
│   ├── OtherProfile/      # Perfil de outro atleta (somente leitura)
│   ├── EditProfile/       # Edição de dados
│   ├── Tournaments/       # Listagem de torneios
│   ├── TournamentDetails/ # Detalhes e categorias de um torneio
│   ├── CreateTournament/  # Criação de torneio com categorias e datas
│   ├── Login/
│   ├── Register/
├── services/
│   ├── supabase/          # Cliente Supabase + MMKV storage adapter
├── store/                 # Estado global da aplicação com Zustand (auth, tema, fluxos multi-etapas)
└── theme/                 # Cores, tipografia, espaçamentos, radii
```

### Fluxo de dados

Toda comunicação com o Supabase passa pelos arquivos em `src/services/`. Os React Query hooks em `src/hooks/queries/` consomem esses serviços e gerenciam cache, loading e erros. As telas nunca chamam o Supabase diretamente.

```
Tela → hook de tela → React Query hook → Service → Supabase
```

---

## Funcionalidades

### Feed de Mídias

- Listagem de posts com foto do autor, conteúdo e mídia
- Scroll infinito com paginação via `.range()` do Supabase
- Pull-to-refresh
- Like com **Optimistic Update** — UI atualiza instantaneamente, sincroniza em background
- Criação de post com texto e imagem (upload para o bucket `posts`)

### Perfil do Atleta

- Avatar e foto de capa com upload direto da galeria
- Informações esportivas: posição de jogo, altura, peso, WhatsApp
- Edição de perfil completa
- Visualização do perfil de outros atletas

### Autenticação

- Login e cadastro com email/senha
- Recuperação de senha por email
- Sessão persistida com MMKV como storage adapter do Supabase

### Torneios

- Listagem de torneios com categorias e datas
- Detalhes do torneio com categorias por nível e horários
- Criação de torneio com fluxo multi-etapas (nome, descrição, categorias, datas)

---

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```env
EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
EXPO_PUBLIC_STORAGE_ENCRYPTION_KEY=your-encryption-key
```
