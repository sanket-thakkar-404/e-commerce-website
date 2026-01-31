# Shop – E-Commerce Client (React + Vite)

Yeh document pure **client** project ka structure aur **har file ka kaam** detail mein batata hai. Samajhne ke liye folder-wise aur file-wise breakdown diya gaya hai.

---

## 📁 Project Structure (Overview)

```
client/
├── public/           # Static assets
├── src/
│   ├── components/   # Reusable UI components
│   ├── config/       # Static data (products, coupons, nav, etc.)
│   ├── content/     # Context providers (e.g. ProductContext)
│   ├── layout/      # App layout (Navbar + main area)
│   ├── pages/       # Route pages (screens)
│   └── store/       # Zustand stores (cart, wishlist, profile)
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Root / Config Files (Project ki setting)

### `package.json`
- **Kaam:** Dependencies aur scripts define karta hai.
- **Scripts:** `npm run dev` (Vite dev server), `npm run build` (production build), `npm run lint` (ESLint).
- **Important packages:** React 19, React Router, Zustand (state), Tailwind CSS, Remix Icon, Axios, Vite.

### `vite.config.js`
- **Kaam:** Vite build tool ki configuration (port, plugins, aliases, etc.).

### `index.html`
- **Kaam:** Single HTML entry. Andar `<div id="root">` hai jahan React app mount hoti hai.

### `eslint.config.js`
- **Kaam:** ESLint rules – code style aur lint errors ke liye.

### `.gitignore`
- **Kaam:** Git ko batata hai kaunsi files/folders ignore karni hai (e.g. `node_modules`, `dist`).

---

## 📂 src/ – Application Code

### `main.jsx`
- **Kaam:** App ka **entry point**.
- **Kya karta hai:**
  - `index.html` ke `#root` pe React app render karta hai.
  - **BrowserRouter** (React Router) wrap karta hai taaki routing kaam kare.
  - **ProductContext** provider wrap karta hai (abhi sirf children pass-through; future mein product-related context yahan add ho sakta hai).
  - `index.css` import karta hai (global styles).

### `App.jsx`
- **Kaam:** Saari **routes** yahan define hoti hain.
- **Structure:**
  - **AppLayout ke andar (Navbar + content):**
    - `/` → **Home**
    - `/categories` → **Categories** (nested: `/categories/men`, `/categories/women`, `/categories/leather-bags`)
    - `/cart` → **Cart**
    - `/checkout` → **Checkout**
    - `/order-confirmed` → **Order Confirmed**
    - `/track-order` → **Track Order**
    - `/wishlist` → **Wishlist**
    - `/profile` → **Profile**
    - `/personal-details` → **Personal Details**
    - `/addresses` → **Addresses**
    - `/coupons` → **Coupons**
    - `/product/:id` → **Product Details**
  - **Bina layout (auth):**
    - `/login` → **Login**
    - `/signup` → **Signup**
    - `/logout` → **Logout**
  - **404:** Koi bhi unknown path pe **Navigate to "/"** (home).

### `index.css`
- **Kaam:** Global CSS. Tailwind aur DaisyUI theme import karta hai.

---

## 📂 src/layout/ – Layout Components

### `AppLayout.jsx`
- **Kaam:** Saari main pages ka **common layout**.
- **Kya dikhata hai:** Top pe **Navbar**, neeche **main content** (jo route ke hisaab se change hota hai).
- **Outlet** se child route ka component yahan render hota hai (e.g. Home, Cart, Profile).
- Background aur text colors dark/light theme ke liye set hain.

---

## 📂 src/components/ – Reusable Components

### `Navbar.jsx`
- **Kaam:** Top navigation bar.
- **Links:** Home, Products (categories), Cart, My account (profile).
- **Mobile:** Chhote screen pe menu icon, click pe links dikhte hain.

### `ProductCard.jsx`
- **Kaam:** Ek product ka **card** (image, name, price, discount badge).
- **Features:**
  - Image/name pe click → **Product Details** (`/product/:id`).
  - **Heart** button → wishlist add/remove (useWishlistStore).
  - **+ (Add to cart)** button → cart mein add (useCartStore).

### `CollectionLayout.jsx`
- **Kaam:** **Sidebar + product grid** wala layout jo Home, Categories, Men’s, Women’s, Leather Bags sab use karte hain.
- **Sidebar:** Sort by (Popular, Price, Newest), category filters (New / All / Discounted), Filter by (Availability, Discount).
- **Categories page** ke liye extra **categoryFilters** prop (All, Men’s, Women’s, Leather Bags).
- **Props:** `products`, `title` (optional), `onAddToCart`, `categoryFilters` (optional).

### `MenCollection.jsx`
- **Kaam:** **Men’s Collection** page. `CollectionLayout` use karta hai, products = `menClothes` (config se), title = "Men's Collection".

### `WomenCollection.jsx`
- **Kaam:** **Women’s Collection** page. `CollectionLayout` + `womenClothes`, title = "Women's Collection".

### `LeatherBagCollection.jsx`
- **Kaam:** **Leather Bags** page. `CollectionLayout` + bags (`products`), title = "Leather Bags".

### `MenuItem.jsx`
- **Kaam:** Navbar / dropdown ke liye ek link item. `NavLink` use karta hai; `label`, `path`, `align`, `danger` (red style) props leta hai. (Ab Navbar simple links use karti hai, lekin dropdown/mobile ke liye reuse ho sakta hai.)

---

## 📂 src/config/ – Static Data & Config

### `productsData.js`
- **Kaam:** Saari **product lists** yahan defined hain.
- **Exports:**
  - **products** – Bags (8 items): id, name, price, image, discount, bgColor.
  - **menClothes** – Men’s clothing (8 items).
  - **womenClothes** – Women’s clothing (8 items).
  - **allCategoriesProducts** – products + menClothes + womenClothes, har item pe `category` (leather / men / women) add kiya gaya.
  - **getProductById(id)** – Kisi bhi category se product id se dhundh ke return karta hai (Product Details ke liye).

### `productDetailsData.js`
- **Kaam:** Product **detail** data (description, fabric, colors, sizes, rating, reviews).
- **getProductDetails(productId, category)** – Category ke hisaab se default details + kuch products ke overrides return karta hai. Reviews bhi category-wise milte hain.

### `navbarConfig.js`
- **Kaam:** Categories aur mobile menu links (label + path). Ab Navbar direct links use karti hai; yeh config dropdown ya future nav use ke liye rakha hai.
- **categories:** Men’s, Women’s, Leather Bags.
- **mobileMenu:** Track Order, Wishlist, Profile, Logout.

### `couponsConfig.js`
- **Kaam:** **Coupons page** ke liye saare **available coupons** ki list (display data).
- Har coupon: code, type, label, description, minOrder, discount, validity, terms. Cart store mein apply hone wale codes bhi yahi se align hain (FREEDEL, SAVE50, WELCOME100, FLAT20, BIG500).

---

## 📂 src/store/ – State Management (Zustand)

### `useCartStore.js`
- **Kaam:** **Cart** ka state: items, coupon, charges.
- **State:** items (productId, name, price, image, quantity), appliedCoupon, couponError.
- **Actions:** addToCart, removeFromCart, updateQuantity, applyCoupon, removeCoupon, clearCart.
- **Getters:** getSubtotal, getDeliveryFee (₹40 ya free above ₹500), getPlatformFee (₹20), getCouponDiscount, getTotal.
- **Coupons:** FREEDEL (free delivery), SAVE50, WELCOME100, FLAT20 (%), BIG500 – min order check + discount calculate.

### `useWishlistStore.js`
- **Kaam:** **Wishlist** items.
- **State:** items (productId, name, price, image, discount, bgColor).
- **Actions:** addToWishlist, removeFromWishlist, isInWishlist(productId), toggleWishlist(product).

### `useProfileStore.js`
- **Kaam:** **User profile** aur **addresses** (Zustand persist = localStorage).
- **State:** user (name, email, phone, joinDate), addresses (id, name, phone, addressLine1/2, city, state, pincode, isDefault).
- **Actions:** updateUser, addAddress, updateAddress, removeAddress, setDefaultAddress.
- **Storage key:** `shop-profile`.

### `useUserStore.js`
- **Kaam:** Abhi **empty** – future mein login/user auth state yahan rakh sakte ho.

---

## 📂 src/pages/ – Route Pages (Screens)

### `Home.jsx`
- **Kaam:** **Home page.** `CollectionLayout` use karta hai with **allCategoriesProducts** (sare products). Sort/filter same layout se.

### `Categories.jsx`
- **Kaam:** **Categories** route.
  - **`/categories`** pe: `CollectionLayout` + **allCategoriesProducts** + **categoryFilters** (All, Men’s, Women’s, Leather Bags).
  - **`/categories/men`**, `/women`, `/leather-bags` pe: **Outlet** se MenCollection / WomenCollection / LeatherBagCollection render hota hai.

### `ProductDetails.jsx`
- **Kaam:** **Single product** page (`/product/:id`).
- **Dikhta hai:** Image, name, price, rating, description, Product Details (fabric, color, size), Color/Size selectors, Quantity, **Add to Cart**, **Buy Now**, **Wishlist** button, Customer Reviews.
- **getProductById** + **getProductDetails** use karta hai. Buy Now = add to cart + redirect to checkout.

### `Cart.jsx`
- **Kaam:** **Cart** page.
- **Empty:** “Your cart is empty” + Continue Shopping.
- **With items:** List (image, name, price, quantity +/- , remove), **Order Summary** (subtotal, platform fee ₹20, delivery fee/free), **Apply Coupon** (order ≥ ₹500 pe), Total, **Proceed to Payment** → `/checkout`.

### `Checkout.jsx`
- **Kaam:** **Payment** page.
- **Payment methods:** Cash on Delivery, Card, Net Banking, UPI, Wallet (radio select).
- **Order summary** (items, subtotal, platform, delivery, coupon, total).
- **Place Order** → cart clear, order localStorage mein save, redirect **Order Confirmed**.

### `OrderConfirmed.jsx`
- **Kaam:** **Order success** page (animations ke saath).
- **Dikhta hai:** Animated checkmark, “Order Confirmed!”, Order ID, Total, **Continue Shopping**, **Track Order**.

### `TrackOrder.jsx`
- **Kaam:** **Track order** page.
- **Recent order** (localStorage se) + Order ID input + **Track**.
- **Timeline:** Order Placed → Confirmed → Shipped → Out for Delivery → Delivered (demo logic time-based).

### `WishList.jsx`
- **Kaam:** **Wishlist** page.
- **Empty:** Message + Continue Shopping.
- **With items:** Grid of cards – image, name, price, **Remove from wishlist**, **Add to Cart**.

### `Profile.jsx`
- **Kaam:** **User profile** page (animations).
- **Dikhta hai:** Avatar, name, email, member since, Edit Profile, **Stats** (Orders, Wishlist, Addresses count from stores), **Account menu** (Personal Information, Addresses, Orders, Wishlist, Coupons, Settings), **Log out**.

### `PersonalDetails.jsx`
- **Kaam:** **Personal info** edit – name, email, phone. Form submit pe **useProfileStore.updateUser**. Back to Profile, Save/Cancel.

### `Addresses.jsx`
- **Kaam:** **Saved addresses** – list, Add, Edit, Delete, Set default.
- **Modal** form: name/label, phone, address line 1 & 2, city, state, pincode. **useProfileStore** (addAddress, updateAddress, removeAddress, setDefaultAddress).

### `Coupons.jsx`
- **Kaam:** **Available coupons** list. Har coupon: discount text, validity, terms, **code** + **Copy** button. “Go to Cart” link. Data **couponsConfig** se.

### `Login.jsx`
- **Kaam:** **Login** page (abhi basic/placeholder). Route `/login`, layout ke bahar.

### `Signup.jsx`
- **Kaam:** **Signup** page (abhi basic/placeholder). Route `/signup`.

### `Logout.jsx`
- **Kaam:** **Logout** page. Route `/logout` – abhi simple “logout” screen; future mein auth clear + redirect.

---

## 📂 src/content/ – Context

### `ProductContext.jsx`
- **Kaam:** Abhi sirf **children** render karta hai (wrapper). Future mein product-related global state ya API context yahan add kar sakte ho. **main.jsx** isse App ko wrap karta hai.

---

## 🔗 Flow Summary (User journey)

1. **Home** → saare products, sort/filter, product pe click → **Product Details**.
2. **Product Details** → Add to Cart / Buy Now / Wishlist.
3. **Cart** → coupon apply (≥ ₹500), **Proceed to Payment** → **Checkout**.
4. **Checkout** → payment method choose → **Place Order** → **Order Confirmed**.
5. **Track Order** → Order ID se status timeline.
6. **Profile** → Personal Details, Addresses, Coupons, Wishlist, Orders (track) – sab yahan se open hote hain.

---

## 📌 Important Points

- **State:** Cart, Wishlist, Profile (with addresses) – sab **Zustand** stores se; Profile + addresses **localStorage** (persist) se save.
- **Routing:** **React Router**; layout **AppLayout** (Navbar + Outlet); auth pages (Login, Signup, Logout) layout ke bahar.
- **Styling:** **Tailwind CSS** + **DaisyUI**; icons **Remix Icon**.
- **Data:** Products, coupons, product details – abhi **config** files se (static). Baad mein backend API se replace kar sakte ho.

Is README ko follow karke tum har file ka role aur pure app ka flow ek hi jagah se samajh sakte ho.
