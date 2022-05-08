import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import React, { useEffect } from "react";

const Home = () => {
  const intro = useBaseUrl("/docs/introduction/intro");
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.href = intro;
    }
  }, []);
  return <Layout>You are being redirected</Layout>;
};

export default Home;
