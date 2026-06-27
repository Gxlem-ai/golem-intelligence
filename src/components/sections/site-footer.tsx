import { footer } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { GolemLogo } from "@/components/ui/golem-logo";

export function SiteFooter() {
  return (
    <footer className="bg-spruce py-10 text-[#8AA294]">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-5 text-[13.5px]">
          <div className="flex items-center gap-2.5">
            <span className="text-mint">
              <GolemLogo size={20} />
            </span>
            <span>{footer.left}</span>
          </div>
          <div className="font-mono text-xs">{footer.right}</div>
        </div>
      </Container>
    </footer>
  );
}
