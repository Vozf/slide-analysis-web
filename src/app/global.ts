'use strict';
import { environment } from '../environments/environment';

export const api_path = `${window.location.protocol}//${environment.baseUrl || window.location.hostname}:${environment.port}`;
