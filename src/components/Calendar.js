"use client";
import { useState } from "react";

export default function Calendar({ onChange, selectedDates = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date(); // Día actual para comparar

  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const weekDays = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isCurrentDay = (day) => {
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + (direction === "next" ? 1 : -1)
    ));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Días vacíos al inicio
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8" />);
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <button
          key={day}
          className={`
            w-8 h-8 flex items-center justify-center rounded-full text-sm hover:bg-[#c9d6ff] cursor-pointer font-medium
            ${isCurrentDay(day) ? "!bg-[#c9d6ff]" : ""}
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="bg-white rounded-lg w-[90%] p-4 max-w-md mx-4 border-none">
      <div className="mb-4 flex items-center justify-between">
        {/* Botón anterior */}
        <button
          onClick={() => navigateMonth("prev")}
          className="rounded-md p-2 hover:bg-[#6467d1]/70 cursor-pointer"
        >

          {/* Botón siguiente */}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
          </svg>
        </button>

      {/* Título del mes y año*/}
        <h2 className="text-lg font-bold">
          {months[currentDate.getMonth()]}, {currentDate.getFullYear()}
        </h2>

        <button
          onClick={() => navigateMonth("next")}
          className="rounded-md p-2 hover:bg-[#6467d1]/70 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
          </svg>
        </button>
      </div>

      <hr className="border-t-2 border-[#6467d1] -mt-2 mb-2" />

      {/* Días de la semana */}
      <div className="grid grid-cols-7 gap-1 text-sm font-medium">
        {weekDays.map((day) => (
          <div key={day} className="py-1 text-gray-500">
            {day}
          </div>
        ))}
        {renderCalendar()}
      </div>
    </div>
  );
}