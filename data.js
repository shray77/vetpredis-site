/* data.js — Атлас породных предрасположенностей (MVP, Task 231).
   Формат: строго JSON-совместимый объект после `const ATLAS =` — валидатор
   (scripts/validate_data.py) и тест (tests/data.test.mjs) читают его как JSON.

   УРОВНИ ДОКАЗАТЕЛЬНОСТИ:
     A — систематический обзор / мета-анализ / крупная популяционная работа
         (VetCompass и аналогичные популяционные реестры) / установленная генетическая мутация;
     B — когортное или клиническое исследование, несколько независимых работ;
     C — кейс-серии, обзоры, экспертные перечисления (без количественных оценок).

   ВАЖНО: «предрасположенность» ≠ «приговор». Связь описывает повышенную
   частоту/риск в сравнении с другими породами, а не судьбу конкретного
   животного. Это информационный справочник, не ветеринарная консультация. */

const ATLAS = {
  "updated": "2026-11-10",
  "version": "0.1.0-mvp",
  "note": "Курированный seed: 22 породы, 27 связей. Пополнение — через PubMed-харвестер (роадмап README).",
  "breeds": [
    {
      "id": "dachshund",
      "species": "dog",
      "name": "Такса",
      "name_en": "Dachshund",
      "aliases": ["такса", "dachshund", "такс", "стандартная такса", "миниатюрная такса"],
      "conditions": [
        {
          "disease": "Болезнь межпозвонковых дисков (IVDD)",
          "system": "неврология",
          "evidence": "A",
          "key_fact": "Относительный риск 10–12× выше, чем у прочих пород; хондродистрофия — «long and low» конформация.",
          "sources": [
            {"label": "Packer et al. 2013, PLOS ONE", "url": "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0069650"},
            {"label": "Packer et al. 2016 (DachsLife 2015), PubMed 27826450", "url": "https://pubmed.ncbi.nlm.nih.gov/27826450"}
          ]
        }
      ]
    },
    {
      "id": "ckcs",
      "species": "dog",
      "name": "Кавалер-кинг-чарльз-спаниель",
      "name_en": "Cavalier King Charles Spaniel",
      "aliases": ["кавалер", "cavalier", "кавалер кинг чарльз", "кавалер-кинг-чарльз"],
      "conditions": [
        {
          "disease": "Сирингомиелия / Киари-подобная мальформация (CM/SM)",
          "system": "неврология",
          "evidence": "A",
          "key_fact": "Породная катастрофа черепной коробки: CM/SM — ведущая неврологическая патология породы (VetCompass, первичка Англии).",
          "sources": [
            {"label": "Sanchis-Mora et al. 2016, Vet Rec / VetCompass, PubMed 27534983", "url": "https://pubmed.ncbi.nlm.nih.gov/27534983"},
            {"label": "RVC VetCompass: CM/SM у кавалеров", "url": "https://www.rvc.ac.uk/vetcompass/news/cavalier-king-charles-spaniels-playing-air-guitar-can-be-sign-of-serious-disease"}
          ]
        },
        {
          "disease": "Миксоматозная болезнь митрального клапана (MVD)",
          "system": "кардиология",
          "evidence": "A",
          "key_fact": "Превалентность поражения клапана растёт с возрастом: 9% моложе года → 56% к 4 годам → 100% к 10 годам.",
          "sources": [
            {"label": "Beardow & Buchanan 1993, JAVMA", "url": "http://avmajournals.avma.org/view/journals/javma/203/7/javma.1993.203.07.1023.xml"},
            {"label": "Ramos et al. 2021 (эхокардиография возрастных кавалеров)", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8065390"}
          ]
        }
      ]
    },
    {
      "id": "boxer",
      "species": "dog",
      "name": "Боксёр",
      "name_en": "Boxer",
      "aliases": ["боксер", "boxer", "немецкий боксер"],
      "conditions": [
        {
          "disease": "Аритмогенная кардиомиопатия правого желудочка (ARVC)",
          "system": "кардиология",
          "evidence": "B",
          "key_fact": "«Боксёрская кардиомиопатия»: замещение миокарда фиброзно-жировой тканью, желудочковые аритмии, риск внезапной смерти.",
          "sources": [
            {"label": "Vischer et al. 2017, PMC5953225", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5953225"}
          ]
        }
      ]
    },
    {
      "id": "doberman",
      "species": "dog",
      "name": "Доберман",
      "name_en": "Doberman Pinscher",
      "aliases": ["доберман", "doberman", "доберман пинчер"],
      "conditions": [
        {
          "disease": "Дилатационная кардиомиопатия (DCM)",
          "system": "кардиология",
          "evidence": "A",
          "key_fact": "Кумулятивная превалентность 58.2% в когорте наблюдения; кобели — более ранние эхо-изменения.",
          "sources": [
            {"label": "Wess et al. 2010, PubMed 20202106", "url": "https://pubmed.ncbi.nlm.nih.gov/20202106"}
          ]
        },
        {
          "disease": "Болезнь фон Виллебранда, тип 1",
          "system": "гематология",
          "evidence": "B",
          "key_fact": "Частота мутации/носительства: ~50% (UK), ~73% (US), ~30% (Бразилия) по данным генотипирования.",
          "sources": [
            {"label": "Crespi et al. 2017, PMC6505864", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6505864"},
            {"label": "UC Davis VGL: vWD Type 1", "url": "https://vgl.ucdavis.edu/test/vwd-type-1"}
          ]
        }
      ]
    },
    {
      "id": "gsd",
      "species": "dog",
      "name": "Немецкая овчарка",
      "name_en": "German Shepherd Dog",
      "aliases": ["немецкая овчарка", "овчарка", "german shepherd", "gsd", "немец"],
      "conditions": [
        {
          "disease": "Дегенеративная миелопатия",
          "system": "неврология",
          "evidence": "B",
          "key_fact": "Впервые описана именно у НО; SOD1:c.118G>A; оценка превалентности ~2% среди поражаемых пород.",
          "sources": [
            {"label": "Holder et al. 2014, PMC4579386", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4579386"},
            {"label": "Maki et al. 2022 (молекулярная эпидемиология в Японии)", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9264911"}
          ]
        },
        {
          "disease": "Дисплазия тазобедренного сустава",
          "system": "ортопедия",
          "evidence": "B",
          "key_fact": "Классика тяжёлых пород; вошла в систематический обзор наследуемых дефектов топ-50 пород KC.",
          "sources": [
            {"label": "Summers/Asher et al. 2010 (Part 2), Vet J, PubMed 19963415", "url": "https://pubmed.ncbi.nlm.nih.gov/19963415"}
          ]
        }
      ]
    },
    {
      "id": "frenchbulldog",
      "species": "dog",
      "name": "Французский бульдог",
      "name_en": "French Bulldog",
      "aliases": ["французский бульдог", "френч", "french bulldog", "френч бульдог"],
      "conditions": [
        {
          "disease": "Брахиоцефальный обструктивный синдром (BOAS)",
          "system": "дыхательная система",
          "evidence": "A",
          "key_fact": "Порода из тройки наивысшего риска BOAS; риск растёт по мере уплощения морды (CFR) и увеличения обхвата шеи.",
          "sources": [
            {"label": "Packer et al. 2015, PLOS ONE (Facial Conformation)", "url": "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0137496"},
            {"label": "Liu et al. 2017, PLOS ONE, PMC5538678", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5538678"}
          ]
        }
      ]
    },
    {
      "id": "pug",
      "species": "dog",
      "name": "Мопс",
      "name_en": "Pug",
      "aliases": ["мопс", "pug"],
      "conditions": [
        {
          "disease": "Брахиоцефальный обструктивный синдром (BOAS)",
          "system": "дыхательная система",
          "evidence": "A",
          "key_fact": "Тройка наивысшего риска BOAS вместе с французским и английским бульдогами.",
          "sources": [
            {"label": "Liu et al. 2017, PLOS ONE, PMC5538678", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5538678"},
            {"label": "Packer et al. 2015, PLOS ONE", "url": "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0137496"}
          ]
        }
      ]
    },
    {
      "id": "bulldog",
      "species": "dog",
      "name": "Английский бульдог",
      "name_en": "Bulldog",
      "aliases": ["английский бульдог", "бульдог", "bulldog"],
      "conditions": [
        {
          "disease": "Брахиоцефальный обструктивный синдром (BOAS)",
          "system": "дыхательная система",
          "evidence": "A",
          "key_fact": "Тройка наивысшего риска BOAS (Liu 2017, n=604 брахиоцефала).",
          "sources": [
            {"label": "Liu et al. 2017, PLOS ONE, PMC5538678", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5538678"}
          ]
        }
      ]
    },
    {
      "id": "rottweiler",
      "species": "dog",
      "name": "Ротвейлер",
      "name_en": "Rottweiler",
      "aliases": ["ротвейлер", "ротвилер", "rottweiler"],
      "conditions": [
        {
          "disease": "Остеосаркома",
          "system": "онкология",
          "evidence": "A",
          "key_fact": "Частота 0.84% — высшая среди пород; гигантские породы до 56× риска против метисов.",
          "sources": [
            {"label": "O'Neill et al. 2023, VetCompass, PMC10294386", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10294386"},
            {"label": "RVC VetCompass: bone cancer in giant dogs", "url": "https://www.rvc.ac.uk/vetcompass/news/a-very-big-dog-problem-new-study-identifies-alarming-bone-cancer-risk-in-giant-dogs"}
          ]
        }
      ]
    },
    {
      "id": "greyhound",
      "species": "dog",
      "name": "Грейхаунд",
      "name_en": "Greyhound",
      "aliases": ["грейхаунд", "greyhound", "английская борзая"],
      "conditions": [
        {
          "disease": "Остеосаркома",
          "system": "онкология",
          "evidence": "B",
          "key_fact": "0.62% — вторая частота породы в VetCompass; повышенный риск против прочих подтверждён и в JAVMA-когорте.",
          "sources": [
            {"label": "O'Neill et al. 2023, PMC10294386", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10294386"},
            {"label": "Rosenberger et al. 2007, JAVMA", "url": "http://avmajournals.avma.org/view/journals/javma/231/7/javma.231.7.1076.xml"}
          ]
        }
      ]
    },
    {
      "id": "roughcollie",
      "species": "dog",
      "name": "Колли длинношёрстный",
      "name_en": "Rough Collie",
      "aliases": ["колли", "collie", "длинношерстный колли", "шотландская овчарка"],
      "conditions": [
        {
          "disease": "MDR1-мутация (ABCB1-1Δ), чувствительность к ивермектину и др.",
          "system": "фармакогенетика",
          "evidence": "A",
          "key_fact": "Частота мутантного аллеля у колли — одна из наивысших среди пород (до 57%); гомозиготы — токсичность макроциклических лактонов и ряда других препаратов.",
          "sources": [
            {"label": "Lerdkrai et al. 2021, PMC8743763", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8743763"},
            {"label": "Firdova et al. 2016, Vet Parasitol", "url": "https://www.sciencedirect.com/science/article/abs/pii/S0034528816300601"},
            {"label": "Beckers et al. 2022, PMC9423603", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9423603"}
          ]
        }
      ]
    },
    {
      "id": "dalmatian",
      "species": "dog",
      "name": "Далматин",
      "name_en": "Dalmatian",
      "aliases": ["далматин", "dalmatian", "далматинец"],
      "conditions": [
        {
          "disease": "Гиперурикозурия / уратные камни",
          "system": "урология",
          "evidence": "A",
          "key_fact": "Фиксированная мутация SLC2A9 (гомозиготна вся порода) → гиперурикозурия и уратный уролитиаз.",
          "sources": [
            {"label": "Bannasch et al. 2008, PLoS Genetics, PMC2573870", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2573870"}
          ]
        }
      ]
    },
    {
      "id": "whwt",
      "species": "dog",
      "name": "Вест-хайленд-уайт-терьер",
      "name_en": "West Highland White Terrier",
      "aliases": ["вест хайленд", "вестик", "whwt", "west highland"],
      "conditions": [
        {
          "disease": "Атопический дерматит",
          "system": "дерматология",
          "evidence": "A",
          "key_fact": "52% когорты из 100 щенков проявили АД к трём годам; в US-опросе владельцев — 23.2%.",
          "sources": [
            {"label": "Favrot et al. 2020, PubMed 31646697", "url": "https://pubmed.ncbi.nlm.nih.gov/31646697"},
            {"label": "O'Neill et al. 2019 (WHWT под первичным наблюдением), PMC6720841", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6720841"}
          ]
        }
      ]
    },
    {
      "id": "labrador",
      "species": "dog",
      "name": "Лабрадор-ретривер",
      "name_en": "Labrador Retriever",
      "aliases": ["лабрадор", "labrador", "лабрик"],
      "conditions": [
        {
          "disease": "Идиопатическая эпилепсия",
          "system": "неврология",
          "evidence": "B",
          "key_fact": "Пожизненная превалентность 3.1% в ранних сообщениях; в VetCompass-первичке Англии предрасположенность не подтвердилась — читать с оговоркой.",
          "sources": [
            {"label": "Erlen et al. 2018, VetCompass, PMC6189390", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6189390"}
          ]
        },
        {
          "disease": "Дисплазия тазобедренного сустава",
          "system": "ортопедия",
          "evidence": "B",
          "key_fact": "Вошла в систематический обзор наследуемых дефектов топ-50 пород KC.",
          "sources": [
            {"label": "Summers/Asher et al. 2010 (Part 2), PubMed 19963415", "url": "https://pubmed.ncbi.nlm.nih.gov/19963415"}
          ]
        }
      ]
    },
    {
      "id": "golden",
      "species": "dog",
      "name": "Голден-ретривер",
      "name_en": "Golden Retriever",
      "aliases": ["голден", "golden retriever", "золотистый ретривер"],
      "conditions": [
        {
          "disease": "B-клеточная лимфома и гемангиосаркома",
          "system": "онкология",
          "evidence": "A",
          "key_fact": "Пожизненный риск в США: лимфома ~6%, гемангиосаркома ~20%; GWAS выявил общие локусы риска.",
          "sources": [
            {"label": "Tonomura et al. 2015, PMC4333733", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4333733"}
          ]
        }
      ]
    },
    {
      "id": "beagle",
      "species": "dog",
      "name": "Бигль",
      "name_en": "Beagle",
      "aliases": ["бигль", "beagle"],
      "conditions": [
        {
          "disease": "Идиопатическая эпилепсия",
          "system": "неврология",
          "evidence": "C",
          "key_fact": "Постоянно фигурирует в перечнях предрасположенных пород (наследуемая форма); количественных когорт уровня A/B не найдено.",
          "sources": [
            {"label": "Cornell Riney Canine Health Center", "url": "https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-topics/idiopathic-epilepsy-dogs"},
            {"label": "Hülsmeyer et al. 2015, IVETF, BMC Vet Res", "url": "https://link.springer.com/article/10.1186/s12917-015-0463-0"}
          ]
        }
      ]
    },
    {
      "id": "mainecoon",
      "species": "cat",
      "name": "Мейн-кун",
      "name_en": "Maine Coon",
      "aliases": ["мейн кун", "maine coon", "мейнкун"],
      "conditions": [
        {
          "disease": "Гипертрофическая кардиомиопатия (MYBPC3-A31P)",
          "system": "кардиология",
          "evidence": "A",
          "key_fact": "Мировая частота аллеля A31P ~34–42%; установленная наследуемая форма HCM.",
          "sources": [
            {"label": "Sukumolanan et al. 2022, PMC8980380", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8980380"},
            {"label": "UC Davis VGL: Maine Coon HCM", "url": "https://vgl.ucdavis.edu/test/maine-coon-hcm"}
          ]
        }
      ]
    },
    {
      "id": "ragdoll",
      "species": "cat",
      "name": "Рэгдолл",
      "name_en": "Ragdoll",
      "aliases": ["рэгдолл", "ragdoll", "рагдолл"],
      "conditions": [
        {
          "disease": "Гипертрофическая кардиомиопатия (MYBPC3-R820W)",
          "system": "кардиология",
          "evidence": "A",
          "key_fact": "Мутация R820W ассоциирована с HCM; высокая частота аллеля в Британии — прямое значение для бридинга.",
          "sources": [
            {"label": "Sukumolanan et al. 2022, PMC8980380", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8980380"},
            {"label": "Casamián-Sorrosal et al. (превалентность MYBPC3-мутаций)", "url": "https://www.semanticscholar.org/paper/c4972fbfb02626e52128e2097cb9b493a01e568d"}
          ]
        }
      ]
    },
    {
      "id": "persian",
      "species": "cat",
      "name": "Персидская кошка",
      "name_en": "Persian",
      "aliases": ["персидская", "перс", "persian", "персидская кошка"],
      "conditions": [
        {
          "disease": "Поликистоз почек (PKD)",
          "system": "нефрология",
          "evidence": "A",
          "key_fact": "36.8% позитивных на УЗИ-скрининге; в европейских программах — около 43%.",
          "sources": [
            {"label": "Noori et al. 2019, PMC6716281", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6716281"},
            {"label": "Barrs et al. 2001, Vet Rec", "url": "https://bvajournals.onlinelibrary.wiley.com/doi/10.1136/vr.149.14.409"}
          ]
        },
        {
          "disease": "Гипертрофическая кардиомиопатия",
          "system": "кардиология",
          "evidence": "B",
          "key_fact": "Наивысшая породная превалентность HCM в клинической популяции (54.8%, n=400).",
          "sources": [
            {"label": "Jalilian et al. 2026, PMC13141434", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13141434"}
          ]
        }
      ]
    },
    {
      "id": "scottishfold",
      "species": "cat",
      "name": "Шотландская вислоухая",
      "name_en": "Scottish Fold",
      "aliases": ["скоттиш фолд", "вислоухая", "scottish fold", "скоттиш"],
      "conditions": [
        {
          "disease": "Остеохондродисплазия",
          "system": "ортопедия",
          "evidence": "B",
          "key_fact": "Дефект хряща, затрагивающий все суставы (не только уши): хромота, анкилоз хвоста/пальцев; в ряде стран разведение запрещено или ограничено.",
          "sources": [
            {"label": "Chang et al. (радиографические признаки, случайная серия)", "url": "https://koreamed.org/SearchBasic.php?RID=1090809"},
            {"label": "Takanosu et al. 2020, J Vet Med Sci", "url": "https://www.jstage.jst.go.jp/article/jvms/advpub/0/advpub_20-0299/_article/-char/ja"}
          ]
        }
      ]
    },
    {
      "id": "sphynx",
      "species": "cat",
      "name": "Сфинкс",
      "name_en": "Sphynx",
      "aliases": ["сфинкс", "sphynx", "канадский сфинкс"],
      "conditions": [
        {
          "disease": "Гипертрофическая кардиомиопатия",
          "system": "кардиология",
          "evidence": "B",
          "key_fact": "46.9% в клинической популяции; семейный характер заболевания установлен фенотипически.",
          "sources": [
            {"label": "Silverman et al. 2012, J Feline Med Surg", "url": "https://journals.sagepub.com/doi/10.1177/1098612X11435040"},
            {"label": "Jalilian et al. 2026, PMC13141434", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13141434"}
          ]
        }
      ]
    },
    {
      "id": "britishshorthair",
      "species": "cat",
      "name": "Британская короткошёрстная",
      "name_en": "British Shorthair",
      "aliases": ["британская", "британец", "british shorthair", "bsh"],
      "conditions": [
        {
          "disease": "Гипертрофическая кардиомиопатия",
          "system": "кардиология",
          "evidence": "B",
          "key_fact": "45.0% в клинической популяции; фигурирует среди пород риска в кардиологических обзорах.",
          "sources": [
            {"label": "Jalilian et al. 2026, PMC13141434", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13141434"},
            {"label": "Royal Canin Vet Resources: Pre-clinical HCM", "url": "https://academy.royalcanin.com/en/veterinary/pre-clinical-feline-hypertrophic-cardiomyopathy"}
          ]
        }
      ]
    }
  ]
};
