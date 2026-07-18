import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";

export const metadata = {
  title: "Privacy Policy | VoyageGH",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="wrapper py-10 flex-1">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <h1 className="text-3xl font-bold text-dark-100">Privacy Policy</h1>
          <div className="prose text-gray-100 flex flex-col gap-4">
            <p>Your privacy is important to us. This Privacy Policy explains how VoyageGH collects, uses, and protects your personal information.</p>
            <h2 className="text-xl font-semibold text-dark-100">1. Information We Collect</h2>
            <p>We collect information you provide directly, including your name, email address, and booking details. We also collect usage data such as pages visited and interactions with our platform.</p>
            <h2 className="text-xl font-semibold text-dark-100">2. How We Use Your Information</h2>
            <p>We use your information to provide and improve our services, process bookings, send booking confirmations, and personalize your experience. We do not sell your personal information to third parties.</p>
            <h2 className="text-xl font-semibold text-dark-100">3. Data Security</h2>
            <p>We implement industry-standard security measures to protect your personal data. However, no method of transmission over the Internet is 100% secure.</p>
            <h2 className="text-xl font-semibold text-dark-100">4. Third-Party Services</h2>
            <p>We use third-party services (Clerk for authentication, Stripe for payments) that may collect information. Their privacy policies govern their use of your data.</p>
            <h2 className="text-xl font-semibold text-dark-100">5. Cookies</h2>
            <p>We use essential cookies to maintain your session and improve your experience. You can control cookie settings through your browser preferences.</p>
            <h2 className="text-xl font-semibold text-dark-100">6. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data. Contact us at support@voyagegh.com to exercise these rights.</p>
            <h2 className="text-xl font-semibold text-dark-100">7. Children&apos;s Privacy</h2>
            <p>Our service is not directed to individuals under 18. We do not knowingly collect personal information from children.</p>
            <h2 className="text-xl font-semibold text-dark-100">8. Changes to This Policy</h2>
            <p>We may update this Privacy Policy periodically. We will notify you of any material changes by posting the new policy on this page.</p>
            <p className="text-sm text-gray-100 mt-4">Last updated: July 2025</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
