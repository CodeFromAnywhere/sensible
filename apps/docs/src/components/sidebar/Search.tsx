import { Svg } from "react-with-native";
import CgSearchIcon from "../../../public/CgSearch.svg";
import BsSlashSquareIcon from "../../../public/BsSlashSquare.svg";
import FaRegWindowCloseIcon from "../../../public/FaRegWindowClose.svg";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "react-with-native-router";
import { getQueryStrings, shallowPush } from "../../util/util";

const Search = () => {
  const router = useRouter();
  const { search } = getQueryStrings(router.query);

  const [focusIcon, setFocusIcon] = useState(true);
  const hasSearchEntered = search && search.length > 0;
  const inputRef = useRef<HTMLInputElement>(null);

  const focusListener = (event: KeyboardEvent) => {
    const inputElement = document.getElementById("searchbar");
    if (event.key === "/" && document.activeElement !== inputElement) {
      inputRef.current?.focus();
      event.preventDefault();
      setFocusIcon(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", focusListener);
    return () => document.removeEventListener("keydown", focusListener);
  }, []);

  return (
    <div className="flex flex-row px-4 ml-4 mr-2 my-4 items-center rounded-md bg-gray-200 hover:bg-gray-100">
      <Svg src={CgSearchIcon} className="w-5 h-5" />
      <input
        id="searchbar"
        ref={inputRef}
        value={search}
        onChange={(e) => shallowPush(router, "search", e.target.value)}
        onFocus={() => setFocusIcon(false)}
        onBlur={() => setFocusIcon(true)}
        className="w-full p-3 text-md bg-transparent focus:outline-none"
        placeholder="Search..."
      />
      {focusIcon || hasSearchEntered ? (
        <div
          className={hasSearchEntered ? "cursor-pointer" : undefined}
          onClick={() => shallowPush(router, "search", "")}
        >
          <Svg
            src={hasSearchEntered ? FaRegWindowCloseIcon : BsSlashSquareIcon}
            className={`w-5 h-5 block`}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Search;
