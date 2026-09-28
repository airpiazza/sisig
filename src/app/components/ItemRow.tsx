import { memo } from "react";
import { Item } from "@/db/schema";

interface ItemRowProps {
  item: Item;
  onGatheredChange: (itemId: Item["id"], gathered: boolean) => void;
}

function ItemRow({ item, onGatheredChange }: ItemRowProps) {
  return (
    <div>
      <input
        id={`item-${item.id}`}
        checked={item.gathered ?? false}
        type="checkbox"
        onChange={(e) => onGatheredChange(item.id, e.target.checked)}
      />
      <label htmlFor={`item-${item.id}`}>
        {item.name}
      </label>
    </div>
  );
}

export default memo(ItemRow, (prev, next) =>
  prev.item.id === next.item.id &&
  prev.item.name === next.item.name &&
  prev.item.gathered === next.item.gathered &&
  prev.onGatheredChange === next.onGatheredChange
);
