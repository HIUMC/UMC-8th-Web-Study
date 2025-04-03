import { ReactElement } from "react";
import { THEME, useTheme } from "./context/ThemeProvider";
import clsx from "clsx";
import React from "react";

export default function ThemeContent(): ReactElement {
  const { theme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;

  return (
    <div
      className={clsx(
        "p-4 h-dvh w-full",
        isLightMode ? "bg-white" : "bg-gray-800"
      )}
    >
      <h1
        className={clsx(
          "text-wxl font-bold",
          isLightMode ? "text-black" : "text-white"
        )}
      >
        ThemeContent
      </h1>
      <p className={clsx("mt-2", isLightMode ? "text-black" : "text-white")}>
        Week2 Mission2 by Woodz 🌳
      </p>
    </div>
  );
}
