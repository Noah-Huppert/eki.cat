import type { Metadata } from "next";
import { z } from "zod";
/* import { AppType } from "next/dist/shared/lib/utils"; */
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";

import { procedure, router } from "@/api/trpc/trpc";
import { NodeService } from "@/api/services/node";

const nodeSvc = new NodeService();

/* import { AppRouter } from "@/api/trpc/trpc"; */

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "eki.cat",
  description: "Trains",
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-background fg-foreground flex flex-row px-4">
          <nav className="flex flex-row grow h-14">
            <Link
              href="/"
              className="grow self-center"
            >
              eki.cat
            </Link>

            <Link
              href="/nodes"
              className="self-center"
            >
              Nodes
            </Link>
          </nav>
        </header>

        <div className="p-4">
          {children}
        </div>
      </body>
    </html>
  );
}

export const appRouter = router({
  listNodes: procedure.query((opts) => {
    return nodeSvc.listNodes();
  }),
});

export type AppRouter = typeof appRouter;

// export type definition of API
export type AppRouter = typeof appRouter;
// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @see https://trpc.io/docs/ssr
     */
    const url = process.env.TRPC_URL || 'http://localhost:3000/api/trpc';
    return {
      url,
      /**
       * @see https://tanstack.com/query/v3/docs/react/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @see https://trpc.io/docs/ssr
   */
  ssr: true,
})(RootLayout);
