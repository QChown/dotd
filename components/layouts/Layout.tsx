import React from "react";
import Header from "./Header";
import StyledComponentsRegistry from "@/lib/registry";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      <footer>My Footer</footer>
    </>
  );
};

export default Layout;
