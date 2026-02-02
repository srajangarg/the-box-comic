import { Chat, MessageData } from "@/components/Chat";

const messages: MessageData[] = [
  // anachronism / look how far we've come
  {
    text: "we have existed as homo sapiens for the past X years. our biological brains have remained roughly for the duration",
    topic: "anachronism",
  },
  {
    text: "out of that <long time>, it was only",
    endGroup: true,
  },

  {
    text: "writing is only about ~5000 years old. for the rest of the ~295,000 years, all cultures and all information spread essentially orally. all our knowledge was transmitted in ephemeral vibrations in the air. the fact that squiggles on paper can be used to encode the sounds we made took us ... every story, every piece of knowledge, every instruction had to live in someone's memory or disappear forever.",
  },
  { text: "the printing press is only ~600 years old." },
  {
    text: "the scientific method itself is only ~500 years old, shockingly recent. arguably, the single biggest point of inflection in humanity's technological trajectory?",
    endGroup: true,
  },

  {
    text: "the cell wasn't recognized as the fundamental unit of life until only ~200 years ago. in our typical anthropomorphic thinking, we believed that humans possessed a vital \"essence\" needed for life",
    endGroup: true,
  },

  {
    text: "",
    image: "/kardahsev_dreams.png",
    endGroup: true,
  },

  {
    text: "",
    image: "/cern.png",
    endGroup: true,
  },

  {
    text: "how we can bottle the sun",
    image: "/tokamak1.png",
    endGroup: true,
  },

  {
    text: "",
    image: "/pentium2.png",
    endGroup: true,
  },

  {
    text: "our breakthroughs and understanding of the universe seems to keep getting better and better",
  },
  {
    text: "i feel like our human brains are anachronistic in current technology landscape. they were amazing bootstrappable machines ....",
  },
  {
    text: "and now we're at the precipice of the last invention... we are close to conquering what made it all possible",
    endGroup: true,
  },

  {
    text: "",
    image: "/erdos.png",
    endGroup: true,
  },

  {
    text: "",
    image: "/ana1.png",
  },
  {
    text: "",
    image: "/ana2.png",
  },
  {
    text: "",
    image: "/ana3.png",
    endGroup: true,
  },

  {
    text: "the internet, smartphones and attention markets... laid the foundation for our next project, artificial general intelligence",
  },
  {
    text: "deep learning became successful about ~15, transformers ~8 years ago, the scaling laws are bearing fruit in the last 3 years",
    endGroup: true,
  },

  // we're going exponential/hyperbolic
  {
    text: "if you think any of this progress is normal and that the future is ... i don't think you understand exponentials. this is how i see you:",
    topic: "exponential",
    image: "/gdp.webp",
    endGroup: true,
  },

  // the evidence in front of your eyes
  {
    text: "",
    topic: "evidence",
    image: "/claudersi.png",
    endGroup: true,
  },

  {
    text: "",
    image: "/rsi.webp",
    endGroup: true,
  },

  // the future
  {
    text: "far too difficult to predict.",
    topic: "the future",
    image: "/hinton.jpeg",
    endGroup: true,
  },
];

export default function Home() {
  return <Chat title="the takeoff" avatar="/frog.png" messages={messages} />;
}
