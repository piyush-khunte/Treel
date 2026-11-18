import React from "react";

/**
 * Visually hidden spam trap. Real visitors never see or fill it; automated
 * submitters that fill every input do, and the server then discards the lead.
 * Send its value as `website` in the form payload.
 */
export const HoneypotField = React.forwardRef<HTMLInputElement>(function HoneypotField(_props, ref) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
      <label>
        Website
        <input ref={ref} type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
});
