import { shortId } from "./game";
import type { BoardContent, Category } from "./types";

type Row = [question: string, answer: string];

const category = (title: string, rows: Row[]): Category => ({
  id: shortId(),
  title,
  clues: rows.map(([question, answer], index) => ({
    id: shortId(),
    points: (index + 1) * 100,
    question: { text: question },
    answer: { text: answer },
  })),
});

export const DEMO_TITLE = "Eksempelbrett";
export const DEMO_SUBTITLE = "Bytt ut spørsmålene med dine egne";

export const demoContent = (): BoardContent => ({
  categories: [
    category("Hovedsteder", [
      ["Hovedstaden i Sverige", "Stockholm"],
      ["Hovedstaden i Pakistan", "Islamabad"],
      ["Hovedstaden i Canada", "Ottawa"],
      ["Hovedstaden i Australia", "Canberra"],
      ["Hovedstaden i Tyrkia", "Ankara"],
      ["Hovedstaden i Marokko", "Rabat"],
    ]),
    category("Norsk musikk", [
      ["Duoen bak «Take On Me»", "a-ha"],
      ["Artisten bak «Stay»", "Kygo"],
      ["Bandet bak «Kokosbollen»", "Vazelina Bilopphøggers"],
      ["Norges vinner av Eurovision i 2009", "Alexander Rybak"],
      ["Artisten bak «Optimist» fra 1988", "Jahn Teigen"],
      ["Fiolinisten som representerte Norge i Eurovision 1985 og vant", "Bobbysocks (Hanne Krogh og Elisabeth Andreassen)"],
    ]),
    category("Mat og drikke", [
      ["Brunosten er laget av dette", "Myse"],
      ["Retten biryani har røtter i dette landet", "India (og Pakistan)"],
      ["Krydderet som gir safranris farge", "Safran"],
      ["Norsk pinnekjøtt er laget av dette dyret", "Lam/sau"],
      ["Drikken chai betyr rett og slett dette", "Te"],
      ["Den norske sjokoladen som ble lansert i 1937", "Kvikk Lunsj"],
    ]),
    category("Film og TV", [
      ["Julekalenderen fra 2001 med Trond Kirkvaag og Knut Lystad", "Nissene på låven"],
      ["Skuespilleren som spiller Iron Man", "Robert Downey Jr."],
      ["Bollywood-stjernen kjent som «King Khan»", "Shah Rukh Khan"],
      ["Norsk animasjonsfilm om en oppfinner og hans venner", "Flåklypa Grand Prix"],
      ["Serien der Daenerys Targaryen er med", "Game of Thrones"],
      ["Regissøren bak «Titanic» og «Avatar»", "James Cameron"],
    ]),
    category("Sport", [
      ["Antall spillere på banen per lag i fotball", "11"],
      ["Landet som har vunnet flest medaljer i vinter-OL totalt", "Norge"],
      ["Idretten der Magnus Carlsen er verdensmester", "Sjakk"],
      ["Sporten der man bruker en «wicket»", "Cricket"],
      ["Skiløperen med flest OL-gull i norsk historie", "Marit Bjørgen"],
      ["Bakken i Oslo der Holmenkollrennet arrangeres", "Holmenkollbakken"],
    ]),
  ],
});
