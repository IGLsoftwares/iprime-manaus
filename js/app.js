/* ===== Utilidades ===== */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const brl = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const pix = v => Math.round(v * (1 - STORE.pixDiscount));
const parcela = v => brl(v / STORE.installments);
const getProduct = id => PRODUCTS.find(p => p.id === id);
const minPrice = p => Math.min(...Object.values(p.storage));
const firstStorage = p => Object.keys(p.storage)[0];

function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const c = [n >> 16, (n >> 8) & 255, n & 255].map(x => Math.max(0, Math.min(255, Math.round(x + amt))));
  return '#' + c.map(x => x.toString(16).padStart(2, '0')).join('');
}

/* ===== Ilustração do iPhone (SVG) ===== */
let svgUid = 0;
function lens(cx, cy, r) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#1a1a1c"/>
    <circle cx="${cx}" cy="${cy}" r="${r * 0.72}" fill="#0b0b0d" stroke="#3a3a40" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy}" r="${r * 0.38}" fill="#1c2340"/>
    <circle cx="${cx - r * 0.2}" cy="${cy - r * 0.22}" r="${r * 0.12}" fill="#fff" opacity=".35"/>`;
}

function phoneBack(type, hex) {
  const id = 'g' + (++svgUid);
  const dark = shade(hex, -28), light = shade(hex, 22), mod = shade(hex, -14);
  let cam = '';
  if (type === 'pro') {
    cam = `<rect x="10" y="10" width="180" height="112" rx="42" fill="${mod}"/>
      <rect x="16" y="16" width="104" height="100" rx="34" fill="${shade(hex, -22)}"/>
      ${lens(44, 42, 21)}${lens(44, 92, 21)}${lens(92, 67, 21)}
      <circle cx="146" cy="44" r="9" fill="#f5edd5" opacity=".9"/><circle cx="146" cy="88" r="5" fill="#222"/>`;
  } else if (type === 'air') {
    cam = `<rect x="10" y="16" width="180" height="60" rx="30" fill="${mod}"/>
      ${lens(44, 46, 20)}<circle cx="92" cy="46" r="6" fill="#222"/><circle cx="150" cy="46" r="8" fill="#f5edd5" opacity=".9"/>`;
  } else if (type === 'base') {
    cam = `<rect x="18" y="18" width="70" height="128" rx="35" fill="${mod}"/>
      ${lens(53, 52, 22)}${lens(53, 112, 22)}<circle cx="104" cy="34" r="7" fill="#f5edd5" opacity=".9"/>`;
  } else {
    cam = `${lens(48, 48, 24)}<circle cx="92" cy="36" r="6" fill="#f5edd5" opacity=".9"/>`;
  }
  return `<svg viewBox="0 0 200 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${light}"/><stop offset=".55" stop-color="${hex}"/><stop offset="1" stop-color="${dark}"/></linearGradient></defs>
    <rect x="2" y="2" width="196" height="396" rx="34" fill="${dark}"/>
    <rect x="5" y="5" width="190" height="390" rx="31" fill="url(#${id})"/>
    <rect x="5" y="5" width="190" height="390" rx="31" fill="#fff" opacity=".06"/>
    ${cam}
    <path d="M100 236c-6 0-9 4-13 4s-8-4-13-4c-8 0-15 7-15 18 0 12 9 26 15 26 4 0 6-3 12-3s7 3 12 3c6 0 13-12 15-18-7-3-10-9-10-15 0-6 4-10 8-12-4-5-9-7-11-7zm-1-4c4-5 3-10 3-11-4 0-8 3-10 6-2 2-3 6-3 9 4 0 8-2 10-4z" fill="${shade(hex, -10)}" opacity=".55"/>
  </svg>`;
}

function phoneFront(hex) {
  const id = 'w' + (++svgUid);
  return `<svg viewBox="0 0 200 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs><radialGradient id="${id}" cx=".3" cy=".25" r="1"><stop offset="0" stop-color="${shade(hex, 40)}"/><stop offset=".5" stop-color="${hex}"/><stop offset="1" stop-color="${shade(hex, -90)}"/></radialGradient></defs>
    <rect x="2" y="2" width="196" height="396" rx="34" fill="${shade(hex, -30)}"/>
    <rect x="6" y="6" width="188" height="388" rx="30" fill="#0a0a0a"/>
    <rect x="11" y="11" width="178" height="378" rx="26" fill="url(#${id})"/>
    <rect x="72" y="20" width="56" height="16" rx="8" fill="#000"/>
    <text x="100" y="110" text-anchor="middle" font-family="-apple-system,Inter,sans-serif" font-size="46" font-weight="300" fill="#fff" opacity=".95">9:41</text>
    <text x="100" y="72" text-anchor="middle" font-family="-apple-system,Inter,sans-serif" font-size="11" fill="#fff" opacity=".8">terça-feira, 21 de outubro</text>
    <rect x="70" y="372" width="60" height="4" rx="2" fill="#fff" opacity=".8"/>
  </svg>`;
}

/* ===== Ícones ===== */
const ICON = {
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3 6.5 7 .8-5.2 4.8 1.4 7L12 17.6 5.8 21.1l1.4-7L2 9.3l7-.8z"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1 2.7.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3z"/></svg>',
  pix: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="m12 3 9 9-9 9-9-9z"/><path d="m8 12 4-4 4 4-4 4z"/></svg>',
  card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/></svg>',
  truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/></svg>',
  swap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>',
  chevL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 6-6 6 6 6"/></svg>',
  battery: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="7" width="17" height="10" rx="2"/><path d="M22 10v4"/><rect x="4.5" y="9.5" width="10" height="5" rx="1" fill="currentColor" stroke="none"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg>'
};

/* ===== Cabeçalho e rodapé compartilhados ===== */
function renderShell() {
  const perks = `<span>${ICON.pix} <b>10% OFF</b> no Pix</span><span>${ICON.card} Até <b>12x sem juros</b></span>
      <span>${ICON.truck} Entrega expressa em Manaus</span><span>${ICON.shield} Garantia em todos os aparelhos</span>`;
  $('#header').innerHTML = `
    <div class="topbar"><div class="topbar-track">${perks}<span class="dup-wrap">${perks}</span></div></div>
    <div class="header-main container">
      <button class="icon-btn only-mobile" id="menuBtn" aria-label="Menu">${ICON.menu}</button>
      <a href="index.html" class="logo" aria-label="${STORE.name} — início"><img src="img/logo.webp" alt="iPrime Manaus" width="2000" height="667"></a>
      <form class="search" id="searchForm" role="search">
        ${ICON.search}<input id="searchInput" type="search" placeholder="Buscar iPhone, modelo, cor…" autocomplete="off" aria-label="Buscar produtos">
        <div class="search-results" id="searchResults"></div>
      </form>
      <div class="header-actions">
        <a class="icon-btn hide-mobile" href="https://wa.me/${STORE.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICON.wa}<span class="hide-tablet">Atendimento</span></a>
        <button class="icon-btn hide-mobile" aria-label="Minha conta">${ICON.user}<span class="hide-tablet">Entrar</span></button>
        <button class="icon-btn cart-btn" id="cartBtn" aria-label="Carrinho">${ICON.bag}<span class="cart-count" id="cartCount">0</span></button>
      </div>
    </div>
    <nav class="catnav" id="catnav"><div class="container catnav-inner">
      <a href="index.html#novidades">Lançamentos</a><a href="index.html#vitrine?f=17">iPhone 17</a><a href="index.html#vitrine?f=16">iPhone 16</a>
      <a href="index.html#vitrine?f=15">iPhone 15</a><a href="index.html#seminovos">Seminovos</a><a href="index.html#trade">Troque seu iPhone</a>
      <a href="index.html#loja">Nossa loja</a>
    </div></nav>`;

  $('#footer').innerHTML = `
    <div class="container footer-grid">
      <div><a href="index.html" class="logo light"><img src="img/logo.webp" alt="iPrime Manaus" width="2000" height="667"></a>
        <p class="muted small">iPhones novos e seminovos com procedência, nota fiscal e garantia. Loja física em Manaus.</p>
        <div class="socials"><a href="https://instagram.com/${STORE.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.ig}</a><a href="https://wa.me/${STORE.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICON.wa}</a></div>
      </div>
      <div><h4>Produtos</h4><a href="index.html#novidades">iPhone 17</a><a href="index.html#vitrine">iPhone 16</a><a href="index.html#seminovos">Seminovos</a><a href="index.html#trade">Troca</a></div>
      <div><h4>Ajuda</h4><a href="#">Garantia</a><a href="#">Trocas e devoluções</a><a href="#">Formas de pagamento</a><a href="#">Prazos de entrega</a></div>
      <div><h4>Atendimento</h4><p class="small">${STORE.address}</p><p class="small">${STORE.hours}</p><p class="small">(92) 99999-9999</p></div>
    </div>
    <div class="container footer-bottom">
      <div class="pay-flags"><span>Pix</span><span>Visa</span><span>Master</span><span>Elo</span><span>Amex</span><span>Boleto</span></div>
      <p class="small muted">© 2026 ${STORE.name} • CNPJ 00.000.000/0001-00 • Loja independente, sem vínculo com a Apple Inc.</p>
    </div>`;

  document.body.insertAdjacentHTML('beforeend', `
    <a class="wa-float" href="https://wa.me/${STORE.whatsapp}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${ICON.wa}</a>
    <div class="overlay" id="overlay"></div>
    <aside class="drawer" id="cartDrawer" aria-label="Carrinho">
      <div class="drawer-head"><h3>Sua sacola</h3><button class="icon-btn" id="cartClose" aria-label="Fechar">${ICON.close}</button></div>
      <div class="drawer-body" id="cartItems"></div>
      <div class="drawer-foot" id="cartFoot"></div>
    </aside>
    <aside class="drawer left" id="menuDrawer" aria-label="Menu">
      <div class="drawer-head"><a href="index.html" class="logo"><img src="img/logo.webp" alt="iPrime Manaus" width="2000" height="667"></a><button class="icon-btn" id="menuClose" aria-label="Fechar">${ICON.close}</button></div>
      <div class="drawer-body menu-list">${$('#catnav .catnav-inner').innerHTML}<a href="https://wa.me/${STORE.whatsapp}" target="_blank" rel="noopener">Falar no WhatsApp</a></div>
    </aside>
    <div class="toast" id="toast"></div>`);

  const open = el => { el.classList.add('open'); $('#overlay').classList.add('open'); document.body.style.overflow = 'hidden'; };
  const closeAll = () => { $$('.drawer').forEach(d => d.classList.remove('open')); $('#overlay').classList.remove('open'); document.body.style.overflow = ''; };
  window.openCart = () => { renderCart(); open($('#cartDrawer')); };
  $('#cartBtn').onclick = openCart;
  $('#menuBtn').onclick = () => open($('#menuDrawer'));
  $('#cartClose').onclick = $('#menuClose').onclick = $('#overlay').onclick = closeAll;
  $$('#menuDrawer a').forEach(a => a.addEventListener('click', closeAll));
  document.addEventListener('keydown', e => e.key === 'Escape' && closeAll());

  // Cabeçalho compacto ao rolar
  const hdr = $('#header');
  addEventListener('scroll', () => hdr.classList.toggle('scrolled', scrollY > 40), { passive: true });

  initSearch();
  updateCartCount();
}

/* ===== Busca ===== */
function initSearch() {
  const input = $('#searchInput'), box = $('#searchResults');
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  input.addEventListener('input', () => {
    const q = norm(input.value.trim());
    if (!q) { box.classList.remove('open'); return; }
    const hits = PRODUCTS.filter(p => norm(`${p.name} ${p.cond} ${p.colors.map(c => COLORS[c].name).join(' ')}`).includes(q)).slice(0, 6);
    box.innerHTML = hits.length ? hits.map(p => `
      <a href="produto.html?id=${p.id}" class="sr-item"><span class="sr-img">${phoneBack(p.type, COLORS[p.colors[0]].hex)}</span>
      <span><b>${p.name}</b><small>${p.cond} • a partir de ${brl(pix(minPrice(p)))} no Pix</small></span></a>`).join('')
      : `<p class="sr-empty">Nenhum resultado para “${input.value}”. <a href="https://wa.me/${STORE.whatsapp}" target="_blank" rel="noopener">Pergunte no WhatsApp</a></p>`;
    box.classList.add('open');
  });
  $('#searchForm').addEventListener('submit', e => { e.preventDefault(); const a = $('.sr-item', box); if (a) location.href = a.href; });
  document.addEventListener('click', e => { if (!e.target.closest('#searchForm')) box.classList.remove('open'); });
}

/* ===== Carrinho ===== */
const CART_KEY = 'iprime-cart';
function loadCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } }
let cart = loadCart();
function saveCart() { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch {} updateCartCount(); }
function updateCartCount() {
  const n = cart.reduce((s, i) => s + i.qty, 0), el = $('#cartCount');
  if (!el) return;
  el.textContent = n; el.classList.toggle('show', n > 0);
}
function addToCart(id, color, storage, openAfter = true) {
  const key = `${id}|${color}|${storage}`, found = cart.find(i => i.key === key);
  found ? found.qty++ : cart.push({ key, id, color, storage, qty: 1 });
  saveCart();
  const b = $('#cartBtn'); b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump');
  toast(`${getProduct(id).name} adicionado à sacola`);
  if (openAfter) setTimeout(openCart, 250);
}
function renderCart() {
  const items = $('#cartItems'), foot = $('#cartFoot');
  if (!cart.length) {
    items.innerHTML = `<div class="cart-empty">${ICON.bag}<p>Sua sacola está vazia</p><a class="btn btn-dark" href="index.html#novidades">Ver lançamentos</a></div>`;
    foot.innerHTML = ''; return;
  }
  let total = 0;
  items.innerHTML = cart.map((i, idx) => {
    const p = getProduct(i.id), price = p.storage[i.storage]; total += price * i.qty;
    return `<div class="cart-item"><div class="ci-img">${phoneBack(p.type, COLORS[i.color].hex)}</div>
      <div class="ci-info"><b>${p.name}</b><small>${i.storage} • ${COLORS[i.color].name}${p.cond === 'Seminovo' ? ' • Seminovo' : ''}</small>
        <div class="ci-row"><div class="qty"><button data-q="-1" data-i="${idx}" aria-label="Diminuir">−</button><span>${i.qty}</span><button data-q="1" data-i="${idx}" aria-label="Aumentar">+</button></div>
        <strong>${brl(pix(price) * i.qty)}</strong></div></div>
      <button class="ci-del" data-del="${idx}" aria-label="Remover">${ICON.trash}</button></div>`;
  }).join('');
  foot.innerHTML = `
    <div class="cf-row"><span>Subtotal</span><span>${brl(total)}</span></div>
    <div class="cf-row pix-row"><span>${ICON.pix} No Pix (10% OFF)</span><b>${brl(pix(total))}</b></div>
    <p class="small muted">ou ${STORE.installments}x de ${parcela(total)} sem juros no cartão</p>
    <a class="btn btn-primary btn-block" href="https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent('Olá! Quero finalizar meu pedido:\n' + cart.map(i => `• ${i.qty}x ${getProduct(i.id).name} ${i.storage} ${COLORS[i.color].name}`).join('\n'))}" target="_blank" rel="noopener">Finalizar compra</a>
    <button class="btn btn-ghost btn-block" id="keepBuying">Continuar comprando</button>`;
  $$('[data-q]', items).forEach(b => b.onclick = () => { const it = cart[b.dataset.i]; it.qty += +b.dataset.q; if (it.qty < 1) cart.splice(b.dataset.i, 1); saveCart(); renderCart(); });
  $$('[data-del]', items).forEach(b => b.onclick = () => { cart.splice(b.dataset.del, 1); saveCart(); renderCart(); });
  $('#keepBuying').onclick = () => $('#overlay').click();
}

let toastT;
function toast(msg) {
  const t = $('#toast'); t.innerHTML = `${ICON.check}<span>${msg}</span>`; t.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2400);
}

/* ===== Card de produto ===== */
function productCard(p) {
  const price = minPrice(p), old = Math.round(price * p.oldMult / 10) * 10 - 1;
  const off = Math.round((1 - pix(price) / old) * 100);
  const badge = p.cond === 'Seminovo' ? `<span class="badge badge-semi">Seminovo • ${p.grade}</span>`
    : p.tags.includes('novo') ? '<span class="badge badge-new">Lançamento</span>'
    : p.tags.includes('alta') ? '<span class="badge badge-hot">Mais vendido</span>' : '';
  return `<article class="card" data-id="${p.id}">
    <a href="produto.html?id=${p.id}" class="card-media" aria-label="${p.name}">
      ${badge}<span class="badge-off">-${off}%</span>
      <div class="card-phone">${phoneBack(p.type, COLORS[p.colors[0]].hex)}</div>
    </a>
    <div class="card-body">
      <div class="swatches">${p.colors.map((c, i) => `<button class="sw${i ? '' : ' on'}" style="--c:${COLORS[c].hex}" data-color="${c}" title="${COLORS[c].name}" aria-label="${COLORS[c].name}"></button>`).join('')}</div>
      <a href="produto.html?id=${p.id}" class="card-title">${p.name}</a>
      <p class="card-sub">${Object.keys(p.storage).join(' • ')}${p.battery ? ` <span class="batt">${ICON.battery}${p.battery}%</span>` : ''}</p>
      <div class="rating">${ICON.star}<b>${p.rating}</b><span>(${p.reviews})</span></div>
      <div class="price">
        <s>${brl(old)}</s>
        <strong>${brl(pix(price))}</strong><span class="pix-tag">no Pix</span>
        <small>ou ${STORE.installments}x de ${parcela(price)}</small>
      </div>
      <button class="btn btn-dark btn-block add-btn">${ICON.bag} Comprar</button>
    </div>
  </article>`;
}

function bindCards(root = document) {
  $$('.card', root).forEach(card => {
    const p = getProduct(card.dataset.id);
    let color = p.colors[0];
    $$('.sw', card).forEach(sw => sw.addEventListener('click', e => {
      e.preventDefault(); color = sw.dataset.color;
      $$('.sw', card).forEach(s => s.classList.toggle('on', s === sw));
      $('.card-phone', card).innerHTML = phoneBack(p.type, COLORS[color].hex);
    }));
    $('.add-btn', card).onclick = () => addToCart(p.id, color, firstStorage(p));
  });
}

/* ===== Animação de entrada ===== */
function initReveal() {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  $$('.reveal').forEach(el => io.observe(el));
}

/* ===== Carrossel horizontal (setas) ===== */
function bindRail(section) {
  const rail = $('.rail', section);
  $$('[data-rail]', section).forEach(b => b.onclick = () => rail.scrollBy({ left: +b.dataset.rail * rail.clientWidth * .8, behavior: 'smooth' }));
}

/* ===== Página inicial ===== */
function initHome() {
  // Banners
  const slides = $$('.slide'), dots = $('#dots');
  dots.innerHTML = slides.map((_, i) => `<button aria-label="Banner ${i + 1}"></button>`).join('');
  let cur = 0, timer;
  const go = i => {
    cur = (i + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('active', k === cur));
    $$('button', dots).forEach((d, k) => d.classList.toggle('on', k === cur));
  };
  const play = () => { clearInterval(timer); timer = setInterval(() => go(cur + 1), 3000); };
  $$('button', dots).forEach((d, i) => d.onclick = () => { go(i); play(); });
  $('#prevSlide').onclick = () => { go(cur - 1); play(); };
  $('#nextSlide').onclick = () => { go(cur + 1); play(); };
  let sx = 0; const hero = $('.hero');
  hero.addEventListener('touchstart', e => sx = e.touches[0].clientX, { passive: true });
  hero.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) { go(cur + (dx < 0 ? 1 : -1)); play(); } });
  $$('[data-phone]').forEach(el => { const [t, c, v] = el.dataset.phone.split(','); el.innerHTML = v === 'front' ? phoneFront(COLORS[c].hex) : phoneBack(t, COLORS[c].hex); });
  go(0); play();

  // Categorias
  const cats = [['17 Pro', 'pro', 'laranja', 'iphone-17-pro'], ['iPhone Air', 'air', 'azulceu', 'iphone-air'], ['iPhone 17', 'base', 'lavanda', 'iphone-17'], ['iPhone 16', 'base', 'ultramar', 'iphone-16'], ['iPhone 16e', 'e', 'branco', 'iphone-16e'], ['iPhone 15', 'base', 'rosa', 'iphone-15'], ['Seminovos', 'pro', 'natural', '#seminovos']];
  $('#cats').innerHTML = cats.map(([n, t, c, l]) => `<a class="cat" href="${l.startsWith('#') ? l : 'produto.html?id=' + l}"><span class="cat-img">${phoneBack(t, COLORS[c].hex)}</span><span>${n}</span></a>`).join('');

  // Vitrines
  const fill = (sel, list) => { $(sel).innerHTML = list.map(productCard).join(''); bindCards($(sel)); };
  fill('#newGrid', PRODUCTS.filter(p => p.tags.includes('novo')));
  fill('#hotRail', [...PRODUCTS].filter(p => p.cond !== 'Seminovo').sort((a, b) => b.sold - a.sold).slice(0, 8));
  fill('#semiGrid', PRODUCTS.filter(p => p.cond === 'Seminovo'));
  bindRail($('#maisvendidos'));

  // Vitrine com filtro
  const renderShowcase = f => {
    $$('#filters button').forEach(b => b.classList.toggle('on', b.dataset.f === f));
    fill('#showGrid', PRODUCTS.filter(p => p.cond !== 'Seminovo' && (f === 'all' || p.name.includes(' ' + f))));
  };
  $$('#filters button').forEach(b => b.onclick = () => renderShowcase(b.dataset.f));
  const hf = (location.hash.match(/f=(\w+)/) || [])[1];
  renderShowcase(hf || 'all');
  addEventListener('hashchange', () => { const f = (location.hash.match(/f=(\w+)/) || [])[1]; if (f) { renderShowcase(f); $('#vitrine').scrollIntoView(); } });
  if (hf) setTimeout(() => $('#vitrine').scrollIntoView(), 50);

  // Instagram
  const ig = [['pro', 'laranja', '17 Pro Max chegou 🔥'], ['air', 'azulceu', 'O mais fino de todos'], ['base', 'lavanda', 'iPhone 17 Lavanda'], ['pro', 'azulprof', 'Azul Profundo'], ['base', 'salvia', 'Cliente feliz ✨'], ['pro', 'deserto', 'Seminovo vitrine']];
  $('#igGrid').innerHTML = ig.map(([t, c, cap], i) => `<a class="ig-post" href="https://instagram.com/${STORE.instagram}" target="_blank" rel="noopener" style="--c:${COLORS[c].hex}">
    <span class="ig-phone">${i % 3 === 1 ? phoneFront(COLORS[c].hex) : phoneBack(t, COLORS[c].hex)}</span><span class="ig-cap">${ICON.ig}${cap}</span></a>`).join('');

  // Troca (simulador)
  const tradeVals = { 'iPhone 15 Pro Max': 4200, 'iPhone 15 Pro': 3600, 'iPhone 15': 2700, 'iPhone 14 Pro': 2900, 'iPhone 14': 2100, 'iPhone 13': 1600, 'iPhone 12': 1100, 'iPhone 11': 750 };
  const sel = $('#tradeModel');
  sel.innerHTML = Object.keys(tradeVals).map(k => `<option>${k}</option>`).join('');
  const upd = () => { $('#tradeVal').textContent = 'até ' + brl(tradeVals[sel.value]); };
  sel.onchange = upd; upd();
  $('#tradeBtn').href = `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent('Olá! Quero avaliar meu iPhone na troca.')}`;
}

/* ===== Página do produto ===== */
function initProduct() {
  const id = new URLSearchParams(location.search).get('id');
  const p = getProduct(id) || PRODUCTS[0];
  let color = p.colors[0], storage = firstStorage(p), view = 0;
  document.title = `${p.name} | ${STORE.name}`;
  $('#crumbName').textContent = p.name;

  const views = () => [phoneBack(p.type, COLORS[color].hex), phoneFront(COLORS[color].hex), `<div class="duo">${phoneFront(COLORS[color].hex)}${phoneBack(p.type, COLORS[color].hex)}</div>`];
  const drawGallery = () => {
    const v = views();
    $('#mainImg').innerHTML = v[view];
    $('#thumbs').innerHTML = v.map((h, i) => `<button class="thumb${i === view ? ' on' : ''}" data-v="${i}" aria-label="Imagem ${i + 1}">${h}</button>`).join('');
    $$('#thumbs .thumb').forEach(b => b.onclick = () => { view = +b.dataset.v; drawGallery(); });
  };

  const draw = () => {
    const price = p.storage[storage], old = Math.round(price * p.oldMult / 10) * 10 - 1;
    $('#pName').textContent = `${p.name} ${storage} — ${COLORS[color].name}`;
    $('#pCond').innerHTML = p.cond === 'Seminovo'
      ? `<span class="badge badge-semi">Seminovo • ${p.grade}</span><span class="badge badge-soft">${ICON.battery} Bateria ${p.battery}%</span><span class="badge badge-soft">Garantia 6 meses</span>`
      : `<span class="badge badge-new">Novo • Lacrado</span><span class="badge badge-soft">Nota fiscal</span><span class="badge badge-soft">Garantia Apple 1 ano</span>`;
    $('#pOld').textContent = brl(old);
    $('#pPix').textContent = brl(pix(price));
    $('#pSave').textContent = `Economize ${brl(old - pix(price))}`;
    $('#pCard').textContent = `${brl(price)} em até ${STORE.installments}x de ${parcela(price)} sem juros`;
    $('#colorName').textContent = COLORS[color].name;
    $('#colors').innerHTML = p.colors.map(c => `<button class="sw lg${c === color ? ' on' : ''}" style="--c:${COLORS[c].hex}" data-c="${c}" aria-label="${COLORS[c].name}" title="${COLORS[c].name}"></button>`).join('');
    $('#storages').innerHTML = Object.entries(p.storage).map(([s, v]) => `<button class="opt${s === storage ? ' on' : ''}" data-s="${s}"><b>${s}</b><small>${brl(pix(v))}</small></button>`).join('');
    $$('#colors .sw').forEach(b => b.onclick = () => { color = b.dataset.c; draw(); drawGallery(); });
    $$('#storages .opt').forEach(b => b.onclick = () => { storage = b.dataset.s; draw(); });
    $('#stickyName').textContent = `${p.name} ${storage}`;
    $('#stickyPrice').textContent = `${brl(pix(price))} no Pix`;
    $('#buyWa').href = `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(`Olá! Tenho interesse no ${p.name} ${storage} ${COLORS[color].name} (${p.cond}).`)}`;
    // Parcelas
    $('#installTable').innerHTML = [1, 2, 3, 4, 5, 6, 10, 12].map(n => `<div><span>${n}x</span><b>${brl(price / n)}</b><small>sem juros</small></div>`).join('');
  };

  $('#pRating').innerHTML = `${ICON.star.repeat(5)}<b>${p.rating}</b><a href="#reviews">${p.reviews} avaliações</a><span>• ${p.sold}+ vendidos</span>`;
  const buy = () => addToCart(p.id, color, storage);
  $('#addCart').onclick = buy;
  $('#stickyBuy').onclick = buy;
  $('#buyNow').onclick = () => { addToCart(p.id, color, storage, false); openCart(); };

  // Frete
  $('#cepForm').onsubmit = e => {
    e.preventDefault();
    const v = $('#cep').value.replace(/\D/g, '');
    $('#cepOut').innerHTML = v.length !== 8 ? '<p class="err">Digite um CEP válido com 8 números.</p>'
      : `<div class="ship"><span>${ICON.truck}<b>Entrega expressa</b><small>Hoje, até 3h</small></span><b class="green">Grátis</b></div>
         <div class="ship"><span>${ICON.truck}<b>Sedex</b><small>1 a 3 dias úteis</small></span><b>Grátis</b></div>
         <div class="ship"><span>${ICON.pin}<b>Retirar na loja</b><small>Pronto em 1h</small></span><b class="green">Grátis</b></div>`;
  };
  $('#cep').addEventListener('input', e => { let v = e.target.value.replace(/\D/g, '').slice(0, 8); e.target.value = v.length > 5 ? v.slice(0, 5) + '-' + v.slice(5) : v; });

  // Abas
  $('#specList').innerHTML = [...SPECS[p.type], ['Armazenamento', Object.keys(p.storage).join(', ')], ['Cores', p.colors.map(c => COLORS[c].name).join(', ')]].map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
  $('#boxList').innerHTML = (p.cond === 'Seminovo'
    ? ['Aparelho revisado em 40 pontos', 'Cabo USB‑C', 'Película aplicada', 'Capinha de brinde', 'Nota fiscal + termo de garantia']
    : ['iPhone lacrado', 'Cabo USB‑C (1 m)', 'Documentação', 'Nota fiscal']).map(i => `<li>${ICON.check}${i}</li>`).join('');
  $$('.tabs button').forEach(b => b.onclick = () => {
    $$('.tabs button').forEach(x => x.classList.toggle('on', x === b));
    $$('.tab-panel').forEach(x => x.classList.toggle('on', x.id === b.dataset.tab));
  });

  // Avaliações
  const revs = [['Mariana S.', 'Chegou no mesmo dia, lacrado e com nota. Atendimento pelo WhatsApp foi impecável!'], ['Rafael T.', 'Dei meu antigo na troca e paguei a diferença no Pix. Processo muito rápido e transparente.'], ['Juliana P.', 'Terceira compra aqui. Preço melhor que nas grandes lojas e com garantia. Recomendo demais.']];
  $('#revAvg').textContent = p.rating.toString().replace('.', ',');
  $('#revCount').textContent = `${p.reviews} avaliações`;
  $('#revList').innerHTML = revs.map(([n, t]) => `<div class="review"><div class="stars">${ICON.star.repeat(5)}</div><p>“${t}”</p><b>${n}</b><small>Compra verificada</small></div>`).join('');

  // Relacionados
  $('#related').innerHTML = PRODUCTS.filter(x => x.id !== p.id).sort(() => .5 - Math.random()).slice(0, 8).map(productCard).join('');
  bindCards($('#related'));
  bindRail($('#relatedSec'));

  // Barra fixa no celular
  const ob = new IntersectionObserver(([e]) => $('#stickyBar').classList.toggle('show', !e.isIntersecting && e.boundingClientRect.top < 0));
  ob.observe($('#addCart'));

  draw(); drawGallery();
}

document.addEventListener('DOMContentLoaded', () => {
  renderShell();
  if (document.body.dataset.page === 'home') initHome();
  if (document.body.dataset.page === 'product') initProduct();
  initReveal();
});
