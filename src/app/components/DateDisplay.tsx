"use client";

import { useEffect, useState } from "react";

export default function DateDisplay() {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
      })
    );
  }, []);

  return <span>{date || "তারিখ লোড হচ্ছে..."}</span>;
}