import { Fragment, ReactNode } from "react";

/**
 * legacyの文言カタログ(`src/i18n/messages/*.json`)には `<b>` や
 * `<span class='money'>` のような限定的なインラインタグを含む文字列がある
 * (例: `startBody`)。`dangerouslySetInnerHTML` は使わず、この2種類のタグだけを
 * 対象にした最小限のトークナイザーでReact要素へ変換する。
 * それ以外のタグは対象外(現状のカタログで実際に使われている範囲に絞っている)。
 */
const TAG_RE = /<b>(.*?)<\/b>|<span class='money'>(.*?)<\/span>/g;

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
    if (match[1] !== undefined) {
      nodes.push(<b key={key++}>{match[1]}</b>);
    } else {
      nodes.push(
        <span className="money" key={key++}>
          {match[2]}
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
