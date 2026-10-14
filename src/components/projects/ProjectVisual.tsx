import { Check, CircleAlert, Database, FileText, Server } from 'lucide-react';
import type { ProjectVisualKind } from '../../data/projects';
import { cn } from '../../utils/cn';
import { FrameScrubber } from './FrameScrubber';

/**
 * Illustrations built from each project's own architecture and features.
 * They are decorative (aria-hidden) and are not screenshots.
 */
export function ProjectVisual({ kind, compact = false }: { kind: ProjectVisualKind; compact?: boolean }) {
  switch (kind) {
    case 'crm':
      return <CrmVisual />;
    case 'payments':
      return <PaymentsVisual />;
    case 'frames':
      return <FrameScrubber compact={compact} />;
    case 'ml':
      return <MlVisual />;
    case 'pages':
      return <PagesVisual />;
    case 'services':
      return <ServicesVisual />;
  }
}

const dataFiles = ['services-index', 'prices', 'compliance-dates'];
const consumers = ['Search', 'Pricing', 'Enquiry wizard', '8 calculators', 'Calendar', 'Chat'];

function ServicesVisual() {
  return (
    <Panel>
      <div className="mx-auto grid max-w-[460px] grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="min-w-0 rounded-xl bg-ink p-3 text-white shadow-lg">
          <p className="mb-2 font-mono text-[10.5px] text-white/50">shared data files</p>
          <div className="space-y-1.5">
            {dataFiles.map((f) => (
              <div key={f} className="flex h-7 min-w-0 items-center gap-1.5 rounded-md bg-white/[0.07] px-1.5 font-mono text-[9.5px] lg:gap-2 lg:px-2 lg:text-[10.5px]">
                <span className="size-1.5 shrink-0 rounded-full bg-signal" />
                <span className="truncate">{f}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex h-7 items-center gap-2 rounded-md border border-dashed border-white/20 px-2 text-[12px] text-white/70">
            <FileText size={13} className="shrink-0" /> <span className="truncate">82 services</span>
          </div>
        </div>
        <div className="min-w-0 rounded-xl bg-surface p-3 shadow-[var(--shadow-card)] ring-1 ring-line">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="text-[11.5px] font-bold text-ink">In the browser</span>
            <span className="shrink-0 rounded bg-cobalt-soft px-1.5 py-0.5 font-mono text-[9.5px] font-medium text-cobalt-deep">JS</span>
          </div>
          <div className="flex flex-wrap gap-1 sm:gap-1.5">
            {consumers.map((c) => (
              <span key={c} className="inline-flex h-5 items-center gap-1 whitespace-nowrap rounded-md bg-paper px-1.5 text-[10.5px] font-semibold text-ink sm:h-6 sm:gap-1.5 sm:px-2 sm:text-[11px]">
                <span className="size-1.5 shrink-0 rounded-full bg-cobalt/60" />
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div aria-hidden="true" className={cn('relative flex h-full w-full items-center justify-center overflow-hidden bg-[#eef1ff] p-5 sm:p-6', className)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgb(47_75_255/0.14),transparent_55%)]" />
      <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgb(19_23_34/0.08)_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="relative w-full">{children}</div>
    </div>
  );
}

const layers = ['Routers', 'Services', 'Repositories', 'Schemas'];
const modules = ['Leads', 'Contacts', 'Companies', 'Deals', 'Tasks', 'Calendar'];

function CrmVisual() {
  return (
    <Panel>
      <div className="mx-auto grid max-w-[460px] grid-cols-[1fr_1.1fr] gap-3">
        <div className="rounded-xl bg-ink p-3 text-white shadow-lg">
          <p className="mb-2 font-mono text-[10.5px] text-white/50">fastapi</p>
          <div className="space-y-1.5">
            {layers.map((l, i) => (
              <div key={l} className="flex h-7 items-center gap-2 rounded-md bg-white/[0.07] px-2 text-[12px] font-medium" style={{ marginLeft: i * 6 }}>
                <span className="size-1.5 rounded-full bg-signal" />
                {l}
              </div>
            ))}
          </div>
          <div className="mt-2 flex h-7 items-center gap-2 rounded-md border border-dashed border-white/20 px-2 text-[12px] text-white/70">
            <Database size={13} /> PostgreSQL
          </div>
        </div>
        <div className="rounded-xl bg-surface p-3 shadow-[var(--shadow-card)] ring-1 ring-line">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11.5px] font-bold text-ink">Dashboard</span>
            <span className="rounded bg-cobalt-soft px-1.5 py-0.5 font-mono text-[9.5px] font-medium text-cobalt-deep">JWT</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {modules.map((m) => (
              <div key={m} className="rounded-md bg-paper px-2 py-1.5">
                <div className="text-[11px] font-semibold text-ink">{m}</div>
                <div className="mt-1 h-1 rounded-full bg-line">
                  <div className="h-1 rounded-full bg-cobalt/60" style={{ width: `${40 + ((m.length * 13) % 50)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

function PaymentsVisual() {
  const steps = [
    { icon: FileText, label: 'Form' },
    { icon: Server, label: 'Order' },
    { icon: Check, label: 'Verify' },
    { icon: Database, label: 'Save' },
  ];
  return (
    <Panel>
      <div className="mx-auto max-w-[380px]">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s.label} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <span className={cn('grid size-10 place-items-center rounded-xl shadow-sm', i === 2 ? 'bg-cobalt text-white' : 'bg-surface text-ink ring-1 ring-line')}>
                  <s.icon size={17} strokeWidth={2.2} />
                </span>
                <span className="text-[11.5px] font-semibold text-ink/80">{s.label}</span>
              </div>
              {i < steps.length - 1 && <span className="mx-1.5 mb-5 h-px flex-1 bg-[repeating-linear-gradient(90deg,rgb(19_23_34/0.35)_0_4px,transparent_4px_8px)]" />}
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-surface p-3 shadow-[var(--shadow-card)] ring-1 ring-line">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-bold text-ink">Razorpay payment</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#e3f8f2] px-2 py-0.5 text-[10.5px] font-semibold text-[#0b7a63]">
              <Check size={11} strokeWidth={3} /> signature verified
            </span>
          </div>
          <div className="mt-2.5 space-y-1.5">
            <div className="h-1.5 w-3/4 rounded-full bg-line" />
            <div className="h-1.5 w-1/2 rounded-full bg-line" />
          </div>
        </div>
      </div>
    </Panel>
  );
}

function MlVisual() {
  const stages = ['Data', 'Preprocess', 'Classifier', 'Rules'];
  return (
    <Panel className="bg-[#f1f3f7]">
      <div className="mx-auto max-w-[380px]">
        <div className="grid grid-cols-4 gap-1.5">
          {stages.map((s, i) => (
            <div key={s} className={cn('rounded-lg px-1.5 py-2 text-center text-[11px] font-semibold', i === 2 ? 'bg-ink text-white' : 'bg-surface text-ink ring-1 ring-line')}>
              {s}
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl bg-surface p-3 shadow-[var(--shadow-card)] ring-1 ring-line">
          <div>
            <p className="mb-1.5 text-[10.5px] font-semibold text-slate">Evaluated on</p>
            <div className="flex flex-wrap gap-1">
              {['accuracy', 'precision', 'recall'].map((m) => (
                <span key={m} className="rounded-md bg-paper px-1.5 py-1 font-mono text-[10.5px] text-ink/80 ring-1 ring-line">
                  {m}
                </span>
              ))}
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-lg bg-[#fff3dc] px-2 py-1.5 text-[11px] font-bold text-[#8a5a00]">
            <CircleAlert size={13} /> High risk
          </span>
        </div>
      </div>
    </Panel>
  );
}

function PagesVisual() {
  const pages = ['Home', 'Services', 'Gallery', 'Contact'];
  return (
    <Panel className="bg-[#f7f1f4]">
      <div className="mx-auto flex max-w-[360px] items-end justify-center gap-1.5 sm:gap-2">
        {pages.map((p, i) => (
          <div key={p} className="min-w-0 flex-1 rounded-lg bg-surface p-1.5 shadow-[var(--shadow-card)] ring-1 ring-line" style={{ transform: `translateY(${[6, 0, -4, 2][i]}px)` }}>
            <div className="mb-1.5 flex gap-0.5">
              <span className="size-1 rounded-full bg-line-strong" />
              <span className="size-1 rounded-full bg-line-strong" />
            </div>
            <div className={cn('h-10 rounded', ['bg-[#f3c6d3]', 'bg-[#cfe0ff]', 'bg-[#ffe3b8]', 'bg-[#d6f0e6]'][i])} />
            <div className="mt-1.5 h-1 w-3/4 rounded-full bg-line" />
            <div className="mt-1 h-1 w-1/2 rounded-full bg-line" />
            <p className="mt-1.5 truncate text-center text-[10px] font-semibold text-ink/70">{p}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}
