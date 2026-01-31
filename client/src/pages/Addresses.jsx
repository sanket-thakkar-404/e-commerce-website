import { useState } from "react";
import { Link } from "react-router-dom";
import { useProfileStore } from "../store/useProfileStore";

const emptyAddress = {
  name: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
};

const Addresses = ({
  mode = "profile", // "profile" | "checkout"
  onSelectAddress,
}) => {
  const {
    addresses,
    addAddress,
    updateAddress,
    removeAddress,
    setDefaultAddress,
  } = useProfileStore();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyAddress);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyAddress);
    setShowForm(true);
  };

  const openEdit = (addr) => {
    setEditingId(addr.id);
    setForm({
      name: addr.name,
      phone: addr.phone,
      addressLine1: addr.addressLine1,
      addressLine2: addr.addressLine2 || "",
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyAddress);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editingId ? updateAddress(editingId, form) : addAddress(form);
    closeForm();
  };

  const handleRemove = (id) => {
    if (window.confirm("Remove this address?")) removeAddress(id);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8">
      {/* Back link only for profile */}
      {mode === "profile" && (
        <Link
          to="/profile"
          className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 mb-6"
        >
          <i className="ri-arrow-left-line"></i> Back to Profile
        </Link>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            {mode === "profile" ? "Saved Addresses" : "Select Delivery Address"}
          </h1>
          <p className="text-gray-500 mt-1">
            {mode === "profile"
              ? "Manage your delivery addresses."
              : "Choose where you want your order delivered."}
          </p>
        </div>

        {mode === "profile" && (
          <button
            onClick={openAdd}
            className="px-4 py-2.5 rounded-xl bg-gray-900 text-white font-medium flex items-center gap-2"
          >
            <i className="ri-add-line"></i> Add Address
          </button>
        )}
      </div>

      {/* Address list */}
      <div className="space-y-4 mb-8">
        {addresses.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed rounded-xl text-gray-500">
            No addresses saved.
          </div>
        ) : (
          addresses.map((addr) => (
            <div
              key={addr.id}
              onClick={() => mode === "checkout" && onSelectAddress?.(addr)}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition
                ${addr.isDefault ? "border-green-500" : "border-gray-200"}
                ${mode === "checkout" ? "hover:border-gray-900" : ""}
              `}
            >
              <div className="flex justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{addr.name}</span>
                    {addr.isDefault && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{addr.phone}</p>
                  <p className="mt-2">
                    {addr.addressLine1}
                    {addr.addressLine2 && `, ${addr.addressLine2}`}
                    <br />
                    {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                </div>

                {/* Actions only in profile */}
                {mode === "profile" && (
                  <div className="flex items-center gap-2">
                    {!addr.isDefault && (
                      <button
                        onClick={() => setDefaultAddress(addr.id)}
                        className="text-sm text-green-600"
                      >
                        Set default
                      </button>
                    )}
                    <button onClick={() => openEdit(addr)}>
                      <i className="ri-edit-line"></i>
                    </button>
                    <button onClick={() => handleRemove(addr.id)}>
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Modal – PROFILE ONLY */}
      {mode === "profile" && showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-black text-white rounded-2xl max-w-lg w-full p-6 shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">
                {editingId ? "Edit Address" : "Add New Address"}
              </h2>
              <button
                onClick={closeForm}
                className="text-white  hover:text-gray-700"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-white">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Name / Label
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Home, Office"
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium  mb-1">
                  Phone Number
                </label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="9876543210"
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900"
                  required
                />
              </div>

              {/* Address line 1 */}
              <div>
                <label className="block text-sm font-medium  mb-1">
                  Address Line 1
                </label>
                <input
                  value={form.addressLine1}
                  onChange={(e) =>
                    setForm({ ...form, addressLine1: e.target.value })
                  }
                  placeholder="House no, Street"
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900"
                  required
                />
              </div>

              {/* Address line 2 */}
              <div>
                <label className="block text-sm font-medium  mb-1">
                  Address Line 2 (Optional)
                </label>
                <input
                  value={form.addressLine2}
                  onChange={(e) =>
                    setForm({ ...form, addressLine2: e.target.value })
                  }
                  placeholder="Landmark, Area"
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              {/* City + State */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium  mb-1">
                    City
                  </label>
                  <input
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium  mb-1">
                    State
                  </label>
                  <input
                    value={form.state}
                    onChange={(e) =>
                      setForm({ ...form, state: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900"
                    required
                  />
                </div>
              </div>

              {/* Pincode */}
              <div>
                <label className="block text-sm font-medium  mb-1">
                  Pincode
                </label>
                <input
                  value={form.pincode}
                  onChange={(e) =>
                    setForm({ ...form, pincode: e.target.value })
                  }
                  placeholder="400001"
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900"
                  required
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-blue-900 text-white font-medium hover:bg-gray-800"
                >
                  {editingId ? "Update Address" : "Save Address"}
                </button>
                <button
                  type="button"
                  onClick={closeForm}
                  className="flex-1 py-2 rounded-xl border font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Addresses;
