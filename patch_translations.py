import re, json

# ===== All missing translations =====
# Format: 'English key': {es, ar, hi, pt, fr, ja}
NEW_TRANSLATIONS = {
  # Section tags
  'Global Ad Tech Leader': {'es':'Líder Global en Ad Tech','ar':'رائد عالمي في تقنية الإعلانات','hi':'ग्लोबल एड टेक लीडर','pt':'Líder Global em Ad Tech','fr':'Leader Mondial en Ad Tech','ja':'グローバル広告テクノロジーリーダー'},
  'Our Platforms': {'es':'Nuestras Plataformas','ar':'منصاتنا','hi':'हमारे प्लेटफॉर्म','pt':'Nossas Plataformas','fr':'Nos Plateformes','ja':'プラットフォーム'},
  'Who We Serve': {'es':'A Quién Servimos','ar':'من نخدم','hi':'हम किसकी सेवा करते हैं','pt':'Quem Servimos','fr':'Qui Nous Servons','ja':'サービス対象'},
  'For Advertisers': {'es':'Para Anunciantes','ar':'للمعلنين','hi':'विज्ञापनदाताओं के लिए','pt':'Para Anunciantes','fr':'Pour les Annonceurs','ja':'広告主向け'},
  "Who It\\'s For": {'es':'Para Quién Es','ar':'لمن هو','hi':'यह किसके लिए है','pt':'Para Quem É','fr':'Pour Qui C\'est','ja':'対象ユーザー'},
  'Core Capabilities': {'es':'Capacidades Principales','ar':'القدرات الأساسية','hi':'मुख्य क्षमताएं','pt':'Capacidades Principais','fr':'Capacités Principales','ja':'コア機能'},
  'For Publishers & Developers': {'es':'Para Publicadores y Desarrolladores','ar':'للناشرين والمطورين','hi':'प्रकाशकों और डेवलपर्स के लिए','pt':'Para Publicadores e Desenvolvedores','fr':'Pour les Éditeurs et Développeurs','ja':'パブリッシャー・開発者向け'},
  'Publisher Types': {'es':'Tipos de Publicadores','ar':'أنواع الناشرين','hi':'प्रकाशक प्रकार','pt':'Tipos de Publicadores','fr':'Types d\'Éditeurs','ja':'パブリッシャーの種類'},
  'Core Features': {'es':'Funciones Principales','ar':'الميزات الأساسية','hi':'मुख्य विशेषताएं','pt':'Funcionalidades Principais','fr':'Fonctionnalités Principales','ja':'主要機能'},
  'For Agencies': {'es':'Para Agencias','ar':'للوكالات','hi':'एजेंसियों के लिए','pt':'Para Agências','fr':'Pour les Agences','ja':'代理店向け'},
  'Agency Features': {'es':'Funciones para Agencias','ar':'ميزات الوكالات','hi':'एजेंसी सुविधाएं','pt':'Funcionalidades para Agências','fr':'Fonctionnalités Agences','ja':'代理店機能'},
  'DSP — Demand-Side Platform': {'es':'DSP — Plataforma del Lado de la Demanda','ar':'DSP — منصة جانب الطلب','hi':'DSP — डिमांड-साइड प्लेटफॉर्म','pt':'DSP — Plataforma do Lado da Demanda','fr':'DSP — Plateforme Côté Demande','ja':'DSP — デマンドサイドプラットフォーム'},
  'Platform Features': {'es':'Características de la Plataforma','ar':'ميزات المنصة','hi':'प्लेटफॉर्म की विशेषताएं','pt':'Recursos da Plataforma','fr':'Fonctionnalités de la Plateforme','ja':'プラットフォーム機能'},
  'Ad Formats': {'es':'Formatos de Anuncios','ar':'صيغ الإعلانات','hi':'विज्ञापन प्रारूप','pt':'Formatos de Anúncios','fr':'Formats Publicitaires','ja':'広告フォーマット'},
  'ADX — Ad Exchange': {'es':'ADX — Bolsa de Anuncios','ar':'ADX — بورصة الإعلانات','hi':'ADX — विज्ञापन एक्सचेंज','pt':'ADX — Exchange de Anúncios','fr':'ADX — Bourse Publicitaire','ja':'ADX — 広告取引所'},
  'For Buyers': {'es':'Para Compradores','ar':'للمشترين','hi':'खरीदारों के लिए','pt':'Para Compradores','fr':'Pour les Acheteurs','ja':'バイヤー向け'},
  'For Sellers': {'es':'Para Vendedores','ar':'للبائعين','hi':'विक्रेताओं के लिए','pt':'Para Vendedores','fr':'Pour les Vendeurs','ja':'セラー向け'},
  'SSP — Supply-Side Platform': {'es':'SSP — Plataforma del Lado de la Oferta','ar':'SSP — منصة جانب العرض','hi':'SSP — सप्लाई-साइड प्लेटफॉर्म','pt':'SSP — Plataforma do Lado da Oferta','fr':'SSP — Plateforme Côté Offre','ja':'SSP — サプライサイドプラットフォーム'},
  'Monetization Features': {'es':'Funciones de Monetización','ar':'ميزات تحقيق الربح','hi':'मोनेटाइज़ेशन सुविधाएं','pt':'Recursos de Monetização','fr':'Fonctionnalités de Monétisation','ja':'収益化機能'},
  'Quick Integration': {'es':'Integración Rápida','ar':'تكامل سريع','hi':'त्वरित एकीकरण','pt':'Integração Rápida','fr':'Intégration Rapide','ja':'クイックインテグレーション'},
  'Our Principles': {'es':'Nuestros Principios','ar':'مبادئنا','hi':'हमारे सिद्धांत','pt':'Nossos Princípios','fr':'Nos Principes','ja':'私たちの原則'},
  'AI & Machine Learning': {'es':'IA y Aprendizaje Automático','ar':'الذكاء الاصطناعي والتعلم الآلي','hi':'एआई और मशीन लर्निंग','pt':'IA e Aprendizado de Máquina','fr':'IA et Apprentissage Automatique','ja':'AIと機械学習'},
  'RTB Infrastructure': {'es':'Infraestructura RTB','ar':'بنية تحتية RTB','hi':'RTB बुनियादी ढांचा','pt':'Infraestrutura RTB','fr':'Infrastructure RTB','ja':'RTBインフラ'},
  'RTB Auction Flow': {'es':'Flujo de Subasta RTB','ar':'تدفق مزاد RTB','hi':'RTB नीलामी प्रवाह','pt':'Fluxo de Leilão RTB','fr':'Flux d\'Enchères RTB','ja':'RTBオークションフロー'},
  'Privacy & Security': {'es':'Privacidad y Seguridad','ar':'الخصوصية والأمان','hi':'गोपनीयता और सुरक्षा','pt':'Privacidade e Segurança','fr':'Confidentialité et Sécurité','ja':'プライバシーとセキュリティ'},
  'Advertiser Cases': {'es':'Casos de Anunciantes','ar':'حالات المعلنين','hi':'विज्ञापनदाता केस','pt':'Casos de Anunciantes','fr':'Cas Annonceurs','ja':'広告主事例'},
  'Publisher & Developer Cases': {'es':'Casos de Publicadores y Desarrolladores','ar':'حالات الناشرين والمطورين','hi':'प्रकाशक और डेवलपर केस','pt':'Casos de Publicadores e Desenvolvedores','fr':'Cas Éditeurs et Développeurs','ja':'パブリッシャー・開発者事例'},
  'Publisher Cases': {'es':'Casos de Publicadores','ar':'حالات الناشرين','hi':'प्रकाशक केस','pt':'Casos de Publicadores','fr':'Cas Éditeurs','ja':'パブリッシャー事例'},
  'NexBids Company': {'es':'Empresa NexBids','ar':'شركة NexBids','hi':'NexBids कंपनी','pt':'Empresa NexBids','fr':'Société NexBids','ja':'NexBids社'},
  'Our Story': {'es':'Nuestra Historia','ar':'قصتنا','hi':'हमारी कहानी','pt':'Nossa História','fr':'Notre Histoire','ja':'私たちのストーリー'},
  'Company Timeline': {'es':'Cronología de la Empresa','ar':'الجدول الزمني للشركة','hi':'कंपनी टाइमलाइन','pt':'Linha do Tempo da Empresa','fr':'Chronologie de l\'Entreprise','ja':'会社の歩み'},
  'Mission & Values': {'es':'Misión y Valores','ar':'المهمة والقيم','hi':'मिशन और मूल्य','pt':'Missão e Valores','fr':'Mission et Valeurs','ja':'ミッションと価値観'},
  'Leadership Team': {'es':'Equipo Directivo','ar':'فريق القيادة','hi':'नेतृत्व टीम','pt':'Equipe de Liderança','fr':'Équipe de Direction','ja':'リーダーシップチーム'},
  'Global Presence': {'es':'Presencia Global','ar':'الحضور العالمي','hi':'वैश्विक उपस्थिति','pt':'Presença Global','fr':'Présence Mondiale','ja':'グローバルプレゼンス'},
  'Recognition': {'es':'Reconocimiento','ar':'التقدير','hi':'मान्यता','pt':'Reconhecimento','fr':'Reconnaissance','ja':'受賞・評価'},
  'Why NexBids?': {'es':'¿Por Qué NexBids?','ar':'لماذا NexBids؟','hi':'NexBids क्यों?','pt':'Por Que NexBids?','fr':'Pourquoi NexBids ?','ja':'なぜNexBids？'},
  'Open Positions': {'es':'Puestos Abiertos','ar':'الوظائف المتاحة','hi':'खुले पद','pt':'Vagas Abertas','fr':'Postes Ouverts','ja':'募集ポジション'},
  'Hiring Process': {'es':'Proceso de Contratación','ar':'عملية التوظيف','hi':'भर्ती प्रक्रिया','pt':'Processo Seletivo','fr':'Processus de Recrutement','ja':'採用プロセス'},
  # Metric labels
  'Annual Ad Spend Managed': {'es':'Gasto Publicitario Anual Gestionado','ar':'الإنفاق الإعلاني السنوي المُدار','hi':'वार्षिक विज्ञापन व्यय प्रबंधित','pt':'Gasto Anual em Publicidade Gerenciado','fr':'Dépenses Publicitaires Annuelles Gérées','ja':'年間広告支出管理額'},
  'Daily Bid Requests': {'es':'Solicitudes de Puja Diarias','ar':'طلبات المزايدة اليومية','hi':'दैनिक बोली अनुरोध','pt':'Solicitações de Lance Diárias','fr':'Demandes d\'Enchères Quotidiennes','ja':'1日あたりの入札リクエスト'},
  'Countries & Territories': {'es':'Países y Territorios','ar':'الدول والأقاليم','hi':'देश और क्षेत्र','pt':'Países e Territórios','fr':'Pays et Territoires','ja':'国・地域'},
  'Platform Uptime SLA': {'es':'SLA de Tiempo de Actividad','ar':'اتفاقية مستوى الخدمة للتوفر','hi':'प्लेटफॉर्म अपटाइम SLA','pt':'SLA de Disponibilidade da Plataforma','fr':'SLA de Disponibilité Plateforme','ja':'プラットフォーム稼働率SLA'},
  'Bid Response Time': {'es':'Tiempo de Respuesta de Puja','ar':'وقت استجابة المزايدة','hi':'बोली प्रतिक्रिया समय','pt':'Tempo de Resposta do Lance','fr':'Temps de Réponse aux Enchères','ja':'入札レスポンス時間'},
  'Platform Uptime': {'es':'Disponibilidad de la Plataforma','ar':'وقت تشغيل المنصة','hi':'प्लेटफॉर्म अपटाइम','pt':'Disponibilidade da Plataforma','fr':'Disponibilité de la Plateforme','ja':'プラットフォーム稼働率'},
  'Data Centers': {'es':'Centros de Datos','ar':'مراكز البيانات','hi':'डेटा केंद्र','pt':'Centros de Dados','fr':'Centres de Données','ja':'データセンター'},
  'Avg ROAS Improvement Year 1': {'es':'Mejora Promedio de ROAS Año 1','ar':'متوسط تحسين ROAS في السنة الأولى','hi':'पहले वर्ष औसत ROAS सुधार','pt':'Melhoria Média de ROAS no Ano 1','fr':'Amélioration Moyenne du ROAS en An 1','ja':'初年度平均ROAS改善'},
  'Average CPA Reduction': {'es':'Reducción Promedio de CPA','ar':'متوسط تخفيض تكلفة الاكتساب','hi':'औसत CPA कमी','pt':'Redução Média de CPA','fr':'Réduction Moyenne du CPA','ja':'平均CPA削減率'},
  'Ad Formats Supported': {'es':'Formatos de Anuncios Soportados','ar':'صيغ الإعلانات المدعومة','hi':'समर्थित विज्ञापन प्रारूप','pt':'Formatos de Anúncios Suportados','fr':'Formats Publicitaires Supportés','ja':'対応広告フォーマット数'},
  'Avg eCPM Lift for New Publishers': {'es':'Aumento Prom. de eCPM para Nuevos Pub.','ar':'متوسط ارتفاع eCPM للناشرين الجدد','hi':'नए प्रकाशकों के लिए औसत eCPM वृद्धि','pt':'Aumento Médio de eCPM para Novos Pub.','fr':'Hausse eCPM Moy. pour Nouveaux Éditeurs','ja':'新規PV平均eCPM向上率'},
  'Active Publishers': {'es':'Publicadores Activos','ar':'الناشرون النشطون','hi':'सक्रिय प्रकाशक','pt':'Publicadores Ativos','fr':'Éditeurs Actifs','ja':'アクティブパブリッシャー'},
  'Connected Advertisers': {'es':'Anunciantes Conectados','ar':'المعلنون المتصلون','hi':'जुड़े हुए विज्ञापनदाता','pt':'Anunciantes Conectados','fr':'Annonceurs Connectés','ja':'接続済み広告主'},
  'Average Fill Rate': {'es':'Tasa de Llenado Promedio','ar':'متوسط معدل الملء','hi':'औसत भरण दर','pt':'Taxa de Preenchimento Média','fr':'Taux de Remplissage Moyen','ja':'平均フィルレート'},
  'Active Advertisers': {'es':'Anunciantes Activos','ar':'المعلنون النشطون','hi':'सक्रिय विज्ञापनदाता','pt':'Anunciantes Ativos','fr':'Annonceurs Actifs','ja':'アクティブ広告主'},
  'Latency': {'es':'Latencia','ar':'زمن الاستجابة','hi':'लेटेंसी','pt':'Latência','fr':'Latence','ja':'レイテンシ'},
  'Bid Win Transparency': {'es':'Transparencia de Ganancias de Puja','ar':'شفافية الفوز بالمزايدة','hi':'बोली जीत पारदर्शिता','pt':'Transparência de Ganhos de Lance','fr':'Transparence des Victoires d\'Enchères','ja':'落札透明性'},
  'Integrated Partners': {'es':'Socios Integrados','ar':'الشركاء المتكاملون','hi':'एकीकृत भागीदार','pt':'Parceiros Integrados','fr':'Partenaires Intégrés','ja':'連携パートナー数'},
  'Audience Segments': {'es':'Segmentos de Audiencia','ar':'شرائح الجمهور','hi':'ऑडिएंस सेगमेंट','pt':'Segmentos de Audiência','fr':'Segments d\'Audience','ja':'オーディエンスセグメント'},
  'Countries Covered': {'es':'Países Cubiertos','ar':'الدول المشمولة','hi':'कवर किए गए देश','pt':'Países Cobertos','fr':'Pays Couverts','ja':'対応国数'},
  'Bid Response SLA': {'es':'SLA de Respuesta de Puja','ar':'اتفاقية مستوى خدمة استجابة المزايدة','hi':'बोली प्रतिक्रिया SLA','pt':'SLA de Resposta de Lance','fr':'SLA de Réponse aux Enchères','ja':'入札レスポンスSLA'},
  'Bid Transparency': {'es':'Transparencia de Pujas','ar':'شفافية المزايدة','hi':'बोली पारदर्शिता','pt':'Transparência de Lances','fr':'Transparence des Enchères','ja':'入札透明性'},
  'Avg eCPM Improvement': {'es':'Mejora Promedio de eCPM','ar':'متوسط تحسين eCPM','hi':'औसत eCPM सुधार','pt':'Melhoria Média de eCPM','fr':'Amélioration Moyenne eCPM','ja':'平均eCPM改善率'},
  'Fill Rate Average': {'es':'Tasa de Llenado Promedio','ar':'متوسط معدل الملء','hi':'औसत भरण दर','pt':'Taxa de Preenchimento Média','fr':'Taux de Remplissage Moyen','ja':'平均フィルレート'},
  'Publisher Revenue Managed': {'es':'Ingresos de Publicadores Gestionados','ar':'إيرادات الناشرين المُدارة','hi':'प्रकाशक राजस्व प्रबंधित','pt':'Receita de Publicadores Gerenciada','fr':'Revenus Éditeurs Gérés','ja':'パブリッシャー収益管理額'},
  'Global Data Center Regions': {'es':'Regiones Globales de Centros de Datos','ar':'مناطق مراكز البيانات العالمية','hi':'वैश्विक डेटा केंद्र क्षेत्र','pt':'Regiões Globais de Data Centers','fr':'Régions de Centres de Données Mondiaux','ja':'グローバルデータセンター地域数'},
  'Global PoP Network': {'es':'Red Global de PoP','ar':'شبكة PoP العالمية','hi':'ग्लोबल PoP नेटवर्क','pt':'Rede Global de PoP','fr':'Réseau PoP Mondial','ja':'グローバルPoPネットワーク'},
  'Sub-100ms Processing': {'es':'Procesamiento Sub-100ms','ar':'معالجة أقل من 100ms','hi':'100ms से कम प्रोसेसिंग','pt':'Processamento Sub-100ms','fr':'Traitement Inférieur à 100ms','ja':'100ms未満の処理速度'},
  # CTA band headers
  'Not Sure Where to Start?': {'es':'¿No Sabe Por Dónde Empezar?','ar':'لست متأكداً من أين تبدأ؟','hi':'शुरुआत कहाँ से करें?','pt':'Não Sabe Por Onde Começar?','fr':'Vous Ne Savez Pas Par Où Commencer?','ja':'どこから始めたらいいかわからない？'},
  'Ready to Scale Your Campaigns?': {'es':'¿Listo para Escalar Sus Campañas?','ar':'هل أنت مستعد لتوسيع حملاتك؟','hi':'अपने अभियान बढ़ाने के लिए तैयार?','pt':'Pronto para Escalar Suas Campanhas?','fr':'Prêt à Faire Évoluer Vos Campagnes?','ja':'キャンペーンを拡大する準備はできていますか？'},
  'Ready to Grow Your Revenue?': {'es':'¿Listo para Aumentar Sus Ingresos?','ar':'هل أنت مستعد لزيادة إيراداتك؟','hi':'अपना राजस्व बढ़ाने के लिए तैयार?','pt':'Pronto para Aumentar Sua Receita?','fr':'Prêt à Augmenter Vos Revenus?','ja':'収益を拡大する準備はできていますか？'},
  'Become a NexBids Agency Partner': {'es':'Conviértase en Socio de Agencia NexBids','ar':'كن شريك وكالة NexBids','hi':'NexBids एजेंसी पार्टनर बनें','pt':'Torne-se um Parceiro de Agência NexBids','fr':'Devenez Partenaire Agence NexBids','ja':'NexBids代理店パートナーになる'},
  'Start Your First DSP Campaign': {'es':'Inicie Su Primera Campaña DSP','ar':'ابدأ حملتك الأولى على DSP','hi':'अपना पहला DSP अभियान शुरू करें','pt':'Inicie Sua Primeira Campanha DSP','fr':'Démarrez Votre Première Campagne DSP','ja':'最初のDSPキャンペーンを開始する'},
  'Integrate with NexBids ADX': {'es':'Intégrese con NexBids ADX','ar':'تكامل مع NexBids ADX','hi':'NexBids ADX के साथ एकीकृत करें','pt':'Integre com o NexBids ADX','fr':'Intégrez avec NexBids ADX','ja':'NexBids ADXと連携する'},
  'Ready to Maximize Your Revenue?': {'es':'¿Listo para Maximizar Sus Ingresos?','ar':'هل أنت مستعد لزيادة إيراداتك إلى أقصى حد؟','hi':'अपना राजस्व अधिकतम करने के लिए तैयार?','pt':'Pronto para Maximizar Sua Receita?','fr':'Prêt à Maximiser Vos Revenus?','ja':'収益を最大化する準備はできていますか？'},
  'Want to Go Deeper?': {'es':'¿Quiere Profundizar?','ar':'هل تريد التعمق أكثر؟','hi':'और गहराई से जानना चाहते हैं?','pt':'Quer Se Aprofundar?','fr':'Vous Voulez Aller Plus Loin?','ja':'さらに詳しく知りたいですか？'},
  'Want Results Like These?': {'es':'¿Quiere Resultados Como Estos?','ar':'هل تريد نتائج كهذه؟','hi':'ऐसे परिणाम चाहते हैं?','pt':'Quer Resultados Como Estes?','fr':'Vous Voulez des Résultats Comme Ceux-ci?','ja':'このような成果を望みますか？'},
  'Ready to Write Your Own Success Story?': {'es':'¿Listo para Escribir Su Propia Historia de Éxito?','ar':'هل أنت مستعد لكتابة قصة نجاحك الخاصة؟','hi':'अपनी सफलता की कहानी लिखने के लिए तैयार?','pt':'Pronto para Escrever Sua Própria História de Sucesso?','fr':'Prêt à Écrire Votre Propre Histoire à Succès?','ja':'あなたの成功ストーリーを書く準備はできていますか？'},
  'Ready to Work with NexBids?': {'es':'¿Listo para Trabajar con NexBids?','ar':'هل أنت مستعد للعمل مع NexBids؟','hi':'NexBids के साथ काम करने के लिए तैयार?','pt':'Pronto para Trabalhar com a NexBids?','fr':'Prêt à Travailler avec NexBids?','ja':'NexBidsと一緒に仕事をする準備はできていますか？'},
  'Ready to Transform Your Advertising?': {'es':'¿Listo para Transformar Su Publicidad?','ar':'هل أنت مستعد لتحويل إعلاناتك؟','hi':'अपनी विज्ञापन को बदलने के लिए तैयार?','pt':'Pronto para Transformar Sua Publicidade?','fr':'Prêt à Transformer Votre Publicité?','ja':'広告を変革する準備はできていますか？'},
  # CTA band subheadings and button text
  'Join 50,000+ advertisers and 30,000+ publishers already using NexBids to drive growth.': {'es':'Únase a más de 50,000 anunciantes y 30,000 publicadores que ya usan NexBids para impulsar el crecimiento.','ar':'انضم إلى أكثر من 50,000 معلن و30,000 ناشر يستخدمون NexBids بالفعل لتحقيق النمو.','hi':'50,000+ विज्ञापनदाताओं और 30,000+ प्रकाशकों से जुड़ें जो पहले से NexBids का उपयोग कर रहे हैं।','pt':'Junte-se a mais de 50.000 anunciantes e 30.000 publicadores que já usam o NexBids para crescer.','fr':'Rejoignez plus de 50 000 annonceurs et 30 000 éditeurs qui utilisent déjà NexBids pour stimuler leur croissance.','ja':'すでにNexBidsを使って成長を加速している50,000人以上の広告主と30,000人以上のパブリッシャーに参加しましょう。'},
  'Start for Free': {'es':'Comenzar Gratis','ar':'ابدأ مجاناً','hi':'मुफ्त में शुरू करें','pt':'Comece Gratuitamente','fr':'Commencer Gratuitement','ja':'無料で始める'},
  'Talk to Sales': {'es':'Hablar con Ventas','ar':'تحدث مع المبيعات','hi':'सेल्स से बात करें','pt':'Falar com Vendas','fr':'Parler aux Ventes','ja':'営業に問い合わせる'},
  'Our team will help identify the right NexBids solution for your business goals.': {'es':'Nuestro equipo le ayudará a identificar la solución NexBids adecuada para sus objetivos.','ar':'سيساعدك فريقنا في تحديد حل NexBids المناسب لأهداف عملك.','hi':'हमारी टीम आपके व्यावसायिक लक्ष्यों के लिए सही NexBids समाधान खोजने में मदद करेगी।','pt':'Nossa equipe ajudará a identificar a solução NexBids certa para seus objetivos de negócios.','fr':'Notre équipe vous aidera à identifier la bonne solution NexBids pour vos objectifs commerciaux.','ja':'私たちのチームが、あなたのビジネス目標に最適なNexBidsソリューションを見つけるお手伝いをします。'},
  'View Products': {'es':'Ver Productos','ar':'عرض المنتجات','hi':'उत्पाद देखें','pt':'Ver Produtos','fr':'Voir les Produits','ja':'製品を見る'},
  'Start with a free account or talk to our team about managed service options.': {'es':'Comience con una cuenta gratuita o hable con nuestro equipo sobre opciones de servicio administrado.','ar':'ابدأ بحساب مجاني أو تحدث مع فريقنا حول خيارات الخدمة المُدارة.','hi':'एक मुफ्त खाते से शुरू करें या हमारी टीम से प्रबंधित सेवा विकल्पों के बारे में बात करें।','pt':'Comece com uma conta gratuita ou converse com nossa equipe sobre opções de serviço gerenciado.','fr':'Commencez avec un compte gratuit ou parlez à notre équipe des options de service géré.','ja':'無料アカウントから始めるか、マネージドサービスについてチームにご相談ください。'},
  'Create Free Account': {'es':'Crear Cuenta Gratuita','ar':'إنشاء حساب مجاني','hi':'मुफ्त खाता बनाएं','pt':'Criar Conta Gratuita','fr':'Créer un Compte Gratuit','ja':'無料アカウントを作成'},
  'Join 30,000+ publishers already maximizing revenue with NexBids SSP.': {'es':'Únase a más de 30,000 publicadores que ya maximizan sus ingresos con NexBids SSP.','ar':'انضم إلى أكثر من 30,000 ناشر يعظّمون إيراداتهم بالفعل مع NexBids SSP.','hi':'30,000+ प्रकाशकों से जुड़ें जो पहले से NexBids SSP से राजस्व अधिकतम कर रहे हैं।','pt':'Junte-se a mais de 30.000 publicadores que já maximizam receita com NexBids SSP.','fr':'Rejoignez plus de 30 000 éditeurs qui maximisent déjà leurs revenus avec NexBids SSP.','ja':'すでにNexBids SSPで収益を最大化している30,000人以上のパブリッシャーに参加しましょう。'},
  'Explore SSP': {'es':'Explorar SSP','ar':'استكشاف SSP','hi':'SSP एक्सप्लोर करें','pt':'Explorar SSP','fr':'Explorer SSP','ja':'SSPを探索する'},
  'Apply today to access volume pricing, white-label options, and dedicated agency support.': {'es':'Aplique hoy para acceder a precios por volumen, opciones de marca blanca y soporte dedicado.','ar':'قدّم طلبك اليوم للوصول إلى أسعار الحجم والخيارات ذات العلامة البيضاء والدعم المخصص للوكالات.','hi':'वॉल्यूम प्राइसिंग, व्हाइट-लेबल विकल्पों और समर्पित एजेंसी सहायता के लिए आज आवेदन करें।','pt':'Candidate-se hoje para acessar preços por volume, opções de white-label e suporte dedicado.','fr':'Candidatez aujourd\'hui pour accéder aux tarifs de volume, aux options white-label et au support agence dédié.','ja':'ボリュームプライシング、ホワイトラベルオプション、専任エージェンシーサポートにアクセスするために今すぐ申し込む。'},
  'Apply Now': {'es':'Aplicar Ahora','ar':'قدّم الآن','hi':'अभी आवेदन करें','pt':'Candidatar-se Agora','fr':'Postuler Maintenant','ja':'今すぐ申し込む'},
  'View Case Studies': {'es':'Ver Casos de Estudio','ar':'عرض دراسات الحالة','hi':'केस स्टडी देखें','pt':'Ver Estudos de Caso','fr':'Voir les Études de Cas','ja':'事例を見る'},
  'Set up your account in minutes and launch your first programmatic campaign today.': {'es':'Configure su cuenta en minutos y lance su primera campaña programática hoy.','ar':'قم بإعداد حسابك في دقائق وأطلق حملتك البرمجية الأولى اليوم.','hi':'कुछ मिनटों में अपना खाता सेट करें और आज अपना पहला प्रोग्रामेटिक अभियान लॉन्च करें।','pt':'Configure sua conta em minutos e lance sua primeira campanha programática hoje.','fr':'Configurez votre compte en quelques minutes et lancez votre première campagne programmatique aujourd\'hui.','ja':'数分でアカウントを設定し、今日初めてのプログラマティックキャンペーンを開始しましょう。'},
  'Buyer or seller — our integration team will have you live in days.': {'es':'Comprador o vendedor — nuestro equipo de integración le pondrá en marcha en días.','ar':'مشترياً أو بائعاً — سيجعلك فريق التكامل لدينا جاهزاً في أيام.','hi':'खरीदार या विक्रेता — हमारी एकीकरण टीम आपको दिनों में लाइव कर देगी।','pt':'Comprador ou vendedor — nossa equipe de integração o colocará ao vivo em dias.','fr':'Acheteur ou vendeur — notre équipe d\'intégration vous mettra en ligne en quelques jours.','ja':'バイヤーでもセラーでも、統合チームが数日で稼働させます。'},
  'Start Integration': {'es':'Iniciar Integración','ar':'بدء التكامل','hi':'एकीकरण शुरू करें','pt':'Iniciar Integração','fr':'Démarrer l\'Intégration','ja':'インテグレーションを開始'},
  'View API Docs': {'es':'Ver Documentación API','ar':'عرض مستندات API','hi':'API दस्तावेज़ देखें','pt':'Ver Documentação da API','fr':'Voir la Documentation API','ja':'APIドキュメントを見る'},
  'Join 30,000+ publishers using NexBids SSP. Get started in minutes.': {'es':'Únase a más de 30,000 publicadores con NexBids SSP. Comience en minutos.','ar':'انضم إلى أكثر من 30,000 ناشر يستخدمون NexBids SSP. ابدأ في دقائق.','hi':'NexBids SSP का उपयोग करने वाले 30,000+ प्रकाशकों से जुड़ें। मिनटों में शुरू करें।','pt':'Junte-se a mais de 30.000 publicadores usando o NexBids SSP. Comece em minutos.','fr':'Rejoignez plus de 30 000 éditeurs utilisant NexBids SSP. Démarrez en quelques minutes.','ja':'NexBids SSPを使用する30,000人以上のパブリッシャーに参加しましょう。数分で始められます。'},
  'View Integration Docs': {'es':'Ver Documentación de Integración','ar':'عرض مستندات التكامل','hi':'एकीकरण दस्तावेज़ देखें','pt':'Ver Documentação de Integração','fr':'Voir la Documentation d\'Intégration','ja':'統合ドキュメントを見る'},
  'Our engineering team is happy to discuss the technical details of our infrastructure and integration options.': {'es':'Nuestro equipo de ingeniería está feliz de discutir los detalles técnicos.','ar':'يسعد فريق هندستنا مناقشة التفاصيل التقنية لبنيتنا التحتية وخيارات التكامل.','hi':'हमारी इंजीनियरिंग टीम बुनियादी ढांचे और एकीकरण विकल्पों के तकनीकी विवरण पर चर्चा करने में खुश है।','pt':'Nossa equipe de engenharia está feliz em discutir os detalhes técnicos da nossa infraestrutura.','fr':'Notre équipe d\'ingénierie est heureuse de discuter des détails techniques de notre infrastructure.','ja':'私たちのエンジニアリングチームは、インフラの技術的詳細や統合オプションについて喜んでご説明します。'},
  'Talk to Engineering': {'es':'Hablar con Ingeniería','ar':'تحدث مع الهندسة','hi':'इंजीनियरिंग से बात करें','pt':'Falar com a Engenharia','fr':'Parler à l\'Ingénierie','ja':'エンジニアリングに問い合わせる'},
  'Join thousands of advertisers and publishers already achieving breakthrough growth with NexBids.': {'es':'Únase a miles de anunciantes y publicadores que ya logran un crecimiento sin precedentes con NexBids.','ar':'انضم إلى آلاف المعلنين والناشرين الذين يحققون بالفعل نمواً استثنائياً مع NexBids.','hi':'हजारों विज्ञापनदाताओं और प्रकाशकों से जुड़ें जो NexBids के साथ असाधारण वृद्धि हासिल कर रहे हैं।','pt':'Junte-se a milhares de anunciantes e publicadores que já alcançam crescimento excepcional com NexBids.','fr':'Rejoignez des milliers d\'annonceurs et d\'éditeurs qui réalisent déjà une croissance exceptionnelle avec NexBids.','ja':'NexBidsで画期的な成長を達成している何千もの広告主とパブリッシャーに参加しましょう。'},
  'Talk to our team about how NexBids can drive results for your campaigns.': {'es':'Hable con nuestro equipo sobre cómo NexBids puede impulsar resultados para sus campañas.','ar':'تحدث مع فريقنا حول كيفية تحقيق NexBids لنتائج حملاتك.','hi':'हमारी टीम से बात करें कि NexBids आपके अभियानों के लिए परिणाम कैसे ला सकता है।','pt':'Fale com nossa equipe sobre como o NexBids pode impulsionar resultados para suas campanhas.','fr':'Parlez à notre équipe de la façon dont NexBids peut générer des résultats pour vos campagnes.','ja':'NexBidsがあなたのキャンペーンにどのような成果をもたらせるか、チームにお問い合わせください。'},
  'Contact Advertiser Sales': {'es':'Contactar Ventas para Anunciantes','ar':'التواصل مع مبيعات المعلنين','hi':'विज्ञापनदाता बिक्री से संपर्क करें','pt':'Contatar Vendas para Anunciantes','fr':'Contacter les Ventes Annonceurs','ja':'広告主営業に連絡'},
  'Explore DSP': {'es':'Explorar DSP','ar':'استكشاف DSP','hi':'DSP एक्सप्लोर करें','pt':'Explorar DSP','fr':'Explorer DSP','ja':'DSPを探索する'},
  'Join 30,000+ publishers maximizing revenue with NexBids SSP.': {'es':'Únase a más de 30,000 publicadores que maximizan sus ingresos con NexBids SSP.','ar':'انضم إلى أكثر من 30,000 ناشر يعظّمون إيراداتهم مع NexBids SSP.','hi':'30,000+ प्रकाशकों से जुड़ें जो NexBids SSP से राजस्व अधिकतम कर रहे हैं।','pt':'Junte-se a mais de 30.000 publicadores que maximizam receita com NexBids SSP.','fr':'Rejoignez plus de 30 000 éditeurs qui maximisent leurs revenus avec NexBids SSP.','ja':'NexBids SSPで収益を最大化している30,000人以上のパブリッシャーに参加しましょう。'},
  "Whether you\\'re looking to start a campaign, monetize your traffic, or partner with us — we\\'d love to hear from you.": {'es':'Ya sea que quiera iniciar una campaña, monetizar su tráfico o asociarse con nosotros, nos encantaría saber de usted.','ar':'سواء كنت تتطلع إلى بدء حملة أو تحقيق الدخل من حركة مرورك أو الشراكة معنا — نود أن نسمع منك.','hi':'चाहे आप एक अभियान शुरू करना चाहते हों, अपने ट्रैफिक से कमाई करना चाहते हों, या हमारे साथ साझेदारी करना चाहते हों — हम आपसे सुनना चाहेंगे।','pt':'Seja para iniciar uma campanha, monetizar seu tráfego ou se tornar parceiro — adoraríamos ouvir de você.','fr':'Que vous souhaitiez lancer une campagne, monétiser votre trafic ou nous rejoindre en tant que partenaire — nous adorons vous entendre.','ja':'キャンペーンの開始、トラフィックの収益化、またはパートナーシップについて — ぜひご連絡ください。'},
  'Contact Our Team': {'es':'Contactar a Nuestro Equipo','ar':'التواصل مع فريقنا','hi':'हमारी टीम से संपर्क करें','pt':'Contatar Nossa Equipe','fr':'Contacter Notre Équipe','ja':'チームに連絡する'},
  # About / Careers
  'Advertiser Revenue Driven': {'es':'Ingresos de Anunciantes Generados','ar':'إيرادات المعلنين المحققة','hi':'विज्ञापनदाता राजस्व संचालित','pt':'Receita de Anunciantes Gerada','fr':'Revenus Annonceurs Générés','ja':'広告主収益創出額'},
  'Avg eCPM Lift for Publishers': {'es':'Aumento Prom. de eCPM para Publicadores','ar':'متوسط ارتفاع eCPM للناشرين','hi':'प्रकाशकों के लिए औसत eCPM वृद्धि','pt':'Aumento Médio de eCPM para Publicadores','fr':'Hausse eCPM Moy. pour Éditeurs','ja':'パブリッシャー平均eCPM向上率'},
  'Case Studies Globally': {'es':'Casos de Estudio a Nivel Global','ar':'دراسات الحالة على مستوى العالم','hi':'विश्वव्यापी केस स्टडीज','pt':'Estudos de Caso Globalmente','fr':'Études de Cas Mondiales','ja':'グローバル事例数'},
  'Employees': {'es':'Empleados','ar':'الموظفون','hi':'कर्मचारी','pt':'Funcionários','fr':'Employés','ja':'従業員数'},
  'Global Offices': {'es':'Oficinas Globales','ar':'المكاتب العالمية','hi':'वैश्विक कार्यालय','pt':'Escritórios Globais','fr':'Bureaux Mondiaux','ja':'グローバルオフィス'},
  'Countries Served': {'es':'Países Atendidos','ar':'الدول المخدومة','hi':'सेवित देश','pt':'Países Atendidos','fr':'Pays Desservis','ja':'サービス提供国'},
  'Team Size': {'es':'Tamaño del Equipo','ar':'حجم الفريق','hi':'टीम का आकार','pt':'Tamanho da Equipe','fr':'Taille de l\'Équipe','ja':'チーム規模'},
  'Nationalities': {'es':'Nacionalidades','ar':'الجنسيات','hi':'राष्ट्रीयताएं','pt':'Nacionalidades','fr':'Nationalités','ja':'国籍数'},
  'Hard Problems at Scale': {'es':'Problemas Difíciles a Gran Escala','ar':'مشاكل صعبة على نطاق واسع','hi':'बड़े पैमाने पर कठिन समस्याएं','pt':'Problemas Difíceis em Escala','fr':'Problèmes Complexes à Grande Échelle','ja':'大規模な難題'},
  'International Team': {'es':'Equipo Internacional','ar':'فريق دولي','hi':'अंतर्राष्ट्रीय टीम','pt':'Equipe Internacional','fr':'Équipe Internationale','ja':'インターナショナルチーム'},
  'Growth Stage': {'es':'Etapa de Crecimiento','ar':'مرحلة النمو','hi':'विकास चरण','pt':'Estágio de Crescimento','fr':'Phase de Croissance','ja':'成長フェーズ'},
  '$2K Learning Budget': {'es':'Presupuesto de Aprendizaje $2K','ar':'ميزانية تعلم $2K','hi':'$2K सीखने का बजट','pt':'Orçamento de Aprendizagem $2K','fr':'Budget Formation $2K','ja':'$2K学習予算'},
  'Competitive Equity': {'es':'Equity Competitivo','ar':'حقوق ملكية تنافسية','hi':'प्रतिस्पर्धी इक्विटी','pt':'Equity Competitivo','fr':'Equity Compétitif','ja':'競争力ある株式報酬'},
  'Founded': {'es':'Fundada','ar':'تأسست','hi':'स्थापना','pt':'Fundada','fr':'Fondée','ja':'設立'},
  'Funding Raised': {'es':'Financiación Recaudada','ar':'التمويل المُجمَّع','hi':'जुटाई गई फंडिंग','pt':'Financiamento Captado','fr':'Financement Levé','ja':'調達資金'},
  'Employees Globally': {'es':'Empleados en todo el Mundo','ar':'موظفون على مستوى العالم','hi':'वैश्विक कर्मचारी','pt':'Funcionários em Todo o Mundo','fr':'Employés dans le Monde','ja':'グローバル従業員数'},
  'Founded in San Francisco': {'es':'Fundada en San Francisco','ar':'تأسست في سان فرانسيسكو','hi':'सैन फ्रांसिस्को में स्थापित','pt':'Fundada em San Francisco','fr':'Fondée à San Francisco','ja':'サンフランシスコで設立'},
  'Launched DSP + ADX globally': {'es':'DSP + ADX lanzados globalmente','ar':'إطلاق DSP + ADX على مستوى العالم','hi':'DSP + ADX को वैश्विक स्तर पर लॉन्च किया','pt':'DSP + ADX lançados globalmente','fr':'DSP + ADX lancés mondialement','ja':'DSP + ADXをグローバル展開'},
  '50B daily auctions milestone': {'es':'Hito de 50B subastas diarias','ar':'علامة 50 مليار مزاد يومي','hi':'50B दैनिक नीलामी का मील का पत्थर','pt':'Marco de 50B leilões diários','fr':'Jalon de 50B enchères quotidiennes','ja':'1日500億回入札マイルストーン'},
  '150+ countries, $2B+ revenue driven': {'es':'150+ países, $2B+ ingresos generados','ar':'150+ دولة، أكثر من $2B إيرادات محققة','hi':'150+ देश, $2B+ राजस्व अर्जित','pt':'150+ países, $2B+ de receita gerada','fr':'150+ pays, $2B+ de revenus générés','ja':'150か国以上、20億ドル以上の収益創出'},
  'Full-stack ecosystem, 500+ team': {'es':'Ecosistema completo, equipo de 500+','ar':'نظام بيئي متكامل، فريق من 500+','hi':'फुल-स्टैक इकोसिस्टम, 500+ टीम','pt':'Ecossistema completo, equipe de 500+','fr':'Écosystème complet, équipe de 500+','ja':'フルスタックエコシステム、500人以上のチーム'},
  'Partner Success First': {'es':'El Éxito del Socio es lo Primero','ar':'نجاح الشريك أولاً','hi':'पार्टनर सफलता सबसे पहले','pt':'Sucesso do Parceiro em Primeiro Lugar','fr':'Succès Partenaire en Premier','ja':'パートナーの成功を最優先'},
  'Radical Transparency': {'es':'Transparencia Radical','ar':'الشفافية الجذرية','hi':'आमूल पारदर्शिता','pt':'Transparência Radical','fr':'Transparence Radicale','ja':'根本的な透明性'},
  'Relentless Innovation': {'es':'Innovación Implacable','ar':'الابتكار الدؤوب','hi':'निरंतर नवाचार','pt':'Inovação Incansável','fr':'Innovation Sans Relâche','ja':'絶え間ないイノベーション'},
  'Global Perspective': {'es':'Perspectiva Global','ar':'منظور عالمي','hi':'वैश्विक दृष्टिकोण','pt':'Perspectiva Global','fr':'Perspective Mondiale','ja':'グローバルな視点'},
  'Application Review': {'es':'Revisión de Solicitud','ar':'مراجعة الطلب','hi':'आवेदन समीक्षा','pt':'Revisão de Candidatura','fr':'Examen de Candidature','ja':'書類選考'},
  'Intro Call': {'es':'Llamada Introductoria','ar':'مكالمة تعريفية','hi':'परिचय कॉल','pt':'Chamada Introdutória','fr':'Appel d\'Introduction','ja':'初回面談'},
  'Technical / Skills Interview': {'es':'Entrevista Técnica / de Habilidades','ar':'مقابلة تقنية / مهارات','hi':'तकनीकी / कौशल साक्षात्कार','pt':'Entrevista Técnica / de Habilidades','fr':'Entretien Technique / Compétences','ja':'技術・スキル面接'},
  'Team Interview': {'es':'Entrevista con el Equipo','ar':'مقابلة الفريق','hi':'टीम साक्षात्कार','pt':'Entrevista com a Equipe','fr':'Entretien d\'Équipe','ja':'チーム面接'},
  'Offer': {'es':'Oferta','ar':'العرض','hi':'ऑफर','pt':'Oferta','fr':'Offre','ja':'内定'},
  'Annual Spend': {'es':'Gasto Anual','ar':'الإنفاق السنوي','hi':'वार्षिक व्यय','pt':'Gasto Anual','fr':'Dépense Annuelle','ja':'年間支出'},
  'Partners': {'es':'Socios','ar':'الشركاء','hi':'साझेदार','pt':'Parceiros','fr':'Partenaires','ja':'パートナー'},
  # Stats/metrics that are text labels
  'ROAS Lift': {'es':'Mejora de ROAS','ar':'رفع ROAS','hi':'ROAS वृद्धि','pt':'Aumento de ROAS','fr':'Hausse ROAS','ja':'ROAS向上'},
  'CPA Reduction': {'es':'Reducción de CPA','ar':'تخفيض CPA','hi':'CPA कमी','pt':'Redução de CPA','fr':'Réduction CPA','ja':'CPA削減'},
  'Revenue Lift': {'es':'Mejora de Ingresos','ar':'رفع الإيرادات','hi':'राजस्व वृद्धि','pt':'Aumento de Receita','fr':'Hausse des Revenus','ja':'収益向上'},
  'eCPM Growth': {'es':'Crecimiento de eCPM','ar':'نمو eCPM','hi':'eCPM वृद्धि','pt':'Crescimento de eCPM','fr':'Croissance eCPM','ja':'eCPM成長'},
  'Global Cases': {'es':'Casos Globales','ar':'الحالات العالمية','hi':'वैश्विक केस','pt':'Casos Globais','fr':'Cas Mondiaux','ja':'グローバル事例'},
  'CPA Drop': {'es':'Caída de CPA','ar':'انخفاض CPA','hi':'CPA में गिरावट','pt':'Queda de CPA','fr':'Baisse CPA','ja':'CPA低下'},
  'Revenue': {'es':'Ingresos','ar':'الإيرادات','hi':'राजस्व','pt':'Receita','fr':'Revenus','ja':'収益'},
  'CPI': {'es':'CPI','ar':'تكلفة كل تثبيت','hi':'CPI','pt':'CPI','fr':'CPI','ja':'CPI'},
  'eCPM Lift': {'es':'Mejora de eCPM','ar':'رفع eCPM','hi':'eCPM वृद्धि','pt':'Aumento de eCPM','fr':'Hausse eCPM','ja':'eCPM向上'},
  'Fill Rate': {'es':'Tasa de Llenado','ar':'معدل الملء','hi':'भरण दर','pt':'Taxa de Preenchimento','fr':'Taux de Remplissage','ja':'フィルレート'},
  'Rev Tripled': {'es':'Ingresos Triplicados','ar':'تضاعفت الإيرادات ثلاثة أضعاف','hi':'राजस्व तीन गुना','pt':'Receita Triplicada','fr':'Revenus Triplés','ja':'収益3倍'},
  'CPA at Target': {'es':'CPA en Objetivo','ar':'CPA عند الهدف','hi':'लक्ष्य पर CPA','pt':'CPA no Alvo','fr':'CPA à l\'Objectif','ja':'目標CPA達成'},
  'Optimized': {'es':'Optimizado','ar':'تم التحسين','hi':'अनुकूलित','pt':'Otimizado','fr':'Optimisé','ja':'最適化済み'},
  'LTV Positive': {'es':'LTV Positivo','ar':'قيمة عمر العميل إيجابية','hi':'LTV सकारात्मक','pt':'LTV Positivo','fr':'LTV Positif','ja':'LTVプラス'},
  'Scaled Up': {'es':'Escalado','ar':'تم التوسع','hi':'स्केल अप','pt':'Escalado','fr':'Mis à l\'Échelle','ja':'スケールアップ'},
  'Maintained': {'es':'Mantenido','ar':'محافظ عليه','hi':'बनाए रखा','pt':'Mantido','fr':'Maintenu','ja':'維持'},
  'Improved': {'es':'Mejorado','ar':'تم التحسين','hi':'सुधरा','pt':'Melhorado','fr':'Amélioré','ja':'改善'},
  'Tripled': {'es':'Triplicado','ar':'تضاعف ثلاثة أضعاف','hi':'तीन गुना','pt':'Triplicado','fr':'Triplé','ja':'3倍'},
  # Ad format names
  'Native Ads': {'es':'Anuncios Nativos','ar':'الإعلانات الأصلية','hi':'नेटिव विज्ञापन','pt':'Anúncios Nativos','fr':'Publicités Natives','ja':'ネイティブ広告'},
  'Banner+Video': {'es':'Banner+Video','ar':'بانر+فيديو','hi':'बैनर+वीडियो','pt':'Banner+Vídeo','fr':'Bannière+Vidéo','ja':'バナー+動画'},
  'Rewarded': {'es':'Con Recompensa','ar':'مكافأة','hi':'रिवॉर्डेड','pt':'Recompensado','fr':'Récompensé','ja':'リワード'},
  # Account setup steps
  'Create Account': {'es':'Crear Cuenta','ar':'إنشاء حساب','hi':'खाता बनाएं','pt':'Criar Conta','fr':'Créer un Compte','ja':'アカウント作成'},
  'Add Your Inventory': {'es':'Añadir Su Inventario','ar':'أضف مخزونك','hi':'अपनी इन्वेंटरी जोड़ें','pt':'Adicionar Seu Inventário','fr':'Ajouter Votre Inventaire','ja':'インベントリを追加'},
  'Integrate': {'es':'Integrar','ar':'تكامل','hi':'एकीकृत करें','pt':'Integrar','fr':'Intégrer','ja':'連携する'},
  'Start Earning': {'es':'Empezar a Ganar','ar':'ابدأ الكسب','hi':'कमाई शुरू करें','pt':'Começar a Ganhar','fr':'Commencer à Gagner','ja':'収益化を始める'},
  # Timeline events
  'Founded — Core RTB infrastructure & ML foundation built.': {'es':'Fundación — Infraestructura RTB central y base de ML construida.','ar':'التأسيس — تم بناء بنية RTB الأساسية وأساس التعلم الآلي.','hi':'स्थापना — मुख्य RTB बुनियादी ढांचा और ML फाउंडेशन बनाया गया।','pt':'Fundação — Infraestrutura RTB central e base de ML construída.','fr':'Fondation — Infrastructure RTB centrale et base ML construite.','ja':'設立 — コアRTBインフラとML基盤を構築。'},
  'First Partnerships — Beta advertisers & publishers onboarded. London office opens.': {'es':'Primeras Alianzas — Beta anunciantes y publicadores integrados. Apertura de la oficina de Londres.','ar':'أولى الشراكات — إعداد معلنين وناشري بيتا. افتتاح مكتب لندن.','hi':'पहली साझेदारी — बीटा विज्ञापनदाता और प्रकाशक शामिल। लंदन कार्यालय खुला।','pt':'Primeiras Parcerias — Beta anunciantes e publicadores integrados. Abertura do escritório de Londres.','fr':'Premiers Partenariats — Annonceurs et éditeurs bêta intégrés. Ouverture du bureau de Londres.','ja':'最初のパートナーシップ — ベータ広告主・パブリッシャーをオンボード。ロンドンオフィス開設。'},
  'DSP Launch — NexBids DSP goes to general availability. 50+ advertisers in H1.': {'es':'Lanzamiento DSP — NexBids DSP llega a disponibilidad general. 50+ anunciantes en H1.','ar':'إطلاق DSP — NexBids DSP يصل إلى التوفر العام. أكثر من 50 معلناً في النصف الأول.','hi':'DSP लॉन्च — NexBids DSP सामान्य उपलब्धता पर जाता है। H1 में 50+ विज्ञापनदाता।','pt':'Lançamento do DSP — NexBids DSP chega à disponibilidade geral. 50+ anunciantes no H1.','fr':'Lancement DSP — NexBids DSP en disponibilité générale. 50+ annonceurs au S1.','ja':'DSPローンチ — NexBids DSPが一般提供開始。上半期に50社以上の広告主を獲得。'},
  'Full-Stack Platform — SSP & ADX launch. Singapore office opens.': {'es':'Plataforma Full-Stack — Lanzamiento de SSP y ADX. Apertura de la oficina de Singapur.','ar':'منصة متكاملة — إطلاق SSP وADX. افتتاح مكتب سنغافورة.','hi':'फुल-स्टैक प्लेटफॉर्म — SSP और ADX लॉन्च। सिंगापुर कार्यालय खुला।','pt':'Plataforma Full-Stack — Lançamento de SSP e ADX. Abertura do escritório de Singapura.','fr':'Plateforme Full-Stack — Lancement SSP & ADX. Ouverture du bureau de Singapour.','ja':'フルスタックプラットフォーム — SSP・ADXローンチ。シンガポールオフィス開設。'},
  'Scale Milestone — 10,000+ publishers. 100B+ daily bid requests. Tokyo & Beijing offices.': {'es':'Hito de Escala — 10,000+ publicadores. 100B+ solicitudes de puja diarias. Oficinas en Tokio y Pekín.','ar':'معلم توسع — 10,000+ ناشر. أكثر من 100 مليار طلب مزايدة يومياً. مكاتب طوكيو وبكين.','hi':'स्केल माइलस्टोन — 10,000+ प्रकाशक। 100B+ दैनिक बोली अनुरोध। टोक्यो और बीजिंग कार्यालय।','pt':'Marco de Escala — 10.000+ publicadores. 100B+ solicitações de lance diárias. Escritórios em Tóquio e Pequim.','fr':'Jalon de Croissance — 10 000+ éditeurs. 100B+ demandes d\'enchères quotidiennes. Bureaux à Tokyo et Pékin.','ja':'スケールマイルストーン — 10,000社以上のパブリッシャー。1日1,000億件以上の入札。東京・北京オフィス開設。'},
  'AI-First Initiative — Next-gen ML engine launched. Privacy Sandbox integration complete.': {'es':'Iniciativa AI-First — Motor ML de próxima generación lanzado. Integración de Privacy Sandbox completada.','ar':'مبادرة الذكاء الاصطناعي أولاً — إطلاق محرك ML من الجيل التالي. اكتمال تكامل Privacy Sandbox.','hi':'AI-फर्स्ट पहल — नेक्स्ट-जेन ML इंजन लॉन्च। Privacy Sandbox एकीकरण पूर्ण।','pt':'Iniciativa AI-First — Motor ML de próxima geração lançado. Integração do Privacy Sandbox concluída.','fr':'Initiative AI-First — Moteur ML nouvelle génération lancé. Intégration Privacy Sandbox complète.','ja':'AI-ファーストイニシアチブ — 次世代MLエンジンローンチ。Privacy Sandbox統合完了。'},
  '50K Publisher Milestone — $500M+ advertiser spend managed annually.': {'es':'Hito de 50K Publicadores — $500M+ de gasto de anunciantes gestionado anualmente.','ar':'معلم 50K ناشر — أكثر من $500M إنفاق معلنين مُدار سنوياً.','hi':'50K प्रकाशक माइलस्टोन — $500M+ विज्ञापनदाता व्यय वार्षिक प्रबंधित।','pt':'Marco de 50K Publicadores — $500M+ de gastos de anunciantes gerenciados anualmente.','fr':'Jalon 50K Éditeurs — $500M+ de dépenses annonceurs gérées annuellement.','ja':'5万社パブリッシャーマイルストーン — 年間5億ドル以上の広告主支出を管理。'},
  'CTV & Audio Expansion — Full CTV, programmatic audio, and DOOH capabilities.': {'es':'Expansión CTV y Audio — Capacidades completas de CTV, audio programático y DOOH.','ar':'توسع CTV والصوت — قدرات CTV الكاملة والصوت البرمجي وDOOH.','hi':'CTV और ऑडियो विस्तार — पूर्ण CTV, प्रोग्रामेटिक ऑडियो और DOOH क्षमताएं।','pt':'Expansão CTV e Áudio — Capacidades completas de CTV, áudio programático e DOOH.','fr':'Expansion CTV & Audio — Capacités CTV complètes, audio programmatique et DOOH.','ja':'CTV・オーディオ拡張 — 完全なCTV、プログラマティックオーディオ、DOOH対応。'},
  'Global Leadership — 50B+ daily impressions. Top 10 Global Ad Tech Platform.': {'es':'Liderazgo Global — 50B+ impresiones diarias. Top 10 Plataforma Global de Ad Tech.','ar':'قيادة عالمية — أكثر من 50 مليار ظهور يومي. ضمن أفضل 10 منصات تقنية إعلانية عالمية.','hi':'वैश्विक नेतृत्व — 50B+ दैनिक इंप्रेशन। शीर्ष 10 वैश्विक एड टेक प्लेटफॉर्म।','pt':'Liderança Global — 50B+ impressões diárias. Top 10 Plataforma Global de Ad Tech.','fr':'Leadership Mondial — 50B+ impressions quotidiennes. Top 10 Plateforme Ad Tech Mondiale.','ja':'グローバルリーダーシップ — 1日500億回以上のインプレッション。グローバルアドテクプラットフォームトップ10。'},
  'San Francisco + Barcelona': {'es':'San Francisco + Barcelona','ar':'سان فرانسيسكو + برشلونة','hi':'सैन फ्रांसिसको + बार्सिलोना','pt':'San Francisco + Barcelona','fr':'San Francisco + Barcelone','ja':'サンフランシスコ + バルセロナ'},
  # Glassdoor is a brand name, no need to translate but include for completeness
  'Glassdoor': {'es':'Glassdoor','ar':'Glassdoor','hi':'Glassdoor','pt':'Glassdoor','fr':'Glassdoor','ja':'Glassdoor'},
  # Campaign budget allocation labels (donut chart)
  '62% campaigns': {'es':'62% campañas','ar':'62% حملات','hi':'62% अभियान','pt':'62% campanhas','fr':'62% campagnes','ja':'62%キャンペーン'},
  '24% campaigns': {'es':'24% campañas','ar':'24% حملات','hi':'24% अभियान','pt':'24% campanhas','fr':'24% campagnes','ja':'24%キャンペーン'},
  '14% campaigns': {'es':'14% campañas','ar':'14% حملات','hi':'14% अभियान','pt':'14% campanhas','fr':'14% campagnes','ja':'14%キャンペーン'},
  # Stat badges on charts (mostly numbers + units, but include them)
  '50B+': {'es':'50B+','ar':'50B+','hi':'50B+','pt':'50B+','fr':'50B+','ja':'500億以上'},
  '<100ms': {'es':'<100ms','ar':'<100ms','hi':'<100ms','pt':'<100ms','fr':'<100ms','ja':'100ms未満'},
  '50B+/day': {'es':'50B+/día','ar':'50B+/يوم','hi':'50B+/दिन','pt':'50B+/dia','fr':'50B+/jour','ja':'500億以上/日'},
  '6 Proprietary': {'es':'6 Propietarios','ar':'6 ملكية','hi':'6 स्वामित्व','pt':'6 Proprietários','fr':'6 Propriétaires','ja':'6独自開発'},
  # Publisher onboarding steps
  'Global Leadership — 50B+ daily impressions. Top 10 Global Ad Tech Platform.': {'es':'Liderazgo Global — 50B+ impresiones diarias. Top 10 Plataforma de Ad Tech.','ar':'قيادة عالمية — 50B+ انطباع يومي. أفضل 10 منصة تقنية إعلانية عالمية.','hi':'वैश्विक नेतृत्व — 50B+ दैनिक इंप्रेशन। टॉप 10 ग्लोबल एड टेक प्लेटफॉर्म।','pt':'Liderança Global — 50B+ impressões diárias. Top 10 Plataforma de Ad Tech Global.','fr':'Leadership Mondial — 50B+ impressions quotidiennes. Top 10 Plateforme Ad Tech.','ja':'グローバルリーダーシップ — 1日500億以上のインプレッション。グローバルアドテクプラットフォームトップ10。'},
}

# Write the patch
with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Find CONTENT_T end
ct_start = code.find('const CONTENT_T = {')
ct_end = code.find('\n};', ct_start)

# Build new entries
new_entries = []
for en_key, langs in NEW_TRANSLATIONS.items():
    # Escape key for JS
    js_key = en_key.replace("'", "\\'")
    parts = []
    for lang, val in langs.items():
        js_val = val.replace("'", "\\'")
        parts.append(f"    {lang}:'{js_val}'")
    entry = f"  '{js_key}': {{\n{chr(10).join(parts)}\n  }}"
    new_entries.append(entry)

insert_text = ',\n' + ',\n'.join(new_entries)
new_code = code[:ct_end] + insert_text + code[ct_end:]

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(new_code)

print(f"Inserted {len(NEW_TRANSLATIONS)} new translation entries")

# Verify
with open('app.js', 'r', encoding='utf-8') as f:
    verify = f.read()
ct_start2 = verify.find('const CONTENT_T = {')
ct_end2 = verify.find('\n};', ct_start2) + 3
ct_block2 = verify[ct_start2:ct_end2]
import re
ct_keys2 = set(re.findall(r"'((?:[^'\\]|\\.)+)':\s*\{", ct_block2))
print(f"CONTENT_T now has {len(ct_keys2)} keys")
