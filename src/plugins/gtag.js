export default ({ app }) => {
  // Initialize the Google Analytics library with your tracking code
  const GA_ID = "G-ETYNMNKZ0S";
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", GA_ID);

  // Set the page view on route change
  app.router.afterEach((to, from) => {
    gtag("config", GA_ID, { page_path: to.fullPath });
  });
};
