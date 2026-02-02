"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";

export default function DriverManager({
  drivers,
  onAddDriver,
  onUpdateDriver,
  onDeleteDriver,
}: any) {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ name: "", email: "" });

  function submit(e: any) {
    e.preventDefault();

    editing
      ? onUpdateDriver(editing.id, form)
      : onAddDriver(form);

    setShowModal(false);
    setEditing(null);
    setForm({ name: "", email: "" });
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Drivers</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4" /> Add Driver
        </button>
      </div>

      <table className="table">
        <tbody>
          {drivers.map((d: any) => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.email}</td>
              <td>
                <Edit2 onClick={() => {
                  setEditing(d);
                  setForm(d);
                  setShowModal(true);
                }} />
                <Trash2 onClick={() => onDeleteDriver(d.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <form onSubmit={submit}>
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
}
