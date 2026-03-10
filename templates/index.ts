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
import seo from "./seo/template.json";
import google from "./google/template.json";

export type TemplateEntry = {
  id: string;
  name: string;
  category: string;
  preview: string;
  data: any;
};

export const templates: TemplateEntry[] = [
  { id: hero.id, name: hero.name, category: "Hero", preview: "/templates/hero/preview.png", data: hero },
  { id: header.id, name: header.name, category: "Header", preview: "/templates/header/preview.png", data: header },
  { id: services.id, name: services.name, category: "Services", preview: "/templates/services/preview.png", data: services },
  { id: serviceArea.id, name: serviceArea.name, category: "Services", preview: "/templates/service-area/preview.png", data: serviceArea },
  { id: bio.id, name: bio.name, category: "About", preview: "/templates/bio/preview.png", data: bio },
  { id: weddingDj.id, name: weddingDj.name, category: "Services", preview: "/templates/wedding-dj/preview.png", data: weddingDj },
  { id: faq.id, name: faq.name, category: "Utility", preview: "/templates/faq/preview.png", data: faq },
  { id: brandMeaning.id, name: brandMeaning.name, category: "About", preview: "/templates/brand-meaning/preview.png", data: brandMeaning },
  { id: heroDiscount.id, name: heroDiscount.name, category: "Hero", preview: "/templates/hero-discount/preview.png", data: heroDiscount },
  { id: calendar.id, name: calendar.name, category: "Utility", preview: "/templates/calendar/preview.png", data: calendar },
  { id: testimonials.id, name: testimonials.name, category: "Testimonials", preview: "/templates/testimonials/preview.png", data: testimonials },
  { id: testimonialForm.id, name: testimonialForm.name, category: "Forms", preview: "/templates/testimonial-form/preview.png", data: testimonialForm },
  { id: footer.id, name: footer.name, category: "Footer", preview: "/templates/footer/preview.png", data: footer },
  { id: seo.id, name: seo.name, category: "Meta", preview: "/templates/seo/preview.png", data: seo },
  { id: google.id, name: google.name, category: "Meta", preview: "/templates/google/preview.png", data: google }
];