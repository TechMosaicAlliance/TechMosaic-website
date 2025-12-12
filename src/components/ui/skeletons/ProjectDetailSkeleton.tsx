export function ProjectDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* Back Button Skeleton */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="h-8 bg-gray-200 rounded w-32" />
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <section className="relative bg-gradient-to-r from-gray-300 to-gray-400 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {/* Status Badge */}
              <div className="h-8 bg-white/30 rounded-full w-28" />
              
              {/* Title */}
              <div className="space-y-3">
                <div className="h-12 bg-white/30 rounded w-full" />
                <div className="h-12 bg-white/30 rounded w-3/4" />
              </div>
              
              {/* Client & Date */}
              <div className="space-y-3">
                <div className="h-6 bg-white/30 rounded w-48" />
                <div className="h-6 bg-white/30 rounded w-40" />
              </div>

              {/* Tags */}
              <div className="flex gap-3">
                <div className="h-10 bg-white/30 rounded-full w-48" />
                <div className="h-10 bg-white/30 rounded-full w-40" />
              </div>
            </div>

            {/* Image Skeleton */}
            <div className="aspect-video rounded-2xl bg-white/30" />
          </div>
        </div>
      </section>

      {/* Main Content Skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Project Overview Skeleton */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gray-200" />
                <div className="h-8 bg-gray-200 rounded w-48" />
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            </div>

            {/* Scope of Work Skeleton */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gray-200" />
                <div className="h-8 bg-gray-200 rounded w-40" />
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
              </div>
            </div>

            {/* Project Summary Skeleton */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gray-200" />
                <div className="h-8 bg-gray-200 rounded w-44" />
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Project Links Skeleton */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="h-6 bg-gray-200 rounded w-32 mb-4" />
              <div className="space-y-3">
                <div className="h-12 bg-gray-200 rounded" />
                <div className="h-12 bg-gray-200 rounded" />
              </div>
            </div>

            {/* Tools Skeleton */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="h-6 bg-gray-200 rounded w-40 mb-4" />
              <div className="flex flex-wrap gap-3">
                <div className="h-10 bg-gray-200 rounded-lg w-24" />
                <div className="h-10 bg-gray-200 rounded-lg w-28" />
                <div className="h-10 bg-gray-200 rounded-lg w-20" />
              </div>
            </div>

            {/* Project Info Skeleton */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="h-6 bg-gray-200 rounded w-44 mb-4" />
              <div className="space-y-4">
                <div>
                  <div className="h-3 bg-gray-200 rounded w-20 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </div>
                <div>
                  <div className="h-3 bg-gray-200 rounded w-24 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
                <div>
                  <div className="h-3 bg-gray-200 rounded w-16 mb-2" />
                  <div className="h-6 bg-gray-200 rounded-full w-24" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

