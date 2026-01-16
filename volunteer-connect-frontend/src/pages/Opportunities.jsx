import { useEffect, useState } from "react";
import { getOpportunities } from "../services/api";

export default function Opportunities() {
  const [opps, setOpps] = useState([]);

  useEffect(() => {
    getOpportunities().then(setOpps);
  }, []);

  return (
    <div>
      <h2>Volunteer Opportunities</h2>
      {opps.map(o => (
        <div key={o.id}>
          <h3>{o.title}</h3>
          <p>{o.location}</p>
        </div>
      ))}
    </div>
  );
}
