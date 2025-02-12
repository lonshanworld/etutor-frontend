"use client";

import ErrorPopup from "./components/errorPopup";
import { errorStore } from "@/stores/errorStore";

export default function Home() {
  const { isError } = errorStore();
  return (
    <div>
      {isError && <ErrorPopup />}
      <div className="bg-blue-300 text-font p-5">Page</div>
    </div>
  );
}
