export class BaseBloc {
  constructor(persistKey) {
    this.subscribers = [];
    this.state = null;
    this.persistKey = persistKey;

    this.loadPersistedState();

    window.addEventListener("beforeunload", () => {
      this.savePersistedState();
    });
  }

  loadPersistedState() {
    const persistedState = sessionStorage.getItem(this.persistKey);
    if (persistedState) {
      this.state = JSON.parse(persistedState);
      sessionStorage.removeItem(this.persistKey);
    }
  }

  savePersistedState() {
    sessionStorage.setItem(this.persistKey, JSON.stringify(this.state));
  }

  setState(newState) {
    if (!newState) {
      this.state = newState;
    }
    this.state = { ...this.state, ...newState };
    this.notifySubscribers();
  }

  getState() {
    return this.state;
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    this.notifySubscriber(callback);
  }

  unsubscribe(callback) {
    const index = this.subscribers.indexOf(callback);
    if (index !== -1) {
      this.subscribers.splice(index, 1);
    }
  }

  notifySubscribers() {
    this.subscribers.forEach((callback) => {
      this.notifySubscriber(callback);
    });
  }

  notifySubscriber(callback) {
    callback(this.state);
  }
}
