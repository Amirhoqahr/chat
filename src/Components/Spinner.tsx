import React from "react";

type Props = {};

const Spinner = (props: Props) => {
  return (
    <div className="animate-spin border-2 border-t-black w-5 h-5 rounded-full"></div>
  ); // بردر مربع میسازه راندد-فول هم دایره‌ش میکنه پس دیگه نیازی به آیکون نیست
};

export default Spinner;
