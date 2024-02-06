import { createContext, useState } from "react";

const ThemeContext = createContext<[string, (theme:string) => void]>(["green", () => {}]);

export default ThemeContext;
