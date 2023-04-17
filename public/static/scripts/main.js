p1batu = document.getElementById("p1-batu");
p1kertas = document.getElementById("p1-kertas");
p1gunting = document.getElementById("p1-gunting");

p2batu = document.getElementById("com-batu");
p2kertas = document.getElementById("com-kertas");
p2gunting = document.getElementById("com-gunting");

vs = document.getElementById("vs");

allBKG = document.getElementsByClassName("bkg");

class Game {
  bkg = {
    p1batu: p1batu,
    p1kertas: p1kertas,
    p1gunting: p1gunting,
    p2batu: p2batu,
    p2kertas: p2kertas,
    p2gunting: p2gunting,
  };

  play(Player1, Player2, inputPlayer1) {
    this.changeUI(Player1, Player2);

    let result = this.getResult(Player1, Player2);
    this.logResult(result);
  }

  changeUI(Player1, Player2) {
    let pilihanPlayer1 = Player1.getPilihan();
    let pilihanPlayer2 = Player2.getPilihan();

    this.setBKGBGColor("p1" + pilihanPlayer1);
    this.setBKGBorderRadius("p1" + pilihanPlayer1);

    this.setBKGBGColor("p2" + pilihanPlayer2);
    this.setBKGBorderRadius("p2" + pilihanPlayer2);

    this.setBKGAttributeDisabled();
  }

  setBKGBGColor(BKG) {
    this.bkg[BKG].style.backgroundColor = "#C4C4C4";
  }
  setBKGBorderRadius(BKG) {
    this.bkg[BKG].style.borderRadius = "1rem";
  }
  setBKGAttributeDisabled() {
    for (const element of allBKG) {
      element.setAttribute("disabled", "disabled");
    }
  }
  setVSUIResult() {
    vs.style.fontSize = "25px";
    vs.style.color = "white";
    vs.style.backgroundColor = "#4C9654";
    vs.style.transform = "rotate(-15deg)";
    vs.style.width = "150px";
    vs.style.margin = "0px 0px 0px 50px";
    vs.style.borderRadius = "0.5rem";
    vs.style.padding = "10px";
  }
  getResult(Player1, Player2) {
    let namaPlayer1 = Player1.getName();
    let namaPlayer2 = Player2.getName();
    let pilihanPlayer1 = Player1.getPilihan();
    let pilihanPlayer2 = Player2.getPilihan();

    if (pilihanPlayer1 == pilihanPlayer2) {
      vs.innerHTML = "DRAW";
      this.setVSUIResult();
      vs.style.backgroundColor = "green";
      return `DRAW`;
    } else if (pilihanPlayer1 == "batu") {
      if (pilihanPlayer2 == "kertas") {
        vs.innerHTML = `${namaPlayer2} <br> WIN`;
        this.setVSUIResult();
        return `${namaPlayer2} WIN`;
      } else {
        vs.innerHTML = `${namaPlayer1}  <br>  WIN`;
        this.setVSUIResult();
        return `${namaPlayer1} WIN`;
      }
    } else if (pilihanPlayer1 == "kertas") {
      if (pilihanPlayer2 == "gunting") {
        vs.innerHTML = `${namaPlayer2} <br>  WIN`;
        this.setVSUIResult();
        return `${namaPlayer2} WIN`;
      } else {
        vs.innerHTML = `${namaPlayer1} <br>  WIN`;
        this.setVSUIResult();
        return `${namaPlayer1} WIN`;
      }
    } else if (pilihanPlayer1 == "gunting") {
      if (pilihanPlayer2 == "batu") {
        vs.innerHTML = `${namaPlayer2}  <br> WIN`;
        this.setVSUIResult();
        return `${namaPlayer2} WIN`;
      } else {
        vs.innerHTML = `${namaPlayer1} <br>  WIN`;
        this.setVSUIResult();
        return `${namaPlayer1} WIN`;
      }
    }
  }

  logResult(result) {
    console.log(result);
  }
}

class Player {
  opsi = ["batu", "kertas", "gunting"];
  constructor(name, pilihan = 0) {
    if (this.constructor === Player) {
      throw new Error("Cannot instantiate from Abstract Class");
    }
    this.name = name;
    this.pilihan = pilihan;
  }
}

class HumanPlayer extends Player {
  constructor(name, pilihan = 0) {
    super(name, pilihan);
  }
  getName() {
    return this.name;
  }
  setPilihan(pilihan) {
    this.pilihan = pilihan;
  }
  getPilihan() {
    return this.pilihan;
  }
}

class ComputerPlayer extends Player {
  constructor(name, pilihan = 0) {
    super(name, pilihan);
    this.pilihan = this.setPilihan();
  }
  getName() {
    return this.name;
  }
  setPilihan() {
    return this.opsi[Math.floor(Math.random() * this.opsi.length)];
  }
  getPilihan() {
    return this.pilihan;
  }
}

function start(input) {
  const game = new Game();

  player1 = new HumanPlayer("PLAYER 1", input);
  com = new ComputerPlayer("COM");

  game.play(player1, com, input);
}
