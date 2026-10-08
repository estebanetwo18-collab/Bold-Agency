import { intro } from "@/lib/chika/content";
import { experienceById } from "@/lib/chika/experiences";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";

export function Intro() {
  return (
    <section id="que-necesita" className="ck-intro ck-tone-ivory" aria-labelledby="ck-intro-h">
      <div className="ck-wrap">
        <Reveal className="ck-intro__head">
          <h2 id="ck-intro-h" className="ck-h2">{intro.title}</h2>
          <p className="ck-lede">{intro.subtitle}</p>
        </Reveal>

        <ol className="ck-moments">
          {intro.moments.map((m, i) => (
            <Reveal as="li" key={m.n} className="ck-moment" delay={i * 70}>
              <div className="ck-moment__photo">
                <Photo photo={m.photo} sizes="(min-width: 900px) 22vw, 30vw" />
              </div>
              <span className="ck-moment__n" aria-hidden="true">{m.n}</span>
              <h3 className="ck-moment__t">{m.title}</h3>
              <p className="ck-moment__p">{m.text}</p>
              <ul className="ck-moment__links">
                {m.links.map((id) => (
                  <li key={id}>
                    <a href={`#${id}`}>{experienceById(id).name}</a>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>

        <Reveal className="ck-texture">
          <p className="ck-label">{intro.textureLabel}</p>
          <ul>
            {intro.textures.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`}>
                  <span className="ck-texture__name">{experienceById(t.id).name}</span>
                  <span className="ck-texture__for">{t.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <p className="ck-nudge">{intro.nudge}</p>
      </div>
    </section>
  );
}
