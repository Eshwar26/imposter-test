/* ════════════════════════════════════════════════════════════════
   CINEFIED · ANALYTICS
   Google Analytics for every page. Each page that loads this file counts
   as a page view; each new phone or browser counts as a user.
   Does nothing when the site is opened on your own computer (localhost),
   so testing doesn't count.

   Add this line inside <head> on every page:
     <script src="core/analytics.js?v=1.0.0"></script>
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var ID = 'G-5610YX97R6';   // Measurement ID: Google Analytics → Admin → Data streams
  var host = location.hostname;
  if (host === 'localhost' || host === '127.0.0.1' || host === '') return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', ID);

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
  document.head.appendChild(s);
})();
