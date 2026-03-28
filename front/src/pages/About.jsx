import { useContext } from "react";
import { ConnexionContext } from "../components/provider";
import Top from "../components/Header";
import BG from "../components/Background";
import AboutCompo from "../components/About";
import PageLoader from "../components/PageLoader";

function About() {
  const { loading } = useContext(ConnexionContext);

  if (loading) return <PageLoader />;

  return (
    <div className="main">
      <BG />
      <Top />
      <AboutCompo />
    </div>
  );
}

export default About;
