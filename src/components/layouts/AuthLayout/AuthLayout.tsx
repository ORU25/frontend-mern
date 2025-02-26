import PageHead from "@/components/commons/PageHead";
import { ReactNode } from "react";

interface PropTypes {
  title?: string;
  children: ReactNode;
}

const AuthLayout = (props: PropTypes) => {
  const { title, children } = props;
  return (
    <>
      <PageHead title={title} />
      <section className=" 3xl:container p-6">{children}</section>
      {/* <section className="">{children}</section> */}
    </>
  );
};

export default AuthLayout;