import {
  Drawer,
  Box,
  IconButton,
  Divider,
  Button,
  Grid,
  List,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import PsychologyAltOutlinedIcon from "@mui/icons-material/PsychologyAltOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import ModifierDialogs from "./ModifierComp";
import { useTheme } from "@mui/material/styles";

import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";

export default function SideMenu(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  console.log(props);
  console.log(props.character);
  const perso = props.character;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isWeapons, setIsWeapons] = useState(false);
  const [isDivers, setIsDivers] = useState(false);
  const [isScience, setIsScience] = useState(false);
  const [isMagic, setIsMagic] = useState(false);
  const [isCarac, setIsCarac] = useState(false);
  const [isRang1, setIsRang1] = useState(false);
  const [isRang2, setIsRang2] = useState(false);
  const [isRang3, setIsRang3] = useState(false);
  const [isRangA, setIsRangA] = useState(false);
  const [isLang, setIsLang] = useState(false);
  const [classique, setClassique] = useState(false);
  const [xalytien, setXalytien] = useState(false);
  const [xentokolien, setXentokolien] = useState(false);
  const [zenolm, setZenolm] = useState(false);
  const [planaire, setPlanaire] = useState(false);
  const [raciale, setRaciale] = useState(false);
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    props.onDrawerChange?.(false);
  };
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="logo"
        onClick={() => { setIsDrawerOpen(true); props.onDrawerChange?.(true); }}
        sx={{ width: "50px", position: "fixed", right: "0vw", top: "9vh" }}
      >
        {isDrawerOpen ? (
          <></>
        ) : (
          <PsychologyAltOutlinedIcon sx={{ color: "white" }} />
        )}
      </IconButton>
      <Drawer
        className="drawer"
        BackdropProps={{ style: { backdropFilter: "none", opacity: 0 } }}
        PaperProps={{
          sx: {
            backgroundColor: theme.custom.mycustomblur.main,
            backdropFilter: theme.custom.mycustomblur.blur,
            WebkitBackdropFilter: theme.custom.mycustomblur.blur,
            top: "5vh",
            textAlign: "center",
            width: isMobile ? "100%" : "40%",
            borderRadius: "25px",
            height: "90dvh"
          },
        }}
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box
          p={2}
          width="250px"
          sx={{ backdropFilter: "none", top: "15vh", width: "100%" }}
          textAlign={"center"}
          role="presentation"
        >
          <Grid container spacing={2} width="100%" direction={isMobile ? "column" : "row"}>
            <List>
              <Button
                variant="h4"
                onClick={() => setIsCarac(!isCarac)}
                sx={{
                  color: theme.custom.mycustomblur.text,
                }}
              >
                {t("side.carac")}
              </Button>
              {isCarac && (
                <div
                  style={{
                    textAlign: "left",
                    color: theme.custom.mycustomblur.text,
                    marginInline: "5px",
                  }}
                >
                  <Table className="comptab">
                    <TableBody>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.strength")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Force_character}
                          <ModifierDialogs
                            character={perso}
                            name={"force"}
                            left={"40%"}
                            dataToUpdate={"Force"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.dexte")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Dexte_character}
                          <ModifierDialogs
                            character={perso}
                            name={"dexte"}
                            left={"40%"}
                            dataToUpdate={"Dextérité"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.resis")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Resistance_character}
                          <ModifierDialogs
                            character={perso}
                            name={"resistance"}
                            left={"40%"}
                            dataToUpdate={"Résistance"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.resil")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Resilience_character}
                          <ModifierDialogs
                            character={perso}
                            name={"resilience"}
                            left={"40%"}
                            dataToUpdate={"Résilience"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.intell")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Intell_character}
                          <ModifierDialogs
                            character={perso}
                            name={"intell"}
                            left={"40%"}
                            dataToUpdate={"Intelligence"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.charisma")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Charisme_character}
                          <ModifierDialogs
                            character={perso}
                            name={"charisme"}
                            left={"40%"}
                            dataToUpdate={"Charisme"}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Divider />
                  <Table className="comptab">
                    <TableBody>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.good")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Bien_character}
                          <ModifierDialogs
                            character={perso}
                            name={"bien"}
                            left={"40%"}
                            dataToUpdate={"Bien"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.evil")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Mal_character}
                          <ModifierDialogs
                            character={perso}
                            name={"mal"}
                            left={"40%"}
                            dataToUpdate={"Mal"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.instinct")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Instinct_character}
                          <ModifierDialogs
                            character={perso}
                            name={"instinct"}
                            left={"40%"}
                            dataToUpdate={"Instinct"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.survival")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Survie_character}
                          <ModifierDialogs
                            character={perso}
                            name={"survie"}
                            left={"40%"}
                            dataToUpdate={"Survie"}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              )}
            </List>
            <Divider orientation="vertical" flexItem />
            <List>
              <Button
                variant="h4"
                onClick={() => setIsLang(!isLang)}
                sx={{
                  color: theme.custom.mycustomblur.text,
                }}
              >
                {t("side.languages")}
              </Button>
              {isLang && (
                <div
                  style={{
                    textAlign: "left",
                    color: theme.custom.mycustomblur.text,
                    marginInline: "5px",
                  }}
                >
                  <Button
                    variant="h5"
                    onClick={() => setClassique(!classique)}
                    sx={{
                      color: theme.custom.mycustomblur.text,
                    }}
                  >
                    {t("side.classic")}
                  </Button>
                  {classique && (
                    <div
                      style={{
                        textAlign: "left",
                        color: theme.custom.mycustomblur.text,
                        marginInline: "5px",
                      }}
                    >
                      <Table className="comptab">
                        <TableBody>
                          <TableRow
                            sx={{
                              border: theme.custom.mycustomblur.tableborder,
                            }}
                          >
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {t("side.demonic")}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {perso.Demonique_character}
                              <ModifierDialogs
                                character={perso}
                                name={"démonique"}
                                left={"40%"}
                                dataToUpdate={"Langue Démonique"}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              border: theme.custom.mycustomblur.tableborder,
                            }}
                          >
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {t("side.draconic")}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {perso.Draconique_character}
                              <ModifierDialogs
                                character={perso}
                                name={"draconique"}
                                left={"40%"}
                                dataToUpdate={"Langue Draconique"}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              border: theme.custom.mycustomblur.tableborder,
                            }}
                          >
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {t("side.xalytian")}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {perso.Xalytien_character}
                              <ModifierDialogs
                                character={perso}
                                name={"xalytien"}
                                left={"40%"}
                                dataToUpdate={"Xalytien"}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              border: theme.custom.mycustomblur.tableborder,
                            }}
                          >
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {t("side.xento")}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {perso.Xento_character}
                              <ModifierDialogs
                                character={perso}
                                name={"xento"}
                                left={"40%"}
                                dataToUpdate={"Xentokolien"}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              border: theme.custom.mycustomblur.tableborder,
                            }}
                          >
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {t("side.zenolm")}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {perso.Zenolm_character}
                              <ModifierDialogs
                                character={perso}
                                name={"zenolm"}
                                left={"40%"}
                                dataToUpdate={"Zenolm"}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              border: theme.custom.mycustomblur.tableborder,
                            }}
                          >
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {t("side.justiccel")}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {perso.Justiccel_character}
                              <ModifierDialogs
                                character={perso}
                                name={"justiccel"}
                                left={"40%"}
                                dataToUpdate={"Justiccel"}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              border: theme.custom.mycustomblur.tableborder,
                            }}
                          >
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {t("side.cerebrov")}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {perso.Cerebrov_character}
                              <ModifierDialogs
                                character={perso}
                                name={"cerebrov"}
                                left={"40%"}
                                dataToUpdate={"Cérébrov"}
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  )}
                  <Divider />
                  <Button
                    variant="h5"
                    onClick={() => setXalytien(!xalytien)}
                    sx={{
                      color: theme.custom.mycustomblur.text,
                    }}
                  >
                    {t("side.archaic")}
                  </Button>
                  {xalytien && (
                    <div
                      style={{
                        textAlign: "left",
                        color: theme.custom.mycustomblur.text,
                        marginInline: "5px",
                      }}
                    >
                      <Table className="comptab">
                        <TableBody>
                          <TableRow
                            sx={{
                              border: theme.custom.mycustomblur.tableborder,
                            }}
                          >
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {t("side.arcaXaly")}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {perso.XalytienArchaique_character}
                              <ModifierDialogs
                                character={perso}
                                name={"xaArch"}
                                left={"40%"}
                                dataToUpdate={"Xalytien Archaïque"}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              border: theme.custom.mycustomblur.tableborder,
                            }}
                          >
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {t("side.arcaXen")}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {perso.XentoArchaique_character}
                              <ModifierDialogs
                                character={perso}
                                name={"xenArch"}
                                left={"40%"}
                                dataToUpdate={"Xentokolien Archaïque"}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              border: theme.custom.mycustomblur.tableborder,
                            }}
                          >
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {t("side.arcaZen")}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {perso.ZenolmArchaique_character}
                              <ModifierDialogs
                                character={perso}
                                name={"zenArch"}
                                left={"40%"}
                                dataToUpdate={"Zenolm Archaïque"}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              border: theme.custom.mycustomblur.tableborder,
                            }}
                          >
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {t("side.arcaJus")}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {perso.JusticcelArchaique_character}
                              <ModifierDialogs
                                character={perso}
                                name={"justiArch"}
                                left={"40%"}
                                dataToUpdate={"Justiccel Archaïque"}
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  )}
                  <Divider />
                  <Button
                    variant="h5"
                    onClick={() => setXentokolien(!xentokolien)}
                    sx={{
                      color: theme.custom.mycustomblur.text,
                    }}
                  >
                    {t("side.antique")}
                  </Button>
                  {xentokolien && (
                    <div
                      style={{
                        textAlign: "left",
                        color: theme.custom.mycustomblur.text,
                        marginInline: "5px",
                      }}
                    >
                      <Table className="comptab">
                        <TableBody>
                          <TableRow
                            sx={{
                              border: theme.custom.mycustomblur.tableborder,
                            }}
                          >
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              Xalytien Antique
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {perso.XalytienAntique_character}
                              <ModifierDialogs
                                character={perso}
                                name={"xaAnt"}
                                left={"40%"}
                                dataToUpdate={"Xalytien Antique"}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              border: theme.custom.mycustomblur.tableborder,
                            }}
                          >
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {" "}
                              {t("side.antXen")}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {perso.XentoAntique_character}
                              <ModifierDialogs
                                character={perso}
                                name={"xenAnt"}
                                left={"40%"}
                                dataToUpdate={"Xentokolien Antique"}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              border: theme.custom.mycustomblur.tableborder,
                            }}
                          >
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {t("side.antZen")}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {perso.ZenolmAntique_character}
                              <ModifierDialogs
                                character={perso}
                                name={"zenAnt"}
                                left={"40%"}
                                dataToUpdate={"Zenolm Antique"}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              border: theme.custom.mycustomblur.tableborder,
                            }}
                          >
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {t("side.antJus")}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {perso.JusticcelAntique_character}
                              <ModifierDialogs
                                character={perso}
                                name={"justiAnt"}
                                left={"40%"}
                                dataToUpdate={"Justiccel Antique"}
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  )}
                  <Divider />
                  <Button
                    variant="h5"
                    onClick={() => setZenolm(!zenolm)}
                    sx={{
                      color: theme.custom.mycustomblur.text,
                    }}
                  >
                    {t("side.demlang")}
                  </Button>
                  {zenolm && (
                    <div
                      style={{
                        textAlign: "left",
                        color: theme.custom.mycustomblur.text,
                        marginInline: "5px",
                      }}
                    >
                      <Table className="comptab">
                        <TableBody>
                          <TableRow
                            sx={{
                              border: theme.custom.mycustomblur.tableborder,
                            }}
                          >
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {t("side.demXaly")}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {perso.XalytienDemonique_character}
                              <ModifierDialogs
                                character={perso}
                                name={"xaDem"}
                                left={"40%"}
                                dataToUpdate={"Xalytien Démonique"}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              border: theme.custom.mycustomblur.tableborder,
                            }}
                          >
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {t("side.demXento")}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {perso.XentoDemonique_character}
                              <ModifierDialogs
                                character={perso}
                                name={"xenDem"}
                                left={"40%"}
                                dataToUpdate={"Xentokolien Démonique"}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              border: theme.custom.mycustomblur.tableborder,
                            }}
                          >
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {t("side.demZen")}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {perso.ZenolmDemonique_character}
                              <ModifierDialogs
                                character={perso}
                                name={"ZenDem"}
                                left={"40%"}
                                dataToUpdate={"Zenolm Démonique"}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              border: theme.custom.mycustomblur.tableborder,
                            }}
                          >
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {t("side.demJus")}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {perso.JusticcelDemonique_character}
                              <ModifierDialogs
                                character={perso}
                                name={"JustiDem"}
                                left={"40%"}
                                dataToUpdate={"Justiccel Démonique"}
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  )}
                  <Divider />
                  <Button
                    variant="h5"
                    onClick={() => setRaciale(!raciale)}
                    sx={{
                      color: theme.custom.mycustomblur.text,
                    }}
                  >
                    {t("side.racial")}
                  </Button>
                  {raciale && (
                    <div
                      style={{
                        textAlign: "left",
                        color: theme.custom.mycustomblur.text,
                        marginInline: "5px",
                      }}
                    >
                      <Table className="comptab">
                        <TableBody>
                          <TableRow
                            sx={{
                              border: theme.custom.mycustomblur.tableborder,
                            }}
                          >
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {t("side.zombik")}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {perso.Zombik_character}
                              <ModifierDialogs
                                character={perso}
                                name={"zombik"}
                                left={"40%"}
                                dataToUpdate={"Zombik"}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              border: theme.custom.mycustomblur.tableborder,
                            }}
                          >
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {t("side.faerik")}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {perso.Faerik_character}
                              <ModifierDialogs
                                character={perso}
                                name={"faerik"}
                                left={"40%"}
                                dataToUpdate={"Faerik"}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              border: theme.custom.mycustomblur.tableborder,
                            }}
                          >
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {t("side.elfik")}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {perso.Elfik_character}
                              <ModifierDialogs
                                character={perso}
                                name={"elfik"}
                                left={"40%"}
                                dataToUpdate={"Elfik"}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              border: theme.custom.mycustomblur.tableborder,
                            }}
                          >
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {t("side.nanian")}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {perso.Nanien_character}
                              <ModifierDialogs
                                character={perso}
                                name={"nanien"}
                                left={"40%"}
                                dataToUpdate={"Nanien"}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              border: theme.custom.mycustomblur.tableborder,
                            }}
                          >
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {t("side.gnomik")}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {perso.Gnomik_character}
                              <ModifierDialogs
                                character={perso}
                                name={"gnomik"}
                                left={"40%"}
                                dataToUpdate={"Gnomik"}
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  )}
                  <Divider />
                  <Button
                    variant="h5"
                    onClick={() => setPlanaire(!planaire)}
                    sx={{
                      color: theme.custom.mycustomblur.text,
                    }}
                  >
                    {t("side.planar")}
                  </Button>
                  {planaire && (
                    <div
                      style={{
                        textAlign: "left",
                        color: theme.custom.mycustomblur.text,
                        marginInline: "5px",
                      }}
                    >
                      <Table className="comptab">
                        <TableBody>
                          <TableRow
                            sx={{
                              border: theme.custom.mycustomblur.tableborder,
                            }}
                          >
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {t("side.spectral")}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {perso.Spectrale_character}
                              <ModifierDialogs
                                character={perso}
                                name={"spectrale"}
                                left={"40%"}
                                dataToUpdate={"Langue Spectrale"}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              border: theme.custom.mycustomblur.tableborder,
                            }}
                          >
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {t("side.astral")}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {perso.Astrale_character}
                              <ModifierDialogs
                                character={perso}
                                name={"astrale"}
                                left={"40%"}
                                dataToUpdate={"Langue Astrale"}
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <Divider />
                      <Table className="comptab">
                        <TableBody>
                          <TableRow
                            sx={{
                              border: theme.custom.mycustomblur.tableborder,
                            }}
                          >
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {t("side.tenebrial")}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {perso.Tenebriale_character}
                              <ModifierDialogs
                                character={perso}
                                name={"tenebriale"}
                                left={"40%"}
                                dataToUpdate={"Ténébriale"}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              border: theme.custom.mycustomblur.tableborder,
                            }}
                          >
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {t("side.nucleal")}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {perso.Noyale_character}
                              <ModifierDialogs
                                character={perso}
                                name={"noyale"}
                                left={"40%"}
                                dataToUpdate={"Noyale"}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              border: theme.custom.mycustomblur.tableborder,
                            }}
                          >
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {t("side.elemental")}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {perso.Elementale_character}
                              <ModifierDialogs
                                character={perso}
                                name={"elementale"}
                                left={"40%"}
                                dataToUpdate={"Elementale"}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              border: theme.custom.mycustomblur.tableborder,
                            }}
                          >
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {t("side.celestial")}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: theme.custom.mycustomblur.text,
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                              className="comp"
                            >
                              {perso.Celeste_character}
                              <ModifierDialogs
                                character={perso}
                                name={"celeste"}
                                left={"40%"}
                                dataToUpdate={"Celeste"}
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>
              )}
            </List>
            <Divider orientation="vertical" flexItem />
            <List>
              <Button
                variant="h6"
                onClick={() => setIsWeapons(!isWeapons)}
                sx={{
                  color: theme.custom.mycustomblur.text,
                }}
              >
                {t("side.fight")}
              </Button>
              {isWeapons && (
                <div
                  style={{
                    textAlign: "left",
                    color: theme.custom.mycustomblur.text,
                    marginInline: "5px",
                  }}
                >
                  <Table className="comptab">
                    <TableBody>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.bows")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Arcs_character}
                          <ModifierDialogs
                            character={perso}
                            name={"arcs"}
                            left={"40%"}
                            dataToUpdate={"Arcs"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.shot")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Tir_character}
                          <ModifierDialogs
                            character={perso}
                            name={"tir"}
                            left={"40%"}
                            dataToUpdate={"Tir"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.bare")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.MainsNues_character}
                          <ModifierDialogs
                            character={perso}
                            name={"mainsNues"}
                            left={"40%"}
                            dataToUpdate={"Mains Nues"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.throw")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Jets_character}
                          <ModifierDialogs
                            character={perso}
                            name={"jets"}
                            left={"40%"}
                            dataToUpdate={"Jets"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.polearm")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.ArmesHast_character}
                          <ModifierDialogs
                            character={perso}
                            name={"hast"}
                            left={"40%"}
                            dataToUpdate={"Armes d'Hast"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.sharp")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Tranchantes_character}
                          <ModifierDialogs
                            character={perso}
                            name={"tranchantes"}
                            left={"40%"}
                            dataToUpdate={"Tranchantes"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.blunt")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Contondantes_character}
                          <ModifierDialogs
                            character={perso}
                            name={"contondantes"}
                            left={"40%"}
                            dataToUpdate={"Contondantes"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.dodge")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Esquive_character}
                          <ModifierDialogs
                            character={perso}
                            name={"esquive"}
                            left={"40%"}
                            dataToUpdate={"Esquive"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.parade")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Parade_character}
                          <ModifierDialogs
                            character={perso}
                            name={"parade"}
                            left={"40%"}
                            dataToUpdate={"Parade"}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              )}
            </List>
            <Divider orientation="vertical" flexItem />
            <List>
              <Button
                variant="h6"
                onClick={() => setIsDivers(!isDivers)}
                sx={{
                  color: theme.custom.mycustomblur.text,
                }}
              >
                {t("side.misc")}
              </Button>
              {isDivers && (
                <div
                  style={{
                    textAlign: "left",
                    color: theme.custom.mycustomblur.text,
                    marginInline: "5px",
                  }}
                >
                  <Table className="comptab">
                    <TableBody>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.sing")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Chant_character}
                          <ModifierDialogs
                            character={perso}
                            name={"chant"}
                            left={"40%"}
                            dataToUpdate={"Chant"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.hunt")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Chasse_character}
                          <ModifierDialogs
                            character={perso}
                            name={"chasse"}
                            left={"40%"}
                            dataToUpdate={"Chasse"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.run")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Course_character}
                          <ModifierDialogs
                            character={perso}
                            name={"course"}
                            left={"40%"}
                            dataToUpdate={"Course"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.lockpicking")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Crochetage_character}
                          <ModifierDialogs
                            character={perso}
                            name={"crochetage"}
                            left={"40%"}
                            dataToUpdate={"Crochetage"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.disguise")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Deguisement_character}
                          <ModifierDialogs
                            character={perso}
                            name={"deguisement"}
                            left={"40%"}
                            dataToUpdate={"Déguisement"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.discretion")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Discretion_character}
                          <ModifierDialogs
                            character={perso}
                            name={"discretion"}
                            left={"40%"}
                            dataToUpdate={"Discrétion"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.eloquance")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Eloquance_character}
                          <ModifierDialogs
                            character={perso}
                            name={"eloquance"}
                            left={"40%"}
                            dataToUpdate={"Eloquance"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.riding")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Equitation_character}
                          <ModifierDialogs
                            character={perso}
                            name={"equitation"}
                            left={"40%"}
                            dataToUpdate={"Equitation"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.climbing")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Escalade_character}
                          <ModifierDialogs
                            character={perso}
                            name={"escalade"}
                            left={"40%"}
                            dataToUpdate={"Escalade"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.hypnosis")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Hypnose_character}
                          <ModifierDialogs
                            character={perso}
                            name={"hypnose"}
                            left={"40%"}
                            dataToUpdate={"Hypnose"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.swim")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Nage_character}
                          <ModifierDialogs
                            character={perso}
                            name={"nage"}
                            left={"40%"}
                            dataToUpdate={"Nage"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.perception")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Observation_character}
                          <ModifierDialogs
                            character={perso}
                            name={"observation"}
                            left={"40%"}
                            dataToUpdate={"Observation"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.traps")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Pieges_character}
                          <ModifierDialogs
                            character={perso}
                            name={"pieges"}
                            left={"40%"}
                            dataToUpdate={"Pieges"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.teach")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Professorat_character}
                          <ModifierDialogs
                            character={perso}
                            name={"professorat"}
                            left={"40%"}
                            dataToUpdate={"Professorat"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.jump")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Saut_character}
                          <ModifierDialogs
                            character={perso}
                            name={"saut"}
                            left={"40%"}
                            dataToUpdate={"Saut"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.care")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Soin_character}
                          <ModifierDialogs
                            character={perso}
                            name={"soin"}
                            left={"40%"}
                            dataToUpdate={"Soin"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.telekin")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Telekinesie_character}
                          <ModifierDialogs
                            character={perso}
                            name={"telekine"}
                            left={"40%"}
                            dataToUpdate={"Télékinésie"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.awarness")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Vigilence_character}
                          <ModifierDialogs
                            character={perso}
                            name={"vigi"}
                            left={"40%"}
                            dataToUpdate={"Vigilance"}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Divider />
                </div>
              )}
            </List>
            <Divider orientation="vertical" flexItem />
            <List style={{ marginRight: "5px" }}>
              <Button
                variant="h6"
                onClick={() => setIsScience(!isScience)}
                sx={{
                  color: theme.custom.mycustomblur.text,
                }}
              >
                {t("side.sciences")}
              </Button>
              {isScience && (
                <div
                  style={{
                    textAlign: "left",
                    color: theme.custom.mycustomblur.text,
                    marginInline: "5px",
                  }}
                >
                  <Table className="comptab">
                    <TableBody>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          Magico-Tech
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.MagicoTech_character}
                          <ModifierDialogs
                            character={perso}
                            name={"magicotech"}
                            left={"40%"}
                            dataToUpdate={"Magico-tech"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.carto")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Cartographie_character}
                          <ModifierDialogs
                            character={perso}
                            name={"carto"}
                            left={"40%"}
                            dataToUpdate={"Cartographie"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.herbalism")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Herboristerie_character}
                          <ModifierDialogs
                            character={perso}
                            name={"herbo"}
                            left={"40%"}
                            dataToUpdate={"Herboristerie"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.medicine")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Medecine_character}
                          <ModifierDialogs
                            character={perso}
                            name={"medecine"}
                            left={"40%"}
                            dataToUpdate={"Médecine"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.potion")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.Potions_character}
                          <ModifierDialogs
                            character={perso}
                            name={"popo"}
                            left={"40%"}
                            dataToUpdate={"Potions"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.magicTheory")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.TheorieMagique_character}
                          <ModifierDialogs
                            character={perso}
                            name={"theoMag"}
                            left={"40%"}
                            dataToUpdate={"Théorie Magique"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ border: theme.custom.mycustomblur.tableborder }}
                      >
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {t("side.histoMage")}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: theme.custom.mycustomblur.text,
                            border: theme.custom.mycustomblur.tableborder,
                          }}
                          className="comp"
                        >
                          {perso.HistoireMagique_character}
                          <ModifierDialogs
                            character={perso}
                            name={"histoMag"}
                            left={"40%"}
                            dataToUpdate={"Histoire Magique"}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              )}
            </List>
            <Divider orientation="vertical" flexItem />
            <List>
              <Button
                variant="h6"
                onClick={() => setIsMagic(!isMagic)}
                sx={{
                  color: theme.custom.mycustomblur.text,
                }}
              >
                {t("side.magies")}
              </Button>
              {isMagic && (
                <Grid
                  container
                  spacing={2}
                  style={{
                    textAlign: "center",
                    color: theme.custom.mycustomblur.text,
                    marginLeft: "5px",
                  }}
                  direction={isMobile ? "column" : "row"}
                >
                  <List>
                    <Button
                      variant="h8"
                      onClick={() => setIsRang1(!isRang1)}
                      sx={{
                        color: theme.custom.mycustomblur.text,
                      }}
                    >
                      {" "}
                      {t("side.elementair")}{" "}
                    </Button>
                    {isRang1 && (
                      <div
                        style={{
                          textAlign: "left",
                          color: theme.custom.mycustomblur.text,
                          marginInline: "5px",
                        }}
                      >
                        <Table className="comptab">
                          <TableBody>
                            <TableRow
                              sx={{
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                            >
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {t("side.air")}
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {perso.MagieAir_character}
                                <ModifierDialogs
                                  character={perso}
                                  name={"air"}
                                  left={"40%"}
                                  dataToUpdate={"Magie d'air"}
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                            >
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {t("side.water")}
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {perso.MagieEau_character}
                                <ModifierDialogs
                                  character={perso}
                                  name={"eau"}
                                  left={"40%"}
                                  dataToUpdate={"Magie d'eau"}
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                            >
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {t("side.fire")}
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {perso.MagieFeu_character}
                                <ModifierDialogs
                                  character={perso}
                                  name={"feu"}
                                  left={"40%"}
                                  dataToUpdate={"Magie de Feu"}
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                            >
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {t("side.earth")}
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {perso.MagieTerre_character}
                                <ModifierDialogs
                                  character={perso}
                                  name={"terre"}
                                  left={"40%"}
                                  dataToUpdate={"Magie de Terre"}
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                            >
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {t("side.elec")}
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {perso.MagieElec_character}
                                <ModifierDialogs
                                  character={perso}
                                  name={"elec"}
                                  left={"40%"}
                                  dataToUpdate={"Magie d'Elec"}
                                />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </List>
                  <Divider orientation="vertical" flexItem />
                  <List>
                    <Button
                      variant="h8"
                      onClick={() => setIsRang2(!isRang2)}
                      sx={{
                        color: theme.custom.mycustomblur.text,
                      }}
                    >
                      {" "}
                      {t("side.psy")}{" "}
                    </Button>
                    {isRang2 && (
                      <div
                        style={{
                          textAlign: "left",
                          color: theme.custom.mycustomblur.text,
                          marginInline: "5px",
                        }}
                      >
                        <Table className="comptab">
                          <TableBody>
                            <TableRow
                              sx={{
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                            >
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {t("side.crea")}
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {perso.Crea_character}
                                <ModifierDialogs
                                  character={perso}
                                  name={"crea"}
                                  left={"40%"}
                                  dataToUpdate={"Magie de Création"}
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                            >
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {t("side.anima")}
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {perso.Animaturgie_character}
                                <ModifierDialogs
                                  character={perso}
                                  name={"animaturgie"}
                                  left={"40%"}
                                  dataToUpdate={"Animaturgie"}
                                />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </List>
                  <Divider orientation="vertical" flexItem />
                  <List>
                    <Button
                      variant="h8"
                      onClick={() => setIsRang3(!isRang3)}
                      sx={{
                        color: theme.custom.mycustomblur.text,
                      }}
                    >
                      {" "}
                      {t("side.energy")}{" "}
                    </Button>
                    {isRang3 && (
                      <div
                        style={{
                          textAlign: "left",
                          color: theme.custom.mycustomblur.text,
                          marginInline: "5px",
                        }}
                      >
                        <Table className="comptab">
                          <TableBody>
                            <TableRow
                              sx={{
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                            >
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {t("side.life")}
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {perso.MagieVie_character}
                                <ModifierDialogs
                                  character={perso}
                                  name={"vie"}
                                  left={"40%"}
                                  dataToUpdate={"Magie de Vie"}
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                            >
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {t("side.death")}
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {perso.Mort_character}
                                <ModifierDialogs
                                  character={perso}
                                  name={"mort"}
                                  left={"40%"}
                                  dataToUpdate={"Magie de mort"}
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                            >
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {t("side.time")}
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {perso.Temps_character}
                                <ModifierDialogs
                                  character={perso}
                                  name={"temps"}
                                  left={"40%"}
                                  dataToUpdate={"Magie de Temps"}
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                            >
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {t("side.light")}
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {perso.Lumiere_character}
                                <ModifierDialogs
                                  character={perso}
                                  name={"lumiere"}
                                  left={"40%"}
                                  dataToUpdate={"Magie de Lumière"}
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                            >
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {t("side.dark")}
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {perso.Tenebres_character}
                                <ModifierDialogs
                                  character={perso}
                                  name={"tenebre"}
                                  left={"40%"}
                                  dataToUpdate={"Magie des Ténèbres"}
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                            >
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {t("side.cosmos")}
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {perso.Cosmos_character}
                                <ModifierDialogs
                                  character={perso}
                                  name={"cosmos"}
                                  left={"40%"}
                                  dataToUpdate={"Magie de Cosmos"}
                                />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </List>
                  <Divider orientation="vertical" flexItem />
                  <List>
                    <Button
                      variant="h8"
                      onClick={() => setIsRangA(!isRangA)}
                      sx={{
                        color: theme.custom.mycustomblur.text,
                      }}
                    >
                      {" "}
                      {t("side.plan")}{" "}
                    </Button>
                    {isRangA && (
                      <div
                        style={{
                          textAlign: "left",
                          color: theme.custom.mycustomblur.text,
                          marginInline: "5px",
                        }}
                      >
                        <Table>
                          <TableBody>
                            <TableRow
                              sx={{
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                            >
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {t("side.invoc")}
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {perso.Invoc_character}
                                <ModifierDialogs
                                  character={perso}
                                  name={"invoc"}
                                  left={"40%"}
                                  dataToUpdate={"Magie d'invocation"}
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                            >
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {t("side.aura")}
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {perso.Aura_character}
                                <ModifierDialogs
                                  character={perso}
                                  name={"aura"}
                                  left={"40%"}
                                  dataToUpdate={"armure"}
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                            >
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {t("side.astr")}
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {perso.MagieAstrale_character}
                                <ModifierDialogs
                                  character={perso}
                                  name={"magieAstrale"}
                                  left={"40%"}
                                  dataToUpdate={"Magie Astrale"}
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                            >
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {t("side.spectr")}
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {perso.MagieSpectrale_character}
                                <ModifierDialogs
                                  character={perso}
                                  name={"magieSpectrale"}
                                  left={"40%"}
                                  dataToUpdate={"Magie Spectrale"}
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                border: theme.custom.mycustomblur.tableborder,
                              }}
                            >
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {t("side.drac")}
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: theme.custom.mycustomblur.text,
                                  border: theme.custom.mycustomblur.tableborder,
                                }}
                                className="comp"
                              >
                                {perso.MagieDraconique_character}
                                <ModifierDialogs
                                  character={perso}
                                  name={"magieDraconique"}
                                  left={"40%"}
                                  dataToUpdate={"Magie Draconique"}
                                />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </List>
                </Grid>
              )}
            </List>
          </Grid>
        </Box>
        <IconButton
          onClick={handleDrawerClose}
          sx={{ position: "fixed", right: isMobile ? "2dvw" : "0vw", top: isMobile ? "1dvh" : "9vh" }}
        >
          <CloseIcon sx={{ color: theme.custom.mycustomblur.text }} />
        </IconButton>
      </Drawer>
    </div>
  );
}
