import React from "react";

const CircularProgress = ({ percentage }) => {
  const circleRadius = 50; // Radius of the circle
  const strokeWidth = 8; // Width of the stroke
  const circumference = 2 * Math.PI * circleRadius; // Circumference of the circle
  const progressOffset = circumference - (percentage / 100) * circumference;

  // Determine color based on percentage
//   const getColor = (percent) => {
//     if (percent >= 75) return "text-green-500"; // Green for 75% and above
//     if (percent >= 50) return "text-yellow-500"; // Yellow for 50%-74%
//     if (percent >= 25) return "text-orange-500"; // Orange for 25%-49%
//     return "text-red-500"; // Red for below 25%
//   };
const getColor = (percent) => {
    if (percent <= 20) return "stroke-red-500";   // 0-20% -> Red
    if (percent <= 40) return "stroke-orange-500"; // 21-40% -> Orange
    if (percent <= 60) return "stroke-yellow-500"; // 41-60% -> Yellow
    if (percent <= 80) return "stroke-green-500";  // 61-80% -> Green
    return "stroke-blue-500";                      // 81-100% -> Blue
  };
  
  return (
    <div className="relative flex items-center justify-center ">
      {/* Background Circle */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 120 120"
        className="rotate-[-90deg]"
      >
        <circle
          cx="60"
          cy="60"
          r={circleRadius}
          strokeWidth={strokeWidth}
          className="text-gray-300"
          stroke="currentColor"
          fill="none"
        />
        {/* Progress Circle */}
        <circle
          cx="60"
          cy="60"
          r={circleRadius}
          strokeWidth={strokeWidth}
          className={getColor(percentage)}
          stroke="currentColor"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          strokeLinecap="round"
        />
      </svg>
      {/* Percentage Text */}
      <span className="absolute text-xs big font-semibold text-white">
        {percentage} <sup className="text-[9px]">%</sup>
      </span>
    </div>

// <div className="flex  gap-4">
// <CircularProgress percentage={95} />
// <CircularProgress percentage={50} />
// <CircularProgress percentage={15} />
// </div>
  );
};

export default CircularProgress;
