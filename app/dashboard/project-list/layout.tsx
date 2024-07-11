import type { Metadata } from "next";
import Header from "@/components/Navbar/header";
import PageWrapper from "@/components/page-wrapper";
import SideNav from "@/components/Navbar/side-nav";
import MarginWidthWrapper from "@/components/margin-width-wrapper";
import { SideNavProvider } from "@/context/useSideNavContext";
import AccountRecievableNavbar from "@/components/Navbar/AccountRecievableNavbar";
import HeaderNav from "@/components/Navbar/HeaderNav";
import ProjectListNavbar from "@/components/Navbar/Project-List/ProjectListNavbar";
import ProjectHeaderNav from "@/components/Navbar/Project-List/ProjectHeaderNav";

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
        <ProjectListNavbar />
        <ProjectHeaderNav />
            {children}
    </div>
  );
}