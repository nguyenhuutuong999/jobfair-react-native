import { DeviceEventEmitter } from 'react-native';

export default class Alert {
  static addAlertListener(callback) {
    DeviceEventEmitter.addListener('alert', callback);
  }

  static success(title, message) {
    DeviceEventEmitter.emit('alert', {
      type: 'success',
      title,
      message,
    });
  }

  static error(title, message) {
    DeviceEventEmitter.emit('alert', {
      type: 'error',
      title,
      message,
    });
  }

  static warn(title, message) {
    DeviceEventEmitter.emit('alert', {
      type: 'warn',
      title,
      message,
    });
  }

  static notify(title, message) {
    DeviceEventEmitter.emit('alert', {
      type: 'custom',
      title,
      message,
    });
  }

}
