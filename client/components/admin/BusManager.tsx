"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function BusManager({
  buses,
  routes,
  drivers,
  onAddBus,
  onUpdateBus,
  onDeleteBus,
}: any) {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({
    plateNumber: "",
    capacity: 0,
    routeId: "",
    driverId: "",
  });

  function submit(e: any) {
    e.preventDefault();
    editing ? onUpdateBus(editing.id, form) : onAddBus(form);
    setShowModal(false);
    setEditing(null);
    setForm({ plateNumber: "", capacity: 0, routeId: "", driverId: "" });
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Buses</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4" /> Add Bus
        </button>
      </div>

      <table className="table">
        <tbody>
          {buses.map((b: any) => (
            <tr key={b.id}>
              <td>{b.plateNumber}</td>
              <td>{b.routeName}</td>
              <td>{b.driverName}</td>
              <td>{b.capacity}</td>
              <td>
                <Edit2 onClick={() => {
                  setEditing(b);
                  setForm(b);
                  setShowModal(true);
                }} />
                <Trash2 onClick={() => onDeleteBus(b.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <form onSubmit={submit}>
          <input
            placeholder="Plate number"
            value={form.plateNumber}
            onChange={(e) => setForm({ ...form, plateNumber: e.target.value })}
          />

          <input
            type="number"
            placeholder="Capacity"
            value={form.capacity}
            onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })}
          />

          <select
            value={form.routeId}
            onChange={(e) => setForm({ ...form, routeId: Number(e.target.value) })}
          >
            <option>Select route</option>
            {routes.map((r: any) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>

          <select
            value={form.driverId}
            onChange={(e) => setForm({ ...form, driverId: Number(e.target.value) })}
          >
            <option>Select driver</option>
            {drivers.map((d: any) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>

          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
}
