import { useState, useEffect } from "react";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";

export default function DynamicSkillSelector({ onFinalSelect }) {
  const [selections, setSelections] = useState([]);
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(false);

  // Charge les compétences enfants d’un parent
  const fetchChildren = async (parentId, level) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/competences/getParentsComp?parent_id=${parentId ?? "null"}`
      );
      const data = res.data ?? [];
      console.log(data);
      // Met à jour options SANS mutation, et nettoie les niveaux suivants
      setOptions((prev) => {
        const next = { ...prev };
        console.log(next);
        // supprime tout ce qui est après "level"
        Object.keys(next).forEach((k) => {
          if (Number(k) > level) delete next[k];
        });

        // définit les options du niveau courant
        next[level] = data;

        return next;
      });

      // Nettoie les sélections des niveaux suivants (garde jusqu’au level-1)
      setSelections((prev) => prev.slice(0, level));
      console.log(selections);
      return data;
    } catch (err) {
      console.error("Erreur API :", err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Initial load : compétences racines
  useEffect(() => {
    fetchChildren(null, 0);
  }, []);

  const handleSelect = async (level, id) => {
    const newSelections = [...selections.slice(0, level), id];
    setSelections(newSelections);

    // Charge le niveau suivant et récupère directement la réponse
    const children = await fetchChildren(id, level + 1);

    // Si pas d'enfants => sélection finale
    if (!children || children.length === 0) {
      onFinalSelect?.(newSelections);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
      <Typography variant="h6">Sélectionne une compétence</Typography>

      {Object.keys(options)
        .map(Number)
        .sort((a, b) => a - b)
        .map((level) => {
          const currentOptions = options[level];
          if (!currentOptions || currentOptions.length === 0) return null;

          return (
            <FormControl key={level} fullWidth>
              <InputLabel>{`Niveau ${level + 1}`}</InputLabel>
              <Select
                value={selections[level] ?? ""}
                onChange={(e) => handleSelect(level, e.target.value)}
                label={`Niveau ${level + 1}`}
              >
                {currentOptions.map((comp) => (
                  <MenuItem key={comp.id} value={comp.id}>
                    {comp.nom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        })}

      {loading && <CircularProgress size={24} />}
    </Box>
  );
}
