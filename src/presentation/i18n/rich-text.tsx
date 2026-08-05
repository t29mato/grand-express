import { Fragment, ReactNode } from "react";

/**
 * legacyの文言カタログ(`src/i18n/messages/*.json`)には `<b>` や
 * `<span class='money'>`、`<span style='color:var(--gold)'>` のような限定的な
 * インラインタグを含む文字列がある。`dangerouslySetInnerHTML` は使わず、
 * 実際にカタログで使われている範囲のタグだけをReact要素へ変換する。
 *
 * `style` 属性はカタログ内で使われている `color: var(--x)` 形式のみを受け付け、
 * それ以外の宣言は無視する(想定外の値をそのままCSSに流し込まないため)。
 */
const TAG_RE = /<b>(.*?)<\/b>|<span\s+(class|style)=['"]([^'"]*)['"]\s*>(.*?)<\/span>/g;

/** `color: var(--gold)` のような単純な色指定だけを取り出す。 */
const COLOR_RE = /^\s*color\s*:\s*(var\(--[a-z0-9-]+\)|#[0-9a-f]{3,8}|[a-z]+)\s*;?\s*$/i;

function parseStyle(value: string): { color: string } | undefined {
  const match = COLOR_RE.exec(value);
  return match ? { color: match[1] } : undefined;
}

export function renderRichText(text: string): ReactNode {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  TAG_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = TAG_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(<Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>);
    }
    const [, boldContent, attrName, attrValue, spanContent] = match;
    if (boldContent !== undefined) {
      nodes.push(<b key={key++}>{boldContent}</b>);
    } else if (attrName === "class") {
      nodes.push(
        <span className={attrValue} key={key++}>
          {spanContent}
        </span>,
      );
    } else {
      const style = parseStyle(attrValue);
      nodes.push(
        <span style={style} key={key++}>
          {spanContent}
        </span>,
      );
    }
    lastIndex = TAG_RE.lastIndex;
  }
  if (lastIndex < text.length) {
    nodes.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>);
  }
  return nodes;
}
