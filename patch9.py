#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import re

with open('app.js', encoding='utf-8') as f:
    src = f.read()

ENTRIES = [
  {"en": "Whether you're an advertiser seeking global reach, a publisher maximizing revenue, or an agency scaling programmatic operations — NexBids has the solution.", "zh": "无论您是寻求全球覆盖的广告主、最大化收益的发布商，还是扩展程序化运营的代理商——NexBids 都有适合您的解决方案。", "es": "Ya sea anunciante buscando alcance global, publisher maximizando ingresos o agencia — NexBids tiene la solución.", "ar": "سواء كنت معلنًا أو ناشرًا أو وكالة — NexBids لديه الحل.", "hi": "चाहे आप विज्ञापनदाता हों, प्रकाशक हों, या एजेंसी — NexBids के पास समाधान है।", "pt": "Seja anunciante, publisher ou agência — NexBids tem a solução.", "fr": "Que vous soyez annonceur, éditeur ou agence — NexBids a la solution.", "ja": "広告主、パブリッシャー、エージェンシーのいずれでも — NexBidsに解決策があります。"},
  {"en": "NexBids's full-stack programmatic infrastructure — DSP, ADX, and SSP — works seamlessly together to power every side of the digital advertising marketplace.", "zh": "NexBids的全栈程序化广告基础设施——DSP、ADX和SSP——无缝协作，驱动数字广告市场的每一方。", "es": "La infraestructura programática completa de NexBids trabaja perfectamente junta para impulsar el mercado digital.", "ar": "تعمل البنية التحتية الكاملة لـ NexBids معًا بسلاسة.", "hi": "NexBids का फुल-स्टैक इन्फ्रास्ट्रक्चर डिजिटल विज्ञापन के हर पहलू को शक्ति देता है।", "pt": "A infraestrutura completa da NexBids trabalha em conjunto para impulsionar o mercado.", "fr": "L'infrastructure complète de NexBids fonctionne parfaitement pour alimenter le marché publicitaire.", "ja": "NexBidsのフルスタックインフラがデジタル広告マーケットプレイスのあらゆる側面を支えます。"},
  {"en": "\"We'd tried every major DSP and none could match the quality of players NexBids delivered. Their LTV Optimizer changed everything — we're now profitable on a D180 basis across all markets.\"", "zh": "\"我们尝试过每一家主要DSP，没有一家能匹配NexBids带来的玩家质量。他们的LTV优化器改变了一切——我们现在在所有市场的D180基础上都是盈利的。\"", "es": "\"Probamos todos los DSP principales y ninguno igualó la calidad de NexBids. Su LTV Optimizer lo cambió todo.\"", "ar": "\"جربنا كل DSP ولم يستطع أحد مضاهاة جودة لاعبي NexBids. غيّر LTV Optimizer كل شيء.\"", "hi": "\"हमने हर DSP आजमाया, कोई NexBids की खिलाड़ी गुणवत्ता से मेल नहीं खाया।\"", "pt": "\"Experimentamos todos os DSPs e nenhum igualou a qualidade do NexBids. O LTV Optimizer mudou tudo.\"", "fr": "\"Nous avons testé tous les DSP et aucun n'a égalé la qualité de NexBids. Le LTV Optimizer a tout changé.\"", "ja": "\"主要なDSPをすべて試しましたがNexBidsのプレイヤー品質に匹敵するものはありませんでした。LTV Optimizerがすべてを変えました。\""},
  {"en": "The Company Behind the World's Programmatic Infrastructure", "zh": "驱动全球程序化基础设施的公司", "es": "La Empresa Detrás de la Infraestructura Programática Mundial", "ar": "الشركة وراء البنية التحتية البرمجية العالمية", "hi": "दुनिया के प्रोग्रामेटिक इन्फ्रास्ट्रक्चर के पीछे की कंपनी", "pt": "A Empresa por Trás da Infraestrutura Programática Mundial", "fr": "L'Entreprise Derrière l'Infrastructure Programmatique Mondiale", "ja": "世界のプログラマティックインフラを支える会社"},
  {"en": "NexBids was founded in 2018 by a team of advertising technology veterans who had spent their careers at some of the world's largest ad tech companies. They saw firsthand how programmatic advertising remained unnecessarily complex, opaque, and inaccessible for the vast majority of advertisers and publishers.", "zh": "NexBids由一支广告技术老兵团队于2018年创立，他们亲眼看到程序化广告对绝大多数广告主和发布商而言仍然不必要地复杂且难以接触。", "es": "NexBids fue fundada en 2018 por veteranos del ad tech que vieron cómo el programático seguía siendo innecesariamente complejo.", "ar": "تأسست NexBids عام 2018 على يد خبراء رأوا كيف ظل الإعلان البرمجي معقدًا بلا داعٍ.", "hi": "NexBids की स्थापना 2018 में अनुभवी लोगों ने की जिन्होंने देखा कि प्रोग्रामेटिक अनावश्यक रूप से जटिल रहा।", "pt": "NexBids foi fundada em 2018 por veteranos que viram como o programático permanecia desnecessariamente complexo.", "fr": "NexBids a été fondée en 2018 par des vétérans qui ont vu comment le programmatique restait inutilement complexe.", "ja": "NexBidsは2018年に広告テクノロジーのベテランたちによって設立されました。"},
  {"en": "To democratize access to the world's best programmatic advertising technology — empowering every advertiser, publisher, and agency, regardless of size, to compete, grow, and succeed in the global digital economy.", "zh": "让全球最好的程序化广告技术人人可及——使每一位广告主、发布商和代理商，无论规模大小，都能在全球数字经济中竞争、成长和成功。", "es": "Democratizar el acceso a la mejor tecnología programática para que cada anunciante y publisher pueda competir y crecer.", "ar": "إضفاء الطابع الديمقراطي على الوصول إلى أفضل تقنية إعلانية برمجية.", "hi": "सर्वश्रेष्ठ प्रोग्रामेटिक तकनीक तक पहुंच को लोकतांत्रिक बनाना।", "pt": "Democratizar o acesso à melhor tecnologia programática para que cada anunciante e publisher possa competir e crescer.", "fr": "Démocratiser l'accès à la meilleure technologie programmatique pour chaque annonceur et éditeur.", "ja": "世界最高のプログラマティック広告テクノロジーへのアクセスを民主化する。"},
  {"en": "At NexBids, we're on a mission to make programmatic advertising smarter, faster, and more accessible for everyone. We need brilliant, curious, driven people to help us get there.", "zh": "在NexBids，我们的使命是让程序化广告更智能、更快速、更易获取。我们需要才华横溢、充满好奇心的人来帮助我们实现这一目标。", "es": "En NexBids, nuestra misión es hacer la publicidad programática más inteligente, rápida y accesible para todos.", "ar": "في NexBids، مهمتنا هي جعل الإعلان البرمجي أكثر ذكاءً وسرعة وسهولة للجميع.", "hi": "NexBids में हमारा मिशन प्रोग्रामेटिक विज्ञापन को सभी के लिए स्मार्ट और सुलभ बनाना है।", "pt": "Na NexBids, nossa missão é tornar a publicidade programática mais inteligente e acessível para todos.", "fr": "Chez NexBids, notre mission est de rendre la publicité programmatique plus intelligente et accessible pour tous.", "ja": "NexBidsではプログラマティック広告をすべての人にとってよりスマートにすることが使命です。"},
  {"en": "I agree to NexBids'", "zh": "我同意NexBids的", "es": "Acepto los", "ar": "أوافق على", "hi": "मैं सहमत हूं", "pt": "Concordo com os", "fr": "J'accepte les", "ja": "同意します"},
  {"en": "Sorry, the page you are looking for doesn't exist or is temporarily unavailable. This may be due to a network issue.", "zh": "抱歉，您访问的页面不存在或暂时无法访问，这可能是由于网络问题导致的。", "es": "Lo sentimos, la página no existe o no está disponible temporalmente.", "ar": "عذرًا، الصفحة غير موجودة أو غير متاحة مؤقتًا.", "hi": "क्षमा करें, यह पृष्ठ मौजूद नहीं है या अस्थायी रूप से अनुपलब्ध है।", "pt": "Desculpe, a página não existe ou está temporariamente indisponível.", "fr": "Désolé, la page n'existe pas ou est temporairement indisponible.", "ja": "申し訳ありませんが、ページが存在しないか一時的に利用できません。"},
]

def esc(s):
    return s.replace("\\", "\\\\").replace("'", "\\'")

ct_start = src.find('const CONTENT_T = {')
ct_end   = src.find('\n};', ct_start) + 2

lines = []
for item in ENTRIES:
    lines.append(f"  '{esc(item['en'])}': {{")
    for lang in ['zh','es','ar','hi','pt','fr','ja']:
        lines.append(f"    {lang}: '{esc(item[lang])}',")
    lines.append(f"  }},")

block = '\n'.join(lines) + '\n'
new_src = src[:ct_end-1] + block + src[ct_end-1:]

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(new_src)

print(f"Done! Inserted {len(ENTRIES)} entries.")
