import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MenuItem } from "@/data";
import { formatPrice } from "@/lib/format";

export function MenuItemCard({
  item,
  restaurantName,
}: {
  item: MenuItem;
  restaurantName: string;
}) {
  return (
    <Card className="h-full flex-row gap-0 overflow-hidden py-0">
      <div className="aspect-square w-28 shrink-0 bg-muted sm:w-32">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.imageUrl}
          alt={`Ảnh ${item.name} của ${restaurantName}`}
          className="size-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <CardHeader className="gap-1">
          <CardTitle className="text-sm leading-snug">{item.name}</CardTitle>
          <p className="line-clamp-2 text-xs text-muted-foreground">{item.description}</p>
        </CardHeader>
        <CardContent className="mt-auto">
          <p className="text-sm font-semibold">{formatPrice(item.price)}</p>
        </CardContent>
      </div>
    </Card>
  );
}
