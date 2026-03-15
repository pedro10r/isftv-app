# isFTV App

Aplicativo mobile para a comunidade de futevôlei brasileiro. Desenvolvido com Expo e React Native, oferece um feed social de mídias, perfis de atletas, torneios e muito mais.

## Sumário

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Tech Stack](#tech-stack)
- [Arquitetura](#arquitetura)
- [Banco de Dados](#banco-de-dados)
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

| Categoria        | Tecnologia                          |
|------------------|-------------------------------------|
| Framework        | Expo SDK 54                         |
| Linguagem        | TypeScript                          |
| Navegação        | React Navigation 7                  |
| Server State     | TanStack React Query v5             |
| Client State     | Zustand                             |
| Formulários      | React Hook Form + Zod               |
| Storage local    | MMKV (criptografado)                |
| Animações        | React Native Reanimated             |
| Autenticação     | Supabase Auth (Email/Senha)         |
| Backend          | Supabase (Database + Storage)       |
| Lista performática | @shopify/flash-list               |
| Ícones           | @expo/vector-icons (Feather)        |

---

## Arquitetura

### Divisão de responsabilidades de estado

| Tipo de estado | Solução | Onde |
|---|---|---|
| Server state (feed, perfil) | TanStack React Query | `src/hooks/queries/` |
| Client state (auth, tema) | Zustand | `src/store/` |
| Form state | React Hook Form | local nos hooks de tela |

### Estrutura de pastas

```
src/
├── components/
│   ├── atoms/            # Button, Switch, TextInput
│   ├── molecules/        # EmptyListState, campos de form
│   ├── organisms/        # FeedUserPost, FeedTournamentPromo, FloatingTabBar
│   └── templates/        # ScreenTemplate, FormTemplate
├── hooks/
│   └── queries/
│       ├── useFeedQueries.ts     # useFeed, useCreatePost, useToggleLike
│       └── useProfileQueries.ts  # useProfile, useUpdateProfile, useUploadProfileImage
├── models/
│   ├── feed.ts           # Post, UserPost, FeedItemType, AuthorType
│   ├── profile.ts        # Profile, PlayingPosition
│   └── tournament.ts     # Tournament, TournamentCategory
├── navigation/           # Configuração de rotas e tipos
├── screens/
│   ├── Home/             # Feed principal (FlashList + paginação infinita)
│   ├── CreatePost/       # Criação de post com upload de imagem
│   ├── Profile/          # Perfil do atleta
│   ├── EditProfile/      # Edição de dados e posição
│   ├── Championships/    # Listagem de torneios
│   ├── Settings/         # Configurações da conta
│   ├── Login/
│   ├── Register/
│   └── ForgotPassword/
├── services/
│   ├── supabase/         # Cliente Supabase + MMKV storage adapter
│   ├── feedService.ts    # getFeedPosts, createFeedPost, toggleFeedLike
│   └── profileService.ts # getProfile, updateProfile, uploadImage
├── store/
│   ├── authStore.ts      # Sessão do usuário (Zustand)
│   └── themeStore.ts     # Tema dark/light persistido (Zustand)
└── theme/                # Cores, tipografia, espaçamentos, radii
```

### Fluxo de dados

Toda comunicação com o Supabase passa pelos arquivos em `src/services/`. Os React Query hooks em `src/hooks/queries/` consomem esses serviços e gerenciam cache, loading e erros. As telas nunca chamam o Supabase diretamente.

```
Tela → hook de tela → React Query hook → Service → Supabase
```

---

## Banco de Dados

### Tabelas

#### `public.profiles`
Criada automaticamente via trigger no cadastro. Sincronizada com `auth.users`.

| Coluna | Tipo |
|---|---|
| id | uuid (FK → auth.users) |
| username | text |
| full_name | text |
| avatar_url | text |
| cover_url | text |
| bio | text |
| playing_position | text |
| height | numeric |
| weight | numeric |
| whatsapp | text |
| created_at | timestamptz |

#### `public.posts`

| Coluna | Tipo |
|---|---|
| id | uuid PK |
| author_id | uuid (FK → profiles, cascade) |
| content | text |
| media_url | text |
| is_video | bool |
| type | text |
| reference_id | uuid |
| created_at | timestamptz |

#### `public.likes`

| Coluna | Tipo |
|---|---|
| id | uuid PK |
| post_id | uuid (FK → posts, cascade) |
| user_id | uuid (FK → profiles, cascade) |
| created_at | timestamptz |

Unique constraint em `(post_id, user_id)` para evitar likes duplicados.

#### `public.tournaments` e `public.tournament_categories`
Torneios com categorias associadas.

### Storage Buckets

| Bucket | Uso |
|---|---|
| `profiles` | Avatares e fotos de capa |
| `posts` | Imagens e vídeos dos posts |

### RLS (Row Level Security)

Todas as tabelas têm RLS ativado:

| Operação | Regra |
|---|---|
| SELECT | Público — qualquer pessoa pode ler |
| INSERT | Apenas o próprio usuário (`auth.uid() = user_id / author_id`) |
| UPDATE | Apenas o próprio usuário |
| DELETE | Apenas o próprio usuário |

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

### Autenticação
- Login e cadastro com email/senha
- Recuperação de senha por email
- Sessão persistida com MMKV como storage adapter do Supabase

### Torneios
- Listagem de torneios com categorias

---

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
EXPO_PUBLIC_STORAGE_ENCRYPTION_KEY=your-encryption-key
```
