// libraries
import { useEffect } from "react";
import { useTheme } from "@renderer/store/theme";

const useApplyTheme = () => {
  const theme = useTheme((s) => s.theme);

  useEffect(() => {
    document.body.classList.toggle("light", theme === "light");
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);
};

export default useApplyTheme;
