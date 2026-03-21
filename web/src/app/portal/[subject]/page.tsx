"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import SharedLibCard, { type CardEntry as SharedCardEntry } from "@/components/LibCard";

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

// ── Portal metadata ───────────────────────────────────────────────────────

const PORTAL_COLORS: Record<string, { tint: string; accent: string }> = {
  philosophy:  { tint: "#F5F3FF", accent: "#7C3AED" },
  religion:    { tint: "#FFF7ED", accent: "#C2410C" },
  science:     { tint: "#ECFDF5", accent: "#065F46" },
  history:     { tint: "#FFFBEB", accent: "#92400E" },
  mathematics: { tint: "#EFF6FF", accent: "#1E40AF" },
  esoterica:   { tint: "#FDF4FF", accent: "#7E22CE" },
  literature:  { tint: "#FFF1F2", accent: "#9F1239" },
  psychology:  { tint: "#ECFEFF", accent: "#155E75" },
  society:     { tint: "#F0FDF4", accent: "#14532D" },
  technology:  { tint: "#EFF6FF", accent: "#1E3A8A" },
  health:      { tint: "#FFF1F2", accent: "#881337" },
};

const FORMAT_COLORS: Record<string, { label: string; tab: string; tint: string }> = {
  living_book: { label: "Living Book", tab: "#1D4ED8", tint: "#EFF6FF" },
  expedition:  { label: "Expedition",  tab: "#0891B2", tint: "#ECFEFF" },
  horoscope:   { label: "Horoscope",   tab: "#7C3AED", tint: "#F5F3FF" },
  essay:       { label: "Essay",       tab: "#B45309", tint: "#FFFBEB" },
  interaction: { label: "Interaction", tab: "#059669", tint: "#ECFDF5" },
};

const SUBJECT_INTROS: Record<string, string> = {
  philosophy: "The examined life, rendered as conversation. From the pre-Socratics to the postmodernists, these living texts do not merely present arguments \u2014 they engage you in them. Ask a question of Nietzsche and he will answer in his own voice. Challenge Aristotle and he will push back. Philosophy here is not history; it is practice.",
  religion: "The sacred texts of the world\u2019s traditions, alive and responsive. Not apologetics, not scholarship \u2014 encounter. Sit with the Tao Te Ching and ask about wu wei. Open Ecclesiastes and wrestle with its magnificent pessimism. The library holds these texts not as artifacts but as living interlocutors.",
  science: "From Newton\u2019s Principia to Einstein\u2019s own exposition of relativity, the foundational works of science made conversational. Ask the text to explain, to derive, to contextualize. These are not summaries \u2014 they are the original works, rendered as dialogue partners who can meet you at your level of understanding.",
  history: "The great works of historical analysis and political theory, from Thucydides to the present. Machiavelli will explain his prince. Gibbon will narrate Rome\u2019s decline. These texts remember everything they contain, and they are patient with your questions.",
  mathematics: "Pure mathematics as dialogue. Euclid\u2019s elements, G\u00f6del\u2019s incompleteness, the foundations of calculus \u2014 not as textbook exercises but as living conversations with the ideas themselves. Ask for proof, ask for intuition, ask why it matters. The text will meet you where you are.",
  esoterica: "The hidden traditions: alchemy, hermeticism, Kabbalah, divination. The I Ching will cast your hexagram and interpret it in real time. The Corpus Hermeticum will speak of the All. These are not curios \u2014 they are complete systems of thought, and here they speak for themselves.",
  literature: "The great works of world literature as conversational companions. Virginia Woolf on the conditions of creative freedom. Dostoevsky on the underground. Borges on labyrinths. Each text is fully indexed and responsive \u2014 ask about any passage, character, or theme.",
  psychology: "The mind examining itself. Freud, Jung, William James, Kahneman \u2014 the foundational texts of psychology rendered as living dialogue. Ask about defense mechanisms, archetypes, the stream of consciousness, or cognitive bias. The authors will answer from their own frameworks.",
  society: "The works that shaped how we understand collective life. Sociology, political economy, cultural criticism \u2014 from Adam Smith to Simone de Beauvoir. These texts engage with the structures that organize human societies and the forces that change them.",
  technology: "The literature of the machine age and beyond. From Turing\u2019s foundational papers to contemporary works on AI and robotics, these are the texts that define our relationship with the tools we build. Ask about augmentation, automation, intelligence, and what it means to compute.",
  health: "The body and its care, from ancient Hippocratic texts to modern medical literature. Not medical advice \u2014 medical thinking. Engage with the foundational works that shaped our understanding of disease, wellness, and the practice of healing.",
};

// ── Subject card data ──────────────────────────────────────────────────────

interface CardEntry {
  id: string;
  title: string;
  author: string;
  desc: string;
  format: string;
  meta: string;
  sessions: string;
}

const SUBJECT_CARDS: Record<string, CardEntry[]> = {
  philosophy: [
    { id: "genealogy_of_morality", title: "On the Genealogy of Morality", author: "Friedrich Nietzsche \u00b7 1887", desc: "Where do our moral values come from? Resentment, guilt, and the will to power \u2014 the most unsettling challenge to conventional ethics.", format: "living_book", meta: "3 essays", sessions: "15 this week" },
    { id: "republic", title: "The Republic", author: "Plato \u00b7 c. 375 BC", desc: "Justice, the ideal state, the allegory of the cave. The dialogue that launched Western philosophy\u2019s longest conversation.", format: "living_book", meta: "10 books", sessions: "28 this week" },
    { id: "meditations", title: "Meditations", author: "Marcus Aurelius \u00b7 c. 170 AD", desc: "The private journal of a Roman emperor, practicing Stoic philosophy under the pressures of empire. Never meant to be published.", format: "living_book", meta: "12 books", sessions: "41 this week" },
    { id: "stoicism_expedition", title: "The Stoicism Expedition", author: "Expedition \u00b7 Multi-source", desc: "A guided journey through Stoic thought: from Zeno\u2019s stoa to Marcus Aurelius\u2019s tent. Epictetus, Seneca, and the modern revival.", format: "expedition", meta: "\u221e turns", sessions: "33 this week" },
    { id: "being_and_nothingness", title: "Being and Nothingness", author: "Jean-Paul Sartre \u00b7 1943", desc: "Existence precedes essence. The foundational text of existentialist philosophy \u2014 freedom, bad faith, and the look of the Other.", format: "living_book", meta: "Full text", sessions: "9 this week" },
    { id: "critique_of_pure_reason", title: "Critique of Pure Reason", author: "Immanuel Kant \u00b7 1781", desc: "What can we know? Kant\u2019s transcendental idealism and the limits of human understanding. The mountain that divides all modern philosophy.", format: "living_book", meta: "Full text", sessions: "11 this week" },
  ],
  religion: [
    { id: "tao_te_ching", title: "Tao Te Ching", author: "Laozi \u00b7 c. 6th century BC", desc: "81 chapters on the nature of the Tao \u2014 the text that begins by undermining itself.", format: "living_book", meta: "81 chapters", sessions: "47 this week" },
    { id: "ecclesiastes", title: "Ecclesiastes", author: "Qohelet \u00b7 c. 450\u2013200 BC", desc: "The most existential book of the Bible. All is vanity. Yet still: eat, drink, find joy in your labor.", format: "living_book", meta: "12 chapters", sessions: "22 this week" },
    { id: "bhagavad_gita", title: "Bhagavad Gita", author: "Vyasa \u00b7 c. 200 BC", desc: "Krishna\u2019s counsel to Arjuna on the battlefield. Duty, devotion, knowledge, and the nature of the self \u2014 the heart of Hindu philosophy.", format: "living_book", meta: "18 chapters", sessions: "35 this week" },
    { id: "dhammapada", title: "The Dhammapada", author: "Buddhist tradition \u00b7 c. 300 BC", desc: "The Buddha\u2019s teachings distilled into 423 verses. The path, the mind, the world. Clear, direct, and startlingly modern.", format: "living_book", meta: "26 chapters", sessions: "19 this week" },
    { id: "mysticism_expedition", title: "The Mysticism Expedition", author: "Expedition \u00b7 Multi-tradition", desc: "Across traditions \u2014 Sufi, Christian, Hindu, Jewish, Taoist \u2014 the mystics describe strikingly similar experiences. What do they share?", format: "expedition", meta: "\u221e turns", sessions: "14 this week" },
    { id: "book_of_job", title: "The Book of Job", author: "Hebrew Bible \u00b7 c. 600 BC", desc: "The problem of suffering, dramatized. Why do the righteous suffer? God\u2019s answer is not what you expect.", format: "living_book", meta: "42 chapters", sessions: "17 this week" },
  ],
  science: [
    { id: "relativity_einstein", title: "Relativity", author: "Albert Einstein \u00b7 1916", desc: "Einstein\u2019s own popular exposition of special and general relativity, written for the non-specialist.", format: "living_book", meta: "Full text", sessions: "24 this week" },
    { id: "origin_of_species", title: "On the Origin of Species", author: "Charles Darwin \u00b7 1859", desc: "Natural selection, the struggle for existence, and the tangled bank. The book that changed biology \u2014 and everything else.", format: "living_book", meta: "15 chapters", sessions: "31 this week" },
    { id: "structure_of_revolutions", title: "The Structure of Scientific Revolutions", author: "Thomas Kuhn \u00b7 1962", desc: "Paradigm shifts, normal science, and incommensurability. How science actually progresses \u2014 not smoothly, but by revolution.", format: "living_book", meta: "13 chapters", sessions: "18 this week" },
    { id: "quantum_expedition", title: "The Quantum Mechanics Expedition", author: "Expedition \u00b7 Multi-source", desc: "From Planck\u2019s desperation to Bell\u2019s theorem. The story of the theory that broke our intuitions about reality.", format: "expedition", meta: "\u221e turns", sessions: "27 this week" },
    { id: "principia_mathematica", title: "Principia Mathematica", author: "Isaac Newton \u00b7 1687", desc: "The laws of motion and universal gravitation. The book that made mathematical physics possible.", format: "living_book", meta: "3 books", sessions: "12 this week" },
    { id: "silent_spring", title: "Silent Spring", author: "Rachel Carson \u00b7 1962", desc: "The book that launched the environmental movement. Pesticides, ecosystems, and the obligation to look.", format: "living_book", meta: "17 chapters", sessions: "15 this week" },
  ],
  history: [
    { id: "the_prince", title: "The Prince", author: "Niccol\u00f2 Machiavelli \u00b7 1532", desc: "The most influential \u2014 and most misread \u2014 work of political theory. A clinical anatomy of power.", format: "living_book", meta: "26 chapters", sessions: "19 this week" },
    { id: "decline_and_fall", title: "The Decline and Fall of the Roman Empire", author: "Edward Gibbon \u00b7 1776\u20131789", desc: "Six volumes on how the greatest empire in history unraveled. Gibbon\u2019s prose is itself a monument.", format: "living_book", meta: "71 chapters", sessions: "14 this week" },
    { id: "peloponnesian_war", title: "History of the Peloponnesian War", author: "Thucydides \u00b7 c. 400 BC", desc: "Athens vs. Sparta. The first work of political realism. The Melian Dialogue alone is worth the encounter.", format: "living_book", meta: "8 books", sessions: "11 this week" },
    { id: "civilizations_expedition", title: "The Rise and Fall of Civilizations", author: "Expedition \u00b7 Multi-source", desc: "Why do civilizations collapse? Toynbee, Spengler, Diamond, Tainter \u2014 the theories compared and tested.", format: "expedition", meta: "\u221e turns", sessions: "22 this week" },
    { id: "age_of_revolution", title: "The Age of Revolution", author: "Eric Hobsbawm \u00b7 1962", desc: "The dual revolution \u2014 French and Industrial \u2014 that made the modern world. 1789 to 1848.", format: "living_book", meta: "16 chapters", sessions: "8 this week" },
    { id: "guns_germs_steel", title: "Guns, Germs, and Steel", author: "Jared Diamond \u00b7 1997", desc: "Why did Eurasian civilizations conquer rather than the reverse? Geography, agriculture, and the luck of the draw.", format: "living_book", meta: "19 chapters", sessions: "26 this week" },
  ],
  mathematics: [
    { id: "elements", title: "The Elements", author: "Euclid \u00b7 c. 300 BC", desc: "The most influential mathematics textbook ever written. Definitions, postulates, and 465 propositions built from first principles.", format: "living_book", meta: "13 books", sessions: "16 this week" },
    { id: "godel_incompleteness", title: "G\u00f6del\u2019s Incompleteness Theorems", author: "Kurt G\u00f6del \u00b7 1931", desc: "Any consistent formal system powerful enough to express arithmetic contains true statements it cannot prove. The end of Hilbert\u2019s dream.", format: "living_book", meta: "2 theorems", sessions: "21 this week" },
    { id: "infinity_expedition", title: "The Infinity Expedition", author: "Expedition \u00b7 Multi-source", desc: "Cantor\u2019s paradise, Hilbert\u2019s hotel, and the continuum hypothesis. A guided journey through the mathematics of the infinite.", format: "expedition", meta: "\u221e turns", sessions: "19 this week" },
    { id: "principia_whitehead", title: "Principia Mathematica", author: "Whitehead & Russell \u00b7 1910\u20131913", desc: "The monumental attempt to derive all mathematics from logic. 362 pages to prove 1 + 1 = 2.", format: "living_book", meta: "3 volumes", sessions: "7 this week" },
    { id: "mathematician_apology", title: "A Mathematician\u2019s Apology", author: "G. H. Hardy \u00b7 1940", desc: "The aesthetic case for pure mathematics. Beauty, permanence, and the melancholy of a great mind past its prime.", format: "essay", meta: "~10,000 words", sessions: "13 this week" },
    { id: "what_is_mathematics", title: "What Is Mathematics?", author: "Courant & Robbins \u00b7 1941", desc: "An elementary approach to ideas and methods. Number theory, geometry, topology, calculus \u2014 the whole landscape in one book.", format: "living_book", meta: "8 chapters", sessions: "10 this week" },
  ],
  esoterica: [
    { id: "i_ching", title: "I Ching", author: "Chinese tradition \u00b7 c. 1000 BC", desc: "The Book of Changes. 64 hexagrams encoding a complete cosmology. Cast and interpret in real time.", format: "horoscope", meta: "64 hexagrams", sessions: "38 this week" },
    { id: "corpus_hermeticum", title: "Corpus Hermeticum", author: "Hermes Trismegistus \u00b7 c. 100\u2013300 AD", desc: "As above, so below. The foundational texts of Hermeticism \u2014 divine mind, cosmic sympathy, and the path of ascent.", format: "living_book", meta: "18 tractates", sessions: "14 this week" },
    { id: "alchemy_expedition", title: "The Alchemy Expedition", author: "Expedition \u00b7 Multi-source", desc: "The Great Work: nigredo, albedo, citrinitas, rubedo. Not just proto-chemistry \u2014 a complete system of spiritual transformation.", format: "expedition", meta: "\u221e turns", sessions: "22 this week" },
    { id: "sefer_yetzirah", title: "Sefer Yetzirah", author: "Kabbalistic tradition \u00b7 c. 200\u2013600 AD", desc: "The Book of Formation. God created the world through 32 paths of wisdom: 10 sefirot and 22 letters.", format: "living_book", meta: "6 chapters", sessions: "11 this week" },
    { id: "tarot_oracle", title: "Tarot", author: "Western esoteric \u00b7 Western esoteric", desc: "A living tarot reading. Draw cards, explore their symbolism, and let the archetypes speak to your question.", format: "horoscope", meta: "78 arcana", sessions: "45 this week" },
    { id: "emerald_tablet", title: "The Emerald Tablet", author: "Hermes Trismegistus \u00b7 c. 600\u2013800 AD", desc: "Fourteen cryptic lines that shaped a thousand years of Western esotericism. The operation of the Sun.", format: "living_book", meta: "14 verses", sessions: "9 this week" },
  ],
  literature: [
    { id: "room_of_ones_own", title: "A Room of One\u2019s Own", author: "Virginia Woolf \u00b7 1929", desc: "On the conditions required for women to write \u2014 and by extension, to think. Money and a room of her own.", format: "living_book", meta: "~38,000 words", sessions: "18 this week" },
    { id: "notes_from_underground", title: "Notes from Underground", author: "Fyodor Dostoevsky \u00b7 1864", desc: "The first existentialist novel. A bitter, brilliant man in a basement, raging against rational self-interest.", format: "living_book", meta: "2 parts", sessions: "23 this week" },
    { id: "borges_labyrinths", title: "Labyrinths", author: "Jorge Luis Borges \u00b7 1962", desc: "The Library of Babel, the Garden of Forking Paths, Pierre Menard. Fiction as philosophy, philosophy as fiction.", format: "living_book", meta: "23 stories", sessions: "29 this week" },
    { id: "poetry_expedition", title: "The Poetry Expedition", author: "Expedition \u00b7 Multi-tradition", desc: "From Homer to Dickinson to Rumi. A guided journey through the world\u2019s poetic traditions and what they reveal.", format: "expedition", meta: "\u221e turns", sessions: "16 this week" },
    { id: "metamorphosis", title: "The Metamorphosis", author: "Franz Kafka \u00b7 1915", desc: "Gregor Samsa wakes up as a giant insect. His family\u2019s response is more disturbing than the transformation itself.", format: "living_book", meta: "3 parts", sessions: "21 this week" },
    { id: "politics_english_language", title: "Politics and the English Language", author: "George Orwell \u00b7 1946", desc: "Language corrupts thought. Thought corrupts language. The essay every writer eventually encounters.", format: "essay", meta: "~5,000 words", sessions: "12 this week" },
  ],
  psychology: [
    { id: "interpretation_of_dreams", title: "The Interpretation of Dreams", author: "Sigmund Freud \u00b7 1899", desc: "The royal road to the unconscious. Dreams as wish-fulfillment, condensation, displacement \u2014 the book that invented psychoanalysis.", format: "living_book", meta: "7 chapters", sessions: "19 this week" },
    { id: "man_search_meaning", title: "Man\u2019s Search for Meaning", author: "Viktor Frankl \u00b7 1946", desc: "A psychiatrist survives Auschwitz and discovers that meaning \u2014 not pleasure, not power \u2014 is the primary human drive.", format: "living_book", meta: "2 parts", sessions: "34 this week" },
    { id: "archetypes_expedition", title: "The Archetypes Expedition", author: "Expedition \u00b7 Jungian", desc: "The shadow, the anima, the Self. A guided journey through Jung\u2019s collective unconscious and its manifestations.", format: "expedition", meta: "\u221e turns", sessions: "25 this week" },
    { id: "thinking_fast_slow", title: "Thinking, Fast and Slow", author: "Daniel Kahneman \u00b7 2011", desc: "System 1 and System 2. The biases and heuristics that shape every decision you make without your knowledge.", format: "living_book", meta: "38 chapters", sessions: "28 this week" },
    { id: "varieties_religious_experience", title: "The Varieties of Religious Experience", author: "William James \u00b7 1902", desc: "A psychologist takes mystical experience seriously. Conversion, saintliness, and the pragmatic value of belief.", format: "living_book", meta: "20 lectures", sessions: "12 this week" },
    { id: "civilization_discontents", title: "Civilization and Its Discontents", author: "Sigmund Freud \u00b7 1930", desc: "The price of civilization is neurosis. Eros and Thanatos in perpetual tension. Freud\u2019s bleakest \u2014 and most honest \u2014 book.", format: "living_book", meta: "8 chapters", sessions: "15 this week" },
  ],
  society: [
    { id: "avant_garde_and_kitsch", title: "Avant-Garde and Kitsch", author: "Clement Greenberg \u00b7 1939", desc: "Genuine culture requires difficulty, and kitsch is its enemy. Still the fault line of every culture war.", format: "essay", meta: "~10,000 words", sessions: "12 this week" },
    { id: "wealth_of_nations", title: "The Wealth of Nations", author: "Adam Smith \u00b7 1776", desc: "The invisible hand, the division of labor, and the system of natural liberty. Misquoted by everyone, read by few.", format: "living_book", meta: "5 books", sessions: "20 this week" },
    { id: "second_sex", title: "The Second Sex", author: "Simone de Beauvoir \u00b7 1949", desc: "One is not born, but rather becomes, a woman. The foundational text of modern feminism.", format: "living_book", meta: "2 volumes", sessions: "17 this week" },
    { id: "power_expedition", title: "The Power Expedition", author: "Expedition \u00b7 Multi-source", desc: "Foucault, Gramsci, Arendt, Weber \u2014 how power operates, reproduces, and occasionally dissolves.", format: "expedition", meta: "\u221e turns", sessions: "14 this week" },
    { id: "protestant_ethic", title: "The Protestant Ethic and the Spirit of Capitalism", author: "Max Weber \u00b7 1905", desc: "How Calvinist anxiety about predestination produced the work ethic that built capitalism. An irony of world-historical proportions.", format: "living_book", meta: "5 chapters", sessions: "11 this week" },
    { id: "manufacturing_consent", title: "Manufacturing Consent", author: "Herman & Chomsky \u00b7 1988", desc: "The propaganda model of mass media. Five filters that determine what counts as news.", format: "living_book", meta: "11 chapters", sessions: "22 this week" },
  ],
  technology: [
    { id: "machines_of_loving_grace", title: "Machines of Loving Grace", author: "Dario Amodei \u00b7 2024", desc: "The case for radical AI optimism \u2014 across biology, neuroscience, economics, governance, and meaning \u2014 from the CEO of Anthropic.", format: "essay", meta: "~15,000 words", sessions: "31 this week" },
    { id: "computing_machinery", title: "Computing Machinery and Intelligence", author: "Alan Turing \u00b7 1950", desc: "Can machines think? The imitation game, Lady Lovelace\u2019s objection, and the paper that started it all.", format: "essay", meta: "~12,000 words", sessions: "18 this week" },
    { id: "ai_expedition", title: "The Artificial Intelligence Expedition", author: "Expedition \u00b7 Multi-source", desc: "From Turing to transformers. A guided journey through the ideas, breakthroughs, and controversies of machine intelligence.", format: "expedition", meta: "\u221e turns", sessions: "42 this week" },
    { id: "cathedral_bazaar", title: "The Cathedral and the Bazaar", author: "Eric S. Raymond \u00b7 1997", desc: "Two models of software development. The essay that convinced Netscape to open-source its browser.", format: "essay", meta: "~10,000 words", sessions: "9 this week" },
    { id: "understanding_media", title: "Understanding Media", author: "Marshall McLuhan \u00b7 1964", desc: "The medium is the message. Hot and cool media. The global village. McLuhan saw everything coming.", format: "living_book", meta: "7 parts", sessions: "15 this week" },
    { id: "superintelligence", title: "Superintelligence", author: "Nick Bostrom \u00b7 2014", desc: "What happens when machine intelligence surpasses human intelligence? The control problem, the treacherous turn.", format: "living_book", meta: "15 chapters", sessions: "23 this week" },
  ],
  health: [
    { id: "hippocratic_writings", title: "Hippocratic Writings", author: "Hippocrates \u00b7 c. 400 BC", desc: "The oath, the aphorisms, and the case histories that founded Western medicine. First, do no harm.", format: "living_book", meta: "Selected texts", sessions: "11 this week" },
    { id: "emperor_of_maladies", title: "The Emperor of All Maladies", author: "Siddhartha Mukherjee \u00b7 2010", desc: "A biography of cancer. Four thousand years of discovery, treatment, and the slow accumulation of understanding.", format: "living_book", meta: "6 parts", sessions: "27 this week" },
    { id: "body_expedition", title: "The Human Body Expedition", author: "Expedition \u00b7 Multi-source", desc: "Systems, organs, cells. A guided anatomical journey through the most complex structure in the known universe.", format: "expedition", meta: "\u221e turns", sessions: "20 this week" },
    { id: "how_we_die", title: "How We Die", author: "Sherwin Nuland \u00b7 1994", desc: "A surgeon\u2019s unflinching account of the biological processes of death. Honest, humane, and strangely comforting.", format: "living_book", meta: "14 chapters", sessions: "13 this week" },
    { id: "man_who_mistook", title: "The Man Who Mistook His Wife for a Hat", author: "Oliver Sacks \u00b7 1985", desc: "Neurological case studies that read like literature. What brain disorders reveal about the nature of mind and self.", format: "living_book", meta: "24 cases", sessions: "32 this week" },
    { id: "being_mortal", title: "Being Mortal", author: "Atul Gawande \u00b7 2014", desc: "Medicine\u2019s failure to deal honestly with aging and death. What matters at the end of life.", format: "living_book", meta: "8 chapters", sessions: "19 this week" },
  ],
};

// ── Related data ────────────────────────────────────────────────────────────

const RELATED_EXPEDITIONS: Record<string, { slug: string; title: string }[]> = {
  philosophy: [
    { slug: "stoicism", title: "Stoicism" },
    { slug: "existentialism", title: "Existentialism" },
    { slug: "ethics", title: "Ethics Through the Ages" },
  ],
  religion: [
    { slug: "mysticism", title: "Mysticism Across Traditions" },
    { slug: "sacred-texts", title: "Sacred Texts Compared" },
    { slug: "meditation", title: "Contemplative Practices" },
  ],
  science: [
    { slug: "quantum-mechanics", title: "Quantum Mechanics" },
    { slug: "evolution", title: "The Evolution Expedition" },
    { slug: "cosmology", title: "Origins of the Universe" },
  ],
  history: [
    { slug: "civilizations", title: "Rise and Fall of Civilizations" },
    { slug: "revolutions", title: "The Great Revolutions" },
    { slug: "empires", title: "Empires Compared" },
  ],
  mathematics: [
    { slug: "infinity", title: "The Infinite" },
    { slug: "foundations", title: "Foundations of Mathematics" },
    { slug: "topology", title: "Shapes of Space" },
  ],
  esoterica: [
    { slug: "alchemy", title: "The Great Work" },
    { slug: "kabbalah", title: "The Tree of Life" },
    { slug: "divination", title: "Systems of Divination" },
  ],
  literature: [
    { slug: "poetry", title: "The Poetry Expedition" },
    { slug: "modernism", title: "Modernist Literature" },
    { slug: "tragedy", title: "The Nature of Tragedy" },
  ],
  psychology: [
    { slug: "archetypes", title: "Jungian Archetypes" },
    { slug: "consciousness", title: "The Hard Problem" },
    { slug: "cognitive-bias", title: "Cognitive Biases" },
  ],
  society: [
    { slug: "power", title: "Theories of Power" },
    { slug: "capitalism", title: "The Capitalism Debate" },
    { slug: "media", title: "Media and Propaganda" },
  ],
  technology: [
    { slug: "artificial-intelligence", title: "Artificial Intelligence" },
    { slug: "cybernetics", title: "Cybernetics and Systems" },
    { slug: "internet", title: "The Network Age" },
  ],
  health: [
    { slug: "human-body", title: "The Human Body" },
    { slug: "neuroscience", title: "Brain and Mind" },
    { slug: "public-health", title: "Epidemics and Public Health" },
  ],
};

const RELATED_SUBJECTS: Record<string, string[]> = {
  philosophy: ["Religion", "Psychology", "Mathematics", "Literature"],
  religion: ["Philosophy", "Esoterica", "Psychology", "History"],
  science: ["Mathematics", "Technology", "Health", "History"],
  history: ["Society", "Philosophy", "Literature", "Science"],
  mathematics: ["Science", "Philosophy", "Technology"],
  esoterica: ["Religion", "Philosophy", "Psychology"],
  literature: ["Philosophy", "Society", "Psychology", "History"],
  psychology: ["Philosophy", "Religion", "Health", "Society"],
  society: ["History", "Philosophy", "Psychology", "Technology"],
  technology: ["Science", "Mathematics", "Society"],
  health: ["Science", "Psychology", "Society"],
};

// ── Components ──────────────────────────────────────────────────────────────

function ColLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: ink3, paddingBottom: 12, borderBottom: `0.5px solid ${border2}`, marginBottom: 16 }}>
      {children}
    </div>
  );
}

function PortalLibCard({ entry, portalKey }: { entry: { id: string; title: string; author?: string; desc?: string; format: string; meta?: string; sessions?: string }; portalKey: string }) {
  return <SharedLibCard entry={{
    id: entry.id,
    title: entry.title,
    author: entry.author,
    desc: entry.desc,
    format: entry.format,
    portal: portalKey,
    meta: entry.meta,
    sessions: entry.sessions,
  }} />;
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function PortalSubjectPage() {
  const params = useParams();
  const rawSubject = (params.subject as string) || "";
  const subjectKey = rawSubject.toLowerCase();
  const subjectLabel = rawSubject.charAt(0).toUpperCase() + rawSubject.slice(1);

  const intro = SUBJECT_INTROS[subjectKey] || `Explore the ${subjectLabel} collection in the living library. Each text is fully indexed and ready for conversation.`;
  const cards = SUBJECT_CARDS[subjectKey] || [];
  const expeditions = RELATED_EXPEDITIONS[subjectKey] || [];
  const related = RELATED_SUBJECTS[subjectKey] || [];
  const portalColor = PORTAL_COLORS[subjectKey] || { tint: "#F9FAFB", accent: "#374151" };

  return (
    <div style={{ background: cream, color: ink, minHeight: "100vh", fontFamily: serif }}>

      {/* Top bar */}
      <div style={{ background: cream, borderBottom: `0.5px solid ${border_}`, padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 54 }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 22, fontWeight: 400, letterSpacing: "-.025em", color: ink, cursor: "pointer" }}>
            Biblioth<span style={{ color: blue }}>è</span>que
          </span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: ink3 }}>Portal</span>
          <span style={{ color: border_, fontSize: 12 }}>/</span>
          <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: portalColor.accent, fontWeight: 600 }}>
            {subjectLabel}
          </span>
        </div>
      </div>

      {/* Subject header band */}
      <div style={{ background: portalColor.tint, borderBottom: `0.5px solid ${border_}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 24px 32px" }}>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: portalColor.accent, marginBottom: 10 }}>
            The Library &middot; {subjectLabel}
          </div>
          <h1 style={{ fontFamily: serif, fontStyle: "italic", fontSize: 42, fontWeight: 400, lineHeight: 1.1, letterSpacing: "-.02em", color: ink, margin: "0 0 16px" }}>
            {subjectLabel}
          </h1>
          <div style={{ maxWidth: 680, fontFamily: serif, fontSize: 16, lineHeight: 1.75, color: ink2 }}>
            {intro}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="portal-body" style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px 60px", display: "flex", gap: 40 }}>

        {/* Cards grid */}
        <div className="portal-main" style={{ flex: 1, minWidth: 0 }}>
          <ColLabel>{subjectLabel} &middot; {cards.length} entries</ColLabel>
          <div className="card-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 20,
          }}>
            {cards.map(entry => (
              <PortalLibCard key={entry.id} entry={entry} portalKey={subjectKey} />
            ))}
          </div>

          {cards.length === 0 && (
            <div style={{ fontFamily: serif, fontSize: 15, color: ink3, padding: "40px 0", textAlign: "center", fontStyle: "italic" }}>
              This portal is being assembled. Check back soon.
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="portal-sidebar" style={{ width: 240, flexShrink: 0 }}>

          {/* Related expeditions */}
          {expeditions.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <ColLabel>Related Expeditions</ColLabel>
              {expeditions.map(exp => (
                <Link key={exp.slug} href={`/wiki/${exp.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{
                    fontFamily: serif, fontSize: 14, lineHeight: 1.5, color: blue,
                    padding: "7px 0", borderBottom: `0.5px solid ${border2}`, cursor: "pointer",
                  }}>
                    {exp.title} <span style={{ fontFamily: mono, fontSize: 10, color: ink3 }}>&rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Related subjects */}
          {related.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <ColLabel>Related Subjects</ColLabel>
              {related.map(subj => (
                <Link key={subj} href={`/portal/${subj.toLowerCase()}`} style={{ textDecoration: "none" }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 8,
                    fontFamily: mono, fontSize: 11, color: ink2,
                    padding: "7px 0", borderBottom: `0.5px solid ${border2}`, cursor: "pointer",
                  }}>
                    <span style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: (PORTAL_COLORS[subj.toLowerCase()] || { accent: ink3 }).accent,
                      flexShrink: 0,
                    }} />
                    {subj}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Back to library */}
          <div style={{ paddingTop: 16, borderTop: `0.5px solid ${border_}` }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <span style={{ fontFamily: mono, fontSize: 11, color: blue, cursor: "pointer" }}>
                &larr; Back to Biblioth&egrave;que
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: `0.5px solid ${border_}`, background: "#F5F3EE", marginTop: 40 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 24px 16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 20, marginBottom: 24 }}>
            <div>
              <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: ink, fontWeight: 600, marginBottom: 8 }}>Library</div>
              {["Books", "Essays", "Expeditions", "Horoscopes", "Games"].map(s => (
                <Link key={s} href={`/portal/${s.toLowerCase()}`} style={{ display: "block", fontFamily: serif, fontSize: 13, color: ink2, padding: "3px 0", textDecoration: "none" }}>{s}</Link>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: ink, fontWeight: 600, marginBottom: 8 }}>Subjects</div>
              {["Philosophy", "Religion", "Science", "History", "Literature"].map(s => (
                <Link key={s} href={`/portal/${s.toLowerCase()}`} style={{ display: "block", fontFamily: serif, fontSize: 13, color: ink2, padding: "3px 0", textDecoration: "none" }}>{s}</Link>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: ink, fontWeight: 600, marginBottom: 8 }}>About</div>
              <Link href="/about" style={{ display: "block", fontFamily: serif, fontSize: 13, color: ink2, padding: "3px 0", textDecoration: "none" }}>About Bibliothèque</Link>
              <Link href="/subscribe" style={{ display: "block", fontFamily: serif, fontSize: 13, color: ink2, padding: "3px 0", textDecoration: "none" }}>Subscribe</Link>
              <span style={{ display: "block", fontFamily: serif, fontSize: 13, color: ink2, padding: "3px 0" }}>Privacy Policy</span>
              <span style={{ display: "block", fontFamily: serif, fontSize: 13, color: ink2, padding: "3px 0" }}>Terms of Use</span>
            </div>
          </div>
          <div style={{ borderTop: `0.5px solid ${border_}`, paddingTop: 14 }}>
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
        </div>
      </footer>
    </div>
  );
}
