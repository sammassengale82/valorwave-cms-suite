import hero from "./hero/template.json";
import header from "./header/template.json";
import services from "./services/template.json";
import serviceArea from "./service-area/template.json";
import bio from "./bio/template.json";
import weddingDj from "./wedding-dj/template.json";
import faq from "./faq/template.json";
import brandMeaning from "./brand-meaning/template.json";
import heroDiscount from "./hero-discount/template.json";
import calendar from "./calendar/template.json";
import testimonials from "./testimonials/template.json";
import testimonialForm from "./testimonial-form/template.json";
import footer from "./footer/template.json";

export const templates = [
  { id: hero.id, name: hero.name, preview: "/templates/hero/preview.png", data: hero },
  { id: header.id, name: header.name, preview: "/templates/header/preview.png", data: header },
  { id: services.id, name: services.name, preview: "/templates/services/preview.png", data: services },
  { id: serviceArea.id, name: serviceArea.name, preview: "/templates/service-area/preview.png", data: serviceArea },
  { id: bio.id, name: bio.name, preview: "/templates/bio/preview.png", data: bio },
  { id: weddingDj.id, name: weddingDj.name, preview: "/templates/wedding-dj/preview.png", data: weddingDj },
  { id: faq.id, name: faq.name, preview: "/templates/faq/preview.png", data: faq },
  { id: brandMeaning.id, name: brandMeaning.name, preview: "/templates/brand-meaning/preview.png", data: brandMeaning },
  { id: heroDiscount.id, name: heroDiscount.name, preview: "/templates/hero-discount/preview.png", data: heroDiscount },
  { id: calendar.id, name: calendar.name, preview: "/templates/calendar/preview.png", data: calendar },
  { id: testimonials.id, name: testimonials.name, preview: "/templates/testimonials/preview.png", data: testimonials },
  { id: testimonialForm.id, name: testimonialForm.name, preview: "/templates/testimonial-form/preview.png", data: testimonialForm },
  { id: footer.id, name: footer.name, preview: "/templates/footer/preview.png", data: footer }
];