import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { mon, sat, wed } from "../utils/data";
import { useToast } from "@chakra-ui/react";

const renderTimeSlot = (el, onClick) => (
  <div
    key={el.time}
    onClick={onClick}
    className={`w-full p-2 text-center rounded ${
      !el.status
        ? "bg-gray-300 text-black-700 cursor-not-allowed"
        : "bg-blue-500 text-white cursor-pointer"
    }`}
  >
    {el.time}
  </div>
);

function BookSlots() {
  const [value, onChange] = useState(new Date());
  const [day, setday] = useState("mon");
  const toast = useToast();
  useEffect(() => {
    setday(value.toDateString().split(" ")[0]);
  }, [value]);
  const booked = () => {
    toast({
      title: "Available",
      description: "This Time Slot Is Available.",
      status: "success",
      duration: 2000,
      position: "top",
      isClosable: true,
    });
  };

  const notBooked = () => {
    toast({
      title: "Closed",
      description: "This Time Slot Is Not Available.",
      status: "warning",
      duration: 2000,
      position: "top",
      isClosable: true,
    });
  };

  const renderDayContent = () => {
    switch (day) {
      case "Mon":
      case "Tue":
      case "Thu":
      case "Fri":
        return mon.map((el) =>
          renderTimeSlot(el, () => (!el.status ? notBooked() : booked()))
        );
      case "Wed":
        return wed.map((el) =>
          renderTimeSlot(el, () => (!el.status ? notBooked() : booked()))
        );
      case "Sat":
        return sat.map((el) =>
          renderTimeSlot(el, () => (!el.status ? notBooked() : booked()))
        );
      case "Sun":
        return <div className="text-red-500 text-lg"> holiday!</div>;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="box">
        <div className="mb-8 mt-10 text-3xl font-bold text-blue-600 m-auto text-center">
          Check Available Slots :-
        </div>
        <div className=" flex justify-center items-center gap-4 m-auto mt-[50px] p-0 h-550">
          <div className="p-4">
            <div className="mx-auto gap-30 text-23 font-bold text-center text-rgb-65-65-27 mb-30">
              {value.toDateString().split(" ")[2]}-
              {value.toDateString().split(" ")[1]}-
              {value.toDateString().split(" ")[3]}
            </div>
            <Calendar
              onChange={onChange}
              value={value}
              className="border-2 border-gray-300 p-4 rounded-md mb-4 md:mb-0 md:mr-4"
            />
          </div>

          <div className="box">
            <div className="text-center pb-6 text-lg font-semibold text-gray-800">
              Time Slots :-
            </div>

            <div className="grid grid-cols-4 gap-4 w-full md:w-400 mx-auto">
              {renderDayContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookSlots;
