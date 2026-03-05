import { Tournament } from "@models/tournament";

export const TOURNAMENTS_MOCK: Tournament[] = [
  {
    id: "1",
    name: "1º Open Arena Praia Clube",
    venueName: "Arena Praia Clube – Uberlândia/MG",
    posterUrl:
      "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80",
    startDate: "2025-04-12",
    endDate: "2025-04-13",
    registrationFee: 180,
    status: "Inscrições Abertas",
    categories: ["Open", "Série A"],
  },
  {
    id: "2",
    name: "IV Torneio CT Rei da Areia",
    venueName: "CT Rei da Areia – São Paulo/SP",
    posterUrl:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80",
    startDate: "2025-03-22",
    endDate: "2025-03-23",
    registrationFee: 120,
    status: "Em Andamento",
    categories: ["Série B", "Série C"],
  },
  {
    id: "3",
    name: "Copa Verão FTV 2025",
    venueName: "Arena Beach Sport – Goiânia/GO",
    posterUrl:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80",
    startDate: "2025-02-08",
    endDate: "2025-02-09",
    registrationFee: 80,
    status: "Finalizado",
    categories: ["Iniciante", "Misto"],
  },
  {
    id: "4",
    name: "Grand Slam da Areia isFTV",
    venueName: "Beach Arena Fortaleza – Fortaleza/CE",
    posterUrl:
      "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=800&q=80",
    startDate: "2025-05-03",
    endDate: "2025-05-04",
    registrationFee: 220,
    status: "Inscrições Abertas",
    categories: ["Open", "Série A", "Série B"],
  },
];
