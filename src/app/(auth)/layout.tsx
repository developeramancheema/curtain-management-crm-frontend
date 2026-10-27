interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
      <div className="mb-8 flex flex-col items-center gap-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <span className="text-xl font-bold">CS</span>
        </div>
        <h1 className="text-xl font-semibold">Curtain Shop Management</h1>
      </div>
      {children}
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Demo credentials: admin@curtainshop.com / admin123
      </p>
    </div>
  );
}
