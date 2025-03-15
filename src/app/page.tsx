import { errorStore } from "@/stores/errorStore";
import ErrorPopup from "@/components/ErrorPopup";

export default function Home() {
  // const { isError } = errorStore();
  return (
    <div>
      {/* {isError && <ErrorPopup />} */}
      <div className="bg-blue-300 text-font p-5">Intro page</div>
    </div>
  );
}
