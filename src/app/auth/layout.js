import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({ subsets: ["latin"] });

export default function layout({ children }) {
  return <div className={dmSans.className}>{children}</div>;
}
