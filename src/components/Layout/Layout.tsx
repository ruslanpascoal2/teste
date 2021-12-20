import { Container } from "@chakra-ui/layout";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(false);

  const handleSidebar = () => {
    setSidebarIsOpen((oldState: boolean) => {
      return !oldState;
    });
  };
  const handleClose = () => {
    setSidebarIsOpen(false);
  };

  return (
    <main>
      <Navbar handleSidebar={handleSidebar} />
      <Sidebar sidebarIsOpen={sidebarIsOpen} handleClose={handleClose} />
      <Container maxW='container.xl'>{children}</Container>
    </main>
  );
};

export default Layout;
