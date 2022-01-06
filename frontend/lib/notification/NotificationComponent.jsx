import React, { Component } from 'react';
import notification from './notification';
import { COLOR_VERDE, COLOR_ROJO } from '../util/Colors';

class NotificationComponent extends Component {

  state = {
    isOpen: false,
    detail: '',
  }

  componentDidMount() {
    notification.notifyEvent = this.triggerNotification;
  }

  triggerNotification = (message) => {
    const {
      detail,
      openNotification,
      severity
    } = message;


    this.setState({
      isOpen: openNotification,
      detail,
      severity: severity || 'success',
    });

    setTimeout(() => {
      this.setState({
        isOpen: false,
      })
    }, 4000);
  };

  render() {
    const {
      isOpen,
      detail,
      severity,
    } = this.state;


    if (!isOpen) {
      return null;
    }

    let color;

    switch (severity) {
      case 'warning':
        color = COLOR_ROJO;
        break;
      default:
        color = COLOR_VERDE;
        break;
    }

    return (
      <div className='d-flex justify-content-center notification-container'>
        {detail}

        <style jsx>{`
          .notification-container {
            position: fixed;
            width: 20em;
            z-index: 9999;
            padding: .75rem 1.25rem;
            background-color: white;
            left: 50%;
            transform: translate(-50%);
            border: 2px solid ${color};
            border-radius: 6px;
            color: ${color};
            font-weight: 700;
            text-align: center;
            margin-top:20px;
          }  
        `}</style>
      </div>
    );
  }
}

export default NotificationComponent;
