import { AnimatePresence, motion } from 'motion/react';
import { Check } from 'lucide-react';

/** Small confirmation pill. Lives in a polite live region so screen readers announce it. */
export function Toast({ show, message }: { show: boolean; message: string }) {
  return (
    <div aria-live="polite" role="status" className="pointer-events-none fixed inset-x-0 bottom-[max(24px,env(safe-area-inset-bottom))] z-[80] flex justify-center px-4">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[14px] font-medium text-white shadow-lg"
          >
            <span className="grid size-5 place-items-center rounded-full bg-signal text-ink">
              <Check size={13} strokeWidth={3} aria-hidden="true" />
            </span>
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
