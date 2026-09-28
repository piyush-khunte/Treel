import React from "react";
import { SurakshaHeader } from "@/components/layout/suraksha-header";
import { SurakshaHighwayHelpBar } from "@/components/layout/suraksha-highway-help-bar";
import { SurakshaFloatingWhatsApp } from "@/components/suraksha/suraksha-floating-whatsapp";

export default function SurakshaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="suraksha-page min-h-screen bg-[#FEF3C7] text-[#451A03] font-rubik antialiased selection:bg-[#DC2626]/20 selection:text-[#451A03]">
      {/* 8 Regional Baloo Google Fonts exclusively for Suraksha */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700&family=Baloo+Chettan+2:wght@500;600;700&family=Baloo+Bhai+2:wght@500;600;700&family=Baloo+Thambi+2:wght@500;600;700&family=Baloo+Tammudu+2:wght@500;600;700&family=Baloo+Tamma+2:wght@500;600;700&family=Baloo+Paaji+2:wght@500;600;700&family=Baloo+Da+2:wght@500;600;700&display=swap"
      />
      {/* Suraksha Multilingual Rotator Zero-CLS CSS */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .srk-rotator {
              display: grid;
              position: relative;
            }
            .srk-rotator .srk-line {
              grid-area: 1 / 1;
              opacity: 0;
              transform: translateY(0.35em);
              transition: opacity 450ms ease, transform 450ms ease;
              pointer-events: none;
            }
            .srk-rotator .srk-line.is-active {
              opacity: 1;
              transform: none;
              pointer-events: auto;
            }
            .srk-rotator .srk-sr {
              position: absolute;
              width: 1px;
              height: 1px;
              overflow: hidden;
              clip: rect(0 0 0 0);
              white-space: nowrap;
            }
            @media (prefers-reduced-motion: reduce) {
              .srk-rotator .srk-line {
                transition: none !important;
                transform: none !important;
              }
            }
          `,
        }}
      />
      <SurakshaHeader />
      <main id="suraksha-main">{children}</main>
      <SurakshaHighwayHelpBar />
      <SurakshaFloatingWhatsApp />
    </div>
  );
}
