import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <section className="auth">
      <div className="flex-center w-full">
        <div className="sign-in-card">
          <header className="flex items-center gap-1.5 justify-center mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-dark-100">VoyageGH</h1>
          </header>
          <SignUp
            routing="hash"
            appearance={{
              elements: {
                formButtonPrimary: "!bg-primary-100 hover:!bg-primary-500",
                card: "!shadow-none !border-none",
              },
            }}
          />
        </div>
      </div>
    </section>
  );
}
