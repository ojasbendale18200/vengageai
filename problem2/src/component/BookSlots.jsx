import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function BookSlots() {
  const generateTimeSlots = (date, startHour, endHour, unavailableRanges) => {
    const timeSlots = [];

    for (let i = startHour; i < endHour; i++) {
      const slotTime = new Date(date);
      slotTime.setHours(i, 0, 0);
      const isUnavailable = checkUnavailable(slotTime, unavailableRanges);
      timeSlots.push({ time: slotTime, isUnavailable });
    }

    return timeSlots;
  };

  const checkUnavailable = (time, unavailableRanges) => {
    for (const [start, end] of unavailableRanges) {
      if (time >= start && time < end) {
        return true;
      }
    }
    return false;
  };

  const dayDetails = {
    Monday: {
      startHour: 8,
      endHour: 17,
      unavailableRanges: [
        [12, 30],
        [13, 0],
      ],
    },
    Tuesday: {
      startHour: 8,
      endHour: 17,
      unavailableRanges: [
        [12, 30],
        [13, 0],
      ],
    },
    Wednesday: {
      startHour: 8,
      endHour: 17,
      unavailableRanges: [
        [12, 30],
        [13, 0],
        [15, 30],
        [16, 30],
      ],
    },
    Thursday: {
      startHour: 8,
      endHour: 17,
      unavailableRanges: [
        [12, 30],
        [13, 0],
      ],
    },
    Friday: {
      startHour: 8,
      endHour: 17,
      unavailableRanges: [
        [12, 30],
        [13, 0],
      ],
    },
    Saturday: { startHour: 8, endHour: 12, unavailableRanges: [] },
    Sunday: { startHour: 0, endHour: 0, unavailableRanges: [] }, // Holiday
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    const bookedSlotsData = [
      new Date(new Date().setHours(11, 0, 0)),
      new Date(new Date().setHours(14, 0, 0)),
    ];
    setBookedSlots(bookedSlotsData);
  }, []);

  const dayDetail =
    dayDetails[selectedDate.toLocaleDateString("en-US", { weekday: "long" })];

  const timeSlots = dayDetail
    ? generateTimeSlots(
        selectedDate,
        dayDetail.startHour,
        dayDetail.endHour,
        dayDetail.unavailableRanges
      )
    : [];

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  return (
    <>
      <h1 className="mb-8 mt-10 text-3xl font-bold text-blue-600 m-auto text-center">
        Slot Booking
      </h1>
      <div className="flex flex-col md:flex-row mx-auto items-center justify-center">
        <Calendar
          className="border-2 border-gray-300 p-4 rounded-md mb-4 md:mb-0 md:mr-4"
          onChange={handleDateChange}
          value={selectedDate}
        />
        <div className="p-8">
          {selectedDate && (
            <>
              <p className="mb-4 text-lg font-semibold text-gray-800">
                Select a time slot:
              </p>
              <div className="grid grid-cols-4 gap-4 w-full md:w-400 mx-auto">
                {timeSlots.map(({ time, isUnavailable }) => (
                  <div key={time.toISOString()}>
                    <button
                      className={`w-full p-2 text-center rounded ${
                        isUnavailable
                          ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                          : bookedSlots.some(
                              (bookedTime) =>
                                bookedTime.getTime() === time.getTime()
                            )
                          ? "bg-gray-300 text-white cursor-not-allowed"
                          : selectedTime === time
                          ? "bg-teal-500 text-white"
                          : "bg-blue-500 text-white"
                      }`}
                      onClick={() => handleTimeClick(time)}
                      disabled={
                        isUnavailable ||
                        bookedSlots.some(
                          (bookedTime) =>
                            bookedTime.getTime() === time.getTime()
                        )
                      }
                    >
                      {time.toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
          <div className="mt-8 text-center">
            <p className="text-xl font-semibold mb-2">
              Selected Date:{" "}
              <span className="text-blue-500">
                {selectedDate
                  ? selectedDate.toLocaleDateString("en-US")
                  : "None"}
              </span>
            </p>
            <p className="text-xl font-semibold mb-4">
              Selected Time:{" "}
              <span className="text-green-500">
                {selectedTime ? selectedTime.toLocaleString() : "None"}
              </span>
            </p>
          </div>

          {dayDetail && dayDetail.startHour === 0 ? (
            <p className="text-lg mt-4 text-red-500">
              Hey, it's a holiday! No slots available on Sundays.
            </p>
          ) : (
            <button
              className="bg-green-500 mt-4 py-2 px-4 text-white rounded hover:bg-green-600 focus:outline-none"
              onClick={() => alert("Your Slot Booking Confirmed")}
            >
              Book
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default BookSlots;
