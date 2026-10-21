// Catálogo de exemplo — troque pelos produtos reais da loja
const STORE = {
  name: 'iPrime Manaus',
  whatsapp: '5592999999999',
  instagram: 'iprimemanaus',
  address: 'Av. Djalma Batista, 1661 — Chapada, Manaus/AM',
  hours: 'Seg a Sex 9h–19h • Sáb 9h–14h',
  pixDiscount: 0.10,
  installments: 12
};

const COLORS = {
  laranja: { name: 'Laranja Cósmico', hex: '#e07a3f' },
  azulprof: { name: 'Azul Profundo', hex: '#2f3e5c' },
  prata: { name: 'Prata', hex: '#e3e4e6' },
  preto: { name: 'Preto Espacial', hex: '#2b2b2e' },
  azulceu: { name: 'Azul Céu', hex: '#bcd3e8' },
  dourado: { name: 'Dourado Claro', hex: '#e9dcc4' },
  lavanda: { name: 'Lavanda', hex: '#c9bfe0' },
  salvia: { name: 'Sálvia', hex: '#b8c4a8' },
  branco: { name: 'Branco', hex: '#f4f4f2' },
  deserto: { name: 'Titânio Deserto', hex: '#c8b39a' },
  natural: { name: 'Titânio Natural', hex: '#b9b4aa' },
  ultramar: { name: 'Ultramarino', hex: '#5b6fd6' },
  verdeagua: { name: 'Verde-acqua', hex: '#9fd3c7' },
  rosa: { name: 'Rosa', hex: '#f2c6cf' },
  roxo: { name: 'Roxo-profundo', hex: '#4b3f55' }
};

// type: pro | air | base | e  (desenha o módulo de câmera)
const PRODUCTS = [
  { id: 'iphone-17-pro-max', name: 'iPhone 17 Pro Max', type: 'pro', cond: 'Lacrado', tags: ['novo', 'alta'], colors: ['laranja', 'azulprof', 'prata'], storage: { '256 GB': 11499, '512 GB': 12999, '1 TB': 14499, '2 TB': 17499 }, oldMult: 1.08, rating: 4.9, reviews: 214, sold: 980 },
  { id: 'iphone-17-pro', name: 'iPhone 17 Pro', type: 'pro', cond: 'Lacrado', tags: ['novo', 'alta'], colors: ['azulprof', 'laranja', 'prata'], storage: { '256 GB': 10499, '512 GB': 11999, '1 TB': 13499 }, oldMult: 1.08, rating: 4.9, reviews: 187, sold: 860 },
  { id: 'iphone-air', name: 'iPhone Air', type: 'air', cond: 'Lacrado', tags: ['novo'], colors: ['azulceu', 'dourado', 'branco', 'preto'], storage: { '256 GB': 9499, '512 GB': 10999, '1 TB': 12499 }, oldMult: 1.07, rating: 4.7, reviews: 96, sold: 410 },
  { id: 'iphone-17', name: 'iPhone 17', type: 'base', cond: 'Lacrado', tags: ['novo', 'alta'], colors: ['lavanda', 'salvia', 'azulceu', 'branco', 'preto'], storage: { '256 GB': 7499, '512 GB': 8999 }, oldMult: 1.1, rating: 4.8, reviews: 241, sold: 1120 },
  { id: 'iphone-16-pro-max', name: 'iPhone 16 Pro Max', type: 'pro', cond: 'Lacrado', tags: ['alta'], colors: ['deserto', 'natural', 'preto', 'branco'], storage: { '256 GB': 9299, '512 GB': 10799, '1 TB': 12299 }, oldMult: 1.15, rating: 4.9, reviews: 532, sold: 1540 },
  { id: 'iphone-16', name: 'iPhone 16', type: 'base', cond: 'Lacrado', tags: ['alta'], colors: ['ultramar', 'verdeagua', 'rosa', 'branco', 'preto'], storage: { '128 GB': 5499, '256 GB': 6299, '512 GB': 7799 }, oldMult: 1.15, rating: 4.8, reviews: 618, sold: 1890 },
  { id: 'iphone-16e', name: 'iPhone 16e', type: 'e', cond: 'Lacrado', tags: [], colors: ['branco', 'preto'], storage: { '128 GB': 3999, '256 GB': 4799 }, oldMult: 1.12, rating: 4.6, reviews: 143, sold: 520 },
  { id: 'iphone-15', name: 'iPhone 15', type: 'base', cond: 'Lacrado', tags: ['alta'], colors: ['rosa', 'azulceu', 'preto'], storage: { '128 GB': 4299, '256 GB': 4999 }, oldMult: 1.18, rating: 4.8, reviews: 702, sold: 1320 },
  { id: 'iphone-15-pro-semi', name: 'iPhone 15 Pro', type: 'pro', cond: 'Seminovo', battery: 91, grade: 'Vitrine', tags: ['semi'], colors: ['natural', 'preto'], storage: { '128 GB': 4699, '256 GB': 5199 }, oldMult: 1.2, rating: 4.8, reviews: 88, sold: 300 },
  { id: 'iphone-14-pro-semi', name: 'iPhone 14 Pro', type: 'pro', cond: 'Seminovo', battery: 88, grade: 'Excelente', tags: ['semi'], colors: ['roxo', 'preto', 'prata'], storage: { '128 GB': 3799, '256 GB': 4199 }, oldMult: 1.2, rating: 4.7, reviews: 121, sold: 410 },
  { id: 'iphone-13-semi', name: 'iPhone 13', type: 'base', cond: 'Seminovo', battery: 86, grade: 'Muito bom', tags: ['semi'], colors: ['azulceu', 'rosa', 'preto'], storage: { '128 GB': 2499, '256 GB': 2899 }, oldMult: 1.22, rating: 4.7, reviews: 164, sold: 640 },
  { id: 'iphone-16-pro-semi', name: 'iPhone 16 Pro', type: 'pro', cond: 'Seminovo', battery: 97, grade: 'Vitrine', tags: ['semi'], colors: ['deserto', 'natural'], storage: { '128 GB': 6299, '256 GB': 6899 }, oldMult: 1.18, rating: 4.9, reviews: 52, sold: 190 }
];

const SPECS = {
  pro: [['Tela', 'Super Retina XDR com ProMotion até 120 Hz'], ['Chip', 'Apple série Pro'], ['Câmeras', 'Sistema Pro de 3 câmeras de 48 MP'], ['Bateria', 'Até 33 h de reprodução de vídeo'], ['Conector', 'USB‑C (USB 3)'], ['Resistência', 'IP68']],
  air: [['Tela', 'Super Retina XDR 6,5" com ProMotion'], ['Espessura', '5,6 mm — o iPhone mais fino'], ['Câmera', 'Fusion de 48 MP'], ['Chip', 'A19 Pro'], ['Conector', 'USB‑C'], ['Resistência', 'IP68']],
  base: [['Tela', 'Super Retina XDR'], ['Chip', 'Apple série A'], ['Câmeras', 'Sistema de 2 câmeras de 48 MP'], ['Bateria', 'Até 30 h de reprodução de vídeo'], ['Conector', 'USB‑C'], ['Resistência', 'IP68']],
  e: [['Tela', 'Super Retina XDR 6,1"'], ['Chip', 'A18'], ['Câmera', 'Fusion de 48 MP'], ['Bateria', 'Até 26 h de reprodução de vídeo'], ['Conector', 'USB‑C'], ['Resistência', 'IP68']]
};
