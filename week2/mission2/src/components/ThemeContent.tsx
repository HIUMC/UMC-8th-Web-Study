import { THEME, useTheme } from "../context/ThemeProvider";
import clsx from "clsx";
import { ReactElement } from "react";

export default function ThemeContent(): ReactElement {
  const { theme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;
  return (
    <div
      className={clsx(
        "p-4 h-dvh w-full",
        isLightMode ? "bh-white" : "bg-gray-800"
      )}
    >
      <h1
        className={clsx(
          "text-wxl font-bold",
          isLightMode ? "text-black" : "text-white"
        )}
      >
        Theme Content
      </h1>
      <p className={clsx("mt-2", isLightMode ? "text-black" : "text-white")}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum aliquam
        deleniti magnam nobis, sequi dolorum error at ullam ipsam autem rem
        vitae. Rerum, repellat itaque animi architecto repellendus facilis ex.
      </p>
    </div>
  );
}
