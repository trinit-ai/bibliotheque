"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Link2, Twitter, Mail, Share2 } from "lucide-react";

// ── Tokens ────────────────────────────────────────────────────────────────

const cream = "#FAFAF7";
const ink = "#1A1816";
const ink2 = "#6B6760";
const ink3 = "#9A9590";
const border_ = "#E5E1D8";
const border2 = "#F0EDE6";
const blue = "#1D4ED8";
const serif = "'Georgia', serif";
const mono = "'Courier New', monospace";

// ── Entity data ───────────────────────────────────────────────────────────

interface EntityData {
  intro: string;
  territories: { name: string; desc: string }[];
  related: { title: string; type: "book" | "expedition"; id: string; meta: string; desc: string }[];
  books: { title: string; author: string; id: string }[];
  demoResponse: string;
}

const ENTITY_MAP: Record<string, EntityData> = {
  stoicism: {
    intro: "Stoicism is a school of Hellenistic philosophy founded in Athens by Zeno of Citium in the early 3rd century BC. It teaches that virtue, the highest good, is based on knowledge, and that the wise live in harmony with the divine Reason that governs nature. Stoicism has experienced a remarkable revival in the modern era, finding new adherents among entrepreneurs, athletes, military leaders, and ordinary people seeking resilience in uncertain times.",
    territories: [
      { name: "The Dichotomy of Control", desc: "Epictetus's fundamental distinction between what is up to us and what is not" },
      { name: "Virtue as the Sole Good", desc: "Why the Stoics claimed external goods are merely preferred indifferents" },
      { name: "Memento Mori", desc: "The practice of contemplating death as a path to living fully" },
      { name: "Amor Fati", desc: "Loving fate: the Nietzschean extension of Stoic acceptance" },
      { name: "The Stoic Exercises", desc: "Premeditatio malorum, the view from above, and the evening review" },
    ],
    related: [
      { title: "Meditations", type: "book", id: "meditations_aurelius", meta: "Marcus Aurelius · 12 books", desc: "The private journal of a philosopher-emperor. Stoic self-examination at its most intimate." },
      { title: "Free Will", type: "expedition", id: "free_will", meta: "Philosophy", desc: "If everything is determined, can the Stoic sage truly choose virtue?" },
      { title: "Consciousness", type: "expedition", id: "consciousness", meta: "Philosophy of Mind", desc: "The Stoics believed in a rational world-soul. What did they mean?" },
    ],
    books: [
      { title: "Meditations", author: "Marcus Aurelius", id: "meditations_aurelius" },
      { title: "Discourses", author: "Epictetus", id: "discourses_epictetus" },
      { title: "Letters to Lucilius", author: "Seneca", id: "letters_seneca" },
      { title: "Enchiridion", author: "Epictetus", id: "enchiridion_epictetus" },
    ],
    demoResponse: "Stoicism begins with a deceptively simple observation: some things are within our control and some things are not.\n\nEpictetus put it this way: \"Some things are within our power, while others are not. Within our power are opinion, motivation, desire, aversion, and, in a word, whatever is of our own doing. Not within our power are our body, our property, reputation, office, and, in a word, whatever is not of our own doing.\"\n\nThis is not passive resignation. It is radical focus. The Stoic doesn't ignore external circumstances — she engages with them fully, while anchoring her well-being in the one thing that cannot be taken: her own reasoned choice.\n\nWhere would you like to begin? We could explore the lives of the three great Stoics (Marcus, Epictetus, Seneca), examine specific practices, or trace Stoicism's influence into the modern world.",
  },
  consciousness: {
    intro: "Consciousness remains the hardest problem in science and philosophy. How does subjective experience arise from objective matter? Why is there something it is like to be you? From Descartes' cogito to Chalmers' hard problem, from Buddhist mindfulness traditions to integrated information theory, the question of consciousness sits at the intersection of neuroscience, philosophy, physics, and contemplative practice.",
    territories: [
      { name: "The Hard Problem", desc: "David Chalmers's formulation: why is there subjective experience at all?" },
      { name: "Qualia and the Explanatory Gap", desc: "The redness of red, the taste of coffee — can science explain felt quality?" },
      { name: "Integrated Information Theory", desc: "Tononi's mathematical framework: consciousness as integrated information (Phi)" },
      { name: "Panpsychism", desc: "The ancient idea that consciousness is fundamental to matter, not emergent from it" },
      { name: "Buddhist Perspectives", desc: "Dependent origination, mindfulness, and the doctrine of no-self" },
    ],
    related: [
      { title: "Free Will", type: "expedition", id: "free_will", meta: "Philosophy", desc: "If consciousness is what it seems, do we actually choose our thoughts?" },
      { title: "Quantum Mechanics", type: "expedition", id: "quantum_mechanics", meta: "Physics", desc: "Does the observer effect imply consciousness plays a role in reality?" },
      { title: "Tao Te Ching", type: "book", id: "tao_te_ching_mou", meta: "Laozi · 81 chapters", desc: "The Tao that can be told is not the eternal Tao. Awareness before conceptualization." },
    ],
    books: [
      { title: "The Conscious Mind", author: "David Chalmers", id: "conscious_mind_chalmers" },
      { title: "Being You", author: "Anil Seth", id: "being_you_seth" },
      { title: "Waking Up", author: "Sam Harris", id: "waking_up_harris" },
      { title: "The Book of Not Knowing", author: "Peter Ralston", id: "not_knowing_ralston" },
    ],
    demoResponse: "Consciousness is the one thing you cannot doubt — and yet it is the one thing science cannot explain.\n\nThink about it: we can describe the neural correlates of seeing red — wavelengths of light, retinal activation, V4 cortex processing. But none of that explains why there is something it is like to see red. The objective description leaves out the subjective experience entirely.\n\nDavid Chalmers called this the \"hard problem\" in 1995, and it remains unsolved. The \"easy problems\" — attention, integration, reportability — are hard enough. But the hard problem asks: why is any of this accompanied by experience?\n\nWe could explore this from the perspective of neuroscience, philosophy of mind, physics, or contemplative traditions. Each offers a different lens on the same mystery. Where shall we look first?",
  },
  entropy: {
    intro: "Entropy is a measure of disorder, uncertainty, and irreversibility that appears across physics, information theory, and philosophy. The second law of thermodynamics — that entropy in a closed system never decreases — has been called the most fundamental law in all of science. It gives time its arrow, explains why ice melts but never spontaneously freezes, and may hold the key to understanding why anything happens at all.",
    territories: [
      { name: "The Second Law", desc: "Clausius, Boltzmann, and the arrow of time" },
      { name: "Shannon Entropy", desc: "Information theory's measure of uncertainty and surprise" },
      { name: "Maxwell's Demon", desc: "The thought experiment that connects entropy to information" },
      { name: "Heat Death", desc: "The thermodynamic fate of the universe" },
      { name: "Entropy and Life", desc: "Schrodinger's negentropy: how living systems fight the second law" },
    ],
    related: [
      { title: "Quantum Mechanics", type: "expedition", id: "quantum_mechanics", meta: "Physics", desc: "At the quantum level, is entropy truly irreversible?" },
      { title: "Game Theory", type: "expedition", id: "game_theory", meta: "Mathematics", desc: "Entropy in strategic interaction: mixed strategies as maximum entropy distributions." },
      { title: "Relativity", type: "book", id: "relativity_einstein", meta: "Einstein · 1916", desc: "How spacetime curvature relates to thermodynamic irreversibility." },
    ],
    books: [
      { title: "A Brief History of Time", author: "Stephen Hawking", id: "brief_history_hawking" },
      { title: "The Information", author: "James Gleick", id: "information_gleick" },
      { title: "Order Out of Chaos", author: "Prigogine & Stengers", id: "order_chaos_prigogine" },
    ],
    demoResponse: "Entropy is one of those rare concepts that bridges physics, information, and philosophy — and it begins with a deceptively simple observation.\n\nWhen you drop an ice cube into warm water, it melts. You never see the reverse: warm water spontaneously forming an ice cube while the surrounding liquid gets warmer. Both scenarios conserve energy perfectly. So why does one happen and the other doesn't?\n\nThe answer is statistical. There are astronomically more ways for molecules to be disordered than ordered. The system doesn't \"want\" to become disordered — it's just overwhelmingly more probable.\n\nThis is the second law of thermodynamics, and it gives time its direction. Without it, the laws of physics are perfectly reversible. Entropy is what makes the past different from the future.\n\nShall we trace this idea through thermodynamics, information theory, or its philosophical implications for the fate of the universe?",
  },
  game_theory: {
    intro: "Game theory is the mathematical study of strategic interaction — situations where the outcome for each participant depends on the choices of all. Pioneered by John von Neumann and Oskar Morgenstern, and transformed by John Nash's equilibrium concept, it has reshaped economics, political science, evolutionary biology, and computer science. From the prisoner's dilemma to auction design, game theory reveals the hidden logic of cooperation, conflict, and competition.",
    territories: [
      { name: "Nash Equilibrium", desc: "The fixed point where no player can improve by unilateral deviation" },
      { name: "The Prisoner's Dilemma", desc: "Why rational individuals may fail to cooperate even when it's in their interest" },
      { name: "Evolutionary Game Theory", desc: "Maynard Smith's extension: strategies that survive natural selection" },
      { name: "Mechanism Design", desc: "The inverse problem: designing games that produce desired outcomes" },
      { name: "Repeated Games", desc: "How the shadow of the future enables cooperation" },
    ],
    related: [
      { title: "Trolley Problem", type: "expedition", id: "trolley_problem", meta: "Ethics", desc: "Game theory meets moral philosophy: strategic reasoning under ethical constraints." },
      { title: "Free Will", type: "expedition", id: "free_will", meta: "Philosophy", desc: "If agents are deterministic, can strategic choice be genuine?" },
      { title: "The Prince", type: "book", id: "the_prince", meta: "Machiavelli · 1532", desc: "The original game theorist. Power as strategic interaction." },
    ],
    books: [
      { title: "Theory of Games", author: "von Neumann & Morgenstern", id: "theory_games_vonneumann" },
      { title: "The Evolution of Cooperation", author: "Robert Axelrod", id: "evolution_cooperation_axelrod" },
      { title: "Thinking Strategically", author: "Dixit & Nalebuff", id: "thinking_strategically" },
      { title: "The Art of Strategy", author: "Dixit & Nalebuff", id: "art_strategy" },
    ],
    demoResponse: "Game theory begins with a question that seems almost trivially simple: what should you do when the best outcome depends on what someone else does?\n\nConsider the most famous example — the Prisoner's Dilemma. Two suspects are interrogated separately. Each can cooperate (stay silent) or defect (betray the other). If both cooperate, they each get 1 year. If both defect, they each get 3 years. But if one defects while the other cooperates, the defector goes free and the cooperator gets 5 years.\n\nThe Nash equilibrium — the outcome where neither player can improve by changing strategy alone — is mutual defection. Both get 3 years. Yet mutual cooperation would give both only 1 year.\n\nThis gap between individual rationality and collective optimality is the central tension of game theory, and it appears everywhere: arms races, climate negotiations, pricing wars, even biological evolution.\n\nWhere would you like to explore? We could examine Nash's equilibrium concept, trace the evolution of cooperation, or look at how mechanism design turns the problem inside out.",
  },
  octopus: {
    intro: "The octopus is the closest thing to an alien intelligence on Earth. With 500 million neurons distributed across eight semi-autonomous arms, three hearts, blue blood, and the ability to change color, texture, and shape in milliseconds, octopuses challenge our deepest assumptions about what intelligence requires. They evolved complex cognition on a completely independent path from vertebrates, separated by over 500 million years of evolution.",
    territories: [
      { name: "Distributed Intelligence", desc: "Two-thirds of an octopus's neurons are in its arms, not its brain" },
      { name: "Camouflage and Communication", desc: "Chromatophores, iridophores, and the language of color" },
      { name: "Tool Use and Problem Solving", desc: "Coconut shelters, jar opening, and escape artistry" },
      { name: "Convergent Evolution", desc: "Camera eyes, complex brains — independently evolved from vertebrates" },
      { name: "The Octopus Mind", desc: "What is it like to be an octopus? Consciousness in a radically different architecture" },
    ],
    related: [
      { title: "Consciousness", type: "expedition", id: "consciousness", meta: "Philosophy of Mind", desc: "Does an octopus have subjective experience? What the distributed brain suggests." },
      { title: "Entropy", type: "expedition", id: "entropy", meta: "Physics", desc: "Living systems as entropy-fighting machines. The octopus as a thermodynamic marvel." },
      { title: "Tao Te Ching", type: "book", id: "tao_te_ching_mou", meta: "Laozi · 81 chapters", desc: "Water takes the shape of its container. The octopus embodies wu wei." },
    ],
    books: [
      { title: "Other Minds", author: "Peter Godfrey-Smith", id: "other_minds_godfrey_smith" },
      { title: "The Soul of an Octopus", author: "Sy Montgomery", id: "soul_octopus_montgomery" },
      { title: "Metazoa", author: "Peter Godfrey-Smith", id: "metazoa_godfrey_smith" },
    ],
    demoResponse: "Consider this: the octopus and the human last shared a common ancestor roughly 530 million years ago — a simple, worm-like creature with minimal neural organization. Since then, evolution has independently built complex intelligence twice, along completely different architectural lines.\n\nYour brain is centralized. One hundred billion neurons, mostly in your skull, connected by long-range white matter tracts. The octopus has about 500 million neurons, and two-thirds of them are in the arms themselves. Each arm can taste, touch, and act semi-independently. When an octopus reaches into a crevice, the arm may \"decide\" what to grab without consulting the central brain.\n\nThis raises a profound question: what is it like to be an octopus? Is there one consciousness or nine? Does subjective experience require a centralized brain, or can it emerge from a distributed network?\n\nWe could explore octopus cognition, their remarkable camouflage system, or what they tell us about the nature of consciousness itself. What draws your curiosity?",
  },
  free_will: {
    intro: "The question of free will is among the oldest and most consequential in philosophy. Do we genuinely choose our actions, or is every decision the inevitable result of prior causes? The debate touches neuroscience (Libet's experiments), physics (determinism vs. quantum indeterminacy), moral philosophy (can we hold people responsible without free will?), and lived experience (the overwhelming feeling that we could have done otherwise).",
    territories: [
      { name: "Compatibilism", desc: "Freedom and determinism are compatible — Frankfurt, Dennett, and the mainstream view" },
      { name: "Hard Determinism", desc: "Every event is caused. Free will is an illusion. The implications are staggering" },
      { name: "Libertarian Free Will", desc: "Genuine metaphysical freedom exists — agent causation and quantum indeterminacy" },
      { name: "Libet's Experiments", desc: "The readiness potential: does your brain decide before 'you' do?" },
      { name: "Moral Responsibility", desc: "Without free will, can punishment be justified? The stakes of the debate" },
    ],
    related: [
      { title: "Consciousness", type: "expedition", id: "consciousness", meta: "Philosophy of Mind", desc: "If consciousness is epiphenomenal, free will may be too." },
      { title: "Stoicism", type: "expedition", id: "stoicism", meta: "Philosophy", desc: "The Stoics were determinists who believed in moral responsibility. How?" },
      { title: "On the Genealogy of Morality", type: "book", id: "genealogy_of_morality", meta: "Nietzsche · 1887", desc: "Nietzsche's attack on the concept of free will as a tool of the weak." },
    ],
    books: [
      { title: "Free Will", author: "Sam Harris", id: "free_will_harris" },
      { title: "Freedom Evolves", author: "Daniel Dennett", id: "freedom_evolves_dennett" },
      { title: "Elbow Room", author: "Daniel Dennett", id: "elbow_room_dennett" },
      { title: "The Moral Landscape", author: "Sam Harris", id: "moral_landscape_harris" },
    ],
    demoResponse: "Here is the argument that has unsettled every philosophy student for 2,500 years:\n\n1. Every event is caused by prior events.\n2. Your decisions are events.\n3. Therefore, your decisions are caused by prior events.\n4. You did not choose those prior events.\n5. Therefore, you did not ultimately choose your decisions.\n\nThis is hard determinism, and it seems airtight. Yet almost no one lives as though it's true. You deliberate. You regret. You blame. The feeling of choosing is among the most vivid features of your inner life.\n\nThe philosophical landscape divides into three camps: hard determinists (free will is an illusion), libertarians (genuine freedom exists, perhaps via quantum mechanics or agent causation), and compatibilists (freedom is compatible with determinism if we define it correctly).\n\nMost professional philosophers are compatibilists. But \"most professional philosophers\" is not an argument.\n\nShall we examine the neuroscience, the philosophical arguments, or the moral consequences?",
  },
  trolley_problem: {
    intro: "The trolley problem, introduced by Philippa Foot in 1967 and elaborated by Judith Jarvis Thomson, is the most famous thought experiment in moral philosophy. A runaway trolley is heading toward five people. You can divert it to a side track where it will kill one person instead. Should you? Most people say yes. But what if instead of pulling a lever, you had to push a large man off a bridge to stop the trolley? Most people say no. Same arithmetic, different moral intuition. Why?",
    territories: [
      { name: "Consequentialism vs. Deontology", desc: "Does the morality of an action depend on outcomes or on the action itself?" },
      { name: "The Doctrine of Double Effect", desc: "Aquinas's distinction: foreseen harm vs. intended harm" },
      { name: "Moral Psychology", desc: "What the trolley problem reveals about how we actually make moral judgments" },
      { name: "The Fat Man Variant", desc: "Why pushing feels different from pulling, and what that tells us" },
      { name: "Real-World Applications", desc: "Autonomous vehicles, triage, and pandemic resource allocation" },
    ],
    related: [
      { title: "Game Theory", type: "expedition", id: "game_theory", meta: "Mathematics", desc: "Strategic moral reasoning: what if the trolley problem had multiple players?" },
      { title: "Free Will", type: "expedition", id: "free_will", meta: "Philosophy", desc: "If you lack free will, can your trolley decision be morally significant?" },
      { title: "The Prince", type: "book", id: "the_prince", meta: "Machiavelli · 1532", desc: "Dirty hands: Machiavelli on the moral cost of political action." },
    ],
    books: [
      { title: "The Trolley Problem", author: "Thomas Cathcart", id: "trolley_problem_cathcart" },
      { title: "Justice", author: "Michael Sandel", id: "justice_sandel" },
      { title: "Practical Ethics", author: "Peter Singer", id: "practical_ethics_singer" },
    ],
    demoResponse: "A trolley is hurtling down the track toward five workers. You are standing next to a lever that can divert it to a side track, where one worker stands. Do you pull the lever?\n\nMost people — around 90% in surveys — say yes. Five lives saved at the cost of one. Simple arithmetic.\n\nNow change the scenario. You are standing on a bridge above the tracks. Next to you is a very large man. If you push him onto the tracks, his body will stop the trolley, saving the five workers. He will die. Do you push him?\n\nMost people say no. Same outcome — one dies, five live — but it feels profoundly different.\n\nThis asymmetry has generated decades of philosophical debate. Consequentialists (who judge actions by their outcomes) struggle to explain why the two cases should differ. Deontologists (who judge actions by their nature) point to the distinction between killing as a side effect and killing as a means.\n\nThe trolley problem isn't really about trolleys. It's about the structure of moral reasoning itself.\n\nShall we explore the major ethical frameworks, the psychology behind our intuitions, or the real-world applications in autonomous vehicles and medical triage?",
  },
  enlightenment: {
    intro: "The Enlightenment — that extraordinary period of intellectual ferment spanning roughly 1685 to 1815 — transformed the Western world's understanding of reason, liberty, science, and human progress. From Locke's empiricism to Kant's critical philosophy, from the French Encyclopedists to the American Founders, Enlightenment thinkers dared to challenge tradition, authority, and superstition with the light of reason. Its legacy remains contested: liberation or hubris? Universal truth or Western parochialism?",
    territories: [
      { name: "Sapere Aude", desc: "Kant's motto: dare to know. The Enlightenment as a disposition, not just an era" },
      { name: "The Social Contract", desc: "Hobbes, Locke, Rousseau — how consent replaced divine right" },
      { name: "The Encyclopedie", desc: "Diderot's radical project: all human knowledge, democratized" },
      { name: "Counter-Enlightenment", desc: "Burke, de Maistre, and the Romantic reaction" },
      { name: "Enlightenment Now?", desc: "Pinker vs. the critics: is the Enlightenment project still viable?" },
    ],
    related: [
      { title: "Free Will", type: "expedition", id: "free_will", meta: "Philosophy", desc: "The Enlightenment assumed rational agents. Does neuroscience undermine that assumption?" },
      { title: "Stoicism", type: "expedition", id: "stoicism", meta: "Philosophy", desc: "The Stoics as proto-Enlightenment thinkers: reason, cosmopolitanism, natural law." },
      { title: "The Prince", type: "book", id: "the_prince", meta: "Machiavelli · 1532", desc: "Before the Enlightenment: Machiavelli's unsentimental political realism." },
    ],
    books: [
      { title: "Critique of Pure Reason", author: "Immanuel Kant", id: "critique_pure_reason_kant" },
      { title: "Two Treatises of Government", author: "John Locke", id: "two_treatises_locke" },
      { title: "The Social Contract", author: "Rousseau", id: "social_contract_rousseau" },
      { title: "Candide", author: "Voltaire", id: "candide_voltaire" },
    ],
    demoResponse: "In 1784, a German magazine posed the question: \"What is Enlightenment?\"\n\nKant's answer remains the most famous: \"Enlightenment is man's emergence from his self-imposed immaturity. Immaturity is the inability to use one's understanding without guidance from another. This immaturity is self-imposed when its cause lies not in lack of understanding, but in lack of resolve and courage to use it without guidance from another. Sapere aude! Have courage to use your own understanding!\"\n\nBut the Enlightenment was never a single movement. It was a constellation of arguments, spanning at least four distinct traditions:\n\n- The French Enlightenment (Voltaire, Diderot, d'Alembert) — reason against superstition and ecclesiastical authority\n- The Scottish Enlightenment (Hume, Smith, Ferguson) — empiricism, moral sentiment, and political economy\n- The German Aufklarung (Kant, Lessing, Mendelssohn) — critical philosophy and the limits of reason\n- The American Enlightenment (Jefferson, Franklin, Paine) — applied Enlightenment: constitutions, rights, democracy\n\nWhich thread shall we follow?",
  },
  sacred_geometry: {
    intro: "Sacred geometry is the study of geometric patterns and proportions that recur across nature, art, architecture, and spiritual traditions. The golden ratio in sunflower spirals, the Fibonacci sequence in nautilus shells, the mandala patterns of Hindu and Buddhist art, the proportions of Gothic cathedrals — these are not coincidences, say practitioners, but evidence of a mathematical order underlying reality. Whether this order is divine, natural, or imposed by the human mind remains the central question.",
    territories: [
      { name: "The Golden Ratio", desc: "Phi (1.618...): the proportion that appears everywhere from galaxies to DNA" },
      { name: "Platonic Solids", desc: "The five perfect shapes and their association with the classical elements" },
      { name: "The Flower of Life", desc: "The overlapping circles pattern found in temples from Egypt to China" },
      { name: "Mandalas and Yantras", desc: "Geometric meditation: the circle, square, and triangle as spiritual technology" },
      { name: "Fractals and Self-Similarity", desc: "Mandelbrot's discovery: nature's geometry is not Euclidean, it's fractal" },
    ],
    related: [
      { title: "Quantum Mechanics", type: "expedition", id: "quantum_mechanics", meta: "Physics", desc: "Is the geometry of reality continuous or discrete at the smallest scales?" },
      { title: "Entropy", type: "expedition", id: "entropy", meta: "Physics", desc: "Order from disorder: how geometric patterns emerge from thermodynamic processes." },
      { title: "Tao Te Ching", type: "book", id: "tao_te_ching_mou", meta: "Laozi · 81 chapters", desc: "The Tao produces one, one produces two, two produces three, three produces all things." },
    ],
    books: [
      { title: "The Geometry of Art and Life", author: "Matila Ghyka", id: "geometry_art_life_ghyka" },
      { title: "A Beginner's Guide to Constructing the Universe", author: "Michael Schneider", id: "beginners_guide_schneider" },
      { title: "The Fractal Geometry of Nature", author: "Benoit Mandelbrot", id: "fractal_geometry_mandelbrot" },
    ],
    demoResponse: "Consider the sunflower. Its seeds spiral outward in two interlocking sets — typically 34 spirals in one direction and 55 in the other. These are consecutive Fibonacci numbers (1, 1, 2, 3, 5, 8, 13, 21, 34, 55...), and their ratio approaches the golden ratio: 1.618...\n\nThis isn't mysticism. It's optimization. The golden angle (137.5 degrees) is the most irrational angle — it ensures each new seed is maximally distant from all previous seeds, producing the most efficient packing possible.\n\nBut here is where sacred geometry gets interesting: this same proportion appears in the spiral of galaxies, the branching of trees, the proportions of the human body, and the architecture of the Parthenon. Is this evidence of a deep mathematical order underlying reality, or is the human mind simply pattern-matching?\n\nThe Pythagoreans believed number was the arche — the fundamental principle of all things. Plato argued that geometry was the language of the divine. Modern physics describes reality in geometric terms (spacetime curvature, gauge symmetries, string theory).\n\nShall we explore the mathematics, the historical traditions, or the philosophical question of whether geometry is discovered or invented?",
  },
  quantum_mechanics: {
    intro: "Quantum mechanics is the most successful and most disturbing theory in the history of science. It predicts experimental results to twelve decimal places of accuracy, underpins all of modern technology, and describes a reality that defies common sense: particles that exist in superposition, measurements that create definite outcomes from indefinite possibilities, entangled particles that correlate instantaneously across any distance. After a century of debate, physicists still disagree about what it means.",
    territories: [
      { name: "The Double-Slit Experiment", desc: "The single experiment that contains all the mystery of quantum mechanics" },
      { name: "Superposition and Measurement", desc: "Schrodinger's cat: when does possibility become actuality?" },
      { name: "Entanglement", desc: "Einstein's 'spooky action at a distance' — now experimentally confirmed" },
      { name: "Interpretations", desc: "Copenhagen, Many-Worlds, Pilot Wave — what does the math actually mean?" },
      { name: "Quantum Computing", desc: "Harnessing superposition and entanglement for computation" },
    ],
    related: [
      { title: "Consciousness", type: "expedition", id: "consciousness", meta: "Philosophy of Mind", desc: "The measurement problem: does consciousness collapse the wave function?" },
      { title: "Entropy", type: "expedition", id: "entropy", meta: "Physics", desc: "Quantum entropy, decoherence, and the arrow of time." },
      { title: "Relativity", type: "book", id: "relativity_einstein", meta: "Einstein · 1916", desc: "Einstein's other revolution — and his lifelong discomfort with quantum theory." },
    ],
    books: [
      { title: "QED", author: "Richard Feynman", id: "qed_feynman" },
      { title: "The Fabric of Reality", author: "David Deutsch", id: "fabric_reality_deutsch" },
      { title: "Something Deeply Hidden", author: "Sean Carroll", id: "something_deeply_hidden_carroll" },
      { title: "Helgoland", author: "Carlo Rovelli", id: "helgoland_rovelli" },
    ],
    demoResponse: "Richard Feynman said: \"If you think you understand quantum mechanics, you don't understand quantum mechanics.\"\n\nHere is the essence of the mystery. Fire photons one at a time through two narrow slits onto a detector screen. Each photon lands at a definite point — a single dot on the screen. But after thousands of photons, the dots form an interference pattern: bright and dark bands, as though each photon passed through both slits simultaneously and interfered with itself.\n\nNow put a detector at one slit to observe which slit the photon passes through. The interference pattern vanishes. The photon behaves as a particle, passing through one slit or the other.\n\nThe act of observation changes the outcome. Not because of physical disturbance — we can make the measurement arbitrarily gentle. Something deeper is happening.\n\nAfter a century of debate, physicists are divided. The Copenhagen interpretation says the wave function collapses upon measurement. Many-Worlds says every measurement splits the universe. Pilot wave theory says particles have definite trajectories guided by a wave.\n\nEach interpretation is consistent with the math. None is fully satisfying. Where shall we begin?",
  },
};

const DEFAULT_ENTITY: EntityData = {
  intro: "",
  territories: [
    { name: "Origins and History", desc: "How this field of inquiry emerged and evolved over time" },
    { name: "Core Concepts", desc: "The fundamental ideas and frameworks that define this domain" },
    { name: "Key Thinkers", desc: "The people who shaped our understanding" },
    { name: "Contemporary Debates", desc: "Where the field stands today and where it's heading" },
    { name: "Connections", desc: "How this topic relates to other domains of knowledge" },
  ],
  related: [
    { title: "Stoicism", type: "expedition", id: "stoicism", meta: "Philosophy", desc: "The ancient art of living well through reason and virtue." },
    { title: "Consciousness", type: "expedition", id: "consciousness", meta: "Philosophy of Mind", desc: "The hardest problem in science: why is there subjective experience?" },
    { title: "Tao Te Ching", type: "book", id: "tao_te_ching_mou", meta: "Laozi · 81 chapters", desc: "The foundational text of Taoist philosophy." },
  ],
  books: [
    { title: "Meditations", author: "Marcus Aurelius", id: "meditations_aurelius" },
    { title: "Tao Te Ching", author: "Laozi", id: "tao_te_ching_mou" },
    { title: "Relativity", author: "Albert Einstein", id: "relativity_einstein" },
  ],
  demoResponse: "",
};

function getEntityData(slug: string): EntityData {
  const data = ENTITY_MAP[slug];
  if (data) return data;

  const name = toTitle(slug);
  return {
    ...DEFAULT_ENTITY,
    intro: `${name} is a rich and multifaceted domain of inquiry that has captivated thinkers across centuries and civilizations. This expedition invites you to explore its key ideas, trace its intellectual lineage, and discover unexpected connections to other fields in the library. Whether you are encountering this topic for the first time or returning with deeper questions, the conversation adapts to meet you where you are.`,
    demoResponse: `Welcome to the ${name} expedition.\n\nThis is a guided exploration — a conversation, not a lecture. I can offer context, trace arguments, surface connections to other topics in the library, and challenge assumptions. But the direction is yours.\n\nEvery expedition in the Bibliotheque is a living thing. It draws on the full corpus of the library — books, essays, other expeditions — to create connections you might not find on your own.\n\nWhat aspect of ${name.toLowerCase()} are you most curious about? We could start with fundamentals, examine a specific question, or explore how it connects to other domains.`,
  };
}

// ── Helpers ────────────────────────────────────────────────────────────────

function toTitle(s: string) {
  return s.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

// ── Tiny components ───────────────────────────────────────────────────────

function ColLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: ink3, paddingBottom: 10, borderBottom: `0.5px solid ${border2}`, marginBottom: 14 }}>
      {children}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function WikiPage() {
  const params = useParams();
  const entity = params.entity as string;
  const slug = decodeURIComponent(entity);
  const displayName = toTitle(slug);
  const data = getEntityData(slug);

  return (
    <div style={{ background: cream, color: ink, minHeight: "100vh", fontFamily: serif, display: "flex", flexDirection: "column" }}>
      {/* ── Top bar ──────────────────────────────────────────────────── */}
      <div style={{ borderBottom: `0.5px solid ${border_}`, background: cream }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", height: 48, gap: 20 }}>
          <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <span style={{ fontSize: 20, fontFamily: serif, fontStyle: "italic", fontWeight: 400, color: ink, letterSpacing: "-.025em" }}>
              Biblioth<span style={{ color: blue }}>è</span>que
            </span>
          </Link>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
            <Link href="/search" className="hide-mobile" style={{ display: "flex", alignItems: "center", border: `0.5px solid ${border_}`, borderRadius: 3, padding: "5px 10px", background: "#fff", textDecoration: "none" }}>
              <span style={{ fontFamily: mono, fontSize: 11, color: ink3 }}>Search library…</span>
              <span style={{ color: ink3, fontSize: 14, marginLeft: 8 }}>⌕</span>
            </Link>
            <Link href="/subscribe" style={{ width: 32, height: 32, borderRadius: "50%", background: cream, border: `0.5px solid ${border_}`, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ink3} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Breadcrumb ───────────────────────────────────────────────── */}
      <div style={{ borderBottom: `0.5px solid ${border2}`, background: cream }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "8px 24px", display: "flex", alignItems: "center", gap: 6 }}>
          <Link href="/" style={{ fontFamily: mono, fontSize: 10, color: ink3, textDecoration: "none" }}>Home</Link>
          <span style={{ fontFamily: mono, fontSize: 10, color: border_ }}>/</span>
          <span style={{ fontFamily: mono, fontSize: 10, color: ink3 }}>Expeditions</span>
          <span style={{ fontFamily: mono, fontSize: 10, color: border_ }}>/</span>
          <span style={{ fontFamily: mono, fontSize: 10, color: ink2 }}>{displayName}</span>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <div className="wiki-body" style={{ flex: 1, maxWidth: 1200, margin: "0 auto", width: "100%", display: "flex", gap: 0, minHeight: 0 }}>

        {/* ── Main column ──────────────────────────────────────────── */}
        <div className="wiki-main" style={{ flex: 1, minWidth: 0, borderRight: `0.5px solid ${border2}`, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "32px 32px 48px" }}>
            {/* Entity header */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: blue, marginBottom: 10 }}>
                  Expedition
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <button onClick={() => navigator.clipboard?.writeText(window.location.href)} title="Copy link" style={{ background: "none", border: "none", cursor: "pointer", color: ink3, display: "flex", alignItems: "center", padding: 3 }} className="bib-slash"><Link2 size={14} strokeWidth={1.5} /></button>
                  <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(displayName + " — Bibliothèque Expedition")}`, "_blank")} title="Share on X" style={{ background: "none", border: "none", cursor: "pointer", color: ink3, display: "flex", alignItems: "center", padding: 3 }} className="bib-slash"><Twitter size={14} strokeWidth={1.5} /></button>
                  <button onClick={() => window.open(`mailto:?subject=${encodeURIComponent(displayName + " — Bibliothèque")}&body=${encodeURIComponent(window.location.href)}`, "_blank")} title="Email" style={{ background: "none", border: "none", cursor: "pointer", color: ink3, display: "flex", alignItems: "center", padding: 3 }} className="bib-slash"><Mail size={14} strokeWidth={1.5} /></button>
                </div>
              </div>
              <h1 style={{ fontFamily: serif, fontStyle: "italic", fontSize: 42, fontWeight: 400, lineHeight: 1.1, letterSpacing: "-.02em", margin: "0 0 16px", color: ink }}>
                {displayName}
              </h1>
              <div style={{ width: 40, height: 1, background: border_, marginBottom: 18 }} />
              <p style={{ fontFamily: serif, fontSize: 16, lineHeight: 1.75, color: ink2, margin: 0, maxWidth: 640 }}>
                {data.intro}
              </p>
            </div>

            {/* Major territories */}
            <div style={{ marginBottom: 36 }}>
              <ColLabel>Major Territories</ColLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {data.territories.map((t, i) => (
                  <div key={t.name} style={{ padding: "14px 0", borderBottom: i < data.territories.length - 1 ? `0.5px solid ${border2}` : "none", cursor: "pointer", display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span style={{ fontFamily: mono, fontSize: 11, color: ink3, minWidth: 22, paddingTop: 2, flexShrink: 0 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div style={{ fontFamily: serif, fontSize: 17, color: ink, marginBottom: 3, lineHeight: 1.3 }}>{t.name}</div>
                      <div style={{ fontFamily: serif, fontSize: 13, color: ink3, lineHeight: 1.5 }}>{t.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: 10, marginBottom: 40, flexWrap: "wrap" }}>
              <Link href={`/book/${slug}`} style={{
                cursor: "pointer", background: blue, color: "#fff",
                fontFamily: mono, fontSize: 12, letterSpacing: ".04em",
                padding: "12px 28px", borderRadius: 4,
                display: "inline-flex", alignItems: "center", gap: 8,
              }}>
                Begin exploration →
              </Link>
              <Link href="/" style={{
                background: "none", cursor: "pointer", border: `0.5px solid ${border_}`, color: ink2,
                fontFamily: mono, fontSize: 12, padding: "12px 20px", borderRadius: 4,
              }}>
                ← Back to Library
              </Link>
            </div>
            <p style={{ fontFamily: mono, fontSize: 10, color: ink3, marginTop: -30, marginBottom: 40 }}>
              Opens a guided conversation. 5 turns for anonymous visitors.
            </p>

            {/* Library connections */}
            <div>
              <ColLabel>Library Connections</ColLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {data.books.map(b => (
                  <Link key={b.id} href={`/book/${b.id}`} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "10px 14px", border: `0.5px solid ${border_}`, borderRadius: 6,
                    textDecoration: "none", color: ink, background: "#fff",
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: blue, flexShrink: 0 }} />
                    <div>
                      <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 15 }}>{b.title}</span>
                      <span style={{ fontFamily: mono, fontSize: 10, color: ink3, marginLeft: 10 }}>{b.author}</span>
                    </div>
                    <span style={{ marginLeft: "auto", fontFamily: mono, fontSize: 10, color: blue, flexShrink: 0 }}>Open →</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right sidebar ────────────────────────────────────────── */}
        <div className="wiki-sidebar" style={{ width: 300, flexShrink: 0, padding: "28px 24px", overflowY: "auto" }}>
          {/* Related in the Library */}
          <ColLabel>Related in the Library</ColLabel>
          {data.related.map(r => (
            <Link
              key={r.id}
              href={r.type === "book" ? `/book/${r.id}` : `/wiki/${r.id}`}
              style={{
                display: "block", textDecoration: "none", color: ink,
                background: "#fff", border: `0.5px solid ${border_}`, borderRadius: 6,
                padding: 14, marginBottom: 10, cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 14, fontWeight: 600, lineHeight: 1.25 }}>{r.title}</span>
                <span style={{
                  fontFamily: mono, fontSize: 8, letterSpacing: ".06em", textTransform: "uppercase",
                  color: r.type === "book" ? blue : "#0891B2",
                  border: `0.5px solid ${r.type === "book" ? "#BFDBFE" : "#A5F3FC"}`,
                  borderRadius: 2, padding: "2px 6px", whiteSpace: "nowrap", flexShrink: 0, marginLeft: 8,
                }}>
                  {r.type === "book" ? "Living Book" : "Expedition"}
                </span>
              </div>
              <div style={{ fontFamily: mono, fontSize: 10, color: ink3, marginBottom: 5 }}>{r.meta}</div>
              <div style={{ fontFamily: serif, fontSize: 12, color: ink2, lineHeight: 1.5 }}>{r.desc}</div>
            </Link>
          ))}

          {/* Expedition info */}
          <div style={{ marginTop: 20 }}>
            <ColLabel>About This Expedition</ColLabel>
            <div style={{ background: "#fff", border: `0.5px solid ${border_}`, borderRadius: 6, padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 11, padding: "4px 0" }}>
                <span style={{ color: ink2 }}>Type</span>
                <span style={{ color: blue }}>Expedition</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 11, padding: "4px 0" }}>
                <span style={{ color: ink2 }}>Territories</span>
                <span style={{ color: blue }}>{data.territories.length}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 11, padding: "4px 0" }}>
                <span style={{ color: ink2 }}>Connected Books</span>
                <span style={{ color: blue }}>{data.books.length}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 11, padding: "4px 0" }}>
                <span style={{ color: ink2 }}>Turns (anonymous)</span>
                <span style={{ color: blue }}>5</span>
              </div>
            </div>
          </div>

          {/* Other expeditions */}
          <div style={{ marginTop: 20 }}>
            <ColLabel>More Expeditions</ColLabel>
            {["stoicism", "consciousness", "entropy", "game_theory", "quantum_mechanics", "free_will"]
              .filter(e => e !== slug)
              .slice(0, 4)
              .map(e => (
                <Link
                  key={e}
                  href={`/wiki/${e}`}
                  style={{
                    display: "block", textDecoration: "none",
                    padding: "8px 0", borderBottom: `0.5px solid ${border2}`,
                    fontFamily: serif, fontSize: 14, color: blue, cursor: "pointer",
                  }}
                >
                  {toTitle(e)}
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer style={{ borderTop: `0.5px solid ${border_}`, background: "#F5F3EE", marginTop: "auto" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 24px 14px" }}>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 13, color: ink3, opacity: 0.6 }}>You read the book. And the book reads you.</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <Link href="/" className="bib-logo" style={{ fontFamily: serif, fontStyle: "italic", fontSize: 15, color: ink3, textDecoration: "none" }}>
              Biblioth<span className="bib-accent" style={{ color: blue }}>è</span>que
            </Link>
            <div style={{ fontFamily: mono, fontSize: 10, color: ink3 }}>
              © 2026 TMOS13, LLC.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
