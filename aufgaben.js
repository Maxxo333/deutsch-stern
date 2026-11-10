/* Lernaufgaben für die Deutsch-App (Klasse 5)
   Fest eingebaut, offline nutzbar. Nur globale Zuweisungen. */

window.WELTEN = [
  { id: "buchstabenwald", name: "Buchstabenwald", emoji: "🌳", farbe: "#4caf50", thema: "Rechtschreibung & Groß-/Kleinschreibung" },
  { id: "wortartenwiese", name: "Wortarten-Wiese", emoji: "🌼", farbe: "#f4a62a", thema: "Nomen, Verben, Adjektive" },
  { id: "satzbaustadt", name: "Satzbau-Stadt", emoji: "🏙️", farbe: "#3f8fd2", thema: "Satzbau & Satzzeichen" },
  { id: "wortschatzinsel", name: "Wortschatz-Insel", emoji: "🏝️", farbe: "#17a2a2", thema: "Synonyme & passende Ausdrücke" },
  { id: "lesespuren", name: "Lesespuren", emoji: "🔎", farbe: "#8e5cc4", thema: "Texte lesen und verstehen" },
  { id: "schreibwerkstatt", name: "Schreibwerkstatt", emoji: "✏️", farbe: "#e0607e", thema: "Kleine Geschichten schreiben" }
];

/* Lesetexte (werden je 3-mal verwendet) */
var TEXT_SCHLUESSEL = "Mia kommt von der Schule nach Hause. Sie sucht in ihrer Jacke nach dem Schlüssel. Doch die Tasche ist leer. Mia bekommt einen Schreck. Ihre Eltern arbeiten noch bis vier Uhr. Sie überlegt kurz. Dann geht sie zur Nachbarin, Frau Berger. Frau Berger hat einen zweiten Schlüssel für Notfälle. Sie lächelt und sagt: „Komm herein. Ich mache dir erst einmal einen Kakao.“ Später findet Mia ihren Schlüssel. Er lag die ganze Zeit in ihrem Turnbeutel. Mia lacht erleichtert. Morgen will sie ihn an einem bunten Band befestigen.";

var TEXT_IGEL = "Im Herbst werden die Tage kürzer und kälter. Für Igel ist das eine wichtige Zeit. Sie fressen jetzt besonders viel, zum Beispiel Käfer, Würmer und Schnecken. So legen sie ein dickes Fettpolster an. Dann suchen sie sich ein sicheres Versteck. Oft ist das ein Haufen aus Laub und Zweigen. Dort rollen sie sich ein und halten Winterschlaf. Ihr Herz schlägt dann ganz langsam. Erst im Frühling wachen sie wieder auf. Wenn du einen Laubhaufen im Garten liegen lässt, hilfst du den Igeln.";

var TEXT_FREUND = "Jonas ist neu in der Klasse 5b. Am ersten Tag kennt er niemanden. In der Pause steht er allein am Zaun. Er schaut den anderen beim Fußball zu. Da kommt ein Junge mit roten Haaren zu ihm. „Hallo, ich bin Emil“, sagt er. „Willst du mitspielen? Uns fehlt noch ein Torwart.“ Jonas nickt schnell. Im Tor hält er zwei schwierige Bälle. Die anderen klatschen. Nach der Pause setzt sich Emil im Unterricht neben Jonas. Auf dem Heimweg merkt Jonas, dass er den ganzen Tag gelächelt hat.";

var TEXT_REGEN = "Lea und ihr Opa machen eine Radtour. Die Sonne scheint, und die Vögel singen. Nach einer Stunde machen sie Pause an einem See. Plötzlich wird der Himmel dunkelgrau. Ein kalter Wind kommt auf. „Schnell, wir müssen los!“, ruft Opa. Die beiden treten kräftig in die Pedale. Die ersten Tropfen fallen, als sie die Hütte am Waldrand erreichen. Kurz danach prasselt der Regen auf das Dach. Lea und Opa sitzen im Trockenen und essen ihre Brote. „Das war knapp“, sagt Lea und grinst.";

window.AUFGABEN = [

  /* ===================== BUCHSTABENWALD (18) ===================== */
  {
    id: "bw-01", welt: "buchstabenwald", typ: "mc",
    frage: "Welcher Satz ist richtig geschrieben?",
    optionen: ["Ich glaube, das es regnet.", "Ich glaube, dass es regnet.", "Ich glaube dass, es regnet."],
    richtig: 1,
    erklaerung: "Hier kannst du „das“ nicht durch „dieses“ oder „welches“ ersetzen. Dann schreibst du „dass“ – und davor steht ein Komma.",
    tipp: "Probiere: Passt „dieses“ oder „welches“ an die Stelle?"
  },
  {
    id: "bw-02", welt: "buchstabenwald", typ: "fehler",
    frage: "Tippe auf das falsch geschriebene Wort.",
    woerter: ["Das", "Buch,", "dass", "auf", "dem", "Tisch", "liegt,", "gehört", "mir."],
    richtig: 2, korrektur: "das",
    erklaerung: "Man kann sagen: „Das Buch, welches auf dem Tisch liegt …“. Kannst du „welches“ einsetzen, schreibst du „das“ mit einem s.",
    tipp: "Setze „welches“ ein. Klingt der Satz dann noch richtig?"
  },
  {
    id: "bw-03", welt: "buchstabenwald", typ: "mc",
    frage: "Welches Wort ist richtig geschrieben?",
    optionen: ["der Fus", "der Fuhs", "der Fuß"],
    richtig: 2,
    erklaerung: "Das u in „Fuß“ ist lang. Nach einem langen Vokal schreibst du den scharfen s-Laut als ß.",
    tipp: "Sprich das Wort langsam. Ist das u lang oder kurz?"
  },
  {
    id: "bw-04", welt: "buchstabenwald", typ: "mc",
    frage: "Welches Wort passt? Wir ___ heute Nudeln.",
    optionen: ["esen", "essen", "eßen"],
    richtig: 1,
    erklaerung: "Das e in „essen“ ist kurz. Nach einem kurzen Vokal schreibst du ss.",
    tipp: "Klingt das e kurz oder lang?"
  },
  {
    id: "bw-05", welt: "buchstabenwald", typ: "fehler",
    frage: "Tippe auf das falsch geschriebene Wort.",
    woerter: ["Am", "Fluß", "sitzt", "ein", "Angler."],
    richtig: 1, korrektur: "Fluss",
    erklaerung: "Das u in „Fluss“ ist kurz. Nach einem kurzen Vokal schreibst du ss, nicht ß.",
    tipp: "Achte auf den s-Laut. Ist der Vokal davor kurz?"
  },
  {
    id: "bw-06", welt: "buchstabenwald", typ: "mc",
    frage: "Welches Wort passt? Opa ___ die Blumen.",
    optionen: ["gisst", "gießt", "gist"],
    richtig: 1,
    erklaerung: "Das ie in „gießt“ ist lang. Nach einem langen Vokal schreibst du ß.",
    tipp: "Sprich das Wort langsam. Ist das i lang oder kurz?"
  },
  {
    id: "bw-07", welt: "buchstabenwald", typ: "mc",
    frage: "Welches Wort ist richtig geschrieben?",
    optionen: ["der Zan", "der Zahn", "der Zaan"],
    richtig: 1,
    erklaerung: "„Zahn“ schreibt man mit Dehnungs-h. Das h steht oft vor l, m, n oder r. Dieses Wort musst du dir merken.",
    tipp: "Das a ist lang. Wie kann man ein langes a vor n kennzeichnen?"
  },
  {
    id: "bw-08", welt: "buchstabenwald", typ: "fehler",
    frage: "Tippe auf das falsch geschriebene Wort.",
    woerter: ["Auf", "der", "Wise", "spielen", "die", "Kinder."],
    richtig: 2, korrektur: "Wiese",
    erklaerung: "Das i in „Wiese“ ist lang. Ein langes i schreibst du meistens als ie.",
    tipp: "Hörst du ein langes oder ein kurzes i?"
  },
  {
    id: "bw-09", welt: "buchstabenwald", typ: "mc",
    frage: "Welches Wort ist richtig geschrieben?",
    optionen: ["die Bine", "die Bihne", "die Biene"],
    richtig: 2,
    erklaerung: "Du hörst ein langes i. Ein langes i schreibst du meistens als ie.",
    tipp: "Wie schreibt man ein langes i meistens?"
  },
  {
    id: "bw-10", welt: "buchstabenwald", typ: "mc",
    frage: "Welches Wort ist richtig geschrieben?",
    optionen: ["das Boot", "das Bot", "das Boht"],
    richtig: 0,
    erklaerung: "„Boot“ schreibt man mit oo. Wörter mit doppeltem Vokal sind Merkwörter, zum Beispiel auch „Moos“ und „Zoo“.",
    tipp: "Das o ist lang. Wie hast du das Wort schon oft gelesen?"
  },
  {
    id: "bw-11", welt: "buchstabenwald", typ: "fehler",
    frage: "Tippe auf das falsch geschriebene Wort.",
    woerter: ["Meine", "Muter", "kocht", "heute", "Suppe."],
    richtig: 1, korrektur: "Mutter",
    erklaerung: "Das u in „Mutter“ ist kurz. Nach einem kurzen Vokal wird der Konsonant oft verdoppelt: tt.",
    tipp: "Sprich das Wort langsam. Ist das u kurz oder lang?"
  },
  {
    id: "bw-12", welt: "buchstabenwald", typ: "mc",
    frage: "Welches Wort ist richtig geschrieben?",
    optionen: ["komen", "kohmen", "kommen"],
    richtig: 2,
    erklaerung: "Das o in „kommen“ ist kurz. Danach verdoppelst du den Konsonanten: mm.",
    tipp: "Sprich das Wort langsam. Ist das o kurz oder lang?"
  },
  {
    id: "bw-13", welt: "buchstabenwald", typ: "fehler",
    frage: "Tippe auf das falsch geschriebene Wort.",
    woerter: ["Im", "Sommer", "schwimen", "wir", "im", "See."],
    richtig: 2, korrektur: "schwimmen",
    erklaerung: "Das i in „schwimmen“ ist kurz. Nach einem kurzen Vokal kommt oft ein doppelter Konsonant: mm.",
    tipp: "Sprich das Wort langsam. Ist das i kurz oder lang?"
  },
  {
    id: "bw-14", welt: "buchstabenwald", typ: "mc",
    frage: "Welcher Satz ist richtig geschrieben?",
    optionen: ["Beim lesen bin ich ganz still.", "Beim Lesen bin ich ganz still.", "beim Lesen bin ich ganz still."],
    richtig: 1,
    erklaerung: "Nach „beim“ wird ein Verb zum Nomen. Dann schreibst du es groß: das Lesen. Auch am Satzanfang schreibst du groß.",
    tipp: "Achte auf das Wort nach „beim“ und auf den Satzanfang."
  },
  {
    id: "bw-15", welt: "buchstabenwald", typ: "fehler",
    frage: "Tippe auf das falsch geschriebene Wort.",
    woerter: ["Das", "schwimmen", "macht", "mir", "Spaß."],
    richtig: 1, korrektur: "Schwimmen",
    erklaerung: "Vor „schwimmen“ steht der Artikel „das“. Mit Artikel wird ein Verb zum Nomen und wird großgeschrieben.",
    tipp: "Steht vor einem Wort ein Artikel?"
  },
  {
    id: "bw-16", welt: "buchstabenwald", typ: "mc",
    frage: "Welches Wort passt? Ich habe etwas ___ erlebt.",
    optionen: ["schönes", "Schönes", "schönnes"],
    richtig: 1,
    erklaerung: "Nach „etwas“ wird ein Adjektiv zum Nomen. Deshalb schreibst du „etwas Schönes“ groß.",
    tipp: "Nach „etwas“, „viel“ und „nichts“ passiert etwas Besonderes."
  },
  {
    id: "bw-17", welt: "buchstabenwald", typ: "fehler",
    frage: "Tippe auf das falsch geschriebene Wort.",
    woerter: ["Der", "hund", "bellt", "laut."],
    richtig: 1, korrektur: "Hund",
    erklaerung: "„Hund“ ist ein Nomen. Nomen schreibst du immer groß.",
    tipp: "Kannst du „der“ vor das Wort setzen?"
  },
  {
    id: "bw-18", welt: "buchstabenwald", typ: "fehler",
    frage: "Tippe auf das falsch geschriebene Wort.",
    woerter: ["heute", "scheint", "die", "Sonne."],
    richtig: 0, korrektur: "Heute",
    erklaerung: "Das erste Wort im Satz schreibst du immer groß.",
    tipp: "Schau dir den Anfang des Satzes an."
  },

  /* ===================== WORTARTEN-WIESE (15) ===================== */
  {
    id: "ww-01", welt: "wortartenwiese", typ: "sortieren",
    frage: "Sortiere die Wörter nach Wortarten.",
    kategorien: ["Nomen", "Verb", "Adjektiv"],
    woerter: [
      { wort: "Baum", kat: 0 }, { wort: "laufen", kat: 1 }, { wort: "grün", kat: 2 },
      { wort: "Katze", kat: 0 }, { wort: "singen", kat: 1 }, { wort: "klein", kat: 2 }
    ],
    erklaerung: "Nomen sind Namen für Dinge und Lebewesen. Verben sagen, was jemand tut. Adjektive sagen, wie etwas ist.",
    tipp: "Frage: Ist es ein Ding, ein Tun oder eine Eigenschaft?"
  },
  {
    id: "ww-02", welt: "wortartenwiese", typ: "sortieren",
    frage: "Sortiere die Wörter nach Wortarten.",
    kategorien: ["Nomen", "Verb", "Adjektiv"],
    woerter: [
      { wort: "Schule", kat: 0 }, { wort: "schreiben", kat: 1 }, { wort: "schnell", kat: 2 },
      { wort: "Freund", kat: 0 }, { wort: "lachen", kat: 1 }, { wort: "müde", kat: 2 }
    ],
    erklaerung: "Vor ein Nomen passt ein Artikel (die Schule). Ein Verb kannst du beugen (ich lache). Ein Adjektiv beschreibt (müde).",
    tipp: "Probiere: der/die/das, ich …, oder: Wie ist es?"
  },
  {
    id: "ww-03", welt: "wortartenwiese", typ: "sortieren",
    frage: "Ist das Wort ein Nomen oder ein Verb?",
    kategorien: ["Nomen", "Verb"],
    woerter: [
      { wort: "Haus", kat: 0 }, { wort: "spielen", kat: 1 }, { wort: "Apfel", kat: 0 },
      { wort: "trinken", kat: 1 }, { wort: "Fenster", kat: 0 }, { wort: "rennen", kat: 1 }
    ],
    erklaerung: "Nomen schreibst du groß und sie haben einen Artikel. Verben sagen, was man tut.",
    tipp: "Kannst du „der“, „die“ oder „das“ davorsetzen?"
  },
  {
    id: "ww-04", welt: "wortartenwiese", typ: "sortieren",
    frage: "Ist das Wort ein Adjektiv oder ein Verb?",
    kategorien: ["Adjektiv", "Verb"],
    woerter: [
      { wort: "warm", kat: 0 }, { wort: "springen", kat: 1 }, { wort: "laut", kat: 0 },
      { wort: "malen", kat: 1 }, { wort: "weich", kat: 0 }, { wort: "bauen", kat: 1 }
    ],
    erklaerung: "Adjektive kannst du steigern: warm, wärmer, am wärmsten. Verben kannst du beugen: ich male, du malst.",
    tipp: "Probiere: „ich …“ oder „sehr …“."
  },
  {
    id: "ww-05", welt: "wortartenwiese", typ: "sortieren",
    frage: "Ist das Wort ein Artikel oder ein Nomen?",
    kategorien: ["Artikel", "Nomen"],
    woerter: [
      { wort: "der", kat: 0 }, { wort: "Tisch", kat: 1 }, { wort: "die", kat: 0 },
      { wort: "Blume", kat: 1 }, { wort: "das", kat: 0 }, { wort: "Pferd", kat: 1 }
    ],
    erklaerung: "Der, die und das sind Artikel. Sie stehen vor einem Nomen: der Tisch, die Blume, das Pferd.",
    tipp: "Artikel sind kurze Begleiter vor einem Nomen."
  },
  {
    id: "ww-06", welt: "wortartenwiese", typ: "sortieren",
    frage: "Sortiere die Wörter nach Wortarten.",
    kategorien: ["Pronomen", "Nomen", "Verb"],
    woerter: [
      { wort: "ich", kat: 0 }, { wort: "wir", kat: 0 }, { wort: "Hund", kat: 1 },
      { wort: "Buch", kat: 1 }, { wort: "lesen", kat: 2 }, { wort: "tanzen", kat: 2 }
    ],
    erklaerung: "Pronomen wie „ich“ und „wir“ stehen für Personen. Nomen sind Namen für Dinge und Lebewesen. Verben sagen, was man tut.",
    tipp: "Welche Wörter stehen für eine Person, ohne ihren Namen zu nennen?"
  },
  {
    id: "ww-07", welt: "wortartenwiese", typ: "mc",
    frage: "Welches Wort ist ein Nomen?",
    optionen: ["schön", "Tisch", "gehen", "und"],
    richtig: 1,
    erklaerung: "„Tisch“ ist ein Nomen. Man kann „der“ davorsetzen: der Tisch.",
    tipp: "Vor ein Nomen passt ein Artikel."
  },
  {
    id: "ww-08", welt: "wortartenwiese", typ: "mc",
    frage: "Welches Wort ist ein Verb?",
    optionen: ["rot", "Garten", "der", "schlafen"],
    richtig: 3,
    erklaerung: "„Schlafen“ ist ein Verb. Es sagt, was jemand tut: ich schlafe.",
    tipp: "Ein Verb sagt, was jemand tut."
  },
  {
    id: "ww-09", welt: "wortartenwiese", typ: "mc",
    frage: "Welches Wort ist ein Adjektiv?",
    optionen: ["Fahrrad", "fröhlich", "fahren", "sie"],
    richtig: 1,
    erklaerung: "„Fröhlich“ ist ein Adjektiv. Es sagt, wie jemand ist: ein fröhliches Kind.",
    tipp: "Ein Adjektiv sagt, wie etwas ist."
  },
  {
    id: "ww-10", welt: "wortartenwiese", typ: "mc",
    frage: "Welcher Artikel passt? ___ Sonne scheint.",
    optionen: ["Der", "Die", "Das"],
    richtig: 1,
    erklaerung: "Es heißt „die Sonne“. „Sonne“ ist weiblich, und weibliche Nomen bekommen den Artikel „die“.",
    tipp: "Sprich alle drei laut vor dich hin."
  },
  {
    id: "ww-11", welt: "wortartenwiese", typ: "mc",
    frage: "Welcher Artikel passt? ___ Auto ist rot.",
    optionen: ["Der", "Die", "Das"],
    richtig: 2,
    erklaerung: "Es heißt „das Auto“. „Auto“ ist sächlich, und sächliche Nomen bekommen den Artikel „das“.",
    tipp: "Sprich alle drei laut vor dich hin."
  },
  {
    id: "ww-12", welt: "wortartenwiese", typ: "mc",
    frage: "Lena malt ein Bild. Dann zeigt ___ es ihrer Oma. Welches Pronomen passt?",
    optionen: ["er", "sie", "es"],
    richtig: 1,
    erklaerung: "Lena ist ein Mädchen. Für sie setzt du das Pronomen „sie“ ein.",
    tipp: "Wer zeigt das Bild?"
  },
  {
    id: "ww-13", welt: "wortartenwiese", typ: "mc",
    frage: "Welches Wort ist ein Pronomen?",
    optionen: ["Mama", "laufen", "wir", "bunt"],
    richtig: 2,
    erklaerung: "„Wir“ ist ein Pronomen. Pronomen stehen für Personen oder Dinge, zum Beispiel ich, du, er, sie, es, wir, ihr.",
    tipp: "Ein Pronomen ist ein Stellvertreter für ein Nomen."
  },
  {
    id: "ww-14", welt: "wortartenwiese", typ: "mc",
    frage: "„Der kleine Hase hüpft.“ Welches Wort ist das Adjektiv?",
    optionen: ["Der", "kleine", "Hase", "hüpft"],
    richtig: 1,
    erklaerung: "„Kleine“ sagt, wie der Hase ist. Das ist ein Adjektiv.",
    tipp: "Frage: Wie ist der Hase?"
  },
  {
    id: "ww-15", welt: "wortartenwiese", typ: "mc",
    frage: "Welche Verbform passt? Du ___ ein Lied.",
    optionen: ["singt", "singen", "singst"],
    richtig: 2,
    erklaerung: "Zu „du“ gehört die Endung -st: du singst.",
    tipp: "Welche Endung gehört zu „du“?"
  },

  /* ===================== SATZBAU-STADT (15) ===================== */
  {
    id: "sb-01", welt: "satzbaustadt", typ: "satz",
    frage: "Bilde einen richtigen Satz.",
    woerter: ["Der", "Hund", "spielt", "im", "Garten."],
    erklaerung: "Im Aussagesatz steht das Verb an zweiter Stelle. Der Satz beginnt groß und endet mit einem Punkt.",
    tipp: "Das großgeschriebene „Der“ kommt nach vorn."
  },
  {
    id: "sb-02", welt: "satzbaustadt", typ: "satz",
    frage: "Bilde einen richtigen Satz.",
    woerter: ["Heute", "gehen", "wir", "ins", "Kino."],
    erklaerung: "Das Verb „gehen“ steht an zweiter Stelle. Danach kommt „wir“.",
    tipp: "Das Verb steht direkt nach dem ersten Satzglied."
  },
  {
    id: "sb-03", welt: "satzbaustadt", typ: "satz",
    frage: "Bilde einen richtigen Satz.",
    woerter: ["Meine", "Schwester", "liest", "ein", "Buch."],
    erklaerung: "Wer? Meine Schwester. Was tut sie? Sie liest. Was? Ein Buch. Im Aussagesatz steht das Verb an zweiter Stelle.",
    tipp: "Frage: Wer tut etwas?"
  },
  {
    id: "sb-04", welt: "satzbaustadt", typ: "satz",
    frage: "Bilde einen richtigen Satz.",
    woerter: ["Am", "Abend", "spielt", "Tom", "Fußball."],
    erklaerung: "„Am Abend“ ist das erste Satzglied. Dann folgt das Verb an zweiter Stelle.",
    tipp: "Wann? Am Abend. Was kommt dann?"
  },
  {
    id: "sb-05", welt: "satzbaustadt", typ: "satz",
    frage: "Bilde einen richtigen Satz.",
    woerter: ["Die", "Katze", "schläft", "auf", "dem", "Sofa."],
    erklaerung: "Wer? Die Katze. Was tut sie? Sie schläft. Wo? Auf dem Sofa. Im Aussagesatz steht das Verb an zweiter Stelle.",
    tipp: "Beginne mit dem großgeschriebenen Artikel."
  },
  {
    id: "sb-06", welt: "satzbaustadt", typ: "satz",
    frage: "Bilde einen richtigen Fragesatz.",
    woerter: ["Wann", "beginnt", "die", "Schule?"],
    erklaerung: "In einer W-Frage steht das Fragewort vorn. Danach kommt das Verb. Am Ende steht ein Fragezeichen.",
    tipp: "Das Fragewort steht ganz vorn."
  },
  {
    id: "sb-07", welt: "satzbaustadt", typ: "satz",
    frage: "Bilde einen richtigen Satz.",
    woerter: ["Nach", "der", "Schule", "mache", "ich", "Hausaufgaben."],
    erklaerung: "„Nach der Schule“ ist das erste Satzglied. Danach steht das Verb „mache“ an zweiter Stelle.",
    tipp: "Wann? Nach der Schule. Was kommt dann?"
  },
  {
    id: "sb-08", welt: "satzbaustadt", typ: "mc",
    frage: "Welcher Satz hat die richtigen Kommas?",
    optionen: ["Ich kaufe Äpfel Birnen und Bananen.", "Ich kaufe Äpfel, Birnen, und Bananen.", "Ich kaufe Äpfel, Birnen und Bananen."],
    richtig: 2,
    erklaerung: "Bei einer Aufzählung trennst du die Wörter mit Kommas. Vor „und“ steht kein Komma.",
    tipp: "Was passiert vor dem Wort „und“?"
  },
  {
    id: "sb-09", welt: "satzbaustadt", typ: "mc",
    frage: "Welcher Satz ist richtig?",
    optionen: ["Ich bin müde, aber ich spiele weiter.", "Ich bin müde aber, ich spiele weiter.", "Ich bin müde aber ich spiele weiter."],
    richtig: 0,
    erklaerung: "„Aber“ verbindet hier zwei Satzteile, die einen Gegensatz ausdrücken. Vor „aber“ steht dann ein Komma.",
    tipp: "Das Komma steht vor einem bestimmten Wort."
  },
  {
    id: "sb-10", welt: "satzbaustadt", typ: "mc",
    frage: "Welcher Satz ist richtig?",
    optionen: ["Ich bleibe zu Hause weil ich krank bin.", "Ich bleibe zu Hause, weil ich krank bin.", "Ich bleibe zu Hause weil, ich krank bin."],
    richtig: 1,
    erklaerung: "Vor „weil“ steht ein Komma. Mit „weil“ beginnt ein Nebensatz.",
    tipp: "Das Komma steht vor „weil“, nicht danach."
  },
  {
    id: "sb-11", welt: "satzbaustadt", typ: "mc",
    frage: "Wo fehlt das Komma? Ich weiß dass du gut malen kannst.",
    optionen: ["nach „Ich“", "nach „weiß“", "nach „du“", "nach „gut“"],
    richtig: 1,
    erklaerung: "Mit „dass“ beginnt ein Nebensatz. Er wird mit einem Komma abgetrennt: Ich weiß, dass du gut malen kannst.",
    tipp: "Schau, wo das Wort „dass“ steht."
  },
  {
    id: "sb-12", welt: "satzbaustadt", typ: "mc",
    frage: "Welches Zeichen gehört ans Ende? Wie heißt du",
    optionen: ["Punkt (.)", "Fragezeichen (?)", "Ausrufezeichen (!)"],
    richtig: 1,
    erklaerung: "Der Satz ist eine Frage. Am Ende einer Frage steht ein Fragezeichen.",
    tipp: "Will jemand etwas wissen?"
  },
  {
    id: "sb-13", welt: "satzbaustadt", typ: "mc",
    frage: "Welche Satzart ist das? „Räum bitte dein Zimmer auf!“",
    optionen: ["Aussagesatz", "Fragesatz", "Aufforderungssatz"],
    richtig: 2,
    erklaerung: "Jemand soll etwas tun. Das ist ein Aufforderungssatz. Er endet oft mit einem Ausrufezeichen.",
    tipp: "Wird hier etwas erzählt, gefragt oder verlangt?"
  },
  {
    id: "sb-14", welt: "satzbaustadt", typ: "mc",
    frage: "Welcher Satz mit wörtlicher Rede ist richtig?",
    optionen: ["Mia sagt „Ich habe Hunger.“", "Mia sagt: „Ich habe Hunger.“", "Mia sagt: Ich habe Hunger."],
    richtig: 1,
    erklaerung: "Steht der Begleitsatz vorn, folgt ein Doppelpunkt. Das Gesagte steht in Anführungszeichen.",
    tipp: "Du brauchst einen Doppelpunkt und Anführungszeichen."
  },
  {
    id: "sb-15", welt: "satzbaustadt", typ: "mc",
    frage: "Welcher Satz mit wörtlicher Rede ist richtig?",
    optionen: ["„Komm schnell!“ ruft Ben.", "„Komm schnell“! ruft Ben.", "„Komm schnell!“, ruft Ben."],
    richtig: 2,
    erklaerung: "Steht der Begleitsatz hinten, setzt du nach dem Anführungszeichen ein Komma. Das Ausrufezeichen bleibt in den Anführungszeichen.",
    tipp: "Nach dem schließenden Anführungszeichen fehlt noch etwas."
  },

  /* ===================== WORTSCHATZ-INSEL (15) ===================== */
  {
    id: "wi-01", welt: "wortschatzinsel", typ: "mc",
    frage: "Welches Wort bedeutet fast das Gleiche wie „schnell“?",
    optionen: ["langsam", "rasch", "leise", "schwer"],
    richtig: 1,
    erklaerung: "„Rasch“ bedeutet fast das Gleiche wie „schnell“. Solche Wörter heißen Synonyme.",
    tipp: "Suche ein Wort mit gleicher Bedeutung."
  },
  {
    id: "wi-02", welt: "wortschatzinsel", typ: "mc",
    frage: "Welches Wort bedeutet fast das Gleiche wie „beginnen“?",
    optionen: ["aufhören", "warten", "anfangen", "schlafen"],
    richtig: 2,
    erklaerung: "„Anfangen“ und „beginnen“ sind Synonyme. Sie bedeuten fast das Gleiche.",
    tipp: "„Aufhören“ ist das Gegenteil."
  },
  {
    id: "wi-03", welt: "wortschatzinsel", typ: "mc",
    frage: "Welches Wort bedeutet fast das Gleiche wie „sprechen“?",
    optionen: ["reden", "schweigen", "laufen", "hören"],
    richtig: 0,
    erklaerung: "„Reden“ und „sprechen“ sind Synonyme. Synonyme sind Wörter mit fast gleicher Bedeutung.",
    tipp: "Was macht dein Mund, wenn du etwas sagst?"
  },
  {
    id: "wi-04", welt: "wortschatzinsel", typ: "mc",
    frage: "Was ist das Gegenteil von „hell“?",
    optionen: ["klar", "bunt", "sonnig", "dunkel"],
    richtig: 3,
    erklaerung: "Das Gegenteil von „hell“ ist „dunkel“. Gegenteile heißen auch Antonyme.",
    tipp: "Denk an die Nacht."
  },
  {
    id: "wi-05", welt: "wortschatzinsel", typ: "mc",
    frage: "Was ist das Gegenteil von „mutig“?",
    optionen: ["stark", "ängstlich", "froh", "klug"],
    richtig: 1,
    erklaerung: "Wer mutig ist, hat keine Angst. Das Gegenteil ist „ängstlich“.",
    tipp: "Wie ist jemand, der sich viel fürchtet?"
  },
  {
    id: "wi-06", welt: "wortschatzinsel", typ: "mc",
    frage: "Was ist das Gegenteil von „gewinnen“?",
    optionen: ["spielen", "finden", "verlieren", "kämpfen"],
    richtig: 2,
    erklaerung: "Das Gegenteil von „gewinnen“ ist „verlieren“. Wörter mit entgegengesetzter Bedeutung nennt man Gegenteile.",
    tipp: "Was passiert, wenn das andere Team gewinnt?"
  },
  {
    id: "wi-07", welt: "wortschatzinsel", typ: "mc",
    frage: "Was ist das Gegenteil von „voll“?",
    optionen: ["leer", "groß", "schwer", "rund"],
    richtig: 0,
    erklaerung: "Das Gegenteil von „voll“ ist „leer“. Wörter mit entgegengesetzter Bedeutung nennt man Gegenteile.",
    tipp: "Wie ist ein Glas, wenn nichts mehr drin ist?"
  },
  {
    id: "wi-08", welt: "wortschatzinsel", typ: "mc",
    frage: "Welches Wort passt am besten? Das Wasser im See ist sehr ___. Wir können bis zum Boden sehen.",
    optionen: ["laut", "klar", "hungrig", "schnell"],
    richtig: 1,
    erklaerung: "Wenn man bis zum Boden sehen kann, ist das Wasser klar.",
    tipp: "Lies den zweiten Satz genau."
  },
  {
    id: "wi-09", welt: "wortschatzinsel", typ: "mc",
    frage: "Welches Wort passt? Der Löwe ___ laut.",
    optionen: ["bellt", "miaut", "zwitschert", "brüllt"],
    richtig: 3,
    erklaerung: "Ein Löwe brüllt. Ein Hund bellt, eine Katze miaut und ein Vogel zwitschert.",
    tipp: "Welches Geräusch macht ein Löwe?"
  },
  {
    id: "wi-10", welt: "wortschatzinsel", typ: "mc",
    frage: "Welches Wort passt? Es regnet stark. Ich nehme meinen ___ mit.",
    optionen: ["Löffel", "Ball", "Regenschirm", "Kamm"],
    richtig: 2,
    erklaerung: "Ein Regenschirm schützt dich vor dem Regen.",
    tipp: "Was hält dich trocken?"
  },
  {
    id: "wi-11", welt: "wortschatzinsel", typ: "mc",
    frage: "Welches Wort gehört NICHT zum Wortfeld „gehen“?",
    optionen: ["schlendern", "rennen", "flüstern", "schleichen"],
    richtig: 2,
    erklaerung: "Schlendern, rennen und schleichen sind Arten, sich zu Fuß zu bewegen. „Flüstern“ gehört zum Wortfeld „sagen“.",
    tipp: "Bei welchem Wort benutzt du nicht deine Beine?"
  },
  {
    id: "wi-12", welt: "wortschatzinsel", typ: "mc",
    frage: "Welches Wort gehört zum Wortfeld „sagen“?",
    optionen: ["hüpfen", "rufen", "kochen", "schlafen"],
    richtig: 1,
    erklaerung: "„Rufen“ ist eine Art, etwas zu sagen. Es gehört zum Wortfeld „sagen“.",
    tipp: "Bei welchem Wort benutzt du deine Stimme?"
  },
  {
    id: "wi-13", welt: "wortschatzinsel", typ: "mc",
    frage: "Welcher Oberbegriff passt zu: Apfel, Birne, Kirsche?",
    optionen: ["Gemüse", "Blumen", "Tiere", "Obst"],
    richtig: 3,
    erklaerung: "Apfel, Birne und Kirsche sind Obst. „Obst“ ist der Oberbegriff.",
    tipp: "Diese Dinge wachsen an Bäumen und sind süß."
  },
  {
    id: "wi-14", welt: "wortschatzinsel", typ: "mc",
    frage: "Welches Wort beschreibt ein Gefühl?",
    optionen: ["eckig", "traurig", "nass", "hölzern"],
    richtig: 1,
    erklaerung: "„Traurig“ beschreibt, wie sich jemand fühlt. Es gehört zum Wortfeld „Gefühle“.",
    tipp: "Wie kann sich ein Mensch fühlen?"
  },
  {
    id: "wi-15", welt: "wortschatzinsel", typ: "mc",
    frage: "Welches Wort passt? Nach dem langen Lauf war Paul sehr ___.",
    optionen: ["erschöpft", "ausgeschlafen", "leise", "eckig"],
    richtig: 0,
    erklaerung: "Nach einem langen Lauf ist man müde und ohne Kraft. Das heißt „erschöpft“.",
    tipp: "Wie fühlt man sich nach viel Anstrengung?"
  },

  /* ===================== LESESPUREN (4 Texte × 3) ===================== */
  {
    id: "ls-01", welt: "lesespuren", typ: "lesen",
    titel: "Der verlorene Schlüssel", text: TEXT_SCHLUESSEL,
    frage: "Bis wann arbeiten Mias Eltern?",
    optionen: ["bis zwei Uhr", "bis vier Uhr", "bis sechs Uhr", "bis acht Uhr"],
    richtig: 1,
    erklaerung: "Im Text steht: „Ihre Eltern arbeiten noch bis vier Uhr.“",
    tipp: "Suche im Text nach einer Uhrzeit."
  },
  {
    id: "ls-02", welt: "lesespuren", typ: "lesen",
    titel: "Der verlorene Schlüssel", text: TEXT_SCHLUESSEL,
    frage: "Warum will Mia den Schlüssel an einem bunten Band befestigen?",
    optionen: ["Weil Frau Berger es so will.", "Damit der Schlüssel schwerer wird.", "Damit sie ihn leichter findet.", "Weil das Band gut riecht."],
    richtig: 2,
    erklaerung: "Mia hat den Schlüssel lange nicht gefunden. Mit einem bunten Band sieht sie ihn schneller.",
    tipp: "Denk daran, was Mia heute passiert ist."
  },
  {
    id: "ls-03", welt: "lesespuren", typ: "lesen",
    titel: "Der verlorene Schlüssel", text: TEXT_SCHLUESSEL,
    frage: "Mia lacht „erleichtert“. Was bedeutet das?",
    optionen: ["Sie ist froh, weil ihre Sorge weg ist.", "Sie ist sehr müde.", "Sie ist ein bisschen wütend.", "Sie ist traurig und allein."],
    richtig: 0,
    erklaerung: "Mia hatte Angst um ihren Schlüssel. Jetzt ist er wieder da. Die Sorge ist weg – sie ist erleichtert.",
    tipp: "Wie fühlt man sich, wenn man etwas Verlorenes wiederfindet?"
  },
  {
    id: "ls-04", welt: "lesespuren", typ: "lesen",
    titel: "Die Igel im Herbst", text: TEXT_IGEL,
    frage: "Wo verstecken sich Igel oft für den Winterschlaf?",
    optionen: ["in einem Baumhaus", "in einem Haufen aus Laub und Zweigen", "in einem Teich", "auf einem Dach"],
    richtig: 1,
    erklaerung: "Im Text steht: „Oft ist das ein Haufen aus Laub und Zweigen.“",
    tipp: "Lies den Satz nach dem Wort „Versteck“."
  },
  {
    id: "ls-05", welt: "lesespuren", typ: "lesen",
    titel: "Die Igel im Herbst", text: TEXT_IGEL,
    frage: "Warum fressen Igel im Herbst so viel?",
    optionen: ["Sie wollen schneller laufen.", "Im Herbst schmeckt alles besser.", "Sie müssen ihre Jungen füttern.", "Sie brauchen ein Fettpolster für den Winterschlaf."],
    richtig: 3,
    erklaerung: "Im Text steht: „So legen sie ein dickes Fettpolster an.“ Davon leben sie im Winterschlaf.",
    tipp: "Was legen die Igel durch das viele Fressen an?"
  },
  {
    id: "ls-06", welt: "lesespuren", typ: "lesen",
    titel: "Die Igel im Herbst", text: TEXT_IGEL,
    frage: "Was ist ein „Versteck“?",
    optionen: ["ein großes Fest", "ein Ort, an dem man nicht leicht gefunden wird", "ein Weg durch den Wald", "eine Art Futter"],
    richtig: 1,
    erklaerung: "In einem Versteck ist man gut verborgen. Andere finden einen dort nicht leicht.",
    tipp: "Denk an das Spiel „Verstecken“."
  },
  {
    id: "ls-07", welt: "lesespuren", typ: "lesen",
    titel: "Ein neuer Freund", text: TEXT_FREUND,
    frage: "Welche Aufgabe hat Jonas beim Fußball?",
    optionen: ["Er ist Schiedsrichter.", "Er schaut nur zu.", "Er ist Torwart.", "Er schießt alle Tore."],
    richtig: 2,
    erklaerung: "Emil sagt: „Uns fehlt noch ein Torwart.“ Jonas steht dann im Tor.",
    tipp: "Was fehlt der Mannschaft?"
  },
  {
    id: "ls-08", welt: "lesespuren", typ: "lesen",
    titel: "Ein neuer Freund", text: TEXT_FREUND,
    frage: "Wie fühlt sich Jonas am Ende des Tages?",
    optionen: ["glücklich", "wütend", "gelangweilt", "ängstlich"],
    richtig: 0,
    erklaerung: "Jonas hat den ganzen Tag gelächelt. Er hat einen Freund gefunden. Er ist glücklich.",
    tipp: "Lies den letzten Satz genau."
  },
  {
    id: "ls-09", welt: "lesespuren", typ: "lesen",
    titel: "Ein neuer Freund", text: TEXT_FREUND,
    frage: "Jonas „nickt“. Was macht er?",
    optionen: ["Er schüttelt den Kopf.", "Er bewegt den Kopf auf und ab und meint damit „Ja“.", "Er lacht laut.", "Er winkt mit der Hand."],
    richtig: 1,
    erklaerung: "Wer nickt, bewegt den Kopf auf und ab. So sagt man ohne Worte „Ja“.",
    tipp: "Emil hat Jonas eine Frage gestellt. Wie antwortet Jonas?"
  },
  {
    id: "ls-10", welt: "lesespuren", typ: "lesen",
    titel: "Wettlauf mit dem Regen", text: TEXT_REGEN,
    frage: "Wo machen Lea und Opa Pause?",
    optionen: ["auf einem Berg", "in einem Café", "an einem See", "an einem Bahnhof"],
    richtig: 2,
    erklaerung: "Im Text steht: „Nach einer Stunde machen sie Pause an einem See.“",
    tipp: "Suche das Wort „Pause“ im Text."
  },
  {
    id: "ls-11", welt: "lesespuren", typ: "lesen",
    titel: "Wettlauf mit dem Regen", text: TEXT_REGEN,
    frage: "Warum ruft Opa: „Schnell, wir müssen los!“?",
    optionen: ["Er hat großen Hunger.", "Er merkt, dass es bald regnet.", "Der See ist zu kalt.", "Er will ein Rennen gewinnen."],
    richtig: 1,
    erklaerung: "Der Himmel wird dunkelgrau und ein kalter Wind kommt auf. Das sind Zeichen für Regen.",
    tipp: "Was passiert kurz vorher mit dem Himmel?"
  },
  {
    id: "ls-12", welt: "lesespuren", typ: "lesen",
    titel: "Wettlauf mit dem Regen", text: TEXT_REGEN,
    frage: "Lea sagt: „Das war knapp.“ Was meint sie damit?",
    optionen: ["Die Brote waren zu klein.", "Die Radtour war zu kurz.", "Die Hütte ist sehr eng.", "Sie sind gerade noch rechtzeitig angekommen."],
    richtig: 3,
    erklaerung: "Die ersten Tropfen fallen, als sie die Hütte erreichen. Sie sind also gerade noch rechtzeitig im Trockenen.",
    tipp: "Wann fallen die ersten Tropfen?"
  },

  /* ===================== SCHREIBWERKSTATT (6) ===================== */
  {
    id: "sw-01", welt: "schreibwerkstatt", typ: "schreiben",
    frage: "Schreibe die Geschichte weiter.",
    impuls: "Als ich die Tür zum Dachboden öffnete, hörte ich ein leises Geräusch …",
    mindestWoerter: 30,
    tipps: ["Was oder wer macht das Geräusch?", "Wie fühlst du dich dabei?", "Finde einen guten Schluss."],
    erklaerung: "Eine gute Geschichte hat einen Anfang, eine Mitte und einen Schluss. Spannende Wörter machen sie lebendig."
  },
  {
    id: "sw-02", welt: "schreibwerkstatt", typ: "schreiben",
    frage: "Beschreibe dein Lieblingstier.",
    impuls: "Mein Lieblingstier ist …",
    mindestWoerter: 20,
    tipps: ["Wie sieht es aus?", "Was frisst es und wo lebt es?", "Warum magst du es so gern?"],
    erklaerung: "Mit Adjektiven wie „flauschig“ oder „flink“ kann man sich dein Tier gut vorstellen."
  },
  {
    id: "sw-03", welt: "schreibwerkstatt", typ: "schreiben",
    frage: "Erfinde eine Geschichte zu dieser Idee.",
    impuls: "Stell dir vor: Ein Hund trägt einen Regenschirm im Maul und läuft durch die Stadt.",
    mindestWoerter: 30,
    tipps: ["Wohin will der Hund?", "Wem gehört der Schirm?", "Was passiert am Ende?"],
    erklaerung: "Gute Geschichten beantworten die W-Fragen: Wer? Wo? Was? Warum?"
  },
  {
    id: "sw-04", welt: "schreibwerkstatt", typ: "schreiben",
    frage: "Erzähle von deinem schönsten Ferientag.",
    impuls: "Mein schönster Ferientag war, als …",
    mindestWoerter: 30,
    tipps: ["Wo warst du und mit wem?", "Was hast du erlebt?", "Erzähle der Reihe nach."],
    erklaerung: "Beim Erzählen von früher benutzt du die Vergangenheit, zum Beispiel: Wir fuhren, ich sah, es war."
  },
  {
    id: "sw-05", welt: "schreibwerkstatt", typ: "schreiben",
    frage: "Schreibe eine Einladung zu deiner Geburtstagsfeier.",
    impuls: "Liebe Lea, ich lade dich zu meiner Geburtstagsfeier ein.",
    mindestWoerter: 25,
    tipps: ["Schreibe, wann und wo die Feier ist.", "Was werdet ihr machen?", "Vergiss deinen Namen am Schluss nicht."],
    erklaerung: "Eine Einladung sagt: Wer lädt ein? Wann? Wo? Was passiert? Am Ende steht ein Gruß."
  },
  {
    id: "sw-06", welt: "schreibwerkstatt", typ: "schreiben",
    frage: "Stell dir vor, du kannst einen Tag lang fliegen. Erzähle davon.",
    impuls: "Heute Morgen merkte ich plötzlich, dass ich fliegen kann …",
    mindestWoerter: 40,
    tipps: ["Wohin fliegst du zuerst?", "Was siehst du von oben?", "Was passiert am Abend?"],
    erklaerung: "In Fantasiegeschichten darf alles passieren. Beschreibe genau, was du siehst und fühlst."
  }
];
