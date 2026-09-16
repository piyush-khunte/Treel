import React from "react";
import { Footer, FooterProps } from "./footer";

export function SurakshaFooter(props: Omit<FooterProps, "variant">) {
  return <Footer variant="master" {...props} />;
}

export default SurakshaFooter;
