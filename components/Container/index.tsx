import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="pl-5 pr-5 md:pl-16 md:pr-16 lg:pl-24 lg:pr-24 w-full">
      {children}
    </div>
  );
};

export default Container;
