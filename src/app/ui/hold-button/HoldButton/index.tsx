"use client";

import "./styles.css";

type HoldButtonProps = React.PropsWithChildren<Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">> & {
  onClick?: () => void;
};
export default function HoldButton({ children, onClick, ...props }: HoldButtonProps) {
  return (
    <button
      className="button"
      {...props}
      onTransitionEnd={
        onClick
          ? (e) => {
              //   console.log("Transition ended", e.propertyName, "is active", );

              // there could be multiple properties being transitioned (like in this case the `clip-path` and the 'transform`),
              // so listen only to the `clip-path` one.
              // Also because this `clip-path` transition is applied when holding and when releasing the mouse,
              // check only the end of the "holding" one.
              if (e.propertyName === "clip-path" && e.currentTarget.matches(":active")) onClick();
            }
          : undefined
      }
    >
      <div aria-hidden="true" className="hold-overlay">
        {children}
      </div>
      {children}
    </button>
  );
}
