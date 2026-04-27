import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import {
  BadgeCheck,
  BedDouble,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Dumbbell,
  Facebook,
  Flame,
  Instagram,
  Languages,
  MessageCircle,
  Music2,
  Repeat2,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
  Utensils,
  WalletCards,
  Zap,
} from "lucide-react";

import heroAthlete from "@/assets/bodyhack-athlete-hero.jpg";
import transform75 from "@/assets/transform-75.jpeg";
import transform100 from "@/assets/transform-100.jpeg";
import transform150 from "@/assets/transform-150.jpeg";
import transform120 from "@/assets/transform-120.jpeg";
import transform90a from "@/assets/transform-90a.jpeg";
import transform80 from "@/assets/transform-80.jpeg";
import transform90b from "@/assets/transform-90b.jpeg";
import transformWide1 from "@/assets/transform-wide-1.jpeg";
import transformWide2 from "@/assets/transform-wide-2.jpeg";
import transform90c from "@/assets/transform-90c.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Body Hack Fitness | Online Coaching" },
      {
        name: "description",
        content:
          "Body Hack coaching plans for cutting, bulking, nutrition, workouts, Arabic reviews, wallet payments, and WhatsApp booking.",
      },
      { property: "og:title", content: "Body Hack Fitness | Online Coaching" },
      {
        property: "og:description",
        content: "حوّل جسمك مع Body Hack: باقات تدريب وتغذية ومتابعة يومية ونتائج حقيقية.",
      },
    ],
  }),
  component: Index,
});

type Lang = "ar" | "en";
type Goal = "cut" | "bulk";
type Currency = "egp" | "usd";
type Duration = "1" | "2" | "3";
type PackageName = "Starter" | "Silver" | "Gold" | "Platinum";

const whatsapp = "201557707038";
const transferNumber = "01026770220";
const usdRate = 50;

const copy = {
  ar: {
    nav: ["النتائج", "الباقات", "الدفع", "التقييمات", "تواصل"],
    whatsapp: "واتساب",
    lang: "English",
    heroKicker: "تدريب احترافي · متابعة يومية · نتائج حقيقية",
    heroTitle1: "النتائج",
    heroTitle2: "لا تأتي عشوائياً",
    heroText: "إنها تأتي من الانضباط، الالتزام، والإيمان بنفسك.",
    heroCta: "اليوم هو أفضل يوم لتبدأ!",
    heroSub: "حوّل جسمك، اشحن عقلك، مع فريق Body Hack — تدريب احترافي ومتابعة يومية على الواتساب.",
    consult: "استشارة مجانية",
    seePlans: "شوف الباقات",
    introTitle: "حابب تبدأ بإيه؟",
    introText: "اختيارك هيساعدنا نرشح لك الباقة الأقوى لهدفك.",
    cut: "تنشيف",
    bulk: "تضخيم",
    changeGoal: "تغيير الهدف",
    programs: "برامجنا",
    storiesTitle: "تحولات العملاء",
    storiesSub: "Real People · Real Results",
    recommendTitle: "رشّح لي الباقة المناسبة",
    recommendSub: "جاوب 3 اختيارات وسنبرز لك أقوى باقة تناسبك.",
    commitment: "مستوى الالتزام",
    low: "بداية هادية",
    mid: "ملتزم",
    high: "عايز أقوى متابعة",
    budget: "الميزانية",
    economy: "اقتصادية",
    balanced: "متوسطة",
    premium: "مفتوحة للنتيجة",
    speed: "سرعة النتيجة",
    steady: "ثابتة",
    fast: "سريعة",
    extreme: "أسرع نتيجة",
    recommended: "الأنسب لك",
    strongest: "الخيار الأقوى",
    plansTitle: "اختار باقتك",
    plansSub: "نفس الأسعار الحالية · كل الباقات متاحة بالمصري والدولار",
    month: "شهر",
    twoMonths: "شهرين",
    threeMonths: "3 شهور",
    book: "احجز الآن",
    paymentTitle: "طرق الدفع",
    paymentSub: "اختار المحفظة، انسخ الرقم، حوّل، وابعت الإيصال على الواتساب.",
    transfer: "رقم التحويل",
    copied: "تم النسخ",
    copy: "نسخ الرقم",
    receipt: "ابعت الإيصال واتساب",
    reviewsTitle: "آراء العملاء",
    reviewsSub: "50 تقييم من دول عربية مختلفة — يظهر 10 والباقي عرض المزيد.",
    showMore: "عرض المزيد",
    contactTitle: "تواصل معانا",
    contactSub: "تابعنا أو احجز استشارتك المجانية الآن.",
    finalCta: "ابدأ تحولك اليوم",
  },
  en: {
    nav: ["Results", "Plans", "Payments", "Reviews", "Contact"],
    whatsapp: "WhatsApp",
    lang: "عربي",
    heroKicker: "Pro coaching · Daily follow-up · Real results",
    heroTitle1: "Results",
    heroTitle2: "are never random",
    heroText: "They come from discipline, consistency, and believing in yourself.",
    heroCta: "Today is the best day to start!",
    heroSub: "Transform your body and sharpen your mindset with Body Hack — professional coaching and daily WhatsApp follow-up.",
    consult: "Free consultation",
    seePlans: "See plans",
    introTitle: "What is your goal?",
    introText: "Your choice helps us recommend the strongest plan for you.",
    cut: "Cut",
    bulk: "Bulk",
    changeGoal: "Change goal",
    programs: "Our programs",
    storiesTitle: "Client transformations",
    storiesSub: "Real People · Real Results",
    recommendTitle: "Find my best plan",
    recommendSub: "Answer 3 quick choices and we will highlight the strongest plan for your goal.",
    commitment: "Commitment level",
    low: "Easy start",
    mid: "Committed",
    high: "Maximum support",
    budget: "Budget",
    economy: "Economy",
    balanced: "Balanced",
    premium: "Result-first",
    speed: "Result speed",
    steady: "Steady",
    fast: "Fast",
    extreme: "Fastest",
    recommended: "Recommended for you",
    strongest: "Ultimate choice",
    plansTitle: "Choose your plan",
    plansSub: "Same current prices · Switch instantly between EGP and USD",
    month: "1 Month",
    twoMonths: "2 Months",
    threeMonths: "3 Months",
    book: "Book now",
    paymentTitle: "Payment methods",
    paymentSub: "Choose a wallet, copy the number, transfer, then send the receipt on WhatsApp.",
    transfer: "Transfer number",
    copied: "Copied",
    copy: "Copy number",
    receipt: "Send receipt",
    reviewsTitle: "Client reviews",
    reviewsSub: "50 reviews from Arab countries — 10 shown first, the rest with show more.",
    showMore: "Show more",
    contactTitle: "Contact us",
    contactSub: "Follow us or book your free consultation now.",
    finalCta: "Start your transformation today",
  },
};

const programs = [
  { icon: Flame, ar: "تنشيف", en: "Weight Loss" },
  { icon: Dumbbell, ar: "تضخيم", en: "Muscle Building" },
  { icon: Trophy, ar: "قوة", en: "Strength" },
  { icon: Utensils, ar: "تغذية", en: "Nutrition" },
  { icon: BedDouble, ar: "نوم", en: "Sleep" },
  { icon: Repeat2, ar: "استمرارية", en: "Consistency" },
];

const stories = [
  { img: transform75, label: "Day 75" },
  { img: transform100, label: "Day 100" },
  { img: transform150, label: "Day 150" },
  { img: transform120, label: "Day 120" },
  { img: transform90a, label: "Day 90" },
  { img: transform80, label: "Day 80" },
  { img: transform90b, label: "Day 90" },
  { img: transformWide1, label: "Day 90" },
  { img: transformWide2, label: "Day 90" },
  { img: transform90c, label: "Day 90" },
];

const packages: Array<{
  name: PackageName;
  tone: string;
  badge?: "popular" | "ultimate";
  prices: Record<Duration, number>;
  old: Record<Duration, number>;
  featuresAr: string[];
  featuresEn: string[];
}> = [
  {
    name: "Starter",
    tone: "border-steel/50 shadow-[0_0_45px_-30px_var(--color-steel)]",
    prices: { "1": 299, "2": 549, "3": 799 },
    old: { "1": 450, "2": 700, "3": 1100 },
    featuresAr: ["برنامج تمرين مخصص", "نظام غذائي بسيط", "متابعة أسبوعية", "مناسب للمبتدئين"],
    featuresEn: ["Custom workout", "Simple nutrition plan", "Weekly follow-up", "Beginner friendly"],
  },
  {
    name: "Silver",
    tone: "border-platinum/60 shadow-[0_0_55px_-28px_var(--color-platinum)]",
    prices: { "1": 449, "2": 849, "3": 1249 },
    old: { "1": 650, "2": 1100, "3": 1700 },
    featuresAr: ["برنامج تمرين متقدم", "نظام غذائي محسوب", "متابعة مرتين أسبوعياً", "دعم واتساب"],
    featuresEn: ["Advanced workout", "Calculated nutrition", "Twice-weekly follow-up", "WhatsApp support"],
  },
  {
    name: "Gold",
    tone: "border-gold/70 shadow-[0_0_70px_-26px_var(--color-gold)]",
    badge: "popular",
    prices: { "1": 649, "2": 1199, "3": 1799 },
    old: { "1": 900, "2": 1500, "3": 2400 },
    featuresAr: ["برنامج احترافي", "متابعة يومية", "خطة مكملات", "تقارير قياسات دورية", "تعديل مستمر"],
    featuresEn: ["Pro workout system", "Daily follow-up", "Supplement plan", "Progress reports", "Continuous updates"],
  },
  {
    name: "Platinum",
    tone: "border-fire/80 shadow-[0_0_90px_-20px_var(--color-fire)]",
    badge: "ultimate",
    prices: { "1": 1099, "2": 1999, "3": 2899 },
    old: { "1": 1500, "2": 2500, "3": 3800 },
    featuresAr: ["متابعة يومية كاملة", "تمرين + دايت متكامل", "دعم 24/7", "مكالمات فيديو", "خطة مكملات احترافية"],
    featuresEn: ["Full daily follow-up", "Workout + diet system", "24/7 support", "Video calls", "Professional supplement plan"],
  },
];

const wallets = [
  { name: "InstaPay", icon: WalletCards },
  { name: "Vodafone Cash", icon: Zap },
  { name: "WE Pay", icon: ShieldCheck },
  { name: "Orange Cash", icon: Flame },
  { name: "Etisalat Cash", icon: Target },
];

const reviewsAr = [
  ["أحمد", "مصر", "بصراحة متابعة يومية فرقت معايا جداً، نزلت وعضلاتي بانت."],
  ["محمود", "مصر", "Gold كان اختيار جامد، الكوتش فاهم وبيعدل الخطة حسب جسمي."],
  ["يوسف", "مصر", "كنت تايه في الأكل والتمرين، دلوقتي كل حاجة واضحة."],
  ["سارة", "مصر", "الدايت مش حرمان خالص، خسيت وأنا مرتاحة."],
  ["كريم", "مصر", "أول مرة أحس إن في حد متابعني بجد مش برنامج وخلاص."],
  ["عبدالله", "السعودية", "والله شغل مرتب، التمارين واضحة والمتابعة ممتازة."],
  ["خالد", "الإمارات", "Platinum ممتاز لو تبغى متابعة قوية ونتيجة سريعة."],
  ["حسن", "الكويت", "الخطة سهلة الالتزام والنتيجة بينت من أول شهر."],
  ["عمر", "قطر", "الدعم سريع وكل سؤال له رد واضح."],
  ["مصطفى", "المغرب", "برنامج زوين بزاف، تبدل جسمي وثقتي رجعات."],
  ["إبراهيم", "لبنان", "المتابعة كتير منيحة والأكل مناسب لروتيني."],
  ["علي", "الأردن", "خطة عملية ومش معقدة، نزلت دهون بدون تعب نفسي."],
  ["حسين", "البحرين", "التزامي زاد لأن في حد بيحاسبني كل يوم."],
  ["مازن", "عمان", "نتيجة ممتازة وخطة الأكل واقعية."],
  ["رامي", "مصر", "Silver كفاية جداً لو انت ملتزم، نتيجة محترمة."],
  ["نور", "مصر", "حبيت إنهم بيسمعوا ظروفي وبيغيروا الخطة."],
  ["طارق", "مصر", "الجسم شد واللبس بقي أحسن عليا."],
  ["زياد", "مصر", "أكتر حاجة فرقت القياسات الأسبوعية."],
  ["هاني", "مصر", "كنت عايز أضخم من غير كرش، الخطة ظبطتني."],
  ["وليد", "مصر", "متابعة الواتساب سريعة ومحترمة."],
];

const moreCountries = ["السودان", "تونس", "الجزائر", "العراق", "فلسطين", "ليبيا", "اليمن", "سوريا", "السعودية", "مصر"];
const reviews = Array.from({ length: 50 }, (_, i) => {
  const base = reviewsAr[i % reviewsAr.length];
  const country = i < reviewsAr.length ? base[1] : moreCountries[i % moreCountries.length];
  return {
    name: base[0],
    country,
    ar: i < reviewsAr.length ? base[2] : `تجربة ممتازة مع Body Hack، المتابعة فرقت والنتيجة ظهرت خطوة بخطوة.`,
    en: `Great experience with Body Hack. The follow-up made a real difference and the results came step by step.`,
  };
});

function Index() {
  const [lang, setLang] = useState<Lang>("ar");
  const [goal, setGoal] = useState<Goal | null>(null);
  const [currency, setCurrency] = useState<Currency>("egp");
  const [duration, setDuration] = useState<Duration>("1");
  const [commitment, setCommitment] = useState(1);
  const [budget, setBudget] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [visibleReviews, setVisibleReviews] = useState(10);
  const [selectedWallet, setSelectedWallet] = useState(wallets[0].name);
  const [copied, setCopied] = useState(false);
  const storyRef = useRef<HTMLDivElement>(null);
  const t = copy[lang];
  const rtl = lang === "ar";

  const recommended = useMemo<PackageName>(() => {
    const score = commitment + budget + speed + (goal === "bulk" ? 1 : 0);
    if (score >= 8) return "Platinum";
    if (score >= 6) return "Gold";
    if (score >= 4) return "Silver";
    return "Starter";
  }, [budget, commitment, goal, speed]);

  const wa = (text: string) => `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
  const formatPrice = (price: number) =>
    currency === "egp" ? `${price} ج.م` : `$${Math.max(6, Math.round(price / usdRate))}`;

  const scrollStories = (dir: number) => storyRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  const handleCopy = async () => {
    await navigator.clipboard.writeText(transferNumber);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  if (!goal) {
    return (
      <main dir={rtl ? "rtl" : "ltr"} className="min-h-screen bg-radial-fire text-foreground">
        <LanguageButton lang={lang} onClick={() => setLang(lang === "ar" ? "en" : "ar")} />
        <section className="mx-auto flex min-h-screen max-w-6xl items-center px-5 py-10">
          <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div className="animate-rise space-y-7">
              <Brand />
              <div className="space-y-4">
                <p className="text-sm font-bold uppercase tracking-normal text-fire">Body Hack Fitness</p>
                <h1 className="font-display text-6xl uppercase leading-none md:text-8xl">
                  {t.introTitle}
                </h1>
                <p className="max-w-xl text-lg text-muted-foreground">{t.introText}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <button onClick={() => setGoal("cut")} className="group clip-sport border border-fire/70 bg-card p-6 text-start shadow-fire transition duration-300 hover:-translate-y-1 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <Flame className="mb-5 size-9 text-fire transition group-hover:scale-110" />
                  <span className="font-display text-4xl uppercase">{t.cut}</span>
                  <p className="mt-3 text-sm text-muted-foreground">{lang === "ar" ? "حرق دهون، شد جسم، وظهور عضلات." : "Burn fat, tighten up, reveal definition."}</p>
                </button>
                <button onClick={() => setGoal("bulk")} className="group clip-sport border border-gold/70 bg-card p-6 text-start shadow-[0_0_60px_-25px_var(--color-gold)] transition duration-300 hover:-translate-y-1 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <Dumbbell className="mb-5 size-9 text-gold transition group-hover:scale-110" />
                  <span className="font-display text-4xl uppercase">{t.bulk}</span>
                  <p className="mt-3 text-sm text-muted-foreground">{lang === "ar" ? "زيادة عضل صحية وشكل أقوى." : "Build lean mass and a stronger shape."}</p>
                </button>
              </div>
            </div>
            <HeroImage lang={lang} />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main dir={rtl ? "rtl" : "ltr"} className="min-h-screen bg-radial-fire text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
          <Brand compact />
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {t.nav.map((item, index) => (
              <a key={item} href={["#results", "#plans", "#payments", "#reviews", "#contact"][index]} className="transition hover:text-fire">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm font-bold transition hover:border-fire hover:text-fire focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Languages className="size-4" /> {t.lang}
            </button>
            <a href={wa(lang === "ar" ? "مرحباً، عايز استشارة مجانية" : "Hi, I want a free consultation")} className="hidden rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground shadow-fire transition hover:scale-105 sm:inline-flex">
              {t.whatsapp}
            </a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden px-5 py-14 md:py-20">
        <div className="absolute inset-0 grit-mask opacity-25" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-rise space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-fire/60 bg-secondary px-4 py-2 text-xs font-bold uppercase text-fire">
              <Flame className="size-4" /> {t.heroKicker}
            </div>
            <h1 className="font-display text-6xl uppercase leading-none md:text-8xl lg:text-9xl">
              <span className="block text-fire">{t.heroTitle1}</span>
              <span className="block">{t.heroTitle2}</span>
            </h1>
            <p className="max-w-2xl text-xl font-semibold text-foreground md:text-2xl">{t.heroText}</p>
            <p className="max-w-2xl text-muted-foreground">{t.heroSub}</p>
            <div className="flex flex-wrap gap-3">
              <a href={wa(lang === "ar" ? `مرحباً، هدفي ${goal === "cut" ? "تنشيف" : "تضخيم"} وعايز استشارة` : `Hi, my goal is ${goal} and I want a consultation`)} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground shadow-fire transition hover:scale-105">
                <MessageCircle className="size-5" /> {t.consult}
              </a>
              <a href="#plans" className="inline-flex items-center gap-2 rounded-full border border-fire/60 bg-background px-6 py-3 font-bold transition hover:bg-secondary hover:text-fire">
                {t.seePlans}
              </a>
              <button onClick={() => setGoal(null)} className="rounded-full border border-border px-5 py-3 text-sm font-bold text-muted-foreground transition hover:text-foreground">
                {t.changeGoal}
              </button>
            </div>
            <div className="grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {["4.9/5", "+99", "18", goal === "cut" ? t.cut : t.bulk].map((stat, i) => (
                <div key={i} className="clip-sport border border-border bg-card/80 p-4 text-center">
                  <strong className="block font-display text-3xl text-fire">{stat}</strong>
                  <span className="text-xs text-muted-foreground">{lang === "ar" ? ["تقييم", "عميل", "دولة", "هدفك"][i] : ["Rating", "Clients", "Countries", "Goal"][i]}</span>
                </div>
              ))}
            </div>
          </div>
          <HeroImage lang={lang} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8">
        <div className="clip-sport border border-fire/40 bg-card p-5 shadow-fire">
          <h2 className="mb-5 font-display text-3xl uppercase"><span className="text-fire">Our</span> {t.programs}</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
            {programs.map(({ icon: Icon, ar, en }) => (
              <div key={en} className="group rounded-lg border border-border bg-background/50 p-4 text-center transition hover:-translate-y-1 hover:border-fire/70">
                <Icon className="mx-auto mb-3 size-8 text-fire transition group-hover:scale-110" />
                <p className="text-sm font-bold">{lang === "ar" ? ar : en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="results" className="mx-auto max-w-7xl px-5 py-14">
        <SectionTitle kicker={t.storiesSub} title={t.storiesTitle} />
        <div className="mt-8 flex items-center justify-between gap-3">
          <button onClick={() => scrollStories(rtl ? 1 : -1)} className="rounded-full border border-border bg-card p-3 transition hover:border-fire hover:text-fire" aria-label="previous stories"><ChevronLeft /></button>
          <button onClick={() => scrollStories(rtl ? -1 : 1)} className="rounded-full border border-border bg-card p-3 transition hover:border-fire hover:text-fire" aria-label="next stories"><ChevronRight /></button>
        </div>
        <div ref={storyRef} className="mt-5 flex snap-x gap-5 overflow-x-auto pb-5 [scrollbar-width:none]">
          {stories.map((story, index) => (
            <article key={story.label + index} className="group min-w-[280px] snap-center overflow-hidden border border-fire/60 bg-card shadow-fire transition duration-300 hover:-translate-y-2 md:min-w-[360px]">
              <div className="relative aspect-square overflow-hidden">
                <img src={story.img} alt={`Body Hack transformation ${story.label}`} loading="lazy" className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0 group-hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-5">
                  <span className="font-display text-4xl uppercase text-fire">{story.label}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="clip-sport border border-fire/50 bg-card p-6 shadow-fire">
            <SectionTitle kicker="Smart Recommendation" title={t.recommendTitle} compact />
            <p className="mt-3 text-muted-foreground">{t.recommendSub}</p>
            <QuizGroup title={t.commitment} values={[t.low, t.mid, t.high]} value={commitment} setValue={setCommitment} />
            <QuizGroup title={t.budget} values={[t.economy, t.balanced, t.premium]} value={budget} setValue={setBudget} />
            <QuizGroup title={t.speed} values={[t.steady, t.fast, t.extreme]} value={speed} setValue={setSpeed} />
          </div>
          <PricingBlock lang={lang} t={t} currency={currency} setCurrency={setCurrency} duration={duration} setDuration={setDuration} recommended={recommended} formatPrice={formatPrice} wa={wa} goal={goal} />
        </div>
      </section>

      <section id="payments" className="mx-auto max-w-7xl px-5 py-14">
        <SectionTitle kicker="Payment Methods" title={t.paymentTitle} subtitle={t.paymentSub} />
        <div className="mt-8 grid gap-4 md:grid-cols-5">
          {wallets.map(({ name, icon: Icon }) => (
            <button key={name} onClick={() => setSelectedWallet(name)} className={`clip-sport border p-5 text-start transition hover:-translate-y-1 ${selectedWallet === name ? "border-fire bg-secondary shadow-fire" : "border-border bg-card"}`}>
              <Icon className="mb-4 size-8 text-fire" />
              <span className="font-bold">{name}</span>
            </button>
          ))}
        </div>
        <div className="mt-6 grid gap-5 rounded-xl border border-fire/40 bg-card p-6 shadow-fire md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-sm text-muted-foreground">{selectedWallet} · {t.transfer}</p>
            <p className="mt-2 font-display text-5xl text-fire">{transferNumber}</p>
            <p className="mt-3 text-sm text-muted-foreground">{lang === "ar" ? "حوّل القيمة ثم صوّر الإيصال وابعتها واتساب." : "Transfer the amount, screenshot the receipt, then send it on WhatsApp."}</p>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={handleCopy} className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 font-bold transition hover:border-fire hover:text-fire">
              {copied ? <Check className="size-5" /> : <Copy className="size-5" />} {copied ? t.copied : t.copy}
            </button>
            <a href={wa(lang === "ar" ? `حوّلت على ${selectedWallet} ودي صورة الإيصال` : `I transferred via ${selectedWallet}. Here is the receipt.`)} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-bold text-primary-foreground shadow-fire transition hover:scale-105">
              <Send className="size-5" /> {t.receipt}
            </a>
          </div>
        </div>
      </section>

      <section id="reviews" className="mx-auto max-w-7xl px-5 py-14">
        <SectionTitle kicker="4.9 / 5" title={t.reviewsTitle} subtitle={t.reviewsSub} />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {reviews.slice(0, visibleReviews).map((review, i) => (
            <article key={`${review.name}-${i}`} className="rounded-xl border border-border bg-card p-4 transition hover:-translate-y-1 hover:border-fire/60">
              <div className="mb-3 flex gap-1 text-fire">{Array.from({ length: 5 }).map((_, s) => <Star key={s} className="size-4 fill-current" />)}</div>
              <p className="text-sm text-muted-foreground">“{lang === "ar" ? review.ar : review.en}”</p>
              <div className="mt-4 border-t border-border pt-3">
                <strong>{review.name}</strong>
                <span className="block text-xs text-fire">{review.country}</span>
              </div>
            </article>
          ))}
        </div>
        {visibleReviews < reviews.length && (
          <div className="mt-8 text-center">
            <button onClick={() => setVisibleReviews((v) => Math.min(50, v + 10))} className="rounded-full border border-fire/60 px-7 py-3 font-bold transition hover:bg-secondary hover:text-fire">
              {t.showMore} ({reviews.length - visibleReviews})
            </button>
          </div>
        )}
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-5 py-14">
        <div className="clip-sport border border-fire/50 bg-card p-8 text-center shadow-fire">
          <SectionTitle kicker="Book Your Transformation" title={t.contactTitle} subtitle={t.contactSub} compact />
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Social href="https://www.instagram.com/body_hack1?igsh=MXcwYTJ3cmYxdjNxdA%3D%3D&utm_source=qr" label="Instagram" icon={Instagram} />
            <Social href="https://www.tiktok.com/@asser_070?_r=1&_t=ZS-95sGCXdgmt3" label="TikTok" icon={Music2} />
            <Social href="https://www.facebook.com/share/1KwsAk1JSE/?mibextid=wwXIfr" label="Facebook" icon={Facebook} />
            <a href={wa(lang === "ar" ? "عايز أبدأ تحولي مع Body Hack" : "I want to start my Body Hack transformation")} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground shadow-fire transition hover:scale-105">
              <MessageCircle className="size-5" /> {t.finalCta}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-fire">
        <Dumbbell className="size-6 rotate-[-35deg]" />
      </div>
      <div>
        <strong className={`font-display uppercase leading-none ${compact ? "text-xl" : "text-2xl"}`}>Body Hack</strong>
        <span className="block text-xs font-black uppercase tracking-[0.45em] text-fire">Fitness</span>
      </div>
    </div>
  );
}

function LanguageButton({ lang, onClick }: { lang: Lang; onClick: () => void }) {
  return (
    <button onClick={onClick} className="fixed end-5 top-5 z-50 inline-flex items-center gap-2 rounded-full border border-fire/60 bg-background/80 px-4 py-2 font-bold text-foreground backdrop-blur transition hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <Languages className="size-4 text-fire" /> {copy[lang].lang}
    </button>
  );
}

function HeroImage({ lang }: { lang: Lang }) {
  return (
    <div className="relative animate-rise" style={{ animationDelay: "120ms" }}>
      <div className="absolute -inset-4 rounded-[2rem] bg-primary/20 blur-3xl" aria-hidden="true" />
      <div className="clip-sport relative overflow-hidden border border-fire/50 bg-card shadow-fire">
        <img src={heroAthlete} alt="Body Hack athlete in dark gym" width={1280} height={896} className="h-full min-h-[420px] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/85" />
        <div className="absolute bottom-6 end-6 max-w-[70%] text-end">
          <p className="font-display text-5xl uppercase leading-none md:text-7xl">{lang === "ar" ? "ابدأ" : "Start"}</p>
          <p className="font-display text-3xl uppercase text-fire md:text-5xl">{lang === "ar" ? "التحول" : "The Change"}</p>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ kicker, title, subtitle, compact = false }: { kicker: string; title: string; subtitle?: string; compact?: boolean }) {
  return (
    <div className={compact ? "" : "text-center"}>
      <p className="text-sm font-black uppercase text-fire">{kicker}</p>
      <h2 className={`font-display uppercase leading-none ${compact ? "mt-2 text-4xl" : "mt-3 text-5xl md:text-7xl"}`}>{title}</h2>
      {subtitle && <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

function QuizGroup({ title, values, value, setValue }: { title: string; values: string[]; value: number; setValue: (value: number) => void }) {
  return (
    <div className="mt-6">
      <p className="mb-3 text-sm font-bold text-muted-foreground">{title}</p>
      <div className="grid grid-cols-3 gap-2">
        {values.map((label, index) => (
          <button key={label} onClick={() => setValue(index + 1)} className={`rounded-lg border px-3 py-3 text-xs font-bold transition ${value === index + 1 ? "border-fire bg-primary text-primary-foreground shadow-fire" : "border-border bg-background hover:border-fire"}`}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function PricingBlock({ lang, t, currency, setCurrency, duration, setDuration, recommended, formatPrice, wa, goal }: { lang: Lang; t: typeof copy.ar; currency: Currency; setCurrency: (c: Currency) => void; duration: Duration; setDuration: (d: Duration) => void; recommended: PackageName; formatPrice: (p: number) => string; wa: (text: string) => string; goal: Goal }) {
  return (
    <div id="plans">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionTitle kicker="Pricing" title={t.plansTitle} subtitle={t.plansSub} compact />
        <div className="flex gap-2 rounded-full border border-border bg-card p-1">
          {(["egp", "usd"] as Currency[]).map((c) => (
            <button key={c} onClick={() => setCurrency(c)} className={`rounded-full px-4 py-2 text-sm font-bold uppercase transition ${currency === c ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>{c}</button>
          ))}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {(["1", "2", "3"] as Duration[]).map((d) => (
          <button key={d} onClick={() => setDuration(d)} className={`rounded-full border px-5 py-2 text-sm font-bold transition ${duration === d ? "border-fire bg-secondary text-fire" : "border-border text-muted-foreground hover:text-foreground"}`}>
            {d === "1" ? t.month : d === "2" ? t.twoMonths : t.threeMonths}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {packages.map((plan) => {
          const isRecommended = plan.name === recommended;
          return (
            <article key={plan.name} className={`relative rounded-xl border bg-card p-5 transition duration-300 hover:-translate-y-2 ${plan.tone} ${isRecommended ? "pulse-fire ring-2 ring-fire" : ""}`}>
              {isRecommended && <div className="absolute -top-4 start-5 rounded-full bg-primary px-4 py-2 text-xs font-black text-primary-foreground shadow-fire"><Sparkles className="me-1 inline size-4" />{t.recommended}</div>}
              {plan.badge && <div className="mb-4 inline-flex items-center gap-1 rounded-full border border-fire/50 px-3 py-1 text-xs font-bold text-fire"><BadgeCheck className="size-4" />{plan.badge === "ultimate" ? t.strongest : "Most Popular"}</div>}
              <p className="text-xs font-black uppercase text-muted-foreground">Package</p>
              <h3 className="font-display text-4xl uppercase">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-sm text-muted-foreground line-through">{formatPrice(plan.old[duration])}</span>
                <strong className="block font-display text-5xl text-fire">{formatPrice(plan.prices[duration])}</strong>
              </div>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                {(lang === "ar" ? plan.featuresAr : plan.featuresEn).map((f) => <li key={f} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-fire" /> {f}</li>)}
              </ul>
              <a href={wa(lang === "ar" ? `مرحباً، عايز أشترك في باقة ${plan.name} - المدة ${duration} - هدفي ${goal === "cut" ? "تنشيف" : "تضخيم"} - السعر ${formatPrice(plan.prices[duration])}` : `Hi, I want to subscribe to ${plan.name} - duration ${duration} - goal ${goal} - price ${formatPrice(plan.prices[duration])}`)} className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 font-bold text-primary-foreground shadow-fire transition hover:scale-105">
                {t.book}
              </a>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function Social({ href, label, icon: Icon }: { href: string; label: string; icon: typeof Instagram }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 font-bold transition hover:border-fire hover:text-fire">
      <Icon className="size-5" /> {label}
    </a>
  );
}
