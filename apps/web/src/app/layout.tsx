import Image from "next/image";
import { TrpcProvider } from "../components/TRPCProvider";
import "../styles/globals.css";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TrpcProvider>
      <html>
        <head>{/* snip */}</head>
        <body>
          <header>
            <div className="mx-auto max-w-2xl py-5">
              <Link href="/">
                <Image
                  src="/logo.png"
                  width={702}
                  height={174}
                  alt="Logo"
                  className="h-6 w-auto"
                />
              </Link>
            </div>
          </header>

          <main className="mx-auto max-w-2xl">{children}</main>
        </body>
      </html>
    </TrpcProvider>
  );
}
