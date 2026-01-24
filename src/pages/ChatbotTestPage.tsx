import { useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

type ConvocoreMode = 'popup' | 'full-width' | 'modal' | 'iframe';

const AGENT_ID = '6BhLW2avFF69X0ydpkZ3';
const REGION: 'na' | 'eu' = 'na';

function useModeFromQuery(): ConvocoreMode {
  const location = useLocation();
  return useMemo(() => {
    const mode = new URLSearchParams(location.search).get('mode');
    if (mode === 'popup' || mode === 'full-width' || mode === 'modal' || mode === 'iframe') return mode;
    return 'popup';
  }, [location.search]);
}

function ensureOverlayContainer(): HTMLDivElement {
  const existing = document.getElementById('VG_OVERLAY_CONTAINER');
  if (existing && existing instanceof HTMLDivElement) return existing;
  const el = document.createElement('div');
  el.id = 'VG_OVERLAY_CONTAINER';
  document.body.appendChild(el);
  return el;
}

function setOverlayContainerStyle(mode: ConvocoreMode) {
  const overlay = ensureOverlayContainer();
  overlay.innerHTML = '';

  if (mode === 'full-width') {
    overlay.style.width = '620px';
    overlay.style.height = '85vh';
    overlay.style.position = 'fixed';
    overlay.style.right = '20px';
    overlay.style.bottom = '20px';
    overlay.style.left = 'auto';
    overlay.style.top = 'auto';
    overlay.style.zIndex = '999999';
    overlay.style.borderRadius = '16px';
    overlay.style.overflow = 'hidden';
    return;
  }

  overlay.style.width = '0';
  overlay.style.height = '0';
  overlay.style.position = '';
  overlay.style.right = '';
  overlay.style.bottom = '';
  overlay.style.left = '';
  overlay.style.top = '';
  overlay.style.zIndex = '';
  overlay.style.borderRadius = '';
  overlay.style.overflow = '';
}

function removeExistingConvocoreScript() {
  const existing = document.getElementById('convocore_vg_bundle');
  if (existing) existing.remove();
}

function loadConvocoreScript(config: Record<string, unknown>) {
  removeExistingConvocoreScript();
  (window as any).VG_CONFIG = config;
  const script = document.createElement('script');
  script.id = 'convocore_vg_bundle';
  script.src = 'https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js';
  script.defer = true;
  document.body.appendChild(script);
}

export default function ChatbotTestPage() {
  const mode = useModeFromQuery();

  useEffect(() => {
    if (mode === 'iframe') {
      setOverlayContainerStyle('popup');
      removeExistingConvocoreScript();
      return;
    }

    setOverlayContainerStyle(mode);

    const baseConfig: Record<string, unknown> = {
      ID: AGENT_ID,
      region: REGION,
      stylesheets: [
        'https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css',
        '/convocore-overrides.css',
      ],
    };

    if (mode === 'popup') {
      loadConvocoreScript({
        ...baseConfig,
        render: 'bottom-right',
      });
      return;
    }

    if (mode === 'modal') {
      loadConvocoreScript({
        ...baseConfig,
        render: 'bottom-right',
        modalMode: true,
      });
      return;
    }

    loadConvocoreScript({
      ...baseConfig,
      render: 'full-width',
    });
  }, [mode]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-white">
      <h1 className="text-3xl font-bold mb-2">Chatbot Test</h1>
      <p className="text-white/80 mb-6">Use these modes to compare which embed displays correctly.</p>

      <div className="flex flex-wrap gap-3 mb-8">
        <Link
          to="/chatbot-test?mode=popup"
          className={`px-4 py-2 rounded border ${mode === 'popup' ? 'bg-white text-black border-white' : 'border-white/30 text-white'}`}
        >
          Popup
        </Link>
        <Link
          to="/chatbot-test?mode=full-width"
          className={`px-4 py-2 rounded border ${mode === 'full-width' ? 'bg-white text-black border-white' : 'border-white/30 text-white'}`}
        >
          Full-width div
        </Link>
        <Link
          to="/chatbot-test?mode=modal"
          className={`px-4 py-2 rounded border ${mode === 'modal' ? 'bg-white text-black border-white' : 'border-white/30 text-white'}`}
        >
          Modal
        </Link>
        <Link
          to="/chatbot-test?mode=iframe"
          className={`px-4 py-2 rounded border ${mode === 'iframe' ? 'bg-white text-black border-white' : 'border-white/30 text-white'}`}
        >
          iFrame
        </Link>
      </div>

      {mode === 'iframe' ? (
        <div className="w-full h-[85vh] rounded-2xl overflow-hidden border border-white/10 bg-black">
          <iframe
            src={`https://convocore.ai/app/${REGION}/render/${AGENT_ID}/iframe`}
            className="w-full h-full"
            frameBorder={0}
            title="Convocore iFrame"
          />
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
          <div className="font-semibold mb-1">Mode: {mode}</div>
          <div className="text-white/80">
            The widget is rendered via script into <span className="font-mono">#VG_OVERLAY_CONTAINER</span>.
          </div>
        </div>
      )}
    </div>
  );
}

