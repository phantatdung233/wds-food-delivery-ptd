import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock3, Star } from "lucide-react";

import { MenuItemCard } from "@/components/menu-item-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getMenuItemsByRestaurant, getRestaurant } from "@/data";
import { formatPrice } from "@/lib/format";

export default async function RestaurantPage({ params }: PageProps<"/restaurant/[id]">) {
  const { id } = await params;
  const restaurant = getRestaurant(id);

  if (!restaurant) {
    notFound();
  }

  const items = getMenuItemsByRestaurant(restaurant.id);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <Button variant="ghost" size="sm" className="mb-4 -ml-2" render={<Link href="/" />}>
        ← Tất cả nhà hàng
      </Button>

      <section className="overflow-hidden rounded-xl border">
        <div className="relative aspect-3/1 h-40 sm:h-52 w-full bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={restaurant.imageUrl}
            alt={`Ảnh nhà hàng ${restaurant.name}`}
            className="size-full object-cover"
            fetchPriority="high"
          />
        </div>
        <div className="p-5 sm:p-6">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {restaurant.name}
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">{restaurant.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <Star className="size-3 fill-current" aria-hidden />
              {restaurant.rating.toFixed(1)}
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Clock3 className="size-3" aria-hidden />
              {restaurant.deliveryMinutes} phút
            </Badge>
            <Badge variant="outline">Phí giao {formatPrice(restaurant.deliveryFee)}</Badge>
          </div>
        </div>
      </section>

      <Separator className="my-8" />

      <section aria-labelledby="thuc-don-title">
        <h2 id="thuc-don-title" className="mb-6 text-xl font-semibold tracking-tight">
          Thực đơn ({items.length} món)
        </h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.id}>
              <MenuItemCard item={item} restaurantName={restaurant.name} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
