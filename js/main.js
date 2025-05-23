import createSectionElementsDropdown from "./dropdown-section.js";
import createSectionElementsInput from "./input-section.js";
import createSectionMix from "./mix-section.js";
import createSectionAccordion from "./accordion-section.js";
import createSectionHeader from "./header.js";

document.addEventListener('DOMContentLoaded', () => {
  createSectionHeader();
  createSectionElementsDropdown();
  createSectionElementsInput();
  createSectionMix();
  createSectionAccordion();
});
