import { useLocation } from 'react-router-dom';
import ConvocoreIframeWidget from './ConvocoreIframeWidget';

export default function ConvocoreWidgetMount() {
  const location = useLocation();
  if (location.pathname.startsWith('/chatbot-test')) return null;
  return <ConvocoreIframeWidget />;
}

