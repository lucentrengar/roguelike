import chalk from 'chalk';
import figlet from 'figlet';
import readlineSync from 'readline-sync';
import { startGame } from "./game.js";

// Dummy achievements data
const achievements = [
    "첫 번째 몬스터 처치",
    "10스테이지 클리어",
    "게임을 5번 플레이",
];

// 로비 화면을 출력하는 함수
function displayLobby() {
    console.clear();

    // 타이틀 텍스트
    console.log(
        chalk.cyan(
            figlet.textSync('RL- Javascript', {
                font: 'Standard',
                horizontalLayout: 'default',
                verticalLayout: 'default'
            })
        )
    );

    // 상단 경계선
    const line = chalk.magentaBright('='.repeat(50));
    console.log(line);

    // 게임 이름
    console.log(chalk.yellowBright.bold('로그라이크 게임에 오신것을 환영합니다!'));

    // 설명 텍스트
    console.log(chalk.green('옵션을 선택해주세요.'));
    console.log();

    // 옵션들
    console.log(chalk.blue('1.') + chalk.white(' 새로운 게임 시작'));
    console.log(chalk.blue('2.') + chalk.white(' 업적 확인하기'));
    console.log(chalk.blue('3.') + chalk.white(' 옵션'));
    console.log(chalk.blue('4.') + chalk.white(' 종료'));

    // 하단 경계선
    console.log(line);

    // 하단 설명
    console.log(chalk.gray('1-4 사이의 수를 입력한 뒤 엔터를 누르세요.'));
}

// 유저 입력을 받아 처리하는 함수
function handleUserInput() {
    const choice = readlineSync.question('입력: ');

    switch (choice) {
        case '1':
            console.log(chalk.green('게임을 시작합니다.'));
            setTimeout(() => startGame(), 1000); // 1초 후에 게임 시작
            break;
        case '2':
            displayAchievements();
            break;
        case '3':
            console.log(chalk.blue('옵션 메뉴는 아직 구현 준비중입니다..'));
            setTimeout(() => handleUserInput(), 1000); // 1초 후에 다시 입력 받기
            break;
        case '4':
            console.log(chalk.red('게임을 종료합니다.'));
            process.exit(0); // 게임 종료
            break;
        default:
            console.log(chalk.red('올바른 선택을 하세요.'));
            setTimeout(() => handleUserInput(), 1000); // 유효하지 않은 입력일 경우 1초 후 다시 입력 받음
    }
}

// 업적 표시 함수
function displayAchievements() {
    console.clear();
    console.log(chalk.yellowBright.bold('업적 확인하기'));
    console.log(chalk.green(achievements.length > 0 ? achievements.join('\n') : '업적이 없습니다.'));
    console.log(chalk.gray('1초 후 로비로 돌아갑니다.'));
    setTimeout(() => handleUserInput(), 1000); // 1초 후에 로비로 돌아가기
}

// 게임 시작 함수
function start() {
    displayLobby();
    handleUserInput();
}

// 게임 실행
start();
