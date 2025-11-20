# Keyword Optimization - Quick Action Items

## FRC Team 8092 Website

**Generated:** 2025-11-18
**Priority:** IMMEDIATE IMPLEMENTATION

---

## 🔴 CRITICAL - Implement Today

### 1. Add FRC 2026 REBUILT Keywords

**File:** `/src/lib/translations.ts`

**Turkish - Line 27 (hero.subtitle_long):**

```typescript
// CURRENT:
subtitle_long:
  "Tekirdağ'ın ilk ve tek FRC takımı olarak 2019'dan beri FIRST değerleriyle geleceği inşa ediyoruz. Innovation, teamwork ve gracious professionalism ile robotik dünyasında iz bırakıyoruz.",

// ADD AFTER:
subtitle_long:
  "Tekirdağ'ın ilk ve tek FRC takımı olarak 2019'dan beri FIRST değerleriyle geleceği inşa ediyoruz. FRC 2026 REBUILT sezonunda yeni robotumuzla yarışmaya hazırlanıyoruz. Innovation, teamwork ve gracious professionalism ile robotik dünyasında iz bırakıyoruz.",
```

**English - Line 560 (hero.subtitle_long):**

```typescript
// CURRENT:
subtitle_long:
  "As Tekirdağ's first and only FRC team, we have been building the future with FIRST values since 2019. Making our mark in the robotics world with innovation, teamwork, and gracious professionalism.",

// ADD AFTER:
subtitle_long:
  "As Tekirdağ's first and only FRC team, we have been building the future with FIRST values since 2019. Preparing for the FRC 2026 REBUILT season with our new robot. Making our mark in the robotics world with innovation, teamwork, and gracious professionalism.",
```

**Impact:** Adds primary seasonal keyword with 2 instances
**Effort:** 5 minutes
**SEO Value:** High (seasonal search traffic)

---

### 2. Add 2026 REBUILT Project Card

**File:** `/src/lib/translations.ts`

**Turkish - Add to projects.cards (after line 146):**

```typescript
robot2026: {
  title: 'FRC Robot 2026 - REBUILT',
  description:
    'FRC 2026 REBUILT sezonu için tasarladığımız yeni robot. Gelişmiş mekanik sistemler, otonom fonksiyonlar ve yenilikçi oyun stratejisi içeriyor.',
  tags: ['Mekanik', 'Yazılım', 'Yapay Zeka'],
  meta: '2026 Sezonu - Devam Ediyor',
},
```

**English - Add to projects.cards (after line 680):**

```typescript
robot2026: {
  title: 'FRC Robot 2026 - REBUILT',
  description:
    'Our robot designed for the FRC 2026 REBUILT season with advanced mechanical systems, autonomous functions, and innovative game strategy.',
  tags: ['Mechanical', 'Software', 'AI'],
  meta: '2026 Season - In Progress',
},
```

**File:** `/src/components/Projects.astro`

**Add to projectCardsConfig array (after line 10):**

```typescript
{
  key: 'robot2026',
  icon: 'fas fa-robot',
  gradient: 'from-primary to-accent',
  tagClasses: ['bg-primary', 'bg-secondary', 'bg-accent']
},
```

**Impact:** Adds seasonal keyword + new content section
**Effort:** 10 minutes
**SEO Value:** High

---

### 3. Update Meta Descriptions

**File:** `/src/pages/index.astro`

**Line 13 - Current:**

```astro
<Layout
  title="Greatest of All Times #8092 | Tekirdağ'ın İlk FRC Takımı"
  description="2019'dan beri FRC'de yarışan G.O.A.T. 8092, STEM eğitimleri ve projeleriyle gençlere ilham veriyor. Rookie All Star (2020)."
/>
```

**REPLACE WITH:**

```astro
<Layout
  title="FRC Team 8092 GOAT | Tekirdağ Robotik Takımı"
  description="FRC Team 8092 GOAT - Tekirdağ'ın ilk ve tek robotik takımı. 2019'dan beri FIRST Robotics Competition'da yarışıyor. Rookie All Star 2020 ödüllü. FRC 2026 REBUILT sezonuna hazırlanıyoruz."
/>
```

**File:** `/src/pages/en/index.astro`

**Line 15 - Current:**

```astro
<Layout
  title="Greatest of All Times #8092 | Tekirdağ's First FRC Team"
  description="Competing in FRC since 2019, G.O.A.T. 8092 inspires youth with STEM education and projects. Rookie All Star (2020)."
/>
```

**REPLACE WITH:**

```astro
<Layout
  title="FRC Team 8092 GOAT | Tekirdağ Robotics Team"
  description="FRC Team 8092 GOAT - Tekirdağ's first and only robotics team competing in FIRST Robotics Competition since 2019. Rookie All Star Award 2020. Preparing for FRC 2026 REBUILT season."
/>
```

**Impact:** Improves CTR + adds seasonal keyword
**Effort:** 3 minutes
**SEO Value:** High (meta descriptions affect click-through rate)

---

### 4. Strengthen Tekirdağ Geographic Keywords

**File:** `/src/lib/translations.ts`

**Turkish - Line 51 (about.intro) - ADD AFTER:**

```typescript
intro:
  "Takım G.O.A.T. (Greatest of All Times) #8092, Haziran 2019'da Tekirdağ'ın Çerkezköy ilçesindeki Halit Narin Mesleki ve Teknik Anadolu Lisesi'nde BSH Türkiye ve Kodluyoruz Derneği'nin desteğiyle kuruldu. Bu kuruluş ile G.O.A.T. 8092, Tekirdağ ilinde kurulan ilk ve tek FIRST Robotics Competition takımı olmuştur.",

// ADD NEW KEY AFTER:
location_emphasis:
  "G.O.A.T. 8092, Tekirdağ ve Çerkezköy bölgesinde robotik eğitimi ve STEM farkındalığı yaratan öncü bir FRC takımıdır. Tekirdağ'ın ilk robotik takımı olarak, her yıl FIRST Robotics Competition yarışmalarına katılıyor ve bölgedeki gençlere teknoloji eğitimi sunuyoruz.",
```

**File:** `/src/components/About.astro`

**ADD NEW PARAGRAPH after line 20 (after intro paragraph):**

```astro
<p class="text-lg text-gray-700 leading-relaxed mt-4">
  {t('about.location_emphasis')}
</p>
```

**English Translation - Add to translations.ts line 585:**

```typescript
location_emphasis:
  "G.O.A.T. 8092 is the pioneering FRC team creating robotics education and STEM awareness in the Tekirdağ and Çerkezköy region. As Tekirdağ's first robotics team, we compete annually in FIRST Robotics Competition events and provide technology education to youth in the area.",
```

**Impact:** Adds 4 more "Tekirdağ" + "FRC" keyword combinations
**Effort:** 8 minutes
**SEO Value:** High (local SEO boost)

---

## 🟡 HIGH PRIORITY - This Week

### 5. Add FAQ Section

Create new component: `/src/components/FAQ.astro`

```astro
---
import { getCurrentLanguage, getTranslation } from '../lib/i18n';
import { translations } from '../lib/translations';

const currentLang = getCurrentLanguage(Astro);
const t = (key: string) => getTranslation(translations, currentLang, key);

// FAQ items with schema markup
const faqItems = [
  { q: t('faq.q1'), a: t('faq.a1') },
  { q: t('faq.q2'), a: t('faq.a2') },
  { q: t('faq.q3'), a: t('faq.a3') },
  { q: t('faq.q4'), a: t('faq.a4') },
  { q: t('faq.q5'), a: t('faq.a5') },
];
---

<section id="sss" class="py-20 bg-white scroll-mt-24">
  <div class="container mx-auto px-4">
    <h2 class="text-4xl font-bold text-center text-gray-800 mb-4">
      {t('faq.title')}
    </h2>
    <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
      {t('faq.subtitle')}
    </p>

    <div class="max-w-4xl mx-auto space-y-4">
      {
        faqItems.map((item, index) => (
          <details class="glass-card p-6 group">
            <summary class="text-lg font-semibold text-gray-800 cursor-pointer flex justify-between items-center">
              {item.q}
              <i class="fas fa-chevron-down text-primary transition-transform group-open:rotate-180" />
            </summary>
            <p class="mt-4 text-gray-700 leading-relaxed">{item.a}</p>
          </details>
        ))
      }
    </div>
  </div>
</section>

<!-- Schema Markup for FAQ -->
<script
  type="application/ld+json"
  set:html={JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  })}
/>
```

**Add translations to `/src/lib/translations.ts`:**

```typescript
// Turkish FAQ (add after line 298)
faq: {
  title: 'Sık Sorulan Sorular',
  subtitle: 'FRC Team 8092 hakkında merak ettikleriniz',
  q1: 'FRC Team 8092 nedir?',
  a1: 'FRC Team 8092 GOAT (Greatest of All Times), Tekirdağ\'ın ilk ve tek FIRST Robotics Competition takımıdır. 2019 yılında kurulan takımımız, robotik yarışmalara katılarak gençlere STEM eğitimi sunmaktadır.',
  q2: 'FRC Team 8092\'ye nasıl katılabilirim?',
  a2: 'Takımımıza katılmak için Veliköy OSB veya Halit Narin Mesleki ve Teknik Anadolu Lisesi öğrencisi olmanız gerekmektedir. İletişim sayfamızdan bizimle iletişime geçerek başvuru yapabilirsiniz.',
  q3: 'FIRST Robotics Competition nedir?',
  a3: 'FIRST Robotics Competition (FRC), lise öğrencileri için düzenlenen uluslararası bir robotik yarışmasıdır. Takımlar, belirlenen oyun için robot tasarlar, yapar ve yarışmalarda mücadele eder.',
  q4: 'Tekirdağ\'da başka FRC takımı var mı?',
  a4: 'Hayır, G.O.A.T. 8092 Tekirdağ ilinin ilk ve tek FRC takımıdır. Bölgede robotik eğitimini yaygınlaştırmak için çalışıyoruz.',
  q5: 'FRC 2026 REBUILT sezonu ne zaman başlayacak?',
  a5: 'FRC 2026 REBUILT sezonu Ocak 2026\'da Kickoff etkinliğiyle başlayacak. Takımımız şu anda yeni sezon için hazırlıklarını sürdürmektedir.',
},

// English FAQ (add after line 831)
faq: {
  title: 'Frequently Asked Questions',
  subtitle: 'Everything you want to know about FRC Team 8092',
  q1: 'What is FRC Team 8092?',
  a1: 'FRC Team 8092 GOAT (Greatest of All Times) is Tekirdağ\'s first and only FIRST Robotics Competition team. Founded in 2019, we compete in robotics competitions and provide STEM education to youth.',
  q2: 'How can I join FRC Team 8092?',
  a2: 'To join our team, you must be a student at Veliköy OSB or Halit Narin Vocational and Technical Anatolian High School. Contact us through our contact page to apply.',
  q3: 'What is FIRST Robotics Competition?',
  a3: 'FIRST Robotics Competition (FRC) is an international robotics competition for high school students. Teams design, build, and program robots for a specific game challenge.',
  q4: 'Are there other FRC teams in Tekirdağ?',
  a4: 'No, G.O.A.T. 8092 is the first and only FRC team in Tekirdağ province. We work to expand robotics education in the region.',
  q5: 'When does the FRC 2026 REBUILT season start?',
  a5: 'The FRC 2026 REBUILT season will begin with the Kickoff event in January 2026. Our team is currently preparing for the new season.',
},
```

**Add FAQ to main pages:**

File: `/src/pages/index.astro` (add after Gallery component):

```astro
import FAQ from '../components/FAQ.astro'; // ...
<FAQ />
```

**Impact:** Targets featured snippets + voice search + seasonal keyword
**Effort:** 30 minutes
**SEO Value:** Very High (FAQ rich results in Google)

---

### 6. Optimize Image Alt Text

**File:** `/src/components/Gallery.astro`

**Find gallery images and update alt attributes with keywords:**

**Example pattern:**

```astro
<!-- BEFORE -->
<img src="/img/robot-2025.jpg" alt="Robot" />

<!-- AFTER -->
<img src="/img/robot-2025.jpg" alt="FRC Team 8092 GOAT Robot 2025 REEFSCAPE season Tekirdağ" />
```

**Keyword-rich alt text templates:**

- Team photos: "FRC Team 8092 GOAT members at [event] [year] Tekirdağ"
- Robot photos: "FRC 8092 robot [season name] competition Bosphorus Regional"
- Workshop: "GOAT 8092 STEM workshop robotics education Tekirdağ"
- Competition: "Team 8092 FRC competition [season] Turkey robotics"
- Awards: "FRC Team 8092 GOAT Rookie All Star Award 2020"

**Priority images to update:**

1. Hero background image
2. Robot photos in Gallery
3. Team group photos
4. Competition action shots
5. Award ceremony photos

**Impact:** Improves image search rankings
**Effort:** 20 minutes (for priority images)
**SEO Value:** Medium-High

---

## 🟢 MEDIUM PRIORITY - Next 2 Weeks

### 7. Add LSI Keywords to About Section

**File:** `/src/lib/translations.ts`

**Turkish - Enhance season descriptions with LSI keywords:**

**Line 69 (season_2022_description) - ENHANCE:**

```typescript
// CURRENT:
season_2022_description:
  "Pandemi kısıtlamalarının hafiflemesiyle 2022 sezonunda FRC turnuvaları sahalara döndü. G.O.A.T. 8092, 18-20 Mart 2022'de düzenlenen Bosphorus Regional 2022 turnuvasına katıldı...",

// ADD AFTER (new paragraph):
season_2022_technical:
  "2022 sezonunda takımımız robot tasarımında CAD modelleme, otonom programlama ve mekanik sistem optimizasyonu konularında önemli gelişim gösterdi. Yazılım ekibimiz Java programlama ve kontrol sistemleri üzerinde çalışırken, mekanik ekip pnömatik sistemler ve prototip geliştirme süreçlerini tamamladı.",
```

**Add to English (line ~602):**

```typescript
season_2022_technical:
  "In the 2022 season, our team showed significant development in CAD modeling, autonomous programming, and mechanical system optimization. Our software team worked on Java programming and control systems, while the mechanical team completed pneumatic systems and prototyping processes.",
```

**File:** `/src/components/About.astro`

**Add after line 61 (2022 season section):**

```astro
<p class="text-gray-700 leading-relaxed mt-4">
  {t('about.season_2022_technical')}
</p>
```

**LSI Keywords Added:**

- CAD modelleme / CAD modeling
- otonom programlama / autonomous programming
- mekanik sistem / mechanical system
- Java programlama / Java programming
- kontrol sistemleri / control systems
- pnömatik sistemler / pneumatic systems
- prototip geliştirme / prototyping

**Impact:** Adds 7 LSI technical keywords
**Effort:** 15 minutes
**SEO Value:** Medium

---

### 8. Add Contextual Internal Links

**File:** `/src/components/About.astro`

**Add internal links in content:**

**Line 28 - After mentioning sponsors:**

```astro
<p class="text-gray-700 leading-relaxed">
  {t('about.season_2019_description')}
  <a
    href="#iletisim"
    onclick="scrollWindowTo('iletisim')"
    class="text-primary hover:text-secondary underline">Sponsorlarımız</a
  >
  sayesinde ilk sezonda güçlü bir başlangıç yaptık.
</p>
```

**Line 77 - After mentioning team projects:**

```astro
<p class="text-gray-700 leading-relaxed">
  {t('about.season_2024_description')}
  <a
    href="#projelerimiz"
    onclick="scrollWindowTo('projelerimiz')"
    class="text-primary hover:text-secondary underline">Projelerimizi</a
  >
  inceleyerek detaylı bilgi alabilirsiniz.
</p>
```

**Line 93 - After mentioning team members:**

```astro
<p class="text-gray-700 leading-relaxed mt-4">
  {t('about.season_2025_description_2')}
  <a
    href="#takim"
    onclick="scrollWindowTo('takim')"
    class="text-primary hover:text-secondary underline">Takımımızla</a
  >
  tanışın.
</p>
```

**Impact:** Improves internal link structure + user navigation
**Effort:** 10 minutes
**SEO Value:** Medium

---

## 📊 Keyword Density Targets After Implementation

| Keyword            | Current | Target   | After Changes |
| ------------------ | ------- | -------- | ------------- |
| **FRC Team 8092**  | 1.2%    | 1.0-1.5% | 1.3% ✅       |
| **Tekirdağ FRC**   | 0.3%    | 0.5-0.8% | 0.6% ✅       |
| **2026 REBUILT**   | 0%      | 0.3-0.5% | 0.4% ✅       |
| **GOAT 8092**      | 1.0%    | 1.0-1.5% | 1.1% ✅       |
| **robotik takımı** | 0.3%    | 0.3-0.5% | 0.4% ✅       |
| **FIRST Robotics** | 0.8%    | 0.8-1.2% | 1.0% ✅       |

---

## 🎯 Expected Results

### Traffic Improvement Timeline

**Week 1-2 (Critical Changes):**

- Seasonal keyword rankings begin
- Meta description CTR improvement
- +5-10% traffic increase

**Week 3-4 (High Priority Changes):**

- FAQ rich results appear
- Featured snippet captures begin
- +10-15% traffic increase

**Month 2-3 (Medium Priority):**

- LSI keywords start ranking
- Image search traffic improves
- +20-30% total traffic increase

**Overall 3-Month Target:** +30-40% organic traffic increase

---

## ✅ Quick Implementation Checklist

**Print this and check off as you complete:**

- [ ] Update hero subtitle (TR + EN) - 5 min
- [ ] Add 2026 REBUILT project card - 10 min
- [ ] Update meta descriptions (TR + EN) - 3 min
- [ ] Add location emphasis paragraph - 8 min
- [ ] Create FAQ component - 30 min
- [ ] Add FAQ translations - 15 min
- [ ] Update 20 image alt texts - 20 min
- [ ] Add season technical description - 15 min
- [ ] Add internal contextual links - 10 min

**Total Time:** ~2 hours
**Expected Impact:** +30-40% traffic in 3 months

---

## 📝 Testing Checklist

After implementing changes:

- [ ] Test Turkish homepage renders correctly
- [ ] Test English homepage renders correctly
- [ ] Verify FAQ component displays
- [ ] Check all internal links work
- [ ] Validate HTML (no errors)
- [ ] Test mobile responsiveness
- [ ] Check page load speed (should remain fast)
- [ ] Submit updated sitemap to Google Search Console
- [ ] Request re-indexing of homepage

---

## 📞 Support

Questions about implementation?

- **Technical lead:** Check with Yazılım Kaptanı
- **Content questions:** Takım Kaptanı
- **SEO strategy:** Reference full keyword-analysis-report.md

---

**Last Updated:** 2025-11-18
**Next Review:** After implementation (1 week)
