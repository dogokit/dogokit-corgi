import { ScrollAreaHorizontalDemo } from "@/components/scroll-area/horizontal-demo";
import { ScrollAreaVerticalDemo } from "@/components/scroll-area/vertical-demo";

export default function DemosScrollAreaRoute() {
  return (
    <div className="space-y-8">
      <h1>Demos: Scroll Area Enhanced</h1>

      <section className="space-y-4">
        <h2>Vertical</h2>
        <ScrollAreaVerticalDemo />
      </section>

      <section className="space-y-4">
        <h2>Horizontal</h2>
        <ScrollAreaHorizontalDemo />
      </section>
    </div>
  );
}
