import io from "socket.io-client";
// import { userService } from "./user.service";

export const SOCKET_EVENT_RENDER_STATION = "render-station";
export const SOCKET_EMIT_UPDATE_STATION = "update-station";

const baseUrl = process.env.NODE_ENV === "production" ? "" : "//localhost:3030";
export const socketService = createSocketService();
// export const socketService = createDummySocketService()

// for debugging from console
window.socketService = socketService;

socketService.setup();

function createSocketService() {
  var socket = null;
  const socketService = {
    setup() {
      console.log(baseUrl);
      socket = io(baseUrl);
      console.log(socket);
    },
    on(eventName, cb) {
      socket.on(eventName, cb);
    },
    off(eventName, cb = null) {
      if (!socket) return;
      if (!cb) socket.removeAllListeners(eventName);
      else socket.off(eventName, cb);
    },
    emit(eventName, data) {
      socket.emit(eventName, data);
    },
    terminate() {
      socket = null;
    },
  };
  return socketService;
}

function createDummySocketService() {
  var listenersMap = {};
  const socketService = {
    listenersMap,
    setup() {
      listenersMap = {};
    },
    terminate() {
      this.setup();
    },
    login() {
      console.log("Dummy socket service here, login - got it");
    },
    logout() {
      console.log("Dummy socket service here, logout - got it");
    },
    on(eventName, cb) {
      listenersMap[eventName] = [...(listenersMap[eventName] || []), cb];
    },
    off(eventName, cb) {
      if (!listenersMap[eventName]) return;
      if (!cb) delete listenersMap[eventName];
      else
        listenersMap[eventName] = listenersMap[eventName].filter(
          (l) => l !== cb
        );
    },
    emit(eventName, data) {
      var listeners = listenersMap[eventName];
      if (eventName === SOCKET_EMIT_SEND_MSG) {
        listeners = listenersMap[SOCKET_EVENT_ADD_MSG];
      }

      if (!listeners) return;

      listeners.forEach((listener) => {
        listener(data);
      });
    },
    // Functions for easy testing of pushed data
    testChatMsg() {
      this.emit(SOCKET_EVENT_ADD_MSG, {
        from: "Someone",
        txt: "Aha it worked!",
      });
    },
    testUserUpdate() {
      this.emit(SOCKET_EVENT_USER_UPDATED, {
        ...userService.getLoggedinUser(),
        score: 555,
      });
    },
  };
  window.listenersMap = listenersMap;
  return socketService;
}

// Basic Tests
// function cb(x) {console.log('Socket Test - Expected Puk, Actual:', x)}
// socketService.on('baba', cb)
// socketService.on('baba', cb)
// socketService.on('baba', cb)
// socketService.on('mama', cb)
// socketService.emit('baba', 'Puk')
// socketService.off('baba', cb)
