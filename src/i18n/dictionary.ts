/**
 * Dicionário i18n centralizado do site Infinity Sistemas.
 * Para adicionar/ajustar textos: editar pt e en mantendo a mesma estrutura.
 * Conteúdo dinâmico (eventos/notícias) vem dos services e não é traduzido aqui.
 */

export type Lang = 'pt' | 'en';

export const dict = {
  pt: {
    common: {
      brand: 'Infinity Sistemas',
      tagline: 'Tecnologia que move o seu negócio.',
    },
    nav: {
      home: 'Início',
      solutions: 'Soluções',
      services: 'Serviços',
      events: 'Eventos',
      news: 'Notícias',
      about: 'Sobre',
      contact: 'Contato',
      clientArea: 'Área do cliente',
      ctaContact: 'Fale conosco',
      menuAria: 'Menu',
    },
    lang: {
      switchAria: 'Mudar idioma',
      pt: 'PT',
      en: 'EN',
    },
    hero: {
      badge: 'Software e tecnologia sob medida',
      titlePre: 'Tecnologia que',
      titleHighlight: 'move',
      titlePost: 'o seu negócio.',
      description:
        'A Infinity Sistemas desenvolve plataformas web, automações e soluções de TI que simplificam a sua operação e impulsionam resultados, com segurança e tecnologia de ponta.',
      ctaPrimary: 'Solicitar uma demonstração',
      ctaSecondary: 'Conheça as soluções',
      badges: {
        lgpd: 'Segurança e LGPD',
        agile: 'Implantação ágil',
        custom: 'Soluções sob medida',
      },
      soundOn: 'Som',
      soundOff: 'Mudo',
      soundAriaOn: 'Ativar som',
      soundAriaOff: 'Desativar som',
    },
    solutions: {
      eyebrow: 'Nossas soluções',
      title: 'Plataformas que resolvem de verdade',
      description:
        'Produtos prontos e desenvolvimento sob medida para levar o seu negócio ao próximo nível.',
      available: 'Disponível',
      access: 'Acessar',
      items: [
        {
          name: 'Portal de Assinaturas',
          desc: 'Envie, assine e acompanhe documentos com validade jurídica e trilha de auditoria, tudo na nuvem.',
          bullets: ['Assinatura eletrônica', 'Pastas e organização', 'Painel de acompanhamento'],
        },
        {
          name: 'Sistemas sob medida',
          desc: 'Desenvolvemos plataformas web personalizadas para o fluxo exato do seu negócio.',
          bullets: ['Web responsivo', 'Integrações', 'Escalável na nuvem'],
        },
        {
          name: 'Automação de processos',
          desc: 'Elimine tarefas manuais e ganhe produtividade com automações inteligentes.',
          bullets: ['Workflows', 'Relatórios', 'Notificações'],
        },
        {
          name: 'Suporte e infraestrutura',
          desc: 'Cuidamos da sua TI: servidores, segurança, backups e suporte contínuo.',
          bullets: ['Monitoramento', 'Backups', 'Suporte dedicado'],
        },
      ],
    },
    services: {
      eyebrow: 'O que fazemos',
      title: 'Serviços de tecnologia ponta a ponta',
      description:
        'Da ideia à operação: cuidamos de cada etapa para a sua tecnologia simplesmente funcionar.',
      items: [
        { title: 'Desenvolvimento de software', desc: 'Sistemas web e aplicações sob medida para o seu processo.' },
        { title: 'Soluções em nuvem', desc: 'Hospedagem, escalabilidade e disponibilidade na nuvem.' },
        { title: 'Automação de processos', desc: 'Integramos e automatizamos rotinas para ganhar eficiência.' },
        { title: 'Segurança & LGPD', desc: 'Proteção de dados e conformidade do início ao fim.' },
        { title: 'Experiência & design', desc: 'Interfaces modernas, intuitivas e responsivas.' },
        { title: 'Consultoria em TI', desc: 'Estratégia e tecnologia para o crescimento do negócio.' },
      ],
    },
    eventos: {
      eyebrow: 'Eventos & Novidades',
      title: 'A Infinity em movimento',
      description: 'Acompanhe nossa presença em eventos, treinamentos e momentos marcantes.',
      closeAria: 'Fechar',
      prevAria: 'Anterior',
      nextAria: 'Próxima',
    },
    noticias: {
      eyebrow: 'Fique por dentro',
      title: 'Notícias de tecnologia',
      description: 'As principais novidades do mundo tech, direto das maiores fontes do Brasil.',
      readLink: 'Ler',
      attribution: 'Conteúdo de terceiros, exibido com link para a fonte original (TecMundo, Olhar Digital).',
      timeNow: 'agora há pouco',
      timeHours: (h: number) => `há ${h}h`,
      timeDays: (d: number) => `há ${d}d`,
    },
    about: {
      eyebrow: 'Sobre a Infinity Sistemas',
      title: 'Tecnologia com propósito e parceria',
      description:
        'Somos uma empresa de tecnologia focada em desenvolver soluções que realmente fazem a diferença no dia a dia das empresas. Unimos software de qualidade, segurança e um atendimento próximo para entregar resultados de verdade.',
      highlights: [
        'Tecnologia moderna e escalável',
        'Atendimento próximo e ágil',
        'Soluções pensadas para o seu negócio',
        'Segurança e conformidade (LGPD)',
      ],
      values: [
        { title: 'Missão', desc: 'Transformar negócios por meio de tecnologia acessível, segura e sob medida.' },
        { title: 'Visão', desc: 'Ser referência em soluções digitais que geram resultado real para os clientes.' },
        { title: 'Valores', desc: 'Compromisso, transparência, inovação e parceria de longo prazo.' },
      ],
    },
    contact: {
      eyebrow: 'Vamos conversar',
      title: 'Pronto para levar a sua empresa para o digital?',
      description: 'Preencha o formulário ou fale direto com a gente. Respondemos rápido!',
      whatsappLabel: 'WhatsApp',
      emailLabel: 'E-mail',
      locationLabel: 'Localização',
      whatsappMsg: 'Olá! Gostaria de saber mais sobre as soluções da Infinity Sistemas.',
      form: {
        name: 'Seu nome *',
        email: 'E-mail *',
        phone: 'Telefone',
        message: 'Como podemos ajudar? *',
        submit: 'Enviar mensagem',
        sending: 'Enviando…',
        sentTitle: 'Mensagem enviada!',
        sentDesc: 'Obrigado pelo contato. Retornaremos em breve.',
        sendAnother: 'Enviar outra mensagem',
        errRequired: 'Preencha nome, e-mail e mensagem.',
        errGeneric: 'Não foi possível enviar. Tente pelo WhatsApp.',
      },
    },
    footer: {
      description:
        'Tecnologia e software sob medida para o seu negócio. Plataformas web, automação e soluções de TI com segurança e inovação.',
      nav: 'Navegação',
      contact: 'Contato',
      rights: 'Todos os direitos reservados.',
      navItems: {
        home: 'Início',
        solutions: 'Soluções',
        services: 'Serviços',
        about: 'Sobre',
        contact: 'Contato',
      },
    },
    whatsapp: {
      aria: 'Falar no WhatsApp',
    },
  },

  en: {
    common: {
      brand: 'Infinity Sistemas',
      tagline: 'Technology that moves your business.',
    },
    nav: {
      home: 'Home',
      solutions: 'Solutions',
      services: 'Services',
      events: 'Events',
      news: 'News',
      about: 'About',
      contact: 'Contact',
      clientArea: 'Client area',
      ctaContact: 'Contact us',
      menuAria: 'Menu',
    },
    lang: {
      switchAria: 'Change language',
      pt: 'PT',
      en: 'EN',
    },
    hero: {
      badge: 'Custom software & technology',
      titlePre: 'Technology that',
      titleHighlight: 'moves',
      titlePost: 'your business.',
      description:
        'Infinity Sistemas builds web platforms, automation and IT solutions that simplify your operations and drive results, with security and cutting-edge technology.',
      ctaPrimary: 'Request a demo',
      ctaSecondary: 'Explore solutions',
      badges: {
        lgpd: 'Security & data privacy',
        agile: 'Agile rollout',
        custom: 'Tailor-made solutions',
      },
      soundOn: 'Sound',
      soundOff: 'Muted',
      soundAriaOn: 'Turn sound on',
      soundAriaOff: 'Turn sound off',
    },
    solutions: {
      eyebrow: 'Our solutions',
      title: 'Platforms that actually solve it',
      description:
        'Ready-to-use products and custom development to take your business to the next level.',
      available: 'Available',
      access: 'Access',
      items: [
        {
          name: 'Signature Portal',
          desc: 'Send, sign and track documents with legal validity and full audit trail, all in the cloud.',
          bullets: ['Electronic signature', 'Folders & organization', 'Tracking dashboard'],
        },
        {
          name: 'Custom systems',
          desc: 'We build tailor-made web platforms designed for the exact flow of your business.',
          bullets: ['Responsive web', 'Integrations', 'Scalable in the cloud'],
        },
        {
          name: 'Process automation',
          desc: 'Eliminate manual tasks and boost productivity with smart automation.',
          bullets: ['Workflows', 'Reports', 'Notifications'],
        },
        {
          name: 'Support & infrastructure',
          desc: 'We take care of your IT: servers, security, backups and ongoing support.',
          bullets: ['Monitoring', 'Backups', 'Dedicated support'],
        },
      ],
    },
    services: {
      eyebrow: 'What we do',
      title: 'End-to-end technology services',
      description:
        'From idea to operation: we take care of every step so your technology just works.',
      items: [
        { title: 'Software development', desc: 'Web systems and applications tailored to your process.' },
        { title: 'Cloud solutions', desc: 'Hosting, scalability and availability in the cloud.' },
        { title: 'Process automation', desc: 'We integrate and automate routines for greater efficiency.' },
        { title: 'Security & data privacy', desc: 'Data protection and compliance from start to finish.' },
        { title: 'Experience & design', desc: 'Modern, intuitive and responsive interfaces.' },
        { title: 'IT consulting', desc: 'Strategy and technology for business growth.' },
      ],
    },
    eventos: {
      eyebrow: 'Events & News',
      title: 'Infinity in motion',
      description: 'Follow our presence at events, training sessions and key moments.',
      closeAria: 'Close',
      prevAria: 'Previous',
      nextAria: 'Next',
    },
    noticias: {
      eyebrow: 'Stay up to date',
      title: 'Technology news',
      description: 'The latest from the tech world, straight from the leading sources in Brazil.',
      readLink: 'Read',
      attribution: 'Third-party content, shown with a link to the original source (TecMundo, Olhar Digital).',
      timeNow: 'just now',
      timeHours: (h: number) => `${h}h ago`,
      timeDays: (d: number) => `${d}d ago`,
    },
    about: {
      eyebrow: 'About Infinity Sistemas',
      title: 'Technology with purpose and partnership',
      description:
        'We are a technology company focused on building solutions that truly make a difference in companies’ daily routine. We bring together quality software, security and a close relationship to deliver real results.',
      highlights: [
        'Modern and scalable technology',
        'Close and agile support',
        'Solutions designed for your business',
        'Security and data compliance',
      ],
      values: [
        { title: 'Mission', desc: 'Transform businesses through accessible, secure and custom-built technology.' },
        { title: 'Vision', desc: 'To be a reference in digital solutions that deliver real results for our clients.' },
        { title: 'Values', desc: 'Commitment, transparency, innovation and long-term partnership.' },
      ],
    },
    contact: {
      eyebrow: 'Let’s talk',
      title: 'Ready to take your company to digital?',
      description: 'Fill out the form or reach out directly. We reply fast!',
      whatsappLabel: 'WhatsApp',
      emailLabel: 'Email',
      locationLabel: 'Location',
      whatsappMsg: 'Hi! I’d like to know more about Infinity Sistemas solutions.',
      form: {
        name: 'Your name *',
        email: 'Email *',
        phone: 'Phone',
        message: 'How can we help? *',
        submit: 'Send message',
        sending: 'Sending…',
        sentTitle: 'Message sent!',
        sentDesc: 'Thanks for reaching out. We’ll get back to you shortly.',
        sendAnother: 'Send another message',
        errRequired: 'Please fill in name, email and message.',
        errGeneric: 'We couldn’t send right now. Try WhatsApp instead.',
      },
    },
    footer: {
      description:
        'Custom-built technology and software for your business. Web platforms, automation and IT solutions with security and innovation.',
      nav: 'Navigation',
      contact: 'Contact',
      rights: 'All rights reserved.',
      navItems: {
        home: 'Home',
        solutions: 'Solutions',
        services: 'Services',
        about: 'About',
        contact: 'Contact',
      },
    },
    whatsapp: {
      aria: 'Chat on WhatsApp',
    },
  },
} as const;

export type Dict = typeof dict.pt;
