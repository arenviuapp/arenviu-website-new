/**
 * Arenviu — Partner Landing Page
 * Route: /partner
 *
 * ASSETS REQUIRED — copy to your public/assets/partner/ directory:
 *   spot-drawer.png  → simulator_screenshot_2E8EFE0C (SpotDrawer + Tropicool card)
 *   analytics.png    → simulator_screenshot_FCDFC264 (Partner dashboard)
 *   challenge.png    → simulator_screenshot_2C4DE46A (Challenge view)
 *   map.png          → simulator_screenshot_32FE9CF4 (Live radar map)
 *   tropicool.png    → already at assets/partner/tropicool.png
 *
 * ROUTER — add to your router:
 *   <Route path="/partner" element={<PartnerPage />} />
 *
 * WHATSAPP — replace the wa.me link with your actual number before deploying
 */

import { useState, useEffect, FormEvent } from "react";

// ─── ASSETS ──────────────────────────────────────────────────────────────────
const A = {
  spotDrawer: "/assets/partner/spot-drawer.png",
  analytics:  "/assets/partner/analytics.png",
  challenge:  "/assets/partner/challenge.png",
  map:        "/assets/partner/map.png",
  tropicool:  "/assets/partner/tropicool.png",
  logo:       "/assets/logo-icon.jpeg",
};

// ─── TYPES ───────────────────────────────────────────────────────────────────
type Lang = "en" | "es" | "ca" | "pt" | "it" | "fr";
const FLAGS: Record<Lang, string> = { en:"🇬🇧", es:"🇪🇸", ca:"🏴", pt:"🇵🇹", it:"🇮🇹", fr:"🇫🇷" };
const LANGS: Lang[] = ["en","es","ca","pt","it","fr"];

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const T: Record<Lang, Record<string, any>> = {
  en: {
    back:"← arenviu.com",
    lang:"EN",
    hero_eyebrow:"FOUNDING PARTNER PROGRAM · 2026 SEASON · BARCELONA",
    hero_h1:"Your brand.",
    hero_h2:"Their decision moment.",
    hero_sub:"Every time a beach sports player opens Arenviu to choose where to play today, your brand is there — not as an ad, but as part of the experience.",
    hero_cta:"Apply now →",
    hero_scroll:"See how it works ↓",
    stats_note:"* Indicative figures based on early-season projections.",
    stats:[["2,500+","Active players"],["8","Beaches covered"],["100+","Play zones mapped"],["~47%","Avg partner CTR*"]],
    place_eyebrow:"02 · PLACEMENTS",
    place_headline:"Two ways your brand lives in the app.",
    place_sub:"One is passive presence. The other drives customers to your door. Together, they form a complete brand experience for every player at the right moment.",
    place_banner_title:"Official Partner Card",
    place_banner_body:"Your logo, name, and CTA button appear in the SpotDrawer of your associated beach. Every player who checks conditions sees you — at exactly the moment they decide where to play.",
    place_challenge_title:"Branded Challenges",
    place_challenge_body:"You define the prize — a discount, a product, an experience. We design a custom challenge. Players compete in your beach zone. Winners earn your exclusive code directly inside the app.",
    circle_eyebrow:"03 · THE FLYWHEEL",
    circle_headline:"The virtuous circle.",
    circle_sub:"Your prize creates engagement. Engagement brings players to you. Players become your customers. Happy customers spread the word. More players means more value for your brand — every season.",
    circle_steps:[
      {num:"01",title:"You offer a prize",body:"Define a discount, product, or experience as the reward."},
      {num:"02",title:"We build the challenge",body:"Arenviu designs a custom challenge around your brand."},
      {num:"03",title:"Players compete",body:"Beach sports players engage with your brand to earn progress."},
      {num:"04",title:"Winners earn your code",body:"Exclusive discount codes delivered in-app automatically."},
      {num:"05",title:"They visit your store",body:"Winners redeem physically or digitally at your business."},
      {num:"06",title:"Community grows",body:"Happy customers refer others. The loop starts again."},
    ],
    circle_result:"More players · better prizes · stronger community · bigger brand impact",
    timeline_eyebrow:"04 · HOW IT WORKS",
    timeline_headline:"From agreement to live in 2 weeks.",
    timeline_steps:[
      {week:"Week 1",num:"01",title:"Agreement",body:"We align on prize type, discount %, and validity window. A simple LOI is signed."},
      {week:"Week 1–2",num:"02",title:"Partner Setup",body:"Arenviu creates your Official Partner profile, card content, and beach zone assignment."},
      {week:"Week 2",num:"03",title:"Challenge Design",body:"We design a custom challenge around your brand — mechanics, copy, and visuals."},
      {week:"Week 2–3",num:"04",title:"Go Live",body:"Your Partner Card appears in the SpotDrawer. The challenge launches in the Arena."},
      {week:"Ongoing",num:"05",title:"Track & Redeem",body:"Players win codes and redeem them at your location. You validate via your Partner dashboard."},
    ],
    analytics_eyebrow:"05 · PARTNER DASHBOARD",
    analytics_headline:"You always know what's happening.",
    analytics_sub:"Every Founding Partner gets access to a real-time analytics dashboard. Card views, tap-through rate, codes won and redeemed. Real customers, tracked.",
    analytics_metrics:[
      {title:"Card Views",body:"How many players saw your brand"},
      {title:"Tap CTR",body:"How many clicked your CTA"},
      {title:"Codes Won",body:"Potential customers, confirmed"},
      {title:"Codes Used",body:"Real customers who visited you"},
    ],
    slots_eyebrow:"06 · FOUNDING PARTNERS",
    slots_headline:"8 slots. 4 categories. 2026 only.",
    slots_sub:"One brand per category — no direct competitors. When all 8 slots are filled, the program closes for the season. Zero cash required.",
    slots_taken:"PARTNER",
    slots_open:"OPEN",
    slots_urgency:"Free for the full 2026 test season. Irrepetable.",
    slots_cats:[
      {icon:"🥤",name:"Recovery & Nutrition"},
      {icon:"🏐",name:"Sport & Equipment"},
      {icon:"🧘",name:"Lifestyle & Wellness"},
      {icon:"🚴",name:"Tech & Mobility"},
    ],
    proof_eyebrow:"07 · SOCIAL PROOF",
    proof_q1:"\"¡Me encanta la idea y el proyecto, vamos adelante!\"",
    proof_q2:"\"¡Muy ilusionado con vuestro (nuestro) proyecto!\"",
    proof_name:"Fernando Felicio",
    proof_role:"Iberic Peninsula Manager",
    proof_brand:"Tropicool Superfoods",
    offer_eyebrow:"08 · THE DEAL",
    offer_headline:"What you get. What we ask.",
    offer_get_title:"You get",
    offer_get:["Official Partner Card in your beach's SpotDrawer","Custom branded challenge in the Arena","Real-time analytics dashboard","Arena badge linked to your brand","Community mentions @arenviu","100% free for the 2026 season"],
    offer_ask_title:"We ask",
    offer_ask:["Zero cash — no payment required","Define a prize: min 10% discount, product, or experience","Set a validity window for the prize","One brand per category — no conflicts"],
    form_eyebrow:"09 · APPLY",
    form_headline:"Ready to be part of this?",
    form_sub:"Fill in the form and we'll get back within 48 hours to align details.",
    form_brand:"Brand name",
    form_website:"Website",
    form_social:"Instagram / social profile",
    form_contact:"Contact name",
    form_email:"Contact email",
    form_category:"Category",
    form_cats:["Recovery & Nutrition","Sport & Equipment","Lifestyle & Wellness","Tech & Mobility","Other"],
    form_message:"Tell us about your brand and the prize you'd offer",
    form_msg_ph:"e.g. We sell beach volleyball equipment and we'd offer 15% discount on our online store for Arenviu community members...",
    form_submit:"Send application →",
    form_or:"or contact us directly",
    form_wa:"WhatsApp us",
    foot_copy:"© 2026 Arenviu · Built on the beach.",
  },
  es: {
    back:"← arenviu.com",
    lang:"ES",
    hero_eyebrow:"PROGRAMA FOUNDING PARTNER · TEMPORADA 2026 · BARCELONA",
    hero_h1:"Tu marca.",
    hero_h2:"Su momento de decisión.",
    hero_sub:"Cada vez que un jugador de deportes de playa abre Arenviu para elegir dónde jugar hoy, tu marca está ahí — no como un anuncio, sino como parte de la experiencia.",
    hero_cta:"Aplica ahora →",
    hero_scroll:"Ver cómo funciona ↓",
    stats_note:"* Cifras orientativas basadas en proyecciones de inicio de temporada.",
    stats:[["2.500+","Jugadores activos"],["8","Playas cubiertas"],["100+","Zonas de juego mapeadas"],["~47%","CTR medio partner*"]],
    place_eyebrow:"02 · PLACEMENTS",
    place_headline:"Dos formas de estar presente en la app.",
    place_sub:"Una es presencia pasiva. La otra lleva clientes a tu puerta. Juntas forman una experiencia de marca completa en el momento exacto.",
    place_banner_title:"Tarjeta Official Partner",
    place_banner_body:"Tu logo, nombre y botón CTA aparecen en el SpotDrawer de tu playa asociada. Cada jugador que consulta las condiciones te ve — exactamente cuando decide dónde jugar.",
    place_challenge_title:"Challenges de marca",
    place_challenge_body:"Tú defines el premio — un descuento, un producto, una experiencia. Nosotros diseñamos un challenge personalizado. Los jugadores compiten en tu zona de playa y los ganadores obtienen tu código exclusivo.",
    circle_eyebrow:"03 · EL CÍRCULO VIRTUOSO",
    circle_headline:"El círculo virtuoso.",
    circle_sub:"Tu premio genera engagement. El engagement lleva jugadores hacia ti. Los jugadores se convierten en clientes. Los clientes felices difunden la palabra. Más jugadores significa más valor para tu marca — cada temporada.",
    circle_steps:[
      {num:"01",title:"Ofreces un premio",body:"Define un descuento, producto o experiencia como recompensa."},
      {num:"02",title:"Creamos el challenge",body:"Arenviu diseña un challenge personalizado alrededor de tu marca."},
      {num:"03",title:"Los jugadores compiten",body:"Los deportistas de playa interactúan con tu marca para ganar progreso."},
      {num:"04",title:"Los ganadores consiguen tu código",body:"Códigos de descuento exclusivos entregados en la app automáticamente."},
      {num:"05",title:"Visitan tu tienda",body:"Los ganadores canjean en tu negocio, físicamente o digitalmente."},
      {num:"06",title:"La comunidad crece",body:"Los clientes felices recomiendan. El ciclo vuelve a empezar."},
    ],
    circle_result:"Más jugadores · mejores premios · comunidad más fuerte · mayor impacto de marca",
    timeline_eyebrow:"04 · CÓMO FUNCIONA",
    timeline_headline:"Del acuerdo al directo en 2 semanas.",
    timeline_steps:[
      {week:"Semana 1",num:"01",title:"Acuerdo",body:"Alineamos tipo de premio, % de descuento y ventana de validez. Se firma un LOI simple."},
      {week:"Semana 1–2",num:"02",title:"Setup del Partner",body:"Arenviu crea tu perfil Official Partner, el contenido de la tarjeta y la zona de playa."},
      {week:"Semana 2",num:"03",title:"Diseño del Challenge",body:"Diseñamos un challenge personalizado alrededor de tu marca — mecánicas, copy y visuales."},
      {week:"Semana 2–3",num:"04",title:"Go Live",body:"Tu Partner Card aparece en el SpotDrawer. El challenge se lanza en la Arena."},
      {week:"Continuo",num:"05",title:"Seguimiento y canje",body:"Los jugadores ganan códigos y los canjean en tu local. Tú validas desde tu panel de partner."},
    ],
    analytics_eyebrow:"05 · PANEL DE PARTNER",
    analytics_headline:"Siempre sabes qué está pasando.",
    analytics_sub:"Cada Founding Partner tiene acceso a un panel de analítica en tiempo real. Vistas, CTR, códigos ganados y canjeados. Clientes reales, registrados.",
    analytics_metrics:[
      {title:"Vistas de tarjeta",body:"Cuántos jugadores vieron tu marca"},
      {title:"CTR de clics",body:"Cuántos hicieron clic en tu CTA"},
      {title:"Códigos ganados",body:"Clientes potenciales confirmados"},
      {title:"Códigos usados",body:"Clientes reales que te visitaron"},
    ],
    slots_eyebrow:"06 · FOUNDING PARTNERS",
    slots_headline:"8 plazas. 4 categorías. Solo 2026.",
    slots_sub:"Una marca por categoría — sin competidores directos. Cuando se llenen las 8 plazas, el programa cierra para la temporada. Sin coste.",
    slots_taken:"PARTNER",
    slots_open:"LIBRE",
    slots_urgency:"Gratuito durante toda la temporada de prueba 2026. Irrepetible.",
    slots_cats:[
      {icon:"🥤",name:"Recuperación & Nutrición"},
      {icon:"🏐",name:"Deporte & Equipamiento"},
      {icon:"🧘",name:"Lifestyle & Bienestar"},
      {icon:"🚴",name:"Tecnología & Movilidad"},
    ],
    proof_eyebrow:"07 · PRUEBA SOCIAL",
    proof_q1:"\"¡Me encanta la idea y el proyecto, vamos adelante!\"",
    proof_q2:"\"¡Muy ilusionado con vuestro (nuestro) proyecto!\"",
    proof_name:"Fernando Felicio",
    proof_role:"Iberic Peninsula Manager",
    proof_brand:"Tropicool Superfoods",
    offer_eyebrow:"08 · EL TRATO",
    offer_headline:"Qué obtienes. Qué pedimos.",
    offer_get_title:"Obtienes",
    offer_get:["Tarjeta Official Partner en el SpotDrawer de tu playa","Challenge de marca personalizado en la Arena","Panel de analítica en tiempo real","Badge de Arena vinculado a tu marca","Menciones en la comunidad @arenviu","100% gratuito para la temporada 2026"],
    offer_ask_title:"Pedimos",
    offer_ask:["Cero dinero — sin pago requerido","Define un premio: mín. 10% descuento, producto o experiencia","Establece una ventana de validez para el premio","Una marca por categoría — sin conflictos"],
    form_eyebrow:"09 · APLICA",
    form_headline:"¿Listo para ser parte de esto?",
    form_sub:"Rellena el formulario y te contactaremos en 48 horas para alinear los detalles.",
    form_brand:"Nombre de la marca",
    form_website:"Sitio web",
    form_social:"Instagram / perfil social",
    form_contact:"Nombre de contacto",
    form_email:"Email de contacto",
    form_category:"Categoría",
    form_cats:["Recuperación & Nutrición","Deporte & Equipamiento","Lifestyle & Bienestar","Tecnología & Movilidad","Otro"],
    form_message:"Cuéntanos sobre tu marca y qué premio ofrecerías",
    form_msg_ph:"ej. Vendemos equipamiento de voley playa y ofreceríamos un 15% de descuento en nuestra tienda online...",
    form_submit:"Enviar solicitud →",
    form_or:"o contáctanos directamente",
    form_wa:"Escríbenos por WhatsApp",
    foot_copy:"© 2026 Arenviu · Built on the beach.",
  },
  ca: {
    back:"← arenviu.com",
    lang:"CA",
    hero_eyebrow:"PROGRAMA FOUNDING PARTNER · TEMPORADA 2026 · BARCELONA",
    hero_h1:"La teva marca.",
    hero_h2:"El seu moment de decisió.",
    hero_sub:"Cada vegada que un jugador d'esports de platja obre Arenviu per triar on jugar avui, la teva marca és allà — no com un anunci, sinó com a part de l'experiència.",
    hero_cta:"Aplica ara →",
    hero_scroll:"Veure com funciona ↓",
    stats_note:"* Xifres orientatives basades en projeccions d'inici de temporada.",
    stats:[["2.500+","Jugadors actius"],["8","Platges cobertes"],["100+","Zones de joc mapejades"],["~47%","CTR mitjà partner*"]],
    place_eyebrow:"02 · PLACEMENTS",
    place_headline:"Dues maneres d'estar present a l'app.",
    place_sub:"Una és presència passiva. L'altra porta clients a la teva porta. Juntes formen una experiència de marca completa en el moment exacte.",
    place_banner_title:"Targeta Official Partner",
    place_banner_body:"El teu logo, nom i botó CTA apareixen al SpotDrawer de la teva platja associada. Cada jugador que consulta les condicions et veu — exactament quan decideix on jugar.",
    place_challenge_title:"Challenges de marca",
    place_challenge_body:"Tu defineixes el premi — un descompte, un producte, una experiència. Nosaltres dissenyem un challenge personalitzat. Els jugadors competeixen a la teva zona i els guanyadors reben el teu codi exclusiu.",
    circle_eyebrow:"03 · EL CERCLE VIRTUÓS",
    circle_headline:"El cercle virtuós.",
    circle_sub:"El teu premi genera engagement. L'engagement porta jugadors cap a tu. Els jugadors es converteixen en clients. Els clients feliços escampen la paraula. Més jugadors significa més valor per a la teva marca.",
    circle_steps:[
      {num:"01",title:"Ofereixes un premi",body:"Defineix un descompte, producte o experiència com a recompensa."},
      {num:"02",title:"Creem el challenge",body:"Arenviu dissenya un challenge personalitzat al voltant de la teva marca."},
      {num:"03",title:"Els jugadors competeixen",body:"Els esportistes de platja interactuen amb la teva marca per guanyar progrés."},
      {num:"04",title:"Els guanyadors reben el teu codi",body:"Codis de descompte exclusius entregats a l'app automàticament."},
      {num:"05",title:"Visiten la teva botiga",body:"Els guanyadors bescanvien al teu negoci, físicament o digitalment."},
      {num:"06",title:"La comunitat creix",body:"Els clients feliços recomanen. El cicle torna a començar."},
    ],
    circle_result:"Més jugadors · millors premis · comunitat més forta · major impacte de marca",
    timeline_eyebrow:"04 · COM FUNCIONA",
    timeline_headline:"De l'acord al directe en 2 setmanes.",
    timeline_steps:[
      {week:"Setmana 1",num:"01",title:"Acord",body:"Alinearem tipus de premi, % de descompte i finestra de validesa. Es signa un LOI simple."},
      {week:"Setmana 1–2",num:"02",title:"Setup del Partner",body:"Arenviu crea el teu perfil Official Partner, el contingut de la targeta i la zona de platja."},
      {week:"Setmana 2",num:"03",title:"Disseny del Challenge",body:"Dissenyem un challenge personalitzat al voltant de la teva marca — mecàniques, copy i visuals."},
      {week:"Setmana 2–3",num:"04",title:"Go Live",body:"La teva Partner Card apareix al SpotDrawer. El challenge es llança a l'Arena."},
      {week:"Continu",num:"05",title:"Seguiment i bescanvi",body:"Els jugadors guanyen codis i els bescanvien al teu local. Tu valides des del teu tauler de partner."},
    ],
    analytics_eyebrow:"05 · TAULER DE PARTNER",
    analytics_headline:"Sempre saps què passa.",
    analytics_sub:"Cada Founding Partner té accés a un tauler d'analítica en temps real. Visualitzacions, CTR, codis guanyats i bescanviats. Clients reals, registrats.",
    analytics_metrics:[
      {title:"Visualitzacions",body:"Quants jugadors han vist la teva marca"},
      {title:"CTR de clics",body:"Quants han fet clic al teu CTA"},
      {title:"Codis guanyats",body:"Clients potencials confirmats"},
      {title:"Codis usats",body:"Clients reals que t'han visitat"},
    ],
    slots_eyebrow:"06 · FOUNDING PARTNERS",
    slots_headline:"8 places. 4 categories. Només 2026.",
    slots_sub:"Una marca per categoria — sense competidors directes. Quan s'omplin les 8 places, el programa es tanca per a la temporada. Sense cost.",
    slots_taken:"PARTNER",
    slots_open:"LLIURE",
    slots_urgency:"Gratuït durant tota la temporada de prova 2026. Irrepetible.",
    slots_cats:[
      {icon:"🥤",name:"Recuperació & Nutrició"},
      {icon:"🏐",name:"Esport & Equipament"},
      {icon:"🧘",name:"Lifestyle & Benestar"},
      {icon:"🚴",name:"Tecnologia & Mobilitat"},
    ],
    proof_eyebrow:"07 · PROVA SOCIAL",
    proof_q1:"\"¡Me encanta la idea y el proyecto, vamos adelante!\"",
    proof_q2:"\"¡Muy ilusionado con vuestro (nuestro) proyecto!\"",
    proof_name:"Fernando Felicio",
    proof_role:"Iberic Peninsula Manager",
    proof_brand:"Tropicool Superfoods",
    offer_eyebrow:"08 · EL TRACTE",
    offer_headline:"Què obtens. Què demanem.",
    offer_get_title:"Obtens",
    offer_get:["Targeta Official Partner al SpotDrawer de la teva platja","Challenge de marca personalitzat a l'Arena","Tauler d'analítica en temps real","Badge d'Arena vinculat a la teva marca","Mencions a la comunitat @arenviu","100% gratuït per a la temporada 2026"],
    offer_ask_title:"Demanem",
    offer_ask:["Zero diners — sense pagament requerit","Defineix un premi: mínim 10% descompte, producte o experiència","Estableix una finestra de validesa per al premi","Una marca per categoria — sense conflictes"],
    form_eyebrow:"09 · APLICA",
    form_headline:"Llest per formar-ne part?",
    form_sub:"Omple el formulari i et contactarem en 48 hores per alinear els detalls.",
    form_brand:"Nom de la marca",
    form_website:"Lloc web",
    form_social:"Instagram / perfil social",
    form_contact:"Nom de contacte",
    form_email:"Email de contacte",
    form_category:"Categoria",
    form_cats:["Recuperació & Nutrició","Esport & Equipament","Lifestyle & Benestar","Tecnologia & Mobilitat","Altre"],
    form_message:"Explica'ns la teva marca i quin premi oferiràs",
    form_msg_ph:"p. ex. Venem equipament de volei platja i oferiríem un 15% de descompte a la nostra botiga online...",
    form_submit:"Enviar sol·licitud →",
    form_or:"o contacta'ns directament",
    form_wa:"Escriu-nos per WhatsApp",
    foot_copy:"© 2026 Arenviu · Construït a la platja.",
  },
  pt: {
    back:"← arenviu.com",
    lang:"PT",
    hero_eyebrow:"PROGRAMA FOUNDING PARTNER · TEMPORADA 2026 · BARCELONA",
    hero_h1:"A tua marca.",
    hero_h2:"O momento de decisão deles.",
    hero_sub:"Cada vez que um jogador de desportos de praia abre o Arenviu para escolher onde jogar hoje, a tua marca está lá — não como publicidade, mas como parte da experiência.",
    hero_cta:"Candidata-te →",
    hero_scroll:"Ver como funciona ↓",
    stats_note:"* Números indicativos baseados em projeções de início de temporada.",
    stats:[["2.500+","Jogadores ativos"],["8","Praias cobertas"],["100+","Zonas de jogo mapeadas"],["~47%","CTR médio partner*"]],
    place_eyebrow:"02 · POSICIONAMENTOS",
    place_headline:"Duas formas de estar presente na app.",
    place_sub:"Uma é presença passiva. A outra leva clientes até ti. Juntas formam uma experiência de marca completa no momento certo.",
    place_banner_title:"Cartão Official Partner",
    place_banner_body:"O teu logo, nome e botão CTA aparecem no SpotDrawer da tua praia associada. Cada jogador que verifica as condições vê-te — exatamente quando decide onde jogar.",
    place_challenge_title:"Desafios de marca",
    place_challenge_body:"Tu defines o prémio — um desconto, um produto, uma experiência. Nós desenhamos um desafio personalizado. Os jogadores competem na tua zona e os vencedores recebem o teu código exclusivo.",
    circle_eyebrow:"03 · O CÍRCULO VIRTUOSO",
    circle_headline:"O círculo virtuoso.",
    circle_sub:"O teu prémio gera engagement. O engagement leva jogadores até ti. Os jogadores tornam-se clientes. Clientes felizes espalham a palavra. Mais jogadores significa mais valor para a tua marca.",
    circle_steps:[
      {num:"01",title:"Ofereces um prémio",body:"Define um desconto, produto ou experiência como recompensa."},
      {num:"02",title:"Criamos o desafio",body:"Arenviu desenha um desafio personalizado à volta da tua marca."},
      {num:"03",title:"Os jogadores competem",body:"Os atletas de praia interagem com a tua marca para ganhar progresso."},
      {num:"04",title:"Os vencedores ganham o teu código",body:"Códigos de desconto exclusivos entregues na app automaticamente."},
      {num:"05",title:"Visitam a tua loja",body:"Os vencedores resgatam no teu negócio, fisicamente ou digitalmente."},
      {num:"06",title:"A comunidade cresce",body:"Clientes felizes recomendam. O ciclo recomeça."},
    ],
    circle_result:"Mais jogadores · melhores prémios · comunidade mais forte · maior impacto de marca",
    timeline_eyebrow:"04 · COMO FUNCIONA",
    timeline_headline:"Do acordo ao vivo em 2 semanas.",
    timeline_steps:[
      {week:"Semana 1",num:"01",title:"Acordo",body:"Alinhamos tipo de prémio, % de desconto e janela de validade. Assina-se um LOI simples."},
      {week:"Semana 1–2",num:"02",title:"Setup do Partner",body:"A Arenviu cria o teu perfil Official Partner, o conteúdo do cartão e a zona de praia."},
      {week:"Semana 2",num:"03",title:"Design do Desafio",body:"Desenhamos um desafio personalizado à volta da tua marca — mecânicas, copy e visuais."},
      {week:"Semana 2–3",num:"04",title:"Go Live",body:"O teu Partner Card fica ativo no SpotDrawer. O desafio lança-se na Arena."},
      {week:"Contínuo",num:"05",title:"Acompanhamento e resgate",body:"Os jogadores ganham códigos e resgatam no teu local. Tu validas pelo teu painel de partner."},
    ],
    analytics_eyebrow:"05 · PAINEL DE PARTNER",
    analytics_headline:"Sabes sempre o que está a acontecer.",
    analytics_sub:"Cada Founding Partner tem acesso a um painel de análise em tempo real. Visualizações, CTR, códigos ganhos e utilizados. Clientes reais, registados.",
    analytics_metrics:[
      {title:"Visualizações",body:"Quantos jogadores viram a tua marca"},
      {title:"CTR de cliques",body:"Quantos clicaram no teu CTA"},
      {title:"Códigos ganhos",body:"Clientes potenciais confirmados"},
      {title:"Códigos usados",body:"Clientes reais que te visitaram"},
    ],
    slots_eyebrow:"06 · FOUNDING PARTNERS",
    slots_headline:"8 vagas. 4 categorias. Só 2026.",
    slots_sub:"Uma marca por categoria — sem concorrentes diretos. Quando as 8 vagas estiverem preenchidas, o programa fecha para a temporada. Sem custo.",
    slots_taken:"PARTNER",
    slots_open:"LIVRE",
    slots_urgency:"Gratuito durante toda a temporada de teste 2026. Irrepetível.",
    slots_cats:[
      {icon:"🥤",name:"Recuperação & Nutrição"},
      {icon:"🏐",name:"Desporto & Equipamento"},
      {icon:"🧘",name:"Lifestyle & Bem-Estar"},
      {icon:"🚴",name:"Tecnologia & Mobilidade"},
    ],
    proof_eyebrow:"07 · PROVA SOCIAL",
    proof_q1:"\"¡Me encanta la idea y el proyecto, vamos adelante!\"",
    proof_q2:"\"¡Muy ilusionado con vuestro (nuestro) proyecto!\"",
    proof_name:"Fernando Felicio",
    proof_role:"Iberic Peninsula Manager",
    proof_brand:"Tropicool Superfoods",
    offer_eyebrow:"08 · O ACORDO",
    offer_headline:"O que recebes. O que pedimos.",
    offer_get_title:"Recebes",
    offer_get:["Cartão Official Partner no SpotDrawer da tua praia","Desafio de marca personalizado na Arena","Painel de análise em tempo real","Badge Arena ligado à tua marca","Menções na comunidade @arenviu","100% gratuito para a temporada 2026"],
    offer_ask_title:"Pedimos",
    offer_ask:["Zero dinheiro — sem pagamento requerido","Define um prémio: mín. 10% desconto, produto ou experiência","Estabelece uma janela de validade para o prémio","Uma marca por categoria — sem conflitos"],
    form_eyebrow:"09 · CANDIDATURA",
    form_headline:"Pronto para fazer parte disto?",
    form_sub:"Preenche o formulário e entraremos em contacto em 48 horas para alinhar os detalhes.",
    form_brand:"Nome da marca",
    form_website:"Website",
    form_social:"Instagram / perfil social",
    form_contact:"Nome de contacto",
    form_email:"Email de contacto",
    form_category:"Categoria",
    form_cats:["Recuperação & Nutrição","Desporto & Equipamento","Lifestyle & Bem-Estar","Tecnologia & Mobilidade","Outro"],
    form_message:"Fala-nos da tua marca e que prémio oferecerias",
    form_msg_ph:"ex. Vendemos equipamento de voleibol de praia e ofereceríamos 15% de desconto na nossa loja online...",
    form_submit:"Enviar candidatura →",
    form_or:"ou contacta-nos diretamente",
    form_wa:"Fala connosco no WhatsApp",
    foot_copy:"© 2026 Arenviu · Construído na praia.",
  },
  it: {
    back:"← arenviu.com",
    lang:"IT",
    hero_eyebrow:"PROGRAMMA FOUNDING PARTNER · STAGIONE 2026 · BARCELLONA",
    hero_h1:"Il tuo brand.",
    hero_h2:"Il loro momento decisivo.",
    hero_sub:"Ogni volta che un giocatore di sport da spiaggia apre Arenviu per scegliere dove giocare oggi, il tuo brand è lì — non come pubblicità, ma come parte dell'esperienza.",
    hero_cta:"Candidati ora →",
    hero_scroll:"Come funziona ↓",
    stats_note:"* Numeri indicativi basati su proiezioni di inizio stagione.",
    stats:[["2.500+","Giocatori attivi"],["8","Spiagge coperte"],["100+","Zone di gioco mappate"],["~47%","CTR medio partner*"]],
    place_eyebrow:"02 · POSIZIONAMENTI",
    place_headline:"Due modi di essere presente nell'app.",
    place_sub:"Uno è presenza passiva. L'altro porta clienti da te. Insieme formano un'esperienza di brand completa nel momento giusto.",
    place_banner_title:"Carta Official Partner",
    place_banner_body:"Il tuo logo, nome e pulsante CTA appaiono nello SpotDrawer della tua spiaggia associata. Ogni giocatore che controlla le condizioni ti vede — esattamente quando decide dove giocare.",
    place_challenge_title:"Challenge brandizzate",
    place_challenge_body:"Tu definisci il premio — uno sconto, un prodotto, un'esperienza. Noi progettiamo una challenge personalizzata. I giocatori competono nella tua zona spiaggia e i vincitori ricevono il tuo codice esclusivo.",
    circle_eyebrow:"03 · IL CIRCOLO VIRTUOSO",
    circle_headline:"Il circolo virtuoso.",
    circle_sub:"Il tuo premio genera engagement. L'engagement porta giocatori da te. I giocatori diventano clienti. I clienti felici diffondono la parola. Più giocatori significa più valore per il tuo brand.",
    circle_steps:[
      {num:"01",title:"Offri un premio",body:"Definisci uno sconto, prodotto o esperienza come ricompensa."},
      {num:"02",title:"Creiamo la challenge",body:"Arenviu progetta una challenge personalizzata attorno al tuo brand."},
      {num:"03",title:"I giocatori competono",body:"Gli atleti da spiaggia interagiscono con il tuo brand per guadagnare progresso."},
      {num:"04",title:"I vincitori ottengono il tuo codice",body:"Codici sconto esclusivi consegnati nell'app automaticamente."},
      {num:"05",title:"Visitano il tuo negozio",body:"I vincitori riscattano presso la tua attività, fisicamente o digitalmente."},
      {num:"06",title:"La community cresce",body:"I clienti soddisfatti consigliano. Il ciclo ricomincia."},
    ],
    circle_result:"Più giocatori · premi migliori · comunità più forte · maggiore impatto del brand",
    timeline_eyebrow:"04 · COME FUNZIONA",
    timeline_headline:"Dall'accordo al live in 2 settimane.",
    timeline_steps:[
      {week:"Settimana 1",num:"01",title:"Accordo",body:"Allineiamo tipo di premio, % sconto e finestra di validità. Si firma un semplice LOI."},
      {week:"Settimana 1–2",num:"02",title:"Setup del Partner",body:"Arenviu crea il tuo profilo Official Partner, il contenuto della carta e la zona spiaggia."},
      {week:"Settimana 2",num:"03",title:"Design della Challenge",body:"Progettiamo una challenge personalizzata attorno al tuo brand — meccaniche, copy e visual."},
      {week:"Settimana 2–3",num:"04",title:"Go Live",body:"La tua Partner Card va live nello SpotDrawer. La challenge si lancia nell'Arena."},
      {week:"Continuativo",num:"05",title:"Monitoraggio e riscatto",body:"I giocatori vincono codici e li riscattano presso la tua attività. Tu validi tramite la dashboard Partner."},
    ],
    analytics_eyebrow:"05 · DASHBOARD PARTNER",
    analytics_headline:"Sai sempre cosa sta succedendo.",
    analytics_sub:"Ogni Founding Partner ha accesso a una dashboard di analisi in tempo reale. Visualizzazioni, CTR, codici vinti e utilizzati. Clienti reali, tracciati.",
    analytics_metrics:[
      {title:"Visualizzazioni",body:"Quanti giocatori hanno visto il tuo brand"},
      {title:"CTR click",body:"Quanti hanno cliccato sul tuo CTA"},
      {title:"Codici vinti",body:"Clienti potenziali confermati"},
      {title:"Codici usati",body:"Clienti reali che ti hanno visitato"},
    ],
    slots_eyebrow:"06 · FOUNDING PARTNERS",
    slots_headline:"8 slot. 4 categorie. Solo 2026.",
    slots_sub:"Un brand per categoria — nessun concorrente diretto. Quando tutti gli 8 slot sono occupati, il programma si chiude per la stagione. Nessun costo.",
    slots_taken:"PARTNER",
    slots_open:"APERTO",
    slots_urgency:"Gratuito per l'intera stagione di test 2026. Irripetibile.",
    slots_cats:[
      {icon:"🥤",name:"Recupero & Nutrizione"},
      {icon:"🏐",name:"Sport & Attrezzatura"},
      {icon:"🧘",name:"Lifestyle & Benessere"},
      {icon:"🚴",name:"Tech & Mobilità"},
    ],
    proof_eyebrow:"07 · PROVA SOCIALE",
    proof_q1:"\"¡Me encanta la idea y el proyecto, vamos adelante!\"",
    proof_q2:"\"¡Muy ilusionado con vuestro (nuestro) proyecto!\"",
    proof_name:"Fernando Felicio",
    proof_role:"Iberic Peninsula Manager",
    proof_brand:"Tropicool Superfoods",
    offer_eyebrow:"08 · L'ACCORDO",
    offer_headline:"Cosa ottieni. Cosa chiediamo.",
    offer_get_title:"Ottieni",
    offer_get:["Carta Official Partner nello SpotDrawer della tua spiaggia","Challenge brandizzata personalizzata nell'Arena","Dashboard di analisi in tempo reale","Badge Arena legato al tuo brand","Menzioni nella community @arenviu","100% gratuito per la stagione 2026"],
    offer_ask_title:"Chiediamo",
    offer_ask:["Zero cash — nessun pagamento richiesto","Definisci un premio: min 10% sconto, prodotto o esperienza","Stabilisci una finestra di validità per il premio","Un brand per categoria — nessun conflitto"],
    form_eyebrow:"09 · CANDIDATURA",
    form_headline:"Pronto a far parte di questo?",
    form_sub:"Compila il modulo e ti ricontatteremo entro 48 ore per allineare i dettagli.",
    form_brand:"Nome del brand",
    form_website:"Sito web",
    form_social:"Instagram / profilo social",
    form_contact:"Nome del contatto",
    form_email:"Email del contatto",
    form_category:"Categoria",
    form_cats:["Recupero & Nutrizione","Sport & Attrezzatura","Lifestyle & Benessere","Tech & Mobilità","Altro"],
    form_message:"Raccontaci del tuo brand e quale premio offriresti",
    form_msg_ph:"es. Vendiamo attrezzatura da beach volley e offriremmo il 15% di sconto sul nostro negozio online...",
    form_submit:"Invia candidatura →",
    form_or:"o contattaci direttamente",
    form_wa:"Scrivici su WhatsApp",
    foot_copy:"© 2026 Arenviu · Costruito in spiaggia.",
  },
  fr: {
    back:"← arenviu.com",
    lang:"FR",
    hero_eyebrow:"PROGRAMME FOUNDING PARTNER · SAISON 2026 · BARCELONE",
    hero_h1:"Ta marque.",
    hero_h2:"Leur moment de décision.",
    hero_sub:"Chaque fois qu'un joueur de sports de plage ouvre Arenviu pour choisir où jouer aujourd'hui, ta marque est là — pas comme une pub, mais comme une partie de l'expérience.",
    hero_cta:"Postuler →",
    hero_scroll:"Voir comment ça marche ↓",
    stats_note:"* Chiffres indicatifs basés sur les projections de début de saison.",
    stats:[["2 500+","Joueurs actifs"],["8","Plages couvertes"],["100+","Zones de jeu cartographiées"],["~47%","CTR moyen partner*"]],
    place_eyebrow:"02 · PLACEMENTS",
    place_headline:"Deux façons d'être présent dans l'app.",
    place_sub:"L'une est une présence passive. L'autre amène des clients chez toi. Ensemble, elles forment une expérience de marque complète au bon moment.",
    place_banner_title:"Carte Official Partner",
    place_banner_body:"Ton logo, nom et bouton CTA apparaissent dans le SpotDrawer de ta plage associée. Chaque joueur qui vérifie les conditions te voit — exactement au moment où il décide où jouer.",
    place_challenge_title:"Challenges de marque",
    place_challenge_body:"Tu définis le prix — une réduction, un produit, une expérience. Nous concevons un challenge personnalisé. Les joueurs s'affrontent dans ta zone et les gagnants reçoivent ton code exclusif.",
    circle_eyebrow:"03 · LE CERCLE VERTUEUX",
    circle_headline:"Le cercle vertueux.",
    circle_sub:"Ton prix génère de l'engagement. L'engagement amène des joueurs vers toi. Les joueurs deviennent tes clients. Les clients satisfaits font passer le mot. Plus de joueurs = plus de valeur pour ta marque.",
    circle_steps:[
      {num:"01",title:"Tu offres un prix",body:"Définis une réduction, un produit ou une expérience comme récompense."},
      {num:"02",title:"On crée le challenge",body:"Arenviu conçoit un challenge personnalisé autour de ta marque."},
      {num:"03",title:"Les joueurs s'affrontent",body:"Les sportifs de plage interagissent avec ta marque pour progresser."},
      {num:"04",title:"Les gagnants obtiennent ton code",body:"Codes de réduction exclusifs livrés dans l'app automatiquement."},
      {num:"05",title:"Ils visitent ta boutique",body:"Les gagnants rachètent dans ton commerce, physiquement ou en ligne."},
      {num:"06",title:"La communauté grandit",body:"Les clients satisfaits recommandent. Le cycle recommence."},
    ],
    circle_result:"Plus de joueurs · meilleurs prix · communauté plus forte · impact de marque plus grand",
    timeline_eyebrow:"04 · COMMENT ÇA MARCHE",
    timeline_headline:"De l'accord au live en 2 semaines.",
    timeline_steps:[
      {week:"Semaine 1",num:"01",title:"Accord",body:"On s'aligne sur le type de prix, le % de réduction et la fenêtre de validité. Une LOI simple est signée."},
      {week:"Semaine 1–2",num:"02",title:"Setup du Partner",body:"Arenviu crée ton profil Official Partner, le contenu de la carte et l'attribution de zone de plage."},
      {week:"Semaine 2",num:"03",title:"Design du Challenge",body:"On conçoit un challenge personnalisé autour de ta marque — mécaniques, copy et visuels."},
      {week:"Semaine 2–3",num:"04",title:"Go Live",body:"Ta Partner Card est live dans le SpotDrawer. Le challenge se lance dans l'Arena."},
      {week:"En continu",num:"05",title:"Suivi et rachat",body:"Les joueurs gagnent des codes et les rachètent dans ton local. Tu valides via ton tableau de bord Partner."},
    ],
    analytics_eyebrow:"05 · TABLEAU DE BORD PARTNER",
    analytics_headline:"Tu sais toujours ce qui se passe.",
    analytics_sub:"Chaque Founding Partner a accès à un tableau de bord analytique en temps réel. Vues, CTR, codes gagnés et utilisés. Vrais clients, suivis.",
    analytics_metrics:[
      {title:"Vues de carte",body:"Combien de joueurs ont vu ta marque"},
      {title:"CTR clics",body:"Combien ont cliqué sur ton CTA"},
      {title:"Codes gagnés",body:"Clients potentiels confirmés"},
      {title:"Codes utilisés",body:"Vrais clients qui t'ont rendu visite"},
    ],
    slots_eyebrow:"06 · FOUNDING PARTNERS",
    slots_headline:"8 slots. 4 catégories. 2026 seulement.",
    slots_sub:"Une marque par catégorie — sans concurrents directs. Quand les 8 slots sont remplis, le programme se ferme pour la saison. Sans frais.",
    slots_taken:"PARTNER",
    slots_open:"LIBRE",
    slots_urgency:"Gratuit pour toute la saison de test 2026. Irrépétable.",
    slots_cats:[
      {icon:"🥤",name:"Récupération & Nutrition"},
      {icon:"🏐",name:"Sport & Équipement"},
      {icon:"🧘",name:"Lifestyle & Bien-Être"},
      {icon:"🚴",name:"Tech & Mobilité"},
    ],
    proof_eyebrow:"07 · PREUVE SOCIALE",
    proof_q1:"\"¡Me encanta la idea y el proyecto, vamos adelante!\"",
    proof_q2:"\"¡Muy ilusionado con vuestro (nuestro) proyecto!\"",
    proof_name:"Fernando Felicio",
    proof_role:"Iberic Peninsula Manager",
    proof_brand:"Tropicool Superfoods",
    offer_eyebrow:"08 · LE DEAL",
    offer_headline:"Ce que tu obtiens. Ce qu'on demande.",
    offer_get_title:"Tu obtiens",
    offer_get:["Carte Official Partner dans le SpotDrawer de ta plage","Challenge de marque personnalisé dans l'Arena","Tableau de bord analytique en temps réel","Badge Arena lié à ta marque","Mentions dans la communauté @arenviu","100% gratuit pour la saison 2026"],
    offer_ask_title:"On demande",
    offer_ask:["Zéro cash — aucun paiement requis","Définis un prix : min. 10% de réduction, produit ou expérience","Fixe une fenêtre de validité pour le prix","Une marque par catégorie — aucun conflit"],
    form_eyebrow:"09 · POSTULER",
    form_headline:"Prêt à faire partie de ça ?",
    form_sub:"Remplis le formulaire et on te contactera sous 48 heures pour aligner les détails.",
    form_brand:"Nom de la marque",
    form_website:"Site web",
    form_social:"Instagram / profil social",
    form_contact:"Nom du contact",
    form_email:"Email du contact",
    form_category:"Catégorie",
    form_cats:["Récupération & Nutrition","Sport & Équipement","Lifestyle & Bien-Être","Tech & Mobilité","Autre"],
    form_message:"Parle-nous de ta marque et du prix que tu offrirais",
    form_msg_ph:"ex. On vend de l'équipement de beach volley et on offrirait 15% de réduction sur notre boutique en ligne...",
    form_submit:"Envoyer la candidature →",
    form_or:"ou contacte-nous directement",
    form_wa:"Écris-nous sur WhatsApp",
    foot_copy:"© 2026 Arenviu · Construit sur la plage.",
  },
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,700;0,800;1,800;1,900&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

  .pp { font-family:"Inter",ui-sans-serif,sans-serif; background:hsl(0 0% 4%); color:hsl(0 0% 98%);
    -webkit-font-smoothing:antialiased; overflow-x:hidden; min-height:100vh;
    background-image:linear-gradient(to right,hsl(0 0% 100%/.04) 1px,transparent 1px),
      linear-gradient(to bottom,hsl(0 0% 100%/.04) 1px,transparent 1px);
    background-size:48px 48px; }
  .pp *, .pp *::before, .pp *::after { box-sizing:border-box; margin:0; padding:0; }
  .pp a { color:inherit; text-decoration:none; }
  .pp button { font:inherit; cursor:pointer; border:0; background:transparent; color:inherit; }
  .pp img { display:block; max-width:100%; }

  /* ── LAYOUT ─────────────────────────────────────────────────── */
  .pp-wrap { max-width:1280px; margin:0 auto; padding:0 32px; }
  .pp-section { padding:96px 0; border-bottom:1px solid hsl(240 4% 14%); }
  .pp-section-alt { background:hsl(240 6% 7%); }

  /* ── NAV ──────────────────────────────────────────────────────── */
  .pp-nav { position:sticky; top:0; z-index:100;
    backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px);
    background:hsl(0 0% 4% / .85); border-bottom:1px solid hsl(240 4% 14%);
    padding:14px 32px; display:flex; align-items:center; gap:16px; }
  .pp-back { font-family:"JetBrains Mono",monospace; font-size:11px; letter-spacing:.14em;
    text-transform:uppercase; color:hsl(240 5% 55%);
    transition:color .2s; padding:6px 0; }
  .pp-back:hover { color:hsl(0 0% 98%); }
  .pp-nav-logo { display:flex; align-items:center; gap:10px; margin-left:auto; }
  .pp-nav-logo img { width:28px; height:28px; border-radius:6px; }
  .pp-nav-wm { font-family:"Archivo",sans-serif; font-style:italic; font-weight:900;
    font-size:15px; text-transform:uppercase; letter-spacing:.02em; }
  .pp-lang-wrap { position:relative; flex-shrink:0; }
  .pp-lang-btn { display:flex; align-items:center; gap:6px; font-family:"JetBrains Mono",monospace;
    font-size:11px; letter-spacing:.12em; text-transform:uppercase;
    color:hsl(240 5% 55%); padding:7px 12px; border-radius:8px;
    border:1px solid hsl(240 4% 18%); transition:all .2s; }
  .pp-lang-btn:hover { color:hsl(0 0% 98%); border-color:hsl(240 4% 28%); background:hsl(0 0% 100%/.04); }
  .pp-lang-chevron { width:10px; height:10px; stroke:currentColor; stroke-width:2; fill:none;
    transition:transform .2s; }
  .pp-lang-open .pp-lang-chevron { transform:rotate(180deg); }
  .pp-lang-dd { position:absolute; top:calc(100% + 8px); right:0; min-width:150px;
    background:hsl(240 6% 10%); border:1px solid hsl(240 4% 22%); border-radius:12px;
    padding:6px; box-shadow:0 16px 48px rgba(0,0,0,.6);
    opacity:0; pointer-events:none; transform:translateY(-8px);
    transition:opacity .2s, transform .2s; }
  .pp-lang-open .pp-lang-dd { opacity:1; pointer-events:all; transform:translateY(0); }
  .pp-lang-opt { display:flex; align-items:center; gap:10px; padding:9px 12px; border-radius:8px;
    font-family:"JetBrains Mono",monospace; font-size:11px; letter-spacing:.1em; text-transform:uppercase;
    color:hsl(240 5% 55%); cursor:pointer; transition:background .15s, color .15s; width:100%; }
  .pp-lang-opt:hover { background:hsl(0 0% 100%/.06); color:hsl(0 0% 98%); }
  .pp-lang-opt.pp-lang-active { color:hsl(38 95% 55%); background:hsl(38 95% 55%/.08); }

  /* ── TYPOGRAPHY ──────────────────────────────────────────────── */
  .pp-eyebrow { font-family:"JetBrains Mono",monospace; font-size:11px; letter-spacing:.18em;
    text-transform:uppercase; color:hsl(240 5% 55%); display:inline-flex;
    align-items:center; gap:8px; margin-bottom:16px; }
  .pp-eyebrow::before { content:""; width:6px; height:6px; border-radius:50%;
    background:hsl(38 95% 55%); box-shadow:0 0 8px hsl(38 95% 55%/.6); flex-shrink:0; }
  .pp-mega { font-family:"Archivo",sans-serif; font-style:italic; font-weight:900;
    text-transform:uppercase; letter-spacing:-.04em; line-height:.9;
    font-size:clamp(48px,9vw,128px); }
  .pp-h2 { font-family:"Archivo",sans-serif; font-style:italic; font-weight:900;
    text-transform:uppercase; letter-spacing:-.03em; line-height:.92;
    font-size:clamp(36px,6vw,80px); margin-bottom:24px; }
  .pp-h3 { font-family:"Archivo",sans-serif; font-weight:800; letter-spacing:-.01em;
    font-size:22px; margin-bottom:10px; }
  .pp-sub { color:hsl(240 5% 60%); font-size:17px; line-height:1.6; max-width:640px; margin-bottom:48px; }
  .pp-amber { color:hsl(38 95% 55%); }

  /* ── BUTTONS ─────────────────────────────────────────────────── */
  .pp-btn { font-family:"Archivo",sans-serif; font-weight:800; font-size:13px;
    text-transform:uppercase; letter-spacing:.02em; border-radius:999px;
    padding:12px 20px; display:inline-flex; align-items:center; gap:8px;
    transition:transform .2s, filter .2s, box-shadow .2s; white-space:nowrap; }
  .pp-btn:active { transform:scale(.98); }
  .pp-btn-primary { background:linear-gradient(180deg,hsl(38 95% 60%),hsl(32 88% 44%));
    color:#1a0e00; box-shadow:0 0 24px hsl(38 95% 55%/.35); }
  .pp-btn-primary:hover { filter:brightness(1.07); transform:translateY(-1px); }
  .pp-btn-ghost { border:1px solid hsl(240 4% 28%); color:hsl(0 0% 98%); }
  .pp-btn-ghost:hover { background:hsl(0 0% 100%/.05); border-color:hsl(240 4% 40%); }
  .pp-btn-lg { padding:16px 28px; font-size:14px; }

  /* ── HERO ────────────────────────────────────────────────────── */
  .pp-hero { min-height:100vh; display:flex; flex-direction:column; justify-content:center;
    padding:100px 0 80px; position:relative; overflow:hidden; }
  .pp-hero-glow { position:absolute; inset:0;
    background:radial-gradient(ellipse 70% 60% at 70% 50%, hsl(38 95% 55%/.18), transparent 60%);
    pointer-events:none; animation:pp-breathe 5s ease-in-out infinite; }
  @keyframes pp-breathe { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.08)} }
  .pp-hero-inner { position:relative; z-index:1; }
  .pp-hero-tag { font-family:"JetBrains Mono",monospace; font-size:11px; letter-spacing:.18em;
    text-transform:uppercase; color:hsl(240 5% 55%); display:flex; align-items:center;
    gap:10px; margin-bottom:24px; }
  .pp-dot-live { width:8px; height:8px; border-radius:50%; background:hsl(148 64% 48%);
    position:relative; flex-shrink:0; }
  .pp-dot-live::after { content:""; position:absolute; inset:-4px; border-radius:50%;
    background:hsl(148 64% 48%); opacity:.35; animation:pp-ping 1.8s ease-out infinite; }
  @keyframes pp-ping { 0%{opacity:.6;transform:scale(1)} 100%{opacity:0;transform:scale(2.8)} }
  .pp-hero-ctas { display:flex; gap:12px; flex-wrap:wrap; margin-top:40px; }

  /* ── STATS BAR ───────────────────────────────────────────────── */
  .pp-stats-bar { border-top:1px solid hsl(240 4% 14%); border-bottom:1px solid hsl(240 4% 14%);
    padding:20px 32px; max-width:1280px; margin:0 auto;
    display:flex; align-items:center; flex-wrap:wrap; gap:12px 32px; }
  .pp-stats-items { display:flex; gap:32px; flex-wrap:wrap; }
  .pp-stat { display:flex; flex-direction:column; gap:2px; }
  .pp-stat-num { font-family:"Archivo",sans-serif; font-style:italic; font-weight:900;
    font-size:28px; letter-spacing:-.02em; color:hsl(38 95% 55%); line-height:1; }
  .pp-stat-lbl { font-family:"JetBrains Mono",monospace; font-size:10px; letter-spacing:.12em;
    text-transform:uppercase; color:hsl(240 5% 50%); }
  .pp-stat-sep { width:1px; height:40px; background:hsl(240 4% 18%); flex-shrink:0; }
  .pp-stats-note { font-family:"JetBrains Mono",monospace; font-size:10px; letter-spacing:.08em;
    color:hsl(240 5% 40%); margin-left:auto; }

  /* ── PHONE MOCK ──────────────────────────────────────────────── */
  .pp-phone { width:240px; flex-shrink:0; aspect-ratio:9/19.5;
    background:hsl(0 0% 2%); border:1px solid hsl(240 4% 22%); border-radius:36px;
    padding:8px; box-shadow:0 24px 64px rgba(0,0,0,.6), 0 0 0 1px hsl(38 95% 55%/.08);
    overflow:hidden; position:relative; }
  .pp-phone img { width:100%; height:100%; object-fit:cover; border-radius:28px;
    object-position:top; }
  .pp-phone-lg { width:280px; }

  /* ── PLACEMENTS ──────────────────────────────────────────────── */
  .pp-placements { display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:start; }
  .pp-placement { display:flex; flex-direction:column; align-items:center; gap:28px; }
  .pp-placement-text { width:100%; }
  .pp-placement-badge { display:inline-flex; align-items:center; gap:6px; padding:5px 12px;
    border-radius:999px; font-family:"JetBrains Mono",monospace; font-size:10px;
    letter-spacing:.12em; text-transform:uppercase; margin-bottom:12px; }
  .pp-badge-passive { background:hsl(240 4% 14%); color:hsl(240 5% 60%); border:1px solid hsl(240 4% 20%); }
  .pp-badge-active { background:hsl(38 95% 55%/.12); color:hsl(38 95% 65%); border:1px solid hsl(38 80% 40%/.5); }

  /* ── CIRCLE ──────────────────────────────────────────────────── */
  .pp-circle-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:2px;
    max-width:900px; margin:48px auto 0; position:relative; }
  .pp-circle-row-top { display:contents; }
  .pp-circle-row-bot { display:contents; }
  .pp-circle-step { background:hsl(240 6% 10%); border:1px solid hsl(240 4% 16%);
    padding:24px; border-radius:16px; position:relative;
    transition:border-color .3s, transform .3s; }
  .pp-circle-step:hover { border-color:hsl(38 80% 40%/.5); transform:translateY(-3px); }
  .pp-circle-step-num { font-family:"Archivo",sans-serif; font-style:italic; font-weight:900;
    font-size:36px; color:hsl(38 95% 55%/.25); line-height:1; margin-bottom:10px;
    letter-spacing:-.03em; }
  .pp-circle-step-title { font-family:"Archivo",sans-serif; font-weight:800; font-size:16px;
    margin-bottom:6px; }
  .pp-circle-step-body { font-size:13px; color:hsl(240 5% 55%); line-height:1.5; }
  .pp-circle-arrow-h { display:flex; align-items:center; justify-content:center;
    color:hsl(38 95% 55%/.5); font-size:20px; font-weight:700; }
  .pp-circle-result { text-align:center; font-family:"JetBrains Mono",monospace;
    font-size:11px; letter-spacing:.18em; text-transform:uppercase;
    color:hsl(240 5% 55%); margin-top:32px; padding:16px;
    border-top:1px solid hsl(240 4% 16%); border-bottom:1px solid hsl(240 4% 16%); }
  .pp-circle-loop { display:flex; align-items:center; justify-content:center;
    font-size:28px; padding:16px; color:hsl(38 95% 55%/.4); }

  /* ── TIMELINE ────────────────────────────────────────────────── */
  .pp-timeline { display:grid; grid-template-columns:repeat(5,1fr); gap:0;
    margin-top:48px; position:relative; }
  .pp-timeline::before { content:""; position:absolute; top:26px; left:26px; right:26px;
    height:2px; background:hsl(240 4% 18%); z-index:0; }
  .pp-tl-step { position:relative; z-index:1; padding:0 12px; }
  .pp-tl-dot-wrap { display:flex; align-items:center; justify-content:center; margin-bottom:16px; }
  .pp-tl-dot { width:52px; height:52px; border-radius:50%;
    background:hsl(38 40% 14%); border:2px solid hsl(38 80% 40%/.6);
    display:flex; align-items:center; justify-content:center;
    font-family:"Archivo",sans-serif; font-style:italic; font-weight:900;
    font-size:16px; color:hsl(38 95% 60%); box-shadow:0 0 16px hsl(38 95% 55%/.2); }
  .pp-tl-week { font-family:"JetBrains Mono",monospace; font-size:10px; letter-spacing:.1em;
    text-transform:uppercase; color:hsl(38 95% 55%); margin-bottom:8px; }
  .pp-tl-title { font-family:"Archivo",sans-serif; font-weight:800; font-size:15px;
    margin-bottom:8px; }
  .pp-tl-body { font-size:13px; color:hsl(240 5% 55%); line-height:1.5; }

  /* ── ANALYTICS ───────────────────────────────────────────────── */
  .pp-analytics { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; }
  .pp-metrics { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:32px; }
  .pp-metric { background:hsl(240 6% 10%); border:1px solid hsl(240 4% 16%); border-radius:12px;
    padding:16px 20px; }
  .pp-metric-title { font-family:"Archivo",sans-serif; font-weight:800; font-size:14px;
    margin-bottom:4px; color:hsl(38 95% 60%); }
  .pp-metric-body { font-size:12px; color:hsl(240 5% 55%); line-height:1.4; }

  /* ── SLOTS ───────────────────────────────────────────────────── */
  .pp-slots { display:grid; gap:16px; margin-top:48px; max-width:800px; }
  .pp-slot-row { display:grid; grid-template-columns:200px 1fr; gap:16px; align-items:center; }
  .pp-slot-cat { display:flex; align-items:center; gap:12px; }
  .pp-slot-icon { font-size:24px; }
  .pp-slot-name { font-family:"Archivo",sans-serif; font-weight:800; font-size:15px; }
  .pp-slot-boxes { display:flex; gap:12px; }
  .pp-slot { border-radius:12px; padding:14px 18px; display:flex; align-items:center;
    gap:12px; flex:1; min-width:0; }
  .pp-slot-filled { background:hsl(38 40% 10%); border:1px solid hsl(38 80% 35%);
    box-shadow:0 0 16px hsl(38 95% 55%/.1); }
  .pp-slot-empty { background:hsl(240 6% 8%); border:1.5px dashed hsl(240 4% 22%); }
  .pp-slot-logo { width:36px; height:36px; border-radius:8px; object-fit:cover; flex-shrink:0; }
  .pp-slot-info { min-width:0; }
  .pp-slot-brand { font-family:"Archivo",sans-serif; font-weight:800; font-size:14px;
    white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .pp-slot-badge-tag { font-family:"JetBrains Mono",monospace; font-size:9px; letter-spacing:.14em;
    text-transform:uppercase; color:hsl(38 95% 60%); margin-top:2px; }
  .pp-slot-ph { width:32px; height:32px; border-radius:50%; border:1.5px dashed hsl(240 4% 30%);
    flex-shrink:0; }
  .pp-slot-open-lbl { font-family:"JetBrains Mono",monospace; font-size:10px; letter-spacing:.12em;
    text-transform:uppercase; color:hsl(240 5% 40%); }
  .pp-urgency { margin-top:28px; display:inline-flex; align-items:center; gap:10px;
    padding:10px 18px; background:hsl(38 40% 8%); border:1px solid hsl(38 80% 30%/.6);
    border-radius:999px; font-family:"JetBrains Mono",monospace; font-size:11px;
    letter-spacing:.12em; text-transform:uppercase; color:hsl(38 95% 65%); }
  .pp-urgency::before { content:""; width:6px; height:6px; border-radius:50%;
    background:hsl(38 95% 55%); box-shadow:0 0 8px hsl(38 95% 55%); animation:pp-ping 1.8s ease-out infinite; }

  /* ── PROOF ───────────────────────────────────────────────────── */
  .pp-proof { max-width:760px; }
  .pp-quote { font-family:"Archivo",sans-serif; font-style:italic; font-weight:800;
    font-size:clamp(20px,3vw,28px); line-height:1.3; letter-spacing:-.01em;
    color:hsl(0 0% 92%); margin-bottom:16px; padding-left:20px;
    border-left:3px solid hsl(38 95% 55%); }
  .pp-proof-meta { display:flex; align-items:center; gap:16px; margin-top:32px;
    padding:20px 24px; background:hsl(240 6% 10%); border:1px solid hsl(240 4% 16%);
    border-radius:16px; max-width:440px; }
  .pp-proof-logo { width:52px; height:52px; border-radius:12px; object-fit:cover; flex-shrink:0; }
  .pp-proof-name { font-family:"Archivo",sans-serif; font-weight:800; font-size:16px; }
  .pp-proof-role { font-size:13px; color:hsl(38 95% 60%); margin-top:2px; }
  .pp-proof-brand { font-size:12px; color:hsl(240 5% 55%); margin-top:1px; }

  /* ── OFFER ───────────────────────────────────────────────────── */
  .pp-offer { display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-top:48px; }
  .pp-offer-col { border-radius:16px; padding:32px; }
  .pp-offer-get { background:hsl(38 40% 10%); border:1px solid hsl(38 80% 30%/.5); }
  .pp-offer-ask { background:hsl(240 6% 10%); border:1px solid hsl(240 4% 18%); }
  .pp-offer-title { font-family:"Archivo",sans-serif; font-weight:800; font-size:20px;
    margin-bottom:20px; }
  .pp-offer-get .pp-offer-title { color:hsl(38 95% 60%); }
  .pp-offer-list { list-style:none; display:flex; flex-direction:column; gap:12px; }
  .pp-offer-item { display:flex; align-items:flex-start; gap:12px; font-size:15px; line-height:1.5; }
  .pp-offer-icon { flex-shrink:0; width:22px; height:22px; border-radius:50%;
    display:flex; align-items:center; justify-content:center;
    font-size:11px; font-weight:800; margin-top:1px; }
  .pp-offer-get .pp-offer-icon { background:hsl(38 95% 55%); color:#1a0e00; }
  .pp-offer-ask .pp-offer-icon { background:hsl(240 4% 18%); color:hsl(240 5% 60%); }

  /* ── FORM ────────────────────────────────────────────────────── */
  .pp-form-wrap { max-width:760px; margin-top:48px; }
  .pp-form-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  .pp-field { display:flex; flex-direction:column; gap:7px; }
  .pp-field-full { grid-column:1/-1; }
  .pp-label { font-family:"JetBrains Mono",monospace; font-size:10px; letter-spacing:.14em;
    text-transform:uppercase; color:hsl(240 5% 55%); }
  .pp-input, .pp-select, .pp-textarea {
    background:hsl(240 4% 12%); border:1px solid hsl(240 4% 18%);
    color:hsl(0 0% 98%); font-family:"Inter",sans-serif; font-size:14px;
    padding:12px 16px; border-radius:10px;
    transition:border-color .2s, box-shadow .2s; width:100%; }
  .pp-input:focus, .pp-select:focus, .pp-textarea:focus {
    outline:none; border-color:hsl(38 95% 55%);
    box-shadow:0 0 0 3px hsl(38 95% 55%/.15); }
  .pp-select { appearance:none; cursor:pointer; }
  .pp-textarea { resize:vertical; min-height:120px; line-height:1.55; }
  .pp-form-actions { margin-top:24px; display:flex; align-items:center; gap:16px; flex-wrap:wrap; }
  .pp-form-or { font-family:"JetBrains Mono",monospace; font-size:10px; letter-spacing:.1em;
    text-transform:uppercase; color:hsl(240 5% 40%); }

  /* ── FOOTER ──────────────────────────────────────────────────── */
  .pp-footer { padding:40px 32px; border-top:1px solid hsl(240 4% 14%);
    display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px;
    max-width:1280px; margin:0 auto; }
  .pp-footer-logo { display:flex; align-items:center; gap:10px; }
  .pp-footer-logo img { width:28px; height:28px; border-radius:6px; }
  .pp-footer-wm { font-family:"Archivo",sans-serif; font-style:italic; font-weight:900;
    font-size:15px; text-transform:uppercase; }
  .pp-footer-copy { font-family:"JetBrains Mono",monospace; font-size:11px; letter-spacing:.1em;
    text-transform:uppercase; color:hsl(240 5% 40%); }
  .pp-footer-email { font-family:"JetBrains Mono",monospace; font-size:11px; letter-spacing:.08em;
    color:hsl(240 5% 55%); transition:color .2s; }
  .pp-footer-email:hover { color:hsl(38 95% 55%); }

  /* ── REVEAL ──────────────────────────────────────────────────── */
  .pp-reveal { opacity:0; transform:translateY(28px);
    transition:opacity .65s ease-out, transform .65s ease-out; }
  .pp-reveal.pp-in { opacity:1; transform:translateY(0); }
  .pp-stagger > *:nth-child(1) { transition-delay:0ms; }
  .pp-stagger > *:nth-child(2) { transition-delay:80ms; }
  .pp-stagger > *:nth-child(3) { transition-delay:160ms; }
  .pp-stagger > *:nth-child(4) { transition-delay:240ms; }
  .pp-stagger > *:nth-child(5) { transition-delay:320ms; }
  .pp-stagger > *:nth-child(6) { transition-delay:400ms; }

  /* ── RESPONSIVE ──────────────────────────────────────────────── */
  @media (max-width:900px) {
    .pp-wrap { padding:0 20px; }
    .pp-nav { padding:12px 16px; }
    .pp-section { padding:72px 0; }
    .pp-placements { grid-template-columns:1fr; gap:40px; }
    .pp-placement { flex-direction:row; gap:20px; align-items:flex-start; }
    .pp-phone { width:160px; flex-shrink:0; }
    .pp-analytics { grid-template-columns:1fr; gap:40px; }
    .pp-offer { grid-template-columns:1fr; }
    .pp-timeline { grid-template-columns:1fr; gap:24px; }
    .pp-timeline::before { display:none; }
    .pp-tl-step { display:grid; grid-template-columns:52px 1fr; gap:16px; align-items:start; padding:0; }
    .pp-tl-dot-wrap { margin-bottom:0; align-self:flex-start; }
    .pp-tl-content { padding-top:0; }
    .pp-circle-grid { grid-template-columns:1fr; gap:2px; }
    .pp-slot-row { grid-template-columns:1fr; gap:10px; }
    .pp-stats-bar { padding:20px; gap:8px 20px; }
    .pp-stats-note { margin-left:0; }
    .pp-mega { font-size:clamp(40px,12vw,72px) !important; }
    .pp-h2 { font-size:clamp(28px,9vw,52px) !important; }
    .pp-hero-ctas { flex-direction:column; align-items:flex-start; }
    .pp-metrics { grid-template-columns:1fr 1fr; }
    .pp-form-grid { grid-template-columns:1fr; }
    .pp-footer { flex-direction:column; align-items:flex-start; gap:12px; padding:32px 20px; }
  }
  @media (max-width:480px) {
    .pp-phone { width:130px; }
    .pp-placement { gap:14px; }
    .pp-stats-items { gap:16px 20px; }
    .pp-slot-boxes { flex-direction:column; }
    .pp-btn-lg { padding:14px 22px; font-size:13px; }
    .pp-metrics { grid-template-columns:1fr; }
    .pp-form-actions { flex-direction:column; align-items:flex-start; }
  }
`;

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function PartnerPage() {
  const [lang, setLang] = useState<Lang>(() =>
    (localStorage.getItem("arenviu_lang") as Lang) || "en"
  );
  const [langOpen, setLangOpen] = useState(false);
  const [form, setForm] = useState({
    brand:"", website:"", social:"", contact:"", email:"", category:"", message:""
  });

  const t = T[lang];

  // Inject styles once
  useEffect(() => {
    const el = document.createElement("style");
    el.setAttribute("data-pp", "1");
    if (!document.querySelector("[data-pp]")) {
      el.textContent = STYLES;
      document.head.appendChild(el);
    }
    return () => { el.remove(); };
  }, []);

  // Scroll reveal
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("pp-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll(".pp-reveal").forEach(el => {
      el.classList.remove("pp-in");
      io.observe(el);
    });
    return () => io.disconnect();
  }, [lang]);

  // Persist lang
  useEffect(() => { localStorage.setItem("arenviu_lang", lang); }, [lang]);

  // Close lang dropdown on outside click
  useEffect(() => {
    const close = (e: MouseEvent) => {
      const el = document.getElementById("pp-lang-wrap");
      if (el && !el.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = `Arenviu Partner Application — ${form.brand}`;
    const body = [
      `Brand: ${form.brand}`,
      `Website: ${form.website}`,
      `Social: ${form.social}`,
      `Contact: ${form.contact}`,
      `Email: ${form.email}`,
      `Category: ${form.category}`,
      "",
      form.message,
    ].join("\n");
    window.location.href = `mailto:hello@arenviu.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const upd = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  return (
    <div className="pp">

      {/* ── NAV ──────────────────────────────────────────────────── */}
      <nav className="pp-nav">
        <a href="/" className="pp-back">{t.back}</a>

        <a href="/" className="pp-nav-logo">
          <img src={A.logo} alt="Arenviu" />
          <span className="pp-nav-wm">Arenviu</span>
        </a>

        <div className={`pp-lang-wrap${langOpen ? " pp-lang-open" : ""}`} id="pp-lang-wrap">
          <button className="pp-lang-btn" onClick={() => setLangOpen(o => !o)} aria-haspopup="true">
            {FLAGS[lang]} {t.lang}
            <svg className="pp-lang-chevron" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div className="pp-lang-dd" role="listbox">
            {LANGS.map(l => (
              <button key={l} className={`pp-lang-opt${l === lang ? " pp-lang-active" : ""}`}
                onClick={() => { setLang(l); setLangOpen(false); }}>
                <span>{FLAGS[l]}</span>
                <span>{T[l].lang}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="pp-hero">
        <div className="pp-hero-glow" />
        <div className="pp-wrap pp-hero-inner">
          <div className="pp-hero-tag pp-reveal">
            <span className="pp-dot-live" />
            {t.hero_eyebrow}
          </div>
          <h1 className="pp-mega pp-reveal">
            {t.hero_h1}<br />
            <span className="pp-amber">{t.hero_h2}</span>
          </h1>
          <p className="pp-sub pp-reveal" style={{ marginTop: 24, marginBottom: 0 }}>
            {t.hero_sub}
          </p>
          <div className="pp-hero-ctas pp-reveal">
            <a href="#apply" className="pp-btn pp-btn-primary pp-btn-lg">{t.hero_cta}</a>
            <a href="#how-it-works" className="pp-btn pp-btn-ghost pp-btn-lg">{t.hero_scroll}</a>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────── */}
      <div className="pp-stats-bar pp-reveal">
        <div className="pp-stats-items">
          {(t.stats as [string,string][]).map(([val, lbl], i) => (
            <div key={i} style={{ display: "contents" }}>
              {i > 0 && <div className="pp-stat-sep" />}
              <div className="pp-stat">
                <span className="pp-stat-num">{val}</span>
                <span className="pp-stat-lbl">{lbl}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="pp-stats-note">{t.stats_note}</div>
      </div>

      {/* ── PLACEMENTS ────────────────────────────────────────────── */}
      <section className="pp-section">
        <div className="pp-wrap">
          <div className="pp-eyebrow pp-reveal">{t.place_eyebrow}</div>
          <h2 className="pp-h2 pp-reveal">{t.place_headline}</h2>
          <p className="pp-sub pp-reveal">{t.place_sub}</p>

          <div className="pp-placements pp-stagger pp-reveal">
            {/* Banner */}
            <div className="pp-placement">
              <div className="pp-phone pp-phone-lg">
                <img src={A.spotDrawer} alt="Official Partner Card in SpotDrawer" />
              </div>
              <div className="pp-placement-text">
                <span className="pp-placement-badge pp-badge-passive">Passive · always on</span>
                <h3 className="pp-h3">{t.place_banner_title}</h3>
                <p style={{ color: "hsl(240 5% 60%)", fontSize: 15, lineHeight: 1.6 }}>{t.place_banner_body}</p>
              </div>
            </div>
            {/* Challenge */}
            <div className="pp-placement">
              <div className="pp-phone pp-phone-lg">
                <img src={A.challenge} alt="Branded challenge in Arena" />
              </div>
              <div className="pp-placement-text">
                <span className="pp-placement-badge pp-badge-active">Active · drives customers</span>
                <h3 className="pp-h3">{t.place_challenge_title}</h3>
                <p style={{ color: "hsl(240 5% 60%)", fontSize: 15, lineHeight: 1.6 }}>{t.place_challenge_body}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VIRTUOUS CIRCLE ───────────────────────────────────────── */}
      <section className="pp-section pp-section-alt">
        <div className="pp-wrap">
          <div className="pp-eyebrow pp-reveal">{t.circle_eyebrow}</div>
          <h2 className="pp-h2 pp-reveal">{t.circle_headline}</h2>
          <p className="pp-sub pp-reveal">{t.circle_sub}</p>

          <div className="pp-circle-grid pp-reveal pp-stagger">
            {/* Row top: steps 0,1,2 */}
            {(t.circle_steps as any[]).slice(0, 3).map((s, i) => (
              <div key={i} className="pp-circle-step">
                <div className="pp-circle-step-num">{s.num}</div>
                <div className="pp-circle-step-title">{s.title}</div>
                <div className="pp-circle-step-body">{s.body}</div>
              </div>
            ))}
            {/* Row connector */}
            <div className="pp-circle-loop" style={{ gridColumn: "3", gridRow: "2" }}>↓</div>
            <div className="pp-circle-loop" style={{ gridColumn: "1", gridRow: "2" }}>↑</div>
            <div style={{ gridColumn: "2", gridRow: "2" }} />
            {/* Row bottom: steps 5,4,3 (reversed for loop visual) */}
            {[(t.circle_steps as any[])[5], (t.circle_steps as any[])[4], (t.circle_steps as any[])[3]].map((s, i) => (
              <div key={i + 3} className="pp-circle-step" style={{ gridRow: 3 }}>
                <div className="pp-circle-step-num">{s.num}</div>
                <div className="pp-circle-step-title">{s.title}</div>
                <div className="pp-circle-step-body">{s.body}</div>
              </div>
            ))}
          </div>
          <div className="pp-circle-result pp-reveal">{t.circle_result}</div>
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────────────────────── */}
      <section id="how-it-works" className="pp-section">
        <div className="pp-wrap">
          <div className="pp-eyebrow pp-reveal">{t.timeline_eyebrow}</div>
          <h2 className="pp-h2 pp-reveal">{t.timeline_headline}</h2>

          <div className="pp-timeline pp-reveal pp-stagger">
            {(t.timeline_steps as any[]).map((s, i) => (
              <div key={i} className="pp-tl-step">
                <div className="pp-tl-dot-wrap">
                  <div className="pp-tl-dot">{s.num}</div>
                </div>
                <div className="pp-tl-content">
                  <div className="pp-tl-week">{s.week}</div>
                  <div className="pp-tl-title">{s.title}</div>
                  <div className="pp-tl-body">{s.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ANALYTICS ─────────────────────────────────────────────── */}
      <section className="pp-section pp-section-alt">
        <div className="pp-wrap">
          <div className="pp-analytics">
            <div>
              <div className="pp-eyebrow pp-reveal">{t.analytics_eyebrow}</div>
              <h2 className="pp-h2 pp-reveal">{t.analytics_headline}</h2>
              <p className="pp-sub pp-reveal" style={{ marginBottom: 0 }}>{t.analytics_sub}</p>
              <div className="pp-metrics pp-reveal pp-stagger">
                {(t.analytics_metrics as any[]).map((m, i) => (
                  <div key={i} className="pp-metric">
                    <div className="pp-metric-title">{m.title}</div>
                    <div className="pp-metric-body">{m.body}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pp-reveal" style={{ display: "flex", justifyContent: "center" }}>
              <div className="pp-phone" style={{ width: 260 }}>
                <img src={A.analytics} alt="Partner analytics dashboard" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUNDING PARTNER SLOTS ────────────────────────────────── */}
      <section className="pp-section">
        <div className="pp-wrap">
          <div className="pp-eyebrow pp-reveal">{t.slots_eyebrow}</div>
          <h2 className="pp-h2 pp-reveal">{t.slots_headline}</h2>
          <p className="pp-sub pp-reveal">{t.slots_sub}</p>

          <div className="pp-slots pp-reveal pp-stagger">
            {(t.slots_cats as any[]).map((cat, ci) => (
              <div key={ci} className="pp-slot-row">
                <div className="pp-slot-cat">
                  <span className="pp-slot-icon">{cat.icon}</span>
                  <span className="pp-slot-name">{cat.name}</span>
                </div>
                <div className="pp-slot-boxes">
                  {/* Slot 1 */}
                  {ci === 0 ? (
                    <div className="pp-slot pp-slot-filled">
                      <img src={A.tropicool} alt="Tropicool" className="pp-slot-logo" />
                      <div className="pp-slot-info">
                        <div className="pp-slot-brand">Tropicool</div>
                        <div className="pp-slot-badge-tag">{t.slots_taken}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="pp-slot pp-slot-empty">
                      <div className="pp-slot-ph" />
                      <div className="pp-slot-open-lbl">{t.slots_open}</div>
                    </div>
                  )}
                  {/* Slot 2 — always open */}
                  <div className="pp-slot pp-slot-empty">
                    <div className="pp-slot-ph" />
                    <div className="pp-slot-open-lbl">{t.slots_open}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pp-urgency pp-reveal">{t.slots_urgency}</div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ──────────────────────────────────────────── */}
      <section className="pp-section pp-section-alt">
        <div className="pp-wrap">
          <div className="pp-eyebrow pp-reveal">{t.proof_eyebrow}</div>
          <div className="pp-proof pp-reveal">
            <blockquote className="pp-quote">{t.proof_q1}</blockquote>
            <blockquote className="pp-quote">{t.proof_q2}</blockquote>
            <div className="pp-proof-meta">
              <img src={A.tropicool} alt="Tropicool" className="pp-proof-logo" />
              <div>
                <div className="pp-proof-name">{t.proof_name}</div>
                <div className="pp-proof-role">{t.proof_role}</div>
                <div className="pp-proof-brand">{t.proof_brand}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OFFER ─────────────────────────────────────────────────── */}
      <section className="pp-section">
        <div className="pp-wrap">
          <div className="pp-eyebrow pp-reveal">{t.offer_eyebrow}</div>
          <h2 className="pp-h2 pp-reveal">{t.offer_headline}</h2>
          <div className="pp-offer pp-reveal">
            {/* GET */}
            <div className="pp-offer-col pp-offer-get">
              <div className="pp-offer-title">{t.offer_get_title}</div>
              <ul className="pp-offer-list">
                {(t.offer_get as string[]).map((item, i) => (
                  <li key={i} className="pp-offer-item">
                    <span className="pp-offer-icon">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* ASK */}
            <div className="pp-offer-col pp-offer-ask">
              <div className="pp-offer-title">{t.offer_ask_title}</div>
              <ul className="pp-offer-list">
                {(t.offer_ask as string[]).map((item, i) => (
                  <li key={i} className="pp-offer-item">
                    <span className="pp-offer-icon">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FORM ──────────────────────────────────────────────────── */}
      <section id="apply" className="pp-section pp-section-alt">
        <div className="pp-wrap">
          <div className="pp-eyebrow pp-reveal">{t.form_eyebrow}</div>
          <h2 className="pp-h2 pp-reveal">{t.form_headline}</h2>
          <p className="pp-sub pp-reveal">{t.form_sub}</p>

          <form className="pp-form-wrap pp-reveal" onSubmit={handleSubmit}>
            <div className="pp-form-grid">
              <div className="pp-field">
                <label className="pp-label">{t.form_brand} *</label>
                <input className="pp-input" value={form.brand} onChange={upd("brand")} required />
              </div>
              <div className="pp-field">
                <label className="pp-label">{t.form_website}</label>
                <input className="pp-input" type="url" value={form.website} onChange={upd("website")} placeholder="https://" />
              </div>
              <div className="pp-field">
                <label className="pp-label">{t.form_social}</label>
                <input className="pp-input" value={form.social} onChange={upd("social")} placeholder="@yourbrand" />
              </div>
              <div className="pp-field">
                <label className="pp-label">{t.form_contact} *</label>
                <input className="pp-input" value={form.contact} onChange={upd("contact")} required />
              </div>
              <div className="pp-field">
                <label className="pp-label">{t.form_email} *</label>
                <input className="pp-input" type="email" value={form.email} onChange={upd("email")} required />
              </div>
              <div className="pp-field">
                <label className="pp-label">{t.form_category} *</label>
                <select className="pp-select" value={form.category} onChange={upd("category")} required>
                  <option value="">—</option>
                  {(t.form_cats as string[]).map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="pp-field pp-field-full">
                <label className="pp-label">{t.form_message}</label>
                <textarea className="pp-textarea" value={form.message} onChange={upd("message")}
                  placeholder={t.form_msg_ph} rows={5} />
              </div>
            </div>
            <div className="pp-form-actions">
              <button type="submit" className="pp-btn pp-btn-primary pp-btn-lg">{t.form_submit}</button>
              <span className="pp-form-or">{t.form_or}</span>
              {/* ⚠️ Replace 34000000000 with your actual WhatsApp number before deploying */}
              <a href="https://wa.me/34000000000" target="_blank" rel="noopener"
                className="pp-btn pp-btn-ghost">{t.form_wa}</a>
            </div>
          </form>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer>
        <div className="pp-footer">
          <a href="/" className="pp-footer-logo">
            <img src={A.logo} alt="Arenviu" />
            <span className="pp-footer-wm">Arenviu</span>
          </a>
          <span className="pp-footer-copy">{t.foot_copy}</span>
          <a href="mailto:hello@arenviu.com" className="pp-footer-email">hello@arenviu.com</a>
        </div>
      </footer>

    </div>
  );
}
