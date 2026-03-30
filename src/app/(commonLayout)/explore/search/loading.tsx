export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Skeleton Header */}
      <div className="mb-10 space-y-4 border-b border-slate-100 pb-8">
        <div className="h-4 w-32 bg-slate-200 animate-pulse rounded" />
        <div className="h-10 w-64 bg-slate-200 animate-pulse rounded-lg" />
      </div>

      {/* Skeleton Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-slate-100 overflow-hidden space-y-4 p-4 shadow-sm"
          >
            {/* Image Placeholder */}
            <div className="aspect-video bg-slate-200 animate-pulse rounded-xl" />

            {/* Title Placeholder */}
            <div className="h-5 w-3/4 bg-slate-200 animate-pulse rounded" />

            {/* Description Placeholder */}
            <div className="space-y-2">
              <div className="h-3 w-full bg-slate-100 animate-pulse rounded" />
              <div className="h-3 w-5/6 bg-slate-100 animate-pulse rounded" />
            </div>

            {/* Button Placeholder */}
            <div className="h-12 w-full bg-slate-200 animate-pulse rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
