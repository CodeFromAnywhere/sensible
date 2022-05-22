import { P, Button as RWNButton } from "react-with-native";

const Button = ({ onClick, title }: { onClick: () => void; title: string }) => {
  return (
    <RWNButton className="border p-2" onClick={onClick}>
      <P>{title}</P>
    </RWNButton>
  );
};

export default Button;
