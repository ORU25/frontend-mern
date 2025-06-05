import PageHead from "@/components/commons/PageHead";
import { div } from "framer-motion/client";
import { Fragment, ReactNode } from "react";

interface PropTypes {
  children: ReactNode;
  title?: string;
}

const AuthLayout = (props: PropTypes) => {
  const { children, title } = props;
  return (
    <div className="flex min-h-screen min-w-full flex-col items-center justify-center gap-10 py-10 lg:py-0">
      <Fragment>
        <PageHead title={title} />
        <section className=" 3xl:container p-6">{children}</section>
      </Fragment>
    </div>
  );
};

export default AuthLayout;
