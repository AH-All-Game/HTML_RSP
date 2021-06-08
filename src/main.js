let gameFinish = false; // 게임 종료 확인
let winCount = 0; // 승tn
let myHp = 3; //체력
let list = [
    "sci.PNG",
    "rock.PNG",
    "pap.PNG"
]; // 가위 바위 보 이미지
let audio = new Audio('https://www.bensound.com/bensound-music/bensound-funkyelement.mp3'); //https://www.sellbuymusic.com/upload/music/0000000369/584622080769205.mp3
audio.loop = true;

$(".choise").click(function() {
    $(".flip-card-inner").css("transform", "rotateY(180deg)");
});

function rsp(myChoise) {

    if (!gameFinish) {

        let bot = Math.floor(Math.random() * 3);

        document.getElementById("bot").src = list[bot];

        let win = myChoise - bot;

        if (win === -1 || win === 2) {

            --myHp;

            setTimeout(function() {
                $(".flip-card-inner").css("transform", "rotateY(-180deg)");
                document.getElementById("bot").src = "https://i.pinimg.com/originals/0a/35/d6/0a35d69430d0a2f52d91d4a0010bf870.gif";
            }, 1000);

            document.getElementById("winText").innerText = "패배";

            if (myHp > 3) {
                document.getElementById("hp").innerText = '💖💖💖' + '💛'.repeat(myHp - 3);
            } else {
                document.getElementById("hp").innerText = '💖'.repeat(myHp) + '💔'.repeat(3 - myHp);
            }

            if (myHp == 0) {
                gameFinish = true;
                setTimeout(() => endGame(), 1000);
            }

        } else if (win === 1 || win === -2) {

            setTimeout(function() {
                $(".flip-card-inner").css("transform", "rotateY(-180deg)");
                document.getElementById("bot").src = "https://i.pinimg.com/originals/0a/35/d6/0a35d69430d0a2f52d91d4a0010bf870.gif";
            }, 1000);

            $("#startButton").trigger("click");

            setTimeout(function(){
                $("#stopButton").trigger("click");
            }, 2000);

            document.getElementById("winText").innerText = "승리";
            document.getElementById("winCount").innerText = ++winCount;

            if (winCount % 5 == 0) {
                ++myHp;
                if (myHp > 3) {
                    document.getElementById("hp").innerText = '💖💖💖' + '💛'.repeat(myHp - 3);
                } else {
                    document.getElementById("hp").innerText = '💖'.repeat(myHp) + '💔'.repeat(3 - myHp);
                }
            }

        } else {
            setTimeout(function() {
                $(".flip-card-inner").css("transform", "rotateY(-180deg)");
                document.getElementById("bot").src = "https://i.pinimg.com/originals/0a/35/d6/0a35d69430d0a2f52d91d4a0010bf870.gif";
            }, 1000);
            document.getElementById("winText").innerText = "무승부";
        }

    } else {
        alert("[E1] 게임이 종료되었습니다.");
    }
}

function endGame() {
    if (confirm("게임 종료!\n[" + winCount + "승]\n\n랭킹에 등록하시겠습니까?")) {
        rankSave();
    } else {
        resetGame();
    };
}

function resetGame() {
    winCount = 0;
    myHp = 3;
    gameFinish = false;
    document.getElementById("bot").src = "https://i.pinimg.com/originals/0a/35/d6/0a35d69430d0a2f52d91d4a0010bf870.gif";
    document.getElementById("winText").innerText = "없음";
    document.getElementById("winCount").innerText = "0";
    document.getElementById("hp").innerText = "💖💖💖";
}

function play() {
    audio.play();
    document.getElementById("play").style = "display: inline;";
    document.getElementById("stop").style = "display: none;";
}

function stop() {
    audio.pause();
    document.getElementById("play").style = "display: none;";
    document.getElementById("stop").style = "display: inline;";
}

function rankSave() {
    let nickname = prompt("등록할 닉네임을 입력해주세요.", "");
    if (nickname) {
        xhr = new XMLHttpRequest();
        xhr.open("post", "saveData.php", true);
        xhr.onreadystatechange = function() { 
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    alert(xhr.responseText);
                    resetGame();
                } else {
                    alert("서버오류 : " + xhr.status);
                    resetGame();
                }
            }
        }
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("nickname=" + nickname + "&winCount=" + winCount);
    } else {
        resetGame();
    }
}
