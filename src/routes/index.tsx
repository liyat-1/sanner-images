import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  CalendarDays,
  Check,
  CheckCircle2,
  ChefHat,
  Circle,
  Clock3,
  CreditCard,
  FileText,
  Fingerprint,
  HelpCircle,
  Hotel,
  KeyRound,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
  Printer,
  ShieldCheck,
  Smartphone,
  UserRound,
  UsersRound,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import breakfastImage from "@/assets/seavist-breakfast.jpg";
import scannerImage from "@/assets/id-on-scanner.jpg";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

type Stage =
  | "welcome"
  | "scanning"
  | "detected"
  | "scanningId"
  | "verifying"
  | "verified"
  | "scanError"
  | "dashboard"
  | "contact"
  | "submitting"
  | "success";

type ContactData = { email: string; phone: string; address: string };
type Errors = Partial<Record<keyof ContactData, string>>;

const initialContact: ContactData = {
  email: "daniel.carter@email.com",
  phone: "+1 (555) 018-0127",
  address: "123 Ocean View Drive\nMiami, FL 33139",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Seavist Hotel Check-In | Directful" },
      { name: "description", content: "A welcoming, secure guest check-in experience for Seavist Hotel." },
      { property: "og:title", content: "Seavist Hotel Check-In | Directful" },
      { property: "og:description", content: "A welcoming, secure guest check-in experience for Seavist Hotel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DirectfulCheckIn,
});

function DirectfulCheckIn() {
  const [stage, setStage] = useState<Stage>("welcome");
  const [verificationTime, setVerificationTime] = useState<Date | null>(null);
  const [contact, setContact] = useState<ContactData>(initialContact);
  const [emailOptIn, setEmailOptIn] = useState(false);
  const [textOptIn, setTextOptIn] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    if (stage !== "scanning") return;
    const timer = window.setTimeout(() => setStage("detected"), 650);
    return () => window.clearTimeout(timer);
  }, [stage]);

  useEffect(() => {
    if (stage !== "detected") return;
    const timer = window.setTimeout(() => setStage("scanningId"), 850);
    return () => window.clearTimeout(timer);
  }, [stage]);

  useEffect(() => {
    if (stage !== "scanningId") return;
    const timer = window.setTimeout(() => setStage("verifying"), 2000);
    return () => window.clearTimeout(timer);
  }, [stage]);

  useEffect(() => {
    if (stage !== "verifying") return;
    const timer = window.setTimeout(() => {
      setVerificationTime(new Date());
      setStage("verified");
    }, 1500);
    return () => window.clearTimeout(timer);
  }, [stage]);

  useEffect(() => {
    if (stage !== "verified") return;
    const timer = window.setTimeout(() => setStage("dashboard"), 1500);
    return () => window.clearTimeout(timer);
  }, [stage]);

  useEffect(() => {
    if (stage !== "submitting") return;
    const timer = window.setTimeout(() => setStage("success"), 1250);
    return () => window.clearTimeout(timer);
  }, [stage]);

  useEffect(() => {
    if (stage !== "success") return;
    const timer = window.setTimeout(() => resetSession(), 9000);
    return () => window.clearTimeout(timer);
  }, [stage]);

  useEffect(() => {
    if (!actionMessage) return;
    const timer = window.setTimeout(() => setActionMessage(""), 2600);
    return () => window.clearTimeout(timer);
  }, [actionMessage]);

  function resetSession() {
    setContact(initialContact);
    setEmailOptIn(false);
    setTextOptIn(false);
    setErrors({});
    setVerificationTime(null);
    setActionMessage("");
    setStage("welcome");
  }

  function submitContact() {
    const nextErrors: Errors = {};
    if (!contact.email.trim()) nextErrors.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) nextErrors.email = "Please enter a valid email address.";
    if (!contact.phone.trim()) nextErrors.phone = "Please enter your phone number.";
    else if (contact.phone.replace(/\D/g, "").length < 10) nextErrors.phone = "Please enter a valid phone number.";
    if (!contact.address.trim()) nextErrors.address = "Please enter your address.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setStage("submitting");
  }

  const isContactValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email) &&
    contact.phone.replace(/\D/g, "").length >= 10 &&
    contact.address.trim().length > 5;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SystemHeader />
      <main className="mx-auto min-h-[calc(100vh-76px)] max-w-[1920px]">
        {stage === "welcome" && <WelcomeScreen onStart={() => setStage("scanning")} />}
        {["scanning", "detected", "scanningId", "verifying", "verified"].includes(stage) && (
          <ScanningScreen
            stage={stage}
            onContinue={() => setStage("dashboard")}
            onSimulateError={() => setStage("scanError")}
          />
        )}
        {stage === "scanError" && (
          <ScanErrorScreen onRetry={() => setStage("scanning")} onHelp={() => setActionMessage("A front desk team member has been notified.")} />
        )}
        {stage === "dashboard" && (
          <DashboardScreen
            verificationTime={verificationTime}
            actionMessage={actionMessage}
            onAddInformation={() => setStage("contact")}
            onPrint={() => setActionMessage("Your folio is printing now.")}
            onEncode={() => setActionMessage("Two room keys have been encoded.")}
          />
        )}
        {(stage === "contact" || stage === "submitting") && (
          <ContactScreen
            contact={contact}
            errors={errors}
            emailOptIn={emailOptIn}
            textOptIn={textOptIn}
            submitting={stage === "submitting"}
            valid={isContactValid}
            onContactChange={(field, value) => {
              setContact((current) => ({ ...current, [field]: value }));
              if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
            }}
            onEmailOptIn={setEmailOptIn}
            onTextOptIn={setTextOptIn}
            onBack={() => setStage("dashboard")}
            onSubmit={submitContact}
          />
        )}
        {stage === "success" && <SuccessScreen onClose={resetSession} />}
      </main>
      {actionMessage && stage !== "dashboard" && (
        <div role="status" className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-md bg-primary px-6 py-4 font-semibold text-primary-foreground shadow-xl">
          {actionMessage}
        </div>
      )}
    </div>
  );
}

function SystemHeader() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);
  const date = useMemo(
    () => now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
    [now],
  );
  const time = useMemo(() => now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }), [now]);
  return (
    <header className="flex h-[76px] items-center justify-between border-b border-primary-strong bg-primary px-6 text-primary-foreground shadow-sm lg:px-12">
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2.5 text-xl font-extrabold">
          <span className="grid size-9 place-items-center rounded-md bg-gold text-gold-foreground"><Hotel className="size-5" /></span>
          Directful
        </div>
        <div className="h-7 w-px bg-primary-foreground/25" />
        <span className="text-sm font-medium text-primary-foreground/80 sm:text-base">Front Desk · Check-In</span>
      </div>
      <div className="flex items-center gap-6 text-sm">
        <span className="hidden font-medium text-primary-foreground/80 sm:block">{date} · {time}</span>
        <span className="flex items-center gap-2 font-semibold"><span className="size-2.5 rounded-full bg-success-soft ring-4 ring-success/30" />System Online</span>
      </div>
    </header>
  );
}

function WelcomeScreen({ onStart }: { onStart: () => void }) {
  const docs = [
    { icon: CreditCard, label: "Driver's License" },
    { icon: FileText, label: "Passport" },
    { icon: Fingerprint, label: "Government ID" },
  ];
  return (
    <section className="screen-enter grid min-h-[calc(100vh-76px)] place-items-center px-6 py-10">
      <div className="w-full max-w-5xl text-center">
        <div className="mb-5 flex items-center justify-center gap-3 text-primary">
          <span className="h-px w-12 bg-gold" />
          <span className="text-sm font-extrabold uppercase tracking-[0.18em]">Seavist Hotel</span>
          <span className="h-px w-12 bg-gold" />
        </div>
        <h1 className="text-4xl font-bold leading-tight text-primary sm:text-5xl lg:text-6xl">Welcome to Seavist Hotel</h1>
        <p className="mt-4 text-xl font-medium text-muted-foreground lg:text-2xl">Let&apos;s get you checked in.</p>
        <div className="mx-auto mt-9 max-w-3xl border-y border-border py-7">
          <p className="text-lg leading-relaxed text-foreground/85 lg:text-xl">To get started, place your driver&apos;s license, passport, or government-issued ID on the scanner to verify your identity.</p>
          <div className="mt-7 grid grid-cols-3 gap-3 sm:gap-6">
            {docs.map(({ icon: Icon, label }) => (
              <div key={label} className="flex min-h-28 flex-col items-center justify-center gap-3 rounded-md border border-border bg-surface-warm px-3 shadow-sm">
                <Icon className="size-7 text-primary" strokeWidth={1.7} />
                <span className="text-sm font-semibold sm:text-base">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <Button variant="gold" size="wide" onClick={onStart} className="mt-8">Start Check-In <ArrowRight /></Button>
        <div className="mt-7 space-y-2 text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2"><ShieldCheck className="size-4 text-success" />Your information is handled securely in accordance with our <button className="font-semibold text-primary underline underline-offset-2">Privacy Policy</button>.</p>
          <p>Need help? A member of our front desk team is happy to assist.</p>
        </div>
      </div>
    </section>
  );
}

function ScanningScreen({ stage, onContinue, onSimulateError }: { stage: Stage; onContinue: () => void; onSimulateError: () => void }) {
  const verified = stage === "verified";
  const step = stage === "scanning" ? 0 : stage === "detected" ? 1 : stage === "scanningId" ? 2 : stage === "verifying" ? 3 : 4;
  return (
    <section className="screen-enter grid min-h-[calc(100vh-76px)] grid-cols-1 lg:grid-cols-[1.12fr_.88fr]">
      <div className="relative min-h-80 overflow-hidden bg-primary">
        <img src={scannerImage} alt="Driver's license lying flat on top of a physical ID scanner" width={1280} height={900} className="h-full w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 bg-primary/90 px-7 py-4 text-center text-sm font-medium text-primary-foreground backdrop-blur-sm">Keep your ID flat and still on top of the scanner.</div>
      </div>
      <div className="flex flex-col justify-center px-7 py-10 lg:px-16">
        <div className={`grid size-14 place-items-center rounded-full ${verified ? "bg-success-soft text-success" : "bg-surface-blue text-primary"}`}>
          {verified ? <CheckCircle2 className="size-8" /> : <Fingerprint className="size-8" />}
        </div>
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-navy-muted">Identity verification</p>
        <h1 className="mt-2 text-4xl font-bold text-primary lg:text-5xl">{verified ? "ID Verified" : "Scanning your ID"}</h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">{verified ? "Your identity has been successfully verified." : "Keep your ID on the scanner while we verify your information."}</p>
        <div className="mt-9 max-w-lg border-y border-border py-2">
          <ScanStep label="ID detected" state={step > 1 ? "done" : step === 1 ? "active" : "waiting"} />
          <ScanStep label="Scanning ID" state={step > 2 ? "done" : step === 2 ? "active" : "waiting"} />
          <ScanStep label="Verifying information" state={step > 3 ? "done" : step === 3 ? "active" : "waiting"} />
        </div>
        <Button variant={verified ? "success" : "navy"} size="wide" onClick={onContinue} disabled={!verified} className="mt-9 self-start">Continue <ArrowRight /></Button>
        {!verified && <button onClick={onSimulateError} className="mt-5 self-start text-sm font-semibold text-muted-foreground underline underline-offset-4 hover:text-primary">Having trouble reading your ID?</button>}
      </div>
    </section>
  );
}

function ScanStep({ label, state }: { label: string; state: "done" | "active" | "waiting" }) {
  return (
    <div className="flex h-16 items-center gap-4 border-b border-border last:border-0">
      {state === "done" ? <span className="grid size-7 place-items-center rounded-full bg-success text-success-foreground"><Check className="size-4" /></span> : state === "active" ? <span className="grid size-7 place-items-center"><span className="status-pulse size-3 rounded-full bg-gold ring-4 ring-gold/20" /></span> : <span className="grid size-7 place-items-center"><Circle className="size-5 text-border" /></span>}
      <span className={`font-semibold ${state === "waiting" ? "text-muted-foreground" : "text-foreground"}`}>{label}</span>
    </div>
  );
}

function ScanErrorScreen({ onRetry, onHelp }: { onRetry: () => void; onHelp: () => void }) {
  return (
    <section className="screen-enter grid min-h-[calc(100vh-76px)] place-items-center px-6 py-10">
      <div className="max-w-2xl text-center">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-error-soft text-destructive"><CreditCard className="size-8" /></div>
        <h1 className="mt-6 text-4xl font-bold text-primary">We couldn&apos;t read your ID</h1>
        <p className="mt-4 text-xl text-muted-foreground">Please place your ID flat on the scanner and try again.</p>
        <p className="mt-3 text-base text-muted-foreground">Make sure the document is fully visible and remains still while we scan it.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button variant="navy" size="touch" onClick={onRetry}>Try Again <ArrowRight /></Button>
          <Button variant="outline" size="touch" onClick={onHelp}><HelpCircle /> Need Help?</Button>
        </div>
      </div>
    </section>
  );
}

function DashboardScreen({ verificationTime, actionMessage, onAddInformation, onPrint, onEncode }: { verificationTime: Date | null; actionMessage: string; onAddInformation: () => void; onPrint: () => void; onEncode: () => void }) {
  return (
    <section className="screen-enter px-5 py-6 lg:px-10 lg:py-8">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(370px,.75fr)]">
        <div className="min-w-0">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-navy-muted">Arriving Guest</p>
          <div className="mt-3 flex items-center gap-5 border-b border-border pb-5">
            <div className="grid size-16 shrink-0 place-items-center rounded-full bg-primary text-xl font-bold text-primary-foreground">DC</div>
            <div>
              <h1 className="text-3xl font-bold text-primary lg:text-4xl">Daniel Carter</h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm font-semibold">
                <span className="rounded-sm bg-gold-soft px-2.5 py-1 text-gold-foreground">Gold · 4th Stay</span>
                <span className="text-muted-foreground">Direct Guest</span>
              </div>
            </div>
          </div>
          <StaySummary />
          <IdVerification verificationTime={verificationTime} />
          <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-5">
            <Button variant="outline" size="touch" onClick={onPrint}><Printer /> Print Folio</Button>
            <Button variant="navy" size="touch" onClick={onEncode}><KeyRound /> Encode 2 Keys</Button>
            {actionMessage && <div role="status" className="flex min-h-14 items-center gap-2 rounded-md bg-success-soft px-4 font-semibold text-success"><CheckCircle2 className="size-5" />{actionMessage}</div>}
          </div>
        </div>
        <BreakfastOffer onAdd={onAddInformation} />
      </div>
    </section>
  );
}

function StaySummary() {
  const details = [
    { label: "Confirmation #", value: "DF458732", icon: FileText },
    { label: "Stay", value: "Sep 25 – Sep 28, 2025", sub: "3 Nights", icon: CalendarDays },
    { label: "Room Type", value: "King Ocean View", icon: BedDouble },
    { label: "Guests", value: "2 Adults", icon: UsersRound },
  ];
  return (
    <div className="border-b border-border py-5">
      <div className="grid gap-4 sm:grid-cols-[1.1fr_.9fr]">
        <div className="flex items-start gap-4 border-r-0 border-border sm:border-r">
          <span className="grid size-11 place-items-center rounded-md bg-surface-blue text-primary"><Hotel className="size-5" /></span>
          <div><p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">Room</p><p className="mt-1 text-3xl font-bold text-primary">1204</p><p className="mt-1 text-sm text-muted-foreground">Ocean Side · 2nd Floor</p><p className="mt-2 flex items-center gap-1 text-sm font-bold text-success"><Check className="size-4" />Assigned</p></div>
        </div>
        <div className="flex items-start gap-4 sm:pl-4">
          <span className="grid size-11 place-items-center rounded-md bg-success-soft text-success"><CheckCircle2 className="size-5" /></span>
          <div><p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">Check-In Status</p><p className="mt-2 text-2xl font-bold text-success">Ready <Check className="inline size-5" /></p></div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-x-5 border-t border-border pt-5 lg:grid-cols-4">
        {details.map(({ label, value, sub, icon: Icon }) => <div key={label} className="min-w-0 border-b border-border py-4 lg:border-b-0 lg:border-r lg:px-4 lg:first:pl-0 lg:last:border-r-0"><div className="flex items-center gap-2 text-muted-foreground"><Icon className="size-4" /><span className="text-xs font-bold uppercase tracking-[0.08em]">{label}</span></div><p className="mt-2 truncate text-sm font-bold text-foreground lg:text-base">{value}</p>{sub && <p className="mt-1 text-sm text-muted-foreground">{sub}</p>}</div>)}
      </div>
    </div>
  );
}

function IdVerification({ verificationTime }: { verificationTime: Date | null }) {
  const stamp = verificationTime ?? new Date();
  const date = stamp.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const time = stamp.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  return (
    <div className="py-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-navy-muted">ID Scanned</p>
        <span className="flex items-center gap-2 rounded-sm bg-success-soft px-3 py-1.5 text-sm font-bold text-success"><CheckCircle2 className="size-4" />ID Verified</span>
      </div>
      <div className="mt-4 grid gap-5 sm:grid-cols-[220px_1fr]">
        <div className="relative aspect-[1.58/1] overflow-hidden rounded-md border border-border bg-surface-blue p-4 shadow-sm">
          <div className="flex items-center justify-between"><span className="text-[10px] font-extrabold text-primary">CALIFORNIA</span><span className="text-[8px] font-bold text-muted-foreground">DRIVER LICENSE</span></div>
          <div className="mt-3 flex gap-3"><div className="grid h-16 w-12 place-items-center bg-secondary text-primary"><UserRound className="size-6" /></div><div className="space-y-1 text-[8px] text-muted-foreground"><b className="block text-[10px] text-foreground">DANIEL CARTER</b><span className="block">DOB 04/18/1988</span><span className="block">CLASS C</span><span className="block">USA</span></div></div>
        </div>
        <div>
          <p className="text-lg font-bold text-primary">Driver&apos;s License</p>
          <div className="mt-3 grid grid-cols-2 gap-x-5 gap-y-4 lg:grid-cols-3">
            <Detail label="ID Number" value="D83947261" />
            <Detail label="Expiration Date" value="Nov 12, 2028" />
            <Detail label="Issuing Country" value="USA" />
          </div>
          <div className="mt-4 flex items-center gap-3 border-t border-border pt-4 text-sm"><Clock3 className="size-4 text-success" /><span className="text-muted-foreground">Verified</span><strong>{time} · {date}</strong></div>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div><p className="text-xs font-semibold text-muted-foreground">{label}</p><p className="mt-1 font-bold">{value}</p></div>;
}

function BreakfastOffer({ onAdd }: { onAdd: () => void }) {
  return (
    <aside className="overflow-hidden rounded-md border border-border bg-surface-warm shadow-lg xl:sticky xl:top-24 xl:self-start">
      <div className="relative h-56 overflow-hidden"><img src={breakfastImage} alt="Elegant breakfast for two overlooking the ocean" loading="lazy" width={1280} height={900} className="h-full w-full object-cover" /><span className="absolute left-4 top-4 rounded-sm bg-gold px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.1em] text-gold-foreground">Complimentary</span></div>
      <div className="p-6 lg:p-7">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-navy-muted">A Little Something for Your Stay</p>
        <h2 className="mt-3 text-2xl font-bold leading-tight text-primary">Complimentary Breakfast</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">Complete your guest profile and enjoy a complimentary breakfast for two.</p>
        <div className="mt-5 border-y border-border py-4"><p className="font-bold">Breakfast for two during your stay.</p><p className="mt-1 text-sm text-muted-foreground">Valid Sep 25 – Sep 28, 2025</p></div>
        <Button variant="gold" size="touch" className="mt-6 w-full" onClick={onAdd}>Add Information <ArrowRight /></Button>
        <p className="mt-3 text-center text-xs text-muted-foreground">Optional benefit · No purchase required</p>
      </div>
    </aside>
  );
}

function ContactScreen(props: { contact: ContactData; errors: Errors; emailOptIn: boolean; textOptIn: boolean; submitting: boolean; valid: boolean; onContactChange: (field: keyof ContactData, value: string) => void; onEmailOptIn: (value: boolean) => void; onTextOptIn: (value: boolean) => void; onBack: () => void; onSubmit: () => void }) {
  return (
    <section className="screen-enter mx-auto max-w-6xl px-6 py-8 lg:py-10">
      <div className="flex items-start gap-5 border-b border-border pb-6"><span className="grid size-12 shrink-0 place-items-center rounded-md bg-surface-blue text-primary"><UserRound /></span><div><h1 className="text-3xl font-bold text-primary lg:text-4xl">Confirm Your Contact Information</h1><p className="mt-2 text-lg text-muted-foreground">Add your details so we can keep you connected with Seavist Hotel.</p></div></div>
      <div className="mt-6 grid gap-7 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField icon={Mail} label="Email Address" error={props.errors.email}><Input type="email" value={props.contact.email} onChange={(event) => props.onContactChange("email", event.target.value)} aria-invalid={Boolean(props.errors.email)} className="h-14 bg-card px-4 text-base" /></FormField>
            <FormField icon={Phone} label="Phone Number" error={props.errors.phone}><Input type="tel" value={props.contact.phone} onChange={(event) => props.onContactChange("phone", event.target.value)} aria-invalid={Boolean(props.errors.phone)} className="h-14 bg-card px-4 text-base" /></FormField>
            <FormField icon={MapPin} label="Address" error={props.errors.address} className="sm:col-span-2"><textarea value={props.contact.address} onChange={(event) => props.onContactChange("address", event.target.value)} aria-invalid={Boolean(props.errors.address)} className="min-h-28 w-full resize-none rounded-md border border-input bg-card px-4 py-3 text-base shadow-sm outline-none focus:border-ring focus:ring-1 focus:ring-ring" /></FormField>
          </div>
          <div className="mt-7 border-t border-border pt-6"><h2 className="text-xl font-bold text-primary">Stay Connected</h2><p className="mt-1 text-muted-foreground">Choose how you&apos;d like Seavist Hotel to stay in touch.</p><div className="mt-5 space-y-3"><Preference checked={props.emailOptIn} onChange={props.onEmailOptIn} icon={Mail} label="Email me about hotel offers and experiences" /><Preference checked={props.textOptIn} onChange={props.onTextOptIn} icon={Smartphone} label="Text me about hotel offers and experiences" /></div><p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground"><ShieldCheck className="size-4 text-success" />Your information is handled securely and according to our Privacy Policy.</p></div>
        </div>
        <div className="overflow-hidden rounded-md border border-border bg-surface-warm shadow-sm"><img src={breakfastImage} alt="Complimentary breakfast for two" loading="lazy" width={1280} height={900} className="h-36 w-full object-cover" /><div className="p-5"><p className="text-xs font-extrabold uppercase tracking-[0.14em] text-navy-muted">A Little Something for Your Stay</p><h2 className="mt-2 text-xl font-bold text-primary">Complimentary Breakfast for Two</h2><p className="mt-2 text-sm text-muted-foreground">Breakfast for two during your stay.</p><p className="mt-4 border-t border-border pt-4 text-sm font-semibold">Valid Sep 25 – Sep 28, 2025</p></div></div>
      </div>
      <div className="mt-8 flex items-center justify-between border-t border-border pt-6"><Button variant="outline" size="touch" onClick={props.onBack} disabled={props.submitting}><ArrowLeft /> Back</Button><Button variant="gold" size="touch" onClick={props.onSubmit} disabled={!props.valid || props.submitting}>{props.submitting ? <><LoaderCircle className="animate-spin" />Adding your benefit...</> : <>Confirm &amp; Claim Breakfast <ArrowRight /></>}</Button></div>
    </section>
  );
}

function FormField({ icon: Icon, label, error, className = "", children }: { icon: typeof Mail; label: string; error?: string | undefined; className?: string | undefined; children: React.ReactNode }) {
  return <label className={className}><span className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground"><Icon className="size-4 text-primary" />{label}<span className="text-destructive">*</span></span>{children}{error && <span role="alert" className="mt-2 block text-sm font-semibold text-destructive">{error}</span>}</label>;
}

function Preference({ checked, onChange, icon: Icon, label }: { checked: boolean; onChange: (value: boolean) => void; icon: typeof Mail; label: string }) {
  return <label className="flex min-h-14 cursor-pointer items-center gap-3 rounded-md border border-border bg-card px-4"><Checkbox checked={checked} onCheckedChange={(value) => onChange(value === true)} className="size-5" /><Icon className="size-5 text-primary" /><span className="font-medium">{label}</span></label>;
}

function SuccessScreen({ onClose }: { onClose: () => void }) {
  const confetti = ["left-[8%] delay-0", "left-[18%] delay-500", "left-[31%] delay-1000", "left-[44%] delay-300", "left-[58%] delay-700", "left-[70%] delay-150", "left-[83%] delay-1000", "left-[92%] delay-500"];
  return (
    <section className="screen-enter relative grid min-h-[calc(100vh-76px)] place-items-center overflow-hidden px-6 py-10">
      {confetti.map((position, index) => <span key={position} className={`confetti-fall absolute top-0 h-3 w-1.5 ${index % 2 ? "bg-gold" : "bg-success"} ${position}`} />)}
      <div className="relative z-10 max-w-2xl text-center">
        <div className="mx-auto grid size-20 place-items-center rounded-full bg-gold-soft text-gold-foreground ring-8 ring-gold/10"><ChefHat className="size-10" /></div>
        <p className="mt-7 text-sm font-extrabold uppercase tracking-[0.16em] text-success">Benefit confirmed</p>
        <h1 className="mt-2 text-5xl font-bold text-primary">Breakfast Added!</h1>
        <p className="mt-4 text-xl font-semibold">You&apos;re all set, Daniel.</p>
        <p className="mx-auto mt-2 max-w-xl text-lg leading-relaxed text-muted-foreground">Complimentary breakfast for two has been added to your stay.</p>
        <div className="mx-auto mt-7 max-w-md rounded-md border border-gold/40 bg-gold-soft p-5"><p className="text-xs font-extrabold uppercase tracking-[0.14em] text-gold-foreground">Complimentary Breakfast</p><p className="mt-2 text-lg font-bold">Breakfast for two</p><p className="mt-1 text-sm text-muted-foreground">Valid Sep 25 – Sep 28, 2025</p></div>
        <p className="mt-7 text-lg"><strong>Thank you, Daniel.</strong><br /><span className="text-muted-foreground">Enjoy your stay at Seavist Hotel.</span></p>
        <Button variant="navy" size="wide" className="mt-7" onClick={onClose}>Close</Button>
        <p className="mt-4 text-xs text-muted-foreground">This screen will reset automatically for your privacy.</p>
      </div>
    </section>
  );
}
