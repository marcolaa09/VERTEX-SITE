/* ============================================================
   Vertex — Painting Quiz LP (/lp/)
   Standalone: i18n EN/ES (?lang=es), quiz steps, Formspree
   ============================================================ */
(function () {
  'use strict';

  var FORMSPREE_ENDPOINT = 'https://formspree.io/f/mbggkvln';
  var META_PIXEL_ID = '5075501212721113';
  var TOTAL_STEPS = 5;

  /* ---------- Meta Pixel (carrega só se o ID estiver definido) ---------- */
  if (META_PIXEL_ID) {
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq('init', META_PIXEL_ID);
    window.fbq('track', 'PageView');
  }
  function trackMeta(event) { if (window.fbq) window.fbq('track', event); }

  /* ---------- i18n ---------- */
  var I18N = {
    en: {
      'lp.eyebrow': 'Interior Painting — {area}',
      'lp.eyebrow.gen': 'Interior Painting — Free Estimates',
      'lp.title': 'Fast, clean & affordable interior painting.',
      'lp.sub': 'Get your free estimate in 30 seconds — free color consultation included.',
      'lp.point1': 'Licensed & insured painters',
      'lp.point2': 'We protect your floors & furniture',
      'lp.point3': 'Holiday scheduling available',
      'quiz.step': 'Step {n} of {total}',
      'q1.title': 'What do you need painted?',
      'q1.o1': 'Single room or accent wall', 'q1.o1s': 'Refresh one space',
      'q1.o2': 'Multiple rooms', 'q1.o2s': 'Living, dining, bedrooms…',
      'q1.o3': 'Full home interior', 'q1.o3s': 'The whole place',
      'q1.o4': 'Cabinets, trim & doors', 'q1.o4s': 'A factory-smooth finish',
      'q1.o5': 'Other / not sure', 'q1.o5s': "We'll figure it out together",
      'q2.title': 'How soon do you want it done?',
      'q2.o1': 'This week — before the holidays', 'q2.o1s': 'Urgent scheduling',
      'q2.o2': 'Within 2–4 weeks', 'q2.o2s': 'Soon, but flexible',
      'q2.o3': 'Just comparing quotes', 'q2.o3s': 'No rush',
      'q3.title': 'Do you already have the paint?',
      'q3.o1': 'Include paint & materials', 'q3.o1s': 'Full service — we handle everything',
      'q3.o2': 'Labor only', 'q3.o2s': 'I already have the paint',
      'q3.o3': 'Not sure yet', 'q3.o3s': 'We can advise on paint & colors',
      'q4.title': "What's your ZIP code?",
      'q4.hint': 'So we can check availability in your area',
      'q4.ph': '19148', 'q4.error': 'Enter a valid 5-digit ZIP code',
      'q4.next': 'Continue →',
      'q5.title': 'Last step — where should we send your quote?',
      'q5.name': 'Your name', 'q5.phone': 'Phone number', 'q5.email': 'Email (optional)',
      'q5.error': 'Please enter your name and a valid phone number',
      'q5.submit': 'Get My Free Quote →',
      'q5.micro': 'Free • No obligation • We respond fast',
      'done.title': "You're all set, {name}!",
      'done.msg': 'We received your request and will reach out shortly. Want it even faster?',
      'done.call': 'Call (215) 678-5165', 'done.text': 'Text us',
      't1': 'Licensed & Insured', 't1s': 'Ask for proof anytime',
      't2': 'Free Color Consultation', 't2s': 'With every project',
      't3': 'Fast Scheduling', 't3s': 'Holiday slots available',
      't4': 'Clean Work Sites', 't4s': 'Floors & furniture protected',
      'ph.title': 'Real work, real homes',
      'ph.sub': 'Recent interior projects by our crews',
      'how.title': 'How it works',
      'how1': 'Answer 4 quick questions', 'how1s': '30 seconds — right from your phone.',
      'how2': 'We call with your quote', 'how2s': 'A real price, in writing — no surprises.',
      'how3': 'We paint, you relax', 'how3s': 'Floors covered, furniture moved, spotless cleanup.',
      'pr.title': 'Our promise to you',
      'pr1': 'Written quote, honored', 'pr1s': 'The price we write is the price you pay.',
      'pr2': 'A schedule we keep', 'pr2s': 'Start and finish dates set before we begin.',
      'pr3': 'Walkthrough guarantee', 'pr3s': "We're not done until you approve the finish.",
      'fc.title': 'Get your home holiday-ready.',
      'fc.sub': '30 seconds. Free. No obligation.',
      'fc.btn': 'Get My Free Quote →',
      'ft.fine': 'Licensed & insured · Serving {area}',
      'ft.fine.gen': 'Licensed & insured · Vertex Home Remodeling',
      'mb.call': 'Call Now', 'mb.quote': 'Free Quote',
      'err.submit': 'Something went wrong — please call or text us at (215) 678-5165'
    },
    es: {
      'lp.eyebrow': 'Pintura de Interiores — {area}',
      'lp.eyebrow.gen': 'Pintura de Interiores — Estimados Gratis',
      'lp.title': 'Pintura de interiores rápida, limpia y a buen precio.',
      'lp.sub': 'Obtenga su estimado gratis en 30 segundos — consulta de color gratis incluida.',
      'lp.point1': 'Pintores con licencia y seguro',
      'lp.point2': 'Protegemos sus pisos y muebles',
      'lp.point3': 'Horarios disponibles antes de las fiestas',
      'quiz.step': 'Paso {n} de {total}',
      'q1.title': '¿Qué necesita pintar?',
      'q1.o1': 'Un cuarto o pared de acento', 'q1.o1s': 'Renueve un espacio',
      'q1.o2': 'Varios cuartos', 'q1.o2s': 'Sala, comedor, dormitorios…',
      'q1.o3': 'Interior de la casa completa', 'q1.o3s': 'Todo el lugar',
      'q1.o4': 'Gabinetes, molduras y puertas', 'q1.o4s': 'Un acabado impecable',
      'q1.o5': 'Otro / no estoy seguro', 'q1.o5s': 'Lo resolvemos juntos',
      'q2.title': '¿Para cuándo lo necesita?',
      'q2.o1': 'Esta semana — antes de las fiestas', 'q2.o1s': 'Agenda urgente',
      'q2.o2': 'En 2–4 semanas', 'q2.o2s': 'Pronto, pero flexible',
      'q2.o3': 'Solo comparando precios', 'q2.o3s': 'Sin prisa',
      'q3.title': '¿Ya tiene la pintura?',
      'q3.o1': 'Incluir pintura y materiales', 'q3.o1s': 'Servicio completo — nosotros nos encargamos',
      'q3.o2': 'Solo mano de obra', 'q3.o2s': 'Ya tengo la pintura',
      'q3.o3': 'Aún no sé', 'q3.o3s': 'Le asesoramos en pintura y colores',
      'q4.title': '¿Cuál es su código postal?',
      'q4.hint': 'Para verificar disponibilidad en su zona',
      'q4.ph': '19148', 'q4.error': 'Ingrese un código postal válido de 5 dígitos',
      'q4.next': 'Continuar →',
      'q5.title': 'Último paso — ¿a dónde enviamos su estimado?',
      'q5.name': 'Su nombre', 'q5.phone': 'Número de teléfono', 'q5.email': 'Email (opcional)',
      'q5.error': 'Ingrese su nombre y un teléfono válido',
      'q5.submit': 'Obtener Mi Estimado Gratis →',
      'q5.micro': 'Gratis • Sin compromiso • Respondemos rápido',
      'done.title': '¡Listo, {name}!',
      'done.msg': 'Recibimos su solicitud y le contactaremos pronto. ¿Lo quiere aún más rápido?',
      'done.call': 'Llamar (215) 678-5165', 'done.text': 'Enviar mensaje',
      't1': 'Licencia y Seguro', 't1s': 'Pida comprobante cuando quiera',
      't2': 'Consulta de Color Gratis', 't2s': 'Con cada proyecto',
      't3': 'Agenda Rápida', 't3s': 'Horarios antes de las fiestas',
      't4': 'Trabajo Limpio', 't4s': 'Pisos y muebles protegidos',
      'ph.title': 'Trabajo real, hogares reales',
      'ph.sub': 'Proyectos de interiores recientes de nuestros equipos',
      'how.title': 'Cómo funciona',
      'how1': 'Responda 4 preguntas rápidas', 'how1s': '30 segundos — desde su celular.',
      'how2': 'Le llamamos con su estimado', 'how2s': 'Un precio real, por escrito — sin sorpresas.',
      'how3': 'Pintamos, usted relaja', 'how3s': 'Pisos cubiertos, muebles movidos, limpieza total.',
      'pr.title': 'Nuestra promesa',
      'pr1': 'Estimado por escrito, honrado', 'pr1s': 'El precio que escribimos es el precio que paga.',
      'pr2': 'Un cronograma que cumplimos', 'pr2s': 'Fechas de inicio y fin definidas antes de empezar.',
      'pr3': 'Garantía de aprobación', 'pr3s': 'No terminamos hasta que usted apruebe el acabado.',
      'fc.title': 'Deje su casa lista para las fiestas.',
      'fc.sub': '30 segundos. Gratis. Sin compromiso.',
      'fc.btn': 'Obtener Mi Estimado Gratis →',
      'ft.fine': 'Licencia y seguro · Sirviendo {area}',
      'ft.fine.gen': 'Licencia y seguro · Vertex Home Remodeling',
      'mb.call': 'Llamar Ahora', 'mb.quote': 'Estimado Gratis',
      'err.submit': 'Algo salió mal — llámenos o envíe un mensaje al (215) 678-5165'
    }
  };

  /* ---------- Language & region ---------- */
  var params = new URLSearchParams(location.search);
  var AREA = params.get('area');
  var UTM = {};
  params.forEach(function (v, k) { if (k.indexOf('utm_') === 0) UTM[k] = v; });

  function getLang() {
    var p = params.get('lang');
    if (p === 'es' || p === 'en') return p;
    return (navigator.language || 'en').slice(0, 2) === 'es' ? 'es' : 'en';
  }
  var lang = getLang();

  function t(key, vars) {
    if (!AREA && I18N[lang] && I18N[lang][key + '.gen']) key = key + '.gen';
    var s = (I18N[lang] && I18N[lang][key]) || I18N.en[key] || I18N.en[key + '.gen'] || key;
    var all = { area: AREA };
    if (vars) for (var k in vars) all[k] = vars[k];
    for (var k2 in all) s = s.replace('{' + k2 + '}', all[k2]);
    return s;
  }

  function applyI18n() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.innerHTML = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      el.placeholder = t(el.getAttribute('data-i18n-ph'));
    });
    document.querySelectorAll('[data-i18n-tpl]').forEach(function (el) {
      el.setAttribute('data-tpl-rendered', '');
    });
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
    renderStepLabel();
  }

  document.querySelectorAll('.lang-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      lang = b.getAttribute('data-lang');
      applyI18n();
    });
  });

  /* ---------- Tracking ---------- */
  window.dataLayer = window.dataLayer || [];
  function track(event, data) {
    var payload = { event: event };
    if (data) for (var k in data) payload[k] = data[k];
    window.dataLayer.push(payload);
  }
  document.querySelectorAll('[data-track]').forEach(function (el) {
    el.addEventListener('click', function () {
      var ev = el.getAttribute('data-track');
      track(ev);
      if (ev === 'call_click' || ev === 'sms_click') trackMeta('Contact');
    });
  });

  /* ---------- Quiz state ---------- */
  var answers = { project: '', timeline: '', paint: '' };
  var currentStep = 1;

  var steps = Array.prototype.slice.call(document.querySelectorAll('.quiz-step'));
  var progress = document.getElementById('quizProgress');
  var stepLabel = document.getElementById('quizStepLabel');
  var backBtn = document.getElementById('quizBack');
  var zipInput = document.getElementById('quizZip');
  var zipError = document.getElementById('zipError');
  var zipNext = document.getElementById('zipNext');
  var contactError = document.getElementById('contactError');
  var form = document.getElementById('quizForm');
  var success = document.getElementById('quizSuccess');
  var submitBtn = document.getElementById('quizSubmit');

  function renderStepLabel() {
    stepLabel.textContent = t('quiz.step', { n: Math.min(currentStep, TOTAL_STEPS), total: TOTAL_STEPS });
  }

  function goTo(step) {
    currentStep = step;
    steps.forEach(function (s) {
      s.classList.toggle('active', Number(s.getAttribute('data-step')) === step);
    });
    progress.style.width = ((step - 1) / (TOTAL_STEPS - 1)) * 100 + '%';
    renderStepLabel();
    backBtn.hidden = step === 1;
    track('quiz_step', { step: step });
    if (step === 4) setTimeout(function () { zipInput.focus(); }, 320);
    if (step === 5) setTimeout(function () { document.getElementById('leadName').focus(); }, 320);
  }

  backBtn.addEventListener('click', function () {
    if (currentStep > 1) goTo(currentStep - 1);
  });

  /* Option cards → advance automatically */
  document.querySelectorAll('.quiz-options').forEach(function (group) {
    var field = group.getAttribute('data-field');
    group.querySelectorAll('.option-card').forEach(function (card) {
      card.addEventListener('click', function () {
        answers[field] = card.getAttribute('data-value');
        group.querySelectorAll('.option-card').forEach(function (c) { c.classList.remove('picked'); });
        card.classList.add('picked');
        setTimeout(function () { goTo(currentStep + 1); }, 240);
      });
    });
  });

  /* ZIP step */
  function validZip(v) { return /^\d{5}$/.test(v.trim()); }
  function tryZipNext() {
    if (!validZip(zipInput.value)) {
      zipError.hidden = false;
      zipInput.style.borderColor = '#C22F2F';
      zipInput.focus();
      return;
    }
    zipError.hidden = true;
    zipInput.style.borderColor = '';
    goTo(5);
  }
  zipNext.addEventListener('click', tryZipNext);
  zipInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); tryZipNext(); }
  });
  zipInput.addEventListener('input', function () {
    zipInput.value = zipInput.value.replace(/\D/g, '').slice(0, 5);
    if (validZip(zipInput.value)) { zipError.hidden = true; zipInput.style.borderColor = ''; }
  });

  /* ---------- Submit ---------- */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('leadName').value.trim();
    var phone = document.getElementById('leadPhone').value.trim();
    var email = document.getElementById('leadEmail').value.trim();
    var digits = phone.replace(/\D/g, '');

    if (!name || digits.length < 10) {
      contactError.hidden = false;
      return;
    }
    contactError.hidden = true;
    submitBtn.disabled = true;
    submitBtn.textContent = '…';

    var urgent = answers.timeline.indexOf('URGENT') !== -1;
    var payload = {
      name: name,
      phone: phone,
      email: email,
      zip: zipInput.value.trim(),
      project: answers.project,
      timeline: answers.timeline,
      paint: answers.paint,
      language: lang,
      area: AREA || '(not set)',
      source: 'painting-quiz-lp',
      _subject: (urgent ? 'URGENT — ' : '') + 'Painting quote — ' + name + ' — ' + zipInput.value.trim()
    };
    for (var u in UTM) payload[u] = UTM[u];

    fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (res) {
      if (res.ok) {
        track('lead_submit', { service: 'painting', urgent: urgent });
        trackMeta('Lead');
        form.hidden = true;
        document.querySelector('.quiz-head').hidden = true;
        document.querySelector('.quiz-progress').hidden = true;
        success.hidden = false;
        success.querySelector('h3').textContent = t('done.title', { name: name.split(' ')[0] });
      } else {
        contactError.textContent = t('err.submit');
        contactError.hidden = false;
      }
    }).catch(function () {
      contactError.textContent = t('err.submit');
      contactError.hidden = false;
    }).then(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = t('q5.submit');
    });
  });

  /* ---------- Init ---------- */
  applyI18n();
  goTo(1);
})();
