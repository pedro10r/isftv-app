export const profileQueryKey = (userId: string) => ["profile", userId] as const;

export const feedQueryKey = ["posts"] as const;

export const tournamentsQueryKey = ["tournaments"] as const;
