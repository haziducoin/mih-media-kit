import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Mail,
  MapPin,
  Sparkles,
  ArrowRight,
  Check,
  Quote,
  Music2,
  Instagram,
  Youtube,
  Headphones,
} from "lucide-react";

import defaultMediaKit from "@/content/media-kit.json";

const EDITOR_DRAFT_KEY = "mih-media-kit-editor-draft";
let mediaKit = defaultMediaKit;

// Textes modifiables dans l'admin ; si le champ est vide ou absent (ancien brouillon),
// on garde le texte d'origine.
function label(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "MIH - Mon Incroyable Histoire | Kit Média" },
      {
        name: "description",
        content:
          "Kit Média de MIH - Mon Incroyable Histoire. Programme premium de témoignages : 100K abonnés YouTube, 105K vues / épisode, audience engagée 25-45 ans.",
      },
      { name: "robots", content: "noindex, nofollow, noarchive, nosnippet" },
      { name: "googlebot", content: "noindex, nofollow, noarchive, nosnippet" },
    ],
  }),
});

/* ---------- Building blocks ---------- */

function SectionTag({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur ${className}`}
    >
      <Sparkles className="size-3" />
      {children}
    </span>
  );
}

/* ---------- Header ---------- */

function Header({ showOffers = true }: { showOffers?: boolean }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3 md:px-6">
        <div className="flex items-center gap-2">
          <img
            src="/media/mih-logo.jpeg"
            alt="MIH - Mon Incroyable Histoire"
            className="size-11 rounded-lg border border-black/10 object-cover"
          />
          <div className="hidden sm:block">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Kit Média
            </div>
          </div>
        </div>
        <nav className="flex items-center gap-1 text-xs font-semibold text-muted-foreground sm:text-sm">
          <a
            href="#chiffres"
            className="rounded-full px-2.5 py-2 transition hover:bg-secondary hover:text-foreground sm:px-4"
          >
            Performances
          </a>
          {showOffers && (
            <a
              href="#offres"
              className="rounded-full px-2.5 py-2 transition hover:bg-secondary hover:text-foreground sm:px-4"
            >
              Offres
            </a>
          )}
          <a
            href="#contact"
            className="rounded-full px-2.5 py-2 transition hover:bg-secondary hover:text-foreground sm:px-4"
          >
            Contact
          </a>
        </nav>
        <a
          href="#contact"
          className="hidden items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-xs font-semibold text-background shadow-sm transition hover:bg-primary hover:text-primary-foreground md:inline-flex"
        >
          {label(mediaKit.hero.headerButton, "Devenir Sponsor")} <ArrowRight className="size-3.5" />
        </a>
      </div>
    </header>
  );
}

/* ---------- 1. Hero ---------- */

// Proportions de l'image d'accueil (relues au chargement, l'image pouvant être changée dans
// l'admin) : sur ordinateur, le bandeau des chiffres prend la largeur AFFICHÉE de l'image.
const HERO_RATIO_PAR_DEFAUT = 1494 / 1053;

function Hero({ showOffers = true }: { showOffers?: boolean }) {
  const { hero, links } = mediaKit;
  const [ratio, setRatio] = useState(HERO_RATIO_PAR_DEFAUT);
  const lireRatio = (img: HTMLImageElement | null) => {
    if (img?.naturalWidth && img.naturalHeight) setRatio(img.naturalWidth / img.naturalHeight);
  };

  return (
    <section className="relative min-h-[calc(100vh-4.5rem)] overflow-hidden bg-[#061219] text-white max-md:min-h-0">
      <a
        href={links.youtubePlaylistUrl}
        target="_blank"
        rel="noreferrer"
        className="absolute inset-0 block max-md:relative"
        aria-label="Voir la playlist MIH sur YouTube"
      >
        <img
          ref={(img) => lireRatio(img)}
          src={hero.image}
          alt="MIH - Mon Incroyable Histoire"
          className="size-full object-contain object-top max-md:h-auto"
          onLoad={(e) => lireRatio(e.currentTarget)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061219]/90 via-[#061219]/10 to-transparent" />
      </a>

      <div
        className="relative mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-7xl items-end px-5 pb-10 pt-40 md:w-[min(100%,calc((100vh-4.5rem)*var(--hero-ratio)))] md:max-w-none md:px-[3%] md:pb-14 max-md:min-h-0 max-md:pt-2"
        style={{ "--hero-ratio": ratio } as React.CSSProperties}
      >
        <div className="w-full">
          <div className="grid max-w-3xl grid-cols-2 gap-3 border-y border-white/20 bg-[#061219]/60 py-5 backdrop-blur md:max-w-none md:grid-cols-4">
            {hero.stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-4xl font-bold text-white md:text-6xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/55">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={links.youtubePlaylistUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#ff0033] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#e6002e] hover:shadow-lg"
            >
              {label(hero.playlistButton, "Voir la playlist")} <Youtube className="size-4" />
            </a>
            {showOffers && (
              <a
                href="#offres"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-primary"
              >
                {label(hero.offersButton, "Découvrir nos offres")} <ArrowRight className="size-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 2. Propos ---------- */

function Propos() {
  const { propos } = mediaKit;

  return (
    <section id="propos" className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <SectionTag>{label(propos.tag, "Le Propos")}</SectionTag>
          <div className="relative mt-8">
            <div className="absolute -left-3 -top-12 font-serif text-8xl leading-none text-primary/20 md:text-9xl">
              “
            </div>
            <h2 className="relative font-serif text-5xl font-semibold leading-[0.98] tracking-normal text-foreground md:text-7xl">
              {propos.titleLines.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < propos.titleLines.length - 1 && <br />}
                </span>
              ))}
            </h2>
          </div>
        </div>

        <div className="pt-3 lg:pt-16">
          <div className="space-y-7 border-l border-border pl-6 text-lg leading-relaxed text-muted-foreground md:pl-8 md:text-xl">
            {propos.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 3. Concept ---------- */

function Concept() {
  const { concept } = mediaKit;

  return (
    <section id="concept" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl">
          <SectionTag>{label(concept.tag, "Le Concept")}</SectionTag>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight md:text-6xl">
            {concept.heading}
          </h2>
          <div className="mt-9 grid gap-4 text-lg leading-relaxed text-muted-foreground md:text-xl">
            {concept.bullets.map((item, index) => (
              <div
                key={item}
                className="flex gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm"
              >
                <span className="font-display text-3xl font-bold leading-none text-primary">
                  {index + 1}
                </span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {concept.videos.map((video) => (
            <a
              key={video.youtubeId}
              href={video.url}
              target="_blank"
              rel="noreferrer"
              className="group overflow-hidden rounded-xl border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-video overflow-hidden bg-[#061219]">
                <img
                  src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title}
                  className="size-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-black/15 transition group-hover:bg-black/5" />
                <div className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-[#ff0033] text-white shadow-xl">
                  <Youtube className="size-7" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="line-clamp-2 min-h-[3rem] text-base font-bold leading-snug">
                  {video.title}
                </h3>
                <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {video.views}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 4. Performances ---------- */

function Performances() {
  const { performances } = mediaKit;

  return (
    <section id="chiffres" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-2xl bg-[#061219] p-7 text-white md:p-10 max-md:p-5">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <SectionTag>{label(performances.tag, "Performances")}</SectionTag>
              <h2 className="mt-5 font-display text-4xl font-bold leading-tight md:text-5xl">
                {performances.heading}
              </h2>
            </div>
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/10">
              <div className="bg-[#061219] p-6 md:p-8 max-md:p-5">
                <div className="font-display text-7xl font-bold leading-none text-primary md:text-8xl max-md:text-[clamp(2.25rem,12vw,4.5rem)]">
                  {performances.bigStat.value}
                </div>
                <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-white/55 md:text-sm">
                  {performances.bigStat.label}
                </div>
                {performances.cumulStat?.value && (
                  <div className="mt-6 border-t border-white/10 pt-6">
                    <div className="font-display text-4xl font-bold leading-none text-white md:text-5xl">
                      {performances.cumulStat.value}
                    </div>
                    <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-white/55 md:text-sm">
                      {performances.cumulStat.label}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1.35fr_0.85fr]">
            <div className="rounded-2xl border border-white/10 bg-white p-5 text-foreground shadow-xl md:p-6">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h3 className="font-display text-2xl font-bold">MIH vs marché</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Chaque indicateur possède sa propre échelle.
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <span className="size-2.5 rounded-full bg-primary" />
                    MIH
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="size-2.5 rounded-full bg-slate-300" />
                    Marché
                  </span>
                </div>
              </div>
              <div className="space-y-6">
                {performances.comparison.map((metric) => {
                  const max = Math.max(metric.mih, metric.market);
                  return (
                    <div key={metric.label}>
                      <div className="mb-3 flex items-center justify-between gap-4">
                        <div className="font-semibold text-foreground">{metric.label}</div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Max {max}%
                        </div>
                      </div>
                      <div className="space-y-2">
                        <ComparisonBar
                          label="MIH"
                          value={metric.mih}
                          max={max}
                          className="bg-primary"
                        />
                        <ComparisonBar
                          label="Marché"
                          value={metric.market}
                          max={max}
                          className="bg-slate-300"
                        />
                      </div>
                    </div>
                  );
                })}
                <p className="text-xs text-slate-500">{performances.comparisonNote}</p>
              </div>
            </div>

            <CoeurDeCible />
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonBar({
  label,
  value,
  max,
  className,
}: {
  label: string;
  value: number;
  max: number;
  className: string;
}) {
  const width = `${Math.max((value / max) * 100, 4)}%`;

  return (
    <div className="grid grid-cols-[4.5rem_1fr_4rem] items-center gap-3">
      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="h-4 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${className}`} style={{ width }} />
      </div>
      <div className="text-right font-display text-lg font-bold text-foreground">
        {value.toLocaleString("fr-FR")}%
      </div>
    </div>
  );
}

/* ---------- Chiffres d'audience (Cœur de cible + Qui nous regarde) ---------- */

const fr = (n: number) => n.toLocaleString("fr-FR", { maximumFractionDigits: 1 });
const enSecondes = (t: string) => {
  const [m, s] = t.split(":").map(Number);
  return (m || 0) * 60 + (s || 0);
};

// Les graphiques sont visibles d'emblée ; quand ils entrent à l'écran pour la
// première fois, les barres se remplissent (rien ne dépend de l'animation).
function useVu<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.dataset.vu = "1";
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function CoeurDeCible() {
  const { ageSplit } = mediaKit.performances;
  const ref = useVu<HTMLDivElement>();
  const max = Math.max(...ageSplit.ages.map((a) => a.value));
  const [femmes, hommes] = ageSplit.gender;

  return (
    <div
      ref={ref}
      className="flex flex-col rounded-2xl border border-white/10 bg-white p-5 text-foreground shadow-xl md:p-6"
    >
      <h3 className="font-display text-2xl font-bold">Cœur de cible</h3>
      <p className="mt-1 text-sm font-semibold text-foreground">{ageSplit.heading}</p>

      <div
        className="mt-6 flex gap-1.5"
        role="img"
        aria-label={ageSplit.ages.map((a) => `${a.name} ans : ${fr(a.value)} %`).join(", ")}
      >
        {ageSplit.ages.map((a, i) => (
          <div key={a.name} className="flex flex-1 flex-col items-center">
            <span
              className={`mb-1.5 text-xs font-bold ${a.cible ? "text-foreground" : "text-slate-500"}`}
            >
              {fr(a.value)}%
            </span>
            <div className="flex h-36 w-full items-end lg:h-64">
              <div
                className={`mih-monte w-full rounded-t-md ${a.cible ? "bg-primary" : "bg-slate-200"}`}
                style={{ height: `${(a.value / max) * 100}%`, animationDelay: `${i * 60}ms` }}
              />
            </div>
            <span className="mt-2 text-[11px] font-semibold text-slate-500">{a.name}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-7">
        <div className="flex justify-between text-xs font-semibold">
          <span className="text-foreground">
            {femmes.name} {fr(femmes.value)}%
          </span>
          <span className="text-foreground">
            {hommes.name} {fr(hommes.value)}%
          </span>
        </div>
        <div className="mt-2 flex h-3 overflow-hidden rounded-full">
          <div className="bg-primary" style={{ width: `${femmes.value}%` }} />
          <div className="bg-[#101827]" style={{ width: `${hommes.value}%` }} />
        </div>
        <p className="mt-4 text-xs text-slate-500">{ageSplit.note}</p>
      </div>
    </div>
  );
}

function ChiffreTitre({
  value,
  label: texte,
  sombre = false,
  compact = false,
}: {
  value: string;
  label: string;
  sombre?: boolean;
  compact?: boolean;
}) {
  return (
    <div>
      <div
        className={`font-display font-bold leading-none ${compact ? "text-4xl md:text-5xl" : "text-5xl md:text-6xl"} ${sombre ? "text-white" : "text-foreground"}`}
      >
        {value}
      </div>
      <p className={`mt-3 max-w-xs text-sm font-semibold ${sombre ? "text-white/70" : "text-slate-600"}`}>
        {texte}
      </p>
    </div>
  );
}

function Portrait() {
  const ref = useVu<HTMLElement>();
  const portrait = (mediaKit as typeof defaultMediaKit).portrait;
  if (!portrait) return null;
  const { watch, devices, countries, tiktok, facebook, podcast } = portrait;
  const francophone = countries.items.reduce((t, c) => t + c.value, 0);
  const france = countries.items[0]?.value ?? 0;
  const cases = Array.from({ length: 100 }, (_, i) =>
    i < Math.round(france) ? "france" : i < Math.round(francophone) ? "franco" : "autre",
  );
  const tiktokMax = Math.max(...tiktok.ages.map((a) => a.value));
  const podcastFr = podcast.items.reduce((t, c) => t + c.value, 0);

  return (
    <section ref={ref} id="audience-chiffres" className="bg-white pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <SectionTag>{label(portrait.tag, "Qui nous regarde")}</SectionTag>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight [text-wrap:balance] md:text-5xl">
            {portrait.heading}
          </h2>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
          {/* Durée regardée, épisode par épisode */}
          <div className="self-start rounded-2xl bg-[#061219] p-6 text-white md:p-8">
            <ChiffreTitre value={watch.value} label={watch.label} sombre />
            <ul className="mt-8 space-y-5">
              {watch.episodes.map((ep, i) => {
                const part = (enSecondes(ep.watched) / enSecondes(ep.duration)) * 100;
                return (
                  <li key={ep.title}>
                    <div className="flex items-baseline justify-between gap-4 text-sm">
                      <span className="truncate text-white/85">{ep.title}</span>
                      <span className="shrink-0 font-display font-bold text-white">
                        {ep.watched}
                        <span className="font-sans font-semibold text-white/45"> / {ep.duration}</span>
                      </span>
                    </div>
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="mih-pousse h-full rounded-full bg-primary"
                        style={{ width: `${part}%`, animationDelay: `${i * 90}ms` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 text-xs text-white/55">
              Durée moyenne d'une vue rapportée à la durée de l'épisode.
            </p>
          </div>

          <div className="flex flex-col gap-12">
            {/* Écrans */}
            <div>
              <ChiffreTitre value={devices.value} label={devices.label} compact />
              <div className="mt-6 flex h-4 overflow-hidden rounded-full" role="img"
                aria-label={devices.items.map((d) => `${d.name} ${fr(d.value)} %`).join(", ")}>
                {devices.items.map((d, i) => (
                  <div
                    key={d.name}
                    className={d.highlight ? "bg-primary" : ["bg-[#101827]", "bg-slate-400", "bg-slate-300", "bg-slate-200"][i]}
                    style={{ width: `${d.value}%` }}
                  />
                ))}
              </div>
              <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                {devices.items.map((d, i) => (
                  <li key={d.name} className="flex items-center justify-between gap-3">
                    <span className={`inline-flex items-center gap-2 ${d.highlight ? "font-bold text-foreground" : "text-slate-600"}`}>
                      <span className={`size-2.5 rounded-full ${d.highlight ? "bg-primary" : ["bg-[#101827]", "bg-slate-400", "bg-slate-300", "bg-slate-200"][i]}`} />
                      {d.name}
                    </span>
                    <span className="font-semibold text-foreground">{fr(d.value)}%</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Francophonie : 100 cases = 100 % de l'audience */}
            <div>
              <ChiffreTitre value={countries.value} label={countries.label} compact />
              <div className="mt-6 grid max-w-[13rem] grid-cols-10 gap-[3px]" role="img"
                aria-label={countries.items.map((c) => `${c.name} ${fr(c.value)} %`).join(", ")}>
                {cases.map((t, i) => (
                  <span
                    key={i}
                    className={`aspect-square rounded-[3px] ${t === "france" ? "bg-primary" : t === "franco" ? "bg-[#101827]" : "bg-slate-100"}`}
                  />
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-600">
                <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                  <span className="size-2.5 rounded-sm bg-primary" /> France {fr(france)}%
                </span>
                <span className="mx-2 text-slate-300">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-2.5 rounded-sm bg-[#101827]" />
                  {countries.items.slice(1).map((c) => `${c.name} ${fr(c.value)}%`).join(", ")}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Les autres plateformes */}
        <div className="mt-16 grid gap-10 border-t border-border pt-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border">
          <div className="md:pr-8">
            <PlateformeNom id="tiktok" />
            <ChiffreTitre value={tiktok.value} label={tiktok.label} compact />
            <ul className="mt-6 space-y-2">
              {tiktok.ages.map((a, i) => (
                <li key={a.name} className="grid grid-cols-[3rem_1fr_3rem] items-center gap-3 text-xs">
                  <span className="font-semibold text-slate-600">{a.name}</span>
                  <span className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <span
                      className={`mih-pousse block h-full rounded-full ${a.cible ? "bg-primary" : "bg-slate-300"}`}
                      style={{ width: `${(a.value / tiktokMax) * 100}%`, animationDelay: `${i * 60}ms` }}
                    />
                  </span>
                  <span className={`text-right font-bold ${a.cible ? "text-foreground" : "text-slate-500"}`}>{fr(a.value)}%</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:px-8">
            <PlateformeNom id="facebook" />
            <ChiffreTitre value={facebook.value} label={facebook.label} compact />
            <div className="mt-6 flex h-28 items-end gap-4">
              {[
                { l: facebook.fromLabel, v: facebook.from, c: "bg-slate-200" },
                { l: facebook.toLabel, v: facebook.to, c: "bg-primary" },
              ].map((b) => (
                <div key={b.l} className="flex h-full flex-1 flex-col justify-end">
                  <span className="mb-1 text-xs font-bold text-foreground">{fr(Math.round(b.v / 1000))} K</span>
                  <div className={`mih-monte rounded-t-md ${b.c}`} style={{ height: `${(b.v / facebook.to) * 100}%` }} />
                  <span className="mt-2 text-[11px] font-semibold text-slate-500">{b.l}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-600">{facebook.note}</p>
          </div>

          <div className="md:pl-8">
            <PlateformeNom id="spotify" texte="Podcast" />
            <ChiffreTitre value={podcast.value} label={podcast.label} compact />
            <div className="mt-6 flex h-4 overflow-hidden rounded-full bg-slate-100">
              <div className="bg-primary" style={{ width: `${podcast.items[0].value}%` }} />
              <div className="bg-[#101827]" style={{ width: `${podcast.items[1].value}%` }} />
            </div>
            <p className="mt-3 text-sm text-slate-600">
              {podcast.items.map((c) => `${c.name} ${fr(c.value)}%`).join(" · ")}
              <span className="text-slate-400"> · autres {fr(100 - podcastFr)}%</span>
            </p>
            <p className="mt-4 text-sm font-semibold text-foreground">{podcast.note}</p>
          </div>
        </div>

        <p className="mt-10 text-xs text-slate-500">{portrait.sources}</p>
      </div>
    </section>
  );
}

function PlateformeNom({ id, texte }: { id: string; texte?: string }) {
  const p = platformPresentation(id);
  return (
    <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">{texte ?? p.name}</div>
  );
}

/* ---------- 5. Audience ---------- */

function Audience() {
  const { audience } = mediaKit;

  return (
    <section className="overflow-hidden bg-primary py-20 text-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <SectionTag>{label(audience.tag, "Notre Audience")}</SectionTag>
            <h2 className="mt-5 font-display text-4xl font-bold leading-tight md:text-5xl">
              {audience.heading}
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-[8%] top-0 hidden h-48 w-48 rounded-full bg-white/25 blur-3xl md:block" />
            <div className="grid gap-4 md:grid-cols-2">
              {audience.comments.map((comment) => (
                <article
                  key={comment.text}
                  className="rounded-2xl border border-foreground/10 bg-[#061219] p-5 text-white shadow-2xl transition hover:-translate-y-1 hover:border-white/40"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={comment.avatar}
                        alt={`Photo de profil ${comment.handle}`}
                        className="size-10 shrink-0 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-sm font-semibold text-white">{comment.handle}</div>
                        <div className="text-xs text-white/45">{comment.time}</div>
                      </div>
                    </div>
                    <Quote className="size-5 shrink-0 text-primary" />
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-white/82">“{comment.text}”</p>
                  <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/10 pt-4 text-xs font-semibold text-white/45">
                    <span>{comment.episode}</span>
                    <div className="inline-flex items-center gap-1.5 text-white/70">
                      <ThumbIcon />
                      <span>{comment.likes} J'aime</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ThumbIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3m0 11V10l4-8a3 3 0 0 1 3 3v4h5a3 3 0 0 1 3 3l-1 7a3 3 0 0 1-3 3H7Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

/* ---------- 6. Acquisition / viralité ---------- */

const PLATFORM_PRESENTATION: Record<string, { name: string; logo: string; color: string }> = {
  tiktok: {
    name: "TikTok",
    logo: "/media/logos/tiktok.svg",
    color: "bg-[#050816] text-white",
  },
  spotify: {
    name: "Spotify",
    logo: "/media/logos/spotify.svg",
    color: "bg-[#1DB954] text-white",
  },
  instagram: {
    name: "Instagram",
    logo: "/media/logos/instagram.svg",
    color: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white",
  },
  facebook: {
    name: "Facebook",
    logo: "/media/logos/facebook.svg",
    color: "bg-[#1877F2] text-white",
  },
};

// Plateforme inconnue (id saisi dans l'admin) : carte neutre plutôt qu'un plantage.
function platformPresentation(id: string) {
  return (
    PLATFORM_PRESENTATION[id.trim().toLowerCase()] ?? {
      name: id ? id.charAt(0).toUpperCase() + id.slice(1) : "Plateforme",
      logo: "",
      color: "bg-[#061219] text-white",
    }
  );
}

function Acquisition() {
  const { acquisition } = mediaKit;

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-4xl">
          <SectionTag>{label(acquisition.tag, "Acquisition & Viralité")}</SectionTag>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight md:text-6xl">
            {acquisition.heading}
          </h2>
        </div>

        <div
          className={`mt-12 grid gap-5 ${
            acquisition.platforms.length % 2 === 0 ? "md:grid-cols-2" : "lg:grid-cols-3"
          }`}
        >
          {acquisition.platforms.map((p, i) => {
            const presentation = platformPresentation(p.id);
            return (
              <div
                key={`${p.id}-${i}`}
                className="group flex overflow-hidden rounded-2xl border border-border bg-white transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`flex w-full flex-col overflow-hidden ${p.stats.length === 1 ? "min-h-[300px]" : ""}`}
                >
                  <div className={`flex items-center gap-4 p-5 ${presentation.color}`}>
                    {presentation.logo && (
                      <img
                        src={presentation.logo}
                        alt={`Logo ${presentation.name}`}
                        className="size-10 shrink-0 object-contain"
                      />
                    )}
                    <div>
                      <div className="font-display text-2xl font-bold">{presentation.name}</div>
                      <div className="mt-0.5 text-xs opacity-85">{p.handle}</div>
                    </div>
                  </div>
                  <div
                    className={`flex flex-1 flex-col gap-3 bg-[#dff8fd] p-4 ${
                      p.stats.length === 1 ? "items-center justify-center" : "justify-start"
                    }`}
                  >
                    {p.stats.map((s, j) => (
                      <div
                        key={j}
                        className={`w-full rounded-xl border border-cyan-100 bg-white/65 p-4 shadow-sm ${
                          p.stats.length === 1
                            ? "flex min-h-36 flex-col items-center justify-center text-center"
                            : "flex items-center justify-between gap-4"
                        }`}
                      >
                        <div className="shrink-0 font-display text-[clamp(2.6rem,4vw,4.25rem)] font-bold leading-none text-foreground">
                          {s.value}
                        </div>
                        <div className="text-right text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-[#dff8fd] p-6 text-xl text-foreground md:p-8">
          {acquisition.note}
        </div>
      </div>
    </section>
  );
}

/* ---------- 7. Reels & Offres ---------- */

// Identifiant du reel lu dans le lien Instagram (ex. /reel/DXcVdJwD8sA/).
function reelIdFromUrl(url: string, fallback: string) {
  return url.match(/instagram\.com\/(?:reel|reels|p)\/([A-Za-z0-9_-]+)/)?.[1] ?? fallback;
}

// Vidéo hébergée sur le site si elle correspond bien au reel du lien,
// sinon lecteur officiel Instagram : il suffit de coller le lien dans l'admin.
// "#t=0.1" : sans ça, Safari iOS laisse la vidéo noire jusqu'à la lecture.
function ReelVideo({ id, video, url }: { id: string; video?: string; url: string }) {
  const reelId = reelIdFromUrl(url, id);
  const hasLocalVideo = Boolean(video && video.includes(reelId));
  const [failed, setFailed] = useState(!hasLocalVideo);
  const ref = useRef<HTMLVideoElement>(null);

  // L'erreur peut arriver avant l'hydratation React (rendu serveur) : on la relit au montage.
  useEffect(() => {
    if (ref.current?.error) setFailed(true);
  }, []);

  // Lecteur Instagram recadré sur la vidéo seule (en-tête de 54 px, vidéo en 4:5,
  // likes/commentaires en dessous), agrandi pour remplir le cadre 9:16 comme les
  // autres reels (les côtés de la vidéo 4:5 sont rognés, comme un object-cover).
  if (failed || !video) {
    return (
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-black">
        <div className="absolute left-1/2 top-0 aspect-[4/5] h-full -translate-x-1/2 overflow-hidden">
          <iframe
            src={`https://www.instagram.com/reel/${reelId}/embed/`}
            title={`Reel Instagram ${reelId}`}
            className="absolute left-0 top-[-54px] h-[calc(100%+300px)] w-full border-0"
            loading="lazy"
            scrolling="no"
            allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black">
      <video
        ref={ref}
        src={video.includes("#") ? video : `${video}#t=0.1`}
        className="aspect-[9/16] w-full bg-black object-cover"
        controls
        preload="metadata"
        playsInline
        onError={() => setFailed(true)}
      />
    </div>
  );
}

function InstagramReels() {
  const { reels } = mediaKit;

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <SectionTag>{label(mediaKit.reelsSection?.tag, "Reels Instagram")}</SectionTag>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl">
            {label(mediaKit.reelsSection?.heading, "Un petit aperçu de l'émission")}
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {reels.map((reel, index) => (
            <article
              key={`${reel.url}-${index}`}
              className="mx-auto w-full max-w-[320px] overflow-hidden rounded-xl border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
            >
              <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
                <div className="flex items-center gap-2">
                  <Instagram className="size-3.5 text-primary" />
                  <div>
                    <div className="font-display text-base font-bold leading-none text-foreground">
                      {reel.views}
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      vues
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Reel {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <ReelVideo id={reel.id} video={reel.video} url={reel.url} />
              <a
                href={reel.url}
                target="_blank"
                rel="noreferrer"
                className="block border-t border-border px-3 py-2 text-xs font-semibold text-primary hover:bg-secondary"
              >
                Ouvrir sur Instagram
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Expertise() {
  const { expertise } = mediaKit;

  return (
    <section className="bg-slate-100 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-4xl">
          <div>
            <SectionTag>{label(expertise.tag, "Notre expertise")}</SectionTag>
            <h2 className="mt-5 font-display text-4xl font-bold leading-tight md:text-6xl">
              {expertise.heading}
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p className="font-semibold text-foreground">{expertise.highlight}</p>
              {expertise.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8">
              <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                {label(expertise.broadcastersTitle, "Références diffuseurs")}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {expertise.broadcasters.map((logo) => (
                  <div
                    key={logo.name}
                    className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-white px-4 shadow-sm"
                  >
                    <img
                      src={logo.logo}
                      alt={`Logo ${logo.name}`}
                      className="max-h-7 max-w-[7.5rem] object-contain max-md:h-7 max-md:w-auto"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Offers() {
  const { offers, links } = mediaKit;

  return (
    <section id="offres" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <SectionTag className="px-5 py-2 text-sm md:px-6 md:py-2.5 md:text-base">
            {label(mediaKit.offersSection?.tag, "Notre Offre & Tarifs")}
          </SectionTag>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {offers.map((o, i) => (
            <div
              key={i}
              className={`relative flex flex-col rounded-2xl border bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl ${
                o.highlight ? "border-gold shadow-lg ring-2 ring-gold/30" : "border-border"
              }`}
            >
              {o.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-foreground">
                  Recommandé
                </span>
              )}
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Format {o.num}
              </div>
              <h3 className="mt-3 font-display text-xl font-bold leading-tight min-h-[3.5rem]">
                {o.title}
              </h3>

              <div className="mt-6">
                <span className="font-display text-4xl font-bold text-primary">{o.price}</span>
                {o.unit && (
                  <span className="ml-1 align-baseline text-2xl font-bold text-primary">
                    {o.unit}
                  </span>
                )}
                {o.price !== "Sur devis" && (
                  <span className="ml-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    HT
                  </span>
                )}
              </div>

              <p className="mt-5 text-sm text-muted-foreground">{o.desc}</p>

              <div className="mt-4 rounded-lg border border-dashed border-border bg-secondary/50 p-3">
                <div className="flex gap-2 text-xs text-muted-foreground">
                  <Quote className="size-3 shrink-0 mt-0.5 text-gold" />
                  <span className="italic">{o.example}</span>
                </div>
              </div>

              <ul className="mt-5 space-y-2 text-xs">
                {o.meta.map((m, j) => (
                  <li key={j} className="flex items-center gap-2 text-foreground">
                    <Check className="size-3.5 text-primary" />
                    {m}
                  </li>
                ))}
              </ul>

              <a
                href={links.calendarUrl}
                target="_blank"
                rel="noreferrer"
                className={`mt-6 inline-flex items-center justify-center gap-1 rounded-full px-4 py-2.5 text-xs font-semibold transition ${
                  o.highlight
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "border border-border bg-white text-foreground hover:bg-secondary"
                }`}
              >
                Réserver un appel découverte (15 min) <ArrowRight className="size-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 8. Contact ---------- */

const SOCIAL_PRESENTATION: Record<string, { icon: typeof Youtube; name: string }> = {
  youtube: { icon: Youtube, name: "YouTube" },
  tiktok: { icon: Music2, name: "TikTok" },
  instagram: { icon: Instagram, name: "Instagram" },
  spotify: { icon: Headphones, name: "Spotify" },
};

function Contact() {
  const { contact, links } = mediaKit;

  return (
    <section id="contact" className="bg-primary py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-3xl bg-[#061219] p-10 text-white md:p-16 max-md:p-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionTag>{label(contact.tag, "Contact")}</SectionTag>
              <h2 className="mt-5 font-display text-4xl font-bold leading-tight md:text-5xl">
                {contact.heading}
              </h2>
              <p className="mt-6 text-lg opacity-90">{contact.paragraph}</p>
              <a
                href={links.calendarUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-bold max-md:w-full max-md:justify-center max-md:px-5 max-md:text-center text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-white hover:text-foreground"
              >
                {label(contact.ctaButton, "Prendre rendez-vous avec notre commercial")}
                <ArrowRight className="size-4" />
              </a>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/15">
                    <Mail className="size-4" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider opacity-70">Commercial</div>
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-semibold hover:underline max-md:break-all"
                    >
                      {contact.email}
                    </a>
                    <div className="text-sm opacity-80">L'équipe commerciale MIH</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/15">
                    <MapPin className="size-4" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider opacity-70">Adresse</div>
                    <div className="font-semibold">{contact.addressName}</div>
                    <div className="text-sm opacity-80">{contact.addressLine}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-widest opacity-80">
                {label(contact.socialsTitle, "Nos réseaux sociaux")}
              </div>
              {contact.socials.map((s) => {
                const presentation = SOCIAL_PRESENTATION[s.id];
                const href = s.id === "youtube" ? links.youtubePlaylistUrl : s.href;
                return (
                  <a
                    key={s.id}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/5 p-5 max-md:gap-3 max-md:p-4 transition hover:-translate-y-0.5 hover:bg-white/10"
                  >
                    <div className="flex items-center gap-4">
                      <div className="grid size-11 place-items-center rounded-xl bg-white/15">
                        <presentation.icon className="size-5" />
                      </div>
                      <div>
                        <div className="font-semibold">{presentation.name}</div>
                        <div className="text-sm opacity-80">{s.handle}</div>
                      </div>
                    </div>
                    <ArrowRight className="size-4 opacity-70" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="border-t border-border bg-white py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
        <div className="flex items-center gap-2">
          <div className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground text-xs font-bold">
            M
          </div>
          <span>© {new Date().getFullYear()} MIH — Tony Comiti Média</span>
        </div>
        <div className="text-xs">Kit Média — Tous droits réservés</div>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */

const SECTIONS: Record<string, () => React.ReactNode> = {
  hero: () => <Hero />,
  concept: Concept,
  propos: Propos,
  performances: Performances,
  portrait: Portrait,
  audience: Audience,
  acquisition: Acquisition,
  expertise: Expertise,
  offers: Offers,
  reels: InstagramReels,
  contact: Contact,
};
const DEFAULT_SECTION_ORDER = Object.keys(SECTIONS);

// Ordre défini dans l'admin (sectionOrder) : clés inconnues ignorées, doublons retirés,
// sections oubliées ajoutées à la fin pour ne jamais en perdre une.
function sectionKeys(content: { sectionOrder?: unknown }) {
  const requested = Array.isArray(content.sectionOrder)
    ? content.sectionOrder.map((k) => String(k).trim().toLowerCase())
    : [];
  const keys = [...new Set(requested.filter((k) => k in SECTIONS))];
  return [...keys, ...DEFAULT_SECTION_ORDER.filter((k) => !keys.includes(k))];
}

export function Index({ showOffers = true }: { showOffers?: boolean }) {
  const [activeMediaKit, setActiveMediaKit] = useState(defaultMediaKit);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.has("preview")) return;

    try {
      const draft = window.localStorage.getItem(EDITOR_DRAFT_KEY);
      if (draft) {
        setActiveMediaKit(JSON.parse(draft));
      }
    } catch {
      setActiveMediaKit(defaultMediaKit);
    }
  }, []);

  mediaKit = activeMediaKit;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header showOffers={showOffers} />
      <main>
        {sectionKeys(activeMediaKit).map((key) => {
          if (key === "offers" && !showOffers) return null;
          const Section = SECTIONS[key];
          return key === "hero" ? (
            <Hero key={key} showOffers={showOffers} />
          ) : (
            <Section key={key} />
          );
        })}
      </main>
      <Footer />
    </div>
  );
}
