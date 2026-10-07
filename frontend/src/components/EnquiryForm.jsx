import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";
import { EASE } from "@/lib/motion";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const nameField = z.string().min(2, "Please enter your full name.").max(120);
const emailField = z.string().email("Please enter a valid email address.");
const phoneField = z
  .string()
  .regex(/^[+\d][\d\s\-()]{6,17}$/, "Please enter a valid phone number.");

const generalSchema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneField,
  message: z.string().min(10, "Please tell us a little about your enquiry.").max(4000),
  website: z.string().max(200).optional(), // honeypot — never shown to humans
});

const bulkSchema = z.object({
  name: nameField,
  company: z.string().min(2, "Please enter your company or organisation.").max(200),
  email: emailField,
  phone: phoneField,
  occasion: z.string().min(2, "Please tell us the occasion or event.").max(200),
  quantity: z.string().min(1, "Please enter an approximate quantity.").max(60),
  budget: z.string().max(60).optional().or(z.literal("")),
  delivery_date: z.string().max(40).optional().or(z.literal("")),
  product_interests: z.string().max(400).optional().or(z.literal("")),
  message: z.string().max(4000).optional().or(z.literal("")),
  website: z.string().max(200).optional(), // honeypot — never shown to humans
});

const labelCls = "block text-[10px] uppercase tracking-[0.22em] text-ink/55 mb-2";
const inputCls =
  "w-full bg-transparent border-b border-sand focus:border-ink py-2.5 text-[15px] text-ink placeholder:text-ink/30 outline-none transition-colors duration-300";
const errCls = "mt-1.5 text-[12px] text-terra";

function Field({ label, error, required, children, className = "" }) {
  return (
    <div className={className}>
      <label className={labelCls}>
        {label}
        {required && <span className="text-terra ml-1" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && <p className={errCls} role="alert">{error.message || error}</p>}
    </div>
  );
}

export default function EnquiryForm({ variant = "general", dark = false, testidPrefix = "enquiry" }) {
  const isBulk = variant === "bulk";
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(isBulk ? bulkSchema : generalSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const onSubmit = async (values) => {
    try {
      const res = await axios.post(
        `${API}/enquiries`,
        { type: variant, ...values, source_page: window.location.pathname },
        { timeout: 20000 }
      );
      setDone(true);
      reset({ name: "", email: "", phone: "", message: "" });
      toast.success("Thank you — your enquiry has been received.");
      if (res.data && res.data.email_notified === false) {
        toast("Enquiry saved. Email notification to the studio is not yet configured.", {
          duration: 6000,
        });
      }
    } catch (err) {
      const detail = err?.response?.data?.detail;
      if (typeof detail === "string") toast.error(detail);
      else
        toast.error(
          "Something went wrong while sending your enquiry. Please try again or reach us on WhatsApp."
        );
    }
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className={`border p-8 text-center ${dark ? "border-cream/25 bg-cream/5" : "border-sand bg-white"}`}
        data-testid={`${testidPrefix}-success`}
      >
        <span className={`mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full ${dark ? "bg-wa/20 text-wa" : "bg-wa/15 text-[#1DA851]"}`}>
          <Check size={22} strokeWidth={2} />
        </span>
        <h3 className={`font-display text-2xl ${dark ? "text-cream" : "text-ink"}`}>
          Thank you — we've received your enquiry.
        </h3>
        <p className={`mt-2 text-[14px] ${dark ? "text-cream/60" : "text-ink/55"}`}>
          Our team will get back to you on the contact details you shared.
        </p>
        <button
          type="button"
          onClick={() => setDone(false)}
          className={`mt-6 text-[11px] uppercase tracking-[0.2em] link-underline ${dark ? "text-cream/70" : "text-ink/60"}`}
          data-testid={`${testidPrefix}-send-another`}
        >
          Send another enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate data-testid={`${testidPrefix}-form`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
        <Field label="Full name" required error={errors.name}>
          <input type="text" className={inputCls} placeholder="Your name" data-testid={`${testidPrefix}-name`} {...register("name")} />
        </Field>

        {isBulk && (
          <Field label="Company / organisation" required error={errors.company}>
            <input type="text" className={inputCls} placeholder="Company or organisation" data-testid={`${testidPrefix}-company`} {...register("company")} />
          </Field>
        )}

        <Field label="Email address" required error={errors.email}>
          <input type="email" className={inputCls} placeholder="you@example.com" data-testid={`${testidPrefix}-email`} {...register("email")} />
        </Field>

        <Field label="Phone number" required error={errors.phone}>
          <input type="tel" className={inputCls} placeholder="+91 00000 00000" data-testid={`${testidPrefix}-phone`} {...register("phone")} />
        </Field>

        {isBulk && (
          <>
            <Field label="Occasion or event" required error={errors.occasion}>
              <input type="text" className={inputCls} placeholder="e.g. Diwali, conference, wedding" data-testid={`${testidPrefix}-occasion`} {...register("occasion")} />
            </Field>
            <Field label="Approximate quantity" required error={errors.quantity}>
              <input type="text" className={inputCls} placeholder="e.g. 50–100" data-testid={`${testidPrefix}-quantity`} {...register("quantity")} />
            </Field>
            <Field label="Budget per gift (optional)" error={errors.budget}>
              <input type="text" className={inputCls} placeholder="e.g. ₹1,000–₹2,500" data-testid={`${testidPrefix}-budget`} {...register("budget")} />
            </Field>
            <Field label="Preferred delivery date (optional)" error={errors.delivery_date}>
              <input type="date" className={inputCls} data-testid={`${testidPrefix}-delivery-date`} {...register("delivery_date")} />
            </Field>
            <Field label="Product interests (optional)" error={errors.product_interests} className="sm:col-span-2">
              <input type="text" className={inputCls} placeholder="e.g. keepsake boxes, idols, candle holders" data-testid={`${testidPrefix}-interests`} {...register("product_interests")} />
            </Field>
            <Field label="Additional requirements (optional)" error={errors.message} className="sm:col-span-2">
              <textarea rows={4} className={`${inputCls} resize-none`} placeholder="Anything else we should know" data-testid={`${testidPrefix}-message`} {...register("message")} />
            </Field>
          </>
        )}

        {!isBulk && (
          <Field label="Your message" required error={errors.message} className="sm:col-span-2">
            <textarea rows={4} className={`${inputCls} resize-none`} placeholder="How can we help?" data-testid={`${testidPrefix}-message`} {...register("message")} />
          </Field>
        )}
      </div>

      {/* Honeypot — hidden from humans, catches bots */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${testidPrefix}-website`}>Website</label>
        <input id={`${testidPrefix}-website`} type="text" tabIndex={-1} autoComplete="off" className="absolute opacity-0" {...register("website")} />
      </div>

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          data-testid={`${testidPrefix}-submit`}
          className="btn-sweep btn-sweep-dark inline-flex items-center justify-center gap-2.5 border border-ink bg-ink text-cream text-[11px] uppercase tracking-[0.2em] px-8 h-12 disabled:opacity-60"
        >
          <span>
            {isSubmitting ? "Sending…" : isBulk ? "Request a Bulk Quote" : "Send Enquiry"}
          </span>
          {isSubmitting ? <Loader2 size={15} className="animate-spin" /> : <Send size={14} />}
        </button>
        <p className={`text-[12px] ${dark ? "text-cream/45" : "text-ink/45"}`}>
          <span className="text-terra">*</span> Required. We use your details only to respond to this enquiry.
        </p>
      </div>
    </form>
  );
}