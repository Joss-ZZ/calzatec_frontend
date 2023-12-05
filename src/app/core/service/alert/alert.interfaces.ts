import { MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';

export type ConfirmationResult = 'canceled' | 'acepted';

export interface ConfirmationConfig {
  title: string;
  message: string;
  icon?: {
    show?: boolean;
    name: string;
    //color?: 'primary' | 'accent' | 'warn' | 'basic' | 'info' | 'success' | 'warning' | 'error';
    color: string;
  };
  actions?: {
    confirm?: {
      show?: boolean;
      label: string;
      color: 'primary' | 'accent' | 'warn';
    };
    cancel?: {
      show?: boolean;
      label: string;
    };
    close?: boolean;
  };
  dismissible?: boolean;
}

export type LoadingPosition =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'right';

export interface LoadingConfig {
  position?: LoadingPosition;
  hasBackdrop?: boolean;
}

export enum SnackBarType {
  Success = 'success',
  Error = 'error',
  Warn = 'warn',
  Info = 'info'
}

export interface SnackBarFuc {
  success(message: string, duration?: number): void;
  error(message: string, duration?: number): void;
  warn(message: string, duration?: number): void;
  info(message: string, duration?: number): void;
  default(config: SnackBarConfig): void;
}

export interface SnackBarData {
  message: string;
  buttonClosed: boolean;
  type: SnackBarType | null;
}

export interface SnackBarConfig {
  message: string;
  buttonClosed?: boolean;
  duration?: number;
  horizontalPosition?: MatSnackBarHorizontalPosition;
}
