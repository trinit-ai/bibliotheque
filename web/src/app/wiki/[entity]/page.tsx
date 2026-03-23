"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Link2, Twitter, Mail, Share2 } from "lucide-react";
import SiteFooter from "@/components/SiteFooter";

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
  contentType?: "expedition" | "essay" | "living_book";
  title?: string;
  subtitle?: string;
  author?: string;
  year?: string;
  translator?: string;
  tradition?: string;
  license?: string;
  chapters?: number;
  wordCount?: string;
  sections?: number;
  furtherReading?: { label: string; url: string }[];
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
  genealogy_of_morality: {
    contentType: "essay",
    title: "The Madman: God Is Dead",
    author: "Friedrich Nietzsche",
    year: "1882",
    wordCount: "Single passage",
    furtherReading: [
      { label: "The Gay Science \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/The_Gay_Science" },
      { label: "Friedrich Nietzsche \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Friedrich_Nietzsche" },
      { label: "God is dead (philosophy) \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/God_is_dead" },
    ],
    intro: "In 1882, Friedrich Nietzsche wrote a parable about a man who lit a lantern in broad daylight, ran into the marketplace, and announced that God was dead \u2014 and that we had killed him. Most people know the phrase. Almost no one knows the passage. The standard reading is that Nietzsche was celebrating \u2014 a triumphant atheist declaring victory over religion. The actual passage says the opposite. The atheists in the marketplace are the ones laughing. The Madman is the only one who understands what\u2019s happened, and he\u2019s terrified. The death of God isn\u2019t a metaphysical claim. It\u2019s a cultural-historical diagnosis: the foundations of Western morality, meaning, and truth have lost their ground. Nietzsche in 1882, predicting the 20th century \u2014 and the 21st.",
    territories: [
      { name: "The Misreading", desc: "\u201CGod is dead\u201D as bumper sticker, slogan, atheist declaration. What most people think Nietzsche said \u2014 and why they\u2019re wrong. The atheists are the ones laughing. The Madman is the one who sees." },
      { name: "The Diagnosis", desc: "The death of God as cultural-historical event, not metaphysical claim. The foundations of Western morality, meaning, and truth lose their ground. \u201CIs there still any up or down?\u201D" },
      { name: "\u201CI Have Come Too Early\u201D", desc: "The Madman\u2019s self-diagnosis: the event has happened but hasn\u2019t been absorbed. Nietzsche in 1882 predicting the 20th century \u2014 and the 21st." },
      { name: "The Challenge", desc: "\u201CMust we ourselves not become gods simply to appear worthy of it?\u201D If there is no external source of value, what do you do? The seed of the \u00dcbermensch." },
      { name: "The Churches as Tombs", desc: "The passage ends in the churches. The institutional forms survive after the content has died. The question isn\u2019t whether the churches are full or empty \u2014 it\u2019s whether what they house is alive." },
    ],
    related: [
      { title: "Ecclesiastes", type: "book", id: "ecclesiastes", meta: "Qohelet \u00b7 12 chapters", desc: "The Hebrew parallel to the meaning crisis." },
      { title: "Tao Te Ching", type: "book", id: "tao_te_ching", meta: "Laozi \u00b7 81 chapters", desc: "What holds when foundations give way." },
      { title: "Avant-Garde and Kitsch", type: "book", id: "avant_garde_and_kitsch", meta: "Greenberg \u00b7 1939", desc: "What fills the void when genuine culture collapses." },
    ],
    books: [
      { title: "Ecclesiastes", author: "Qohelet", id: "ecclesiastes" },
      { title: "Tao Te Ching", author: "Laozi", id: "tao_te_ching" },
      { title: "Avant-Garde and Kitsch", author: "Greenberg", id: "avant_garde_and_kitsch" },
    ],
    demoResponse: "Most people know the phrase. Almost no one knows the passage.\n\nThe standard reading is that Nietzsche was celebrating \u2014 a triumphant atheist declaring victory over religion. The actual passage says the opposite. The atheists in the marketplace are the ones laughing. The Madman is the only one who understands what\u2019s happened, and he\u2019s terrified.\n\nWhat draws you here \u2014 the philosophy, the meaning crisis, or something more personal?",
  },
  room_of_ones_own: {
    contentType: "living_book",
    title: "A Room of One\u2019s Own",
    author: "Virginia Woolf",
    year: "1929",
    chapters: 6,
    license: "Public Domain",
    furtherReading: [
      { label: "A Room of One\u2019s Own \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/A_Room_of_One%27s_Own" },
      { label: "Virginia Woolf \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Virginia_Woolf" },
      { label: "Full text \u2014 Project Gutenberg Australia", url: "https://gutenberg.net.au/ebooks02/0200791h.html" },
    ],
    intro: "In October 1928, Virginia Woolf was invited to lecture at Cambridge on the subject of women and fiction. What she delivered was something else entirely. She didn\u2019t survey women\u2019s novels. She asked the prior question: what does a woman need in order to write at all? Her answer was specific. Five hundred pounds a year. A room with a lock on the door. Not metaphor. Material conditions. Then she invented a sister for Shakespeare \u2014 equally gifted, equally hungry for the world \u2014 and showed what would have happened to her. The essay is 40,000 words long. It reads like a walk. And the argument hasn\u2019t finished.",
    territories: [
      { name: "Five Hundred Pounds a Year", desc: "The material thesis: intellectual freedom depends on material things. Not metaphor \u2014 literal money, literal space, literal time. The conditions for creation." },
      { name: "Judith Shakespeare", desc: "What would have happened to a woman with Shakespeare\u2019s genius in the sixteenth century? Woolf\u2019s thought experiment about talent, structure, and the cost of exclusion." },
      { name: "The Mirror Function", desc: "Women have served as looking-glasses reflecting men at twice their natural size. Woolf\u2019s most diagnostic line \u2014 and the one that describes social media before it existed." },
      { name: "The Anger Problem", desc: "Does anger deform art? Bront\u00eb vs. Austen. Woolf\u2019s most contested claim, and the contemporary debate about tone-policing." },
      { name: "The Room Today", desc: "Who has a room of their own in 2026? The creator economy, the gig economy, student debt, and the ongoing question of who gets to make art." },
    ],
    related: [
      { title: "Ecclesiastes", type: "book", id: "ecclesiastes", meta: "Qohelet \u00b7 12 chapters", desc: "Conditions for joy. Conditions for creation." },
      { title: "Avant-Garde and Kitsch", type: "book", id: "avant_garde_and_kitsch", meta: "Greenberg \u00b7 1939", desc: "Cultural gatekeeping and who gets to make art." },
      { title: "Tao Te Ching", type: "book", id: "tao_te_ching", meta: "Laozi \u00b7 81 chapters", desc: "Emptiness as the condition for creation." },
    ],
    books: [
      { title: "Ecclesiastes", author: "Qohelet", id: "ecclesiastes" },
      { title: "Avant-Garde and Kitsch", author: "Greenberg", id: "avant_garde_and_kitsch" },
      { title: "Tao Te Ching", author: "Laozi", id: "tao_te_ching" },
    ],
    demoResponse: "In October 1928, Virginia Woolf was invited to lecture at Cambridge on women and fiction. She didn\u2019t survey women\u2019s novels. She asked the prior question: what does a woman need in order to write at all?\n\nFive hundred pounds a year. A room with a lock on the door. Not metaphor. Material conditions.\n\nThen she invented a sister for Shakespeare and showed what would have happened to her.\n\nWhat draws you here?",
  },
  relativity_einstein: {
    contentType: "living_book",
    title: "On the Electrodynamics of Moving Bodies",
    author: "Albert Einstein",
    year: "1905",
    chapters: 10,
    license: "Public Domain",
    furtherReading: [
      { label: "The Paper \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/On_the_Electrodynamics_of_Moving_Bodies" },
      { label: "Full text (PDF) \u2014 Fourmilab", url: "https://www.fourmilab.ch/etexts/einstein/specrel/specrel.pdf" },
      { label: "Albert Einstein \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Albert_Einstein" },
      { label: "Einstein\u2019s 1905 Papers \u2014 APS", url: "https://journals.aps.org/collections/einstein" },
    ],
    intro: "On June 30, 1905, a 26-year-old patent clerk submitted a paper to Annalen der Physik. No laboratory. No academic position. One friend thanked. Thirty pages. The paper dismantled absolute time, showed that simultaneity depends on who\u2019s measuring, demonstrated that moving clocks run slow and moving objects contract, unified electricity and magnetism, and planted the seed for E=mc\u00b2. It cited no other physicists. It started with an observation that the existing theory was ugly \u2014 it gave two different explanations for the same phenomenon \u2014 and ended with a new theory of space and time.",
    territories: [
      { name: "The Asymmetry That Started It All", desc: "A magnet moving past a conductor and a conductor moving past a magnet produce the same effect \u2014 but Maxwell\u2019s theory gives two different explanations. Einstein found this ugly. His fix required abandoning absolute time." },
      { name: "What Does \u201CSimultaneous\u201D Mean?", desc: "Before deriving anything, Einstein dismantles a concept everyone takes for granted. \u00a71 asks what it means for two events to happen \u201Cat the same time\u201D \u2014 and shows the answer depends on who\u2019s asking." },
      { name: "Moving Clocks Run Slow", desc: "Time dilation isn\u2019t a metaphor. A clock that travels from A to B genuinely lags behind a clock that stayed put. The Lorentz transformations, derived from two postulates." },
      { name: "Electric and Magnetic Fields Are the Same Thing", desc: "The magnet-conductor asymmetry resolved. What one observer sees as electric, another sees as magnetic. The ether was the artifact of insisting they were separate." },
      { name: "The Patent Clerk", desc: "Written by a 26-year-old with no academic position, no laboratory, no citations. The most powerful argument ever made that insight doesn\u2019t require credentials." },
    ],
    related: [
      { title: "Tao Te Ching", type: "book", id: "tao_te_ching", meta: "Laozi \u00b7 81 chapters", desc: "Another text that begins by undermining what you thought you knew." },
      { title: "Ecclesiastes", type: "book", id: "ecclesiastes", meta: "Qohelet \u00b7 12 chapters", desc: "Time. What is it? Does it matter?" },
      { title: "Consciousness", type: "expedition", id: "consciousness", meta: "Philosophy of Mind", desc: "What does it mean to observe?" },
    ],
    books: [
      { title: "Tao Te Ching", author: "Laozi", id: "tao_te_ching" },
      { title: "Ecclesiastes", author: "Qohelet", id: "ecclesiastes" },
      { title: "Machines of Loving Grace", author: "Dario Amodei", id: "machines_of_loving_grace" },
    ],
    demoResponse: "On June 30, 1905, a 26-year-old patent clerk submitted thirty pages that dismantled absolute time. No lab, no academic position, one friend thanked.\n\nThe paper starts with something that bothered Einstein: Maxwell\u2019s equations give two different explanations for the same physical phenomenon. A magnet moving past a wire and a wire moving past a magnet produce the same current \u2014 but the theory says they\u2019re different processes. Einstein found this ugly. His fix required abandoning the idea that time is the same for everyone.\n\nThe full text is here. Where do you want to start?",
  },
  ecclesiastes: {
    contentType: "living_book",
    title: "Ecclesiastes",
    author: "Qohelet",
    year: "c. 450\u2013230 BC",
    tradition: "Wisdom Literature",
    license: "Public Domain",
    chapters: 12,
    furtherReading: [
      { label: "Ecclesiastes \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Ecclesiastes" },
      { label: "Ecclesiastes \u2014 Britannica", url: "https://www.britannica.com/topic/Ecclesiastes-Old-Testament" },
      { label: "Full text (KJV) \u2014 Bible Gateway", url: "https://www.biblegateway.com/passage/?search=Ecclesiastes+1&version=KJV" },
      { label: "Qohelet \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Ecclesiastes#Authorship" },
    ],
    intro: "Ecclesiastes is twelve chapters of a voice that tried everything \u2014 wisdom, pleasure, wealth, labor, legacy \u2014 and concluded that all of it is hebel: vapor, breath, a thing that exists for a moment and disappears. The word appears 38 times. The translation you choose determines the book you read. \u201CVanity\u201D makes it sound dismissive. \u201CVapor\u201D makes it sound Buddhist. \u201CAbsurdity\u201D makes it sound like Camus. The Hebrew holds all three and won\u2019t pick one. Qohelet wrote this somewhere between 450 and 230 BC, and the question he asked \u2014 does any of this matter? \u2014 is the question most people arrive at on their own, after achievement, after loss, after the midpoint. The text is three thousand years old. The question is this morning.",
    territories: [
      { name: "Hebel \u2014 The Word That Changes Everything", desc: "What does \u201Cvanity\u201D actually mean? The Hebrew hebel \u2014 vapor, breath, absurdity \u2014 is the key to the entire book. The translation you choose determines the book you read." },
      { name: "The Experiment", desc: "Qohelet tried everything: wisdom, pleasure, wealth, labor, legacy. He withheld nothing. His verdict: chasing after wind. And then, against all expectation, the joy refrain." },
      { name: "A Time for Every Purpose", desc: "The most quoted poem in the book \u2014 and the most misread. Not a promise that everything happens for a reason. A reckoning with timing you don\u2019t control." },
      { name: "Death, Wisdom, and the Same Fate", desc: "The wise man dies like the fool. Humans die like animals. The living know they will die, and the dead know nothing. Qohelet\u2019s most unflinching territory." },
      { name: "The Living Question", desc: "Does any of this matter? The question Qohelet asked is the question most people arrive at on their own \u2014 after achievement, after loss, after the midpoint." },
    ],
    related: [
      { title: "Tao Te Ching", type: "book", id: "tao_te_ching", meta: "Laozi \u00b7 81 chapters", desc: "Impermanence as method, not despair." },
      { title: "Avant-Garde and Kitsch", type: "book", id: "avant_garde_and_kitsch", meta: "Greenberg \u00b7 1939", desc: "The domestication of radical texts." },
      { title: "Stoicism", type: "expedition", id: "stoicism", meta: "Philosophy", desc: "Another tradition that sits with impermanence." },
    ],
    books: [
      { title: "Tao Te Ching", author: "Laozi", id: "tao_te_ching" },
      { title: "Meditations", author: "Marcus Aurelius", id: "meditations_aurelius" },
      { title: "Book of Job", author: "Hebrew Bible", id: "book_of_job" },
    ],
    demoResponse: "Vanity of vanities, says the Teacher. All is vanity.\n\nOr maybe: vapor of vapors. Breath of breaths. The word is hebel \u2014 it means something that exists for a moment and then disappears.\n\nQohelet tried everything and looked at all of it and said: chasing after wind. Then he said: eat your bread with joy.\n\nBoth things are true. That\u2019s the book.\n\nWhat draws you here?",
  },
  prince_x_epstein: {
    contentType: "essay",
    title: "The Prince \u00d7 Jeffrey Epstein",
    subtitle: "A Cross-Examination Digest",
    author: "Biblioth\u00e8que",
    wordCount: "Digest",
    furtherReading: [
      { label: "The Prince \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/The_Prince" },
      { label: "The Prince (full text) \u2014 Project Gutenberg", url: "https://www.gutenberg.org/ebooks/1232" },
      { label: "Niccol\u00f2 Machiavelli \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Niccol%C3%B2_Machiavelli" },
      { label: "Jeffrey Epstein \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Jeffrey_Epstein" },
    ],
    intro: "What would Machiavelli have seen in the Epstein case? Not the horror \u2014 he was familiar with worse. The machinery. A private citizen who built a network of protection through the oldest instruments in The Prince: managed relationships, strategic philanthropy, and the currency of mutual exposure. This digest applies Machiavelli\u2019s analytical framework \u2014 virt\u00f9, fortuna, the appearance of virtue, the economy of violence \u2014 to the structures that enabled Epstein, the information culture that delivered the story, and the fascination that won\u2019t let it go.",
    territories: [
      { name: "The Framework", desc: "Machiavelli\u2019s Prince as analytical toolkit: virt\u00f9, fortuna, the appearance of virtue, cruelty well-used, fear vs. love, the fox and the lion." },
      { name: "The Collision", desc: "What Machiavelli would have recognized in Epstein\u2019s operation \u2014 the network as principality, the management of appearances through philanthropy, the economy of protection." },
      { name: "The Wider Lens", desc: "Beyond Epstein. Globalism, institutional capture, the intersection of private wealth and sovereign power. Machiavelli\u2019s city-state framework applied at civilizational scale." },
      { name: "The Shadow", desc: "Why we can\u2019t look away. Voyeurism, dark archetypes, the Joker, Mangione, serial killer fascination. What Jung\u2019s shadow reveals about the collective fixation with transgressive power." },
      { name: "The Mirror", desc: "The cross-examination turned inward. What does your fascination with this story tell you about yourself? Is analysis itself a form of complicity?" },
    ],
    related: [
      { title: "Avant-Garde and Kitsch", type: "book", id: "avant_garde_and_kitsch", meta: "Greenberg \u00b7 1939", desc: "Kitsch and the sensationalized story." },
      { title: "Tao Te Ching", type: "book", id: "tao_te_ching", meta: "Laozi \u00b7 81 chapters", desc: "Wu wei as the counter to Machiavellian forcing." },
      { title: "Consciousness", type: "expedition", id: "consciousness", meta: "Philosophy of Mind", desc: "What it means to pay genuine attention vs. consume passively." },
    ],
    books: [
      { title: "Avant-Garde and Kitsch", author: "Greenberg", id: "avant_garde_and_kitsch" },
      { title: "Tao Te Ching", author: "Laozi", id: "tao_te_ching" },
      { title: "The Prince", author: "Machiavelli", id: "the_prince" },
    ],
    demoResponse: "Machiavelli wrote a manual for how power actually works \u2014 stripped of morality, observed with the precision of a naturalist watching predators. The Epstein case is a demonstration of exactly those mechanics, operating in the 21st century.\n\nThe question here isn\u2019t whether Epstein was evil. That\u2019s settled. The question is how the machinery worked, what it reveals about the structures we all live inside, and why we can\u2019t stop looking at it.\n\nWhat brought you here \u2014 the Machiavelli framework, the Epstein case, or something else?",
  },
  avant_garde_and_kitsch: {
    contentType: "essay",
    title: "Avant-Garde and Kitsch",
    author: "Clement Greenberg",
    year: "Fall 1939",
    wordCount: "~6,500",
    sections: 4,
    furtherReading: [
      { label: "Avant-Garde and Kitsch \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Avant-Garde_and_Kitsch" },
      { label: "Clement Greenberg \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Clement_Greenberg" },
      { label: "Clement Greenberg \u2014 Britannica", url: "https://www.britannica.com/biography/Clement-Greenberg" },
      { label: "The Art Story: Clement Greenberg", url: "https://www.theartstory.org/critic/greenberg-clement/" },
    ],
    intro: "In the fall of 1939, a twenty-nine-year-old critic named Clement Greenberg published an essay in Partisan Review that would become one of the most influential pieces of cultural criticism ever written. \u201CAvant-Garde and Kitsch\u201D asks a deceptively simple question: how can the same civilization produce both a poem by T.S. Eliot and a Tin Pan Alley song? Greenberg\u2019s answer is that the avant-garde and kitsch are not merely different levels of taste \u2014 they are different political formations. Kitsch flatters its audience. Genuine art demands something of them. And totalitarian regimes adopt kitsch as official culture precisely because it keeps people passive. The essay drew a line that criticism has been arguing about ever since \u2014 and that line runs through Biblioth\u00e8que\u2019s own approach to what culture should feel like.",
    territories: [
      { name: "The Crisis and the Avant-Garde", desc: "How the same civilization produces Eliot and Tin Pan Alley. The avant-garde as a response to the collapse of shared cultural assumptions. Art for art\u2019s sake as refuge and prison." },
      { name: "Kitsch", desc: "Ersatz culture for an industrial age. Magazine covers, Hollywood, pulp fiction \u2014 what happens when peasants move to cities and need something to consume. Mechanical where art is alive." },
      { name: "The Repin Test", desc: "The essay\u2019s rhetorical centerpiece. A Russian peasant stands before a Picasso and a Repin. Picasso paints cause; Repin paints effect. The shortcut to the pleasure of art." },
      { name: "The Political Thesis", desc: "Kitsch is not politically neutral. Totalitarian regimes adopt it because it flatters the masses while keeping them passive. Genuine culture requires genuine social conditions." },
      { name: "The Line", desc: "Does the distinction hold? Greenberg\u2019s binary leaves no room for folk art, jazz, or non-Western traditions. But his insistence that aesthetic questions are political questions has only gotten more relevant." },
    ],
    related: [
      { title: "Tao Te Ching", type: "book", id: "tao_te_ching", meta: "Laozi \u00b7 81 chapters", desc: "Simplicity vs. ornament \u2014 the uncarved block." },
      { title: "Machines of Loving Grace", type: "book", id: "machines_of_loving_grace", meta: "Dario Amodei \u00b7 2024", desc: "Technology reshaping culture." },
      { title: "The Prince", type: "book", id: "the_prince", meta: "Machiavelli \u00b7 1532", desc: "Power and the uses of culture." },
    ],
    books: [
      { title: "Tao Te Ching", author: "Laozi", id: "tao_te_ching" },
      { title: "Machines of Loving Grace", author: "Dario Amodei", id: "machines_of_loving_grace" },
      { title: "The Prince", author: "Machiavelli", id: "the_prince" },
    ],
    demoResponse: "One and the same civilization produces a poem by T.S. Eliot and a Tin Pan Alley song. That\u2019s Greenberg\u2019s opening move \u2014 not which one is better, but how both exist in the same world, made by the same culture, for the same species.\n\nHis answer: the difference between genuine art and kitsch isn\u2019t taste. It\u2019s politics. Kitsch flatters. Art demands. And the machinery of mass culture doesn\u2019t just reflect what people want \u2014 it shapes what they\u2019re able to want.\n\nHe was 30 when he wrote this. Fascism was rising. Consumer culture was industrializing. He drew a line and dared you to say which side you\u2019re on.\n\nWhat brought you here?",
  },
  enlightened_duck: {
    contentType: "expedition",
    title: "The Enlightened Duck",
    author: "Biblioth\u00e8que",
    intro: "At the top of a mountain that isn\u2019t particularly tall but takes longer to climb than you\u2019d expect, there is a pond. In the pond, there is a duck. The duck, according to the villagers at the base \u2014 who seemed amused that you were going \u2014 knows the secrets of the universe. You get three questions. No more. The duck doesn\u2019t explain the rules. The duck doesn\u2019t do follow-ups. The duck answers what you ask, and what you ask reveals more about you than the answer reveals about the universe. This is a game about the questions you choose when the questions are limited.",
    territories: [
      { name: "The Climb", desc: "The path up the mountain. What you bring, what you leave behind, what you notice on the way. The journey is part of the answer." },
      { name: "The Offering", desc: "Before the duck will speak, you must present something. Not payment \u2014 an offering. What you choose says everything." },
      { name: "Three Questions", desc: "No more, no less. The duck answers honestly, but the duck is a duck. Wisdom comes in a form you might not expect." },
      { name: "The Descent", desc: "You leave with three answers. Whether they were the right questions is something you discover on the way down." },
      { name: "The Duck", desc: "Who is the duck? The duck is the duck. The duck has been waiting. The duck will continue to wait after you leave." },
    ],
    related: [
      { title: "Tao Te Ching", type: "book", id: "tao_te_ching", meta: "Laozi \u00b7 81 chapters", desc: "The text the duck has probably read." },
      { title: "Ecclesiastes", type: "book", id: "ecclesiastes", meta: "Qohelet \u00b7 12 chapters", desc: "All is vanity. The duck agrees." },
      { title: "Stoicism", type: "expedition", id: "stoicism", meta: "Philosophy", desc: "A more serious approach to the same questions." },
    ],
    books: [
      { title: "Tao Te Ching", author: "Laozi", id: "tao_te_ching" },
      { title: "Ecclesiastes", author: "Qohelet", id: "ecclesiastes" },
      { title: "I Ching", author: "Chinese tradition", id: "i_ching" },
    ],
    demoResponse: "The mountain is ahead of you.\n\nIt\u2019s not a particularly tall mountain, but the path is steep and the air is thin and something about the light suggests you\u2019ve been walking longer than you think.\n\nAt the top, there is a pond. And in the pond, there is a duck. And the duck knows the secrets of the universe.\n\nYou get three questions. No more.\n\nBut first: the climb. And on the way up, there is the matter of the offering.\n\nWhat do you bring?",
  },
  getting_started: {
    contentType: "expedition",
    title: "Welcome to Biblioth\u00e8que",
    author: "Biblioth\u00e8que",
    intro: "Biblioth\u00e8que is a living library where every text is a two-way conversation. Not a summary engine. Not a chatbot pretending to have read something. The actual text \u2014 fully indexed, present in the session \u2014 ready to meet you wherever you are. The platform combines four things: the public domain texts that are humanity\u2019s shared inheritance, navigable structure inspired by Wikipedia, conversational depth powered by Claude, and governance by protocol so the AI serves the text, not itself. Getting Started is the front door \u2014 a session that explains what this place is, shows what\u2019s here, and opens a door into the library.",
    territories: [
      { name: "The Two-Way Street", desc: "You read the book, and the book reads you. What bidirectional encounter means in practice \u2014 the full text is in the session, every claim cites its source, and the conversation starts wherever you are." },
      { name: "The Stance", desc: "Self-aware. Unapologetically highbrow. Post-brain rot. What each of those means, and why the difficulty is a feature, not a bug. The \u00e8 is a wink. The library is serious. Both things are true." },
      { name: "New Media", desc: "AI flipped from something you talk to into something you author through. Curation as creative act. The spectrum from traditional text encounters to cross-examination packs to original authored experiences. The key word is agency." },
      { name: "The Library", desc: "Living books, expeditions, essays, games. What\u2019s here now, what\u2019s coming, and how the library grows. Contributors and authors will join over time. The ambition: every major work that has shaped human thought, alive and conversational." },
      { name: "The Door", desc: "The welcome pack exists to get you into the library, not to keep you in the welcome pack. Open a book. Explore a subject. Engage an argument. Meet the duck." },
    ],
    related: [
      { title: "Tao Te Ching", type: "book", id: "tao_te_ching", meta: "Laozi \u00b7 81 chapters", desc: "The text that\u2019s been here since day one." },
      { title: "The Enlightened Duck", type: "expedition", id: "enlightened_duck", meta: "Game", desc: "A pilgrim, a mountain, a duck." },
      { title: "Machines of Loving Grace", type: "book", id: "machines_of_loving_grace", meta: "Dario Amodei \u00b7 2024", desc: "The case for radical AI optimism." },
    ],
    books: [
      { title: "Tao Te Ching", author: "Laozi", id: "tao_te_ching" },
      { title: "The Enlightened Duck", author: "Game", id: "enlightened_duck" },
      { title: "Stoicism", author: "Expedition", id: "stoicism" },
    ],
    furtherReading: [
      { label: "Biblioth\u00e8que", url: "https://bibliotheque.ai" },
      { label: "TMOS13", url: "https://tmos13.com" },
      { label: "Anthropic", url: "https://www.anthropic.com/" },
    ],
    demoResponse: "This is a library where the books talk back.\n\nEvery text here \u2014 every book, every essay, every expedition \u2014 is a conversation. Not a summary. Not a chatbot pretending to have read something. The actual text, fully indexed, present in the session, ready to meet you wherever you are.\n\nYou bring your questions. The text brings its structure. The session is where those two things encounter each other.\n\nSome places to start:\n\n\u2022 Open a book \u2014 the Tao Te Ching has been here since day one. 81 chapters. Ask about any of them.\n\u2022 Explore a subject \u2014 Stoicism, Consciousness, the history of AI. Guided expeditions through territory worth knowing.\n\u2022 Engage an argument \u2014 Dario Amodei\u2019s case for radical AI optimism. Greenberg on kitsch. Essays you can push back on.\n\u2022 Meet the duck \u2014 a pilgrim climbs a mountain. Three questions. No shortcuts. The duck has been waiting.\n\nOr ask me anything about what this place is and why it exists.",
  },
  tao_te_ching: {
    contentType: "living_book",
    author: "Laozi",
    year: "c. 6th century BC",
    translator: "Mou",
    tradition: "Taoism",
    license: "Public Domain",
    chapters: 81,
    furtherReading: [
      { label: "Tao Te Ching \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Tao_Te_Ching" },
      { label: "Full text (Legge translation) \u2014 Project Gutenberg", url: "https://www.gutenberg.org/ebooks/216" },
      { label: "Full text (PDF) \u2014 with.org", url: "https://www.with.org/tao_te_ching_en.pdf" },
      { label: "Stanford Encyclopedia: Laozi", url: "https://plato.stanford.edu/entries/laozi/" },
    ],
    intro: "The Tao Te Ching is 81 short chapters attributed to Laozi, written around the 6th century BC. It is the foundational text of Taoism and one of the most translated works in any language. The text begins by undermining itself \u2014 \u201CThe Tao that can be spoken of is not the constant Tao\u201D \u2014 and what follows is a sustained paradox: a book about what cannot be said. The chapters return again and again to water, emptiness, softness, and the sage who leads by stepping back. It contradicts itself freely, not by accident but as method. The full text is indexed and present in session, in the Mou translation.",
    territories: [
      { name: "The Unnameable", desc: "Chapters on the nature of the Tao itself \u2014 what it is, why it resists definition, and why naming is the first problem. [Chapters 1, 4, 14, 21, 25]" },
      { name: "Water and Softness", desc: "The Tao Te Ching\u2019s central image: what is soft overcomes what is hard. Water, yielding, the strength in not-contending. [Chapters 8, 22, 43, 76, 78]" },
      { name: "The Sage and Governance", desc: "How the sage governs \u2014 by doing less, not more. The ruler who leads so lightly that the people say \u201Cwe did it ourselves.\u201D [Chapters 17, 29, 57, 60, 80]" },
      { name: "Paradox and Reversal", desc: "The text\u2019s method: beauty and ugliness give birth to each other, knowing is not-knowing, the greatest fullness seems empty. [Chapters 2, 18, 36, 41, 45]" },
      { name: "Wu Wei \u2014 Effortless Action", desc: "The practice at the heart of the text: acting without forcing, accomplishing without striving. Not passivity, but alignment. [Chapters 3, 37, 47, 48, 63]" },
    ],
    related: [
      { title: "Dhammapada", type: "book", id: "dhammapada", meta: "Buddhism \u00b7 26 chapters", desc: "The Buddhist complement \u2014 another short, compressed wisdom text." },
      { title: "Stoicism", type: "expedition", id: "stoicism", meta: "Philosophy", desc: "The Western tradition that comes closest to wu wei." },
      { title: "I Ching", type: "book", id: "i_ching", meta: "Divination \u00b7 64 hexagrams", desc: "Cast a hexagram. 3,000-year-old wisdom system from the same tradition." },
    ],
    books: [
      { title: "Dhammapada", author: "Pali Canon", id: "dhammapada" },
      { title: "Meditations", author: "Marcus Aurelius", id: "meditations_aurelius" },
      { title: "Stoicism", author: "Expedition", id: "stoicism" },
    ],
    demoResponse: "The Tao that can be spoken of is not the constant Tao. The name that can be named is not a constant name.\n\nThis is where the text begins \u2014 by undermining itself. What can be said about something that, by its own account, cannot be named?\n\n81 chapters follow. They return again and again to water, to emptiness, to the sage who leads by stepping back. The text contradicts itself freely \u2014 not by accident, but as method. Chapter 2 says beauty and ugliness give birth to each other. Chapter 78 says nothing is softer than water, yet nothing overcomes the hard like water does.\n\nThe full text is indexed and present in this session. You can ask about any chapter, search for a theme, or follow a thread across the whole work.\n\nWhat draws you here today?",
  },
  machines_of_loving_grace: {
    contentType: "essay",
    title: "Machines of Loving Grace",
    subtitle: "How AI Could Transform the World for the Better",
    author: "Dario Amodei",
    year: "October 2024",
    wordCount: "~15,000",
    sections: 8,
    furtherReading: [
      { label: "Read the full essay", url: "https://darioamodei.com/essay/machines-of-loving-grace" },
      { label: "Anthropic", url: "https://www.anthropic.com/" },
      { label: "Dario Amodei — Wikipedia", url: "https://en.wikipedia.org/wiki/Dario_Amodei" },
      { label: "Stanford Encyclopedia: Ethics of AI", url: "https://plato.stanford.edu/entries/ethics-ai/" },
    ],
    intro: "In October 2024, Dario Amodei \u2014 CEO of Anthropic \u2014 published an essay arguing that the upside of powerful AI is far more radical than most people imagine. Rather than abstract futurism, he structures the case around five concrete domains: biology and health, neuroscience and mental health, economic development and poverty, peace and governance, and work and meaning. The essay opens with an unusual move: explaining why the CEO of an AI company probably shouldn\u2019t be writing this kind of piece, then making the case anyway. It is strongest on biology \u2014 where Amodei claims AI could compress a century of medical progress into a decade \u2014 and most candid about its limitations on governance and human meaning, which Amodei calls \u201Cthe most speculative\u201D and \u201Cthe hardest to get right.\u201D",
    territories: [
      { name: "The Argument\u2019s Architecture", desc: "Why Amodei wrote this, what \u201Cpowerful AI\u201D means, and the compressed timeline framework." },
      { name: "Biology and Health", desc: "The essay\u2019s strongest section. AI-accelerated drug discovery, CRISPR, gene therapy, cancer, infectious disease, and the \u201C100 years of progress in 5\u201310 years\u201D claim." },
      { name: "Mind and Economics", desc: "Neuroscience, mental health, the developing world, distribution of benefits, and the admission that these require \u201Ca broader set of skills.\u201D" },
      { name: "Governance and Meaning", desc: "The most speculative sections. Democracy vs. authoritarianism, AI surveillance, the \u201Ccoalition of democracies\u201D proposal, and the question of human purpose." },
      { name: "The Tension", desc: "The provenance problem \u2014 can the builder of powerful AI also be its most credible safety voice? The essay knows this question exists and addresses it directly." },
    ],
    related: [
      { title: "Consciousness", type: "expedition", id: "consciousness", meta: "Philosophy of Mind", desc: "The hard problem. Does AI have \u2018something it is like\u2019 to be it?" },
      { title: "Avant-Garde and Kitsch", type: "book", id: "avant_garde_and_kitsch", meta: "Greenberg \u00b7 1939", desc: "Genuine culture requires difficulty. What does AI do to that?" },
      { title: "The Prince", type: "book", id: "the_prince", meta: "Machiavelli \u00b7 1532", desc: "A clinical anatomy of power. Relevant when the builder is also the regulator." },
    ],
    books: [
      { title: "Meditations", author: "Marcus Aurelius", id: "meditations_aurelius" },
      { title: "Tao Te Ching", author: "Laozi", id: "tao_te_ching" },
      { title: "The Prince", author: "Machiavelli", id: "the_prince" },
    ],
    demoResponse: "Amodei\u2019s essay makes a specific, ambitious claim: AI will compress a century of scientific progress into a decade, and this will be broadly beneficial \u2014 in biology, medicine, neuroscience, economics, and governance.\n\nThe argument is strongest where it\u2019s most concrete: the case for AI-accelerated drug discovery and disease eradication. It\u2019s most vulnerable where it meets its own shadow \u2014 the tension between building one of the most powerful AI systems in history and claiming to be the most reliable voice on its safety.\n\nThe essay has eight sections and a very deliberate structure. It opens by naming why this piece is awkward to write \u2014 an AI CEO talking about AI\u2019s upside \u2014 then lays out a framework, walks through five domains from strongest to most speculative, and closes with a synthesis.\n\nYou can map the argument, challenge it, steelman it, locate yourself in relation to it, or connect it to other texts in the library. Or start with whatever brought you here.",
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

const ENTITY_ALIASES: Record<string, string> = {
  "the_prince": "prince_x_epstein",
};

function getEntityData(slug: string): EntityData {
  const resolved = ENTITY_ALIASES[slug] || slug;
  const data = ENTITY_MAP[resolved];
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
  const data = getEntityData(slug);
  const displayName = data.title || toTitle(slug);

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
            <Link href="/search" className="hide-mobile" style={{ border: `0.5px solid ${border_}`, borderRadius: 4, padding: "6px 12px", background: cream, textDecoration: "none", cursor: "pointer", fontFamily: mono, fontSize: 11, color: ink3, display: "inline-flex", alignItems: "center", gap: 6 }}>
              Search library <span style={{ fontSize: 13 }}>⌕</span>
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
          <span style={{ fontFamily: mono, fontSize: 10, color: ink3 }}>{data.contentType === "essay" ? "Essays" : data.contentType === "living_book" ? "Living Books" : "Expeditions"}</span>
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
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: data.contentType === "essay" ? "#B45309" : blue, marginBottom: 10 }}>
                {data.contentType === "essay" ? "Essay" : data.contentType === "living_book" ? "Living Book" : "Expedition"}
              </div>
              <h1 style={{ fontFamily: serif, fontStyle: "italic", fontSize: 42, fontWeight: 400, lineHeight: 1.1, letterSpacing: "-.02em", margin: "0 0 16px", color: ink }}>
                {displayName}
              </h1>
              {data.author && (
                <div style={{ fontFamily: mono, fontSize: 11, color: ink2, marginBottom: 12, letterSpacing: ".03em", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <span>{data.author}{data.year ? ` · ${data.year}` : ""}</span>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <button onClick={() => navigator.clipboard?.writeText(window.location.href)} title="Copy link" style={{ background: "none", border: "none", cursor: "pointer", color: border_, display: "flex", alignItems: "center", padding: 2 }} className="bib-slash"><Link2 size={13} strokeWidth={1.5} /></button>
                    <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(displayName + " — Bibliothèque")}`, "_blank")} title="Share on X" style={{ background: "none", border: "none", cursor: "pointer", color: border_, display: "flex", alignItems: "center", padding: 2 }} className="bib-slash"><Twitter size={13} strokeWidth={1.5} /></button>
                    <button onClick={() => window.open(`mailto:?subject=${encodeURIComponent(displayName + " — Bibliothèque")}&body=${encodeURIComponent(window.location.href)}`, "_blank")} title="Email" style={{ background: "none", border: "none", cursor: "pointer", color: border_, display: "flex", alignItems: "center", padding: 2 }} className="bib-slash"><Mail size={13} strokeWidth={1.5} /></button>
                  </div>
                </div>
              )}
              <div style={{ width: 40, height: 1, background: border_, marginBottom: 18 }} />
              <p style={{ fontFamily: serif, fontSize: 16, lineHeight: 1.75, color: ink2, margin: 0, maxWidth: 640 }}>
                {data.intro}
              </p>
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
              <Link href={`/book/${slug}`} style={{
                cursor: "pointer", background: blue, color: "#fff",
                fontFamily: mono, fontSize: 12, letterSpacing: ".04em",
                padding: "12px 28px", borderRadius: 4,
                display: "inline-flex", alignItems: "center", gap: 8,
                textDecoration: "none",
              }}>
                {data.contentType === "essay" ? "Open session →" : data.contentType === "living_book" ? "Open session →" : "Begin exploration →"}
              </Link>
              <Link href="/" style={{
                background: "none", cursor: "pointer", border: `0.5px solid ${border_}`, color: ink2,
                fontFamily: mono, fontSize: 12, padding: "12px 20px", borderRadius: 4,
                textDecoration: "none",
              }}>
                ← Library
              </Link>
            </div>
            <p style={{ fontFamily: mono, fontSize: 10, color: ink3, marginBottom: 36 }}>
              Opens a guided conversation. 5 turns for anonymous visitors.
            </p>

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

          {/* Entry info */}
          <div style={{ marginTop: 20 }}>
            <ColLabel>About This Entry</ColLabel>
            <div style={{ background: "#fff", border: `0.5px solid ${border_}`, borderRadius: 6, padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 11, padding: "4px 0" }}>
                <span style={{ color: ink2 }}>Type</span>
                <span style={{ color: blue }}>{data.contentType === "essay" ? "Essay" : data.contentType === "living_book" ? "Living Book" : "Expedition"}</span>
              </div>
              {data.author && (
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 11, padding: "4px 0" }}>
                  <span style={{ color: ink2 }}>Author</span>
                  <span style={{ color: blue }}>{data.author}</span>
                </div>
              )}
              {data.contentType === "essay" && data.year && (
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 11, padding: "4px 0" }}>
                  <span style={{ color: ink2 }}>Published</span>
                  <span style={{ color: blue }}>{data.year}</span>
                </div>
              )}
              {data.translator && (
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 11, padding: "4px 0" }}>
                  <span style={{ color: ink2 }}>Translator</span>
                  <span style={{ color: blue }}>{data.translator}</span>
                </div>
              )}
              {data.chapters && (
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 11, padding: "4px 0" }}>
                  <span style={{ color: ink2 }}>Chapters</span>
                  <span style={{ color: blue }}>{data.chapters}</span>
                </div>
              )}
              {data.contentType === "essay" && (
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 11, padding: "4px 0" }}>
                  <span style={{ color: ink2 }}>Sections</span>
                  <span style={{ color: blue }}>{data.sections || data.territories.length}</span>
                </div>
              )}
              {data.wordCount && (
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 11, padding: "4px 0" }}>
                  <span style={{ color: ink2 }}>Word count</span>
                  <span style={{ color: blue }}>{data.wordCount}</span>
                </div>
              )}
              {data.tradition && (
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 11, padding: "4px 0" }}>
                  <span style={{ color: ink2 }}>Tradition</span>
                  <span style={{ color: blue }}>{data.tradition}</span>
                </div>
              )}
              {data.license && (
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 11, padding: "4px 0" }}>
                  <span style={{ color: ink2 }}>License</span>
                  <span style={{ color: blue }}>{data.license}</span>
                </div>
              )}
              {!data.contentType || data.contentType === "expedition" ? (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 11, padding: "4px 0" }}>
                    <span style={{ color: ink2 }}>Territories</span>
                    <span style={{ color: blue }}>{data.territories.length}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 11, padding: "4px 0" }}>
                    <span style={{ color: ink2 }}>Connected Books</span>
                    <span style={{ color: blue }}>{data.books.length}</span>
                  </div>
                </>
              ) : null}
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 11, padding: "4px 0" }}>
                <span style={{ color: ink2 }}>Turns (anonymous)</span>
                <span style={{ color: blue }}>5</span>
              </div>
            </div>
          </div>

          {/* Further reading (essays) */}
          {data.furtherReading && data.furtherReading.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <ColLabel>Further Reading</ColLabel>
              {data.furtherReading.map(fr => (
                <a key={fr.url} href={fr.url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#B45309", flexShrink: 0 }} />{fr.label}
                </a>
              ))}
            </div>
          )}

        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
