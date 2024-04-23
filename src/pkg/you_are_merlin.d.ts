/* tslint:disable */
/* eslint-disable */
/**
* @returns {string}
*/
export function get_theme_display_list(): string;
/**
*/
export class Game {
  free(): void;
/**
* @param {string} theme
*/
  constructor(theme: string);
/**
* @returns {string}
*/
  get_intro(): string;
/**
* @returns {boolean}
*/
  is_running(): boolean;
/**
* @returns {string | undefined}
*/
  get_prompt(): string | undefined;
/**
* @returns {string | undefined}
*/
  get_actions(): string | undefined;
/**
* @param {string} search
* @returns {string | undefined}
*/
  handle_action(search: string): string | undefined;
/**
* @param {number} current_epoch_milli
* @returns {string | undefined}
*/
  progress_event_loop(current_epoch_milli: number): string | undefined;
/**
* @returns {boolean}
*/
  has_event_loop(): boolean;
/**
* @returns {number}
*/
  get_event_loop_interval(): number;
}
