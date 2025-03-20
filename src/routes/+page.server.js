// Portfolio data for Riccardo Pichi

export function load() {
  return {
    works: [
      {
        id: 1,
        title: "Immersive Performance Visuals",
        year: "2024",
        categories: ["Live Visuals", "Projection Mapping"],
        description: "Real-time visual performance system designed for live music events, using TouchDesigner and Resolume Arena to create responsive audiovisual experiences that react to sound input and enhance the spatial perception of the venue.",
        image: "/images/branding-main.jpg", // Using existing image from your static folder
        link: "/work/performance-visuals"
      },
      {
        id: 2,
        title: "Interactive Installation",
        year: "2023",
        categories: ["Installation", "Interactive Art"],
        description: "Interactive art installation using motion sensors and projection mapping to create dynamic visual narratives that respond to audience movement. Created using a combination of Arduino, TouchDesigner, and custom Python scripts.",
        // No image specified, will use placeholder
        link: "/work/interactive-installation"
      },
      {
        id: 3,
        title: "Brand Identity System",
        year: "2023",
        categories: ["Branding", "Motion Graphics"],
        description: "Comprehensive brand identity for a tech startup, including logo design, typography, color system, and motion graphics guidelines. The project focused on creating a cohesive visual language that works across digital and physical touchpoints.",
        // No image specified, will use placeholder
        link: "/work/brand-identity"
      },
      {
        id: 4,
        title: "Audiovisual EP",
        year: "2022",
        categories: ["Music Video", "Motion Graphics"],
        description: "Conceptual audiovisual project combining original music production with synchronized visual narratives. The project explores the relationship between sound, image, and emotion through abstract digital compositions.",
        // No image specified, will use placeholder
        link: "/work/audiovisual-ep"
      },
      {
        id: 5,
        title: "3D Spatial Experience",
        year: "2022",
        categories: ["3D Design", "VR"],
        description: "Virtual reality experience designed in Unreal Engine that transforms abstract data into navigable 3D environments. The project explores new ways of visualizing complex information through spatial design and interaction.",
        // No image specified, will use placeholder
        link: "/work/spatial-experience"
      },
      {
        id: 6,
        title: "Exhibition Design",
        year: "2021",
        categories: ["Exhibition", "Cultural Mediation"],
        description: "Comprehensive exhibition design for a contemporary art show at Villa Medici, including spatial layout, visual identity, digital interfaces, and informational systems to enhance visitor engagement and understanding.",
        // No image specified, will use placeholder
        link: "/work/exhibition-design"
      },
      {
        id: 7,
        title: "Experimental Typography",
        year: "2023",
        categories: ["Typography", "Motion Design"],
        description: "Experimental typographic project exploring the boundaries between legibility and abstraction through animated letterforms and generative typography systems created with creative coding techniques.",
        // No image specified, will use placeholder
        link: "/work/experimental-typography"
      },
      {
        id: 8,
        title: "Creative Coding Experiments",
        year: "2022",
        categories: ["Creative Coding", "Generative Art"],
        description: "Collection of generative art pieces created through custom algorithms and code-based design systems using p5.js and Processing. Each piece explores different mathematical principles and emergent visual patterns.",
        // No image specified, will use placeholder
        link: "/work/creative-coding"
      }
    ]
  };
}