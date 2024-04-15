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
* @returns {string}
*/
  progress_event_loop(): string;
/**
* @returns {boolean}
*/
  has_event_loop(): boolean;
/**
* @returns {number}
*/
  get_event_loop_interval(): number;
}