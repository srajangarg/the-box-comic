import { Chat, MessageData } from "@/components/Chat";

const messages: MessageData[] = [
  { text: "nick bostrom's simulation argument is often misunderstood as a claim that we're definitely in a simulation. it's actually a trilemma — three possibilities, at least one of which must be true.", topic: "the trilemma" },
  { text: "first: civilizations almost always go extinct before reaching technological maturity. second: technologically mature civilizations are almost never interested in running ancestor simulations. third: we are almost certainly in a simulation.", endGroup: true },

  { text: "the logic is statistical. if civilizations can survive and do run simulations, then the number of simulated minds would vastly outnumber biological ones. by potentially billions to one.", topic: "the numbers" },
  { text: "so if you're a conscious being wondering whether you're real or simulated, the base rates strongly favor simulated. this isn't philosophy — it's just probability.", endGroup: true },

  { text: "but is it even physically possible? wouldn't simulating a universe require more energy than a universe contains?", topic: "the energy question" },
  { text: "this is where it gets interesting. you don't need to simulate everything — just what's being observed. the rest can be approximated or generated on demand.", endGroup: true },

  { text: "our sun outputs roughly 3.8 × 10²⁶ watts. an advanced civilization could theoretically capture most of that energy — this is the dyson sphere concept.", topic: "the math" },
  { text: "meanwhile, running a single large language model inference takes maybe a few hundred watts. and computational efficiency has been doubling roughly every two years for decades.", endGroup: true },

  { text: "extrapolate those efficiency gains over thousands of years and simulating conscious minds might become computationally trivial. the energy constraints that seem prohibitive to us may not apply to mature civilizations.", endGroup: true },

  { text: "i actually don't have great answers for why they would bother. bostrom suggests ancestor simulations — studying your own history. but that feels anthropocentric.", topic: "why though" },
  { text: "the more interesting question isn't whether simulation is possible. it's what would be worth simulating.", endGroup: true },

  {
    text: "that's where the [timing argument](/simulation-why-now) becomes relevant.",
    link: {
      url: "/simulation-why-now",
      title: "why now?",
      hook: "the simulation might not be about humans at all.",
      image: "/frog.png",
    },
    endGroup: true,
  },

  {
    text: "or back to [where this started](/simulation-hook).",
    link: {
      url: "/simulation-hook",
      title: "the coincidence",
      hook: "why are we alive at this exact moment?",
      image: "/frog.png",
    },
    endGroup: true,
  },
];

export default function SimulationWhy() {
  return <Chat title="why simulate?" avatar="/frog.png" messages={messages} />;
}
