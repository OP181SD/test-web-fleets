import { defaultLocale } from "intlayer";
import { redirect } from "next/navigation";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  redirect(locale === defaultLocale ? "/fleets" : `/${locale}/fleets`);
}
