import { Link } from "react-router-dom";
import { useProfileStore } from "../store/useProfileStore";

const PROFILE_STYLES = `
  @keyframes profileFadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes profileScaleIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes profilePulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.3); }
    50% { box-shadow: 0 0 0 12px rgba(34, 197, 94, 0); }
  }
  .profile-avatar-wrap {
    animation: profileScaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
  .profile-avatar-ring {
    animation: profilePulse 2s ease-in-out infinite 0.5s;
  }
  .profile-title {
    animation: profileFadeIn 0.5s ease-out 0.2s both;
  }
  .profile-subtitle {
    animation: profileFadeIn 0.5s ease-out 0.35s both;
  }
  .profile-stat {
    animation: profileFadeIn 0.5s ease-out both;
  }
  .profile-card {
    animation: profileFadeIn 0.5s ease-out both;
  }
`;

const menuItems = [
  { icon: "ri-user-line", label: "Personal Information", path: "/personal-details", desc: "Name, email, phone" },
  { icon: "ri-map-pin-line", label: "Addresses", path: "/addresses", desc: "Delivery addresses" },
  { icon: "ri-shopping-bag-line", label: "Orders", path: "/track-order", desc: "Track & history" },
  { icon: "ri-heart-line", label: "Wishlist", path: "/wishlist", desc: "Saved items" },
  { icon: "ri-coupon-3-line", label: "Coupons", path: "/coupons", desc: "Offers & discounts" },
  { icon: "ri-settings-3-line", label: "Settings", path: "#", desc: "Privacy & notifications" },
];

const Profile = () => {
  const user = useProfileStore((s) => s.user);
  const addresses = useProfileStore((s) => s.addresses);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 pb-12">
      <style>{PROFILE_STYLES}</style>

      {/* Header with avatar */}
      <header className="text-center mb-8 md:mb-10">
        <div className="profile-avatar-wrap inline-block mb-4">
          <div className="profile-avatar-ring relative rounded-full p-1.5 bg-gradient-to-br from-green-400 to-emerald-600">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 ring-4 ring-white dark:ring-gray-900">
              <img
                src="https://i.pravatar.cc/300"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <h1 className="profile-title text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
          {user.name}
        </h1>
        <p className="profile-subtitle text-gray-500 dark:text-gray-400 mt-1">
          {user.email}
        </p>
        <p className="profile-subtitle text-sm text-gray-400 dark:text-gray-500 mt-0.5">
          Member since {user.joinDate}
        </p>
        <button
          type="button"
          className="profile-subtitle mt-4 px-5 py-2.5 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 font-medium hover:border-gray-500 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all"
        >
          Edit Profile
        </button>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-4 mb-8">
        {[
          { value: "12", label: "Orders", icon: "ri-shopping-bag-line", delay: "0.45s" },
          { value: "5", label: "Wishlist", icon: "ri-heart-line", delay: "0.55s" },
          { value: String(addresses?.length ?? 0), label: "Addresses", icon: "ri-map-pin-line", delay: "0.65s" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="profile-stat rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 text-center shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all"
            style={{ animationDelay: stat.delay }}
          >
            <i className={`${stat.icon} text-2xl text-green-500 dark:text-green-400 mb-2 block`}></i>
            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Menu cards */}
      <section className="space-y-3">
        <h2 className="profile-card text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 px-1" style={{ animationDelay: "0.7s" }}>
          Account
        </h2>
        {menuItems.map((item, i) => (
          <Link
            key={item.label}
            to={item.path}
            className="profile-card flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md transition-all group"
            style={{ animationDelay: `${0.75 + i * 0.06}s` }}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-green-100 dark:group-hover:bg-green-900/20 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
              <i className={`${item.icon} text-xl`}></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                {item.label}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
            </div>
            <i className="ri-arrow-right-s-line text-xl text-gray-400 group-hover:text-green-500 group-hover:translate-x-0.5 transition-all"></i>
          </Link>
        ))}
      </section>

      {/* Logout */}
      <div className="profile-card mt-8" style={{ animationDelay: "1.15s" }}>
        <Link
          to="/logout"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl border-2 border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <i className="ri-logout-box-r-line text-xl"></i>
          Log out
        </Link>
      </div>
    </div>
  );
};

export default Profile;
