import { useState } from "react";
import { createOpportunity } from "../services/api";

export default function Organization() {
  const [title, setTitle] = useState("");

  async function submit() {
    const res = await createOpportunity({
      title,
      organization_id: 1,
    });
    alert(JSON.stringify(res));
  }

  return (
    <div>
      <h2>Organization Dashboard</h2>
      <input placeholder="Opportunity title" onChange={e => setTitle(e.target.value)} />
      <button onClick={submit}>Create Opportunity</button>
    </div>
  );
}
