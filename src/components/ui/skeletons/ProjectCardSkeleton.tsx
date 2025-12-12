export function ProjectCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 animate-pulse">
      {/* Image Skeleton */}
      <div className="h-56 bg-gray-200" />

      {/* Content Skeleton */}
      <div className="p-6">
        {/* Title */}
        <div className="mb-4">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>

        {/* Overview */}
        <div className="space-y-2 mb-4">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-4/5" />
        </div>

        {/* Service Type Tag */}
        <div className="mb-4">
          <div className="h-6 bg-gray-200 rounded-full w-24" />
        </div>

        {/* Tools */}
        <div className="pt-4 border-t border-gray-100">
          <div className="h-3 bg-gray-200 rounded w-16 mb-2" />
          <div className="flex flex-wrap gap-2">
            <div className="h-8 bg-gray-200 rounded-lg w-20" />
            <div className="h-8 bg-gray-200 rounded-lg w-24" />
            <div className="h-8 bg-gray-200 rounded-lg w-20" />
          </div>
        </div>

        {/* View Details */}
        <div className="mt-4">
          <div className="h-4 bg-gray-200 rounded w-28" />
        </div>
      </div>
    </div>
  );
}

export function ProjectsGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="space-y-16">
      {[1, 2].map((section) => (
        <div key={section}>
          {/* Impact Area Header Skeleton */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gray-200" />
              <div>
                <div className="h-8 bg-gray-200 rounded w-64 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-24" />
              </div>
            </div>
            <div className="h-1 w-20 bg-gray-200 rounded-full" />
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: Math.min(count / 2, 3) }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

