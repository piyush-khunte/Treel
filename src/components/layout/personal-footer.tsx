import React from "react";
import { Footer, FooterProps } from "./footer";

export function PersonalFooter(props: Omit<FooterProps, "variant">) {
  return <Footer variant="personal" {...props} />;
}

export default PersonalFooter;
