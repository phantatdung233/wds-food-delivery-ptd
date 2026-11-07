# Glossary

Food delivery frontend — the vocabulary shared by the Home catalogue, the cart, and
checkout. Use these terms in issue titles, test names, and code identifiers.

## Language

**Restaurant**:
A merchant that sells MenuItems and appears as a card on the Home page.
_Avoid_: Shop, store, vendor

**MenuItem**:
A single dish belonging to one Restaurant, with a price and an image.
_Avoid_: Dish, product, food

**Cart**:
The collection of CartItems a customer is assembling into an Order.
_Avoid_: Basket, bag

**CartItem**:
One MenuItem held in the Cart, with a quantity.
_Avoid_: Line item, order item

**Order**:
A Cart submitted with delivery details and an identifier.
_Avoid_: Purchase, transaction

**Order id**:
The internal identifier of an Order. Matches the backend primary key; never shown to
the customer.
_Avoid_: Order number

**Order code**:
The customer-facing string identifying an Order on the confirmation screen, e.g.
`ORD-7F3K2X`.
_Avoid_: Order number, tracking number

## UI steps (not domain entities)

**Checkout**:
The page and step where a customer supplies delivery details and confirms an Order.
_Avoid_: Treating "checkout" as an entity or a saved record
