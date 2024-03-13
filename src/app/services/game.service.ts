import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {StatsticsService} from "./statstics.service";

export enum EGameStatuses {
  NOT_STARTED= 'NOT_STARTED',
  STARTED = 'STARTED',
  LOST = 'LOST',
  WON = 'WON'
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public words = ['test', 'garlic', 'response', 'eurofunk', 'request'];
  public alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  public solutions: BehaviorSubject<string[]>
  public MAX_TRIES = 7;
  public gameStatus: BehaviorSubject<string>;
  public currentTries: BehaviorSubject<number>;
  public secretWord: BehaviorSubject<string>;

  constructor(private statsticsService: StatsticsService) {
    this.gameStatus = new BehaviorSubject('NOT_STARTED');
    this.currentTries = new BehaviorSubject(this.MAX_TRIES);
    this.solutions = new BehaviorSubject([] as string[]);
    this.secretWord = new BehaviorSubject('');
  }

  private getRandomWord() {
    const wordsCount = this.words.length;
    const randomIndex = Math.floor(Math.random() * wordsCount);

    return this.words[randomIndex ?? 0]
  }

  public startPlay() {
    this.statsticsService.setGame();
    this.resetGame()

    const firstLetter = this.secretWord.value.charAt(0);
    const lastLetter = this.secretWord.value.charAt(this.secretWord.value.length - 1);
    this.solutions.value.push(firstLetter);
    this.solutions.value.push(lastLetter);
    this.solutions.next(this.solutions.value);
  }

  private resetGame() {
    this.gameStatus.next('STARTED');
    this.secretWord.next(this.getRandomWord());
    this.solutions.next([]);
    this.currentTries = new BehaviorSubject(this.MAX_TRIES);

  }

  public step(letter: string) {
    this.statsticsService.setClick();
    if (!this.secretWord.value.includes(letter)) {
      const updatedTries = this.currentTries.value - 1;
      this.currentTries.next(updatedTries);
    }

    this.solutions.value.push(letter);

    if (this.currentTries.value === 0) {
      this.statsticsService.setLost();
        this.finishPlay('LOST');
    }

    if (this.isWon()) {
      this.statsticsService.setWon();
      this.finishPlay('WON');
    }
  }

  isWon() {
    return [...this.secretWord.value].every((letter) => {
      return this.solutions.value.includes(letter);
    })
  }

  finishPlay(status: string){
    this.gameStatus.next(status)
  }
}
