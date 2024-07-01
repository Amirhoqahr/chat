import React from "react";

type ButtonProps = {
  text: string;
  className?: string;
  secondary?: boolean;
  onClick?: (e: any) => {};
  loading?: boolean;
};

const Button = ({
  text = "Button",
  className,
  loading,
  onClick,
  secondary,
}: ButtonProps) => {
  return (
    <button
      className={`py-2 px-9 rounded-full text-white border-2 border-white hover:bg-myYellow transition-all hover:drop-shadow-lg ${
        secondary ? "bg-myPink" : "bg-myBlue"
      } ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
