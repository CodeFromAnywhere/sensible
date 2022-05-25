import { A } from "react-with-native";
import type { ALinkType } from "./ALink.type";

const ALink = ({
  children,
  href,
  target,
  rel,
  linkProps,
  ...otherAProps
}: ALinkType) => {
  return (
    <A href={href} {...otherAProps} rel={rel} target={target}>
      {children}
    </A>
  );
};

export default ALink;
