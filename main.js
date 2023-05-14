const rus = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
const eng = "abcdefghijklmnopqrstuvwxyz";
const digits = "0123456789";

//*Работает с ru и eng алфавитом
function Salat(str, shift) {
  str = str.toLowerCase();
  let res = "";
  for (let i = 0; i < str.length; i++) {
    if (rus.includes(str[i])) {
      let index = rus.indexOf(str[i]);
      index = (index + shift + rus.length) % rus.length; // Добавлено условие для отрицательного сдвига
      res += rus[index];
    } else if (eng.includes(str[i])) {
      let index = eng.indexOf(str[i]);
      index = (index + shift + eng.length) % eng.length;
      res += eng[index];
    } else if (digits.includes(str[i])) {
      let index = digits.indexOf(str[i]);
      index = (index + shift + digits.length) % digits.length;
      res += digits[index];
    } else {
      res += str[i];
    }
  }
  return res;
}

const fs = require("fs"); //* Модуль для работы с файлами
let input_ru = fs.readFileSync("russian.txt", "utf8"); //*Считываем input файл
let input_eng = fs.readFileSync("english.txt", "utf8"); //*Считываем input файл

function getFrequency(input) {
  const frequency = {};
  input = input.replace(/\s/g, "").toLowerCase();
  let all = input.length;
  input = input.toLowerCase();
  for (let char of input) {
    if (char in frequency) {
      frequency[char]++;
    } else {
      frequency[char] = 1;
    }
  }
  for (let char in frequency) {
    frequency[char] /= all;
  }
  return frequency;
}

function findShift(Table1, Table2, language) {
  const sortedTable1 = Object.entries(Table1).sort((a, b) => b[1] - a[1]);
  const sortedTable2 = Object.entries(Table2).sort((a, b) => b[1] - a[1]);
  if (language == "ru")
    return rus.indexOf(sortedTable1[0][0]) - rus.indexOf(sortedTable2[0][0]);
  if (language == "eng")
    return eng.indexOf(sortedTable1[0][0]) - eng.indexOf(sortedTable2[0][0]);
}

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

let shift = 33;
let language = "ru";

let shiftedText;
let table1;
let table2;
let decodshift;
let decodeStr;

if (language == "ru") {
  shiftedText = Salat(text_ru, shift);
  table1 = getFrequency(input_ru);
  table2 = getFrequency(shiftedText);
  decodshift = findShift(table1, table2, language);
  decodeStr = Salat(shiftedText, decodshift);
} else {
  shiftedText = Salat(text_eng, shift);
  table1 = getFrequency(input_eng);
  table2 = getFrequency(shiftedText);
  decodshift = findShift(table1, table2, language);
  decodeStr = Salat(shiftedText, decodshift);
}

console.log("Зашифрованный текст:", shiftedText);
console.log(`----------------------------------------------`);
console.log("Декодированный текст:", decodeStr);
console.log(`----------------------------------------------`);
console.log(`Изначальный сдвиг ${shift}`);
console.log(`Сдвиг полученный анализом частот ${Math.abs(decodshift)}`);
