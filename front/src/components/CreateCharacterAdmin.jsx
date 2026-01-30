import { Box, Typography, Button, MenuItem, TextField } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import Btn from "./Btn";
import { ConnexionContext } from "./provider";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function CreateCharacterAdmin() {
  const { state: currentUser } = useContext(ConnexionContext);
  const theme = useTheme();

  const [activeTab, setActiveTab] = useState("identite");
  const [openEquipDialog, setOpenEquipDialog] = useState(false);

  // ✅ owner
  const [ownerId, setOwnerId] = useState("");

  // mêmes choix init (si tu veux garder inventory init)
  const [initialChoices, setInitialChoices] = useState({
    virtual_game: false,
    weapon_choice: "",
  });

  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    fetch("/users/findAllUser", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        // accepte soit un array direct, soit {data:[...]}
        const arr = Array.isArray(data) ? data : (data?.data ?? []);
        setUsersList(arr);
      })
      .catch(() => setUsersList([]));
  }, []);

  const playerUsers = usersList.filter((u) => u.users_status === "p");

  // --- States perso ---
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [sexe, setSexe] = useState("");
  const [race, setRace] = useState("");
  const [metier, setMetier] = useState("");
  const [oeilD, setOeilD] = useState("");
  const [oeilG, setOeilG] = useState("");
  const [cheveux, setCheveux] = useState("");
  const [taille, setTaille] = useState("");
  const [poids, setPoids] = useState("");
  const [signes, setSignes] = useState("");
  const [traits, setTraits] = useState("");
  const [agence, setAgence] = useState("");
  const [planete, setPlanete] = useState("");

  // Attributs (D20) -> ✅ saisie manuelle
  const [force, setForce] = useState("");
  const [dexte, setDexte] = useState("");
  const [resistance, setResistance] = useState("");
  const [resilience, setResilience] = useState("");
  const [intell, setIntell] = useState("");
  const [charisme, setCharisme] = useState("");
  const [chance, setChance] = useState("");

  // Ressources (D100) -> ✅ saisie manuelle
  const [stamina, setStamina] = useState("");
  const [manaVital, setManaVital] = useState("");
  const [manaEau, setManaEau] = useState("");
  const [manaTerre, setManaTerre] = useState("");
  const [manaFeu, setManaFeu] = useState("");
  const [manaAir, setManaAir] = useState("");
  const [manaVolonte, setManaVolonte] = useState("");

  // options dynamiques
  const [raceOptions, setRaceOptions] = useState([]);
  const [metierOptions, setMetierOptions] = useState([]);
  const [agenceOptions, setAgenceOptions] = useState([]);
  const [planeteOptions, setPlaneteOptions] = useState([]);

  useEffect(() => {
    fetch("/api/races/findAllRace")
      .then((res) => res.json())
      .then((data) =>
        setRaceOptions(
          data.map((r) => ({ label: r.race_name, value: r.race_name })),
        ),
      )
      .catch(() => setRaceOptions([]));

    fetch("/api/metiers/findAllJobs")
      .then((res) => res.json())
      .then((data) =>
        setMetierOptions(
          data.map((m) => ({ label: m.metier_name, value: m.metier_name })),
        ),
      )
      .catch(() => setMetierOptions([]));

    fetch("/api/agences/findAllAgences")
      .then((res) => res.json())
      .then((data) =>
        setAgenceOptions(
          data.map((a) => ({
            label: a.agence_name,
            value: a.agence_name,
            classement: a.agence_classement,
            specialite: a.agence_specialite,
          })),
        ),
      )
      .catch(() => setAgenceOptions([]));

    fetch("/api/planete/findAllPlanete")
      .then((res) => res.json())
      .then((data) =>
        setPlaneteOptions(
          data.map((p) => ({ label: p.planete_name, value: p.planete_name })),
        ),
      )
      .catch(() => setPlaneteOptions([]));
  }, []);

  const sexeOptions = [
    { label: "Homme", value: "Homme" },
    { label: "Femme", value: "Femme" },
    { label: "Autre", value: "Autre" },
  ];

  // VALIDATION (comme toi, + owner)
  function isIdentiteValid() {
    return (
      ownerId &&
      name.trim() &&
      age.toString().trim() &&
      sexe.trim() &&
      race.trim() &&
      metier.trim() &&
      agence.trim() &&
      planete.trim() &&
      oeilD.trim() &&
      oeilG.trim() &&
      cheveux.trim() &&
      taille.toString().trim() &&
      poids.toString().trim() &&
      signes.trim() &&
      traits.trim()
    );
  }
  function isAttributsValid() {
    return (
      force !== "" &&
      dexte !== "" &&
      resistance !== "" &&
      resilience !== "" &&
      intell !== "" &&
      charisme !== "" &&
      chance !== ""
    );
  }
  function isRessourcesValid() {
    return (
      stamina !== "" &&
      manaVital !== "" &&
      manaEau !== "" &&
      manaTerre !== "" &&
      manaFeu !== "" &&
      manaAir !== "" &&
      manaVolonte !== ""
    );
  }
  const isAllValid =
    isIdentiteValid() && isAttributsValid() && isRessourcesValid();

  const needsWeaponChoice = metier === "Palladin";

  const tabs = [
    { key: "identite", label: "Identité", disabled: false },
    { key: "attributs", label: "Attributs", disabled: !isIdentiteValid() },
    {
      key: "ressources",
      label: "Ressources",
      disabled: !isIdentiteValid() || !isAttributsValid(),
    },
  ];

  const buildDataPayload = () => ({
    Name_character: name,
    Age_character: Number(age),
    Sexe_character: sexe,
    Race_character: race,
    Metier_character: metier,
    OeilD_character: oeilD,
    OeilG_character: oeilG,
    Cheveux_character: cheveux,
    Taille_character: Number(taille),
    Poids_character: Number(poids),
    Signes_character: signes,
    Traits_character: traits,
    Agence_character: agence,
    Planete_character: planete,

    Force_character: Number(force),
    Dexte_character: Number(dexte),
    Resistance_character: Number(resistance),
    Resilience_character: Number(resilience),
    Intell_character: Number(intell),
    Charisme_character: Number(charisme),
    Chance_character: Number(chance),

    Stamina_character: Number(stamina),
    ManaVital_character: Number(manaVital),
    ManaEau_character: Number(manaEau),
    ManaTerre_character: Number(manaTerre),
    ManaFeu_character: Number(manaFeu),
    ManaAir_character: Number(manaAir),
    ManaVolonte_character: Number(manaVolonte),

    // ✅ owner imposé par admin
    users_ID: Number(ownerId),
  });

  const sendCreate = async () => {
    const data = {
      ...buildDataPayload(),
      initialChoices,
    };

    try {
      const res = await fetch("/api/characters/adminCreateCharacter_TEMP", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        console.error("ADMIN CREATE TEMP FAILED", res.status, payload);
        alert(payload?.error || "Erreur création admin.");
        return;
      }

      alert("Personnage créé !");
      // TODO: redirect/snackbar si tu veux
    } catch (e) {
      console.error("NETWORK ERROR", e);
      alert("Erreur réseau");
    }
  };

  const handleSubmit = () => {
    if (!isAllValid) return;

    // on garde ta logique : popup equip
    if (needsWeaponChoice) {
      setOpenEquipDialog(true);
      return;
    }
    setOpenEquipDialog(true);
  };

  const handleCloseEquipDialog = () => setOpenEquipDialog(false);

  const handleConfirmEquipDialog = async () => {
    if (
      needsWeaponChoice &&
      initialChoices.weapon_choice !== "arc" &&
      initialChoices.weapon_choice !== "arbalète"
    ) {
      alert("Choisis une arme (arc ou arbalète).");
      return;
    }
    setOpenEquipDialog(false);
    await sendCreate();
  };

  return (
    <Box
      sx={{
        backgroundColor: theme?.custom?.mymodal?.main || "rgba(20,30,70,0.94)",
        color: theme?.custom?.mymodal?.text || "#fff",
        borderRadius: "8px",
        maxWidth: "900px",
        margin: "30px auto",
        boxShadow: 8,
      }}
    >
      {/* Onglets */}
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {tabs.map(({ key, label, disabled }) => (
          <Btn
            key={key}
            onClick={() => !disabled && setActiveTab(key)}
            msg={
              <Typography
                sx={{
                  width: "100%",
                  textAlign: "center",
                  padding: "8px 0",
                  backgroundColor:
                    activeTab === key
                      ? theme?.custom?.mymodal?.header || "#2e3867"
                      : theme?.custom?.mymodal?.button || "#1b2140",
                  fontWeight: "bold",
                  color: disabled
                    ? "#777"
                    : activeTab === key
                      ? "#fff"
                      : "#99aacc",
                  fontSize: "1.05rem",
                  cursor: disabled ? "not-allowed" : "pointer",
                  opacity: disabled ? 0.6 : 1,
                }}
              >
                {label}
              </Typography>
            }
            sx={{
              overflow: "hidden",
              textDecoration: "none",
              flex: 1,
              width: "100%",
              padding: 0,
              backgroundColor: theme?.custom?.mymodal?.button,
              borderRadius:
                key === "identite"
                  ? "5px 0 0 0"
                  : key === "ressources"
                    ? "0 5px 0 0"
                    : "0",
            }}
            disabled={disabled}
          />
        ))}
      </Box>

      {/* Contenu */}
      <Box sx={{ padding: 4, maxHeight: "60vh", overflowY: "auto" }}>
        {/* IDENTITE */}
        {activeTab === "identite" && (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 4,
            }}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="h6" gutterBottom>
                Identité (Admin)
              </Typography>

              <TextField
                label="Propriétaire (joueur)"
                select
                value={ownerId}
                onChange={(e) => setOwnerId(e.target.value)}
                fullWidth
                margin="normal"
                required
              >
                {playerUsers.map((u) => (
                  <MenuItem key={u.users_ID} value={u.users_ID}>
                    {u.users_pseudo || u.users_name || u.users_email || "User"}{" "}
                    — #{u.users_ID}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Âge"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                type="number"
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Sexe"
                select
                value={sexe}
                onChange={(e) => setSexe(e.target.value)}
                fullWidth
                margin="normal"
                required
              >
                {sexeOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Race"
                select
                value={race}
                onChange={(e) => setRace(e.target.value)}
                fullWidth
                margin="normal"
                required
              >
                {raceOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Métier"
                select
                value={metier}
                onChange={(e) => setMetier(e.target.value)}
                fullWidth
                margin="normal"
                required
              >
                {metierOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Agence"
                select
                value={agence}
                onChange={(e) => setAgence(e.target.value)}
                fullWidth
                margin="normal"
                required
              >
                {agenceOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "bold" }}
                      >
                        {opt.label} &nbsp;
                        <span style={{ color: "#FFD700" }}>
                          {opt.classement}
                        </span>
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#bbb" }}>
                        {opt.specialite}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
                <MenuItem key="Autre" value="Autre">
                  Autre
                </MenuItem>
              </TextField>

              <TextField
                label="Planète"
                select
                value={planete}
                onChange={(e) => setPlanete(e.target.value)}
                fullWidth
                margin="normal"
                required
              >
                {planeteOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
                <MenuItem key="Autre" value="Autre">
                  Autre
                </MenuItem>
              </TextField>
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="h6" gutterBottom>
                Particularités et Background
              </Typography>
              <TextField
                label="Couleur œil droit"
                value={oeilD}
                onChange={(e) => setOeilD(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Couleur œil gauche"
                value={oeilG}
                onChange={(e) => setOeilG(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Cheveux"
                value={cheveux}
                onChange={(e) => setCheveux(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Taille (cm)"
                value={taille}
                onChange={(e) => setTaille(e.target.value)}
                type="number"
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Poids (kg)"
                value={poids}
                onChange={(e) => setPoids(e.target.value)}
                type="number"
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Signes particuliers"
                value={signes}
                onChange={(e) => setSignes(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Background"
                value={traits}
                onChange={(e) => setTraits(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
            </Box>
          </Box>
        )}

        {/* ATTRIBUTS (saisie manuelle) */}
        {activeTab === "attributs" && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Attributs (saisie manuelle)
            </Typography>

            {[
              ["Force", force, setForce],
              ["Dextérité", dexte, setDexte],
              ["Résistance", resistance, setResistance],
              ["Résilience", resilience, setResilience],
              ["Intelligence", intell, setIntell],
              ["Charisme", charisme, setCharisme],
              ["Chance", chance, setChance],
            ].map(([label, val, setter]) => (
              <Box
                key={label}
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <Typography sx={{ flex: 1 }}>{label}</Typography>
                <TextField
                  value={val}
                  onChange={(e) => setter(e.target.value)}
                  type="number"
                  size="small"
                  sx={{ width: 120 }}
                />
              </Box>
            ))}
          </Box>
        )}

        {/* RESSOURCES (saisie manuelle) */}
        {activeTab === "ressources" && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Ressources (saisie manuelle)
            </Typography>

            {[
              ["Stamina", stamina, setStamina],
              ["Mana Vital", manaVital, setManaVital],
              ["Mana Eau", manaEau, setManaEau],
              ["Mana Terre", manaTerre, setManaTerre],
              ["Mana Feu", manaFeu, setManaFeu],
              ["Mana Air", manaAir, setManaAir],
              ["Mana Volonté", manaVolonte, setManaVolonte],
            ].map(([label, val, setter]) => (
              <Box
                key={label}
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <Typography sx={{ flex: 1 }}>{label}</Typography>
                <TextField
                  value={val}
                  onChange={(e) => setter(e.target.value)}
                  type="number"
                  size="small"
                  sx={{ width: 140 }}
                />
              </Box>
            ))}
          </Box>
        )}

        {/* Bouton final */}
        <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              color: theme?.custom?.mymodal?.text || "#fff",
              backgroundColor: theme?.custom?.mymodal?.button || "#5fa7f5",
              boxShadow: 4,
            }}
            onClick={handleSubmit}
            disabled={!isAllValid}
          >
            Créer le personnage (Admin)
          </Button>
        </Box>
      </Box>

      {/* Popup équipement (inchangé) */}
      <Dialog
        open={openEquipDialog}
        onClose={handleCloseEquipDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Équipement de départ</DialogTitle>

        <DialogContent dividers>
          <FormControlLabel
            control={
              <Checkbox
                checked={initialChoices.virtual_game}
                onChange={(e) =>
                  setInitialChoices((prev) => ({
                    ...prev,
                    virtual_game: e.target.checked,
                  }))
                }
              />
            }
            label="Prendre un Virtual Game dès le départ (optionnel)"
          />

          {needsWeaponChoice && (
            <FormControl sx={{ mt: 2 }}>
              <FormLabel>Choix d'arme (obligatoire)</FormLabel>
              <RadioGroup
                value={initialChoices.weapon_choice}
                onChange={(e) =>
                  setInitialChoices((prev) => ({
                    ...prev,
                    weapon_choice: e.target.value,
                  }))
                }
              >
                <FormControlLabel value="arc" control={<Radio />} label="Arc" />
                <FormControlLabel
                  value="arbalète"
                  control={<Radio />}
                  label="Arbalète"
                />
              </RadioGroup>
            </FormControl>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseEquipDialog}>Annuler</Button>
          <Button variant="contained" onClick={handleConfirmEquipDialog}>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
