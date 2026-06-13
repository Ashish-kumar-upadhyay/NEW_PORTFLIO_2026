const EMAIL_USER = "ashishkumarupadhyay0328";
const EMAIL_DOMAIN = "gmail.com";

export function openEmailClient() {
  window.location.href = `mailto:${EMAIL_USER}@${EMAIL_DOMAIN}`;
}
