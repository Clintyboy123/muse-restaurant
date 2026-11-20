"""
Photo pipeline for the Muse website.

Every photograph is the restaurant's own (downloaded from muserestaurant.co.za, originals kept in
assets-source/photos). This script exports each one as WebP at up to two widths (-800 and -1600, never
upscaled), and writes frontend/src/content/photos.json with its size, alt text, gallery category and an
average "tone" colour used as the placeholder while the image loads.

To add or replace a photo: put the original in assets-source/photos, add or edit its line in PHOTOS below,
then run:   python3 tools/photos.py
"""
import json
import os

from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets-source", "photos")
OUT = os.path.join(ROOT, "frontend", "src", "assets", "photos")
MANIFEST = os.path.join(ROOT, "frontend", "src", "content", "photos.json")

# key: (source file, alt text, gallery category or None)
# Categories: food, restaurant, chefs, events, kitchen ("Behind the scenes"). None = used on pages only.
PHOTOS = {
    # Contemporary plates on dark surfaces (2026 photography): the lead imagery.
    "hero": ("2026_10_Muse-Restaurant-food-004.jpg", "Thinly sliced seared beef with capers, vegetable crisps and edible flowers on a stoneware plate", "food"),
    "palette": ("2026_10_Muse-Restaurant-food-005.jpg", "Six plated dishes arranged in a circle on polished concrete, seen from above", "food"),
    "palette-wide": ("2026_10_Muse-Restaurant-food-006.jpg", "Seven plates of food arranged on a concrete surface, seen from above", "food"),
    "plate-moon": ("2026_10_Muse-Restaurant-food-001.jpg", "A dessert with berries, cream and violet flowers on a half-moon plate", "food"),
    "plate-dark": ("2026_10_Muse-Restaurant-food-002.jpg", "A glazed main course with orange purée dots on a black plate", "food"),
    "plate-tin": ("2026_10_Muse-Restaurant-food-003.jpg", "A starter served in a small tin on a slice of timber", "food"),
    "plate-green": ("2026_10_Muse-Restaurant-food-007.jpg", "Crumbed croquettes, chips in a paper cone and garnishes on a green plate", "food"),
    "table-evening": ("2026_10_Muse-Restaurant-food-008.jpg", "A guest at an evening table with a plated starter and a cocktail", "restaurant"),
    "plate-colour": ("2026_10_Muse-Restaurant-food-009.jpg", "A colourful plated dish with flowers and herbs on a black plate", "food"),
    "plate-carpaccio": ("2026_10_Muse-Restaurant-food-010.jpg", "Carpaccio scattered with flowers, herbs and shavings on a black plate", "food"),
    # Earlier plates on white timber.
    "fillet": ("2026_08_Muse-14.jpg", "A tall cut of beef with pork belly, baby marrow and a swipe of sauce", "food"),
    "carpaccio-white": ("2026_08_Muse-15.jpg", "Beef carpaccio with a red tuile on a white plate", "food"),
    "tian": ("2026_08_Muse-16.jpg", "A potato tian topped with greens and crisp crackling", "food"),
    "pork-belly": ("2026_08_Muse-18.jpg", "Glazed pork belly with crackling, butternut and roasted squash", "food"),
    "bone-marrow": ("2026_08_Muse-19.jpg", "Roasted bone marrow with bread and pulled beef in a white bowl", "food"),
    "dessert-sphere": ("2026_08_Muse-20.jpg", "A dark chocolate dessert with ice cream and a spun sugar garnish", "food"),
    "dessert-ice": ("2026_08_Muse-21.jpg", "An ice cream lolly with nougat and cream on a dark slate", "food"),
    "dessert-black": ("2026_08_muse-restaurant-port-elizabeth-7.jpg", "A plated dessert with meringue and citrus on a black dish", "food"),
    # The restaurant.
    "interior": ("2026_09_Muse-Restaurant-2026-09-09-4.40.jpg", "The Muse dining room: brick arches, the Muse sign, pendant lights and set tables", "restaurant"),
    "exterior": ("2026_10_Muse-Fine-Dining-Restaurant-001.jpg", "Muse Restaurant on Main Road, Walmer, lit up at night", "restaurant"),
    "sign": ("2026_10_Muse-Fine-Dining-Restaurant-002.jpg", "The illuminated Muse sign at the entrance at night", "restaurant"),
    "date-night": ("2026_10_muse-restaurant-001.jpg", "Wine, a menu and a starter on a dinner table", "restaurant"),
    "table-set": ("2026_10_muse-restaurant-002.jpg", "A long set table with glassware along the dining room", "restaurant"),
    "bread-stones": ("2026_10_muse-restaurant-003.jpg", "Bread rolls served among river stones, with white and rosé wine", "food"),
    "wine-table": ("2026_10_muse-restaurant-004.jpg", "Bottles of wine and glasses on a wooden table against brick", "restaurant"),
    "wine-wall": ("2026_10_muse-restaurant-005.jpg", "The wine wall at Muse", "restaurant"),
    "art-wall": ("2026_08_Mu-7.jpg", "Artworks hanging on the brick wall of the restaurant", "restaurant"),
    "coffee": ("2026_08_muse-restaurant-port-elizabeth-12.jpg", "Coffee, a slice of pastry and Muse blend coffee bags", "restaurant"),
    "cakes": ("2026_08_muse-restaurant-port-elizabeth-06.jpg", "Layered cakes on cake stands", "events"),
    # Chefs and the kitchen.
    "chef-plating": ("2026_08_Mu-4.jpg", "A chef plating a row of dishes on the pass", "chefs"),
    "chef-fish": ("2026_08_Mu-12.jpg", "A chef in the Muse kitchen holding a fresh fish", "chefs"),
    "chefs-team": ("2026_08_Mu-3.jpg", "The kitchen team smiling in the Muse kitchen", "chefs"),
    "chefs-prep": ("2026_08_Muse-13.jpg", "Two chefs at work with a stand mixer in the kitchen", "chefs"),
    "chefs-catch": ("2026_08_Muse-22.jpg", "Two chefs holding up a whole fish in the kitchen", "chefs"),
    "chef-demo": ("2026_08_Muse-Aug-2017-2.jpg", "A chef in Muse whites talking at a cooking demonstration", "chefs"),
    "pasta": ("2026_08_Mu-8.jpg", "Hand-cut fresh pasta on a floured board", "kitchen"),
    "smoke": ("2026_08_Mu-9.jpg", "Lifting a glass cloche of smoke off a plate", "kitchen"),
    "pastry-work": ("2026_08_Mu-6.jpg", "Dessert components laid out on baking paper", "kitchen"),
    "knives": ("2026_08_Mu-13.jpg", "A chef's knife roll", "kitchen"),
    "filming": ("2026_08_Mu-1.jpg", "Plating a dish for a camera crew in the kitchen", "kitchen"),
    "yellowtail": ("2026_08_Mu-2.jpg", "A whole fish ready for filleting on a board", "kitchen"),
    "samphire": ("2026_08_Mu-11.jpg", "Wild samphire growing in a coastal salt marsh", "kitchen"),
    # Events and catering.
    "high-tea": ("2026_08_Muse-Aug-2017-101.jpg", "A styled high tea table with cakes, flowers and pastries", "events"),
    "high-tea-flowers": ("2026_08_Muse-Aug-2017-111.jpg", "Pastries and flowers on a white cake stand", "events"),
    "bubbles": ("2026_08_Muse-Aug-2017-121.jpg", "Pouring rosé bubbles beside an ice bucket of strawberries", "events"),
    "wedding-cake": ("2026_08_Muse-Aug-2017-1.jpg", "A tiered white wedding cake with lace and brooch details", "events"),
    "doughnut-tower": ("2026_08_Muse-Aug-2017-61.jpg", "A tower of doughnuts decorated with flowers", "events"),
    "naked-cake": ("2026_08_Muse-Aug-2017-71.jpg", "A chocolate cake crowned with roses at a celebration table", "events"),
    "slices": ("2026_08_Muse-Aug-2017-81.jpg", "Custard slices on a wooden board with pink flowers", "events"),
    "champagne": ("2026_08_Muse-Aug-2017-91.jpg", "Bottles of rosé on ice in a silver bucket", "events"),
    "canape-chips": ("2026_08_Muse-Aug-2017-3.jpg", "Canapés of chips with aioli in paper boats", "events"),
    "canape-ribs": ("2026_08_Muse-Aug-2017-4.jpg", "Sticky rib canapés with fries in paper boats", "events"),
    "canape-croquette": ("2026_08_Muse-Aug-2017-5.jpg", "Croquette canapés on cocktail sticks", "events"),
    "dessert-table": ("2026_08_Catering-1.jpg", "A dessert table under the Muse sign", "events"),
    "buffet-long": ("2026_08_Catering-21.jpg", "A long catered dessert buffet in a glass-walled venue", "events"),
    "tartlets": ("2026_08_Catering-29.jpg", "Lemon meringue tartlets with a bouquet of flowers", "events"),
    "panna-cotta": ("2026_08_Catering-30.jpg", "Panna cotta with berry jelly in glasses", "events"),
    "macarons": ("2026_08_Catering-25.jpg", "A tiered stand of colourful macarons", "events"),
    "macarons-painted": ("2026_08_Catering-27.jpg", "Hand-painted macarons on a glass platter", "events"),
    "baby-shower": ("2026_08_Catering-31.jpg", "A baby shower dessert table with balloons and treats", "events"),
    "celebration-table": ("2026_08_Catering-28.jpg", "A dessert table with cheesecakes and yellow flowers", "events"),
    "drip-cake": ("2026_08_Catering-20.jpg", "A pink drip cake topped with meringues and chocolate", "events"),
    "doughnuts": ("2026_08_Catering-23.jpg", "A glass stand piled with glazed doughnuts", "events"),
    "cupcake-roses": ("2026_08_Catering-22.jpg", "Cupcakes piped as red and yellow roses", "events"),
    "wedding-cake-roses": ("2026_08_Catering-6.jpg", "A three-tier buttercream cake with fresh roses", "events"),
}

WIDTHS = (800, 1600)


def tone(img):
    small = img.resize((1, 1), Image.Resampling.BOX)
    r, g, b = small.getpixel((0, 0))[:3]
    return f"#{r:02x}{g:02x}{b:02x}"


def main():
    os.makedirs(OUT, exist_ok=True)
    manifest = {}
    for key, (filename, alt, category) in PHOTOS.items():
        img = ImageOps.exif_transpose(Image.open(os.path.join(SRC, filename))).convert("RGB")
        w, h = img.size
        for target in WIDTHS:
            width = min(target, w)
            out = os.path.join(OUT, f"{key}-{target}.webp")
            if target == WIDTHS[-1] and w <= WIDTHS[0]:
                # Small source: one size is enough; the -1600 slot reuses the -800 file.
                if os.path.exists(out):
                    os.remove(out)
                continue
            resized = img if width == w else img.resize((width, round(h * width / w)), Image.Resampling.LANCZOS)
            resized.save(out, "WEBP", quality=82, method=6)
        manifest[key] = {
            "file": key,
            "width": w,
            "height": h,
            "alt": alt,
            "category": category,
            "tone": tone(img),
            "large": w > WIDTHS[0],
        }
    with open(MANIFEST, "w") as f:
        json.dump(manifest, f, indent=2)
    print(f"{len(manifest)} photos exported")


if __name__ == "__main__":
    main()
