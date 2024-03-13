import { Injectable } from '@angular/core';

const LS_NAME = 'stats'
const defaultStats = {
  games: 0,
  click: 0,
  won: 0,
  lost: 0,
}

@Injectable({
  providedIn: 'root'
})
export class StatsticsService {
 stats;
  constructor() {
    this.stats = this.getStatistics();
  }

  getStatistics() {
    if (!window.localStorage.getItem(LS_NAME)) {
      return defaultStats;
    }

    return JSON.parse(window.localStorage.getItem(LS_NAME) ?? '');
  }

  setClick() {
    this.stats.click += 1;
    this.setStatistics()
  };

  setWon() {
    this.stats.won += 1;
    this.setStatistics()
  }

  setLost() {
    this.stats.lost += 1;
    this.setStatistics()
  };

  setGame() {
    this.stats.games += 1;
    this.setStatistics()
  }

  setStatistics() {
    window.localStorage.setItem(LS_NAME, JSON.stringify(this.stats));
  }
}
