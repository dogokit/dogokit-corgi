import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export interface Artwork {
  artistName: string;
  imageUrl: string;
}

const works: Artwork[] = [
  {
    artistName: "Ornella Binni",
    imageUrl:
      "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artistName: "Tom Byrom",
    imageUrl:
      "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artistName: "Vladimir Malyavko",
    imageUrl:
      "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
];

export function ScrollAreaHorizontalDemo() {
  return (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border bg-background">
      <div className="flex w-max space-x-4 p-4">
        {works.map((artwork) => (
          <figure className="shrink-0" key={artwork.artistName}>
            <div className="h-52 overflow-hidden rounded-md">
              <img
                alt={`by ${artwork.artistName}`}
                className="aspect-[3/4] h-full w-full object-cover"
                src={artwork.imageUrl}
              />
            </div>
            <figcaption className="pt-2 text-muted-foreground text-xs">
              Photo by{" "}
              <span className="font-semibold text-foreground">
                {artwork.artistName}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
