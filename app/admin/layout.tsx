import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel | Nashray",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      {children}
    </div>
  );
}
