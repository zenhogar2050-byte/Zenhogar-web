const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || '26749410671349006';
const FB_KEY = 'fb_entry_time';

export const initPixel = () => {
  if (typeof window === 'undefined') return;
  if (window.location.hostname !== 'zenhogar.live' && window.location.hostname !== 'localhost' && !window.location.hostname.includes('run.app')) {
    // Permitimos localhost y run.app para desarrollo/preview, pero el usuario pidió zenhogar.live
    // Ajustaré a lo que pidió exactamente el usuario.
  }
  
  if (window.location.hostname !== 'zenhogar.live') return;
  if (!PIXEL_ID || window.fbq) return;

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

export const trackPurchaseIfFromFacebook = (data) => {
  if (typeof window === 'undefined') return;
  const entry = sessionStorage.getItem(FB_KEY);
  if (!entry) return;
  const mins = (Date.now() - parseInt(entry)) / 60000;
  if (mins < 30) track('Purchase', data);
};
