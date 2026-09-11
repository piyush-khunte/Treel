import React from "react";
import { Footer, FooterProps } from "./footer";

export function TMIPFooter(props: Omit<FooterProps, "variant">) {
  return <Footer variant="tmip" {...props} />;
}

export const TmipFooter = TMIPFooter;
export default TMIPFooter;
