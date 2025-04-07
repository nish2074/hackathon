import React, { useState, useEffect, useRef } from "react";

const AnalogClock = () => {
  const [time, setTime] = useState(new Date());
  const clockRef = useRef(null);
  const [dragging, setDragging] = useState(null);

  const updateTime = (angle, hand) => {
    const newTime = new Date(time);
    if (hand === "hour") {
      newTime.setHours(Math.round(angle / 30) % 12);
    } else if (hand === "minute") {
      newTime.setMinutes(Math.round(angle / 6) % 60);
    } else if (hand === "second") {
      newTime.setSeconds(Math.round(angle / 6) % 60);
    }
    setTime(newTime);
  };

  const getAngle = (x, y) => {
    const rect = clockRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = x - cx;
    const dy = y - cy;
    let angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    return angle < 0 ? angle + 360 : angle;
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const angle = getAngle(e.clientX, e.clientY);
      updateTime(angle, dragging);
    }
  };

  const handleMouseDown = (hand) => {
    setDragging(hand);
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = hours * 30 + minutes * 0.5;

  return (
    <div className="flex flex-col items-center min-h-100 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold my-4 mx-4">Interactive Analog Clock</h1>
      <div
        ref={clockRef}
        className="relative w-56 h-56 bg-white rounded-full border-8 border-gray-800 flex justify-center items-center shadow-2xl"
      >
        {/* Center */}
        <div className="absolute w-4 h-4 bg-gray-800 rounded-full z-10"></div>

        {/* Hour Hand (8:2 ratio) */}
        <div
          className="absolute w-3 h-14 bg-black rounded-lg -mt-15"
          style={{
            transform: `rotate(${hourDeg}deg) translateY(-15%)`,
            transformOrigin: "bottom",
          }}
          onMouseDown={() => handleMouseDown("hour")}
        ></div>

        {/* Minute Hand (8:2 ratio) */}
        <div
          className="absolute w-2 h-20 bg-gray-600 rounded-lg -mt-20"
          style={{
            transform: `rotate(${minuteDeg}deg) translateY(-10%)`,
            transformOrigin: "bottom",
          }}
          onMouseDown={() => handleMouseDown("minute")}
        ></div>

        {/* Second Hand (8:2 ratio) */}
        <div
          className="absolute w-1 h-24 bg-red-600 rounded-lg -mt-22"
          style={{
            transform: `rotate(${secondDeg}deg) translateY(-8%)`,
            transformOrigin: "bottom",
          }}
          onMouseDown={() => handleMouseDown("second")}
        ></div>

        {/* Clock Ticks */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-3 bg-gray-800"
            style={{ transform: `rotate(${i * 30}deg) translateY(-90px)` }}
          ></div>
        ))}
      </div>

      {/* Display Time */}
      <div className="mt-4 text-lg font-semibold">
        {time.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default AnalogClock;
