export function openEnquiryPopup(e?: { preventDefault?: () => void }) {
  e?.preventDefault?.();
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openEnquiryPopup"));
  }
}
