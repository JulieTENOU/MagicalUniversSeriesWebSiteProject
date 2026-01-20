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
      setOptions((prev) => ({
        ...prev,
        [level]: res.data,
      }));
      // Nettoie les sélections et options des niveaux suivants
      setSelections((prev) => prev.slice(0, level));
      const levelsToClear = Object.keys(options).filter((l) => l > level);
      levelsToClear.forEach((l) => delete options[l]);
    } catch (err) {
      console.error("Erreur API :", err);
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
    await fetchChildren(id, level + 1);

    // Tu peux déclencher une action quand y'a plus de sous-éléments
    const nextLevelOptions = options[level + 1];
    if (!nextLevelOptions || nextLevelOptions.length === 0) {
      if (onFinalSelect) {
        onFinalSelect(newSelections); // tableau d’IDs sélectionnés
      }
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
      <Typography variant="h6">Sélectionne une compétence</Typography>

      {[...Object.keys(options)].map((level) => {
        const currentOptions = options[level];
        if (!currentOptions || currentOptions.length === 0) return null;

        return (
          <FormControl key={level} fullWidth>
            <InputLabel>{`Niveau ${parseInt(level) + 1}`}</InputLabel>
            <Select
              value={selections[level] || ""}
              onChange={(e) => handleSelect(Number(level), e.target.value)}
              label={`Niveau ${parseInt(level) + 1}`}
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
