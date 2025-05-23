import Accordion from "../libr/accordion/accordion.js";

export default function createSectionAccordion() {
  new Accordion(1,
    {
      accordionClass: 'accordion-1',
      panelClass: 'accordion__panel',
      trigerClass: 'accordion__panel-header-btn',
    }
  );

  new Accordion(2,
    {
      accordionClass: 'accordion-2',
      panelClass: 'accordion__panel',
      trigerClass: 'accordion__panel-header-btn',
      closeOpen: false,
      duration: 300,
    }
  );
}
