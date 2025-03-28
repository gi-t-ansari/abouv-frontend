import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex justify-center items-center w-screen h-screen overflow-clip bg-[#FFF9F9]">
      {children}
    </div>
  );
};

export default AuthLayout;
