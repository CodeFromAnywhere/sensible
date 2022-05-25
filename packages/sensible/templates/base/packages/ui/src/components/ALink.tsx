import Link, { LinkProps } from "next/link";
import { A, AType } from "react-with-native";

const ALink = ({
  children,
  href,
  target,
  rel,
  linkProps,
  ...otherAProps
}: { linkProps?: LinkProps } & AType) => {
  return (
    <Link {...linkProps} href={href || "#"} passHref>
      <A {...otherAProps} rel={rel} target={target}>
        {children}
      </A>
    </Link>
  );
};

export default ALink;
