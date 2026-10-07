import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** Shared stroke-based icon wrapper (lucide-style, 24px grid). */
function Base({ className, children, ...props }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const FlowerMark = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="6.5" r="2.6" />
    <circle cx="17.2" cy="10" r="2.6" />
    <circle cx="15.2" cy="16" r="2.6" />
    <circle cx="8.8" cy="16" r="2.6" />
    <circle cx="6.8" cy="10" r="2.6" />
    <circle cx="12" cy="11.8" r="2" fill="currentColor" stroke="none" />
  </Base>
);

export const CartIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="8" cy="20.5" r="1.4" />
    <circle cx="18" cy="20.5" r="1.4" />
    <path d="M2.5 3.5h2l2.5 11.6a1.8 1.8 0 0 0 1.8 1.4h8.6a1.8 1.8 0 0 0 1.8-1.4L21 7.5H5.6" />
  </Base>
);

export const MenuIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 6.5h16M4 12h16M4 17.5h16" />
  </Base>
);

export const CloseIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Base>
);

export const LeafIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z" />
    <path d="M2 21c0-3 1.9-5.4 5.1-6C9.5 14.5 12 13 13 12" />
  </Base>
);

export const TruckIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
    <circle cx="17" cy="18" r="2" />
    <circle cx="7" cy="18" r="2" />
  </Base>
);

export const StarIcon = (p: IconProps) => (
  <Base {...p} fill="currentColor" stroke="none">
    <path d="M12 2.8l2.8 5.6 6.2.9-4.5 4.4 1.1 6.2L12 17l-5.6 2.9 1.1-6.2L3 9.3l6.2-.9L12 2.8z" />
  </Base>
);

export const CheckIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4.5 12.8l4.8 4.7L19.5 6.5" />
  </Base>
);

export const CakeIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 20.5h16" />
    <path d="M5.5 20.5v-6a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v6" />
    <path d="M12 12.5V10" />
    <path d="M12 10c-1.2 0-2-1.6-1.2-2.8.3-.5 1.2-.5 1.2-.5s.9 0 1.2.5C14 8.4 13.2 10 12 10z" />
    <path d="M6 16.5c1.5 1.2 3-1 4 0s3-1 4 0 3-1 4 0" />
  </Base>
);

export const RingsIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="9.3" cy="14.5" r="4.8" />
    <circle cx="14.7" cy="14.5" r="4.8" />
    <path d="M12 3l2 2.5h-4L12 3z" />
  </Base>
);

export const SprigIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21V7" />
    <path d="M12 11c-3.2 0-5.5-2.3-5.5-5.5C9.7 5.5 12 7.8 12 11z" />
    <path d="M12 11c3.2 0 5.5-2.3 5.5-5.5C14.3 5.5 12 7.8 12 11z" />
    <path d="M12 7c-2.4 0-4-1.6-4-4 2.4 0 4 1.6 4 4z" />
  </Base>
);

export const SunIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="3.8" />
    <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6" />
  </Base>
);

export const TrophyIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M8 4h8v5a4 4 0 0 1-8 0V4z" />
    <path d="M8 5H5a3 3 0 0 0 3.2 3.9M16 5h3a3 3 0 0 1-3.2 3.9" />
    <path d="M12 13v3" />
    <path d="M9 20h6" />
    <path d="M10 16.5h4l.7 3.5H9.3l.7-3.5z" />
  </Base>
);

export const HeartIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 20.3S4.3 15.6 3 11.2C2 7.8 4.3 5 7.3 5c1.9 0 3.6 1 4.7 2.7C13.1 6 14.8 5 16.7 5c3 0 5.3 2.8 4.3 6.2-1.3 4.4-9 9.1-9 9.1z" />
  </Base>
);

export const TrashIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.5 6.5h17" />
    <path d="M9 6.5V5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5v1.5" />
    <path d="M6 6.5l1 12.1a2 2 0 0 0 2 1.9h6a2 2 0 0 0 2-1.9l1-12.1" />
    <path d="M10 11v6M14 11v6" />
  </Base>
);

export const PlusIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 5.5v13M5.5 12h13" />
  </Base>
);

export const MinusIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5.5 12h13" />
  </Base>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4.5 12h14M13 6.5l5.5 5.5-5.5 5.5" />
  </Base>
);

export const LockIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
    <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
  </Base>
);

export const MailIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M3.5 7.5L12 13l8.5-5.5" />
  </Base>
);

export const PhoneIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5.5 3.5h3L10 8 7.8 9.8a12.5 12.5 0 0 0 6.4 6.4L16 14l4.5 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.7 2 2 0 0 1 5.5 3.5z" />
  </Base>
);

export const PinIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21.5s-7-6.3-7-11.5a7 7 0 0 1 14 0c0 5.2-7 11.5-7 11.5z" />
    <circle cx="12" cy="10" r="2.6" />
  </Base>
);

export const SendIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M21 3L10.5 13.5" />
    <path d="M21 3l-6.8 18-3.7-7.5L3 9.8 21 3z" />
  </Base>
);

export const InstagramIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
  </Base>
);

export const FacebookIcon = (p: IconProps) => (
  <Base {...p} fill="currentColor" stroke="none">
    <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2-.1-2.1 0-3.5 1.3-3.5 3.6V11H8.5v3h2.4v7h2.6z" />
  </Base>
);

export const XIcon = (p: IconProps) => (
  <Base {...p} fill="currentColor" stroke="none">
    <path d="M17.8 3h3l-6.6 7.6L22 21h-6.1l-4.8-6.3L5.6 21h-3l7.1-8.1L2 3h6.3l4.3 5.7L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z" />
  </Base>
);
