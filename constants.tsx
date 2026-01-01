
import { ArtCard, Collection } from './types';

export const ART_COLLECTIONS: Collection[] = [
  {
    id: 'hall-of-ancients',
    name: 'Hall of Ancients',
    description: 'Masterpieces from the Renaissance and Baroque eras. Echoes of divinity.',
    accent: '#D4AF37', // Gold
    items: [
      { id: 'c1', title: 'The Veiled Truth', artist: 'Giovanni Strazza', imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000&auto=format&fit=crop', mood: 'Ethereal' },
      { id: 'c2', title: 'Midnight Vigil', artist: 'Caravaggio School', imageUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000&auto=format&fit=crop', mood: 'Chiaroscuro' },
      { id: 'c3', title: 'Sorrow of the Muse', artist: 'Unknown Master', imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=1000&auto=format&fit=crop', mood: 'Melancholic' },
      { id: 'c4', title: 'Golden Hour in Rome', artist: 'Claude Lorrain', imageUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=1000&auto=format&fit=crop', mood: 'Serene' },
    ]
  },
  {
    id: 'modern-wing',
    name: 'The Modern Wing',
    description: 'Where geometry meets the human soul. Abstract and digital frontiers.',
    accent: '#007FFF', // Azure
    items: [
      { id: 'm1', title: 'Fractured Reality', artist: 'Lia Bloom', imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1000&auto=format&fit=crop', mood: 'Electric' },
      { id: 'm2', title: 'Neon Solitude', artist: 'X-Ray', imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop', mood: 'Vibrant' },
      { id: 'm3', title: 'Digital Pulse', artist: 'Cyber-Artisan', imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop', mood: 'Dreamy' },
    ]
  },
  {
    id: 'private-study',
    name: 'Private Study',
    description: 'Sketches, charcoal drafts, and the raw process of creation.',
    accent: '#8B4513', // SaddleBrown
    items: [
      { id: 's1', title: 'First Thought', artist: 'Da Vinci Method', imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000&auto=format&fit=crop', mood: 'Raw' },
      { id: 's2', title: 'Charcoal Dream', artist: 'Urbanite', imageUrl: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=1000&auto=format&fit=crop', mood: 'Dark' },
    ]
  }
];

export const HERO_CARDS = [
  { url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=400', speed: 20, delay: 0 },
  { url: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=400', speed: 25, delay: 1 },
  { url: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=400', speed: 18, delay: 0.5 },
  { url: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=400', speed: 30, delay: 1.5 },
  { url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=400', speed: 22, delay: 0.2 },
  { url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=400', speed: 28, delay: 0.8 },
];
