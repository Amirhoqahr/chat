import React from "react";

type Props = {};

export default function ListLoader({}: Props) {
  return (
    <div className="w-full flex flex-10 gap-10 justify-center">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((l) => (
        <SingleListLoader key={l} />
      ))}
    </div>
  );
}

function SingleListLoader() {
  return (
    <div className="relative bg-gray-200 shadow-md rounded-md max-w-sm w-full">
      <div className="anime-pulse flex flex-col">
        <div className="h-14 bg-gray-400 rounded-t-md"></div>
        <div className="flex-1 space-y-10 p-10"></div>
      </div>
      <div className="absolute rounded-full anime-pulse -bottom-4 -left-4 bg-gray-300 h-10 w-10"></div>
    </div>
  );
}
