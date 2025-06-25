export function getAvatarPlaceholderUrl(
  username = "username",
  styleName = "shapes"
) {
  const url = new URL(`https://api.dicebear.com/9.x/${styleName}/svg`);
  url.searchParams.append("seed", username);
  return url.toString();
}
