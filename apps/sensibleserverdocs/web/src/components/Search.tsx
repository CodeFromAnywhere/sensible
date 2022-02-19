import { Svg } from "react-with-native";
import { useSiteParams } from "../hooks/useSiteParams";
import CgSearchIcon from "../../public/CgSearch.svg";
import BsSlashSquareIcon from "../../public/BsSlashSquare.svg";
import { useEffect, useRef, useState } from "react";

const Search = () => {
  const [focusIcon, setFocusIcon] = useState(true);
  const { router, api, searchString } = useSiteParams();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const inputElement = document.getElementById("searchbar");

    document.addEventListener("keydown", (event) => {
      if (event.key === "/") {
        if (document.activeElement !== inputElement) {
          inputRef.current?.focus();
          event.preventDefault();
          setFocusIcon(false);
        }
      }
    });
  }, []);
  const setSearch = (s: string) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          api,
          search: s,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div className="flex flex-row px-4 ml-4 mr-2 my-4 items-center rounded-md bg-gray-200 hover:bg-gray-100">
      <Svg src={CgSearchIcon} className="w-5 h-5" />
      <input
        id="searchbar"
        ref={inputRef}
        value={searchString}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setFocusIcon(true)}
        className="w-full p-3 text-md bg-transparent focus:outline-none"
        placeholder="Search..."
      />
      <Svg
        src={BsSlashSquareIcon}
        className={`w-5 h-5 ${focusIcon ? "block" : "hide"}`}
      />
    </div>
  );
};

export default Search;
