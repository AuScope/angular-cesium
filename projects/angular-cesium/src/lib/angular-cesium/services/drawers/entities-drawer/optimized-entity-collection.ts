export class OptimizedEntityCollection {
  private _updateRate: number;
  private _collectionSize: number;
  private _isSuspended = false;
  private _isHardSuspend = false;
  private _suspensionTimeout: any;
  private _onEventSuspensionCallback!: { once: boolean, callback: Function } | undefined;
  private _onEventResumeCallback!: { once: boolean, callback: Function } | undefined;

  constructor(private entityCollection: any, collectionSize = -1, updateRate = -1) {
    this._updateRate = updateRate;
    this._collectionSize = collectionSize;
  }

  get collectionSize(): number {
    return this._collectionSize;
  }

  get isSuspended(): boolean {
    return this._isSuspended;
  }

  get updateRate(): number {
    return this._updateRate;
  }

  set updateRate(value: number) {
    this._updateRate = value;
  }

  set collectionSize(value: number) {
    this._collectionSize = value;
  }

  setShow(show: boolean) {
    this.entityCollection.show = show;
  }

  collection() {
    return this.entityCollection;
  }

  isFree(): boolean {
    return this._collectionSize < 1 || this.entityCollection.values.length < this._collectionSize;
  }

  add(entity: any) {
    this.suspend();
    return this.entityCollection.add(entity);
  }

  remove(entity: any) {
    this.suspend();
    return this.entityCollection.remove(entity);
  }

  removeNoSuspend(entity: any) {
    this.entityCollection.remove(entity);
  }

  removeAll() {
    this.suspend();
    this.entityCollection.removeAll();
  }

  onEventSuspension(callback: Function, once = false): Function {
    this._onEventSuspensionCallback = {callback, once};
    return () => {
      this._onEventSuspensionCallback = undefined;
    };
  }

  onEventResume(callback: Function, once = false): Function {
    this._onEventResumeCallback = {callback, once};
    if (!this._isSuspended) {
      this.triggerEventResume();
    }
    return () => {
      this._onEventResumeCallback = undefined;
    };
  }

  triggerEventSuspension() {
    if (this._onEventSuspensionCallback !== undefined) {
      const callback = this._onEventSuspensionCallback.callback;
      if (this._onEventSuspensionCallback.once) {
        this._onEventSuspensionCallback = undefined;
      }
      callback();
    }
  }

  triggerEventResume() {
    if (this._onEventResumeCallback !== undefined) {
      const callback = this._onEventResumeCallback.callback;
      if (this._onEventResumeCallback.once) {
        this._onEventResumeCallback = undefined;
      }
      callback();
    }
  }

  public suspend() {
    if (this._updateRate < 0) {
      return;
    }
    if (this._isHardSuspend) {
      return;
    }
    if (!this._isSuspended) {
      this._isSuspended = true;
      this.entityCollection.suspendEvents();
      this.triggerEventSuspension();
      this._suspensionTimeout = setTimeout(() => {
        this.entityCollection.resumeEvents();
        this.triggerEventResume();
        this._isSuspended = false;
        this._suspensionTimeout = undefined;
      }, this._updateRate);
    }
  }

  public hardSuspend() {
    this.entityCollection.suspendEvents();
    this._isHardSuspend = true;
  }

  public hardResume() {
    this.entityCollection.resumeEvents();
    this._isHardSuspend = false;
  }

}
