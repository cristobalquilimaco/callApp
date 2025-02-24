import { AppProvider } from "../context/AppContext";
import { GlobalLoader } from "../components/loading/GlobalLoader"; // pagina de carga que se muestra de froma Global
import "boxicons/css/boxicons.min.css";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Contact Center</title>
      </head>
      <body>
        <AppProvider>
          <GlobalLoader>{children}</GlobalLoader> 
        </AppProvider>
      </body>
    </html>
  );
}