import * as data from './data/index.js';
import { Nav } from './components/Nav.js';
import { Hero } from './components/Hero.js';
import { Footer, BackToTop } from './components/Footer.js';
import { PositioningSection } from './sections/PositioningSection.js';
import { InteractiveSection } from './sections/InteractiveSection.js';
import { AnalysisSection } from './sections/AnalysisSection.js';
import { OverviewSection } from './sections/OverviewSection.js';
import { DataModelSection } from './sections/DataModelSection.js';
import { ArchitectureSection } from './sections/ArchitectureSection.js';
import { GlossarySection } from './sections/GlossarySection.js';
import { MerchantSection } from './sections/MerchantSection.js';
import { BuyerSection } from './sections/BuyerSection.js';
import { EngineSection } from './sections/EngineSection.js';
import { AdminSection } from './sections/AdminSection.js';
import { FlowSection } from './sections/FlowSection.js';
import { PrdIssuesSection } from './sections/PrdIssuesSection.js';
import { TechStackSection } from './sections/TechStackSection.js';
import { DesignSection } from './sections/DesignSection.js';
import { NfrSection } from './sections/NfrSection.js';
import { AcceptanceSection } from './sections/AcceptanceSection.js';
import { initScrollSpy, initNavScroll, initBackToTop, initReveal } from './utils/scroll.js';
import { initMobileNav } from './utils/mobileNav.js';

const SECTION_RENDERERS = [
  () => PositioningSection(data.positioning),
  () => InteractiveSection(),
  () => AnalysisSection(data.analysis),
  () => OverviewSection(data.overview),
  () => GlossarySection(data.glossary),
  () => DataModelSection(data.datamodel),
  () => ArchitectureSection(data.architecture),
  () => MerchantSection(data.merchant),
  () => BuyerSection(data.buyer),
  () => EngineSection(data.engine),
  () => AdminSection(data.admin),
  () => FlowSection(data.flow),
  () => PrdIssuesSection(data.prdIssues),
  () => TechStackSection(data.techstack),
  () => DesignSection(data.design),
  () => NfrSection(data.nfr),
  () => AcceptanceSection(data.acceptance),
];

/** Bootstrap the PRD site into #app. */
export function mountApp() {
  const root = document.getElementById('app');
  if (!root) throw new Error('Missing #app mount point');

  const nav = Nav({ links: data.navigation });
  const backToTop = BackToTop();

  root.append(
    nav,
    Hero(data.hero),
    ...SECTION_RENDERERS.map((render) => render()),
    Footer(),
    backToTop
  );

  initMobileNav(nav);
  initNavScroll(nav);
  initScrollSpy(nav);
  initBackToTop(backToTop);
  initReveal();
}
