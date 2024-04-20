export function convertColorToBackground(html: String) {
  return html.replace("color:", "background:");
}

export function stripTags(html: String) {
  return html.replace(/<[^>]*>?/gm, "");
}
