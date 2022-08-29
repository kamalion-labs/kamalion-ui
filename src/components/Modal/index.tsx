import React from 'react';

interface IProps {
  children: any;
}

export const Modal: React.FC<IProps> = ({ children }) => {
  return (
    <div className="fixed top-0 left-0 flex h-screen w-full flex-col items-center bg-slate-900 bg-opacity-75">
      <div className="bg-[#F8FAFB] text-[#1D1E52]; relative mt-10 h-auto w-[400px] rounded-md p-5 shadow-lg">{children}</div>
    </div>
  );
};
