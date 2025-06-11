// src/routes/+page.server.js

// 1. Importa i dati dal tuo file principale
import { worksData } from '$lib/works-data.js';

export function load() {
  // 2. Restituisci i dati importati, mappandoli se necessario 
  //    per ottenere la struttura più semplice che ti serve per la homepage.
  return {
    works: worksData.map(work => ({
      id: work.id,
      title: work.title,
      year: work.year.toString(), // Assicurati che il tipo di dato sia consistente
      categories: work.categories,
      description: work.shortDescription, // Usa la descrizione breve per la homepage
      image: work.image,
      link: work.link
    }))
  };
}