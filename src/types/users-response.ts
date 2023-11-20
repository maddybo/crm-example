import { User } from "./user";

export type UsersResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
};
