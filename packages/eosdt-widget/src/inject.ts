import Equilibrium from "./";

(window as any).Equilibrium = Equilibrium;
window.dispatchEvent(new Event("equilibrium:loaded"));
