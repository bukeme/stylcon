import { DM_Sans } from "next/font/google";

import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingIndicator from "@/components/Shared/LoadingIndicator";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Stylcon",
  description: "Your fashion production assistant",
  icons: {
    icon: "/stylcon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          type="text/javascript"
          src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=RrwrkV"
        ></script>
      </head>
      <body className={dmSans.className && "overflow-x-hidden"}>
        <LoadingIndicator />
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
