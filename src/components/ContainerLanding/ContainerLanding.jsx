/* istanbul ignore file */
import { Header } from "../../components/HeaderLanding/Header";
import { Hero } from "../../components/MainLanding/hero/HeroSection";
import { Footer } from "../../components/FooterLanding/Footer";
import "./Container.css";

import { BestRecipes } from "../../components/MainLanding/ourBestRecipes/BestRecipes";
import { BestServices } from "../../components/MainLanding/bestServices/BestServices";
import { Contact } from "../../components/MainLanding/contact/Contact";
import { Blog } from "../../components/MainLanding/blog/Blog";

function Container() {
  return (
    <>
      <Header />

      <Hero />
      <BestRecipes />
      <BestServices />
      <Blog />
      <Contact />
      <Footer />
    </>
  );
}

export default Container;