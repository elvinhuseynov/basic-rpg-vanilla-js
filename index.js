const gameScreen = document.getElementById("game-screen");
const startScreen = document.getElementById("start");
const playerHp = document.getElementById("playerHp");
const playerPower = document.getElementById("playerPower");
const playerMoney = document.getElementById("playerMoney");
const shopScreen = document.getElementById("shop");
const shopMoney = document.getElementById("shop-money");
const warning = document.getElementById("warning");
const playerBattleHp = document.getElementById("player-battle-hp");
const battleScreen = document.getElementById("battle-screen");
const activeHp = document.getElementById("active-hp");
const opponentActiveHp = document.getElementById("opponent-active-hp");
const opponentActiveStats = document.getElementById("opponent-battle-stats");
const battleLog = document.getElementById("battle-log");
const levelText = document.getElementById("level");
const afterGame = document.getElementById("afterGame");
const afterBattle = document.getElementById("afterBattle");

const startGame = () => {
  gameScreen.style.display = "initial";
  startScreen.style.display = "none";
  afterBattle.innerText = "";

  playerStats.activeLevel = 1;
  playerHp.innerText = `Hp: ${playerStats.hp}`;
  playerPower.innerText = `Power: ${playerStats.power}`;
  playerMoney.innerText = `Money: ${playerStats.money}G`;
};

const playerStats = {
  hp: 100,
  power: 5,
  money: 20,
  maxScore: 1,
  activeLevel: 1,
};

const opponentStats = {
  hp: 100,
  power: 0,
  gold: 0,
};

const weapons = {
  stick: {
    power: 5,
    price: 15,
    bought: 0,
  },
  knife: {
    power: 15,
    price: 40,
    bought: 0,
  },
  sword: {
    power: 45,
    price: 120,
    bought: 0,
  },
  axe: {
    power: 65,
    price: 200,
    bought: 0,
  },
};

const potions = {
  basic: {
    hp: 10,
    price: 10,
  },
  bottle: {
    hp: 30,
    price: 25,
  },
  wizard: {
    hp: 60,
    price: 45,
  },
  elixir: {
    hp: 100,
    price: 70,
  },
};

const goShop = () => {
  gameScreen.style.display = "none";
  shopScreen.style.display = "initial";
  afterBattle.innerText = "";

  shopMoney.innerText = `Your money: ${playerStats.money}G`;
};

const goBack = () => {
  shopScreen.style.display = "none";
  gameScreen.style.display = "initial";

  playerHp.innerText = `Hp: ${playerStats.hp}`;
  playerPower.innerText = `Power: ${playerStats.power}`;
  playerMoney.innerText = `Money: ${playerStats.money}G`;
};

const buyWeapon = (value, button) => {
  let itemPrice = 0;
  let itemPower = 0;

  switch (value) {
    case "stick":
      itemPower = weapons.stick.power;
      itemPrice = weapons.stick.price;
      weapons.stick.bought = 1;
      break;

    case "knife":
      itemPrice = weapons.knife.price;
      itemPower = weapons.knife.power;
      weapons.knife.bought = 1;

      break;

    case "sword":
      itemPrice = weapons.sword.price;
      itemPower = weapons.sword.power;
      weapons.knife.bought = 1;
      break;

    case "axe":
      itemPrice = weapons.axe.price;
      itemPower = weapons.axe.power;
      weapons.knife.bought = 1;
      break;

    default:
      break;
  }

  if (playerStats.money >= itemPrice) {
    button.style.display = "none";
    playerStats.power += itemPower;
    playerStats.money -= itemPrice;

    warning.innerText = `You bougth ${value}`;
  } else {
    warning.innerText = `You don't have enough money to buy ${value}`;
  }

  shopMoney.innerText = `Your money: ${playerStats.money}`;
};

const buyPotions = (value) => {
  let itemPrice = 0;
  let itemHp = 0;

  switch (value) {
    case "basic":
      itemPrice = potions.basic.price;
      itemHp = potions.basic.hp;
      break;

    case "bottle":
      itemPrice = potions.bottle.price;
      itemHp = potions.bottle.hp;
      break;

    case "wizard":
      itemPrice = potions.wizard.price;
      itemHp = potions.wizard.hp;
      break;

    case "elixir":
      itemPrice = potions.elixir.price;
      itemHp = potions.elixir.hp;
      break;

    default:
      break;
  }

  if (playerStats.money >= itemPrice && playerStats.hp + itemHp < 100) {
    warning.innerText = `You bought potion`;
    playerStats.money -= itemPrice;
    playerStats.hp += itemHp;
  } else if (
    playerStats.money >= itemPrice &&
    playerStats.hp == playerStats.hp
  ) {
    warning.innerText = `Your health is at max`;
  } else if (playerStats.money >= itemPrice && playerStats.hp + itemHp > 100) {
    playerStats.hp = 100;
    warning.innerText = `You bought potion`;
    playerStats.money -= itemPrice;
  } else if (playerStats.money < itemPrice) {
    warning.innerText = `You don't have enough money`;
  }

  shopMoney.innerText = `Your money: ${playerStats.money}`;
};

const goBattle = () => {
  gameScreen.style.display = "none";
  battleScreen.style.display = "flex";
  activeHp.style.width = `${playerStats.hp}%`;
  levelText.innerText = `Level: ${playerStats.activeLevel}`;

  opponentStats.gold += playerStats.activeLevel;
  opponentStats.hp = 100;
  opponentActiveHp.style.width = `${opponentStats.hp}%`;
  playerStats.power = playerStats.power + playerStats.activeLevel;
  opponentStats.power =
    Math.floor(Math.random() * 5) * playerStats.activeLevel + 1;
  opponentActiveStats.innerText = `Opponent's Hp: ${opponentStats.hp} Opponent's Max Power: ${opponentStats.power}`;

  playerBattleHp.innerText = `Your hp: ${playerStats.hp} and Your Max Power: ${playerStats.power}`;
};

const attack = () => {
  let opponentBattleAttack =
    Math.floor(Math.random() * opponentStats.power) + 1;
  let playerBattleAttack = Math.floor(Math.random() * playerStats.power) + 1;

  playerStats.hp -= opponentBattleAttack;
  opponentStats.hp -= playerBattleAttack;

  activeHp.style.width = `${playerStats.hp}%`;
  opponentActiveHp.style.width = `${opponentStats.hp}%`;

  opponentActiveStats.innerText = `Opponent's Hp: ${opponentStats.hp} Opponent's Max Power: ${opponentStats.power}`;
  playerBattleHp.innerText = `Your hp: ${playerStats.hp} and Your Max Power: ${playerStats.power}`;

  battleLog.innerText = `You gave ${playerBattleAttack} and Your Opponent gave ${opponentBattleAttack}`;

  if (playerStats.hp <= 0) {
    playerStats.hp = 0;
    activeHp.style.width = `${playerStats.hp}%`;
    playerBattleHp.innerText = `Your hp: ${playerStats.hp} and Your Max Power: ${playerStats.power}`;
    gameLose();
  } else if (opponentStats.hp <= 0) {
    opponentStats.hp = 0;
    opponentActiveHp.style.width = `${opponentStats.hp}%`;
    opponentActiveStats.innerText = `Opponent's Hp: ${opponentStats.hp} Opponent's Max Power: ${opponentStats.power}`;
    gameWin();
  }
};

const gameLose = () => {
  location.reload();
};

const gameWin = () => {
  playerStats.maxScore += 1;
  playerStats.activeLevel += 1;
  gameScreen.style.display = "initial";

  opponentStats.gold = Math.floor(Math.random() * 5 + opponentStats.gold);

  playerStats.money += opponentStats.gold;
  playerMoney.innerText = `Money: ${playerStats.money}G`;

  battleScreen.style.display = "none";
  afterBattle.innerText = `You win :). You're at level: ${playerStats.activeLevel} and you earned ${opponentStats.gold}G`;
  playerPower.innerText = `Power: ${playerStats.power}`;
};

const flee = () => {
  gameScreen.style.display = "initial";
  battleScreen.style.display = "none";
  alert(`You fleed`);
};
