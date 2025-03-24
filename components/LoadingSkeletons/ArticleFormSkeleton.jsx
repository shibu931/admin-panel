import React from 'react';

const ArticleFormSkeleton = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Title and Slug row */}
      <div className="grid w-full gap-1.5">
        <div className="h-4 w-22 bg-muted/50 rounded animate-pulse"></div>
        <div className="h-10 bg-muted/50 rounded animate-pulse w-full"></div>
      </div>
      <div className="grid w-full gap-1.5">
        <div className="h-4 w-22 bg-muted/50 rounded animate-pulse"></div>
        <div className="h-10 bg-muted/50 rounded animate-pulse w-full"></div>
      </div>
      {/* Meta Title and Keywords row */}
      <div className="grid w-full gap-1.5">
        <div className="h-4 w-22 bg-muted/50 rounded animate-pulse"></div>
        <div className="h-10 bg-muted/50 rounded animate-pulse w-full"></div>
      </div>
      <div className="grid w-full gap-1.5">
        <div className="h-4 w-22 bg-muted/50 rounded animate-pulse"></div>
        <div className="h-10 bg-muted/50 rounded animate-pulse w-full"></div>
      </div>
      {/* Meta Description row */}
      <div className="lg:col-span-2 grid w-full gap-1.5">
        <div className="h-4 w-22 bg-muted/50 rounded animate-pulse"></div>
        <div className="h-20 bg-muted/50 rounded animate-pulse w-full"></div>
      </div>
      {/* Picture and Article Type row */}
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <div className="h-4 w-22 bg-muted/50 rounded animate-pulse"></div>
        <div className="h-10 bg-muted/50 rounded animate-pulse w-full"></div>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <div className="h-4 w-22 bg-muted/50 rounded animate-pulse"></div>
        <div className="h-10 bg-muted/50 rounded animate-pulse w-full"></div>
      </div>
      {/* Rich Text Editor row */}
      <div className='lg:col-span-2'>
        <div className="p-2 border border-muted/50 rounded-t bg-muted/50 h-12 animate-pulse w-full"></div>
        <div className="border border-muted/50 bg-muted/50 rounded-b p-2 min-h-[300px] w-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default ArticleFormSkeleton;