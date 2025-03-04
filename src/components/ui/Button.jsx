import React from 'react';
import { cn } from '../../lib/utils';

export const Button = React.forwardRef((props, ref) => {
  const { 
    className, 
    variant = 'primary', 
    size = 'md', 
    ...restProps 
  } = props;

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        {
          'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
          'bg-gray-100 text-gray-900 hover:bg-gray-200': variant === 'secondary',
          'border border-gray-300 bg-transparent hover:bg-gray-100': variant === 'outline',
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        className
      )}
      {...restProps}
    />
  );
});

Button.displayName = 'Button';