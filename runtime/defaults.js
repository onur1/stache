// https://developer.mozilla.org/en-US/docs/Web/HTML/Element
const htmlTags = {
  // Main root
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#main_root
  html: true,
  // Document metadata
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#document_metadata
  base: true,
  head: true,
  link: true,
  meta: true,
  style: true,
  title: true,
  // Sectioning root
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#sectioning_root
  body: true,
  // Content sectioning
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#content_sectioning
  address: true,
  article: true,
  aside: true,
  footer: true,
  header: true,
  h1: true,
  h2: true,
  h3: true,
  h4: true,
  h5: true,
  h6: true,
  main: true,
  nav: true,
  section: true,
  // Text content
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#text_content
  blockquote: true,
  dd: true,
  div: true,
  dl: true,
  dt: true,
  figcaption: true,
  figure: true,
  hr: true,
  li: true,
  menu: true,
  ol: true,
  p: true,
  pre: true,
  ul: true,
  // Inline text semantics
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#inline_text_semantics
  a: true,
  abbr: true,
  b: true,
  bdi: true,
  bdo: true,
  br: true,
  cite: true,
  code: true,
  data: true,
  dfn: true,
  em: true,
  i: true,
  kbd: true,
  mark: true,
  q: true,
  rp: true,
  rt: true,
  ruby: true,
  s: true,
  samp: true,
  small: true,
  span: true,
  strong: true,
  sub: true,
  sup: true,
  time: true,
  u: true,
  var: true,
  wbr: true,
  // Image and multimedia
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#image_and_multimedia
  area: true,
  audio: true,
  img: true,
  map: true,
  track: true,
  video: true,
  // Embedded content
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#embedded_content
  embed: true,
  iframe: true,
  object: true,
  param: true,
  picture: true,
  portal: true,
  source: true,
  // SVG and MathML
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#svg_and_mathml
  svg: true,
  math: true,
  // Scripting
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#scripting
  canvas: true,
  noscript: true,
  script: true,
  // Demarcating edits
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#demarcating_edits
  del: true,
  ins: true,
  // Table content
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#table_content
  caption: true,
  col: true,
  colgroup: true,
  table: true,
  tbody: true,
  td: true,
  tfoot: true,
  th: true,
  thead: true,
  tr: true,
  // Forms
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#forms
  button: true,
  datalist: true,
  fieldset: true,
  form: true,
  input: true,
  label: true,
  legend: true,
  meter: true,
  optgroup: true,
  option: true,
  output: true,
  progress: true,
  select: true,
  textarea: true,
  // Interactive elements
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#interactive_elements
  details: true,
  dialog: true,
  summary: true,
  // Web components
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#web_components
  slot: true,
  template: true,
  // Obsolete and deprecated elements
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#obsolete_and_deprecated_elements
  acronym: true,
  applet: true,
  basefont: true,
  bgsound: true,
  big: true,
  blink: true,
  center: true,
  content: true,
  dir: true,
  font: true,
  frame: true,
  frameset: true,
  hgroup: true,
  image: true,
  keygen: true,
  marquee: true,
  menuitem: true,
  nobr: true,
  noembed: true,
  noframes: true,
  plaintext: true,
  rb: true,
  rtc: true,
  shadow: true,
  spacer: true,
  strike: true,
  tt: true,
  xmp: true,
}

const selfClosingTags = {
  area: true,
  base: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  menuitem: true, // see: https://github.com/facebook/react/blob/85dcbf83/src/renderers/dom/shared/ReactDOMComponent.js#L437
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true,
}

module.exports = {
  htmlTags,
  selfClosingTags,
}
