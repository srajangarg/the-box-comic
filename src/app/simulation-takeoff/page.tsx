import { Chat, MessageData } from "@/components/Chat";

const messages: MessageData[] = [
  { text: "if you plot technological progress over time, the shape of the curve is striking. it's not linear. it's not even consistently exponential. it's accelerating.", topic: "the curve" },
  { text: "for most of human history the line is essentially flat. agriculture appears around 10,000 years ago — a small uptick. then mostly nothing for millennia.", endGroup: true },

  { text: "the printing press arrives around 500 years ago. suddenly ideas can spread faster than people can walk. the curve begins to bend.", topic: "acceleration" },
  { text: "then the industrial revolution — maybe 250 years ago. machines making machines. the curve steepens noticeably.", endGroup: true },

  { text: "electricity: 150 years. computers: 75 years. the internet: 30 years. smartphones: 15 years. ai systems that can reason: maybe 5 years.", topic: "the sequence" },
  { text: "each interval is shorter than the last. the time between major transitions is compressing.", endGroup: true },

  { text: "kurzweil calls this the law of accelerating returns. technology builds on itself — better tools enable faster discovery of even better tools. the feedback loop compounds.", topic: "rsi" },
  { text: "but something qualitatively different is happening now. for the first time, intelligence itself is being used to improve intelligence.", endGroup: true },

  { text: "ai researchers use ai to do ai research. models train on outputs of other models. the system is becoming self-referential in a way it never was before.", endGroup: true },

  { text: "this is what's called recursive self-improvement. rsi. it's the mechanism behind most intelligence explosion scenarios.", topic: "the inflection" },
  { text: "and it's worth pausing on how strange this moment actually is.", endGroup: true },

  { text: "we're building minds out of sand. literal silicon, arranged in precise patterns, running electricity through it, and producing something that reasons about the world.", topic: "the absurdity" },
  { text: "deep learning working at all is genuinely surprising. simple algorithms over sensory data somehow producing language, reasoning, creativity. we don't fully understand why it works.", endGroup: true },

  { text: "and large language models are perhaps the strangest part. human language has always been the medium through which we coordinate action in the world — how ideas become reality.", topic: "llms" },
  { text: "now machines speak it fluently. the boundary between thought and action is dissolving in ways we haven't fully processed.", endGroup: true },

  { text: "this is why the timing question matters. if you're running simulations to study intelligence explosions, you don't care about the flat parts of the curve. you care about the knee.", topic: "the implication" },
  { text: "the moment where 'steep' becomes 'vertical'. the phase transition. we appear to be living through exactly that moment.", endGroup: true },

  {
    text: "which raises the question of [what, exactly, is being studied](/simulation-why-now).",
    link: {
      url: "/simulation-why-now",
      title: "why now?",
      hook: "the simulation might not be about humans at all.",
      image: "/frog.png",
    },
    endGroup: true,
  },

  {
    text: "or back to [the beginning](/simulation-hook).",
    link: {
      url: "/simulation-hook",
      title: "the coincidence",
      hook: "why are we alive at this exact moment?",
      image: "/frog.png",
    },
    endGroup: true,
  },
];

export default function SimulationTakeoff() {
  return <Chat title="the takeoff" avatar="/frog.png" messages={messages} />;
}
