import { Button, Div, P } from "react-with-native";
import { toast } from "react-with-native-notification";
import { useModal } from "react-with-native-modal";
import { RWNPage } from "../types";
import { CodeLink } from "../components";
import { useAlert } from "react-with-native-alert";
const Page: RWNPage = () => {
  // fix this
  const alert = useAlert();
  const { handleModal } = useModal();
  return (
    <Div className="p-4 lg:p-20">
      <Div className="flex justify-end flex-row">
        <CodeLink pageKey="utilities" />
      </Div>
      <Div>
        <Button
          onClick={() => toast({ title: "Yes yes", body: "This is a toast" })}
          className="m-2 bg-black p-2 rounded-xl"
          textClassName="text-white text-center"
        >
          Get a notification
        </Button>

        <Button
          //@ts-ignore
          onClick={() => {
            console.log({ alert });

            alert?.("Test alert", "test body");
          }}
          className="m-2 bg-black p-2 rounded-xl"
          textClassName="text-white text-center"
        >
          Get an alert
        </Button>

        <Button
          onClick={() => handleModal?.(<Div>TEST</Div>, "Title")}
          className="m-2 bg-black p-2 rounded-xl"
          textClassName="text-white text-center"
        >
          Get modal
        </Button>
      </Div>
    </Div>
  );
};

Page.options = {};
export default Page;
