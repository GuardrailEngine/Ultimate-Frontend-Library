import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowUpRight,
  ChevronRight,
  Code2,
  ExternalLink,
  Eye,
  Filter,
  Github,
  Grid2X2,
  Heart,
  Keyboard,
  Menu,
  RotateCcw,
  Search,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import { Route, Router as WouterRouter, Switch, useLocation } from 'wouter';

const queryClient = new QueryClient();
const GUMROAD_URL = 'https://simochakir.gumroad.com/l/szcvz';

type ComponentItem = {
  id: number;
  file: string;
  title: string;
  category: number;
  categoryName: string;
  description: string;
  tags: string[];
  sourcePath: string;
};

const categoryNames = [
  'Navigation & Wayfinding',
  'Forms & Inputs',
  'Motion & Interaction',
  'Data Visualization',
  'Layout Systems',
  'Cards & Content',
  'Overlays & Feedback',
  'Loading & Progress',
  'Commerce Patterns',
  'Product UIs',
];

const categoryDetails = [
  'Menus, rails, tabs, and the little signposts that keep a UI legible.',
  'Thoughtful controls for collecting, validating, and moving information.',
  'Small moments of movement that make interfaces feel responsive.',
  'Charts and metrics built with CSS, SVG, and a little good judgment.',
  'Responsive compositions that hold together from phone to wide screen.',
  'Reusable surfaces for telling stories, comparing things, and building trust.',
  'The polite interruptions: dialogs, drawers, banners, and helpful feedback.',
  'States that buy time gracefully while the real thing arrives.',
  'Patterns for pricing, products, carts, and the last mile to checkout.',
  'Dense, useful surfaces for the apps people use all day.',
];

const files = [
  '001-collapsible-sidebar.html',
  '002-sticky-mega-menu.html',
  '003-offcanvas-menu.html',
  '004-bottom-tab-bar.html',
  '005-scroll-header.html',
  '006-command-palette.html',
  '007-breadcrumbs-dropdown.html',
  '008-fab-menu.html',
  '009-vertical-tabs.html',
  '010-pagination-infinite-scroll.html',
  '011-otp-input.html',
  '012-multistep-form.html',
  '013-drag-drop-upload.html',
  '014-dual-range-slider.html',
  '015-searchable-dropdown.html',
  '016-password-meter.html',
  '017-masked-input.html',
  '018-floating-labels.html',
  '019-radio-cards.html',
  '020-auto-textarea.html',
  '021-magnetic-button.html',
  '022-liquid-fill-button.html',
  '023-text-scramble.html',
  '024-ripple-button.html',
  '025-3d-tilt-card.html',
  '026-morphing-submit.html',
  '027-back-to-top.html',
  '028-glow-button.html',
  '029-css-loader-button.html',
  '030-hold-to-confirm.html',
  '031-svg-line-chart.html',
  '032-css-bar-chart.html',
  '033-conic-donut-chart.html',
  '034-radial-progress.html',
  '035-heatmap.html',
  '036-sparklines.html',
  '037-stacked-area-chart.html',
  '038-liquid-gauge.html',
  '039-horizontal-progress.html',
  '040-radar-chart.html',
  '041-bento-grid.html',
  '042-masonry-layout.html',
  '043-split-screen-hero.html',
  '044-holy-grail.html',
  '045-grid-auto-fit.html',
  '046-sticky-sidebar.html',
  '047-container-queries.html',
  '048-centered-hero.html',
  '049-magazine-layout.html',
  '050-dashboard-layout.html',
  '051-glass-profile-card.html',
  '052-3d-pricing-table.html',
  '053-ecommerce-product-card.html',
  '054-testimonial-slider.html',
  '055-accordion-faq.html',
  '056-horizontal-snap-cards.html',
  '057-stats-card.html',
  '058-vertical-timeline.html',
  '059-comment-card.html',
  '060-author-bio-card.html',
  '061-centered-modal.html',
  '062-slide-in-drawer.html',
  '063-bottom-sheet.html',
  '064-popover.html',
  '065-toast-notifications.html',
  '066-cookie-banner.html',
  '067-fullscreen-overlay-menu.html',
  '068-image-lightbox.html',
  '069-confirmation-dialog.html',
  '070-css-tooltips.html',
  '071-skeleton-loader.html',
  '072-dual-ring-spinner.html',
  '073-indeterminate-progress.html',
  '074-bouncing-dots.html',
  '075-pulse-heart.html',
  '076-typing-indicator.html',
  '077-shimmer-text.html',
  '078-placeholder-shimmer.html',
  '079-snackbar-ui.html',
  '080-success-error-animations.html',
  '081-pricing-toggle.html',
  '082-cart-dropdown.html',
  '083-checkout-progress.html',
  '084-coupon-input.html',
  '085-quick-view-modal.html',
  '086-filter-sidebar.html',
  '087-wishlist-toggle.html',
  '088-star-rating.html',
  '089-color-size-selector.html',
  '090-floating-cart-button.html',
  '091-kanban-board.html',
  '092-interactive-data-table.html',
  '093-expanding-row-grid.html',
  '094-calendar-widget.html',
  '095-file-manager-ui.html',
  '096-email-client-ui.html',
  '097-chat-messaging-ui.html',
  '098-analytics-widgets.html',
  '099-settings-panel.html',
  '100-error-pages.html',
];

const categoryTags = [
  ['nav', 'responsive', 'a11y'],
  ['forms', 'inputs', 'validation'],
  ['motion', 'micro-ui', 'css'],
  ['charts', 'svg', 'data'],
  ['layout', 'responsive', 'css'],
  ['content', 'cards', 'responsive'],
  ['feedback', 'overlays', 'interaction'],
  ['loading', 'states', 'css'],
  ['commerce', 'ecommerce', 'interaction'],
  ['dashboard', 'product', 'dense-ui'],
];

const titleOverrides: Record<string, string> = {
  '3d-tilt-card': '3D Tilt Card',
  '3d-pricing-table': '3D Pricing Table',
  'svg-line-chart': 'SVG Line Chart',
  'css-bar-chart': 'CSS Bar Chart',
  'css-loader-button': 'CSS Loader Button',
  'css-tooltips': 'CSS Tooltips',
  'otp-input': 'OTP Input',
  'fab-menu': 'FAB Menu',
  'ui': 'UI',
};

function prettifyFile(file: string) {
  const slug = file.replace(/^\d+-/, '').replace('.html', '');
  if (titleOverrides[slug]) return titleOverrides[slug];
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const components: ComponentItem[] = files.map((file, index) => {
  const category = Math.floor(index / 10) + 1;
  const slug = file.replace(/^\d+-/, '').replace('.html', '');
  return {
    id: index + 1,
    file,
    title: prettifyFile(file),
    category,
    categoryName: categoryNames[category - 1],
    description: `${categoryDetails[category - 1]} ${slug.split('-').join(' ')} with no build step.`,
    tags: categoryTags[category - 1],
    sourcePath: `/components/category-${category}/${file}`,
  };
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <RoutedErrorBoundary>
            <Switch>
              <Route path="/" component={LibraryHome} />
              <Route component={NotFound} />
            </Switch>
          </RoutedErrorBoundary>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function LibraryHome() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('frontend-library-favorites') ?? '[]') as number[];
    } catch {
      return [];
    }
  });
  const [selected, setSelected] = useState<ComponentItem | null>(null);
  const [randomPulse, setRandomPulse] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('frontend-library-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === 'Escape') {
        setSelected(null);
        setMobileNavOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    return components.filter((component) => {
      const matchesCategory = activeCategory === 0 || component.category === activeCategory;
      const matchesQuery =
        !normalized ||
        [component.title, component.categoryName, component.description, ...component.tags]
          .join(' ')
          .toLowerCase()
          .includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const toggleFavorite = (id: number) => {
    setFavorites((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const chooseRandom = () => {
    const pool = filtered.length ? filtered : components;
    const item = pool[Math.floor(Math.random() * pool.length)];
    setRandomPulse(true);
    setTimeout(() => setRandomPulse(false), 500);
    setSelected(item);
  };

  const jumpToCategory = (category: number) => {
    setActiveCategory(category);
    setMobileNavOpen(false);
    document.getElementById('browse')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="library-shell library-noise">
      <div className="flex min-h-[100dvh]">
        <Sidebar
          activeCategory={activeCategory}
          favoritesCount={favorites.length}
          mobileOpen={mobileNavOpen}
          onCategory={jumpToCategory}
          onClose={() => setMobileNavOpen(false)}
        />

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 flex h-[74px] items-center justify-between border-b bg-[rgba(245,240,232,.88)] px-5 backdrop-blur-xl md:px-10" style={{ borderColor: 'var(--line)' }}>
            <div className="flex items-center gap-3">
              <button
                className="grid size-10 place-items-center rounded-xl border bg-[rgba(255,252,247,.7)] md:hidden"
                style={{ borderColor: 'var(--line)' }}
                onClick={() => setMobileNavOpen(true)}
                aria-label="Open library navigation"
                data-testid="button-open-navigation"
              >
                <Menu size={19} />
              </button>
              <div className="hidden items-center gap-2 text-sm font-semibold md:flex">
                <span className="size-2 rounded-full bg-[var(--coral)]" />
                Catalog <span className="font-normal text-[#77777d]">/ All components</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold md:hidden">
                <span className="display tracking-[-.04em]">FIELD / 26</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={chooseRandom}
                className={`hidden items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition hover:-translate-y-0.5 hover:bg-white sm:flex ${randomPulse ? 'bg-[#f5cf72]' : 'bg-[rgba(255,252,247,.7)]'}`}
                style={{ borderColor: 'var(--line)' }}
                data-testid="button-surprise-me"
              >
                <Sparkles size={14} /> Surprise me
              </button>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="grid size-9 place-items-center rounded-xl border bg-[rgba(255,252,247,.7)] transition hover:-translate-y-0.5 hover:bg-white"
                style={{ borderColor: 'var(--line)' }}
                aria-label="Open source repository"
                data-testid="link-github"
              >
                <Github size={16} />
              </a>
            </div>
          </header>

          <div className="mx-auto max-w-[1520px] px-5 pb-20 md:px-10 xl:px-14">
            <section className="relative overflow-hidden border-b py-12 md:py-20" style={{ borderColor: 'var(--line)' }}>
              <div className="pointer-events-none absolute -right-8 top-2 hidden h-56 w-56 rounded-full border-[1.5px] border-dashed border-[#d9a88c] lg:block" />
              <div className="pointer-events-none absolute right-8 top-16 hidden h-28 w-28 rounded-full bg-[#f4ca72]/60 lg:block" />
              <div className="relative max-w-5xl">
                <div className="fade-up mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.2em] text-[var(--moss)]">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#397d6a]/25 bg-[#397d6a]/[.07] px-3 py-1.5">
                    <Zap size={12} fill="currentColor" /> Edition 01 / 2026
                  </span>
                  <span className="text-[#92918e]">Built for the curious</span>
                </div>
                <h1 className="display fade-up fade-up-delay-1 max-w-4xl text-[clamp(3.2rem,8vw,8.2rem)] font-extrabold leading-[.88] tracking-[-.08em]">
                  The frontend
                  <br />
                  <span className="text-[var(--coral)]">field guide.</span>
                </h1>
                <div className="fade-up fade-up-delay-2 mt-8 flex max-w-3xl flex-col justify-between gap-8 md:flex-row md:items-end">
                  <p className="max-w-md text-[15px] leading-7 text-[#666770]">
                    One hundred complete, copy-ready interface pieces. Browse the raw HTML, see it run, and take the useful bit with you.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-[#74747a]">
                    <span className="mono rounded-md bg-[#242a3b] px-2 py-1 text-[11px] text-[#f5f0e8]">HTML</span>
                    <span className="mono rounded-md bg-[var(--coral)] px-2 py-1 text-[11px] text-white">CSS</span>
                    <span className="mono rounded-md bg-[var(--moss)] px-2 py-1 text-[11px] text-white">JS</span>
                    <span>zero dependencies</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-2 gap-4 border-b py-6 md:grid-cols-4 md:gap-0" style={{ borderColor: 'var(--line)' }}>
              <Metric value="100" label="standalone components" accent="coral" />
              <Metric value="10" label="focused categories" accent="moss" />
              <Metric value="0" label="build steps required" accent="sun" />
              <Metric value={String(favorites.length).padStart(2, '0')} label="saved to your shelf" accent="ink" />
            </section>

            <section className="py-10 md:py-14">
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <p className="mono mb-2 text-[10px] uppercase tracking-[.16em] text-[#a06a57]">A good place to start</p>
                  <h2 className="display text-3xl font-bold tracking-[-.06em] md:text-4xl">Fresh on the shelf</h2>
                </div>
                <button onClick={() => jumpToCategory(0)} className="group hidden items-center gap-1 text-xs font-semibold text-[#6a6b72] hover:text-[var(--coral)] sm:flex" data-testid="button-view-all">
                  View all <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {components.slice(0, 4).map((component, index) => (
                  <FeaturedCard key={component.id} component={component} index={index} onOpen={setSelected} />
                ))}
              </div>
            </section>

            <section id="browse" className="scroll-mt-24 border-t pt-10 md:pt-14" style={{ borderColor: 'var(--line)' }}>
              <div className="mb-7 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
                <div>
                  <p className="mono mb-2 text-[10px] uppercase tracking-[.16em] text-[#a06a57]">The complete index</p>
                  <h2 className="display text-3xl font-bold tracking-[-.06em] md:text-4xl">Browse the library</h2>
                  <p className="mt-2 text-sm text-[#77777d]">
                    {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'} in view
                    {query ? ` matching “${query}”` : ''}
                  </p>
                </div>
                <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-auto">
                  <label className="relative block min-w-0 flex-1 sm:min-w-[310px]">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#88878a]" size={17} />
                    <input
                      ref={searchRef}
                      type="search"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search components, tags..."
                      className="h-11 w-full rounded-xl border bg-[#fffdf8] pl-10 pr-14 text-sm shadow-[0_4px_18px_rgba(52,44,37,.04)] placeholder:text-[#aaa7a2]"
                      style={{ borderColor: 'var(--line)' }}
                      aria-label="Search components"
                      data-testid="input-search-components"
                    />
                    <span className="mono pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-[#ded9d0] bg-[#f4efe7] px-1.5 py-0.5 text-[10px] text-[#96918b] sm:block">/</span>
                  </label>
                  <button
                    onClick={() => setQuery('')}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border bg-[#fffdf8] px-4 text-xs font-semibold text-[#77777d] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                    style={{ borderColor: 'var(--line)' }}
                    disabled={!query}
                    data-testid="button-clear-search"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-7 lg:flex-row">
                <CategoryRail activeCategory={activeCategory} onCategory={jumpToCategory} />
                <div className="min-w-0 flex-1">
                  {filtered.length ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {filtered.map((component, index) => (
                        <ComponentCard
                          key={component.id}
                          component={component}
                          index={index}
                          favorite={favorites.includes(component.id)}
                          onFavorite={() => toggleFavorite(component.id)}
                          onOpen={() => setSelected(component)}
                        />
                      ))}
                    </div>
                  ) : (
                    <EmptyState query={query} onReset={() => { setQuery(''); setActiveCategory(0); }} />
                  )}
                </div>
              </div>
            </section>

            <footer className="mt-20 flex flex-col gap-4 border-t py-8 text-xs text-[#898783] sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: 'var(--line)' }}>
              <div className="flex items-center gap-2 font-semibold text-[#4a4c56]"><span className="grid size-6 place-items-center rounded-md bg-[var(--coral)] text-[10px] font-bold text-white">F</span> The 2026 Ultimate Frontend Library</div>
              <div className="flex items-center gap-4"><span>Made for the source-viewers</span><span className="mono text-[10px]">v1.0.0</span></div>
            </footer>
          </div>
        </main>
      </div>

      {selected && (
        <ComponentDrawer
          component={selected}
          favorite={favorites.includes(selected.id)}
          onFavorite={() => toggleFavorite(selected.id)}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

function Sidebar({
  activeCategory,
  favoritesCount,
  mobileOpen,
  onCategory,
  onClose,
}: {
  activeCategory: number;
  favoritesCount: number;
  mobileOpen: boolean;
  onCategory: (category: number) => void;
  onClose: () => void;
}) {
  return (
    <>
      {mobileOpen && <button className="fixed inset-0 z-40 bg-[#242a3b]/35 backdrop-blur-sm md:hidden" onClick={onClose} aria-label="Close navigation overlay" data-testid="button-close-navigation-overlay" />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[268px] flex-col border-r bg-[#242a3b] text-[#f7f1e8] transition-transform duration-300 md:sticky md:top-0 md:z-20 md:h-[100dvh] md:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ borderColor: 'rgba(245,240,232,.13)' }}>
        <div className="flex h-[74px] items-center justify-between border-b px-6" style={{ borderColor: 'rgba(245,240,232,.13)' }}>
          <div className="flex items-center gap-3">
            <div className="display grid size-9 place-items-center rounded-[10px] bg-[var(--coral)] text-base font-bold text-white shadow-[5px_5px_0_#d34f39]">F</div>
            <div><div className="display text-[15px] font-bold tracking-[-.04em]">FIELD / 26</div><div className="mono mt-0.5 text-[9px] uppercase tracking-[.16em] text-[#a4a8b1]">Frontend index</div></div>
          </div>
          <button className="grid size-8 place-items-center rounded-lg text-[#a4a8b1] hover:bg-white/10 hover:text-white md:hidden" onClick={onClose} aria-label="Close library navigation" data-testid="button-close-navigation"><X size={17} /></button>
        </div>
        <div className="scrollbar-thin flex-1 overflow-y-auto px-4 py-6">
          <div className="mb-3 flex items-center justify-between px-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#8f949e]"><span>Index</span><span className="mono">01—10</span></div>
          <nav className="space-y-1" aria-label="Component categories">
            <button onClick={() => onCategory(0)} className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] transition ${activeCategory === 0 ? 'bg-[#f5f0e8] font-semibold text-[#242a3b]' : 'text-[#b9bdc5] hover:bg-white/[.08] hover:text-white'}`} data-testid="nav-category-all">
              <Grid2X2 size={16} className={activeCategory === 0 ? 'text-[var(--coral)]' : ''} /><span>All components</span><span className={`mono ml-auto text-[10px] ${activeCategory === 0 ? 'text-[#85858a]' : 'text-[#7e838d]'}`}>100</span>
            </button>
            {categoryNames.map((name, index) => (
              <button key={name} onClick={() => onCategory(index + 1)} className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] transition ${activeCategory === index + 1 ? 'bg-[#f5f0e8] font-semibold text-[#242a3b]' : 'text-[#b9bdc5] hover:bg-white/[.08] hover:text-white'}`} data-testid={`nav-category-${index + 1}`}>
                <span className={`mono w-4 text-[10px] ${activeCategory === index + 1 ? 'text-[var(--coral)]' : 'text-[#727985]'}`}>{String(index + 1).padStart(2, '0')}</span><span className="truncate">{name}</span><span className={`mono ml-auto text-[10px] ${activeCategory === index + 1 ? 'text-[#85858a]' : 'text-[#7e838d]'}`}>10</span>
              </button>
            ))}
          </nav>
          <div className="my-7 h-px bg-white/[.1]" />
          <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#8f949e]">Your shelf</div>
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] text-[#b9bdc5] transition hover:bg-white/[.08] hover:text-white" onClick={() => onCategory(0)} data-testid="button-show-saved">
            <Heart size={16} className="text-[#ec684d]" /><span>Saved pieces</span><span className="mono ml-auto text-[10px] text-[#7e838d]">{String(favoritesCount).padStart(2, '0')}</span>
          </button>
        </div>
        <div className="border-t p-4" style={{ borderColor: 'rgba(245,240,232,.13)' }}>
          <div className="flex items-center gap-3 rounded-xl bg-white/[.06] p-3"><div className="grid size-8 place-items-center rounded-lg bg-[#f1c45c] text-xs font-bold text-[#242a3b]">?</div><div className="min-w-0"><div className="text-xs font-semibold">Need a shortcut?</div><div className="mt-0.5 text-[10px] text-[#8f949e]">Press <span className="mono">/</span> to search</div></div><Keyboard size={14} className="ml-auto text-[#8f949e]" /></div>
        </div>
      </aside>
    </>
  );
}

function Metric({ value, label, accent }: { value: string; label: string; accent: 'coral' | 'moss' | 'sun' | 'ink' }) {
  const color = accent === 'coral' ? 'var(--coral)' : accent === 'moss' ? 'var(--moss)' : accent === 'sun' ? '#b47b24' : 'var(--ink-deep)';
  return <div className="border-r-0 py-2 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0" style={{ borderColor: 'var(--line)' }}><div className="display text-3xl font-bold tracking-[-.07em] md:text-4xl" style={{ color }}>{value}</div><div className="mt-1 text-[11px] text-[#85838a]">{label}</div></div>;
}

function CategoryRail({ activeCategory, onCategory }: { activeCategory: number; onCategory: (category: number) => void }) {
  return (
    <div className="lg:w-[220px] lg:flex-none">
      <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#98948c] lg:px-2"><Filter size={13} /> Filter by category</div>
      <div className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-1 lg:overflow-visible">
        <button onClick={() => onCategory(0)} className={`whitespace-nowrap rounded-lg px-3 py-2 text-left text-xs font-semibold transition lg:block lg:w-full ${activeCategory === 0 ? 'bg-[#242a3b] text-[#f5f0e8]' : 'text-[#79797d] hover:bg-[#ebe4da] hover:text-[#242a3b]'}`} data-testid="filter-category-all">All components <span className="mono ml-1 text-[10px] opacity-60">100</span></button>
        {categoryNames.map((name, index) => <button key={name} onClick={() => onCategory(index + 1)} className={`whitespace-nowrap rounded-lg px-3 py-2 text-left text-xs transition lg:block lg:w-full ${activeCategory === index + 1 ? 'bg-[#242a3b] font-semibold text-[#f5f0e8]' : 'text-[#79797d] hover:bg-[#ebe4da] hover:text-[#242a3b]'}`} data-testid={`filter-category-${index + 1}`}>{String(index + 1).padStart(2, '0')} <span className="ml-1">{name}</span></button>)}
      </div>
    </div>
  );
}

function FeaturedCard({ component, index, onOpen }: { component: ComponentItem; index: number; onOpen: (component: ComponentItem) => void }) {
  return (
    <button onClick={() => onOpen(component)} className="group overflow-hidden rounded-2xl border bg-[#fffdf8] text-left shadow-[0_8px_28px_rgba(52,44,37,.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(52,44,37,.12)]" style={{ borderColor: 'var(--line)' }} data-testid={`card-featured-${component.id}`}>
      <div className="relative h-36 overflow-hidden border-b bg-[#ebe5dc]" style={{ borderColor: 'var(--line)' }}>
        <iframe src={component.sourcePath} title={`${component.title} live preview`} loading="lazy" sandbox="allow-scripts" className="pointer-events-none absolute left-0 top-0 h-[400%] w-[400%] origin-top-left scale-[.25] border-0" />
        <div className="absolute left-3 top-3 rounded-md bg-[#f5f0e8]/90 px-2 py-1 mono text-[9px] text-[#62616a] backdrop-blur">{String(component.id).padStart(3, '0')}</div>
        <span className="absolute bottom-3 right-3 grid size-8 place-items-center rounded-full bg-[#f5f0e8] text-[#242a3b] opacity-0 shadow-sm transition group-hover:opacity-100"><ArrowUpRight size={15} /></span>
      </div>
      <div className="p-4"><div className="mb-2 flex items-center justify-between gap-2"><span className="mono text-[9px] uppercase tracking-[.12em] text-[var(--coral)]">{component.categoryName}</span><ChevronRight size={14} className="text-[#a4a19d] transition group-hover:translate-x-1" /></div><h3 className="font-semibold tracking-[-.02em]">{component.title}</h3><p className="mt-1 line-clamp-1 text-xs text-[#88868a]">{index === 0 ? 'A strong first impression.' : 'Worth keeping close.'}</p></div>
    </button>
  );
}

function ComponentCard({ component, index, favorite, onFavorite, onOpen }: { component: ComponentItem; index: number; favorite: boolean; onFavorite: () => void; onOpen: () => void }) {
  const [loaded, setLoaded] = useState(true);
  return (
    <article className="group overflow-hidden rounded-2xl border bg-[#fffdf8] shadow-[0_5px_18px_rgba(52,44,37,.035)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(52,44,37,.1)]" style={{ borderColor: 'var(--line)' }} data-testid={`card-component-${component.id}`}>
      <div className="relative h-[190px] overflow-hidden border-b bg-[#eae4db]" style={{ borderColor: 'var(--line)' }}>
        {!loaded && <div className="skeleton absolute inset-0" />}
        {loaded && <iframe src={component.sourcePath} title={`${component.title} live preview`} loading="lazy" sandbox="allow-scripts" onLoad={() => setLoaded(true)} className="pointer-events-none absolute left-0 top-0 h-[420%] w-[420%] origin-top-left scale-[.238] border-0" />}
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-md bg-[#f5f0e8]/90 px-2 py-1 backdrop-blur"><span className="size-1.5 rounded-full bg-[var(--moss)]" /><span className="mono text-[9px] text-[#686871]">LIVE</span></div>
        <button onClick={onFavorite} className={`absolute right-3 top-3 z-20 grid size-8 place-items-center rounded-lg border backdrop-blur transition ${favorite ? 'border-[#ec684d]/30 bg-[#ec684d] text-white' : 'border-[#242a3b]/10 bg-[#f5f0e8]/90 text-[#77777d] hover:bg-white hover:text-[var(--coral)]'}`} aria-label={favorite ? `Remove ${component.title} from saved pieces` : `Save ${component.title}`} data-testid={`button-favorite-${component.id}`}><Heart size={14} fill={favorite ? 'currentColor' : 'none'} /></button>
        <button onClick={onOpen} className="absolute inset-0 z-10 cursor-zoom-in" aria-label={`Open ${component.title} preview`} data-testid={`button-open-component-${component.id}`} />
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between gap-2"><span className="mono text-[9px] uppercase tracking-[.11em] text-[var(--coral)]">{String(component.id).padStart(3, '0')} / {component.categoryName}</span><span className="text-[#b0aca4] opacity-0 transition group-hover:opacity-100"><ArrowUpRight size={15} /></span></div>
        <h3 className="font-semibold tracking-[-.025em]">{component.title}</h3>
        <p className="mt-1.5 line-clamp-2 min-h-[34px] text-xs leading-5 text-[#85848a]">{component.description}</p>
        <div className="mt-4 flex items-center gap-1.5">{component.tags.map((tag) => <span key={tag} className="rounded-md bg-[#f0ebe4] px-1.5 py-1 mono text-[9px] text-[#85817c]">#{tag}</span>)}</div>
      </div>
    </article>
  );
}

function EmptyState({ query, onReset }: { query: string; onReset: () => void }) {
  return <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed bg-[#fffaf3] px-6 text-center" style={{ borderColor: 'rgba(36,42,59,.22)' }}><div className="mb-5 grid size-14 place-items-center rounded-2xl bg-[#f1c45c]/40 text-[#8c6723]"><Search size={22} /></div><h3 className="display text-xl font-bold tracking-[-.04em]">Nothing in this drawer.</h3><p className="mt-2 max-w-sm text-sm leading-6 text-[#85848a]">{query ? `No component matches “${query}”. Try a broader phrase or reset the index.` : 'This category is taking a quiet moment.'}</p><button onClick={onReset} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#242a3b] px-4 py-2.5 text-xs font-semibold text-[#f5f0e8] transition hover:-translate-y-0.5 hover:bg-[#30374d]" data-testid="button-empty-reset"><RotateCcw size={14} /> Reset browse</button></div>;
}

function ComponentDrawer({ component, favorite, onFavorite, onClose }: { component: ComponentItem; favorite: boolean; onFavorite: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-[#242a3b]/45 p-0 backdrop-blur-sm sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={`${component.title} details`}>
      <button className="absolute inset-0 cursor-default" onClick={onClose} aria-label="Close component details" data-testid="button-close-drawer-overlay" />
      <div className="relative z-10 flex h-[92dvh] w-full max-w-6xl flex-col overflow-hidden rounded-t-[24px] border bg-[#f7f2ea] shadow-[0_30px_100px_rgba(28,30,42,.3)] sm:h-[88dvh] sm:rounded-[24px]" style={{ borderColor: 'var(--line)' }}>
        <header className="flex flex-wrap items-center justify-between gap-4 border-b px-5 py-4 md:px-7" style={{ borderColor: 'var(--line)' }}>
          <div className="flex min-w-0 items-center gap-3"><div className="mono rounded-md bg-[#242a3b] px-2 py-1 text-[10px] text-[#f5f0e8]">{String(component.id).padStart(3, '0')}</div><div className="min-w-0"><h2 className="display truncate text-lg font-bold tracking-[-.04em] md:text-xl">{component.title}</h2><p className="truncate text-xs text-[#85848a]">{component.categoryName} <span className="mx-1">·</span> standalone HTML file</p></div></div>
          <div className="flex items-center gap-2"><button onClick={onFavorite} className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition ${favorite ? 'border-[#ec684d]/30 bg-[#ec684d] text-white' : 'bg-[#fffdf8] text-[#6f7078] hover:text-[var(--coral)]'}`} style={{ borderColor: favorite ? undefined : 'var(--line)' }} data-testid="button-drawer-favorite"><Heart size={14} fill={favorite ? 'currentColor' : 'none'} /><span className="hidden sm:inline">{favorite ? 'Saved' : 'Save'}</span></button><a href={GUMROAD_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border bg-[#242a3b] px-3 py-2 text-xs font-semibold text-[#f5f0e8] transition hover:bg-[#30374d]" style={{ borderColor: 'var(--line)' }} aria-label="Get the source code on Gumroad" data-testid="link-get-source-code"><Code2 size={14} /><span>Get Source Code</span></a><button onClick={onClose} className="grid size-9 place-items-center rounded-lg border bg-[#fffdf8] text-[#6f7078] transition hover:bg-[#242a3b] hover:text-white" style={{ borderColor: 'var(--line)' }} aria-label="Close component details" data-testid="button-close-drawer"><X size={17} /></button></div>
        </header>
        <div className="flex items-center justify-between gap-4 border-b px-5 py-3 md:px-7" style={{ borderColor: 'var(--line)' }}>
          <div className="inline-flex items-center gap-2 rounded-lg border bg-[#fffdf8] px-3 py-2 text-xs font-semibold text-[#242a3b]" style={{ borderColor: 'var(--line)' }}><Eye size={14} /> Live preview</div>
          <div className="hidden items-center gap-2 text-[10px] text-[#918e89] sm:flex"><span className="size-1.5 rounded-full bg-[var(--moss)]" /> interactive preview <span className="mx-1 text-[#c2bdb4]">·</span> source code available on Gumroad</div>
        </div>
        <div className="min-h-0 flex-1 bg-[#e7e0d6] p-3 md:p-5">
          <div className="relative h-full overflow-hidden rounded-xl border bg-[#fbf8f2] shadow-inner" style={{ borderColor: 'rgba(36,42,59,.15)' }}><iframe src={component.sourcePath} title={`${component.title} interactive preview`} sandbox="allow-scripts allow-forms" className="h-full w-full border-0" /></div>
        </div>
        <footer className="flex items-center justify-between gap-4 border-t px-5 py-3 text-[11px] text-[#85848a] md:px-7" style={{ borderColor: 'var(--line)' }}><span className="truncate">{component.description}</span><a href={GUMROAD_URL} target="_blank" rel="noreferrer" className="mono shrink-0 text-[10px] text-[var(--coral)] transition hover:underline" data-testid="footer-get-source-code">GET SOURCE CODE ↗</a></footer>
      </div>
    </div>
  );
}

function NotFound() {
  return <div className="grid min-h-[100dvh] place-items-center bg-[#f5f0e8] px-6 text-center"><div><div className="display text-7xl font-bold text-[var(--coral)]">404</div><h1 className="mt-4 text-2xl font-semibold">That page wandered off.</h1><a href="/" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#242a3b] px-4 py-3 text-sm font-semibold text-[#f5f0e8]" data-testid="link-back-to-index">Back to the index <ArrowUpRight size={15} /></a></div></div>;
}

export default App;