import { Box, Typography, Button, MenuItem, TextField } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import Btn from "./Btn";
import Dice3D from "./Dice3D";
import { useContext } from "react";
import { ConnexionContext } from "./provider"; // adapte le chemin exact
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
import { useMediaQuery } from "@mui/material";

export default function CreationPersonnage() {
  const [activeTab, setActiveTab] = useState("identite");
  const [openEquipDialog, setOpenEquipDialog] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [currentStep, setCurrentStep] = useState(0);

  const [initialChoices, setInitialChoices] = useState({
    virtual_game: false,
    weapon_choice: "", // "arc" | "arbalète"
  });

  const { state: currentUser } = useContext(ConnexionContext);

  // -- States des valeurs du personnage --
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

  // Attributs (D20)
  const [force, setForce] = useState("");
  const [dexte, setDexte] = useState("");
  const [resistance, setResistance] = useState("");
  const [resilience, setResilience] = useState("");
  const [intell, setIntell] = useState("");
  const [charisme, setCharisme] = useState("");
  const [chance, setChance] = useState("");

  // Ressources (D100)
  const [stamina, setStamina] = useState("");
  const [manaVital, setManaVital] = useState("");
  const [manaEau, setManaEau] = useState("");
  const [manaTerre, setManaTerre] = useState("");
  const [manaFeu, setManaFeu] = useState("");
  const [manaAir, setManaAir] = useState("");
  const [manaVolonte, setManaVolonte] = useState("");

  // -- Sélecteurs dynamiques --
  const [raceOptions, setRaceOptions] = useState([]);
  const [metierOptions, setMetierOptions] = useState([]);
  const [agenceOptions, setAgenceOptions] = useState([]);
  const [planeteOptions, setPlaneteOptions] = useState([]);

  // -- Bouton "lancer" attributs et ressources --
  const attributs = [
    { label: "Force", value: force, setValue: setForce, die: 20 },
    { label: "Dextérité", value: dexte, setValue: setDexte, die: 20 },
    {
      label: "Résistance",
      value: resistance,
      setValue: setResistance,
      die: 20,
    },
    {
      label: "Résilience",
      value: resilience,
      setValue: setResilience,
      die: 20,
    },
    { label: "Intelligence", value: intell, setValue: setIntell, die: 20 },
    { label: "Charisme", value: charisme, setValue: setCharisme, die: 20 },
    { label: "Chance", value: chance, setValue: setChance, die: 20 },
  ];
  const ressources = [
    { label: "Stamina", value: stamina, setValue: setStamina, die: 100 },
    { label: "Mana Vital", value: manaVital, setValue: setManaVital, die: 100 },
    { label: "Mana Eau", value: manaEau, setValue: setManaEau, die: 100 },
    { label: "Mana Terre", value: manaTerre, setValue: setManaTerre, die: 100 },
    { label: "Mana Feu", value: manaFeu, setValue: setManaFeu, die: 100 },
    { label: "Mana Air", value: manaAir, setValue: setManaAir, die: 100 },
    {
      label: "Mana Volonté",
      value: manaVolonte,
      setValue: setManaVolonte,
      die: 100,
    },
  ];

  // --- Dynamic Select options from API ---
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

  // Select options
  const sexeOptions = [
    { label: "Homme", value: "Homme" },
    { label: "Femme", value: "Femme" },
    { label: "Autre", value: "Autre" },
  ];

  // --- VALIDATION ---
  function isIdentiteValid() {
    return (
      name.trim() &&
      age.trim() &&
      sexe.trim() &&
      race.trim() &&
      metier.trim() &&
      agence.trim() &&
      planete.trim() &&
      oeilD.trim() &&
      oeilG.trim() &&
      cheveux.trim() &&
      taille.trim() &&
      poids.trim() &&
      signes.trim() &&
      traits.trim()
    );
  }
  function isAttributsValid() {
    return (
      force && dexte && resistance && resilience && intell && charisme && chance
    );
  }
  function isRessourcesValid() {
    return (
      stamina &&
      manaVital &&
      manaEau &&
      manaTerre &&
      manaFeu &&
      manaAir &&
      manaVolonte
    );
  }
  const isAllValid =
    isIdentiteValid() && isAttributsValid() && isRessourcesValid();

  const needsWeaponChoice = metier === "Palladin";

  // --- Onglets avec navigation bloquée ---
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
    // users_ID inutile si back utilise req.userId via verifyToken
  });

  const sendCreate = async () => {
    const data = {
      ...buildDataPayload(),
      initialChoices, // ✅ envoyé au back
    };

    try {
      const res = await fetch("/api/characters/createCharacter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const payload = await res.json().catch(() => ({}));

      if (!res.ok) {
        console.error("CREATE FAILED", res.status, payload);
        return;
      }

      console.log("CREATED", payload);
      // TODO: redirect/snackbar
    } catch (e) {
      console.error("NETWORK ERROR", e);
    }
  };

  const handleSubmit = () => {
    if (!isAllValid) return;

    // si palladin, on force le choix arc/arbalète via popup
    if (needsWeaponChoice) {
      setOpenEquipDialog(true);
      return;
    }

    // sinon popup quand même (virtual game) ? au choix :
    setOpenEquipDialog(true);
  };

  const handleCloseEquipDialog = () => {
    setOpenEquipDialog(false);
  };

  const handleConfirmEquipDialog = async () => {
    // validation : si palladin -> arme obligatoire
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

  const dieRef = useRef(null);
  // --- RENDER ---
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
      {!isMobile && (
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
      )}

      {/* INDICATEUR D'ÉTAPE — mobile uniquement */}
      {isMobile && (
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          padding: "12px",
          backgroundColor: theme?.custom?.mymodal?.button,
          borderRadius: "8px 8px 0 0",
        }}>
          {tabs.map(({ label }, i) => (
            <Box key={i} sx={{
              width: 10, height: 10,
              borderRadius: "50%",
              backgroundColor: i === currentStep ? "white" : "rgba(255,255,255,0.3)",
            }} />
          ))}
          <Typography sx={{ color: "white", fontSize: "0.9rem", ml: 1 }}>
            {tabs[currentStep].label}
          </Typography>
        </Box>
      )}

      {/* Contenu */}
      <Box className="create-character-content"
        sx={{
          display: "flex",
          flexDirection: "row",
          padding: 4,
          maxHeight: "60vh",
          overflowY: "auto",
          gap: 4,
        }}
      >
        {/* Centre: Colonne principale */}
        <Box sx={{ flex: 3 }}>
          {/* Onglet IDENTITE */}
          {(isMobile ? currentStep === 0 : activeTab === "identite") && (
            // {activeTab === "identite" && (
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 4,
              }}
            >
              {/* Colonne 1 */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="h6" gutterBottom>
                  Identité
                </Typography>
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

              {/* Colonne 2 */}
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

          {/* Onglet ATTRIBUTS */}

          {(isMobile ? currentStep === 1 : activeTab === "attributs") && (
            // {activeTab === "attributs" && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Attributs (jet de dé 20)
              </Typography>
              {attributs.map((attr) => (
                <Box
                  key={attr.label}
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <Typography sx={{ flex: 1 }}>{attr.label}</Typography>
                  <TextField
                    value={attr.value || ""}
                    size="small"
                    sx={{ width: 80 }}
                    disabled
                  />
                  <Button
                    variant="outlined"
                    onClick={() => {
                      const roll = Math.ceil(Math.random() * attr.die);
                      attr.setValue(roll);
                      dieRef.current?.roll(roll);
                    }}
                  >
                    {`Lancer D${attr.die}`}
                  </Button>
                </Box>
              ))}
            </Box>
          )}

          {/* Onglet RESSOURCES */}
          {(isMobile ? currentStep === 2 : activeTab === "ressources") && (
            // {activeTab === "ressources" && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Ressources (jet de dé 100)
              </Typography>
              {ressources.map((res) => (
                <Box
                  key={res.label}
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <Typography sx={{ flex: 1 }}>{res.label}</Typography>
                  <TextField
                    value={res.value || ""}
                    size="small"
                    sx={{ width: 80 }}
                    disabled
                  />
                  <Button
                    variant="outlined"
                    onClick={() => {
                      const roll = Math.ceil(Math.random() * res.die);
                      res.setValue(roll);
                      dieRef.current?.roll(roll);
                    }}
                  >
                    {`Lancer D${res.die}`}
                  </Button>
                </Box>
              ))}
            </Box>
          )}

          {/* BOUTON NAVIGATION MOBILE */}
          {isMobile && currentStep < 2 && (
            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
              <Button
                variant="contained"
                onClick={() => setCurrentStep(prev => prev + 1)}
                sx={{
                  color: theme?.custom?.mymodal?.text,
                  backgroundColor: theme?.custom?.mymodal?.button,
                }}
              >
                Étape suivante →
              </Button>
            </Box>
          )}

          {/* Bouton final */}
          {(!isMobile || currentStep === 2) && (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  color: theme?.custom?.mymodal?.text || "#fff",
                  backgroundColor: theme?.custom?.mymodal?.button || "#5fa7f5",
                  boxShadow: 4,
                }}
                onClick={handleSubmit}
                disabled={!isAllValid}
              >
                Créer le personnage
              </Button>
            </Box>
          )}
        </Box>

        {/* EN-CART DÉ UNIQUE À DROITE */}
        {/* 
          Ici tu remettras plus tard ton Dice3D custom
          Tu peux laisser ce block, ou le virer temporairement. 
          Si tu veux garder la mise en page : 
        */}
        {!isMobile && (
          <Box className="create-character-dice"
            sx={{
              flex: 1,
              minWidth: 220,
              maxWidth: 220,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // justifyContent: "flex-start",
              pt: 2,
              visibility:
                activeTab === "attributs" || activeTab === "ressources"
                  ? "visible"
                  : "hidden",
              height:
                activeTab === "attributs" || activeTab === "ressources" ? 280 : 0,
              border: "2px dashed #3a3a4a",
              borderRadius: 2,
              position: "relative",
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Dé en cours de test
            </Typography>
            <Dice3D
              key={activeTab}
              ref={dieRef}
              sides={activeTab === "ressources" ? 100 : 20}
              size={200}
              color="#eeeeee"
              background="#0b102a"
              onRollEnd={(v) => console.log(v)}
            />
          </Box>
        )}
      </Box>

      <Dialog
        open={openEquipDialog}
        onClose={handleCloseEquipDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Équipement de départ</DialogTitle>

        <DialogContent dividers>
          {/* Virtual game (optionnel pour tous) */}
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

          {/* Choix arc/arbalète uniquement pour Palladin */}
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
