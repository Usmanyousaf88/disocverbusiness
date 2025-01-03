import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/utils/straicoApi';
import { StraicoUser } from '@/types/straico';

export const useStraicoUser = (straicoKey: string) => {
  return useQuery<StraicoUser>({
    queryKey: ['straicoUser', straicoKey],
    queryFn: async () => {
      if (!straicoKey) return null;
      const response = await getUserInfo(straicoKey);
      return response.data;
    },
    enabled: !!straicoKey,
  });
};