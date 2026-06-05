import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export default function SortSelect({ sortType, onChange }) {
  return (
    <div className="sort-select">
      <label htmlFor="sort-medias" className="sort-select-label">
        Trier par
      </label>
      <select
        id="sort-medias"
        className="sort-select-input"
        value={sortType}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="popularity">Popularité</option>
        <option value="date">Date</option>
        <option value="title">Titre</option>
      </select>
    </div>
  );
}
