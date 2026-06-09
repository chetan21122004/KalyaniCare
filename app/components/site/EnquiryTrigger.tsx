"use client";

import { openEnquiryPopup } from "@/lib/openEnquiry";
import { homeSection } from "@/lib/siteNav";

type EnquiryTriggerProps = React.ComponentPropsWithoutRef<"a">;

export function EnquiryTrigger({ href, onClick, children, ...props }: EnquiryTriggerProps) {
  return (
    <a
      href={href ?? homeSection("enquiry")}
      onClick={(e) => {
        openEnquiryPopup(e);
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
