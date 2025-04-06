"use client";
import { AppRouter } from "@/router";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";

const DraggableButton = () => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({
    x: typeof window !== "undefined" ? window.innerWidth - 370 : 50,
    y: 50,
  });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const router = useRouter();

  const { viewUser, setViewUser } = useUserStore();

  const MIN_TOP = 10;
  const MIN_LEFT = 10;
  const MIN_BOTTOM = 10;
  const MIN_RIGHT = 10;

  // Load saved position from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("draggable-position");
    if (saved) {
      setPosition(JSON.parse(saved));
    }
  }, []);

  // Save position to localStorage on change
  useEffect(() => {
    localStorage.setItem("draggable-position", JSON.stringify(position));
  }, [position]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging && buttonRef.current) {
      const button = buttonRef.current;
      const buttonWidth = button.offsetWidth;
      const buttonHeight = button.offsetHeight;
      const maxX = window.innerWidth - buttonWidth - MIN_RIGHT;
      const maxY = window.innerHeight - buttonHeight - MIN_BOTTOM;

      const newX = Math.max(MIN_LEFT, Math.min(e.clientX - offset.x, maxX));
      const newY = Math.max(MIN_TOP, Math.min(e.clientY - offset.y, maxY));

      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, offset]);

  const handleLeave = () => {
    console.log("clicked");
    setViewUser(null);
    // router.push();
    Cookies.remove("viewUser");
    window.location.href = AppRouter.staffDashboardStaff;
  };

  return (
    <div
      ref={buttonRef}
      onMouseDown={handleMouseDown}
      className="fixed z-[9999] bg-gray-500/80 text-white cursor-move px-3 py-2 rounded-xl shadow-xl min-w-[300px]"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div className="flex justify-between items-center gap-4 text-sm">
        <span className="whitespace-nowrap">
          You're accessing <b className="">{viewUser?.firstName}'s</b> account.
        </span>
        <button
          className="bg-theme px-3 py-1 rounded-md text-white select-none opacity-[1]"
          onClick={handleLeave}
        >
          Leave
        </button>
      </div>
    </div>
  );
};

export default DraggableButton;
