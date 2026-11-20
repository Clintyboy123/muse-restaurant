import Eyebrow from '../ui/Eyebrow';
import SplitHeading from '../ui/SplitHeading';
import Button from '../ui/Button';
import TextLink from '../ui/TextLink';
import Figure from '../media/Figure';
import Reveal from '../Reveal';
import { Diet, Price } from '../menu/MenuItem';
import { downloads, previewDishes, season } from '../../content/menu';

// V. The Menu. A page from the current seasonal menu: six dishes set like print, with prices and dietary marks,
// beside one photograph. Everything here is read from content/menu.js, so it changes with the menu.
export default function MenuPreview() {
  const dishes = previewDishes();
  return (
    <section className="section on-dark bg-olive text-ivory">
      <div className="shell grid grid-cols-1 gap-y-16 lg:grid-cols-12 lg:gap-x-8">
        <div className="flex flex-col items-center text-center lg:col-span-7 md:items-start md:text-left">
          <Eyebrow numeral="V" tone="dark">
            The menu · {season}
          </Eyebrow>
          <SplitHeading className="mt-6 text-h2 display" parts={[{ text: 'From the current' }, { text: 'seasonal menu.', em: true }]} />

          <Reveal as="ul" group gap={0.08} className="mt-band w-full divide-y divide-line-dark border-y border-line-dark">
            {dishes.map((d) => (
              <Reveal.Item as="li" key={d.name} className="grid grid-cols-1 gap-2 py-6 text-center md:grid-cols-[7rem_1fr_auto] md:gap-6 md:text-left">
                <span className="label pt-2 text-bronze-light">{d.course}</span>
                <div>
                  <h3 className="font-display text-h4 font-normal">
                    {d.name}
                    <Diet code={d.diet} tone="dark" />
                  </h3>
                  {d.description && <p className="mx-auto mt-1 max-w-[44ch] text-small text-mist md:mx-0">{d.description}</p>}
                </div>
                <Price value={d.price} tone="dark" />
              </Reveal.Item>
            ))}
          </Reveal>

          <Reveal className="mt-10 flex flex-col items-center gap-6 sm:flex-row md:items-center">
            <Button to="/the-restaurant" variant="ivory">
              View full menu
            </Button>
            <TextLink href={downloads[0].href} className="text-ivory" download>
              Download the menu (PDF)
            </TextLink>
          </Reveal>
          <p className="mt-6 text-[0.75rem] text-mist">
            Prices in Rand. <abbr title="Vegetarian" className="no-underline">V</abbr> vegetarian · <abbr title="Vegan" className="no-underline">VG</abbr> vegan.
          </p>
        </div>

        <div className="md:max-w-[26rem] lg:max-w-none lg:col-span-4 lg:col-start-9 lg:pt-24">
          <Figure id="plate-dark" ratio="3/4" speed={56} sizes="(min-width: 768px) 30vw, 100vw" tone="dark" label="No. 11" caption="Amber on black" />
        </div>
      </div>
    </section>
  );
}
