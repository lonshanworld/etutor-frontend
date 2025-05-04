import { useEffect, useRef, useState, useCallback } from "react";
import NotiList from "./NotiList";

import { useThemeStore } from "@/stores/useThemeStore";
import {
  getNotifications,
  readNotification,
} from "@/api/services/notification";
import { twMerge } from "tailwind-merge";
import { MdNotificationsPaused } from "react-icons/md";
import { useUserStore } from "@/stores/useUserStore";

type NotiProps = {
  isNotiOpen: boolean;
  setNotiOpen: React.Dispatch<React.SetStateAction<boolean>>;
  notiData: any[];
  setNotiData: React.Dispatch<React.SetStateAction<any[]>>;
};

const Notification = ({
  isNotiOpen,
  setNotiOpen,
  notiData,
  setNotiData,
}: NotiProps) => {
  const notiRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const fetchingPages = useRef<Set<number>>(new Set());

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Fetch notifications
  const fetchNoti = useCallback(
    async (pageNum: number) => {
      if (fetchingPages.current.has(pageNum)) return;
      fetchingPages.current.add(pageNum);
      setLoading(true);
      try {
        const response = await getNotifications(pageNum);
        const newData = response?.data || [];

        // Merge and deduplicate
        const combined = [...notiData, ...newData];
        const unique = Array.from(
          new Map(combined.map((s) => [s.id, s])).values()
        );
        setNotiData(unique);

        setHasMore(response.pagination?.has_more_pages ?? false);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setLoading(false);
      }
    },
    [notiData, setNotiData]
  );

  // Handle outside click
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (notiRef.current && !notiRef.current.contains(event.target as Node)) {
        setNotiOpen(false);
      }
    },
    [setNotiOpen]
  );

  useEffect(() => {
    if (isNotiOpen && page === 1 && notiData.length === 0) {
      fetchNoti(1);
    }
  }, [isNotiOpen, fetchNoti, page, notiData]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    if (!isNotiOpen || !hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    const target = bottomRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [isNotiOpen, hasMore, loading]);

  useEffect(() => {
    if (page !== 1) {
      fetchNoti(page);
    }
  }, [page, fetchNoti]);

  const handleRead = async (id: number) => {
    const response = await readNotification(id);
    if (response.message === "Notifications marked as read") {
      setNotiData((prev) => prev.filter((item) => item.id !== id));
    } else {
      fetchNoti(page);
    }
  };

  return (
    <div className="relative">
      {isNotiOpen && (
        <div
          className={twMerge(
            "fixed left-5 top-16 right-5 sm:absolute sm:top-10 sm:left-[-300px] sm:right-0 rounded-lg z-20 bg-notiBg border border-gray-200 shadow-lg min-w-[250px] sm:w-[350px] max-w-[350px] overflow-y-auto p-3 pb-0 custom-scrollbar",
            notiData.length > 0 ? "h-[500px]" : "h-[300px]"
          )}
          ref={notiRef}
        >
          {notiData.length > 0 ? (
            <>
              {notiData.map((item, index) => (
                <NotiList
                  key={item.id}
                  title={
                    item.data.type.charAt(0).toUpperCase() +
                    item.data.type.slice(1).toLowerCase()
                  }
                  body={item.data.message}
                  onClose={() => handleRead(item.id)}
                  createdDate={item.created_at}
                  isLastItem={index === notiData.length - 1}
                />
              ))}
              <div ref={bottomRef} className="h-1 w-full"></div>
              {loading && (
                <div className="flex justify-center mt-2">
                  <div className="w-7 h-7 border-2 border-theme border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </>
          ) : (
            <div className="h-full w-full flex justify-center items-center text-center text-gray-500">
              <div>
                <div className="flex justify-center mb-3">
                  <MdNotificationsPaused className="text-5xl" />
                </div>
                <div className="text-xl font-semibold mb-2">
                  No Notifications Yet
                </div>
                <div className="text-sm w-[300px]">
                  Stay tuned! Notifications about your activity will show up
                  here.
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
