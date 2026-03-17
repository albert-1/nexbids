/* ==============================================
   NEXBIDS WEBSITE — Single Page Application
   app.js: Router + i18n + All Page Renderers
   ============================================== */

'use strict';

/* ─────────────────────────────────────────────
   STATE
───────────────────────────────────────────── */
let currentLang = 'en';
let currentPage = 'home';

/* ─────────────────────────────────────────────
   MULTI-LANGUAGE CONFIG  (14 languages)
───────────────────────────────────────────── */
const LANGUAGES = [
  { code: 'en',  label: 'English',    flag: '🇺🇸', dir: 'ltr' },
  { code: 'es',  label: 'Español',    flag: '🇪🇸', dir: 'ltr' },
  { code: 'fr',  label: 'Français',   flag: '🇫🇷', dir: 'ltr' },
  { code: 'de',  label: 'Deutsch',    flag: '🇩🇪', dir: 'ltr' },
  { code: 'pt',  label: 'Português',  flag: '🇧🇷', dir: 'ltr' },
  { code: 'ru',  label: 'Русский',    flag: '🇷🇺', dir: 'ltr' },
  { code: 'zh',  label: '中文',        flag: '🇨🇳', dir: 'ltr' },
  { code: 'ko',  label: '한국어',      flag: '🇰🇷', dir: 'ltr' },
  { code: 'ja',  label: '日本語',      flag: '🇯🇵', dir: 'ltr' },
  { code: 'ms',  label: 'Melayu',     flag: '🇲🇾', dir: 'ltr' },
  { code: 'th',  label: 'ภาษาไทย',   flag: '🇹🇭', dir: 'ltr' },
  { code: 'vi',  label: 'Tiếng Việt', flag: '🇻🇳', dir: 'ltr' },
  { code: 'hi',  label: 'हिन्दी',     flag: '🇮🇳', dir: 'ltr' },
  { code: 'ar',  label: 'العربية',    flag: '🇸🇦', dir: 'rtl' },
];

/* Core UI strings translated to all 14 languages */
const UI_STRINGS = {
  // Nav
  solutions:    { en:'Solutions', es:'Soluciones', fr:'Solutions', de:'Lösungen', pt:'Soluções', ru:'Решения', zh:'解决方案', ko:'솔루션', ja:'ソリューション', ms:'Penyelesaian', th:'โซลูชัน', vi:'Giải pháp', hi:'समाधान', ar:'الحلول' },
  products:     { en:'Products', es:'Productos', fr:'Produits', de:'Produkte', pt:'Produtos', ru:'Продукты', zh:'产品', ko:'제품', ja:'製品', ms:'Produk', th:'ผลิตภัณฑ์', vi:'Sản phẩm', hi:'उत्पाद', ar:'المنتجات' },
  technology:   { en:'Technology', es:'Tecnología', fr:'Technologie', de:'Technologie', pt:'Tecnologia', ru:'Технологии', zh:'技术优势', ko:'기술', ja:'テクノロジー', ms:'Teknologi', th:'เทคโนโลยี', vi:'Công nghệ', hi:'प्रौद्योगिकी', ar:'التكنولوجيا' },
  resources:    { en:'Resources', es:'Recursos', fr:'Ressources', de:'Ressourcen', pt:'Recursos', ru:'Ресурсы', zh:'资源文档', ko:'리소스', ja:'リソース', ms:'Sumber', th:'ทรัพยากร', vi:'Tài nguyên', hi:'संसाधन', ar:'الموارد' },
  caseStudies:  { en:'Case Studies', es:'Casos de Éxito', fr:'Études de Cas', de:'Fallstudien', pt:'Casos de Sucesso', ru:'Кейсы', zh:'客户案例', ko:'사례 연구', ja:'事例研究', ms:'Kajian Kes', th:'กรณีศึกษา', vi:'Nghiên cứu điển hình', hi:'केस स्टडीज', ar:'دراسات الحالة' },
  company:      { en:'Company', es:'Empresa', fr:'Entreprise', de:'Unternehmen', pt:'Empresa', ru:'Компания', zh:'公司', ko:'회사', ja:'会社', ms:'Syarikat', th:'บริษัท', vi:'Công ty', hi:'कंपनी', ar:'الشركة' },
  contactUs:    { en:'Contact Us', es:'Contáctenos', fr:'Contactez-nous', de:'Kontakt', pt:'Contate-nos', ru:'Связаться', zh:'联系我们', ko:'문의하기', ja:'お問い合わせ', ms:'Hubungi Kami', th:'ติดต่อเรา', vi:'Liên hệ', hi:'हमसे संपर्क करें', ar:'اتصل بنا' },
  login:        { en:'Login', es:'Iniciar sesión', fr:'Connexion', de:'Anmelden', pt:'Entrar', ru:'Войти', zh:'登录', ko:'로그인', ja:'ログイン', ms:'Log Masuk', th:'เข้าสู่ระบบ', vi:'Đăng nhập', hi:'लॉगिन', ar:'تسجيل الدخول' },
  getStarted:   { en:'Get Started Free', es:'Empezar Gratis', fr:'Commencer Gratuitement', de:'Kostenlos Starten', pt:'Começar Grátis', ru:'Начать Бесплатно', zh:'免费开始', ko:'무료로 시작하기', ja:'無料で始める', ms:'Mulakan Percuma', th:'เริ่มต้นฟรี', vi:'Bắt đầu miễn phí', hi:'मुफ्त शुरू करें', ar:'ابدأ مجاناً' },
  // Footer
  copyright:    { en:'© 2026 NexBids. All rights reserved.', es:'© 2026 NexBids. Todos los derechos reservados.', fr:'© 2026 NexBids. Tous droits réservés.', de:'© 2026 NexBids. Alle Rechte vorbehalten.', pt:'© 2026 NexBids. Todos os direitos reservados.', ru:'© 2026 NexBids. Все права защищены.', zh:'© 2026 NexBids. 保留所有权利。', ko:'© 2026 NexBids. 모든 권리 보유.', ja:'© 2026 NexBids. 全ての権利を保有。', ms:'© 2026 NexBids. Hak cipta terpelihara.', th:'© 2026 NexBids. สงวนสิทธิ์ทั้งหมด', vi:'© 2026 NexBids. Đã đăng ký bản quyền.', hi:'© 2026 NexBids. सर्वाधिकार सुरक्षित।', ar:'© 2026 NexBids. جميع الحقوق محفوظة.' },
  tagline:      { en:"Power Your Growth with Intelligent Programmatic", es:'Impulsa Tu Crecimiento con Programática Inteligente', fr:'Boostez Votre Croissance avec la Programmatique Intelligente', de:'Steigern Sie Ihr Wachstum mit intelligenter Programmatik', pt:'Impulsione Seu Crescimento com Programática Inteligente', ru:'Ускорьте Рост с Интеллектуальной Программатикой', zh:'用智能程序化广告驱动增长', ko:'지능형 프로그래매틱으로 성장을 가속하세요', ja:'インテリジェントなプログラマティックで成長を加速', ms:'Pacu Pertumbuhan Anda dengan Programatik Cerdas', th:'เร่งการเติบโตของคุณด้วย Programmatic อัจฉริยะ', vi:'Thúc Đẩy Tăng Trưởng với Programmatic Thông Minh', hi:'इंटेलिजेंट प्रोग्रामेटिक से अपनी ग्रोथ बढ़ाएं', ar:'عزّز نموك بالإعلانات البرمجية الذكية' },
};

/* Helper: get UI string in current language */
function ui(key) {
  return UI_STRINGS[key]?.[currentLang] ?? UI_STRINGS[key]?.en ?? key;
}

/* ─────────────────────────────────────────────
   CONTENT TRANSLATIONS  (key = English original)
   Covers all section tags, headlines, CTA buttons,
   navigation sub-labels, hero taglines etc.
───────────────────────────────────────────── */
const CONTENT_T = {
  // ── Hero / Home ──
  'Power Your Growth with Intelligent Programmatic': {
    es:'Impulsa Tu Crecimiento con Programática Inteligente', fr:'Boostez Votre Croissance avec la Programmatique', de:'Steigern Sie Ihr Wachstum mit intelligenter Programmatik',
    pt:'Impulsione Seu Crescimento com Programática Inteligente', ru:'Ускорьте Рост с Интеллектуальной Программатикой', zh:'用智能程序化广告驱动增长',
    ko:'지능형 프로그래매틱으로 성장을 가속하세요', ja:'インテリジェントなプログラマティックで成長を加速', ms:'Pacu Pertumbuhan Anda dengan Programatik Cerdas',
    th:'เร่งการเติบโตของคุณด้วย Programmatic อัจฉริยะ', vi:'Thúc Đẩy Tăng Trưởng với Programmatic Thông Minh', hi:'इंटेलिजेंट प्रोग्रामेटिक से अपनी ग्रोथ बढ़ाएं', ar:'عزّز نموك بالإعلانات البرمجية الذكية'
  },
  'The global ad exchange platform built for performance, scale, and trust.': {
    es:'La plataforma de intercambio publicitario global para rendimiento, escala y confianza.', fr:'La plateforme mondiale d\'échange publicitaire pour la performance, l\'échelle et la confiance.',
    de:'Die globale Werbebörsen-Plattform für Leistung, Skalierung und Vertrauen.', pt:'A plataforma global de troca de anúncios para desempenho, escala e confiança.',
    ru:'Глобальная рекламная биржа для результата, масштаба и доверия.', zh:'为绩效、规模和信任而生的全球广告交易平台。',
    ko:'성과, 규모, 신뢰를 위한 글로벌 광고 교환 플랫폼.', ja:'パフォーマンス、スケール、信頼のためのグローバル広告取引所。',
    ms:'Platform pertukaran iklan global untuk prestasi, skala dan kepercayaan.', th:'แพลตฟอร์มแลกเปลี่ยนโฆษณาระดับโลกเพื่อประสิทธิภาพ ขนาด และความไว้วางใจ',
    vi:'Nền tảng trao đổi quảng cáo toàn cầu cho hiệu suất, quy mô và độ tin cậy.', hi:'प्रदर्शन, स्केल और विश्वास के लिए वैश्विक विज्ञापन एक्सचेंज प्लेटफॉर्म।', ar:'منصة التبادل الإعلاني العالمية للأداء والحجم والثقة.'
  },
  'Get Started Free': {
    es:'Empezar Gratis', fr:'Commencer Gratuitement', de:'Kostenlos Starten', pt:'Começar Grátis', ru:'Начать Бесплатно', zh:'免费开始',
    ko:'무료로 시작하기', ja:'無料で始める', ms:'Mulakan Percuma', th:'เริ่มต้นฟรี', vi:'Bắt đầu miễn phí', hi:'मुफ्त शुरू करें', ar:'ابدأ مجاناً'
  },
  'See How It Works': {
    es:'Cómo Funciona', fr:'Voir Comment Ça Marche', de:'So Funktioniert Es', pt:'Veja Como Funciona', ru:'Как Это Работает', zh:'了解运作方式',
    ko:'작동 방식 보기', ja:'仕組みを見る', ms:'Lihat Cara Kerjanya', th:'ดูวิธีการทำงาน', vi:'Xem Cách Hoạt Động', hi:'यह कैसे काम करता है', ar:'شاهد كيف يعمل'
  },
  // ── Section tags ──
  'Why NexBids': { es:'Por Qué NexBids', fr:'Pourquoi NexBids', de:'Warum NexBids', pt:'Por Que NexBids', ru:'Почему NexBids', zh:'为什么选择NexBids', ko:'왜 NexBids인가', ja:'なぜNexBidsか', ms:'Mengapa NexBids', th:'ทำไมต้อง NexBids', vi:'Tại Sao NexBids', hi:'NexBids क्यों', ar:'لماذا NexBids' },
  'Platform Advantages': { es:'Ventajas de la Plataforma', fr:'Avantages de la Plateforme', de:'Plattformvorteile', pt:'Vantagens da Plataforma', ru:'Преимущества Платформы', zh:'平台优势', ko:'플랫폼 강점', ja:'プラットフォームの優位性', ms:'Kelebihan Platform', th:'ข้อดีของแพลตฟอร์ม', vi:'Lợi Thế Nền Tảng', hi:'प्लेटफॉर्म के फायदे', ar:'مزايا المنصة' },
  'Our Solutions': { es:'Nuestras Soluciones', fr:'Nos Solutions', de:'Unsere Lösungen', pt:'Nossas Soluções', ru:'Наши Решения', zh:'我们的解决方案', ko:'우리의 솔루션', ja:'私たちのソリューション', ms:'Penyelesaian Kami', th:'โซลูชันของเรา', vi:'Giải Pháp Của Chúng Tôi', hi:'हमारे समाधान', ar:'حلولنا' },
  'Our Products': { es:'Nuestros Productos', fr:'Nos Produits', de:'Unsere Produkte', pt:'Nossos Produtos', ru:'Наши Продукты', zh:'我们的产品', ko:'우리의 제품', ja:'私たちの製品', ms:'Produk Kami', th:'ผลิตภัณฑ์ของเรา', vi:'Sản Phẩm Của Chúng Tôi', hi:'हमारे उत्पाद', ar:'منتجاتنا' },
  'Trusted Ecosystem': { es:'Ecosistema de Confianza', fr:'Écosystème de Confiance', de:'Vertrauenswürdiges Ökosystem', pt:'Ecossistema Confiável', ru:'Надёжная Экосистема', zh:'受信赖的生态系统', ko:'신뢰받는 생태계', ja:'信頼のエコシステム', ms:'Ekosistem Terpercaya', th:'ระบบนิเวศที่เชื่อถือได้', vi:'Hệ Sinh Thái Đáng Tin Cậy', hi:'विश्वसनीय इकोसिस्टम', ar:'نظام بيئي موثوق' },
  'Global Reach': { es:'Alcance Global', fr:'Portée Mondiale', de:'Globale Reichweite', pt:'Alcance Global', ru:'Глобальный охват', zh:'全球覆盖', ko:'글로벌 도달 범위', ja:'グローバルリーチ', ms:'Jangkauan Global', th:'การเข้าถึงระดับโลก', vi:'Phạm Vi Toàn Cầu', hi:'वैश्विक पहुंच', ar:'الوصول العالمي' },
  'Resources': { es:'Recursos', fr:'Ressources', de:'Ressourcen', pt:'Recursos', ru:'Ресурсы', zh:'资源文档', ko:'리소스', ja:'リソース', ms:'Sumber', th:'ทรัพยากร', vi:'Tài nguyên', hi:'संसाधन', ar:'الموارد' },
  'Case Studies': { es:'Casos de Éxito', fr:'Études de Cas', de:'Fallstudien', pt:'Casos de Sucesso', ru:'Кейсы', zh:'客户案例', ko:'사례 연구', ja:'事例研究', ms:'Kajian Kes', th:'กรณีศึกษา', vi:'Nghiên cứu điển hình', hi:'केस स्टडीज', ar:'دراسات الحالة' },
  'Solutions': { es:'Soluciones', fr:'Solutions', de:'Lösungen', pt:'Soluções', ru:'Решения', zh:'解决方案', ko:'솔루션', ja:'ソリューション', ms:'Penyelesaian', th:'โซลูชัน', vi:'Giải pháp', hi:'समाधान', ar:'الحلول' },
  'Advertiser Solutions': { es:'Soluciones para Anunciantes', fr:'Solutions pour Annonceurs', de:'Lösungen für Werbetreibende', pt:'Soluções para Anunciantes', ru:'Решения для Рекламодателей', zh:'广告主解决方案', ko:'광고주 솔루션', ja:'広告主向けソリューション', ms:'Penyelesaian Pengiklan', th:'โซลูชันสำหรับผู้ลงโฆษณา', vi:'Giải Pháp Nhà Quảng Cáo', hi:'विज्ञापनदाता समाधान', ar:'حلول المعلنين' },
  'Publisher Solutions': { es:'Soluciones para Editores', fr:'Solutions pour Éditeurs', de:'Lösungen für Publisher', pt:'Soluções para Editores', ru:'Решения для Издателей', zh:'发布商解决方案', ko:'퍼블리셔 솔루션', ja:'パブリッシャー向けソリューション', ms:'Penyelesaian Penerbit', th:'โซลูชันสำหรับผู้เผยแพร่', vi:'Giải Pháp Nhà Xuất Bản', hi:'प्रकाशक समाधान', ar:'حلول الناشرين' },
  'Agency Solutions': { es:'Soluciones para Agencias', fr:'Solutions pour Agences', de:'Lösungen für Agenturen', pt:'Soluções para Agências', ru:'Решения для Агентств', zh:'代理商解决方案', ko:'에이전시 솔루션', ja:'エージェンシー向けソリューション', ms:'Penyelesaian Agensi', th:'โซลูชันสำหรับเอเจนซี่', vi:'Giải Pháp Đại Lý', hi:'एजेंसी समाधान', ar:'حلول الوكالات' },
  'Technology': { es:'Tecnología', fr:'Technologie', de:'Technologie', pt:'Tecnologia', ru:'Технологии', zh:'技术优势', ko:'기술', ja:'テクノロジー', ms:'Teknologi', th:'เทคโนโลยี', vi:'Công nghệ', hi:'प्रौद्योगिकी', ar:'التكنولوجيا' },
  'Products': { es:'Productos', fr:'Produits', de:'Produkte', pt:'Produtos', ru:'Продукты', zh:'产品', ko:'제품', ja:'製品', ms:'Produk', th:'ผลิตภัณฑ์', vi:'Sản phẩm', hi:'उत्पाद', ar:'المنتجات' },
  'DSP': { es:'DSP', fr:'DSP', de:'DSP', pt:'DSP', ru:'DSP', zh:'需求方平台', ko:'DSP', ja:'DSP', ms:'DSP', th:'DSP', vi:'DSP', hi:'DSP', ar:'DSP' },
  'ADX': { es:'ADX', fr:'ADX', de:'ADX', pt:'ADX', ru:'ADX', zh:'广告交易平台', ko:'ADX', ja:'ADX', ms:'ADX', th:'ADX', vi:'ADX', hi:'ADX', ar:'ADX' },
  'SSP': { es:'SSP', fr:'SSP', de:'SSP', pt:'SSP', ru:'SSP', zh:'供应方平台', ko:'SSP', ja:'SSP', ms:'SSP', th:'SSP', vi:'SSP', hi:'SSP', ar:'SSP' },
  // ── Home page headlines ──
  'Our Global Partners': { es:'Nuestros Socios Globales', fr:'Nos Partenaires Mondiaux', de:'Unsere Globalen Partner', pt:'Nossos Parceiros Globais', ru:'Наши Глобальные Партнёры', zh:'我们的全球合作伙伴', ko:'글로벌 파트너', ja:'グローバルパートナー', ms:'Rakan Kongsi Global Kami', th:'พาร์ทเนอร์ระดับโลกของเรา', vi:'Đối Tác Toàn Cầu', hi:'हमारे वैश्विक भागीदार', ar:'شركاؤنا العالميون' },
  'Mobile Ad Traffic Flowing Across the Globe': { es:'Flujo de Tráfico Publicitario Móvil en Todo el Mundo', fr:'Flux de Trafic Publicitaire Mobile à Travers le Monde', de:'Mobiler Anzeigenverkehr Fließt um den Globus', pt:'Tráfego de Anúncios Móveis Fluindo pelo Mundo', ru:'Мобильный рекламный трафик по всему миру', zh:'移动广告流量在全球流动', ko:'전 세계 모바일 광고 트래픽 흐름', ja:'世界を流れるモバイル広告トラフィック', ms:'Aliran Trafik Iklan Mudah Alih Di Seluruh Dunia', th:'การไหลของทราฟฟิกโฆษณาบนมือถือทั่วโลก', vi:'Lưu Lượng Quảng Cáo Di Động Trên Toàn Cầu', hi:'दुनिया भर में मोबाइल विज्ञापन ट्रैफिक', ar:'تدفق حركة إعلانات الجوال عبر العالم' },
  'Every second, NexBids routes billions of real-time bid requests across 150+ countries — connecting advertisers with audiences at the speed of light.': {
    es:'Cada segundo, NexBids enruta miles de millones de solicitudes de oferta en tiempo real en más de 150 países, conectando anunciantes con audiencias a la velocidad de la luz.',
    fr:'Chaque seconde, NexBids achemine des milliards de demandes d\'enchères en temps réel dans plus de 150 pays, connectant les annonceurs avec les audiences à la vitesse de la lumière.',
    de:'Jede Sekunde leitet NexBids Milliarden von Echtzeit-Gebotsanfragen in über 150 Ländern weiter und verbindet Werbetreibende mit Zielgruppen mit Lichtgeschwindigkeit.',
    pt:'A cada segundo, o NexBids roteia bilhões de solicitações de lance em tempo real em mais de 150 países, conectando anunciantes com audiências na velocidade da luz.',
    ru:'Каждую секунду NexBids маршрутизирует миллиарды запросов ставок в реальном времени в 150+ странах, соединяя рекламодателей с аудиторией со скоростью света.',
    zh:'每秒钟，NexBids在150+个国家路由数十亿实时竞价请求——以光速连接广告主与受众。',
    ko:'매초 NexBids는 150개국 이상에서 수십억 건의 실시간 입찰 요청을 라우팅하여 광고주와 타겟 오디언스를 빛의 속도로 연결합니다.',
    ja:'NexBidsは毎秒、150か国以上で何十億ものリアルタイム入札リクエストをルーティングし、光速で広告主と視聴者をつなぎます。',
    ms:'Setiap saat, NexBids menghala berbilion permintaan bida masa nyata merentasi 150+ negara — menghubungkan pengiklan dengan audiens dengan kelajuan cahaya.',
    th:'ทุกวินาที NexBids เส้นทางพันล้านคำขอประมูลแบบเรียลไทม์ใน 150+ ประเทศ เชื่อมต่อผู้ลงโฆษณากับผู้ชมด้วยความเร็วแสง',
    vi:'Mỗi giây, NexBids định tuyến hàng tỷ yêu cầu đặt giá thầu thời gian thực trên 150+ quốc gia, kết nối nhà quảng cáo với đối tượng với tốc độ ánh sáng.',
    hi:'हर सेकंड, NexBids 150+ देशों में अरबों रियल-टाइम बिड रिक्वेस्ट रूट करता है — विज्ञापनदाताओं को प्रकाश की गति से दर्शकों से जोड़ता है।',
    ar:'في كل ثانية، يُوجّه NexBids مليارات طلبات المزايدة الفورية عبر 150+ دولة، واصلًا المعلنين بالجماهير بسرعة الضوء.'
  },
  // ── Common CTAs & buttons ──
  'Request Demo': { es:'Solicitar Demo', fr:'Demander une Démo', de:'Demo Anfordern', pt:'Solicitar Demo', ru:'Запросить Демо', zh:'申请演示', ko:'데모 신청', ja:'デモをリクエスト', ms:'Minta Demo', th:'ขอสาธิต', vi:'Yêu Cầu Demo', hi:'डेमो अनुरोध', ar:'طلب عرض تجريبي' },
  'Learn More': { es:'Más Información', fr:'En Savoir Plus', de:'Mehr Erfahren', pt:'Saiba Mais', ru:'Узнать Больше', zh:'了解更多', ko:'더 알아보기', ja:'詳しく見る', ms:'Ketahui Lebih Lanjut', th:'เรียนรู้เพิ่มเติม', vi:'Tìm Hiểu Thêm', hi:'अधिक जानें', ar:'اعرف المزيد' },
  'Contact Us': { es:'Contáctenos', fr:'Contactez-nous', de:'Kontakt', pt:'Contate-nos', ru:'Связаться', zh:'联系我们', ko:'문의하기', ja:'お問い合わせ', ms:'Hubungi Kami', th:'ติดต่อเรา', vi:'Liên hệ', hi:'हमसे संपर्क करें', ar:'اتصل بنا' },
  'Get Started': { es:'Comenzar', fr:'Commencer', de:'Loslegen', pt:'Começar', ru:'Начать', zh:'立即开始', ko:'시작하기', ja:'始める', ms:'Mulakan', th:'เริ่มต้น', vi:'Bắt Đầu', hi:'शुरू करें', ar:'ابدأ الآن' },
  'Become a Partner →': { es:'Convertirse en Socio →', fr:'Devenir Partenaire →', de:'Partner Werden →', pt:'Torne-se um Parceiro →', ru:'Стать Партнёром →', zh:'成为合作伙伴 →', ko:'파트너 되기 →', ja:'パートナーになる →', ms:'Jadilah Rakan Kongsi →', th:'เป็นพาร์ทเนอร์ →', vi:'Trở Thành Đối Tác →', hi:'पार्टनर बनें →', ar:'كن شريكاً ←' },
  'Start Free Trial': { es:'Iniciar Prueba Gratuita', fr:'Démarrer l\'Essai Gratuit', de:'Kostenlose Testversion Starten', pt:'Iniciar Teste Gratuito', ru:'Начать Бесплатный Пробный Период', zh:'开始免费试用', ko:'무료 체험 시작', ja:'無料トライアル開始', ms:'Mulakan Percubaan Percuma', th:'เริ่มทดลองใช้งานฟรี', vi:'Bắt Đầu Dùng Thử Miễn Phí', hi:'मुफ्त ट्रायल शुरू करें', ar:'ابدأ التجربة المجانية' },
  'Access': { es:'Acceder', fr:'Accéder', de:'Zugriff', pt:'Acessar', ru:'Получить', zh:'访问', ko:'접속', ja:'アクセス', ms:'Akses', th:'เข้าถึง', vi:'Truy cập', hi:'एक्सेस', ar:'الوصول' },
  'Register Now': { es:'Registrarse Ahora', fr:'S\'inscrire Maintenant', de:'Jetzt Registrieren', pt:'Registrar Agora', ru:'Зарегистрироваться', zh:'立即注册', ko:'지금 등록', ja:'今すぐ登録', ms:'Daftar Sekarang', th:'ลงทะเบียนตอนนี้', vi:'Đăng Ký Ngay', hi:'अभी रजिस्टर करें', ar:'سجّل الآن' },
  'Upcoming': { es:'Próximamente', fr:'À venir', de:'Demnächst', pt:'Em breve', ru:'Скоро', zh:'即将举行', ko:'예정', ja:'近日開催', ms:'Akan Datang', th:'กำลังจะมาถึง', vi:'Sắp diễn ra', hi:'जल्द आ रहा है', ar:'قريباً' },
  // ── Common section labels ──
  'Powering campaigns and monetization for 80,000+ brands, publishers, and technology partners across 150+ countries.': {
    es:'Impulsando campañas y monetización para más de 80.000 marcas, editores y socios tecnológicos en más de 150 países.',
    fr:'Alimentant les campagnes et la monétisation pour plus de 80 000 marques, éditeurs et partenaires technologiques dans plus de 150 pays.',
    de:'Kampagnen und Monetarisierung für 80.000+ Marken, Publisher und Technologiepartner in 150+ Ländern.',
    pt:'Impulsionando campanhas e monetização para mais de 80.000 marcas, editores e parceiros de tecnologia em mais de 150 países.',
    ru:'Кампании и монетизация для 80 000+ брендов, издателей и технологических партнёров в 150+ странах.',
    zh:'为150+个国家的80,000+品牌、发布商和技术合作伙伴提供营销活动和变现服务。',
    ko:'150개국 이상에서 80,000개 이상의 브랜드, 퍼블리셔 및 기술 파트너를 위한 캠페인 및 수익화 지원.',
    ja:'150か国以上の80,000以上のブランド、パブリッシャー、テクノロジーパートナーのキャンペーンと収益化を支援。',
    ms:'Memacu kempen dan pengewangan untuk 80,000+ jenama, penerbit dan rakan teknologi di 150+ negara.',
    th:'ขับเคลื่อนแคมเปญและการสร้างรายได้สำหรับแบรนด์ ผู้เผยแพร่ และพันธมิตรด้านเทคโนโลยีกว่า 80,000 รายใน 150+ ประเทศ',
    vi:'Thúc đẩy các chiến dịch và kiếm tiền cho 80,000+ thương hiệu, nhà xuất bản và đối tác công nghệ tại 150+ quốc gia.',
    hi:'150+ देशों में 80,000+ ब्रांड, प्रकाशकों और तकनीकी भागीदारों के लिए अभियान और मुद्रीकरण को शक्ति देना।',
    ar:'تشغيل الحملات وتحقيق الدخل لأكثر من 80,000 علامة تجارية وناشر وشريك تقني عبر 150+ دولة.'
  },
  'Global Partners': { es:'Socios Globales', fr:'Partenaires Mondiaux', de:'Globale Partner', pt:'Parceiros Globais', ru:'Глобальные Партнёры', zh:'全球合作伙伴', ko:'글로벌 파트너', ja:'グローバルパートナー', ms:'Rakan Kongsi Global', th:'พาร์ทเนอร์ระดับโลก', vi:'Đối Tác Toàn Cầu', hi:'वैश्विक भागीदार', ar:'الشركاء العالميون' },
  'Countries': { es:'Países', fr:'Pays', de:'Länder', pt:'Países', ru:'Страны', zh:'覆盖国家', ko:'국가', ja:'国', ms:'Negara', th:'ประเทศ', vi:'Quốc gia', hi:'देश', ar:'دولة' },
  'DSPs Connected': { es:'DSPs Conectados', fr:'DSPs Connectés', de:'Verbundene DSPs', pt:'DSPs Conectados', ru:'Подключённые DSP', zh:'对接头部DSP', ko:'연결된 DSP', ja:'接続DSP', ms:'DSP Disambung', th:'DSP ที่เชื่อมต่อ', vi:'DSP Kết Nối', hi:'कनेक्टेड DSP', ar:'DSPs المتصلة' },
  'Quality Verified': { es:'Calidad Verificada', fr:'Qualité Vérifiée', de:'Qualität Verifiziert', pt:'Qualidade Verificada', ru:'Качество Подтверждено', zh:'优质流量认证', ko:'품질 검증', ja:'品質検証済み', ms:'Kualiti Disahkan', th:'ยืนยันคุณภาพ', vi:'Đã Xác Minh Chất Lượng', hi:'गुणवत्ता सत्यापित', ar:'الجودة معتمدة' },
  // ── Products page ──
  'Demand-Side Platform': { es:'Plataforma del Lado de la Demanda', fr:'Plateforme côté demande', de:'Demand-Side-Plattform', pt:'Plataforma do Lado da Demanda', ru:'Платформа со стороны спроса', zh:'需求方平台', ko:'수요측 플랫폼', ja:'デマンドサイドプラットフォーム', ms:'Platform Sebelah Permintaan', th:'แพลตฟอร์มฝั่งดีมานด์', vi:'Nền Tảng Phía Cầu', hi:'डिमांड साइड प्लेटफॉर्म', ar:'منصة جانب الطلب' },
  'Ad Exchange': { es:'Intercambio de Anuncios', fr:'Bourse Publicitaire', de:'Anzeigenbörse', pt:'Bolsa de Anúncios', ru:'Рекламная Биржа', zh:'广告交易平台', ko:'광고 거래소', ja:'広告取引所', ms:'Pertukaran Iklan', th:'ตลาดซื้อขายโฆษณา', vi:'Sàn Giao Dịch Quảng Cáo', hi:'विज्ञापन एक्सचेंज', ar:'بورصة الإعلانات' },
  'Supply-Side Platform': { es:'Plataforma del Lado de la Oferta', fr:'Plateforme côté offre', de:'Supply-Side-Plattform', pt:'Plataforma do Lado da Oferta', ru:'Платформа со стороны предложения', zh:'供应方平台', ko:'공급측 플랫폼', ja:'サプライサイドプラットフォーム', ms:'Platform Sebelah Bekalan', th:'แพลตฟอร์มฝั่งซัพพลาย', vi:'Nền Tảng Phía Cung', hi:'सप्लाई साइड प्लेटफॉर्म', ar:'منصة جانب العرض' },
  // ── Company / About ──
  'About NexBids': { es:'Sobre NexBids', fr:'À Propos de NexBids', de:'Über NexBids', pt:'Sobre NexBids', ru:'О NexBids', zh:'关于NexBids', ko:'NexBids 소개', ja:'NexBidsについて', ms:'Mengenai NexBids', th:'เกี่ยวกับ NexBids', vi:'Về NexBids', hi:'NexBids के बारे में', ar:'عن NexBids' },
  'Careers': { es:'Carreras', fr:'Carrières', de:'Karriere', pt:'Carreiras', ru:'Карьера', zh:'招聘', ko:'채용', ja:'採用', ms:'Kerjaya', th:'ตำแหน่งงาน', vi:'Tuyển Dụng', hi:'करियर', ar:'الوظائف' },
  'Contact': { es:'Contacto', fr:'Contact', de:'Kontakt', pt:'Contato', ru:'Контакт', zh:'联系', ko:'연락처', ja:'お問い合わせ', ms:'Hubungi', th:'ติดต่อ', vi:'Liên Hệ', hi:'संपर्क', ar:'اتصال' },
  // ── Resources ──
  'The NexBids Resource Center': { es:'El Centro de Recursos de NexBids', fr:'Le Centre de Ressources NexBids', de:'Das NexBids Ressourcenzentrum', pt:'O Centro de Recursos da NexBids', ru:'Ресурсный центр NexBids', zh:'NexBids 资源中心', ko:'NexBids 리소스 센터', ja:'NexBidsリソースセンター', ms:'Pusat Sumber NexBids', th:'ศูนย์ทรัพยากร NexBids', vi:'Trung Tâm Tài Nguyên NexBids', hi:'NexBids संसाधन केंद्र', ar:'مركز موارد NexBids' },
  'Everything you need to succeed in programmatic advertising — platform documentation, integration guides, industry research, and best practice playbooks.': {
    es:'Todo lo que necesitas para tener éxito en la publicidad programática: documentación de la plataforma, guías de integración, investigación de la industria y manuales de mejores prácticas.',
    fr:'Tout ce dont vous avez besoin pour réussir dans la publicité programmatique : documentation de la plateforme, guides d\'intégration, recherche sectorielle et playbooks de meilleures pratiques.',
    de:'Alles, was Sie für Erfolg in programmatischer Werbung brauchen: Plattformdokumentation, Integrationsleitfäden, Branchenforschung und Best-Practice-Playbooks.',
    pt:'Tudo o que você precisa para ter sucesso na publicidade programática: documentação da plataforma, guias de integração, pesquisa do setor e playbooks de melhores práticas.',
    ru:'Всё необходимое для успеха в программатической рекламе: документация платформы, руководства по интеграции, отраслевые исследования и плейбуки лучших практик.',
    zh:'您在程序化广告中取得成功所需的一切——平台文档、集成指南、行业研究和最佳实践手册。',
    ko:'프로그래매틱 광고에서 성공하는 데 필요한 모든 것 — 플랫폼 문서, 통합 가이드, 업계 조사 및 모범 사례 플레이북.',
    ja:'プログラマティック広告で成功するために必要なすべて：プラットフォームドキュメント、統合ガイド、業界調査、ベストプラクティスプレイブック。',
    ms:'Semua yang anda perlukan untuk berjaya dalam pengiklanan programatik — dokumentasi platform, panduan integrasi, penyelidikan industri, dan buku panduan amalan terbaik.',
    th:'ทุกสิ่งที่คุณต้องการเพื่อประสบความสำเร็จในการโฆษณาแบบโปรแกรมเมติก — เอกสารแพลตฟอร์ม คู่มือการผสานรวม งานวิจัยอุตสาหกรรม และ playbook แนวปฏิบัติที่ดีที่สุด',
    vi:'Mọi thứ bạn cần để thành công trong quảng cáo lập trình — tài liệu nền tảng, hướng dẫn tích hợp, nghiên cứu ngành và sách hướng dẫn thực hành tốt nhất.',
    hi:'प्रोग्रामेटिक विज्ञापन में सफल होने के लिए जो कुछ भी चाहिए — प्लेटफॉर्म दस्तावेज़ीकरण, एकीकरण गाइड, उद्योग अनुसंधान और सर्वोत्तम अभ्यास प्लेबुक।',
    ar:'كل ما تحتاجه للنجاح في الإعلانات البرمجية — وثائق المنصة وأدلة التكامل وأبحاث الصناعة وكتيبات أفضل الممارسات.'
  },
  'Platform Documentation': { es:'Documentación de la Plataforma', fr:'Documentation de la Plateforme', de:'Plattformdokumentation', pt:'Documentação da Plataforma', ru:'Документация платформы', zh:'平台文档', ko:'플랫폼 문서', ja:'プラットフォームドキュメント', ms:'Dokumentasi Platform', th:'เอกสารแพลตฟอร์ม', vi:'Tài Liệu Nền Tảng', hi:'प्लेटफॉर्म दस्तावेज़', ar:'توثيق المنصة' },
  'Best Practice Guides': { es:'Guías de Mejores Prácticas', fr:'Guides des Meilleures Pratiques', de:'Best-Practice-Leitfäden', pt:'Guias de Melhores Práticas', ru:'Руководства по лучшим практикам', zh:'最佳实践指南', ko:'모범 사례 가이드', ja:'ベストプラクティスガイド', ms:'Panduan Amalan Terbaik', th:'คู่มือแนวปฏิบัติที่ดีที่สุด', vi:'Hướng Dẫn Thực Hành Tốt Nhất', hi:'सर्वोत्तम अभ्यास गाइड', ar:'أدلة أفضل الممارسات' },
  'Industry Research & Reports': { es:'Investigación y Reportes de la Industria', fr:'Recherche et Rapports Sectoriels', de:'Branchenforschung & Berichte', pt:'Pesquisa e Relatórios da Indústria', ru:'Отраслевые исследования и отчёты', zh:'行业研究与报告', ko:'업계 연구 및 보고서', ja:'業界調査・レポート', ms:'Penyelidikan & Laporan Industri', th:'การวิจัยและรายงานอุตสาหกรรม', vi:'Nghiên Cứu & Báo Cáo Ngành', hi:'उद्योग अनुसंधान और रिपोर्ट', ar:'أبحاث وتقارير الصناعة' },
  'NexBids Academy': { es:'Academia NexBids', fr:'Académie NexBids', de:'NexBids Akademie', pt:'Academia NexBids', ru:'Академия NexBids', zh:'NexBids学院', ko:'NexBids 아카데미', ja:'NexBidsアカデミー', ms:'Akademi NexBids', th:'สถาบัน NexBids', vi:'Học Viện NexBids', hi:'NexBids अकादमी', ar:'أكاديمية NexBids' },
  'Webinars & Events': { es:'Webinars y Eventos', fr:'Webinaires et Événements', de:'Webinare & Events', pt:'Webinars e Eventos', ru:'Вебинары и мероприятия', zh:'网络研讨会与活动', ko:'웨비나 및 이벤트', ja:'ウェビナー&イベント', ms:'Webinar & Acara', th:'เว็บบินาร์และกิจกรรม', vi:'Hội Thảo & Sự Kiện', hi:'वेबिनार और इवेंट', ar:'ندوات وفعاليات' },
  // ── Case studies ──
  'Real Results. Real Partners. Real Growth.': {
    es:'Resultados Reales. Socios Reales. Crecimiento Real.', fr:'Vrais Résultats. Vrais Partenaires. Vraie Croissance.',
    de:'Echte Ergebnisse. Echte Partner. Echtes Wachstum.', pt:'Resultados Reais. Parceiros Reais. Crescimento Real.',
    ru:'Реальные результаты. Реальные партнёры. Реальный рост.', zh:'真实成果。真实伙伴。真实增长。',
    ko:'실제 성과. 실제 파트너. 실제 성장.', ja:'リアルな成果。リアルなパートナー。リアルな成長。',
    ms:'Hasil Nyata. Rakan Kongsi Nyata. Pertumbuhan Nyata.', th:'ผลลัพธ์จริง พาร์ทเนอร์จริง การเติบโตจริง',
    vi:'Kết Quả Thực. Đối Tác Thực. Tăng Trưởng Thực.', hi:'वास्तविक परिणाम। वास्तविक भागीदार। वास्तविक विकास।', ar:'نتائج حقيقية. شركاء حقيقيون. نمو حقيقي.'
  },
  // ── Contact ──
  "Can't Find What You're Looking For?": {
    es:'¿No encuentra lo que busca?', fr:'Vous ne trouvez pas ce que vous cherchez?', de:'Nicht gefunden, was Sie suchen?',
    pt:'Não encontrou o que procura?', ru:'Не нашли то, что искали?', zh:'找不到您需要的内容？',
    ko:'원하는 것을 찾지 못했나요?', ja:'お探しのものが見つかりませんか？', ms:'Tidak jumpa apa yang anda cari?',
    th:'หาสิ่งที่คุณต้องการไม่เจอ?', vi:'Không tìm thấy những gì bạn đang tìm kiếm?', hi:'जो ढूंढ रहे हैं वो नहीं मिला?', ar:'لم تجد ما تبحث عنه؟'
  },
  'Our team is ready to provide personalized guidance, technical support, or custom research.': {
    es:'Nuestro equipo está listo para brindar orientación personalizada, soporte técnico o investigación personalizada.',
    fr:'Notre équipe est prête à fournir des conseils personnalisés, une assistance technique ou des recherches sur mesure.',
    de:'Unser Team ist bereit, persönliche Beratung, technischen Support oder individuelle Recherche zu bieten.',
    pt:'Nossa equipe está pronta para fornecer orientação personalizada, suporte técnico ou pesquisa personalizada.',
    ru:'Наша команда готова предоставить персональные консультации, техническую поддержку или индивидуальные исследования.',
    zh:'我们的团队随时提供个性化指导、技术支持或定制研究。',
    ko:'우리 팀은 개인화된 안내, 기술 지원 또는 맞춤형 조사를 제공할 준备가 되어 있습니다.',
    ja:'私たちのチームは、個別の指導、技術サポート、またはカスタム調査を提供する準備ができています。',
    ms:'Pasukan kami bersedia untuk memberikan panduan peribadi, sokongan teknikal atau penyelidikan khusus.',
    th:'ทีมของเราพร้อมให้คำแนะนำส่วนตัว การสนับสนุนทางเทคนิค หรือการวิจัยที่กำหนดเอง',
    vi:'Đội ngũ của chúng tôi sẵn sàng cung cấp hướng dẫn cá nhân hóa, hỗ trợ kỹ thuật hoặc nghiên cứu tùy chỉnh.',
    hi:'हमारी टीम व्यक्तिगत मार्गदर्शन, तकनीकी सहायता या कस्टम अनुसंधान प्रदान करने के लिए तैयार है।',
    ar:'فريقنا جاهز لتقديم الإرشاد الشخصي والدعم الفني أو البحث المخصص.'
  },
  'Contact Support': { es:'Contactar Soporte', fr:'Contacter le Support', de:'Support Kontaktieren', pt:'Contatar Suporte', ru:'Связаться с поддержкой', zh:'联系支持', ko:'지원 연락', ja:'サポートに連絡', ms:'Hubungi Sokongan', th:'ติดต่อฝ่ายสนับสนุน', vi:'Liên Hệ Hỗ Trợ', hi:'सपोर्ट से संपर्क करें', ar:'التواصل مع الدعم' },
  'Talk to a Specialist': { es:'Hablar con un Especialista', fr:'Parler à un Spécialiste', de:'Mit einem Spezialisten Sprechen', pt:'Falar com um Especialista', ru:'Поговорить со специалистом', zh:'与专家交谈', ko:'전문가와 상담', ja:'専門家に話す', ms:'Bercakap dengan Pakar', th:'พูดคุยกับผู้เชี่ยวชาญ', vi:'Nói Chuyện Với Chuyên Gia', hi:'विशेषज्ञ से बात करें', ar:'التحدث مع متخصص' },
  // ── Metrics labels ──
  'Bids/sec': { es:'Pujas/seg', fr:'Enchères/sec', de:'Gebote/Sek', pt:'Lances/seg', ru:'Ставок/сек', zh:'每秒竞价', ko:'입찰/초', ja:'入札/秒', ms:'Bida/saat', th:'บิด/วิ', vi:'Đấu giá/giây', hi:'बिड/सेक', ar:'مزايدة/ثانية' },
  'Wins/sec': { es:'Ganados/seg', fr:'Victoires/sec', de:'Siege/Sek', pt:'Vitórias/seg', ru:'Побед/сек', zh:'每秒中标', ko:'낙찰/초', ja:'落札/秒', ms:'Menang/saat', th:'ชนะ/วิ', vi:'Thắng/giây', hi:'जीत/सेक', ar:'فوز/ثانية' },
  'Ad Value/min': { es:'Valor Publi/min', fr:'Valeur Pub/min', de:'Anzeigewert/Min', pt:'Valor Anúncio/min', ru:'Стоимость/мин', zh:'广告价值/分钟', ko:'광고가치/분', ja:'広告価値/分', ms:'Nilai Iklan/min', th:'มูลค่าโฆษณา/นาที', vi:'Giá Trị QC/phút', hi:'विज्ञापन मूल्य/मिनट', ar:'قيمة الإعلان/دقيقة' },
  // ── Navigation & page labels ──
  'Advertisers': { es:'Anunciantes', fr:'Annonceurs', de:'Werbetreibende', pt:'Anunciantes', ru:'Рекламодатели', zh:'广告主', ko:'광고주', ja:'広告主', ms:'Pengiklan', th:'ผู้ลงโฆษณา', vi:'Nhà Quảng Cáo', hi:'विज्ञापनदाता', ar:'المعلنون' },
  'Publishers': { es:'Editores', fr:'Éditeurs', de:'Publisher', pt:'Editores', ru:'Издатели', zh:'发布商', ko:'퍼블리셔', ja:'パブリッシャー', ms:'Penerbit', th:'ผู้เผยแพร่', vi:'Nhà Xuất Bản', hi:'प्रकाशक', ar:'الناشرون' },
  'Agencies': { es:'Agencias', fr:'Agences', de:'Agenturen', pt:'Agências', ru:'Агентства', zh:'代理商', ko:'에이전시', ja:'エージェンシー', ms:'Agensi', th:'เอเจนซี่', vi:'Đại Lý', hi:'एजेंसी', ar:'الوكالات' },
  'Publishers & Developers': { es:'Editores y Desarrolladores', fr:'Éditeurs & Développeurs', de:'Publisher & Entwickler', pt:'Editores & Desenvolvedores', ru:'Издатели & Разработчики', zh:'发布商与开发者', ko:'퍼블리셔 및 개발자', ja:'パブリッシャー&デベロッパー', ms:'Penerbit & Pembangun', th:'ผู้เผยแพร่ & นักพัฒนา', vi:'Nhà Xuất Bản & Nhà Phát Triển', hi:'प्रकाशक और डेवलपर', ar:'الناشرون والمطورون' },
  'NexBids DSP': { es:'NexBids DSP', fr:'NexBids DSP', de:'NexBids DSP', pt:'NexBids DSP', ru:'NexBids DSP', zh:'NexBids DSP（需求方平台）', ko:'NexBids DSP', ja:'NexBids DSP', ms:'NexBids DSP', th:'NexBids DSP', vi:'NexBids DSP', hi:'NexBids DSP', ar:'NexBids DSP' },
  'NexBids ADX': { es:'NexBids ADX', fr:'NexBids ADX', de:'NexBids ADX', pt:'NexBids ADX', ru:'NexBids ADX', zh:'NexBids ADX（广告交易平台）', ko:'NexBids ADX', ja:'NexBids ADX', ms:'NexBids ADX', th:'NexBids ADX', vi:'NexBids ADX', hi:'NexBids ADX', ar:'NexBids ADX' },
  'NexBids SSP': { es:'NexBids SSP', fr:'NexBids SSP', de:'NexBids SSP', pt:'NexBids SSP', ru:'NexBids SSP', zh:'NexBids SSP（供应方平台）', ko:'NexBids SSP', ja:'NexBids SSP', ms:'NexBids SSP', th:'NexBids SSP', vi:'NexBids SSP', hi:'NexBids SSP', ar:'NexBids SSP' },
  // ── Products / Solutions page heroes & CTAs ──
  'Advertiser Launch Solutions': { es:'Soluciones de Lanzamiento para Anunciantes', fr:'Solutions de Lancement pour Annonceurs', de:'Start-Lösungen für Werbetreibende', pt:'Soluções de Lançamento para Anunciantes', ru:'Стартовые решения для рекламодателей', zh:'广告主启动方案', ko:'광고주 런칭 솔루션', ja:'広告主ローンチソリューション', ms:'Penyelesaian Pelancaran Pengiklan', th:'โซลูชันเปิดตัวสำหรับผู้ลงโฆษณา', vi:'Giải Pháp Khởi Chạy Nhà Quảng Cáo', hi:'विज्ञापनदाता लॉन्च समाधान', ar:'حلول إطلاق المعلنين' },
  'Advertiser Growth Cases': { es:'Casos de Crecimiento de Anunciantes', fr:'Cas de Croissance Annonceurs', de:'Wachstumsfälle für Werbetreibende', pt:'Casos de Crescimento de Anunciantes', ru:'Кейсы роста рекламодателей', zh:'广告主增长案例', ko:'광고주 성장 사례', ja:'広告主成長事例', ms:'Kes Pertumbuhan Pengiklan', th:'กรณีการเติบโตของผู้ลงโฆษณา', vi:'Trường Hợp Tăng Trưởng Nhà Quảng Cáo', hi:'विज्ञापनदाता वृद्धि मामले', ar:'حالات نمو المعلنين' },
  'Publisher & Developer Growth Cases': { es:'Casos de Editores y Desarrolladores', fr:'Cas Éditeurs & Développeurs', de:'Wachstumsfälle für Publisher & Entwickler', pt:'Casos de Editores & Desenvolvedores', ru:'Кейсы издателей & разработчиков', zh:'发布商与开发者增长案例', ko:'퍼블리셔 & 개발자 성장 사례', ja:'パブリッシャー&開発者成長事例', ms:'Kes Pertumbuhan Penerbit & Pembangun', th:'กรณีการเติบโตของผู้เผยแพร่ & นักพัฒนา', vi:'Trường Hợp Tăng Trưởng Nhà Xuất Bản & Nhà Phát Triển', hi:'प्रकाशक और डेवलपर वृद्धि मामले', ar:'حالات نمو الناشرين والمطورين' },
  'Publisher & Developer Monetization': { es:'Monetización de Editores y Desarrolladores', fr:'Monétisation Éditeurs & Développeurs', de:'Publisher & Entwickler Monetarisierung', pt:'Monetização de Editores & Desenvolvedores', ru:'Монетизация для издателей & разработчиков', zh:'发布商与开发者变现', ko:'퍼블리셔 & 개발자 수익화', ja:'パブリッシャー&開発者向け収益化', ms:'Pengewangan Penerbit & Pembangun', th:'การสร้างรายได้สำหรับผู้เผยแพร่ & นักพัฒนา', vi:'Kiếm Tiền Từ Nhà Xuất Bản & Nhà Phát Triển', hi:'प्रकाशक और डेवलपर मुद्रीकरण', ar:'تحقيق الدخل للناشرين والمطورين' },
  'Agency Cooperation Solutions': { es:'Soluciones de Cooperación para Agencias', fr:'Solutions de Coopération Agences', de:'Kooperationslösungen für Agenturen', pt:'Soluções de Cooperação para Agências', ru:'Решения для сотрудничества агентств', zh:'代理商合作解决方案', ko:'에이전시 협력 솔루션', ja:'エージェンシー協力ソリューション', ms:'Penyelesaian Kerjasama Agensi', th:'โซลูชันความร่วมมือเอเจนซี่', vi:'Giải Pháp Hợp Tác Đại Lý', hi:'एजेंसी सहयोग समाधान', ar:'حلول تعاون الوكالات' },
  'Apply as Publisher': { es:'Solicitar como Editor', fr:"Postuler en tant qu'Éditeur", de:'Als Publisher Bewerben', pt:'Candidatar como Editor', ru:'Подать заявку как издатель', zh:'申请成为发布商', ko:'퍼블리셔로 신청', ja:'パブリッシャーとして申請', ms:'Mohon Sebagai Penerbit', th:'สมัครเป็นผู้เผยแพร่', vi:'Đăng Ký Làm Nhà Xuất Bản', hi:'प्रकाशक के रूप में आवेदन करें', ar:'التقدم كناشر' },
  'Apply for Agency Partnership': { es:'Solicitar Asociación de Agencia', fr:'Postuler pour un Partenariat Agence', de:'Für Agenturpartnerschaft Bewerben', pt:'Solicitar Parceria de Agência', ru:'Подать заявку на партнёрство агентства', zh:'申请代理商合作', ko:'에이전시 파트너십 신청', ja:'エージェンシーパートナーシップに申請', ms:'Mohon Perkongsian Agensi', th:'สมัครความร่วมมือเอเจนซี่', vi:'Đăng Ký Quan Hệ Đối Tác Đại Lý', hi:'एजेंसी पार्टनरशिप के लिए आवेदन करें', ar:'التقدم لشراكة الوكالة' },
  'Apply': { es:'Solicitar', fr:'Postuler', de:'Bewerben', pt:'Candidatar', ru:'Подать заявку', zh:'申请', ko:'신청', ja:'申請', ms:'Mohon', th:'สมัคร', vi:'Đăng Ký', hi:'आवेदन करें', ar:'تقدم' },
  'Explore DSP \u2192': { es:'Explorar DSP \u2192', fr:'Explorer DSP \u2192', de:'DSP Erkunden \u2192', pt:'Explorar DSP \u2192', ru:'Изучить DSP \u2192', zh:'了解DSP \u2192', ko:'DSP 탐색 \u2192', ja:'DSPを探る \u2192', ms:'Terokai DSP \u2192', th:'สำรวจ DSP \u2192', vi:'Khám Phá DSP \u2192', hi:'DSP एक्सप्लोर करें \u2192', ar:'استكشاف DSP \u2190' },
  'Explore ADX \u2192': { es:'Explorar ADX \u2192', fr:'Explorer ADX \u2192', de:'ADX Erkunden \u2192', pt:'Explorar ADX \u2192', ru:'Изучить ADX \u2192', zh:'了解ADX \u2192', ko:'ADX 탐색 \u2192', ja:'ADXを探る \u2192', ms:'Terokai ADX \u2192', th:'สำรวจ ADX \u2192', vi:'Khám Phá ADX \u2192', hi:'ADX एक्सप्लोर करें \u2192', ar:'استكشاف ADX \u2190' },
  'Explore SSP \u2192': { es:'Explorar SSP \u2192', fr:'Explorer SSP \u2192', de:'SSP Erkunden \u2192', pt:'Explorar SSP \u2192', ru:'Изучить SSP \u2192', zh:'了解SSP \u2192', ko:'SSP 탐색 \u2192', ja:'SSPを探る \u2192', ms:'Terokai SSP \u2192', th:'สำรวจ SSP \u2192', vi:'Khám Phá SSP \u2192', hi:'SSP एक्सप्लोर करें \u2192', ar:'استكشاف SSP \u2190' },
  'Explore NexBids DSP': { es:'Explorar NexBids DSP', fr:'Explorer NexBids DSP', de:'NexBids DSP Erkunden', pt:'Explorar NexBids DSP', ru:'Изучить NexBids DSP', zh:'了解NexBids DSP', ko:'NexBids DSP 탐색', ja:'NexBids DSPを探る', ms:'Terokai NexBids DSP', th:'สำรวจ NexBids DSP', vi:'Khám Phá NexBids DSP', hi:'NexBids DSP एक्सप्लोर करें', ar:'استكشاف NexBids DSP' },
  'Explore NexBids SSP': { es:'Explorar NexBids SSP', fr:'Explorer NexBids SSP', de:'NexBids SSP Erkunden', pt:'Explorar NexBids SSP', ru:'Изучить NexBids SSP', zh:'了解NexBids SSP', ko:'NexBids SSP 탐색', ja:'NexBids SSPを探る', ms:'Terokai NexBids SSP', th:'สำรวจ NexBids SSP', vi:'Khám Phá NexBids SSP', hi:'NexBids SSP एक्सप्लोर करें', ar:'استكشاف NexBids SSP' },
  'Explore Platforms': { es:'Explorar Plataformas', fr:'Explorer les Plateformes', de:'Plattformen Erkunden', pt:'Explorar Plataformas', ru:'Изучить Платформы', zh:'探索平台', ko:'플랫폼 탐색', ja:'プラットフォームを探る', ms:'Terokai Platform', th:'สำรวจแพลตฟอร์ม', vi:'Khám Phá Nền Tảng', hi:'प्लेटफॉर्म एक्सप्लोर करें', ar:'استكشاف المنصات' },
  'Learn More \u2192': { es:'Más Información \u2192', fr:'En Savoir Plus \u2192', de:'Mehr Erfahren \u2192', pt:'Saiba Mais \u2192', ru:'Узнать Больше \u2192', zh:'了解更多 \u2192', ko:'더 알아보기 \u2192', ja:'詳しく見る \u2192', ms:'Ketahui Lebih \u2192', th:'เรียนรู้เพิ่มเติม \u2192', vi:'Tìm Hiểu Thêm \u2192', hi:'अधिक जानें \u2192', ar:'اعرف المزيد \u2190' },
  'View Solution \u2192': { es:'Ver Solución \u2192', fr:'Voir la Solution \u2192', de:'Lösung Ansehen \u2192', pt:'Ver Solução \u2192', ru:'Смотреть решение \u2192', zh:'查看方案 \u2192', ko:'솔루션 보기 \u2192', ja:'ソリューションを見る \u2192', ms:'Lihat Penyelesaian \u2192', th:'ดูโซลูชัน \u2192', vi:'Xem Giải Pháp \u2192', hi:'समाधान देखें \u2192', ar:'عرض الحل \u2190' },
  'View All Case Studies \u2192': { es:'Ver Todos los Casos \u2192', fr:'Voir Toutes les Études \u2192', de:'Alle Fallstudien \u2192', pt:'Ver Todos os Casos \u2192', ru:'Все кейсы \u2192', zh:'查看所有案例 \u2192', ko:'모든 사례 보기 \u2192', ja:'すべての事例を見る \u2192', ms:'Lihat Semua Kajian Kes \u2192', th:'ดูกรณีศึกษาทั้งหมด \u2192', vi:'Xem Tất Cả Nghiên Cứu Điển Hình \u2192', hi:'सभी केस स्टडी देखें \u2192', ar:'عرض جميع الدراسات \u2190' },
  'View All Advertiser Cases \u2192': { es:'Ver Todos los Casos de Anunciantes \u2192', fr:'Voir Tous les Cas Annonceurs \u2192', de:'Alle Werbetreibenden-Fälle \u2192', pt:'Ver Todos os Casos de Anunciantes \u2192', ru:'Все кейсы рекламодателей \u2192', zh:'查看所有广告主案例 \u2192', ko:'모든 광고주 사례 \u2192', ja:'広告主の全事例を見る \u2192', ms:'Lihat Semua Kes Pengiklan \u2192', th:'ดูเคสผู้ลงโฆษณาทั้งหมด \u2192', vi:'Xem Tất Cả Trường Hợp Nhà Quảng Cáo \u2192', hi:'सभी विज्ञापनदाता केस देखें \u2192', ar:'عرض جميع حالات المعلنين \u2190' },
  'View All Publisher Cases \u2192': { es:'Ver Todos los Casos de Editores \u2192', fr:'Voir Tous les Cas Éditeurs \u2192', de:'Alle Publisher-Fälle \u2192', pt:'Ver Todos os Casos de Editores \u2192', ru:'Все кейсы издателей \u2192', zh:'查看所有发布商案例 \u2192', ko:'모든 퍼블리셔 사례 \u2192', ja:'パブリッシャーの全事例を見る \u2192', ms:'Lihat Semua Kes Penerbit \u2192', th:'ดูเคสผู้เผยแพร่ทั้งหมด \u2192', vi:'Xem Tất Cả Trường Hợp Nhà Xuất Bản \u2192', hi:'सभी प्रकाशक केस देखें \u2192', ar:'عرض جميع حالات الناشرين \u2190' },
  'View Full Technology Stack \u2192': { es:'Ver Stack de Tecnología Completo \u2192', fr:'Voir la Stack Technologique \u2192', de:'Vollständigen Technologie-Stack \u2192', pt:'Ver Stack de Tecnologia Completo \u2192', ru:'Полный технологический стек \u2192', zh:'查看完整技术栈 \u2192', ko:'전체 기술 스택 보기 \u2192', ja:'完全な技術スタックを見る \u2192', ms:'Lihat Stack Teknologi Penuh \u2192', th:'ดู Technology Stack ทั้งหมด \u2192', vi:'Xem Toàn Bộ Technology Stack \u2192', hi:'पूरा टेक्नोलॉजी स्टैक देखें \u2192', ar:'عرض حزمة التكنولوجيا الكاملة \u2190' },
  'Start Advertising': { es:'Comenzar a Anunciar', fr:'Commencer à Annoncer', de:'Werbung Starten', pt:'Começar a Anunciar', ru:'Начать рекламировать', zh:'开始投放广告', ko:'광고 시작', ja:'広告を始める', ms:'Mulakan Pengiklanan', th:'เริ่มโฆษณา', vi:'Bắt Đầu Quảng Cáo', hi:'विज्ञापन शुरू करें', ar:'ابدأ الإعلان' },
  'Start Monetizing': { es:'Comenzar a Monetizar', fr:'Commencer à Monétiser', de:'Monetarisierung Starten', pt:'Começar a Monetizar', ru:'Начать монетизацию', zh:'开始变现', ko:'수익화 시작', ja:'収益化を始める', ms:'Mulakan Pengewangan', th:'เริ่มสร้างรายได้', vi:'Bắt Đầu Kiếm Tiền', hi:'मुद्रीकरण शुरू करें', ar:'ابدأ تحقيق الدخل' },
  // ── Platform feature labels ──
  'AI Bidding & ROAS Optimizer': { es:'IA de Pujas y Optimizador de ROAS', fr:"IA d'Enchères & Optimiseur ROAS", de:'KI-Gebote & ROAS-Optimierer', pt:'IA de Lances & Otimizador de ROAS', ru:'ИИ-ставки и оптимизатор ROAS', zh:'AI竞价与ROAS优化器', ko:'AI 입찰 & ROAS 최적화', ja:'AI入札 & ROASオプティマイザー', ms:'Bida AI & Pengoptimum ROAS', th:'AI Bidding & ROAS Optimizer', vi:'AI Đấu Thầu & Tối Ưu ROAS', hi:'AI बिडिंग और ROAS ऑप्टिमाइज़र', ar:'عروض أسعار الذكاء الاصطناعي ومُحسِّن ROAS' },
  'AI-Powered Fraud Detection': { es:'Detección de Fraude con IA', fr:'Détection de Fraude par IA', de:'KI-gestützte Betrugserkennung', pt:'Detecção de Fraude com IA', ru:'ИИ-обнаружение мошенничества', zh:'AI驱动欺诈检测', ko:'AI 기반 사기 탐지', ja:'AI不正検知', ms:'Pengesanan Penipuan Berkuasa AI', th:'การตรวจจับการฉ้อโกงด้วย AI', vi:'Phát Hiện Gian Lận Bằng AI', hi:'AI-संचालित धोखाधड़ी पहचान', ar:'كشف الاحتيال بالذكاء الاصطناعي' },
  'Brand Safety Verified': { es:'Seguridad de Marca Verificada', fr:'Sécurité de Marque Vérifiée', de:'Markensicherheit Verifiziert', pt:'Segurança de Marca Verificada', ru:'Верификация безопасности бренда', zh:'品牌安全认证', ko:'브랜드 안전 검증', ja:'ブランドセーフティ確認済み', ms:'Keselamatan Jenama Disahkan', th:'ยืนยันความปลอดภัยของแบรนด์', vi:'Đã Xác Minh An Toàn Thương Hiệu', hi:'ब्रांड सेफ्टी सत्यापित', ar:'أمان العلامة التجارية معتمد' },
  'Real-Time Analytics Dashboard': { es:'Panel de Análisis en Tiempo Real', fr:'Tableau de Bord Analytique en Temps Réel', de:'Echtzeit-Analyse-Dashboard', pt:'Painel de Análise em Tempo Real', ru:'Дашборд аналитики в реальном времени', zh:'实时数据分析仪表盘', ko:'실시간 분석 대시보드', ja:'リアルタイム分析ダッシュボード', ms:'Papan Pemuka Analitik Masa Nyata', th:'แดชบอร์ดวิเคราะห์แบบเรียลไทม์', vi:'Bảng Phân Tích Thời Gian Thực', hi:'रियल-टाइम एनालिटिक्स डैशबोर्ड', ar:'لوحة تحليلات في الوقت الفعلي' },
  'Floor Price AI Optimizer': { es:'Optimizador IA de Precio Mínimo', fr:'Optimiseur IA de Prix Plancher', de:'KI-Bodenpreis-Optimierer', pt:'Otimizador IA de Preço Mínimo', ru:'ИИ-оптимизатор минимальной цены', zh:'底价AI优化器', ko:'최저가 AI 최적화', ja:'フロアプライスAIオプティマイザー', ms:'Pengoptimum AI Harga Lantai', th:'Floor Price AI Optimizer', vi:'Tối Ưu Giá Sàn AI', hi:'फ्लोर प्राइस AI ऑप्टिमाइज़र', ar:'مُحسِّن سعر الأرضية بالذكاء الاصطناعي' },
  'Header Bidding & PMP Support': { es:'Header Bidding y Soporte PMP', fr:'Header Bidding & Support PMP', de:'Header Bidding & PMP-Support', pt:'Header Bidding & Suporte PMP', ru:'Header Bidding и поддержка PMP', zh:'头部竞价与PMP支持', ko:'헤더 비딩 & PMP 지원', ja:'ヘッダービディング & PMPサポート', ms:'Header Bidding & Sokongan PMP', th:'Header Bidding & PMP Support', vi:'Header Bidding & Hỗ Trợ PMP', hi:'हेडर बिडिंग और PMP सपोर्ट', ar:'Header Bidding ودعم PMP' },
  'Prebid.js Header Bidding': { es:'Header Bidding Prebid.js', fr:'Header Bidding Prebid.js', de:'Prebid.js Header Bidding', pt:'Header Bidding Prebid.js', ru:'Header Bidding Prebid.js', zh:'Prebid.js 头部竞价', ko:'Prebid.js 헤더 비딩', ja:'Prebid.js ヘッダービディング', ms:'Header Bidding Prebid.js', th:'Prebid.js Header Bidding', vi:'Header Bidding Prebid.js', hi:'Prebid.js हेडर बिडिंग', ar:'Header Bidding بـ Prebid.js' },
  'PMP & Programmatic Direct': { es:'PMP y Programática Directa', fr:'PMP & Programmatique Direct', de:'PMP & Programmatischer Direktkauf', pt:'PMP & Programático Direto', ru:'PMP и прямая программатика', zh:'PMP与程序化直投', ko:'PMP & 프로그래매틱 직접구매', ja:'PMP & プログラマティックダイレクト', ms:'PMP & Programatik Langsung', th:'PMP & Programmatic Direct', vi:'PMP & Lập Trình Trực Tiếp', hi:'PMP और प्रोग्रामेटिक डायरेक्ट', ar:'PMP والبرمجي المباشر' },
  'Third-Party MMP Integration': { es:'Integración MMP de Terceros', fr:'Intégration MMP Tiers', de:'Drittanbieter-MMP-Integration', pt:'Integração MMP de Terceiros', ru:'Интеграция с MMP сторонних производителей', zh:'第三方MMP集成', ko:'써드파티 MMP 연동', ja:'サードパーティMMP統合', ms:'Integrasi MMP Pihak Ketiga', th:'การผสานรวม MMP บุคคลที่สาม', vi:'Tích Hợp MMP Bên Thứ Ba', hi:'थर्ड-पार्टी MMP इंटीग्रेशन', ar:'تكامل MMP من طرف ثالث' },
  'iOS & Android SDK': { es:'SDK para iOS y Android', fr:'SDK iOS & Android', de:'iOS & Android SDK', pt:'SDK iOS & Android', ru:'SDK для iOS & Android', zh:'iOS和Android SDK', ko:'iOS & 안드로이드 SDK', ja:'iOS & Android SDK', ms:'SDK iOS & Android', th:'iOS & Android SDK', vi:'SDK iOS & Android', hi:'iOS और Android SDK', ar:'SDK لـ iOS وأندرويد' },
  'Live in Hours, Not Weeks': { es:'En Vivo en Horas, no Semanas', fr:'En Ligne en Heures, pas en Semaines', de:'Live in Stunden, nicht Wochen', pt:'Ao Vivo em Horas, não Semanas', ru:'Запуск за часы, не недели', zh:'几小时上线，而非几周', ko:'몇 시간 안에 라이브, 몇 주가 아닌', ja:'数週間でなく数時間で開始', ms:'Langsung dalam Jam, Bukan Minggu', th:'เริ่มต้นได้ในชั่วโมง ไม่ใช่สัปดาห์', vi:'Hoạt Động Trong Vài Giờ, Không Phải Tuần', hi:'घंटों में लाइव, हफ्तों में नहीं', ar:'مباشر في ساعات وليس أسابيع' },
  'Real-Time Quality Scoring': { es:'Puntuación de Calidad en Tiempo Real', fr:'Score de Qualité en Temps Réel', de:'Echtzeit-Qualitätsbewertung', pt:'Pontuação de Qualidade em Tempo Real', ru:'Оценка качества в реальном времени', zh:'实时质量评分', ko:'실시간 품질 점수', ja:'リアルタイム品質スコア', ms:'Pemarkahan Kualiti Masa Nyata', th:'คะแนนคุณภาพแบบเรียลไทม์', vi:'Chấm Điểm Chất Lượng Thời Gian Thực', hi:'रियल-टाइम गुणवत्ता स्कोरिंग', ar:'تسجيل الجودة في الوقت الفعلي' },
  'OpenRTB 2.6 Compliant': { es:'Conforme con OpenRTB 2.6', fr:'Conforme OpenRTB 2.6', de:'OpenRTB 2.6 konform', pt:'Conforme com OpenRTB 2.6', ru:'Соответствие OpenRTB 2.6', zh:'符合OpenRTB 2.6标准', ko:'OpenRTB 2.6 준수', ja:'OpenRTB 2.6 準拠', ms:'Mematuhi OpenRTB 2.6', th:'สอดคล้องกับ OpenRTB 2.6', vi:'Tuân Thủ OpenRTB 2.6', hi:'OpenRTB 2.6 अनुपालन', ar:'متوافق مع OpenRTB 2.6' },
  '30+ Ad Formats': { es:'30+ Formatos de Anuncios', fr:'30+ Formats Publicitaires', de:'30+ Anzeigenformate', pt:'30+ Formatos de Anúncios', ru:'30+ форматов рекламы', zh:'30+广告格式', ko:'30+ 광고 형식', ja:'30以上の広告フォーマット', ms:'30+ Format Iklan', th:'30+ รูปแบบโฆษณา', vi:'30+ Định Dạng Quảng Cáo', hi:'30+ विज्ञापन प्रारूप', ar:'أكثر من 30 تنسيقًا إعلانيًا' },
  '30+ Ad Formats Across Every Channel': { es:'30+ Formatos de Anuncios en Cada Canal', fr:'30+ Formats sur Chaque Canal', de:'30+ Anzeigenformate über alle Kanäle', pt:'30+ Formatos em Cada Canal', ru:'30+ форматов по всем каналам', zh:'覆盖所有渠道的30+广告格式', ko:'모든 채널 30+ 광고 형식', ja:'すべてのチャンネルで30以上のフォーマット', ms:'30+ Format Iklan Di Setiap Saluran', th:'30+ รูปแบบโฆษณาในทุกช่องทาง', vi:'30+ Định Dạng Quảng Cáo Trên Mọi Kênh', hi:'हर चैनल पर 30+ विज्ञापन प्रारूप', ar:'أكثر من 30 تنسيقًا عبر كل قناة' },
  '300+ Audience Segments': { es:'300+ Segmentos de Audiencia', fr:"300+ Segments d'Audience", de:'300+ Zielgruppensegmente', pt:'300+ Segmentos de Audiência', ru:'300+ сегментов аудитории', zh:'300+受众细分', ko:'300+ 오디언스 세그먼트', ja:'300以上のオーディエンスセグメント', ms:'300+ Segmen Audiens', th:'300+ กลุ่มผู้ชม', vi:'300+ Phân Khúc Đối Tượng', hi:'300+ ऑडियंस सेगमेंट', ar:'أكثر من 300 شريحة جمهور' },
  '50B+ Daily Auctions': { es:'50B+ Subastas Diarias', fr:'50B+ Enchères Quotidiennes', de:'50B+ tägliche Auktionen', pt:'50B+ Leilões Diários', ru:'50B+ аукционов в день', zh:'每日50B+竞拍', ko:'일일 50B+ 경매', ja:'1日50B以上のオークション', ms:'50B+ Lelongan Harian', th:'50B+ การประมูลต่อวัน', vi:'50B+ Đấu Giá Hàng Ngày', hi:'50B+ दैनिक नीलामी', ar:'أكثر من 50 مليار مزاد يوميًا' },
  '50B+ bid requests/day': { es:'50B+ solicitudes de puja/día', fr:"50B+ demandes d'enchères/jour", de:'50B+ Gebotsanfragen/Tag', pt:'50B+ solicitações de lance/dia', ru:'50B+ запросов ставок в день', zh:'每天50B+竞价请求', ko:'일일 50B+ 입찰 요청', ja:'1日50B以上の入札リクエスト', ms:'50B+ permintaan bida/hari', th:'50B+ คำขอบิดต่อวัน', vi:'50B+ yêu cầu đấu giá/ngày', hi:'50B+ बिड रिक्वेस्ट/दिन', ar:'أكثر من 50 مليار طلب مزايدة يوميًا' },
  '50K+ Active Advertisers': { es:'50K+ Anunciantes Activos', fr:'50K+ Annonceurs Actifs', de:'50K+ Aktive Werbetreibende', pt:'50K+ Anunciantes Ativos', ru:'50K+ активных рекламодателей', zh:'50K+活跃广告主', ko:'50K+ 활성 광고주', ja:'50K以上のアクティブ広告主', ms:'50K+ Pengiklan Aktif', th:'50K+ ผู้ลงโฆษณาที่ใช้งานอยู่', vi:'50K+ Nhà Quảng Cáo Đang Hoạt Động', hi:'50K+ सक्रिय विज्ञापनदाता', ar:'أكثر من 50 ألف معلن نشط' },
  '150+ Countries': { es:'150+ Países', fr:'150+ Pays', de:'150+ Länder', pt:'150+ Países', ru:'150+ стран', zh:'150+个国家', ko:'150개국 이상', ja:'150カ国以上', ms:'150+ Negara', th:'150+ ประเทศ', vi:'150+ Quốc Gia', hi:'150+ देश', ar:'أكثر من 150 دولة' },
  'Daily Auctions': { es:'Subastas Diarias', fr:'Enchères Quotidiennes', de:'Tägliche Auktionen', pt:'Leilões Diários', ru:'Аукционов в день', zh:'每日竞拍', ko:'일일 경매', ja:'1日のオークション', ms:'Lelongan Harian', th:'การประมูลต่อวัน', vi:'Đấu Giá Hàng Ngày', hi:'दैनिक नीलामी', ar:'مزادات يومية' },
  'Win Rate': { es:'Tasa de Ganancia', fr:'Taux de Succès', de:'Gewinnrate', pt:'Taxa de Vitória', ru:'Процент побед', zh:'中标率', ko:'낙찰률', ja:'落札率', ms:'Kadar Menang', th:'อัตราการชนะ', vi:'Tỷ Lệ Thắng', hi:'जीत दर', ar:'معدل الفوز' },
  'Avg ROAS': { es:'ROAS Promedio', fr:'ROAS Moyen', de:'Durchschnittlicher ROAS', pt:'ROAS Médio', ru:'Средний ROAS', zh:'平均ROAS', ko:'평균 ROAS', ja:'平均ROAS', ms:'ROAS Purata', th:'ROAS เฉลี่ย', vi:'ROAS Trung Bình', hi:'औसत ROAS', ar:'متوسط ROAS' },
  'Avg eCPM Lift': { es:'Aumento Promedio de eCPM', fr:'Hausse Moyenne eCPM', de:'Durchschnittlicher eCPM-Anstieg', pt:'Aumento Médio de eCPM', ru:'Средний прирост eCPM', zh:'平均eCPM提升', ko:'평균 eCPM 향상', ja:'平均eCPMアップ', ms:'Peningkatan eCPM Purata', th:'การเพิ่มขึ้น eCPM เฉลี่ย', vi:'Tăng eCPM Trung Bình', hi:'औसत eCPM वृद्धि', ar:'متوسط ارتفاع eCPM' },
  'Bid Requests': { es:'Solicitudes de Puja', fr:"Demandes d'Enchères", de:'Gebotsanfragen', pt:'Solicitações de Lance', ru:'Запросы ставок', zh:'竞价请求', ko:'입찰 요청', ja:'入札リクエスト', ms:'Permintaan Bida', th:'คำขอบิด', vi:'Yêu Cầu Đặt Giá Thầu', hi:'बिड रिक्वेस्ट', ar:'طلبات المزايدة' },
  'Bid Response': { es:'Respuesta de Puja', fr:"Réponse d'Enchère", de:'Gebotsantwort', pt:'Resposta de Lance', ru:'Ответ на ставку', zh:'竞价响应', ko:'입찰 응답', ja:'入札レスポンス', ms:'Respons Bida', th:'การตอบสนองบิด', vi:'Phản Hồi Đặt Giá Thầu', hi:'बिड रिस्पॉन्स', ar:'استجابة المزايدة' },
  'End-to-End Latency': { es:'Latencia Punto a Punto', fr:'Latence de bout en bout', de:'Ende-zu-Ende-Latenz', pt:'Latência de Ponta a Ponta', ru:'Сквозная задержка', zh:'端到端延迟', ko:'엔드-투-엔드 지연', ja:'エンドツーエンド遅延', ms:'Latensi Hujung ke Hujung', th:'ความหน่วงปลายถึงปลาย', vi:'Độ Trễ Đầu Cuối', hi:'एंड-टू-एंड लेटेंसी', ar:'الكمون من النهاية إلى النهاية' },
  'Uptime SLA': { es:'SLA de Disponibilidad', fr:'SLA de Disponibilité', de:'Verfügbarkeits-SLA', pt:'SLA de Uptime', ru:'SLA доступности', zh:'可用性SLA', ko:'업타임 SLA', ja:'稼働率SLA', ms:'SLA Masa Aktif', th:'Uptime SLA', vi:'SLA Thời Gian Hoạt Động', hi:'अपटाइम SLA', ar:'اتفاقية مستوى التشغيل' },
  'Processing Capacity': { es:'Capacidad de Procesamiento', fr:'Capacité de Traitement', de:'Verarbeitungskapazität', pt:'Capacidade de Processamento', ru:'Производительность обработки', zh:'处理能力', ko:'처리 용량', ja:'処理能力', ms:'Kapasiti Pemprosesan', th:'ความสามารถในการประมวลผล', vi:'Công Suất Xử Lý', hi:'प्रोसेसिंग क्षमता', ar:'سعة المعالجة' },
  'Failover RTO': { es:'RTO de Conmutación por Error', fr:'RTO de Basculement', de:'Failover RTO', pt:'RTO de Failover', ru:'RTO при отказоустойчивости', zh:'故障切换RTO', ko:'페일오버 RTO', ja:'フェイルオーバーRTO', ms:'RTO Failover', th:'Failover RTO', vi:'RTO Dự Phòng', hi:'फेलओवर RTO', ar:'RTO التعافي من الفشل' },
  'Global Real-Time Bidding at Scale': { es:'Puja en Tiempo Real Global a Escala', fr:'Enchères Mondiales en Temps Réel à Grande Échelle', de:'Globales Echtzeit-Bieting in großem Maßstab', pt:'Leilão em Tempo Real Global em Escala', ru:'Глобальные ставки в реальном времени в масштабе', zh:'大规模全球实时竞价', ko:'대규모 글로벌 실시간 입찰', ja:'大規模なグローバルリアルタイムビディング', ms:'Pembidaan Masa Nyata Global pada Skala', th:'การประมูลแบบเรียลไทม์ระดับโลกในระดับขนาด', vi:'Đấu Thầu Thời Gian Thực Toàn Cầu Ở Quy Mô Lớn', hi:'बड़े पैमाने पर वैश्विक रियल-टाइम बिडिंग', ar:'المزايدة العالمية في الوقت الفعلي على نطاق واسع' },
  'Real-time Bidding': { es:'Puja en Tiempo Real', fr:'Enchères en Temps Réel', de:'Echtzeit-Bieting', pt:'Leilão em Tempo Real', ru:'Ставки в реальном времени', zh:'实时竞价', ko:'실시간 입찰', ja:'リアルタイムビディング', ms:'Pembidaan Masa Nyata', th:'การประมูลแบบเรียลไทม์', vi:'Đấu Thầu Thời Gian Thực', hi:'रियल-टाइम बिडिंग', ar:'المزايدة في الوقت الفعلي' },
  // ── Technology page ──
  'The Technology That Powers the Future of Programmatic Advertising': { es:'La Tecnología que Impulsa el Futuro de la Publicidad Programática', fr:"La Technologie qui Propulse l'Avenir de la Pub Programmatique", de:'Die Technologie, die die Zukunft der programmatischen Werbung antreibt', pt:'A Tecnologia que Impulsiona o Futuro da Publicidade Programática', ru:'Технология, которая движет будущим программатической рекламы', zh:'驱动程序化广告未来的技术', ko:'프로그래매틱 광고의 미래를 이끄는 기술', ja:'プログラマティック広告の未来を支えるテクノロジー', ms:'Teknologi yang Memacu Masa Depan Pengiklanan Programatik', th:'เทคโนโลยีที่ขับเคลื่อนอนาคตของการโฆษณาแบบโปรแกรมเมติก', vi:'Công Nghệ Thúc Đẩy Tương Lai Của Quảng Cáo Lập Trình', hi:'प्रोग्रामेटिक विज्ञापन के भविष्य को शक्ति देने वाली तकनीक', ar:'التكنولوجيا التي تقود مستقبل الإعلانات البرمجية' },
  'Architecture': { es:'Arquitectura', fr:'Architecture', de:'Architektur', pt:'Arquitetura', ru:'Архитектура', zh:'架构', ko:'아키텍처', ja:'アーキテクチャ', ms:'Seni Bina', th:'สถาปัตยกรรม', vi:'Kiến Trúc', hi:'आर्किटेक्चर', ar:'البنية التحتية' },
  'Technology Philosophy': { es:'Filosofía Tecnológica', fr:'Philosophie Technologique', de:'Technologiephilosophie', pt:'Filosofia Tecnológica', ru:'Технологическая философия', zh:'技术理念', ko:'기술 철학', ja:'テクノロジー哲学', ms:'Falsafah Teknologi', th:'ปรัชญาเทคโนโลยี', vi:'Triết Lý Công Nghệ', hi:'तकनीकी दर्शन', ar:'فلسفة التكنولوجيا' },
  'Intelligence & Scale': { es:'Inteligencia y Escala', fr:'Intelligence et Échelle', de:'Intelligenz und Skalierung', pt:'Inteligência e Escala', ru:'Интеллект и масштаб', zh:'智能与规模', ko:'지능과 규모', ja:'インテリジェンスとスケール', ms:'Kecerdasan & Skala', th:'ความฉลาดและขนาด', vi:'Trí Tuệ & Quy Mô', hi:'बुद्धिमत्ता और स्केल', ar:'الذكاء والحجم' },
  'Intelligent Programmatic': { es:'Programática Inteligente', fr:'Programmatique Intelligent', de:'Intelligente Programmatik', pt:'Programática Inteligente', ru:'Интеллектуальная программатика', zh:'智能程序化广告', ko:'지능형 프로그래매틱', ja:'インテリジェントプログラマティック', ms:'Programatik Cerdas', th:'Programmatic อัจฉริยะ', vi:'Programmatic Thông Minh', hi:'इंटेलिजेंट प्रोग्रामेटिक', ar:'الإعلانات البرمجية الذكية' },
  'Six Proprietary ML Models at the Core': { es:'Seis Modelos ML Propietarios en el Núcleo', fr:'Six Modèles ML Propriétaires au Cœur', de:'Sechs proprietäre ML-Modelle im Kern', pt:'Seis Modelos ML Proprietários no Núcleo', ru:'Шесть проприетарных ML-моделей в ядре', zh:'六个专有机器学习模型为核心', ko:'6개의 독자적 ML 모델이 핵심', ja:'コアに6つの独自MLモデル', ms:'Enam Model ML Proprietari di Teras', th:'โมเดล ML ที่เป็นกรรมสิทธิ์หกตัวที่แกนกลาง', vi:'Sáu Mô Hình ML Độc Quyền Ở Lõi', hi:'कोर पर छह मालिकाना ML मॉडल', ar:'ستة نماذج ML خاصة في الجوهر' },
  'Microservices on Kubernetes': { es:'Microservicios en Kubernetes', fr:'Microservices sur Kubernetes', de:'Microservices auf Kubernetes', pt:'Microsserviços no Kubernetes', ru:'Микросервисы на Kubernetes', zh:'Kubernetes上的微服务', ko:'쿠버네티스 마이크로서비스', ja:'Kubernetes上のマイクロサービス', ms:'Perkhidmatan Mikro pada Kubernetes', th:'Microservices บน Kubernetes', vi:'Microservices Trên Kubernetes', hi:'Kubernetes पर माइक्रोसर्विसेज', ar:'الخدمات المصغرة على Kubernetes' },
  'Cache Layer': { es:'Capa de Caché', fr:'Couche Cache', de:'Cache-Schicht', pt:'Camada de Cache', ru:'Слой кэша', zh:'缓存层', ko:'캐시 레이어', ja:'キャッシュレイヤー', ms:'Lapisan Cache', th:'ชั้น Cache', vi:'Lớp Cache', hi:'कैश परत', ar:'طبقة التخزين المؤقت' },
  'Database Layer': { es:'Capa de Base de Datos', fr:'Couche Base de Données', de:'Datenbankschicht', pt:'Camada de Banco de Dados', ru:'Уровень базы данных', zh:'数据库层', ko:'데이터베이스 레이어', ja:'データベースレイヤー', ms:'Lapisan Pangkalan Data', th:'ชั้นฐานข้อมูล', vi:'Lớp Cơ Sở Dữ Liệu', hi:'डेटाबेस परत', ar:'طبقة قاعدة البيانات' },
  'Data Streaming': { es:'Transmisión de Datos', fr:'Diffusion de Données', de:'Daten-Streaming', pt:'Streaming de Dados', ru:'Потоковая передача данных', zh:'数据流', ko:'데이터 스트리밍', ja:'データストリーミング', ms:'Penstriman Data', th:'การสตรีมข้อมูล', vi:'Phát Trực Tiếp Dữ Liệu', hi:'डेटा स्ट्रीमिंग', ar:'تدفق البيانات' },
  // ── Company page ──
  'A Truly Global Company': { es:'Una Empresa Verdaderamente Global', fr:'Une Entreprise Véritablement Mondiale', de:'Ein wahrhaft globales Unternehmen', pt:'Uma Empresa Verdadeiramente Global', ru:'Поистине глобальная компания', zh:'真正的全球化公司', ko:'진정한 글로벌 기업', ja:'真にグローバルな企業', ms:'Syarikat Global Sebenar', th:'บริษัทระดับโลกอย่างแท้จริง', vi:'Công Ty Toàn Cầu Thực Sự', hi:'एक सच्ची वैश्विक कंपनी', ar:'شركة عالمية حقيقية' },
  'The People Leading NexBids': { es:'Las Personas que Lideran NexBids', fr:'Les Personnes qui Dirigent NexBids', de:'Die Menschen, die NexBids führen', pt:'As Pessoas que Lideram a NexBids', ru:'Люди, возглавляющие NexBids', zh:'引领NexBids的人才', ko:'NexBids를 이끄는 사람들', ja:'NexBidsをリードする人々', ms:'Orang-Orang yang Memimpin NexBids', th:'บุคคลที่นำ NexBids', vi:'Những Người Dẫn Đầu NexBids', hi:'NexBids का नेतृत्व करने वाले लोग', ar:'الأشخاص الذين يقودون NexBids' },
  'Our Mission': { es:'Nuestra Misión', fr:'Notre Mission', de:'Unsere Mission', pt:'Nossa Missão', ru:'Наша Миссия', zh:'我们的使命', ko:'우리의 미션', ja:'私たちのミッション', ms:'Misi Kami', th:'พันธกิจของเรา', vi:'Sứ Mệnh Của Chúng Tôi', hi:'हमारा मिशन', ar:'مهمتنا' },
  'Our Vision': { es:'Nuestra Visión', fr:'Notre Vision', de:'Unsere Vision', pt:'Nossa Visão', ru:'Наше Видение', zh:'我们的愿景', ko:'우리의 비전', ja:'私たちのビジョン', ms:'Visi Kami', th:'วิสัยทัศน์ของเรา', vi:'Tầm Nhìn Của Chúng Tôi', hi:'हमारा विज़न', ar:'رؤيتنا' },
  'What We Stand For': { es:'Por Qué Nos Mantenemos', fr:'Ce Pour Quoi Nous Nous Battons', de:'Wofür Wir Stehen', pt:'Pelo Que Defendemos', ru:'Во что мы верим', zh:'我们的价值观', ko:'우리가 지향하는 것', ja:'私たちが大切にすること', ms:'Apa Yang Kami Perjuangkan', th:'สิ่งที่เราเชื่อ', vi:'Những Gì Chúng Tôi Đề Cao', hi:'हम किसके लिए खड़े हैं', ar:'ما نؤمن به' },
  'Industry Awards & Recognition': { es:'Premios y Reconocimientos de la Industria', fr:"Prix et Reconnaissance de l'Industrie", de:'Branchenauszeichnungen & Anerkennungen', pt:'Prêmios e Reconhecimentos da Indústria', ru:'Отраслевые награды и признание', zh:'行业奖项与认可', ko:'업계 수상 및 인정', ja:'業界賞と認知', ms:'Anugerah & Pengiktirafan Industri', th:'รางวัลและการยอมรับในอุตสาหกรรม', vi:'Giải Thưởng & Sự Công Nhận Ngành', hi:'उद्योग पुरस्कार और मान्यता', ar:'جوائز واعترافات الصناعة' },
  'View Open Positions': { es:'Ver Posiciones Abiertas', fr:'Voir les Postes Ouverts', de:'Offene Stellen Ansehen', pt:'Ver Vagas Abertas', ru:'Просмотр вакансий', zh:'查看空缺职位', ko:'공개 채용 보기', ja:'募集中のポジションを見る', ms:'Lihat Jawatan Terbuka', th:'ดูตำแหน่งที่เปิดรับ', vi:'Xem Vị Trí Đang Tuyển', hi:'खुली पोजीशन देखें', ar:'عرض الوظائف المتاحة' },
  'Current Openings': { es:'Vacantes Actuales', fr:'Postes Actuellement Ouverts', de:'Aktuelle Stellenangebote', pt:'Vagas Atuais', ru:'Текущие вакансии', zh:'当前职位空缺', ko:'현재 채용 공고', ja:'現在の募集', ms:'Kekosongan Semasa', th:'ตำแหน่งงานปัจจุบัน', vi:'Vị Trí Đang Tuyển Hiện Tại', hi:'वर्तमान खुली पोजीशन', ar:'الوظائف الشاغرة الحالية' },
  'Learn About Our Culture': { es:'Conoce Nuestra Cultura', fr:'En Savoir Plus sur Notre Culture', de:'Unsere Kultur Kennenlernen', pt:'Conheça Nossa Cultura', ru:'Узнайте о нашей культуре', zh:'了解我们的文化', ko:'우리 문화 알아보기', ja:'私たちの文化について学ぶ', ms:'Ketahui Tentang Budaya Kami', th:'เรียนรู้เกี่ยวกับวัฒนธรรมของเรา', vi:'Tìm Hiểu Văn Hóa Của Chúng Tôi', hi:'हमारी संस्कृति के बारे में जानें', ar:'تعرف على ثقافتنا' },
  'Our Hiring Process': { es:'Nuestro Proceso de Contratación', fr:'Notre Processus de Recrutement', de:'Unser Einstellungsprozess', pt:'Nosso Processo de Contratação', ru:'Наш процесс найма', zh:'我们的招聘流程', ko:'채용 프로세스', ja:'採用プロセス', ms:'Proses Pengambilan Pekerja Kami', th:'กระบวนการรับสมัครของเรา', vi:'Quy Trình Tuyển Dụng Của Chúng Tôi', hi:'हमारी भर्ती प्रक्रिया', ar:'عملية التوظيف لدينا' },
  'Build the Future of Global Advertising Technology with Us': { es:'Construye el Futuro de la Tecnología Publicitaria Global con Nosotros', fr:"Construisez l'Avenir de la Technologie Publicitaire Mondiale avec Nous", de:'Bau die Zukunft der globalen Werbetechnologie mit uns', pt:'Construa o Futuro da Tecnologia Publicitária Global Conosco', ru:'Стройте будущее глобальных рекламных технологий вместе с нами', zh:'与我们共建全球广告技术的未来', ko:'글로벌 광고 기술의 미래를 함께 만들어 가세요', ja:'グローバル広告技術の未来を一緒に作り上げましょう', ms:'Bina Masa Depan Teknologi Pengiklanan Global Bersama Kami', th:'สร้างอนาคตของเทคโนโลยีโฆษณาระดับโลกร่วมกับเรา', vi:'Xây Dựng Tương Lai Công Nghệ Quảng Cáo Toàn Cầu Cùng Chúng Tôi', hi:'हमारे साथ वैश्विक विज्ञापन तकनीक का भविष्य बनाएं', ar:'ابنِ مستقبل تكنولوجيا الإعلانات العالمية معنا' },
  '6 Reasons to Join NexBids': { es:'6 Razones para Unirse a NexBids', fr:'6 Raisons de Rejoindre NexBids', de:'6 Gründe, NexBids beizutreten', pt:'6 Razões para se Juntar à NexBids', ru:'6 причин присоединиться к NexBids', zh:'加入NexBids的6个理由', ko:'NexBids에 합류해야 할 6가지 이유', ja:'NexBidsに参加する6つの理由', ms:'6 Sebab Untuk Menyertai NexBids', th:'6 เหตุผลในการเข้าร่วม NexBids', vi:'6 Lý Do Để Tham Gia NexBids', hi:'NexBids में शामिल होने के 6 कारण', ar:'6 أسباب للانضمام إلى NexBids' },
  // ── Login page ──
  'Login to DSP': { es:'Iniciar Sesión en DSP', fr:'Se Connecter au DSP', de:'Am DSP Anmelden', pt:'Entrar no DSP', ru:'Войти в DSP', zh:'登录DSP', ko:'DSP 로그인', ja:'DSPにログイン', ms:'Log Masuk ke DSP', th:'เข้าสู่ระบบ DSP', vi:'Đăng Nhập DSP', hi:'DSP में लॉगिन', ar:'تسجيل الدخول إلى DSP' },
  'Login to ADX': { es:'Iniciar Sesión en ADX', fr:"Se Connecter à l'ADX", de:'Am ADX Anmelden', pt:'Entrar no ADX', ru:'Войти в ADX', zh:'登录ADX', ko:'ADX 로그인', ja:'ADXにログイン', ms:'Log Masuk ke ADX', th:'เข้าสู่ระบบ ADX', vi:'Đăng Nhập ADX', hi:'ADX में लॉगिन', ar:'تسجيل الدخول إلى ADX' },
  'Login to SSP': { es:'Iniciar Sesión en SSP', fr:'Se Connecter au SSP', de:'Am SSP Anmelden', pt:'Entrar no SSP', ru:'Войти в SSP', zh:'登录SSP', ko:'SSP 로그인', ja:'SSPにログイン', ms:'Log Masuk ke SSP', th:'เข้าสู่ระบบ SSP', vi:'Đăng Nhập SSP', hi:'SSP में लॉगिन', ar:'تسجيل الدخول إلى SSP' },
  'Welcome back to': { es:'Bienvenido de nuevo a', fr:'Bienvenue de nouveau sur', de:'Willkommen zurück bei', pt:'Bem-vindo de volta ao', ru:'Добро пожаловать обратно в', zh:'欢迎回到', ko:'다시 오신 것을 환영합니다', ja:'おかえりなさい、', ms:'Selamat kembali ke', th:'ยินดีต้อนรับกลับสู่', vi:'Chào Mừng Trở Lại', hi:'वापस स्वागत है', ar:'مرحبًا بعودتك إلى' },
  'Enter your credentials to access the platform.': { es:'Ingrese sus credenciales para acceder a la plataforma.', fr:'Saisissez vos identifiants pour accéder à la plateforme.', de:'Geben Sie Ihre Anmeldedaten ein, um auf die Plattform zuzugreifen.', pt:'Digite suas credenciais para acessar a plataforma.', ru:'Введите учётные данные для доступа к платформе.', zh:'输入您的凭据以访问平台。', ko:'플랫폼에 접속하려면 자격 증명을 입력하세요.', ja:'プラットフォームにアクセスするための認証情報を入力してください。', ms:'Masukkan kelayakan anda untuk mengakses platform.', th:'กรอกข้อมูลรับรองของคุณเพื่อเข้าถึงแพลตฟอร์ม', vi:'Nhập thông tin đăng nhập để truy cập nền tảng.', hi:'प्लेटफॉर्म एक्सेस करने के लिए अपनी क्रेडेंशियल दर्ज करें।', ar:'أدخل بيانات اعتمادك للوصول إلى المنصة.' },
  'Email Address': { es:'Correo Electrónico', fr:'Adresse E-mail', de:'E-Mail-Adresse', pt:'Endereço de E-mail', ru:'Адрес электронной почты', zh:'电子邮件地址', ko:'이메일 주소', ja:'メールアドレス', ms:'Alamat E-mel', th:'ที่อยู่อีเมล', vi:'Địa Chỉ Email', hi:'ईमेल पता', ar:'عنوان البريد الإلكتروني' },
  'Password': { es:'Contraseña', fr:'Mot de Passe', de:'Passwort', pt:'Senha', ru:'Пароль', zh:'密码', ko:'비밀번호', ja:'パスワード', ms:'Kata Laluan', th:'รหัสผ่าน', vi:'Mật Khẩu', hi:'पासवर्ड', ar:'كلمة المرور' },
  'Remember me': { es:'Recuérdame', fr:'Se souvenir de moi', de:'Angemeldet bleiben', pt:'Lembrar-me', ru:'Запомнить меня', zh:'记住我', ko:'자동 로그인', ja:'ログイン状態を保持', ms:'Ingat saya', th:'จำฉันด้วย', vi:'Ghi Nhớ Đăng Nhập', hi:'मुझे याद रखें', ar:'تذكرني' },
  'Sign In': { es:'Iniciar Sesión', fr:'Se Connecter', de:'Anmelden', pt:'Entrar', ru:'Войти', zh:'登录', ko:'로그인', ja:'サインイン', ms:'Log Masuk', th:'เข้าสู่ระบบ', vi:'Đăng Nhập', hi:'साइन इन', ar:'تسجيل الدخول' },
  'Help': { es:'Ayuda', fr:'Aide', de:'Hilfe', pt:'Ajuda', ru:'Помощь', zh:'帮助', ko:'도움말', ja:'ヘルプ', ms:'Bantuan', th:'ช่วยเหลือ', vi:'Trợ Giúp', hi:'सहायता', ar:'المساعدة' },
  'Privacy Policy': { es:'Política de Privacidad', fr:'Politique de Confidentialité', de:'Datenschutzrichtlinie', pt:'Política de Privacidade', ru:'Политика конфиденциальности', zh:'隐私政策', ko:'개인정보처리방침', ja:'プライバシーポリシー', ms:'Dasar Privasi', th:'นโยบายความเป็นส่วนตัว', vi:'Chính Sách Bảo Mật', hi:'गोपनीयता नीति', ar:'سياسة الخصوصية' },
  'Back to nexbids.com': { es:'Volver a nexbids.com', fr:'Retour à nexbids.com', de:'Zurück zu nexbids.com', pt:'Voltar ao nexbids.com', ru:'Вернуться на nexbids.com', zh:'返回nexbids.com', ko:'nexbids.com으로 돌아가기', ja:'nexbids.comに戻る', ms:'Kembali ke nexbids.com', th:'กลับไปที่ nexbids.com', vi:'Quay Lại nexbids.com', hi:'nexbids.com पर वापस जाएं', ar:'العودة إلى nexbids.com' },
  // ── Contact form fields ──
  'Send Us a Message': { es:'Envíenos un Mensaje', fr:'Envoyez-nous un Message', de:'Senden Sie uns eine Nachricht', pt:'Envie-nos uma Mensagem', ru:'Напишите нам', zh:'给我们发消息', ko:'메시지 보내기', ja:'メッセージを送る', ms:'Hantar Mesej kepada Kami', th:'ส่งข้อความถึงเรา', vi:'Gửi Tin Nhắn Cho Chúng Tôi', hi:'हमें संदेश भेजें', ar:'أرسل لنا رسالة' },
  'First Name': { es:'Nombre', fr:'Prénom', de:'Vorname', pt:'Primeiro Nome', ru:'Имя', zh:'名字', ko:'이름', ja:'名前', ms:'Nama Pertama', th:'ชื่อ', vi:'Tên', hi:'पहला नाम', ar:'الاسم الأول' },
  'Last Name': { es:'Apellido', fr:'Nom de Famille', de:'Nachname', pt:'Sobrenome', ru:'Фамилия', zh:'姓氏', ko:'성', ja:'苗字', ms:'Nama Akhir', th:'นามสกุล', vi:'Họ', hi:'अंतिम नाम', ar:'اسم العائلة' },
  'Business Email': { es:'Correo Empresarial', fr:'E-mail Professionnel', de:'Geschäftliche E-Mail', pt:'E-mail Comercial', ru:'Рабочая почта', zh:'工作邮箱', ko:'비즈니스 이메일', ja:'ビジネスメール', ms:'E-mel Perniagaan', th:'อีเมลธุรกิจ', vi:'Email Công Việc', hi:'बिज़नेस ईमेल', ar:'البريد الإلكتروني للأعمال' },
  'Company Name': { es:'Nombre de la Empresa', fr:'Nom de la Société', de:'Firmenname', pt:'Nome da Empresa', ru:'Название компании', zh:'公司名称', ko:'회사명', ja:'会社名', ms:'Nama Syarikat', th:'ชื่อบริษัท', vi:'Tên Công Ty', hi:'कंपनी का नाम', ar:'اسم الشركة' },
  'Country': { es:'País', fr:'Pays', de:'Land', pt:'País', ru:'Страна', zh:'国家', ko:'국가', ja:'国', ms:'Negara', th:'ประเทศ', vi:'Quốc Gia', hi:'देश', ar:'الدولة' },
  'I am a': { es:'Soy un', fr:'Je suis un', de:'Ich bin ein', pt:'Eu sou um', ru:'Я являюсь', zh:'我是', ko:'저는', ja:'私は', ms:'Saya seorang', th:'ฉันเป็น', vi:'Tôi là', hi:'मैं हूं', ar:'أنا' },
  'Integration Inquiry': { es:'Consulta de Integración', fr:"Demande d'Intégration", de:'Integrationsanfrage', pt:'Consulta de Integração', ru:'Запрос на интеграцию', zh:'集成咨询', ko:'통합 문의', ja:'統合に関するお問い合わせ', ms:'Pertanyaan Integrasi', th:'สอบถามการรวมระบบ', vi:'Yêu Cầu Tích Hợp', hi:'इंटीग्रेशन इनक्वायरी', ar:'استفسار التكامل' },
  'How can we help?': { es:'¿Cómo podemos ayudarle?', fr:'Comment pouvons-nous vous aider?', de:'Wie können wir helfen?', pt:'Como podemos ajudá-lo?', ru:'Как мы можем помочь?', zh:'我们能为您做什么？', ko:'어떻게 도와드릴까요?', ja:'どのようにお手伝いできますか？', ms:'Bagaimana kami boleh membantu?', th:'เราช่วยอะไรได้บ้าง?', vi:'Chúng Tôi Có Thể Giúp Gì?', hi:'हम कैसे मदद कर सकते हैं?', ar:'كيف يمكننا مساعدتك؟' },
  'Send Message': { es:'Enviar Mensaje', fr:'Envoyer le Message', de:'Nachricht Senden', pt:'Enviar Mensagem', ru:'Отправить сообщение', zh:'发送消息', ko:'메시지 전송', ja:'メッセージを送信', ms:'Hantar Mesej', th:'ส่งข้อความ', vi:'Gửi Tin Nhắn', hi:'संदेश भेजें', ar:'إرسال الرسالة' },
  'Message Sent Successfully!': { es:'¡Mensaje Enviado con Éxito!', fr:'Message Envoyé avec Succès!', de:'Nachricht erfolgreich gesendet!', pt:'Mensagem Enviada com Sucesso!', ru:'Сообщение успешно отправлено!', zh:'消息发送成功！', ko:'메시지 전송 성공!', ja:'メッセージが正常に送信されました！', ms:'Mesej Berjaya Dihantar!', th:'ส่งข้อความสำเร็จ!', vi:'Gửi Tin Nhắn Thành Công!', hi:'संदेश सफलतापूर्वक भेजा गया!', ar:'تم إرسال الرسالة بنجاح!' },
  'and consent to being contacted.': { es:'y doy consentimiento para ser contactado.', fr:'et consens à être contacté.', de:'und stimme zu, kontaktiert zu werden.', pt:'e consinto em ser contactado.', ru:'и соглашаюсь на контакт.', zh:'并同意被联系。', ko:'및 연락받는 것에 동의합니다.', ja:'および連絡を受けることに同意します。', ms:'dan bersetuju untuk dihubungi.', th:'และยินยอมให้ติดต่อ', vi:'và đồng ý được liên hệ.', hi:'और संपर्क किए जाने के लिए सहमति देता/देती हूं।', ar:'وأوافق على التواصل.' },
  // ── 404 / utility ──
  'Page Not Found': { es:'Página No Encontrada', fr:'Page Non Trouvée', de:'Seite Nicht Gefunden', pt:'Página Não Encontrada', ru:'Страница не найдена', zh:'页面未找到', ko:'페이지를 찾을 수 없음', ja:'ページが見つかりません', ms:'Halaman Tidak Dijumpai', th:'ไม่พบหน้า', vi:'Không Tìm Thấy Trang', hi:'पेज नहीं मिला', ar:'الصفحة غير موجودة' },
  'Go Home': { es:'Ir a Inicio', fr:"Aller à l'Accueil", de:'Zur Startseite', pt:'Ir para Início', ru:'На главную', zh:'返回首页', ko:'홈으로 가기', ja:'ホームへ', ms:'Ke Laman Utama', th:'ไปหน้าหลัก', vi:'Về Trang Chủ', hi:'होम पर जाएं', ar:'الذهاب للرئيسية' },
  // ── Industry verticals ──
  'Mobile App': { es:'Aplicación Móvil', fr:'Application Mobile', de:'Mobile App', pt:'Aplicativo Móvel', ru:'Мобильное приложение', zh:'移动应用', ko:'모바일 앱', ja:'モバイルアプリ', ms:'Aplikasi Mudah Alih', th:'แอปมือถือ', vi:'Ứng Dụng Di Động', hi:'मोबाइल ऐप', ar:'تطبيق الجوال' },
  'Mobile Gaming': { es:'Juegos Móviles', fr:'Jeux Mobiles', de:'Mobile Gaming', pt:'Jogos Móveis', ru:'Мобильный гейминг', zh:'手游', ko:'모바일 게이밍', ja:'モバイルゲーミング', ms:'Permainan Mudah Alih', th:'เกมมือถือ', vi:'Game Di Động', hi:'मोबाइल गेमिंग', ar:'الألعاب على الهاتف' },
  'Utility App': { es:'App de Utilidad', fr:'Application Utilitaire', de:'Utility App', pt:'App de Utilidade', ru:'Утилитарное приложение', zh:'工具应用', ko:'유틸리티 앱', ja:'ユーティリティアプリ', ms:'Aplikasi Utiliti', th:'แอปยูทิลิตี้', vi:'Ứng Dụng Tiện Ích', hi:'यूटिलिटी ऐप', ar:'تطبيق الأدوات' },
  'E-Commerce \u2014 Fashion': { es:'E-Commerce \u2014 Moda', fr:'E-Commerce \u2014 Mode', de:'E-Commerce \u2014 Mode', pt:'E-Commerce \u2014 Moda', ru:'Электронная торговля \u2014 Мода', zh:'电商—时尚', ko:'이커머스 — 패션', ja:'Eコマース — ファッション', ms:'E-Dagang \u2014 Fesyen', th:'อีคอมเมิร์ซ — แฟชั่น', vi:'Thương Mại Điện Tử — Thời Trang', hi:'ई-कॉमर्स — फैशन', ar:'التجارة الإلكترونية — الأزياء' },
  'News Publisher': { es:'Editorial de Noticias', fr:'Éditeur de Nouvelles', de:'Nachrichtenverlag', pt:'Publicadora de Notícias', ru:'Новостной издатель', zh:'新闻发布商', ko:'뉴스 퍼블리셔', ja:'ニュースパブリッシャー', ms:'Penerbit Berita', th:'ผู้เผยแพร่ข่าวสาร', vi:'Nhà Xuất Bản Tin Tức', hi:'न्यूज़ प्रकाशक', ar:'ناشر الأخبار' },
  'Languages': { es:'Idiomas', fr:'Langues', de:'Sprachen', pt:'Idiomas', ru:'Языки', zh:'语言', ko:'언어', ja:'言語', ms:'Bahasa', th:'ภาษา', vi:'Ngôn Ngữ', hi:'भाषाएं', ar:'اللغات' },
  'Power Your Growth with': { es:'Impulsa Tu Crecimiento con', fr:'Boostez Votre Croissance avec', de:'Steigern Sie Ihr Wachstum mit', pt:'Impulsione Seu Crescimento com', ru:'Ускорьте Рост с', zh:'用…驱动增长', ko:'로 성장을 가속하세요', ja:'で成長を加速', ms:'Pacu Pertumbuhan Anda dengan', th:'เร่งการเติบโตของคุณด้วย', vi:'Thúc Đẩy Tăng Trưởng với', hi:'से अपनी ग्रोथ बढ़ाएं', ar:'عزّز نموك بـ' },

  // ── Products / Platform descriptions ──
  'Demand-Side Platform. AI-powered buying platform with global reach, premium inventory access, and advanced audience targeting across every digital channel.': {
    es:'Plataforma del Lado de la Demanda. Plataforma de compra impulsada por IA con alcance global, acceso a inventario premium y segmentación de audiencia avanzada en todos los canales digitales.',
    fr:'Plateforme côté demande. Plateforme d\'achat propulsée par l\'IA avec une portée mondiale, un accès à l\'inventaire premium et un ciblage avancé sur tous les canaux numériques.',
    de:'Demand-Side-Plattform. KI-gestützte Kaufplattform mit globaler Reichweite, Premium-Inventarzugang und erweitertem Audience-Targeting auf allen digitalen Kanälen.',
    pt:'Plataforma do Lado da Demanda. Plataforma de compra com IA, alcance global, acesso a inventário premium e segmentação avançada em todos os canais digitais.',
    ru:'Платформа на стороне спроса. Платформа покупки на базе ИИ с глобальным охватом, доступом к премиум-инвентарю и расширенным таргетингом на всех цифровых каналах.',
    zh:'需求方平台。AI驱动的购买平台，具备全球覆盖、优质库存访问和各数字渠道的高级受众定向能力。',
    ko:'수요 측 플랫폼. AI 기반 구매 플랫폼으로 글로벌 도달 범위, 프리미엄 인벤토리 접근 및 모든 디지털 채널에서 고급 오디언스 타겟팅 제공.',
    ja:'デマンドサイドプラットフォーム。AIを活用した購買プラットフォームで、グローバルリーチ、プレミアムインベントリアクセス、すべてのデジタルチャネルでの高度なオーディエンスターゲティングを実現。',
    ms:'Platform Sisi Permintaan. Platform pembelian berkuasa AI dengan jangkauan global, akses inventori premium dan penyasaran audiens lanjutan merentas semua saluran digital.',
    th:'แพลตฟอร์มฝั่งดีมานด์ แพลตฟอร์มซื้อขายขับเคลื่อนด้วย AI ที่มีการเข้าถึงระดับโลก การเข้าถึงสินค้าคงคลังระดับพรีเมียม และการกำหนดเป้าหมายผู้ชมขั้นสูงทุกช่องทางดิจิทัล',
    vi:'Nền tảng phía cầu. Nền tảng mua hàng hỗ trợ AI với tầm tiếp cận toàn cầu, quyền truy cập kho hàng cao cấp và nhắm mục tiêu đối tượng nâng cao trên mọi kênh kỹ thuật số.',
    hi:'डिमांड-साइड प्लेटफॉर्म। AI-संचालित खरीद प्लेटफॉर्म जो वैश्विक पहुंच, प्रीमियम इन्वेंटरी एक्सेस और हर डिजिटल चैनल पर उन्नत ऑडियंस टार्गेटिंग देता है।',
    ar:'منصة الطلب. منصة شراء مدعومة بالذكاء الاصطناعي مع نطاق عالمي، وصول إلى مخزون مميز واستهداف متقدم للجمهور عبر كل القنوات الرقمية.'
  },
  'Ad Exchange. The neutral, high-performance marketplace connecting premium supply with quality demand — built for speed, scale, and trust.': {
    es:'Bolsa de Anuncios. El mercado neutral y de alto rendimiento que conecta oferta premium con demanda de calidad — construido para velocidad, escala y confianza.',
    fr:'Bourse publicitaire. La place de marché neutre et haute performance connectant l\'offre premium à la demande qualitative — construite pour la vitesse, l\'échelle et la confiance.',
    de:'Ad Exchange. Der neutrale, leistungsstarke Marktplatz, der Premium-Angebot mit Qualitätsnachfrage verbindet — gebaut für Geschwindigkeit, Skalierung und Vertrauen.',
    pt:'Ad Exchange. O marketplace neutro e de alto desempenho conectando oferta premium com demanda de qualidade — construído para velocidade, escala e confiança.',
    ru:'Рекламная биржа. Нейтральный высокопроизводительный маркетплейс, соединяющий премиум-предложение с качественным спросом — для скорости, масштаба и доверия.',
    zh:'广告交易所。中立、高性能的市场，连接优质供应与质量需求——为速度、规模和信任而生。',
    ko:'광고 거래소. 프리미엄 공급과 고품질 수요를 연결하는 중립적인 고성능 마켓플레이스 — 속도, 규모, 신뢰를 위해 구축.',
    ja:'アドエクスチェンジ。プレミアムサプライと高品質デマンドをつなぐ中立的な高パフォーマンスマーケットプレイス — スピード、スケール、信頼のために構築。',
    ms:'Bursa Iklan. Pasaran neutral berprestasi tinggi yang menghubungkan bekalan premium dengan permintaan berkualiti — dibina untuk kecepatan, skala dan kepercayaan.',
    th:'แพลตฟอร์มซื้อขายโฆษณา ตลาดที่เป็นกลางและมีประสิทธิภาพสูงที่เชื่อมต่ออุปทานระดับพรีเมียมกับความต้องการคุณภาพ สร้างขึ้นเพื่อความเร็ว ขนาด และความไว้วางใจ',
    vi:'Sàn giao dịch quảng cáo. Thị trường trung lập hiệu suất cao kết nối cung cấp cao cấp với nhu cầu chất lượng — được xây dựng cho tốc độ, quy mô và độ tin cậy.',
    hi:'एड एक्सचेंज। तटस्थ, उच्च-प्रदर्शन बाजार जो प्रीमियम आपूर्ति को गुणवत्ता मांग से जोड़ता है — गति, स्केल और विश्वास के लिए निर्मित।',
    ar:'بورصة الإعلانات. السوق المحايد عالي الأداء الذي يربط العرض المميز بالطلب الجيد — مبني للسرعة والحجم والثقة.'
  },
  'Supply-Side Platform. Maximize your ad revenue with intelligent yield optimization, header bidding, and direct access to thousands of premium advertisers worldwide.': {
    es:'Plataforma del Lado de la Oferta. Maximice sus ingresos publicitarios con optimización inteligente del rendimiento, header bidding y acceso directo a miles de anunciantes premium en todo el mundo.',
    fr:'Plateforme côté offre. Maximisez vos revenus publicitaires avec l\'optimisation intelligente du rendement, le header bidding et un accès direct à des milliers d\'annonceurs premium dans le monde.',
    de:'Supply-Side-Plattform. Maximieren Sie Ihre Anzeigeneinnahmen mit intelligenter Ertragsoptimierung, Header-Bidding und direktem Zugang zu Tausenden von Premium-Werbetreibenden weltweit.',
    pt:'Plataforma do Lado da Oferta. Maximize sua receita de anúncios com otimização inteligente de rendimento, header bidding e acesso direto a milhares de anunciantes premium em todo o mundo.',
    ru:'Платформа на стороне предложения. Максимизируйте доходы от рекламы с помощью интеллектуальной оптимизации дохода, хедер-биддинга и прямого доступа к тысячам премиум-рекламодателей по всему миру.',
    zh:'供应方平台。通过智能收益优化、头部竞价和直接访问全球数千个优质广告主来最大化您的广告收益。',
    ko:'공급 측 플랫폼. 지능형 수익 최적화, 헤더 비딩 및 전 세계 수천 개의 프리미엄 광고주에 대한 직접 접근으로 광고 수익을 극대화하세요.',
    ja:'サプライサイドプラットフォーム。インテリジェントな収益最適化、ヘッダービディング、世界中の数千のプレミアム広告主への直接アクセスで広告収益を最大化。',
    ms:'Platform Sisi Bekalan. Maksimumkan pendapatan iklan anda dengan pengoptimuman hasil yang cerdas, header bidding dan akses langsung kepada ribuan pengiklan premium di seluruh dunia.',
    th:'แพลตฟอร์มฝั่งอุปทาน เพิ่มรายได้โฆษณาของคุณให้สูงสุดด้วยการเพิ่มประสิทธิภาพผลตอบแทนอัจฉริยะ การประมูลส่วนหัว และการเข้าถึงผู้ลงโฆษณาระดับพรีเมียมหลายพันรายทั่วโลกโดยตรง',
    vi:'Nền tảng phía cung. Tối đa hóa doanh thu quảng cáo của bạn với tối ưu hóa lợi nhuận thông minh, đấu thầu tiêu đề và truy cập trực tiếp vào hàng nghìn nhà quảng cáo cao cấp trên toàn thế giới.',
    hi:'सप्लाई-साइड प्लेटफॉर्म। इंटेलिजेंट यील्ड ऑप्टिमाइज़ेशन, हेडर बिडिंग और दुनिया भर में हजारों प्रीमियम विज्ञापनदाताओं तक सीधी पहुंच से अपनी विज्ञापन आय को अधिकतम करें।',
    ar:'منصة العرض. عظّم إيرادات الإعلانات بتحسين ذكي للعائد، ومزايدة رأسية، ووصول مباشر لآلاف المعلنين المتميزين حول العالم.'
  },
  'Three Platforms. One Ecosystem.': { es:'Tres Plataformas. Un Ecosistema.', fr:'Trois Plateformes. Un Écosystème.', de:'Drei Plattformen. Ein Ökosystem.', pt:'Três Plataformas. Um Ecossistema.', ru:'Три Платформы. Одна Экосистема.', zh:'三大平台。一个生态系统。', ko:'세 가지 플랫폼. 하나의 생태계.', ja:'3つのプラットフォーム。1つのエコシステム。', ms:'Tiga Platform. Satu Ekosistem.', th:'สามแพลตฟอร์ม หนึ่งระบบนิเวศ', vi:'Ba Nền Tảng. Một Hệ Sinh Thái.', hi:'तीन प्लेटफॉर्म। एक इकोसिस्टम।', ar:'ثلاث منصات. نظام بيئي واحد.' },
  'The Full Programmatic Stack': { es:'El Stack Programático Completo', fr:'La Stack Programmatique Complète', de:'Der Vollständige Programmatic Stack', pt:'O Stack Programático Completo', ru:'Полный Программатик Стек', zh:'完整的程序化广告技术栈', ko:'완전한 프로그래매틱 스택', ja:'完全なプログラマティックスタック', ms:'Tumpukan Programatik Penuh', th:'สแต็กโปรแกรมเมติกที่สมบูรณ์', vi:'Stack Programmatic Đầy Đủ', hi:'पूर्ण प्रोग्रामेटिक स्टैक', ar:'المجموعة البرمجية الكاملة' },
  'Three powerful, interconnected platforms designed to serve every participant in the programmatic advertising ecosystem.': { es:'Tres plataformas potentes e interconectadas diseñadas para servir a cada participante en el ecosistema de publicidad programática.', fr:"Trois plateformes puissantes et interconnectées conçues pour servir chaque participant dans l'écosystème de la publicité programmatique.", de:'Drei leistungsstarke, miteinander verbundene Plattformen, die jedem Teilnehmer im programmatischen Werbeökosystem dienen.', pt:'Três plataformas poderosas e interconectadas projetadas para servir cada participante no ecossistema de publicidade programática.', ru:'Три мощные, взаимосвязанные платформы, предназначенные для обслуживания каждого участника экосистемы программатической рекламы.', zh:'三个强大的互联平台，专为服务程序化广告生态系统中的每一个参与者而设计。', ko:'프로그래매틱 광고 생태계의 모든 참여자를 위해 설계된 세 가지 강력하고 상호 연결된 플랫폼.', ja:'プログラマティック広告エコシステムのすべての参加者にサービスを提供するために設計された、3つの強力で相互接続されたプラットフォーム。', ms:'Tiga platform berkuasa yang saling berhubung direka untuk melayani setiap peserta dalam ekosistem pengiklanan programatik.', th:'สามแพลตฟอร์มที่มีประสิทธิภาพและเชื่อมต่อกัน ออกแบบมาเพื่อรองรับทุกผู้เข้าร่วมในระบบนิเวศโฆษณาแบบโปรแกรมเมติก', vi:'Ba nền tảng mạnh mẽ, kết nối với nhau được thiết kế để phục vụ mọi người tham gia trong hệ sinh thái quảng cáo programmatic.', hi:'तीन शक्तिशाली, परस्पर जुड़े प्लेटफॉर्म, प्रोग्रामेटिक विज्ञापन इकोसिस्टम में हर भागीदार की सेवा के लिए डिज़ाइन किए गए।', ar:'ثلاث منصات قوية ومترابطة مصممة لخدمة كل مشارك في نظام الإعلانات البرمجية البيئي.' },
  'Explore DSP →': { es:'Explorar DSP →', fr:'Explorer DSP →', de:'DSP Erkunden →', pt:'Explorar DSP →', ru:'Изучить DSP →', zh:'探索DSP →', ko:'DSP 탐색 →', ja:'DSP を探索 →', ms:'Terokai DSP →', th:'สำรวจ DSP →', vi:'Khám phá DSP →', hi:'DSP एक्सप्लोर करें →', ar:'استكشف DSP ←' },
  'Explore ADX →': { es:'Explorar ADX →', fr:'Explorer ADX →', de:'ADX Erkunden →', pt:'Explorar ADX →', ru:'Изучить ADX →', zh:'探索ADX →', ko:'ADX 탐색 →', ja:'ADX を探索 →', ms:'Terokai ADX →', th:'สำรวจ ADX →', vi:'Khám phá ADX →', hi:'ADX एक्सप्लोर करें →', ar:'استكشف ADX ←' },
  'Explore SSP →': { es:'Explorar SSP →', fr:'Explorer SSP →', de:'SSP Erkunden →', pt:'Explorar SSP →', ru:'Изучить SSP →', zh:'探索SSP →', ko:'SSP 탐색 →', ja:'SSP を探索 →', ms:'Terokai SSP →', th:'สำรวจ SSP →', vi:'Khám phá SSP →', hi:'SSP एक्सप्लोर करें →', ar:'استكشف SSP ←' },
  'Learn More →': { es:'Más Información →', fr:'En Savoir Plus →', de:'Mehr Erfahren →', pt:'Saiba Mais →', ru:'Узнать Больше →', zh:'了解更多 →', ko:'더 알아보기 →', ja:'詳細を見る →', ms:'Ketahui Lebih Lanjut →', th:'เรียนรู้เพิ่มเติม →', vi:'Tìm Hiểu Thêm →', hi:'और जानें →', ar:'اعرف المزيد ←' },
  'View Solution →': { es:'Ver Solución →', fr:'Voir la Solution →', de:'Lösung Anzeigen →', pt:'Ver Solução →', ru:'Посмотреть Решение →', zh:'查看方案 →', ko:'솔루션 보기 →', ja:'ソリューションを見る →', ms:'Lihat Penyelesaian →', th:'ดูโซลูชัน →', vi:'Xem Giải Pháp →', hi:'समाधान देखें →', ar:'عرض الحل ←' },
  'View Full Technology Stack →': { es:'Ver Stack Tecnológico Completo →', fr:'Voir la Stack Technologique Complète →', de:'Vollständigen Tech Stack Anzeigen →', pt:'Ver Stack Tecnológico Completo →', ru:'Посмотреть Полный Технологический Стек →', zh:'查看完整技术栈 →', ko:'전체 기술 스택 보기 →', ja:'完全な技術スタックを見る →', ms:'Lihat Tumpukan Teknologi Penuh →', th:'ดูสแต็กเทคโนโลยีทั้งหมด →', vi:'Xem Toàn Bộ Tech Stack →', hi:'पूर्ण टेक्नोलॉजी स्टैक देखें →', ar:'عرض مجموعة التقنيات الكاملة ←' },
  'View All Case Studies →': { es:'Ver Todos los Casos →', fr:'Voir Toutes les Études →', de:'Alle Fallstudien Ansehen →', pt:'Ver Todos os Casos →', ru:'Все Кейсы →', zh:'查看所有案例 →', ko:'모든 사례 보기 →', ja:'全ての事例を見る →', ms:'Lihat Semua Kajian Kes →', th:'ดูกรณีศึกษาทั้งหมด →', vi:'Xem Tất Cả Nghiên Cứu →', hi:'सभी केस स्टडी देखें →', ar:'عرض جميع الدراسات ←' },
  'View All Advertiser Cases →': { es:'Ver Todos los Casos de Anunciantes →', fr:'Voir Tous les Cas Annonceurs →', de:'Alle Advertiser Fälle Ansehen →', pt:'Ver Todos os Casos de Anunciantes →', ru:'Все Кейсы Рекламодателей →', zh:'查看所有广告主案例 →', ko:'모든 광고주 사례 보기 →', ja:'全広告主事例を見る →', ms:'Lihat Semua Kes Pengiklan →', th:'ดูกรณีศึกษาผู้ลงโฆษณาทั้งหมด →', vi:'Xem Tất Cả Trường Hợp Nhà QC →', hi:'सभी विज्ञापनदाता केस देखें →', ar:'عرض جميع حالات المعلنين ←' },
  'View All Publisher Cases →': { es:'Ver Todos los Casos de Editores →', fr:'Voir Tous les Cas Éditeurs →', de:'Alle Publisher Fälle Ansehen →', pt:'Ver Todos os Casos de Editores →', ru:'Все Кейсы Издателей →', zh:'查看所有发布商案例 →', ko:'모든 퍼블리셔 사례 보기 →', ja:'全パブリッシャー事例を見る →', ms:'Lihat Semua Kes Penerbit →', th:'ดูกรณีศึกษาผู้เผยแพร่ทั้งหมด →', vi:'Xem Tất Cả Trường Hợp Nhà XB →', hi:'सभी प्रकाशक केस देखें →', ar:'عرض جميع حالات الناشرين ←' },
  'Built for Performance-Driven Advertisers': { es:'Construido para Anunciantes Orientados al Rendimiento', fr:'Conçu pour les Annonceurs Orientés Performance', de:'Gebaut für leistungsorientierte Werbetreibende', pt:'Construído para Anunciantes Orientados ao Desempenho', ru:'Создано для Рекламодателей, Ориентированных на Результат', zh:'为绩效驱动的广告主而生', ko:'성과 중심 광고주를 위해 구축', ja:'パフォーマンス重視の広告主のために構築', ms:'Dibina untuk Pengiklan Berorientasi Prestasi', th:'สร้างขึ้นสำหรับผู้ลงโฆษณาที่ขับเคลื่อนด้วยประสิทธิภาพ', vi:'Xây Dựng Cho Nhà QC Hướng Hiệu Suất', hi:'प्रदर्शन-चालित विज्ञापनदाताओं के लिए निर्मित', ar:'مبني لمعلنين يركزون على الأداء' },
  'How Advertisers Grow Faster with NexBids': { es:'Cómo los Anunciantes Crecen Más Rápido con NexBids', fr:'Comment les Annonceurs Croissent Plus Vite avec NexBids', de:'Wie Werbetreibende mit NexBids Schneller Wachsen', pt:'Como os Anunciantes Crescem Mais Rápido com NexBids', ru:'Как Рекламодатели Растут Быстрее с NexBids', zh:'广告主如何借助NexBids实现更快增长', ko:'광고주가 NexBids로 더 빠르게 성장하는 방법', ja:'広告主がNexBidsでより速く成長する方法', ms:'Bagaimana Pengiklan Tumbuh Lebih Cepat dengan NexBids', th:'วิธีที่ผู้ลงโฆษณาเติบโตเร็วขึ้นด้วย NexBids', vi:'Cách Nhà QC Phát Triển Nhanh Hơn với NexBids', hi:'विज्ञापनदाता NexBids से कैसे तेजी से बढ़ते हैं', ar:'كيف ينمو المعلنون بشكل أسرع مع NexBids' },
  'How Publishers Maximize Revenue with NexBids': { es:'Cómo los Editores Maximizan los Ingresos con NexBids', fr:'Comment les Éditeurs Maximisent leurs Revenus avec NexBids', de:'Wie Publisher mit NexBids Einnahmen Maximieren', pt:'Como os Editores Maximizam Receitas com NexBids', ru:'Как Издатели Максимизируют Доход с NexBids', zh:'发布商如何借助NexBids最大化收益', ko:'퍼블리셔가 NexBids로 수익을 극대화하는 방법', ja:'パブリッシャーがNexBidsで収益を最大化する方法', ms:'Bagaimana Penerbit Memaksimumkan Pendapatan dengan NexBids', th:'วิธีที่ผู้เผยแพร่เพิ่มรายได้สูงสุดด้วย NexBids', vi:'Cách Nhà XB Tối Đa Hóa Doanh Thu với NexBids', hi:'प्रकाशक NexBids से राजस्व कैसे अधिकतम करते हैं', ar:'كيف يزيد الناشرون أرباحهم مع NexBids' },
  'Real Results from Real Partners': { es:'Resultados Reales de Socios Reales', fr:'Vrais Résultats de Vrais Partenaires', de:'Echte Ergebnisse von echten Partnern', pt:'Resultados Reais de Parceiros Reais', ru:'Реальные Результаты Реальных Партнёров', zh:'来自真实合作伙伴的真实成果', ko:'실제 파트너의 실제 결과', ja:'実際のパートナーからの実際の成果', ms:'Keputusan Nyata dari Rakan Nyata', th:'ผลลัพธ์จริงจากพันธมิตรจริง', vi:'Kết Quả Thực Từ Đối Tác Thực', hi:'वास्तविक भागीदारों से वास्तविक परिणाम', ar:'نتائج حقيقية من شركاء حقيقيين' },
  'Building the Future of Programmatic Since 2018': { es:'Construyendo el Futuro de la Programática desde 2018', fr:"Construire l'Avenir du Programmatique depuis 2018", de:'Die Zukunft der Programmatik seit 2018 aufbauen', pt:'Construindo o Futuro do Programático desde 2018', ru:'Строим Будущее Программатики с 2018 года', zh:'自2018年以来构建程序化广告的未来', ko:'2018년부터 프로그래매틱의 미래를 구축', ja:'2018年からプログラマティックの未来を構築', ms:'Membina Masa Depan Programatik Sejak 2018', th:'สร้างอนาคตของโปรแกรมเมติกตั้งแต่ปี 2018', vi:'Xây Dựng Tương Lai Programmatic Từ 2018', hi:'2018 से प्रोग्रामेटिक का भविष्य बना रहे हैं', ar:'بناء مستقبل الإعلانات البرمجية منذ 2018' },
  'We Built NexBids to Make Programmatic Work for Everyone': { es:'Construimos NexBids para que la Programática Funcione para Todos', fr:"Nous avons construit NexBids pour que la Programmatique fonctionne pour tous", de:'Wir haben NexBids gebaut, damit Programmatic für alle funktioniert', pt:'Construímos NexBids para que o Programático Funcione para Todos', ru:'Мы создали NexBids, чтобы программатика работала для всех', zh:'我们构建NexBids，让程序化广告为每个人服务', ko:'모든 이를 위한 프로그래매틱을 위해 NexBids를 구축했습니다', ja:'すべての人にプログラマティックが機能するようにNexBidsを構築しました', ms:'Kami Membina NexBids agar Programatik Berfungsi untuk Semua', th:'เราสร้าง NexBids เพื่อให้โปรแกรมเมติกทำงานสำหรับทุกคน', vi:'Chúng Tôi Xây Dựng NexBids Để Programmatic Hoạt Động Cho Mọi Người', hi:'हमने NexBids बनाया ताकि प्रोग्रामेटिक सभी के लिए काम करे', ar:'بنينا NexBids لجعل الإعلانات البرمجية تعمل للجميع' },
  'Built for the Privacy-First Era': { es:'Construido para la Era de la Privacidad Primero', fr:"Conçu pour l'Ère Privacy-First", de:'Gebaut für die Privacy-First-Ära', pt:'Construído para a Era Privacy-First', ru:'Создано для Эры Конфиденциальности', zh:'为隐私优先时代而生', ko:'프라이버시 우선 시대를 위해 구축', ja:'プライバシーファースト時代のために構築', ms:'Dibina untuk Era Privasi-Pertama', th:'สร้างขึ้นสำหรับยุคที่เน้นความเป็นส่วนตัว', vi:'Xây Dựng Cho Kỷ Nguyên Ưu Tiên Quyền Riêng Tư', hi:'प्राइवेसी-फर्स्ट युग के लिए निर्मित', ar:'مبني لعصر الخصوصية أولاً' },
  'Built on a Foundation of': { es:'Construido sobre una Base de', fr:'Construit sur une Base de', de:'Aufgebaut auf einer Grundlage von', pt:'Construído sobre uma Base de', ru:'Построено на Основе', zh:'建立在以下基础之上', ko:'기반 위에 구축된', ja:'基盤の上に構築された', ms:'Dibina di atas Asas', th:'สร้างบนรากฐานของ', vi:'Xây Dựng Trên Nền Tảng', hi:'की नींव पर निर्मित', ar:'مبني على أساس' },
  'Built for Every Participant in the Ecosystem': { es:'Construido para Cada Participante en el Ecosistema', fr:"Conçu pour Chaque Participant dans l'Écosystème", de:'Gebaut für jeden Teilnehmer im Ökosystem', pt:'Construído para Cada Participante no Ecossistema', ru:'Создано для Каждого Участника Экосистемы', zh:'为生态系统中的每一位参与者而生', ko:'생태계의 모든 참여자를 위해 구축', ja:'エコシステムのすべての参加者のために構築', ms:'Dibina untuk Setiap Peserta dalam Ekosistem', th:'สร้างขึ้นสำหรับทุกผู้เข้าร่วมในระบบนิเวศ', vi:'Xây Dựng Cho Mọi Người Tham Gia Hệ Sinh Thái', hi:'इकोसिस्टम में हर भागीदार के लिए निर्मित', ar:'مبني لكل مشارك في النظام البيئي' },
  'Solutions for Every Role in the Ecosystem': { es:'Soluciones para Cada Rol en el Ecosistema', fr:"Solutions pour Chaque Rôle dans l'Écosystème", de:'Lösungen für jede Rolle im Ökosystem', pt:'Soluções para Cada Função no Ecossistema', ru:'Решения для Каждой Роли в Экосистеме', zh:'为生态系统中每个角色提供解决方案', ko:'생태계의 모든 역할을 위한 솔루션', ja:'エコシステムのすべての役割のためのソリューション', ms:'Penyelesaian untuk Setiap Peranan dalam Ekosistem', th:'โซลูชันสำหรับทุกบทบาทในระบบนิเวศ', vi:'Giải Pháp Cho Mọi Vai Trò Trong Hệ Sinh Thái', hi:'इकोसिस्टम में हर भूमिका के लिए समाधान', ar:'حلول لكل دور في النظام البيئي' },
  'Solutions for Every Publisher Format': { es:'Soluciones para Cada Formato de Editor', fr:"Solutions pour Chaque Format d'Éditeur", de:'Lösungen für jedes Publisher-Format', pt:'Soluções para Cada Formato de Editor', ru:'Решения для Каждого Формата Издателя', zh:'为每种发布商格式提供解决方案', ko:'모든 퍼블리셔 형식을 위한 솔루션', ja:'すべてのパブリッシャーフォーマットのためのソリューション', ms:'Penyelesaian untuk Setiap Format Penerbit', th:'โซลูชันสำหรับทุกรูปแบบผู้เผยแพร่', vi:'Giải Pháp Cho Mọi Định Dạng Nhà XB', hi:'हर प्रकाशक फॉर्मेट के लिए समाधान', ar:'حلول لكل تنسيق ناشر' },
  'Everything Agencies Need to Win': { es:'Todo lo que las Agencias Necesitan para Ganar', fr:'Tout ce dont les Agences ont Besoin pour Gagner', de:'Alles was Agenturen brauchen, um zu gewinnen', pt:'Tudo que as Agências Precisam para Vencer', ru:'Всё, Что Нужно Агентствам для Победы', zh:'代理商取胜所需的一切', ko:'에이전시가 승리하기 위해 필요한 모든 것', ja:'エージェンシーが勝つために必要なすべて', ms:'Semua yang Diperlukan Agensi untuk Menang', th:'ทุกสิ่งที่เอเจนซี่ต้องการเพื่อชนะ', vi:'Tất Cả Những Gì Đại Lý Cần Để Thắng', hi:'एजेंसियों को जीतने के लिए सब कुछ', ar:'كل ما تحتاجه الوكالات للفوز' },
  'Every Tool You Need to Win in Programmatic': { es:'Todas las Herramientas que Necesitas para Ganar en Programática', fr:'Tous les Outils dont vous avez Besoin pour Gagner en Programmatique', de:'Alle Tools, die Sie brauchen, um in Programmatic zu gewinnen', pt:'Todas as Ferramentas que você Precisa para Vencer no Programático', ru:'Все Инструменты, Необходимые для Победы в Программатике', zh:'在程序化广告中取胜所需的每一个工具', ko:'프로그래매틱에서 승리하기 위해 필요한 모든 도구', ja:'プログラマティックで勝つために必要なすべてのツール', ms:'Setiap Alat yang Anda Perlukan untuk Menang dalam Programatik', th:'เครื่องมือทุกอย่างที่คุณต้องการเพื่อชนะในโปรแกรมเมติก', vi:'Mọi Công Cụ Bạn Cần Để Thắng Trong Programmatic', hi:'प्रोग्रामेटिक में जीतने के लिए आपको हर टूल चाहिए', ar:'كل أداة تحتاجها للفوز في الإعلانات البرمجية' },
  'One Platform. All Your Clients. Maximum Performance.': { es:'Una Plataforma. Todos sus Clientes. Máximo Rendimiento.', fr:'Une Plateforme. Tous vos Clients. Performance Maximale.', de:'Eine Plattform. Alle Ihre Kunden. Maximale Leistung.', pt:'Uma Plataforma. Todos os seus Clientes. Máximo Desempenho.', ru:'Одна Платформа. Все Ваши Клиенты. Максимальная Производительность.', zh:'一个平台。所有客户。最大绩效。', ko:'하나의 플랫폼. 모든 고객. 최대 성능.', ja:'一つのプラットフォーム。すべてのクライアント。最大のパフォーマンス。', ms:'Satu Platform. Semua Klien Anda. Prestasi Maksimum.', th:'แพลตฟอร์มเดียว ลูกค้าทั้งหมดของคุณ ประสิทธิภาพสูงสุด', vi:'Một Nền Tảng. Tất Cả Khách Hàng. Hiệu Suất Tối Đa.', hi:'एक प्लेटफॉर्म। सभी क्लाइंट। अधिकतम प्रदर्शन।', ar:'منصة واحدة. جميع عملائك. أقصى أداء.' },
  'Launch, Scale & Optimise Campaigns Globally': { es:'Lanzar, Escalar y Optimizar Campañas Globalmente', fr:'Lancer, Scaler et Optimiser des Campagnes Mondialement', de:'Kampagnen Global Starten, Skalieren und Optimieren', pt:'Lançar, Escalar e Otimizar Campanhas Globalmente', ru:'Запускать, Масштабировать и Оптимизировать Кампании Глобально', zh:'在全球范围内启动、扩大和优化营销活动', ko:'글로벌 캠페인 시작, 확장 및 최적화', ja:'グローバルにキャンペーンを開始、スケール、最適化', ms:'Melancarkan, Skala & Optimalkan Kempen Secara Global', th:'เปิดตัว ขยาย และปรับแต่งแคมเปญทั่วโลก', vi:'Khởi Chạy, Mở Rộng & Tối Ưu Chiến Dịch Toàn Cầu', hi:'वैश्विक स्तर पर अभियान लॉन्च, स्केल और ऑप्टिमाइज़ करें', ar:'إطلاق الحملات وتوسيعها وتحسينها عالمياً' },
  'Buy Premium Inventory at Scale': { es:'Comprar Inventario Premium a Escala', fr:"Acheter de l'Inventaire Premium à l'Échelle", de:'Premium-Inventar in Großem Maßstab Kaufen', pt:'Comprar Inventário Premium em Escala', ru:'Покупать Премиум-Инвентарь в Масштабе', zh:'大规模购买优质广告库存', ko:'대규모 프리미엄 인벤토리 구매', ja:'大規模でプレミアムインベントリを購入', ms:'Beli Inventori Premium pada Skala', th:'ซื้อสินค้าคงคลังระดับพรีเมียมในระดับขนาดใหญ่', vi:'Mua Kho Hàng Cao Cấp Ở Quy Mô Lớn', hi:'बड़े पैमाने पर प्रीमियम इन्वेंटरी खरीदें', ar:'شراء المخزون المتميز على نطاق واسع' },
  'Maximize Your Ad Revenue with Intelligent Monetization': { es:'Maximice sus Ingresos Publicitarios con Monetización Inteligente', fr:'Maximisez vos Revenus Publicitaires avec une Monétisation Intelligente', de:'Maximieren Sie Ihre Anzeigeneinnahmen mit Intelligenter Monetarisierung', pt:'Maximize sua Receita de Anúncios com Monetização Inteligente', ru:'Максимизируйте Доходы от Рекламы с Интеллектуальной Монетизацией', zh:'通过智能变现最大化您的广告收益', ko:'지능형 수익화로 광고 수익 극대화', ja:'インテリジェントなマネタイゼーションで広告収益を最大化', ms:'Maksimumkan Pendapatan Iklan Anda dengan Monetisasi Cerdas', th:'เพิ่มรายได้โฆษณาของคุณให้สูงสุดด้วยการสร้างรายได้อัจฉริยะ', vi:'Tối Đa Hóa Doanh Thu QC Với Kiếm Tiền Thông Minh', hi:'इंटेलिजेंट मोनेटाइज़ेशन से विज्ञापन आय को अधिकतम करें', ar:'عظّم إيرادات الإعلانات بالتحقيق الذكي' },
  'Monetize Every Impression at Maximum Value': { es:'Monetice Cada Impresión al Valor Máximo', fr:'Monétisez Chaque Impression à sa Valeur Maximale', de:'Jede Impression zum Maximalwert Monetarisieren', pt:'Monetize Cada Impressão ao Valor Máximo', ru:'Монетизируйте Каждый Показ по Максимальной Цене', zh:'以最大价值变现每一个广告展示', ko:'최대 가치로 모든 임프레션 수익화', ja:'最大価値ですべてのインプレッションをマネタイズ', ms:'Monetisasi Setiap Tayangan pada Nilai Maksimum', th:'สร้างรายได้จากทุกการแสดงผลในมูลค่าสูงสุด', vi:'Kiếm Tiền Từ Mọi Hiển Thị Ở Giá Trị Tối Đa', hi:'अधिकतम मूल्य पर हर इम्प्रेशन से कमाई करें', ar:'تحقيق الدخل من كل ظهور بأقصى قيمة' },
  'The Complete Publisher Monetization Stack': { es:'El Stack Completo de Monetización para Editores', fr:'La Stack Complète de Monétisation pour les Éditeurs', de:'Der Vollständige Publisher-Monetarisierungs-Stack', pt:'O Stack Completo de Monetização para Editores', ru:'Полный Стек Монетизации Издателей', zh:'完整的发布商变现技术栈', ko:'완전한 퍼블리셔 수익화 스택', ja:'完全なパブリッシャー収益化スタック', ms:'Tumpukan Monetisasi Penerbit Penuh', th:'สแต็กการสร้างรายได้สำหรับผู้เผยแพร่ที่สมบูรณ์', vi:'Stack Kiếm Tiền Đầy Đủ Cho Nhà XB', hi:'प्रकाशक मोनेटाइज़ेशन का पूरा स्टैक', ar:'مجموعة تحقيق دخل الناشر الكاملة' },
  'Yield Optimization Built for Maximum Revenue': { es:'Optimización de Rendimiento para Máximos Ingresos', fr:'Optimisation du Rendement pour des Revenus Maximaux', de:'Ertragsoptimierung für Maximale Einnahmen', pt:'Otimização de Rendimento para Máxima Receita', ru:'Оптимизация Дохода для Максимальной Выручки', zh:'为最大化收益而生的收益优化', ko:'최대 수익을 위한 수익 최적화', ja:'最大収益のための収益最適化', ms:'Pengoptimuman Hasil untuk Pendapatan Maksimum', th:'การเพิ่มประสิทธิภาพผลตอบแทนสำหรับรายได้สูงสุด', vi:'Tối Ưu Lợi Nhuận Cho Doanh Thu Tối Đa', hi:'अधिकतम राजस्व के लिए यील्ड ऑप्टिमाइज़ेशन', ar:'تحسين العائد لتحقيق أقصى دخل' },
  'How a real-time bid is processed in under 100ms': { es:'Cómo se procesa una puja en tiempo real en menos de 100ms', fr:'Comment une enchère en temps réel est traitée en moins de 100ms', de:'Wie ein Echtzeit-Gebot in unter 100ms verarbeitet wird', pt:'Como um lance em tempo real é processado em menos de 100ms', ru:'Как обрабатывается ставка в режиме реального времени менее чем за 100 мс', zh:'实时竞价如何在100毫秒内完成处理', ko:'실시간 입찰이 100ms 미만으로 처리되는 방법', ja:'リアルタイム入札が100ms以内に処理される方法', ms:'Bagaimana bida masa nyata diproses dalam masa kurang 100ms', th:'วิธีที่การประมูลแบบเรียลไทม์ถูกประมวลผลภายใน 100ms', vi:'Cách xử lý đặt giá thầu thời gian thực dưới 100ms', hi:'रियल-टाइम बिड 100ms से कम में कैसे प्रोसेस होती है', ar:'كيف تُعالج مزايدة في الوقت الفعلي في أقل من 100 مللي ثانية' },
  'Total end-to-end: < 100ms guaranteed': { es:'Total de extremo a extremo: < 100ms garantizado', fr:'Total de bout en bout: < 100ms garanti', de:'Gesamt Ende-zu-Ende: < 100ms garantiert', pt:'Total ponta a ponta: < 100ms garantido', ru:'Общий сквозной: < 100 мс гарантировано', zh:'端到端总计：< 100ms保证', ko:'총 엔드투엔드: < 100ms 보장', ja:'合計エンドツーエンド: < 100ms 保証', ms:'Jumlah hujung ke hujung: < 100ms dijamin', th:'รวมครบ: < 100ms รับประกัน', vi:'Tổng đầu cuối: < 100ms đảm bảo', hi:'कुल एंड-टू-एंड: < 100ms गारंटीड', ar:'الإجمالي من البداية للنهاية: < 100 مللي ثانية مضمون' },
  'Typical response:': { es:'Respuesta típica:', fr:'Réponse typique:', de:'Typische Reaktion:', pt:'Resposta típica:', ru:'Типичный ответ:', zh:'典型响应时间：', ko:'일반적인 응답:', ja:'一般的な応答:', ms:'Respons tipikal:', th:'การตอบสนองทั่วไป:', vi:'Phản hồi điển hình:', hi:'सामान्य प्रतिक्रिया:', ar:'الاستجابة النموذجية:' },
  'Today, NexBids operates across 6 global offices, serves 2,000+ advertisers and 30,000+ publishers in 150+ countries, and processes 50B+ ad auctions daily.': { es:'Hoy, NexBids opera en 6 oficinas globales, sirve a más de 2.000 anunciantes y 30.000 editores en más de 150 países, y procesa más de 50B de subastas de anuncios diariamente.', fr:"Aujourd'hui, NexBids opère dans 6 bureaux mondiaux, sert plus de 2 000 annonceurs et 30 000 éditeurs dans plus de 150 pays, et traite plus de 50 milliards d'enchères publicitaires quotidiennement.", de:'Heute ist NexBids in 6 globalen Büros tätig, bedient mehr als 2.000 Werbetreibende und 30.000 Publisher in mehr als 150 Ländern und verarbeitet täglich mehr als 50 Milliarden Werbeauktionen.', pt:'Hoje, NexBids opera em 6 escritórios globais, atende mais de 2.000 anunciantes e 30.000 editores em mais de 150 países e processa mais de 50B de leilões de anúncios diariamente.', ru:'Сегодня NexBids работает в 6 глобальных офисах, обслуживает более 2 000 рекламодателей и 30 000 издателей в более чем 150 странах и ежедневно обрабатывает более 50 млрд рекламных аукционов.', zh:'如今，NexBids在全球6个办公室运营，服务于150多个国家的2,000多个广告主和30,000多个发布商，每天处理500亿以上的广告拍卖。', ko:'오늘날 NexBids는 6개의 글로벌 사무소에서 운영되며, 150개 이상의 국가에서 2,000개 이상의 광고주와 30,000개 이상의 퍼블리셔를 서비스하며, 매일 500억 개 이상의 광고 경매를 처리합니다.', ja:'今日、NexBidsは6つのグローバルオフィスで運営され、150以上の国で2,000以上の広告主と30,000以上のパブリッシャーにサービスを提供し、毎日500億以上の広告オークションを処理しています。', ms:'Hari ini, NexBids beroperasi di 6 pejabat global, melayani 2,000+ pengiklan dan 30,000+ penerbit di 150+ negara, dan memproses 50B+ lelongan iklan setiap hari.', th:'ปัจจุบัน NexBids ดำเนินงานใน 6 สำนักงานทั่วโลก ให้บริการผู้ลงโฆษณากว่า 2,000 รายและผู้เผยแพร่กว่า 30,000 รายใน 150+ ประเทศ และประมวลผลการประมูลโฆษณากว่า 50 พันล้านรายการต่อวัน', vi:'Ngày nay, NexBids hoạt động trên 6 văn phòng toàn cầu, phục vụ hơn 2.000 nhà quảng cáo và 30.000 nhà xuất bản tại hơn 150 quốc gia, xử lý hơn 50 tỷ phiên đấu giá quảng cáo mỗi ngày.', hi:'आज, NexBids 6 वैश्विक कार्यालयों में काम करता है, 150+ देशों में 2,000+ विज्ञापनदाताओं और 30,000+ प्रकाशकों की सेवा करता है, और प्रतिदिन 50B+ विज्ञापन नीलामियां प्रोसेस करता है।', ar:'اليوم، تعمل NexBids عبر 6 مكاتب عالمية، وتخدم أكثر من 2,000 معلن و30,000 ناشر في أكثر من 150 دولة، وتعالج أكثر من 50 مليار مزاد إعلاني يومياً.' },
  'We respect your time. Our process is efficient, transparent, and typically completes in 2–3 weeks.': { es:'Respetamos su tiempo. Nuestro proceso es eficiente, transparente y generalmente se completa en 2-3 semanas.', fr:"Nous respectons votre temps. Notre processus est efficace, transparent et se termine généralement en 2 à 3 semaines.", de:'Wir respektieren Ihre Zeit. Unser Prozess ist effizient, transparent und wird in der Regel in 2-3 Wochen abgeschlossen.', pt:'Respeitamos o seu tempo. Nosso processo é eficiente, transparente e normalmente se completa em 2 a 3 semanas.', ru:'Мы уважаем ваше время. Наш процесс эффективен, прозрачен и обычно завершается за 2-3 недели.', zh:'我们尊重您的时间。我们的流程高效透明，通常在2-3周内完成。', ko:'저희는 귀하의 시간을 존중합니다. 저희 프로세스는 효율적이고 투명하며 일반적으로 2-3주 안에 완료됩니다.', ja:'お客様のお時間を大切にしています。プロセスは効率的で透明であり、通常2〜3週間で完了します。', ms:'Kami menghormati masa anda. Proses kami adalah cekap, telus dan biasanya selesai dalam 2-3 minggu.', th:'เราเคารพเวลาของคุณ กระบวนการของเราเป็นไปอย่างมีประสิทธิภาพ โปร่งใส และโดยปกติจะเสร็จสิ้นภายใน 2-3 สัปดาห์', vi:'Chúng tôi tôn trọng thời gian của bạn. Quy trình của chúng tôi hiệu quả, minh bạch và thường hoàn thành trong 2-3 tuần.', hi:'हम आपके समय का सम्मान करते हैं। हमारी प्रक्रिया कुशल, पारदर्शी है और आमतौर पर 2-3 सप्ताह में पूरी हो जाती है।', ar:'نحن نحترم وقتك. عمليتنا فعالة وشفافة وعادة ما تكتمل في 2-3 أسابيع.' },

};

/**
 * Translate content text.
 * t(en, zh) — looks up the English text in CONTENT_T for the current language.
 * Falls back to: zh (for Chinese), then en for everything else.
 * Also stores data-en / data-zh attributes for legacy applyLang() usage.
 */
const t = (en, zh) => {
  let text;
  if (currentLang === 'zh') {
    text = zh;
  } else if (currentLang === 'en') {
    text = en;
  } else {
    // Look up translation in CONTENT_T dictionary
    const entry = CONTENT_T[en];
    text = (entry && entry[currentLang]) ? entry[currentLang] : en;
  }
  const safeEn = en.replace(/"/g,'&quot;');
  const safeZh = zh.replace(/"/g,'&quot;');
  return `<span data-en="${safeEn}" data-zh="${safeZh}">${text}</span>`;
};
function setLang(code) {
  currentLang = code;
  applyLang();
  renderPage(currentPage);
  // close lang dropdown
  document.getElementById('langDropdown')?.classList.remove('open');
}

// Legacy toggle kept for footer button
function toggleLang() {
  const idx = LANGUAGES.findIndex(l => l.code === currentLang);
  currentLang = LANGUAGES[(idx + 1) % LANGUAGES.length].code;
  applyLang();
  renderPage(currentPage);
}

window.toggleLangDropdown = function() {
  document.getElementById('langDropdown')?.classList.toggle('open');
};

function applyLang() {
  const lang = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];
  document.documentElement.lang = lang.code;
  document.documentElement.dir  = lang.dir;
  document.body.classList.toggle('zh', currentLang === 'zh');
  document.body.classList.toggle('rtl', lang.dir === 'rtl');

  // Update lang button label
  const langBtn = document.getElementById('langBtn');
  if (langBtn) langBtn.innerHTML = `${lang.flag} <span>${lang.label}</span> <svg width="10" height="7" viewBox="0 0 12 8"><path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`;

  // Footer copyright / tagline
  const cp = document.getElementById('footerCopyright');
  if (cp) cp.textContent = ui('copyright');
  const tg = document.getElementById('footerTagline');
  if (tg) tg.textContent = ui('tagline');

  // Nav text nodes
  const navMap = {
    navSolutions: 'solutions', navProducts: 'products', navTechnology: 'technology',
    navResources: 'resources', navCaseStudies: 'caseStudies', navCompany: 'company',
    navContactUs: 'contactUs', navLogin: 'login',
  };
  Object.entries(navMap).forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = ui(key);
  });

  // swap all data-en / data-zh text nodes (legacy)
  document.querySelectorAll('[data-en]').forEach(el => {
    const val = el.dataset[currentLang] || el.dataset.en;
    if (val) el.textContent = val;
  });
}

/* ─────────────────────────────────────────────
   ROUTER
───────────────────────────────────────────── */
function navigate(page) {
  currentPage = page;
  renderPage(page);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // close mobile menu
  document.getElementById('navMenu')?.classList.remove('open');
  // update active state
  updateNavActive(page);
}

function renderPage(page) {
  const container = document.getElementById('pageContainer');
  const renderers = {
    'home':                 renderHome,
    'solutions':            renderSolutionsOverview,
    'solutions-advertiser': renderSolutionsAdvertiser,
    'solutions-publisher':  renderSolutionsPublisher,
    'solutions-agency':     renderSolutionsAgency,
    'products':             renderProductsOverview,
    'products-dsp':         renderProductsDSP,
    'products-adx':         renderProductsADX,
    'products-ssp':         renderProductsSSP,
    'technology':           renderTechnology,
    'resources':            renderResources,
    'case-studies':         renderCaseStudiesHub,
    'cases-advertiser':     renderCasesAdvertiser,
    'cases-publisher':      renderCasesPublisher,
    'company':              renderAbout,
    'about':                renderAbout,
    'careers':              renderCareers,
    'contact':              renderContact,
    'login-dsp':            () => renderLogin('dsp'),
    'login-ssp':            () => renderLogin('ssp'),
    'login-adx':            () => renderLogin('adx'),
    '404':                  render404,
  };
  const fn = renderers[page] || renderHome;
  container.innerHTML = `<div class="page-transition">${fn()}</div>`;
  applyLang();
  initScrollSpy();
  initCounterAnimation();
  // Init global traffic map canvas if on home page
  if (typeof window._initGTM === 'function') {
    requestAnimationFrame(() => window._initGTM());
  }
}

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */

function sectionTag(en, zh, color = '') {
  return `<div class="section-tag ${color}">${t(en, zh)}</div>`;
}

function metricsBand(items) {
  const cols = items.map(([num, en, zh]) =>
    `<div class="metric-item"><div class="metric-num">${num}</div><div class="metric-label">${t(en, zh)}</div></div>`
  ).join('');
  return `<div class="metrics-band"><div class="metrics-grid">${cols}</div></div>`;
}

function ctaBand(enH, zhH, enP, zhP, cta1en, cta1zh, cta2en, cta2zh, page2 = 'contact') {
  return `
  <section class="section section-dark">
    <div class="container">
      <div class="cta-band">
        <h2>${t(enH, zhH)}</h2>
        <p>${t(enP, zhP)}</p>
        <div class="btn-group" style="justify-content:center">
          <button class="btn btn-primary" onclick="navigate('contact')">${t(cta1en, cta1zh)}</button>
          <button class="btn btn-secondary" onclick="navigate('${page2}')">${t(cta2en, cta2zh)}</button>
        </div>
      </div>
    </div>
  </section>`;
}

function pillarCard(iconOrGi, bg, enTitle, zhTitle, enDesc, zhDesc) {
  return `
  <div class="pillar-card">
    <div class="pillar-icon">${iconOrGi}</div>
    <h3>${t(enTitle, zhTitle)}</h3>
    <p>${t(enDesc, zhDesc)}</p>
  </div>`;
}

/* ─────────────────────────────────────────────
   PAGE HERO VISUAL ILLUSTRATIONS
   Each page gets a themed SVG/HTML visual for the right column
───────────────────────────────────────────── */

/* Wrap page-hero content in two-column layout with visual on the right */
function pageHeroLayout(bgStyle, textContent, visualHtml) {
  return `
  <div class="page-hero-section" style="background:${bgStyle}">
    <div class="page-hero-inner">
      <div class="page-hero-text">
        ${textContent}
      </div>
      <div class="page-hero-visual" aria-hidden="true">
        ${visualHtml}
      </div>
    </div>
  </div>`;
}

/* ── Solutions Overview Visual: 3 product cards stacked */
function vizSolutionsOverview() {
  const cards = [
    { color:'#2563EB', label:'DSP', sub:'Demand-Side Platform', pct:84 },
    { color:'#7C3AED', label:'ADX', sub:'Ad Exchange', pct:96 },
    { color:'#059669', label:'SSP', sub:'Supply-Side Platform', pct:91 },
  ];
  return `
  <div class="ph-viz-card" style="max-width:360px">
    <div class="ph-viz-header">
      <span class="ph-viz-dot" style="background:#FF5F57"></span>
      <span class="ph-viz-dot" style="background:#FEBC2E"></span>
      <span class="ph-viz-dot" style="background:#28C840"></span>
      <span class="ph-viz-title">NexBids Ecosystem</span>
    </div>
    <div class="ph-viz-body" style="display:flex;flex-direction:column;gap:14px">
      ${cards.map(c => `
      <div style="display:flex;align-items:center;gap:12px">
        <div style="width:44px;height:44px;border-radius:10px;background:${c.color}22;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:${c.color};flex-shrink:0;border:1px solid ${c.color}33">${c.label}</div>
        <div style="flex:1">
          <div style="display:flex;justify-content:space-between;margin-bottom:6px">
            <span style="font-size:12.5px;font-weight:600;color:var(--text-primary)">${c.sub}</span>
            <span style="font-size:11px;color:${c.color};font-weight:700">${c.pct}%</span>
          </div>
          <div style="height:6px;background:rgba(255,255,255,0.06);border-radius:4px;overflow:hidden">
            <div class="ph-bar-fill" style="height:100%;width:${c.pct}%;background:linear-gradient(90deg,${c.color},${c.color}99);border-radius:4px"></div>
          </div>
        </div>
      </div>`).join('')}
      <div style="margin-top:8px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.06);display:grid;grid-template-columns:1fr 1fr 1fr;text-align:center">
        ${[['80K+','Partners'],['150+','Markets'],['50B+','Daily Auctions']].map(([n,l]) => `
        <div>
          <div style="font-size:16px;font-weight:900;background:var(--gradient-primary);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">${n}</div>
          <div style="font-size:10px;color:var(--text-muted);margin-top:2px">${l}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>
  <div class="ph-badge" style="top:-12px;right:20px;animation-delay:0.2s">
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#34D399" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
    Full-Stack Platform
  </div>`;
}

/* ── Advertiser Solution Visual: Campaign Performance Dashboard */
function vizAdvertiser() {
  return `
  <div class="ph-viz-card" style="max-width:360px">
    <div class="ph-viz-header">
      <span class="ph-viz-dot" style="background:#FF5F57"></span>
      <span class="ph-viz-dot" style="background:#FEBC2E"></span>
      <span class="ph-viz-dot" style="background:#28C840"></span>
      <span class="ph-viz-title">Campaign Performance</span>
    </div>
    <div class="ph-viz-body" style="display:flex;flex-direction:column;gap:14px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:10px;color:var(--text-muted);margin-bottom:3px">ROAS</div>
          <div style="font-size:28px;font-weight:900;color:#60A5FA;letter-spacing:-1px">8.4×</div>
        </div>
        <div>
          <div style="font-size:10px;color:var(--text-muted);margin-bottom:3px">CPA</div>
          <div style="font-size:28px;font-weight:900;color:#34D399;letter-spacing:-1px">-38%</div>
        </div>
        <div>
          <div style="font-size:10px;color:var(--text-muted);margin-bottom:3px">CTR</div>
          <div style="font-size:28px;font-weight:900;color:#C084FC;letter-spacing:-1px">3.2%</div>
        </div>
      </div>
      <!-- Sparkline bars -->
      <div style="display:flex;align-items:flex-end;gap:3px;height:48px;background:rgba(255,255,255,0.02);border-radius:8px;padding:6px 8px">
        ${[35,52,44,68,61,82,74,90,85,94,88,100].map((h,i) => `
        <div style="flex:1;height:${h}%;background:linear-gradient(to top,rgba(0,87,255,0.8),rgba(124,58,237,0.5));border-radius:3px 3px 1px 1px;animation:barGrow 0.5s ease-out ${i*0.06}s both"></div>`).join('')}
      </div>
      <!-- Channel breakdown -->
      <div style="display:flex;flex-direction:column;gap:7px">
        ${[['Display','#60A5FA',72],['Video','#C084FC',58],['Native','#34D399',45]].map(([l,c,v]) => `
        <div style="display:flex;align-items:center;gap:8px;font-size:11px">
          <span style="width:6px;height:6px;border-radius:50%;background:${c};flex-shrink:0"></span>
          <span style="width:48px;color:var(--text-muted);flex-shrink:0">${l}</span>
          <div style="flex:1;height:5px;background:rgba(255,255,255,0.05);border-radius:3px;overflow:hidden">
            <div class="ph-bar-fill" style="height:100%;width:${v}%;background:${c}"></div>
          </div>
          <span style="color:${c};font-weight:600;width:28px;text-align:right">${v}%</span>
        </div>`).join('')}
      </div>
      <div style="display:flex;gap:8px">
        <div style="flex:1;padding:8px;background:rgba(0,87,255,0.08);border-radius:8px;border:1px solid rgba(0,87,255,0.15);text-align:center">
          <div style="font-size:14px;font-weight:800;color:#60A5FA">150+</div>
          <div style="font-size:10px;color:var(--text-muted)">Countries</div>
        </div>
        <div style="flex:1;padding:8px;background:rgba(124,58,237,0.08);border-radius:8px;border:1px solid rgba(124,58,237,0.15);text-align:center">
          <div style="font-size:14px;font-weight:800;color:#C084FC">AI-Bid</div>
          <div style="font-size:10px;color:var(--text-muted)">Optimizer</div>
        </div>
        <div style="flex:1;padding:8px;background:rgba(5,150,105,0.08);border-radius:8px;border:1px solid rgba(5,150,105,0.15);text-align:center">
          <div style="font-size:14px;font-weight:800;color:#34D399">30+</div>
          <div style="font-size:10px;color:var(--text-muted)">Ad Formats</div>
        </div>
      </div>
    </div>
  </div>
  <div class="ph-badge" style="top:-10px;right:16px;animation-delay:0.3s">
    <span style="width:6px;height:6px;border-radius:50%;background:#34D399"></span>
    Live Optimization
  </div>`;
}

/* ── Publisher Solution Visual: Revenue Yield Dashboard */
function vizPublisher() {
  return `
  <div class="ph-viz-card" style="max-width:360px">
    <div class="ph-viz-header">
      <span class="ph-viz-dot" style="background:#FF5F57"></span>
      <span class="ph-viz-dot" style="background:#FEBC2E"></span>
      <span class="ph-viz-dot" style="background:#28C840"></span>
      <span class="ph-viz-title">Publisher Revenue Dashboard</span>
    </div>
    <div class="ph-viz-body" style="display:flex;flex-direction:column;gap:14px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:10px;color:var(--text-muted);margin-bottom:3px">eCPM</div>
          <div style="font-size:26px;font-weight:900;color:#34D399;letter-spacing:-1px">$4.82</div>
          <div style="font-size:10px;color:#34D399">↑ +67% vs prior</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:10px;color:var(--text-muted);margin-bottom:3px">Fill Rate</div>
          <div style="font-size:26px;font-weight:900;color:#60A5FA;letter-spacing:-1px">99.5%</div>
          <div style="font-size:10px;color:#60A5FA">↑ +23%</div>
        </div>
      </div>
      <!-- Revenue bars by format -->
      <div style="background:rgba(255,255,255,0.02);border-radius:10px;padding:12px">
        <div style="font-size:10px;color:var(--text-muted);margin-bottom:10px;font-weight:600;letter-spacing:0.4px">REVENUE BY FORMAT</div>
        ${[
          ['Rewarded Video','#34D399',88],
          ['Interstitial','#60A5FA',64],
          ['Banner','#C084FC',42],
          ['Native','#FCD34D',35],
        ].map(([l,c,v]) => `
        <div style="display:flex;align-items:center;gap:8px;font-size:11px;margin-bottom:7px">
          <span style="width:72px;color:var(--text-muted);flex-shrink:0">${l}</span>
          <div style="flex:1;height:6px;background:rgba(255,255,255,0.05);border-radius:3px;overflow:hidden">
            <div class="ph-bar-fill" style="height:100%;width:${v}%;background:${c};border-radius:3px"></div>
          </div>
          <span style="color:${c};font-weight:700;width:24px;text-align:right">${v}</span>
        </div>`).join('')}
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <div style="padding:10px;background:rgba(5,150,105,0.08);border:1px solid rgba(5,150,105,0.15);border-radius:8px">
          <div style="font-size:13px;font-weight:800;color:#34D399">30K+</div>
          <div style="font-size:10px;color:var(--text-muted)">Active Publishers</div>
        </div>
        <div style="padding:10px;background:rgba(37,99,235,0.08);border:1px solid rgba(37,99,235,0.15);border-radius:8px">
          <div style="font-size:13px;font-weight:800;color:#60A5FA">50K+</div>
          <div style="font-size:10px;color:var(--text-muted)">Demand Sources</div>
        </div>
      </div>
    </div>
  </div>
  <div class="ph-badge" style="bottom:16px;left:-12px;animation-delay:0.4s">
    <span style="width:6px;height:6px;border-radius:50%;background:#34D399;animation:pulse 1.5s infinite"></span>
    Header Bidding Active
  </div>`;
}

/* ── Agency Solution Visual: Multi-client management */
function vizAgency() {
  const clients = [
    { name:'Client A', spend:'$124K', roas:'6.2×', color:'#7C3AED' },
    { name:'Client B', spend:'$87K',  roas:'4.8×', color:'#2563EB' },
    { name:'Client C', spend:'$203K', roas:'7.1×', color:'#059669' },
  ];
  return `
  <div class="ph-viz-card" style="max-width:360px">
    <div class="ph-viz-header">
      <span class="ph-viz-dot" style="background:#FF5F57"></span>
      <span class="ph-viz-dot" style="background:#FEBC2E"></span>
      <span class="ph-viz-dot" style="background:#28C840"></span>
      <span class="ph-viz-title">Agency Dashboard — Multi-Client</span>
    </div>
    <div class="ph-viz-body" style="display:flex;flex-direction:column;gap:12px">
      <div style="display:flex;justify-content:space-between;padding:10px;background:rgba(124,58,237,0.06);border-radius:10px;border:1px solid rgba(124,58,237,0.12)">
        <div style="text-align:center">
          <div style="font-size:20px;font-weight:900;color:#C084FC">12</div>
          <div style="font-size:10px;color:var(--text-muted)">Active Clients</div>
        </div>
        <div style="text-align:center">
          <div style="font-size:20px;font-weight:900;color:#60A5FA">$2.1M</div>
          <div style="font-size:10px;color:var(--text-muted)">Monthly Spend</div>
        </div>
        <div style="text-align:center">
          <div style="font-size:20px;font-weight:900;color:#34D399">5.8×</div>
          <div style="font-size:10px;color:var(--text-muted)">Avg ROAS</div>
        </div>
      </div>
      ${clients.map(c => `
      <div style="display:flex;align-items:center;gap:12px;padding:10px;background:rgba(255,255,255,0.02);border-radius:10px;border:1px solid rgba(255,255,255,0.05)">
        <div style="width:36px;height:36px;border-radius:9px;background:${c.color}22;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:${c.color};flex-shrink:0;border:1px solid ${c.color}33">${c.name[0]}${c.name[c.name.length-1]}</div>
        <div style="flex:1">
          <div style="font-size:12.5px;font-weight:600;color:var(--text-primary)">${c.name}</div>
          <div style="font-size:11px;color:var(--text-muted)">Spend: ${c.spend}</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:14px;font-weight:800;color:${c.color}">${c.roas}</div>
          <div style="font-size:10px;color:var(--text-muted)">ROAS</div>
        </div>
      </div>`).join('')}
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        <span style="font-size:10px;padding:4px 8px;background:rgba(124,58,237,0.1);color:#C084FC;border-radius:6px;border:1px solid rgba(124,58,237,0.2)">White-Label</span>
        <span style="font-size:10px;padding:4px 8px;background:rgba(37,99,235,0.1);color:#60A5FA;border-radius:6px;border:1px solid rgba(37,99,235,0.2)">Volume Pricing</span>
        <span style="font-size:10px;padding:4px 8px;background:rgba(5,150,105,0.1);color:#34D399;border-radius:6px;border:1px solid rgba(5,150,105,0.2)">API Access</span>
      </div>
    </div>
  </div>
  <div class="ph-badge" style="top:-10px;right:16px;animation-delay:0.5s">
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C084FC" stroke-width="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
    12 Clients Managed
  </div>`;
}

/* ── Products Overview Visual: Stack diagram */
function vizProductsOverview() {
  return `
  <div class="ph-viz-card" style="max-width:360px">
    <div class="ph-viz-header">
      <span class="ph-viz-dot" style="background:#FF5F57"></span>
      <span class="ph-viz-dot" style="background:#FEBC2E"></span>
      <span class="ph-viz-dot" style="background:#28C840"></span>
      <span class="ph-viz-title">NexBids Full Stack</span>
    </div>
    <div class="ph-viz-body" style="display:flex;flex-direction:column;gap:10px">
      ${[
        { tag:'DSP', name:'Demand-Side Platform', role:'Advertisers & Agencies', color:'#2563EB', stat:'50K+ Advertisers', icon:'↗' },
        { tag:'ADX', name:'Ad Exchange', role:'Marketplace Infrastructure', color:'#7C3AED', stat:'50B+ Daily Auctions', icon:'⟷' },
        { tag:'SSP', name:'Supply-Side Platform', role:'Publishers & Developers', color:'#059669', stat:'30K+ Publishers', icon:'↙' },
      ].map((p, i) => `
      <div style="padding:14px;background:${p.color}0d;border-radius:12px;border:1px solid ${p.color}22;position:relative">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
          <div style="width:40px;height:40px;border-radius:9px;background:${p.color}22;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:${p.color};border:1px solid ${p.color}33;flex-shrink:0">${p.tag}</div>
          <div>
            <div style="font-size:12.5px;font-weight:700;color:var(--text-primary)">${p.name}</div>
            <div style="font-size:11px;color:var(--text-muted)">${p.role}</div>
          </div>
        </div>
        <div style="height:4px;background:rgba(255,255,255,0.05);border-radius:3px;overflow:hidden">
          <div class="ph-bar-fill" style="height:100%;width:${[84,96,91][i]}%;background:linear-gradient(90deg,${p.color},${p.color}88)"></div>
        </div>
        <div style="font-size:10px;color:${p.color};margin-top:6px;font-weight:600">${p.stat}</div>
      </div>
      ${i < 2 ? `<div style="text-align:center;color:var(--text-muted);font-size:16px;line-height:1">⋮</div>` : ''}`).join('')}
    </div>
  </div>`;
}

/* ── DSP Product Visual: RTB Bidding */
function vizDSP() {
  return `
  <div class="ph-viz-card" style="max-width:360px">
    <div class="ph-viz-header">
      <span class="ph-viz-dot" style="background:#FF5F57"></span>
      <span class="ph-viz-dot" style="background:#FEBC2E"></span>
      <span class="ph-viz-dot" style="background:#28C840"></span>
      <span class="ph-viz-title">NexBids DSP — Bid Stream</span>
    </div>
    <div class="ph-viz-body" style="display:flex;flex-direction:column;gap:14px">
      <div style="display:flex;justify-content:space-between">
        <div>
          <div style="font-size:10px;color:var(--text-muted)">BID REQUESTS/SEC</div>
          <div style="font-size:24px;font-weight:900;color:#60A5FA;letter-spacing:-1px">578K</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:10px;color:var(--text-muted)">RESPONSE TIME</div>
          <div style="font-size:24px;font-weight:900;color:#34D399;letter-spacing:-1px">&lt;80ms</div>
        </div>
      </div>
      <!-- AI Bidding types -->
      <div style="background:rgba(255,255,255,0.02);border-radius:10px;padding:12px">
        <div style="font-size:10px;color:var(--text-muted);margin-bottom:10px;font-weight:600">AI BIDDING STRATEGY</div>
        ${[
          ['ROAS Optimizer','62% campaigns','#60A5FA',62],
          ['CPA Bidder','24% campaigns','#C084FC',24],
          ['Max Reach','14% campaigns','#34D399',14],
        ].map(([name,sub,c,v]) => `
        <div style="margin-bottom:10px">
          <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:4px">
            <span style="color:var(--text-primary);font-weight:600">${name}</span>
            <span style="color:var(--text-muted)">${sub}</span>
          </div>
          <div style="height:6px;background:rgba(255,255,255,0.05);border-radius:3px;overflow:hidden">
            <div class="ph-bar-fill" style="height:100%;width:${v}%;background:${c};border-radius:3px"></div>
          </div>
        </div>`).join('')}
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;text-align:center">
        ${[['300+','Segments'],['30+','Formats'],['150+','Countries']].map(([n,l]) => `
        <div style="padding:8px;background:rgba(37,99,235,0.08);border-radius:8px;border:1px solid rgba(37,99,235,0.15)">
          <div style="font-size:14px;font-weight:800;color:#60A5FA">${n}</div>
          <div style="font-size:10px;color:var(--text-muted)">${l}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>
  <div class="ph-badge" style="top:-10px;right:16px;animation-delay:0.2s">
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
    AI Bidding Active
  </div>`;
}

/* ── ADX Product Visual: Exchange flow */
function vizADX() {
  return `
  <div class="ph-viz-card" style="max-width:360px">
    <div class="ph-viz-header">
      <span class="ph-viz-dot" style="background:#FF5F57"></span>
      <span class="ph-viz-dot" style="background:#FEBC2E"></span>
      <span class="ph-viz-dot" style="background:#28C840"></span>
      <span class="ph-viz-title">NexBids ADX — Live Auction</span>
    </div>
    <div class="ph-viz-body" style="display:flex;flex-direction:column;gap:14px">
      <!-- Auction flow diagram -->
      <div style="display:flex;align-items:center;gap:8px;font-size:11px">
        <div style="flex:1;padding:10px;background:rgba(37,99,235,0.1);border-radius:8px;border:1px solid rgba(37,99,235,0.2);text-align:center">
          <div style="font-size:14px;font-weight:800;color:#60A5FA">DSP</div>
          <div style="color:var(--text-muted);margin-top:2px">Buyers</div>
        </div>
        <div style="text-align:center;color:var(--text-muted)">
          <div style="font-size:18px">⟷</div>
          <div style="font-size:10px">&lt;100ms</div>
        </div>
        <div style="flex:1;padding:10px;background:rgba(124,58,237,0.15);border-radius:8px;border:1px solid rgba(124,58,237,0.25);text-align:center">
          <div style="font-size:14px;font-weight:800;color:#C084FC">ADX</div>
          <div style="color:var(--text-muted);margin-top:2px">Exchange</div>
        </div>
        <div style="text-align:center;color:var(--text-muted)">
          <div style="font-size:18px">⟷</div>
          <div style="font-size:10px">&lt;100ms</div>
        </div>
        <div style="flex:1;padding:10px;background:rgba(5,150,105,0.1);border-radius:8px;border:1px solid rgba(5,150,105,0.2);text-align:center">
          <div style="font-size:14px;font-weight:800;color:#34D399">SSP</div>
          <div style="color:var(--text-muted);margin-top:2px">Sellers</div>
        </div>
      </div>
      <!-- Stats -->
      <div style="background:rgba(255,255,255,0.02);border-radius:10px;padding:12px">
        <div style="font-size:10px;color:var(--text-muted);margin-bottom:10px;font-weight:600">TODAY'S EXCHANGE METRICS</div>
        ${[
          ['Bid Requests','50B+','#C084FC'],
          ['Win Rate (Avg)','34.7%','#60A5FA'],
          ['Latency P99','<100ms','#34D399'],
          ['Supply Quality','98.2%','#FCD34D'],
        ].map(([l,v,c]) => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.04);font-size:12px">
          <span style="color:var(--text-muted)">${l}</span>
          <span style="font-weight:700;color:${c}">${v}</span>
        </div>`).join('')}
      </div>
      <div style="display:flex;gap:8px">
        <span style="font-size:10px;padding:5px 8px;background:rgba(124,58,237,0.1);color:#C084FC;border-radius:6px;border:1px solid rgba(124,58,237,0.2)">OpenRTB 2.6</span>
        <span style="font-size:10px;padding:5px 8px;background:rgba(37,99,235,0.1);color:#60A5FA;border-radius:6px;border:1px solid rgba(37,99,235,0.2)">PMP Deals</span>
        <span style="font-size:10px;padding:5px 8px;background:rgba(5,150,105,0.1);color:#34D399;border-radius:6px;border:1px solid rgba(5,150,105,0.2)">Prog. Guaranteed</span>
      </div>
    </div>
  </div>
  <div class="ph-badge" style="top:-10px;right:16px;animation-delay:0.3s">
    <span style="width:6px;height:6px;border-radius:50%;background:#C084FC;animation:pulse 1.2s infinite"></span>
    50B+ Auctions Today
  </div>`;
}

/* ── SSP Product Visual: Publisher Yield */
function vizSSP() {
  return `
  <div class="ph-viz-card" style="max-width:360px">
    <div class="ph-viz-header">
      <span class="ph-viz-dot" style="background:#FF5F57"></span>
      <span class="ph-viz-dot" style="background:#FEBC2E"></span>
      <span class="ph-viz-dot" style="background:#28C840"></span>
      <span class="ph-viz-title">NexBids SSP — Yield Manager</span>
    </div>
    <div class="ph-viz-body" style="display:flex;flex-direction:column;gap:14px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:10px;color:var(--text-muted)">TODAY'S REVENUE</div>
          <div style="font-size:24px;font-weight:900;color:#34D399;letter-spacing:-1px">$7,842</div>
          <div style="font-size:10px;color:#34D399">↑ +52% vs last month</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:10px;color:var(--text-muted)">FILL RATE</div>
          <div style="font-size:24px;font-weight:900;color:#60A5FA;letter-spacing:-1px">99.5%</div>
        </div>
      </div>
      <!-- Revenue over time bars -->
      <div style="display:flex;align-items:flex-end;gap:3px;height:52px;background:rgba(255,255,255,0.02);border-radius:8px;padding:6px 8px">
        ${[42,55,48,62,58,70,67,80,75,88,82,100].map((h,i) => `
        <div style="flex:1;height:${h}%;background:linear-gradient(to top,rgba(5,150,105,0.8),rgba(16,185,129,0.4));border-radius:3px 3px 1px 1px;animation:barGrow 0.5s ease-out ${i*0.05}s both"></div>`).join('')}
      </div>
      <!-- Integration types -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        ${[
          ['Header Bidding','Prebid.js','#34D399'],
          ['iOS SDK','Native Ads','#60A5FA'],
          ['Android SDK','Banner+Video','#C084FC'],
          ['Unity Plugin','Rewarded','#FCD34D'],
        ].map(([t,s,c]) => `
        <div style="padding:8px;background:rgba(255,255,255,0.02);border-radius:8px;border:1px solid rgba(255,255,255,0.05)">
          <div style="font-size:11.5px;font-weight:600;color:${c}">${t}</div>
          <div style="font-size:10px;color:var(--text-muted)">${s}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>
  <div class="ph-badge" style="bottom:12px;left:-12px;animation-delay:0.4s">
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#34D399" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
    Revenue Optimized
  </div>`;
}

/* ── Technology Visual: Infrastructure diagram */
function vizTechnology() {
  return `
  <div class="ph-viz-card" style="max-width:360px">
    <div class="ph-viz-header">
      <span class="ph-viz-dot" style="background:#FF5F57"></span>
      <span class="ph-viz-dot" style="background:#FEBC2E"></span>
      <span class="ph-viz-dot" style="background:#28C840"></span>
      <span class="ph-viz-title">Infrastructure — Live Status</span>
    </div>
    <div class="ph-viz-body" style="display:flex;flex-direction:column;gap:12px">
      <!-- Global regions -->
      <div style="font-size:10px;color:var(--text-muted);font-weight:600;letter-spacing:0.4px">GLOBAL DATA CENTERS</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">
        ${[
          ['NA-W','San Francisco','#34D399'],
          ['NA-E','Barcelona','#34D399'],
          ['EU','London','#34D399'],
          ['APAC-E','Singapore','#34D399'],
          ['APAC-SE','Tokyo','#60A5FA'],
          ['MENA','Dubai','#60A5FA'],
        ].map(([code, city, c]) => `
        <div style="padding:8px;background:rgba(255,255,255,0.02);border-radius:8px;border:1px solid rgba(255,255,255,0.05);text-align:center">
          <div style="display:flex;align-items:center;justify-content:center;gap:4px;margin-bottom:3px">
            <span style="width:5px;height:5px;border-radius:50%;background:${c}"></span>
            <span style="font-size:10px;font-weight:700;color:${c}">${code}</span>
          </div>
          <div style="font-size:9px;color:var(--text-muted)">${city}</div>
        </div>`).join('')}
      </div>
      <!-- Tech specs -->
      <div style="background:rgba(255,255,255,0.02);border-radius:10px;padding:10px">
        ${[
          ['Bid Throughput','50B+/day','#60A5FA'],
          ['P99 Latency','<100ms','#34D399'],
          ['Platform Uptime','99.98%','#34D399'],
          ['ML Models','6 Proprietary','#C084FC'],
        ].map(([l,v,c]) => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid rgba(255,255,255,0.04);font-size:11px">
          <span style="color:var(--text-muted)">${l}</span>
          <span style="font-weight:700;color:${c}">${v}</span>
        </div>`).join('')}
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        ${['Go + C++','Kubernetes','Kafka','ClickHouse'].map(t => `<span style="font-size:10px;padding:4px 8px;background:rgba(255,255,255,0.04);color:var(--text-secondary);border-radius:6px;border:1px solid var(--border)">${t}</span>`).join('')}
      </div>
    </div>
  </div>
  <div class="ph-badge" style="top:-10px;right:16px;animation-delay:0.2s">
    <span style="width:6px;height:6px;border-radius:50%;background:#34D399"></span>
    All Systems Operational
  </div>`;
}

/* ── Resources Visual: Documentation hub */
function vizResources() {
  return `
  <div class="ph-viz-card" style="max-width:340px">
    <div class="ph-viz-header">
      <span class="ph-viz-dot" style="background:#FF5F57"></span>
      <span class="ph-viz-dot" style="background:#FEBC2E"></span>
      <span class="ph-viz-dot" style="background:#28C840"></span>
      <span class="ph-viz-title">Resource Center</span>
    </div>
    <div class="ph-viz-body" style="display:flex;flex-direction:column;gap:10px">
      ${[
        { icon:'📄', title:'Platform Docs', count:'40+ Guides', color:'#60A5FA' },
        { icon:'📚', title:'Best Practices', count:'12 Playbooks', color:'#C084FC' },
        { icon:'📊', title:'Industry Reports', count:'5 Reports', color:'#34D399' },
        { icon:'🎓', title:'NexBids Academy', count:'4 Certifications', color:'#FCD34D' },
      ].map(r => `
      <div style="display:flex;align-items:center;gap:12px;padding:10px;background:rgba(255,255,255,0.02);border-radius:10px;border:1px solid rgba(255,255,255,0.05)">
        <div style="font-size:22px;flex-shrink:0">${r.icon}</div>
        <div style="flex:1">
          <div style="font-size:12.5px;font-weight:600;color:var(--text-primary)">${r.title}</div>
          <div style="font-size:11px;color:var(--text-muted)">${r.count}</div>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${r.color}" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
      </div>`).join('')}
      <div style="margin-top:4px;padding:10px;background:rgba(0,87,255,0.06);border-radius:10px;border:1px solid rgba(0,87,255,0.12);text-align:center">
        <div style="font-size:11px;color:var(--text-secondary)">Updated Monthly · Free Access</div>
      </div>
    </div>
  </div>`;
}

/* ── Case Studies Visual: Results summary */
function vizCaseStudies() {
  return `
  <div class="ph-viz-card" style="max-width:360px">
    <div class="ph-viz-header">
      <span class="ph-viz-dot" style="background:#FF5F57"></span>
      <span class="ph-viz-dot" style="background:#FEBC2E"></span>
      <span class="ph-viz-dot" style="background:#28C840"></span>
      <span class="ph-viz-title">Partner Success Metrics</span>
    </div>
    <div class="ph-viz-body" style="display:flex;flex-direction:column;gap:14px">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        ${[
          ['+200%','ROAS Lift','#60A5FA'],
          ['-54%','CPA Reduction','#34D399'],
          ['+145%','Revenue Lift','#C084FC'],
          ['+67%','eCPM Growth','#FCD34D'],
        ].map(([v,l,c]) => `
        <div style="padding:12px;background:rgba(255,255,255,0.02);border-radius:10px;border:1px solid rgba(255,255,255,0.06);text-align:center">
          <div style="font-size:22px;font-weight:900;color:${c};letter-spacing:-1px">${v}</div>
          <div style="font-size:10px;color:var(--text-muted);margin-top:3px">${l}</div>
        </div>`).join('')}
      </div>
      ${[
        { industry:'E-Commerce', result:'ROAS 1.4x → 4.2x', color:'#60A5FA' },
        { industry:'Mobile Gaming', result:'2.3M players acquired', color:'#C084FC' },
        { industry:'News Publisher', result:'$2.4M annual revenue+', color:'#34D399' },
      ].map(c => `
      <div style="display:flex;align-items:center;gap:10px;padding:8px 10px;background:rgba(255,255,255,0.02);border-radius:8px;border:1px solid rgba(255,255,255,0.04)">
        <span style="width:8px;height:8px;border-radius:50%;background:${c.color};flex-shrink:0"></span>
        <span style="font-size:11px;color:var(--text-muted);width:90px;flex-shrink:0">${c.industry}</span>
        <span style="font-size:11.5px;font-weight:600;color:var(--text-primary)">${c.result}</span>
      </div>`).join('')}
    </div>
  </div>`;
}

/* ── Case Studies Hub Visual: industry breakdown + summary stats */
function vizCaseStudiesHub() {
  return `
  <div class="ph-viz-card" style="max-width:360px">
    <div class="ph-viz-header">
      <span class="ph-viz-dot" style="background:#FF5F57"></span>
      <span class="ph-viz-dot" style="background:#FEBC2E"></span>
      <span class="ph-viz-dot" style="background:#28C840"></span>
      <span class="ph-viz-title">Case Study Coverage</span>
    </div>
    <div class="ph-viz-body" style="display:flex;flex-direction:column;gap:12px">
      <div style="font-size:11px;color:var(--text-muted);font-weight:600;letter-spacing:0.6px;text-transform:uppercase">Industry Breakdown</div>
      ${[
        ['E-Commerce',       '31%', '#60A5FA', 0.31],
        ['Mobile Gaming',    '24%', '#C084FC', 0.24],
        ['News & Media',     '19%', '#34D399', 0.19],
        ['Productivity Apps','15%', '#FCD34D', 0.15],
        ['Other',            '11%', '#F87171', 0.11],
      ].map(([label, pct, color, ratio]) => `
      <div>
        <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:4px">
          <span style="color:var(--text-secondary)">${label}</span>
          <span style="color:${color};font-weight:700">${pct}</span>
        </div>
        <div style="height:6px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden">
          <div style="height:100%;width:${Math.round(ratio*100)}%;background:${color};border-radius:3px"></div>
        </div>
      </div>`).join('')}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:4px">
        ${[['300+','Global Cases','#60A5FA'],['150+','Countries','#34D399']].map(([n,l,c]) => `
        <div style="padding:10px;background:rgba(255,255,255,0.02);border-radius:8px;border:1px solid rgba(255,255,255,0.06);text-align:center">
          <div style="font-size:18px;font-weight:900;color:${c}">${n}</div>
          <div style="font-size:10px;color:var(--text-muted);margin-top:2px">${l}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
}

/* ── Advertiser Cases Visual: ROAS/CPA waterfall */
function vizAdvertiserCases() {
  return `
  <div class="ph-viz-card" style="max-width:360px">
    <div class="ph-viz-header">
      <span class="ph-viz-dot" style="background:#FF5F57"></span>
      <span class="ph-viz-dot" style="background:#FEBC2E"></span>
      <span class="ph-viz-dot" style="background:#28C840"></span>
      <span class="ph-viz-title">Advertiser Performance Lift</span>
    </div>
    <div class="ph-viz-body" style="display:flex;flex-direction:column;gap:12px">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        ${[
          ['+200%','ROAS Lift','#60A5FA'],
          ['-54%', 'CPA Drop', '#34D399'],
          ['+400%','Revenue',  '#C084FC'],
          ['-41%', 'CPI',      '#FCD34D'],
        ].map(([v,l,c]) => `
        <div style="padding:12px;background:rgba(255,255,255,0.02);border-radius:10px;border:1px solid rgba(255,255,255,0.06);text-align:center">
          <div style="font-size:22px;font-weight:900;color:${c};letter-spacing:-1px">${v}</div>
          <div style="font-size:10px;color:var(--text-muted);margin-top:3px">${l}</div>
        </div>`).join('')}
      </div>
      <div style="font-size:11px;color:var(--text-muted);font-weight:600;letter-spacing:0.6px;text-transform:uppercase;margin-top:2px">Avg ROAS by Channel</div>
      ${[
        ['Display',       '3.1×', '#60A5FA', 0.52],
        ['Video',         '4.8×', '#C084FC', 0.80],
        ['Native',        '3.7×', '#34D399', 0.62],
        ['Rewarded Video','5.2×', '#FCD34D', 0.87],
      ].map(([ch, val, color, ratio]) => `
      <div>
        <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:3px">
          <span style="color:var(--text-secondary)">${ch}</span>
          <span style="color:${color};font-weight:700">${val}</span>
        </div>
        <div style="height:5px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden">
          <div style="height:100%;width:${Math.round(ratio*100)}%;background:${color};border-radius:3px"></div>
        </div>
      </div>`).join('')}
    </div>
  </div>
  <div class="ph-badge" style="top:-10px;right:16px;animation-delay:0.2s">
    📈 Avg +47% ROAS Y1
  </div>`;
}

/* ── Publisher Cases Visual: eCPM & revenue lift */
function vizPublisherCases() {
  return `
  <div class="ph-viz-card" style="max-width:360px">
    <div class="ph-viz-header">
      <span class="ph-viz-dot" style="background:#FF5F57"></span>
      <span class="ph-viz-dot" style="background:#FEBC2E"></span>
      <span class="ph-viz-dot" style="background:#28C840"></span>
      <span class="ph-viz-title">Publisher Revenue Dashboard</span>
    </div>
    <div class="ph-viz-body" style="display:flex;flex-direction:column;gap:12px">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        ${[
          ['+67%', 'eCPM Lift',    '#34D399'],
          ['+145%','Revenue Lift', '#60A5FA'],
          ['+23%', 'Fill Rate',    '#FCD34D'],
          ['3×',   'Rev Tripled',  '#C084FC'],
        ].map(([v,l,c]) => `
        <div style="padding:12px;background:rgba(255,255,255,0.02);border-radius:10px;border:1px solid rgba(255,255,255,0.06);text-align:center">
          <div style="font-size:22px;font-weight:900;color:${c};letter-spacing:-1px">${v}</div>
          <div style="font-size:10px;color:var(--text-muted);margin-top:3px">${l}</div>
        </div>`).join('')}
      </div>
      <div style="font-size:11px;color:var(--text-muted);font-weight:600;letter-spacing:0.6px;text-transform:uppercase;margin-top:2px">Revenue Lift by Format</div>
      ${[
        ['Header Bidding', '+67%', '#34D399', 0.67],
        ['Rewarded Video', '+200%','#60A5FA', 1.00],
        ['Interstitial',   '+88%', '#FCD34D', 0.88],
        ['Native',         '+41%', '#C084FC', 0.41],
      ].map(([fmt, pct, color, ratio]) => `
      <div>
        <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:3px">
          <span style="color:var(--text-secondary)">${fmt}</span>
          <span style="color:${color};font-weight:700">${pct}</span>
        </div>
        <div style="height:5px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden">
          <div style="height:100%;width:${Math.round(ratio*100)}%;background:${color};border-radius:3px"></div>
        </div>
      </div>`).join('')}
    </div>
  </div>
  <div class="ph-badge" style="top:-10px;right:16px;animation-delay:0.2s;background:rgba(5,150,105,0.15);border-color:rgba(5,150,105,0.3);color:#34D399">
    💰 Avg +52% eCPM Lift
  </div>`;
}

/* ── Company Visual: mission, timeline & milestones */
function vizCompany() {
  return `
  <div class="ph-viz-card" style="max-width:360px">
    <div class="ph-viz-header">
      <span class="ph-viz-dot" style="background:#FF5F57"></span>
      <span class="ph-viz-dot" style="background:#FEBC2E"></span>
      <span class="ph-viz-dot" style="background:#28C840"></span>
      <span class="ph-viz-title">NexBids — Company Milestones</span>
    </div>
    <div class="ph-viz-body" style="display:flex;flex-direction:column;gap:10px">
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:4px">
        ${[
          ['2018','Founded','#C084FC'],
          ['$380M+','Funding Raised','#60A5FA'],
          ['2,000+','Advertisers','#34D399'],
          ['30,000+','Publishers','#FCD34D'],
        ].map(([n,l,c]) => `
        <div style="padding:10px 12px;background:rgba(255,255,255,0.02);border-radius:8px;border:1px solid rgba(255,255,255,0.06);text-align:center">
          <div style="font-size:17px;font-weight:900;color:${c};letter-spacing:-0.5px">${n}</div>
          <div style="font-size:10px;color:var(--text-muted);margin-top:2px">${l}</div>
        </div>`).join('')}
      </div>
      <!-- Timeline -->
      <div style="font-size:11px;color:var(--text-muted);font-weight:600;letter-spacing:0.6px;text-transform:uppercase">Growth Timeline</div>
      ${[
        ['2018','Founded in San Francisco','#C084FC'],
        ['2020','Launched DSP + ADX globally','#60A5FA'],
        ['2022','50B daily auctions milestone','#34D399'],
        ['2024','150+ countries, $2B+ revenue driven','#FCD34D'],
        ['2026','Full-stack ecosystem, 500+ team','#F87171'],
      ].map(([year, event, color]) => `
      <div style="display:flex;align-items:center;gap:10px;padding:6px 8px;background:rgba(255,255,255,0.02);border-radius:8px;border:1px solid rgba(255,255,255,0.04)">
        <span style="font-size:11px;font-weight:700;color:${color};width:32px;flex-shrink:0">${year}</span>
        <span style="font-size:11px;color:var(--text-secondary)">${event}</span>
      </div>`).join('')}
    </div>
  </div>
  <div class="ph-badge" style="top:-10px;right:16px;animation-delay:0.3s;background:rgba(124,58,237,0.15);border-color:rgba(124,58,237,0.3);color:#C084FC">
    🚀 Est. 2018 · San Francisco
  </div>`;
}

/* ── About Visual: Global offices map */
function vizAbout() {
  return `
  <div class="ph-viz-card" style="max-width:360px">
    <div class="ph-viz-header">
      <span class="ph-viz-dot" style="background:#FF5F57"></span>
      <span class="ph-viz-dot" style="background:#FEBC2E"></span>
      <span class="ph-viz-dot" style="background:#28C840"></span>
      <span class="ph-viz-title">NexBids — A Global Company</span>
    </div>
    <div class="ph-viz-body" style="display:flex;flex-direction:column;gap:12px">
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
        ${[
          ['2018','Founded','#60A5FA'],
          ['500+','Employees','#C084FC'],
          ['6','Global Offices','#34D399'],
          ['150+','Countries Served','#FCD34D'],
        ].map(([n,l,c]) => `
        <div style="padding:12px;background:rgba(255,255,255,0.02);border-radius:10px;border:1px solid rgba(255,255,255,0.06);text-align:center">
          <div style="font-size:20px;font-weight:900;color:${c};letter-spacing:-0.5px">${n}</div>
          <div style="font-size:10px;color:var(--text-muted);margin-top:2px">${l}</div>
        </div>`).join('')}
      </div>
      <!-- Office list -->
      <div style="display:flex;flex-direction:column;gap:6px">
        ${[
          ['🇺🇸','San Francisco + Barcelona','North America / Europe HQ'],
          ['🇬🇧','London','EMEA HQ'],
          ['🇸🇬','Singapore','APAC HQ'],
          ['🇯🇵','Tokyo','Japan'],
          ['🇨🇳','Beijing','China'],
        ].map(([f,city,role]) => `
        <div style="display:flex;align-items:center;gap:10px;padding:8px;background:rgba(255,255,255,0.02);border-radius:8px;border:1px solid rgba(255,255,255,0.04)">
          <span style="font-size:16px">${f}</span>
          <div style="flex:1">
            <div style="font-size:12px;font-weight:600;color:var(--text-primary)">${city}</div>
            <div style="font-size:10px;color:var(--text-muted)">${role}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </div>
  <div class="ph-badge" style="top:-10px;right:16px;animation-delay:0.3s">
    🌍 6 Global Offices
  </div>`;
}

/* ── Careers Visual: Team & perks */
function vizCareers() {
  return `
  <div class="ph-viz-card" style="max-width:360px">
    <div class="ph-viz-header">
      <span class="ph-viz-dot" style="background:#FF5F57"></span>
      <span class="ph-viz-dot" style="background:#FEBC2E"></span>
      <span class="ph-viz-dot" style="background:#28C840"></span>
      <span class="ph-viz-title">Life at NexBids</span>
    </div>
    <div class="ph-viz-body" style="display:flex;flex-direction:column;gap:12px">
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;text-align:center">
        ${[['500+','Team Size','#60A5FA'],['30+','Nationalities','#C084FC'],['4.8★','Glassdoor','#FCD34D']].map(([n,l,c]) => `
        <div style="padding:10px;background:rgba(255,255,255,0.02);border-radius:8px;border:1px solid rgba(255,255,255,0.06)">
          <div style="font-size:16px;font-weight:800;color:${c}">${n}</div>
          <div style="font-size:10px;color:var(--text-muted)">${l}</div>
        </div>`).join('')}
      </div>
      <div style="display:flex;flex-direction:column;gap:6px">
        ${[
          ['🚀','Hard Problems at Scale','500B daily auctions, ML at edge'],
          ['🌍','International Team','30+ nationalities, 5 offices'],
          ['📈','Growth Stage','High impact from day one'],
          ['💡','$2K Learning Budget','Per person, annually'],
          ['⚡','Competitive Equity','Options & RSUs for all'],
        ].map(([icon, title, sub]) => `
        <div style="display:flex;align-items:center;gap:10px;padding:9px 10px;background:rgba(255,255,255,0.02);border-radius:8px;border:1px solid rgba(255,255,255,0.04)">
          <span style="font-size:16px;flex-shrink:0">${icon}</span>
          <div>
            <div style="font-size:12px;font-weight:600;color:var(--text-primary)">${title}</div>
            <div style="font-size:10px;color:var(--text-muted)">${sub}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
}

/* ── Contact Visual: Contact info summary */
function vizContact() {
  return `
  <div class="ph-viz-card" style="max-width:340px">
    <div class="ph-viz-header">
      <span class="ph-viz-dot" style="background:#FF5F57"></span>
      <span class="ph-viz-dot" style="background:#FEBC2E"></span>
      <span class="ph-viz-dot" style="background:#28C840"></span>
      <span class="ph-viz-title">Get in Touch</span>
    </div>
    <div class="ph-viz-body" style="display:flex;flex-direction:column;gap:10px">
      ${[
        { icon:'📈', role:'Advertiser Sales', resp:'< 1 business day', color:'#60A5FA' },
        { icon:'💰', role:'Publisher Partnerships', resp:'< 1 business day', color:'#34D399' },
        { icon:'🤝', role:'Agency Partnerships', resp:'< 1 business day', color:'#C084FC' },
        { icon:'🔧', role:'Technical Support', resp:'P1 < 1 hour', color:'#FCD34D' },
        { icon:'📰', role:'Media & Press', resp:'< 24 hours', color:'#22D3EE' },
      ].map(c => `
      <div style="display:flex;align-items:center;gap:12px;padding:10px;background:rgba(255,255,255,0.02);border-radius:10px;border:1px solid rgba(255,255,255,0.05)">
        <div style="font-size:20px;flex-shrink:0">${c.icon}</div>
        <div style="flex:1">
          <div style="font-size:12px;font-weight:600;color:var(--text-primary)">${c.role}</div>
          <div style="font-size:10px;color:var(--text-muted)">Response: ${c.resp}</div>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${c.color}" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
      </div>`).join('')}
    </div>
  </div>`;
}

/* ─────────────────────────────────────────────
   GLASS ICON HELPER
   gi(svgPath, colorClass, size)
   colorClass: 'blue'|'purple'|'green'|'amber'|'red'|'teal'|'neutral'
   size: 'sm'|'md'|'lg'|'xl'
───────────────────────────────────────────── */
function gi(svgContent, colorClass = 'blue', size = 'md') {
  return `<span class="gi gi-${size} gi-${colorClass}">${svgContent}</span>`;
}

/* Pre-defined SVG icon paths (24×24 viewBox, stroke-based) */
const ICONS = {
  target:    `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  brain:     `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 0 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 0 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/></svg>`,
  palette:   `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.477-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
  chart:     `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>`,
  globe:     `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  shield:    `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  zap:       `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  lock:      `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  layers:    `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  trending:  `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  users:     `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  star:      `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  server:    `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
  link:      `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  monitor:   `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  smartphone:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
  gamepad:   `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="2"/></svg>`,
  tv:        `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>`,
  handshake: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>`,
  tag:       `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
  dollar:    `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  cpu:       `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
  eye:       `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  cookie:    `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/></svg>`,
  clipboard: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>`,
  settings:  `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  rocket:    `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
  mail:      `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  newspaper: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>`,
  book:      `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  award:     `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  briefcase: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  wrench:    `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  barChart:  `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>`,
  gem:       `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 18 3 22 9 12 22 2 9"/><line x1="2" y1="9" x2="22" y2="9"/><line x1="12" y1="3" x2="6" y2="9"/><line x1="12" y1="3" x2="18" y2="9"/><line x1="12" y1="22" x2="6" y2="9"/><line x1="12" y1="22" x2="18" y2="9"/></svg>`,
};

/* Shorthand: gIcon(name, colorClass, size) */
function gIcon(name, colorClass, size = 'md') {
  const svg = ICONS[name] || ICONS.star;
  const c = iconColor(colorClass);
  // Replace both stroke and fill currentColor to prevent double-render ghosting
  const colored = svg
    .replace(/stroke="currentColor"/g, `stroke="${c}"`)
    .replace(/fill="currentColor"/g, `fill="${c}"`);
  return gi(colored, colorClass, size);
}

function iconColor(cls) {
  const map = { blue:'#60A5FA', purple:'#C084FC', green:'#34D399', amber:'#FCD34D', red:'#F87171', teal:'#22D3EE', neutral:'#9CA3AF' };
  return map[cls] || '#60A5FA';
}

/* ─────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────── */
function renderHome() {
  return `
  <!-- HERO -->
  <section class="hero">
    <div class="hero-content hero-layout">
      <div class="hero-text">
        ${sectionTag('Global Ad Tech Leader', '全球广告技术领导者')}
        <h1>${t('Power Your Growth with', '用智能程序化广告')}<br><span class="gradient-text">${t('Intelligent Programmatic', '驱动您的全球增长')}</span></h1>
        <p>${t('NexBids delivers a full-stack programmatic advertising ecosystem — DSP, ADX, and SSP — built for advertisers, publishers, developers, and agencies seeking measurable growth at global scale.',
               'NexBids 提供全栈程序化广告生态系统——DSP、ADX 和 SSP——专为寻求全球规模可衡量增长的广告主、发布商、开发者和代理商而构建。')}</p>
        <div class="btn-group">
          <button class="btn btn-primary" onclick="navigate('contact')">${t('Get Started Free', '免费开始')}</button>
          <button class="btn btn-secondary" onclick="navigate('products')">${t('Explore Platforms', '探索平台')}</button>
        </div>
        <div style="margin-top:32px;display:flex;gap:20px;flex-wrap:wrap">
          <span class="stat-badge">✓ ${t('150+ Countries', '150+国家')}</span>
          <span class="stat-badge green">✓ ${t('50B+ Daily Auctions', '每日500亿+竞价')}</span>
          <span class="stat-badge purple">✓ ${t('50K+ Active Advertisers', '50,000+活跃广告主')}</span>
        </div>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <!-- Decorative programmatic ad dashboard illustration -->
        <div class="hero-viz-card">
          <div class="hvz-header">
            <span class="hvz-dot" style="background:#FF5F57"></span>
            <span class="hvz-dot" style="background:#FEBC2E"></span>
            <span class="hvz-dot" style="background:#28C840"></span>
            <span style="color:var(--text-muted);font-size:11px;margin-left:8px">NexBids DSP — Live Dashboard</span>
          </div>
          <div class="hvz-body">
            <div class="hvz-row">
              <span class="hvz-label">${t('Bid Requests','竞价请求')}</span>
              <span class="hvz-val gradient-text">50B+<span class="hvz-delta">↑12%</span></span>
            </div>
            <div class="hvz-row">
              <span class="hvz-label">${t('Win Rate','竞价胜率')}</span>
              <span class="hvz-val" style="color:#34D399">34.7%<span class="hvz-delta">↑2.1%</span></span>
            </div>
            <div class="hvz-row">
              <span class="hvz-label">${t('Avg ROAS','平均ROAS')}</span>
              <span class="hvz-val" style="color:#C084FC">8.4x<span class="hvz-delta">↑0.6x</span></span>
            </div>
            <!-- mini bar chart -->
            <div class="hvz-chart">
              ${[40,65,52,80,70,95,88].map((h,i) => `<div class="hvz-bar" style="height:${h}%;animation-delay:${i*0.08}s"></div>`).join('')}
            </div>
            <div class="hvz-channels">
              ${[['Display','#60A5FA',72],['Video','#C084FC',58],['Native','#34D399',45],['CTV','#FCD34D',38]].map(([l,c,v])=>`
              <div class="hvz-ch-row">
                <span class="hvz-ch-dot" style="background:${c}"></span>
                <span class="hvz-ch-label">${l}</span>
                <div class="hvz-ch-bar-wrap"><div class="hvz-ch-bar" style="width:${v}%;background:${c}22;border-left:3px solid ${c}"></div></div>
                <span class="hvz-ch-pct" style="color:${c}">${v}%</span>
              </div>`).join('')}
            </div>
          </div>
        </div>
        <!-- floating badges -->
        <div class="hvz-badge" style="top:-18px;right:28px;animation-delay:0.3s">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34D399" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          <span>${t('Brand Safety Verified','品牌安全已验证')}</span>
        </div>
        <div class="hvz-badge" style="bottom:28px;left:-14px;animation-delay:0.6s">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          <span>${t('&lt;80ms Bid Response','&lt;80ms竞价响应')}</span>
        </div>
        <div class="hvz-badge" style="top:48%;right:-24px;animation-delay:0.9s">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C084FC" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>${t('Real-time Bidding','实时竞价')}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- METRICS -->
  ${metricsBand([
    ['$12B+', 'Annual Ad Spend Managed', '年广告支出管理'],
    ['50B+', 'Daily Bid Requests', '每日竞价请求'],
    ['150+', 'Countries & Territories', '国家和地区'],
    ['99.98%', 'Platform Uptime SLA', '平台在线率SLA'],
  ])}

  <!-- PLATFORMS -->
  <section class="section section-dark">
    <div class="container">
      <div class="text-center mb-12">
        ${sectionTag('Our Platforms', '我们的平台')}
        <h2 class="section-headline">${t('The Full Programmatic Stack', '完整的程序化广告技术栈')}</h2>
        <p class="section-sub center">${t('Three powerful, interconnected platforms designed to serve every participant in the programmatic advertising ecosystem.',
           '三个强大、相互连接的平台，为程序化广告生态系统中的每个参与者提供服务。')}</p>
      </div>
      <div class="card-grid card-grid-3">
        <!-- DSP -->
        <div class="platform-card dsp">
          <div class="platform-tag">DSP</div>
          <div class="platform-body">
            <h3>${t('NexBids DSP', 'NexBids DSP')}</h3>
            <p>${t('Demand-Side Platform. AI-powered buying platform with global reach, premium inventory access, and advanced audience targeting across every digital channel.',
                 '需求方平台。AI驱动的购买平台，覆盖全球，可访问优质广告资源，在每个数字渠道提供高级受众定向。')}</p>
            <div class="platform-stats">
              <span class="stat-badge">50K+ ${t('Advertisers', '广告主')}</span>
              <span class="stat-badge">${t('30+ Ad Formats', '30+广告格式')}</span>
            </div>
            <ul class="feature-list">
              <li>${t('AI Bidding & ROAS Optimizer', 'AI竞价与ROAS优化器')}</li>
              <li>${t('300+ Audience Segments', '300+受众细分')}</li>
              <li>${t('Real-Time Analytics Dashboard', '实时分析仪表盘')}</li>
              <li>${t('Third-Party MMP Integration', '第三方MMP集成')}</li>
            </ul>
          </div>
          <div class="card-actions">
            <button class="btn btn-primary" style="width:100%" onclick="navigate('products-dsp')">${t('Explore DSP →', '探索 DSP →')}</button>
          </div>
        </div>
        <!-- ADX -->
        <div class="platform-card adx">
          <div class="platform-tag">ADX</div>
          <div class="platform-body">
            <h3>${t('NexBids ADX', 'NexBids ADX')}</h3>
            <p>${t('Ad Exchange. The neutral, high-performance marketplace connecting premium supply with quality demand — built for speed, scale, and trust.',
                 '广告交易中枢。连接优质供应与高质量需求的中立高性能市场——专为速度、规模和信任而构建。')}</p>
            <div class="platform-stats">
              <span class="stat-badge purple">50B+ ${t('Daily Auctions', '日竞价')}</span>
              <span class="stat-badge purple">&lt;100ms ${t('Bid Response', '竞价响应')}</span>
            </div>
            <ul class="feature-list">
              <li>${t('OpenRTB 2.6 Compliant', 'OpenRTB 2.6 合规')}</li>
              <li>${t('Header Bidding & PMP Support', '头部竞价与PMP支持')}</li>
              <li>${t('AI-Powered Fraud Detection', 'AI驱动的欺诈检测')}</li>
              <li>${t('Real-Time Quality Scoring', '实时质量评分')}</li>
            </ul>
          </div>
          <div class="card-actions">
            <button class="btn btn-primary" style="width:100%;background:linear-gradient(135deg,#7C3AED,#8B5CF6)" onclick="navigate('products-adx')">${t('Explore ADX →', '探索 ADX →')}</button>
          </div>
        </div>
        <!-- SSP -->
        <div class="platform-card ssp">
          <div class="platform-tag">SSP</div>
          <div class="platform-body">
            <h3>${t('NexBids SSP', 'NexBids SSP')}</h3>
            <p>${t('Supply-Side Platform. Maximize your ad revenue with intelligent yield optimization, header bidding, and direct access to thousands of premium advertisers worldwide.',
                 '供应方平台。通过智能收益优化、头部竞价以及直接访问全球数千家优质广告主，最大化您的广告收益。')}</p>
            <div class="platform-stats">
              <span class="stat-badge green">30K+ ${t('Publishers', '发布商')}</span>
              <span class="stat-badge green">+52% ${t('Avg eCPM Lift', '平均eCPM提升')}</span>
            </div>
            <ul class="feature-list">
              <li>${t('Prebid.js Header Bidding', 'Prebid.js 头部竞价')}</li>
              <li>${t('iOS & Android SDK', 'iOS 和 Android SDK')}</li>
              <li>${t('Floor Price AI Optimizer', '底价AI优化器')}</li>
              <li>${t('PMP & Programmatic Direct', 'PMP与程序化直购')}</li>
            </ul>
          </div>
          <div class="card-actions">
            <button class="btn btn-primary" style="width:100%;background:linear-gradient(135deg,#059669,#10B981)" onclick="navigate('products-ssp')">${t('Explore SSP →', '探索 SSP →')}</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SOLUTIONS -->
  <section class="section section-subtle">
    <div class="container">
      <div class="text-center mb-12">
        ${sectionTag('Who We Serve', '我们服务谁')}
        <h2 class="section-headline">${t('Built for Every Participant in the Ecosystem', '为生态系统中的每个参与者而构建')}</h2>
      </div>
      <div class="card-grid card-grid-3">
        <div class="card" style="cursor:pointer" onclick="navigate('solutions-advertiser')">
          <div style="margin-bottom:16px">${gIcon('trending','blue','lg')}</div>
          <h3 style="font-size:20px;font-weight:700;margin-bottom:10px">${t('Advertisers', '广告主')}</h3>
          <p style="color:var(--text-secondary);font-size:14px;margin-bottom:16px">${t('E-commerce, gaming studios, app developers, and brand marketers looking to acquire users and drive revenue globally.',
             '电商、游戏工作室、应用开发者和品牌营销人员，希望在全球范围内获取用户并增加收益。')}</p>
          <span class="btn-ghost">${t('Learn More →', '了解更多 →')}</span>
        </div>
        <div class="card" style="cursor:pointer" onclick="navigate('solutions-publisher')">
          <div style="margin-bottom:16px">${gIcon('dollar','green','lg')}</div>
          <h3 style="font-size:20px;font-weight:700;margin-bottom:10px">${t('Publishers & Developers', '发布商与开发者')}</h3>
          <p style="color:var(--text-secondary);font-size:14px;margin-bottom:16px">${t('Website owners, mobile app developers, game studios, and digital media companies seeking to maximize ad revenue.',
             '网站所有者、移动应用开发者、游戏工作室和数字媒体公司，希望最大化广告收益。')}</p>
          <span class="btn-ghost">${t('Learn More →', '了解更多 →')}</span>
        </div>
        <div class="card" style="cursor:pointer" onclick="navigate('solutions-agency')">
          <div style="margin-bottom:16px">${gIcon('handshake','purple','lg')}</div>
          <h3 style="font-size:20px;font-weight:700;margin-bottom:10px">${t('Agencies', '代理商')}</h3>
          <p style="color:var(--text-secondary);font-size:14px;margin-bottom:16px">${t('Full-service and performance agencies managing programmatic campaigns for multiple advertiser clients worldwide.',
             '为全球多个广告主客户管理程序化营销活动的全服务和绩效代理商。')}</p>
          <span class="btn-ghost">${t('Learn More →', '了解更多 →')}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- TECHNOLOGY HIGHLIGHTS -->
  <section class="section section-dark">
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center" class="home-tech-grid">
        <div>
          ${sectionTag('Technology', '技术优势')}
          <h2 class="section-headline">${t('Built on a Foundation of', '建立在')}<br><span class="gradient-text">${t('Intelligence & Scale', '智能与规模的基础上')}</span></h2>
          <p class="section-sub" style="margin-bottom:32px">${t('Our proprietary AI/ML infrastructure processes 50 billion bid requests daily, making real-time optimization decisions in under 100 milliseconds.',
             '我们的专有AI/ML基础设施每天处理500亿次竞价请求，在100毫秒内做出实时优化决策。')}</p>
          <div style="display:flex;flex-direction:column;gap:16px">
            ${[
              [gIcon('zap','blue','sm'), 'Sub-100ms Bid Processing', '100毫秒内竞价处理', 'Real-time decisioning at global scale with 99.98% uptime guarantee.', '全球规模实时决策，99.98%在线率保证。'],
              [gIcon('brain','purple','sm'), 'AI/ML Optimization Engine', 'AI/ML优化引擎', 'Deep learning models continuously optimize bids, budgets, and audience targeting.', '深度学习模型持续优化竞价、预算和受众定向。'],
              [gIcon('lock','green','sm'), 'Privacy-First Architecture', '隐私优先架构', 'Cookieless targeting solutions ready for a privacy-compliant future.', '无Cookie定向解决方案，为隐私合规未来做好准备。'],
            ].map(([icon, en, zh, enD, zhD]) => `
            <div style="display:flex;gap:16px;align-items:flex-start">
              ${icon}
              <div><div style="font-weight:600;margin-bottom:4px">${t(en, zh)}</div><div style="font-size:14px;color:var(--text-secondary)">${t(enD, zhD)}</div></div>
            </div>`).join('')}
          </div>
          <button class="btn btn-secondary" style="margin-top:32px" onclick="navigate('technology')">${t('View Full Technology Stack →', '查看完整技术栈 →')}</button>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
          ${[
            ['50B+', 'Daily Bid Requests', '每日竞价请求', 'var(--accent-dsp)'],
            ['<100ms', 'Bid Response Time', '竞价响应时间', 'var(--accent-adx)'],
            ['99.98%', 'Platform Uptime', '平台在线率', 'var(--accent-ssp)'],
            ['150+', 'Data Centers', '数据中心', '#F59E0B'],
          ].map(([n, en, zh, c]) => `
          <div class="card" style="text-align:center;padding:24px">
            <div style="font-size:32px;font-weight:900;color:${c};letter-spacing:-1px;margin-bottom:8px">${n}</div>
            <div style="font-size:13px;color:var(--text-secondary)">${t(en, zh)}</div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </section>

  <!-- CASE STUDIES PREVIEW -->
  <section class="section section-subtle">
    <div class="container">
      <div class="text-center mb-12">
        ${sectionTag('Case Studies', '客户案例')}
        <h2 class="section-headline">${t('Real Results from Real Partners', '来自真实合作伙伴的真实成果')}</h2>
      </div>
      <div class="card-grid card-grid-3">
        ${[
          ['E-Commerce', '电商', 'Global Fashion Brand — ROAS Transformation', '全球时尚品牌——ROAS转型', 'ROAS improved from 1.4x to 4.2x in 90 days with AI bidding and dynamic creative.', 'AI竞价和动态创意在90天内将ROAS从1.4x提升至4.2x。', ['ROAS +200%', 'CPA -54%', 'Revenue +400%']],
          ['Mobile Gaming', '移动游戏', 'Top Mobile RPG — Scale & Quality', '顶级移动RPG——规模与质量', 'Acquired 2.3M new players while improving D30 retention by 38% using playable ads.', '使用可试玩广告获取了230万新玩家，同时将D30留存率提升了38%。', ['2.3M Players', 'D30 Ret +38%', 'CPI -41%']],
          ['Publisher', '发布商', 'Regional News Network — eCPM Growth', '区域新闻网络——eCPM增长', 'Header bidding implementation drove 67% eCPM increase and $2.4M incremental annual revenue.', '头部竞价实施推动eCPM提升67%，带来240万美元的额外年收入。', ['eCPM +67%', '+$2.4M/yr', 'Fill +23%']],
        ].map(([industry, industryZh, title, titleZh, desc, descZh, badges]) => `
        <div class="case-card" onclick="navigate('case-studies')">
          <div class="case-card-top">
            <div class="case-industry">${t(industry, industryZh)}</div>
            <h3>${t(title, titleZh)}</h3>
            <p>${t(desc, descZh)}</p>
          </div>
          <div class="case-metrics">${badges.map(b => `<span class="case-metric-badge">${b}</span>`).join('')}</div>
        </div>`).join('')}
      </div>
      <div style="text-align:center;margin-top:36px">
        <button class="btn btn-secondary" onclick="navigate('case-studies')">${t('View All Case Studies →', '查看所有案例 →')}</button>
      </div>
    </div>
  </section>

  <!-- GLOBAL TRAFFIC MAP -->
  ${renderGlobalTrafficMap()}

  <!-- PARTNERS -->
  ${renderPartnersSection()}

  <!-- CTA -->
  ${ctaBand(
    'Ready to Transform Your Advertising?', '准备好改变您的广告投放了吗？',
    'Join 50,000+ advertisers and 30,000+ publishers already using NexBids to drive growth.',
    '加入已在使用NexBids驱动增长的50,000+广告主和30,000+发布商。',
    'Start for Free', '免费开始',
    'Talk to Sales', '联系销售', 'contact'
  )}`;
}

/* ─────────────────────────────────────────────
   GLOBAL AD TRAFFIC MAP SECTION
───────────────────────────────────────────── */
function renderGlobalTrafficMap() {
  return `
  <section class="section global-traffic-section" id="globalTraffic">
    <div class="container">
      <div class="text-center" style="margin-bottom:40px">
        ${sectionTag('Global Reach', '全球覆盖')}
        <h2 class="section-headline">${t('Mobile Ad Traffic Flowing Across the Globe', '移动广告流量在全球流动')}</h2>
        <p class="section-sub center">${t('Every second, NexBids routes billions of real-time bid requests across 150+ countries — connecting advertisers with audiences at the speed of light.',
          '每秒钟，NexBids在150+个国家路由数十亿实时竞价请求——以光速连接广告主与受众。')}</p>
      </div>

      <div class="gtm-wrapper">
        <!-- World map SVG: populated by D3.js at runtime with real Natural Earth data -->
        <svg id="gtmWorldMapSvg" class="gtm-worldmap-svg" aria-hidden="true"></svg>
        <canvas id="globalTrafficCanvas" class="gtm-canvas" role="img" aria-label="Global mobile ad traffic flow visualization"></canvas>

        <!-- Live counter overlay -->
        <div class="gtm-stats-overlay">
          <div class="gtm-stat">
            <div class="gtm-stat-num gradient-text" id="gtmBidCount">0</div>
            <div class="gtm-stat-label">${t('Bids/sec','每秒竞价')}</div>
          </div>
          <div class="gtm-stat-divider"></div>
          <div class="gtm-stat">
            <div class="gtm-stat-num" style="color:#34D399" id="gtmWinCount">0</div>
            <div class="gtm-stat-label">${t('Wins/sec','每秒成交')}</div>
          </div>
          <div class="gtm-stat-divider"></div>
          <div class="gtm-stat">
            <div class="gtm-stat-num" style="color:#C084FC">$<span id="gtmValue">0</span>K</div>
            <div class="gtm-stat-label">${t('Ad Value/min','每分钟广告价值')}</div>
          </div>
        </div>

        <!-- Region labels — top/left are initial placeholders, overridden by D3 projection in _initGTM -->
        <div class="gtm-region-badges">
          ${[
            { id:'gtm-na',    label:'North America', zh:'北美',        top:'50%', left:'50%', color:'#60A5FA' },
            { id:'gtm-eu',    label:'Europe',        zh:'欧洲',        top:'50%', left:'50%', color:'#C084FC' },
            { id:'gtm-apac',  label:'APAC',          zh:'亚太',        top:'50%', left:'50%', color:'#34D399' },
            { id:'gtm-sea',   label:'SE Asia',       zh:'东南亚',      top:'50%', left:'50%', color:'#FCD34D' },
            { id:'gtm-mena',  label:'Middle East',   zh:'中东',        top:'50%', left:'50%', color:'#F87171' },
            { id:'gtm-latam', label:'Latin America', zh:'拉丁美洲',    top:'50%', left:'50%', color:'#22D3EE' },
          ].map(r => `
          <div class="gtm-region-badge" id="${r.id}" style="top:${r.top};left:${r.left};--badge-color:${r.color}">
            <span class="gtm-region-dot"></span>
            <span class="gtm-region-name">${t(r.label, r.zh)}</span>
          </div>`).join('')}
        </div>
      </div>

      <!-- Bottom key metrics row -->
      <div class="gtm-footer-stats">
        ${[
          { icon:'⚡', val:'578K', unit:'req/s', label:'Peak Bid Throughput', zh:'竞价吞吐峰值', color:'#60A5FA' },
          { icon:'🌍', val:'150+', unit:'countries', label:'Geographic Coverage', zh:'地理覆盖', color:'#34D399' },
          { icon:'📱', val:'30+', unit:'formats', label:'Mobile Ad Formats', zh:'移动广告格式', color:'#C084FC' },
          { icon:'🔒', val:'98.2%', unit:'quality', label:'Traffic Quality Score', zh:'流量质量评分', color:'#FCD34D' },
          { icon:'⏱️', val:'<80ms', unit:'response', label:'Avg Bid Response', zh:'平均竞价响应', color:'#F87171' },
        ].map(s => `
        <div class="gtm-footer-stat">
          <div class="gtm-footer-icon">${s.icon}</div>
          <div class="gtm-footer-val" style="color:${s.color}">${s.val} <span class="gtm-footer-unit">${s.unit}</span></div>
          <div class="gtm-footer-label">${t(s.label, s.zh)}</div>
        </div>`).join('')}
      </div>
    </div>
  </section>`;
}

/* ─────────────────────────────────────────────
   PARTNERS SECTION (used in home page)
───────────────────────────────────────────── */
function renderPartnersSection() {
  // Category rows: each row is an independent scrollable carousel
  const partnerRows = [
    {
      label: 'Advertisers & Brands',
      labelZh: '广告主与品牌',
      partners: [
        { name: 'Shopify', abbr: 'SHO', color: '#95BF47', bg: 'rgba(149,191,71,0.1)', domain: 'shopify.com' },
        { name: 'Samsung Ads', abbr: 'SA', color: '#1428A0', bg: 'rgba(20,40,160,0.13)', domain: 'samsung.com' },
        { name: 'Lazada', abbr: 'LZD', color: '#F57732', bg: 'rgba(245,119,50,0.1)', domain: 'lazada.com' },
        { name: 'Grab', abbr: 'GRB', color: '#00B14F', bg: 'rgba(0,177,79,0.1)', domain: 'grab.com' },
        { name: 'Booking.com', abbr: 'BKG', color: '#003580', bg: 'rgba(0,53,128,0.13)', domain: 'booking.com' },
        { name: 'Rakuten', abbr: 'RAK', color: '#BF0000', bg: 'rgba(191,0,0,0.1)', domain: 'rakuten.com' },
        { name: 'Zalora', abbr: 'ZLR', color: '#FF0074', bg: 'rgba(255,0,116,0.1)', domain: 'zalora.com' },
        { name: 'Sea Group', abbr: 'SEA', color: '#EE4D2D', bg: 'rgba(238,77,45,0.1)', domain: 'sea.com' },
        { name: 'Tokopedia', abbr: 'TKP', color: '#42B549', bg: 'rgba(66,181,73,0.1)', domain: 'tokopedia.com' },
        { name: 'Traveloka', abbr: 'TVL', color: '#0069B9', bg: 'rgba(0,105,185,0.12)', domain: 'traveloka.com' },
      ]
    },
    {
      label: 'Media & Publishers',
      labelZh: '媒体与发布商',
      partners: [
        { name: 'Dailymotion', abbr: 'DLM', color: '#9CA3AF', bg: 'rgba(156,163,175,0.1)', domain: 'dailymotion.com' },
        { name: 'Opera', abbr: 'OPR', color: '#FF1B2D', bg: 'rgba(255,27,45,0.1)', domain: 'opera.com' },
        { name: 'InMobi', abbr: 'INM', color: '#F5A623', bg: 'rgba(245,166,35,0.1)', domain: 'inmobi.com' },
        { name: 'AliExpress', abbr: 'AEX', color: '#FF4747', bg: 'rgba(255,71,71,0.1)', domain: 'aliexpress.com' },
        { name: 'Digital Turbine', abbr: 'DTB', color: '#00B0FF', bg: 'rgba(0,176,255,0.1)', domain: 'digitalturbine.com' },
        { name: 'Verizon Media', abbr: 'VMD', color: '#CD040B', bg: 'rgba(205,4,11,0.1)', domain: 'verizonmedia.com' },
        { name: 'Outbrain', abbr: 'OTB', color: '#FF5F0F', bg: 'rgba(255,95,15,0.1)', domain: 'outbrain.com' },
        { name: 'Taboola', abbr: 'TAB', color: '#4A90E2', bg: 'rgba(74,144,226,0.1)', domain: 'taboola.com' },
        { name: 'PubMatic', abbr: 'PUB', color: '#0066CC', bg: 'rgba(0,102,204,0.1)', domain: 'pubmatic.com' },
      ]
    },
    {
      label: 'Measurement & Analytics',
      labelZh: '监测与数据分析',
      partners: [
        { name: 'AppsFlyer', abbr: 'AF', color: '#0073E6', bg: 'rgba(0,115,230,0.1)', domain: 'appsflyer.com' },
        { name: 'Adjust', abbr: 'ADJ', color: '#00C853', bg: 'rgba(0,200,83,0.1)', domain: 'adjust.com' },
        { name: 'Branch', abbr: 'BRN', color: '#4C47DB', bg: 'rgba(76,71,219,0.1)', domain: 'branch.io' },
        { name: 'IAS', abbr: 'IAS', color: '#0090D4', bg: 'rgba(0,144,212,0.1)', domain: 'integralads.com' },
        { name: 'DoubleVerify', abbr: 'DV', color: '#8B9FD4', bg: 'rgba(139,159,212,0.1)', domain: 'doubleverify.com' },
        { name: 'Kochava', abbr: 'KOC', color: '#5D3FD3', bg: 'rgba(93,63,211,0.1)', domain: 'kochava.com' },
        { name: 'Singular', abbr: 'SGL', color: '#7C3AED', bg: 'rgba(124,58,237,0.1)', domain: 'singular.net' },
        { name: 'Nielsen', abbr: 'NLS', color: '#005EB8', bg: 'rgba(0,94,184,0.1)', domain: 'nielsen.com' },
      ]
    },
  ];

  const makeCard = (p) => {
    // Initial letter for the colored fallback badge
    const initial = p.name.charAt(0).toUpperCase();
    return `
    <div class="pcard">
      <div class="pcard-inner" style="background:${p.bg};border-color:${p.color}30">
        <div class="pcard-logo-wrap">
          <img
            class="pcard-logo-img"
            src="https://www.google.com/s2/favicons?sz=64&domain=${p.domain}"
            alt="${p.name} logo"
            loading="lazy"
            onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
          />
          <div class="pcard-abbr-fallback" style="background:${p.color}22;color:${p.color};display:none">${initial}</div>
        </div>
        <div class="pcard-name">${p.name}</div>
      </div>
    </div>`;
  };

  const makeRow = (row, idx) => `
    <div class="partner-carousel-row">
      <div class="partner-carousel-label">
        <span class="prow-tag">${t(row.label, row.labelZh)}</span>
      </div>
      <div class="partner-carousel-wrap">
        <button class="pcarousel-btn pcarousel-prev" onclick="scrollPartnerRow(${idx}, -1)" aria-label="Scroll left">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div class="partner-carousel-track" id="ptrack-${idx}">
          ${row.partners.map(makeCard).join('')}
        </div>
        <button class="pcarousel-btn pcarousel-next" onclick="scrollPartnerRow(${idx}, 1)" aria-label="Scroll right">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>`;

  return `
  <section class="section section-subtle partners-section" id="partners">
    <div class="container">
      <div class="text-center mb-12">
        ${sectionTag('Trusted Ecosystem', '受信赖的生态系统')}
        <h2 class="section-headline">${t('Our Global Partners', '我们的全球合作伙伴')}</h2>
        <p class="section-sub center">${t('Powering campaigns and monetization for 80,000+ brands, publishers, and technology partners across 150+ countries.',
          '为150+个国家的80,000+品牌、发布商和技术合作伙伴提供营销活动和变现服务。')}</p>
      </div>

      <!-- Partner carousel rows -->
      <div class="partner-carousels">
        ${partnerRows.map((row, i) => makeRow(row, i)).join('')}
      </div>

      <!-- Stats row -->
      <div class="partner-stats-row">
        ${[
          ['80K+', 'Global Partners', '全球合作伙伴'],
          ['150+', 'Countries', '覆盖国家'],
          ['Top 20', 'DSPs Connected', '对接头部DSP'],
          ['Premium', 'Quality Verified', '优质流量认证'],
        ].map(([num, en, zh]) => `
        <div class="partner-stat-item">
          <div class="partner-stat-num">${num}</div>
          <div class="partner-stat-label">${t(en, zh)}</div>
        </div>`).join('')}
      </div>

      <div class="text-center" style="margin-top:36px">
        <button class="btn btn-secondary" onclick="navigate('contact')">${t('Become a Partner →', '成为合作伙伴 →')}</button>
      </div>
    </div>
  </section>`;
}

window.scrollPartnerRow = function(idx, dir) {
  const track = document.getElementById('ptrack-' + idx);
  if (!track) return;
  const cardW = track.querySelector('.pcard')?.offsetWidth || 180;
  const scrollAmt = (cardW + 12) * 3;
  track.scrollBy({ left: dir * scrollAmt, behavior: 'smooth' });
};

/* ─────────────────────────────────────────────
   SOLUTIONS — OVERVIEW
───────────────────────────────────────────── */
function renderSolutionsOverview() {
  return `
  ${pageHeroLayout('var(--gradient-hero)', `
    ${sectionTag('Solutions', '解决方案')}
    <h1>${t('Solutions for Every Role in the Ecosystem', '为生态系统中每个角色提供解决方案')}</h1>
    <p>${t('Whether you\'re an advertiser seeking global reach, a publisher maximizing revenue, or an agency scaling programmatic operations — NexBids has the solution.',
       '无论您是寻求全球覆盖的广告主、最大化收益的发布商，还是扩展程序化运营的代理商——NexBids 都有适合您的解决方案。')}</p>
  `, vizSolutionsOverview())}
  <section class="section section-subtle">
    <div class="container">
      <div class="card-grid card-grid-3">
        ${[
          ['solutions-advertiser', gIcon('rocket','blue','md'), 'Advertiser Launch Solutions','广告主投放解决方案','Scale programmatic campaigns globally with AI-driven DSP technology. Drive measurable ROAS, reduce CPA, and unlock new markets.','通过AI驱动的DSP技术在全球扩展程序化营销活动。提高可衡量的ROAS、降低CPA并开拓新市场。'],
          ['solutions-publisher',  gIcon('dollar','green','md'), 'Publisher & Developer Monetization','发布商/开发者变现解决方案','Maximize ad revenue from web, app, and game traffic with header bidding, SDK integration, and intelligent yield management.','通过头部竞价、SDK集成和智能收益管理，最大化网页、应用和游戏流量的广告收益。'],
          ['solutions-agency',     gIcon('users','purple','md'), 'Agency Cooperation Solutions','代理合作解决方案','Manage programmatic campaigns for all your clients from one unified platform. White-label options, volume pricing, and dedicated support.','从一个统一平台为所有客户管理程序化营销活动。提供白标选项、批量定价和专属支持。'],
        ].map(([pg, icon, en, zh, enD, zhD]) => `
        <div class="card" style="cursor:pointer;display:flex;flex-direction:column" onclick="navigate('${pg}')">
          <div style="margin-bottom:16px">${icon}</div>
          <h3 style="font-size:22px;font-weight:700;margin-bottom:12px">${t(en, zh)}</h3>
          <p style="color:var(--text-secondary);font-size:15px;margin-bottom:20px;line-height:1.7;flex:1">${t(enD, zhD)}</p>
          <span class="btn-ghost" style="align-self:flex-start">${t('View Solution →', '查看解决方案 →')}</span>
        </div>`).join('')}
      </div>
    </div>
  </section>
  ${ctaBand('Not Sure Where to Start?','不确定从哪里开始？',
    'Our team will help identify the right NexBids solution for your business goals.',
    '我们的团队将帮助您确定适合您业务目标的NexBids解决方案。',
    'Talk to a Specialist','与专家交谈','View Products','查看产品','products')}`;
}

/* ─────────────────────────────────────────────
   SOLUTIONS — ADVERTISER
───────────────────────────────────────────── */
function renderSolutionsAdvertiser() {
  return `
  ${pageHeroLayout('linear-gradient(135deg,rgba(37,99,235,0.12),var(--bg-dark))', `
    <div class="breadcrumb"><a onclick="navigate('solutions')">Solutions</a> › <span>${t('Advertiser Launch Solutions','广告主投放解决方案')}</span></div>
    ${sectionTag('For Advertisers', '面向广告主')}
    <h1>${t('Launch, Scale & Optimise Campaigns Globally', '在全球范围内启动、扩展和优化营销活动')}</h1>
    <p>${t('NexBids DSP gives advertisers AI-powered tools to reach the right audiences across 150+ countries, drive measurable ROAS, and dominate every digital channel.',
       'NexBids DSP为广告主提供AI驱动的工具，在150+个国家触达正确的受众，推动可衡量的ROAS，主导每个数字渠道。')}</p>
    <div class="btn-group">
      <button class="btn btn-primary" onclick="navigate('contact')">${t('Start Advertising','开始投放广告')}</button>
      <button class="btn btn-secondary" onclick="navigate('products-dsp')">${t('Explore NexBids DSP','探索 NexBids DSP')}</button>
    </div>
  `, vizAdvertiser())}

  <!-- Who it's for -->
  <section class="section section-subtle">
    <div class="container">
      ${sectionTag('Who It\'s For','适用对象')}
      <h2 class="section-headline">${t('Built for Performance-Driven Advertisers','专为绩效驱动的广告主而构建')}</h2>
      <div class="card-grid card-grid-4" style="margin-top:32px">
        ${[
          [gIcon('barChart','blue','sm'),'E-Commerce Brands','电商品牌','Drive product sales with dynamic ads, retargeting, and cross-market campaigns.','通过动态广告、再营销和跨市场营销活动推动产品销售。'],
          [gIcon('gamepad','purple','sm'),'Mobile Gaming Studios','移动游戏工作室','Acquire high-LTV players with playable ads, rewarded video, and LTV-optimized bidding.','通过可试玩广告、激励视频和LTV优化竞价获取高价值玩家。'],
          [gIcon('smartphone','teal','sm'),'App Developers','应用开发者','Scale installs and in-app events with precise targeting and MMP integration.','通过精准定向和MMP集成扩展安装量和应用内事件。'],
          [gIcon('star','amber','sm'),'Brand Advertisers','品牌广告主','Build awareness and drive consideration with premium display and video campaigns.','通过优质展示和视频营销活动建立品牌知名度并推动消费考虑。'],
        ].map(([icon,en,zh,enD,zhD])=>`
        <div class="card">
          <div style="margin-bottom:14px">${icon}</div>
          <h3 style="font-size:16px;font-weight:700;margin-bottom:8px">${t(en,zh)}</h3>
          <p style="font-size:13px;color:var(--text-secondary)">${t(enD,zhD)}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- Core Features -->
  <section class="section section-dark">
    <div class="container">
      ${sectionTag('Core Capabilities','核心能力')}
      <h2 class="section-headline">${t('Everything You Need to Win in Programmatic','在程序化广告中取胜所需的一切')}</h2>
      <div class="pillar-grid" style="margin-top:40px">
        ${[
          [gIcon('target','blue'), 'rgba(37,99,235,0.15)', 'Precision Audience Targeting','精准受众定向','300+ audience segments, first-party data activation, lookalike modeling, and contextual targeting across 150+ countries.','300+受众细分、第一方数据激活、相似人群建模和覆盖150+国家的场景定向。'],
          [gIcon('brain','purple'), 'rgba(124,58,237,0.15)', 'AI Bidding & ROAS Optimizer','AI竞价与ROAS优化器','Set your ROAS target and let NexBids\' machine learning engine dynamically optimize every bid in real time.','设置您的ROAS目标，让NexBids的机器学习引擎实时动态优化每次竞价。'],
          [gIcon('palette','green'), 'rgba(5,150,105,0.15)', 'Dynamic Creative Optimization','动态创意优化','Automatically assemble and serve the most effective ad creative for each user based on context, behavior, and history.','根据场景、行为和历史记录，自动为每位用户组装和投放最有效的广告创意。'],
          [gIcon('chart','amber'), 'rgba(245,158,11,0.15)', 'Advanced Analytics & Reporting','高级分析与报告','Real-time performance dashboards with custom KPI tracking, attribution reports, and audience insights.','实时绩效仪表盘，支持自定义KPI跟踪、归因报告和受众洞察。'],
          [gIcon('globe','red'), 'rgba(239,68,68,0.15)', 'Multi-Market Campaign Management','多市场营销活动管理','Launch, manage, and optimize campaigns across multiple countries simultaneously with localized creative and targeting.','同时在多个国家启动、管理和优化营销活动，支持本地化创意和定向。'],
          [gIcon('shield','teal'), 'rgba(16,185,129,0.15)', 'Brand Safety & Fraud Protection','品牌安全与欺诈防护','Pre-bid filtering, third-party verification (IAS, DoubleVerify), and AI-powered IVT detection.','竞价前过滤、第三方验证（IAS、DoubleVerify）和AI驱动的无效流量检测。'],
        ].map(([icon,bg,en,zh,enD,zhD])=>pillarCard(icon,bg,en,zh,enD,zhD)).join('')}
      </div>
    </div>
  </section>

  <!-- Results -->
  ${metricsBand([
    ['+47%','Avg ROAS Improvement Year 1','第一年平均ROAS提升'],
    ['-38%','Average CPA Reduction','平均CPA降低'],
    ['150+','Countries & Territories','国家和地区'],
    ['30+','Ad Formats Supported','支持的广告格式'],
  ])}

  ${ctaBand('Ready to Scale Your Campaigns?','准备好扩展您的营销活动了吗？',
    'Start with a free account or talk to our team about managed service options.',
    '免费开始或与我们的团队讨论托管服务选项。',
    'Create Free Account','创建免费账户','Talk to Sales','联系销售','contact')}`;
}

/* ─────────────────────────────────────────────
   SOLUTIONS — PUBLISHER
───────────────────────────────────────────── */
function renderSolutionsPublisher() {
  return `
  ${pageHeroLayout('linear-gradient(135deg,rgba(5,150,105,0.12),var(--bg-dark))', `
    <div class="breadcrumb"><a onclick="navigate('solutions')">Solutions</a> › <span>${t('Publisher & Developer Monetization','发布商/开发者变现解决方案')}</span></div>
    ${sectionTag('For Publishers & Developers','面向发布商与开发者','green')}
    <h1>${t('Maximize Your Ad Revenue with Intelligent Monetization', '用智能变现最大化您的广告收益')}</h1>
    <p>${t('NexBids SSP connects your inventory to 50,000+ premium advertisers worldwide, delivering higher eCPMs through header bidding, AI floor optimization, and direct deal access.',
       'NexBids SSP将您的广告资源连接至全球50,000+优质广告主，通过头部竞价、AI底价优化和直接交易访问，提供更高的eCPM。')}</p>
    <div class="btn-group">
      <button class="btn btn-primary" style="background:linear-gradient(135deg,#059669,#10B981)" onclick="navigate('contact')">${t('Start Monetizing','开始变现')}</button>
      <button class="btn btn-secondary" onclick="navigate('products-ssp')">${t('Explore NexBids SSP','探索 NexBids SSP')}</button>
    </div>
  `, vizPublisher())}

  <section class="section section-subtle">
    <div class="container">
      ${sectionTag('Publisher Types','发布商类型','green')}
      <h2 class="section-headline">${t('Solutions for Every Publisher Format','针对每种发布商格式的解决方案')}</h2>
      <div class="card-grid card-grid-4" style="margin-top:32px">
        ${[
          [gIcon('globe','blue','sm'),'Web Publishers','网站发布商','News, content sites, and blogs monetizing desktop and mobile web traffic with display, native, and video ads.','通过展示、原生和视频广告将桌面和移动网络流量变现的新闻、内容网站和博客。'],
          [gIcon('smartphone','purple','sm'),'Mobile App Developers','移动应用开发者','Utility, lifestyle, and productivity app developers integrating banner, interstitial, and native ads via SDK.','通过SDK集成横幅、插页式和原生广告的工具、生活方式和生产力应用开发者。'],
          [gIcon('gamepad','green','sm'),'Game Developers','游戏开发者','Mobile and PC game studios implementing rewarded video, playable ads, and interstitials for revenue without disruption.','实施激励视频、可试玩广告和插页式广告的移动和PC游戏工作室。'],
          [gIcon('tv','amber','sm'),'OTT / CTV Publishers','OTT/CTV发布商','Streaming video platforms and connected TV apps monetizing premium video content with programmatic video and CTV ads.','通过程序化视频和CTV广告将优质视频内容变现的流媒体平台和联网TV应用。'],
        ].map(([icon,en,zh,enD,zhD])=>`
        <div class="card">
          <div style="margin-bottom:14px">${icon}</div>
          <h3 style="font-size:16px;font-weight:700;margin-bottom:8px">${t(en,zh)}</h3>
          <p style="font-size:13px;color:var(--text-secondary)">${t(enD,zhD)}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section section-dark">
    <div class="container">
      ${sectionTag('Core Features','核心功能','green')}
      <h2 class="section-headline">${t('Yield Optimization Built for Maximum Revenue','专为最大化收益而构建的收益优化')}</h2>
      <div class="pillar-grid" style="margin-top:40px">
        ${[
          [gIcon('zap','green'),'rgba(5,150,105,0.15)','Header Bidding (Prebid.js)','头部竞价（Prebid.js）','Implement NexBids as a demand partner in your Prebid.js stack for real-time competitive bidding from 50,000+ advertisers.','将NexBids作为需求合作伙伴添加至您的Prebid.js技术栈，来自50,000+广告主的实时竞争性竞价。'],
          [gIcon('brain','blue'),'rgba(37,99,235,0.15)','AI Floor Price Optimizer','AI底价优化器','Machine learning engine that dynamically adjusts floor prices per ad request to maximize revenue without sacrificing fill.','机器学习引擎，动态调整每个广告请求的底价，在不牺牲填充率的情况下最大化收益。'],
          [gIcon('link','purple'),'rgba(124,58,237,0.15)','SDK for iOS, Android & Unity','iOS/Android/Unity SDK','Lightweight SDKs supporting banner, interstitial, rewarded video, and native formats with simple integration.','轻量级SDK，支持横幅、插页式、激励视频和原生格式，集成简单。'],
          [gIcon('handshake','amber'),'rgba(245,158,11,0.15)','PMP & Programmatic Direct','PMP与程序化直购','Create private marketplace deals and programmatic guaranteed deals directly with premium advertisers at negotiated CPMs.','以协商好的CPM与优质广告主直接创建私有市场交易和程序化保证交易。'],
          [gIcon('chart','red'),'rgba(239,68,68,0.15)','Real-Time Analytics','实时分析','Granular revenue reporting by format, placement, geography, and device with custom dashboard building.','按格式、广告位、地区和设备细分的收益报告，支持自定义仪表盘构建。'],
          [gIcon('shield','teal'),'rgba(16,185,129,0.15)','Ad Quality Management','广告质量管理','Block unwanted ad categories, ensure brand safety, and maintain user experience with comprehensive ad quality controls.','通过全面的广告质量控制，屏蔽不需要的广告类别、确保品牌安全并维护用户体验。'],
        ].map(([icon,bg,en,zh,enD,zhD])=>pillarCard(icon,bg,en,zh,enD,zhD)).join('')}
      </div>
    </div>
  </section>

  ${metricsBand([
    ['+52%','Avg eCPM Lift for New Publishers','新发布商平均eCPM提升'],
    ['30K+','Active Publishers','活跃发布商'],
    ['50K+','Connected Advertisers','连接广告主'],
    ['99.5%+','Average Fill Rate','平均填充率'],
  ])}

  ${ctaBand('Ready to Grow Your Revenue?','准备好增加您的收益了吗？',
    'Join 30,000+ publishers already maximizing revenue with NexBids SSP.',
    '加入已在使用NexBids SSP最大化收益的30,000+发布商。',
    'Get Started Free','免费开始','Explore SSP','探索SSP','products-ssp')}`;
}

/* ─────────────────────────────────────────────
   SOLUTIONS — AGENCY
───────────────────────────────────────────── */
function renderSolutionsAgency() {
  return `
  ${pageHeroLayout('linear-gradient(135deg,rgba(124,58,237,0.12),var(--bg-dark))', `
    <div class="breadcrumb"><a onclick="navigate('solutions')">Solutions</a> › <span>${t('Agency Cooperation Solutions','代理合作解决方案')}</span></div>
    ${sectionTag('For Agencies','面向代理商','purple')}
    <h1>${t('One Platform. All Your Clients. Maximum Performance.','一个平台。所有客户。最佳绩效。')}</h1>
    <p>${t('NexBids Agency Solutions give performance and full-service agencies the tools, pricing, and support to win more clients and deliver exceptional programmatic results.',
       'NexBids代理商解决方案为绩效和全服务代理商提供工具、定价和支持，帮助赢得更多客户并提供卓越的程序化成果。')}</p>
    <div class="btn-group">
      <button class="btn btn-primary" style="background:linear-gradient(135deg,#7C3AED,#8B5CF6)" onclick="navigate('contact')">${t('Apply for Agency Partnership','申请代理商合作')}</button>
      <button class="btn btn-secondary" onclick="navigate('products-dsp')">${t('Explore NexBids DSP','探索 NexBids DSP')}</button>
    </div>
  `, vizAgency())}

  <section class="section section-subtle">
    <div class="container">
      ${sectionTag('Agency Features','代理商功能','purple')}
      <h2 class="section-headline">${t('Everything Agencies Need to Win','代理商赢得更多客户所需的一切')}</h2>
      <div class="pillar-grid" style="margin-top:40px">
        ${[
          [gIcon('users','purple'),'rgba(124,58,237,0.15)','Multi-Client Management','多客户管理','Manage unlimited client accounts from a single agency seat. Separate reporting, budgets, and permissions per client.','从单一代理商席位管理无限客户账户。每个客户单独的报告、预算和权限。'],
          [gIcon('dollar','blue'),'rgba(37,99,235,0.15)','Volume Pricing & Rebates','批量定价与返利','Tiered pricing discounts based on managed spend. Quarterly rebate programs for top-tier agency partners.','基于管理支出的分级定价折扣。顶级代理商合作伙伴的季度返利计划。'],
          [gIcon('tag','green'),'rgba(5,150,105,0.15)','White-Label Option','白标选项','Offer programmatic advertising under your own brand with NexBids white-label platform options.','通过NexBids白标平台选项，在您自己的品牌下提供程序化广告服务。'],
          [gIcon('star','amber'),'rgba(245,158,11,0.15)','Dedicated Agency Support','专属代理商支持','Assigned agency account manager, priority technical support, and quarterly business reviews with NexBids leadership.','专属代理商客户经理、优先技术支持以及与NexBids领导层的季度业务回顾。'],
          [gIcon('barChart','red'),'rgba(239,68,68,0.15)','Custom Reporting & Dashboards','定制报告与仪表盘','Build client-facing dashboards with custom branding, KPIs, and data exports. API access for BI integration.','构建具有自定义品牌、KPI和数据导出的面向客户的仪表盘。提供BI集成的API访问。'],
          [gIcon('award','teal'),'rgba(16,185,129,0.15)','Agency Training & Certification','代理商培训与认证','NexBids Academy certification programs and live training sessions to upskill your programmatic team.','NexBids学院认证项目和现场培训课程，提升您的程序化团队技能。'],
        ].map(([icon,bg,en,zh,enD,zhD])=>pillarCard(icon,bg,en,zh,enD,zhD)).join('')}
      </div>
    </div>
  </section>

  ${ctaBand('Become a NexBids Agency Partner','成为NexBids代理商合作伙伴',
    'Apply today to access volume pricing, white-label options, and dedicated agency support.',
    '立即申请，获取批量定价、白标选项和专属代理商支持。',
    'Apply Now','立即申请','View Case Studies','查看案例','case-studies')}`;
}

/* ─────────────────────────────────────────────
   PRODUCTS — OVERVIEW
───────────────────────────────────────────── */
function renderProductsOverview() {
  return `
  ${pageHeroLayout('var(--gradient-hero)', `
    ${sectionTag('Products','产品')}
    <h1>${t('Three Platforms. One Ecosystem.','三个平台。一个生态系统。')}</h1>
    <p>${t('NexBids\'s full-stack programmatic infrastructure — DSP, ADX, and SSP — works seamlessly together to power every side of the digital advertising marketplace.',
       'NexBids的全栈程序化广告基础设施——DSP、ADX和SSP——无缝协作，驱动数字广告市场的每一方。')}</p>
  `, vizProductsOverview())}
  <section class="section section-dark">
    <div class="container">
      <div style="display:flex;flex-direction:column;gap:48px">
        ${[
          ['dsp','products-dsp','DSP','Demand-Side Platform','需求方平台','#2563EB','For Advertisers & Agencies','面向广告主和代理商','The AI-powered demand-side platform that helps advertisers reach their audiences with precision and scale across every digital channel worldwide.','AI驱动的需求方平台，帮助广告主在全球每个数字渠道以精准和规模触达其受众。',
           [['50K+','Active Advertisers','活跃广告主'],['30+','Ad Formats','广告格式'],['150+','Countries','国家'],['<100ms','Bid Response','竞价响应']]],
          ['adx','products-adx','ADX','Ad Exchange','广告交易中枢','#7C3AED','For All Ecosystem Participants','面向所有生态系统参与者','The neutral, high-performance marketplace where premium supply meets quality demand — with real-time auctions, header bidding, and direct deal infrastructure at global scale.','中立的高性能市场，优质供应与高质量需求相遇——全球规模的实时拍卖、头部竞价和直接交易基础设施。',
           [['50B+','Daily Auctions','日竞价'],['<100ms','Latency','延迟'],['98%+','Bid Win Transparency','竞价透明度'],['10K+','Integrated Partners','集成合作伙伴']]],
          ['ssp','products-ssp','SSP','Supply-Side Platform','供应方平台','#059669','For Publishers & Developers','面向发布商与开发者','The yield-optimizing supply platform that connects publishers and developers to the world\'s best demand sources, maximizing revenue through intelligent automation and header bidding.',
           '收益优化供应平台，将发布商和开发者与全球最佳需求来源连接，通过智能自动化和头部竞价最大化收益。',
           [['30K+','Publishers','发布商'],['+52%','Avg eCPM Lift','平均eCPM提升'],['99.5%+','Fill Rate','填充率'],['SDK','iOS/Android/Unity','SDK支持']]],
        ].map(([type,pg,tag,en,zh,color,forEn,forZh,descEn,descZh,stats])=>`
        <div class="platform-card ${type}" style="display:grid;grid-template-columns:1fr auto;gap:32px;align-items:start">
          <div>
            <div class="platform-tag">${tag} — ${t(en,zh)}</div>
            <h2 style="font-size:28px;font-weight:800;margin-bottom:8px">NexBids ${tag}</h2>
            <div style="font-size:13px;color:var(--text-muted);margin-bottom:16px">${t(forEn,forZh)}</div>
            <p style="color:var(--text-secondary);font-size:15px;line-height:1.7;margin-bottom:24px;max-width:600px">${t(descEn,descZh)}</p>
            <div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:24px">
              ${stats.map(([n,en,zh])=>`<div style="text-align:center;padding:12px 16px;background:rgba(255,255,255,0.04);border-radius:10px"><div style="font-size:22px;font-weight:800;color:${color}">${n}</div><div style="font-size:12px;color:var(--text-secondary);margin-top:2px">${t(en,zh)}</div></div>`).join('')}
            </div>
            <button class="btn btn-primary" style="background:linear-gradient(135deg,${color},${color}bb)" onclick="navigate('${pg}')">${t(`Explore ${tag} →`,`探索 ${tag} →`)}</button>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>`;
}

/* ─────────────────────────────────────────────
   PRODUCT — DSP
───────────────────────────────────────────── */
function renderProductsDSP() {
  return `
  ${pageHeroLayout('linear-gradient(135deg,rgba(37,99,235,0.15),var(--bg-dark))', `
    <div class="breadcrumb"><a onclick="navigate('products')">Products</a> › <span>NexBids DSP</span></div>
    ${sectionTag('DSP — Demand-Side Platform','DSP — 需求方平台')}
    <h1>NexBids DSP</h1>
    <p>${t('The AI-powered demand-side platform built for performance. Reach the right audiences across 150+ countries, optimize to your KPIs in real time, and scale campaigns with confidence.',
       'AI驱动的绩效需求方平台。在150+个国家触达正确的受众，实时优化您的KPI，并自信地扩展营销活动。')}</p>
    <div class="btn-group">
      <button class="btn btn-primary" onclick="navigate('login-dsp')">${t('Login to DSP','登录DSP')}</button>
      <button class="btn btn-secondary" onclick="navigate('contact')">${t('Request Demo','申请演示')}</button>
    </div>
  `, vizDSP())}

  ${metricsBand([
    ['50K+','Active Advertisers','活跃广告主'],
    ['30+','Ad Formats','广告格式'],
    ['300+','Audience Segments','受众细分'],
    ['150+','Countries Covered','覆盖国家'],
  ])}

  <!-- Core Features -->
  <section class="section section-dark">
    <div class="container">
      ${sectionTag('Platform Features','平台功能')}
      <h2 class="section-headline">${t('Every Tool You Need to Win in Programmatic','在程序化广告中取胜所需的每一个工具')}</h2>
      <div class="pillar-grid" style="margin-top:40px">
        ${[
          [gIcon('target','blue'),'rgba(37,99,235,0.12)','Precision Audience Targeting','精准受众定向','Demographics, interests, behavioral, contextual, first-party, lookalike, retargeting — 300+ segments across 150+ countries.','人口统计、兴趣、行为、场景、第一方数据、相似受众、再营销——150+国家的300+细分。'],
          [gIcon('brain','purple'),'rgba(124,58,237,0.12)','AI Bidding Engine','AI竞价引擎','ROAS Optimizer, CPA Bidder, Max Reach — machine learning models that continuously improve campaign performance.','ROAS优化器、CPA竞价器、最大覆盖——持续提升营销活动绩效的机器学习模型。'],
          [gIcon('palette','green'),'rgba(5,150,105,0.12)','Dynamic Creative Optimization','动态创意优化 (DCO)','Automatically assemble and test thousands of creative combinations; serve the winning ad to each user.','自动组装并测试数千种创意组合；向每位用户投放获胜广告。'],
          [gIcon('chart','amber'),'rgba(245,158,11,0.12)','Real-Time Analytics','实时分析','Customizable dashboards, attribution reporting (click, view, multi-touch), and audience insights updated every 15 minutes.','可定制仪表盘、归因报告（点击、浏览、多触点）和每15分钟更新的受众洞察。'],
          [gIcon('layers','red'),'rgba(239,68,68,0.12)','Multi-Format Ad Support','多格式广告支持','Display, video (in-stream, out-stream, CTV), native, audio, DOOH, playable, rewarded video — all in one platform.','展示、视频（前贴片、外置流、CTV）、原生、音频、DOOH、可试玩、激励视频——全在一个平台。'],
          [gIcon('link','teal'),'rgba(16,185,129,0.12)','MMP & Third-Party Integration','MMP与第三方集成','Native integrations with AppsFlyer, Adjust, Kochava, Singular, Branch, Google Analytics, and all major MMPs.','与AppsFlyer、Adjust、Kochava、Singular、Branch、Google Analytics和所有主要MMP的原生集成。'],
        ].map(([icon,bg,en,zh,enD,zhD])=>pillarCard(icon,bg,en,zh,enD,zhD)).join('')}
      </div>
    </div>
  </section>

  <!-- Ad Formats -->
  <section class="section section-subtle">
    <div class="container">
      ${sectionTag('Ad Formats','广告格式')}
      <h2 class="section-headline">${t('30+ Ad Formats Across Every Channel','跨每个渠道的30+广告格式')}</h2>
      <div class="card-grid card-grid-4" style="margin-top:32px">
        ${[
          [gIcon('monitor','blue'),'Display Ads','展示广告','Banner, rich media, expandable formats across web and app inventory.','网页和应用资源中的横幅、富媒体、可扩展格式。'],
          [gIcon('tv','purple'),'Video Ads','视频广告','In-stream (pre/mid/post roll), out-stream, rewarded video, and CTV/OTT.','前/中/后贴片、外置流、激励视频和CTV/OTT。'],
          [gIcon('newspaper','teal'),'Native Ads','原生广告','In-feed, content recommendation, and sponsored content formats that blend with the user experience.','与用户体验融合的信息流、内容推荐和赞助内容格式。'],
          [gIcon('gamepad','amber'),'Playable Ads','可试玩广告','Interactive mini-game ad units for gaming advertisers to showcase gameplay before install.','游戏广告主在安装前展示玩法的互动迷你游戏广告单元。'],
        ].map(([icon,en,zh,enD,zhD])=>`
        <div class="card" style="text-align:center">
          <div style="display:flex;justify-content:center;margin-bottom:12px">${icon}</div>
          <h3 style="font-size:16px;font-weight:700;margin-bottom:8px">${t(en,zh)}</h3>
          <p style="font-size:13px;color:var(--text-secondary)">${t(enD,zhD)}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  ${ctaBand('Start Your First DSP Campaign','开始您的第一个DSP营销活动',
    'Set up your account in minutes and launch your first programmatic campaign today.',
    '几分钟内设置您的账户，今天就启动您的第一个程序化营销活动。',
    'Create Free Account','创建免费账户','Request Demo','申请演示','contact')}`;
}

/* ─────────────────────────────────────────────
   PRODUCT — ADX
───────────────────────────────────────────── */
function renderProductsADX() {
  return `
  ${pageHeroLayout('linear-gradient(135deg,rgba(124,58,237,0.15),var(--bg-dark))', `
    <div class="breadcrumb"><a onclick="navigate('products')">Products</a> › <span>NexBids ADX</span></div>
    ${sectionTag('ADX — Ad Exchange','ADX — 广告交易中枢','purple')}
    <h1>NexBids ADX</h1>
    <p>${t('The high-performance, neutral ad exchange connecting premium supply with quality demand — processing 50 billion auctions daily with sub-100ms latency.',
       '高性能中立广告交易所，将优质供应与高质量需求相连——每天处理500亿次拍卖，延迟低于100毫秒。')}</p>
    <div class="btn-group">
      <button class="btn btn-primary" style="background:linear-gradient(135deg,#7C3AED,#8B5CF6)" onclick="navigate('login-adx')">${t('Login to ADX','登录ADX')}</button>
      <button class="btn btn-secondary" onclick="navigate('contact')">${t('Integration Inquiry','集成咨询')}</button>
    </div>
  `, vizADX())}

  ${metricsBand([
    ['50B+','Daily Bid Requests','每日竞价请求'],
    ['<100ms','Bid Response SLA','竞价响应SLA'],
    ['10K+','Integrated Partners','集成合作伙伴'],
    ['98%+','Bid Transparency','竞价透明度'],
  ])}

  <section class="section section-subtle">
    <div class="container">
      ${sectionTag('For Buyers','面向买方','purple')}
      <h2 class="section-headline">${t('Buy Premium Inventory at Scale','大规模购买优质广告资源')}</h2>
      <div class="pillar-grid" style="margin-top:40px">
        ${[
          [gIcon('server','purple'),'rgba(124,58,237,0.12)','OpenRTB 2.6 Integration','OpenRTB 2.6 集成','Full OpenRTB 2.6 compliant integration with comprehensive bid request/response documentation and sandbox environment.','完整的OpenRTB 2.6合规集成，提供全面的竞价请求/响应文档和沙盒环境。'],
          [gIcon('tag','blue'),'rgba(37,99,235,0.12)','Private Marketplace (PMP)','私有市场（PMP）','Access curated premium inventory packages through Private Marketplace deals at negotiated CPMs.','通过私有市场交易以协商好的CPM访问精选的优质广告资源包。'],
          [gIcon('handshake','green'),'rgba(5,150,105,0.12)','Programmatic Guaranteed','程序化保证','Secure guaranteed inventory volumes with fixed CPMs through Programmatic Guaranteed deal structures.','通过程序化保证交易结构以固定CPM确保保证库存量。'],
          [gIcon('barChart','amber'),'rgba(245,158,11,0.12)','Buyer Analytics Portal','买方分析门户','Real-time win rate analytics, inventory insights, and performance reporting across all ADX supply.','所有ADX供应的实时胜率分析、库存洞察和绩效报告。'],
        ].map(([icon,bg,en,zh,enD,zhD])=>pillarCard(icon,bg,en,zh,enD,zhD)).join('')}
      </div>
      <div style="margin-top:48px">
        ${sectionTag('For Sellers','面向卖方','green')}
        <h2 class="section-headline">${t('Monetize Every Impression at Maximum Value','以最大价值变现每一个广告展示')}</h2>
        <div class="pillar-grid" style="margin-top:32px">
          ${[
            [gIcon('gem','green'),'rgba(5,150,105,0.12)','Premium Demand Access','优质需求访问','Connect your inventory to 50,000+ global advertisers competing for every impression in real-time auctions.','将您的广告资源连接至50,000+全球广告主，在实时拍卖中竞争每一个展示。'],
            [gIcon('shield','red'),'rgba(239,68,68,0.12)','Supply Quality Protection','供应质量保护','IVT filtering, brand safety enforcement, and content quality scoring protect your inventory value and buyer relationships.','IVT过滤、品牌安全执行和内容质量评分保护您的库存价值和买方关系。'],
            [gIcon('settings','purple'),'rgba(124,58,237,0.12)','Floor Price Control','底价控制','Set global and publisher-specific floor prices with dynamic floor optimization to maximize revenue.','设置全局和发布商特定的底价，通过动态底价优化最大化收益。'],
          ].map(([icon,bg,en,zh,enD,zhD])=>pillarCard(icon,bg,en,zh,enD,zhD)).join('')}
        </div>
      </div>
    </div>
  </section>

  ${ctaBand('Integrate with NexBids ADX','与NexBids ADX集成',
    'Buyer or seller — our integration team will have you live in days.',
    '无论是买方还是卖方——我们的集成团队将在数天内让您上线。',
    'Start Integration','开始集成','View API Docs','查看API文档','resources')}`;
}

/* ─────────────────────────────────────────────
   PRODUCT — SSP
───────────────────────────────────────────── */
function renderProductsSSP() {
  return `
  ${pageHeroLayout('linear-gradient(135deg,rgba(5,150,105,0.15),var(--bg-dark))', `
    <div class="breadcrumb"><a onclick="navigate('products')">Products</a> › <span>NexBids SSP</span></div>
    ${sectionTag('SSP — Supply-Side Platform','SSP — 供应方平台','green')}
    <h1>NexBids SSP</h1>
    <p>${t('The intelligent supply-side platform that maximizes publisher revenue through header bidding, AI yield optimization, direct deal access, and seamless SDK integration.',
       '智能供应方平台，通过头部竞价、AI收益优化、直接交易访问和无缝SDK集成，最大化发布商收益。')}</p>
    <div class="btn-group">
      <button class="btn btn-primary" style="background:linear-gradient(135deg,#059669,#10B981)" onclick="navigate('login-ssp')">${t('Login to SSP','登录SSP')}</button>
      <button class="btn btn-secondary" onclick="navigate('contact')">${t('Apply as Publisher','申请成为发布商')}</button>
    </div>
  `, vizSSP())}

  ${metricsBand([
    ['30K+','Active Publishers','活跃发布商'],
    ['+52%','Avg eCPM Improvement','平均eCPM提升'],
    ['99.5%+','Fill Rate Average','平均填充率'],
    ['$2.8B+','Publisher Revenue Managed','发布商收益管理'],
  ])}

  <section class="section section-dark">
    <div class="container">
      ${sectionTag('Monetization Features','变现功能','green')}
      <h2 class="section-headline">${t('The Complete Publisher Monetization Stack','完整的发布商变现技术栈')}</h2>
      <div class="pillar-grid" style="margin-top:40px">
        ${[
          [gIcon('zap','green'),'rgba(5,150,105,0.12)','Header Bidding (Prebid.js)','头部竞价（Prebid.js）','Industry-standard Prebid.js integration with server-side bidding option. Simple adapter configuration, tested with major wrapper setups.','行业标准Prebid.js集成，提供服务器端竞价选项。简单的适配器配置，经主要包装设置测试。'],
          [gIcon('smartphone','blue'),'rgba(37,99,235,0.12)','iOS & Android SDK','iOS与Android SDK','Lightweight, GDPR/CCPA compliant SDKs supporting banner, interstitial, rewarded video, native, and MRAID rich media.','轻量级、符合GDPR/CCPA的SDK，支持横幅、插页式、激励视频、原生和MRAID富媒体。'],
          [gIcon('gamepad','purple'),'rgba(124,58,237,0.12)','Unity & Game Engine Support','Unity与游戏引擎支持','NexBids Unity Plugin and Cocos2d-x support for game developers. Rewarded video, interstitial, and banner formats.','面向游戏开发者的NexBids Unity插件和Cocos2d-x支持。激励视频、插页式和横幅格式。'],
          [gIcon('brain','amber'),'rgba(245,158,11,0.12)','AI Floor Price Optimizer','AI底价优化器','Real-time floor price optimization per impression using ML models trained on billions of auction signals.','使用经数十亿拍卖信号训练的ML模型，对每个展示进行实时底价优化。'],
          [gIcon('handshake','red'),'rgba(239,68,68,0.12)','PMP & Direct Deals','PMP与直接交易','Create and manage private marketplace and programmatic guaranteed deals directly with premium advertisers.','直接与优质广告主创建和管理私有市场和程序化保证交易。'],
          [gIcon('tv','teal'),'rgba(16,185,129,0.12)','Video & CTV Monetization','视频与CTV变现','VAST/VPAID/SIMID compliant video monetization for web, in-app, and connected TV inventory.','符合VAST/VPAID/SIMID的视频变现，适用于网页、应用内和联网TV广告资源。'],
        ].map(([icon,bg,en,zh,enD,zhD])=>pillarCard(icon,bg,en,zh,enD,zhD)).join('')}
      </div>
    </div>
  </section>

  <!-- Integration Steps -->
  <section class="section section-subtle">
    <div class="container">
      ${sectionTag('Quick Integration','快速集成','green')}
      <h2 class="section-headline">${t('Live in Hours, Not Weeks','数小时上线，而非数周')}</h2>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:40px">
        ${[
          ['1','Create Account','创建账户','Sign up and complete publisher verification in under 10 minutes.','10分钟内注册并完成发布商验证。'],
          ['2','Add Your Inventory','添加您的广告资源','Define your ad units, formats, and floor price preferences in the publisher dashboard.','在发布商仪表盘中定义您的广告单元、格式和底价偏好。'],
          ['3','Integrate','集成','Copy our Prebid.js adapter config, install the SDK, or add our ad tag — your choice.','复制我们的Prebid.js适配器配置、安装SDK或添加我们的广告标签——您的选择。'],
          ['4','Start Earning','开始赚钱','Go live and watch revenue grow as NexBids connects your inventory to global demand.','上线后观察NexBids将您的广告资源连接至全球需求时收益的增长。'],
        ].map(([n,en,zh,enD,zhD])=>`
        <div class="card" style="text-align:center">
          <div class="step-circle">${n}</div>
          <h3 style="font-size:16px;font-weight:700;margin-bottom:8px">${t(en,zh)}</h3>
          <p style="font-size:13px;color:var(--text-secondary)">${t(enD,zhD)}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  ${ctaBand('Ready to Maximize Your Revenue?','准备好最大化您的收益了吗？',
    'Join 30,000+ publishers using NexBids SSP. Get started in minutes.',
    '加入30,000+使用NexBids SSP的发布商。几分钟内开始。',
    'Apply as Publisher','申请成为发布商','View Integration Docs','查看集成文档','resources')}`;
}


/* ─────────────────────────────────────────────
   TECHNOLOGY PAGE
───────────────────────────────────────────── */
function renderTechnology() {
  return `
  ${pageHeroLayout('var(--gradient-hero)', `
    ${sectionTag('Technology','技术优势')}
    <h1>${t('The Technology That Powers the Future of Programmatic Advertising','驱动程序化广告未来的技术基础')}</h1>
    <p>${t('NexBids is engineered from the ground up for speed, intelligence, and global scale. Our technology stack processes trillions of data signals daily, enabling smarter decisions, faster auctions, and better outcomes for every participant.',
       'NexBids从底层为速度、智能和全球规模而设计。我们的技术栈每天处理数万亿数据信号，为每个参与者实现更智能的决策、更快的竞价和更好的结果。')}</p>
  `, vizTechnology())}

  ${metricsBand([
    ['50B+','Daily Bid Requests','每日竞价请求'],
    ['<100ms','Bid Response SLA','竞价响应SLA'],
    ['99.98%','Platform Uptime','平台在线率'],
    ['6','Global Data Center Regions','全球数据中心区域'],
  ])}

  <section class="section section-dark">
    <div class="container">
      ${sectionTag('Our Principles','我们的原则')}
      <h2 class="section-headline">${t('Technology Philosophy','技术理念')}</h2>
      <div class="card-grid card-grid-3" style="margin-top:40px">
        ${[
          [gIcon('brain','purple','md'),'Intelligent','智能的','Not just automated — genuinely smart. Our ML systems learn and improve continuously from every auction signal.','不仅仅是自动化，而是真正智能。我们的ML系统从每个竞价信号持续学习和改进。'],
          [gIcon('zap','blue','md'),'Fast','快速的','Millisecond-level decisions at global scale. Sub-100ms bid processing at 50B+ daily requests.','全球规模下毫秒级决策，不做任何妥协。在500亿+日请求下竞价处理低于100毫秒。'],
          [gIcon('eye','teal','md'),'Transparent','透明的','Every transaction, every fee, every data flow is visible and auditable. We have nothing to hide.','每笔交易、每项费用、每个数据流都可见且可审计。我们无需隐瞒任何事情。'],
          [gIcon('lock','green','md'),'Privacy-First','隐私优先的','Built for a world where user privacy is the default. Cookieless solutions, consent management, privacy-safe targeting.','为用户隐私是默认设置的世界而构建。无Cookie解决方案、同意管理、隐私安全定向。'],
          [gIcon('server','amber','md'),'Reliable','可靠的','Enterprise-grade infrastructure with 99.98% uptime SLA backed by 24/7 global engineering on-call.','99.98%在线率SLA，由24/7全球工程师值班支持的企业级基础设施。'],
          [gIcon('globe','red','md'),'Global','全球化的','6 data center regions. 150+ countries served. Local processing reduces latency for every participant worldwide.','6个数据中心区域，服务150+国家。本地处理为全球每个参与者降低延迟。'],
        ].map(([icon,en,zh,enD,zhD])=>`
        <div class="card" style="text-align:center">
          <div style="display:flex;justify-content:center;margin-bottom:12px">${icon}</div>
          <h3 style="font-size:17px;font-weight:700;margin-bottom:8px">${t(en,zh)}</h3>
          <p style="font-size:13px;color:var(--text-secondary)">${t(enD,zhD)}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section section-subtle">
    <div class="container">
      ${sectionTag('AI & Machine Learning','AI与机器学习')}
      <h2 class="section-headline">${t('Six Proprietary ML Models at the Core','六大专有机器学习模型驱动核心')}</h2>
      <p class="section-sub" style="margin-bottom:40px">${t('Our AI platform processes trillions of historical auction signals to power real-time optimization across every dimension of programmatic advertising.','我们的AI平台处理数万亿历史竞价信号，驱动程序化广告各维度的实时优化。')}</p>
      <div class="card-grid card-grid-3">
        ${[
          ['Bid Price Prediction','竞价价格预测','Deep neural network, continuous online learning + batch retraining every 6 hours. <5% MAPE accuracy.','深度神经网络，持续在线学习+每6小时批量再训练，<5% MAPE精度。','#2563EB'],
          ['Conversion Probability','转化概率模型','Gradient-boosted tree ensemble on tens of billions of impression-to-conversion sequences. Multi-event support.','在数百亿次展示到转化序列上训练的梯度提升树集成，支持多事件转化。','#7C3AED'],
          ['CTR Prediction','CTR预测模型','Factorization machine + deep learning layers. <5ms inference latency at real-time bid evaluation.','因子分解机+深度学习层。竞价评估时推断延迟<5ms。','#059669'],
          ['Audience Similarity (Lookalike)','受众相似度（相似受众）','Graph neural network for user behavioral similarity. Configurable 1%–30% seed expansion.','用于用户行为相似度的图神经网络，可配置1%-30%种子扩展。','#F59E0B'],
          ['Yield Optimization (SSP)','收益优化（SSP端）','Multi-armed bandit + contextual signals for dynamic floor pricing, updated in real time.','多臂老虎机+上下文信号实现动态底价，实时更新。','#EF4444'],
          ['Fraud Detection','欺诈检测','Ensemble anomaly detection at impression, session, and publisher level. >99.8% precision, <0.1% FPR.','在展示、会话和发布商层面的集成异常检测，>99.8%精度，<0.1%误报率。','#06B6D4'],
        ].map(([en,zh,enD,zhD,color])=>`
        <div class="card">
          <div style="width:8px;height:8px;border-radius:50%;background:${color};margin-bottom:14px"></div>
          <h3 style="font-size:16px;font-weight:700;margin-bottom:8px">${t(en,zh)}</h3>
          <p style="font-size:13px;color:var(--text-secondary);line-height:1.6">${t(enD,zhD)}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section section-dark">
    <div class="container">
      ${sectionTag('RTB Infrastructure','实时竞价基础设施')}
      <h2 class="section-headline">${t('Global Real-Time Bidding at Scale','全球规模的实时竞价')}</h2>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start;margin-top:40px" class="home-tech-grid">
        <div>
          ${[
            ['🌐','Global PoP Network','全球PoP网络','6 regional data center clusters (NA, EU, APAC-East, APAC-SE, MENA, LATAM) with 50+ Points of Presence worldwide.','6个区域数据中心集群，全球50+接入点。'],
            ['⚡','Sub-100ms Processing','100毫秒内处理','End-to-end bid request processing in under 100ms. NexCache (proprietary in-memory store) powers microsecond lookups.','端到端竞价请求处理低于100毫秒。NexCache（专有内存存储）支持微秒级查找。'],
            ['📡','OpenRTB 2.6 Native','OpenRTB 2.6 原生支持','Full OpenRTB 2.6 compliance plus NexBids Extensions. Header bidding via Prebid.js server-side adapter.','完整OpenRTB 2.6合规加上NexBids扩展。通过Prebid.js服务器端适配器支持头部竞价。'],
          ].map(([icon,en,zh,enD,zhD])=>`
          <div style="display:flex;gap:16px;margin-bottom:24px">
            <div style="font-size:24px;width:40px;flex-shrink:0">${icon}</div>
            <div><h4 style="font-weight:600;margin-bottom:6px">${t(en,zh)}</h4><p style="font-size:14px;color:var(--text-secondary)">${t(enD,zhD)}</p></div>
          </div>`).join('')}
        </div>
        <div>
          <table class="spec-table">
            <tr><td>${t('Processing Capacity','处理容量')}</td><td>${t('50B+ bid requests/day','每天500亿+竞价请求')}</td></tr>
            <tr><td>${t('End-to-End Latency','端到端延迟')}</td><td>&lt;100ms P99</td></tr>
            <tr><td>${t('Architecture','基础设施架构')}</td><td>${t('Microservices on Kubernetes','Kubernetes微服务')}</td></tr>
            <tr><td>${t('Data Streaming','数据流处理')}</td><td>Apache Kafka + Flink</td></tr>
            <tr><td>${t('Database Layer','数据库层')}</td><td>Cassandra + ClickHouse</td></tr>
            <tr><td>${t('Cache Layer','缓存层')}</td><td>NexCache (proprietary)</td></tr>
            <tr><td>${t('Languages','竞价处理语言')}</td><td>Go + C++ hot path</td></tr>
            <tr><td>${t('Uptime SLA','在线率SLA')}</td><td>99.98%</td></tr>
            <tr><td>${t('Failover RTO','故障恢复时间')}</td><td>&lt;30 seconds</td></tr>
          </table>
        </div>
      </div>

      <!-- RTB Flow Diagram -->
      <div class="rtb-flow-diagram" style="margin-top:56px">
        <div style="text-align:center;margin-bottom:28px">
          ${sectionTag('RTB Auction Flow','RTB拍卖流程')}
          <p style="font-size:14px;color:var(--text-muted)">${t('How a real-time bid is processed in under 100ms','实时竞价如何在100ms内完成处理')}</p>
        </div>
        <div class="rtb-flow-steps">
          ${[
            { step:'1', icon:'📱', title:'Ad Request', titleZh:'广告请求', desc:'User loads page/app; SSP fires bid request', descZh:'用户加载页面/应用，SSP触发竞价请求', ms:'0ms', color:'#60A5FA' },
            { step:'2', icon:'🔀', title:'ADX Routing', titleZh:'ADX路由', desc:'ADX validates request & routes to eligible DSPs', descZh:'ADX验证请求并路由至合格DSP', ms:'5ms', color:'#C084FC' },
            { step:'3', icon:'🤖', title:'AI Scoring', titleZh:'AI评分', desc:'NexBids ML models score bid price & conversion probability', descZh:'ML模型评估竞价价格与转化概率', ms:'15ms', color:'#34D399' },
            { step:'4', icon:'⚖️', title:'Auction', titleZh:'竞价拍卖', desc:'Second-price auction among all qualified bidders', descZh:'所有合格竞价者参与的次价拍卖', ms:'40ms', color:'#FCD34D' },
            { step:'5', icon:'🏆', title:'Winner Notified', titleZh:'中标通知', desc:'Winning DSP receives win notice, ad is served', descZh:'中标DSP收到通知，广告完成投放', ms:'80ms', color:'#F87171' },
          ].map((s, i) => `
          <div class="rtb-flow-step">
            <div class="rtb-step-icon" style="background:${s.color}18;border-color:${s.color}33">
              <span style="font-size:20px">${s.icon}</span>
            </div>
            <div class="rtb-step-label">
              <div class="rtb-step-num" style="color:${s.color}">${t(s.title, s.titleZh)}</div>
              <div class="rtb-step-desc">${t(s.desc, s.descZh)}</div>
            </div>
            <div class="rtb-step-ms" style="color:${s.color}">t+${s.ms}</div>
            ${i < 4 ? `<div class="rtb-step-arrow" style="color:${s.color}">→</div>` : ''}
          </div>`).join('')}
        </div>
        <div style="text-align:center;margin-top:20px">
          <span style="display:inline-flex;align-items:center;gap:8px;font-size:13px;color:var(--text-muted);padding:8px 16px;background:rgba(52,211,153,0.06);border-radius:100px;border:1px solid rgba(52,211,153,0.15)">
            <span style="width:8px;height:8px;border-radius:50%;background:#34D399"></span>
            ${t('Total end-to-end: < 100ms guaranteed', '端到端总耗时：保证 < 100ms')}
          </span>
        </div>
      </div>
    </div>
  </section>

  <section class="section section-subtle">
    <div class="container">
      ${sectionTag('Privacy & Security','隐私与安全')}
      <h2 class="section-headline">${t('Built for the Privacy-First Era','为隐私优先时代而构建')}</h2>
      <div class="pillar-grid" style="margin-top:40px">
        ${[
          [gIcon('cookie','blue'),'rgba(37,99,235,0.12)','Cookieless Targeting','无Cookie定向','Contextual targeting, first-party data activation, and privacy-safe audience solutions without third-party cookies.','场景定向、第一方数据激活和无需第三方Cookie的隐私安全受众解决方案。'],
          [gIcon('clipboard','green'),'rgba(5,150,105,0.12)','Consent Management','同意管理','IAB TCF 2.2 compliant with automatic signal propagation across all NexBids transactions.','IAB TCF 2.2合规，在所有NexBids交易中自动传播信号。'],
          [gIcon('eye','purple'),'rgba(124,58,237,0.12)','Data Minimization','数据最小化','We collect only what is necessary. User-level data anonymized and purged per configurable retention policies.','我们只收集必要数据。用户级数据根据可配置保留策略进行匿名化和清除。'],
          [gIcon('globe','amber'),'rgba(245,158,11,0.12)','Global Compliance','全球合规','GDPR, CCPA/CPRA, PDPA, LGPD and emerging privacy regulations built into the platform natively.','GDPR、CCPA/CPRA、PDPA、LGPD和全球新兴隐私法规原生内置于平台。'],
          [gIcon('shield','red'),'rgba(239,68,68,0.12)','IVT & Fraud Prevention','IVT与欺诈防护','Pre-bid and post-bid IVT filtering. AI fraud detection >99.8% precision. IAS, DoubleVerify, MOAT integrations.','竞价前后IVT过滤。AI欺诈检测精度>99.8%。集成IAS、DoubleVerify、MOAT。'],
          [gIcon('lock','teal'),'rgba(16,185,129,0.12)','Enterprise Security','企业级安全','SOC 2 Type II certified. ISO 27001 compliant. TLS 1.3 in transit, AES-256 at rest.','SOC 2 Type II认证，ISO 27001合规。传输中TLS 1.3，静止AES-256加密。'],
        ].map(([icon,bg,en,zh,enD,zhD])=>pillarCard(icon,bg,en,zh,enD,zhD)).join('')}
      </div>
    </div>
  </section>

  ${ctaBand('Want to Go Deeper?','想深入了解？',
    'Our engineering team is happy to discuss the technical details of our infrastructure and integration options.',
    '我们的工程团队很乐意讨论基础设施的技术细节和集成选项。',
    'Talk to Engineering','与工程团队交流','View API Docs','查看API文档','resources')}`;
}

/* ─────────────────────────────────────────────
   RESOURCES PAGE
───────────────────────────────────────────── */
function renderResources() {
  const cats = [
    {icon:'📄', en:'Platform Documentation', zh:'平台文档', items:[
      ['NexBids DSP Quick Start Guide','DSP快速入门指南','Get your first campaign live in 30 minutes. Account setup, campaign creation, targeting, and launch.','30分钟内上线首个营销活动。账户设置、创建营销活动、定向和启动。','PDF + Online'],
      ['DSP Campaign Management Manual','DSP营销活动管理手册','Comprehensive reference for all DSP settings, bidding strategies, and reporting features.','DSP所有设置、竞价策略和报告功能的综合参考。','Online Doc'],
      ['DSP API Reference','DSP API参考','Full API documentation with interactive sandbox, authentication, rate limits, and code examples.','含交互沙盒、认证、速率限制和代码示例的完整API文档。','API Docs'],
      ['SSP Publisher Onboarding Guide','SSP发布商入职指南','Complete guide from account creation to first ad serving — web, app, and SDK.','从账户创建到首次广告投放的完整指南——网页、应用和SDK。','PDF + Online'],
      ['Header Bidding Integration (Prebid.js)','Prebid.js头部竞价集成','NexBids SSP as a Prebid.js demand partner. Configuration, parameters, and testing.','NexBids SSP作为Prebid.js需求合作伙伴。配置、参数和测试。','Online Doc'],
      ['iOS / Android SDK Integration Guides','iOS/Android SDK集成指南','Full SDK documentation for mobile developers — installation, formats, and testing.','面向移动开发者的完整SDK文档——安装、格式和测试。','Online Doc'],
      ['ADX Buyer Integration Guide (OpenRTB)','ADX买方集成指南（OpenRTB）','Connecting DSPs and bidders to NexBids ADX. OpenRTB endpoint specs and authentication.','将DSP和竞价者连接至NexBids ADX。OpenRTB端点规范和认证。','API Ref'],
    ]},
    {icon:'📚', en:'Best Practice Guides', zh:'最佳实践指南', items:[
      ['E-Commerce Programmatic Playbook','电商程序化手册','Prospecting, retargeting, dynamic product ads, ROAS optimization, and scaling strategies.','前瞻性、再营销、动态产品广告、ROAS优化和扩展策略。','42 pages'],
      ['Mobile App User Acquisition Playbook','移动应用用户获取手册','Acquire high-quality users for iOS and Android apps. Creative strategy, targeting, and measurement.','为iOS和Android应用获取高质量用户。创意策略、定向和衡量。','38 pages'],
      ['Gaming Advertiser Playbook','游戏广告主手册','Playable ads, SKAN campaigns, behavioral targeting for gamers, and LTV optimization.','可试玩广告、SKAN营销活动、游戏玩家行为定向和LTV优化。','30 pages'],
      ['Publisher Header Bidding Guide','发布商头部竞价指南','Prebid.js setup, demand partner selection, floor price strategy, and performance monitoring.','Prebid.js配置、需求合作伙伴选择、底价策略和性能监控。','36 pages'],
      ['App Ad Revenue Maximization Playbook','应用广告收益最大化手册','Ad format selection, placement best practices, rewarded video UX, and mediation strategy.','广告格式选择、广告位最佳实践、激励视频UX和聚合策略。','32 pages'],
      ['Agency Programmatic Operations Manual','代理商程序化运营手册','Campaign setup checklist, QA process, reporting templates, and client communication cadence.','营销活动设置清单、质量保证流程、报告模板和客户沟通节奏。','50 pages'],
    ]},
    {icon:'📊', en:'Industry Research & Reports', zh:'行业研究与报告', items:[
      ['Global Programmatic Landscape Report 2026','2026全球程序化广告格局报告','Annual comprehensive analysis of the global programmatic advertising market.','全球程序化广告市场年度综合分析。','68 pages'],
      ['The State of Mobile Advertising 2026','2026移动广告状况报告','Mobile advertising trends, user acquisition benchmarks, and privacy developments.','移动广告趋势、用户获取基准和隐私进展。','52 pages'],
      ['Publisher Revenue Optimization Benchmark 2026','2026发布商收益优化基准报告','eCPM benchmarks by vertical, geography, format, and device from anonymized SSP data.','基于匿名SSP数据的按垂直行业、地理、格式和设备的eCPM基准。','44 pages'],
      ['Cookieless Advertising Transition Report','无Cookie广告过渡报告','Advertiser readiness research and benchmark data on privacy-safe solution adoption.','广告主准备度研究和隐私安全解决方案采用基准数据。','40 pages'],
      ['Global Ad Fraud & Brand Safety Report 2026','2026全球广告欺诈与品牌安全报告','Ad fraud trends, IVT rates by channel, and brand safety incidents across programmatic.','广告欺诈趋势、按渠道的IVT率和程序化生态中的品牌安全事件。','36 pages'],
    ]},
    {icon:'🎓', en:'NexBids Academy', zh:'NexBids学院', items:[
      ['Programmatic Foundations Certificate','程序化基础证书','Beginner, 3 hrs. Introduction to programmatic, key players, ad formats, metrics.','初级，3小时。程序化广告入门、关键参与者、广告格式、指标。','Beginner · 3hr'],
      ['NexBids DSP Certified Professional','DSP认证专业人员','Intermediate, 8 hrs. 6 modules covering all DSP capabilities and best practices.','中级，8小时。涵盖所有DSP能力和最佳实践的6个模块。','Inter. · 8hr'],
      ['NexBids SSP Publisher Certification','SSP发布商认证','Intermediate, 6 hrs. From SSP setup to advanced yield optimization strategies.','中级，6小时。从SSP配置到高级收益优化策略。','Inter. · 6hr'],
      ['Advanced Programmatic Strategy Certificate','高级程序化策略证书','Advanced, 10 hrs. Bidding theory, ML optimization, and cookieless strategies.','高级，10小时。竞价理论、ML优化和无Cookie策略。','Adv. · 10hr'],
    ]},
  ];

  return `
  ${pageHeroLayout('var(--gradient-hero)', `
    ${sectionTag('Resources','资源文档')}
    <h1>${t('The NexBids Resource Center','NexBids 资源中心')}</h1>
    <p>${t('Everything you need to succeed in programmatic advertising — platform documentation, integration guides, industry research, and best practice playbooks.',
       '您在程序化广告中取得成功所需的一切——平台文档、集成指南、行业研究和最佳实践手册。')}</p>
  `, vizResources())}

  <section class="section section-subtle">
    <div class="container">
      ${cats.map(cat=>`
      <div style="margin-bottom:64px">
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:28px">
          <div style="font-size:28px">${cat.icon}</div>
          <h2 style="font-size:24px;font-weight:800">${t(cat.en,cat.zh)}</h2>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px">
          ${cat.items.map(([en,zh,enD,zhD,fmt])=>`
          <div class="resource-card">
            <div class="resource-icon">📄</div>
            <div style="flex:1">
              <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap">
                <h4>${t(en,zh)}</h4>
                <span style="font-size:12px;padding:3px 10px;background:var(--bg-light);border-radius:5px;color:var(--text-secondary);white-space:nowrap">${fmt}</span>
              </div>
              <p>${t(enD,zhD)}</p>
            </div>
            <button class="btn btn-secondary" style="padding:8px 16px;font-size:13px;flex-shrink:0" onclick="navigate('contact')">${t('Access','访问')}</button>
          </div>`).join('')}
        </div>
      </div>`).join('')}

      <div style="margin-bottom:64px">
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:28px">
          <div style="font-size:28px">🎙️</div>
          <h2 style="font-size:24px;font-weight:800">${t('Webinars & Events','网络研讨会与活动')}</h2>
        </div>
        <div class="card-grid card-grid-3">
          ${[
            ['Mar 25, 2026','2026年3月25日','Maximizing ROAS in a Privacy-First World','隐私优先时代的ROAS最大化','Emily Zhang, VP Advertiser Solutions','60 min'],
            ['Apr 2, 2026','2026年4月2日','Header Bidding Masterclass for Publishers','发布商头部竞价大师班','James Park, Director Publisher Partnerships','75 min'],
            ['Apr 15, 2026','2026年4月15日','CTV Advertising: The Programmatic Opportunity','CTV广告：程序化机遇','Marcus Thompson, Head of CTV','60 min'],
          ].map(([date,datezh,en,zh,speaker,dur])=>`
          <div class="card" style="display:flex;flex-direction:column">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
              <span style="font-size:13px;color:var(--primary-light);font-weight:600">${t(date,datezh)}</span>
              <span class="stat-badge" style="font-size:11px">${t('Upcoming','即将举行')}</span>
            </div>
            <h3 style="font-size:16px;font-weight:700;margin-bottom:8px;line-height:1.4">${t(en,zh)}</h3>
            <p style="font-size:13px;color:var(--text-secondary);margin-bottom:16px;flex:1">${speaker} · ${dur}</p>
            <button class="btn btn-primary" style="width:100%;padding:10px" onclick="navigate('contact')">${t('Register Now','立即注册')}</button>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </section>

  ${ctaBand("Can't Find What You're Looking For?","找不到您需要的内容？",
    'Our team is ready to provide personalized guidance, technical support, or custom research.',
    '我们的团队随时提供个性化指导、技术支持或定制研究。',
    'Contact Support','联系支持','Talk to a Specialist','与专家交谈','contact')}`;
}

/* ─────────────────────────────────────────────
   CASE STUDIES HUB
───────────────────────────────────────────── */
function renderCaseStudiesHub() {
  return `
  ${pageHeroLayout('var(--gradient-hero)', `
    ${sectionTag('Case Studies','客户案例')}
    <h1>${t('Real Results. Real Partners. Real Growth.','真实成果。真实伙伴。真实增长。')}</h1>
    <p>${t('Discover how global brands, app developers, publishers, and agencies use NexBids to drive measurable, sustainable growth.',
       '探索各行业的全球品牌、应用开发者、发布商和代理商如何使用NexBids推动可衡量、可持续的增长。')}</p>
  `, vizCaseStudiesHub())}

  ${metricsBand([
    ['$2.8B+','Advertiser Revenue Driven','广告主收益带动'],
    ['+47%','Avg ROAS Improvement Year 1','第一年平均ROAS提升'],
    ['+52%','Avg eCPM Lift for Publishers','发布商平均eCPM提升'],
    ['300+','Case Studies Globally','全球客户案例'],
  ])}

  <section class="section section-dark">
    <div class="container">
      ${sectionTag('Advertiser Cases','广告主案例')}
      <h2 class="section-headline">${t('How Advertisers Grow Faster with NexBids','广告主如何通过NexBids实现更快增长')}</h2>
      <div class="card-grid card-grid-3" style="margin-top:40px">
        ${[
          ['E-Commerce','电商','Global Fashion Brand — ROAS Transformation','全球时尚品牌——ROAS转型','Rebuilt audience strategy with DCO and AI bidding across 12 countries.','在12个国家以DCO和AI竞价重建受众策略。',['ROAS +200%','CPA -54%','Revenue +400%']],
          ['Mobile Gaming','移动游戏','Top Mobile RPG — Scale & Quality','顶级移动RPG——规模与质量','Acquired 2.3M high-quality players with playable ads and LTV bidding.','通过可试玩广告和LTV竞价获取了230万高质量玩家。',['2.3M Players','D30 Ret +38%','CPI -41%']],
          ['Utility App','工具应用','Productivity App — Global Expansion','生产力应用——全球扩张','Scaled from 3 markets to 28 while maintaining target CPA.','在保持目标CPA的同时从3个市场扩展到28个市场。',['28 Countries','CPA at Target','D7 Ret +22%']],
          ['Media & Entertainment','媒体与娱乐','Streaming Platform — Subscription Growth','流媒体平台——订阅增长','Trial-to-paid conversion driven by sequential video storytelling.','通过连续视频叙事推动免费试用到付费转化。',['Conv +67%','CAC -31%','LTV +44%']],
          ['Brand Awareness','品牌知名度','FMCG Brand — Digital Brand Building','快消品品牌——数字品牌建设','Upper-funnel programmatic video increased brand recall by 34%.','上漏斗程序化视频使品牌回忆率提升34%。',['Brand Recall +34%','VCR 78%','Reach 120M']],
          ['E-Commerce','电商','Home Goods — SEA Market Expansion','家居品牌——东南亚市场扩张','Entered 4 SEA markets simultaneously with zero prior brand awareness.','在零品牌知名度的情况下同时进入4个东南亚市场。',['4 Markets','CVR +186%','ROAS 3.8x']],
        ].map(([industry,industryZh,title,titleZh,desc,descZh,badges])=>`
        <div class="case-card" onclick="navigate('cases-advertiser')">
          <div class="case-card-top">
            <div class="case-industry">${t(industry,industryZh)}</div>
            <h3>${t(title,titleZh)}</h3>
            <p>${t(desc,descZh)}</p>
          </div>
          <div class="case-metrics">${badges.map(b=>`<span class="case-metric-badge">${b}</span>`).join('')}</div>
        </div>`).join('')}
      </div>
      <div style="text-align:center;margin-top:32px">
        <button class="btn btn-secondary" onclick="navigate('cases-advertiser')">${t('View All Advertiser Cases →','查看所有广告主案例 →')}</button>
      </div>
    </div>
  </section>

  <section class="section section-subtle">
    <div class="container">
      ${sectionTag('Publisher & Developer Cases','发布商与开发者案例','green')}
      <h2 class="section-headline">${t('How Publishers Maximize Revenue with NexBids','发布商如何通过NexBids最大化收益')}</h2>
      <div class="card-grid card-grid-3" style="margin-top:40px">
        ${[
          ['News Publisher','新闻发布商','Finance News Network — eCPM Growth','财经新闻网络——eCPM增长','Header bidding + AI floor pricing drove 67% eCPM lift and $2.4M incremental annual revenue.','头部竞价+AI底价推动eCPM提升67%，带来240万美元额外年收入。',['eCPM +67%','+$2.4M/yr','Fill +23%']],
          ['Mobile App','移动应用','Lifestyle App — Monetization Overhaul','生活方式应用——变现改造','SDK migration and rewarded video adoption tripled monthly ad revenue.','SDK迁移和激励视频采用使月广告收入翻三倍。',['Revenue x3','eCPM +89%','Retention +12%']],
          ['Mobile Gaming','移动游戏','Casual Game Studio — Revenue Maximization','休闲游戏工作室——收益最大化','Rewarded video optimization and mediation strategy delivered 145% revenue lift.','激励视频优化和聚合策略带来145%的收益提升。',['Revenue +145%','DAU +18%','eCPM +92%']],
        ].map(([industry,industryZh,title,titleZh,desc,descZh,badges])=>`
        <div class="case-card" onclick="navigate('cases-publisher')">
          <div class="case-card-top">
            <div class="case-industry" style="color:#34D399">${t(industry,industryZh)}</div>
            <h3>${t(title,titleZh)}</h3>
            <p>${t(desc,descZh)}</p>
          </div>
          <div class="case-metrics">${badges.map(b=>`<span class="case-metric-badge" style="background:rgba(5,150,105,0.08);color:#34D399;border-color:rgba(5,150,105,0.15)">${b}</span>`).join('')}</div>
        </div>`).join('')}
      </div>
      <div style="text-align:center;margin-top:32px">
        <button class="btn btn-secondary" onclick="navigate('cases-publisher')">${t('View All Publisher Cases →','查看所有发布商案例 →')}</button>
      </div>
    </div>
  </section>

  ${ctaBand('Want Results Like These?','想要获得这样的成果吗？',
    'Join thousands of advertisers and publishers already achieving breakthrough growth with NexBids.',
    '加入已经通过NexBids实现突破性增长的数千名广告主和发布商。',
    'Get Started','开始使用','Talk to Sales','联系销售','contact')}`;
}

/* ─────────────────────────────────────────────
   CASES — ADVERTISER DETAIL
───────────────────────────────────────────── */
function renderCasesAdvertiser() {
  return `
  ${pageHeroLayout('linear-gradient(135deg,rgba(37,99,235,0.1),var(--bg-dark))', `
    <div class="breadcrumb"><a onclick="navigate('case-studies')">${t('Case Studies','客户案例')}</a> › <span>${t('Advertiser Growth Cases','广告主增长案例')}</span></div>
    ${sectionTag('Advertiser Cases','广告主案例')}
    <h1>${t('How Advertisers Grow Faster with NexBids','广告主如何通过NexBids实现更快增长')}</h1>
    <p>${t('From global e-commerce brands scaling into new markets, to mobile gaming studios acquiring millions of engaged players — NexBids powers performance at every stage of growth.',
       '从进入新市场的全球电商品牌，到获取数百万高参与度玩家的移动游戏工作室——NexBids在增长的每个阶段驱动绩效。')}</p>
  `, vizAdvertiserCases())}

  <section class="section section-subtle">
    <div class="container">
      <div style="margin-bottom:72px">
        <div style="display:flex;gap:12px;align-items:center;margin-bottom:24px;flex-wrap:wrap">
          <span class="section-tag" style="margin:0">${t('E-Commerce — Fashion','电商——时尚')}</span>
          <span style="font-size:13px;color:var(--text-muted)">CS-ADV-EC-001 · US, UK, Germany, Australia</span>
        </div>
        <h2 style="font-size:28px;font-weight:800;margin-bottom:16px">${t('Global Fashion Brand — ROAS Transformation','全球时尚品牌——ROAS转型')}</h2>
        <p class="section-sub" style="margin-bottom:32px">${t('A fast-growing global fashion e-commerce brand operating in 12 countries transformed programmatic from a write-off into their fastest-growing revenue driver.',
           '一个在12个国家运营的快速成长全球时尚电商品牌，将程序化广告从被放弃的渠道转变为增长最快的收益驱动器。')}</p>
        <div class="card-grid card-grid-4" style="margin-bottom:32px">
          ${[['ROAS','1.4x → 4.2x','+200%'],['CPA (New Customers)','$68 → $31','-54%'],['Monthly Revenue','$420K → $2.1M','+400%'],['Markets','3 → 12','+300%']].map(([l,v,c])=>`
          <div class="card" style="text-align:center"><div style="font-size:13px;color:var(--text-secondary);margin-bottom:4px">${l}</div><div style="font-size:18px;font-weight:700">${v}</div><div class="stat-badge green" style="margin-top:8px;display:inline-flex">${c}</div></div>`).join('')}
        </div>
        <div class="quote-block">
          <blockquote>${t('"NexBids transformed programmatic from a channel we had written off into our fastest-growing revenue driver. The combination of their dynamic creative technology and AI bidding delivered ROAS we never thought achievable."',
            '"NexBids将程序化广告从我们已放弃的渠道转变为增长最快的收益驱动器。他们的动态创意技术和AI竞价的组合带来了我们认为无法实现的ROAS。"')}</blockquote>
          <cite>${t('— Chief Marketing Officer, Global Fashion E-Commerce Brand','— 首席营销官，全球时尚电商品牌')}</cite>
        </div>
      </div>

      <div style="margin-bottom:72px">
        <div style="display:flex;gap:12px;align-items:center;margin-bottom:24px;flex-wrap:wrap">
          <span class="section-tag" style="margin:0">${t('Mobile Gaming','移动游戏')}</span>
          <span style="font-size:13px;color:var(--text-muted)">CS-ADV-GM-001 · Southeast Asia, Japan, Korea</span>
        </div>
        <h2 style="font-size:28px;font-weight:800;margin-bottom:16px">${t('Top Mobile RPG — Scale & Quality Player Acquisition','顶级移动RPG——规模化高质量玩家获取')}</h2>
        <p class="section-sub" style="margin-bottom:32px">${t('A top-grossing mobile RPG studio needed to scale beyond their existing channels without sacrificing the player quality that drove their monetization.',
           '一家顶级收入移动RPG工作室需要超越现有渠道进行扩展，同时不牺牲推动变现的玩家质量。')}</p>
        <div class="card-grid card-grid-4" style="margin-bottom:32px">
          ${[['New Players','2.3M Acquired','High Quality'],['D30 Retention','Benchmark → +38%','+38%'],['CPI','Optimized','-41%'],['ROAS D180','LTV Positive','+156%']].map(([l,v,c])=>`
          <div class="card" style="text-align:center"><div style="font-size:13px;color:var(--text-secondary);margin-bottom:4px">${l}</div><div style="font-size:18px;font-weight:700">${v}</div><div class="stat-badge green" style="margin-top:8px;display:inline-flex">${c}</div></div>`).join('')}
        </div>
        <div class="quote-block">
          <blockquote>${t('"We\'d tried every major DSP and none could match the quality of players NexBids delivered. Their LTV Optimizer changed everything — we\'re now profitable on a D180 basis across all markets."',
            '"我们尝试过每一家主要DSP，没有一家能匹配NexBids带来的玩家质量。他们的LTV优化器改变了一切——我们现在在所有市场的D180基础上都是盈利的。"')}</blockquote>
          <cite>${t('— User Acquisition Lead, Top-5 Grossing Mobile RPG Studio','— 用户获取负责人，顶级移动RPG工作室')}</cite>
        </div>
      </div>

      <div>
        <div style="display:flex;gap:12px;align-items:center;margin-bottom:24px;flex-wrap:wrap">
          <span class="section-tag" style="margin:0">${t('Utility App','工具应用')}</span>
          <span style="font-size:13px;color:var(--text-muted)">CS-ADV-UT-001 · Global (28 markets)</span>
        </div>
        <h2 style="font-size:28px;font-weight:800;margin-bottom:16px">${t('Productivity App — From 3 Markets to Global','生产力应用——从3个市场到全球')}</h2>
        <p class="section-sub" style="margin-bottom:32px">${t('A productivity app needed a programmatic partner to support rapid global expansion from 3 to 28 markets while maintaining CPA targets.',
           '一款生产力应用需要程序化合作伙伴支持从3个市场扩展到28个市场的快速全球扩张，同时保持CPA目标。')}</p>
        <div class="card-grid card-grid-4" style="margin-bottom:32px">
          ${[['Markets','3 → 28','x9.3'],['Install Volume','Scaled Up','+340%'],['CPA','Maintained','On Target'],['D7 Retention','Improved','+22%']].map(([l,v,c])=>`
          <div class="card" style="text-align:center"><div style="font-size:13px;color:var(--text-secondary);margin-bottom:4px">${l}</div><div style="font-size:18px;font-weight:700">${v}</div><div class="stat-badge" style="margin-top:8px;display:inline-flex">${c}</div></div>`).join('')}
        </div>
      </div>
    </div>
  </section>

  ${ctaBand('Ready to Write Your Own Success Story?','准备好创造您自己的成功故事了吗？',
    'Talk to our team about how NexBids can drive results for your campaigns.',
    '与我们的团队讨论NexBids如何为您的营销活动带来成果。',
    'Contact Advertiser Sales','联系广告主销售','Explore DSP','探索DSP','products-dsp')}`;
}

/* ─────────────────────────────────────────────
   CASES — PUBLISHER DETAIL
───────────────────────────────────────────── */
function renderCasesPublisher() {
  return `
  ${pageHeroLayout('linear-gradient(135deg,rgba(5,150,105,0.1),var(--bg-dark))', `
    <div class="breadcrumb"><a onclick="navigate('case-studies')">${t('Case Studies','客户案例')}</a> › <span>${t('Publisher & Developer Growth Cases','发布商/开发者增长案例')}</span></div>
    ${sectionTag('Publisher Cases','发布商案例','green')}
    <h1>${t('How Publishers Maximize Revenue with NexBids','发布商如何通过NexBids最大化收益')}</h1>
    <p>${t('From independent news sites to mobile game studios — see how publishers across web, app, and gaming unlock their true revenue potential with NexBids SSP.',
       '从独立新闻网站到移动游戏工作室——了解网页、应用和游戏领域的发布商如何使用NexBids SSP释放真正的收益潜力。')}</p>
  `, vizPublisherCases())}

  <section class="section section-subtle">
    <div class="container">
      <div style="margin-bottom:72px">
        <div style="display:flex;gap:12px;align-items:center;margin-bottom:24px;flex-wrap:wrap">
          <span class="section-tag" style="margin:0;background:rgba(5,150,105,0.1);color:#34D399;border-color:rgba(5,150,105,0.2)">${t('News Publisher','新闻发布商')}</span>
          <span style="font-size:13px;color:var(--text-muted)">CS-PUB-WEB-001</span>
        </div>
        <h2 style="font-size:28px;font-weight:800;margin-bottom:16px">${t('Regional Finance News Network — eCPM Growth & Revenue Transformation','区域财经新闻网络——eCPM增长与收益转型')}</h2>
        <p class="section-sub" style="margin-bottom:32px">${t('A leading regional finance news platform migrated from a single SSP waterfall setup to NexBids header bidding, transforming their ad revenue performance in 90 days.',
           '一家领先的区域财经新闻平台从单一SSP瀑布流迁移至NexBids头部竞价，在90天内彻底改变了广告收益表现。')}</p>
        <div class="card-grid card-grid-4" style="margin-bottom:32px">
          ${[['eCPM Lift','+67%','vs. prior SSP'],['Incremental Revenue','+$2.4M','per year'],['Fill Rate','+23%','improvement'],['Page RPM','+71%','growth']].map(([l,v,s])=>`
          <div class="card" style="text-align:center"><div style="font-size:13px;color:var(--text-secondary);margin-bottom:4px">${l}</div><div style="font-size:28px;font-weight:900;color:#34D399">${v}</div><div style="font-size:12px;color:var(--text-muted);margin-top:4px">${s}</div></div>`).join('')}
        </div>
        <div class="quote-block" style="border-left-color:#059669">
          <blockquote>${t('"The NexBids header bidding implementation was transformative. Within 90 days, our CPMs had increased by 67% and our monthly revenue had grown by $200K. The yield optimization team was outstanding."',
            '"NexBids头部竞价实施是变革性的。在90天内，我们的CPM提升了67%，月收入增长了20万美元。收益优化团队非常出色。"')}</blockquote>
          <cite>${t('— Head of Digital Revenue, Regional Finance News Platform','— 数字收益负责人，区域财经新闻平台')}</cite>
        </div>
      </div>

      <div style="margin-bottom:72px">
        <div style="display:flex;gap:12px;align-items:center;margin-bottom:24px;flex-wrap:wrap">
          <span class="section-tag" style="margin:0;background:rgba(5,150,105,0.1);color:#34D399;border-color:rgba(5,150,105,0.2)">${t('Mobile App','移动应用')}</span>
          <span style="font-size:13px;color:var(--text-muted)">CS-PUB-APP-001 · 8M+ MAU</span>
        </div>
        <h2 style="font-size:28px;font-weight:800;margin-bottom:16px">${t('Lifestyle App — Monetization Overhaul via SDK Migration','生活方式应用——通过SDK迁移实现变现改造')}</h2>
        <p class="section-sub" style="margin-bottom:32px">${t('A popular lifestyle and wellness app with 8M+ MAU had been monetizing with banner ads only. NexBids SSP integration unlocked rewarded video and interstitial formats, tripling monthly revenue.',
           '一款拥有800万+月活用户的热门生活方式应用仅靠横幅广告变现。NexBids SSP集成解锁了激励视频和插页式格式，使月收入增长三倍。')}</p>
        <div class="card-grid card-grid-4" style="margin-bottom:32px">
          ${[['Monthly Revenue','Tripled','x3 growth'],['eCPM','+89%','improvement'],['User Retention','+12%','D28 lift'],['D28 ARPU','+156%','growth']].map(([l,v,s])=>`
          <div class="card" style="text-align:center"><div style="font-size:13px;color:var(--text-secondary);margin-bottom:4px">${l}</div><div style="font-size:28px;font-weight:900;color:#34D399">${v}</div><div style="font-size:12px;color:var(--text-muted);margin-top:4px">${s}</div></div>`).join('')}
        </div>
        <div class="quote-block" style="border-left-color:#059669">
          <blockquote>${t('"We were skeptical that adding rewarded video could increase revenue without hurting retention — NexBids proved us wrong on both counts. Revenue tripled and our retention actually improved."',
            '"我们对激励视频在不损害留存的情况下增加收益持怀疑态度——NexBids在两方面都证明我们错了。收入增长了三倍，留存率实际上也提高了。"')}</blockquote>
          <cite>${t('— Growth & Monetization Lead, Lifestyle Wellness App','— 增长与变现负责人，生活方式健康应用')}</cite>
        </div>
      </div>

      <div>
        <div style="display:flex;gap:12px;align-items:center;margin-bottom:24px;flex-wrap:wrap">
          <span class="section-tag" style="margin:0;background:rgba(5,150,105,0.1);color:#34D399;border-color:rgba(5,150,105,0.2)">${t('Mobile Gaming','移动游戏')}</span>
          <span style="font-size:13px;color:var(--text-muted)">CS-PUB-GAME-001</span>
        </div>
        <h2 style="font-size:28px;font-weight:800;margin-bottom:16px">${t('Casual Game Studio — Revenue Maximization via Rewarded Video','休闲游戏工作室——通过激励视频实现收益最大化')}</h2>
        <p class="section-sub" style="margin-bottom:32px">${t('A casual mobile game studio with 15M+ downloads integrated NexBids SSP across their portfolio, leveraging rewarded video optimization and mediation strategy for a 145% revenue lift.',
           '一家拥有1500万+下载量的休闲移动游戏工作室在其产品组合中集成了NexBids SSP，通过激励视频优化和聚合策略实现了145%的收益提升。')}</p>
        <div class="card-grid card-grid-4" style="margin-bottom:32px">
          ${[['Ad Revenue','+145%','lift'],['DAU','+18%','growth'],['eCPM','+92%','improvement'],['ARPDAU','+127%','increase']].map(([l,v,s])=>`
          <div class="card" style="text-align:center"><div style="font-size:13px;color:var(--text-secondary);margin-bottom:4px">${l}</div><div style="font-size:28px;font-weight:900;color:#34D399">${v}</div><div style="font-size:12px;color:var(--text-muted);margin-top:4px">${s}</div></div>`).join('')}
        </div>
      </div>
    </div>
  </section>

  ${ctaBand('Ready to Grow Your Revenue?','准备好增加您的收益了吗？',
    'Join 30,000+ publishers maximizing revenue with NexBids SSP.',
    '加入30,000+使用NexBids SSP最大化收益的发布商。',
    'Apply as Publisher','申请成为发布商','Explore SSP','探索SSP','products-ssp')}`;
}


/* ─────────────────────────────────────────────
   ABOUT US PAGE
───────────────────────────────────────────── */
function renderAbout() {
  const isCompanyPage = currentPage === 'company';
  const heroBg = isCompanyPage
    ? 'linear-gradient(135deg,rgba(124,58,237,0.14),rgba(37,99,235,0.10),var(--bg-dark))'
    : 'var(--gradient-hero)';
  const heroViz = isCompanyPage ? vizCompany() : vizAbout();
  return `
  ${pageHeroLayout(heroBg, `
    ${isCompanyPage
      ? sectionTag('NexBids Company','NexBids 公司','purple')
      : sectionTag('About NexBids','关于NexBids')}
    <h1>${isCompanyPage
      ? t('The Company Behind the World\'s Programmatic Infrastructure','驱动全球程序化基础设施的公司')
      : t('We Built NexBids to Make Programmatic Work for Everyone','我们创建NexBids，让程序化广告为每个人服务')}</h1>
    <p>${isCompanyPage
      ? t('From a bold founding vision in 2018 to a global ad tech leader serving 150+ countries — meet the team, the mission, and the values that power NexBids.',
          '从2018年的大胆创始愿景，到服务150+国家的全球广告技术领导者——了解驱动NexBids的团队、使命与价值观。')
      : t('From a small team with a big idea to a global ad tech company serving thousands of advertisers, publishers, and agencies in 150+ countries — this is the NexBids story.',
          '从一个拥有远大构想的小团队，到在150+国家服务数千名广告主、发布商和代理商的全球广告技术公司——这就是NexBids的故事。')}</p>
  `, heroViz)}

  ${metricsBand([
    ['2018','Founded','创立年份'],
    ['500+','Employees Globally','全球员工'],
    ['6','Global Offices','全球办公室'],
    ['150+','Countries Served','服务国家'],
  ])}

  <!-- Our Story -->
  <section class="section section-dark">
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start" class="home-tech-grid">
        <div>
          ${sectionTag('Our Story','我们的故事')}
          <h2 class="section-headline">${t('Building the Future of Programmatic Since 2018','自2018年以来构建程序化广告的未来')}</h2>
          <p style="color:var(--text-secondary);font-size:15px;line-height:1.8;margin-bottom:20px">${t('NexBids was founded in 2018 by a team of advertising technology veterans who had spent their careers at some of the world\'s largest ad tech companies. They saw firsthand how programmatic advertising remained unnecessarily complex, opaque, and inaccessible for the vast majority of advertisers and publishers.',
             'NexBids由一支广告技术老兵团队于2018年创立。他们亲眼看到，程序化广告尽管前途光明，但对于绝大多数本可从中受益的广告主和发布商而言，仍然不必要地复杂、不透明且难以接触。')}</p>
          <p style="color:var(--text-secondary);font-size:15px;line-height:1.8;margin-bottom:20px">${t('The founding vision: build a full-stack programmatic platform that combined the technological sophistication of enterprise incumbents with the accessibility, transparency, and partnership ethos that the market desperately needed.',
             '创立愿景：构建一个全栈程序化平台，将企业现有玩家的技术成熟度与市场迫切需要的可访问性、透明度和合作伙伴精神结合起来。')}</p>
          <p style="color:var(--text-secondary);font-size:15px;line-height:1.8">${t('Today, NexBids operates across 6 global offices, serves 2,000+ advertisers and 30,000+ publishers in 150+ countries, and processes 50B+ ad auctions daily.',
             '今天，NexBids在6个全球办公室运营，在150+国家服务2,000+广告主和30,000+发布商，每天处理500亿+广告拍卖。')}</p>
        </div>
        <div>
          ${sectionTag('Company Timeline','公司里程碑')}
          <div class="timeline">
            ${[
              ['2018','Founded — Core RTB infrastructure & ML foundation built.','创立——构建核心RTB基础设施和ML基础。'],
              ['2019','First Partnerships — Beta advertisers & publishers onboarded. London office opens.','首批合作伙伴——Beta广告主和发布商入驻。伦敦办公室开业。'],
              ['2020','DSP Launch — NexBids DSP goes to general availability. 50+ advertisers in H1.','DSP发布——NexBids DSP正式上线。上半年吸引50+广告主。'],
              ['2021','Full-Stack Platform — SSP & ADX launch. Singapore office opens.','全栈平台——SSP和ADX上线。新加坡办公室开业。'],
              ['2022','Scale Milestone — 10,000+ publishers. 100B+ daily bid requests. Tokyo & Beijing offices.','规模里程碑——1万+发布商，1000亿+日竞价请求，东京和北京开设办公室。'],
              ['2023','AI-First Initiative — Next-gen ML engine launched. Privacy Sandbox integration complete.','AI优先计划——下一代ML引擎发布，隐私沙盒集成完成。'],
              ['2024','50K Publisher Milestone — $500M+ advertiser spend managed annually.','5万发布商里程碑——每年管理5亿+美元广告支出。'],
              ['2025','CTV & Audio Expansion — Full CTV, programmatic audio, and DOOH capabilities.','CTV与音频扩展——完整CTV、程序化音频和DOOH能力。'],
              ['2026','Global Leadership — 50B+ daily impressions. Top 10 Global Ad Tech Platform.','全球领导地位——每日500亿+展示，跻身全球十大广告技术平台。'],
            ].map(([yr,en,zh])=>`
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-year">${yr}</div>
              <p>${t(en,zh)}</p>
            </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Mission & Values -->
  <section class="section section-subtle">
    <div class="container">
      ${sectionTag('Mission & Values','使命与价值观')}
      <h2 class="section-headline">${t('What We Stand For','我们的立场')}</h2>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:40px" class="home-tech-grid">
        <div>
          <h3 style="font-size:20px;font-weight:700;margin-bottom:12px;color:var(--primary-light)">${t('Our Mission','我们的使命')}</h3>
          <p style="color:var(--text-secondary);font-size:15px;line-height:1.8;margin-bottom:28px">${t('To democratize access to the world\'s best programmatic advertising technology — empowering every advertiser, publisher, and agency, regardless of size, to compete, grow, and succeed in the global digital economy.',
             '让全球最好的程序化广告技术人人可及——使每一位广告主、发布商和代理商，无论规模大小，都能在全球数字经济中竞争、成长和成功。')}</p>
          <h3 style="font-size:20px;font-weight:700;margin-bottom:12px;color:var(--primary-light)">${t('Our Vision','我们的愿景')}</h3>
          <p style="color:var(--text-secondary);font-size:15px;line-height:1.8">${t('A digital advertising ecosystem that is intelligent, transparent, efficient, and privacy-respecting — where every participant can trust that the technology is working for their benefit.',
             '一个智能、透明、高效且尊重隐私的数字广告生态系统——每个参与者都能信任技术在为自己的利益服务。')}</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px">
          ${[
            ['🤝','Partner Success First','合作伙伴成功第一','We measure our own success by the success of our partners. Every decision starts with: does this make our partners more successful?','我们通过合作伙伴的成功来衡量我们自己的成功。每个决策都从这个问题开始：这能让我们的合作伙伴更成功吗？'],
            ['🔍','Radical Transparency','极致透明','Complete transparency in pricing, data practices, auction mechanics, and reporting. Trust is the foundation of long-term partnership.','定价、数据实践、拍卖机制和报告方面的完全透明。信任是长期合作关系的基础。'],
            ['💡','Relentless Innovation','不懈创新','We invest heavily in R&D, move with urgency, and challenge the status quo continuously in the fastest-evolving tech sector.','我们在R&D上大量投资，以紧迫性行动，在最快速发展的技术领域持续挑战现状。'],
            ['🌍','Global Perspective','全球视角','We serve clients in 150+ countries. We embrace the diversity of markets, cultures, and approaches that makes our global team stronger.','我们服务150+国家的客户。我们拥抱市场、文化和方法的多样性，使我们的全球团队更强大。'],
          ].map(([icon,en,zh,enD,zhD])=>`
          <div style="display:flex;gap:14px;padding:16px;background:var(--bg-card);border:1px solid var(--border);border-radius:12px">
            <div style="font-size:22px;flex-shrink:0">${icon}</div>
            <div><h4 style="font-weight:700;font-size:15px;margin-bottom:4px">${t(en,zh)}</h4><p style="font-size:13px;color:var(--text-secondary)">${t(enD,zhD)}</p></div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </section>

  <!-- Leadership Team -->
  <section class="section section-dark">
    <div class="container">
      ${sectionTag('Leadership Team','领导团队')}
      <h2 class="section-headline">${t('The People Leading NexBids','领导NexBids的人才')}</h2>
      <div class="card-grid card-grid-3" style="margin-top:40px">
        ${[
          ['MW','Michael Wang','Michael Wang','Co-Founder & CEO','联合创始人兼CEO','18 years in programmatic advertising. Former VP Product at a leading global DSP. Stanford CS + Wharton MBA.','18年程序化广告经验，前领先全球DSP产品副总裁。斯坦福CS+沃顿MBA。'],
          ['SO','Sarah Okonkwo','Sarah Okonkwo','Co-Founder & CTO','联合创始人兼CTO','6 patents in RTB systems & audience modeling. PhD Computer Science (ML) from MIT. NexBids Privacy Engineering lead.','6项RTB系统和受众建模专利，MIT计算机科学（ML）博士，NexBids隐私工程负责人。'],
          ['DR','David Ramirez','David Ramirez','Chief Revenue Officer','首席营收官','Oversees global commercial operations. Former VP Americas Sales at major ad networks across NA and LATAM.','监督全球商业运营，前北美和拉美主要广告网络美洲销售VP。'],
          ['EZ','Emily Zhang','Emily Zhang','VP, Publisher Partnerships APAC','VP，亚太发布商合作伙伴','Leads publisher partnerships across APAC & China. 10 years mobile monetization at major Chinese internet company.','领导亚太和中国的发布商合作伙伴关系。在中国主要互联网公司有10年移动变现经验。'],
          ['JH','James Holloway','James Holloway','VP, Advertiser Solutions Europe','VP，欧洲广告主解决方案','Leads European advertiser team from London. Frequent speaker at DMEXCO and Programmatic IO Europe.','从伦敦领导欧洲广告主团队。DMEXCO和Programmatic IO Europe的常邀演讲嘉宾。'],
          ['PN','Priya Nair','Priya Nair','Chief Privacy Officer','首席隐私官','CIPP/E certified. Leads global privacy program. IAB Tech Lab Privacy Compliance Working Group member.','CIPP/E认证。领导全球隐私计划。IAB Tech Lab隐私合规工作组成员。'],
        ].map(([initials,en,zh,titleEn,titleZh,bioEn,bioZh])=>`
        <div class="team-card">
          <div class="team-avatar">${initials}</div>
          <h4>${t(en,zh)}</h4>
          <div class="team-title">${t(titleEn,titleZh)}</div>
          <p>${t(bioEn,bioZh)}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- Global Offices -->
  <section class="section section-subtle">
    <div class="container">
      ${sectionTag('Global Presence','全球影响力')}
      <h2 class="section-headline">${t('A Truly Global Company','一家真正意义上的全球公司')}</h2>
      <div class="card-grid card-grid-3" style="margin-top:40px">
        ${[
          ['🇺🇸','San Francisco, CA','旧金山','North America','北美市场','Engineering, Product, Corporate','工程、产品、企业运营'],
          ['🇪🇸','Barcelona, Spain','巴塞罗那','EMEA / Americas','欧美市场','Sales & Business Development','销售与商务拓展'],
          ['🇬🇧','London, UK','伦敦','EMEA','欧中东非市场','EMEA Sales, Partnerships, Marketing','欧中东非销售、合作和营销'],
          ['🇸🇬','Singapore','新加坡','APAC','亚太市场','APAC Sales, Partnerships, Engineering','亚太销售、合作和工程'],
          ['🇯🇵','Tokyo, Japan','东京','Japan','日本市场','Japan Sales, Publisher Partnerships','日本销售、发布商合作伙伴'],
          ['🇨🇳','Beijing, China','北京','China','中国市场','China Sales, Publisher Partnerships, Engineering','中国销售、发布商合作、工程'],
        ].map(([flag,en,zh,mktEn,mktZh,teamEn,teamZh])=>`
        <div class="office-card">
          <div style="font-size:24px;margin-bottom:10px">${flag}</div>
          <h4>${t(en,zh)}</h4>
          <div class="office-role">${t(mktEn,mktZh)}</div>
          <p>${t(teamEn,teamZh)}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- Awards -->
  <section class="section section-subtle">
    <div class="container">
      ${sectionTag('Recognition','行业认可')}
      <h2 class="section-headline" style="margin-bottom:32px">${t('Industry Awards & Recognition','行业奖项与认可')}</h2>
      <div class="award-list">
        ${[
          ['🏆','2025','Best DSP Platform — Programmatic IO Awards'],
          ['🏆','2025','Top Ad Tech Company to Watch — Digiday Tech Awards'],
          ['🏆','2024','Publisher\'s Choice SSP — AdExchanger Awards'],
          ['🏆','2024','Best Innovation in Programmatic — Campaign Tech Awards APAC'],
          ['🛡️','2023','TAG Certified Against Fraud — Trustworthy Accountability Group'],
          ['🌟','2023','Best Emerging Ad Tech Platform — DMEXCO Innovation Award'],
          ['🔒','2022','Privacy First Certification — IAB Tech Lab'],
        ].map(([icon,year,name])=>`
        <div class="award-badge">
          <div class="award-icon">${icon}</div>
          <div><div class="award-year">${year}</div><div class="award-name">${name}</div></div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  ${ctaBand('Ready to Work with NexBids?','准备好与NexBids合作了吗？',
    'Whether you\'re looking to start a campaign, monetize your traffic, or partner with us — we\'d love to hear from you.',
    '无论您是想开始营销活动、变现流量还是与我们合作——我们都很乐意听取您的消息。',
    'Contact Our Team','联系我们的团队','View Open Positions','查看开放职位','careers')}`;
}

/* ─────────────────────────────────────────────
   CAREERS PAGE
───────────────────────────────────────────── */
function renderCareers() {
  const jobs = [
    {dept:'Engineering & Data Science',deptZh:'工程与数据科学',roles:[
      ['Sr. Software Engineer, RTB Infrastructure','高级工程师，RTB基础设施','San Francisco / Remote (US)','旧金山/远程（美国）','Full-time'],
      ['Staff ML Engineer, Bid Price Prediction','Staff ML工程师，竞价价格预测','San Francisco / Remote (US/EU)','旧金山/远程（美国/欧洲）','Full-time'],
      ['Data Engineer, Real-Time Streaming','数据工程师，实时流处理','Singapore / Remote (APAC)','新加坡/远程（亚太）','Full-time'],
      ['Sr. ML Engineer, Fraud Detection','高级ML工程师，欺诈检测','London / Remote (EU)','伦敦/远程（欧洲）','Full-time'],
    ]},
    {dept:'Commercial & Growth',deptZh:'商业与增长',roles:[
      ['Account Executive, Advertiser Sales (EMEA)','客户主管，广告主销售（欧中东非）','London','伦敦','Full-time'],
      ['Publisher Development Manager (SEA)','发布商开发经理（东南亚）','Singapore','新加坡','Full-time'],
      ['Agency Partnerships Manager (North America)','代理商合作伙伴经理（北美）','Barcelona','巴塞罗那','Full-time'],
      ['Customer Success Manager, Advertisers','客户成功经理，广告主','San Francisco / Remote (US)','旧金山/远程（美国）','Full-time'],
      ['Business Development Manager, EMEA Expansion','商务拓展经理，EMEA市场扩张','Barcelona','巴塞罗那','Full-time'],
    ]},
    {dept:'Operations & Support',deptZh:'运营与支持',roles:[
      ['Technical Implementation Specialist, Publisher','技术实施专员，发布商','Singapore / Beijing','新加坡/北京','Full-time'],
      ['Campaign Operations Analyst','营销活动运营分析师','San Francisco / London','旧金山/伦敦','Full-time'],
    ]},
  ];

  return `
  ${pageHeroLayout('var(--gradient-hero)', `
    ${sectionTag('Careers','招贤纳士')}
    <h1>${t('Build the Future of Global Advertising Technology with Us','与我们一起构建全球广告技术的未来')}</h1>
    <p>${t('At NexBids, we\'re on a mission to make programmatic advertising smarter, faster, and more accessible for everyone. We need brilliant, curious, driven people to help us get there.',
       '在NexBids，我们的使命是让程序化广告对每个人来说更智能、更快速、更易获取。我们需要才华横溢、充满好奇心、充满动力的人来帮助我们实现这一目标。')}</p>
    <div class="btn-group">
      <button class="btn btn-primary" onclick="document.getElementById('open-roles').scrollIntoView({behavior:'smooth'})">${t('View Open Positions','查看开放职位')}</button>
      <button class="btn btn-secondary" onclick="navigate('about')">${t('Learn About Our Culture','了解我们的文化')}</button>
    </div>
  `, vizCareers())}
  <section class="section section-dark">
    <div class="container">
      ${sectionTag('Why NexBids?','为什么选择NexBids？')}
      <h2 class="section-headline">${t('6 Reasons to Join NexBids','加入NexBids的6大理由')}</h2>
      <div class="pillar-grid" style="margin-top:40px">
        ${[
          [gIcon('cpu','blue'),'rgba(37,99,235,0.12)','Hard Problems at Global Scale','在全球规模上解决困难问题','500B daily auctions. Millisecond latency. Trillion-event ML. Among the most technically demanding engineering challenges in the industry.','每天500亿次拍卖，毫秒级延迟，万亿事件ML。业内技术要求最高的工程挑战之一。'],
          [gIcon('rocket','green'),'rgba(5,150,105,0.12)','High Impact from Day One','从第一天起就有高影响力','Growth-stage company. Your work directly influences product direction, customer outcomes, and company growth.','成长期公司。您的工作直接影响产品方向、客户成果和公司增长。'],
          [gIcon('globe','purple'),'rgba(124,58,237,0.12)','Truly International Team','真正的国际化团队','500+ team members from 30+ nationalities across San Francisco, Barcelona, London, Singapore, Tokyo, and Beijing.','来自30+国籍的500+团队成员，分布在旧金山、巴塞罗那、伦敦、新加坡、东京和北京。'],
          [gIcon('book','amber'),'rgba(245,158,11,0.12)','Learn from the Best','向最优秀的人学习','Leadership from Google, The Trade Desk, DoubleClick, Criteo, and AppNexus. $2,000 annual learning budget per person.','领导层来自Google、The Trade Desk、DoubleClick、Criteo和AppNexus。每人每年2000美元学习预算。'],
          [gIcon('dollar','red'),'rgba(239,68,68,0.12)','Competitive Compensation & Equity','有竞争力的薪酬与股权','Market-rate salary, meaningful equity (options or RSUs), performance bonus, comprehensive health benefits.','市场竞争力薪资、有意义的股权（期权或RSU）、绩效奖金、全面健康福利。'],
          [gIcon('star','teal'),'rgba(16,185,129,0.12)','Work That Matters','有意义的工作','Our technology enables thousands of businesses to grow and independent publishers to sustain their work globally.','我们的技术使数千家企业得以成长，使全球独立发布商能够维持其工作。'],
        ].map(([icon,bg,en,zh,enD,zhD])=>pillarCard(icon,bg,en,zh,enD,zhD)).join('')}
      </div>
    </div>
  </section>

  <!-- Open Roles -->
  <section class="section section-subtle" id="open-roles">
    <div class="container">
      ${sectionTag('Open Positions','开放职位')}
      <h2 class="section-headline">${t('Current Openings','当前职位空缺')}</h2>
      <div style="margin-top:40px;display:flex;flex-direction:column;gap:40px">
        ${jobs.map(dept=>`
        <div>
          <h3 style="font-size:18px;font-weight:700;color:var(--primary-light);margin-bottom:16px">${t(dept.dept,dept.deptZh)}</h3>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${dept.roles.map(([en,zh,locEn,locZh,type])=>`
            <div class="job-card">
              <div class="job-card-header">
                <h4>${t(en,zh)}</h4>
                <a href="mailto:contact@nexbids.com?subject=Application: ${encodeURIComponent(en)}" class="job-apply">${t('Apply','申请')}</a>
              </div>
              <div class="job-meta">
                <span class="job-tag">📍 ${t(locEn,locZh)}</span>
                <span class="job-tag">⏰ ${type}</span>
              </div>
            </div>`).join('')}
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- Hiring Process -->
  <section class="section section-subtle">
    <div class="container">
      ${sectionTag('Hiring Process','招聘流程')}
      <h2 class="section-headline">${t('Our Hiring Process','我们的招聘流程')}</h2>
      <p class="section-sub" style="margin-bottom:40px">${t('We respect your time. Our process is efficient, transparent, and typically completes in 2–3 weeks.','我们尊重您的时间。我们的流程高效、透明，通常在2-3周内完成。')}</p>
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:16px" class="hiring-steps">
        ${[
          ['1','Application Review','申请审查','1–3 business days','1-3个工作日'],
          ['2','Intro Call','初步电话面试','30 minutes','30分钟'],
          ['3','Technical / Skills Interview','技术/技能面试','60–90 minutes','60-90分钟'],
          ['4','Team Interview','团队面试','90 minutes','90分钟'],
          ['5','Offer','录用通知','1–2 business days','1-2个工作日'],
        ].map(([n,en,zh,timeEn,timeZh])=>`
        <div class="card" style="text-align:center;padding:20px">
          <div style="width:36px;height:36px;background:var(--gradient-primary);border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;color:white;margin:0 auto 12px;font-size:15px">${n}</div>
          <h4 style="font-size:14px;font-weight:700;margin-bottom:6px">${t(en,zh)}</h4>
          <p style="font-size:12px;color:var(--text-muted)">${t(timeEn,timeZh)}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  ${ctaBand("Don't See a Role That Fits?","没有找到合适的职位？",
    "We're always looking for exceptional people. Send us your resume and tell us how you'd contribute to NexBids.",
    '我们始终在寻找优秀人才。发送您的简历，告诉我们您将如何为NexBids做出贡献。',
    'Send a Speculative Application','发送主动申请','View Company','了解公司','about')}`;
}

/* ─────────────────────────────────────────────
   CONTACT PAGE
───────────────────────────────────────────── */
function renderContact() {
  return `
  ${pageHeroLayout('var(--gradient-hero)', `
    ${sectionTag("Let's Talk","与我们交流")}
    <h1>${t("Let's Talk","与我们交流")}</h1>
    <p>${t("Whether you're ready to start a campaign, monetize your traffic, partner with us, or just want to learn more — we'd love to hear from you.",
       '无论您是准备启动营销活动、变现流量、与我们合作，还是只是想了解更多——我们都很乐意听取您的消息。')}</p>
  `, vizContact())}

  <!-- Contact Cards -->
  <section class="section section-dark">
    <div class="container">
      <div class="card-grid card-grid-3" style="margin-bottom:64px">
        ${[
          [
            `<span class="gi gi-blue gi-lg"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="1.8"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg></span>`,
            'I want to advertise with NexBids','我想在NexBids投放广告','Speak with our advertiser sales team about launching campaigns, pricing, or getting a platform demo.','与我们的广告主销售团队交流，了解启动营销活动、定价或获取平台演示。','Contact Advertiser Sales','联系广告主销售','1 business day','1个工作日'],
          [
            `<span class="gi gi-green gi-lg"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34D399" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></span>`,
            'I want to monetize my traffic','我想变现我的流量','Connect with our publisher partnerships team to discuss SSP integration and monetization strategy.','联系我们的发布商合作伙伴团队，讨论SSP集成和变现策略。','Contact Publisher Team','联系发布商团队','1 business day','1个工作日'],
          [
            `<span class="gi gi-purple gi-lg"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C084FC" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></span>`,
            'I\'m an agency looking to partner','我是一家代理商，希望合作','Talk to our agency partnerships team about commercial arrangements and platform access.','与我们的代理商合作伙伴团队交流商业安排和平台访问。','Contact Agency Partnerships','联系代理商合作伙伴','1 business day','1个工作日'],
          [
            `<span class="gi gi-amber gi-lg"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FCD34D" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17" stroke-width="2.5" stroke-linecap="round"/></svg></span>`,
            'I need technical support','我需要技术支持','For platform issues, integration questions, or bug reports. Priority support for existing clients.','针对平台问题、集成疑问或缺陷报告。现有客户享受优先支持。','Open Support Ticket','提交支持工单','P1 < 1hr, Std < 4hrs','P1 <1小时，标准 <4小时'],
          [
            `<span class="gi gi-teal gi-lg"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" stroke-width="1.8"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6z"/></svg></span>`,
            'Media & Press Inquiries','媒体与新闻咨询','For journalists, analysts, and media professionals seeking comment, data, or speaking opportunities.','面向寻求评论、数据或演讲机会的记者、分析师和媒体专业人士。','Contact Press Team','联系公关团队','24 hours','24小时'],
          [
            `<span class="gi gi-neutral gi-lg"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="9" y1="10" x2="9" y2="10" stroke-width="2.5" stroke-linecap="round"/><line x1="12" y1="10" x2="12" y2="10" stroke-width="2.5" stroke-linecap="round"/><line x1="15" y1="10" x2="15" y2="10" stroke-width="2.5" stroke-linecap="round"/></svg></span>`,
            'Something else?','其他问题？','For any other questions, partnership ideas, or feedback. We read everything.','任何其他问题、合作想法或反馈。我们会阅读所有内容。','Send a Message','发送消息','2 business days','2个工作日'],
        ].map(([icon,en,zh,enD,zhD,ctaEn,ctaZh,respEn,respZh])=>`
        <div class="contact-card" style="display:flex;flex-direction:column">
          <div class="contact-icon" style="font-size:inherit;margin-bottom:16px">${icon}</div>
          <h3>${t(en,zh)}</h3>
          <p style="flex:1">${t(enD,zhD)}</p>
          <button class="btn btn-primary" style="width:100%;margin-bottom:10px" onclick="document.getElementById('contactFormSection').scrollIntoView({behavior:'smooth'})">${t(ctaEn,ctaZh)}</button>
          <div class="contact-response">${t('Typical response:','典型响应时间：')} ${t(respEn,respZh)}</div>
        </div>`).join('')}
      </div>

      <!-- Contact Form — full width, centered -->
      <div id="contactFormSection" style="max-width:680px;margin:0 auto">
        <div style="text-align:center;margin-bottom:36px">
          <h2 class="section-headline" style="margin-bottom:12px">${t('Send Us a Message','发送消息')}</h2>
          <p style="color:var(--text-secondary)">${t("Fill out the form and we'll get back to you within 1 business day.",'填写表格，我们将在1个工作日内回复您。')}</p>
        </div>
        <div class="contact-form" id="contactFormWrap">
          <div class="form-row">
            <div class="form-group">
              <label>${t('First Name','名字')} *</label>
              <input type="text" placeholder="${currentLang==='zh'?'张':'John'}">
            </div>
            <div class="form-group">
              <label>${t('Last Name','姓氏')} *</label>
              <input type="text" placeholder="${currentLang==='zh'?'伟':'Smith'}">
            </div>
          </div>
          <div class="form-group">
            <label>${t('Business Email','工作邮箱')} *</label>
            <input type="email" placeholder="you@company.com">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>${t('Company Name','公司名称')} *</label>
              <input type="text" placeholder="${currentLang==='zh'?'您的公司':'Your Company'}">
            </div>
            <div class="form-group">
              <label>${t('Country','国家')} *</label>
              <div class="country-select-wrap">
                <input type="text" class="country-search-input country-single" id="countrySearch" placeholder="${currentLang==='zh'?'搜索或选择国家...':'Search or select country...'}" autocomplete="off" oninput="filterCountries(this.value)" onfocus="openCountryDropdown()" onblur="setTimeout(()=>closeCountryDropdown(),200)">
                <div class="country-dropdown-list" id="countryDropdown"></div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label>${t('I am a','我是')} *</label>
            <select>
              <option value="">${currentLang==='zh'?'请选择...':'Select...'}</option>
              <option value="advertiser">${currentLang==='zh'?'广告主':'Advertiser'}</option>
              <option value="publisher">${currentLang==='zh'?'发布商或开发者':'Publisher or Developer'}</option>
              <option value="agency">${currentLang==='zh'?'代理商':'Agency'}</option>
              <option value="press">${currentLang==='zh'?'媒体/分析师':'Press / Analyst'}</option>
              <option value="other">${currentLang==='zh'?'其他':'Other'}</option>
            </select>
          </div>
          <div class="form-group">
            <label>${t('How can we help?','我们能为您做什么？')} *</label>
            <textarea placeholder="${currentLang==='zh'?'告诉我们您的需求...':'Tell us about your needs...'}"></textarea>
          </div>
          <div class="form-check" style="margin-bottom:20px">
            <input type="checkbox" id="privacyCheck">
            <label for="privacyCheck" style="font-size:13px;color:var(--text-secondary)">${t('I agree to NexBids\'','我同意NexBids的')} <a href="#" onclick="openPrivacyModal(event)" style="color:var(--primary-light);text-decoration:underline">${t('Privacy Policy','隐私政策')}</a> ${t('and consent to being contacted.','并同意被联系。')}</label>
          </div>
          <button class="btn btn-primary" style="width:100%;justify-content:center" onclick="submitContactForm(event)">${t('Send Message','发送消息')}</button>
        </div>
        <div id="contactSuccessMsg" style="display:none;text-align:center;padding:32px;background:rgba(5,150,105,0.1);border:1px solid rgba(52,211,153,0.25);border-radius:16px;margin-top:24px">
          <div style="font-size:40px;margin-bottom:12px">✅</div>
          <h3 style="font-size:20px;font-weight:700;color:#34D399;margin-bottom:8px">${t('Message Sent Successfully!','消息发送成功！')}</h3>
          <p style="color:var(--text-secondary)">${t("Thank you! We'll get back to you within 1 business day.",'感谢您的留言！我们将在1个工作日内回复您。')}</p>
        </div>
      </div>
    </div>
  </section>`;
}

/* ─────────────────────────────────────────────
   COUNTRY DATA & DROPDOWN
───────────────────────────────────────────── */
const ALL_COUNTRIES = [
  'Afghanistan','Albania','Algeria','Andorra','Angola','Argentina','Armenia','Australia',
  'Austria','Azerbaijan','Bahrain','Bangladesh','Belarus','Belgium','Bolivia','Bosnia & Herzegovina',
  'Brazil','Bulgaria','Cambodia','Canada','Chile','China / 中国','Colombia','Croatia',
  'Czech Republic','Denmark','Ecuador','Egypt','Estonia','Ethiopia','Finland','France',
  'Georgia','Germany','Ghana','Greece','Guatemala','Hong Kong (SAR)','Hungary','India',
  'Indonesia','Iran','Iraq','Ireland','Israel','Italy','Japan','Jordan','Kazakhstan',
  'Kenya','Kuwait','Latvia','Lebanon','Libya','Lithuania','Luxembourg','Malaysia',
  'Mexico','Morocco','Myanmar','Nepal','Netherlands','New Zealand','Nigeria','North Korea',
  'Norway','Oman','Pakistan','Peru','Philippines','Poland','Portugal','Qatar',
  'Romania','Russia','Saudi Arabia','Senegal','Serbia','Singapore','Slovakia','Slovenia',
  'South Africa','South Korea','Spain','Sri Lanka','Sweden','Switzerland','Taiwan',
  'Thailand','Tunisia','Turkey','Ukraine','United Arab Emirates','United Kingdom',
  'United States','Uzbekistan','Venezuela','Vietnam','Yemen','Zimbabwe','Other',
];

function filterCountries(q) {
  const dropdown = document.getElementById('countryDropdown');
  if (!dropdown) return;
  const filtered = q ? ALL_COUNTRIES.filter(c => c.toLowerCase().includes(q.toLowerCase())) : ALL_COUNTRIES;
  dropdown.innerHTML = filtered.map(c =>
    `<div class="country-option" onmousedown="selectCountry('${c.replace(/'/g,"\\\'")}')">${c}</div>`
  ).join('');
  dropdown.classList.add('open');
}

function openCountryDropdown() {
  filterCountries(document.getElementById('countrySearch')?.value || '');
}

function closeCountryDropdown() {
  document.getElementById('countryDropdown')?.classList.remove('open');
}

function selectCountry(name) {
  const search = document.getElementById('countrySearch');
  const dropdown = document.getElementById('countryDropdown');
  if (search) { search.value = name; search.setAttribute('data-selected', name); }
  if (dropdown) dropdown.classList.remove('open');
}

/* ─────────────────────────────────────────────
   CONTACT FORM SUBMIT
───────────────────────────────────────────── */
function submitContactForm(e) {
  e.preventDefault();
  const wrap = document.getElementById('contactFormWrap');
  const successMsg = document.getElementById('contactSuccessMsg');
  if (!wrap || !successMsg) return;
  // Basic validation: check required inputs are filled
  const inputs = wrap.querySelectorAll('input[type="text"], input[type="email"]');
  let valid = true;
  inputs.forEach(inp => {
    if (!inp.value.trim()) { inp.style.borderColor = '#F87171'; valid = false; }
    else inp.style.borderColor = '';
  });
  const privacy = wrap.querySelector('#privacyCheck');
  if (privacy && !privacy.checked) {
    privacy.parentElement.style.outline = '1px solid #F87171';
    valid = false;
  } else if (privacy) {
    privacy.parentElement.style.outline = '';
  }
  if (!valid) return;
  // Hide form, show success
  wrap.style.display = 'none';
  successMsg.style.display = 'block';
  successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/* ─────────────────────────────────────────────
   PRIVACY POLICY MODAL
───────────────────────────────────────────── */
function openPrivacyModal(e) {
  if (e) e.preventDefault();
  const isZh = currentLang === 'zh';
  const modal = document.createElement('div');
  modal.className = 'modal-backdrop';
  modal.id = 'privacyModal';
  modal.onclick = (ev) => { if (ev.target === modal) closePrivacyModal(); };
  modal.innerHTML = `
  <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="privacyTitle">
    <div class="modal-header">
      <h2 id="privacyTitle">${isZh ? 'NexBids 隐私政策' : 'NexBids Privacy Policy'}</h2>
      <button class="modal-close" onclick="closePrivacyModal()" aria-label="Close">✕</button>
    </div>
    <div class="modal-body">
      ${isZh ? `
      <p><strong>最后更新日期：</strong>2026年3月</p>
      <h3>1. 概述</h3>
      <p>NexBids Inc.（"NexBids"、"我们"）致力于保护您的个人信息。本隐私政策说明我们在您使用nexbids.com及相关服务时如何收集、使用、披露和保护您的个人数据。</p>
      <h3>2. 我们收集的信息</h3>
      <p>我们可能收集以下类别的信息：</p>
      <ul>
        <li><strong>身份信息：</strong>姓名、职务、公司名称</li>
        <li><strong>联系信息：</strong>电子邮件地址、电话号码</li>
        <li><strong>使用数据：</strong>IP地址、浏览器类型、访问页面、访问时间戳</li>
        <li><strong>广告数据：</strong>通过我们平台处理的出价请求、展示及点击数据</li>
        <li><strong>通信记录：</strong>您与我们的往来邮件、支持工单内容</li>
      </ul>
      <h3>3. 信息使用方式</h3>
      <p>我们将您的信息用于以下目的：</p>
      <ul>
        <li>提供、运营和改进我们的服务</li>
        <li>处理商业询盘及合同履行</li>
        <li>发送服务通知、安全警报及支持消息</li>
        <li>遵守适用法律法规要求</li>
        <li>防范欺诈及保障平台安全</li>
      </ul>
      <h3>4. 信息共享</h3>
      <p>我们不会出售您的个人数据。我们仅在以下情况下共享信息：（a）经您明确同意；（b）与协助我们运营服务的受信任服务商共享（受保密协议约束）；（c）法律要求时。</p>
      <h3>5. 数据跨境传输</h3>
      <p>作为全球运营公司，您的数据可能被传输至您所在国家/地区以外的服务器。我们依据适用法规（包括GDPR标准合同条款）采取适当保障措施。</p>
      <h3>6. Cookie与追踪技术</h3>
      <p>我们的网站使用必要Cookie（用于网站功能）、分析Cookie（用于了解使用情况）及广告Cookie（用于程序化广告服务）。您可通过浏览器设置管理Cookie偏好。</p>
      <h3>7. 数据保留</h3>
      <p>我们仅在实现本政策所述目的所必要的时间内保留您的个人数据，或根据法律规定保留更长时间。</p>
      <h3>8. 您的权利</h3>
      <p>根据适用法律（包括GDPR、CCPA及中国个人信息保护法），您可能享有以下权利：访问权、更正权、删除权、限制处理权、数据可携权及拒绝权。如需行使上述权利，请通过contact@nexbids.com联系我们。</p>
      <h3>9. 安全措施</h3>
      <p>我们采用行业标准的技术和组织安全措施，包括数据加密（传输中和静态）、访问控制、定期安全审计及ISO 27001合规实践。</p>
      <h3>10. 儿童隐私</h3>
      <p>我们的服务面向商业用户，不面向16岁以下儿童。我们不会故意收集儿童个人信息。</p>
      <h3>11. 政策变更</h3>
      <p>我们可能不时更新本隐私政策。重大变更将通过电子邮件或网站显著位置通知您。继续使用我们的服务即视为接受更新后的政策。</p>
      <h3>12. 联系我们</h3>
      <p>如对本隐私政策有任何疑问，请联系：<br>数据保护官，NexBids Inc.<br>contact@nexbids.com</p>
      ` : `
      <p><strong>Last Updated:</strong> March 2026</p>
      <h3>1. Overview</h3>
      <p>NexBids Inc. ("NexBids," "we," "us") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal data when you use nexbids.com and related services.</p>
      <h3>2. Information We Collect</h3>
      <p>We may collect the following categories of information:</p>
      <ul>
        <li><strong>Identity Data:</strong> Name, job title, company name</li>
        <li><strong>Contact Data:</strong> Email address, phone number</li>
        <li><strong>Usage Data:</strong> IP address, browser type, pages visited, timestamps</li>
        <li><strong>Advertising Data:</strong> Bid requests, impressions, and click data processed through our platforms</li>
        <li><strong>Communications:</strong> Email correspondence and support ticket content</li>
      </ul>
      <h3>3. How We Use Your Information</h3>
      <p>We use your information to:</p>
      <ul>
        <li>Provide, operate, and improve our services</li>
        <li>Process business inquiries and fulfill contracts</li>
        <li>Send service notifications, security alerts, and support messages</li>
        <li>Comply with applicable laws and regulations</li>
        <li>Prevent fraud and maintain platform security</li>
      </ul>
      <h3>4. Information Sharing</h3>
      <p>We do not sell your personal data. We share information only: (a) with your explicit consent; (b) with trusted service providers who assist us in operating our services (subject to confidentiality agreements); or (c) when required by law.</p>
      <h3>5. International Data Transfers</h3>
      <p>As a global company, your data may be transferred to servers outside your country. We implement appropriate safeguards under applicable regulations, including GDPR Standard Contractual Clauses.</p>
      <h3>6. Cookies & Tracking Technologies</h3>
      <p>Our website uses necessary cookies (for site functionality), analytics cookies (to understand usage), and advertising cookies (for programmatic advertising services). You may manage cookie preferences through your browser settings.</p>
      <h3>7. Data Retention</h3>
      <p>We retain your personal data only as long as necessary for the purposes outlined in this policy, or as required by applicable law.</p>
      <h3>8. Your Rights</h3>
      <p>Under applicable law (including GDPR, CCPA, and China PIPL), you may have rights to access, correct, delete, restrict processing of, port, and object to processing of your data. To exercise these rights, contact us at contact@nexbids.com.</p>
      <h3>9. Security</h3>
      <p>We employ industry-standard technical and organizational security measures including data encryption (in transit and at rest), access controls, regular security audits, and ISO 27001-aligned practices.</p>
      <h3>10. Children's Privacy</h3>
      <p>Our services are intended for business users and are not directed at children under 16. We do not knowingly collect personal information from children.</p>
      <h3>11. Policy Updates</h3>
      <p>We may update this Privacy Policy from time to time. Material changes will be communicated via email or a prominent notice on our website. Continued use of our services constitutes acceptance of the updated policy.</p>
      <h3>12. Contact Us</h3>
      <p>For questions about this Privacy Policy, please contact:<br>Data Protection Officer, NexBids Inc.<br>contact@nexbids.com</p>
      `}
    </div>
    <div class="modal-footer-bar">
      <button class="btn btn-primary" onclick="closePrivacyModal()" style="padding:10px 28px">${isZh ? '关闭' : 'Close'}</button>
    </div>
  </div>`;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
}

function closePrivacyModal() {
  const modal = document.getElementById('privacyModal');
  if (modal) { modal.remove(); document.body.style.overflow = ''; }
}

/* ─────────────────────────────────────────────
   LOGIN PAGE
───────────────────────────────────────────── */
function renderLogin(platform) {
  const cfg = {
    dsp: {
      class:'dsp', badge:'DSP', badgeColor:'#60A5FA',
      titleEn:'NexBids DSP', titleZh:'NexBids DSP',
      subtitleEn:'Demand-Side Platform', subtitleZh:'需求方平台',
      taglineEn:'Reach the world. Drive results.', taglineZh:'触达全球。驱动成果。',
      stats:[['50K+','Active Advertisers','活跃广告主'],['150+','Countries','国家'],['$12B+','Annual Spend','年支出']],
      quoteEn:'"NexBids DSP helped us achieve 4.2x ROAS across our global campaigns."',
      quoteZh:'"NexBids DSP帮助我们在全球营销活动中实现了4.2x ROAS。"',
      quoteByEn:'— Head of Performance Marketing, Global E-Commerce Brand',
      quoteByZh:'— 绩效营销负责人，全球电商品牌',
      headingEn:'Sign in to NexBids DSP', headingZh:'登录 NexBids DSP',
      newLinkEn:'New to NexBids DSP? Contact Sales', newLinkZh:'NexBids DSP新用户？联系销售',
    },
    ssp: {
      class:'ssp', badge:'SSP', badgeColor:'#34D399',
      titleEn:'NexBids SSP', titleZh:'NexBids SSP',
      subtitleEn:'Supply-Side Platform', subtitleZh:'供应方平台',
      taglineEn:'More demand. More revenue. More control.', taglineZh:'更多需求。更多收益。更多控制。',
      stats:[['+52%','Avg eCPM Lift','平均eCPM提升'],['30K+','Publishers','发布商'],['99.5%+','Fill Rate','填充率']],
      quoteEn:'"Migrating to NexBids SSP increased our monthly ad revenue by 328% in 90 days."',
      quoteZh:'"迁移至NexBids SSP在90天内使我们的月广告收入增长了328%。"',
      quoteByEn:'— CEO, Independent Finance News Platform',
      quoteByZh:'— CEO，独立财经新闻平台',
      headingEn:'Sign in to NexBids SSP', headingZh:'登录 NexBids SSP',
      newLinkEn:'New publisher? Start Monetizing', newLinkZh:'新发布商？开始变现',
    },
    adx: {
      class:'adx', badge:'ADX', badgeColor:'#A78BFA',
      titleEn:'NexBids ADX', titleZh:'NexBids ADX',
      subtitleEn:'Ad Exchange', subtitleZh:'广告交易中枢',
      taglineEn:"The world's most transparent programmatic marketplace.", taglineZh:'全球最透明的程序化广告市场。',
      stats:[['50B+','Daily Auctions','日竞价'],['<100ms','Latency','延迟'],['10K+','Partners','合作伙伴']],
      quoteEn:'50B+ Daily Impressions | <100ms Latency | 99.9% Uptime',
      quoteZh:'每日展示500亿+ | 延迟<100ms | 可用性99.9%',
      quoteByEn:'', quoteByZh:'',
      headingEn:'Sign in to NexBids ADX', headingZh:'登录 NexBids ADX',
      newLinkEn:'New ADX partner? Contact ADX Team', newLinkZh:'新ADX合作伙伴？联系ADX团队',
    },
  };
  const c = cfg[platform];
  return `
  <div class="login-page">
    <div class="login-left ${c.class}">
      <a onclick="navigate('home')" style="font-size:13px;color:var(--text-muted);margin-bottom:40px;display:inline-block">← ${t('Back to nexbids.com','返回 nexbids.com')}</a>
      <div class="login-platform-badge" style="background:rgba(255,255,255,0.08);color:${c.badgeColor}">
        ${c.badge} — ${t(c.subtitleEn, c.subtitleZh)}
      </div>
      <h2>${t(c.taglineEn, c.taglineZh)}</h2>
      <p>${t('Welcome back to '+c.titleEn+'. The programmatic platform trusted by thousands of global partners.','欢迎回到'+c.titleZh+'。受全球数千名合作伙伴信赖的程序化广告平台。')}</p>
      <div class="login-stat-row">
        ${c.stats.map(([n,en,zh])=>`<div class="login-stat"><strong>${n}</strong>${t(en,zh)}</div>`).join('')}
      </div>
      <div style="margin-top:36px;padding:20px;background:rgba(255,255,255,0.04);border-radius:12px;border:1px solid rgba(255,255,255,0.08)">
        <p style="font-style:italic;color:var(--text-secondary);font-size:15px;line-height:1.7;margin-bottom:${c.quoteByEn?'12px':'0'}">${t(c.quoteEn,c.quoteZh)}</p>
        ${c.quoteByEn?`<p style="font-size:13px;color:var(--text-muted)">${t(c.quoteByEn,c.quoteByZh)}</p>`:''}
      </div>
    </div>
    <div class="login-right">
      <div class="login-form-wrap">
        <div style="margin-bottom:24px">
          <svg class="nexbids-logo" width="138" height="29" viewBox="0 0 164 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="29" font-family="Inter,Arial Black,system-ui,sans-serif" font-size="34" font-weight="900" fill="#1650F5" letter-spacing="-2">Nex</text>
            <text x="64" y="29" font-family="Inter,Arial Black,system-ui,sans-serif" font-size="34" font-weight="900" fill="#1650F5" letter-spacing="-2">B</text>
            <polygon points="71,4 64,20 76,12" fill="#8B2EFF"/>
            <text x="84" y="29" font-family="Inter,Arial Black,system-ui,sans-serif" font-size="34" font-weight="900" fill="#1650F5" letter-spacing="-2">ids</text>
            <rect x="154" y="1" width="9" height="9" rx="2" fill="#8B2EFF"/>
          </svg>
        </div>
        <h3>${t(c.headingEn,c.headingZh)}</h3>
        <p>${t('Enter your credentials to access the platform.','输入您的凭据以访问平台。')}</p>
        <div class="form-group">
          <label>${t('Email Address','邮箱地址')}</label>
          <input type="email" placeholder="you@company.com">
        </div>
        <div class="form-group">
          <label>${t('Password','密码')}</label>
          <div class="pw-wrap">
            <input type="password" id="pwInput_${platform}" placeholder="••••••••">
            <button type="button" class="pw-toggle" id="pwToggle_${platform}" onclick="togglePassword('${platform}')" aria-label="Toggle password visibility">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" id="pwIcon_${platform}"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
        </div>
        <div style="margin-bottom:20px">
          <label style="display:flex;align-items:center;gap:8px;font-size:13px;color:var(--text-secondary);cursor:pointer">
            <input type="checkbox"> ${t('Remember me','记住我')}
          </label>
        </div>
        <button class="btn btn-primary" style="width:100%;justify-content:center;font-size:15px" onclick="handleLoginSubmit(this,'${platform}')">${t('Sign In','登录')}</button>
        <div class="login-links" style="margin-top:20px">
          <a onclick="navigate('contact')" style="color:var(--text-muted);font-size:13px">${t(c.newLinkEn,c.newLinkZh)}</a>
          <a onclick="navigate('contact')" style="color:var(--primary-light);font-size:13px;cursor:pointer">${t('Help','帮助')}</a>
        </div>
      </div>
    </div>
  </div>`;
}

/* ─────────────────────────────────────────────
   SCROLL & INIT
───────────────────────────────────────────── */
function initScrollSpy() {
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.removeEventListener('scroll', window._nexScrollHandler);
  window._nexScrollHandler = onScroll;
  window.addEventListener('scroll', onScroll);
}

/* ─────────────────────────────────────────────
   COUNTER ANIMATION (Intersection Observer)
───────────────────────────────────────────── */
function initCounterAnimation() {
  const items = document.querySelectorAll('.metric-item');
  if (!items.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        // number rolling effect
        const numEl = entry.target.querySelector('.metric-num');
        if (numEl && !numEl.dataset.animated) {
          numEl.dataset.animated = '1';
          animateNumber(numEl);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  items.forEach(el => observer.observe(el));
}

function animateNumber(el) {
  const original = el.textContent.trim();
  // Extract numeric part and suffix/prefix
  const match = original.match(/^([^0-9]*)([0-9,.]+)([^0-9]*)$/);
  if (!match) return; // non-numeric (e.g. 99.98%)
  const prefix = match[1];
  const numStr = match[2].replace(/,/g, '');
  const suffix = match[3];
  const target = parseFloat(numStr);
  if (isNaN(target)) return;
  const isDecimal = numStr.includes('.');
  const decimals = isDecimal ? (numStr.split('.')[1] || '').length : 0;
  const duration = 1200;
  const steps = 40;
  const interval = duration / steps;
  let step = 0;
  const timer = setInterval(() => {
    step++;
    const progress = step / steps;
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = target * eased;
    const formatted = decimals > 0 ? current.toFixed(decimals) : Math.round(current).toLocaleString();
    el.textContent = prefix + formatted + suffix;
    if (step >= steps) {
      clearInterval(timer);
      el.textContent = original; // restore exact original
    }
  }, interval);
}

/* ─────────────────────────────────────────────
   NAV ACTIVE STATE
───────────────────────────────────────────── */
function updateNavActive(page) {
  // Map page to top-level nav section
  const map = {
    'home': 'home',
    'solutions': 'solutions', 'solutions-advertiser': 'solutions', 'solutions-publisher': 'solutions', 'solutions-agency': 'solutions',
    'products': 'products', 'products-dsp': 'products', 'products-adx': 'products', 'products-ssp': 'products',
    'technology': 'technology',
    'resources': 'resources',
    'case-studies': 'case-studies', 'cases-advertiser': 'case-studies', 'cases-publisher': 'case-studies',
    'company': 'company', 'about': 'company', 'careers': 'company',
    'contact': 'contact',
  };
  const active = map[page] || page;
  document.querySelectorAll('.nav-link').forEach(btn => {
    btn.classList.remove('active');
    const onclick = btn.getAttribute('onclick') || '';
    // match by onclick target
    if (onclick.includes(`'${active}'`) || onclick.includes(`"${active}"`)) {
      btn.classList.add('active');
    }
  });
}

/* ─────────────────────────────────────────────
   404 PAGE
───────────────────────────────────────────── */
function render404() {
  return `
  <div class="page-404">
    <div class="err-code">404</div>
    <h2>${t('Page Not Found','页面未找到')}</h2>
    <p>${t('Sorry, the page you are looking for doesn\'t exist or is temporarily unavailable. This may be due to a network issue.',
         '抱歉，您访问的页面不存在或暂时无法访问，这可能是由于网络问题导致的。')}</p>
    <div class="btn-group" style="justify-content:center">
      <button class="btn btn-primary" onclick="navigate('home')">${t('Go Home','返回首页')}</button>
      <button class="btn btn-secondary" onclick="navigate('contact')">${t('Contact Support','联系支持')}</button>
    </div>
  </div>`;
}

function toggleMobileMenu() {
  const menu = document.getElementById('navMenu');
  menu?.classList.toggle('open');
}

function handleLoginSubmit(btn, platform) {
  const wrap = btn.closest('.login-form-wrap');
  if (!wrap) return;
  const emailInput = wrap.querySelector('input[type="email"]');
  const pwInput = document.getElementById('pwInput_' + platform);
  // Basic validation
  let valid = true;
  [emailInput, pwInput].forEach(inp => {
    if (!inp) return;
    if (!inp.value.trim()) {
      inp.style.borderColor = '#F87171';
      valid = false;
    } else {
      inp.style.borderColor = '';
    }
  });
  if (!valid) return;
  // Show loading state
  const origText = btn.textContent;
  btn.disabled = true;
  btn.textContent = t('Signing in…','登录中…');
  // Simulate auth delay, then show friendly message
  setTimeout(() => {
    btn.disabled = false;
    btn.textContent = origText;
    // Show a toast
    showToast(
      t('Demo environment — Login not available in preview mode.', '演示环境——预览模式下暂不支持登录。'),
      'info'
    );
  }, 1000);
}

function showToast(msg, type = 'info') {
  const existing = document.getElementById('nexToast');
  if (existing) existing.remove();
  const colors = { info:'rgba(37,99,235,0.9)', success:'rgba(5,150,105,0.9)', error:'rgba(239,68,68,0.9)' };
  const toast = document.createElement('div');
  toast.id = 'nexToast';
  toast.style.cssText = `position:fixed;bottom:28px;left:50%;transform:translateX(-50%);background:${colors[type]||colors.info};color:white;padding:12px 24px;border-radius:12px;font-size:14px;font-weight:500;z-index:9999;box-shadow:0 8px 32px rgba(0,0,0,0.4);max-width:400px;text-align:center;backdrop-filter:blur(8px);transition:opacity 0.4s`;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 400); }, 3200);
}

function togglePassword(platform) {
  const input = document.getElementById('pwInput_' + platform);
  const icon = document.getElementById('pwIcon_' + platform);
  if (!input) return;
  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';
  // Switch icon between eye and eye-off
  icon.innerHTML = isPassword
    ? `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>`
    : `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
}

/* ─────────────────────────────────────────────
   GLOBAL TRAFFIC MAP — CANVAS ANIMATION
───────────────────────────────────────────── */
(function initGlobalTrafficMap() {
  // Run after each page render, only on home page canvas
  let _gtmRAF = null;
  let _gtmObserver = null;
  let _bidCount = 0, _winCount = 0, _adValue = 0;

  // City nodes — stored as real [longitude, latitude]; pixel coords computed via D3 projection
  const NODES = [
    { name:'Barcelona',     lon:   2.2,  lat:  41.4, r: 5, color:'#60A5FA', region:'eu'   },
    { name:'San Francisco', lon:-122.4,  lat:  37.8, r: 5, color:'#60A5FA', region:'na'   },
    { name:'London',        lon:  -0.1,  lat:  51.5, r: 5, color:'#C084FC', region:'eu'   },
    { name:'Paris',         lon:   2.3,  lat:  48.9, r: 4, color:'#C084FC', region:'eu'   },
    { name:'Frankfurt',     lon:   8.7,  lat:  50.1, r: 4, color:'#C084FC', region:'eu'   },
    { name:'Tokyo',         lon: 139.7,  lat:  35.7, r: 5, color:'#34D399', region:'apac' },
    { name:'Singapore',     lon: 103.8,  lat:   1.3, r: 5, color:'#FCD34D', region:'sea'  },
    { name:'Seoul',         lon: 127.0,  lat:  37.6, r: 4, color:'#34D399', region:'apac' },
    { name:'Sydney',        lon: 151.2,  lat: -33.9, r: 4, color:'#34D399', region:'apac' },
    { name:'Mumbai',        lon:  72.8,  lat:  19.1, r: 4, color:'#F87171', region:'mena' },
    { name:'Dubai',         lon:  55.3,  lat:  25.2, r: 4, color:'#F87171', region:'mena' },
    { name:'São Paulo',     lon: -46.6,  lat: -23.5, r: 4, color:'#22D3EE', region:'latam'},
    { name:'Mexico City',   lon: -99.1,  lat:  19.4, r: 4, color:'#22D3EE', region:'latam'},
    { name:'Cairo',         lon:  31.2,  lat:  30.1, r: 4, color:'#F87171', region:'mena' },
    { name:'Jakarta',       lon: 106.8,  lat:  -6.2, r: 4, color:'#FCD34D', region:'sea'  },
    { name:'Beijing',       lon: 116.4,  lat:  39.9, r: 4, color:'#34D399', region:'apac' },
    { name:'Lagos',         lon:   3.4,  lat:   6.5, r: 3, color:'#F87171', region:'mena' },
    { name:'Johannesburg',  lon:  28.0,  lat: -26.2, r: 3, color:'#F87171', region:'mena' },
  ];
  // x/y will be computed as 0-1 fractions after projection is available
  NODES.forEach(n => { n.x = 0.5; n.y = 0.5; });

  // Arc routes between major hubs
  const ROUTES = [
    [0,2],[0,5],[0,7],[0,11],[1,2],[1,5],[1,7],[1,9],
    [2,5],[2,7],[2,9],[2,13],[3,9],[3,13],[4,5],[4,9],
    [5,7],[5,8],[5,15],[6,9],[6,14],[7,15],[8,6],[9,13],
    [10,13],[10,9],[11,12],[12,0],[13,16],[14,5],[15,6],[16,17],
  ];

  const particles = [];
  let w = 0, h = 0;

  function createParticle() {
    const ri = Math.floor(Math.random() * ROUTES.length);
    const [ai, bi] = ROUTES[ri];
    const a = NODES[ai], b = NODES[bi];
    const value = (Math.random() * 4 + 0.5).toFixed(1);
    return {
      ax: a.x, ay: a.y, bx: b.x, by: b.y,
      progress: 0,
      speed: 0.004 + Math.random() * 0.006,
      color: a.color,
      value,
      size: Math.random() > 0.8 ? 3 : 2,
    };
  }

  function drawWorldMap(ctx, w, h) {
    // World map is now rendered by the SVG layer (#gtmWorldMapSvg).
    // Canvas only draws the subtle grid dot pattern as a background texture.
    // (No hand-drawn continent paths needed here.)
    ctx.globalAlpha = 1;
  }

  function drawArc(ctx, p, w, h) {
    const x1 = p.ax * w, y1 = p.ay * h;
    const x2 = p.bx * w, y2 = p.by * h;
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const dx = x2 - x1, dy = y2 - y1;
    const dist = Math.sqrt(dx*dx + dy*dy);
    const cpx = mx, cpy = my - dist * 0.35;

    // Faint trail
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(cpx, cpy, x2, y2);
    ctx.strokeStyle = p.color + '18';
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // Moving particle on the arc
    const t = p.progress;
    const bx = (1-t)*(1-t)*x1 + 2*(1-t)*t*cpx + t*t*x2;
    const by = (1-t)*(1-t)*y1 + 2*(1-t)*t*cpy + t*t*y2;

    // Glow
    const grd = ctx.createRadialGradient(bx, by, 0, bx, by, p.size * 4);
    grd.addColorStop(0, p.color + 'cc');
    grd.addColorStop(1, p.color + '00');
    ctx.beginPath();
    ctx.arc(bx, by, p.size * 4, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();

    // Core dot
    ctx.beginPath();
    ctx.arc(bx, by, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  }

  function drawNodes(ctx, w, h) {
    NODES.forEach(node => {
      const nx = node.x * w, ny = node.y * h;
      // Pulse ring
      ctx.beginPath();
      ctx.arc(nx, ny, node.r * 2.2, 0, Math.PI * 2);
      ctx.strokeStyle = node.color + '30';
      ctx.lineWidth = 1;
      ctx.stroke();
      // Inner dot
      ctx.beginPath();
      ctx.arc(nx, ny, node.r, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.fill();
    });
  }

  function lerp(a, b, t) { return a + (b - a) * t; }

  let _bidCountDisplay = 0, _winCountDisplay = 0, _adValueDisplay = 0;

  function updateCounters() {
    _bidCount += Math.floor(Math.random() * 80 + 40);
    _winCount += Math.floor(Math.random() * 20 + 10);
    _adValue  += Math.random() * 0.8 + 0.2;
    // Smooth display
    _bidCountDisplay = Math.round(lerp(_bidCountDisplay, _bidCount, 0.15));
    _winCountDisplay = Math.round(lerp(_winCountDisplay, _winCount, 0.15));
    _adValueDisplay  = lerp(_adValueDisplay, _adValue, 0.1);

    const bc = document.getElementById('gtmBidCount');
    const wc = document.getElementById('gtmWinCount');
    const av = document.getElementById('gtmValue');
    if (bc) bc.textContent = _bidCountDisplay.toLocaleString();
    if (wc) wc.textContent = _winCountDisplay.toLocaleString();
    if (av) av.textContent = _adValueDisplay.toFixed(1);

    // Reset counters to prevent overflow
    if (_bidCount > 99999) { _bidCount = 0; _winCount = 0; _adValue = 0; _bidCountDisplay = 0; _winCountDisplay = 0; _adValueDisplay = 0; }
  }

  let _frame = 0;
  function animate(canvas) {
    const ctx = canvas.getContext('2d');
    w = canvas.offsetWidth;
    h = canvas.offsetHeight;
    canvas.width = w * window.devicePixelRatio;
    canvas.height = h * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear to transparent — background and world map are rendered by the SVG layer below
    ctx.clearRect(0, 0, w, h);

    // Subtle grid dots overlay
    ctx.fillStyle = 'rgba(255,255,255,0.025)';
    for (let gx = 0; gx <= w; gx += 30) {
      for (let gy = 0; gy <= h; gy += 30) {
        ctx.beginPath();
        ctx.arc(gx, gy, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    drawWorldMap(ctx, w, h);
    particles.forEach(p => drawArc(ctx, p, w, h));
    drawNodes(ctx, w, h);

    // Advance particles
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].progress += particles[i].speed;
      if (particles[i].progress >= 1) {
        particles.splice(i, 1);
      }
    }
    // Add new particles
    while (particles.length < 28) {
      particles.push(createParticle());
    }

    _frame++;
    if (_frame % 6 === 0) updateCounters();

    _gtmRAF = requestAnimationFrame(() => {
      const c2 = document.getElementById('globalTrafficCanvas');
      if (c2) animate(c2);
      else cancelAnimationFrame(_gtmRAF);
    });
  }

  // ── D3 world map renderer ──────────────────────────────────────────────────
  // Expose the last used projection so canvas animation can convert lon/lat → px
  let _gtmProjection = null;

  function renderD3WorldMap(svgEl) {
    if (!window.d3 || !window.topojson) return;
    const svgNode = d3.select(svgEl);
    svgNode.selectAll('*').remove();

    // Read size from wrapper (already set on style) or fallback
    const wrapper = svgEl.closest('.gtm-wrapper');
    const W = (wrapper ? wrapper.offsetWidth  : svgEl.clientWidth)  || 900;
    const H = (wrapper ? wrapper.offsetHeight : svgEl.clientHeight) || 480;
    svgNode.attr('viewBox', `0 0 ${W} ${H}`).attr('width', W).attr('height', H);

    // fitSize makes the full sphere fill the container perfectly —
    // no manual scale/translate needed, high-latitude countries always visible
    const projection = d3.geoNaturalEarth1()
      .fitSize([W, H], { type: 'Sphere' });

    _gtmProjection = projection;
    const path = d3.geoPath().projection(projection);

    // Update all node pixel coords from real lon/lat
    function updateNodeCoords() {
      NODES.forEach(n => {
        const px = projection([n.lon, n.lat]);
        if (px) { n.x = px[0] / W; n.y = px[1] / H; }
      });
    }
    updateNodeCoords();

    // Update region label positions using real geographic centers
    const REGION_CENTERS = [
      { id: 'gtm-na',    lon: -100,  lat:  45  },
      { id: 'gtm-eu',    lon:   12,  lat:  52  },
      { id: 'gtm-apac',  lon:  128,  lat:  36  },
      { id: 'gtm-sea',   lon:  108,  lat:   5  },
      { id: 'gtm-mena',  lon:   45,  lat:  27  },
      { id: 'gtm-latam', lon:  -60,  lat: -15  },
    ];
    REGION_CENTERS.forEach(({ id, lon, lat }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const px = projection([lon, lat]);
      if (!px) return;
      el.style.left = (px[0] / W * 100).toFixed(2) + '%';
      el.style.top  = (px[1] / H * 100).toFixed(2) + '%';
    });

    // Fetch Natural Earth 110m countries TopoJSON from CDN
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(r => r.json())
      .then(world => {
        const countries = topojson.feature(world, world.objects.countries);
        const mesh = topojson.mesh(world, world.objects.countries, (a, b) => a !== b);

        // Country fills
        svgNode.append('g')
          .selectAll('path')
          .data(countries.features)
          .join('path')
          .attr('d', path)
          .attr('fill', 'rgba(72,120,180,0.18)')
          .attr('stroke', 'none');

        // Country borders
        svgNode.append('path')
          .datum(mesh)
          .attr('d', path)
          .attr('fill', 'none')
          .attr('stroke', 'rgba(147,197,253,0.28)')
          .attr('stroke-width', '0.6');

        // Outer graticule (grid lines)
        const graticule = d3.geoGraticule()();
        svgNode.append('path')
          .datum(graticule)
          .attr('d', path)
          .attr('fill', 'none')
          .attr('stroke', 'rgba(147,197,253,0.06)')
          .attr('stroke-width', '0.4');
      })
      .catch(() => {
        // Fallback: just show a simple sphere outline
        svgNode.append('path')
          .datum({ type: 'Sphere' })
          .attr('d', path)
          .attr('fill', 'rgba(72,120,180,0.06)')
          .attr('stroke', 'rgba(147,197,253,0.15)')
          .attr('stroke-width', '0.8');
      });
  }

  // Re-init when home page is rendered
  const _origRenderPage = window.renderPage;
  window._initGTM = function() {
    cancelAnimationFrame(_gtmRAF);
    _bidCount = 0; _winCount = 0; _adValue = 0;
    _bidCountDisplay = 0; _winCountDisplay = 0; _adValueDisplay = 0;
    particles.length = 0;
    const canvas = document.getElementById('globalTrafficCanvas');
    if (!canvas) return;

    // Render real world map into the SVG layer
    const svgEl = document.getElementById('gtmWorldMapSvg');
    if (svgEl) {
      // Sync SVG size to canvas wrapper size
      const wrapper = svgEl.closest('.gtm-wrapper');
      if (wrapper) {
        svgEl.style.width  = wrapper.offsetWidth  + 'px';
        svgEl.style.height = wrapper.offsetHeight + 'px';
      }
      renderD3WorldMap(svgEl);
      // Re-render on resize — projection updates automatically, so node coords stay in sync
      window.addEventListener('resize', () => {
        if (document.getElementById('gtmWorldMapSvg') === svgEl) {
          if (wrapper) {
            svgEl.style.width  = wrapper.offsetWidth  + 'px';
            svgEl.style.height = wrapper.offsetHeight + 'px';
          }
          renderD3WorldMap(svgEl);  // also re-runs updateNodeCoords() inside
        }
      });
    }

    // Observe visibility
    if (_gtmObserver) _gtmObserver.disconnect();
    _gtmObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          cancelAnimationFrame(_gtmRAF);
          animate(canvas);
        } else {
          cancelAnimationFrame(_gtmRAF);
        }
      });
    }, { threshold: 0.1 });
    _gtmObserver.observe(canvas);
    // Also handle resize
    window._gtmResizeHandler = () => { /* canvas auto-resizes in animate() */ };
  };
})();

/* ─────────────────────────────────────────────
   BOOT
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Build language dropdown list
  const langDropdown = document.getElementById('langDropdown');
  if (langDropdown) {
    langDropdown.innerHTML = LANGUAGES.map(lang => `
      <button class="lang-option ${lang.code === currentLang ? 'active' : ''}"
              onclick="setLang('${lang.code}')"
              role="option"
              aria-selected="${lang.code === currentLang}">
        <span class="lang-flag">${lang.flag}</span>
        <span class="lang-name">${lang.label}</span>
      </button>
    `).join('');
  }

  // Close lang dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#langSelector') && !e.target.closest('#langSelectorFooter')) {
      document.getElementById('langDropdown')?.classList.remove('open');
    }
  });

  renderPage('home');
  applyLang();
  updateNavActive('home');
});

// Re-render lang options when lang changes
const _origSetLang = setLang;
window.setLang = function(code) {
  currentLang = code;
  // Update active state in dropdown
  document.querySelectorAll('.lang-option').forEach(btn => {
    const active = btn.getAttribute('onclick').includes(`'${code}'`);
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-selected', active);
  });
  // Update footer btn label
  const footerBtn = document.getElementById('langBtnFooter');
  const lang = LANGUAGES.find(l => l.code === code);
  if (footerBtn && lang) footerBtn.innerHTML = `${lang.flag} ${lang.code.toUpperCase()} <svg width="8" height="6" viewBox="0 0 12 8"><path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`;
  applyLang();
  renderPage(currentPage);
  document.getElementById('langDropdown')?.classList.remove('open');
};
