const landingParams = new URLSearchParams(window.location.search);
const trackingKeys = [
  "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
  "fbclid", "gclid", "ttclid", "src", "sck",
];

for (const link of document.querySelectorAll("a[data-checkout]")) {
  const checkout = new URL(link.href);
  for (const key of trackingKeys) {
    const value = landingParams.get(key);
    if (value && !checkout.searchParams.has(key)) {
      checkout.searchParams.set(key, value);
    }
  }
  link.href = checkout.href;
}
