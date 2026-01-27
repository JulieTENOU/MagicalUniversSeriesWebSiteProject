const Sequelize = require("sequelize");
// const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "characters",
    {
      ID_character: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      users_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "users_ID",
        },
      },
      Name_character: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      Age_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      OeilD_character: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      OeilG_character: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      Taille_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Poids_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Sexe_character: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      Planete_character: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      Agence_character: {
        type: DataTypes.STRING(75),
        allowNull: true,
      },
      Cheveux_character: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      Race_character: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      Metier_character: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      Niveau_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Signes_character: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      Traits_character: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ManaVital_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ManaEau_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ManaTerre_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ManaFeu_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ManaAir_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ManaVolonte_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Stamina_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      HasDraconiqueHeart: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      HasCeleste: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      Force_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Dexte_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Resistance_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Resilience_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Intell_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Charisme_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Chance_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Bien_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Mal_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Demonique_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Draconique_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Xalytien_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Xento_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Zenolm_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Justiccel_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Cerebrov_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Spectrale_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Astrale_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      XalytienArchaique_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      XalytienAntique_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      XalytienDemonique_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      XentoAntique_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      XentoArchaique_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      XentoDemonique_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ZenolmArchaique_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ZenolmAntique_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ZenolmDemonique_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      JusticcelArchaique_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      JusticcelAntique_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      JusticcelDemonique_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Zombik_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Faerik_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Elfik_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Nanien_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Gnomik_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Tenebriale_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Noyale_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Elementale_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Celeste_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Arcs_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Tir_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ArmesHast_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      MainsNues_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Jets_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Tranchantes_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Contondantes_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Esquive_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Parade_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Chant_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Chasse_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Course_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Crochetage_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Discretion_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Deguisement_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Equitation_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Eloquance_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Escalade_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Herboristerie_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Hypnose_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Medecine_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Nage_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Observation_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Pieges_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Professorat_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Saut_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Soin_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Survie_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Telekinesie_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Vigilence_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      MagicoTech_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Cartographie_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Potions_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      TheorieMagique_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      HistoireMagique_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      MagieAir_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      MagieEau_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      MagieFeu_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      MagieTerre_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      MagieElec_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Crea_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Instinct_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Invoc_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Aura_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      MagieVie_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Temps_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Mort_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Animaturgie_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Lumiere_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      MagieAstrale_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      MagieSpectrale_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Cosmos_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Tenebres_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      MagieDraconique_character: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "characters",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "ID_character" }],
        },
        {
          name: "users_ID",
          using: "BTREE",
          fields: [{ name: "users_ID" }],
        },
      ],
    },
  );
};
