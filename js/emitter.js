// 'emitter' plugin
export const emitter = {
  async emit(event, message) {
    if (event === 'message') {
      document.getElementById('log').textContent += message + '\n';
    }
  }
};
