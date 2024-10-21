import React from "react";
import Icon from "./Icons";
import { MdDelete, MdEdit } from "react-icons/md";

type Props = {};

export default function Task({}: Props) {
  return (
    <div className="p-2 mb-2 rounded-md drop-shadow-sm hover:drop-shadow-md bg-white">
      <div>
        <p className="cursor-pointer"> Task title here</p>
      </div>
      <div>
        <hr />
        <div>
          <p>Some description here</p>
          <div className="flex justify-end">
            <Icon IconName={MdEdit} />
            <Icon IconName={MdDelete} />
          </div>
        </div>
      </div>
    </div>
  );
}
