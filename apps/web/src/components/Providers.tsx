// import { ProtocolAuthProvider } from "@protoxyz/auth-react";
// import { light } from "@protoxyz/auth-ui";

export interface ProvidersProps {
  children: any;
}
export default function Providers({ children }: ProvidersProps) {
  return children;
  // return (
  // <ProtocolAuthProvider
  //   domain={process.env.NEXT_PUBLIC_PXYZ_AUTH_DOMAIN}
  //   publicKey={process.env.NEXT_PUBLIC_PXYZ_AUTH_PUBLIC_KEY}
  //   baseTheme={light}
  // >
  //   {children}
  // </ProtocolAuthProvider>
  // );
}
