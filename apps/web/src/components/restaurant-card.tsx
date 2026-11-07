import Link from "next/link";
import { Clock3, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Restaurant } from "@/data";
import { formatPrice } from "@/lib/format";

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Card className="flex flex-col overflow-hidden pt-0">
      <div className="relative aspect-16/9 w-full overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={restaurant.imageUrl}
          alt={`Ảnh nhà hàng ${restaurant.name}`}
          className="size-full object-cover"
          loading="lazy"
        />
        <Badge className="absolute top-3 left-3 gap-1" variant="secondary">
          <Star className="size-3 fill-current" aria-hidden />
          {restaurant.rating.toFixed(1)}
        </Badge>
      </div>

      <CardHeader>
        <CardTitle className="text-base">{restaurant.name}</CardTitle>
        <p className="line-clamp-2 text-sm text-muted-foreground">{restaurant.description}</p>
      </CardHeader>

      <CardContent className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Clock3 className="size-4" aria-hidden />
          {restaurant.deliveryMinutes} phút
        </span>
        <span aria-hidden>·</span>
        <span>Phí giao {formatPrice(restaurant.deliveryFee)}</span>
      </CardContent>

      <CardFooter>
        <Button className="w-full" render={<Link href={`/restaurant/${restaurant.id}`} />}>
          Xem thực đơn
        </Button>
      </CardFooter>
    </Card>
  );
}
