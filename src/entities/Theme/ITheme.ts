import type { User } from "~/src/entities/user/user";

export interface ITheme {
  id?: number;
  name: string;
  ownerName?: string;
  themeSubscribers?: User[];
}
