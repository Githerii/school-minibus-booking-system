"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function BookingManager({
  bookings,
  buses,
  parents,
  onAddBooking,
  onUpdateBooking,
  onDeleteBooking,
}: any) {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({
    parentId: "",
    busId: "",
    pickup: "",
    dropoff: "",
  });

  function submit(e: any) {
    e.preventDefault();
    editing
      ? onUpdateBooking(editing.id, form)
      : onAddBooking(form);

    setShowModal(false);
    setEditing(null);
    setForm({ parentId: "", busId: "", pickup: "", dropoff: "" });
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Bookings</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4" /> Add Booking
        </button>
      </div>

      <table className="table">
        <tbody>
          {bookings.map((b: any) => (
            <tr key={b.id}>
              <td>{b.parentName}</td>
              <td>{b.busPlate}</td>
              <td>{b.pickup}</td>
              <td>{b.dropoff}</td>
              <td>
                <Edit2
                  onClick={() => {
                    setEditing(b);
                    setForm(b);
                    setShowModal(true);
                  }}
                />
                <Trash2 onClick={() => onDeleteBooking(b.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <form onSubmit={submit}>
          <select
            value={form.parentId}
            onChange={(e) => setForm({ ...form, parentId: Number(e.target.value) })}
          >
            <option>Select parent</option>
            {parents.map((p: any) => (
              <option key={p.id} value={p.id}>{p.full_name}</option>
            ))}
          </select>

          <select
            value={form.busId}
            onChange={(e) => setForm({ ...form, busId: Number(e.target.value) })}
          >
            <option>Select bus</option>
            {buses.map((b: any) => (
              <option key={b.id} value={b.id}>{b.plateNumber}</option>
            ))}
          </select>

          <input
            placeholder="Pickup point"
            value={form.pickup}
            onChange={(e) => setForm({ ...form, pickup: e.target.value })}
          />

          <input
            placeholder="Dropoff point"
            value={form.dropoff}
            onChange={(e) => setForm({ ...form, dropoff: e.target.value })}
          />

          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
}
