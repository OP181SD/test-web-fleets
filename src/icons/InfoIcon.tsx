import type { SVGProps } from "react";

export const InfoIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 7.5H10.0083M9.1667 10H10V13.3333H10.8333M2.5 10C2.5 10.9849 2.694 11.9602 3.0709 12.8701C3.4478 13.7801 4.0003 14.6069 4.6967 15.3033C5.3931 15.9997 6.2199 16.5522 7.1299 16.9291C8.0398 17.306 9.0151 17.5 10 17.5C10.9849 17.5 11.9602 17.306 12.8701 16.9291C13.7801 16.5522 14.6069 15.9997 15.3033 15.3033C15.9997 14.6069 16.5522 13.7801 16.9291 12.8701C17.306 11.9602 17.5 10.9849 17.5 10C17.5 8.0109 16.7098 6.1032 15.3033 4.6967C13.8968 3.29018 11.9891 2.5 10 2.5C8.0109 2.5 6.1032 3.29018 4.6967 4.6967C3.2902 6.1032 2.5 8.0109 2.5 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
