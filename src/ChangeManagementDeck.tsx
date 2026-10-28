import { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { PALETTE } from './palette';
import MonitorIcon from '@zendeskgarden/svg-icons/src/16/monitor-stroke.svg?react';
import ClockIcon from '@zendeskgarden/svg-icons/src/16/clock-stroke.svg?react';
import UserGroupIcon from '@zendeskgarden/svg-icons/src/16/user-group-stroke.svg?react';
import ArrowReverseIcon from '@zendeskgarden/svg-icons/src/16/arrow-reverse-stroke.svg?react';
import AlertWarningIcon from '@zendeskgarden/svg-icons/src/16/alert-warning-stroke.svg?react';
import TrendingIcon from '@zendeskgarden/svg-icons/src/16/arrow-trending-stroke.svg?react';
import ZendeskIcon from '@zendeskgarden/svg-icons/src/16/zendesk-stroke.svg?react';
import ZendeskMark from '@zendeskgarden/svg-icons/src/16/zendesk-fill.svg?react';
import GearIcon from '@zendeskgarden/svg-icons/src/16/gear-stroke.svg?react';
import HeadsetIcon from '@zendeskgarden/svg-icons/src/16/headset-stroke.svg?react';
import SparkleIcon from '@zendeskgarden/svg-icons/src/16/sparkle-stroke.svg?react';
import ImageIcon from '@zendeskgarden/svg-icons/src/16/image-stroke.svg?react';
import NewWindowIcon from '@zendeskgarden/svg-icons/src/16/new-window-stroke.svg?react';
import ChevronLeftIcon from '@zendeskgarden/svg-icons/src/16/chevron-left-stroke.svg?react';
import ChevronRightIcon from '@zendeskgarden/svg-icons/src/16/chevron-right-stroke.svg?react';
import ChevronUpIcon from '@zendeskgarden/svg-icons/src/16/chevron-up-stroke.svg?react';
import incidentArt from './assets/metaphor-incident.png';
import roadworkArt from './assets/metaphor-roadwork.png';
import authorPhoto from './assets/sourabh.png';
import adminShot from './assets/shot-admin-playbooks.png';
import agentShot from './assets/shot-agent-request.png';
import blueprintShot from './assets/shot-service-blueprint.png';

// ─────────────────────────────────────────────────────────────────────────────
// Change Management deck.
//
// Styling follows the reference slides: a dark green statement panel on the
// left with a chevron pointing into a white pane of supporting points, lime
// highlight blocks for emphasis, and lime circles behind the point icons.
//
// The dark green and the lime have no close equivalent in the Flora ramps
// (nearest are grey[900] and yellow[300], both clearly off), so they are
// pinned here from the reference artwork. Every other colour is a Flora token.
//
// Responsiveness
// --------------
// A slide is a fixed composition, so on anything tablet sized and up the whole
// 16:9 frame fills the viewport and scales instead of reflowing: `--u` is one
// design pixel, derived from the stage width, and every size inside a slide is
// written as a multiple of it. The frame is capped by whichever runs out
// first, the viewport width or the viewport height, so a slide always renders
// edge to edge and never scrolls or clips. Navigation floats over the slide in
// a small pill so it works at any size.
//
// Below MOBILE the scaling stops (`--u` becomes a real pixel), the aspect lock
// is dropped and the slides stack into a single readable column.
// ─────────────────────────────────────────────────────────────────────────────

const DECK = {
  panel: '#253526',
  accent: '#d8f382',
  accentSoft: '#f7fce9',
  ink: '#11110d',
};

// The width the slides were designed at. `--u` is 1/1180th of the stage width,
// so every `u(n)` below is exactly n pixels when the stage is at design size.
const DESIGN_WIDTH = 1180;

const u = (n: number) => `calc(${n} * var(--u))`;

const MOBILE = '@media (max-width: 720px)';

// ── Shell ────────────────────────────────────────────────────────────────────

const DeckShell = styled.div`
  min-height: 100dvh;
  background: ${PALETTE.grey[100]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  ${MOBILE} {
    justify-content: flex-start;
    padding: 0 0 96px;
  }
`;

// Fullscreen: sized by whichever runs out first, the viewport width or the
// viewport height, so the stage always fills the screen at 16:9.
const Frame = styled.div`
  width: min(100vw, calc(100dvh * 16 / 9));

  ${MOBILE} {
    width: 100%;
  }
`;

const Stage = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  container-type: inline-size;
  background: ${PALETTE.white};
  overflow: hidden;
  display: flex;

  ${MOBILE} {
    aspect-ratio: auto;
    container-type: normal;
  }
`;

// Holds the design unit. It lives on a child of the stage because container
// query units resolve against an ancestor container, never the element itself.
const Slide = styled.div`
  --u: calc(100cqw / ${DESIGN_WIDTH});
  flex: 1;
  min-width: 0;
  display: flex;

  ${MOBILE} {
    --u: 1px;
    flex-direction: column;
  }
`;

// ── Split layout: dark statement panel + white pane of points ────────────────

const Panel = styled.div`
  flex: 0 0 43%;
  box-sizing: border-box;
  background: ${DECK.panel};
  padding: ${u(46)} ${u(42)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${u(22)};
  position: relative;

  ${MOBILE} {
    flex: none;
    padding: 28px 20px;
    gap: 16px;
  }
`;

// The chevron that pushes out of the panel into the white pane. It only makes
// sense while the panel and the pane sit side by side.
const PanelPoint = styled.div`
  position: absolute;
  top: 50%;
  right: ${u(-34)};
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: ${u(42)} solid transparent;
  border-bottom: ${u(42)} solid transparent;
  border-left: ${u(34)} solid ${DECK.panel};

  ${MOBILE} {
    display: none;
  }
`;

const PanelTitle = styled.h1`
  font-size: ${u(34)};
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: ${u(-0.3)};
  color: ${PALETTE.white};
  margin: 0;

  ${MOBILE} {
    font-size: 26px;
  }
`;

const PanelText = styled.p`
  font-size: ${u(16)};
  line-height: 1.55;
  color: ${PALETTE.white};
  margin: 0;
`;

// Lime highlight. box-decoration-break keeps the block on every wrapped line,
// which is what gives the reference its stacked-marker look.
const Mark = styled.span`
  background: ${DECK.accent};
  color: ${DECK.panel};
  font-weight: 700;
  padding: ${u(1)} ${u(7)};
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
`;

const MarkBlock = styled.p<{ $tight?: boolean }>`
  font-size: ${u(16)};
  font-weight: 700;
  line-height: 2;
  margin: ${p => (p.$tight ? `${u(6)} 0 ${u(14)}` : '0')};
`;

const Pane = styled.div`
  flex: 1;
  box-sizing: border-box;
  padding: ${u(46)} ${u(44)} ${u(46)} ${u(54)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${u(24)};
  min-width: 0;

  ${MOBILE} {
    padding: 24px 20px 32px;
    gap: 18px;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${u(18)};
`;

const Bubble = styled.div`
  width: ${u(52)};
  height: ${u(52)};
  border-radius: 50%;
  flex-shrink: 0;
  background: ${DECK.accent};
  color: ${DECK.ink};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: ${u(22)};
    height: ${u(22)};
  }
`;

// Slide 2 puts each half of the metaphor in its own card, same treatment as the
// earlier deck: hairline border with a 3px accent bar across the top. Red marks
// the unplanned reaction, green the planned work.
const ItemCard = styled.div<{ $accent: string }>`
  border: 1px solid ${PALETTE.grey[200]};
  border-top: ${u(3)} solid ${p => p.$accent};
  border-radius: ${u(8)};
  padding: ${u(16)} ${u(18)};
  background: ${PALETTE.white};
  display: flex;
  align-items: flex-start;
  gap: ${u(16)};
`;

// Slide 2 uses the supplied illustrations in place of an icon bubble.
const ArtBubble = styled.div`
  width: ${u(62)};
  height: ${u(52)};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const ItemBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${u(3)};
  min-width: 0;
`;

const ItemTitle = styled.div<{ $lg?: boolean }>`
  font-size: ${p => u(p.$lg ? 16 : 15)};
  font-weight: 700;
  line-height: 1.4;
  color: ${DECK.ink};
`;

const ItemText = styled.div`
  font-size: ${u(14)};
  line-height: 1.5;
  color: ${PALETTE.grey[800]};
`;

// The roadwork crew's plan, listed vertically so each requirement reads as its
// own line rather than disappearing into a sentence.
const PlanList = styled.ul`
  list-style: none;
  margin: ${u(7)} 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${u(6)};
`;

const PlanItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${u(8)};
  font-size: ${u(13.5)};
  line-height: 1.45;
  color: ${PALETTE.grey[800]};

  svg {
    width: ${u(13)};
    height: ${u(13)};
    flex-shrink: 0;
    margin-top: ${u(3)};
    color: ${DECK.panel};
  }
`;

const PlanStrong = styled.span`
  font-weight: 700;
  color: ${DECK.ink};
`;

// Slide 4 cards (horizontal trio with chevrons, third card highlighted green).
const CardsRow = styled.div`
  display: flex;
  align-items: stretch;
  gap: ${u(18)};
  margin-top: ${u(8)};

  ${MOBILE} {
    flex-direction: column;
  }
`;

const CardChevron = styled.span`
  align-self: center;
  display: inline-flex;
  flex-shrink: 0;
  color: ${PALETTE.grey[400]};

  svg {
    width: ${u(16)};
    height: ${u(16)};
  }

  ${MOBILE} {
    display: none;
  }
`;

const ReasonCardWide = styled.div<{ $highlight?: boolean }>`
  flex: 1;
  min-width: 0;
  box-sizing: border-box;
  border: 1px solid ${p => (p.$highlight ? PALETTE.green[700] : PALETTE.grey[200])};
  background: ${p => (p.$highlight ? DECK.accentSoft : PALETTE.white)};
  border-radius: ${u(12)};
  padding: ${u(26)} ${u(28)} ${u(30)};
  display: flex;
  flex-direction: column;
  gap: ${u(12)};

  ${MOBILE} {
    padding: 18px 18px 20px;
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${u(6)};
`;

const CardNumber = styled.span<{ $highlight?: boolean }>`
  width: ${u(30)};
  height: ${u(30)};
  border-radius: 50%;
  background: ${p => (p.$highlight ? PALETTE.green[700] : DECK.panel)};
  color: ${PALETTE.white};
  font-size: ${u(13)};
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardIconTile = styled.span<{ $highlight?: boolean }>`
  width: ${u(44)};
  height: ${u(44)};
  border-radius: ${u(10)};
  background: ${p => (p.$highlight ? PALETTE.green[700] : PALETTE.grey[100])};
  color: ${p => (p.$highlight ? PALETTE.white : PALETTE.grey[700])};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: ${u(20)};
    height: ${u(20)};
  }
`;

const PaneHeading = styled.div`
  font-size: ${u(11)};
  font-weight: 700;
  letter-spacing: ${u(0.7)};
  text-transform: uppercase;
  color: ${PALETTE.grey[700]};
`;

// ── Title slide ──────────────────────────────────────────────────────────────

const TitleSlide = styled.div`
  flex: 1;
  box-sizing: border-box;
  padding: ${u(44)} ${u(52)};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${u(24)};
  min-width: 0;

  ${MOBILE} {
    padding: 28px 20px 32px;
    gap: 28px;
  }
`;

const DatePill = styled.div`
  align-self: flex-start;
  background: ${DECK.accentSoft};
  border: ${u(1.5)} solid ${DECK.accent};
  border-radius: 999px;
  padding: ${u(5)} ${u(16)};
  font-size: ${u(13)};
  font-weight: 700;
  color: ${DECK.ink};
`;

const BigTitle = styled.h1`
  font-size: ${u(52)};
  font-weight: 300;
  line-height: 1.08;
  letter-spacing: ${u(-1)};
  color: ${DECK.ink};
  margin: 0;

  ${MOBILE} {
    font-size: 34px;
    letter-spacing: -0.6px;
  }
`;

const BigTitleStrong = styled.span`
  display: block;
  font-weight: 700;
`;

const PartnersBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${u(5)};
`;

const PartnersLabel = styled.div`
  font-size: ${u(11)};
  font-weight: 700;
  letter-spacing: ${u(0.7)};
  text-transform: uppercase;
  color: ${PALETTE.grey[700]};
`;

const PartnersNames = styled.div`
  font-size: ${u(13.5)};
  line-height: 1.5;
  color: ${PALETTE.grey[800]};
  max-width: ${u(760)};

  /* Each entry stays whole; only the gaps between them can wrap. */
  span {
    white-space: nowrap;
  }
`;

const TitleFooter = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${u(24)};

  ${MOBILE} {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`;

const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${u(14)};
`;

const AuthorPhoto = styled.img`
  width: ${u(64)};
  height: ${u(64)};
  border-radius: 50%;
  object-fit: cover;
`;

const AuthorName = styled.div`
  font-size: ${u(19)};
  font-weight: 700;
  color: ${DECK.ink};
  line-height: 1.25;
`;

const AuthorRole = styled.div`
  font-size: ${u(15)};
  color: ${PALETTE.grey[800]};
`;

const Lockup = styled.div`
  display: flex;
  align-items: center;
  gap: ${u(8)};
  color: ${DECK.ink};

  svg {
    width: ${u(30)};
    height: ${u(30)};
  }

  span {
    font-size: ${u(23)};
    font-weight: 700;
    letter-spacing: ${u(-0.4)};
  }
`;

// ── Closing slide ────────────────────────────────────────────────────────────

const ThanksSlide = styled.div`
  flex: 1;
  box-sizing: border-box;
  padding: ${u(44)} ${u(52)};
  background: ${DECK.panel};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: ${u(18)};
  min-width: 0;

  ${MOBILE} {
    padding: 64px 24px;
  }
`;

const ThanksTitle = styled.h1`
  font-size: ${u(72)};
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: ${u(-1.5)};
  color: ${PALETTE.white};
  margin: 0;

  ${MOBILE} {
    font-size: 44px;
    letter-spacing: -0.8px;
  }
`;

const ThanksLockup = styled.div`
  display: flex;
  align-items: center;
  gap: ${u(8)};
  margin-top: ${u(10)};
  color: ${PALETTE.white};

  svg {
    width: ${u(26)};
    height: ${u(26)};
  }

  span {
    font-size: ${u(20)};
    font-weight: 700;
    letter-spacing: ${u(-0.4)};
  }
`;

// ── Strip layout: a narrow band of the panel green so a full-width slide still
// reads as a continuation of the split slides ────────────────────────────────

const GreenStrip = styled.div`
  flex: 0 0 ${u(64)};
  background: ${DECK.panel};

  ${MOBILE} {
    flex: 0 0 10px;
  }
`;

const StripBody = styled.div`
  flex: 1;
  box-sizing: border-box;
  padding: ${u(38)} ${u(44)};
  display: flex;
  flex-direction: column;
  gap: ${u(12)};
  min-width: 0;

  ${MOBILE} {
    padding: 24px 20px 32px;
    gap: 14px;
  }
`;

const SplitRow = styled.div`
  display: flex;
  gap: ${u(32)};
  margin-top: ${u(10)};
  flex: 1;
  align-items: stretch;
  min-height: 0;

  ${MOBILE} {
    flex-direction: column;
    gap: 16px;
  }
`;

const LeftCol = styled.div`
  flex: 0 0 44%;
  display: flex;
  flex-direction: column;
  gap: ${u(14)};
  min-width: 0;

  ${MOBILE} {
    flex: none;
  }
`;

const SectionCard = styled.div<{ $accent: string }>`
  border: 1px solid ${PALETTE.grey[200]};
  border-left: ${u(3)} solid ${p => p.$accent};
  border-radius: ${u(8)};
  padding: ${u(14)} ${u(16)};
  display: flex;
  flex-direction: column;
  gap: ${u(9)};
  min-width: 0;
`;

const RoleLabel = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: ${u(6)};
  color: ${p => p.$color};
  font-size: ${u(11)};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: ${u(0.6)};

  svg {
    width: ${u(13)};
    height: ${u(13)};
  }
`;

const SectionHeading = styled.div`
  font-size: ${u(15)};
  font-weight: 700;
  color: ${DECK.ink};
`;

const SectionText = styled.div`
  font-size: ${u(13.5)};
  line-height: 1.5;
  color: ${PALETTE.grey[800]};
`;

const TakeawayCard = styled.div`
  background: ${DECK.accentSoft};
  border-left: ${u(3)} solid ${DECK.accent};
  border-radius: 0 ${u(8)} ${u(8)} 0;
  padding: ${u(12)} ${u(16)};
  margin-top: auto;

  ${MOBILE} {
    margin-top: 0;
  }
`;

const TakeawayLabel = styled.span`
  font-weight: 700;
  color: ${DECK.ink};
`;

// ── Wide layout, for slides that need the full frame ─────────────────────────

const WideTitle = styled.h1`
  font-size: ${u(28)};
  font-weight: 700;
  color: ${DECK.ink};
  margin: 0;

  ${MOBILE} {
    font-size: 24px;
  }
`;

const AccentRule = styled.div<{ $spaced?: boolean }>`
  width: ${u(56)};
  height: ${u(4)};
  border-radius: ${u(2)};
  background: ${DECK.accent};
  flex-shrink: 0;
  margin-top: ${p => (p.$spaced ? u(12) : '0')};
`;

// ── Screenshots, slide 5 ─────────────────────────────────────────────────────
// Two stacked frames, labelled to match the Admin and Agent cards on the left.
// At slide scale the fine detail is not legible, so each frame shows the top of
// the screen cropped to fill, and clicking opens it full size for questions.

const ShotCol = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: ${u(14)};
`;

const ShotCard = styled.button<{ $accent: string }>`
  flex: 1;
  min-height: 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  text-align: left;
  background: ${PALETTE.white};
  border: 1px solid ${PALETTE.grey[200]};
  border-top: ${u(3)} solid ${p => p.$accent};
  border-radius: ${u(8)};
  overflow: hidden;
  cursor: zoom-in;

  &:hover {
    border-color: ${PALETTE.grey[400]};
  }

  ${MOBILE} {
    min-height: 200px;
  }
`;

const ShotLabel = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: ${u(6)};
  flex-shrink: 0;
  padding: ${u(8)} ${u(12)};
  border-bottom: 1px solid ${PALETTE.grey[200]};
  color: ${p => p.$color};
  font-size: ${u(11)};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: ${u(0.6)};

  svg {
    width: ${u(13)};
    height: ${u(13)};
  }
`;

const ShotCaption = styled.span`
  color: ${PALETTE.grey[700]};
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0;
`;

const ShotViewport = styled.div`
  flex: 1;
  min-height: 0;
  overflow: hidden;
  background: ${PALETTE.grey[100]};

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top left;
  }
`;

// Full-size view, so a screenshot can still answer a question in the room.
const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(17 17 13 / 0.82);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 24px;
  cursor: zoom-out;

  img {
    max-width: 100%;
    max-height: calc(100% - 40px);
    object-fit: contain;
    border-radius: 6px;
    background: ${PALETTE.white};
  }
`;

const LightboxCaption = styled.div`
  color: ${PALETTE.white};
  font-size: 14px;
  font-weight: 600;
`;

// ── Service blueprint slide: the picture fills the frame. Click opens it full size. ──

const BlueprintSlide = styled.button`
  flex: 1;
  min-width: 0;
  min-height: 0;
  margin: 0;
  padding: ${u(24)};
  border: 0;
  background: ${PALETTE.white};
  cursor: zoom-in;
  display: flex;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }

  ${MOBILE} {
    padding: 16px;
    min-height: 240px;
  }
`;

// Same offer inside the lightbox, so the live page is one click away while
// the full-size capture is on screen.
const LightboxLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: 14px;
  padding: 4px 10px;
  border: 1px solid rgba(255 255 255 / 0.4);
  border-radius: 6px;
  color: ${PALETTE.white};
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;

  svg {
    width: 13px;
    height: 13px;
  }

  &:hover {
    background: rgba(255 255 255 / 0.12);
  }
`;

// ── Outcome slide: lead paragraph, stat tiles, then the two objective cards ──

const StatRow = styled.div`
  display: flex;
  gap: ${u(12)};
  margin-top: ${u(24)};

  ${MOBILE} {
    flex-wrap: wrap;
    margin-top: 8px;
  }
`;

const StatTile = styled.div`
  flex: 1;
  box-sizing: border-box;
  border: 1px solid ${PALETTE.grey[200]};
  border-radius: ${u(10)};
  padding: ${u(16)} ${u(18)} ${u(14)};
  display: flex;
  flex-direction: column;
  gap: ${u(4)};
  min-height: ${u(130)};
  min-width: 0;

  ${MOBILE} {
    flex: 1 1 calc(50% - 6px);
    min-height: 0;
  }
`;

const StatLabel = styled.div`
  font-size: ${u(12)};
  font-weight: 600;
  color: ${PALETTE.grey[700]};
`;

const StatValue = styled.div`
  font-size: ${u(34)};
  font-weight: 600;
  line-height: 1.15;
  color: ${PALETTE.grey[900]};

  ${MOBILE} {
    font-size: 28px;
  }
`;

const StatNote = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: ${u(5)};
  font-size: ${u(12)};
  font-weight: 600;
  line-height: 1.35;
  color: ${p => p.$color};

  svg {
    width: ${u(12)};
    height: ${u(12)};
    flex-shrink: 0;
  }
`;

const ReasonRow = styled.div`
  display: flex;
  gap: ${u(16)};
  margin-top: ${u(22)};

  > * {
    flex: 1;
  }

  ${MOBILE} {
    flex-direction: column;
    margin-top: 8px;
  }
`;

const LeadPara = styled.p`
  font-size: ${u(14.5)};
  line-height: 1.55;
  color: ${PALETTE.grey[800]};
  margin: 0;
  max-width: ${u(940)};
`;

// ── Agent steps, slide 5 ─────────────────────────────────────────────────────

const StepList = styled.ol`
  list-style: none;
  margin: ${u(4)} 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${u(4)};
`;

const StepItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${u(8)};
  font-size: ${u(13.5)};
  color: ${PALETTE.grey[800]};
`;

const StepNumber = styled.span`
  width: ${u(18)};
  height: ${u(18)};
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${PALETTE.grey[200]};
  color: ${PALETTE.grey[800]};
  font-size: ${u(10)};
  font-weight: 700;
`;

const AiNote = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${u(6)};
  align-self: flex-start;
  background: ${DECK.accentSoft};
  border: 1px solid ${DECK.accent};
  border-radius: ${u(6)};
  padding: ${u(6)} ${u(10)};
  color: ${DECK.ink};
  font-size: ${u(12.5)};
  font-weight: 600;

  svg {
    width: ${u(13)};
    height: ${u(13)};
    flex-shrink: 0;
  }
`;

// ── Navigation ───────────────────────────────────────────────────────────────
// Floats over the slide at real pixels, so it stays tappable at any scale.

const Nav = styled.div`
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 8px 12px;
  border-radius: 12px;
  background: rgba(255 255 255 / 0.88);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 16px rgba(18 27 34 / 0.16);

  ${MOBILE} {
    flex-wrap: wrap;
    width: calc(100% - 32px);
    box-sizing: border-box;
  }
`;

const NavButton = styled.button<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: ${p => (p.$disabled ? PALETTE.grey[200] : DECK.panel)};
  color: ${p => (p.$disabled ? PALETTE.grey[500] : PALETTE.white)};
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 600;
  cursor: ${p => (p.$disabled ? 'default' : 'pointer')};

  svg {
    width: 14px;
    height: 14px;
  }

  ${MOBILE} {
    order: 2;
    flex: 1 1 0;
    justify-content: center;
    min-height: 44px;
  }
`;

const Dots = styled.div`
  display: flex;
  gap: 8px;

  ${MOBILE} {
    order: 1;
    flex: 1 0 100%;
    justify-content: center;
    gap: 12px;
  }
`;

const Dot = styled.button<{ $active: boolean }>`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: none;
  padding: 0;
  background: ${p => (p.$active ? DECK.panel : PALETTE.grey[300])};
  cursor: pointer;
`;

const Counter = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${PALETTE.grey[700]};

  ${MOBILE} {
    order: 2;
  }
`;

// ── Content ──────────────────────────────────────────────────────────────────

const TOTAL_SLIDES = 8;

// Listed as separate entries so a wrap never splits somebody's name: each entry
// keeps its own line, and the separator sits outside it.
const PARTNERS = [
  'Tomek Kancelista (UX)',
  'Ryan Mara & Aadesh (PM)',
  'Tara Rastogi (UXR)',
  'Stephanie Quemena (Design Manager)',
  'Manjiri Deshpande & Tyler Orabone (Engineering)',
  'Vishnu Parimi (VP)',
];

// Slide 4: the risk exists → that is why the incumbent wins → so we build it.
const REASONS = [
  {
    number: '1',
    icon: AlertWarningIcon,
    title: 'Every IT change carries risk',
    text: 'Whenever an IT team updates a system or deploys software, there is always a risk of breaking something.',
  },
  {
    number: '2',
    icon: TrendingIcon,
    title: 'Why ServiceNow wins today',
    text: 'Major platforms like ServiceNow dominate the IT space because they offer built-in features to manage that risk.',
  },
  {
    number: '3',
    icon: ZendeskIcon,
    title: 'What Zendesk is building',
    text: 'Our own built-in Change Management workflow, to show the market that Zendesk is a serious contender in IT.',
    highlight: true,
  },
];

// Slide 2: the three things the roadwork crew must show in its plan.
const PLAN_REQUIREMENTS = [
  {
    icon: ClockIcon,
    strong: 'When they will do it',
    rest: 'midnight, when traffic is low',
  },
  {
    icon: UserGroupIcon,
    strong: 'Who needs to approve it',
    rest: 'the city planners',
  },
  {
    icon: ArrowReverseIcon,
    strong: 'A backup plan',
    rest: 'detour routes if the work runs long',
  },
];

// Slide 3: the questions a change request answers, mirroring the roadwork plan.
const CHANGE_QUESTIONS = [
  { icon: ClockIcon, title: 'When will it happen', text: 'A scheduled window, chosen to limit disruption.' },
  { icon: UserGroupIcon, title: 'Who needs to approve it', text: 'The people accountable sign off before it starts.' },
  { icon: ArrowReverseIcon, title: 'What is the rollback plan', text: 'A way back if the update does not go as expected.' },
];

const AGENT_STEPS = [
  'Pick a Playbook',
  'List the impacted assets',
  'Set a schedule',
  'Submit for approval',
];

// Slide 5: one screenshot per side of the story on the left.
const SHOTS = [
  {
    src: adminShot,
    icon: GearIcon,
    role: 'Admin side',
    caption: 'Change playbooks in Admin Center',
    accent: PALETTE.blue[600],
    color: PALETTE.blue[700],
  },
  {
    src: agentShot,
    icon: HeadsetIcon,
    role: 'Agent side',
    caption: 'Picking a playbook in a new change request',
    accent: PALETTE.green[600],
    color: PALETTE.green[700],
  },
];

type Shot = (typeof SHOTS)[number];

// Optional live blueprint URL. Empty in the public Pages build (screenshot + zoom only).
const BLUEPRINT_URL = '';

const BLUEPRINT_SHOT: Shot = {
  src: blueprintShot,
  icon: ImageIcon,
  role: 'Service blueprint',
  caption: 'The agent’s steps, and who acts in each one',
  accent: PALETTE.blue[600],
  color: PALETTE.blue[700],
};

export default function ChangeManagementDeck() {
  const [slide, setSlide] = useState(0);
  const [zoom, setZoom] = useState<Shot | null>(null);

  const next = () => setSlide(s => Math.min(s + 1, TOTAL_SLIDES - 1));
  const prev = () => setSlide(s => Math.max(s - 1, 0));

  // While a screenshot is open the arrows belong to it, not to the deck.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (zoom) {
        if (e.key === 'Escape') setZoom(null);
        return;
      }
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoom]);

  return (
    <DeckShell>
      <Frame>
        <Stage>
          <Slide key={slide}>
            {/* 1 ── Title */}
            {slide === 0 && (
              <TitleSlide>
                <DatePill>September 2026</DatePill>

                <div>
                  <BigTitle>
                    Change Management:
                    <BigTitleStrong>What we are building and why</BigTitleStrong>
                  </BigTitle>
                  <AccentRule $spaced />
                </div>

                <PartnersBlock>
                  <PartnersLabel>Partners</PartnersLabel>
                  <PartnersNames>
                    {PARTNERS.map((person, i) => (
                      <Fragment key={person}>
                        {i > 0 && ' · '}
                        <span>{person}</span>
                      </Fragment>
                    ))}
                  </PartnersNames>
                </PartnersBlock>

                <TitleFooter>
                  <AuthorRow>
                    <AuthorPhoto src={authorPhoto} alt="" />
                    <div>
                      <AuthorName>Sourabh Chopade</AuthorName>
                      <AuthorRole>Senior Product Designer</AuthorRole>
                    </div>
                  </AuthorRow>
                  <Lockup>
                    <ZendeskMark />
                    <span>zendesk</span>
                  </Lockup>
                </TitleFooter>
              </TitleSlide>
            )}

            {/* 2 ── What it is, via the road metaphor */}
            {slide === 1 && (
              <>
                <Panel>
                  <PanelTitle>
                    What exactly is Change Management?
                  </PanelTitle>
                  <PanelText>
                    Think of a city&apos;s road network. Some work is a reaction to
                    something breaking. Other work is planned in advance.
                  </PanelText>
                  <MarkBlock>
                    <Mark>
                      An incident is unplanned. A change is planned, approved, and
                      scheduled.
                    </Mark>
                  </MarkBlock>
                  <PanelPoint />
                </Panel>

                <Pane>
                  <ItemCard $accent={PALETTE.red[700]}>
                    <ArtBubble>
                      <img src={incidentArt} alt="" />
                    </ArtBubble>
                    <ItemBody>
                      <ItemTitle>Incident: fixing problems</ItemTitle>
                      <ItemText>
                        A car crashes on the highway. Tow trucks rush in to clear the
                        lane. Nobody plans a crash, you just react as fast as you can.
                      </ItemText>
                    </ItemBody>
                  </ItemCard>

                  <ItemCard $accent={PALETTE.green[600]}>
                    <ArtBubble>
                      <img src={roadworkArt} alt="" />
                    </ArtBubble>
                    <ItemBody>
                      <ItemTitle>Change management: planning roadwork</ItemTitle>
                      <ItemText>
                        A crew wants to close a main bridge for repairs. They cannot
                        just block the road whenever they feel like it. They must
                        submit a plan showing:
                      </ItemText>
                      <PlanList>
                        {PLAN_REQUIREMENTS.map(req => {
                          const Icon = req.icon;
                          return (
                            <PlanItem key={req.strong}>
                              <Icon />
                              <span>
                                <PlanStrong>{req.strong}</PlanStrong>, {req.rest}
                              </span>
                            </PlanItem>
                          );
                        })}
                      </PlanList>
                    </ItemBody>
                  </ItemCard>
                </Pane>
              </>
            )}

            {/* 3 ── The definition, with the macOS example */}
            {slide === 2 && (
              <>
                <Panel>
                  <PanelTitle>The definition</PanelTitle>
                  <PanelText>
                    Change management is a standardised process for planning,
                    approving, implementing, and reviewing changes to IT systems and
                    services to{' '}
                    <Mark>minimise disruptions and control risks</Mark>.
                  </PanelText>
                  <PanelPoint />
                </Panel>

                <Pane>
                  <PaneHeading>Example: rolling out a macOS update</PaneHeading>

                  <Item>
                    <Bubble>
                      <MonitorIcon />
                    </Bubble>
                    <ItemBody>
                      <ItemTitle>
                        A new macOS update is released and IT needs to roll it out to
                        the company&apos;s laptops.
                      </ItemTitle>
                      <ItemText>
                        Before a single laptop updates, the change request answers:
                      </ItemText>
                    </ItemBody>
                  </Item>

                  {CHANGE_QUESTIONS.map(q => {
                    const Icon = q.icon;
                    return (
                      <Item key={q.title}>
                        <Bubble>
                          <Icon />
                        </Bubble>
                        <ItemBody>
                          <ItemTitle>{q.title}</ItemTitle>
                          <ItemText>{q.text}</ItemText>
                        </ItemBody>
                      </Item>
                    );
                  })}
                </Pane>
              </>
            )}

            {/* 4 ── Why we are building this (page-5 light layout, three cards) */}
            {slide === 3 && (
              <>
                <GreenStrip />

                <StripBody>
                  <WideTitle>Why we are building this</WideTitle>
                  <AccentRule />
                  <LeadPara>
                    IT teams pick the platform that helps them manage risk. Today
                    that is rarely Zendesk.
                  </LeadPara>
                  <MarkBlock $tight>
                    <Mark>
                      Change Management makes Zendesk a serious contender in IT.
                    </Mark>
                  </MarkBlock>

                  <CardsRow>
                    {REASONS.map((r, i) => {
                      const Icon = r.icon;
                      return (
                        <Fragment key={r.title}>
                          {i > 0 && (
                            <CardChevron aria-hidden="true">
                              <ChevronRightIcon />
                            </CardChevron>
                          )}
                          <ReasonCardWide $highlight={r.highlight}>
                            <CardTop>
                              <CardNumber $highlight={r.highlight}>
                                {r.number}
                              </CardNumber>
                              <CardIconTile $highlight={r.highlight}>
                                <Icon />
                              </CardIconTile>
                            </CardTop>
                            <ItemTitle $lg>{r.title}</ItemTitle>
                            <ItemText>{r.text}</ItemText>
                          </ReasonCardWide>
                        </Fragment>
                      );
                    })}
                  </CardsRow>
                </StripBody>
              </>
            )}

            {/* 5 ── What we are building, screenshots on the right */}
            {slide === 4 && (
              <>
                <GreenStrip />

                <StripBody>
                  <WideTitle>What we are building</WideTitle>
                  <AccentRule />
                  <PaneHeading>In EAP, two key sections</PaneHeading>

                  <SplitRow>
                    <LeftCol>
                      <SectionCard $accent={PALETTE.blue[600]}>
                        <RoleLabel $color={PALETTE.blue[700]}>
                          <GearIcon />
                          Admin side
                        </RoleLabel>
                        <SectionHeading>Standardise with Playbooks</SectionHeading>
                        <SectionText>
                          Standard templates so every change follows the same process.
                        </SectionText>
                        <AiNote>
                          <SparkleIcon />
                          Co-pilot builds and edits Playbooks by just asking AI
                        </AiNote>
                      </SectionCard>

                      <SectionCard $accent={PALETTE.green[600]}>
                        <RoleLabel $color={PALETTE.green[700]}>
                          <HeadsetIcon />
                          Agent side
                        </RoleLabel>
                        <SectionHeading>Raise a change request</SectionHeading>
                        <StepList>
                          {AGENT_STEPS.map((step, i) => (
                            <StepItem key={step}>
                              <StepNumber>{i + 1}</StepNumber>
                              {step}
                            </StepItem>
                          ))}
                        </StepList>
                      </SectionCard>

                      <TakeawayCard>
                        <SectionText>
                          <TakeawayLabel>In short:</TakeawayLabel> Admins build the
                          guardrails with AI. Agents execute safely with clear templates.
                        </SectionText>
                      </TakeawayCard>
                    </LeftCol>

                    <ShotCol>
                      {SHOTS.map(shot => {
                        const Icon = shot.icon;
                        return (
                          <ShotCard
                            key={shot.caption}
                            type="button"
                            $accent={shot.accent}
                            onClick={() => setZoom(shot)}
                          >
                            <ShotLabel $color={shot.color}>
                              <Icon />
                              {shot.role}
                              <ShotCaption>{shot.caption}</ShotCaption>
                            </ShotLabel>
                            <ShotViewport>
                              <img src={shot.src} alt={shot.caption} />
                            </ShotViewport>
                          </ShotCard>
                        );
                      })}
                    </ShotCol>
                  </SplitRow>
                </StripBody>
              </>
            )}

            {/* 6 ── Outcome */}
            {slide === 5 && (
              <>
                <GreenStrip />

                <StripBody>
                  <WideTitle>Outcome</WideTitle>
                  <AccentRule />

                  <LeadPara>
                    More explicit ITSM support, including Change Management, will
                    positively contribute to the business in two ways.
                  </LeadPara>

                  <StatRow>
                    <StatTile>
                      <StatLabel>Current ES ARR</StatLabel>
                      <StatValue>$346M</StatValue>
                    </StatTile>

                    <StatTile>
                      <StatLabel>Current GRR of ES base</StatLabel>
                      <StatValue>84%</StatValue>
                      <StatNote $color={PALETTE.yellow[800]}>
                        <AlertWarningIcon />
                        Below a healthy level
                      </StatNote>
                      <StatNote $color={PALETTE.green[700]}>
                        <ChevronUpIcon />
                        Target 86% in 2026
                      </StatNote>
                    </StatTile>

                    <StatTile>
                      <StatLabel>Current ES win rate</StatLabel>
                      <StatValue>23%</StatValue>
                      <StatNote $color={PALETTE.green[700]}>
                        <ChevronUpIcon />
                        Target 30% by end of 2026
                      </StatNote>
                    </StatTile>

                    <StatTile>
                      <StatLabel>2026 ES bookings target</StatLabel>
                      <StatValue>$61M</StatValue>
                    </StatTile>
                  </StatRow>

                  <ReasonRow>
                    <SectionCard $accent={PALETTE.blue[600]}>
                      <RoleLabel $color={PALETTE.blue[700]}>1 &middot; Retention</RoleLabel>
                      <SectionHeading as="div">Keep more of the base</SectionHeading>
                      <SectionText as="div">
                        Change Management plugs an important product gap, so fewer
                        customers have a reason to leave.
                      </SectionText>
                    </SectionCard>

                    <SectionCard $accent={PALETTE.green[600]}>
                      <RoleLabel $color={PALETTE.green[700]}>
                        2 &middot; New business
                      </RoleLabel>
                      <SectionHeading as="div">Win more deals</SectionHeading>
                      <SectionText as="div">
                        It removes a common objection from prospects and assures them
                        we meet their needs.
                      </SectionText>
                    </SectionCard>
                  </ReasonRow>

                </StripBody>
              </>
            )}

            {/* 7 ── Service blueprint: the image only. Click opens it full size. */}
            {slide === 6 && (
              <BlueprintSlide type="button" onClick={() => setZoom(BLUEPRINT_SHOT)}>
                <img src={BLUEPRINT_SHOT.src} alt="Service blueprint for Change Management" />
              </BlueprintSlide>
            )}

            {/* 8 ── Close */}
            {slide === 7 && (
              <ThanksSlide>
                <ThanksTitle>Thank you</ThanksTitle>
                <AccentRule />
                <ThanksLockup>
                  <ZendeskMark />
                  <span>zendesk</span>
                </ThanksLockup>
              </ThanksSlide>
            )}
          </Slide>
        </Stage>

        <Nav>
          <NavButton onClick={prev} $disabled={slide === 0}>
            <ChevronLeftIcon />
            Previous
          </NavButton>
          <Dots>
            {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
              <Dot key={i} $active={i === slide} onClick={() => setSlide(i)} />
            ))}
          </Dots>
          <Counter>
            {slide + 1} / {TOTAL_SLIDES}
          </Counter>
          <NavButton onClick={next} $disabled={slide === TOTAL_SLIDES - 1}>
            Next
            <ChevronRightIcon />
          </NavButton>
        </Nav>
      </Frame>

      {zoom && (
        <Lightbox onClick={() => setZoom(null)} role="dialog" aria-modal="true">
          <img src={zoom.src} alt={zoom.caption} />
          <LightboxCaption>
            {zoom.role} · {zoom.caption}
            {zoom === BLUEPRINT_SHOT && BLUEPRINT_URL ? (
              <LightboxLink
                href={BLUEPRINT_URL}
                target="_blank"
                rel="noreferrer"
                onClick={e => e.stopPropagation()}
              >
                <NewWindowIcon />
                Open the live blueprint
              </LightboxLink>
            ) : null}
          </LightboxCaption>
        </Lightbox>
      )}
    </DeckShell>
  );
}
