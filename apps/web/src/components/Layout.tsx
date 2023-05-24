import Image from "next/image";
import Link from "next/link";

export interface LayoutProps {
  children: any;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <>
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
    </>
  );
}
