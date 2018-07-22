import {
  EventSubscriber,
  InsertEvent,
  EntitySubscriberInterface,
  RemoveEvent
} from "typeorm";
import { CatRelationship } from "./CatRelationship";
import { Category } from "./Category";

@EventSubscriber()
export class CatSubscriber
  implements EntitySubscriberInterface<CatRelationship> {
  listenTo() {
    return CatRelationship;
  }

  async afterInsert(event: InsertEvent<CatRelationship>) {
    const { id } = event.entity.category;

    await event.manager.increment(Category, { id }, "count", 1);
  }

  async afterRemove(event: RemoveEvent<CatRelationship>) {
    if (!event.entity) {
      return;
    }

    const { id } = event.entity.category;

    await event.manager.decrement(Category, { id }, "count", 1);
  }
}
