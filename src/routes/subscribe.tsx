import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Dumbbell, Flame, Gamepad2, MessageCircle, Send, Trophy } from "lucide-react";

import heroAthlete from "@/assets/bodyhack-athlete-hero.jpg";

export const Route = createFileRoute("/subscribe")({
  head: () => ({
    meta: [
      { title: "Body Hack Subscription Form" },
      { name: "description", content: "Body Hack interactive coaching subscription form with organized WhatsApp submission." },
      { property: "og:title", content: "Body Hack Subscription Form" },
      { property: "og:description", content: "جاوب فورم Body Hack التفاعلي وابعته منظم على واتساب." },
    ],
  }),
  component: SubscribePage,
});

type Field = {
  id: string;
  label: string;
  type: "text" | "number" | "date" | "textarea" | "select" | "multi" | "file";
  options?: string[];
  required?: boolean;
  placeholder?: string;
};

type Step = { title: string; icon: typeof Flame; fields: Field[] };
type Answers = Record<string, string | string[]>;

const whatsappNumber = "2010557707038";

const steps: Step[] = [
  {
    title: "Level 1 · بياناتك الأساسية",
    icon: Gamepad2,
    fields: [
      { id: "code", label: "الكود", type: "text", placeholder: "لو عندك كود اكتبه" },
      { id: "fullName", label: "الاسم ثلاثي", type: "text", required: true },
      { id: "country", label: "الدولة", type: "select", required: true, options: ["مصر", "السعودية", "الإمارات", "الكويت", "قطر", "الأردن", "العراق", "المغرب", "أخرى"] },
      { id: "phone", label: "رقم التليفون", type: "text", required: true },
      { id: "religion", label: "الديانة لتحديد مواعيد المناسبات الدينية المتعلقة بالصيام", type: "select", options: ["مسلم", "مسيحي", "أفضل عدم الإجابة", "أخرى"] },
      { id: "language", label: "اختر اللغة المفضلة للإجابة واستلام الأنظمة", type: "select", options: ["العربية", "English", "العربية + English"] },
    ],
  },
  {
    title: "Level 2 · الهدف والقياسات",
    icon: Trophy,
    fields: [
      { id: "goal", label: "هدفك من الاشتراك في الخدمة؟", type: "select", required: true, options: ["تنشيف", "تضخيم", "زيادة كتلة عضلية نظيفة", "تحسين الصحة واللياقة", "تجهيز بطولة", "أخرى"] },
      { id: "weight", label: "الوزن (كجم)", type: "number", required: true },
      { id: "gender", label: "النوع", type: "select", options: ["ذكر", "أنثى"] },
      { id: "height", label: "الطول (سم)", type: "number" },
      { id: "birthDate", label: "تاريخ الميلاد", type: "date" },
      { id: "job", label: "الوظيفة / المهنة", type: "text" },
      { id: "steps", label: "كم عدد خطواتك اليومية؟", type: "select", options: ["أقل من 3000", "3000 - 6000", "6000 - 10000", "أكثر من 10000", "لا أعرف"] },
    ],
  },
  {
    title: "Level 3 · صور الجسم",
    icon: Flame,
    fields: [
      { id: "frontPhoto", label: "صورة واضحة لجسمك من الأمام", type: "file" },
      { id: "sidePhoto", label: "صورة واضحة لجسمك من الجانب", type: "file" },
      { id: "backPhoto", label: "صورة واضحة لجسمك من الخلف", type: "file" },
    ],
  },
  {
    title: "Level 4 · الصحة والتحاليل",
    icon: Check,
    fields: [
      { id: "healthIssues", label: "هل تعاني من أي مشاكل صحية؟", type: "select", options: ["لا", "نعم"] },
      { id: "healthDetails", label: "إذا كانت الإجابة نعم، اذكرهم بالتفصيل", type: "textarea" },
      { id: "recentTests", label: "هل قمت بعمل تحاليل خلال آخر 6 شهور؟", type: "select", options: ["لا", "نعم: صورة دم كاملة", "نعم: غدة درقية", "نعم: دهون وكوليسترول", "نعم: أكثر من تحليل", "أخرى"] },
      { id: "testFiles", label: "إذا كان هناك مشكلة في التحاليل، أرفق صور التحاليل", type: "file" },
      { id: "medications", label: "هل تستخدم أي نوع من الأدوية؟", type: "textarea", placeholder: "حقن، أقراص، شراب..." },
      { id: "injuries", label: "هل لديك أي إصابات؟", type: "textarea" },
      { id: "injuryFiles", label: "إذا لديك أشعة أو اختبارات إصابة MRI / X-ray / CT أرفقها", type: "file" },
      { id: "smoker", label: "هل أنت مدخن؟", type: "select", options: ["لا", "نعم", "أحياناً"] },
    ],
  },
  {
    title: "Level 5 · الدايت والعادات",
    icon: Dumbbell,
    fields: [
      { id: "dietBefore", label: "هل التزمت بنظام غذائي من قبل؟", type: "select", options: ["لا", "نعم لفترة قصيرة", "نعم ونجحت", "نعم ولم أستمر"] },
      { id: "dayNature", label: "اوصف طبيعة يومك ومقدار المجهود المبذول فيه", type: "textarea" },
      { id: "dietBarriers", label: "ما الأسباب التي تجعلك غير قادر على الالتزام بالدايت؟", type: "multi", options: ["الجوع", "الوقت", "الشغل", "الخروجات", "الميزانية", "حب الحلويات", "الملل", "أخرى"] },
      { id: "drinks", label: "هل تشرب شاي/قهوة/مشروبات باستمرار؟ وكم كوب وكم سكر؟", type: "textarea" },
      { id: "lastDiet", label: "ارسل آخر نظام غذائي اتبعته إذا متوفر", type: "file" },
      { id: "foodAllergy", label: "هل تعاني من حساسية تجاه أي نوع من الطعام؟", type: "textarea" },
      { id: "dislikedFood", label: "هل هناك نوع طعام معين لا تحبه إطلاقًا؟", type: "textarea", required: true },
      { id: "meals", label: "كم عدد الوجبات الأساسية التي تريدها؟", type: "select", options: ["2", "3", "4", "5", "حسب رأي الكوتش"] },
      { id: "dietStyle", label: "هل تريد نظام مرن أم مستعد تقسو على نفسك؟", type: "select", options: ["مرن", "متوسط", "صارم", "الكوتش يحدد"] },
      { id: "dietBudget", label: "ما الميزانية المتاحة للدايت؟", type: "select", options: ["اقتصادية", "متوسطة", "مفتوحة للنتيجة", "أخرى"] },
    ],
  },
  {
    title: "Level 6 · اختيارات الأكل",
    icon: Flame,
    fields: [
      { id: "protein", label: "أصناف البروتين المفضلة", type: "multi", options: ["صدور فراخ", "لحم صافي", "بيض كامل", "بياض بيض", "جبنة قريش", "زبادي يوناني", "سمك بلطي", "سمك بوري", "ماكريل", "تونة", "كبدة", "حليب", "أخرى"] },
      { id: "carbs", label: "أصناف الكربوهيدرات المفضلة", type: "multi", options: ["أرز أبيض", "أرز بسمتي", "أرز بني", "بطاطس", "بطاطا", "مكرونة", "شوفان", "توست بني", "أخرى"] },
      { id: "fats", label: "أصناف الدهون الصحية المفضلة", type: "multi", options: ["زيت الزيتون", "فول سوداني", "فستق", "كاجو", "بندق", "لوز", "زبدة فول سوداني", "أخرى"] },
    ],
  },
  {
    title: "Level 7 · التمرين والكارديو",
    icon: Trophy,
    fields: [
      { id: "trainingExperience", label: "تحدث عن تجربتك مع أنظمة التمرين المختلفة", type: "textarea" },
      { id: "resistanceDuration", label: "ما مدة ممارستك لتمارين المقاومة؟", type: "select", options: ["مبتدئ", "أقل من 6 شهور", "6 شهور - سنة", "سنة - 3 سنين", "أكثر من 3 سنين"] },
      { id: "otherSports", label: "هل تمارس رياضة أخرى بانتظام؟ اذكر النوع وعدد المرات والساعات", type: "textarea" },
      { id: "trainingPlace", label: "أين تريد أن تمارس تمرينك؟", type: "select", options: ["الجيم", "المنزل", "الجيم + المنزل", "أخرى"] },
      { id: "homeTools", label: "اذكر الأدوات المتاحة لديك في المنزل", type: "textarea" },
      { id: "trainingDays", label: "كم عدد الأيام المتاحة للتمرين؟", type: "select", options: ["2", "3", "4", "5", "6", "حسب رأي الكوتش"] },
      { id: "painExercises", label: "هل هناك تمارين تسبب لك ألم أو انزعاج؟", type: "textarea" },
      { id: "cardio", label: "ما نوع الكارديو المفضل؟", type: "select", options: ["مشي", "جري", "عجلة", "سباحة", "HIIT", "لا أحب الكارديو", "أخرى"] },
    ],
  },
  {
    title: "Final Boss · ملاحظاتك",
    icon: MessageCircle,
    fields: [
      { id: "onlineExperience", label: "تحدث عن تجاربك السابقة مع التدريب الأونلاين", type: "textarea" },
      { id: "whyMe", label: "ما سبب اشتراكك معي؟", type: "textarea" },
      { id: "notes", label: "اكتب أي ملاحظة تريد إضافتها (اختياري)", type: "textarea" },
    ],
  },
];

function SubscribePage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [errors, setErrors] = useState<string[]>([]);
  const step = steps[stepIndex];
  const progress = Math.round(((stepIndex + 1) / steps.length) * 100);
  const requiredMissing = useMemo(() => step.fields.filter((field) => field.required && !valueToText(answers[field.id])).map((field) => field.label), [answers, step]);

  const setAnswer = (id: string, value: string | string[]) => {
    setAnswers((current) => ({ ...current, [id]: value }));
    setErrors([]);
  };

  const next = () => {
    if (requiredMissing.length) {
      setErrors(requiredMissing);
      return;
    }
    setStepIndex((current) => Math.min(steps.length - 1, current + 1));
  };

  const sendWhatsApp = () => {
    const message = buildMessage(answers);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main dir="rtl" className="min-h-screen bg-radial-fire text-foreground">
      <div className="absolute inset-0 grit-mask opacity-20" aria-hidden="true" />
      <section className="relative mx-auto grid min-h-screen max-w-7xl gap-6 px-5 py-6 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="flex flex-col justify-between overflow-hidden rounded-2xl border border-fire/50 bg-card shadow-fire">
          <div className="relative min-h-[320px] overflow-hidden">
            <img src={heroAthlete} alt="Body Hack coaching form" className="h-full min-h-[320px] w-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute bottom-5 start-5 end-5">
              <Link to="/" className="mb-5 inline-flex items-center gap-2 rounded-full border border-fire/60 bg-background/80 px-4 py-2 text-sm font-bold transition hover:bg-secondary">
                <ArrowRight className="size-4" /> رجوع للموقع
              </Link>
              <p className="text-sm font-black uppercase text-fire">Body Hack Quest</p>
              <h1 className="font-display text-5xl uppercase leading-none md:text-7xl">فورم الاشتراك</h1>
              <p className="mt-3 text-sm text-muted-foreground">جاوب كأنها لعبة Level by Level، وفي الآخر هنرتب كل إجاباتك ونبعتها واتساب للكوتش.</p>
            </div>
          </div>
          <div className="space-y-4 p-5">
            <div className="flex items-center justify-between text-sm font-bold">
              <span>Progress</span>
              <span className="text-fire">{progress}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {steps.map((item, index) => (
                <button key={item.title} onClick={() => setStepIndex(index)} className={`h-2 rounded-full transition ${index <= stepIndex ? "bg-primary" : "bg-muted"}`} aria-label={item.title} />
              ))}
            </div>
          </div>
        </aside>

        <div className="relative rounded-2xl border border-border bg-card/95 p-5 shadow-fire md:p-7">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase text-fire">Step {stepIndex + 1} / {steps.length}</p>
              <h2 className="mt-1 text-3xl font-black md:text-4xl">{step.title}</h2>
            </div>
            <step.icon className="size-11 text-fire" />
          </div>

          {errors.length > 0 && <div className="mb-5 rounded-xl border border-destructive bg-secondary p-4 text-sm font-bold text-destructive">كمل المطلوب: {errors.join("، ")}</div>}

          <div className="grid gap-4 md:grid-cols-2">
            {step.fields.map((field) => <FieldControl key={field.id} field={field} value={answers[field.id]} onChange={setAnswer} />)}
          </div>

          {stepIndex === steps.length - 1 && (
            <div className="mt-6 rounded-xl border border-fire/50 bg-secondary p-4">
              <p className="font-bold text-fire">قبل الإرسال</p>
              <p className="mt-1 text-sm text-muted-foreground">واتساب لا يرفق الصور تلقائياً من الموقع، الرسالة هتتفتح منظمة وبعدها ارفق صور الجسم/التحاليل في نفس المحادثة.</p>
            </div>
          )}

          <div className="mt-7 flex flex-wrap justify-between gap-3">
            <button disabled={stepIndex === 0} onClick={() => setStepIndex((current) => Math.max(0, current - 1))} className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 font-bold transition hover:border-fire disabled:opacity-40">
              <ArrowRight className="size-5" /> السابق
            </button>
            {stepIndex < steps.length - 1 ? (
              <button onClick={next} className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-bold text-primary-foreground shadow-fire transition hover:scale-105">
                التالي <ArrowLeft className="size-5" />
              </button>
            ) : (
              <button onClick={sendWhatsApp} className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-bold text-primary-foreground shadow-fire transition hover:scale-105">
                <Send className="size-5" /> إرسال منظم على واتساب
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function FieldControl({ field, value, onChange }: { field: Field; value: string | string[] | undefined; onChange: (id: string, value: string | string[]) => void }) {
  const textValue = typeof value === "string" ? value : "";
  const arrayValue = Array.isArray(value) ? value : [];
  const base = "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-fire focus:ring-2 focus:ring-ring";

  return (
    <label className={field.type === "textarea" || field.type === "multi" ? "md:col-span-2" : ""}>
      <span className="text-sm font-bold text-muted-foreground">{field.label}{field.required && <span className="text-fire"> *</span>}</span>
      {field.type === "textarea" && <textarea value={textValue} maxLength={900} placeholder={field.placeholder || "اكتب إجابتك هنا..."} onChange={(event) => onChange(field.id, event.target.value)} className={`${base} min-h-28 resize-y`} />}
      {(field.type === "text" || field.type === "number" || field.type === "date") && <input value={textValue} type={field.type} maxLength={160} placeholder={field.placeholder || "إجابتك"} onChange={(event) => onChange(field.id, event.target.value)} className={base} />}
      {field.type === "file" && <input type="file" accept="image/*,.pdf" onChange={(event) => onChange(field.id, Array.from(event.target.files || []).map((file) => file.name).join("، "))} className={base} />}
      {field.type === "select" && <select value={textValue} onChange={(event) => onChange(field.id, event.target.value)} className={base}><option value="">اختار...</option>{field.options?.map((option) => <option key={option} value={option}>{option}</option>)}</select>}
      {field.type === "multi" && (
        <div className="mt-2 flex flex-wrap gap-2">
          {field.options?.map((option) => {
            const active = arrayValue.includes(option);
            return <button type="button" key={option} onClick={() => onChange(field.id, active ? arrayValue.filter((item) => item !== option) : [...arrayValue, option])} className={`rounded-full border px-4 py-2 text-sm font-bold transition ${active ? "border-fire bg-primary text-primary-foreground" : "border-border bg-background hover:border-fire"}`}>{option}</button>;
          })}
        </div>
      )}
      {(field.options?.includes("أخرى") || field.type === "multi") && field.type !== "file" && <input value={typeof value === "string" && !field.options?.includes(value) ? value : ""} maxLength={180} placeholder="إجابة أخرى..." onChange={(event) => onChange(field.id, event.target.value)} className={`${base} mt-3`} />}
    </label>
  );
}

function valueToText(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value.join("، ").trim();
  return (value || "").trim();
}

function buildMessage(answers: Answers) {
  const rows = steps.flatMap((step) => step.fields.map((field) => `• ${field.label}: ${valueToText(answers[field.id]) || "لم يحدد"}`));
  return [`🔥 Body Hack - فورم اشتراك جديد`, `⏱️ Timestamp: ${new Date().toLocaleString("ar-EG")}`, "", ...rows, "", "ملاحظة: سيتم إرفاق الصور/التحاليل يدوياً في المحادثة."].join("\n").slice(0, 6500);
}