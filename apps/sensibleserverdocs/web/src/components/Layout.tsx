import { Footer } from "./Footer";
import Header from "./Header";

export const Layout = ({ children }: { children: any }) => {
  return (
    <div className="flex flex-col items-center flex-1">
      <div className="w-full lg:h-[10vh] h-[15vh]">
        <Header />
      </div>
      <main className="w-full lg:h-[85vh] h-[80vh] relative flex">
        {children}
      </main>
      <div className="h-[5vh] flex flex-1 justify-center">
        <Footer />
      </div>
    </div>
  );
};
