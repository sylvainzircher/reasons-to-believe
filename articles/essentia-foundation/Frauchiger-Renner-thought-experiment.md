---
title: The Frauchiger-Renner Thought Experiment
source: Essentia Foundation
tags: quantum physics, consciousness, philosophy
date: Jun 7, 2026
---

# The Frauchiger-Renner Thought Experiment & Quantum Observers

### A Summary of the Conversation Between Hans Busstra and Dr. Lydia del Rio

---

## Overview

This is a transcript of a conversation between host **Hans Busstra** and physicist **Dr. Lydia del Rio** — senior scientist at the University of Zurich and research fellow at the Essentia Foundation — covering quantum measurement theory, the Frauchiger-Renner thought experiment, and its philosophical implications.

---

## Part 1: The Observer Problem in Quantum Mechanics

### The Heisenberg Cut

Quantum mechanics forces us to confront the **subject-object divide** — the boundary between the observer and what's observed. This boundary is called the **Heisenberg cut**: where you draw the line between what you treat as quantum and what you treat as classical.

The key insight is that this cut is somewhat **arbitrary and subjective**. You can place it at different points and get different (sometimes incompatible) results. This flexibility is fine in most situations, but starts causing serious problems in certain multi-observer setups.

### The Wigner's Friend Paradox

Building on Schrödinger's cat, Eugene Wigner proposed the following:

- **Alice** is inside a lab measuring a quantum particle (e.g., electron spin)
- From **Alice's perspective**: she performs a measurement and gets a definite outcome
- From **Wigner's perspective** (outside): Alice's entire lab is a quantum system, so Alice is in a _superposition_ of having seen both outcomes — no collapse has occurred

This reveals that **observations are not absolute facts**. A measurement outcome is _relational_ — it exists relative to the observer making it, not as a universal fact of the world.

### How Agents Are Modeled

Lydia's research models observers as minimal physical systems:

- A **measurement** = two systems becoming entangled (quantum-correlated)
- An **agent** = a quantum circuit with a few qubits representing memory and decision-making
- Everything, including the observer, obeys **reversible quantum evolution** from the outside

**Reversibility** is key: from outside a lab, an observer's measurement can in principle be _undone_ (like rewinding a film). But from inside, it feels irreversible — you cannot "unmeasure" something.

---

## Part 2: The Frauchiger-Renner (FR) Thought Experiment

Proposed by **Daniela Frauchiger and Renato Renner** in 2016, this is a four-observer extension of Wigner's Friend that produces an explicit logical paradox.

### The Setup

Four agents: **Alice** and **Bob** (inside their respective labs), and **Ursula** and **Wigner** (outside observers who can perform quantum measurements _on_ the labs).

**The protocol:**

1. Alice measures a quantum particle, getting outcome 0 or 1
2. Based on her result, Alice prepares a second particle (S) — either in a definite state or a superposition — and sends it to Bob
3. Bob measures S, getting outcome 0 or 1
4. Wigner performs a special "super-measurement" on Bob's entire lab (undoing + re-measuring)
5. Ursula performs the same kind of super-measurement on Alice's entire lab

### The Chain of Reasoning

Each agent reasons logically about the others:

- **Bob:** "If I got outcome 1, Alice must have gotten 1 — only her outcome=1 could produce a superposition that gives me spin-down"
- **Alice:** "If I got 1, and I prepared that superposition, then quantum mechanics guarantees Wigner will always get _fail_"
- **Ursula:** "If I got _okay_, then Bob got 1 → Alice got 1 → Wigner got _fail_"

Each individual step is perfectly logical.

### Where It Breaks Down

When you calculate the quantum circuit from the _outside_ — putting the Heisenberg cut around both labs — the math shows that **1/12 of the time**, both Ursula and Wigner get the outcome _okay_.

But when this happens:

- Wigner asks Ursula: "What did you get?" → "Okay"
- Wigner reasons: Ursula got okay → Bob got 1 → Alice got 1 → **I should have gotten _fail_**
- But Wigner got _okay_. **Contradiction.**

> _"You can accurately say I have an error 1/12 of the time, but you cannot predict when you get the error."_
> — Dr. Lydia del Rio

Nobody made an error. The physics is working correctly. The logic is working correctly. Yet the conclusions are **flatly contradictory** — provably, mathematically, 1/12 of the time.

---

## Part 3: Implications and Interpretations

### What Cannot All Be True Simultaneously

The FR experiment is a **no-go theorem**: it proves that the following three assumptions cannot all hold at once:

1. **Quantum mechanics applies at all scales** — agents can model each other as quantum systems
2. **No contradictions in measurement outcomes** — an observer cannot simultaneously conclude they got outcome X and not-X
3. **Consistency across agents** — observers can chain each other's reasoning ("I know that you know that she knows...")

These assumptions each seem completely reasonable. Yet together, they lead to a provable contradiction.

### Ways Out of the Paradox

| Interpretation                     | Solution                                                                                           | Cost                                                                                                   |
| ---------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Objective Collapse** (e.g., GRW) | Quantum mechanics breaks down at large scales; you can't put a person in superposition             | Must explain _where_ and _why_ collapse occurs; tensions with relativity                               |
| **Many Worlds**                    | Both outcomes happen on different branches; no real contradiction                                  | Not operationally useful; "a world where everything happens is as boring as one where nothing happens" |
| **QBism / Epistemic**              | Quantum theory is a personal tool for predictions; agents shouldn't combine each other's reasoning | Difficult to account for shared reality; limits applicability                                          |
| **Heisenberg Cut Rules**           | Agents can only combine reasoning if their cuts are compatible                                     | Either too restrictive (theory becomes useless) or too liberal (paradoxes still arise)                 |

> _"They all come at a price."_
> — Dr. Lydia del Rio

### Connection to Bell's Theorem

Bell's theorem already showed we can't have _local hidden variables_. The FR experiment adds something new: it challenges whether **observations themselves are universal facts**. In Bell's theorem, measurement outcomes are still treated as objective shared facts. FR shows even _that_ assumption may fail.

### Practical Implications for Quantum Computing

If networks of quantum computers ever operate as agents reasoning about each other's outputs, this paradox could manifest as a real computational problem — a logical breakdown occurring 1/12 of the time with no way to predict or prevent it. Lydia notes this is still active research, but draws a direct parallel to how Bell's theorem — once considered purely philosophical — eventually gave rise to quantum cryptography.

---

## The Quanundrum Software

Lydia and collaborators (Renato Renner, Simon Matis, Nuriya Nurgalieva, Marina Maciel Ansanelli) built **Quanundrum**, a software tool that models these thought experiments as quantum circuits. Users can:

- Program different agent assumptions (many-worlds, collapse, epistemic)
- Set different Heisenberg cuts for each agent
- Run the circuit and check for logical contradictions

A prototype is available on GitHub.

---

## Philosophical Takeaways

### Reality is Relational

Physics increasingly suggests that observations, facts, and even the boundaries of systems are **relational** — they exist between an observer and the world, not as standalone features of an objective universe. What gives us a _shared_ reality is **correlations**: interactions, measurements, and communication between agents.

### The "God's View" Problem

You cannot simultaneously:

- Have the outside "God's view" (the global wave function evolving unitarily), **AND**
- Know what agents are experiencing inside the experiment

> _"I can give you Super Mario on a disc — here's the game, there you have it. That's the universe. But we both know the game is to be played and to be in it, and to have these different perspectives."_
> — Dr. Lydia del Rio

We are the little people inside the box. "Shut up and calculate from the outside" tells us nothing about our actual lived experience.

### The Heisenberg Cut as Metaphor for Life

Lydia draws broader lessons from her work:

- Nature doesn't respect the boundaries we draw — between particles and waves, quantum and classical, self and world
- The "I" is itself a **convention**: a Heisenberg cut we place around ourselves for social and practical purposes
- Awareness that we draw these boundaries differently is a source of empathy and epistemic humility

She also notes that even the distinction between light as a "particle" or a "wave" mirrors how we impose binary categories (e.g., gender) onto a nature that is far more continuous and diverse.

### On Incompleteness

The FR paradox echoes **Gödel's incompleteness theorems**: any sufficiently powerful logical system contains statements that cannot be proven true or false within that system. Quantum mechanics describing agents who model quantum mechanics is self-referential in exactly this way — it hits its own limits.

The title of Frauchiger and Renner's original paper captures this precisely: _"Quantum theory cannot consistently describe the use of itself."_

This is likely true of _any_ universal theory, not a special defect of quantum mechanics.

---

## Key Figures Mentioned

| Person                                 | Contribution                                                                                                |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Eugene Wigner**                      | Original Wigner's Friend thought experiment                                                                 |
| **Daniela Frauchiger & Renato Renner** | FR thought experiment (2016); awarded Paul Ehrenfest prize for best paper in foundations of quantum physics |
| **Časlav Brukner**                     | Extended Wigner's Friend experiments                                                                        |
| **Eric Cavalcanti**                    | Related experiments; calls himself a "metaphysical experimentalist"                                         |
| **James Clerk Maxwell**                | Maxwell's Demon — classical precursor to the observer problem                                               |
| **Charles Bennett & Rolf Landauer**    | Showed erasing information costs exactly the energy gained by Maxwell's Demon                               |
| **John Wheeler**                       | "Broken glass" metaphor for the observer's participatory role in the universe                               |
| **John Stewart Bell**                  | Bell's theorem, ruling out local hidden variables                                                           |
| **Nuriya Nurgalieva**                  | PhD thesis comparing FR paradox to Gödelian self-reference                                                  |

---

## Maxwell's Demon: A Classical Precursor

Before diving into the quantum weirdness, Lydia grounds the discussion with a classical analogy.

**Maxwell's Demon** is a thought experiment in which a tiny demon, with perfect knowledge of all gas particles, selectively opens a gate to separate fast (hot) from slow (cold) particles — seemingly creating a temperature difference from nothing, violating the second law of thermodynamics.

The resolution: the demon must _store_ information about each particle. Erasing that information at the end of each cycle costs exactly as much energy as was seemingly gained for free.

**The lesson:** sometimes you must _bring the observer inside the theory_ to avoid apparent paradoxes. The thermodynamic system and the demon must be modeled together. This is precisely the move that the FR experiment demands we make in quantum mechanics — with far stranger results.

---

_Links to the original Frauchiger-Renner paper, response papers, and the Quanundrum GitHub repository were referenced as being available in the video description._
