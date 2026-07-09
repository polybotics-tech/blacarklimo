import { DefaultFooter } from "@/src/components/reuseable/Footer";
import { DefaultNavigation } from "@/src/components/reuseable/Navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DefaultNavigation />
      {children}
      <DefaultFooter />
    </>
  );
};

export default Layout;
