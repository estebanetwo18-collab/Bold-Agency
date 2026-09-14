/**
 * Tradução al português (Brasil). Mesma estrutura de ./es.ts (fonte da
 * verdade) — manter os dois sincronizados quando o copy mudar. Nomes de
 * produto ("The Bold Way", "Grow Your Way") ficam em inglês nos três
 * idiomas, por decisão do usuário. Os preços seguem em colones (₡)
 * independente do idioma — ver §8/§4 do brief.
 */

export const nav = {
  logoWord: "BOLD",
  logoSub: "AGENCY",
  links: [
    { href: "/", label: "Início" },
    { href: "/#enfoque", label: "Foco" },
    { href: "/#sistema", label: "Serviços" },
    { href: "/#como-trabajamos", label: "Como trabalhamos" },
    { href: "/#planes", label: "Planos" },
    { href: "/portafolio", label: "Portfólio" },
    { href: "/calculadora", label: "Calculadora" },
  ],
  cta: { href: "/cotizacion", label: "Diagnóstico 360" },
};

export const hero = {
  eyebrow: "Marketing 360, branding e sinalização",
  headline: ["THE BOLD WAY", "TO GROW"],
  tagline: "Uma única estratégia.",
  subhead:
    "Não como peças soltas. Um mesmo time pensa sua marca, sua presença digital e sua presença física — com base na Costa Rica e alcance no Brasil, Estados Unidos e Espanha.",
  ctaPrimary: { href: "/cotizacion", label: "Agendar Diagnóstico 360" },
  ctaSecondary: { href: "#sistema", label: "Como trabalhamos" },
  proofPoints: [
    "Costa Rica · Brasil · Estados Unidos · Espanha",
    "+9 anos de experiência em marketing digital e estratégico",
    "+16 campanhas de sucesso para marcas como Toyota, Avon e Swarovski",
  ],
};

export const problem = {
  eyebrow: "O problema real",
  headline: "Contratar por partes não resolve um negócio inteiro.",
  intro:
    "Você tem um bom negócio. Já opera há anos, seu produto funciona e seus clientes recomendam você. Mas também lida com cinco conversas de WhatsApp diferentes com cinco fornecedores diferentes, e nenhum deles enxerga o negócio como um todo.",
  points: [
    {
      title: "O designer não vende",
      body: "Entrega peças bonitas que não estão conectadas a nenhuma estratégia comercial.",
    },
    {
      title: "O community manager não direciona",
      body: "Publica conteúdo o tempo todo, mas ninguém decide para onde a marca deveria ir.",
    },
    {
      title: "A agência de mídia paga não conhece sua marca",
      body: "Otimiza cliques e alcance sem entender o que torna seu negócio diferente.",
    },
    {
      title: "Você acaba coordenando tudo",
      body: "O dono vira o único ponto que conecta peças que deveriam estar conectadas desde o início.",
    },
  ],
  resolution:
    "O resultado não é falta de esforço: é falta de direção. A BOLD existe para ser essa direção.",
};

export const system = {
  eyebrow: "Nossos serviços",
  headline: "Tudo o que uma marca precisa, em um único time.",
  intro: "Seis frentes, um mesmo time por trás de todas.",
  pillars: [
    {
      index: "01",
      title: "Publicidade digital",
      body: "Google · Meta · TikTok. Mídia paga com foco em performance.",
    },
    {
      index: "02",
      title: "Estratégia de marca",
      body: "Posicionamento, consultoria e arquitetura de marca.",
    },
    {
      index: "03",
      title: "Sinalização & grande formato",
      body: "Ponto de venda, ativações e presença física.",
    },
    {
      index: "04",
      title: "Audiovisual & design",
      body: "Produção de conteúdo, fotografia e design gráfico.",
    },
    {
      index: "05",
      title: "Consultoria 360",
      body: "Diagnóstico integral e estratégia de ponta a ponta.",
    },
    {
      index: "06",
      title: "Experiências 360",
      body: "Na loja e no digital, conectando o físico com o digital.",
    },
    {
      index: "07",
      title: "Desenvolvimento de sites e apps",
      body: "Sites, e-commerce e aplicações sob medida — como este mesmo site.",
      wide: true,
    },
  ],
};

export const midBanner = {
  caption: "Não trabalhamos como agência externa. Nos tornamos um implante do seu time.",
};

export const teamBanner = {
  caption: "Um time que senta para revisar resultados com você, e não some depois de entregar um plano.",
};

export const skylineBanner = {
  caption: "Dirigimos negócios reais, não campanhas isoladas no vácuo.",
};

export const differentiators = {
  eyebrow: "Por que a BOLD",
  headline: "Quatro razões pelas quais negócios como o seu escolhem ser dirigidos por nós.",
  items: [
    {
      icon: "expertise",
      title: "Expertise e especialização",
      body: "+9 anos de experiência em marketing digital e estratégico, com operação na Costa Rica, Brasil, Estados Unidos e Espanha.",
    },
    {
      icon: "perspective",
      title: "Perspectiva nova",
      body: "Vemos seu negócio de fora, sem os pontos cegos que se acumulam depois de anos operando dentro dele.",
    },
    {
      icon: "flexibility",
      title: "Flexibilidade e escalabilidade",
      body: "Começamos de onde você está hoje e ajustamos o escopo conforme o negócio cresce, sem estruturas rígidas.",
    },
    {
      icon: "resources",
      title: "Otimização de recursos",
      body: "Você aproveita um time completo já formado, em vez de contratar e treinar uma estrutura interna do zero.",
    },
  ],
};

export const founder = {
  eyebrow: "Nosso fundador",
  headline: "Quem está à frente disso.",
  name: "Esteban Muñoz Malavé",
  role: "Marketing Strategist & Growth Leader · Trilíngue",
  bio: "Comunicador Social com especialização em Marketing e Publicidade, com mais de 9 anos liderando crescimento B2B e B2C para marcas na Venezuela, Costa Rica, Panamá, México, Argentina e Brasil. Especialista em planejamento estratégico, mídia paga, branding e liderança de times multidisciplinares, com resultados mensuráveis nos setores automotivo, beleza, varejo, mobiliário/design, tecnologia e eventos/turismo.",
  experience: [
    {
      role: "Founder & Estrategista de marca",
      company: "BOLD Agency",
      period: "2026 – Presente",
    },
    {
      role: "Senior Marketing Specialist",
      company: "Shift Latam Porter Novelli — Implant na CCCR",
      period: "2026",
    },
    {
      role: "Marketing Manager",
      company: "Euromobilia & Nouvell (Ara Group)",
      period: "2024 – 2026",
    },
    {
      role: "Digital Marketing Manager",
      company: "Avon Costa Rica",
      period: "2022 – 2023",
    },
  ],
  cards: [
    {
      tag: "Formação",
      value: "Comunicador Social",
      sub: "Marketing e Publicidade",
    },
    {
      tag: "Certificação",
      value: "Executive Certificate, Digital Marketing",
      sub: "The George Washington University · 2023",
    },
    {
      tag: "Hoje",
      value: "Fazer sua empresa crescer",
      sub: "BOLD Agency",
    },
    {
      tag: "Idiomas",
      value: "Español C2 · Português C1 · English B2",
      sub: "Nativo · Avançado · Intermediário",
    },
  ],
  linkedIn: "https://linkedin.com/in/estebanjm",
  experienceLabel: "Experiência recente",
  certificationLabel: "Certificação",
  certificate: {
    institution: "The George Washington University",
    school: "School of Business",
    program: "Specialization in Digital Marketing",
    honoree: "Esteban Jose Muñoz Malave",
    date: "Novembro 2023",
  },
};

// Copy borrador do hero de /portafolio (§5.4a), traduzido do rascunho em
// espanhol do usuário — pendente de revisão antes de publicar.
export const portfolioHero = {
  eyebrow: "MARKETING STRATEGY & GROWTH",
  headlinePre: "Estrategista construindo marcas com",
  headlineItalic: "direção",
  headlinePost: "e resultados reais.",
  subhead:
    "Ajudo negócios ambiciosos a crescer com estratégia clara e execução real. Com base na Costa Rica, alcance na LATAM, EUA e Europa.",
  cta: { label: "Ver portfólio →", targetId: "grid" },
  photo: "/images/founder-about-me.jpg",
};

export const portfolioPage = {
  metaTitle: "Portfólio",
  metaDescription: "Portfólio e trajetória de Esteban Muñoz Malavé — BOLD Agency.",
  aboutEyebrow: "Sobre mim",
  gridEyebrow: "Portfólio",
  gridHeadline: "Marcas com as quais construí, de perto.",
  gridIntro: "Filtre por marca ou por tipo de trabalho. Cada caso mostra meu papel real no projeto.",
  filterAllLabel: "Todas",
  filterBrandLabel: "Marca",
  filterTypeLabel: "Tipo de trabalho",
  emptyLabel: "Ainda não há casos com esse filtro.",
  inProgressLabel: "Em atualização",
  roleLabel: "Meu papel",
  backLabel: "← Voltar ao portfólio",
  clientsEyebrow: "Clientes e parceiros",
  clientsHeadline: "Marcas que escolheram ser bold.",
  detailCtaLabel: "Agendar Diagnóstico 360",
};

export const process = {
  eyebrow: "Como trabalhamos",
  headline: "Um processo, não uma lista de entregáveis.",
  subhead: "Cada etapa se apoia na anterior. Não pulamos para a execução sem diagnóstico, nem medimos sem ter executado com intenção.",
  steps: [
    {
      index: "01",
      title: "Diagnóstico 360",
      body: "Revisamos seu negócio por completo — marca, presença digital, processo de vendas e concorrência — para entender o que está travando o crescimento.",
    },
    {
      index: "02",
      title: "Prioridades",
      body: "Definimos juntos o que mover primeiro. Nem tudo se resolve ao mesmo tempo, e dizer isso com clareza faz parte do trabalho.",
    },
    {
      index: "03",
      title: "Execução",
      body: "O time BOLD implementa o plano diretamente, com a operação envolvida, não apenas com recomendações em um documento.",
    },
    {
      index: "04",
      title: "Medição",
      body: "Revisamos o que está funcionando com dados reais do negócio, não com relatórios de vaidade.",
    },
    {
      index: "05",
      title: "Aprendizado",
      body: "Ajustamos a direção com o que aprendemos. O crescimento real é um ciclo, não um projeto com data de encerramento.",
    },
  ],
};

export const plans = {
  eyebrow: "Como trabalhar com a BOLD",
  headline: "Dois caminhos. Um mesmo compromisso.",
  intro:
    "Cotação padrão com entregáveis claros, ou modalidade implant se você quiser que sejamos parte do seu time. O Diagnóstico 360 ajuda você a decidir qual combina melhor.",
  modalities: [
    {
      name: "Grow Your Way",
      description: "Cotação padrão ou mensalidade fixa. Serviços empacotados com entregáveis claros.",
      includes: [
        { label: "Pacotes digitais", detail: "redes · ads · conteúdo" },
        { label: "Branding & consultoria", detail: "identidade + estratégia" },
        { label: "Sinalização", detail: "independente ou como reforço" },
        { label: "Design & audiovisual", detail: "por projeto ou retainer" },
      ],
      price: "A partir de $200 usd/mês + % de comissão ajustável",
    },
    {
      name: "The Bold Way",
      badge: "★ Top Tier",
      featured: true,
      description:
        "Não trabalhamos como agência externa: nos tornamos um implante do seu time. Vivemos sua marca, a analisamos por dentro e crescemos junto com você.",
      includes: [
        { label: "Envolvimento total", detail: "pensamos como parte do time" },
        { label: "Presença semanal", detail: "reuniões, estratégia, execução" },
        { label: "Análise ponta a ponta", detail: "do briefing aos resultados" },
        { label: "Estratégia 360 dedicada", detail: "branding + digital + físico" },
      ],
      price: "Fee base + performance share · sob consulta",
    },
  ],
  disclaimer: "Preços de referência em USD, sujeitos a escopo e volume. O Diagnóstico 360 não tem custo — é dele que sai a cotação final. Todos os planos incluem nota fiscal eletrônica.",
  ctaLabel: "Definir meu plano",
  calculatorCtaLabel: "Ver calculadora de preços",
};

export const launchPricing = {
  eyebrow: "Preços de lançamento · The Bold Way",
  headline: "É assim que o The Bold Way começa.",
  intro:
    "Três pacotes, um mesmo compromisso: o nível de envolvimento é igual nos três — o que muda é quanto conteúdo você recebe e o equilíbrio entre estático e vídeo.",
  tiers: [
    {
      name: "Pacote Bronze",
      price: "A partir de ₡75.000",
      unit: "/mês",
      priceNote: "preço de lançamento",
      features: [
        { label: "12 peças por mês", detail: "10 estáticas + 2 em vídeo" },
        { label: "Envolvimento 100%", detail: "durante o mês de teste" },
      ],
    },
    {
      name: "Pacote Silver",
      badge: "Mais escolhido",
      price: "A partir de ₡150.000",
      unit: "/mês",
      priceNote: "preço de lançamento",
      features: [
        { label: "18 peças por mês", detail: "12 estáticas + 6 em vídeo" },
        { label: "Envolvimento 100%", detail: "durante o mês de teste" },
      ],
    },
    {
      name: "Pacote B-Gold",
      badge: "★ Top Tier",
      featured: true,
      price: "A partir de ₡220.000",
      unit: "/mês",
      priceNote: "preço de lançamento",
      features: [
        { label: "24 peças por mês", detail: "100% à sua escolha" },
        { label: "Formato flexível", detail: "tudo reels · tudo estático · ou um mix" },
        { label: "Envolvimento 100%", detail: "durante o mês de teste" },
      ],
    },
  ],
  promo:
    "★ Preços de lançamento — Cotação personalizada para necessidades especiais · Social · Paid · Design · Estratégia",
};

export const results = {
  eyebrow: "Resultados",
  headline: "Os números falam.",
  intro: "Resultados reais de campanhas, não promessas.",
  stats: [
    { num: "+85%", label: "Leads de qualidade gerados", src: "CCCR" },
    { num: "$300K", label: "Vendas mensais", src: "CCCR" },
    { num: "+8K", label: "Usuários no app", src: "Grupo Purdy" },
    { num: "+900K", label: "USD em ROI", src: "Euromobilia" },
    { num: "+70%", label: "Produtividade", src: "Avon" },
    { num: "+16", label: "Campanhas de sucesso", src: "9+ anos de trajetória" },
  ],
  ctaLabel: "Ver portfólio completo",
};

export const faq = {
  eyebrow: "Perguntas frequentes",
  headline: "Antes que você pergunte.",
  items: [
    {
      question: "Já tenho um designer ou community manager — isso os substitui?",
      answer:
        "Não necessariamente. Muitas vezes integramos as pessoas que já funcionam para você dentro de uma direção mais clara. O que agregamos é o critério estratégico que conecta o trabalho delas ao resto do negócio.",
    },
    {
      question: "Quanto custa trabalhar com a BOLD?",
      answer:
        "Depende da modalidade: pacotes a partir de $200 usd/mês no Grow Your Way, ou fee base + performance share se trabalharmos como implante do seu time (The Bold Way). O Diagnóstico 360 — o primeiro passo — não tem custo.",
    },
    {
      question: "Vocês trabalham fora da Costa Rica?",
      answer:
        "Sim. Temos base na Costa Rica e operação no Brasil (Curitiba, São Paulo), Estados Unidos (Orlando, Philadelphia, Chicago) e Espanha (Barcelona, Valencia, Madrid).",
    },
    {
      question: "Meu negócio é pequeno, mesmo assim se aplica?",
      answer:
        "Trabalhamos com negócios que já têm um produto validado e entre 3 e 25 funcionários. Se você vende principalmente pelo WhatsApp e sente que sua presença não reflete o que seu negócio realmente vale, você se aplica.",
    },
    {
      question: "Como é o processo a partir do momento que agendo o diagnóstico?",
      answer:
        "Você preenche o formulário de Diagnóstico 360, entramos em contato para agendar uma conversa, revisamos seu negócio juntos e apresentamos prioridades concretas — com ou sem compromisso de continuar.",
    },
    {
      question: "E se eu não vir resultados imediatamente?",
      answer:
        "Quem promete resultados garantidos em semanas não está sendo honesto com você. O que você pode esperar é direção clara desde o primeiro mês e uma medição constante do que está funcionando e do que não está.",
    },
    {
      question: "Já tive uma má experiência com outra agência — o que muda com vocês?",
      answer:
        "Que um mesmo time enxerga o negócio inteiro, não um canal isolado. Isso significa menos jargão, menos relatórios que ninguém lê, e mais conversa direta com quem realmente executa o trabalho.",
    },
  ],
};

export const finalCta = {
  eyebrow: "O próximo passo",
  headline: "Seu negócio não precisa de mais ruído. Precisa de direção.",
  body:
    "O Diagnóstico 360 não é uma ligação de vendas. É uma revisão honesta do seu negócio, sem custo e sem compromisso, para que você decida com informação real o que mover primeiro.",
  cta: { href: "#diagnostico", label: "Agendar meu Diagnóstico 360" },
};

export const footer = {
  description:
    "The bold way to grow. Agência criativa e estratégica com base na Costa Rica e alcance no Brasil, Estados Unidos e Espanha.",
  contact: {
    email: "esteban.munoz@boldagencycr.com",
    whatsapp: "+506 7244 5642",
    address: "Costa Rica → LATAM · EUA · Europa",
  },
  columns: [
    {
      title: "Site",
      links: [
        { href: "/#enfoque", label: "Foco" },
        { href: "/#sistema", label: "Serviços" },
        { href: "/#diferenciales", label: "Por que a BOLD" },
        { href: "/#como-trabajamos", label: "Como trabalhamos" },
        { href: "/#planes", label: "Planos" },
        { href: "/calculadora", label: "Calculadora" },
        { href: "/portafolio", label: "Portfólio" },
        { href: "/#preguntas", label: "FAQ" },
        { href: "/#diagnostico", label: "Diagnóstico 360" },
      ],
    },
    {
      title: "Legal",
      links: [
        { href: "/privacidad", label: "Política de privacidade" },
        { href: "/terminos", label: "Termos e condições" },
      ],
    },
  ],
  social: [
    { href: "https://www.facebook.com/profile.php?id=61594134985999", label: "Facebook", icon: "facebook" },
    { href: "https://www.instagram.com/boldagency.cr/", label: "Instagram", icon: "instagram" },
    { href: "https://www.linkedin.com/company/em-agency-latam", label: "LinkedIn", icon: "linkedin" },
  ],
  whatsappLink: "https://wa.me/50672445642",
  whatsappAriaLabel: "Falar pelo WhatsApp",
  copyright: `© ${new Date().getFullYear()} BOLD Agency. Todos os direitos reservados.`,
};

export const diagnosticForm = {
  eyebrow: "Diagnóstico 360",
  headline: "Conte-nos sobre seu negócio.",
  body:
    "Leva menos de dois minutos. Com essas informações preparamos uma primeira leitura do seu negócio antes da conversa.",
  successTitle: "Recebemos sua solicitação.",
  successBody:
    "Nosso time vai revisar as informações e entrar em contato por WhatsApp ou e-mail nas próximas 24 horas úteis para agendar seu Diagnóstico 360.",
  resendLabel: "Enviar outra solicitação",
  errorTitle: "Não conseguimos enviar sua solicitação.",
  errorBody:
    "Suas informações não se perderam. Tente novamente em alguns segundos ou fale conosco direto pelo WhatsApp.",
  nameLabel: "Nome completo",
  companyLabel: "Nome do negócio",
  contactLabel: "WhatsApp ou e-mail",
  contactHint: "Com código do país, se for WhatsApp.",
  businessTypeLabel: "Tipo de negócio",
  businessTypePlaceholder: "Selecione uma opção",
  budgetLabel: "Orçamento mensal aproximado",
  budgetPlaceholder: "Selecione uma faixa",
  challengeLabel: "Qual é o seu principal desafio hoje?",
  consentLabel: "Autorizo a BOLD Agency a me contatar por WhatsApp ou e-mail para agendar meu Diagnóstico 360.",
  submitLabel: "Solicitar Diagnóstico 360",
  submittingLabel: "Enviando…",
  privacyNote: "Não compartilhamos suas informações. Usamos apenas para preparar seu diagnóstico.",
};

export const businessTypes = [
  { value: "comercio", label: "Comércio / varejo" },
  { value: "servicios", label: "Serviços profissionais" },
  { value: "salud", label: "Saúde e bem-estar" },
  { value: "alimentos", label: "Alimentos e bebidas" },
  { value: "construccion", label: "Construção e imóveis" },
  { value: "manufactura", label: "Manufatura / indústria" },
  { value: "educacion", label: "Educação e formação" },
  { value: "tecnologia", label: "Tecnologia / software" },
  { value: "otro", label: "Outro" },
];

export const budgetRanges = [
  { value: "menos-1000", label: "Menos de USD 1.000/mês" },
  { value: "1000-3000", label: "USD 1.000 – 3.000/mês" },
  { value: "3000-6000", label: "USD 3.000 – 6.000/mês" },
  { value: "6000-mas", label: "Mais de USD 6.000/mês" },
  { value: "no-seguro", label: "Ainda não sei" },
];

/**
 * Página independente em /cotizacion — URL única e compartilhável para
 * campanhas, bio de redes e WhatsApp, que leva direto ao formulário sem
 * depender de uma âncora dentro da home.
 */
export const cotizacionPage = {
  metaTitle: "Cotação — Diagnóstico 360",
  metaDescription: "Solicite seu Diagnóstico 360 com a BOLD Agency: conte-nos sobre seu negócio e entramos em contato por WhatsApp ou e-mail com sua cotação, sem custo e sem compromisso.",
  eyebrow: "Cotação BOLD Agency",
  headline: "Conte-nos sobre seu negócio e vamos começar sua cotação.",
  intro:
    "Menos de dois minutos. Com essas informações preparamos seu Diagnóstico 360 e entramos em contato por WhatsApp ou e-mail com os próximos passos — sem custo e sem compromisso.",
  trustPoints: [
    "Resposta em menos de 24 horas úteis",
    "Diagnóstico 360 sem custo e sem compromisso",
    "+9 anos de experiência em marketing digital e estratégico",
  ],
};

// REVISAR TRADUÇÃO: os nomes de serviços e categorias do catálogo
// (pricing-config.ts) ficam em espanhol nos 3 idiomas por enquanto —
// vêm literalmente do Excel do cliente e traduzi-los com precisão de
// negócio fica pendente de uma revisão à parte.
export const calculator = {
  eyebrow: "Calcule seu serviço ou projeto",
  headline: "Quanto custa crescer do seu jeito?",
  intro: "Preços reais, em colones. Escolha um pacote mensal ou monte sua própria combinação de serviços pontuais.",
  exclusiveNote: "Um pacote ou serviços pontuais — eles não se combinam neste cálculo. Precisa de pacote + serviços adicionais? Isso é uma cotação especializada.",
  specializedCtaLabel: "Solicitar cotação especializada",
  packageTitle: "Pacote mensal",
  packageSubtitle: "Seleção única — não se combinam entre si.",
  removePackageLabel: "Remover pacote",
  pointTitle: "Serviços pontuais",
  pointSubtitle: "Some os que você precisa. Os marcados “sob consulta” abrem um formulário à parte.",
  quoteLabel: "Sob consulta",
  fromLabel: "a partir de",
  quoteButton: "Cotar",
  quotedButton: "Solicitado ✓",
  growYourWayNote: "Grow Your Way inclui uma comissão ajustável sobre o orçamento de mídia paga, acordada por projeto — não está incluída no total desta calculadora.",
  summaryTitle: "Sua estimativa",
  emptyState: "Escolha um pacote ou um serviço pontual para ver o total.",
  subtotalLabel: "Subtotal",
  discountLabel: "Desconto por combinar",
  vatLabel: "IVA",
  totalLabel: "Total estimado",
  totalFromLabel: "Total estimado a partir de",
  totalUnit: "/mês, impostos incluídos",
  quotedNote: "Inclui serviços a cotar separadamente — entramos em contato com o valor exato.",
  soloSurchargeNote: "Este serviço foi pensado para se combinar com outros — escolhido sozinho, o preço inclui um ajuste.",
  ctaLabel: "Agendar Diagnóstico 360",
  decreaseAria: "Diminuir",
  increaseAria: "Aumentar",
};

export const quoteModal = {
  eyebrow: "Cotar",
  intro: "Este serviço é cotado sob medida. Deixe seus dados e um breve escopo.",
  namePlaceholder: "Nome completo",
  companyPlaceholder: "Nome do negócio",
  contactPlaceholder: "WhatsApp ou e-mail",
  briefPlaceholder: "Conte brevemente o escopo do projeto",
  submitLabel: "Enviar solicitação",
  submittingLabel: "Enviando…",
  whatsappLabel: "ou fale conosco direto pelo WhatsApp",
  closeLabel: "Fechar",
  successTitle: "Pronto!",
  successBody: (service: string) => `Recebemos sua solicitação de cotação para ${service}. Entraremos em contato em breve.`,
  ariaLabel: (service: string) => `Cotar ${service}`,
  genericError: "Revise os campos.",
  submitError: "Não conseguimos enviar sua solicitação.",
  unexpectedError: "Erro inesperado.",
  whatsappMessage: (service: string) => `Olá BOLD, quero cotar: ${service}.`,
  challengePrefix: "Serviço de interesse",
  noDetailNote: "sem detalhe adicional",
};
