import { getHTMLTextDir, getIntlayer, type LocalesValues } from "intlayer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { IntlayerProvider } from "next-intlayer/server";

import { DynamicBackground } from "@/components/background";

import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: LocalesValues }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const meta = getIntlayer("app-metadata", locale);
  return {
    title: meta.title,
    description: meta.description,
  };
};

const LocaleLayout = async ({ children, params }: LayoutProps<"/[locale]">) => {
  const { locale } = await params;

  return (
    <html
      lang={locale}
      dir={getHTMLTextDir(locale)}
      className={`${inter.variable} h-full antialiased`}
      data-glassmorphism="dark"
    >
      <body className="flex min-h-full flex-col">
        <IntlayerProvider locale={locale}>
          <DynamicBackground theme="dark" animated={false} />
          <div id="app-root" className="flex min-h-full flex-1 flex-col">
            {children}
          </div>
        </IntlayerProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
