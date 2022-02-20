import { Footer } from "./Footer";
import Header from "./Header";

export const Layout = ({ children }: { children: any }) => {
  return (
    <div className="flex flex-col items-center flex-1">
      <div className="h-[10vh] w-full">
        <Header />
      </div>
      <main className="w-full h-[80vh] relative flex">{children}</main>
      <div className="h-[10vh]">
        <Footer />
      </div>
    </div>
  );
};
