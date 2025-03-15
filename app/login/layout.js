import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` antialiased bg-gradient-to-br from-gray-700 to-gray-950 w-full h-[100vh]`}
      >
        <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
          <main>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
