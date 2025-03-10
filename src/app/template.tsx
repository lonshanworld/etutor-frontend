"use client";

export default function MainTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { setError } = errorStore();
  return (
    <>
      {/* <div className="flex gap-5 m-3">
                <ToggleTheme />
                    <div>
                        <button
                        onClick={() => setError("Login Failed!")}
                        className="p-2 rounded-md border transition duration-300 bg-white text-black"
                        >
                        Show Error
                        </button>
                    </div>
                    </div>
                    <div
                    className={`w-full h-[500px] bg-background text-font transition-all duration-500`}
                    >
                Layout
            </div> */}
      {children}
    </>
  );
}
