import React from "react";

type InputProps = {
  name: string;
  value?: string; // علامت سوال یعنی پارامتر اختیاریه
  type?: string;
  onChange?: (e: any) => void; // فانکشنی که یه آرگوکنت با هر تایپی میگیره و چیزی رترن نمیکنه
  className?: string;
  onKeyDown?: (e: any) => void;
  disabled?: boolean;
};

const Input = ({
  name,
  value,
  type = "text", //اکه چیزی وارد نشده بود بزن تکست
  onChange,
  className,
  onKeyDown,
  disabled,
}: InputProps) => {
  return (
    <input
      type={type}
      placeholder={`Enter ${name}`}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      disabled={disabled}
      className={`flex-3 placeholder-gray-400 px-3 py-2 bg-transparent border-2 border-gray-400 rounded-full ${className}`}
    ></input>
  );
};

export default Input;
