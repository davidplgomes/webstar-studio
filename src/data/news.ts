import { NewsArticle } from '../../types';

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: 'orbital-commerce-platform',
    publishedAt: '2026-02-12',
    author: 'Webstar Editorial Team',
    coverImage:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2600&auto=format&fit=crop',
    category: {
      en: 'Case Study',
      pt: 'Estudo de Caso',
      es: 'Caso de Estudio',
    },
    title: {
      en: 'How we launched an orbital commerce platform in 9 weeks',
      pt: 'Como lançamos uma plataforma de commerce orbital em 9 semanas',
      es: 'Como lanzamos una plataforma de commerce orbital en 9 semanas',
    },
    excerpt: {
      en: 'Inside the design and engineering sprint that aligned brand narrative, funnel performance, and conversion architecture.',
      pt: 'Por dentro do sprint de design e engenharia que alinhou narrativa de marca, performance de funil e arquitetura de conversão.',
      es: 'Por dentro del sprint de diseño e ingeniería que alineó narrativa de marca, rendimiento del funnel y arquitectura de conversión.',
    },
    readTime: {
      en: '7 min read',
      pt: 'Leitura de 7 min',
      es: 'Lectura de 7 min',
    },
    tags: {
      en: ['E-commerce', 'UX', 'Performance'],
      pt: ['E-commerce', 'UX', 'Performance'],
      es: ['E-commerce', 'UX', 'Performance'],
    },
    content: {
      en: [
        'The project started with a fragmented customer journey across three regional domains. We rebuilt the experience as a single modular platform with localized storytelling, shared infrastructure, and a strict performance budget.',
        'In parallel, we mapped every conversion touchpoint. Product discovery moved from static grids to intent-led pathways that adapt by audience segment, while checkout friction dropped through clearer hierarchy and fewer decision branches.',
        'The final release combined a visual identity refresh, conversion-focused interface system, and measurable engineering constraints. In the first month, the client saw stronger engagement quality and a substantial uplift in qualified leads.',
      ],
      pt: [
        'O projeto começou com uma jornada fragmentada em três domínios regionais. Reconstruímos a experiência como uma plataforma modular única, com narrativa localizada, infraestrutura compartilhada e orçamento rígido de performance.',
        'Em paralelo, mapeamos todos os pontos de conversão. A descoberta de produtos saiu de grids estáticos para caminhos orientados por intenção, enquanto o checkout reduziu fricção com hierarquia mais clara e menos ramificações de decisão.',
        'O lançamento final combinou refresh de identidade visual, sistema de interface focado em conversão e restrições técnicas mensuráveis. No primeiro mês, o cliente registrou melhor qualidade de engajamento e crescimento relevante de leads qualificados.',
      ],
      es: [
        'El proyecto comenzó con un recorrido fragmentado en tres dominios regionales. Reconstruimos la experiencia como una plataforma modular única, con narrativa localizada, infraestructura compartida y un presupuesto estricto de rendimiento.',
        'En paralelo, mapeamos todos los puntos de conversión. El descubrimiento de productos pasó de grids estáticos a rutas guiadas por intención, mientras el checkout redujo fricción con jerarquía más clara y menos ramas de decisión.',
        'El lanzamiento final combinó renovación de identidad visual, sistema de interfaz orientado a conversión y límites técnicos medibles. En el primer mes, el cliente obtuvo mejor calidad de engagement y un aumento relevante de leads calificados.',
      ],
    },
    relatedSlugs: ['security-command-layer', 'signal-driven-content-system'],
  },
  {
    slug: 'security-command-layer',
    publishedAt: '2026-01-24',
    author: 'Webstar Editorial Team',
    coverImage:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2600&auto=format&fit=crop',
    category: {
      en: 'Engineering',
      pt: 'Engenharia',
      es: 'Ingeniería',
    },
    title: {
      en: 'Designing a command layer for enterprise-grade security operations',
      pt: 'Desenhando uma camada de comando para operações de segurança enterprise',
      es: 'Diseñando una capa de comando para operaciones de seguridad enterprise',
    },
    excerpt: {
      en: 'A practical breakdown of how we translated SOC workflows into a high-clarity control surface for distributed teams.',
      pt: 'Um breakdown prático de como traduzimos fluxos de SOC em uma superfície de controle de alta clareza para times distribuídos.',
      es: 'Un desglose práctico de cómo traducimos flujos SOC en una superficie de control de alta claridad para equipos distribuidos.',
    },
    readTime: {
      en: '6 min read',
      pt: 'Leitura de 6 min',
      es: 'Lectura de 6 min',
    },
    tags: {
      en: ['Cybersecurity', 'Product Design', 'B2B'],
      pt: ['Cibersegurança', 'Product Design', 'B2B'],
      es: ['Ciberseguridad', 'Product Design', 'B2B'],
    },
    content: {
      en: [
        'Enterprise security teams were managing alerts across disconnected dashboards. We created a command layer that consolidates detection, triage, and escalation in one operating environment.',
        'The interface prioritized certainty under pressure: threat states were grouped by urgency and business impact, while analyst actions were exposed through explicit workflows with built-in audit visibility.',
        'The outcome was a faster decision cycle and less context switching. Teams moved from reactive data hunting to coordinated response choreography with clear ownership.',
      ],
      pt: [
        'Times de segurança enterprise estavam gerenciando alertas em dashboards desconectados. Criamos uma camada de comando que consolida detecção, triagem e escalonamento em um único ambiente operacional.',
        'A interface priorizou clareza sob pressão: estados de ameaça foram agrupados por urgência e impacto no negócio, enquanto ações dos analistas ganharam fluxos explícitos com trilha de auditoria.',
        'O resultado foi ciclo de decisão mais rápido e menos troca de contexto. Os times saíram da caça reativa de dados para uma resposta coordenada com ownership claro.',
      ],
      es: [
        'Los equipos de seguridad enterprise gestionaban alertas en dashboards desconectados. Creamos una capa de comando que consolida detección, triage y escalamiento en un único entorno operativo.',
        'La interfaz priorizó claridad bajo presión: los estados de amenaza se agruparon por urgencia e impacto de negocio, mientras las acciones del analista se definieron con flujos explícitos y trazabilidad.',
        'El resultado fue un ciclo de decisión más rápido y menos cambio de contexto. Los equipos pasaron de buscar datos de forma reactiva a una respuesta coordinada con ownership claro.',
      ],
    },
    relatedSlugs: ['orbital-commerce-platform', 'signal-driven-content-system'],
  },
  {
    slug: 'signal-driven-content-system',
    publishedAt: '2025-12-18',
    author: 'Webstar Editorial Team',
    coverImage:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2600&auto=format&fit=crop',
    category: {
      en: 'Strategy',
      pt: 'Estratégia',
      es: 'Estrategia',
    },
    title: {
      en: 'Building a signal-driven content system for multi-market growth',
      pt: 'Construindo um sistema de conteúdo guiado por sinais para crescimento multi-mercado',
      es: 'Construyendo un sistema de contenido guiado por señales para crecimiento multi-mercado',
    },
    excerpt: {
      en: 'How we connected editorial planning, SEO intent clusters, and product messaging into one adaptive publishing model.',
      pt: 'Como conectamos planejamento editorial, clusters de intenção em SEO e mensagem de produto em um modelo adaptativo de publicação.',
      es: 'Cómo conectamos planificación editorial, clústeres de intención SEO y mensaje de producto en un modelo de publicación adaptativo.',
    },
    readTime: {
      en: '5 min read',
      pt: 'Leitura de 5 min',
      es: 'Lectura de 5 min',
    },
    tags: {
      en: ['SEO', 'Content Ops', 'Growth'],
      pt: ['SEO', 'Content Ops', 'Growth'],
      es: ['SEO', 'Content Ops', 'Growth'],
    },
    content: {
      en: [
        'The client had strong expertise but inconsistent publishing velocity. We implemented a signal-driven content model that links market demand, product priorities, and editorial cadence.',
        'Each story now enters a modular template with reusable blocks for authority proof, feature education, and conversion context. This reduced production overhead while preserving quality.',
        'By aligning content operations with performance signals, the team gained a repeatable system for expansion without sacrificing strategic coherence.',
      ],
      pt: [
        'O cliente tinha alta expertise, mas velocidade de publicação inconsistente. Implementamos um modelo de conteúdo guiado por sinais que conecta demanda de mercado, prioridades de produto e cadência editorial.',
        'Cada história agora entra em um template modular com blocos reutilizáveis para prova de autoridade, educação de features e contexto de conversão. Isso reduziu o custo operacional sem perder qualidade.',
        'Ao alinhar operações de conteúdo com sinais de performance, o time ganhou um sistema repetível para expansão sem perder coerência estratégica.',
      ],
      es: [
        'El cliente tenía alta expertise pero velocidad de publicación inconsistente. Implementamos un modelo de contenido guiado por señales que conecta demanda de mercado, prioridades de producto y cadencia editorial.',
        'Cada historia entra ahora en una plantilla modular con bloques reutilizables para prueba de autoridad, educación de funcionalidades y contexto de conversión. Esto redujo el costo operativo sin perder calidad.',
        'Al alinear operaciones de contenido con señales de rendimiento, el equipo obtuvo un sistema repetible para escalar sin perder coherencia estratégica.',
      ],
    },
    relatedSlugs: ['orbital-commerce-platform', 'security-command-layer'],
  },
];

export function getNewsArticleBySlug(slug: string): NewsArticle | undefined {
  return NEWS_ARTICLES.find((article) => article.slug === slug);
}

export function getRelatedArticles(article: NewsArticle): NewsArticle[] {
  return NEWS_ARTICLES.filter((item) => article.relatedSlugs.includes(item.slug));
}

export function getNewsCategories(): string[] {
  return Array.from(
    new Set(NEWS_ARTICLES.map((article) => article.category.en))
  );
}
