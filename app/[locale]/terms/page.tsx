import { getTranslations } from "next-intl/server";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";

export const metadata = {
  title: "Terms & Conditions | VoyageGH",
};

export default async function TermsPage() {
  const t = await getTranslations("terms");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="wrapper py-10 flex-1">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <h1 className="text-3xl font-bold text-dark-100">{t("title")}</h1>
          <div className="prose text-gray-100 flex flex-col gap-4">
            <p>{t("welcome")}</p>
            <h2 className="text-xl font-semibold text-dark-100">{t("s1Title")}</h2>
            <p>{t("s1")}</p>
            <h2 className="text-xl font-semibold text-dark-100">{t("s2Title")}</h2>
            <p>{t("s2")}</p>
            <h2 className="text-xl font-semibold text-dark-100">{t("s3Title")}</h2>
            <p>{t("s3")}</p>
            <h2 className="text-xl font-semibold text-dark-100">{t("s4Title")}</h2>
            <p>{t("s4")}</p>
            <h2 className="text-xl font-semibold text-dark-100">{t("s5Title")}</h2>
            <p>{t("s5")}</p>
            <h2 className="text-xl font-semibold text-dark-100">{t("s6Title")}</h2>
            <p>{t("s6")}</p>
            <h2 className="text-xl font-semibold text-dark-100">{t("s7Title")}</h2>
            <p>{t("s7")}</p>
            <h2 className="text-xl font-semibold text-dark-100">{t("s8Title")}</h2>
            <p>{t("s8")}</p>
            <h2 className="text-xl font-semibold text-dark-100">{t("s9Title")}</h2>
            <p>{t("s9")}</p>
            <p className="text-sm text-gray-100 mt-4">{t("lastUpdated")}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
