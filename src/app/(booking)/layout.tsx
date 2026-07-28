import { BookingNavigation } from "@/src/components/reuseable/Navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <BookingNavigation>{children}</BookingNavigation>;
};

export default Layout;
