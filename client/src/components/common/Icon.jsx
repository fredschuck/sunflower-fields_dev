import React from "react";

/**
 * Icon Component
 *
 * A flexible SVG icon system that supports custom paths and predefined icons
 *
 * @param {Object} props - Component props
 * @param {string} props.name - Name of predefined icon or "custom" for custom path
 * @param {string} props.className - CSS classes to apply to the SVG
 * @param {string} props.size - Icon size (width and height)
 * @param {string} props.color - Primary color of the icon
 * @param {string} props.secondaryColor - Secondary color for fills (optional)
 * @param {string} props.customPath - SVG path data for custom icons
 * @param {string} props.label - Accessibility label for the icon
 * @returns {JSX.Element} SVG icon
 */
const Icon = ({
  name = "placeholder",
  className = "",
  size = "24",
  color = "currentColor",
  secondaryColor = "none",
  customPath = "",
  label = "",
  ...props
}) => {
  // Common SVG props
  const svgProps = {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className,
    "aria-hidden": label ? "false" : "true",
    "aria-label": label,
    ...props,
  };

  // Icon path definitions
  const icons = {
    // Essential placeholders and basic UI
    placeholder: (
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        ry="2"
        fill={secondaryColor}
      />
    ),
    circle: <circle cx="12" cy="12" r="10" fill={secondaryColor} />,
    question: (
      <>
        <circle cx="12" cy="12" r="10" fill={secondaryColor} />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </>
    ),

    // Navigation and common UI icons
    home: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
    menu: (
      <>
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </>
    ),
    close: (
      <>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </>
    ),
    logout: (
      <>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </>
    ),

    // Farm management specific icons
    field: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
        <line x1="9" y1="3" x2="9" y2="21" />
        <line x1="15" y1="3" x2="15" y2="21" />
      </>
    ),
    plant: (
      <>
        <path d="M12 22c2-4 4-8 4-12 0-4-2-8-4-8-2 0-4 4-4 8 0 4 2 8 4 12z" />
        <path d="M12 22c-2-4-4-8-4-12 0-4 2-8 4-8 2 0 4 4 4 8 0 4-2 8-4 12z" />
      </>
    ),
    tree: (
      <>
        <path d="M12 22v-5" />
        <path d="M9 7h6l3 5h-12l3-5z" />
        <path d="M7 12h10l2 5h-14l2-5z" />
      </>
    ),
    harvest: (
      <>
        <path d="M6 9l6 6 6-6" />
        <line x1="12" y1="15" x2="12" y2="3" />
        <path d="M8 21h8" />
        <path d="M12 15v6" />
      </>
    ),
    tractor: (
      <>
        {/* Main tractor body */}
        <path d="M19 17h2v-4h-6V8h-6v6H5l1-6h2l1 3h2V7h4v6h4" />

        {/* Wheels */}
        <circle cx="7" cy="17" r="2.5" />
        <circle cx="16" cy="17" r="2.5" />

        {/* Seat */}
        <path d="M14 10c0-1 1-1 1-1h1" />
      </>
    ),
    notes: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </>
    ),
    document: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </>
    ),

    // Calendar and time management
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </>
    ),
    task: (
      <>
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </>
    ),

    // Weather icons
    cloud: <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />,
    rain: (
      <>
        <line x1="16" y1="13" x2="16" y2="21" />
        <line x1="8" y1="13" x2="8" y2="21" />
        <line x1="12" y1="15" x2="12" y2="23" />
        <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </>
    ),
    wind: (
      <>
        <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
      </>
    ),
    thermometer: (
      <>
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
      </>
    ),

    // Alerts and notifications
    alert: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </>
    ),
    warning: (
      <>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </>
    ),
    check: (
      <>
        <polyline points="20 6 9 17 4 12" />
      </>
    ),

    // User and labor
    user: (
      <>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </>
    ),
    users: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),

    // Market and finance
    cart: (
      <>
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </>
    ),
    dollar: (
      <>
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </>
    ),
    chart: (
      <>
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <line x1="3" y1="20" x2="21" y2="20" />
      </>
    ),

    // Direction and navigation
    arrowRight: <polyline points="9 18 15 12 9 6" />,
    arrowLeft: <polyline points="15 18 9 12 15 6" />,
    arrowUp: <polyline points="18 15 12 9 6 15" />,
    arrowDown: <polyline points="6 9 12 15 18 9" />,

    // Farm specific items
    wheat: (
      <>
        {/* Main stem */}
        <line x1="12" y1="3" x2="12" y2="22" />

        {/* Wheat seeds/grains */}
        <path d="M8 7C6.5 5.5 6.5 3.5 8 2C8.5 2.5 9 3 9 4V7" />
        <path d="M16 7C17.5 5.5 17.5 3.5 16 2C15.5 2.5 15 3 15 4V7" />

        <path d="M7 11C5.5 9.5 5.5 7.5 7 6C7.5 6.5 8 7 8 8V11" />
        <path d="M17 11C18.5 9.5 18.5 7.5 17 6C16.5 6.5 16 7 16 8V11" />

        <path d="M6 15C4.5 13.5 4.5 11.5 6 10C6.5 10.5 7 11 7 12V15" />
        <path d="M18 15C19.5 13.5 19.5 11.5 18 10C17.5 10.5 17 11 17 12V15" />

        <path d="M9 19.5C9 18 10.3 16.5 12 16.5C13.7 16.5 15 18 15 19.5" />
      </>
    ),
    water: (
      <>
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </>
    ),
    soil: (
      <>
        <path d="M2 22h20" />
        <path d="M3 18h18" />
        <path d="M4 14h16" />
        <path d="M2 10h20" />
        <path d="M3 6h18" />
        <path d="M4 2h16" />
      </>
    ),

    // Custom icon option
    custom: <path d={customPath} />,
  };

  return (
    <svg {...svgProps}>
      {icons[name] || icons.placeholder}
      {label && name === "placeholder" && (
        <text x="12" y="16" fontSize="10" textAnchor="middle" fill={color}>
          {label.charAt(0)}
        </text>
      )}
    </svg>
  );
};

export default Icon;
