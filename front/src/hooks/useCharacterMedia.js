import { useCallback, useEffect, useMemo, useState } from "react";
import { loadCharacterMedia } from "../service/mediaApi"; // ou fetchCharacterMedia si tu renommes

export function useCharacterMedia(ID_character) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    if (!ID_character) return;
    setLoading(true);
    setError(null);
    try {
      const data = await loadCharacterMedia(ID_character); // récup tout
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [ID_character]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const avatar = useMemo(
    () => items.find((m) => m.slot === "avatar") || null,
    [items],
  );

  const gallery = useMemo(
    () => items.filter((m) => m.slot === "gallery"),
    [items],
  );

  return { items, avatar, gallery, loading, error, refresh };
}
