const API_BASE = process.env.REACT_APP_API_BASE || window.location.origin;

const fetchWithCreds = (url, options = {}) =>
  fetch(url, {
    credentials: "include",
    ...options,
  });

export async function uploadImage(file, zone = "gallery", meta = {}) {
  const formData = new FormData();
  formData.append("file", file);

  if (meta?.label) formData.append("label", meta.label);

  const res = await fetchWithCreds(
    `${API_BASE}/api/media/upload?zone=${zone}`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || "Upload failed");

  return data.ID_media;
}

export async function attachMediaToCharacter(
  ID_character,
  ID_media,
  slot,
  extra = {},
) {
  const res = await fetchWithCreds(
    `${API_BASE}/api/character_media/characters/${ID_character}/media`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ID_media, slot, ...extra }),
    },
  );

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || "Attach failed");

  return data;
}

export async function loadCharacterMedia(ID_character, slot) {
  const qs = slot ? `?slot=${encodeURIComponent(slot)}` : "";
  const res = await fetchWithCreds(
    `${API_BASE}/api/character_media/characters/${ID_character}/media${qs}`,
  );

  const data = await res.json().catch(() => []);
  if (!res.ok) throw new Error(data?.message || "Load failed");

  return data;
}
