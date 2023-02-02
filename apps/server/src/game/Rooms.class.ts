import {Room} from './Room.class'

export class Rooms {
  public rooms: Map<string, Room>

  public constructor() {
    this.rooms = new Map()
  }

  public addRoom(
    name: string,
    creatorId: string,
    numOfPlayers: number,
    password: string,
    watchable: boolean,
  ) {
    // while (this.rooms.has(id)) {
    //   id = nanoid(6)
    // }

    const r = new Room(name, creatorId, numOfPlayers, password, watchable)
    this.rooms.set(r.id, r)
    return r
  }

  public removeRoom(id: string) {
    this.rooms.delete(id)
  }

  public findRoom(id: string) {
    return this.rooms.get(id)
  }

  public getRoomsMetadata() {
    const a = []
    this.rooms.forEach(room => a.push(room.metadata))
    return a
  }
}
