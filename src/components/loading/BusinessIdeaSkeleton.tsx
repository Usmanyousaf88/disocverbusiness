import React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const BusinessIdeaSkeleton = () => {
  return (
    <Card className="p-8 animate-pulse">
      <div className="space-y-6">
        {/* Title Skeleton */}
        <div className="border-l-4 border-primary/30 pl-4">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Sections Skeletons */}
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`${i % 2 === 0 ? 'bg-primary/5' : ''} p-4 rounded-lg`}>
            <Skeleton className="h-6 w-1/3 mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-11/12 mb-2" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        ))}

        {/* Button Skeleton */}
        <div className="mt-8 flex justify-center">
          <Skeleton className="h-12 w-64" />
        </div>
      </div>
    </Card>
  );
};

export default BusinessIdeaSkeleton;