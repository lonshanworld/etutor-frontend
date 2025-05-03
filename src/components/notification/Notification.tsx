import NotiLight from "@/assets/svgs/notifications/notiLight.svg";
import NotiDark from "@/assets/svgs/noti.svg";
import { useEffect, useRef, useState } from "react";
import NotiList from "./NotiList";

import { useThemeStore } from "@/stores/useThemeStore";
import {
  getNotifications,
  readNotification,
} from "@/api/services/notification";
import { twMerge } from "tailwind-merge";

import { MdNotificationsPaused } from "react-icons/md";

const Notification = () => {
  const [isNotiOpen, setNotiOpen] = useState(false);
  const { theme } = useThemeStore();
  const [notiData, setNotiData] = useState<any[]>([]);

  const notiRef = useRef<HTMLDivElement | null>(null);
  const notiOpenRef = useRef<HTMLImageElement | null>(null);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Initial load when component mounts
    fetchNoti(1);
  }, []);

  useEffect(() => {
    if (loading || !isNotiOpen) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [isNotiOpen, loading, hasMore]);

  useEffect(() => {
    fetchNoti(page); // Normal loading when page changes
  }, [page]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      notiOpenRef.current &&
      !notiOpenRef.current.contains(event.target as Node) &&
      notiRef.current &&
      !notiRef.current.contains(event.target as Node)
    ) {
      setNotiOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchNoti = async (page: number) => {
    try {
      setLoading(true);
      const response = await getNotifications(page);
      const unreadNoti = response?.data?.filter(
        (noti: any) => noti.read_at === null
      );

      if (unreadNoti.length === 0 && page < response.pagination.last_page) {
        // Automatically load the next page if no "Unassigned" students found
        fetchNoti(page + 1);
        return;
      }

      // Combine old and new, then remove duplicates by ID
      setNotiData((prev) => {
        const combined = [...prev, ...unreadNoti];
        const unique = Array.from(
          new Map(combined.map((s) => [s.id, s])).values()
        );
        return unique;
      });

      setHasMore(response.pagination.has_more_pages);

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch noti:", error);
      setLoading(false);
    }
  };

  const openNoti = () => {
    setNotiOpen(!isNotiOpen);
  };

  const readNoti = async (id: number) => {
    const response = await readNotification(id);
    if (response.message == "Notifications marked as read") {
      const newNotiData = notiData.filter((item) => item.id !== id);
      setNotiData(newNotiData);
    } else {
      await fetchNoti(page);
    }
  };
  return (
    <div className="relative">
      <div className="relative">
        <img
          src={theme === "light" ? NotiLight.src : NotiDark.src}
          className="cursor-pointer"
          ref={notiOpenRef}
          alt=""
          onClick={openNoti}
        />
        {notiData.length > 0 && (
          <div className="absolute top-[5px] left-[17px] w-[6px] h-[6px] bg-red-500 rounded-full"></div>
        )}
      </div>
      {isNotiOpen && (
        <div
          className={twMerge(
            "fixed left-5 top-16 right-5 sm:absolute sm:top-10 sm:left-[-300px] sm:right-0 rounded-lg z-20 bg-notiBg border border-gray-200 shadow-lg min-w-[250px] sm:w-[350px] max-w-[350px] overflow-y-auto p-3 custom-scrollbar",
            notiData.length > 0 ? "h-[500px]" : "h-[300px]"
          )}
          ref={notiRef}
        >
          {notiData.length > 0 &&
            notiData.map((item) => (
              <div key={item.id}>
                <NotiList
                  title={
                    item.data.type.charAt(0).toUpperCase() +
                    item.data.type.slice(1).toLowerCase()
                  }
                  body={item.data.message}
                  onClose={() => readNoti(item.id)}
                  createdDate={item.created_at}
                />
              </div>
            ))}

          {notiData.length === 0 && (
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
          {notiData.length > 0 && (
            <div ref={bottomRef} className="h-1 w-full"></div>
          )}
          {loading && (
            <div className="flex justify-center mt-2">
              <div className="w-7 h-7 border-2 border-theme border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
