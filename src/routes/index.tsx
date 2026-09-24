import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Check, Mail, MessageSquare, Minus, Square, X } from "lucide-react";
import hardwareAsset from "@/assets/directful-hardware-master.jpg.asset.json";
import handFrontImg from "@/assets/hardware-hand-front.jpg";
import handBackImg from "@/assets/hardware-hand-back.jpg";
import handPlaceImg from "@/assets/hardware-hand-place.jpg";
import breakfastImg from "@/assets/seavist-breakfast.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Seavist Hotel Self Check-In · Directful" },
      { name: "description", content: "Guest-facing Directful ID scanner kiosk for Seavist Hotel front desk." },
      { property: "og:title", content: "Seavist Hotel Self Check-In · Directful" },
      { property: "og:description", content: "Place your ID on the scanner, find your reservation, and claim breakfast for two." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: KioskApp,
});

type Step = "INITIAL" | "LOCATING" | "FOUND" | "CLAIM" | "DELIVERY" | "SUCCESS" | "ERROR";
type Delivery = "sms" | "email";

function KioskApp() {
  const [step, setStep] = useState<Step>("INITIAL");
  const [attempt, setAttempt] = useState(0);
  const [simulateError, setSimulateError] = useState(false);
  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [key, setKey] = useState(0);

  const reset = () => {
    setDelivery(null);
    setSimulateError(false);
    setKey((k) => k + 1);
    setStep("INITIAL");
  };

  // Keyboard shortcut for demo: "E" simulates an unreadable barcode
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (step !== "INITIAL") return;
      if (e.key === "e" || e.key === "E") { setSimulateError(true); setStep("LOCATING"); }
      if (e.key === "Enter" || e.key === " ") { setSimulateError(false); setStep("LOCATING"); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined;
    if (step === "LOCATING") t = setTimeout(() => { setAttempt((a) => a + 1); setStep(simulateError ? "ERROR" : "FOUND"); }, 3200);
    if (step === "ERROR") t = setTimeout(() => { setSimulateError(false); setStep("INITIAL"); }, 6000);
    if (step === "SUCCESS") t = setTimeout(reset, 9000);
    return () => clearTimeout(t);
  }, [step, simulateError]);

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-k-paper font-win text-k-ink">
      <TitleBar />
      <main key={`${step}-${key}-${attempt}`} className="k-screen relative min-h-0 flex-1">
        {step === "INITIAL" && (
          <InitialScreen
            onPlaced={() => { setSimulateError(false); setStep("LOCATING"); }}
            onUnreadable={() => { setSimulateError(true); setStep("LOCATING"); }}
          />
        )}
        {step === "LOCATING" && <Locating />}
        {step === "FOUND" && <Found onNext={() => setStep("CLAIM")} />}
        {step === "CLAIM" && <Claim onClaim={() => setStep("DELIVERY")} />}
        {step === "DELIVERY" && (
          <DeliveryStep onBack={() => setStep("CLAIM")} onConfirm={(d) => { setDelivery(d); setStep("SUCCESS"); }} />
        )}
        {step === "SUCCESS" && <Success delivery={delivery ?? "email"} />}
        {step === "ERROR" && <ErrorScreen />}
      </main>
    </div>
  );
}

/* ---------------- Window chrome ---------------- */
function TitleBar() {
  return (
    <header className="flex h-8 shrink-0 select-none items-center justify-between bg-k-chrome text-[12px] text-k-mist/80">
      <div className="flex items-center gap-2 pl-3">
        <span className="grid h-4 w-4 grid-cols-2 gap-px" aria-label="Windows application">
          <i className="bg-k-ocean" /><i className="bg-k-ocean" /><i className="bg-k-ocean" /><i className="bg-k-ocean" />
        </span>
        <span className="font-semibold text-k-mist">Directful Hotel ID Scanner</span>
        <span className="opacity-50">—</span>
        <span>Seavist Hotel</span>
      </div>
      <div className="flex h-full" aria-hidden>
        {[Minus, Square, X].map((I, i) => (
          <span key={i} className={`grid h-full w-11 place-items-center ${i === 2 ? "hover:bg-destructive" : "hover:bg-k-mist/10"}`}>
            <I className={i === 1 ? "h-2.5 w-2.5" : "h-3.5 w-3.5"} strokeWidth={1.25} />
          </span>
        ))}
      </div>
    </header>
  );
}

/* ---------------- Initial screen + animation ---------------- */
const CAPTIONS = [
  "",
  "SCAN YOUR ID HERE",
  "PLACE YOUR ID ON THE SCANNER",
  "TURN YOUR ID OVER",
  "TURN YOUR ID OVER",
  "PLACE THE BARCODE FLAT ON THE SCANNER",
  "PLACE THE BARCODE FLAT ON THE SCANNER",
];
const GUIDE_STEPS = CAPTIONS.length;

function InitialScreen({ onPlaced, onUnreadable }: { onPlaced: () => void; onUnreadable: () => void }) {
  const [f, setF] = useState(0);

  const zoomed = f >= 2;
  const scene = f < 3 ? hardwareAsset.url : f === 3 ? handFrontImg : f < 6 ? handBackImg : handPlaceImg;

  return (
    <div className="grid h-full grid-cols-[34fr_66fr]">
      <section className="flex flex-col justify-center border-r border-k-line bg-k-paper px-[4vw]">
        <p className="mb-6 text-sm font-semibold tracking-[0.2em] text-k-ocean">SEAVIST HOTEL</p>
        <h1 className="text-[clamp(2.2rem,4.2vw,4.6rem)] font-bold leading-[1.02] tracking-tight text-k-navy">
          YOUR JOURNEY BEGINS HERE
        </h1>
        <p className="mt-6 text-[clamp(1.1rem,1.5vw,1.6rem)] text-k-sub">Scan your ID privately and securely.</p>
        <div className="mt-10 flex items-center gap-1" aria-label="ID scanning guide steps">
          {Array.from({ length: GUIDE_STEPS }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setF(i)}
              aria-label={`Show instruction ${i + 1} of ${GUIDE_STEPS}`}
              aria-current={i === f ? "step" : undefined}
              className={`grid h-7 w-7 place-items-center rounded-full border transition-colors ${i === f ? "border-k-navy bg-k-navy" : "border-k-line bg-k-paper hover:border-k-ocean"}`}
            >
              <span className={`h-2.5 w-2.5 rounded-full ${i === f ? "bg-k-paper" : "bg-k-line"}`} />
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm text-k-sub">Tap a dot to view each step.</p>
      </section>

      <section
        className="relative overflow-hidden bg-k-chrome"
        aria-label="ID placement instructions"
      >
        {/* Every frame keeps the exact reference photo and hardware proportions. */}
        <img
          src={scene}
          alt="Directful tablet and Unitech scanner connected by cable on the Seavist Hotel front desk"
          width={1536}
          height={1024}
          className="absolute inset-0 h-full w-full object-contain"
          style={{
            transform: zoomed ? `scale(${f >= 5 ? 1.5 : 1.34})` : "scale(0.94)",
            transformOrigin: "36% 54%",
          }}
        />

        {/* Callout: scanner in counter scene */}
        <Callout visible={f === 1} style={{ left: "10%", top: "22%" }} arrowDown>
          {CAPTIONS[1]}
        </Callout>
        {f === 1 && (
          <div className="k-pulse pointer-events-none absolute rounded-md border-2 border-k-gold" style={{ left: "18%", top: "42%", width: "28%", height: "34%" }} />
        )}

        {/* Callout: glass */}
        <Callout visible={f === 2} style={{ left: "32%", top: "4%" }} arrowDown>
          {CAPTIONS[2]}
        </Callout>
        {f === 2 && (
          <div className="k-pulse pointer-events-none absolute rounded-md border-2 border-k-gold" style={{ left: "16%", top: "14%", width: "68%", height: "38%" }} />
        )}

        {/* Caption for card frames */}
        <Callout visible={f >= 3} style={{ left: "50%", bottom: "6%", transform: "translateX(-50%)" }}>
          {CAPTIONS[f] || CAPTIONS[6]}
        </Callout>

        {f === GUIDE_STEPS - 1 && (
          <button
            type="button"
            onClick={onPlaced}
            className="absolute bottom-6 left-1/2 h-14 -translate-x-1/2 rounded-md bg-k-gold px-7 text-lg font-bold text-k-navy shadow-lg hover:brightness-105"
          >
            ID Placed on Scanner
          </button>
        )}

        {/* Discreet demo control */}
        <button
          onClick={(e) => { e.stopPropagation(); onUnreadable(); }}
          className="absolute bottom-2 right-2 rounded px-2 py-1 text-[10px] text-k-mist/30 hover:text-k-mist/70"
        >
          demo: unreadable ID
        </button>
      </section>
    </div>
  );
}

function Callout({ children, visible, style, arrowDown }: { children: ReactNode; visible: boolean; style: React.CSSProperties; arrowDown?: boolean }) {
  return (
    <div
      className="pointer-events-none absolute flex flex-col items-center transition-all duration-500"
      style={{ ...style, opacity: visible ? 1 : 0 }}
    >
      <div className="rounded-md bg-k-navy px-5 py-3 text-[clamp(0.9rem,1.25vw,1.35rem)] font-semibold tracking-[0.08em] text-k-mist shadow-lg">
        {children}
      </div>
      {arrowDown && (
        <svg className="k-nudge mt-2 h-10 w-10 text-k-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
          <path d="M12 3v17M5 13l7 7 7-7" />
        </svg>
      )}
    </div>
  );
}

/* ---------------- Locating ---------------- */
function Locating() {
  return (
    <div className="grid h-full place-items-center bg-k-paper">
      <div className="flex flex-col items-center text-center">
        <div className="k-spin h-16 w-16 rounded-full border-4 border-k-line border-t-k-ocean" aria-hidden />
        <h2 className="mt-8 text-[clamp(1.8rem,3vw,3rem)] font-semibold text-k-navy">Locating your reservation...</h2>
        <p className="mt-3 text-lg text-k-sub">This will only take a moment.</p>
      </div>
    </div>
  );
}

/* ---------------- Found ---------------- */
function Found({ onNext }: { onNext: () => void }) {
  return (
    <div className="grid h-full grid-cols-[47fr_53fr] bg-k-mist">
      <section className="flex flex-col justify-center border-r border-k-line bg-k-paper px-[5vw] py-10">
        <p className="text-sm font-semibold tracking-[0.2em] text-k-ocean">RESERVATION FOUND</p>
        <h2 className="mt-3 text-[clamp(2.3rem,3.8vw,4rem)] font-bold text-k-navy">Daniel Carter</h2>
        <dl className="mt-8 grid grid-cols-[0.7fr_1fr_1.3fr] gap-3 border-y border-k-line py-6 text-[clamp(0.95rem,1.35vw,1.125rem)]">
          <Info label="Room" value="1204" />
          <Info label="Stay" value="Sep 25 – Sep 28" />
          <Info label="Room type" value="King Ocean View" />
        </dl>
        <div className="mt-7 flex items-center gap-4">
          <span className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-sm bg-k-green/12 px-3 py-1.5 text-sm font-semibold tracking-wider text-k-green">
            <Check className="h-4 w-4" strokeWidth={3} /> ID VERIFIED
          </span>
          <span className="text-k-sub">US Driver's License · Massachusetts</span>
        </div>
      </section>
      <section className="relative flex flex-col justify-end overflow-hidden p-10">
        <img src={breakfastImg} alt="Breakfast for two with coffee, orange juice, pastries and eggs" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-k-navy/75" />
        <div className="relative max-w-xl text-k-mist">
          <p className="text-sm font-bold tracking-[0.18em] text-k-gold">YOUR GUEST BENEFIT</p>
          <h3 className="mt-3 text-[clamp(2rem,3.4vw,3.8rem)] font-bold leading-tight">Complimentary breakfast for two</h3>
          <p className="mt-4 text-xl text-k-mist/85">Add your information to claim breakfast during your stay.</p>
          <button onClick={onNext} className="mt-8 h-16 min-w-64 rounded-md bg-k-gold px-8 text-xl font-bold text-k-navy transition hover:brightness-105 active:scale-[0.99]">
            Add Information
          </button>
        </div>
      </section>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm text-k-sub">{label}</dt>
      <dd className="mt-1 font-semibold text-k-ink">{value}</dd>
    </div>
  );
}

/* ---------------- Claim ---------------- */
function Claim({ onClaim }: { onClaim: () => void }) {
  const [phone, setPhone] = useState("+1 (555) 018-0127");
  const [email, setEmail] = useState("daniel.carter@email.com");
  const [consent, setConsent] = useState(false);
  const phoneOk = phone.replace(/\D/g, "").length >= 10;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const valid = phoneOk && emailOk && consent;

  return (
    <div className="grid h-full grid-cols-[45fr_55fr]">
      <section className="relative overflow-hidden">
        <img src={breakfastImg} alt="Breakfast for two with coffee, orange juice, pastries and eggs" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-k-navy/95 to-transparent p-10 pt-32">
          <span className="inline-block rounded-sm bg-k-gold px-3 py-1 text-xs font-bold tracking-[0.18em] text-k-navy">GUEST BENEFIT</span>
          <p className="mt-4 text-[clamp(1.6rem,2.6vw,2.6rem)] font-bold leading-tight text-k-mist">COMPLIMENTARY BREAKFAST FOR TWO</p>
          <p className="mt-2 text-lg text-k-mist/80">Enjoy breakfast for two during your stay.</p>
        </div>
      </section>
      <section className="flex flex-col justify-center overflow-y-auto bg-k-paper px-[5vw] py-8">
        <h2 className="text-[clamp(1.5rem,2.3vw,2.4rem)] font-bold leading-tight text-k-navy">ADD YOUR INFORMATION &amp; CLAIM YOUR BREAKFAST</h2>
        <p className="mt-3 text-lg text-k-sub">Confirm your contact information to receive your guest benefit.</p>
        <div className="mt-8 space-y-5">
          <Field label="Phone" value={phone} onChange={setPhone} error={!phoneOk ? "Please enter a valid phone number." : ""} type="tel" />
          <Field label="Email" value={email} onChange={setEmail} error={!emailOk ? "Please enter a valid email address." : ""} type="email" />
        </div>
        <Checkbox checked={consent} onChange={setConsent} className="mt-6">
          By submitting this information, I consent to Seavist Hotel contacting me by phone or email regarding my stay and guest benefit.{" "}
          <a href="#" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className="font-medium text-k-ocean underline underline-offset-2">View Privacy Policy</a>
        </Checkbox>
        <button
          disabled={!valid}
          onClick={onClaim}
          className="mt-8 h-16 w-full rounded-md bg-k-gold text-xl font-bold text-k-navy transition hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-k-line disabled:text-k-sub"
        >
          Claim Breakfast
        </button>
      </section>
    </div>
  );
}

function Field({ label, value, onChange, error, type }: { label: string; value: string; onChange: (v: string) => void; error: string; type: string }) {
  const id = `f-${label}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-k-ink">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-14 w-full rounded-[4px] border bg-k-paper px-4 text-lg outline-none transition focus:border-k-ocean focus:shadow-[inset_0_-2px_0_var(--k-ocean)] ${error ? "border-destructive" : "border-k-line"}`}
      />
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
}

function Checkbox({ checked, onChange, children, className = "" }: { checked: boolean; onChange: (v: boolean) => void; children: ReactNode; className?: string }) {
  return (
    <label className={`flex cursor-pointer items-start gap-3 text-[15px] leading-relaxed text-k-sub ${className}`}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only" />
      <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-[3px] border-2 transition ${checked ? "border-k-navy bg-k-navy text-k-mist" : "border-k-sub bg-k-paper"}`}>
        {checked && <Check className="h-4 w-4" strokeWidth={3} />}
      </span>
      <span>{children}</span>
    </label>
  );
}

/* ---------------- Delivery ---------------- */
function DeliveryStep({ onBack, onConfirm }: { onBack: () => void; onConfirm: (d: Delivery) => void }) {
  const [choice, setChoice] = useState<Delivery | null>(null);
  const [agree, setAgree] = useState(false);
  const opts: { id: Delivery; title: string; desc: string; Icon: typeof Mail }[] = [
    { id: "sms", title: "Text message", desc: "We'll send your voucher via SMS.", Icon: MessageSquare },
    { id: "email", title: "Email", desc: "We'll send your voucher to your email.", Icon: Mail },
  ];
  return (
    <div className="grid h-full place-items-center bg-k-mist px-8">
      <div className="w-full max-w-3xl">
        <h2 className="text-[clamp(1.8rem,2.8vw,2.8rem)] font-bold text-k-navy">How would you like to receive your breakfast voucher?</h2>
        <div role="radiogroup" className="mt-8 grid grid-cols-2 gap-5">
          {opts.map(({ id, title, desc, Icon }) => {
            const on = choice === id;
            return (
              <button
                key={id}
                role="radio"
                aria-checked={on}
                onClick={() => setChoice(id)}
                className={`flex items-start gap-4 rounded-md border-2 bg-k-paper p-6 text-left transition ${on ? "border-k-navy shadow-md" : "border-k-line hover:border-k-sub"}`}
              >
                <span className={`mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 ${on ? "border-k-navy" : "border-k-sub"}`}>
                  {on && <span className="h-3 w-3 rounded-full bg-k-navy" />}
                </span>
                <span>
                  <span className="flex items-center gap-2 text-xl font-semibold text-k-ink"><Icon className="h-5 w-5 text-k-ocean" /> {title}</span>
                  <span className="mt-1 block text-k-sub">{desc}</span>
                </span>
              </button>
            );
          })}
        </div>
        <Checkbox checked={agree} onChange={setAgree} className="mt-6 text-base">
          I agree to receive my breakfast voucher using the selected method.
        </Checkbox>
        <div className="mt-8 flex gap-4">
          <button onClick={onBack} className="h-16 rounded-md border border-k-line bg-k-paper px-8 text-lg font-semibold text-k-ink hover:bg-k-mist">Back</button>
          <button
            disabled={!choice || !agree}
            onClick={() => choice && onConfirm(choice)}
            className="h-16 flex-1 rounded-md bg-k-navy text-xl font-semibold text-k-mist transition hover:bg-k-ocean active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-k-line disabled:text-k-sub"
          >
            Confirm &amp; Continue
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Success ---------------- */
function Success({ delivery }: { delivery: Delivery }) {
  return (
    <div className="relative grid h-full place-items-center overflow-hidden bg-k-paper">
      <img src={breakfastImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.12]" />
      <div className="relative flex flex-col items-center px-8 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-k-green text-k-paper animate-scale-in">
          <Check className="h-10 w-10" strokeWidth={3} />
        </span>
        <h2 className="mt-8 text-[clamp(2.4rem,4vw,4.2rem)] font-bold text-k-navy">You're all set, Daniel.</h2>
        <p className="mt-4 text-xl text-k-ink">Your complimentary breakfast for two has been added to your stay.</p>
        <p className="mt-2 text-lg text-k-sub">Confirmation will be sent via {delivery === "sms" ? "text message" : "email"}.</p>
      </div>
    </div>
  );
}

/* ---------------- Error ---------------- */
function ErrorScreen() {
  return (
    <div className="grid h-full place-items-center bg-k-paper px-8 text-center">
      <div className="max-w-2xl">
        <h2 className="text-[clamp(2.2rem,3.6vw,3.6rem)] font-bold text-k-navy">Let's try that again.</h2>
        <p className="mt-4 text-xl text-k-ink">We couldn't read the barcode on your ID.</p>
        <p className="mt-3 text-lg text-k-sub">Turn your ID over and place the barcode flat on the scanner. Keep it still while we scan.</p>
      </div>
    </div>
  );
}
