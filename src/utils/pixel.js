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
  if (typeof window !== 'undefined' && window.fbq) {
    const processedData = { ...data };
    if (processedData.value) processedData.value = Math.round(Number(processedData.value));
    window.fbq('track', event, processedData);
  }
};

export const trackPurchaseIfFromFacebook = (data) => {
  if (typeof window === 'undefined') return;
  const entry = sessionStorage.getItem(FB_KEY);
  if (!entry) return;
  const mins = (Date.now() - parseInt(entry)) / 60000;
  if (mins < 30) track('Purchase', data);
};

// Google Analytics (GA4) Helper Functions
export const trackGooglePurchase = (orderData, ticketNumber) => {
  if (typeof window !== 'undefined' && window.gtag) {
    try {
      window.gtag('event', 'purchase', {
        transaction_id: ticketNumber || 'N/A',
        value: Math.round(Number(orderData.value || 0)),
        currency: 'COP',
        items: [
          {
            item_id: ticketNumber || 'N/A',
            item_name: orderData.content_name || 'Compra Zen Hogar',
            price: Math.round(Number(orderData.value || 0)),
            quantity: 1
          }
        ]
      });
      console.log('📊 [GA4] Purchase event tracked successfully:', ticketNumber, orderData.value);
    } catch (e) {
      console.error('❌ [GA4] Error tracking purchase:', e);
    }
  } else {
    console.warn('⚠️ [GA4] gtag is not defined on window object');
  }
};

export const trackGoogleWhatsAppClick = (orderData) => {
  if (typeof window !== 'undefined' && window.gtag) {
    try {
      window.gtag('event', 'whatsapp_confirmation', {
        value: Math.round(Number(orderData?.value || 0)),
        currency: 'COP',
        event_category: 'Engagement',
        event_label: 'Confirmar Pedido WhatsApp'
      });
      console.log('📊 [GA4] WhatsApp Confirmation clicked and tracked successfully');
    } catch (e) {
      console.error('❌ [GA4] Error tracking WhatsApp click:', e);
    }
  } else {
    console.warn('⚠️ [GA4] gtag is not defined on window object');
  }
};

export const trackGoogleBeginCheckout = (value) => {
  if (typeof window !== 'undefined' && window.gtag) {
    try {
      window.gtag('event', 'begin_checkout', {
        value: Math.round(Number(value || 0)),
        currency: 'COP',
        items: [
          {
            item_name: 'Checkout Zen Hogar',
            price: Math.round(Number(value || 0)),
            quantity: 1
          }
        ]
      });
      console.log('📊 [GA4] Begin Checkout event tracked successfully:', value);
    } catch (e) {
      console.error('❌ [GA4] Error tracking begin_checkout:', e);
    }
  }
};

