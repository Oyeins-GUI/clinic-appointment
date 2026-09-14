import { type FormEvent, type ReactNode, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, ArrowRight, CalendarCheck2, Check, CircleAlert, Clock3, Mail, MapPin, Phone, Search, Stethoscope, UserRound } from 'lucide-react';
import { Link, useLocation, useParams } from 'wouter';
import {
  getGetAppointmentQueryKey,
  getListAppointmentSlotsQueryKey,
  getListPatientAppointmentsQueryKey,
  useCreateAppointment,
  useGetAppointment,
  useGetClinic,
  useGetClinicSummary,
  useListAppointmentSlots,
  useListDoctors,
  useListPatientAppointments,
  useUpdateAppointmentReminder,
} from '@workspace/api-client-react';
import { DetailPill, EmptyState, ErrorNotice, Footer, Header, PageShell, SectionKicker, SelectChevron, TrustStrip } from '@/components/clinic-ui';

function localDate(offset = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
}

function prettyDate(date: string, includeYear = false) {
  const parsed = new Date(date.includes('T') ? date : `${date}T12:00:00`);
  return new Intl.DateTimeFormat('en-NG', { weekday: 'long', day: 'numeric', month: 'long', ...(includeYear ? { year: 'numeric' } : {}) }).format(parsed);
}

function shortDate(date: string) {
  const parsed = new Date(date.includes('T') ? date : `${date}T12:00:00`);
  return new Intl.DateTimeFormat('en-NG', { weekday: 'short', day: 'numeric', month: 'short' }).format(parsed);
}

function formatTime(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return new Intl.DateTimeFormat('en-NG', { hour: 'numeric', minute: '2-digit' }).format(date);
}

function LoadingLines({ count = 3 }: { count?: number }) {
  return <div className="space-y-3" aria-label="Loading"><div className="skeleton h-5 w-36 rounded" />{Array.from({ length: count }, (_, index) => <div key={index} className="skeleton h-16 rounded-2xl" />)}</div>;
}

export function HomePage() {
  const [, setLocation] = useLocation();
  const [selectedDate, setSelectedDate] = useState(localDate());
  const [doctorId, setDoctorId] = useState<number | undefined>();
  const clinic = useGetClinic();
  const summary = useGetClinicSummary();
  const doctors = useListDoctors();
  const slotParams = useMemo(() => ({ date: selectedDate, ...(doctorId ? { doctorId } : {}) }), [selectedDate, doctorId]);
  const slots = useListAppointmentSlots(slotParams, { query: { queryKey: getListAppointmentSlotsQueryKey(slotParams) } });
  const dates = useMemo(() => Array.from({ length: 6 }, (_, index) => localDate(index)), []);
  const availableSlots = (slots.data ?? []).filter((slot) => slot.status === 'available');

  return (
    <PageShell>
      <Header />
      <main>
        <section className="paper-grid relative overflow-hidden border-b border-border/60">
          <div className="absolute -right-20 -top-28 size-80 rounded-full bg-secondary/20 blur-3xl" />
          <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-14 pt-12 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:pb-20 lg:pt-20">
            <div className="relative fade-up">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/70 px-3 py-1.5 text-xs font-bold text-primary"><span className="size-2 rounded-full bg-primary" /> A gentler way to see a doctor</div>
              <h1 className="max-w-xl font-display text-5xl font-extrabold leading-[.98] tracking-[-.065em] text-foreground sm:text-6xl lg:text-7xl">Your health,<br /><span className="text-primary">on your time.</span></h1>
              <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">Find a good time at {clinic.data?.name ?? 'your clinic'}, book in under a minute, and arrive knowing you have a place.</p>
              <div className="mt-8"><TrustStrip /></div>
              <div className="mt-9 flex flex-wrap items-center gap-4 text-sm">
                <a href="#availability" className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3.5 font-bold text-primary-foreground transition hover:-translate-y-0.5" data-testid="link-find-slot">Find a time <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></a>
                <Link href="/clinic" className="font-bold text-foreground underline decoration-secondary decoration-2 underline-offset-4" data-testid="link-learn-clinic">Learn about the clinic</Link>
              </div>
            </div>
            <div className="relative fade-up fade-up-delay-2">
              <div className="relative overflow-hidden rounded-[2rem] bg-primary p-7 text-primary-foreground shadow-[12px_14px_0_hsl(var(--secondary))] sm:p-9">
                <div className="absolute -right-10 -top-16 size-48 rounded-full border-[24px] border-primary-foreground/10" />
                <div className="relative">
                  <p className="text-sm font-semibold text-primary-foreground/70">At a glance</p>
                  <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8">
                    <div><p className="font-display text-4xl font-extrabold">{summary.data?.availableToday ?? '—'}</p><p className="mt-1 text-sm text-primary-foreground/70">times today</p></div>
                    <div><p className="font-display text-4xl font-extrabold">{summary.data?.totalDoctors ?? doctors.data?.length ?? '—'}</p><p className="mt-1 text-sm text-primary-foreground/70">doctors to choose from</p></div>
                    <div className="col-span-2 border-t border-primary-foreground/20 pt-5"><p className="text-xs font-bold uppercase tracking-[.14em] text-secondary">Next opening</p><p className="mt-2 font-display text-xl font-bold">{summary.data?.nextAvailableDate ? prettyDate(summary.data.nextAvailableDate) : 'Choose a day below'}</p></div>
                  </div>
                  <div className="mt-10 rounded-2xl bg-primary-foreground/10 p-4"><p className="text-sm leading-6 text-primary-foreground/80">No queues, no back-and-forth calls. Just a confirmed time that belongs to you.</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="availability" className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-20">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div><SectionKicker>Choose your moment</SectionKicker><h2 className="font-display text-3xl font-extrabold tracking-[-.04em] sm:text-4xl">What works for you?</h2><p className="mt-2 text-muted-foreground">Pick a day, then a doctor. We’ll do the rest.</p></div>
            <Link href="/my-appointments" className="inline-flex items-center gap-2 self-start text-sm font-bold text-primary sm:self-auto" data-testid="link-existing-appointment">Already booked? Check your visit <ArrowRight className="size-4" /></Link>
          </div>
          <div className="mt-8 overflow-x-auto pb-2"><div className="flex min-w-max gap-2">
            {dates.map((date, index) => <button key={date} onClick={() => setSelectedDate(date)} className={`min-w-[92px] rounded-2xl border px-4 py-3 text-left transition ${selectedDate === date ? 'border-primary bg-primary text-primary-foreground shadow-[4px_4px_0_hsl(var(--secondary))]' : 'border-border bg-card hover:border-primary/50'}`} data-testid={`button-date-${date}`}><span className="block text-xs font-semibold opacity-70">{index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : new Intl.DateTimeFormat('en-NG', { weekday: 'short' }).format(new Date(`${date}T12:00:00`))}</span><span className="mt-1 block font-display text-xl font-bold">{new Date(`${date}T12:00:00`).getDate()}</span></button>)}
          </div></div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"><div className="relative max-w-xs flex-1"><select value={doctorId ?? ''} onChange={(event) => setDoctorId(event.target.value ? Number(event.target.value) : undefined)} className="w-full appearance-none rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" data-testid="select-doctor"><option value="">All doctors</option>{(doctors.data ?? []).map((doctor) => <option key={doctor.id} value={doctor.id}>{doctor.name} · {doctor.specialty}</option>)}</select><SelectChevron /></div><p className="text-sm text-muted-foreground">{slots.isLoading ? 'Looking for open times…' : `${availableSlots.length} ${availableSlots.length === 1 ? 'time' : 'times'} available on ${shortDate(selectedDate)}`}</p></div>
          <div className="mt-6">
            {slots.isError ? <ErrorNotice onRetry={() => void slots.refetch()} /> : slots.isLoading ? <LoadingLines count={4} /> : availableSlots.length === 0 ? <EmptyState title="A quieter day, fully booked" detail="Try the next day or view all doctors for another opening." action={<button onClick={() => setSelectedDate(localDate(1))} className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground" data-testid="button-next-day">Show tomorrow</button>} /> : <div className="grid gap-4 md:grid-cols-2">{availableSlots.map((slot) => <div key={slot.id} className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md" data-testid={`card-slot-${slot.id}`}><div className="flex min-w-0 items-center gap-3"><div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-muted text-primary"><Stethoscope className="size-5" /></div><div className="min-w-0"><p className="truncate font-bold">{slot.doctorName}</p><p className="truncate text-sm text-muted-foreground">{slot.specialty}</p></div></div><div className="flex shrink-0 items-center gap-3"><span className="hidden text-right text-sm font-semibold text-muted-foreground sm:block"><span className="block text-foreground">{formatTime(slot.startTime)}</span>{formatTime(slot.endTime)}</span><button onClick={() => setLocation(`/book?slotId=${slot.id}&date=${slot.date}`)} className="rounded-full bg-secondary px-4 py-2.5 text-sm font-bold text-foreground transition hover:bg-secondary/80" data-testid={`button-book-slot-${slot.id}`}>Book</button></div></div>)}</div>}
          </div>
        </section>
        <section className="mx-auto grid max-w-6xl gap-5 px-5 pb-14 sm:grid-cols-3 lg:px-8">
          {['Pick a time', 'Share your details', 'Show up feeling ready'].map((title, index) => <div key={title} className="rounded-2xl border border-border bg-card p-5"><span className="font-display text-4xl font-extrabold text-secondary">{String(index + 1).padStart(2, '0')}</span><h3 className="mt-5 font-display text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{['See real-time openings and choose what fits your day.', 'A name and phone number is all we need to hold your spot.', 'Get a confirmation you can keep handy on your phone.'][index]}</p></div>)}
        </section>
      </main>
      <Footer />
    </PageShell>
  );
}

export function BookPage() {
  const [, setLocation] = useLocation();
  const search = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const slotId = Number(search.get('slotId') ?? 0);
  const date = search.get('date') ?? localDate();
  const [form, setForm] = useState({ patientName: '', patientPhone: '', patientEmail: '', reason: '', reminderEnabled: true });
  const [submitted, setSubmitted] = useState(false);
  const queryClient = useQueryClient();
  const slots = useListAppointmentSlots({ date }, { query: { queryKey: getListAppointmentSlotsQueryKey({ date }) } });
  const create = useCreateAppointment();
  const slot = (slots.data ?? []).find((item) => item.id === slotId);
  const update = (key: keyof typeof form, value: string | boolean) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (form.patientName.trim().length < 2 || form.patientPhone.replace(/\D/g, '').length < 7) return;
    create.mutate({ data: { slotId, patientName: form.patientName.trim(), patientPhone: form.patientPhone.trim(), patientEmail: form.patientEmail.trim() || null, reason: form.reason.trim() || null, reminderEnabled: form.reminderEnabled } }, {
      onSuccess: (appointment) => {
        queryClient.invalidateQueries({ queryKey: getListAppointmentSlotsQueryKey({ date }) });
        setLocation(`/confirmation/${appointment.id}`);
      },
    });
  };

  return <PageShell><Header /><main className="mx-auto max-w-5xl px-5 py-10 lg:px-8 lg:py-16">
    <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition hover:text-primary" data-testid="link-back-availability"><ArrowLeft className="size-4" /> Back to availability</Link>
    <div className="mt-8 grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
      <div className="fade-up"><SectionKicker>Reserve your visit</SectionKicker><h1 className="font-display text-4xl font-extrabold leading-tight tracking-[-.05em] sm:text-5xl">A little about you,<br /><span className="text-primary">then you’re set.</span></h1><p className="mt-5 max-w-sm leading-7 text-muted-foreground">We only ask for what the clinic needs. Your information is kept private and used to prepare for your visit.</p>
        {slots.isLoading ? <div className="mt-8"><LoadingLines count={1} /></div> : slot ? <div className="mt-8 rounded-2xl bg-primary p-5 text-primary-foreground shadow-[6px_6px_0_hsl(var(--secondary))]" data-testid="card-selected-slot"><p className="text-xs font-bold uppercase tracking-[.14em] text-secondary">Your selected time</p><p className="mt-3 font-display text-xl font-bold">{prettyDate(slot.date)}</p><div className="mt-2 flex items-center gap-2 text-sm text-primary-foreground/75"><Clock3 className="size-4" /> {formatTime(slot.startTime)} – {formatTime(slot.endTime)}</div><div className="mt-4 border-t border-primary-foreground/20 pt-4"><p className="font-semibold">{slot.doctorName}</p><p className="text-sm text-primary-foreground/75">{slot.specialty}</p></div></div> : <ErrorNotice message="That time may have just been taken. Please return to availability and choose another." />}
      </div>
      <form onSubmit={submit} className="rounded-[2rem] border border-border bg-card p-5 shadow-sm sm:p-8" data-testid="form-book-appointment">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="sm:col-span-2"><span className="mb-2 block text-sm font-bold">Full name</span><div className="relative"><UserRound className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input value={form.patientName} onChange={(event) => update('patientName', event.target.value)} placeholder="e.g. Amaka Okafor" className="w-full rounded-xl border border-input bg-background py-3.5 pl-11 pr-4 outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15" data-testid="input-patient-name" /></div>{submitted && form.patientName.trim().length < 2 && <span className="mt-1 block text-xs font-semibold text-destructive">Please enter your name.</span>}</label>
          <label><span className="mb-2 block text-sm font-bold">Phone number</span><div className="relative"><Phone className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input value={form.patientPhone} onChange={(event) => update('patientPhone', event.target.value)} type="tel" placeholder="080 1234 5678" className="w-full rounded-xl border border-input bg-background py-3.5 pl-11 pr-4 outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15" data-testid="input-patient-phone" /></div>{submitted && form.patientPhone.replace(/\D/g, '').length < 7 && <span className="mt-1 block text-xs font-semibold text-destructive">Enter a valid phone number.</span>}</label>
          <label><span className="mb-2 block text-sm font-bold">Email <span className="font-normal text-muted-foreground">(optional)</span></span><div className="relative"><Mail className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input value={form.patientEmail} onChange={(event) => update('patientEmail', event.target.value)} type="email" placeholder="you@example.com" className="w-full rounded-xl border border-input bg-background py-3.5 pl-11 pr-4 outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15" data-testid="input-patient-email" /></div></label>
          <label className="sm:col-span-2"><span className="mb-2 block text-sm font-bold">What brings you in? <span className="font-normal text-muted-foreground">(optional)</span></span><textarea value={form.reason} onChange={(event) => update('reason', event.target.value)} rows={3} placeholder="A short note helps your doctor prepare." className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3.5 outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15" data-testid="input-visit-reason" /></label>
        </div>
        <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl bg-muted/70 p-4"><input type="checkbox" checked={form.reminderEnabled} onChange={(event) => update('reminderEnabled', event.target.checked)} className="mt-1 size-4 accent-[hsl(var(--primary))]" data-testid="input-reminder-enabled" /><span><span className="block text-sm font-bold">Remind me before my visit</span><span className="mt-1 block text-xs leading-5 text-muted-foreground">We’ll use your phone number for a helpful reminder.</span></span></label>
        {create.isError && <div className="mt-5 flex items-start gap-2 rounded-xl bg-accent/10 p-3 text-sm text-destructive" data-testid="status-booking-error"><CircleAlert className="mt-0.5 size-4 shrink-0" /> We couldn’t reserve that time. It may have just been booked.</div>}
        <button type="submit" disabled={create.isPending || !slot} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 font-bold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50" data-testid="button-confirm-booking">{create.isPending ? 'Confirming your visit…' : 'Confirm my visit'} {!create.isPending && <ArrowRight className="size-4" />}</button>
        <p className="mt-4 text-center text-xs text-muted-foreground">By booking, you agree to share these details with the clinic.</p>
      </form>
    </div>
  </main><Footer /></PageShell>;
}

export function ConfirmationPage() {
  const { id } = useParams<{ id: string }>();
  const appointmentId = Number(id);
  const queryClient = useQueryClient();
  const appointment = useGetAppointment(appointmentId, { query: { queryKey: getGetAppointmentQueryKey(appointmentId) } });
  const reminder = useUpdateAppointmentReminder();
  const [saved, setSaved] = useState(false);
  const booking = appointment.data;
  const updateReminder = (enabled: boolean) => reminder.mutate({ id: appointmentId, data: { reminderEnabled: enabled } }, { onSuccess: (updated) => { queryClient.setQueryData(getGetAppointmentQueryKey(appointmentId), updated); queryClient.invalidateQueries({ queryKey: getListPatientAppointmentsQueryKey({ phone: updated.patientPhone }) }); setSaved(true); } });
  return <PageShell><Header /><main className="mx-auto max-w-3xl px-5 py-12 lg:px-8 lg:py-20">
    {appointment.isLoading ? <LoadingLines count={3} /> : appointment.isError ? <ErrorNotice onRetry={() => void appointment.refetch()} /> : booking ? <div className="text-center fade-up"><div className="mx-auto grid size-20 place-items-center rounded-[28px] bg-secondary text-foreground shadow-[6px_6px_0_hsl(var(--primary))]"><Check className="size-9" strokeWidth={3} /></div><p className="mt-8 text-xs font-bold uppercase tracking-[.18em] text-primary">You’re all set</p><h1 className="mt-3 font-display text-4xl font-extrabold tracking-[-.05em] sm:text-5xl">Your visit is booked.</h1><p className="mx-auto mt-4 max-w-md leading-7 text-muted-foreground">We’ve saved your spot. Keep this confirmation handy when you arrive.</p>
      <div className="mx-auto mt-10 max-w-md overflow-hidden rounded-[2rem] border border-border bg-card text-left shadow-md"><div className="border-b border-dashed border-border bg-primary p-6 text-primary-foreground"><p className="text-xs font-bold uppercase tracking-[.16em] text-secondary">Confirmation code</p><p className="mt-2 font-mono text-2xl font-bold tracking-[.12em]" data-testid="text-confirmation-code">{booking.confirmationCode}</p></div><div className="space-y-5 p-6"><div><p className="text-xs font-semibold uppercase tracking-[.12em] text-muted-foreground">When</p><p className="mt-1 font-display text-lg font-bold" data-testid="text-confirmation-date">{prettyDate(booking.date, true)}</p><p className="mt-1 text-sm text-muted-foreground">{formatTime(booking.startTime)} – {formatTime(booking.endTime)}</p></div><div><p className="text-xs font-semibold uppercase tracking-[.12em] text-muted-foreground">With</p><p className="mt-1 font-display text-lg font-bold" data-testid="text-confirmation-doctor">{booking.doctorName}</p><p className="text-sm text-muted-foreground">{booking.specialty}</p></div><div className="flex items-start gap-2 border-t border-border pt-5 text-sm text-muted-foreground"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" /> Clinic visit · Check in a few minutes early</div></div></div>
      <div className="mx-auto mt-6 max-w-md rounded-2xl border border-border bg-card p-5 text-left"><div className="flex items-center justify-between gap-4"><div><p className="font-bold">A reminder would be helpful</p><p className="mt-1 text-sm text-muted-foreground">{booking.reminderEnabled ? 'We’ll remind you before your visit.' : 'Reminders are currently off.'}</p></div><button onClick={() => updateReminder(!booking.reminderEnabled)} disabled={reminder.isPending} className={`relative h-7 w-12 rounded-full transition ${booking.reminderEnabled ? 'bg-primary' : 'bg-muted'}`} data-testid="button-toggle-reminder"><span className={`absolute top-1 size-5 rounded-full bg-card transition-transform ${booking.reminderEnabled ? 'translate-x-6' : 'translate-x-1'}`} /></button></div>{saved && <p className="mt-3 text-xs font-semibold text-primary" data-testid="status-reminder-saved">Reminder preference saved.</p>}</div>
      <div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/" className="rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground" data-testid="link-book-another">Book another visit</Link><Link href="/my-appointments" className="rounded-full border border-border bg-card px-5 py-3 text-sm font-bold" data-testid="link-view-appointments">View my appointments</Link></div>
    </div> : null}
  </main><Footer /></PageShell>;
}

export function MyAppointmentsPage() {
  const [phone, setPhone] = useState('');
  const [searchedPhone, setSearchedPhone] = useState('');
  const valid = searchedPhone.replace(/\D/g, '').length >= 7;
  const appointments = useListPatientAppointments({ phone: searchedPhone || '0000000' }, { query: { enabled: valid, queryKey: getListPatientAppointmentsQueryKey({ phone: searchedPhone || '0000000' }) } });
  const search = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSearchedPhone(phone.trim()); };
  return <PageShell><Header /><main className="mx-auto max-w-5xl px-5 py-12 lg:px-8 lg:py-20"><div className="max-w-xl fade-up"><SectionKicker>Your visits</SectionKicker><h1 className="font-display text-4xl font-extrabold tracking-[-.05em] sm:text-5xl">Everything in one place.</h1><p className="mt-4 leading-7 text-muted-foreground">Enter the phone number you used to book. We’ll show your upcoming clinic visits.</p></div><form onSubmit={search} className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row" data-testid="form-find-appointments"><div className="relative flex-1"><Phone className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input value={phone} onChange={(event) => setPhone(event.target.value)} type="tel" placeholder="Phone number used to book" className="w-full rounded-full border border-input bg-card py-3.5 pl-11 pr-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" data-testid="input-search-phone" /></div><button type="submit" disabled={phone.replace(/\D/g, '').length < 7} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-primary-foreground disabled:opacity-50" data-testid="button-search-appointments"><Search className="size-4" /> Find visits</button></form><div className="mt-10">{!searchedPhone ? <EmptyState title="No search yet" detail="Your upcoming visits will appear here after you search by phone number." /> : appointments.isLoading ? <LoadingLines count={2} /> : appointments.isError ? <ErrorNotice onRetry={() => void appointments.refetch()} /> : (appointments.data ?? []).length === 0 ? <EmptyState title="No upcoming visits found" detail="We couldn’t find a booking for that number. Check the digits and try again." action={<Link href="/" className="inline-block rounded-full bg-secondary px-5 py-2.5 text-sm font-bold" data-testid="link-start-booking">Book a visit</Link>} /> : <div className="space-y-4">{(appointments.data ?? []).map((item) => <Link href={`/confirmation/${item.id}`} key={item.id} className="group block rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md" data-testid={`card-appointment-${item.id}`}><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><div className="flex items-start gap-4"><div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-muted text-primary"><CalendarCheck2 className="size-5" /></div><div><p className="font-display text-lg font-bold">{prettyDate(item.date)}</p><p className="mt-1 text-sm text-muted-foreground">{formatTime(item.startTime)} · {item.doctorName}</p><p className="mt-2 text-xs font-bold uppercase tracking-[.1em] text-primary">{item.status}</p></div></div><ArrowRight className="hidden size-5 text-primary transition-transform group-hover:translate-x-1 sm:block" /></div></Link>)}</div>}</div></main><Footer /></PageShell>;
}

export function ClinicPage() {
  const clinic = useGetClinic();
  const summary = useGetClinicSummary();
  const refresh = () => { void clinic.refetch(); void summary.refetch(); };
  return <PageShell><Header /><main className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-20">{clinic.isLoading ? <LoadingLines count={5} /> : clinic.isError ? <ErrorNotice onRetry={refresh} /> : clinic.data ? <><div className="grid gap-10 lg:grid-cols-[1fr_.8fr]"><div className="fade-up"><SectionKicker>About your clinic</SectionKicker><h1 className="max-w-2xl font-display text-5xl font-extrabold leading-[1] tracking-[-.06em] sm:text-6xl">{clinic.data.name}</h1><p className="mt-6 max-w-xl text-xl leading-8 text-muted-foreground">{clinic.data.tagline}</p><div className="mt-8 flex flex-col gap-3"><DetailLine icon={<MapPin />} label="Find us" value={clinic.data.address} /><DetailLine icon={<Phone />} label="Call the clinic" value={clinic.data.phone} /><DetailLine icon={<Clock3 />} label="Opening hours" value={clinic.data.openingHours} /></div></div><div className="paper-grid rounded-[2rem] border border-border bg-card p-7 shadow-sm sm:p-9"><div className="grid size-14 place-items-center rounded-2xl bg-secondary text-foreground"><Stethoscope className="size-6" /></div><h2 className="mt-8 font-display text-2xl font-bold">Care that meets you where you are.</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">From a first check-in to ongoing support, our team is here to make the next step feel simple.</p><Link href="/" className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-bold text-primary-foreground" data-testid="link-clinic-book">Book a clinic visit <ArrowRight className="size-4" /></Link></div></div><div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_.9fr]"><section><SectionKicker>What we help with</SectionKicker><h2 className="font-display text-3xl font-extrabold tracking-[-.04em]">Services for real life.</h2><div className="mt-6 grid gap-3 sm:grid-cols-2">{clinic.data.services.map((service, index) => <div key={service} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4" data-testid={`text-service-${index}`}><span className="grid size-8 place-items-center rounded-full bg-muted text-primary"><Check className="size-4" /></span><span className="text-sm font-semibold">{service}</span></div>)}</div></section><section className="rounded-2xl bg-primary p-6 text-primary-foreground"><SectionKicker>Good to know</SectionKicker><p className="text-primary-foreground/70">A quick look at the clinic day</p><div className="mt-6 space-y-5"><div><p className="font-display text-3xl font-extrabold">{summary.data?.availableToday ?? '—'}</p><p className="text-sm text-primary-foreground/70">open appointment times today</p></div><div className="border-t border-primary-foreground/20 pt-5"><p className="font-display text-xl font-bold">{clinic.data.openingHours}</p><p className="text-sm text-primary-foreground/70">clinic hours</p></div></div></section></div></> : null}</main><Footer /></PageShell>;
}

function DetailLine({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return <div className="flex items-start gap-3"><span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-muted text-primary">{icon}</span><div><p className="text-xs font-bold uppercase tracking-[.12em] text-muted-foreground">{label}</p><p className="mt-1 font-semibold">{value}</p></div></div>;
}