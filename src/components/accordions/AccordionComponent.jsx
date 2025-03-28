import React, { useState, useRef } from "react";
import { IoIosArrowUp } from "react-icons/io";

const AccordionComponent = ({ name, count, children, className }) => {
  const [isOpen, setIsOpen] = useState(true);
  const contentRef = useRef(null);

  return (
    <div className="h-fit w-full">
      <div
        className={`flex w-full p-2 transition-all duration-500 ease-linear ${
          !isOpen ? "rounded-xl" : "rounded-t-xl"
        } justify-between items-center cursor-pointer ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h6 className="text-base font-semibold">{`${name} (${count})`}</h6>
        <IoIosArrowUp
          className={`transform transition-transform duration-500 ${
            !isOpen ? "-rotate-180" : "rotate-0"
          }`}
        />
      </div>

      <div
        ref={contentRef}
        className="transition-all duration-500 ease-in-out "
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="w-full bg-gray-100  rounded-b-xl">{children}</div>
      </div>
    </div>
  );
};

export default AccordionComponent;
