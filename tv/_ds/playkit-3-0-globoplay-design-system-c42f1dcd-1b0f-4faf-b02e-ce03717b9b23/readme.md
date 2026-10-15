# Playkit 3.0 — Globoplay Design System

Playkit is the multi-platform design system behind **Globoplay**, Grupo Globo's streaming
service. It is not a website kit: it is a *screen* kit. Everything in it is built to survive
five very different runtimes at once — Web/desktop, mobile web, native iOS/Android, Smart TV
apps (Tizen/webOS/"SmartApp"), and the pointer-less TV platforms (Android TV, tvOS, Roku).
Almost every component in the kit carries a `device` (or `platform`) axis for exactly that
reason, and most of them carry a **focus** state alongside hover, because half the surfaces
are driven by a D-pad rather than a cursor.

The product surfaces represented in the source file:

| Surface | What it covers |
| --- | --- |
| **Web & Mobile** | globoplay.globo.com desktop + mobile web, and the iOS/Android apps |
| **TV** | Android TV / tvOS / Roku / SmartApp (Tizen, webOS) 10-foot UI |
| **Player** | The shared video player: click (desktop), touch (mobile), and TV variants |
| **Kids** | Gloob / Gloobinho / Globoplay Kids, with its own colour theme and icon set |
| **Broadcast & Sports** | Live channels, EPG/agenda, scoreboards, team shields, Premiere/Combate |

## Sources

- **Figma:** `🧩 Playkit 3.0 (Copy).fig` — attached to this project as a mounted virtual
  filesystem. Pages: `Cover`, `Olá`, `1. Fundação`, `2. Assets`, `3. Componentes`,
  `4. Módulos`, `Descontinuado`, `Parking Lot`. No public Figma URL was provided.
- No codebase, repository, or slide deck was supplied. Everything here is derived from the
  `.fig` alone; nothing was taken from public knowledge of the Globoplay product.

---

## Content fundamentals

The kit is authored in **Brazilian Portuguese**, and the voice is deliberately plain — this
is a mass-market entertainment product, not a tool.

**Casing.** Sentence case everywhere in running UI: `Ao vivo`, `Agora na TV`, `Continue
assistindo`, `Minha lista`. Full caps is reserved for *tags* — the small metadata chips that
sit on artwork (`AO VIVO`, `EXCLUSIVO`, `1ª TEMPORADA`). Never title case; `Agora Na TV`
would be wrong. The wordmark itself is all lowercase: **globoplay**.

**Person.** Second person, informal *você*, mostly implied rather than written. Labels are
imperative verbs — `Assistir`, `Assine já`, `Continuar`, `Baixar`. Possessives are first
person from the viewer's side: `Minha lista`, `Meu Globoplay`, `Para você`. The product never
says "we".

**Length.** Buttons are one or two words. Tags are one to three. The kit's own placeholder
copy (`Smart intervention title`, `Call to action`, `Text description`) shows the intended
shape: a short title plus one supporting line, never a paragraph.

**Punctuation.** Almost none. No terminal periods on labels or single-line descriptions. The
one recurring flourish is a middle dot used as a price separator: `Assine já ·`. Ellipses and
exclamation marks do not appear outside the Kids surfaces.

**Numbers and time.** 24-hour clock (`21h`, `06:30`), Brazilian date order, `1ª`/`2ª` ordinals
with the feminine superscript. Age ratings use the Brazilian ClassInd vocabulary — `L`, `10`,
`12`, `14`, `16`, `18` — and are always rendered as the official coloured mark, never as text.

**Emoji.** None. Not in labels, not in tags, not in empty states. Kids uses illustrated icons
instead.

**Vibe.** Confident and quiet. The interface gets out of the way of the artwork: dark
chrome, minimal copy, and the poster does the selling. The only loud element is the red
`AO VIVO` tag — liveness is the one thing the product shouts about.

---

## Visual foundations

### Colour

The system is **dark-first and effectively monochrome**, with colour used almost exclusively
as signal. `--app-background: #1F1F1F` (`$neutral-90`) is the canvas on every surface; the
neutral ramp runs twelve steps from `#FFFFFF` to `#000000` and does nearly all the work.

Chrome is neutral. Colour appears in three roles only:

1. **Red** (`$red-base #FB0234`, `$red-medium #D1022B`) — liveness and commerce. The `AO VIVO`
   tag, the live progress bar, the recording dot, the "Assine já" sales button.
2. **Contextual channel colours** — one brand colour per broadcaster (Globo `#326FB5`, GNT
   `#ED7020`, Multishow `#FE556F`, Telecine `#040435`…). These theme a channel's surfaces and
   never leak into global chrome.
3. **Kids** — a separate five-hue palette (blue `#425FFE`, red `#F8403F`, yellow `#FFB10D`,
   green `#00C4A2`, purple `#A254D0`), each with light/medium/dark, applied wholesale to the
   Kids environment.

Semantic states use blue (info), green (success), tangerine (warning), red (error). There is a
single gradient token, `$gradient-blue`; the system is otherwise flat. Note that the *global*
palette carries no purple — purple only exists inside the Kids theme.

### Type

`$font-family-principal` is **Inter** — 400 / 500 / 700, nothing else. A second family,
`$font-family-classification-indicative` (**Open Sans Condensed**), exists for one purpose:
the legally-prescribed age-rating marks. Globotipo, Globo's corporate typeface, appears in the
documentation chrome and in logo artwork, not in product UI.

The size scale is a twelve-step numeric ramp, `$font-size-10` (10px) → `$font-size-120` (56px),
with only two line-heights: `compact` 125% for headings and dense UI, `spaced` 150% for
running text. Tracking is default everywhere except the documentation display type
(`-0.04em`), which is not a product style.

### Space and shape

Spacing is an eleven-step scale — 0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64. It is genuinely a
4/8 grid, with `xs` at 12 as the only in-between step.

Radii are `small 4`, `medium 8`, `large 12`, `xlarge 16`, `circular 50%`, `pill 500px`. Card
artwork (posters, thumbs) uses `medium 8`; buttons use `pill`; avatars use `circular`. Border
widths run 1 / 2 / 4 / 6 — the heavier ones exist for TV focus rings, which have to read from
three metres away.

### Elevation, transparency and blur

Elevation is barely used: two shadow tokens (`0 4 4 rgba(0,0,0,.25)` and `0 12 4 rgba(0,0,0,.25)`)
and that's the whole system. On a dark canvas, depth comes from **value**, not shadow — a
raised surface is `#262626` on `#1F1F1F`.

Transparency does the heavy lifting instead. Two five-step scrim scales (`$opacity-dark-*` and
`$opacity-light-*` at 10/20/30/50/80%) build every secondary button, every glass chip, every
protection layer over artwork. Secondary buttons are `rgba(255,255,255,.20)`, not a grey.

There is exactly one blur token, `$background-blur-level-1` = `blur(50px)`, paired with a 25%
black fill. It is used for the frosted tag capsules that sit on top of poster art and for
player control backdrops.

**Protection gradients vs. capsules.** Both are in play, and the rule is positional: text laid
directly over artwork (hero titles, thumb metadata) sits on a bottom-up black gradient;
free-floating badges over artwork (resolution, media tags) sit in a blurred translucent
capsule.

### Cards

There is no "card" in the shadow-and-border sense. A card is a **thumbnail**: 8px-radius
artwork, no border, no shadow, with metadata beneath or in a gradient overlay. The only
outlined containers in the whole kit are the documentation specimen boxes
(`inset 0 0 0 1px #666`).

### Interaction states

Every interactive component in the kit ships four states, and which ones apply depends on the
platform axis:

- **Hover** (`Hover=On`) — pointer platforms only. Lightens: white fills go to a brighter
  white, translucent fills step up one opacity level.
- **Focus visible** (`Focus Visible=On`) — pointer platforms, keyboard driven. A
  `--contextual-colors-border-focus-and-hover` (white) ring.
- **Focus** (`Focus=On`) — TV platforms. Not a ring but a *swap*: the focused element takes the
  full white fill and dark text, so the focused item is the brightest thing on screen. This is
  the single most important TV pattern in the system.
- **Disabled** — a distinct variant, not an opacity multiplier.

Pressed states are handled as `hover / pressing` on Chips and Dropdown — the kit collapses the
two rather than defining a separate press treatment. There is **no scale/shrink on press**.

### Motion

The source file specifies no easing curves, durations or keyframes. Motion in this system is
therefore undocumented, and anything you build should stay conservative: short cross-fades for
state change, and the TV focus scale-and-brighten that the focus variants imply. Flagged below
as a gap.

### Imagery

Artwork is full-bleed photographic key art — warm, saturated, high-contrast telenovela and
sports stills. Never desaturated, never duotoned, no grain overlay. Two aspect ratios carry
almost everything: 16:9 for video thumbs and 2:3 for posters. Logos are burned into the
artwork where a title has one. There are no illustrations anywhere except the Kids icon set.

### Layout

Eight breakpoints: 360 / 480 / 768 / 1024 / 1280 / 1440 / 1680 / 1920, grouped as Mobile,
Tablet, Desktop, Desktop Large, plus fixed TV canvases at HD (1280×720) and Full HD
(1920×1080). Web layout is a horizontal-rail model: a fixed header, then vertically stacked
rails of horizontally scrolling thumbs. Mobile adds a fixed bottom navigation; TV adds a
collapsible left side menu that expands on focus.

---

## Iconography

The kit carries **its own icon set — 389 glyphs** drawn in-house, organised by prefix. No
third-party icon library is used, and nothing here is a CDN import.

- **Basic** (~90) — the workhorse UI set: `Home`, `Search`, `Profile`, `Minha Lista Add/Added`,
  `Setting`, `Trophy`, `Football`, `Episodes`, `Free`, `Wallet`, `QR Code`. Many ship as a
  **filled/outline pair** (`BasicHome` / `BasicHomeOutline`) — filled for the selected state in
  bottom navigation, outline for the resting state.
- **Media** (27) — transport controls: play, pause, skip, seek, live, subtitles, AirPlay,
  Chromecast, download states.
- **Navigation** (10) — back, close, menu, filter, list/module toggle, more (horizontal +
  vertical), order, playlist.
- **Arrow** (38) — a complete directional set: arrows, chevrons, small chevrons, circled
  chevrons, increase/decrease, maximise/minimise, unfold more/less.
- **Alert** (26) — info, warning, error, help, notifications (five states), visibility, Wi-Fi,
  no signal, unsupported device/TV. Most ship filled + outline.
- **Accessibility** (7) — audiodescription, closed caption, Libras (Brazilian sign language),
  VoiceOver, wheelchair. These are regulatory in Brazil and appear as content badges, not just
  settings icons.
- **Kids** (72) — a visually separate set: rounder, heavier, several in full colour
  (`*Colorfull` variants). Not interchangeable with the main set.
- **Device** (4) — desktop, mobile, tablet, smart TV.
- **Brand marks** — 34 channel logos, 28 Brasileirão team shields, 55 national flags, and the
  TV-show marks (BBB, Estrela da Casa, Olympic rings). These are artwork, not icons.

**Style.** Single-weight, geometric, mostly solid-filled on a 24px grid, with generous
counters so they hold up at 10-foot TV distances. Every single-colour glyph paints with
`currentColor`.

**Usage.** Import from the generated set:

```jsx
import { Icon } from './assets/icons/Icon.jsx';
<Icon name="BasicMinhaListaAdd" size={24} style={{ color: 'var(--text-primary)' }} />
```

`assets/icons/Icon.d.ts` is the authoritative name index. **Emoji are never used.** Unicode
characters are not used as icons, with one exception: the middle dot `·` as a price separator.

**Logos** live in `assets/logos/` as `currentColor` SVGs — they inherit the text colour of
their container, so put them inside an element with the colour you want. There is no
light-background logo variant in the source; the kit is dark-only.

---

## Font substitutions — please confirm

No font binaries ship inside the `.fig`, so the system loads Google Fonts:

| Kit family | Loaded | Status |
| --- | --- | --- |
| Inter | Inter (Google) | ✅ exact |
| Open Sans / Open Sans Condensed | Google | ✅ exact |
| Roboto | Google | ✅ exact |
| **Globotipo / Globotipo UI / Globotipo Texto** | **falls back to Inter** | ⚠️ **substituted** |

Globotipo is Grupo Globo's proprietary corporate typeface and is not publicly licensable.
`--font-family-brand` currently resolves to Inter. **If you have the Globotipo web fonts,
drop the `.woff2` files into `assets/fonts/` and I'll wire the `@font-face` rules.** In
product UI this matters little — the kit declares Inter as `$font-family-principal` — but
brand/marketing artwork should use the real face.

---

## Index

| Path | What's there |
| --- | --- |
| `styles.css` | The single entry point consumers link. `@import`s only. |
| `tokens/colors.css` | Global palette + semantic aliases |
| `tokens/colors-kids.css` | Kids theme |
| `tokens/colors-channels.css` | Contextual channel colours |
| `tokens/typography.css` | Families, sizes, weights, line heights, webfont loading |
| `tokens/layout.css` | Spacing, radius, border width, shadow, blur, breakpoints |
| `tokens/fig-tokens.css` | Raw Figma Variables (`Device` collection), generated |
| `components/core/` | Tags, ratings, avatars, feedback, form controls, broadcast metadata |
| `components/actions/` | Buttons (web/mobile + TV), chips, dropdown, checkbox |
| `components/navigation/` | Bottom nav, menus, side menu, tabs, segmented button |
| `components/content/` | Thumbs, rails, premium highlight, banners |
| `components/player/` | Player chrome for click, touch and TV |
| `components/more/` | Web header, menus, covers, panels, poster/Top 10 thumbs |
| `components/extra/` | Keyboards, search bar, footer, FAB, episode thumbs, trilhos |
| `components/extra2/` | TV keyboard, notifications, status bar, partner logos |
| `components/extra3/` | Responsive button set, pause ads, TV search boxes, title details |
| `components/extra4/` | Surprise discovery set, selectors, sticky banner, signature logo |
| `components/extra5/` | Assembled trilhos (rails), video tapumes, web toast, mobile toolbar |
| `components/extra6/` | Numbered player transport glyphs, TV button, doc annotation symbols |
| `components/internal/` | `_`-prefixed base and documentation layers the public components compose |
| `components/legacy/` | `Descontinuado` / `_[OLD]` families — kept for reference, do not use |
| `assets/icons/` | 280 built glyphs + `Icon` wrapper |
| `assets/logos/` | Globoplay, Globo, Gloobinho, Dolby Atmos, app icons |
| `guidelines/` | Foundation specimen cards |
| `ui_kits/globoplay_web/` | Desktop 1440×900 — home, título, player |
| `ui_kits/globoplay_mobile/` | 390×844 — home, busca, touch player |
| `ui_kits/globoplay_tv/` | 1920×1080 — 10-foot home and focus model |
| `thumbnail.html` | Homepage tile |
| `SKILL.md` | Agent-skill entry point |

### Components

**core** — AccessibilityAudiodescription, AccessibilityClosedCaption, AcessoRPidoWebE, AgeIcons, AgeIconsBase, AgeIndicatorBase, Agenda, AlertError, AlertInfo, AlertInfoOutline, AlertNotificationsOutline, AppIcon, ArrowChevronDown, ArrowChevronRight, ArrowChevronSmallLeft, ArrowChevronSmallRight, ArrowOrder, AssinaturaGloboplayLogo, Avatar, BasicAccount, BasicBag, BasicCalendar, BasicCheckCircle, BasicDone, BasicMinhaListaAdd, BasicRate, BasicRemove, BasicTrailer, BroadcastLogo, BroadcastTV, BroadcastWebEMobile, CalendarBaseTV, CalendarBaseWebEMobile, CalendarTV, CalendarWebEMobile, CallOut, Category, Channel, ChannelLogo4, ContentRating, DatePickerWebEMobile, DolbyAtmos, Free, FutebolBrasileiro, GloboplayHorizontal, GloboplayVertical, Lock, MediaLive2, MediaPlay, MediaSubtitles, MobileBroadcastMetadata, MobileSnackbar, NavigationClose, NavigationList, OLDContentRating, OLDTag, ProgressBar, RadioWebEMobile, ServiceID, SmartTVsBroadcastMetadata, SwitchWebEMobile, Tag, Tag2, TagContentRating, TagMedia, TagMedia2, TagResolution, TagResolution2, Tooltip, WebBroadcastMetadata, WebToast

**actions** — ActionButton, ArrowArrowRight, BasicHistoric, ButtonMore, ButtonTV, ButtonWebEMobile, CheckboxWebEMobile, ChipsTV, ChipsWebEMobile, DropdownWebEMobile

**navigation** — ArrowArrowLeft, BackButtonBase, BackButtonTV, BasicFootball, BasicHome, BasicThumbDownOutline, BasicThumbUpOutline, BottomNavigationMobile, BottomSheetMobile, BroadcastCategoryLogo, BroadcastNavigationAllCategory, BroadcastNavigationCategory, ChannelLogo, ContextualMenuWebEMobile, HomeIndicatorAndroidEIOS, ListSlots, ListWebEMobile, MediaLive, MenuItemWebEMobile, NativeTabTvOS, NavigationMenu, SegmentedButton, Sidemenu, SubmenuItemTV, TabBarItem

**content** — ArrowChevronLeft, AutomaticTrailer, AvatarThumb, BannerAds, BasicEdit, CarrosselDestaquePremium, CategoryThumb, ChannelThumb, ContinueWatching, ContinueWatchingThumb, DestaquePremium, Highlight, HightlightBase, ImageOnAir, LiveThumb, MediaSkipNext, NavigationButtonWeb, NavigationClose2, NavigationMoreVertical, OLDTagResolution, PaginationIndicatorWeb, QRCode, Scoreboard, VideoThumb, VideoThumbBase

**player** — AgeIconsBase, AgeIndicatorBase, Back07, ButtonPlayer, ButtonPlayerBack, ButtonPlayerForward, ButtonPlayerSound, ClickMediaControl, ClickMediaControlBase, ControlButton, ControlButtonBackDefault, ControlButtonBackDisable, ControlButtonBackFocus, ControlButtonBackHover, ControlButtonFowardDefault, ControlButtonFowardDisable, ControlButtonFowardFocus, ControlButtonFowardHover, ControlButtonShareDefault, ControlButtonShareDisable, ControlButtonShareFocus, ControlButtonShareHover, ControlButtonSpeedDefault, ControlButtonSpeedDisable, ControlButtonSpeedHover, ControlButtonVolumeIconFocus, ControleRemotoTV, Cuepoint, CuepointBase, Foward05, IconButtonMiddlePanel, IconSoundOff, InfoTooltip, LabeledButton, LabeledButtonAssistirAoVivo, LabeledButtonBase, LabeledButtonBaseHoverTouch, LabeledButtonBaseNormalTV, LabeledButtonGoToLive, LabeledButtonGoToNow, LabeledInfoBlock, LineProgress, LineProgress0, LineProgress10, LineProgress100, LineProgress2, LineProgress20, LineProgress30, LineProgress40, LineProgress50, LineProgress60, LineProgress70, LineProgress80, LineProgress90, LiveIndicator, LoadingAndroid, MediaInfo, NonPlayback, PlaybackConfiguration, PlaybackControlLive, PlaybackControlMiddlePanel, PlaybackControlVoD, PlaybackTypeIndicatorBase, PlayerClick, PlayerClickBase, PlayerTV, PlayerTVBase, PlayerTouch, PlayerTouchBase, Scrubber, ScrubberDarkDefault, ScrubberDarkFocus, Seek10sBackward01, Seek10sFoward02, SeekBarLive, SeekBarVoD, Slider, Spacing14px03, Spacing28px03, Spacing316px03, Specs01, Speed09, TVMediaControl, TVMediaControlBase, TimeIndicator, TooltipTooltip, TouchMediaControl, TouchMediaControlBase

**more** — AccessibilityVoiceOver, AgendaEventLogos, AlertHelpOutline, AlertNotifications, ArrowChevronSmallDown, ArrowChevronUp, AvatarThumb2, Bars, BaseSystemStatusIcons, BasicAdd, BasicEpisodes, BasicExplore, BasicFamily, BasicKids, BasicLogOut, BasicMeuGloboplay, BasicMinhaListaOutline, BasicProfileCheck, BasicSearch, BasicSetting, BasicSort2, BasicTVValidation, ButtonWebEMobile4, ChooseAvatar, HeaderMenuIcon, HeaderMenuItem, HeaderMenuProfile, HeaderWeb, InfoPanel, InfoPanelSlots, MediaCover, MediaDownload, MediaPlay2, MenuItem, MenuTV, OLDTagMedia, PodcastBase, PosterThumb, SearchHistoricWeb, SegmentedButtonMobile, SegmentedButtonTV, SegmentedButtonWeb, TabBase, TooltipWeb, Top10Thumb, UserMenuFooter, UserMenuHeader, UserMenuWebEMobile, VideoFallback

**extra** — BasicBackspageOutline, BasicSpaceBar, BasicTrashOutline, EpisodeThumbHorizontal, EpisodeThumbVertical, FloatingActionButtonMobile, FooterWeb, IconsBasicThumb, Key, KeyContainer, KeyboardAndroidEIOS, KeyboardRoku, PaginationIndicator, SearchBar, SnackbarMobile, TrilhoDeTTulo, TrilhoDeTransmissO

**extra2** — HomeIndicator, KeyboardTV, Logo, MediaChromecast, MobileToolbar, Nacionalidade, NextVideo, NotificationMobile, NotificationTV, PartnerLogo, PartnerThumb, SpinnerNextVideo, StatusBar, StatusBarAndroidEIOS, TabWebEMobile, Time

**extra3** — PauseAds, Produtos, ResponsiveButton, ResponsiveFloatingActionButton, ResponsiveTextButton, SearchBoxAndroidTV, SearchBoxRoku, SeguranADaInformaO, Switch, TitleDetails, TrilhoDeCanal, TrilhoDeCategoria

**extra4** — AccessibilityAudiodescription2, AccessibilityClosedCaption2, AcessoRPidoWebE2, AlertInfoOutline2, BasicLock2, BasicMinhaListaAdd2, ButtonTV2, ButtonTV3, ButtonWebEMobile2, ButtonWebEMobile3, ChannelLogo3, DPad, DolbyAtmos2, Lock2, MediaSubtitles2, OLDContentRating2, OLDTag2, OLDTagMedia2, OLDTagResolution2, PosterThumb2, ProgressBar2, SelectorTV, SelectorWebEMobile, ServiceID3, SignatureLogo, StatusPosterVerticalSurprise, StickyBannerWebEMobile, SurpriseButtonTV, SurpriseButtonWebEMobile, SurpriseHint, SurpriseStatusPosterVertical, Tag3, TagContentRating2, TagMedia3, TagResolution3

**extra5** — AlertErrorOutline, GloboplayHorizontalGradient, SurpriseTrilhoVertical, TapumeVDeoMobile, TapumeVDeoTV, TapumeVDeoWeb, ToastWeb, ToolbarMobile, TrilhoContinueAssistindo, TrilhoDeParceiros, TrilhoDeVideo, TrilhoTop10

**extra6** — AirPlay11, AudioAndSubtitles08, BackIOS08, Backward09, ChromecastOff09, Download12, Fill13, FocusOrderSpect, FullscreenExit04, InfoComponenet, MediaInfo01, Note, Play01, ShareIOS02, Spacing424px03, SupportWhatsapp, SupportWhatsappHorizontal, Symbol, TVButton, TrocaDeCanais, Typography, UXSymbol, VolumeOff02, VolumeOn01

**internal** — AgendaBase, AmbientTitle, BorderRadius, Color, ComponentType, Device, DeviceDesktop, DeviceMobile, DeviceSmartTV, DeviceTablet, FocusVisible, PlaybackControlVoDBase, ScrubberBase, Shadow

**legacy** (deprecated — `Descontinuado` / `_[OLD]`) — BasicAddCircle, CheckCircle, Close05, KeyboardArrowDown, LiveScoreboard, MetadadosAgendaOld, NavigationMoreHorizontal, OLDBroadcastTV, OLDBroadcastWebEMobile, OLDContinueListeningThumb, OLDLiveThumb, OLDMediaCoverPodcast, OLDPlayerAppPodcast, OLDPlayerListagemPodcast, OLDPodcastEpisode, OLDPodcastThumb, OLDTrilhoContinueOuvindo, OLDTrilhoDePodcast, OLDVideoThumbHorizontal, OLDVideoThumbVertical, OfferTitle, Pause02, Share01

**icons** — `Icon` (wrapper over 280 glyph definitions; see `assets/icons/Icon.d.ts`)

### Intentional additions

- **`Icon`** — a thin wrapper over the extracted glyph data. The `.fig` defines each glyph as a
  separate component; one wrapper is far more usable than 280 exports.
- **Digit-leading kit symbols, renamed** — the kit numbers many of its standalone symbols
  (`01. Play`, `02. Pause`, `05. Close`, `07. Back`, `09. Speed`, `11. AirPlay`,
  `03. Spacing / 3. 16px`…). JavaScript identifiers cannot start with a digit, so the number
  moves to the end: `Play01`, `Pause02`, `Close05`, `Back07`, `Speed09`, `AirPlay11`,
  `Spacing316px03`. Same for `AirPlay11`, `AudioAndSubtitles08`, `BackIOS08`, `Backward09`,
  `ChromecastOff09`, `Download12`, `Fill13`, `FullscreenExit04`, `MediaInfo01`, `Foward05`,
  `Seek10sBackward01`, `Seek10sFoward02`, `Share01`, `ShareIOS02`, `Specs01`,
  `Spacing14px03`, `Spacing28px03`, `Spacing424px03`, `VolumeOn01`, `VolumeOff02`. These are
  **not inventions** — every one maps 1:1 to a symbol in the file. They are internal parts of
  the player chrome and the spec overlays, not a public API.
- **Numeric-suffixed duplicates** — where the kit defines several distinct components under the
  same layer name (four `Channel Logo` sets, three `Tag` sets, two `Acesso Rápido` sets…), the
  extras carry a numeric suffix: `ChannelLogo3`, `ChannelLogo4`, `Tag2`, `Tag3`,
  `AcessoRPidoWebE2`, `ProgressBar2`, `ServiceID3`, `TagContentRating2`, and so on. Same
  reason — distinct Figma components, one JS namespace.

### Known gaps

- **Coverage.** The `.fig` declares 455 component families in total (305 sets plus standalone
  symbols). **420 are built here** — the whole public inventory from `3. Componentes` and
  `4. Módulos`, the `_`-prefixed base layers those compose (`components/internal/`), and the
  deprecated `Descontinuado` / `_[OLD]` families (`components/legacy/`). The 35 still unbuilt
  are documentation artifacts, not components: breakpoint annotation markers
  (`1024px-$screen-md-min`, `1920px-$screen-xxxl-min`…), single-variant instance symbols of
  sets that ARE built (`[Web e Mobile] Chips/Full HD/Enabled` is one state of the `Chips`
  component), and spec-overlay leaf nodes inside `Time Indicator`. Per-flag, per-team and
  per-channel brand artwork lives in the file as bitmaps rather than vectors; those ship as
  images under `components/*/assets/` rather than as code.
- **Text styles.** The source file defines **no Figma text styles and no effect styles**
  (`fig-typography.css` is empty) — typography is documented as loose tokens on the
  `1. Fundação` page, which is what `tokens/typography.css` encodes.
- **Figma Variables.** Only one collection (`Device`, 22 variables) exists; 20 landed. The real
  token system lives in the documentation frames, transcribed by hand into `tokens/`.
- **Motion** is not specified anywhere in the source.
- **Flags and channel logos** are bitmap/nested artwork in the source and did not extract as
  vectors; `Channel Logo` and `Broadcast Logo` components carry the bitmaps they can.
