import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ 
  size = 'md', 
  fullScreen = false 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const containerClasses = fullScreen 
    ? 'fixed inset-0 flex items-center justify-center bg-black/50' 
    : 'flex items-center justify-center';

  return (
    <div className={containerClasses}>
      <div 
        className={`animate-spin rounded-full border-4 border-primary border-t-transparent ${sizeClasses[size]}`}
      />
    </div>
  );
};