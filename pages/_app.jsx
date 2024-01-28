import "@/styles/globals.css";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { Nunito } from "next/font/google";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { RecoilRoot } from "recoil";
import { auth } from "../lib/firebase";
import { useEffect } from "react";
import Head from "next/head";

const nunito = Nunito({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  const Layout = Component.layout || (({ children }) => <>{children}</>);
  return (
    <div className={`${nunito.className}`}>
      <Head>
        <title>M-Situ Dashboard</title>
      </Head>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          {Component.auth ? (
            <Auth>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </Auth>
          ) : (
            <>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </>
          )}
        </ChakraProvider>
      </RecoilRoot>
    </div>
  );
}

function Auth({ children }) {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (error) router.replace("/auth/sign-in");
    if (!user && !loading) router.replace("/auth/sign-in");
  }, [error, loading, router, user]);

  if (loading) return <p>Loading...</p>;

  if (user) return children;
}
