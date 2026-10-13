import Spotlight from "@/components/Spotlight";
import Nav from "@/components/Nav";
import SideRails from "@/components/SideRails";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function Home() {
  return (
    <>
      <Spotlight />
      <Nav />
      <SideRails />
      <main id="top">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <RevealOnScroll />
    </>
  );
}
