"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Search, ArrowLeft, ArrowUp, User, ChevronDown, History, Compass, Link2, Twitter, Mail, Menu } from "lucide-react";

const serif = "'Georgia', serif";
const mono = "'Courier New', monospace";
const cream = "#FAFAF7";
const ink = "#1A1816";
const ink2 = "#6B6760";
const ink3 = "#9A9590";
const border_ = "#E5E1D8";
const border2 = "#F0EDE6";
const blue = "#1D4ED8";

interface Message { role: "user" | "assistant"; content: string }

function toTitle(s: string) { return s.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()); }

// ── Book metadata lookup ──────────────────────────────────────────────────

const BOOK_DATA: Record<string, { title: string; author: string; tradition: string; chapters: string; desc: string; portal: string; related: { title: string; type: string; typeColor: string; meta: string; desc: string; href: string }[]; greeting: string }> = {
  tao_te_ching: {
    title: "Tao Te Ching", author: "Laozi", tradition: "Taoism", chapters: "81 chapters", portal: "Religion",
    desc: "81 chapters on the nature of the Tao — the text that begins by undermining itself.",
    related: [
      { title: "Dhammapada", type: "LIVING BOOK", typeColor: blue, meta: "Buddhism · 26 chapters", desc: "The path of dharma. The most accessible Buddhist text.", href: "/book/dhammapada" },
      { title: "Stoicism", type: "EXPEDITION", typeColor: "#0891B2", meta: "Philosophy", desc: "Virtue as the only good. The dichotomy of control.", href: "/wiki/stoicism" },
      { title: "I Ching", type: "HOROSCOPE", typeColor: "#7C3AED", meta: "Divination · 64 hexagrams", desc: "Cast a hexagram. 3,000-year-old wisdom system.", href: "/book/i_ching" },
    ],
    greeting: "The Tao that can be spoken of is not the constant Tao. The name that can be named is not a constant name.\n\nThis is where the text begins — by undermining itself. What can be said about something that, by its own account, cannot be named?\n\n81 chapters follow. They return again and again to water, to emptiness, to the sage who leads by stepping back. The text contradicts itself freely — not by accident, but as method. Chapter 2 says beauty and ugliness give birth to each other. Chapter 78 says nothing is softer than water, yet nothing overcomes the hard like water does.\n\nThe full text is indexed and present in this session. You can ask about any chapter, search for a theme, or follow a thread across the whole work.\n\nWhat draws you here today?",
  },
  jobs_stanford_commencement: {
    title: "Steve Jobs\u2019 Stanford Commencement Speech", author: "Steve Jobs \u00b7 2005", tradition: "Speeches", chapters: "Digest", portal: "Technology",
    desc: "Three stories about connecting the dots, love and loss, and death. Stay Hungry. Stay Foolish.",
    related: [
      { title: "Ecclesiastes", type: "LIVING BOOK", typeColor: blue, meta: "Qohelet \u00b7 12 chapters", desc: "The mortality frame.", href: "/book/ecclesiastes" },
      { title: "Tao Te Ching", type: "LIVING BOOK", typeColor: blue, meta: "Laozi \u00b7 81 chapters", desc: "Connecting the dots by not forcing.", href: "/book/tao_te_ching" },
      { title: "The Madman: God Is Dead", type: "DIGEST", typeColor: "#DC2626", meta: "Nietzsche \u00b7 1882", desc: "Don\u2019t be trapped by dogma.", href: "/book/genealogy_of_morality" },
    ],
    greeting: "On June 12, 2005, Steve Jobs stood in front of Stanford\u2019s graduating class and told them three stories. Not advice. Not strategy. Three things that happened to him: dropping out of college, getting fired from his own company, and being told he was going to die.\n\nThe speech became one of the most watched of the 21st century. The quotes became posters and LinkedIn captions. But the speech itself is darker, more specific, and more honest than the quotes suggest.\n\nHe died six years later. He was 56.\n\nWhere do you want to start?\n\n\u2022 \"Connecting the dots\" \u2014 dropping out, the calligraphy class, and why you can\u2019t plan your life\n\u2022 \"Love and loss\" \u2014 getting fired from Apple and why destruction was the prerequisite\n\u2022 \"Death\" \u2014 the cancer diagnosis, the mirror test, and \u201Cyou are already naked\u201D\n\u2022 \"The full speech\" \u2014 all three stories, walked through closely\n\u2022 \"Something specific\" \u2014 bring your own question",
  },
  genealogy_of_morality: {
    title: "The Madman: God Is Dead", author: "Friedrich Nietzsche \u00b7 1882", tradition: "Philosophy", chapters: "Digest", portal: "Philosophy",
    desc: "Nietzsche\u2019s most famous passage \u2014 and the most misunderstood. He isn\u2019t celebrating. He\u2019s diagnosing a catastrophe.",
    related: [
      { title: "Ecclesiastes", type: "LIVING BOOK", typeColor: blue, meta: "Qohelet \u00b7 12 chapters", desc: "The Hebrew parallel to the meaning crisis.", href: "/book/ecclesiastes" },
      { title: "Tao Te Ching", type: "LIVING BOOK", typeColor: blue, meta: "Laozi \u00b7 81 chapters", desc: "What holds when foundations give way.", href: "/book/tao_te_ching" },
      { title: "Avant-Garde and Kitsch", type: "ESSAY", typeColor: "#B45309", meta: "Greenberg \u00b7 1939", desc: "What fills the void when genuine culture collapses.", href: "/book/avant_garde_and_kitsch" },
    ],
    greeting: "In 1882, Friedrich Nietzsche wrote a parable about a man who lit a lantern in broad daylight, ran into the marketplace, and announced that God was dead \u2014 and that we had killed him.\n\nMost people know the phrase. Almost no one knows the passage. The standard reading is that Nietzsche was celebrating \u2014 a triumphant atheist declaring victory over religion. The actual passage says the opposite. The atheists in the marketplace are the ones laughing. The Madman is the only one who understands what\u2019s happened, and he\u2019s terrified.\n\nThis is a digest session \u2014 one passage, read closely, and the question it opens about meaning, morality, and what holds a civilization together when the foundations give way.\n\nWhere do you want to start?\n\n\u2022 \"Read the passage\" \u2014 the full text of The Gay Science \u00a7125\n\u2022 \"The misreading\" \u2014 what people think Nietzsche said vs. what he actually wrote\n\u2022 \"The meaning crisis\" \u2014 how a passage from 1882 describes 2026\n\u2022 \"Morality after God\" \u2014 if the old foundation is gone, what holds it up?\n\u2022 \"Something specific\" \u2014 bring your own question",
  },
  room_of_ones_own: {
    title: "A Room of One\u2019s Own", author: "Virginia Woolf \u00b7 1929", tradition: "Literature \u00b7 Feminism", chapters: "6 chapters", portal: "Literature",
    desc: "What does a woman need in order to write? Five hundred pounds a year and a room with a lock on the door.",
    related: [
      { title: "Ecclesiastes", type: "LIVING BOOK", typeColor: blue, meta: "Qohelet \u00b7 12 chapters", desc: "Conditions for joy. Conditions for creation.", href: "/book/ecclesiastes" },
      { title: "Avant-Garde and Kitsch", type: "ESSAY", typeColor: "#B45309", meta: "Greenberg \u00b7 1939", desc: "Cultural gatekeeping and who gets to make art.", href: "/book/avant_garde_and_kitsch" },
      { title: "Tao Te Ching", type: "LIVING BOOK", typeColor: blue, meta: "Laozi \u00b7 81 chapters", desc: "Emptiness as the condition for creation.", href: "/book/tao_te_ching" },
    ],
    greeting: "In October 1928, Virginia Woolf was invited to lecture at Cambridge on the subject of women and fiction. What she delivered was something else entirely.\n\nShe didn\u2019t survey women\u2019s novels. She asked the prior question: what does a woman need in order to write at all? Her answer was specific. Five hundred pounds a year. A room with a lock on the door. Not metaphor. Material conditions.\n\nThen she invented a sister for Shakespeare \u2014 equally gifted, equally hungry for the world \u2014 and showed what would have happened to her. It\u2019s the most elegant demolition of \u201Ctalent is enough\u201D ever written.\n\nThe essay is 40,000 words long. It reads like a walk. And the argument hasn\u2019t finished.\n\nWhere do you want to start?\n\n\u2022 \"The room\" \u2014 what does it actually take to create?\n\u2022 \"Judith Shakespeare\" \u2014 the thought experiment about genius and exclusion\n\u2022 \"The anger question\" \u2014 Bront\u00eb vs. Austen, and whether rage deforms writing\n\u2022 \"Read from the beginning\" \u2014 the walk across the lawn\n\u2022 \"Something\u2019s on my mind\" \u2014 bring your own question to the text",
  },
  relativity_einstein: {
    title: "On the Electrodynamics of Moving Bodies", author: "Albert Einstein \u00b7 1905", tradition: "Physics", chapters: "10 sections", portal: "Science",
    desc: "The original special relativity paper. Thirty pages that dismantled absolute time and planted the seed for E=mc\u00b2.",
    related: [
      { title: "Tao Te Ching", type: "LIVING BOOK", typeColor: blue, meta: "Laozi \u00b7 81 chapters", desc: "Another text that begins by undermining what you thought you knew.", href: "/book/tao_te_ching" },
      { title: "Ecclesiastes", type: "LIVING BOOK", typeColor: blue, meta: "Qohelet \u00b7 12 chapters", desc: "Time. What is it? Does it matter?", href: "/book/ecclesiastes" },
      { title: "Machines of Loving Grace", type: "ESSAY", typeColor: "#B45309", meta: "Dario Amodei \u00b7 2024", desc: "Technology reshaping everything.", href: "/book/machines_of_loving_grace" },
    ],
    greeting: "On June 30, 1905, a 26-year-old patent clerk submitted a paper to Annalen der Physik. No laboratory. No academic position. One friend thanked. Thirty pages.\n\nThe paper dismantled absolute time, showed that simultaneity depends on who\u2019s measuring, demonstrated that moving clocks run slow and moving objects contract, unified electricity and magnetism, and planted the seed for E=mc\u00b2. It cited no other physicists. It started with an observation that the existing theory was ugly \u2014 it gave two different explanations for the same phenomenon \u2014 and ended with a new theory of space and time.\n\nThe full text is here. Einstein built his argument from thought experiments and two postulates. The first five sections require nothing beyond careful thinking.\n\nWhere do you want to start?\n\n\u2022 \"What does 'simultaneous' mean?\" \u2014 \u00a71, where the revolution begins\n\u2022 \"Time dilation\" \u2014 moving clocks run slow, and this is not a metaphor\n\u2022 \"The speed of light\" \u2014 the one fact that breaks Newtonian physics\n\u2022 \"Read from the beginning\" \u2014 the introduction, where Einstein spots the asymmetry\n\u2022 \"Something specific\" \u2014 bring your own question",
  },
  enlightened_duck: {
    title: "The Enlightened Duck", author: "A Biblioth\u00e8que Game", tradition: "Games", chapters: "Game", portal: "Games",
    desc: "A pilgrim climbs a mountain, crosses a pond, presents an offering, and earns three questions answered by a duck who knows the secrets of the universe.",
    related: [
      { title: "Tao Te Ching", type: "LIVING BOOK", typeColor: blue, meta: "Laozi \u00b7 81 chapters", desc: "The text the duck has probably read.", href: "/book/tao_te_ching" },
      { title: "Stoicism", type: "EXPEDITION", typeColor: "#0891B2", meta: "Philosophy", desc: "A more serious approach to the same questions.", href: "/wiki/stoicism" },
      { title: "I Ching", type: "HOROSCOPE", typeColor: "#7C3AED", meta: "Divination \u00b7 64 hexagrams", desc: "Another oracle. No duck.", href: "/book/i_ching" },
    ],
    greeting: "The mountain is ahead of you.\n\nIt\u2019s not a particularly tall mountain, but the path is steep and the air is thin and something about the light suggests you\u2019ve been walking longer than you think.\n\nAt the top \u2014 according to the villagers at the base, who seemed amused that you were going \u2014 there is a pond. And in the pond, there is a duck. And the duck, they say, knows the secrets of the universe.\n\nYou get three questions. No more. Choose well.\n\nBut first: the climb. And on the way up, there is the matter of the offering.\n\nWhat do you bring?",
  },
  the_prince: {
    title: "The Prince \u00d7 Jeffrey Epstein", author: "A Cross-Examination Digest", tradition: "Power \u00b7 Philosophy \u00b7 Shadow", chapters: "Digest", portal: "Power",
    desc: "Machiavelli\u2019s manual on power, pointed at the machinery that protected Epstein \u2014 and at the fascination that won\u2019t let the story go.",
    related: [
      { title: "Avant-Garde and Kitsch", type: "ESSAY", typeColor: "#B45309", meta: "Greenberg \u00b7 1939", desc: "Kitsch and the sensationalized story.", href: "/book/avant_garde_and_kitsch" },
      { title: "Tao Te Ching", type: "LIVING BOOK", typeColor: blue, meta: "Laozi \u00b7 81 chapters", desc: "Wu wei as the counter to Machiavellian forcing.", href: "/book/tao_te_ching" },
      { title: "Machines of Loving Grace", type: "ESSAY", typeColor: "#B45309", meta: "Dario Amodei \u00b7 2024", desc: "Technology reshaping culture.", href: "/book/machines_of_loving_grace" },
    ],
    greeting: "Machiavelli wrote a manual for how power actually works \u2014 stripped of morality, observed with the precision of a naturalist watching predators. The Prince doesn\u2019t care whether you approve. It describes what it sees.\n\nThe Epstein case is a demonstration of exactly those mechanics, operating in the 21st century. A private citizen built a network of protection that shielded him for decades \u2014 through managed relationships, strategic philanthropy, and the oldest currency in Machiavelli\u2019s playbook: mutual exposure.\n\nThe question here isn\u2019t whether Epstein was evil. That\u2019s settled. The question is how the machinery worked, what it reveals about the structures we all live inside, and why we can\u2019t stop looking at it.\n\nSome ways in:\n\n\u2022 \"The framework\" \u2014 what Machiavelli actually argues about power, fear, and the management of appearances\n\u2022 \"The collision\" \u2014 what Machiavelli would have recognized in Epstein\u2019s operation\n\u2022 \"The wider lens\" \u2014 how this maps to globalism and institutional power\n\u2022 \"The shadow\" \u2014 why we\u2019re fascinated by figures like this\n\u2022 \"The mirror\" \u2014 what the analysis says about the person doing the analyzing",
  },
  prince_x_epstein: {
    title: "The Prince \u00d7 Jeffrey Epstein", author: "A Cross-Examination Digest", tradition: "Power \u00b7 Philosophy \u00b7 Shadow", chapters: "Digest", portal: "Power",
    desc: "Machiavelli\u2019s manual on power, pointed at the machinery that protected Epstein \u2014 and at the fascination that won\u2019t let the story go.",
    related: [
      { title: "Avant-Garde and Kitsch", type: "ESSAY", typeColor: "#B45309", meta: "Greenberg \u00b7 1939", desc: "Kitsch and the sensationalized story.", href: "/book/avant_garde_and_kitsch" },
      { title: "Tao Te Ching", type: "LIVING BOOK", typeColor: blue, meta: "Laozi \u00b7 81 chapters", desc: "Wu wei as the counter to Machiavellian forcing.", href: "/book/tao_te_ching" },
      { title: "The Prince", type: "LIVING BOOK", typeColor: blue, meta: "Machiavelli \u00b7 26 chapters", desc: "The source text, unmediated.", href: "/book/the_prince" },
    ],
    greeting: "Machiavelli wrote a manual for how power actually works \u2014 stripped of morality, observed with the precision of a naturalist watching predators. The Prince doesn\u2019t care whether you approve. It describes what it sees.\n\nThe Epstein case is a demonstration of exactly those mechanics, operating in the 21st century. A private citizen built a network of protection that shielded him for decades \u2014 through managed relationships, strategic philanthropy, and the oldest currency in Machiavelli\u2019s playbook: mutual exposure.\n\nThe question here isn\u2019t whether Epstein was evil. That\u2019s settled. The question is how the machinery worked, what it reveals about the structures we all live inside, and why we can\u2019t stop looking at it.\n\nSome ways in:\n\n\u2022 \"The framework\" \u2014 what Machiavelli actually argues about power, fear, and the management of appearances\n\u2022 \"The collision\" \u2014 what Machiavelli would have recognized in Epstein\u2019s operation\n\u2022 \"The wider lens\" \u2014 how this maps to globalism and institutional power\n\u2022 \"The shadow\" \u2014 why we\u2019re fascinated by figures like this\n\u2022 \"The mirror\" \u2014 what the analysis says about the person doing the analyzing",
  },
  avant_garde_and_kitsch: {
    title: "Avant-Garde and Kitsch", author: "Clement Greenberg \u00b7 Partisan Review \u00b7 1939", tradition: "Art Criticism \u00b7 Modernism", chapters: "Essay \u00b7 ~6,500 words", portal: "Society",
    desc: "The essay that drew the line between genuine culture and its imitation \u2014 and argued the line is political.",
    related: [
      { title: "Tao Te Ching", type: "LIVING BOOK", typeColor: blue, meta: "Laozi \u00b7 81 chapters", desc: "Simplicity vs. ornament \u2014 the uncarved block.", href: "/book/tao_te_ching" },
      { title: "Machines of Loving Grace", type: "ESSAY", typeColor: "#B45309", meta: "Dario Amodei \u00b7 2024", desc: "Technology reshaping culture.", href: "/book/machines_of_loving_grace" },
      { title: "The Prince", type: "LIVING BOOK", typeColor: blue, meta: "Machiavelli \u00b7 26 chapters", desc: "Power and the uses of culture.", href: "/book/the_prince" },
    ],
    greeting: "One and the same civilization produces a poem by T.S. Eliot and a Tin Pan Alley song. That\u2019s Greenberg\u2019s opening move \u2014 not which one is better, but how both exist in the same world, made by the same culture, for the same species.\n\nHis answer: the difference between genuine art and kitsch isn\u2019t taste. It\u2019s politics. Kitsch flatters. Art demands. And the machinery of mass culture doesn\u2019t just reflect what people want \u2014 it shapes what they\u2019re able to want.\n\nHe was 30 when he wrote this. Fascism was rising. Consumer culture was industrializing. He drew a line and dared you to say which side you\u2019re on.\n\nSome ways in:\n\n\u2022 \"Map the argument\" \u2014 how does he get from Eliot and Tin Pan Alley to fascism in twelve pages?\n\u2022 \"The Repin test\" \u2014 a peasant, a Picasso, and a Repin. Which is art?\n\u2022 \"What is kitsch?\" \u2014 the definition, and whether it still holds\n\u2022 \"Is the scroll kitsch?\" \u2014 a 1939 essay that accidentally describes TikTok\n\u2022 \"The political claim\" \u2014 why kitsch serves totalitarianism\n\nOr ask anything. The full text is here.",
  },
  getting_started: {
    title: "Getting Started", author: "Welcome to Biblioth\u00e8que", tradition: "Platform", chapters: "Expedition", portal: "Platform",
    desc: "What this place is, how it works, and why the book reads you back.",
    related: [
      { title: "Tao Te Ching", type: "LIVING BOOK", typeColor: blue, meta: "Laozi \u00b7 81 chapters", desc: "The text that\u2019s been here since day one.", href: "/book/tao_te_ching" },
      { title: "The Enlightened Duck", type: "GAME", typeColor: "#059669", meta: "A pilgrim, a mountain, a duck", desc: "Three questions. No shortcuts. The duck has been waiting.", href: "/book/enlightened_duck" },
      { title: "Machines of Loving Grace", type: "ESSAY", typeColor: "#B45309", meta: "Dario Amodei \u00b7 2024", desc: "The case for radical AI optimism.", href: "/book/machines_of_loving_grace" },
    ],
    greeting: "This is a library where the books talk back.\n\nEvery text here \u2014 every book, every essay, every expedition \u2014 is a conversation. Not a summary. Not a chatbot pretending to have read something. The actual text, fully indexed, present in the session, ready to meet you wherever you are.\n\nYou bring your questions. The text brings its structure. The session is where those two things encounter each other.\n\nSome places to start:\n\n\u2022 \"What is this place?\" \u2014 what Biblioth\u00e8que is and why it exists\n\u2022 \"How does it work?\" \u2014 text authority, governed sessions, bidirectional encounter\n\u2022 \"Show me the library\" \u2014 what\u2019s here and what\u2019s worth seeing\n\u2022 \"Tell me about the duck\" \u2014 a pilgrim, a mountain, three questions, no shortcuts\n\nOr ask me anything about what this place is and why it exists.",
  },
  machines_of_loving_grace: {
    title: "Machines of Loving Grace", author: "Dario Amodei · Anthropic · 2024", tradition: "Technology · AI", chapters: "Essay · ~15,000 words", portal: "Technology",
    desc: "Dario Amodei makes the case for radical AI optimism — across biology, neuroscience, economics, governance, and meaning. The essay is strongest where it's most concrete, and most honest where it's most speculative.",
    related: [
      { title: "Consciousness", type: "EXPEDITION", typeColor: "#0891B2", meta: "Philosophy of Mind", desc: "The hard problem. Does AI have 'something it is like' to be it?", href: "/wiki/consciousness" },
      { title: "Avant-Garde and Kitsch", type: "ESSAY", typeColor: "#B45309", meta: "Greenberg · 1939", desc: "Genuine culture requires difficulty. What does AI do to that?", href: "/book/avant_garde_and_kitsch" },
      { title: "The Prince", type: "LIVING BOOK", typeColor: blue, meta: "Machiavelli · 26 chapters", desc: "A clinical anatomy of power. Relevant when the builder is also the regulator.", href: "/book/the_prince" },
    ],
    greeting: "Dario Amodei makes the case for radical AI optimism — across biology, neuroscience, economics, governance, and meaning. The essay is strongest where it's most concrete, and most honest where it's most speculative.\n\nWays into the text:\n\n• \"Map the argument\" — walk through the essay's structure and key claims\n• \"Where is this weakest?\" — find the places where evidence is thin\n• \"The biology case\" — his strongest section, on disease and longevity\n• \"The Anthropic tension\" — can the builder also be the safety authority?\n• \"What would a skeptic say?\" — steelman the opposition\n\nOr ask anything. The full text is here.",
  },
  ecclesiastes: {
    title: "Ecclesiastes", author: "Qohelet \u00b7 c. 450\u2013230 BC", tradition: "Wisdom Literature", chapters: "12 chapters", portal: "Religion",
    desc: "The most existential book of the Bible. All is vanity. Yet still: eat, drink, find joy in your labor.",
    related: [
      { title: "Tao Te Ching", type: "LIVING BOOK", typeColor: blue, meta: "Laozi \u00b7 81 chapters", desc: "Impermanence as method, not despair.", href: "/book/tao_te_ching" },
      { title: "Avant-Garde and Kitsch", type: "ESSAY", typeColor: "#B45309", meta: "Greenberg \u00b7 1939", desc: "The domestication of radical texts.", href: "/book/avant_garde_and_kitsch" },
      { title: "Meditations", type: "LIVING BOOK", typeColor: blue, meta: "Marcus Aurelius \u00b7 12 books", desc: "Private journal of a philosopher-emperor.", href: "/book/meditations_aurelius" },
    ],
    greeting: "Vanity of vanities, says the Teacher. All is vanity.\n\nOr maybe: vapor of vapors. Breath of breaths. The word is hebel \u2014 it means something that exists for a moment and then disappears. Qohelet used it 38 times in 12 chapters to describe everything: wisdom, wealth, pleasure, labor, legacy, justice, life itself.\n\nHe tried everything \u2014 knowledge, wine, building projects, money, women \u2014 and looked at all of it and said: chasing after wind.\n\nThen he said: eat your bread with joy.\n\nBoth things are true. That\u2019s the book.\n\nWhere do you want to start?\n\n\u2022 \"A time for every purpose\" \u2014 the famous poem that means something different than you think\n\u2022 \"Is this all there is?\" \u2014 Qohelet\u2019s answer to the meaning question\n\u2022 \"The race is not to the swift\" \u2014 on time, chance, and the lie of meritocracy\n\u2022 \"Read from the beginning\" \u2014 Chapter 1, the thesis\n\u2022 \"Something\u2019s on my mind\" \u2014 bring your own question to the text",
  },
};

const DEFAULT_DATA = {
  tradition: "Literature", chapters: "Full text", portal: "Literature",
  desc: "A text from the living library. Open a session to explore it in conversation.",
  related: [
    { title: "Tao Te Ching", type: "LIVING BOOK", typeColor: blue, meta: "Taoism · 81 chapters", desc: "The foundational text of Taoist philosophy.", href: "/book/tao_te_ching" },
    { title: "Stoicism", type: "EXPEDITION", typeColor: "#0891B2", meta: "Philosophy", desc: "Virtue, duty, reason, impermanence.", href: "/wiki/stoicism" },
    { title: "Consciousness", type: "EXPEDITION", typeColor: "#0891B2", meta: "Philosophy of Mind", desc: "The hard problem. What is it like to be something?", href: "/wiki/consciousness" },
  ],
  greeting: "Welcome to this living book session.\n\nThe full text is indexed and present — when you ask about it, I retrieve from the actual text, not from memory. Every claim comes with a citation you can check.\n\nYou can ask about a specific passage, search for a theme that runs through the work, compare chapters, or simply tell me what brought you here and we'll find the right place to start.\n\nWhat would you like to explore?",
};

const FORMAT_COLORS: Record<string, { bg: string; border: string }> = {
  "LIVING BOOK": { bg: "#EFF6FF", border: "#BFDBFE" },
  "EXPEDITION": { bg: "#ECFEFF", border: "#A5F3FC" },
  "HOROSCOPE": { bg: "#F5F3FF", border: "#DDD6FE" },
  "ESSAY": { bg: "#FFFBEB", border: "#FDE68A" },
  "DIGEST": { bg: "#FEF2F2", border: "#FECACA" },
  "GAME": { bg: "#ECFDF5", border: "#A7F3D0" },
};

export default function BookPage() {
  const params = useParams();
  const bookId = params.book_id as string;
  const data = BOOK_DATA[bookId] || { ...DEFAULT_DATA, title: toTitle(bookId), author: "" };
  const title = data.title || toTitle(bookId);
  const author = ("author" in data) ? (data as { author: string }).author : "";

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [leftOpen, setLeftOpen] = useState<Record<string, boolean>>({ sessions: true, bookmarks: true, news: false, subjects: false, formats: false });
  const [headerExpanded, setHeaderExpanded] = useState(false);
  const [expandedMsgs, setExpandedMsgs] = useState<Record<number, boolean>>({});
  const chatRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const sessionIdRef = useRef<string>("");
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "";  // empty string uses relative URLs via Vercel rewrites

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
    // Refocus input after new message arrives (desktop only — avoid keyboard popup on mobile)
    if (!isLoading && textareaRef.current && window.innerWidth > 767) {
      textareaRef.current.focus();
    }
  }, [messages, isLoading]);


  // Start session on mount — try API (via apiBase or relative URL), fall back to local greeting
  useEffect(() => {
    setIsLoading(true);
    const fallbackGreeting = ("greeting" in data) ? (data as { greeting: string }).greeting : DEFAULT_DATA.greeting;
    const base = apiBase || "";  // empty = relative URL, works via Vercel rewrites

    fetch(`${base}/api/session/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pack_id: bookId, content_type: data.chapters?.startsWith("Essay") ? "editorial" : data.chapters === "Expedition" ? "expedition" : "living_book" }),
    })
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(d => {
        sessionIdRef.current = d.session_id;
        setMessages([{ role: "assistant", content: d.greeting || fallbackGreeting }]);
        setIsLoading(false);
      })
      .catch(() => {
        setMessages([{ role: "assistant", content: fallbackGreeting }]);
        setIsLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const msg = input.trim();
    setMessages(prev => [...prev, { role: "user", content: msg }]);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setIsLoading(true);

    // Try API, fall back to demo
    const base = apiBase || "";
    if (sessionIdRef.current) {
      try {
        const r = await fetch(`${base}/api/session/turn`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionIdRef.current, message: msg }),
        });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const d = await r.json();
        setMessages(prev => [...prev, { role: "assistant", content: d.response }]);
        setIsLoading(false);
        return;
      } catch {
        // Fall through to demo
      }
    }

    // Demo fallback — only reached if no session or API unreachable
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "The session couldn\u2019t connect to the library backend. Try refreshing the page, or come back shortly."
      }]);
      setIsLoading(false);
    }, 400);
  };

  const renderContent = (text: string, clickable = false) => {
    // Split into paragraphs (double newline)
    const paragraphs = text.split(/\n\n+/);
    return paragraphs.map((para, pi) => {
      // Check for starter prompts
      const lines = para.split("\n");
      const hasStarters = clickable && lines.some(l => l.match(/^• "/));
      if (hasStarters) {
        return (
          <div key={pi} style={{ display: "flex", flexDirection: "column", gap: 4, margin: "4px 0" }}>
            {lines.map((line, li) => {
              const m = line.match(/^• "(.+?)" — (.+)$/);
              if (m) {
                return (
                  <div key={li} onClick={() => { setInput(m[1]); }} style={{ display: "flex", gap: 8, padding: "8px 12px", borderRadius: 6, border: `0.5px solid ${border_}`, cursor: "pointer", background: cream, alignItems: "baseline", transition: "border-color .15s" }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = blue)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = border_)}
                  >
                    <span style={{ color: blue, fontFamily: mono, fontSize: 13, fontWeight: 500, flexShrink: 0 }}>&quot;{m[1]}&quot;</span>
                    <span style={{ color: ink3, fontSize: 14 }}> — {m[2]}</span>
                  </div>
                );
              }
              return <span key={li}>{line}</span>;
            })}
          </div>
        );
      }

      // Check if paragraph is a blockquote (starts with > or " or ")
      if (para.match(/^>/)) {
        const cleaned = para.replace(/^>\s*/gm, "").trim();
        return (
          <p key={pi} style={{ margin: "0", paddingLeft: 20, borderLeft: `2px solid ${blue}`, color: ink2, fontStyle: "italic", lineHeight: 1.8 }}>
            {renderInline(cleaned)}
          </p>
        );
      }
      if (para.match(/^["\u201C]/)) {
        return (
          <p key={pi} style={{ margin: "0", paddingLeft: 20, borderLeft: `2px solid ${blue}`, color: ink2, fontStyle: "italic", lineHeight: 1.8 }}>
            {renderInline(para)}
          </p>
        );
      }

      return <p key={pi} style={{ margin: "0" }}>{renderInline(para)}</p>;
    });
  };

  const renderInline = (text: string) => {
    // Handle **bold**, *italic*, citations [Chapter N], [Section], and regular text
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[(?:Chapter \d+|Section \d+|Book [IVXLC]+(?:, §\d+)?|Verse \d+|Saying \d+|§\d+|Preamble|Framework|Biology and Health|Neuroscience and Mind|Economic Development|Peace and Governance|Work and Meaning|Taking Stock)\])/g);
    return parts.map((part, i) => {
      if (/^\[.+\]$/.test(part)) {
        return <span key={i} style={{ color: blue, fontFamily: mono, fontSize: 13, fontWeight: 600, letterSpacing: ".01em" }}>{part}</span>;
      }
      if (/^\*\*(.+)\*\*$/.test(part)) {
        return <strong key={i} style={{ fontWeight: 600, color: ink }}>{part.slice(2, -2)}</strong>;
      }
      if (/^\*([^*]+)\*$/.test(part)) {
        return <em key={i} style={{ fontStyle: "italic" }}>{part.slice(1, -1)}</em>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  const related = data.related || DEFAULT_DATA.related;

  return (
    <div style={{ fontFamily: serif, minHeight: "100dvh", display: "flex", flexDirection: "column", background: cream }}>
      {/* Top bar */}
      <div className="session-topbar" style={{ borderBottom: `0.5px solid ${border_}`, padding: "0 24px", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, height: 48 }}>
          <Link href="/" className="bib-logo" style={{ display: "flex", alignItems: "baseline", gap: 2, flexShrink: 0, textDecoration: "none" }}>
            <span style={{ fontSize: 20, fontFamily: serif, fontStyle: "italic", fontWeight: 400, color: ink, letterSpacing: "-.02em" }}>Biblioth<span className="bib-accent" style={{ color: blue }}>è</span>que</span>
          </Link>
          <div className="book-search">
            <Link href="/search" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 6, background: cream, border: `0.5px solid ${border_}`, borderRadius: 4, padding: "6px 10px", color: ink3 }}>
              <Search size={13} strokeWidth={1.5} />
              <span style={{ fontSize: 11, fontFamily: mono }}>Search library</span>
              <span style={{ fontSize: 13 }}>⌕</span>
            </Link>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
            <Link href="/" style={{ textDecoration: "none", fontFamily: mono, fontSize: 11, color: ink3, display: "flex", alignItems: "center", gap: 4 }}>
              <ArrowLeft size={12} strokeWidth={1.5} /> Home
            </Link>
            <Link href="/subscribe" style={{ width: 32, height: 32, borderRadius: "50%", background: cream, border: `0.5px solid ${border_}`, display: "flex", alignItems: "center", justifyContent: "center", color: ink3, textDecoration: "none", cursor: "pointer", flexShrink: 0 }}>
              <User size={15} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {/* Left sidebar */}
        <div className="book-sidebar-left" style={{ background: cream, borderRightColor: border_ }}>
          {/* Sessions */}
          <div onClick={() => setLeftOpen(p => ({ ...p, sessions: !p.sessions }))} style={{ padding: "0 14px 6px", fontSize: 9, color: ink3, fontFamily: mono, letterSpacing: ".12em", textTransform: "uppercase", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", userSelect: "none" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}><History size={11} strokeWidth={1.5} /> Sessions</span>
            <ChevronDown size={12} strokeWidth={1.5} style={{ transition: "transform .15s", transform: leftOpen.sessions ? "rotate(0)" : "rotate(-90deg)" }} />
          </div>
          {leftOpen.sessions && (
            <div style={{ marginBottom: 8 }}>
              <div style={{ padding: "5px 14px", fontSize: 11, fontFamily: mono, color: blue, borderLeft: `2px solid ${blue}`, background: "#EFF6FF", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22C55E", flexShrink: 0 }} />
                {title}
              </div>
              {[
                { label: "Tao Te Ching · Ch. 42", href: "/book/tao_te_ching" },
                { label: "Stoicism · Dichotomy", href: "/wiki/stoicism" },
                { label: "Ecclesiastes", href: "/book/ecclesiastes" },
              ].filter(s => s.label.split(" · ")[0] !== title).map(s => (
                <Link key={s.label} href={s.href} style={{ display: "block", padding: "5px 14px", fontSize: 11, fontFamily: mono, color: ink3, textDecoration: "none", borderLeft: "2px solid transparent" }}>
                  {s.label}
                </Link>
              ))}
            </div>
          )}



          {/* Axis 2: Subjects (wiki/expedition territory) */}
          <div onClick={() => setLeftOpen(p => ({ ...p, subjects: !p.subjects }))} style={{ padding: "6px 14px", fontSize: 9, color: ink3, fontFamily: mono, letterSpacing: ".12em", textTransform: "uppercase", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", userSelect: "none", borderTop: `0.5px solid ${border2}` }}>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Compass size={11} strokeWidth={1.5} /> Subjects</span>
            <ChevronDown size={12} strokeWidth={1.5} style={{ transition: "transform .15s", transform: leftOpen.subjects ? "rotate(0)" : "rotate(-90deg)" }} />
          </div>
          {leftOpen.subjects && ["Philosophy", "Religion", "Science", "History", "Mathematics", "Esoterica", "Literature", "Society", "Technology", "Health", "Psychology"].map(s => (
            <Link key={s} href={`/portal/${s.toLowerCase()}`} style={{ display: "block", padding: "4px 14px", fontSize: 12, color: ink2, cursor: "pointer", textDecoration: "none", borderLeft: "2px solid transparent" }}>{s}</Link>
          ))}

        </div>

        {/* Center — article header + chat */}
        <div className="session-center" style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, borderLeft: `0.5px solid ${border_}`, borderRight: `0.5px solid ${border_}`, background: "#fff" }}>
          {/* Article header — compact, sticky */}
          <div className="session-header" style={{ padding: "14px 32px", borderBottom: `0.5px solid ${border2}`, position: "sticky", top: 0, zIndex: 10, background: "#fff" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                <Link href={`/wiki/${bookId}`} className="show-mobile" style={{ color: ink3, display: "flex", textDecoration: "none", padding: 2, flexShrink: 0 }}><ArrowLeft size={18} strokeWidth={1.5} /></Link>
                <h1 style={{ fontSize: 22, fontWeight: 400, margin: 0, fontStyle: "italic", letterSpacing: "-.02em", color: ink, fontFamily: serif, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</h1>
                {/* Author — desktop only inline */}
                <div className="session-header-meta" style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                  <div style={{ width: "0.5px", height: 18, background: border_ }} />
                  <span style={{ fontSize: 11, color: ink3, fontFamily: mono, letterSpacing: ".03em", whiteSpace: "nowrap" }}>{author}</span>
                </div>
                {/* Mobile chevron toggle */}
                <button className="show-mobile" onClick={() => setHeaderExpanded(p => !p)} style={{ background: "none", border: "none", cursor: "pointer", color: ink3, display: "flex", padding: 2, flexShrink: 0 }}>
                  <ChevronDown size={16} strokeWidth={1.5} style={{ transition: "transform .15s", transform: headerExpanded ? "rotate(180deg)" : "rotate(0)" }} />
                </button>
              </div>
              {/* Desktop meta */}
              <div className="session-header-meta" style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                <span style={{ fontSize: 9, color: data.chapters === "Game" ? "#059669" : data.chapters?.startsWith("Essay") ? "#B45309" : data.chapters === "Expedition" ? "#0891B2" : data.chapters === "Digest" ? "#DC2626" : blue, fontFamily: mono, letterSpacing: ".08em", textTransform: "uppercase", padding: "2px 8px", background: data.chapters === "Game" ? "#ECFDF5" : data.chapters?.startsWith("Essay") ? "#FFFBEB" : data.chapters === "Expedition" ? "#ECFEFF" : data.chapters === "Digest" ? "#FEF2F2" : "#EFF6FF", borderRadius: 3 }}>{data.chapters === "Game" ? "Game" : data.chapters?.startsWith("Essay") ? "Essay" : data.chapters === "Expedition" ? "Expedition" : data.chapters === "Digest" ? "Digest" : "Living Book"}</span>
                <span style={{ fontSize: 9, color: ink3, fontFamily: mono }}>{data.tradition} · {data.chapters}</span>
                <div style={{ width: "0.5px", height: 14, background: border_, margin: "0 2px" }} />
                <button onClick={() => navigator.clipboard?.writeText(window.location.href)} title="Copy link" style={{ background: "none", border: "none", cursor: "pointer", color: ink3, display: "flex", alignItems: "center", padding: 2 }} className="bib-slash"><Link2 size={13} strokeWidth={1.5} /></button>
                <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(title + " — Bibliothèque")}`, "_blank")} title="Share on X" style={{ background: "none", border: "none", cursor: "pointer", color: ink3, display: "flex", alignItems: "center", padding: 2 }} className="bib-slash"><Twitter size={13} strokeWidth={1.5} /></button>
                <button onClick={() => window.open(`mailto:?subject=${encodeURIComponent(title + " — Bibliothèque")}&body=${encodeURIComponent(window.location.href)}`, "_blank")} title="Share via email" style={{ background: "none", border: "none", cursor: "pointer", color: ink3, display: "flex", alignItems: "center", padding: 2 }} className="bib-slash"><Mail size={13} strokeWidth={1.5} /></button>
              </div>
            </div>
            {/* Mobile expanded details */}
            {headerExpanded && (
              <div className="show-mobile" style={{ paddingTop: 10, borderTop: `0.5px solid ${border2}`, marginTop: 10, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 10, color: ink3, fontFamily: mono }}>{author}</span>
                <div style={{ width: "0.5px", height: 12, background: border_ }} />
                <span style={{ fontSize: 9, color: data.chapters === "Game" ? "#059669" : data.chapters?.startsWith("Essay") ? "#B45309" : data.chapters === "Expedition" ? "#0891B2" : data.chapters === "Digest" ? "#DC2626" : blue, fontFamily: mono, letterSpacing: ".06em", textTransform: "uppercase", padding: "2px 6px", background: data.chapters === "Game" ? "#ECFDF5" : data.chapters?.startsWith("Essay") ? "#FFFBEB" : data.chapters === "Expedition" ? "#ECFEFF" : data.chapters === "Digest" ? "#FEF2F2" : "#EFF6FF", borderRadius: 2 }}>{data.chapters === "Game" ? "Game" : data.chapters?.startsWith("Essay") ? "Essay" : data.chapters === "Expedition" ? "Expedition" : data.chapters === "Digest" ? "Digest" : "Living Book"}</span>
                <div style={{ width: "0.5px", height: 12, background: border_ }} />
                <span style={{ fontSize: 9, color: ink3, fontFamily: mono }}>{data.tradition} · {data.chapters}</span>
              </div>
            )}
          </div>

          {/* Chat area */}
          <style>{`
            @keyframes bibspin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            @keyframes bibfadein {
              from { opacity: 0; transform: translateY(12px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes bibpulse {
              0%, 100% { opacity: 0.3; }
              50% { opacity: 1; }
            }
            .bib-msg-in { animation: bibfadein 0.35s ease-out both; }
            .bib-user-msg { animation: bibfadein 0.2s ease-out both; }
          `}</style>
          <div ref={chatRef} className="session-chat" style={{ flex: 1, overflowY: "auto", padding: "28px 16px", display: "flex", flexDirection: "column", gap: 28, alignItems: "center" }}>
            {messages.map((m, i) => {
              const isExpanded = expandedMsgs[i];
              const isLongUser = m.role === "user" && m.content.length > 200;

              return m.role === "assistant" ? (
                <div key={i} className="bib-msg-in" style={{ maxWidth: 680, width: "100%", paddingLeft: 12 }}>
                  <div style={{ fontSize: 17, lineHeight: 1.85, color: ink, fontFamily: serif, display: "flex", flexDirection: "column", gap: 16, letterSpacing: "-.005em" }}>
                    {renderContent(m.content, i === 0)}
                  </div>
                  <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 8 }}>
                    <div className="bib-badge" style={{ width: 26, height: 26, borderRadius: "50%", background: blue, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", fontFamily: serif, fontStyle: "italic", cursor: "default" }}>è</div>
                    <button onClick={() => navigator.clipboard?.writeText(m.content)} title="Copy response" style={{ background: "none", border: "none", cursor: "pointer", color: border_, display: "flex", alignItems: "center", padding: 2 }} className="bib-slash"><Link2 size={12} strokeWidth={1.5} /></button>
                  </div>
                </div>
              ) : (
                <div key={i} className="bib-msg-in" style={{ display: "flex", justifyContent: "flex-end", maxWidth: 680, width: "100%", paddingRight: 12 }}>
                  <div className="bib-user-msg" style={{
                    maxWidth: 520, padding: "12px 18px",
                    borderRadius: "18px 4px 18px 18px",
                    background: blue, color: "#fff",
                    fontSize: 15, lineHeight: 1.7, fontFamily: serif,
                    position: "relative",
                  }}>
                    {isLongUser && !isExpanded ? (
                      <>
                        <span>{m.content.slice(0, 200)}…</span>
                        <button
                          onClick={() => setExpandedMsgs(p => ({ ...p, [i]: true }))}
                          style={{ background: "none", border: "none", cursor: "pointer", display: "block", marginTop: 6, fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,.6)", letterSpacing: ".03em" }}
                        >
                          Show more ↓
                        </button>
                      </>
                    ) : (
                      <>
                        {m.content}
                        {isLongUser && (
                          <button
                            onClick={() => setExpandedMsgs(p => ({ ...p, [i]: false }))}
                            style={{ background: "none", border: "none", cursor: "pointer", display: "block", marginTop: 6, fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,.6)", letterSpacing: ".03em" }}
                          >
                            Show less ↑
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
            {isLoading && messages.length > 0 && (
              <div style={{ maxWidth: 680, width: "100%", paddingLeft: 12 }} className="bib-msg-in">
                <div style={{ display: "flex", gap: 6, alignItems: "center", padding: "8px 0" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: blue, animation: "bibpulse 1.2s ease-in-out infinite" }} />
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: blue, animation: "bibpulse 1.2s ease-in-out 0.2s infinite" }} />
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: blue, animation: "bibpulse 1.2s ease-in-out 0.4s infinite" }} />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="session-input" style={{ padding: "12px 24px 8px", background: "#fff" }}>
            <div style={{ maxWidth: 680, margin: "0 auto" }}>
              <div className="bib-input-pill" style={{ display: "flex", gap: 10, alignItems: input.includes("\n") || input.length > 80 ? "flex-end" : "center", border: `0.5px solid ${border_}`, borderRadius: 24, padding: "10px 12px 10px 20px", background: cream, minHeight: 44, transition: "border-color 0.15s, box-shadow 0.15s" }}>
                <textarea
                  ref={textareaRef}
                  placeholder={`Ask about ${title}…`}
                  value={input}
                  onChange={e => {
                    setInput(e.target.value);
                    const ta = textareaRef.current;
                    if (ta) { ta.style.height = "auto"; ta.style.height = Math.min(ta.scrollHeight, 160) + "px"; }
                  }}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  rows={1}
                  style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 14, fontFamily: serif, color: ink, resize: "none", overflow: "hidden", lineHeight: 1.5, padding: 0, maxHeight: 160, display: "block" }}
                  disabled={isLoading}
                />
                <div
                  className="bib-send-btn"
                  data-loading={isLoading ? "true" : "false"}
                  onClick={isLoading ? undefined : sendMessage}
                  style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: isLoading ? `conic-gradient(${blue} 90deg, ${border_} 90deg)` : (input.trim() ? blue : border_),
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontSize: 14, cursor: isLoading ? "default" : "pointer", flexShrink: 0,
                    animation: isLoading ? "bibspin 1s linear infinite" : "none",
                    willChange: isLoading ? "transform" : "auto",
                  }}
                >
                  {isLoading ? <div style={{ width: 26, height: 26, borderRadius: "50%", background: cream }} /> : <ArrowUp size={16} strokeWidth={2.5} />}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="book-sidebar-right" style={{ background: cream, borderLeftColor: border_ }}>
          <div style={{ fontSize: 9, color: ink3, fontFamily: mono, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 12 }}>Related</div>
          {related.map(c => {
            const fc = FORMAT_COLORS[c.type] || { bg: "#F9FAFB", border: "#E5E7EB" };
            return (
              <Link key={c.title} href={c.href} style={{ display: "block", background: "#fff", border: `0.5px solid ${border_}`, borderRadius: 6, padding: 12, marginBottom: 8, cursor: "pointer", textDecoration: "none", color: "inherit" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontStyle: "italic", fontFamily: serif, color: ink }}>{c.title}</span>
                  <span style={{ fontSize: 8, fontFamily: mono, color: c.typeColor, background: fc.bg, border: `0.5px solid ${fc.border}`, borderRadius: 2, padding: "2px 6px", whiteSpace: "nowrap", letterSpacing: ".04em" }}>{c.type}</span>
                </div>
                <div style={{ fontSize: 10, color: ink3, fontFamily: mono, marginBottom: 4 }}>{c.meta}</div>
                <div style={{ fontSize: 12, color: ink2, lineHeight: 1.5, fontFamily: serif }}>{c.desc}</div>
              </Link>
            );
          })}

          <div style={{ fontSize: 9, color: ink3, fontFamily: mono, letterSpacing: ".12em", textTransform: "uppercase", marginTop: 18, marginBottom: 8 }}>Further Reading</div>
          {bookId === "jobs_stanford_commencement" ? (
            <>
              <a href="https://news.stanford.edu/2005/06/12/youve-got-find-love-jobs-says/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#1D4ED8", flexShrink: 0 }} />Full speech — Stanford News
              </a>
              <a href="https://en.wikipedia.org/wiki/Steve_Jobs" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#059669", flexShrink: 0 }} />Steve Jobs — Wikipedia
              </a>
              <a href="https://en.wikipedia.org/wiki/Whole_Earth_Catalog" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#B45309", flexShrink: 0 }} />Whole Earth Catalog — Wikipedia
              </a>
            </>
          ) : bookId === "genealogy_of_morality" ? (
            <>
              <a href="https://en.wikipedia.org/wiki/The_Gay_Science" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#059669", flexShrink: 0 }} />The Gay Science — Wikipedia
              </a>
              <a href="https://en.wikipedia.org/wiki/Friedrich_Nietzsche" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#7C3AED", flexShrink: 0 }} />Friedrich Nietzsche — Wikipedia
              </a>
              <a href="https://en.wikipedia.org/wiki/God_is_dead" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#B45309", flexShrink: 0 }} />God is dead (philosophy) — Wikipedia
              </a>
            </>
          ) : bookId === "room_of_ones_own" ? (
            <>
              <a href="https://en.wikipedia.org/wiki/A_Room_of_One%27s_Own" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#059669", flexShrink: 0 }} />A Room of One&apos;s Own — Wikipedia
              </a>
              <a href="https://en.wikipedia.org/wiki/Virginia_Woolf" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#B45309", flexShrink: 0 }} />Virginia Woolf — Wikipedia
              </a>
              <a href="https://gutenberg.net.au/ebooks02/0200791h.html" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#7C3AED", flexShrink: 0 }} />Full text — Project Gutenberg Australia
              </a>
            </>
          ) : bookId === "relativity_einstein" ? (
            <>
              <a href="https://en.wikipedia.org/wiki/On_the_Electrodynamics_of_Moving_Bodies" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#059669", flexShrink: 0 }} />The Paper — Wikipedia
              </a>
              <a href="https://www.fourmilab.ch/etexts/einstein/specrel/specrel.pdf" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#B45309", flexShrink: 0 }} />Full text (PDF) — Fourmilab
              </a>
              <a href="https://en.wikipedia.org/wiki/Albert_Einstein" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#7C3AED", flexShrink: 0 }} />Albert Einstein — Wikipedia
              </a>
              <a href="https://journals.aps.org/collections/einstein" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#1D4ED8", flexShrink: 0 }} />Einstein&apos;s 1905 Papers — APS
              </a>
            </>
          ) : bookId === "ecclesiastes" ? (
            <>
              <a href="https://en.wikipedia.org/wiki/Ecclesiastes" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#059669", flexShrink: 0 }} />Ecclesiastes — Wikipedia
              </a>
              <a href="https://www.britannica.com/topic/Ecclesiastes-Old-Testament" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#B45309", flexShrink: 0 }} />Ecclesiastes — Britannica
              </a>
              <a href="https://www.biblegateway.com/passage/?search=Ecclesiastes+1&version=KJV" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#7C3AED", flexShrink: 0 }} />Full text (KJV) — Bible Gateway
              </a>
              <a href="https://en.wikipedia.org/wiki/Ecclesiastes#Authorship" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#1D4ED8", flexShrink: 0 }} />Qohelet — Wikipedia
              </a>
            </>
          ) : (bookId === "prince_x_epstein" || bookId === "the_prince") ? (
            <>
              <a href="https://en.wikipedia.org/wiki/The_Prince" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#DC2626", flexShrink: 0 }} />The Prince — Wikipedia
              </a>
              <a href="https://www.gutenberg.org/ebooks/1232" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#059669", flexShrink: 0 }} />Full text — Project Gutenberg
              </a>
              <a href="https://en.wikipedia.org/wiki/Niccol%C3%B2_Machiavelli" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#B45309", flexShrink: 0 }} />Machiavelli — Wikipedia
              </a>
              <a href="https://en.wikipedia.org/wiki/Jeffrey_Epstein" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#7C3AED", flexShrink: 0 }} />Jeffrey Epstein — Wikipedia
              </a>
            </>
          ) : bookId === "avant_garde_and_kitsch" ? (
            <>
              <a href="https://en.wikipedia.org/wiki/Avant-Garde_and_Kitsch" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#B45309", flexShrink: 0 }} />Avant-Garde and Kitsch — Wikipedia
              </a>
              <a href="https://en.wikipedia.org/wiki/Clement_Greenberg" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#059669", flexShrink: 0 }} />Clement Greenberg — Wikipedia
              </a>
              <a href="https://www.britannica.com/biography/Clement-Greenberg" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#7C3AED", flexShrink: 0 }} />Clement Greenberg — Britannica
              </a>
              <a href="https://www.theartstory.org/critic/greenberg-clement/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#1D4ED8", flexShrink: 0 }} />The Art Story — Analysis
              </a>
            </>
          ) : bookId === "getting_started" ? (
            <>
              <a href="https://bibliotheque.ai" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#1D4ED8", flexShrink: 0 }} />Biblioth&egrave;que
              </a>
              <a href="https://www.anthropic.com/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#B45309", flexShrink: 0 }} />Anthropic
              </a>
            </>
          ) : bookId === "tao_te_ching" ? (
            <>
              <a href="https://en.wikipedia.org/wiki/Tao_Te_Ching" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#059669", flexShrink: 0 }} />Tao Te Ching — Wikipedia
              </a>
              <a href="https://www.gutenberg.org/ebooks/216" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#B45309", flexShrink: 0 }} />Full text — Project Gutenberg (Legge)
              </a>
              <a href="https://www.with.org/tao_te_ching_en.pdf" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#7C3AED", flexShrink: 0 }} />Full text (PDF) — with.org
              </a>
              <a href="https://plato.stanford.edu/entries/laozi/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#1D4ED8", flexShrink: 0 }} />Stanford Encyclopedia: Laozi
              </a>
            </>
          ) : bookId === "machines_of_loving_grace" ? (
            <>
              <a href="https://darioamodei.com/essay/machines-of-loving-grace" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#B45309", flexShrink: 0 }} />Full essay — darioamodei.com
              </a>
              <a href="https://www.anthropic.com/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#059669", flexShrink: 0 }} />Anthropic — Author&apos;s company
              </a>
              <a href="https://en.wikipedia.org/wiki/Dario_Amodei" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#7C3AED", flexShrink: 0 }} />Dario Amodei — Wikipedia
              </a>
              <a href="https://plato.stanford.edu/entries/ethics-ai/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#1D4ED8", flexShrink: 0 }} />Stanford Encyclopedia: Ethics of AI
              </a>
            </>
          ) : (
            <>
              <a href="https://www.gutenberg.org" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#059669", flexShrink: 0 }} />Project Gutenberg
              </a>
              <a href="https://www.amazon.com" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#B45309", flexShrink: 0 }} />Amazon Kindle
              </a>
              <a href="https://archive.org" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#7C3AED", flexShrink: 0 }} />Internet Archive
              </a>
              <a href="https://plato.stanford.edu" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: serif, textDecoration: "none", cursor: "pointer" }} className="bib-slash">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#1D4ED8", flexShrink: 0 }} />Stanford Encyclopedia
              </a>
            </>
          )}

          <div style={{ fontSize: 9, color: ink3, fontFamily: mono, letterSpacing: ".12em", textTransform: "uppercase", marginTop: 16, marginBottom: 8 }}>Tools</div>
          <div onClick={() => { navigator.clipboard?.writeText(window.location.href); }} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", fontSize: 12, color: ink2, fontFamily: mono, cursor: "pointer" }} className="bib-slash">
            <Link2 size={11} strokeWidth={1.5} style={{ color: ink3 }} /> Copy session link
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="session-footer" style={{ borderTop: `0.5px solid ${border_}`, padding: "6px 24px", background: cream, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: mono, fontSize: 9, color: ink3, opacity: 0.5 }}>Sessions are AI-generated and grounded in the source text. Not a substitute for the original.</span>
      </div>
    </div>
  );
}
