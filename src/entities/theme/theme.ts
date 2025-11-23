import type { User } from "~/src/entities/user/user";

export type Theme = {
  id: number;
  name: string;
  ownerName: string;
  themeSubscribers: User[];
};
