import { useRouter } from "next/router";
import { getQueryStrings } from "../../util/util";
import Select from "./Select";
const ChooseSection = () => {
  const router = useRouter();
  const { url } = getQueryStrings(router.query);
  const options = [
    { value: "docs", label: "Documentation" },
    { value: "apps", label: "Apps & Packages" },
    { value: "models", label: "Models & Type Definitions" },
    //{ value: "errors", label: "Errors" },
    // { value: "recent", label: "Recent" },
    //{ value: "ui", label: "UI" },
  ];

  const section = router.asPath.split("/")[2];

  return (
    <Select
      value={section}
      onChange={(e) => {
        router.push(`/${url}/${e.target.value}`);
      }}
      options={options}
    />
  );
};

export default ChooseSection;
