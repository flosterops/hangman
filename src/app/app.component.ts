import {Component} from '@angular/core';
import {GameService} from "./services/game.service";
import {StatsticsService} from "./services/statstics.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  secretWord: string = '';
  letters: string[];
  gameStatus: string = ''
  tries: number = 0;
  solutions: string[]= []
  stats;

constructor(private gameService: GameService, private statsticsService: StatsticsService) {
  this.letters = this.gameService.alphabet;
  this.stats = this.statsticsService.stats;

  this.gameService.gameStatus.subscribe((status) => {
    this.gameStatus = status
  });

  this.gameService.secretWord.subscribe((secret) => {
    this.secretWord = secret;
  })

  this.gameService.currentTries.subscribe((tries) => {
    this.tries = tries;
  })

  this.gameService.solutions.subscribe((solutions) => {
    this.solutions = solutions;
  })
}

getSecret() {
  return [...this.secretWord].map((letter) => {
    if (this.solutions.includes(letter)) {
      return letter
    }

    return '*'

  });
}

onStep(letter: string) {
    this.gameService.step(letter);
}

playGame() {
  this.gameService.startPlay();
}


}
