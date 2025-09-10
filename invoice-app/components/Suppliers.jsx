import React, { useState } from 'react';

function Suppliers({ suppliers, setSuppliers }) {
  const [name, setName] = useState('');
  const [ico, setIco] = useState('');
  const [dic, setDic] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAdd = () => {
    if (!name || !ico) return;
    setSuppliers([...suppliers, { name, ico, dic }]);
    setName(''); setIco(''); setDic('');
  };

  const handleEdit = (idx) => {
    setEditingIndex(idx);
    setName(suppliers[idx].name);
    setIco(suppliers[idx].ico);
    setDic(suppliers[idx].dic);
  };

  const handleUpdate = () => {
    const updated = suppliers.slice();
    updated[editingIndex] = { name, ico, dic };
    setSuppliers(updated);
    setEditingIndex(null);
    setName(''); setIco(''); setDic('');
  };

  return (
    <div>
      <h2>Suppliers</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="IČO" value={ico} onChange={e => setIco(e.target.value)} />
      <input placeholder="DIČ" value={dic} onChange={e => setDic(e.target.value)} />
      {editingIndex === null ? (
        <button onClick={handleAdd}>Add</button>
      ) : (
        <button onClick={handleUpdate}>Update</button>
      )}
      <ul>
        {suppliers.map((s, idx) => (
          <li key={idx}>
            {s.name} (IČO: {s.ico}, DIČ: {s.dic})
            <button onClick={() => handleEdit(idx)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Suppliers;
