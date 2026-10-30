/* ============================================================
   Vertex Home Remodeling — main.js
   ============================================================ */

// ------------------------------------------------------------
// Form endpoint (Formspree → delivers leads to contact@vertexhrg.com)
// ------------------------------------------------------------
const FORM_ENDPOINT = 'https://formspree.io/f/mbggkvln';

// ------------------------------------------------------------
// PA contractor license (PA HIC registration number).
// When you have it, paste it below — e.g. 'PA012345'.
// It will appear next to "Licensed & Insured" in the footer.
// ------------------------------------------------------------
const LICENSE_NUMBER = '';

/* ---------- License number ---------- */
if (LICENSE_NUMBER) {
  document.querySelectorAll('[data-license]').forEach((el) => {
    el.textContent = ` · ${LICENSE_NUMBER}`;
  });
}

/* ---------- Conversion tracking (dataLayer for GTM/GA4) ---------- */
window.dataLayer = window.dataLayer || [];
const track = (event, params = {}) => window.dataLayer.push({ event, ...params });

document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (!link) return;
  const href = link.getAttribute('href') || '';
  if (href.startsWith('tel:')) track('call_click', { location: link.closest('section')?.id || 'other' });
  else if (href.startsWith('sms:')) track('sms_click', { location: link.closest('section')?.id || 'other' });
  else if (href === '#estimate') track('estimate_cta_click', { location: link.closest('section')?.id || 'nav' });
});

/* ---------- Sticky header ---------- */
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Mobile menu ---------- */
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      nav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ---------- Project filters ---------- */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    projectCards.forEach((card) => {
      card.classList.toggle('hide', cat !== 'all' && card.dataset.cat !== cat);
    });
  });
});

/* ---------- FAQ: close others when one opens ---------- */
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (item.open) faqItems.forEach((other) => { if (other !== item) other.open = false; });
  });
});

/* ---------- Multi-step form ---------- */
const form = document.getElementById('estimate-form');
if (form) {
const steps = [...form.querySelectorAll('.form-step')];
const stepLabels = [...form.querySelectorAll('.form-step-label')];
const progressFill = document.getElementById('progress-fill');
const successBox = document.getElementById('form-success');
let currentStep = 1;

function goToStep(n) {
  currentStep = n;
  steps.forEach((s) => s.classList.toggle('active', +s.dataset.step === n));
  stepLabels.forEach((l) => {
    const step = +l.dataset.step;
    l.classList.toggle('active', step === n);
    l.classList.toggle('done', step < n);
  });
  progressFill.style.width = `${(n / steps.length) * 100}%`;
  form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showError(id, show) {
  document.getElementById(id).classList.toggle('show', show);
}

form.querySelectorAll('[data-next]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const next = +btn.dataset.next;
    if (currentStep === 1 && !form.service.value) {
      showError('err-service', true);
      return;
    }
    showError('err-service', false);
    goToStep(next);
  });
});

form.querySelectorAll('[data-prev]').forEach((btn) => {
  btn.addEventListener('click', () => goToStep(+btn.dataset.prev));
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const zip = form.zip.value.trim();
  if (!name || !phone || !/^\d{5}$/.test(zip)) {
    showError('err-contact', true);
    return;
  }
  showError('err-contact', false);

  const lead = {
    service: form.service.value,
    budget: form.budget.value,
    timeline: form.timeline.value,
    details: form.details.value.trim(),
    name,
    phone,
    email: form.email.value.trim(),
    zip,
    lang: document.documentElement.lang,
    _subject: `New estimate request — ${form.service.value}`,
  };

  const submitBtn = form.querySelector('[type="submit"]');
  submitBtn.disabled = true;
  showError('err-submit', false);

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(lead),
    });
    if (!res.ok) throw new Error(`Formspree error: ${res.status}`);
  } catch (err) {
    console.error('Lead submission failed:', err);
    showError('err-submit', true);
    submitBtn.disabled = false;
    return;
  }

  steps.forEach((s) => s.classList.remove('active'));
  document.querySelector('.form-progress').style.display = 'none';
  successBox.classList.add('show');
  track('lead_submit', { service: lead.service, lang: lead.lang });
});
}

/* ---------- i18n (EN default in HTML, ES via dictionary) ---------- */
const I18N_ES = {
  'topbar.areas': 'Servimos PA • NJ • DE',
  'brand.sub': 'REMODELACIÓN DEL HOGAR',
  'nav.services': 'Servicios',
  'nav.process': 'Proceso',
  'nav.projects': 'Proyectos',
  'nav.reviews': 'Compromiso',
  'nav.areas': 'Zonas',
  'nav.faq': 'Preguntas',
  'nav.cta': 'Estimado Gratis',
  'hero.badge': 'Licencia y Seguro — PA · NJ · DE',
  'hero.title': 'Su hogar, <span class="accent">transformado.</span>',
  'hero.sub': 'Cocinas, baños, sótanos y renovaciones completas del hogar — diseñados, gestionados y construidos por un solo equipo con el que siempre puede contar.',
  'hero.cta1': 'Obtener Mi Estimado Gratis',
  'hero.cta2': 'Llamar (215) 678-5165',
  'hero.trust1': 'Licencia y Seguro',
  'hero.trust2': 'Presupuestos claros y rápidos',
  'hero.trust3': 'Un solo equipo, de principio a fin',
  'lp.sub': 'Presupuesto escrito gratis, sin compromiso. Respuesta en 24 horas — cocinas, baños, sótanos y renovación integral del hogar.',
  'lp.photos': 'Proyectos reales de nuestros equipos',
  'hero.cardBadge1': 'Estimado Gratis',
  'hero.cardBadge2': 'Respuesta en 24 horas',
  'trust.1t': 'Licencia y Seguro',
  'trust.1s': 'En cada proyecto, cada equipo',
  'trust.2t': 'Estimados Gratis por Escrito',
  'trust.2s': 'Sin presión, sin cargos ocultos',
  'trust.3t': 'PA · NJ · DE',
  'trust.3s': 'Servimos toda la zona tri-estatal',
  'trust.4t': 'Satisfacción Garantizada',
  'trust.4s': 'Terminamos a tiempo y dentro del presupuesto',
  'services.eyebrow': 'Nuestros Servicios',
  'services.title': 'Remodelación completa, un solo contratista',
  'services.sub': 'Desde una sola habitación hasta la renovación de toda la casa: diseño, demolición, construcción y acabado, todo en casa.',
  'services.kitchen.t': 'Remodelación de Cocinas',
  'services.kitchen.d': 'Gabinetes, encimeras, islas, iluminación y distribución — cocinas hechas para su vida real.',
  'services.bath.t': 'Remodelación de Baños',
  'services.bath.d': 'Duchas, tinas, tocadores, azulejos e impermeabilización — bien hecho hasta el último detalle.',
  'services.basement.t': 'Acabado de Sótanos',
  'services.basement.d': 'Convierta el espacio sin usar en sala familiar, oficina, gimnasio o suite lista para rentar.',
  'services.flooring.t': 'Pisos y Azulejos',
  'services.flooring.d': 'Madera, LVP, cerámica y porcelanato — instalados nivelados, limpios y duraderos.',
  'services.whole.t': 'Remodelación Integral del Hogar',
  'services.whole.d': 'Renovaciones de toda la casa de principio a fin: diseño, permisos, oficios y acabado.',
  'services.paint.t': 'Pintura Completa',
  'services.paint.d': 'Pintura interior y exterior con preparación meticulosa, líneas limpias y acabados duraderos.',
  'services.link': 'Pedir presupuesto →',
  'services.link2': 'Pedir presupuesto →',
  'services.link3': 'Pedir presupuesto →',
  'services.link4': 'Pedir presupuesto →',
  'services.link5': 'Pedir presupuesto →',
  'services.link6': 'Pedir presupuesto →',
  'why.eyebrow': 'Por Qué Vertex',
  'why.title': 'Una remodelación sin los dolores de cabeza de siempre',
  'why.p1': 'La mayoría de las malas experiencias en renovaciones vienen de lo mismo: mala comunicación, precios vagos y cuadrillas que desaparecen. Vertex nació para ser lo contrario.',
  'why.i1t': 'Un solo punto de contacto',
  'why.i1s': 'Del estimado a la entrega final, siempre sabe a quién llamar.',
  'why.i2t': 'Presupuestos claros por escrito',
  'why.i2s': 'Alcance y precios detallados antes de empezar — sin sorpresas a mitad de camino.',
  'why.i3t': 'Cuadrillas limpias y respetuosas',
  'why.i3s': 'Protegemos su hogar, mantenemos el sitio ordenado y cumplimos el plazo prometido.',
  'why.cta': 'Iniciar Mi Proyecto',
  'why.card1t': 'Estimado Gratis',
  'why.card1s': 'Detallado, por escrito',
  'process.eyebrow': 'Cómo Funciona',
  'process.title': 'Simple, transparente y puntual',
  'process.s1t': 'Consulta gratis',
  'process.s1d': 'Cuéntenos su proyecto. Visitamos, escuchamos y medimos — completamente gratis.',
  'process.s2t': 'Diseño y presupuesto escrito',
  'process.s2d': 'Recibe alcance, materiales y precios claros — por escrito, antes de empezar.',
  'process.s3t': 'Construimos',
  'process.s3d': 'Cuadrillas con licencia ejecutan a tiempo, con actualizaciones en cada etapa.',
  'process.s4t': 'Entrega final',
  'process.s4d': 'Revisamos cada detalle juntos. Solo terminamos cuando usted está satisfecho.',
  'projects.eyebrow': 'Nuestro Trabajo',
  'projects.title': 'Proyectos recientes',
  'projects.sub': 'Un vistazo a los espacios que hemos transformado en la zona tri-estatal.',
  'projects.all': 'Todos',
  'projects.kitchen': 'Cocinas',
  'projects.bath': 'Baños',
  'projects.basement': 'Sótanos',
  'projects.other': 'Más',
  'projects.p1t': 'Cocina Estilo Farmhouse',
  'projects.p1s': 'Philadelphia, PA',
  'projects.p2t': 'Cocina Blanca con Isla de Madera',
  'projects.p2s': 'Cherry Hill, NJ',
  'projects.p3t': 'Cocina de Maple y Cuarzo',
  'projects.p3s': 'Philadelphia, PA',
  'projects.p4t': 'Cocina Gris con Isla de Granito',
  'projects.p4s': 'Marlton, NJ',
  'projects.p5t': 'Baño con Pared de Piedra',
  'projects.p5s': 'Philadelphia, PA',
  'projects.p6t': 'Powder Room Moderno',
  'projects.p6s': 'Wilmington, DE',
  'projects.p7t': 'Ducha de Mármol sin Puerta',
  'projects.p7s': 'Cherry Hill, NJ',
  'projects.p8t': 'Bar y Lounge en Sótano',
  'projects.p8s': 'Wilmington, DE',
  'projects.p9t': 'Sótano de Entretenimiento',
  'projects.p9s': 'Philadelphia, PA',
  'projects.p10t': 'Suite de Sótano Terminado',
  'projects.p10s': 'Yardley, PA',
  'projects.p11t': 'Sala con Pared de Chimenea',
  'projects.p11s': 'Philadelphia, PA',
  'projects.p12t': 'Pared de Acento y Madera',
  'projects.p12s': 'South Jersey, NJ',
  'projects.disclaimer': 'Su proyecto puede ser el próximo — <a href="#estimate">pida su estimado gratis</a>.',
  'reviews.eyebrow': 'Nuestro Compromiso',
  'reviews.title': 'Lo que obtiene con Vertex',
  'reviews.sub': 'Las fotos de arriba son nuestro trabajo real. Estos son los compromisos detrás de cada uno.',
  'reviews.r1': '<strong>Presupuesto escrito, respetado.</strong> El precio que ponemos por escrito es el precio que usted paga — sin sorpresas a mitad de obra.',
  'reviews.r1s': 'En cada proyecto',
  'reviews.r2': '<strong>Un plazo que cumplimos.</strong> Recibe un cronograma antes de empezar — y actualizaciones en cada etapa hasta terminar.',
  'reviews.r2s': 'De principio a fin',
  'reviews.r3': '<strong>Garantía de entrega.</strong> Solo damos el trabajo por terminado tras una revisión final donde usted aprueba cada detalle.',
  'reviews.r3s': 'Su aprobación importa',
  'reviews.note': '¿Trabajó con nosotros recientemente? <a href="mailto:contact@vertexhrg.com">Cuéntenos cómo fue</a> — nos encantaría su opinión.',
  'areas.eyebrow': 'Zonas de Servicio',
  'areas.title': 'Orgullosos de servir PA, NJ y DE',
  'areas.sub': '¿No ve su ciudad? Llámenos — lo más probable es que la cubramos.',
  'form.eyebrow': 'Estimado Gratis',
  'form.title': 'Obtenga su estimado gratis en menos de un minuto',
  'form.sub': 'Responda unas preguntas rápidas y le contactamos en 24 horas con los próximos pasos.',
  'form.pt1': '100% gratis, sin compromiso',
  'form.pt2': 'Respuesta en 24 horas',
  'form.pt3': 'Nunca compartimos su información',
  'form.orcall': '¿Prefiere hablar?',
  'form.ortext': 'o envíe un mensaje',
  'form.step1': 'Servicio',
  'form.step2': 'Detalles',
  'form.step3': 'Contacto',
  'form.q1': '¿Qué desea remodelar?',
  'form.svc.k': 'Cocina',
  'form.svc.b': 'Baño',
  'form.svc.bs': 'Sótano',
  'form.svc.f': 'Pisos y Azulejos',
  'form.svc.w': 'Toda la Casa',
  'form.svc.p': 'Pintura',
  'form.err.service': 'Por favor seleccione un servicio.',
  'form.next': 'Continuar →',
  'form.q2': 'Detalles del proyecto',
  'form.budget': 'Presupuesto estimado',
  'form.budget.ph': 'Seleccione un rango…',
  'form.budget.unsure': 'Aún no lo sé',
  'form.timeline': '¿Cuándo quiere empezar?',
  'form.timeline.ph': 'Seleccione…',
  'form.timeline.asap': 'Lo antes posible',
  'form.timeline.1m': 'En 1–3 meses',
  'form.timeline.3m': 'En 3–6 meses',
  'form.timeline.flex': 'Solo planificando / flexible',
  'form.desc': 'Cuéntenos su proyecto (opcional)',
  'form.desc.ph': 'Ej.: baño principal, ducha nueva, tocador doble…',
  'form.back': '← Atrás',
  'form.next2': 'Continuar →',
  'form.q3': '¿A dónde enviamos su estimado?',
  'form.name': 'Nombre completo *',
  'form.phone': 'Teléfono *',
  'form.email': 'Correo electrónico',
  'form.err.contact': 'Complete nombre, teléfono y código postal.',
  'form.err.submit': 'Hubo un error al enviar — llame al (215) 678-5165.',
  'form.back2': '← Atrás',
  'form.submit': 'Obtener Mi Estimado Gratis',
  'form.fine': 'Al enviar, acepta ser contactado sobre su proyecto. Cero spam.',
  'form.success.t': '¡Solicitud recibida!',
  'form.success.d': 'Gracias — le contactaremos en 24 horas. ¿Quiere hablar ahora?',
  'form.success.cta': 'Llamar (215) 678-5165',
  'faq.eyebrow': 'Preguntas Frecuentes',
  'faq.title': 'Preguntas comunes',
  'faq.q1': '¿Los estimados son realmente gratis?',
  'faq.a1': 'Sí — las consultas y los estimados por escrito siempre son gratis, sin compromiso.',
  'faq.q2': '¿Tienen licencia y seguro?',
  'faq.a2': 'Sí. Vertex Home Remodeling opera con cuadrillas con licencia y seguro en PA, NJ y DE.',
  'faq.q3': '¿Cuánto tarda una remodelación?',
  'faq.a3': 'Depende del alcance — un baño puede tomar 2–3 semanas, una cocina 4–8. Recibirá un plazo claro en su presupuesto por escrito, y lo cumplimos.',
  'faq.q4': '¿Se encargan del diseño y los materiales?',
  'faq.a4': 'Sí. Le ayudamos a planificar la distribución, elegir materiales y gestionar todo desde la demolición hasta la última capa de pintura.',
  'faq.q5': '¿Qué zonas cubren?',
  'faq.a5': 'Servimos el área metropolitana de Philadelphia además de comunidades en New Jersey y Delaware. Llame para confirmar su ciudad.',
  'cta.title': '¿Listo para transformar su espacio?',
  'cta.sub': 'Estimados gratis. Cuadrillas con licencia y seguro. Un solo equipo de principio a fin.',
  'cta.btn1': 'Obtener Estimado Gratis',
  'cta.btn2': 'Llamar (215) 678-5165',
  'footer.sub': 'REMODELACIÓN DEL HOGAR',
  'footer.desc': 'Remodelación de cocinas, baños, sótanos y hogares completos en Pennsylvania, New Jersey y Delaware.',
  'footer.services': 'Servicios',
  'footer.s1': 'Remodelación de Cocinas',
  'footer.s2': 'Remodelación de Baños',
  'footer.s3': 'Acabado de Sótanos',
  'footer.s4': 'Pisos y Azulejos',
  'footer.s5': 'Remodelación Integral',
  'footer.s6': 'Pintura Completa',
  'footer.company': 'Compañía',
  'footer.c1': 'Proyectos',
  'footer.c2': 'Nuestro Compromiso',
  'footer.c3': 'Zonas de Servicio',
  'footer.c4': 'Estimado Gratis',
  'footer.contact': 'Contacto',
  'footer.text': 'Envíe un mensaje',
  'footer.area': 'Servimos PA · NJ · DE',
  'footer.rights': '© 2026 Vertex Home Remodeling. Todos los derechos reservados.',
  'footer.license': 'Licencia y Seguro — PA · NJ · DE',
  'mcta.call': 'Llamar Ahora',
  'mcta.estimate': 'Estimado Gratis',
};

const i18nElements = [...document.querySelectorAll('[data-i18n]')];
const i18nPhElements = [...document.querySelectorAll('[data-i18n-ph]')];
// Cache original English content once (HTML ships in English).
const enCache = new Map();
i18nElements.forEach((el) => enCache.set(el, el.innerHTML));
const enPhCache = new Map();
i18nPhElements.forEach((el) => enPhCache.set(el, el.getAttribute('placeholder')));

function setLang(lang) {
  document.documentElement.lang = lang;
  document.title = lang === 'es'
    ? 'Vertex Home Remodeling | Remodelación de Cocinas y Baños en PA, NJ y DE'
    : 'Vertex Home Remodeling | Kitchen, Bathroom & Home Renovation in PA, NJ & DE';

  i18nElements.forEach((el) => {
    const key = el.dataset.i18n;
    el.innerHTML = lang === 'es' ? (I18N_ES[key] ?? enCache.get(el)) : enCache.get(el);
  });
  i18nPhElements.forEach((el) => {
    const key = el.dataset.i18nPh;
    el.setAttribute('placeholder', lang === 'es' ? (I18N_ES[key] ?? enPhCache.get(el)) : enPhCache.get(el));
  });

  document.querySelectorAll('.lang-btn').forEach((b) => b.classList.toggle('active', b.dataset.lang === lang));
  localStorage.setItem('vertex-lang', lang);
}

document.querySelectorAll('.lang-btn').forEach((btn) => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

// Restore saved language on load.
const savedLang = localStorage.getItem('vertex-lang');
if (savedLang === 'es') setLang('es');
