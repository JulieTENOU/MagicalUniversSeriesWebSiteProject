const { DataTypes } = require("sequelize");
// const {id} = require("./authService");
const sequelize = require("../models").sequelize;

const characters = require("../models/characters")(sequelize, DataTypes);

const currentGauges = require("../models/currentGauges")(sequelize, DataTypes);

const creatures = require("../models/creatures")(sequelize, DataTypes);
const crystals = require("../models/crystals")(sequelize, DataTypes);
const ingredients = require("../models/ingredients")(sequelize, DataTypes);

const { Op } = require("sequelize");

const inventory = require("../models/inventories")(sequelize, DataTypes);
const equipInit = require("../models/equipement_initial")(sequelize, DataTypes);

const metiers = require("../models/metiers")(sequelize, DataTypes);

const bonusCarac = require("../models/bonus_carac")(sequelize, DataTypes);
const bonusEnergies = require("../models/bonus_energies")(sequelize, DataTypes);

const competences = require("../models/competences")(sequelize, DataTypes);
const energies = require("../models/energies")(sequelize, DataTypes);

const races = require("../models/races")(sequelize, DataTypes);
const planete = require("../models/planete")(sequelize, DataTypes);

const CHARACTER_DEFAULTS = {
  Niveau_character: 1,

  // Alignement / flags
  HasDraconiqueHeart: false,
  HasCeleste: false,
  Bien_character: 0,
  Mal_character: 0,

  // Affinités / races etc. (par défaut 0)
  Demonique_character: 0,
  Draconique_character: 0,
  Xalytien_character: 0,
  Xento_character: 0,
  Zenolm_character: 0,
  Justiccel_character: 0,
  Cerebrov_character: 0,
  Spectrale_character: 0,
  Astrale_character: 0,

  XalytienArchaique_character: 0,
  XalytienAntique_character: 0,
  XalytienDemonique_character: 0,
  XentoArchaique_character: 0,
  XentoAntique_character: 0,
  XentoDemonique_character: 0,
  ZenolmArchaique_character: 0,
  ZenolmAntique_character: 0,
  ZenolmDemonique_character: 0,
  JusticcelArchaique_character: 0,
  JusticcelAntique_character: 0,
  JusticcelDemonique_character: 0,

  Zombik_character: 0,
  Faerik_character: 0,
  Elfik_character: 0,
  Nanien_character: 0,
  Gnomik_character: 0,
  Tenebriale_character: 0,
  Noyale_character: 0,
  Elementale_character: 0,
  Celeste_character: 0,

  // Compétences (toutes à 0 par défaut)
  Arcs_character: 0,
  Tir_character: 0,
  ArmesHast_character: 0,
  MainsNues_character: 0,
  Jets_character: 0,
  Tranchantes_character: 0,
  Contondantes_character: 0,
  Esquive_character: 0,
  Parade_character: 0,
  Chant_character: 0,
  Chasse_character: 0,
  Course_character: 0,
  Crochetage_character: 0,
  Discretion_character: 0,
  Deguisement_character: 0,
  Eloquance_character: 0,
  Escalade_character: 0,
  Equitation_character: 0,
  Herboristerie_character: 0,
  Hypnose_character: 0,
  Medecine_character: 0,
  Nage_character: 0,
  Observation_character: 0,
  Pieges_character: 0,
  Professorat_character: 0,
  Saut_character: 0,
  Soin_character: 0,
  Survie_character: 0,
  Telekinesie_character: 0,
  Vigilence_character: 0,
  MagicoTech_character: 0,
  Cartographie_character: 0,
  Potions_character: 0,
  TheorieMagique_character: 0,
  HistoireMagique_character: 0,
  MagieAir_character: 0,
  MagieEau_character: 0,
  MagieFeu_character: 0,
  MagieTerre_character: 0,
  MagieElec_character: 0,
  Crea_character: 0,
  PsyInt_character: 0,
  Instinct_character: 0,
  Invoc_character: 0,
  Aura_character: 0,
  MagieVie_character: 0,
  Temps_character: 0,
  Mort_character: 0,
  PsyExt_character: 0,
  PsyInterperso_character: 0,
  Animaturgie_character: 0,
  Lumiere_character: 0,
  MagieAstrale_character: 0,
  MagieSpectrale_character: 0,
  Cosmos_character: 0,
  Tenebres_character: 0,
  MagieDraconique_character: 0,

  character_path: null,
};

const ALLOWED_FROM_CLIENT = [
  "Name_character",
  "Age_character",
  "Sexe_character",
  "Race_character",
  "Metier_character",
  "Agence_character",
  "Planete_character",
  "OeilD_character",
  "OeilG_character",
  "Cheveux_character",
  "Taille_character",
  "Poids_character",
  "Signes_character",
  "Traits_character",
  "Force_character",
  "Dexte_character",
  "Resistance_character",
  "Resilience_character",
  "Intell_character",
  "Charisme_character",
  "Chance_character",
  "Stamina_character",
  "ManaVital_character",
  "ManaEau_character",
  "ManaTerre_character",
  "ManaFeu_character",
  "ManaAir_character",
  "ManaVolonte_character",
];

function pick(obj, keys) {
  const out = {};
  for (const k of keys) if (obj[k] !== undefined) out[k] = obj[k];
  return out;
}

function addNumber(base, delta) {
  const b = Number(base) || 0;
  const d = Number(delta) || 0;
  return b + d;
}

function normalizeType(type) {
  // pour gérer "métiers" vs "metiers" etc.
  return String(type || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // enlève accents
}

async function resolveIdsFromNames(payload, { transaction }) {
  const foundMetier = await metiers.findOne({
    where: { metier_name: payload.Metier_character },
    transaction,
  });
  if (!foundMetier)
    throw new Error(`Métier introuvable: ${payload.Metier_character}`);

  const foundRace = await races.findOne({
    where: { race_name: payload.Race_character },
    transaction,
  });
  if (!foundRace)
    throw new Error(`Race introuvable: ${payload.Race_character}`);

  const foundPlanete = await planete.findOne({
    where: { planete_name: payload.Planete_character },
    transaction,
  });
  if (!foundPlanete)
    throw new Error(`Planète introuvable: ${payload.Planete_character}`);

  return {
    metierId: Number(foundMetier.metier_id),
    raceId: Number(foundRace.race_id),
    planeteId: Number(foundPlanete.planete_id),
  };
}

async function buildEnergyFieldMap({ energiesModel, transaction }) {
  const rows = await energiesModel.findAll({ transaction });
  const map = new Map();

  for (const r of rows) {
    const code = String(r.code || "").trim();
    if (!code) continue;

    // ✅ on ignore PV
    if (code === "PV") continue;

    // ex: ManaFeu -> ManaFeu_character
    const field = `${code}_character`;
    map.set(Number(r.id), field);
  }

  return map; // Map(ressource_id -> "ManaFeu_character")
}

async function buildCompetenceFieldMap({ competencesModel, transaction }) {
  const rows = await competencesModel.findAll({ transaction });
  const map = new Map();

  for (const c of rows) {
    const code = String(c.code || "").trim();
    if (!code) continue;

    const field = `${code}_character`;
    map.set(Number(c.id), field);
  }

  return map;
}

function applyEnergyBonuses({ payload, bonusEnergiesRows, energyFieldMap }) {
  for (const b of bonusEnergiesRows) {
    const field = energyFieldMap.get(Number(b.ressource_id));
    if (!field) continue;

    // ✅ ignore si ton perso n'a pas ce champ
    if (!(field in payload)) continue;

    payload[field] = Number(payload[field] || 0) + Number(b.valeur || 0);
  }
  return payload;
}

function applyCaracBonuses({ payload, bonusCaracRows, competenceFieldMap }) {
  for (const b of bonusCaracRows) {
    const field = competenceFieldMap.get(Number(b.competence_id));
    if (!field) continue;

    // sécurité : le champ existe bien dans characters
    if (!(field in payload)) continue;

    payload[field] = Number(payload[field] || 0) + Number(b.valeur || 0);
  }

  return payload;
}

async function applyAllBonuses(payload, { transaction }) {
  const computed = { ...payload };

  // 1️⃣ IDs
  const { metierId, raceId, planeteId } = await resolveIdsFromNames(computed, {
    transaction,
  });

  // 2️⃣ ENERGIES
  const energyFieldMap = await buildEnergyFieldMap({
    energiesModel: energies,
    transaction,
  });

  const bonusEnergyRows = await bonusEnergies.findAll({
    where: {
      [Op.or]: [
        { type_cible: "all" },
        { type_cible: "metiers", cible_id: metierId },
        { type_cible: "races", cible_id: raceId },
        { type_cible: "planete", cible_id: planeteId },
      ],
    },
    transaction,
  });

  applyEnergyBonuses({
    payload: computed,
    bonusEnergiesRows: bonusEnergyRows,
    energyFieldMap,
  });

  // 3️⃣ COMPÉTENCES
  const competenceFieldMap = await buildCompetenceFieldMap({
    competencesModel: competences,
    transaction,
  });

  const bonusCaracRows = await bonusCarac.findAll({
    where: {
      [Op.or]: [
        { type_cible: "all" },
        { type_cible: "metiers", cible_id: metierId },
        { type_cible: "races", cible_id: raceId },
        { type_cible: "planete", cible_id: planeteId },
      ],
    },
    transaction,
  });

  applyCaracBonuses({
    payload: computed,
    bonusCaracRows,
    competenceFieldMap,
  });

  console.log("FINAL PAYLOAD:", computed);

  return computed;
}

function calcBonusFromCarac(score) {
  const s = Number(score) || 0;
  if (s < 20) return Math.round(s / 10);
  if (s < 40) return Math.round(10 + s / 10);
  if (s < 60) return Math.round(20 + s / 10);
  return 60;
}

const CARAC_FIELD_BY_LETTER = {
  f: "Force_character",
  d: "Dexte_character",
  i: "Intell_character",
  v: "Resilience_character",
  r: "Resistance_character",
  c: "Charisme_character",
};

const SKILL_FIELD_TO_CARAC_LETTER = {
  // Dextérité
  Arcs_character: "d",
  Tir_character: "d",
  Contondantes_character: "d",
  Jets_character: "d",
  ArmesHast_character: "d",
  Esquive_character: "d",
  Tranchantes_character: "d",
  MainsNues_character: "d",
  Parade_character: "d",
  Telekinesie_character: "d",

  MagieAir_character: "d",
  MagieEau_character: "d",
  MagieFeu_character: "d",
  MagieTerre_character: "d",
  MagieElec_character: "d",

  Cartographie_character: "d",
  Potions_character: "d",

  // Résilience
  Crea_character: "v",
  Animaturgie_character: "v",
  Vigilence_character: "v",
  Hypnose_character: "v",
  Medecine_character: "v",
  // (si tu veux : PsyInt_character/PsyExt... faut savoir ta règle exacte)

  // Intelligence
  Instinct_character: "i",
  Aura_character: "i",
  MagieVie_character: "i",
  Temps_character: "i",
  Mort_character: "i",
  Lumiere_character: "i",
  MagieSpectrale_character: "i",
  Cosmos_character: "i",

  Chasse_character: "i",
  Pieges_character: "i",
  Deguisement_character: "i",
  Observation_character: "i",
  Professorat_character: "i",
  Soin_character: "i",
  Survie_character: "i",
  Herboristerie_character: "i",
  TheorieMagique_character: "i",
  HistoireMagique_character: "i",
  MagicoTech_character: "i",

  // Résistance
  Course_character: "r",
  Equitation_character: "r",
  Nage_character: "r",
  Tenebres_character: "r",

  // Force
  Escalade_character: "f",
  Saut_character: "f",

  // Charisme
  Chant_character: "c",
  Eloquance_character: "c", // <- ton champ est "Eloquance_character"
};

function applyDerivedBonusesToCharacter(characterPlain) {
  const out = { ...characterPlain };

  // calcule bonus par carac
  const bonusByLetter = {};
  for (const [letter, caracField] of Object.entries(CARAC_FIELD_BY_LETTER)) {
    bonusByLetter[letter] = calcBonusFromCarac(out[caracField]);
  }

  // applique bonus sur chaque compétence
  for (const [skillField, letter] of Object.entries(
    SKILL_FIELD_TO_CARAC_LETTER,
  )) {
    if (!(skillField in out)) continue;

    const base = Number(out[skillField]) || 0;
    const bonus = Number(bonusByLetter[letter]) || 0;

    // Option recommandée : renvoyer les 3 infos
    out[skillField] = base + bonus;
    out[`${skillField}_base`] = base;
    out[`${skillField}_bonus`] = bonus;
  }

  // utile côté front/debug
  out.__bonusCaracs = bonusByLetter;

  return out;
}

module.exports = {
  create: async function (req, res) {
    const t = await sequelize.transaction();
    try {
      // 1) on récupère uniquement ce qu’on attend du front
      const client = pick(req.body || {}, ALLOWED_FROM_CLIENT);

      // 2) on complète avec defaults
      const payload = {
        ...CHARACTER_DEFAULTS,
        ...client,
        users_ID: req.userId, // temporaire (mieux: req.userId si verifyToken)
      };

      // 3) check minimal
      if (!payload.Name_character?.trim()) {
        await t.rollback();
        return res.status(400).send({ message: "Nom manquant." });
      }

      const computedPayload = await applyAllBonuses(payload, {
        transaction: t,
      });

      const newCharacter = await characters.create(computedPayload, {
        transaction: t,
      });

      console.log("CREATE: after character", newCharacter.Name_character);

      await currentGauges.create(
        {
          Name_character: newCharacter.Name_character,
          currentStamina: newCharacter.Stamina_character,
          currentManaVital: newCharacter.ManaVital_character,
          currentManaEau: newCharacter.ManaEau_character,
          currentManaTerre: newCharacter.ManaTerre_character,
          currentManaFeu: newCharacter.ManaFeu_character,
          currentManaAir: newCharacter.ManaAir_character,
          currentManaVolonte: newCharacter.ManaVolonte_character,
        },
        { transaction: t },
      );

      console.log("CREATED gauges");
      await creatures.create(
        { Name_character: newCharacter.Name_character },
        { transaction: t },
      );
      console.log("CREATED creatures");
      await crystals.create(
        { Name_character: newCharacter.Name_character },
        { transaction: t },
      );
      console.log("CREATED crystals");
      await ingredients.create(
        { Name_character: newCharacter.Name_character },
        { transaction: t },
      );
      console.log("CREATED ingredients");

      const metierName = payload.Metier_character;

      const foundMetier = await metiers.findOne({
        where: { metier_name: metierName },
        transaction: t,
      });

      if (!foundMetier) {
        throw new Error(`Métier introuvable en base: ${metierName}`);
      }

      const metierId = Number(foundMetier.metier_id);

      const choices = req.body.initialChoices || {};
      const wantVirtualGame = choices.virtual_game === true;
      const weaponChoice = choices.weapon_choice; // "arc" | "arbalète" (si métier 6)

      // récupère les règles applicables (all + métier)
      const rows = await equipInit.findAll({
        where: {
          [Op.or]: [
            { type_cible: "all" },
            { type_cible: "metiers", cible_id: metierId },
          ],
        },
        transaction: t,
      });

      const invPayload = {
        Name_character: newCharacter.Name_character,
        PPU: 0,
        POU: 0,
        PAU: 0,
      };

      // holocom -> important1 (obligatoire pour tous)
      if (
        rows.some(
          (r) =>
            r.type_cible === "all" &&
            r.nom_objet === "holocom" &&
            r.obligatoire === 1,
        )
      ) {
        invPayload.important1 = "holocom";
      }

      // virtual game -> important2 (optionnel pour tous)
      if (
        wantVirtualGame &&
        rows.some(
          (r) =>
            r.type_cible === "all" &&
            r.nom_objet === "virtual game" &&
            r.obligatoire === 0,
        )
      ) {
        invPayload.important2 = "virtual game";
      }

      // arme1 selon métier (jamais les deux)
      if (metierId === 5) {
        if (rows.some((r) => r.nom_objet === "épée standard")) {
          invPayload.arme1Name = "épée standard";
        }
      }

      if (metierId === 6) {
        // choix obligatoire : arc/arbalète
        if (weaponChoice !== "arc" && weaponChoice !== "arbalète") {
          throw new Error("Choix d'arme requis : arc ou arbalète.");
          // ou si tu veux un défaut temporaire :
          // invPayload.arme1Name = "arc";
        } else {
          // valide que l'objet existe dans les règles
          const ok = rows.some(
            (r) =>
              r.groupe_choix === "groupe_choix_arcs" &&
              r.nom_objet === weaponChoice,
          );
          if (ok) invPayload.arme1Name = weaponChoice;
        }

        // armure1
        if (rows.some((r) => r.nom_objet === "armure basique")) {
          invPayload.armure1Name = "armure basique";
        }
      }

      await inventory.create(invPayload, { transaction: t });
      console.log("CREATED inventory");

      await t.commit();
      return res.status(201).send({ newCharacter });
    } catch (error) {
      await t.rollback();
      return res.status(400).send({ error: error.message });
    }
  },
  // This function find and returns all the users registered.

  adminCreateCharacter_TEMP: async function (req, res) {
    const t = await sequelize.transaction();
    try {
      // on réutilise ta liste, mais on accepte aussi users_ID
      const client = pick(req.body || {}, [...ALLOWED_FROM_CLIENT, "users_ID"]);

      const usersId = Number(req.body?.users_ID);
      if (!usersId) {
        await t.rollback();
        return res.status(400).send({ error: "users_ID manquant." });
      }

      const payload = {
        ...CHARACTER_DEFAULTS,
        ...client,
        users_ID: usersId,
      };

      if (!payload.Name_character?.trim()) {
        await t.rollback();
        return res.status(400).send({ message: "Nom manquant." });
      }

      // ✅ IMPORTANT : pas de applyAllBonuses ici
      const newCharacter = await characters.create(payload, { transaction: t });

      await currentGauges.create(
        {
          Name_character: newCharacter.Name_character,
          currentStamina: newCharacter.Stamina_character,
          currentManaVital: newCharacter.ManaVital_character,
          currentManaEau: newCharacter.ManaEau_character,
          currentManaTerre: newCharacter.ManaTerre_character,
          currentManaFeu: newCharacter.ManaFeu_character,
          currentManaAir: newCharacter.ManaAir_character,
          currentManaVolonte: newCharacter.ManaVolonte_character,
        },
        { transaction: t },
      );

      await creatures.create(
        { Name_character: newCharacter.Name_character },
        { transaction: t },
      );
      await crystals.create(
        { Name_character: newCharacter.Name_character },
        { transaction: t },
      );
      await ingredients.create(
        { Name_character: newCharacter.Name_character },
        { transaction: t },
      );

      // --- INVENTORY init : on garde ton bloc identique ---
      const metierName = payload.Metier_character;

      const foundMetier = await metiers.findOne({
        where: { metier_name: metierName },
        transaction: t,
      });

      if (!foundMetier) {
        throw new Error(`Métier introuvable en base: ${metierName}`);
      }

      const metierId = Number(foundMetier.metier_id);

      const choices = req.body.initialChoices || {};
      const wantVirtualGame = choices.virtual_game === true;
      const weaponChoice = choices.weapon_choice;

      const rows = await equipInit.findAll({
        where: {
          [Op.or]: [
            { type_cible: "all" },
            { type_cible: "metiers", cible_id: metierId },
          ],
        },
        transaction: t,
      });

      const invPayload = {
        Name_character: newCharacter.Name_character,
        PPU: 0,
        POU: 0,
        PAU: 0,
      };

      if (
        rows.some(
          (r) =>
            r.type_cible === "all" &&
            r.nom_objet === "holocom" &&
            r.obligatoire === 1,
        )
      ) {
        invPayload.important1 = "holocom";
      }

      if (
        wantVirtualGame &&
        rows.some(
          (r) =>
            r.type_cible === "all" &&
            r.nom_objet === "virtual game" &&
            r.obligatoire === 0,
        )
      ) {
        invPayload.important2 = "virtual game";
      }

      if (metierId === 5) {
        if (rows.some((r) => r.nom_objet === "épée standard")) {
          invPayload.arme1Name = "épée standard";
        }
      }

      if (metierId === 6) {
        // choix obligatoire arc/arbalète (si tu veux vraiment imposer)
        // sinon enlève ce check
        if (weaponChoice !== "arc" && weaponChoice !== "arbalète") {
          throw new Error("Choix d'arme requis : arc ou arbalète.");
        } else {
          const ok = rows.some(
            (r) =>
              r.groupe_choix === "groupe_choix_arcs" &&
              r.nom_objet === weaponChoice,
          );
          if (ok) invPayload.arme1Name = weaponChoice;
        }

        if (rows.some((r) => r.nom_objet === "armure basique")) {
          invPayload.armure1Name = "armure basique";
        }
      }

      await inventory.create(invPayload, { transaction: t });

      await t.commit();
      return res.status(201).send({ newCharacter });
    } catch (error) {
      await t.rollback();
      return res.status(400).send({ error: error.message });
    }
  },

  // findAll: async function (req, res) {
  //   characters
  //     .findAll(req.params)
  //     .then((data) => {
  //       if (data) {
  //         res.send(data);
  //       } else {
  //         res.status(404).send({
  //           message: "There isn't any account registered yet!",
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.error("FINDALL ERROR:", err);
  //       res.status(500).send({
  //         message: "Error retrieving accounts...",
  //         error: err.message, // Ajoute ça pour voir l’erreur réelle !
  //       });
  //     });
  // },

  findAll: async function (req, res) {
    characters
      .findAll(req.params)
      .then((rows) => {
        if (rows) {
          const computedRows = rows.map((r) =>
            applyDerivedBonusesToCharacter(r.get({ plain: true })),
          );
          res.send(computedRows);
        } else {
          res.status(404).send({
            message: "There isn't any account registered yet!",
          });
        }
      })
      .catch((err) => {
        console.error("FINDALL ERROR:", err);
        res.status(500).send({
          message: "Error retrieving accounts...",
          error: err.message,
        });
      });
  },

  // This function find and returns one registered user based on one parameter.

  // findOneCharacter: async function (req, res) {
  //   const character = req.params.Name_character;
  //   console.log("Name_character:" + character);
  //   characters
  //     .findOne({
  //       where: {
  //         Name_character: character,
  //       },
  //     })
  //     .then(async (data) => {
  //       console.log(data);
  //       if (data) {
  //         console.log("Success");
  //         res.status(200).send({
  //           message: `Successfully connected to your profile`,
  //           data,
  //         });
  //       } else {
  //         console.log("find one character Error 404");
  //         res.status(404).send({
  //           message: `Cannot find your character.`,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Error Server 500");
  //       console.log(err);
  //       res.status(500).send({
  //         message: `Error retrieving your character`,
  //       });
  //     });
  // },

  findOneCharacter: async function (req, res) {
    const character = req.params.Name_character;
    console.log("Name_character:" + character);

    characters
      .findOne({
        where: {
          Name_character: character,
        },
      })
      .then(async (data) => {
        console.log(data);

        if (data) {
          console.log("Success");

          // ✅ IMPORTANT: data est une instance Sequelize -> on passe en plain object
          const plain = data.get({ plain: true });

          // ✅ on calcule les valeurs finales (base + bonus dynamiques)
          const computed = applyDerivedBonusesToCharacter(plain);

          return res.status(200).send({
            message: `Successfully connected to your profile`,
            data: computed, // ✅ on renvoie computed, pas data
          });
        } else {
          console.log("find one character Error 404");
          return res.status(404).send({
            message: `Cannot find your character.`,
          });
        }
      })
      .catch((err) => {
        console.log("Error Server 500");
        console.log(err);
        return res.status(500).send({
          message: `Error retrieving your character`,
        });
      });
  },

  // findOneCharacterById: async function (req, res) {
  //   const id = req.params.ID_character;
  //   characters
  //     .findOne({ where: { ID_character: id } })
  //     .then((data) => {
  //       if (data) res.status(200).send({ message: "Character found", data });
  //       else
  //         res.status(404).send({ message: "No character found with this id." });
  //     })
  //     .catch((err) =>
  //       res.status(500).send({ message: "Error retrieving character.", err }),
  //     );
  // },

  findOneCharacterById: async function (req, res) {
    const id = req.params.ID_character;

    characters
      .findOne({ where: { ID_character: id } })
      .then((data) => {
        if (data) {
          // ✅ instance Sequelize → objet simple
          const plain = data.get({ plain: true });

          // ✅ calcul des bonus dynamiques
          const computed = applyDerivedBonusesToCharacter(plain);

          return res.status(200).send({
            message: "Character found",
            data: computed, // ✅ PAS data brut
          });
        } else {
          return res
            .status(404)
            .send({ message: "No character found with this id." });
        }
      })
      .catch((err) =>
        res.status(500).send({ message: "Error retrieving character.", err }),
      );
  },

  updateOneCharacter: async function (req, res) {
    const id = req.params.ID_character;
    console.log("Id_character:" + id);
    characters
      .findOne({
        where: {
          ID_character: id,
        },
      })
      .then((response) => {
        response.update(req.body);
        res.status(201).json(response);
      })
      .catch((err) => {
        res.status(404).send("Mise à jour du perso impossible :" + err);
      });
  },
};
