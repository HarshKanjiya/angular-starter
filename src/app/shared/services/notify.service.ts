import { Injectable, Input } from '@angular/core';
import { NotifycationTypes } from '../../core/constants/common.constants';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  constructor() { }

  public notify(message: string, type: NotifycationTypes, body?: string) { }
}
