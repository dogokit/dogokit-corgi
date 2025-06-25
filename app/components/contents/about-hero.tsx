import { Anchor } from "@/components/shared/anchor";
import { ContentHeading, ContentIntro } from "@/components/ui/content";

export function AboutHero() {
  return (
    <section className="container max-w-xl">
      <ContentHeading>About</ContentHeading>

      <article className="prose-config">
        <ContentIntro>
          <p>
            Dogokit Corgi is a React Router v7 Framework template integrating
            tRPC, Prisma, Better Auth, Tailwind CSS, and shadcn/ui.
          </p>
        </ContentIntro>
        <p>
          This template is designed for short setup time and long-term
          scalability. It's the implementation details of{" "}
          <Anchor href="https://github.com/dogokit/dogokit-akita">
            Dogokit Akita
          </Anchor>
          , a full stack app development guideline. Codename "Corgi" is inspired
          by the Welsh Corgi breed. Created by{" "}
          <Anchor href="https://github.com/mhaidarhanif">M Haidar Hanif</Anchor>
          .
        </p>

        <h2>References</h2>
        <ul>
          <li>
            <Anchor href="https://ui.shadcn.com">shadcn/ui</Anchor>
          </li>
          <li>
            <Anchor href="https://originui.com">OriginUI</Anchor>
          </li>
          <li>
            <Anchor href="https://kibo-ui.com">Kibo UI</Anchor>
          </li>
          <li>
            <Anchor href="https://shadcn-registries.vercel.app">
              shadcn Registries
            </Anchor>
          </li>
          <li>
            <Anchor href="https://registry.directory">
              registry.directory
            </Anchor>
          </li>
          <li>
            <Anchor href="https://demo.better-auth.com">
              Better Auth Demo
            </Anchor>
          </li>
          <li>
            <Anchor href="https://github.com/ayoubphy/react-router-trpc-prisma-better-auth">
              <code>ayoubphy/react-router-trpc-prisma-better-auth</code>
            </Anchor>
          </li>
        </ul>

        <h2>Relations</h2>
        <ul>
          <li>
            <Anchor href="https://github.com/allnimal">🐾Allnimal</Anchor>
          </li>
          <li>
            <Anchor href="https://github.com/bearmentor">🐻Bearmentor</Anchor>
          </li>
          <li>
            <Anchor href="https://github.com/catamyst">🐱Catamyst</Anchor>
          </li>
          <li>
            <Anchor href="https://github.com/dogokit">🐶Dogokit</Anchor>
          </li>
          <li>
            <Anchor href="https://github.com/allnimal">🐘Elevanty</Anchor>
          </li>
        </ul>
      </article>
    </section>
  );
}
