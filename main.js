const fs = require("fs");

const alphabet = {
  ru: "абвгдеёжзийклмнопрстуфхцчшщъыьэюя",
  eng: "abcdefghijklmnopqrstuvwxyz",
};

function Salat(str, shift, language) {
  const targetAlphabet = alphabet[language];
  return str
    .toLowerCase()
    .split("")
    .map((char) => {
      const index = targetAlphabet.indexOf(char);
      if (index !== -1) {
        const newIndex = (index + shift) % targetAlphabet.length;
        return targetAlphabet[newIndex];
      }
      return char;
    })
    .join("");
}

function getFrequency(input) {
  const frequency = {};
  const sanitizedInput = input.replace(/\s/g, "").toLowerCase();
  const totalChars = sanitizedInput.length;
  for (let i = 0; i < totalChars; i++) {
    const char = sanitizedInput[i];
    frequency[char] = (frequency[char] || 0) + 1 / totalChars;
  }
  return frequency;
}

function findShift(table1, table2, language, trying) {
  const sortedTable1 = Object.entries(table1).sort((a, b) => b[1] - a[1]);
  const sortedTable2 = Object.entries(table2).sort((a, b) => b[1] - a[1]);
  const alphabetForLanguage = alphabet[language];
  return (
    alphabetForLanguage.indexOf(sortedTable2[trying][0]) -
    alphabetForLanguage.indexOf(sortedTable1[0][0])
  );
}

const input_ru = fs.readFileSync("russian.txt", "utf8");
const input_eng = fs.readFileSync("english.txt", "utf8");

let text_ru = `Предательство — это одно из самых глубоких и низменных проявлений человеческой природы. Это явление, которое оказывает разрушительное воздействие на отношения между людьми, на доверие и на общественную солидарность. Предательство порождает страдание, разочарование и потерю веры в людей.

Предательство может принимать разные формы и проявляться на разных уровнях: в семейных отношениях, дружбе, бизнесе, политике и даже национальном уровне. Возможно, одна из самых болезненных форм предательства — это измена близкого человека, который был когда-то объектом доверия, любви и поддержки. Такое предательство оставляет глубокий шрам на душе и требует времени для исцеления.

Предательство в дружеских отношениях приводит к потере веры в других людей. Когда человек, которому мы доверяли, обманывает нас или выдаёт наши секреты, это вызывает ощущение разочарования и утраты близости. Доверие, которое было построено годами, может быть разрушено одним актом предательства.

На более широком общественном уровне, предательство может принимать форму измены своей стране или своим идеалам. Политические предатели предают принципы, ради собственных выгод или власти. Они обманывают и манипулируют людьми, нарушают обещания и договорённости, разрушая основы доверия в обществе.

Однако, важно помнить, что предательство не является неизбежным атрибутом человеческой природы. В то же время, как предательство может нанести серьезный удар, доброта, верность и преданность являются противоядием к этому отрицательному явлению. Важно стремиться к созданию доверительных отношений, где люди чувствуют себя защищенными и поддержанными.

Предательство — это тема, которая волнует и тревожит нас. Она напоминает нам о сложности человеческих отношений и необходимости бережного отнош`;

let text_eng = `Betrayal is one of the deepest and basest manifestations of human nature. This is a phenomenon that has a devastating effect on human relations, on trust and on social solidarity. Betrayal breeds suffering, frustration and loss of faith in people.

Betrayal can take different forms and manifest itself at different levels: in family relationships, friendship, business, politics and even at the national level. Perhaps one of the most painful forms of betrayal is the betrayal of a loved one who was once an object of trust, love and support. Such betrayal leaves a deep scar on the soul and takes time to heal.

Betrayal in a friendly relationship leads to a loss of faith in other people. When a person we trusted deceives us or gives away our secrets, it causes a feeling of disappointment and loss of intimacy. A trust that has been built over the years can be destroyed by a single act of betrayal.

On a broader social level, betrayal can take the form of treason against one's country or one's ideals. Political traitors betray principles, for the sake of their own benefits or power. They deceive and manipulate people, break promises and agreements, destroying the foundations of trust in society.

However, it is important to remember that betrayal is not an inevitable attribute of human nature. At the same time, as betrayal can cause a serious blow, kindness, loyalty and devotion are the antidote to this negative phenomenon. It is important to strive to create trusting relationships where people feel protected and supported.

Betrayal is a topic that worries and worries us. It reminds us of the complexity of human relationships and the need for careful`;

let shift = 5;
let language = "eng";

let shiftedText = Salat(
  language === "ru" ? text_ru : text_eng,
  shift,
  language
);
let table1 = getFrequency(language === "ru" ? input_ru : input_eng);
let table2 = getFrequency(shiftedText);
let decodshift = findShift(table1, table2, language, 0);
if (decodshift < 0) decodshift += alphabet[language].length;
let decodeStr = Salat(shiftedText, decodshift, language);

console.log("Зашифрованный текст:", shiftedText);
console.log(
  "-------------------------------------------------------------------------------\n"
);
console.log("Декодированный текст:", decodeStr);
console.log(
  "-------------------------------------------------------------------------------\n"
);
console.table([{ "✅ Изначальный сдвиг": shift }]);
console.table([{ "1️⃣ Сдвиг первичным анализом частот": decodshift }]);
console.table([
  {
    "2️⃣ Сдвиг вторичным анализом частот": findShift(
      table1,
      table2,
      language,
      1
    ),
  },
]);
