"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Children,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/**
 * Individual Dock Item (icon + label)
 */
function DockItem({
  children,
  className = "",
  onClick,
  mouseY,
  spring,
  distance,
  magnification,
  baseItemSize,
}) {
  const ref = useRef(null);
  const isHovered = useMotionValue(0);

  // Calculate distance from mouse to the center of this item
  const mouseDistance = useTransform(mouseY, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      y: 0,
      height: baseItemSize,
    };
    return val - rect.y - baseItemSize / 2;
  });

  // Scale the icon based on how close the mouse is
  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size,
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center 
        rounded-[10px] bg-[#060606] border-2 border-neutral-700 shadow-md 
        ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, (child) => cloneElement(child, { isHovered }))}
    </motion.div>
  );
}

/**
 * Dock Label - shown on hover
 */
function DockLabel({ children, className = "", ...rest }) {
  const { isHovered } = rest;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = isHovered.on("change", (latest) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          exit={{ opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.2 }}
          // Expand from the left edge
          style={{ originX: 0 }}
          className={`${className} absolute left-full top-1/2 
            -translate-y-1/2 ml-2 whitespace-pre rounded-md border border-neutral-700 
            bg-[#060606] px-2 py-0.5 text-xs text-white`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Dock Icon - just a wrapper for the icon element
 */
function DockIcon({ children, className = "" }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
}

/**
 * Main Dock Component
 */
export default function Dock({
  items,
  className = "",
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelWidth = 64, // 'width' of the collapsed dock
  dockHeight = 256,
  baseItemSize = 50,
}) {
  // Track mouse Y position for vertical expansion
  const mouseY = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  // Expand the dock panel from panelWidth to maxWidth on hover
  const maxWidth = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [magnification, dockHeight]
  );
  const widthRow = useTransform(isHovered, [0, 1], [panelWidth, maxWidth]);
  const width = useSpring(widthRow, spring);

  return (
    <motion.div
      style={{ width, scrollbarWidth: "none" }}
      className="mx-2 flex max-w-full items-center"
    >
      <motion.div
        onMouseMove={({ pageY }) => {
          isHovered.set(1);
          mouseY.set(pageY);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseY.set(Infinity);
        }}
        // Position the dock on the left side, vertically centered
        className={`${className} absolute lef-2 top-1/2 
          -translate-y-1/2 flex flex-col items-center gap-4 
          rounded-2xl border-2 border-neutral-700 pb-2 
          bg-transparent`} 
        style={{ width: panelWidth }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseY={mouseY}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
}
