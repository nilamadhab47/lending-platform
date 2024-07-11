import { LabelList1st, LabelList2nd, LabelList3rd, LabelList4th, LabelList5th } from "@/constants/ProfileLabelList";
import React from "react";

const Page = () => {
  return (
    <>
    <div>
    <input type="text" placeholder="search" style={{border: "1px solid black"}} />
    </div>
    <div
      className=" w-[90vw] py-8 px-4 rounded-2xl"
      style={{ border: "0.8px solid black" }}
    >
      <div className=" w-[60%]">
        {LabelList1st.map((list, index) => (
          <>
            <div
              className=" flex items-center justify-between my-4"
              key={index}
            >
              <label className="flex" htmlFor="">
                {list.label}
              </label>
              <span>placeholder</span>
            </div>
          </>
        ))}
      </div>
      <hr className=" h-[1px] w-full bg-black my-6" />
      <div className=" w-[60%]">
        {LabelList2nd.map((list, index) => (
          <>
            <div
              className=" flex items-center justify-between my-4"
              key={index}
            >
              <label className="flex" htmlFor="">
                {list.label}
              </label>
              <span>placeholder</span>
            </div>
          </>
        ))}
      </div>
      <hr className=" h-[1px] w-full bg-black my-6" />
      <div className=" w-[60%]">
        {LabelList3rd.map((list, index) => (
          <>
            <div
              className=" flex items-center justify-between my-4"
              key={index}
            >
              <label className="flex" htmlFor="">
                {list.label}
              </label>
              <span>placeholder</span>
            </div>
          </>
        ))}
      </div>
      <hr className=" h-[1px] w-full bg-black my-6" />
      <div className=" w-[60%]">
        {LabelList4th.map((list, index) => (
          <>
            <div
              className=" flex items-center justify-between my-4"
              key={index}
            >
              <label className="flex" htmlFor="">
                {list.label}
              </label>
              <span>placeholder</span>
            </div>
          </>
        ))}
      </div>
      <hr className=" h-[1px] w-full bg-black my-6" />
      <div className=" w-[60%]">
        {LabelList5th.map((list, index) => (
          <>
            <div
              className=" flex items-center justify-between my-4"
              key={index}
            >
              <label className="flex" htmlFor="">
                {list.label}
              </label>
              <span>placeholder</span>
            </div>
          </>
        ))}
      </div>
      <hr className=" h-[1px] w-full bg-black my-6" />
    </div>
    </>
  );
};

export default Page;
