// The Muse menus, transcribed exactly from the restaurant's own PDFs (muserestaurant.co.za):
//   Seasonal menu: "Winter 2026"   Drinks menu 2026   Wine list 2026
// When the season changes: update `season`, replace the dishes below, and swap the PDF in public/menus.
// Never invent dishes or prices. Prices are in Rand.
//   diet: 'V' = vegetarian, 'VG' = vegan (as marked on the printed menu)
import { asset } from '../utils/asset';

export const season = 'Winter 2026';

export const downloads = [
  { id: 'seasonal', label: 'Seasonal menu', detail: `${season} · PDF · 136 KB`, href: asset('menus/muse-seasonal-menu-winter-2026.pdf') },
  { id: 'drinks', label: 'Drinks menu', detail: '2026 · PDF · 121 KB', href: asset('menus/muse-drinks-menu-2026.pdf') },
  { id: 'wine', label: 'Wine list', detail: '2026 · PDF · 570 KB', href: asset('menus/muse-wine-list-2026.pdf') },
];

export const dietLabels = { V: 'Vegetarian', VG: 'Vegan' };

export const seasonalMenu = [
  {
    id: 'starters',
    title: 'Starters',
    items: [
      { name: 'Fish Cakes', description: 'Lacto-fermented chips, nori and black lemon aioli, capers', price: 70 },
      { name: 'Bone Marrow', description: 'Biltong powder crust, pulled beef short rib, pickled red onion, jus, marmite milk bread', price: 95 },
      { name: 'Chickpea Fries', description: 'Smoked truffle aioli', price: 55, diet: 'V' },
      { name: 'Mushroom Parfait', description: 'Beetroot, roosterbrood, beetroot crisps', price: 85, diet: 'V' },
      { name: 'Duck Samoosa', description: 'Slaw, sesame paste, berry coulis, kha khua dressing', price: 115 },
      { name: 'Carpaccio', description: 'Pickled baby beets, shoyu tamago, Karoo cheese, citrus oil', price: 115 },
      { name: 'Mussel Tortellini', description: 'Lemon & parsley split sauce, beach cabbage, ciabatta', price: 85 },
      { name: 'Beef Croquette', description: 'Black mustard aioli', price: 65 },
    ],
  },
  {
    id: 'mains',
    title: 'Mains',
    items: [
      { name: 'Beef Short Rib', description: 'Mash potato, pickled chilli, vegetables, soy jus', price: 220 },
      { name: 'Lamb Rump', description: 'Spinach hummus, pumpkin fritters, broccoli, jus', price: 270 },
      { name: 'Confit Duck Leg', description: 'Mushroom risotto, beetroot, truffle jus', price: 245 },
      { name: 'Smoked Pork Belly', description: 'White bean purée, butternut gnocchi, balsamic and bourbon onions, broccoli, maple jus', price: 220 },
      { name: 'Line Fish', description: 'Charred corn purée, crushed baby potato, sugar snaps, chilli oil, lemon', price: 205 },
      { name: 'Peri Peri Marinated Chicken Thighs', description: 'Madras sauce, pesto quinoa, baby marrow, corn on the cob, carrot atchar', price: 190 },
      { name: 'Muse Bowl', description: 'Cauliflower steak, falafels, tomato labneh, crispy lentils, coriander pesto', price: 120, diet: 'V', extra: 'With crispy pork cheek · 145' },
      { name: 'Lamb Shank', description: 'Amasi samp, tomato bredie, roasted vegetables', price: 305 },
      { name: 'Beef Fillet', description: 'Duck fat potato, mushroom purée, glazed baby carrots, whipped bone marrow, jus', price: 285 },
      { name: 'Pea, Lemon and Leek Risotto', description: 'Sugar snaps, parmesan, basil', price: 140, diet: 'V', extra: 'With crispy pork cheek · 165' },
    ],
  },
  {
    id: 'salads',
    title: 'Salads',
    note: 'Add chicken · 45',
    items: [
      { name: 'Quinoa Salad', description: 'Quinoa, green apple, celery, cucumber, parsley, yoghurt, macadamia nuts', price: 85, diet: 'V' },
      { name: 'Herb Salad', description: 'Herb salad, tomato, olives, cucumber, feta, vinaigrette', price: 75, diet: 'V' },
    ],
  },
  {
    id: 'pasta',
    title: 'Pasta',
    note: 'Substitute pasta for quinoa for a gluten-free option · 20',
    items: [
      { name: 'Pulled Beef Short Rib', description: 'Cubed vegetables, creamy jus sauce, parmesan', price: 145 },
      { name: 'Beef and Chorizo Meatballs', description: 'Napolitana sauce, basil, parmesan', price: 140 },
      { name: 'Chicken and Mushroom', description: 'Creamy tomato sauce, parmesan', price: 135 },
      { name: 'Butternut Gnocchi', description: 'Toasted pine nuts, parmesan, spinach, burnt sage butter', price: 135, diet: 'V' },
    ],
  },
  {
    id: 'pizza',
    title: 'Pizza',
    items: [
      { name: 'Chicken, Chorizo, Harissa, Feta', price: 130 },
      { name: 'Meatball, Basil', price: 135 },
      { name: 'Lamb, Caramelised Onion, Mint, Yoghurt Cheese', price: 135 },
      { name: 'Roasted Red Pepper, Olive, Feta', price: 105, diet: 'V' },
    ],
  },
  {
    id: 'curry',
    title: 'Curry',
    note: 'All curries are served with black rice, raita and naan',
    items: [
      { name: 'Chicken Butter Curry', price: 160 },
      { name: 'Falafel & Vegetable Butter Curry', price: 130, diet: 'V' },
    ],
  },
  {
    id: 'wraps',
    title: 'Wraps and Taco',
    items: [
      { name: 'Pulled Pork Taco', description: 'Salsa, guacamole, herb aioli', price: 90 },
      { name: 'Lamb Wrap', description: 'Tzatziki, salsa, hand-cut chips', price: 135 },
      { name: 'Pulled Pork and Coleslaw Wrap', description: 'Hand-cut chips', price: 115 },
      { name: 'Meatball Wrap', description: 'Napolitana sauce, mozzarella, basil, hand-cut chips', price: 130 },
      { name: 'Falafel Wrap', description: 'Tzatziki, salsa, hand-cut chips', price: 105, diet: 'V' },
    ],
  },
  {
    id: 'desserts',
    title: 'Desserts',
    items: [
      { name: 'Caramel Fondant', description: 'Chocolate ganache, Maldon sea salt, almond florentine, vanilla pod ice cream', price: 90 },
      { name: 'Dark Chocolate Torte', description: 'Brandy caramel, cocoa nib tuile, miso caramel ice cream', price: 95 },
      { name: 'Burnt Honey Ice Cream Sandwich', description: 'Lemon, pistachios', price: 70 },
      { name: 'Deep Fried Almond and Cranberry Nougat', description: 'Champagne jelly, rosewater ice cream', price: 75 },
      { name: 'Vanilla Pod Crème Brûlée Mille-Feuille', price: 65 },
      { name: 'Mochi Chocolate Brownie', description: 'Seed cracker, caramel sauce', price: 75, diet: 'VG' },
    ],
  },
];

// A short selection for the home page preview, by section id and dish name.
export const previewSelection = [
  ['starters', 'Carpaccio'],
  ['starters', 'Bone Marrow'],
  ['mains', 'Beef Fillet'],
  ['mains', 'Pea, Lemon and Leek Risotto'],
  ['desserts', 'Caramel Fondant'],
  ['desserts', 'Vanilla Pod Crème Brûlée Mille-Feuille'],
];

export const previewDishes = () =>
  previewSelection
    .map(([section, name]) => {
      const group = seasonalMenu.find((s) => s.id === section);
      const item = group?.items.find((i) => i.name === name);
      return item ? { ...item, course: group.title } : null;
    })
    .filter(Boolean);

// Drinks. Two prices (e.g. 32 | 35) follow the printed menu: the two options named in the item.
export const drinksMenu = [
  {
    id: 'cocktails',
    title: 'Cocktails',
    items: [
      { name: 'Smoked Honey Old Fashioned', description: 'Bourbon, smoked honey syrup, bitters', price: '90' },
      { name: 'Cosmo', description: 'Vodka, triple sec, lime, cranberry juice', price: '80' },
      { name: 'Negroni', description: 'Campari, vermouth, gin', price: '85' },
      { name: 'Mojito', description: 'White rum, lemon syrup, soda, mint, lemon', price: '75' },
      { name: 'Monkey Sours', description: 'Monkey Shoulder, lemon, bitters', price: '90' },
      { name: 'Muse Surfer', description: 'Spiced rum, orange juice, elderflower, grenadine, blue curaçao, lemon, mint', price: '80' },
      { name: 'Classic Margarita', description: 'Tequila, triple sec, lime', price: '70' },
      { name: 'Watermelon Margarita', description: 'Tequila, triple sec, lime, watermelon', price: '75' },
      { name: 'Paloma', description: 'Tequila, lime, grapefruit soda', price: '70' },
      { name: 'Mimosa', description: 'Bubbles, orange juice', price: '65' },
      { name: 'Simi Spritz', description: 'Elderflower, prosecco, soda', price: '65' },
      { name: 'Martini', description: 'Classic, Espresso, Pornstar', price: '90' },
      { name: 'Blush', description: 'Bombay gin, cranberry, lime', price: '85' },
      { name: 'Aperol Spritz', description: 'Aperol, bubbles, soda water', price: '75' },
    ],
  },
  {
    id: 'beers',
    title: 'Beers & Ciders',
    items: [
      { name: 'Castle | Castle Lite', price: '32' },
      { name: 'Heineken | Heineken Zero', price: '32 | 35' },
      { name: 'Windhoek Lager | Draught', price: '32 | 40' },
      { name: 'Black Label', price: '32' },
      { name: 'Amstel', price: '32' },
      { name: 'Hansa', price: '32' },
      { name: 'Savannah Dry | Light', price: '40' },
    ],
  },
  {
    id: 'craft',
    title: 'Craft',
    items: [
      { name: 'Car Park John Amber Ale', price: '45' },
      { name: 'Twin Fin Pilsner', price: '45' },
      { name: 'Jane Doe Hard Lemonade', price: '45' },
      { name: 'Session Craft Beer', price: '60' },
    ],
  },
  {
    id: 'whiskey',
    title: 'Whiskey',
    items: [
      { name: 'Bells', price: '30' },
      { name: 'Jameson', price: '40' },
      { name: 'Glenlivet 12 year', price: '48' },
      { name: 'Johnnie Walker Black Label', price: '40' },
      { name: 'Jack Daniels', price: '30' },
      { name: 'Gentleman Jack', price: '40' },
      { name: 'Wild Turkey Bourbon', price: '40' },
      { name: 'Glen Grant 10 year', price: '48' },
    ],
  },
  {
    id: 'gin',
    title: 'Gin',
    items: [
      { name: 'Bombay Sapphire', price: '35' },
      { name: 'Inverroche Amber', price: '45' },
      { name: 'Bulldog', price: '40' },
      { name: 'Cruxland Truffle', price: '40' },
      { name: 'Hendricks', price: '50' },
    ],
  },
  {
    id: 'brandy',
    title: 'Brandy & Cognac',
    items: [
      { name: 'Klipdrift Premium', price: '35' },
      { name: 'KWV Potstill 10 year', price: '45' },
      { name: 'KWV Potstill 20 year', price: '100' },
      { name: 'Hennessy V.S', price: '55' },
      { name: 'Hennessy V.S.O.P', price: '70' },
      { name: 'Bisquit & Dubouché VSOP Cognac', price: '70' },
    ],
  },
  {
    id: 'spirits',
    title: 'Rum, Vodka & Tequila',
    items: [
      { name: 'Havana Club', price: '40' },
      { name: 'Bacardi Blanco', price: '35' },
      { name: 'Baron Samedi Rum', price: '45' },
      { name: 'SKYY', price: '30' },
      { name: 'Grey Goose', price: '55' },
      { name: 'Belvedere', price: '60' },
      { name: 'Espolòn Reposado', price: '45' },
      { name: 'Don Julio', price: '65' },
    ],
  },
  {
    id: 'after-dinner',
    title: 'After Dinner',
    items: [
      { name: 'Port', price: '60' },
      { name: 'Dom Pedro', description: 'Served in a champagne glass', price: '45' },
      { name: 'Irish Coffee', price: '50' },
    ],
  },
  {
    id: 'soft',
    title: 'Soft Drinks',
    items: [
      { name: 'Still | Sparkling Water', price: '22 | 35' },
      { name: 'Schweppes Mixers', price: '20' },
      { name: 'Soft Drinks', price: '25' },
      { name: 'Sprite | Sprite Zero', price: '25' },
      { name: 'Appletiser | Grapetiser', price: '30' },
      { name: 'San Pellegrino Drinks | Zero', price: '45' },
      { name: 'Fruit Juice', price: '30' },
      { name: 'Muse Lemonade', price: '35' },
      { name: 'Rock Shandy | Steelworks', price: '40' },
    ],
  },
  {
    id: 'hot',
    title: 'Hot Drinks',
    items: [
      { name: 'Espresso', price: '25 | 30' },
      { name: 'Americano', price: '29 | 34' },
      { name: 'Cappuccino', price: '32 | 37' },
      { name: 'Macchiato', price: '28' },
      { name: 'Latte', price: '35 | 42' },
      { name: 'Chai Latte', price: '40' },
      { name: 'Selected Teas', price: '25' },
      { name: 'Callebaut Hot Chocolate', price: '45' },
      { name: 'Almond Milk', price: '+15' },
    ],
  },
  {
    id: 'milkshakes',
    title: 'Milkshakes',
    items: [
      { name: 'Chocolate | Vanilla | Strawberry | Coffee', price: '45' },
      { name: 'Chocolate Craft', price: '60' },
      { name: 'Strawberry Craft', price: '60' },
      { name: 'Toasted Marshmallow', price: '60' },
      { name: 'Salted Caramel', price: '60' },
    ],
  },
];

// Wine list. price: bottle price. glass: by-the-glass price where offered.
export const wineList = [
  {
    id: 'cap-classique',
    title: 'Cap Classique',
    items: [
      { name: 'Groote Post Brut Rosé', region: 'Darling Hills', price: 385, notes: 'Salmon-pink tinged with flavours of strawberry and hints of yeasty biscuit. Crafted according to the age-old tradition of second fermentation.' },
      { name: 'Paul René Chardonnay Brut', region: 'Robertson', price: 485, notes: 'Rich with citrus blossom and nougat flavour, lemon curd and orange notes. Bright limestone acidity, with bready and creamy notes on the finish.' },
      { name: 'Weltevrede Brut Nectar Demi-Sec', region: 'Robertson', price: 340, notes: 'Some memories are golden, forever banked in our hearts as beacons to treasure: the nectar of our life stories.' },
      { name: 'Colmant Brut Rosé', region: 'Franschhoek', price: 480, notes: 'Wild strawberries and redcurrants brushed with a hint of flowers. Red berry vivacity set against a silky richness and creamy texture.' },
    ],
  },
  {
    id: 'sauvignon-blanc',
    title: 'Sauvignon Blanc',
    items: [
      { name: 'Doolhof Mountain Range', region: 'Limietberg', glass: 65, price: 195, notes: 'Lovely tropical notes with underlying green figs and gooseberries, underlined with a core of mineral flavours.' },
      { name: 'Strandveld Pofadderbos Single Vineyard', region: 'Cape Agulhas', glass: 85, price: 305, notes: 'Passion fruit, grapefruit and blackcurrant. Creamy full palate with citrus, fynbos and oyster shell minerality, and a long finish.' },
      { name: 'Groote Post Seasalter Blanc Fumé', region: 'Darling Hills', price: 320, notes: 'Blackcurrant, stone fruit and green apple with hints of fynbos, kelp, sea breeze and a touch of oak.' },
      { name: 'Ataraxia', region: 'Hemel-en-Aarde Ridge', price: 265, notes: 'A cool-climate, unwooded white that celebrates elegance, vivacity and finesse.' },
      { name: 'Trizanne Signature Wines', region: 'Elim', price: 275, notes: 'Oyster shell, green apple and elderflower with subtle grapefruit. A beautiful salinity and pithiness, youthful and vibrant.' },
    ],
  },
  {
    id: 'chenin-blanc',
    title: 'Chenin Blanc',
    items: [
      { name: 'A.A. Badenhorst Family Wines Secateurs', region: 'Kalmoesfontein, Swartland', glass: 65, price: 195, notes: 'Flinty aromas with honey, orange blossom and white stone fruit.' },
      { name: 'Roodekrantz Somerkind', region: 'Groenekloof, Darling', price: 295, notes: 'Ripe yellow stone fruit and a smooth, creamy texture; a long finish of quince and baked apple.' },
      { name: "Rijk's Estate", region: 'Tulbagh', price: 250, notes: 'Lemon pepper, lime and grapefruit, with hints of ginger, white pear and gooseberries.' },
    ],
  },
  {
    id: 'chardonnay',
    title: 'Chardonnay',
    items: [
      { name: 'Ataraxia', region: 'Hemel-en-Aarde Ridge', price: 595, notes: 'A wooded white that mirrors its terroir: stony, clay-rich Bokkeveld Shale soils and a maritime climate.' },
      { name: 'Weltevrede Calcrete', region: 'Robertson', price: 285, notes: 'Crystalline minerality, wet stone and sea spray. A cool, mouth-watering tension with gunflint and lime.' },
      { name: 'Beeslaar', region: 'Stellenbosch / Simonsberg', price: 650, notes: 'Citrus and green apple; ripe pineapple against a mineral core, with a revitalising finish.' },
    ],
  },
  {
    id: 'rose',
    title: 'Rosé',
    items: [
      { name: 'M•A•N Family Wines “Hanekraai” Rosé', region: 'Agter-Paarl', glass: 65, price: 195, notes: 'Red berries on the nose, ample red fruit and freshness, a crisp and finely textured finish.' },
      { name: 'Doolhof XCLUSIV Rosé', region: 'Limietberg', price: 395, notes: 'Pale salmon, with cotton candy, rose petal and grapefruit; a chalky minerality with white chocolate and Turkish delight.' },
      { name: 'Lievland Liefkoos Rosé', region: 'Stellenbosch', price: 350, notes: 'A dry rosé of Syrah and Mourvèdre: pomegranate, redcurrant and cranberry. Tim Atkin MW: twice awarded best Rosé in South Africa.' },
    ],
  },
  {
    id: 'pinot-noir',
    title: 'Pinot Noir',
    items: [
      { name: 'Ataraxia', region: 'Hemel-en-Aarde Ridge', price: 595, notes: 'Red cherries, pomegranate, delicate forest floor and a hint of spice; sensual, with captivating depth.' },
      { name: 'Kara-Tara by Stark-Condé', region: 'Elgin', price: 385, notes: 'Lightly wooded, with classic strawberry and red cherry and a hint of spice. Firm, silky-smooth tannins.' },
    ],
  },
  {
    id: 'cabernet-sauvignon',
    title: 'Cabernet Sauvignon',
    items: [
      { name: 'M•A•N Family Wines “Ou Kalant”', region: 'Agter-Paarl', glass: 65, price: 195, notes: 'Dark cherries and chocolate, then cassis and red fruit; silky tannins and a long, smooth finish.' },
      { name: 'Boschkloof', region: 'Stellenbosch', price: 300, notes: 'Cedar spice and pencil shavings, ripe plums and integrated oak. Full flavoured, with firm structure.' },
    ],
  },
  {
    id: 'merlot',
    title: 'Merlot',
    items: [
      { name: 'Louisvale Estate', region: 'Stellenbosch, Devon Valley', price: 295, notes: 'Silky and smooth with ripe plum and mulberry, subtle oak and soft ripe tannins.' },
      { name: 'Groote Post Darling Hills', region: 'Darling', price: 365, notes: 'Trophy Wine Show ’25, Investec Trophy for Best Merlot. Cherry, plum and chocolate with hints of aniseed and cassis.' },
    ],
  },
  {
    id: 'shiraz',
    title: 'Shiraz / Syrah',
    items: [
      { name: 'Boschkloof Syrah', region: 'Stellenbosch', price: 460, notes: 'Oriental spices with violet and white pepper; a classic style with unmistakable Rhône flavours.' },
      { name: 'Wildeberg Wild House Shiraz', region: 'Franschhoek', glass: 75, price: 220, notes: 'Summer pudding, black cherry and vanilla; smoky notes, dark chocolate and star anise.' },
      { name: 'Zevenwacht Estate Syrah', region: 'Stellenbosch', price: 350, notes: 'Blackberry and plum opening to floral perfume, white pepper and herbs; velvety, with a fine peppery tannin.' },
      { name: 'Trizanne Signature Wines Syrah', region: 'Elim', price: 295, notes: 'Dark fruit with hints of earthiness, pepper and spice; medium-bodied and beautifully expressive.' },
      { name: 'Stark-Condé Stellenbosch Syrah', region: 'Stellenbosch', price: 505, notes: 'Dark fruit, liquorice, violet and white pepper; rich and broad with fine-grained tannins.' },
    ],
  },
  {
    id: 'pinotage',
    title: 'Pinotage',
    note: '“South Africa in a bottle”',
    items: [
      { name: 'M•A•N Family Wines “Bosstok”', region: 'Agter-Paarl', glass: 75, price: 220, notes: 'Mocha and roasted coffee beans, then juicy red berries, nutmeg and vanilla spice.' },
      { name: 'Lievland Bushvine', region: 'Stellenbosch', price: 350, notes: 'Cherry, raspberries and a hint of cedar and vanilla; ample red fruit and a savoury note.' },
      { name: "Rijk's Private Cellar", region: 'Tulbagh', price: 575, notes: 'Mulberry, ripe cherries and plum on a rich palate, with well-integrated oak and subtle wood spice.' },
    ],
  },
  {
    id: 'red-blends',
    title: 'Red Blends & Other Red Cultivars',
    items: [
      { name: 'Boschkloof Cabernet Sauvignon / Merlot', region: 'Stellenbosch', price: 245, notes: 'Full-bodied and oak matured: ripe plum, red fruits and a long finish of blackberries and spice.' },
      { name: 'Doolhof Single Vineyard Malbec', region: 'Limietberg', price: 415, notes: 'Violets, cocoa and black pepper; rich and round with blackberries and plum.' },
      { name: 'Roodekrantz 1954 Cinsault', region: 'Paarl', price: 320, notes: 'Red berries and delicate oak with sour cherry and herbaceous undertones; refined, with great depth.' },
      { name: 'Ataraxia Serenity', region: 'Hemel-en-Aarde Ridge', price: 430, notes: 'A wine with the confidence to “whisper” style rather than “shout” brashness.' },
      { name: 'Boschkloof Kottabos Grenache / Syrah', region: 'Stellenbosch', price: 360, notes: 'Red and black fruit, fynbos, white pepper and a little earth; fresh acidity and grippy tannins.' },
      { name: 'Ataraxia Marroquin Cinsault', region: 'Hemel-en-Aarde Ridge', price: 395, notes: 'An expression of Cinsault that causes one to pause and muse: the seductive, sleek side of the grape.' },
      { name: 'Boschkloof Conclusion', region: 'Stellenbosch', price: 760, notes: 'A rich, highly concentrated and incredibly elegant red blend with a long, memorable finish.' },
      { name: 'Luddite Saboteur Red', region: 'Bot River Valley', price: 450, notes: 'Spice-driven dark fruit with liquorice, cinnamon, plum and violets; a big mouth-feel and balanced tannins.' },
      { name: 'Roodekrantz Die Boskind Bordeaux Blend', region: 'Stellenbosch / Paarl', price: 280, notes: 'Savoury and intense: pencil shavings, dark hedgerow fruit, graphite and spice; elegant and fresh.' },
    ],
  },
];

export const corkage = 85;
