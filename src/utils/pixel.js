const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || '26749410671349006';
const FB_KEY = 'fb_entry_time';

export const initPixel = () => {
  if (typeof window === 'undefined') return;
  
  // No inicializar si ya existe o no hay ID
  if (!PIXEL_ID || window.fbq) return;

  // Solo inicializar en el dominio principal o local para evitar ruido
  const isProd = window.location.hostname === 'zenhogar.live';
  const isDev = window.location.hostname === 'localhost' || window.location.hostname.includes('run.app');
  
  if (!isProd && !isDev) return;

  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  window.fbq('init', PIXEL_ID);
  window.fbq('track', 'PageView');
};

export const markFacebookEntry = () => {
  if (typeof window === 'undefined') return;
  const p = new URLSearchParams(window.location.search);
  const isFb = p.has('fbclid') || p.get('utm_source') === 'fb' || document.referrer.includes('facebook.com');
  if (isFb) sessionStorage.setItem(FB_KEY, Date.now().toString());
};

export const track = (event, data = {}) => {
  if (typeof window !== 'undefined' && window.fbq) window.fbq('track', event, data);
};

export const trackPurchase = (data) => {
  if (typeof window === 'undefined') return;
  track('Purchase', data);
};
