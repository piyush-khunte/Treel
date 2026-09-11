import React from "react";
import { Footer, FooterProps } from "./footer";

export function SurakshaFooter(props: Omit<FooterProps, "variant">) {
  return <Footer variant="suraksha" {...props} />;
}

export default SurakshaFooter;
