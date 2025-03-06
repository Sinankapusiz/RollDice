/**
 * Verilen sayı kadar nokta içeren bir zar oluşturmaya yarayan Fonksiyon. Geriye Div olarak döndürür.
 * @param {*} number Üretilecek zarın nokta sayısı.
 * @returns Geriye gönderilen zar div'i ve içerisinde verilen sayı kadar nokta sayısı.
 */
function createDice(number) {
    // Zarın nokta pozisyonları. (1-6)
    const dotPositionMatrix = {
        // 1 Noktalı Zar.
        1: [[50, 50]],
        // 2 Noktalı Zar.
        2: [[20, 20], [80, 80]],
        // 3 Noktalı Zar.
        3: [[20, 20], [50, 50], [80, 80]],
        // 4 Noktalı Zar.
        4: [[20, 20], [20, 80], [80, 20], [80, 80]],
        // 5 Noktalı Zar.
        5: [[20, 20], [20, 80], [50, 50], [80, 20], [80, 80]],
        // 6 Noktalı Zar.
        6: [[20, 20], [20, 80], [50, 20], [50, 80], [80, 20], [80, 80]]
    };
    // Zar değişkeni. (geri gönderilecek.)
    const dice = document.createElement("div");
    // Css uygulamak için style class ekleniyor.
    dice.classList.add("dice");

    // Verilen sayı kadar nokta üretilip "dice"(div) değişkenine ekleniyor.
    for (const dotPosition of dotPositionMatrix[number]) {
        // Bir nokta değişkeni(div) oluşturuluyor.
        const dot = document.createElement("div");

        // Css uygulamak için style class ekleniyor.
        dot.classList.add("dice-dot");
        // Oluşturulan noktanın zar içerisindeki konumu "dotPositionMatrix" göre uygulanıyor.
        // Üst konumu.
        dot.style.setProperty("--top", dotPosition[0] + "%");
        // Sol konumu.
        dot.style.setProperty("--left", dotPosition[1] + "%");
        // Zar div'ine(dice) oluşturulan zar noktası div'i(dot) "child" olarak ekleniyor.
        dice.appendChild(dot);
    }

    // Zar div'i geriye gönderiliyor.
    return dice;
}

/**
 * Verilen bilgiler doğrutusunda rastgele Zar oluşturan Fonksiyon.
 * @param {*} diceContainer Zarları içerecek olan parametre(Div). Dışarıdan div olarak alınacak.
 * @param {*} numberOfDice Zar sayısının bilgisini veren parametre.
 */
function randomizeDice(diceContainer, numberOfDice) {
    // Zarlar tekrar, tekrar oluşturulurken karmaşıklığa ve hataya neden olamaması için zarları içerecek olan div'in içi temizleniyor.
    diceContainer.innerHTML = "";

    // Verilen zar adetine(numberOfDice) göre nokta sayısı rastgele olacak şekilde zarlar oluşturuluyor.  
    for (let i = 0; i < numberOfDice; i++) {
        // 1 - 6 arası ve 1, 6 sayısı dahil olacak şekilde rastgele bir sayı üretiliyor.
        const random = Math.floor((Math.random() * 6) + 1)

        dicesRandom.unshift(random);
        // Rastgele üretilen sayıya(random) göre zar oluşturulurup, zar değişkenine(dice) atanıyor. 
        const dice = createDice(random);

        // Oluşturulan rastgele zar(dice), zarları içerecek div'e(diceContainer) "child" olarak ekleniyor. 
        diceContainer.appendChild(dice);
    }
}

let numberOfDice = 1;
let numberOfDiceL = [];

const diceContainer = document.querySelector(".dice-container");
const btnRollDice = document.querySelector(".btn-roll-dice");
let dicePercentangeTable = document.querySelector(".dice-percentange-table");

const turnRollDicesInfo = document.querySelector(".turn-roll-dices-info");

let rollDicesListOl = document.createElement("ol");
rollDicesListOl.classList.add("olDice");


let dicesRandom = [];
let dices = [];
let dicesList = [];


btnRollDice.addEventListener("click", () => {
    const interval = setInterval(() => {
        randomizeDice(diceContainer, numberOfDice);
    }, 50);
    setTimeout(() => clearInterval(interval), 1000);

    setTimeout(() => {
        createTurnRollDicesList()
    }, 1000);

});

function createTurnRollDicesList() {

    let dicesT = [];

    for (let i = 0; i < numberOfDice; i++) {
        dicesT.unshift(dicesRandom[i]);
    }
    console.log("dicesT " + dicesT);
    // dicesRandom burada sıfırlanıyor.
    dicesRandom = [];

    dicesList.unshift(dicesT);
    console.log("dicesList " + dicesList);
    rollDicesListOl.innerHTML = "";

    numberOfDiceL.unshift(numberOfDice);
    console.log("numberOfDiceL " + numberOfDiceL);

    // Toplam Zar adeti kadar dönecek.
    for (let i = 0; i < dicesList.length; i++) {

        // Gelen zarlar için 'li' elementi oluşturuluyor.
        let rollDicesListLi = document.createElement("li");
        rollDicesListLi.classList.add("liDice");

        // Her zar geçmişi satırının başına numara ekleniyor.
        const span = document.createElement("span");
        span.classList.add("listNumber");
        span.textContent = (i + 1) + "-";
        rollDicesListLi.appendChild(span);

        // En son gelen zarları belitmek için css sınıfı tanımlanıyor.
        if (i === 0)
            rollDicesListLi.classList.add("last-dice");

        // sorun burada
        for (let k = 0; k < numberOfDiceL[i]; k++) {

            const dice = createDice(dicesList[i][k]);

            dice.classList.add("dice-min");

            // Zar noktalarına küçük zar tasarımı css sınıfı atanıyor.
            Array.from(dice.children).forEach(child => {
                child.classList.add("dice-dot-min");
            });

            rollDicesListLi.appendChild(dice);
            rollDicesListOl.appendChild(rollDicesListLi);
        }

    }

    turnRollDicesInfo.appendChild(rollDicesListOl);
    console.log(dicesList);
    diceRollStatistic(dicesList);
}

function diceRollStatistic(diceRollArray) {
    let dices = [];
    for (let i = 1; i < 7; i++) {
        let count = 0;
        for (let k = 0; k < diceRollArray.length; k++) {
            count += diceRollArray[k].filter(eleman => eleman === i).length;
        }
        dices[i - 1] = count;
    }
    console.log("dices dizisi : " + dices);

    dicePercentange = dices[0] + dices[1] + dices[2] + dices[3] + dices[4] + dices[5];

    dicePercentangeTable.innerHTML = "";
    dicePercentangeTable.innerHTML =
        `<tr>
        <td>
            <div class="dice">
                <div class="dice-dot" style="--top: 50%; --left: 50%;"></div>
            </div>
            <h3>${((dices[0] / dicePercentange) * 100).toFixed(2)}%</h3>
        </td>
        <td>
            <div class="dice">
                <div class="dice-dot" style="--top: 20%; --left: 20%;"></div>
                <div class="dice-dot" style="--top: 80%; --left: 80%;"></div>
            </div>
            <h3>${((dices[1] / dicePercentange) * 100).toFixed(2)}%</h3>
        </td>
        <td>
            <div class="dice">
                <div class="dice-dot" style="--top: 20%; --left: 20%;"></div>
                <div class="dice-dot" style="--top: 50%; --left: 50%;"></div>
                <div class="dice-dot" style="--top: 80%; --left: 80%;"></div>
            </div>
            <h3>${((dices[2] / dicePercentange) * 100).toFixed(2)}%</h3>
        </td>
    </tr>
    <tr>
        <td> 
            <div class="dice">
                <div class="dice-dot" style="--top: 20%; --left: 20%;"></div>
                <div class="dice-dot" style="--top: 20%; --left: 80%;"></div>
                <div class="dice-dot" style="--top: 80%; --left: 20%;"></div>
                <div class="dice-dot" style="--top: 80%; --left: 80%;"></div>
            </div>
            <h3>${((dices[3] / dicePercentange) * 100).toFixed(2)}%</h3>
        </td>
        <td> 
            <div class="dice">
                <div class="dice-dot" style="--top: 20%; --left: 20%;"></div>
                <div class="dice-dot" style="--top: 20%; --left: 80%;"></div>
                <div class="dice-dot" style="--top: 50%; --left: 50%;"></div>
                <div class="dice-dot" style="--top: 80%; --left: 20%;"></div>
                <div class="dice-dot" style="--top: 80%; --left: 80%;"></div>
            </div>
            <h3>${((dices[4] / dicePercentange) * 100).toFixed(2)}%</h3>
        </td>
        <td> 
            <div class="dice">
                <div class="dice-dot" style="--top: 20%; --left: 20%;"></div>
                <div class="dice-dot" style="--top: 20%; --left: 80%;"></div>
                <div class="dice-dot" style="--top: 50%; --left: 20%;"></div>
                <div class="dice-dot" style="--top: 50%; --left: 80%;"></div>
                <div class="dice-dot" style="--top: 80%; --left: 20%;"></div>
                <div class="dice-dot" style="--top: 80%; --left: 80%;"></div>
            </div>
            <h3>${((dices[5] / dicePercentange) * 100).toFixed(2)}%</h3>
        </td>
    </tr>`;
}


// Ayarlar

// Zar adeti
const dicesBtns = Array.from(document.querySelectorAll(".dice-btn"));
dicesBtns[numberOfDice - 1].classList.add("dice-btn-actived");
dicesBtns.forEach((button, index) => {
    button.addEventListener("click", () => {
        dicesBtns[index].classList.add("dice-btn-actived");
        dicesBtns[numberOfDice - 1].classList.remove("dice-btn-actived");
        numberOfDice = index + 1;
    }
    )
});


// Zar Rengi Ayarları
const dicesBtnsDesign = Array.from(document.querySelectorAll(".dice-btn-design"));

let diceDesignNumber = 0;
const diceDesignColors = ["white", "red", "blue", "yellow", "green", "orange", "#E89EB8", "#7f00ff"];

dicesBtnsDesign[0].classList.add("dice-btn-design-actived");

dicesBtnsDesign.forEach((button, index) => {
    dicesBtnsDesign[index].style.backgroundColor = diceDesignColors[index];
    button.addEventListener("click", () => {
        dicesBtnsDesign[index].classList.add("dice-btn-design-actived");
        dicesBtnsDesign[diceDesignNumber].classList.remove("dice-btn-design-actived");
        diceDesignNumber = index;
        document.documentElement.style.setProperty("--dice-background-color", diceDesignColors[index]);
    }
    )
});

// Arkaplan Tasarım Seçimi

const backgroundBtnsDesign = Array.from(document.querySelectorAll(".background-pattern-btn"));
let backgroundDesignNumber = 0;

backgroundBtnsDesign[0].classList.add("background-design-btn-actived");

// Arkaplan Renk Takımları
let backgroundColorOne = "#e9e9e9";
let backgroundColorTwo = "#ffffff";
let backgroundPatternSize = 64;

// Desenler
backgroundBtnsDesign.forEach((button, index) => {
    document.body.style = "";
    document.body.style.padding = "0px";


    button.addEventListener("click", () => {

        changeBackgroundDesign(index);
        backgroundBtnsDesign[index].classList.add("background-design-btn-actived");
        backgroundBtnsDesign[backgroundDesignNumber].classList.remove("background-design-btn-actived");
        backgroundDesignNumber = index;
    })
});

function changeBackgroundDesign(index) {
    switch (index) {
        case 0:
            document.body.style.backgroundImage = `repeating-conic-gradient(${backgroundColorOne} 0% 25%, ${backgroundColorTwo} 0% 50%)`;
            document.body.style.backgroundPosition = "0 0, 32px 32px";
            document.body.style.backgroundSize = `${backgroundPatternSize}px ${backgroundPatternSize}px`;
            break;
        case 1:
            document.body.style.background = `repeating-conic-gradient(from 45deg, ${backgroundColorOne} 0% 25%, ${backgroundColorTwo} 0% 50%)`;
            document.body.style.backgroundSize = `${backgroundPatternSize}px ${backgroundPatternSize}px`;
            break;
        case 2:
            document.body.style.backgroundImage = `linear-gradient(${backgroundColorOne} 2px, transparent 2px), linear-gradient(to right, ${backgroundColorOne} 2px, transparent 2px)`;
            document.body.style.backgroundColor = backgroundColorTwo;
            document.body.style.backgroundSize = `${backgroundPatternSize}px ${backgroundPatternSize}px`;
            break;
        case 3:
            document.body.style.backgroundImage = `repeating-linear-gradient(45deg, ${backgroundColorOne} 0, ${backgroundColorTwo} 2px, transparent 0, transparent 50%)`;
            document.body.style.backgroundColor = backgroundColorTwo;
            document.body.style.backgroundSize = `${backgroundPatternSize}px ${backgroundPatternSize}px`;
            break;
        case 4:
            document.body.style.backgroundImage = `linear-gradient(90deg, transparent 50%, ${backgroundColorOne} 50%)`;
            document.body.style.backgroundColor = backgroundColorTwo;
            document.body.style.backgroundSize = `${backgroundPatternSize}px ${backgroundPatternSize}px`;
            break;
        case 5:
            document.body.style.background = `repeating-linear-gradient(45deg, transparent, transparent ${backgroundPatternSize}px, ${backgroundColorOne} ${backgroundPatternSize}px, ${backgroundColorOne} ${backgroundPatternSize * 2}px)`;
            document.body.style.backgroundColor = backgroundColorTwo;
            break;
        default:
            document.body.style.backgroundImage = `repeating-conic-gradient(${backgroundColorOne} 0% 25%, ${backgroundColorTwo} 0% 50%)`;
            document.body.style.backgroundPosition = "0 0, 32px 32px";
            document.body.style.backgroundSize = `${backgroundPatternSize}px ${backgroundPatternSize}px`;
            break;
    }
};
// Renk Buttonları

const backgroundColorBtn = Array.from(document.querySelectorAll(".background-color-btn"));
let backgroundColorBtnNumber = 0;

backgroundColorBtn[0].classList.add("background-design-btn-actived");

backgroundColorBtn.forEach((button, index) => {

    button.addEventListener("click", () => {
        backgroundColorBtn[index].classList.add("background-design-btn-actived");
        backgroundColorBtn[backgroundColorBtnNumber].classList.remove("background-design-btn-actived");
        backgroundColorBtnNumber = index;

        switch (index) {
            case 0:
                backgroundColorOne = "#e9e9e9";
                backgroundColorTwo = "#ffffff";
                break;
            case 1:
                backgroundColorOne = "#3C3C3C";
                backgroundColorTwo = "#D3D3D3";
                break;
            case 2:
                backgroundColorOne = "#2D3436";
                backgroundColorTwo = "#FDCB6E";
                break;
            case 3:
                backgroundColorOne = "#FF6B6B";
                backgroundColorTwo = "#1E90FF";
                break;
            case 4:
                backgroundColorOne = "#D2691E";
                backgroundColorTwo = "#F5DEB3";
                break;
            case 5:
                backgroundColorOne = "#8A2BE2";
                backgroundColorTwo = "#00CED1";
                break;
            default:
                backgroundColorOne = "#e9e9e9";
                backgroundColorTwo = "#ffffff";
                break;
        }
        changeBackgroundDesign(backgroundDesignNumber);
    });
});

const backgroundPatternSizeBtn = Array.from(document.querySelectorAll(".background-pattern-size-btn"));
let backgroundPatternSizeBtnNumber = 2;

backgroundPatternSizeBtn[backgroundPatternSizeBtnNumber].classList.add("background-design-btn-actived");

backgroundPatternSizeBtn.forEach((button, index) => {

    button.addEventListener("click", () => {
        backgroundPatternSizeBtn[index].classList.add("background-design-btn-actived");
        backgroundPatternSizeBtn[backgroundPatternSizeBtnNumber].classList.remove("background-design-btn-actived");
        backgroundPatternSizeBtnNumber = index;

        switch (index) {
            case 0:
                backgroundPatternSize = 16;
                break;
            case 1:
                backgroundPatternSize = 32;
                break;
            case 2:
                backgroundPatternSize = 64;
                break;
            case 3:
                backgroundPatternSize = 128;
                break;
            case 4:
                backgroundPatternSize = 256;
                break;
            default:
                break;
        }

        changeBackgroundDesign(backgroundDesignNumber);
    });
});


const themeDesignBtn = Array.from(document.querySelectorAll(".theme-design-btn"));
themeDesignBtnNumber = 0;
themeDesignBtn[themeDesignBtnNumber].classList.add("background-design-btn-actived");
themeDesignBtn.forEach((button, index) => {
    button.addEventListener("click", () => {
        const statisticImg = document.querySelector(".statistic-img");
        const settingImg = document.querySelector(".setting-img");

        themeDesignBtn[index].classList.add("background-design-btn-actived");
        themeDesignBtn[themeDesignBtnNumber].classList.remove("background-design-btn-actived");

        themeDesignBtnNumber = index;

        switch (index) {
            case 0:
                statisticImg.src = "https://img.icons8.com/?size=28&id=98076&format=png&color=000000";
                settingImg.src = "https://img.icons8.com/?size=28&id=2969&format=png&color=000000";
                document.body.classList = "";
                document.body.classList.add("light-theme");
                break;
            case 1:
                statisticImg.src = "https://img.icons8.com/?size=28&id=98076&format=png&color=ffffff";
                settingImg.src = "https://img.icons8.com/?size=28&id=2969&format=png&color=ffffff";
                document.body.classList = "";
                document.body.classList.add("dark-theme");
                break;
            case 2:
                statisticImg.src = "https://img.icons8.com/?size=28&id=98076&format=png&color=ffffff";
                settingImg.src = "https://img.icons8.com/?size=28&id=2969&format=png&color=ffffff";
                document.body.classList = "";
                document.body.classList.add("gray-theme");
                break;
            case 3:
                statisticImg.src = "https://img.icons8.com/?size=28&id=98076&format=png&color=ffffff";
                settingImg.src = "https://img.icons8.com/?size=28&id=2969&format=png&color=ffffff";
                document.body.classList = "";
                document.body.classList.add("blue-theme");
                break;

            default:
                break;
        }
    });
});

const diceDotDesignBtn = Array.from(document.querySelectorAll(".dice-dot-design-btn"));

diceDotDesignBtn.forEach((button, index) => {

    button.addEventListener("click", () => {
        switch (index) {
            case 0:
                document.documentElement.style.setProperty("--dice-dot-bg-color", "black");
                break;
            case 1:
                document.documentElement.style.setProperty("--dice-dot-bg-color", "burlywood");
                break;
            case 2:
                document.documentElement.style.setProperty("--dice-dot-bg-color", "darkgreen");
                break;
            case 3:
                document.documentElement.style.setProperty("--dice-dot-bg-color", "darkmagenta");
                break;
            default:
                document.documentElement.style.setProperty("--dice-dot-bg-color", "black");
                break;
        }
    });
});
