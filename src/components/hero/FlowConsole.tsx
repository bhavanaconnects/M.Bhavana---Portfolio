import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, RotateCcw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { cn } from '../../utils/cn';

/**
 * Each flow restates, step by step, something described in the resumes.
 * The log lines are plain-language narration, not real code or endpoints.
 */
interface Step {
  layer: string;
  text: string;
  log: string;
}
interface Flow {
  id: string;
  tab: string;
  source: string;
  projectId: string;
  steps: Step[];
}

const flows: Flow[] = [
  {
    id: 'payments',
    tab: 'Payments',
    source: 'Mopuri Business Solutions · Django',
    projectId: 'mopuri',
    steps: [
      { layer: 'JavaScript', text: 'Service application submitted', log: 'form submitted: service application' },
      { layer: 'Django', text: 'Razorpay order created on the server', log: 'order created server-side' },
      { layer: 'Razorpay', text: 'Customer completes checkout', log: 'checkout completed' },
      { layer: 'Django', text: 'Payment signature is verified', log: 'signature verified ✓' },
      { layer: 'SQL', text: 'Payment saved, errors logged', log: 'saved to relational db · errors → log' },
    ],
  },
  {
    id: 'crm',
    tab: 'CRM API',
    source: 'CRM Management System · FastAPI',
    projectId: 'crm',
    steps: [
      { layer: 'JavaScript', text: 'Dashboard asks for leads, with a JWT', log: 'request + bearer token' },
      { layer: 'Router', text: 'Protected endpoint checks the token', log: 'jwt valid ✓' },
      { layer: 'Service', text: 'Service layer handles the request', log: 'router → service' },
      { layer: 'SQLAlchemy', text: 'Repository queries PostgreSQL', log: 'repository → postgresql' },
      { layer: 'Schema', text: 'Validated JSON returned to the UI', log: 'response serialised by schema' },
    ],
  },
  {
    id: 'ml',
    tab: 'ML alert',
    source: 'Emergency Health Alert System · Scikit-learn',
    projectId: 'health',
    steps: [
      { layer: 'Data', text: 'Patient data comes in', log: 'patient record loaded' },
      { layer: 'Python', text: 'Preprocessing cleans the data', log: 'preprocessed' },
      { layer: 'Model', text: 'Classifier predicts emergency risk', log: 'prediction: high risk' },
      { layer: 'Rules', text: 'Rule-based check on the result', log: 'alert rule matched' },
      { layer: 'Alert', text: 'High-risk case is flagged', log: 'ALERT raised ⚑' },
    ],
  },
];

const STEP_MS = 950;
const HOLD_MS = 2600;
const ROW = 46; // px height of each step row — keeps the packet aligned with the nodes

export function FlowConsole({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef);
  const [flowIndex, setFlowIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const flow = flows[flowIndex];
  const last = flow.steps.length - 1;
  const done = step >= last;

  // Step through the current flow; then (until the visitor picks a tab) move to the next one.
  useEffect(() => {
    if (reduce || !inView) return;
    if (!done) {
      const t = window.setTimeout(() => setStep((s) => s + 1), STEP_MS);
      return () => window.clearTimeout(t);
    }
    if (!autoRotate) return;
    const t = window.setTimeout(() => {
      setFlowIndex((i) => (i + 1) % flows.length);
      setStep(0);
    }, HOLD_MS);
    return () => window.clearTimeout(t);
  }, [step, done, inView, reduce, autoRotate]);

  const shownStep = reduce ? last : step;

  const selectFlow = (i: number) => {
    setAutoRotate(false);
    setFlowIndex(i);
    setStep(0);
  };

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + flows.length) % flows.length;
    selectFlow(next);
    document.getElementById(`flow-tab-${flows[next].id}`)?.focus();
  };

  return (
    <div
      ref={rootRef}
      className="relative overflow-hidden rounded-[22px] bg-console text-white shadow-[var(--shadow-console)] ring-1 ring-white/[0.06]"
    >
      {/* soft light on the top edge */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      <div className="flex flex-col gap-3 border-b border-console-line px-4 py-3.5 sm:px-5 xl:flex-row xl:items-center xl:justify-between">
        <p className="text-[13px] font-medium text-white/55">Trace a request</p>
        <div role="tablist" aria-label="Example flows" className="console-scroll -mx-1 flex gap-1 overflow-x-auto px-1">
          {flows.map((f, i) => (
            <button
              key={f.id}
              id={`flow-tab-${f.id}`}
              role="tab"
              type="button"
              aria-selected={i === flowIndex}
              aria-controls="flow-panel"
              tabIndex={i === flowIndex ? 0 : -1}
              onClick={() => selectFlow(i)}
              onKeyDown={(e) => onTabKey(e, i)}
              className={cn(
                'relative h-8 shrink-0 rounded-lg px-3 text-[13px] font-semibold transition-colors',
                i === flowIndex ? 'text-ink' : 'text-white/60 hover:bg-white/[0.06] hover:text-white',
              )}
            >
              {i === flowIndex && (
                <motion.span layoutId="flow-tab" className="absolute inset-0 rounded-lg bg-white" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
              )}
              <span className="relative">{f.tab}</span>
            </button>
          ))}
        </div>
      </div>

      <div id="flow-panel" role="tabpanel" aria-labelledby={`flow-tab-${flow.id}`} className="px-4 pb-4 pt-5 sm:px-5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={flow.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            {/* Step rail */}
            <ol className="relative" style={{ height: ROW * flow.steps.length }}>
              <span aria-hidden="true" className="absolute left-[11px] w-px bg-console-line" style={{ top: ROW / 2, bottom: ROW / 2 }} />
              <motion.span
                aria-hidden="true"
                className="absolute left-[11px] w-px origin-top bg-signal"
                style={{ top: ROW / 2, height: ROW * last }}
                initial={false}
                animate={{ scaleY: shownStep / last }}
                transition={{ duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
              {!reduce && (
                <motion.span
                  aria-hidden="true"
                  className="absolute left-[7px] size-[9px] rounded-full bg-signal shadow-[0_0_0_4px_rgb(52_209_176/0.18),0_0_16px_rgb(52_209_176/0.8)]"
                  initial={false}
                  animate={{ top: ROW / 2 + shownStep * ROW - 4.5 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              {flow.steps.map((s, i) => {
                const reached = i <= shownStep;
                const current = i === shownStep && !reduce;
                return (
                  <li key={s.text} className="relative flex items-center gap-3 pl-8 sm:gap-3.5 sm:pl-9" style={{ height: ROW }}>
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute left-[6px] size-[11px] rounded-full border-2 transition-colors duration-300',
                        reached ? 'border-signal bg-console' : 'border-console-line bg-console',
                      )}
                    />
                    <span
                      className={cn(
                        'inline-flex h-6 w-[78px] shrink-0 items-center justify-center rounded-md font-mono text-[11px] transition-colors duration-300 sm:w-[92px]',
                        reached ? 'bg-white/[0.08] text-white/85' : 'bg-white/[0.03] text-white/35',
                      )}
                    >
                      {s.layer}
                    </span>
                    <span className={cn('line-clamp-2 min-w-0 text-[13.5px] leading-[1.25] transition-colors duration-300 sm:truncate sm:text-[14.5px]', current ? 'text-white' : reached ? 'text-white/75' : 'text-white/35')}>
                      {s.text}
                    </span>
                  </li>
                );
              })}
            </ol>

            {/* Log */}
            <div className="mt-4 rounded-xl bg-black/30 px-3.5 py-3 font-mono text-[12px] leading-[20px] ring-1 ring-inset ring-white/[0.05]" aria-hidden="true">
              <div style={{ height: 20 * flow.steps.length }}>
                {flow.steps.map((s, i) => (
                  <div key={s.log} className={cn('flex gap-3 truncate transition-opacity duration-300', i <= shownStep ? 'opacity-100' : 'opacity-0')}>
                    <span className="text-white/30">{String(i + 1).padStart(2, '0')}</span>
                    <span className={cn(i === last ? 'text-signal' : 'text-white/70', s.log.includes('ALERT') && 'text-amber')}>{s.log}</span>
                    {i === shownStep && !done && <span className="animate-caret text-white/60">▍</span>}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 flex items-center justify-end gap-3 sm:justify-between">
          <p className="hidden min-w-0 truncate text-[12.5px] text-white/45 sm:block">{flow.source}</p>
          <div className="flex shrink-0 items-center gap-1">
            {!reduce && (
              <button
                type="button"
                onClick={() => {
                  setAutoRotate(false);
                  setStep(0);
                }}
                className="grid size-8 place-items-center rounded-lg text-white/55 transition-colors hover:bg-white/[0.07] hover:text-white"
                aria-label="Replay this flow"
              >
                <RotateCcw size={15} aria-hidden="true" />
              </button>
            )}
            <button
              type="button"
              onClick={() => onOpenProject(flow.projectId)}
              className="inline-flex h-8 items-center gap-1 rounded-lg px-2.5 text-[13px] font-semibold text-white/80 transition-colors hover:bg-white/[0.07] hover:text-white"
            >
              Project details
              <ArrowUpRight size={15} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
