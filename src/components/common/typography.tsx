import { cn } from '@/lib/utils';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

function H1({ className, children, ...props }: TypographyProps) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl',
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

function H2({ className, children, ...props }: TypographyProps) {
  return (
    <h2
      className={cn(
        'scroll-m-20 text-3xl font-semibold tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

function H3({ className, children, ...props }: TypographyProps) {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

function H4({ className, children, ...props }: TypographyProps) {
  return (
    <h4
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </h4>
  );
}

function Paragraph({ className, children, ...props }: TypographyProps) {
  return (
    <p
      className={cn('leading-7 [&:not(:first-child)]:mt-4', className)}
      {...props}
    >
      {children}
    </p>
  );
}

function Lead({ className, children, ...props }: TypographyProps) {
  return (
    <p className={cn('text-xl text-muted-foreground', className)} {...props}>
      {children}
    </p>
  );
}

function Large({ className, children, ...props }: TypographyProps) {
  return (
    <div className={cn('text-lg font-semibold', className)} {...props}>
      {children}
    </div>
  );
}

function Small({ className, children, ...props }: TypographyProps) {
  return (
    <small
      className={cn('text-sm font-medium leading-none', className)}
      {...props}
    >
      {children}
    </small>
  );
}

function Muted({ className, children, ...props }: TypographyProps) {
  return (
    <p className={cn('text-sm text-muted-foreground', className)} {...props}>
      {children}
    </p>
  );
}

export { H1, H2, H3, H4, Paragraph, Lead, Large, Small, Muted };
