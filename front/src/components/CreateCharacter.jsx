import { Box, Typography, Button, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import Btn from "./Btn";

// -------- DiceRoller --------
function DiceRoller({ die, label, value, setValue }) {
  const [rolling, setRolling] = useState(false);
  const handleRoll = () => {
    setRolling(true);
    setTimeout(() => {
      const roll = Math.floor(Math.random() * die) + 1;
      setValue(roll);
      setRolling(false);
    }, 350 + Math.random() * 500);
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
      <Typography sx={{ flex: 1 }}>{label}</Typography>
      <TextField value={value || ""} size="small" sx={{ width: 80 }} disabled />
      <Button variant="outlined" onClick={handleRoll} disabled={rolling}>
        {rolling ? "..." : `Lancer D${die}`}
      </Button>
    </Box>
  );
}

// --------- Main Page ---------
export default function CreationPersonnage({ theme }) {
  const [activeTab, setActiveTab] = useState("identite");

  // Identité (col 1)
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [sexe, setSexe] = useState("");
  const [race, setRace] = useState("");
  const [metier, setMetier] = useState("");
  // Identité (col 2 : personnalisation)
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

  // Select options
  const sexeOptions = [
    { label: "Homme", value: "Homme" },
    { label: "Femme", value: "Femme" },
    { label: "Autre", value: "Autre" }
  ];
  const raceOptions = [
    { label: "Humain", value: "Humain" },
    { label: "Elfe", value: "Elfe" },
    { label: "Nain", value: "Nain" },
    { label: "Demi-Elfe", value: "Demi-Elfe" },
    { label: "Autre", value: "Autre" }
  ];
  const metierOptions = [
    { label: "Guerrier", value: "Guerrier" },
    { label: "Mage", value: "Mage" },
    { label: "Voleur", value: "Voleur" },
    { label: "Prêtre", value: "Prêtre" },
    { label: "Autre", value: "Autre" }
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
      force && dexte && resistance && resilience &&
      intell && charisme && chance
    );
  }
  function isRessourcesValid() {
    return (
      stamina && manaVital && manaEau && manaTerre &&
      manaFeu && manaAir && manaVolonte
    );
  }
  const isAllValid = isIdentiteValid() && isAttributsValid() && isRessourcesValid();

  // --- Onglets avec navigation bloquée ---
  const tabs = [
    { key: "identite", label: "Identité", disabled: false },
    { key: "attributs", label: "Attributs", disabled: !isIdentiteValid() },
    { key: "ressources", label: "Ressources", disabled: !isIdentiteValid() || !isAttributsValid() }
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
                      ? (theme?.custom?.mymodal?.header || "#2e3867")
                      : (theme?.custom?.mymodal?.button || "#1b2140"),
                  fontWeight: "bold",
                  color: disabled
                    ? "#777"
                    : activeTab === key
                      ? "#fff"
                      : "#99aacc",
                  fontSize: "1.05rem",
                  cursor: disabled ? "not-allowed" : "pointer",
                  opacity: disabled ? 0.6 : 1
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
          padding: 4,
          maxHeight: "50vh",
          overflowY: "auto",
        }}
      >
        {/* Onglet IDENTITE : double colonne */}
        {activeTab === "identite" && (
          <Box sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}>
            {/* Colonne 1 */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="h6" gutterBottom>
                Identité
              </Typography>
              <TextField label="Nom" value={name} onChange={e => setName(e.target.value)} fullWidth margin="normal" required />
              <TextField label="Âge" value={age} onChange={e => setAge(e.target.value)} type="number" fullWidth margin="normal" required />
              <TextField label="Sexe" select value={sexe} onChange={e => setSexe(e.target.value)} fullWidth margin="normal" required>
                {sexeOptions.map(opt => (
                  <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                ))}
              </TextField>
              <TextField label="Race" select value={race} onChange={e => setRace(e.target.value)} fullWidth margin="normal" required>
                {raceOptions.map(opt => (
                  <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                ))}
              </TextField>
              <TextField label="Métier" select value={metier} onChange={e => setMetier(e.target.value)} fullWidth margin="normal" required>
                {metierOptions.map(opt => (
                  <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                ))}
              </TextField>
              <TextField label="Agence" value={agence} onChange={e => setAgence(e.target.value)} fullWidth margin="normal" required />
              <TextField label="Planète" value={planete} onChange={e => setPlanete(e.target.value)} fullWidth margin="normal" required />
            </Box>

            {/* Colonne 2 */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="h6" gutterBottom>
                Particularités et Background
              </Typography>
              <TextField label="Couleur œil droit" value={oeilD} onChange={e => setOeilD(e.target.value)} fullWidth margin="normal" required />
              <TextField label="Couleur œil gauche" value={oeilG} onChange={e => setOeilG(e.target.value)} fullWidth margin="normal" required />
              <TextField label="Cheveux" value={cheveux} onChange={e => setCheveux(e.target.value)} fullWidth margin="normal" required />
              <TextField label="Taille (cm)" value={taille} onChange={e => setTaille(e.target.value)} type="number" fullWidth margin="normal" required />
              <TextField label="Poids (kg)" value={poids} onChange={e => setPoids(e.target.value)} type="number" fullWidth margin="normal" required />
              <TextField label="Signes particuliers" value={signes} onChange={e => setSignes(e.target.value)} fullWidth margin="normal" required />
              <TextField label="Traits" value={traits} onChange={e => setTraits(e.target.value)} fullWidth margin="normal" required />
            </Box>
          </Box>
        )}

        {/* Onglet ATTRIBUTS */}
        {activeTab === "attributs" && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Attributs (jet de dé 20)
            </Typography>
            <DiceRoller die={20} label="Force" value={force} setValue={setForce} />
            <DiceRoller die={20} label="Dextérité" value={dexte} setValue={setDexte} />
            <DiceRoller die={20} label="Résistance" value={resistance} setValue={setResistance} />
            <DiceRoller die={20} label="Résilience" value={resilience} setValue={setResilience} />
            <DiceRoller die={20} label="Intelligence" value={intell} setValue={setIntell} />
            <DiceRoller die={20} label="Charisme" value={charisme} setValue={setCharisme} />
            <DiceRoller die={20} label="Chance" value={chance} setValue={setChance} />
          </Box>
        )}

        {/* Onglet RESSOURCES */}
        {activeTab === "ressources" && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Ressources (jet de dé 100)
            </Typography>
            <DiceRoller die={100} label="Stamina" value={stamina} setValue={setStamina} />
            <DiceRoller die={100} label="Mana Vital" value={manaVital} setValue={setManaVital} />
            <DiceRoller die={100} label="Mana Eau" value={manaEau} setValue={setManaEau} />
            <DiceRoller die={100} label="Mana Terre" value={manaTerre} setValue={setManaTerre} />
            <DiceRoller die={100} label="Mana Feu" value={manaFeu} setValue={setManaFeu} />
            <DiceRoller die={100} label="Mana Air" value={manaAir} setValue={setManaAir} />
            <DiceRoller die={100} label="Mana Volonté" value={manaVolonte} setValue={setManaVolonte} />
          </Box>
        )}
      </Box>

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
  );
}
