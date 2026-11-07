import { RestaurantCard } from "@/components/restaurant-card";
import { restaurants } from "@/data";

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <section className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Đói bụng rồi? Đặt món ngay.
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Chọn nhà hàng yêu thích, thêm món vào giỏ và giao tận cửa trong 20–30 phút.
        </p>
      </section>

      <section id="nha-hang" aria-labelledby="nha-hang-title" className="scroll-mt-20">
        <h2 id="nha-hang-title" className="mb-6 text-xl font-semibold tracking-tight">
          Nhà hàng quanh bạn
        </h2>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((restaurant, index) => (
            <li key={restaurant.id}>
              <RestaurantCard restaurant={restaurant} priority={index === 0} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
