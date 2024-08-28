import chalk from 'chalk';
import readlineSync from 'readline-sync';

class Player {
  constructor() {
    this.hp = 100;
    this.attackPower = 10; // 공격력 추가
  }

  attack(monster) {
    monster.hp -= this.attackPower;
    return this.attackPower;
  }
}

class Monster {
  constructor(stage) {
    this.hp = 100 + (stage - 1) * 20; // 스테이지에 따라 체력 증가
    this.attackPower = 5 + (stage - 1); // 스테이지에 따라 공격력 증가
  }

  attack(player) {
    player.hp -= this.attackPower;
    return this.attackPower;
  }
}

function displayStatus(stage, player, monster) {
  console.log(chalk.magentaBright(`\n=== Current Status ===`));
  console.log(
    chalk.cyanBright(`| Stage: ${stage} `) +
    chalk.blueBright(`| 플레이어 HP: ${player.hp} `) +
    chalk.redBright(`| 몬스터 HP: ${monster.hp} |`)
  );
  console.log(chalk.magentaBright(`=====================\n`));
}

const battle = async (stage, player, monster) => {
  let logs = [];

  while (player.hp > 0 && monster.hp > 0) {
    console.clear();
    displayStatus(stage, player, monster);

    logs.forEach((log) => console.log(log));

    console.log(chalk.green(`\n1. 공격한다 2. 아무것도 하지않는다.`));
    const choice = readlineSync.question('당신의 선택은? ');

    if (choice === '1') {
      const damage = player.attack(monster);
      logs.push(chalk.green(`플레이어가 ${damage}의 피해를 주었습니다.`));
    } else {
      logs.push(chalk.yellow(`플레이어는 아무것도 하지 않았습니다.`));
    }

    if (monster.hp > 0) {
      const damage = monster.attack(player);
      logs.push(chalk.red(`몬스터가 ${damage}의 피해를 주었습니다.`));
    }
  }

  if (monster.hp <= 0) {
    logs.push(chalk.green(`몬스터를 처치했습니다!`));
  } else if (player.hp <= 0) {
    logs.push(chalk.red(`플레이어가 쓰러졌습니다. 게임 오버!`));
  }
};

export async function startGame() {
  console.clear();
  const player = new Player();
  let stage = 1;

  while (stage <= 10 && player.hp > 0) {
    const monster = new Monster(stage);
    await battle(stage, player, monster);
    
    if (monster.hp <= 0) {
      stage++;
    }
  }

  if (player.hp <= 0) {
    console.log(chalk.red(`게임이 종료되었습니다.`));
  } else {
    console.log(chalk.green(`모든 스테이지를 클리어했습니다!`));
  }
}
