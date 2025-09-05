import { Box, Typography, Button, MenuItem, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import Btn from "./Btn";

export default function CreationPersonnage({ theme }) {
  const [activeTab, setActiveTab] = useState("identite");

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
    { label: "Résistance", value: resistance, setValue: setResistance, die: 20 },
    { label: "Résilience", value: resilience, setValue: setResilience, die: 20 },
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
    { label: "Mana Volonté", value: manaVolonte, setValue: setManaVolonte, die: 100 },
  ];

  // --- Dynamic Select options from API ---
  useEffect(() => {
    fetch("/api/races/findAllRace")
      .then((res) => res.json())
      .then((data) =>
        setRaceOptions(
          data.map((r) => ({ label: r.race_name, value: r.race_name }))
        )
      )
      .catch(() => setRaceOptions([]));
    fetch("/api/metiers/findAllJobs")
      .then((res) => res.json())
      .then((data) =>
        setMetierOptions(
          data.map((m) => ({ label: m.metier_name, value: m.metier_name }))
        )
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
          }))
        )
      )
      .catch(() => setAgenceOptions([]));
    fetch("/api/planete/findAllPlanete")
      .then((res) => res.json())
      .then((data) =>
        setPlaneteOptions(
          data.map((p) => ({ label: p.planete_name, value: p.planete_name }))
        )
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

  // --- SUBMIT ---
  const handleSubmit = () => {
    if (!isAllValid) return; // Sécurité
    const data = {
      Name_character: name,
      Age_character: age,
      Sexe_character: sexe,
      Race_character: race,
      Metier_character: metier,
      OeilD_character: oeilD,
      OeilG_character: oeilG,
      Cheveux_character: cheveux,
      Taille_character: taille,
      Poids_character: poids,
      Signes_character: signes,
      Traits_character: traits,
      Agence_character: agence,
      Planete_character: planete,
      Force_character: force,
      Dexte_character: dexte,
      Resistance_character: resistance,
      Resilience_character: resilience,
      Intell_character: intell,
      Charisme_character: charisme,
      Chance_character: chance,
      Stamina_character: stamina,
      ManaVital_character: manaVital,
      ManaEau_character: manaEau,
      ManaTerre_character: manaTerre,
      ManaFeu_character: manaFeu,
      ManaAir_character: manaAir,
      ManaVolonte_character: manaVolonte,
    };
    alert("Données du perso :\n" + JSON.stringify(data, null, 2));
  };

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
      <Box
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
          {activeTab === "identite" && (
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
                  label="Traits"
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
          {activeTab === "attributs" && (
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
                    // ==> Tu mettras ici ta nouvelle logique de “roll” custom
                    onClick={() => {
                      // ex: setForce(Math.ceil(Math.random() * 20))
                    }}
                  >
                    {`Lancer D${attr.die}`}
                  </Button>
                </Box>
              ))}
            </Box>
          )}

          {/* Onglet RESSOURCES */}
          {activeTab === "ressources" && (
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
                    // ==> Nouvelle logique “roll” ici aussi
                    onClick={() => {
                      // ex: setStamina(Math.ceil(Math.random() * 100))
                    }}
                  >
                    {`Lancer D${res.die}`}
                  </Button>
                </Box>
              ))}
            </Box>
          )}

          {/* Bouton final */}
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
        </Box>

        {/* EN-CART DÉ UNIQUE À DROITE */}
        {/* 
          Ici tu remettras plus tard ton Dice3D custom
          Tu peux laisser ce block, ou le virer temporairement. 
          Si tu veux garder la mise en page : 
        */}
        <Box
          sx={{
            flex: 1,
            minWidth: 170,
            maxWidth: 220,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            pt: 4,
            visibility:
              activeTab === "attributs" || activeTab === "ressources"
                ? "visible"
                : "hidden",
            height:
              activeTab === "attributs" || activeTab === "ressources"
                ? undefined
                : 0,
            border: "2px dashed #3a3a4a",
            borderRadius: 2,
          }}
        >
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Dé en cours de création (à venir)
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
