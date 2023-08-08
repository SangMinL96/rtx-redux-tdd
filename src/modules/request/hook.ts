import { mockData } from "@/features/request/__test__/Request.test";

export const useDataQuery = () => {
  return { data: mockData, isLoading: false };
};
