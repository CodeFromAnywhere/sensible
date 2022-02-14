import { Button as RWNButton } from "react-with-native";

export const Button = ({
  title,
  onClick,
}: {
  title: string;
  onClick: () => void;
}) => {
  return (
    <RWNButton className="bg-gray" onClick={onClick}>
      {title}
    </RWNButton>
  );
};
