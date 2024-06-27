import { useEffect, useState } from "react";
import MapComponent from "../module/map/ui/MapComponent";
import UserItemModel from "../module/user/model/UserItemModel";
import UsersModel from "../module/user/model/UsersModel";
import socket from "./socket";

function App() {
  // connect
  useEffect(() => {
    socket.connect();
    socket.on('notify', (userList: UserItemModel[]) => {
      setUsers({ users: userList });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // data
  const [users, setUsers] = useState<UsersModel>({ users: [] });

  // move
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          sendMessage(true, false);
          break;
        case 'ArrowDown':
          sendMessage(true, true);
          break;
        case 'ArrowLeft':
          sendMessage(false, false);
          break;
        case 'ArrowRight':
          sendMessage(false, true);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  const sendMessage = (vertical: boolean, increment: boolean) => {
    socket.emit('move', {
      vertical: vertical,
      increment: increment
    });
  };

  // map
  return (
    <div>
      {MapComponent(users)}
      <input type="text" style={{ display: 'none' }} />
    </div>
  );
}

export default App;
