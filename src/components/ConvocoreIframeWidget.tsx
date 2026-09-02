import { useEffect } from 'react';

// Official Convocore (Voiceglow) widget embed. This renders the real widget
// (UI Engine, buttons, popup) rather than a hand-rolled iframe.
const AGENT_ID = 'v1U2AzmexG0DXitJjDIH';
const REGION = 'na';
const BUNDLE_ID = 'vg-convocore-bundle';

// Read (or create) the same funnel lead_id the Footer/ContactForm use, so chatbot
// leads stay attributed to the same visitor. Passed to Convocore as the user id.
function resolveLeadId(): string {
  try {
    let id = window.localStorage.getItem('lead_id');
    if (!id) {
      id = (Date.now().toString(36) + Math.random().toString(36).substring(2, 8)).toUpperCase();
      window.localStorage.setItem('lead_id', id);
    }
    return id;
  } catch {
    return '';
  }
}

// Load the widget once, even if this component remounts on route changes.
let injected = false;

export default function ConvocoreIframeWidget() {
  useEffect(() => {
    if (injected || document.getElementById(BUNDLE_ID)) {
      injected = true;
      return;
    }
    injected = true;

    const leadId = resolveLeadId();

    (window as unknown as { VG_CONFIG: Record<string, unknown> }).VG_CONFIG = {
      ID: AGENT_ID,
      region: REGION,
      render: 'bottom-right',
      stylesheets: ['https://cdn.convocore.ai/vg_live_build/styles.css'],
      // Ties each conversation to the visitor's funnel lead_id.
      // userID identifies the conversation owner; vf_variables makes the same
      // value available to the agent's custom `lead_id` variable.
      ...(leadId
        ? {
            userID: leadId,
            vf_variables: { lead_id: leadId },
          }
        : {}),
    };

    const script = document.createElement('script');
    script.id = BUNDLE_ID;
    script.src = 'https://cdn.convocore.ai/vg_live_build/vg_bundle.js';
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return <div id="VG_OVERLAY_CONTAINER" style={{ width: 0, height: 0 }} />;
}
