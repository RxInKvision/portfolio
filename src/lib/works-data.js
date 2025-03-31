export const worksData = [
    {
        id: 'av-performance',
        title: "AV Performance",
        year: 2023,
        categories: ["Interactive", "Performance", "Digital Art"],
        description: "An immersive audiovisual performance exploring the intersection of sound and visual art, pushing the boundaries of multimedia expression.",
        shortDescription: "Immersive audiovisual experience blending sound and visuals.",
        image: "/images/cards/avperformace.jpg",
        link: "/works/av-performance",
        heroImage:  "/images/cards/avperformace.jpg",
        technologies: ["Ableton Live", "Max/MSP", "TouchDesigner"],
        keyFeatures: [
            "Real-time audio-visual synthesis",
            "Interactive generative graphics",
            "Adaptive sound landscapes"
        ],
        challenge: "Creating a seamless interaction between audio and visual elements in real-time.",
        solution: "Developed a custom performance system using modular software that allows dynamic audio-visual mapping.",
        gallery: [
            "/images/cards/avperformace.jpg",
            "/images/cards/avperformace.jpg",
             "/images/cards/avperformace.jpg"
        ]
    },
    {
        id: 'brand-identity',
        title: "Brand Identity Design",
        year: 2022,
        categories: ["Branding", "Design", "Visual Identity"],
        description: "Comprehensive brand identity design for an innovative tech startup, focusing on modern minimalism and cutting-edge visual communication.",
        shortDescription: "Minimalist brand identity for a forward-thinking tech company.",
        image: "/images/cards/branding.png",
        link: "/works/brand-identity",
        heroImage: "/images/cards/branding.png",
        technologies: ["Adobe Illustrator", "Adobe Photoshop", "Figma"],
        keyFeatures: [
            "Cohesive visual language",
            "Adaptable logo system",
            "Modern color palette"
        ],
        challenge: "Creating a unique visual identity that stands out in a competitive tech landscape.",
        solution: "Developed a flexible branding system with a clean, futuristic aesthetic.",
        gallery: [
            "/images/cards/branding.png",
            "/images/cards/branding.png",
            "/images/cards/branding.png"
        ]
    },
    {
        id: 'interactive-installation',
        title: "Interactive Digital Installation",
        year: 2023,
        categories: ["Interactive", "Installation", "Digital Art"],
        description: "An interactive digital art installation that responds to audience movement and engagement, creating a dynamic and immersive experience.",
        shortDescription: "Responsive digital art installation with audience interaction.",
        image: "/images/cards/interactive.png",
        link: "/works/interactive-installation",
        heroImage: "/assets/img/1730732511970-Untitled design 2 2.png",
        technologies: ["openFrameworks", "Kinect", "Arduino"],
        keyFeatures: [
            "Motion-responsive visuals",
            "Real-time audience interaction",
            "Generative art system"
        ],
        challenge: "Creating an intuitive and engaging interactive experience.",
        solution: "Developed a responsive system using motion tracking and generative graphics.",
        gallery: [
            "/images/cards/interactive.png",
            "/images/cards/interactive.png",
            "/images/cards/interactive.png"
        ]
    }
];

// Function to get a work by its ID
export function getWorkById(id) {
    return worksData.find(work => work.id === id);
}