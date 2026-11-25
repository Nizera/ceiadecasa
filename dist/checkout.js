// Preencha com o endereço público do checkout depois de cadastrar o produto na Flowyn.
const checkoutUrl = "";

if (checkoutUrl) {
  const checkout = new URL(checkoutUrl, window.location.href);
  const flowynHosts = ["flowyn.com.br", "www.flowyn.com.br"];

  if (checkout.protocol === "https:" && flowynHosts.includes(checkout.hostname)
      && /^\/checkout\/[\w-]+\/?$/.test(checkout.pathname)
      && !/^\/checkout\/success\/?$/.test(checkout.pathname)) {
    const link = document.querySelector("#comprar");
    link.href = checkout.href;
    link.hidden = false;
    document.querySelector("#status-compra").hidden = true;

    const heroLink = document.querySelector("[data-oferta]");
    heroLink.textContent = "Conhecer o e-book";
    heroLink.href = "#ebook";
  }
}
