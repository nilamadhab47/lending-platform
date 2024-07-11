import type { Metadata } from "next";
import UserListNavbar from "@/components/Navbar/Users/UserListNavbar";
import UserHeaderNav from "@/components/Navbar/Users/UserHeaderNav";

export const metadata: Metadata = {
  title: "SpaceY Capital",
  description: "lending Tech",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
        <UserListNavbar />
        <UserHeaderNav />
            {children}
    </div>
  );
}