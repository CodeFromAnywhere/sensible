import { Div, P, Span } from "react-with-native";
import { api } from "../api";
import { useEffect, useState } from "react";
import { Form, InputValues } from "../components/Form";
import useStore from "../store";
import { RWNPage } from "../types";
import { MessageType, PublicUserType } from "core";

// Now your form can be rendered like this
// Make sure to provide the generic based on the inputs type interfaces
// otherwise your form won't be typesafe!

const Page: RWNPage = () => {
  const [loginToken] = useStore("loginToken");
  const [users, setUsers] = useState<PublicUserType[]>([]);

  const fetchUsers = async () => {
    const { users } = await api("users", "GET");
    setUsers(users);
  };

  const renderUser = (user: PublicUserType, index: number) => {
    return (
      <Div key={`user${user.id}`}>
        <P>
          <Span textClassName="font-bold">{user.email}</Span>
        </P>
      </Div>
    );
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Div scroll className="py-4 px-8 lg:px-20">
      {users.map(renderUser)}
    </Div>
  );
};

Page.options = {};

export default Page;
