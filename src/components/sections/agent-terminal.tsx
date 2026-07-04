"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { agentTerminal as t } from "@/lib/content";
import { EASE_SILK } from "@/lib/motion";

type StepStatus = "hidden" | "running" | "done";
type InputState = "idle" | "typing" | "sent";
type Progress = "none" | "start" | "done";

const CURSOR_GREEN = "#3ECF8E";
/** Per-character typing speed for the prompt (ms). */
const TYPE_MS = 42;
/** Spin time before each first-pass step resolves (ms). */
const PHASE1_SPIN = [820, 700, 720, 900];

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

/** Left-hand status glyph: a filled dot when done, a green spinner while running. */
function StatusGlyph({ status, reduce }: { status: StepStatus; reduce: boolean }) {
  return (
    <span className="flex w-3 shrink-0 items-center justify-center">
      {status === "done" ? (
        <span className="size-1.5 rounded-full bg-white/70" />
      ) : (
        <motion.span
          className="block size-3 rounded-full border-[1.5px]"
          style={{ borderColor: `${CURSOR_GREEN}40`, borderTopColor: CURSOR_GREEN }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={
            reduce ? undefined : { duration: 0.8, repeat: Infinity, ease: "linear" }
          }
        />
      )}
    </span>
  );
}

/** A single agent step row (glyph + label + optional dimmed duration). */
function StepRow({
  label,
  meta,
  status,
  reduce,
}: {
  label: string;
  meta: string;
  status: StepStatus;
  reduce: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: EASE_SILK }}
      className="flex shrink-0 items-center gap-2.5"
    >
      <StatusGlyph status={status} reduce={reduce} />
      <span className="text-white/80">
        {label}
        {status === "done" && meta ? (
          <span className="text-white/35"> {meta}</span>
        ) : null}
      </span>
    </motion.div>
  );
}

/**
 * A clone of Cursor's `cursor-agent` terminal — layout, design, and full
 * interaction — with Golem copy. The input sits pinned at the bottom (chat
 * style); the agent's work streams in above it, then it asks a clarifying
 * question and spins up sub-agents. Older lines scroll off the top. Loops, and
 * degrades to a static finished frame under `prefers-reduced-motion`.
 */
export function AgentTerminal() {
  const reduce = useReducedMotion() ?? false;

  const [typed, setTyped] = useState(0);
  const [inputState, setInputState] = useState<InputState>("idle");
  const [showPrompt, setShowPrompt] = useState(false);
  const [steps1, setSteps1] = useState<StepStatus[]>(
    t.steps.map(() => "hidden"),
  );
  const [showQuestion, setShowQuestion] = useState(false);
  const [checked, setChecked] = useState(false);
  const [steps2, setSteps2] = useState<StepStatus[]>(
    t.followUpSteps.map(() => "hidden"),
  );
  const [agentsShown, setAgentsShown] = useState(0);
  const [progress, setProgress] = useState<Progress>("none");

  useEffect(() => {
    // Reduced motion: render the finished frame, no looping.
    if (reduce) {
      setInputState("sent");
      setShowPrompt(true);
      setSteps1(t.steps.map(() => "done"));
      setShowQuestion(true);
      setChecked(true);
      setSteps2(t.followUpSteps.map(() => "done"));
      setAgentsShown(t.agents.length);
      setProgress("done");
      return;
    }

    let cancelled = false;
    const set1 = (i: number, s: StepStatus) =>
      setSteps1((prev) => {
        const next = [...prev];
        next[i] = s;
        return next;
      });
    const set2 = (i: number, s: StepStatus) =>
      setSteps2((prev) => {
        const next = [...prev];
        next[i] = s;
        return next;
      });

    async function run() {
      while (!cancelled) {
        // reset to the idle frame
        setTyped(0);
        setInputState("idle");
        setShowPrompt(false);
        setSteps1(t.steps.map(() => "hidden"));
        setShowQuestion(false);
        setChecked(false);
        setSteps2(t.followUpSteps.map(() => "hidden"));
        setAgentsShown(0);
        setProgress("none");
        await sleep(1400);
        if (cancelled) return;

        // type the prompt into the bottom input
        setInputState("typing");
        for (let i = 1; i <= t.input.length; i += 1) {
          if (cancelled) return;
          setTyped(i);
          await sleep(TYPE_MS);
        }
        await sleep(560);
        if (cancelled) return;

        // submit: prompt joins the transcript, input becomes a follow-up
        setShowPrompt(true);
        setInputState("sent");
        setProgress("start");
        setTyped(0);
        await sleep(540);

        // first pass: think / read / plan
        for (let s = 0; s < t.steps.length; s += 1) {
          if (cancelled) return;
          set1(s, "running");
          await sleep(PHASE1_SPIN[s] ?? 800);
          if (cancelled) return;
          set1(s, "done");
          await sleep(220);
        }
        await sleep(520);
        if (cancelled) return;

        // the agent asks a clarifying question, then a choice gets selected
        setShowQuestion(true);
        await sleep(900);
        if (cancelled) return;
        setChecked(true);
        await sleep(1100);
        if (cancelled) return;

        // second pass: analyze scope, then spin up sub-agents
        set2(0, "running");
        await sleep(760);
        set2(0, "done");
        await sleep(240);
        if (cancelled) return;
        set2(1, "running");
        await sleep(420);
        set2(1, "done");
        for (let a = 1; a <= t.agents.length; a += 1) {
          if (cancelled) return;
          setAgentsShown(a);
          await sleep(400);
        }
        setProgress("done");

        // hold the finished frame, then loop
        await sleep(5200);
      }
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [reduce]);

  const modelLine =
    progress === "start"
      ? `${t.model} · ${t.progressStart}`
      : progress === "done"
        ? `${t.model} · ${t.progressDone}`
        : t.model;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: EASE_SILK }}
      className="flex h-[470px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-spruce shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
      aria-label="Golem agent terminal"
    >
      {/* window bar */}
      <div className="relative flex shrink-0 items-center border-b border-white/5 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span className="absolute left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.02em] text-white/40">
          {t.title}
        </span>
      </div>

      {/* transcript — newest content anchored to the bottom; older scrolls off the top */}
      <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden px-4 py-4 font-mono text-[12.5px] leading-relaxed">
        {/* boot lines */}
        <div className="shrink-0 space-y-1">
          <div className="text-white/40">
            <span className="text-white/25">{t.promptSymbol}</span> {t.command}
          </div>
          <div className="font-medium text-white/90">{t.name}</div>
          <div className="text-white/35">{t.cwd}</div>
        </div>

        {/* submitted prompt */}
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE_SILK }}
            className="shrink-0 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-white/90"
          >
            {t.input}
          </motion.div>
        )}

        {/* first-pass steps */}
        {t.steps.map((step, i) =>
          steps1[i] !== "hidden" ? (
            <StepRow
              key={step.label}
              label={step.label}
              meta={step.meta}
              status={steps1[i] ?? "hidden"}
              reduce={reduce}
            />
          ) : null,
        )}

        {/* clarifying question */}
        {showQuestion && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE_SILK }}
            className="shrink-0 space-y-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3"
          >
            <div className="text-white/45">{t.question.title}</div>
            <div className="text-white/90">{t.question.prompt}</div>
            <div className="space-y-1 pt-0.5">
              {t.question.options.map((opt, i) => {
                const isChecked = i === t.question.checked && checked;
                return (
                  <div key={opt} className="text-white/75">
                    <span className="text-white/45">[{isChecked ? "x" : " "}]</span>{" "}
                    {opt}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* second-pass steps */}
        {t.followUpSteps.map((step, i) =>
          steps2[i] !== "hidden" ? (
            <StepRow
              key={step.label}
              label={step.label}
              meta={step.meta}
              status={steps2[i] ?? "hidden"}
              reduce={reduce}
            />
          ) : null,
        )}

        {/* sub-agents, indented under "Started 3 agents" */}
        {t.agents.slice(0, agentsShown).map((agent) => (
          <motion.div
            key={agent.name}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE_SILK }}
            className="flex shrink-0 items-center gap-2.5 pl-5"
          >
            <span className="flex w-3 shrink-0 items-center justify-center">
              <span
                className="size-1.5 rounded-full"
                style={{ backgroundColor: CURSOR_GREEN }}
              />
            </span>
            <span className="text-white/80">
              <span className="font-medium text-white/90">{agent.name}</span>{" "}
              <span className="text-white/35">· {agent.note}</span>
            </span>
          </motion.div>
        ))}
      </div>

      {/* input + status, pinned to the bottom */}
      <div className="shrink-0 space-y-3 px-4 pb-4 font-mono text-[12.5px] leading-relaxed">
        {/* input box */}
        <div className="flex h-[42px] items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3">
          <span className="flex items-center">
            <span className="text-white/35">→&nbsp;</span>
            {inputState === "typing" ? (
              <span className="text-white/90">{t.input.slice(0, typed)}</span>
            ) : (
              <span className="text-white/35">
                {inputState === "idle" ? t.placeholder : t.followup}
              </span>
            )}
            {inputState === "typing" && (
              <motion.span
                aria-hidden
                className="ml-0.5 inline-block h-[15px] w-[7px] rounded-[1px] bg-white/70"
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.5, 0.5, 1],
                }}
              />
            )}
          </span>
          {inputState === "sent" && (
            <span className="shrink-0 text-white/25">{t.stopHint}</span>
          )}
        </div>

        {/* footer status */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <span className="flex w-3 shrink-0 items-center justify-center">
              <span
                className="size-1.5 rounded-full"
                style={{ backgroundColor: CURSOR_GREEN }}
              />
            </span>
            <span className="text-white/60">
              {t.mode} <span className="text-white/30">{t.modeHint}</span>
            </span>
          </div>
          <div className="text-white/35">{modelLine}</div>
          <div className="text-white/30">{t.hints}</div>
        </div>
      </div>
    </motion.div>
  );
}
