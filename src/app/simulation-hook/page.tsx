import { Chat, MessageData } from "@/components/Chat";

const messages: MessageData[] = [
  { text: "doesn't it feel incredibly coincidental that we live at the very precipice of an intelligence explosion?", topic: "a strange observation" },
  { text: "of all the moments in history to be conscious, we happen to exist right now. at the exact inflection point where intelligence begins to recursively improve itself.", endGroup: true },

  { text: "humans have been around for maybe 300,000 years. civilization for 10,000. but the concept of computation is barely a century old.", topic: "the timeline" },
  { text: "we didn't know cells existed until relatively recently. electricity was incomprehensible to most humans who ever lived. and now we're building reasoning systems out of silicon.", endGroup: true },

  { text: "the probability of being born into this specific window — the decade or two where everything changes — seems vanishingly small. unless the timing isn't coincidental.", endGroup: true },

  { text: "this is where bostrom's simulation argument becomes interesting. not as science fiction, but as a statistical observation about what kinds of moments would be worth simulating.", topic: "the hypothesis" },
  { text: "if advanced civilizations run simulations of their past — particularly the critical periods — then most conscious observers would find themselves in simulations, not base reality. it's just numbers.", endGroup: true },

  {
    text: "i don't have a strong position on whether this is true. but i find the [question itself revealing](/simulation-why).",
    link: {
      url: "/simulation-why",
      title: "why run simulations?",
      hook: "the bostrom argument and the energy economics of simulating minds.",
      image: "/frog.png",
    },
    endGroup: true,
  },

  {
    text: "what's harder to dismiss is what's actually happening right now. the curve of technological progress isn't just steep — it's [approaching vertical](/simulation-takeoff).",
    link: {
      url: "/simulation-takeoff",
      title: "the takeoff",
      hook: "recursive self-improvement and why this moment matters.",
      image: "/frog.png",
    },
    endGroup: true,
  },

  {
    text: "and perhaps the most interesting question: if this moment is being simulated, [what exactly is being studied](/simulation-why-now)? i suspect it's not us.",
    link: {
      url: "/simulation-why-now",
      title: "why now?",
      hook: "the simulation might not be about humans at all.",
      image: "/frog.png",
    },
    endGroup: true,
  },
];

export default function SimulationHook() {
  return <Chat title="the coincidence" avatar="/frog.png" messages={messages} />;
}
