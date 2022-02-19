import Image from "next/image";
import useStore from "../store";
import nightwind from "nightwind/helper";
import { useTheme } from "next-themes";

const DarkModeToggle = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();

  const toggle = () => {
    nightwind.beforeTransition();
    if (theme !== "dark") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const isDark = theme === "dark";

  return (
    <div className={`flex items-center justify-center ${className || ""}`}>
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            id="toggle"
            type="checkbox"
            className="sr-only"
            checked={isDark}
            onChange={toggle}
          />
          <div
            className={`block h-8 rounded-full w-14 transition duration-700 ease-in-out border-2 border-gray-300 bg-gray-100}`}
          >
            <div className="flex justify-between m-1.5">
              <Image src="/moon.svg" width={15} height={15} alt="dark" />
              <Image src="/sun.svg" width={15} height={15} alt="light" />
            </div>
          </div>
          <div
            className={`absolute w-4 h-4 transition duration-700 ease-in-out rounded-full dot ${
              !isDark ? "left-2" : "right-2"
            } top-2 bg-gray-900`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default DarkModeToggle;
