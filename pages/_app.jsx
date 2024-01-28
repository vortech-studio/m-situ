import "@/styles/globals.css";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { Nunito } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useAuthState } from "react-firebase-hooks/auth";
import { RecoilRoot } from "recoil";
import LoadingBar from "../components/animations/loadingBar";
import ErrorFallback from "../components/error/errorFallback";
import { auth } from "../lib/firebase";

const nunito = Nunito({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  const Layout = Component.layout || (({ children }) => <>{children}</>);
  return (
    <div className={`${nunito.className}`}>
      <Head>
        <title>M-Situ Dashboard</title>
      </Head>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          router.back();
        }}
      >
        <Suspense fallback={<LoadingBar />}>
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
        </Suspense>
      </ErrorBoundary>
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

  if (loading) return <LoadingBar />;

  if (user) return children;
}
