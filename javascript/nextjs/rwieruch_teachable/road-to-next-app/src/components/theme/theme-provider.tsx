import { ThemeProvider as BaseThemeProvider } from "next-themes";

export function ThemeProvider(props: { children: React.ReactNode }) {
  return (
    <BaseThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      // disableTransitionOnChange
    >
      {props.children}
    </BaseThemeProvider>
  );
}
