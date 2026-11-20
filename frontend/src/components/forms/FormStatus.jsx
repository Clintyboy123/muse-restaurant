import { AnimatePresence, motion } from 'motion/react';
import { ease } from '../../utils/motion';

// The message under a form's submit button (errors). Success replaces the form with <FormSuccess>.
export default function FormStatus({ status, message, tone = 'light' }) {
  return (
    <div aria-live="polite" className="min-h-6">
      <AnimatePresence>
        {status === 'error' && message && (
          <motion.p
            className={`text-small ${tone === 'dark' ? 'text-danger-light' : 'text-danger'}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1.2, ease } }}
            exit={{ opacity: 0 }}
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
