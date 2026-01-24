import { useEffect, useMemo, useState } from 'react';

const AGENT_ID = '6BhLW2avFF69X0ydpkZ3';
const REGION: 'na' | 'eu' = 'na';
const HINT_DISMISSED_KEY = 'rb_convocore_hint_dismissed_v1';

export default function ConvocoreIframeWidget() {
  const [open, setOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const iframeSrc = useMemo(() => {
    return `https://convocore.ai/app/${REGION}/render/${AGENT_ID}/iframe`;
  }, []);

  useEffect(() => {
    try {
      const dismissed = window.localStorage.getItem(HINT_DISMISSED_KEY);
      setShowHint(dismissed !== '1');
    } catch {
      setShowHint(true);
    }
  }, []);

  const dismissHint = () => {
    setShowHint(false);
    try {
      window.localStorage.setItem(HINT_DISMISSED_KEY, '1');
    } catch {
      // ignore
    }
  };

  return (
    <>
      {open ? (
        <div className="fixed inset-0 z-[999999] bg-black/40" onClick={() => setOpen(false)} />
      ) : null}

      {open ? (
        <div className="fixed z-[1000000] inset-0 md:inset-6">
          <div className="w-full h-full md:rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl flex flex-col">
            <div className="h-12 flex items-center justify-between px-4 border-b border-white/10 bg-black">
              <div className="text-white font-semibold">Chat</div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white px-2 py-1 rounded"
                aria-label="Close chat"
              >
                ×
              </button>
            </div>
            <div className="flex-1">
              <iframe src={iframeSrc} className="w-full h-full" frameBorder={0} title="Convocore Chat" />
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed z-[1000000] bottom-5 right-5 flex flex-col items-end gap-2">
          {showHint ? (
            <div className="flex items-center gap-2 rounded-full bg-red-600 text-white px-3 py-2 shadow-xl border border-white/10">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="text-sm font-medium leading-none"
                aria-label="Open chat"
              >
                How can I help you?
              </button>
              <button
                type="button"
                onClick={dismissHint}
                className="w-6 h-6 rounded-full bg-white/15 hover:bg-white/20 flex items-center justify-center leading-none"
                aria-label="Dismiss message"
              >
                ×
              </button>
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="w-16 h-16 rounded-full bg-black border border-white/15 shadow-xl flex items-center justify-center"
            aria-label="Open chat"
          >
            <img src="/rb_logo.png" alt="" className="w-9 h-9" />
          </button>
        </div>
      )}
    </>
  );
}
