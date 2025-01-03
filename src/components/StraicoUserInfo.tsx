import React from 'react';
import { useStraicoUser } from '@/hooks/useStraicoUser';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface StraicoUserInfoProps {
  straicoKey: string;
}

const StraicoUserInfo: React.FC<StraicoUserInfoProps> = ({ straicoKey }) => {
  const { data: user, isLoading, error } = useStraicoUser(straicoKey);

  if (!straicoKey) return null;
  
  if (isLoading) {
    return (
      <Card className="p-4">
        <Skeleton className="h-4 w-[200px] mb-2" />
        <Skeleton className="h-4 w-[150px]" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-4 text-red-500">
        Failed to load user information
      </Card>
    );
  }

  if (!user) return null;

  return (
    <Card className="p-4 bg-gradient-to-br from-primary-50 to-white">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">
          Welcome, {user.first_name} {user.last_name}
        </h3>
        <div className="text-sm text-gray-600">
          <p>Plan: {user.plan}</p>
          <p>Available coins: {user.coins.toLocaleString()}</p>
        </div>
      </div>
    </Card>
  );
};

export default StraicoUserInfo;