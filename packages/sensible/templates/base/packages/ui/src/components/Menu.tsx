import { Button, Div, Li, Span, Ul } from "react-with-native";
import pages, { getPageTitle } from "../pages";
import { useRouter } from "react-with-native-router";

const Menu = () => {
  const router = useRouter();

  return (
    <Ul className="w-full">
      {pages.map((page) => {
        if (page?.hideFromMenu) return;

        const title = getPageTitle(page);
        return (
          <Li key={`page${page.key}`} className="w-full">
            <Button
              className="p-4 border-b bg-white border-b-gray-300 w-full flex flex-row items-center justify-between"
              textClassName="text-xl hover:text-blue-800"
              onClick={() => router.push(page.key === "index" ? "/" : page.key)}
            >
              <Span>{title}</Span>
              <Span textClassName="text-3xl">›</Span>
            </Button>
          </Li>
        );
      })}
    </Ul>
  );
};

export default Menu;
