import React from "react";
import AboutUsHero from "./aboutHero";
import OurResults from "./results";
import OurMission from "./ourMission";
import InsideMosaicCompany from "./insideCompany";
import OurTeamView from "./ourTeam";
import { TransformedContent } from "@/lib/utils";

export default function AboutUsView(props?: { data?: TransformedContent }) {
  return (
    <div className="min-h-screen">
      <AboutUsHero />
      <OurResults />
      <OurMission />
      <InsideMosaicCompany />
      <OurTeamView />
    </div>
  );
}
