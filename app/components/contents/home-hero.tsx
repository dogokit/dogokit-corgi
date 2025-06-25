import { CodeIcon, StarIcon } from "lucide-react";
import { Anchor } from "@/components/shared/anchor";
import { ButtonAnchor } from "@/components/shared/button-anchor";
import { Flex } from "@/components/shared/flex";
import { ContentIntro } from "@/components/ui/content";

export function HomeHero({ hello }: { hello: string }) {
  return (
    <section className="container max-w-xl">
      <article className="prose-config">
        <ContentIntro>
          <p>{hello}</p>
          <p>
            Welcome to{" "}
            <Anchor href="https://github.com/dogokit/dogokit-corgi">
              Dogokit Corgi
            </Anchor>
            . A full stack web app kit with React Router v7 Framework, tRPC,
            Better Auth, Prisma, Tailwind CSS, shadcn/ui, and more.
          </p>
        </ContentIntro>

        <p>
          This template is one of implementation details of{" "}
          <Anchor href="https://github.com/dogokit/dogokit-akita">
            Dogokit Akita
          </Anchor>
          . Designed to help you quickly get started with your own web
          application. With a lot of components, configuration, and boilerplate
          code already set up. Feel free to use, modify, and remove any parts
          you don't need.
        </p>
      </article>

      <Flex>
        <ButtonAnchor href="https://github.com/dogokit/dogokit-corgi" size="lg">
          <StarIcon />
          <span>Star on GitHub</span>
        </ButtonAnchor>
        <ButtonAnchor
          href="https://github.com/new?template_name=dogokit-corgi&template_owner=dogokit"
          size="lg"
        >
          <CodeIcon />
          <span>Use Template</span>
        </ButtonAnchor>
      </Flex>
    </section>
  );
}
