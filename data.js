/* data.js — Атлас породных предрасположенностей (v0.2 «Лента», Task 232).
   Формат: строго JSON-совместимый объект после `const ATLAS =` — валидатор
   (scripts/validate_data.py) и тест (tests/data.test.mjs) читают его как JSON.

   ПОДАЧА (тон «наука в худи»):
     hook  — заголовок-хук, разговорный, цепляет, но не врёт;
     plain — суть простыми словами для владельца без медицинского словаря;
     key_fact — сухой остаток с числами (научная плашка карточки);
     tagline — короткая не-медицинская характеристика породы (вайб).

   УРОВНИ ДОКАЗАТЕЛЬНОСТИ (грейдят СИЛУ НАУКИ, не тяжесть болезни):
     A — систематический обзор / мета-анализ / крупная популяционная работа
         (VetCompass и аналогичные реестры) / установленная генетическая мутация;
     B — когортное или клиническое исследование, несколько независимых работ;
     C — кейс-серии, обзоры, экспертные перечисления (без количественных оценок).

   ВАЖНО: «предрасположенность» ≠ «приговор». Связь описывает повышенную
   частоту/риск в сравнении с другими породами, а не судьбу конкретного
   животного. Это информационный справочник, не ветеринарная консультация. */

const ATLAS = {
  "updated": "2026-11-11",
  "version": "0.2.0-feed",
  "note": "Курированный набор: 40 пород, 61 связь, простая подача + честная градация доказательности. Пополнение — через PubMed-харвестер (роадмап README).",
  "breeds": [
    {
      "id": "dachshund",
      "species": "dog",
      "name": "Такса",
      "name_en": "Dachshund",
      "aliases": ["такса", "dachshund", "такс", "стандартная такса", "миниатюрная такса"],
      "tagline": "длинная, низкая, бесстрашная",
      "conditions": [
        {
          "disease": "Болезнь межпозвонковых дисков (IVDD)",
          "system": "неврология",
          "evidence": "A",
          "hook": "Спина таксы — расходный материал",
          "plain": "Короткие лапы плюс длинное тело — межпозвоночные диски пашут на износ с молодости. Риск грыжи в 10–12 раз выше, чем у «обычных» собак. Прыжки с дивана — главный враг: пандус дешевле операции.",
          "key_fact": "Относительный риск 10–12× выше прочих пород; хондродистрофия — «long and low» конформация.",
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
      "tagline": "хвост-вихляй с бархатной душой",
      "conditions": [
        {
          "disease": "Сирингомиелия / Киари-подобная мальформация (CM/SM)",
          "system": "неврология",
          "evidence": "A",
          "hook": "Кавалер «чешет» воздух — это не милота, а неврология",
          "plain": "Череп кавалеру тесноват: мозг не помещается, и жидкость под давлением продавливается в спинной мозг. Признак — «фантомные» почёсывания мимо уха, без кожи. Порода — лидер по этой патологии в первичке Англии.",
          "key_fact": "CM/SM — ведущая неврологическая патология породы (VetCompass, первичка Англии).",
          "sources": [
            {"label": "Sanchis-Mora et al. 2016, Vet Rec / VetCompass, PubMed 27534983", "url": "https://pubmed.ncbi.nlm.nih.gov/27534983"},
            {"label": "RVC VetCompass: CM/SM у кавалеров", "url": "https://www.rvc.ac.uk/vetcompass/news/cavalier-king-charles-spaniels-playing-air-guitar-can-be-sign-of-serious-disease"}
          ]
        },
        {
          "disease": "Миксоматозная болезнь митрального клапана (MVD)",
          "system": "кардиология",
          "evidence": "A",
          "hook": "Сердце кавалера — таймер на десять лет",
          "plain": "Митральный клапан утекает: у половины кавалеров — уже к четырём годам, к десяти — практически у всех. Шум при выслушивании — повод для ежегодного эхо, а не «ну чуть шумит, бывает».",
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
      "tagline": "вечный щенок-тяжеловес",
      "conditions": [
        {
          "disease": "Аритмогенная кардиомиопатия правого желудочка (ARVC)",
          "system": "кардиология",
          "evidence": "B",
          "hook": "Боксёр живёт быстро — и сердце тоже",
          "plain": "Часть сердечной мышцы у боксёров замещается жиром и фиброзом: отсюда опасные аритмии и риск внезапной смерти на фоне внешне полного здоровья. Носитель «боксёрской кардиомиопатии» может прекрасно себя чувствовать — до дня Х.",
          "key_fact": "ARVC («боксёрская кардиомиопатия»): замещение миокарда фиброзно-жировой тканью, желудочковые аритмии, риск внезапной смерти.",
          "sources": [
            {"label": "Vischer et al. 2017, PMC5953225", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5953225"}
          ]
        },
        {
          "disease": "Язвенный кератит (язвы роговицы)",
          "system": "офтальмология",
          "evidence": "A",
          "hook": "Плоская морда боксёра бьёт по глазам",
          "plain": "Из-за укороченной морды глаза боксёра хуже прикрыты веками — роговица сохнет и царапается. По первичке Англии язвенным кератитом болеет ~5% породы — в разы выше среднего. Прищур — не гримаса, а повод к врачу.",
          "key_fact": "Boxer — среди пород с наивысшей превалентностью язв роговицы: 4.98% породы за год (O'Neill 2017, VetCompass).",
          "sources": [
            {"label": "O'Neill et al. 2017, Corneal ulcerative disease in dogs, Springer", "url": "https://link.springer.com/article/10.1186/s40575-017-0045-5"},
            {"label": "RVC VetCompass: брахиоцефалы и язвы роговицы", "url": "https://www.rvc.ac.uk/vetcompass/news/new-research-reveals-brachycephalic-dogs-are-most-susceptible-to-corneal-ulcerative-disease"}
          ]
        },
        {
          "disease": "Кожные мастоцитомы",
          "system": "онкология",
          "evidence": "B",
          "hook": "Боксёр — чемпион по мастоцитомам",
          "plain": "Шишка на коже боксёра до «само пройдёт» не доводится: опухоли из тучных клеток — классика породы. На боксёров (вместе с бостонами) приходится большая доля всех случаев. Правило породы: любая новая шишка — цитология.",
          "key_fact": "Наибольшее число кожных мастоцитом в когорте — у боксёров (18.36% обследованных); боксёры и бостоны вместе дают ~50% всех случаев (ACVS).",
          "sources": [
            {"label": "Śmiech et al. 2019, PMC6458547", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6458547"},
            {"label": "ACVS: Mast Cell Tumors", "url": "https://www.acvs.org/small-animal/mast-cell-tumors"}
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
      "tagline": "спорткар с ушами",
      "conditions": [
        {
          "disease": "Дилатационная кардиомиопатия (DCM)",
          "system": "кардиология",
          "evidence": "A",
          "hook": "Сердце добермана растягивается в пустоту",
          "plain": "Камеры сердца растягиваются, насос слабеет — у доберманов это семейное: в многолетней когорте дожило до изменений более половины. Ежегодное эхо после пяти лет — не паранойя, а норма породы.",
          "key_fact": "Кумулятивная превалентность 58.2% в когорте наблюдения; кобели — более ранние эхо-изменения.",
          "sources": [
            {"label": "Wess et al. 2010, PubMed 20202106", "url": "https://pubmed.ncbi.nlm.nih.gov/20202106"}
          ]
        },
        {
          "disease": "Болезнь фон Виллебранда, тип 1",
          "system": "гематология",
          "evidence": "B",
          "hook": "Кровь добермана — с бракованным клеем",
          "plain": "Фактор свёртывания von Willebrand работает вполсилы: носителей в породе до половины и больше (зависит от страны). Мелкие порезы — не драма, плановая операция может стать. Генотип — до наркоза.",
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
      "tagline": "олицетворение слова «овчарка»",
      "conditions": [
        {
          "disease": "Дегенеративная миелопатия",
          "system": "неврология",
          "evidence": "B",
          "hook": "Задние лапы овчарки подводят не от возраста",
          "plain": "Пожилая овчарка «разъезжается» задом — это может быть не артрит, а дегенеративная миелопатия: медленный паралич от повреждения спинного мозга. Впервые описана именно у НО; генетический тест существует. Терапии нет — но точный диагноз меняет план ухода.",
          "key_fact": "Впервые описана у НО; SOD1:c.118G>A; оценка превалентности ~2% среди поражаемых пород.",
          "sources": [
            {"label": "Holder et al. 2014, PMC4579386", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4579386"},
            {"label": "Maki et al. 2022 (молекулярная эпидемиология в Японии)", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9264911"}
          ]
        },
        {
          "disease": "Дисплазия тазобедренного сустава",
          "system": "ортопедия",
          "evidence": "B",
          "hook": "Тазобедренные суставы — фамильная история породы",
          "plain": "Дисплазия ТБС — наследуемая незрелость сустава: бедро не сидит в чашке как надо, артроз приходит раньше возраста. Тяжёлые породы — в группе риска, овчарка в классических списках. Щенку — контроль роста, взрослому — вес и мышцы.",
          "key_fact": "Вошла в систематический обзор наследуемых дефектов топ-50 пород KC.",
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
      "tagline": "бэтмен в теле бульдога",
      "conditions": [
        {
          "disease": "Брахиоцефальный обструктивный синдром (BOAS)",
          "system": "дыхательная система",
          "evidence": "A",
          "hook": "Френч храпит не от усталости — по дизайну",
          "plain": "Плоская морда — это узкие ноздри, удлинённое нёбо и суженные дыхательные пути: собака сопит и не переносит жару. Порода в тройке наивысшего риска BOAS. Лишний вес умножает всё это в разы.",
          "key_fact": "Порода из тройки наивысшего риска BOAS; риск растёт по мере уплощения морды (CFR) и увеличения обхвата шеи.",
          "sources": [
            {"label": "Packer et al. 2015, PLOS ONE (Facial Conformation)", "url": "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0137496"},
            {"label": "Liu et al. 2017, PLOS ONE, PMC5538678", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5538678"}
          ]
        },
        {
          "disease": "Болезнь межпозвонковых дисков (IVDD)",
          "system": "неврология",
          "evidence": "B",
          "hook": "Спина френча — второе слабое место после носа",
          "plain": "Хондродистрофичная конформация бьёт и по спине: диски стареют раньше собаки. В свежем исследовании именно френчи — наивысшие шансы owner-reported IVDD среди чистокровных. Прыжки и лестницы — под контроль.",
          "key_fact": "Среди чистокровных — наивысшие шансы IVDD: OR 21.1 (95% CI 12.5–35.8) на скорректированной модели; сопутствующая эпидуральная гематоза при экструзии — 66%.",
          "sources": [
            {"label": "Wee et al. 2025, JAVMA (OR-IVDD)", "url": "http://avmajournals.avma.org/view/journals/javma/263/5/javma.24.08.0553.xml"},
            {"label": "Federica et al. 2022, PMC9523298", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9523298"}
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
      "tagline": "пылесос с глазами навыкат",
      "conditions": [
        {
          "disease": "Брахиоцефальный обструктивный синдром (BOAS)",
          "system": "дыхательная система",
          "evidence": "A",
          "hook": "Мопс дышит как пылесос — и это диагноз",
          "plain": "Сопение и храп мопса — не милая особенность, а суженные дыхательные пути: тройка наивысшего риска BOAS вместе с бульдогами. Жара и вес — множители риска; при обмороках в жару счёт идёт на минуты.",
          "key_fact": "Тройка наивысшего риска BOAS (мопс/фр. бульдог/англ. бульдог); риск растёт с уплощением морды и обхватом шеи.",
          "sources": [
            {"label": "Liu et al. 2017, PLOS ONE, PMC5538678", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5538678"},
            {"label": "Packer et al. 2015, PLOS ONE", "url": "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0137496"}
          ]
        },
        {
          "disease": "Язвенный кератит (язвы роговицы)",
          "system": "офтальмология",
          "evidence": "A",
          "hook": "Глаза мопса — почти без бронежилета",
          "plain": "Выпуклые глаза мопса торчат из «плоского» лица: веки не прикрывают, роговица сохнет, царапается и язвится — у мопсов это в ~19 раз чаще, чем у метисов. Собака жмурится и «морщит» глаз — срочно к врачу, язвы растут за сутки.",
          "key_fact": "Pug: превалентность язв роговицы 5.42% породы; риск ×19 против кроссбрида (VetCompass, O'Neill 2017 / RVC).",
          "sources": [
            {"label": "O'Neill et al. 2017, Springer (CUD)", "url": "https://link.springer.com/article/10.1186/s40575-017-0045-5"},
            {"label": "RVC VetCompass: брахиоцефалы и язвы роговицы", "url": "https://www.rvc.ac.uk/vetcompass/news/new-research-reveals-brachycephalic-dogs-are-most-susceptible-to-corneal-ulcerative-disease"},
            {"label": "Packer et al. 2015, PubMed 25969983 (носовые складки ×5)", "url": "https://pubmed.ncbi.nlm.nih.gov/25969983"}
          ]
        },
        {
          "disease": "Ожирение",
          "system": "метаболизм",
          "evidence": "A",
          "hook": "«Комочек» — не комплимент, а группа риска",
          "plain": "Мопсы поправляются легче, чем худеют: в британской первичке — в 3.1 раза выше риск лишнего веса против метисов. Лишний вес у породы с BOAS — двойной удар по дыханию. Норму — по рёбрам, не по глазам щенка.",
          "key_fact": "Pug — наивысший OR лишнего веса среди пород: ×3.12 против кроссбрида (VetCompass, 2021).",
          "sources": [
            {"label": "O'Neill et al. 2021, PubMed 33754373 (overweight)", "url": "https://pubmed.ncbi.nlm.nih.gov/33754373"},
            {"label": "RVC VetCompass: dog obesity crisis", "url": "https://www.rvc.ac.uk/vetcompass/news/rvc-study-reveals-extent-of-dog-obesity-crisis-in-the-uk"}
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
      "tagline": "скринсейвер в форме собаки",
      "conditions": [
        {
          "disease": "Брахиоцефальный обструктивный синдром (BOAS)",
          "system": "дыхательная система",
          "evidence": "A",
          "hook": "Бульдог — старший брат по клубу «дышим со скрипом»",
          "plain": "Английский бульдог замыкает тройку наивысшего риска BOAS. Плоское лицо — узкие пути: храп, сопение, жара — враг. Прохладные прогулки и вес под контролем — базовый уход породы.",
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
      "tagline": "качок с дипломом охранника",
      "conditions": [
        {
          "disease": "Остеосаркома",
          "system": "онкология",
          "evidence": "A",
          "hook": "Хромота крупной собаки — не «поскользнулся»",
          "plain": "Остеосаркома — злая опухоль кости, и ротвейлеры — на вершине породного риска: у крупных пород случай не редкий. Хромота, которая «то есть, то нет» у собаки за 6–7 лет — это рентген, а не выжидание.",
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
      "tagline": "40 км/ч из положения лёжа",
      "conditions": [
        {
          "disease": "Остеосаркома",
          "system": "онкология",
          "evidence": "B",
          "hook": "Хромота грейхаунда может оказаться раком кости",
          "plain": "Борзые — вторая частота остеосаркомы по VetCompass (0.62%): у стройных бегунов опухоль кости тоже «любимая». Отставной бегун захромал — не списывайте на возраст без снимка.",
          "key_fact": "0.62% — вторая частота породы в VetCompass; повышенный риск подтверждён и в JAVMA-когорте.",
          "sources": [
            {"label": "O'Neill et al. 2023, PMC10294386", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10294386"},
            {"label": "Rosenberger et al. 2007, JAVMA", "url": "http://avmajournals.avma.org/view/journals/javma/231/7/javma.231.7.1076.xml"}
          ]
        },
        {
          "disease": "Периодонтит (зубной камень и болезнь дёсен)",
          "system": "стоматология",
          "evidence": "A",
          "hook": "Самые быстрые лапы — и самые плохие зубы",
          "plain": "У почти 39% грейхаундов — стоматологическая болезнь: это их проблема №1 по VetCompass (и у беговых, и у «пенсионеров»). Порода-пример, что собакам мало жевательных «пломб» — нужна чистка и осмотр.",
          "key_fact": "Стоматологическая болезнь — наиболее частое нарушение у грейхаундов: 39.0% породы (VetCompass/Rooney 2021).",
          "sources": [
            {"label": "RVC VetCompass: bad teeth — biggest problem for pet greyhounds", "url": "https://www.rvc.ac.uk/vetcompass/news/bad-teeth-revealed-as-biggest-problem-for-pet-greyhounds"},
            {"label": "Rooney et al. 2021, PMC8300175", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8300175"}
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
      "tagline": "Лесси, но с аптечной картой",
      "conditions": [
        {
          "disease": "MDR1-мутация (ABCB1-1Δ), чувствительность к ивермектину и др.",
          "system": "фармакогенетика",
          "evidence": "A",
          "hook": "Колли нельзя ивермектин — всерьёз",
          "plain": "Мутация MDR1 не выпускает часть лекарств из мозга: «безопасная» доза антипаразитика может обернуться нейротоксичностью. У колли аллель — один из самых частых (до 57%). Тест делается раз в жизни — и экономит реанимацию.",
          "key_fact": "Частота мутантного аллеля у колли — одна из наивысших (до 57%); гомозиготы — токсичность макроциклических лактонов и ряда других препаратов.",
          "sources": [
            {"label": "Lerdkrai et al. 2021, PMC8743763", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8743763"},
            {"label": "Firdova et al. 2016, Vet Parasitol", "url": "https://www.sciencedirect.com/science/article/abs/pii/S0034528816300601"},
            {"label": "Beckers et al. 2022, PMC9423603", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9423603"}
          ]
        },
        {
          "disease": "Аномалия глаза колли (CEA)",
          "system": "офтальмология",
          "evidence": "A",
          "hook": "«Collie eye» — фамильная история зрачков",
          "plain": "CEA — рецессивный дефект развития сосудистой оболочки глаза: от «спокойных» пятен до слепоты. Исторически в породе носили почти все; сегодня есть генетический тест NHEJ1 — заводчикам в обязательном порядке, владельцам — ранний осмотр глаз щенка.",
          "key_fact": "CEA — конгенитальная наследуемая патология глаз у колли-типов; мутация NHEJ1 (хромосома 37); исторические оценки носительства — до ~90% породы.",
          "sources": [
            {"label": "Kucharczyk et al. 2019, PMC6829813", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6829813"},
            {"label": "OMIA: Choroidal hypoplasia (NHEJ1), Canis lupus familiaris", "url": "https://omia.org/OMIA000218/9615"},
            {"label": "OFA: Collie Eye Anomaly", "url": "https://ofa.org/collie-eye-anomaly"}
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
      "tagline": "101 проблема в горошек",
      "conditions": [
        {
          "disease": "Гиперурикозурия / уратные камни",
          "system": "урология",
          "evidence": "A",
          "hook": "Далматин писает кирпичами — почти буквально",
          "plain": "Мутация SLC2A9 фиксирована у всей породы: моча перегружена уратами, и камни — фирменная беда. Вода везде, доступ всегда; диету — по назначению. Кобель кричит и не может — это не «стресс».",
          "key_fact": "Фиксированная мутация SLC2A9 (гомозиготна вся порода) → гиперурикозурия и уратный уролитиаз.",
          "sources": [
            {"label": "Bannasch et al. 2008, PLoS Genetics, PMC2573870", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2573870"}
          ]
        },
        {
          "disease": "Врождённая сенсоневральная глухота",
          "system": "отология",
          "evidence": "B",
          "hook": "Односторонне глухий далматин дома незаметен",
          "plain": "Глухота связана с пятнистостью: по BAER-обследованиям — 16–30% породы, включая одностороннюю. Одноухая собака отлично «слышит» — оба полушария компенсируют. Щенку породы — BAER-тест, разводить глухих нельзя.",
          "key_fact": "Врождённая сенсоневральная глухота у 16–29.9% породы (BAER-обследования, включая серию 900 собак); наследуется, связана с пигментацией.",
          "sources": [
            {"label": "Famula et al. 2001, PubMed 11150631", "url": "https://pubmed.ncbi.nlm.nih.gov/11150631"},
            {"label": "VIN: Dalmatian Deafness (обзор, 16–29.9%)", "url": "https://www.vin.com/doc/?id=9382848"},
            {"label": "Dalmatian Club of America: Reference Materials on Deafness", "url": "https://dalmatianclubofamerica.org/reference-materials-concerning-deafness-in-the-dalmatian"}
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
      "tagline": "белый терьер с пожизненным зудом",
      "conditions": [
        {
          "disease": "Атопический дерматит",
          "system": "дерматология",
          "evidence": "A",
          "hook": "Вестик чешется — это статистика, а не характер",
          "plain": "Атопия — аллергия кожи на среду: у половины когорты вестиков она уже к трём годам. Чесать — не «он такой», а болезнь с поддерживающей терапией. Вычёсывать, мыть по схеме, укола бояться не надо.",
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
      "tagline": "аппетит в теле обтекаемой формы",
      "conditions": [
        {
          "disease": "Идиопатическая эпилепсия",
          "system": "неврология",
          "evidence": "B",
          "hook": "Эпилепсия лабрадора — факт со звёздочкой",
          "plain": "Ранние работы давали породе ~3%, но в свежей VetCompass-первичке предрасположенность не подтвердилась. Держим факт с оговоркой — при приступе снимайте на видео и к врачу.",
          "key_fact": "Пожизненная превалентность 3.1% в ранних сообщениях; в VetCompass-первичке Англии предрасположенность не подтвердилась — читать с оговоркой.",
          "sources": [
            {"label": "Erlen et al. 2018, VetCompass, PMC6189390", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6189390"}
          ]
        },
        {
          "disease": "Дисплазия тазобедренного сустава",
          "system": "ортопедия",
          "evidence": "B",
          "hook": "Лабрадор — в клубе «дисплазия ТБС»",
          "plain": "Наследуемая незрелость сустава у крупной породы — ожидаемая история: бедро сидит неглубоко, артроз спешит. Щенка — без перекорма (быстрый рост — враг №1), взрослого — держать стройным.",
          "key_fact": "Вошла в систематический обзор наследуемых дефектов топ-50 пород KC.",
          "sources": [
            {"label": "Summers/Asher et al. 2010 (Part 2), PubMed 19963415", "url": "https://pubmed.ncbi.nlm.nih.gov/19963415"}
          ]
        },
        {
          "disease": "Ожирение",
          "system": "метаболизм",
          "evidence": "A",
          "hook": "Лабрадор всегда голоден — и это физиология",
          "plain": "Лабрадор в 1.7 раза чаще метиса несёт лишний вес — порода из топа британского obesity-исследования. «Ну он же просит» — не аргумент: мера миски важнее взгляда щенка.",
          "key_fact": "Labrador Retriever — OR 1.70 лишнего веса против кроссбрида (VetCompass, 2021; в топе пород риска).",
          "sources": [
            {"label": "O'Neill et al. 2021, PubMed 33754373", "url": "https://pubmed.ncbi.nlm.nih.gov/33754373"},
            {"label": "RVC VetCompass: dog obesity crisis", "url": "https://www.rvc.ac.uk/vetcompass/news/rvc-study-reveals-extent-of-dog-obesity-crisis-in-the-uk"}
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
      "tagline": "золотая душа — и золотые риски",
      "conditions": [
        {
          "disease": "B-клеточная лимфома и гемангиосаркома",
          "system": "онкология",
          "evidence": "A",
          "hook": "Голден и рак — семейная история",
          "plain": "Американские оценки пожизненного риска: лимфома ~6%, гемангиосаркома ~20% — наивысшие в породе. «Стал вялым, пьёт больше, живот неприятно вырос» — поводы не откладывать визит.",
          "key_fact": "Пожизненный риск в США: лимфома ~6%, гемангиосаркома ~20%; GWAS выявил общие локусы риска.",
          "sources": [
            {"label": "Tonomura et al. 2015, PMC4333733", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4333733"}
          ]
        },
        {
          "disease": "Ожирение",
          "system": "метаболизм",
          "evidence": "A",
          "hook": "Голден не «упитанный» — он в группе риска",
          "plain": "Голдены вошли в тройку пород наибольшего риска лишнего веса (VetCompass 2021). Для породы с семейными рисками суставов и опухолей — это лишний множитель. Рёбра должны прощупываться.",
          "key_fact": "Golden Retriever — среди пород наибольшего риска лишнего веса против кроссбридов (VetCompass, 2021).",
          "sources": [
            {"label": "O'Neill et al. 2021, PubMed 33754373", "url": "https://pubmed.ncbi.nlm.nih.gov/33754373"},
            {"label": "RVC VetCompass: dog obesity crisis", "url": "https://www.rvc.ac.uk/vetcompass/news/rvc-study-reveals-extent-of-dog-obesity-crisis-in-the-uk"}
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
      "tagline": "нос, который кормит желудок",
      "conditions": [
        {
          "disease": "Идиопатическая эпилепсия",
          "system": "неврология",
          "evidence": "C",
          "hook": "Бигли и эпилепсия: связь есть, цифр мало",
          "plain": "Бигль — вечный обитатель списков предрасположенных к наследуемой эпилепсии, но больших когорт уровня A/B по нему нет — держим уровень C. Первый приступ — видео + невролог.",
          "key_fact": "Постоянно фигурирует в перечнях предрасположенных пород (наследуемая форма); количественных когорт уровня A/B не найдено.",
          "sources": [
            {"label": "Cornell Riney Canine Health Center", "url": "https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-topics/idiopathic-epilepsy-dogs"},
            {"label": "Hülsmeyer et al. 2015, IVETF, BMC Vet Res", "url": "https://link.springer.com/article/10.1186/s12917-015-0463-0"}
          ]
        },
        {
          "disease": "Стероид-зависимый менинго-артериит (SRMA)",
          "system": "неврология",
          "evidence": "B",
          "hook": "«Бигль плачет от боли» — это синдром, а не характер",
          "plain": "SRMA (исторически «beagle pain syndrome») — иммунное воспаление оболочек мозга у молодых: температура, боль в шее, лежит пластом. Лечится стероидами и лечится хорошо — тянуть нельзя.",
          "key_fact": "Иммуноопосредованное неинфекционное воспаление лептоменингов у юных собак; в породах риска — бигль (синдром описан в породе), боксёр, бернский зенненхунд, веймаранер.",
          "sources": [
            {"label": "Wohlsein et al. 2023, SRMA review, JSAP", "url": "https://www.sciencedirect.com/science/article/pii/S1090023323000813"},
            {"label": "Fitzpatrick Referrals: SRMA", "url": "https://www.fitzpatrickreferrals.co.uk/neurology/steroid-responsive-meningitis-arteritis-srma"}
          ]
        },
        {
          "disease": "Ожирение",
          "system": "метаболизм",
          "evidence": "A",
          "hook": "Бигль съест всё — и вес придёт",
          "plain": "Бигль — в тройке пород наибольшего риска лишнего веса (VetCompass): нос находит еду, желудок соглашается. Корм по расписанию и мерке, «глазки» — мимо.",
          "key_fact": "Beagle — среди пород наибольшего риска лишнего веса против кроссбридов (VetCompass, 2021).",
          "sources": [
            {"label": "O'Neill et al. 2021, PubMed 33754373", "url": "https://pubmed.ncbi.nlm.nih.gov/33754373"},
            {"label": "RVC VetCompass: dog obesity crisis", "url": "https://www.rvc.ac.uk/vetcompass/news/rvc-study-reveals-extent-of-dog-obesity-crisis-in-the-uk"}
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
      "tagline": "кот размером с уважение",
      "conditions": [
        {
          "disease": "Гипертрофическая кардиомиопатия (MYBPC3-A31P)",
          "system": "кардиология",
          "evidence": "A",
          "hook": "Большой кот — большое сердце, и это проблема",
          "plain": "HCM утолщает стенки сердца — насосу тесно. Мутация A31P в мейн-кунах — семейная: аллель у трети-половины мирового поголовья. Коту — эхо раз в год, котёнку — генетику до покупки.",
          "key_fact": "Мировая частота аллеля A31P ~34–42%; установленная наследуемая форма HCM.",
          "sources": [
            {"label": "Sukumolanan et al. 2022, PMC8980380", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8980380"},
            {"label": "UC Davis VGL: Maine Coon HCM", "url": "https://vgl.ucdavis.edu/test/maine-coon-hcm"}
          ]
        },
        {
          "disease": "Спинальная мышечная атрофия (SMA)",
          "system": "неврология",
          "evidence": "A",
          "hook": "Шаткий котёнок мейн-куна — это SMA",
          "plain": "SMA — делеция LIX1: нейроны спинного мозга отмирают, задние лапы слабеют, котёнок идёт «пьяной» походкой. Наследуется рецессивно, носители здоровы. Тест до вязки — обязателен.",
          "key_fact": "SMA — генетическая болезнь мейн-кунов (делеция в LIX1); характеризуется атрофией мускулатуры таза и прогрессирующей нестабильностью.",
          "sources": [
            {"label": "UC Davis VGL: Maine Coon SMA", "url": "https://vgl.ucdavis.edu/test/maine-coon-sma"},
            {"label": "Wakeling et al. 2012, PMC3355207", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3355207"}
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
      "tagline": "тряпка в свободном падении",
      "conditions": [
        {
          "disease": "Гипертрофическая кардиомиопатия (MYBPC3-R820W)",
          "system": "кардиология",
          "evidence": "A",
          "hook": "Рэгдолл расслаблен снаружи — и с наследственностью внутри",
          "plain": "Мутация MYBPC3-R820W связана с HCM рэгдоллов; частота аллеля в Британии высокая. Порода расслабленная — сердце нет: эхо-скрининг это часть культуры породы.",
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
      "tagline": "диван с персидской родословной",
      "conditions": [
        {
          "disease": "Поликистоз почек (PKD)",
          "system": "нефрология",
          "evidence": "A",
          "hook": "Персидские почки — в пузырьках с рождения",
          "plain": "PKD — кисты растут с рождения и тихо вытесняют рабочую ткань. У персов позитивно ~37–43% (УЗИ-программы). Эхо почек котёнку — как паспорт: один раз сделал — знаешь сценарий.",
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
          "hook": "Перс и утолщённое сердце — частая пара",
          "plain": "HCM у персов — наивысшая превалентность в клинических популяциях. Милый «плюшевый малоподвижный» образ маскирует одышку: дыхание кошки важнее её репутации лежебоки.",
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
      "tagline": "уши-конфета, суставы-вопрос",
      "conditions": [
        {
          "disease": "Остеохондродисплазия",
          "system": "ортопедия",
          "evidence": "B",
          "hook": "Вислоухость — это не только уши, а хрящи всего тела",
          "plain": "Мутация складки ушей меняет хрящ везде: хвост деревянный, пальцы толстые, хромота. «Поза Будды» и нежелание прыгать — часто боль, не характер. В ряде стран разведение фолдов ограничено или запрещено.",
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
      "tagline": "замша с сердцебиением",
      "conditions": [
        {
          "disease": "Гипертрофическая кардиомиопатия",
          "system": "кардиология",
          "evidence": "B",
          "hook": "Лысый сфинкс — с семейным сердцем",
          "plain": "HCM у сфинксов — почти половина клинической популяции, семейная форма установлена фенотипически. Голому сердцу тоже нужно эхо: раз в год взрослому сфинксу — база.",
          "key_fact": "46.9% в клинической популяции; семейный характер заболевания установлен фенотипически.",
          "sources": [
            {"label": "Silverman et al. 2012, J Feline Med Surg", "url": "https://journals.sagepub.com/doi/10.1177/1098612X11435040"},
            {"label": "Jalilian et al. 2026, PMC13141434", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13141434"}
          ]
        },
        {
          "disease": "Врождённый миастенический синдром (COLQ)",
          "system": "неврология",
          "evidence": "A",
          "hook": "Сфинкс обвис — проверь COLQ, а не «устал»",
          "plain": "Врождённая миастения сфинксов и девон-рексов: сигнал с нерва на мышцу пробуксовывает — после игры слабость, обвисшая шея, сложно жевать. Тест существует, наследуется рецессивно.",
          "key_fact": "COLQ-вариант: врождённая миастеническая болезнь Devon Rex и Sphynx — слабость аксиальной и аппендикулярной мускулатуры, мегаэзофагус; аутосомно-рецессивно.",
          "sources": [
            {"label": "Gandolfi et al. 2015, PubMed 26374066 (COLQ)", "url": "https://pubmed.ncbi.nlm.nih.gov/26374066"},
            {"label": "UC Davis VGL: Sphynx & Devon Rex CMS", "url": "https://vgl.ucdavis.edu/test/sphynx-and-devon-rex-cms"}
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
      "tagline": "плюш, внутри — мотор",
      "conditions": [
        {
          "disease": "Гипертрофическая кардиомиопатия",
          "system": "кардиология",
          "evidence": "B",
          "hook": "Плотный кот — плотное сердце",
          "plain": "HCM у британцев — почти как у сфинксов: 45% клинической популяции в свежем иранском исследовании. Спокойный нрав ≠ здоровое сердце: эхо раз в год взрослому коту — норма.",
          "key_fact": "45.0% в клинической популяции; фигурирует среди пород риска в кардиологических обзорах.",
          "sources": [
            {"label": "Jalilian et al. 2026, PMC13141434", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13141434"},
            {"label": "Royal Canin Vet Resources: Pre-clinical HCM", "url": "https://academy.royalcanin.com/en/veterinary/pre-clinical-feline-hypertrophic-cardiomyopathy"}
          ]
        }
      ]
    },
    {
      "id": "chihuahua",
      "species": "dog",
      "name": "Чихуахуа",
      "name_en": "Chihuahua",
      "aliases": ["чихуахуа", "чихуа", "chihuahua"],
      "tagline": "восемьсот граммов характера",
      "conditions": [
        {
          "disease": "Люксация коленной чашечки (врождённая)",
          "system": "ортопедия",
          "evidence": "A",
          "hook": "Колено чихуахуа выскакивает, как на пружине",
          "plain": "Коленная чашечка у мелких собак сидит в канавке неглубоко — и «выпрыгивает»: собака вдруг поджимает лапку, потом отпускает как ни в чём не бывало. У чихуахуа это четверть породы по шведской оценке. Вправляется, но запущенные случаи ведут к артрозу.",
          "key_fact": "Превалентность люксации у чихуахуа — 23% (Nilsson 2018); 8.2% всех случаев в UK-первичке — чихуахуа (O'Neill 2016).",
          "sources": [
            {"label": "O'Neill et al. 2016 (эпидемиология люксации чашечки), PMC4898461", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4898461"},
            {"label": "Nilsson et al. 2018 (наследуемость, Chihuahua/Bichon), PubMed 29680386", "url": "https://pubmed.ncbi.nlm.nih.gov/29680386"}
          ]
        }
      ]
    },
    {
      "id": "yorkshireterrier",
      "species": "dog",
      "name": "Йоркширский терьер",
      "name_en": "Yorkshire Terrier",
      "aliases": ["йорк", "йоркширский терьер", "yorkshire terrier", "йорик"],
      "tagline": "шевелюра с амбициями",
      "conditions": [
        {
          "disease": "Люксация коленной чашечки (врождённая)",
          "system": "ортопедия",
          "evidence": "A",
          "hook": "Колено йорка — нестабильная валюта",
          "plain": "Йорки — порода №1 по вывихам коленной чашечки: почти 14% всех случаев в британской первичке. Перескакивающая походка и поджатая лапка — повод для ортопеда, операция рутинная и прогноз хороший.",
          "key_fact": "Йоркширский терьер — самая частая порода среди случаев люксации: 13.6% всех случаев (O'Neill 2016, VetCompass).",
          "sources": [
            {"label": "O'Neill et al. 2016, PMC4898461", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4898461"}
          ]
        },
        {
          "disease": "Коллапс трахеи",
          "system": "дыхательная система",
          "evidence": "B",
          "hook": "Йорк гудит как чайник — это трахея",
          "plain": "Кольца трахеи у тоев слабые и спадаются на вдохе: фирменный «гусиный» звук при возбуждении, тугом ошейнике или жаре. Замените ошейник шлейкой, держите вес — и не считайте гудение «милым».",
          "key_fact": "Коллапс трахеи затрагивает преимущественно той/мелкие породы — прежде всего йоркширских терьеров, померанцев, той-пуделей (Kim 2024, ретроспектива).",
          "sources": [
            {"label": "Kim et al. 2024, PMC11349713", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11349713"},
            {"label": "Cornell Riney: Tracheal Collapse", "url": "https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-topics/tracheal-collapse"}
          ]
        }
      ]
    },
    {
      "id": "pomeranian",
      "species": "dog",
      "name": "Померанский шпиц",
      "name_en": "Pomeranian",
      "aliases": ["померанский шпиц", "померанец", "pom", "pomeranian", "шпиц померанский"],
      "tagline": "мини-медведь с мега-эго",
      "conditions": [
        {
          "disease": "Коллапс трахеи",
          "system": "дыхательная система",
          "evidence": "B",
          "hook": "Померанский кашляет гусем — не очарование, а трахея",
          "plain": "Померанцы — в первой линии пород коллапса трахеи. Сухой «гусиный» кашель на прогулке или после натяжения поводка — симптом, а не характер. Шлейка вместо ошейника — правило породы с щенячества.",
          "key_fact": "Коллапс трахеи преимущественно поражает мелкие/той-породы, включая померанских шпицов (Kim 2024; Cornell).",
          "sources": [
            {"label": "Kim et al. 2024, PMC11349713", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11349713"},
            {"label": "Cornell Riney: Tracheal Collapse", "url": "https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-topics/tracheal-collapse"}
          ]
        },
        {
          "disease": "Люксация коленной чашечки (врождённая)",
          "system": "ортопедия",
          "evidence": "C",
          "hook": "Колено померанца — тоже лотерея",
          "plain": "Мелкие породы классически склонны к вывихам коленной чашечки, померанцы — в списках устойчиво. Внезапная хромота щенка чаще всего вправляется сама, но показать ортопеду нужно: без контроля люксация со временем переходит в артроз.",
          "key_fact": "Люксация коленной чашечки — «болезнь мелких пород»: померанцы в классическом списке (Cornell; эпидемиология O'Neill 2016 по мелким породам).",
          "sources": [
            {"label": "Cornell Riney: Patellar Luxation", "url": "https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-information/patellar-luxation"}
          ]
        }
      ]
    },
    {
      "id": "greatdane",
      "species": "dog",
      "name": "Немецкий дог",
      "name_en": "Great Dane",
      "aliases": ["немецкий дог", "дог", "great dane"],
      "tagline": "диван в форме собаки",
      "conditions": [
        {
          "disease": "Гастродилатация-волвулус (GDV, заворот желудка)",
          "system": "гастроэнтерология",
          "evidence": "B",
          "hook": "Дог может «скрутиться» за ужином — в прямом смысле",
          "plain": "GDV: желудок раздувается газом и оборачивается — счёт на часы, летальность высокая. У догов пожизненный риск оценивают в ~37%. Профилактика простая: дробное кормление, без бега до и после еды, и знать симптомы наизусть (раздутый живот, слюни, безуспешные позывы).",
          "key_fact": "Пожизненный риск GDV у догов — до 37% (Harkey 2017); OR 41.4 против метисов — наивысший среди пород (Bell 2014, по данным когорты Glickman).",
          "sources": [
            {"label": "Harkey et al. 2017, AJVR", "url": "http://avmajournals.avma.org/view/journals/ajvr/78/8/ajvr.78.8.934.xml"},
            {"label": "Bell et al. 2014 (Inherited and Predisposing Factors), VIN", "url": "https://www.vin.com/c/pdf/6975909"},
            {"label": "Cornell Riney: GDV or Bloat", "url": "https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-topics/gastric-dilatation-volvulus-gdv-or-bloat"}
          ]
        }
      ]
    },
    {
      "id": "saintbernard",
      "species": "dog",
      "name": "Сенбернар",
      "name_en": "Saint Bernard",
      "aliases": ["сенбернар", "saint bernard", "святой бернар"],
      "tagline": "бочка с моторчиком спасателя",
      "conditions": [
        {
          "disease": "Гастродилатация-волвулус (GDV, заворот желудка)",
          "system": "гастроэнтерология",
          "evidence": "B",
          "hook": "Сенбернар: тот же заворот, другая конституция",
          "plain": "Сенбернары — вторая линия риска GDV: шансы оценивают в ~22 раза выше, чем у метисов. Глубокая грудь = простор для желудка, чтобы перекрутиться. Правила те же: дробное кормление, без нагрузок после еды, симптомы — выучить наизусть.",
          "key_fact": "Saint Bernard — OR 21.8 против метисов по когорте Glickman (Bell 2014); в классическом списке пород риска GDV.",
          "sources": [
            {"label": "Bell et al. 2014, VIN", "url": "https://www.vin.com/c/pdf/6975909"},
            {"label": "Cornell Riney: GDV or Bloat", "url": "https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-topics/gastric-dilatation-volvulus-gdv-or-bloat"}
          ]
        }
      ]
    },
    {
      "id": "burnesemountaindog",
      "species": "dog",
      "name": "Бернский зенненхунд",
      "name_en": "Bernese Mountain Dog",
      "aliases": ["бернский зенненхунд", "берн", "bernese mountain dog", "бернец"],
      "tagline": "трёхцветный трактор доброты",
      "conditions": [
        {
          "disease": "Гистиоцитарная саркома",
          "system": "онкология",
          "evidence": "A",
          "hook": "Бернец и гистиоцитарная саркома — семейная беда",
          "plain": "Гистиоцитарная саркома — злая опухоль из клеток иммунной системы, и у бернов она породная история: ожидаемая превалентность ~25%, больше половины смертей породы связаны с опухолями. Висячие добрые собаки заслуживают частых осмотров.",
          "key_fact": "Ожидаемая превалентность HS у BMD — 25% (Abadie 2009); смерть ≥55.1% бернов ассоциирована со злокачественными опухолями (Erich 2013).",
          "sources": [
            {"label": "Abadie et al. 2009, PMC3139364", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3139364"},
            {"label": "Erich et al. 2013 (causes of death), Sciencedirect", "url": "https://www.sciencedirect.com/science/article/abs/pii/S1090023313004905"}
          ]
        }
      ]
    },
    {
      "id": "rhodesianridgeback",
      "species": "dog",
      "name": "Родезийский риджбек",
      "name_en": "Rhodesian Ridgeback",
      "aliases": ["родезийский риджбек", "риджбек", "rhodesian ridgeback", "африканская львиная собака"],
      "tagline": "львиная грива по умолчанию",
      "conditions": [
        {
          "disease": "Дермоидный синус",
          "system": "дерматология",
          "evidence": "B",
          "hook": "Ридж на спине — и трубочка к позвоночнику",
          "plain": "Дермоидный синус — врождённый канал от кожи к позвоночнику по средней линии спины: снаружи — дырочка с вихром волос, внутри — потенциальный лифт для инфекции вплоть до менингита. Осмотр щенка по хребту — заводская проверка породы.",
          "key_fact": "Врождённый наследуемый дефект породы: неполное отделение кожи от нервной трубки; локализация — шея/грудь/крестец (Rahal 2008; ACVS: affected не разводить).",
          "sources": [
            {"label": "Rahal et al. 2008 (MRI-диагностика DS), PMC2519906", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2519906"},
            {"label": "ACVS: Dermoid Sinus", "url": "https://www.acvs.org/small-animal/dermoid-sinus"}
          ]
        }
      ]
    },
    {
      "id": "akita",
      "species": "dog",
      "name": "Акита",
      "name_en": "Akita",
      "aliases": ["акита", "akita", "акита-ину", "американская акита"],
      "tagline": "самурай на своём дворе",
      "conditions": [
        {
          "disease": "Увеодерматологический синдром (VKH-подобный)",
          "system": "иммунология",
          "evidence": "C",
          "hook": "Акита: иммунитет воюет с собственным пигментом",
          "plain": "VKH-подобный синдром — иммунная атака на пигментные клетки: воспаление глаз (грозит слепотой) плюс осветление кожи и морды. У акит и северных пород — классика. Срочно к офтальмологу — время решает зрение.",
          "key_fact": "Увеодерматологический синдром: хронический двусторонний увеит + депигментация кожи; преимущественно акиты и северные породы (Pye 2009; VIN).",
          "sources": [
            {"label": "Pye et al. 2009, PMC2711475", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2711475"},
            {"label": "VIN Veterinary Partner: VKH-Like Syndrome in Dogs", "url": "https://veterinarypartner.vin.com/default.aspx?pid=19239&catId=254086&id=4952086"}
          ]
        }
      ]
    },
    {
      "id": "minischnauzer",
      "species": "dog",
      "name": "Цвергшнауцер",
      "name_en": "Miniature Schnauzer",
      "aliases": ["цвергшнауцер", "миниатюрный шнауцер", "miniature schnauzer", "цверг"],
      "tagline": "бородатый мини-танкист",
      "conditions": [
        {
          "disease": "Первичная гиперлипидемия",
          "system": "метаболизм",
          "evidence": "B",
          "hook": "У цверга — «жирная кровь», и это не фигура речи",
          "plain": "Цвергшнауцеры — порода №1 по первичной гиперлипидемии: триглицериды зашкаливают без внешней причины, а следом подтягиваются панкреатит и белок в моче. Липидограмма — простой анализ, знать статус породы стоит заранее.",
          "key_fact": "Первый описанный породный случай первичной гиперлипидемии в США; семейно-идиопатическая гипертриглицеридемия породы (Mori 2010; Minnesota Canine Genetics).",
          "sources": [
            {"label": "Mori et al. 2010, PubMed 20060988", "url": "https://pubmed.ncbi.nlm.nih.gov/20060988"},
            {"label": "University of Minnesota, Canine Genetics Lab: Hyperlipidemia", "url": "https://vetmed.umn.edu/research/research-labs/canine-genetics-lab/canine-genetics-research/hyperlipidemia"}
          ]
        }
      ]
    },
    {
      "id": "pembroke",
      "species": "dog",
      "name": "Вельш-корги пемброк",
      "name_en": "Pembroke Welsh Corgi",
      "aliases": ["корги", "пемброк", "pembroke", "welsh corgi", "корги пемброк"],
      "tagline": "ноги в дефиците, заряд — полный",
      "conditions": [
        {
          "disease": "Дегенеративная миелопатия (SOD1)",
          "system": "неврология",
          "evidence": "B",
          "hook": "Корги без задних лап — это не мем, а миелопатия",
          "plain": "У корги мутация SOD1 распространена шире, чем шуток о коротких ногах: взрослая собака теряет координацию задних лап, и списывают это на возраст. Тест ДНК существует — знать статус собаки полезно до первых признаков.",
          "key_fact": "Мутация SOD1:c.118G>A — высокая частота у пемброков; DM у корги и боксёров прогрессирует до периферической нейропатии (Chang 2013; Coates 2012).",
          "sources": [
            {"label": "Chang et al. 2013 (SOD1 у пемброков), PubMed 23328634", "url": "https://pubmed.ncbi.nlm.nih.gov/23328634"},
            {"label": "Coates et al. 2012 (Coates/Johns Hopkins), PubMed 22542607", "url": "https://pubmed.ncbi.nlm.nih.gov/22542607"},
            {"label": "UC Davis VGL: Degenerative Myelopathy", "url": "https://vgl.ucdavis.edu/test/degenerative-myelopathy"}
          ]
        }
      ]
    },
    {
      "id": "husky",
      "species": "dog",
      "name": "Сибирский хаски",
      "name_en": "Siberian Husky",
      "aliases": ["хаски", "husky", "сибирский хаски"],
      "tagline": "философ с голосом вьюги",
      "conditions": [
        {
          "disease": "Цинк-зависимый дерматоз",
          "system": "дерматология",
          "evidence": "B",
          "hook": "Хаски чешется — возможно, это цинк",
          "plain": "Северные породы плохо усваивают цинк из обычного корма: корки и шелушение вокруг глаз, рта, подушечек. В серии из 41 случая хаски — главный герой. Лечится цинковой добавкой по схеме — но диагноз ставит врач.",
          "key_fact": "Цинк-зависимый дерматоз типа 1: «северные» породы (хаски, маламут); в серии 41 случая преобладал хаски (White 2001); наследуемая неспособность всасывания цинка.",
          "sources": [
            {"label": "White et al. 2001 (41 case), PubMed 11360336", "url": "https://pubmed.ncbi.nlm.nih.gov/11360336"},
            {"label": "Clinician's Brief: Zinc-Responsive Dermatosis", "url": "https://www.cliniciansbrief.com/article/zinc-responsive-dermatosis-dogs"}
          ]
        }
      ]
    },
    {
      "id": "englishcocker",
      "species": "dog",
      "name": "Английский кокер-спаниель",
      "name_en": "English Cocker Spaniel",
      "aliases": ["кокер", "английский кокер", "english cocker spaniel", "кокер-спаниель"],
      "tagline": "уши, которые слышат больше, чем надо",
      "conditions": [
        {
          "disease": "Отит наружного уха (Otitis externa)",
          "system": "дерматология",
          "evidence": "A",
          "hook": "Уши кокера — головная боль породы",
          "plain": "Длинные висячие уши + узкий канал = парник: выделения из ушей у английского кокера почти в 15 раз вероятнее среднего по первичке. Сушить после купания, не ковырять вглубь, и не «само пройдёт» при запахе.",
          "key_fact": "English Cocker Spaniel: наивысший риск ушных выделений — почти ×15 против среднего (VetCompass 2024); порода в топе отита наружного уха (O'Neill 2021: 4.97% случаев).",
          "sources": [
            {"label": "RVC VetCompass: ear & eye disease in English Cocker Spaniels", "url": "https://www.rvc.ac.uk/vetcompass/news/new-research-highlights-high-risk-of-ear-and-eye-disease-in-english-cocker-spaniels-in-the-uk"},
            {"label": "O'Neill et al. 2021 (otitis externa, UK), PMC8422687", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8422687"}
          ]
        }
      ]
    },
    {
      "id": "abyssinian",
      "species": "cat",
      "name": "Абиссинская",
      "name_en": "Abyssinian",
      "aliases": ["абиссинская", "абиссинская кошка", "abyssinian", "абиссинка", "сомалийская"],
      "tagline": "маленькая дикая и искристая",
      "conditions": [
        {
          "disease": "Пируваткиназная недостаточность эритроцитов (PK-дефицит)",
          "system": "гематология",
          "evidence": "A",
          "hook": "Абиссинка: батарейка без электролита",
          "plain": "PK-дефицит — дефект выработки энергии в эритроцитах: клетки рано истощаются, у кота с молодости анемия. Аллель в породе частый (13–21% и выше в разных странах). ДНК-тест стандартный: носители здоровы, но пара двух носителей = больные котята.",
          "key_fact": "Частота мутантного аллеля PK у абиссинских: 0.13–0.29 (Grahn 2012, Австралия), 0.214 (Япония, Kushida 2015); генетический тест доступен.",
          "sources": [
            {"label": "Grahn et al. 2012, BMC Vet Res (PK-def 38 пород)", "url": "https://link.springer.com/article/10.1186/1746-6148-8-207"},
            {"label": "Kushida et al. 2015 (частоты аллеля, Япония), PMC4488416", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4488416"},
            {"label": "UC Davis VGL: PK Deficiency (cat)", "url": "https://vgl.ucdavis.edu/test/pk-deficiency-cat"}
          ]
        }
      ]
    },
    {
      "id": "bengal",
      "species": "cat",
      "name": "Бенгальская",
      "name_en": "Bengal",
      "aliases": ["бенгальская", "бенгал", "bengal", "бенгальская кошка"],
      "tagline": "мини-леопард в аренде квартиры",
      "conditions": [
        {
          "disease": "Пируваткиназная недостаточность эритроцитов (PK-дефицит)",
          "system": "гематология",
          "evidence": "A",
          "hook": "Бенгал: тот же PK-дефицит, своя цифра",
          "plain": "PK-дефицит дотянулся и до бенгалов: аллель в породе — самый высокий уровень среди проверенных линий. Внешне леопард, внутри — та же генетика носителей: тест до вязки обязателен, анемия у потомства лечится плохо.",
          "key_fact": "Мутантный аллель PK у бенгалов: 0.164 вне Японии (Kushida 2015); мутация выявлена по панелям 38 пород (VGL).",
          "sources": [
            {"label": "Kushida et al. 2015, PMC4488416", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4488416"},
            {"label": "UC Davis VGL: PK Deficiency (cat)", "url": "https://vgl.ucdavis.edu/test/pk-deficiency-cat"}
          ]
        }
      ]
    },
    {
      "id": "burmese",
      "species": "cat",
      "name": "Бурманская",
      "name_en": "Burmese",
      "aliases": ["бурма", "бурманская", "burmese", "бурманская кошка"],
      "tagline": "собака в кошачьей таре",
      "conditions": [
        {
          "disease": "Периодическая гипокалиемическая полимиопатия",
          "system": "неврология",
          "evidence": "A",
          "hook": "Бурма падает — калий утёк",
          "plain": "У молодых бурм эпизоды мышечной слабости: кот «обмякает», голова виснет — при этом калий в крови падает. Эпизоды снимаются, но генетика остаётся: рецессивная WNK4, встречается от Австралии до Европы. Тест есть — у породного заводчика он в базовом пакете.",
          "key_fact": "Генетическая болезнь бурманских кошек (аутосомно-рецессивно, WNK4): эпизоды гипокалиемии и мышечной слабости; встречается в Австралии/Европе/ЮАР (Malik 2015; VGL).",
          "sources": [
            {"label": "Malik et al. 2015, PMC10816241", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10816241"},
            {"label": "UC Davis VGL: Burmese Hypokalemia", "url": "https://vgl.ucdavis.edu/test/burmese-hypokalemia"}
          ]
        }
      ]
    },
    {
      "id": "devonrex",
      "species": "cat",
      "name": "Девон-рекс",
      "name_en": "Devon Rex",
      "aliases": ["девон рекс", "девон-рекс", "devon rex", "девон"],
      "tagline": "эльф с кудрями и тёплыми ушами",
      "conditions": [
        {
          "disease": "Врождённый миастенический синдром (COLQ)",
          "system": "неврология",
          "evidence": "A",
          "hook": "Девон-рекс обвис — проверь COLQ, а не «устал поиграть»",
          "plain": "Сигнал с нерва на мышцу пробуксовывает из-за мутации COLQ: после игры слабость, шея обвисает, глотать сложнее — вплоть до мегаэзофагуса. Наследуется рецессивно, тест существует. Девоны и сфинксы — одна генетическая история здесь.",
          "key_fact": "COLQ-вариант Devon Rex/Sphynx: врождённая миастения — слабость аксиальной и аппендикулярной мускулатуры, мегаэзофагус; аутосомно-рецессивно (Gandolfi 2015; VGL).",
          "sources": [
            {"label": "Gandolfi et al. 2015, PubMed 26374066", "url": "https://pubmed.ncbi.nlm.nih.gov/26374066"},
            {"label": "Malik et al. 1993 (hereditary myopathy of Devon rex), Wiley", "url": "https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1748-5827.1993.tb03544.x"},
            {"label": "UC Davis VGL: Sphynx & Devon Rex CMS", "url": "https://vgl.ucdavis.edu/test/sphynx-and-devon-rex-cms"}
          ]
        }
      ]
    },
    {
      "id": "exoticshorthair",
      "species": "cat",
      "name": "Экзотическая короткошёрстная",
      "name_en": "Exotic Shorthair",
      "aliases": ["экзот", "экзотическая", "exotic shorthair", "экзотическая короткошёрстная"],
      "tagline": "перс, который не расчёсывается",
      "conditions": [
        {
          "disease": "Поликистоз почек (PKD)",
          "system": "нефрология",
          "evidence": "A",
          "hook": "Экзот — перс без причёски, но с персидскими почками",
          "plain": "Короткая шерсть — единственное, что экзот унаследовал без багажа: PKD идёт с персидской родословной, у 39% породы по УЗИ-скринингу. Кисты растут всю жизнь — эхо почек котёнку и ДНК-тест PKD1 это базовая гигиена породы.",
          "key_fact": "PKD у 39.1% экзотических короткошёрстных (УЗИ-скрининг Barthez 2003); в 1990-х — более трети персов и экзотов до внедрения скрининга (iCatCare).",
          "sources": [
            {"label": "Barthez et al. 2003, PubMed 14623204", "url": "https://pubmed.ncbi.nlm.nih.gov/14623204"},
            {"label": "International Cat Care: Persian cats and brachycephaly", "url": "https://icatcare.org/articles/persian-cats-and-brachycephaly"}
          ]
        }
      ]
    },
    {
      "id": "siamese",
      "species": "cat",
      "name": "Сиамская",
      "name_en": "Siamese",
      "aliases": ["сиамская", "сиамка", "siamese", "сиамская кошка"],
      "tagline": "голос и взгляд из девятнадцатого века",
      "conditions": [
        {
          "disease": "Опухоли молочных желёз",
          "system": "онкология",
          "evidence": "B",
          "hook": "Сиамская и «шестая пара» — раньше срока",
          "plain": "Опухоли молочных желёз у сиамских находят чаще и моложе, чем у среднего кота — породная история. Ранняя стерилизация сильно режет риск. Гладить кошку — заодно и живот: уплотнения под кожей молочных линий — повод не ждать.",
          "key_fact": "Сиамские и ориентальные — предрасположены к опухолям молочных желёз, диагностируются в более молодом возрасте (Morris 2013; JSAP 2023).",
          "sources": [
            {"label": "Morris et al. 2013, PMC10816587 (Mammary Tumours in the Cat)", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10816587"},
            {"label": "Epidemiology and risk factors for mammary tumours in cats, JSAP 2023", "url": "https://onlinelibrary.wiley.com/doi/10.1111/jsap.13598"}
          ]
        }
      ]
    }
  ]
};
