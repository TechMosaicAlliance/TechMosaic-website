import React from "react";
import CareerHero from "./careerHero";
import Perks from "./perks";
import JobOpening from "./jobOpening";
import { ApplyView } from "./apply";

export default function CareerView() {
  return (
    <>
      <CareerHero />
      <Perks />
      <JobOpening />
    </>
  );
}
