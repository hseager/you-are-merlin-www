export function toButton(html: String) {
  let button = html.replace("color:", "background:");
  button = button.replace(");", "-dark);");
  return button;
}

export function stripTags(html: String) {
  return html.replace(/<[^>]*>?/gm, "");
}
