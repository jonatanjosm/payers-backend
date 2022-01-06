export default class notification {

    static notifyEvent;
  
    /**
     * { detail: string, severity: success|warning }
     */
    static show(message) {
      if (this.notifyEvent) {
        this.notifyEvent({
          ...message,
          openNotification: true,
        });
      }
    }
  
  }