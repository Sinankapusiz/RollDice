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
        // Rastgele üretilen sayıya(random) göre zar oluşturulurup, zar değişkenine(dice) atanıyor. 
        const dice = createDice(random);

        // Oluşturulan rastgele zar(dice), zarları içerecek div'e(diceContainer) "child" olarak ekleniyor. 
        diceContainer.appendChild(dice);
    }
}

const NUMBER_OF_DICE = 5;
const diceContainer = document.querySelector(".dice-container");
const btnRollDice = document.querySelector(".btn-roll-dice");

btnRollDice.addEventListener("click", () => {
    const interval = setInterval(() => {
        randomizeDice(diceContainer, NUMBER_OF_DICE);
    }, 50);
    setTimeout(() => clearInterval(interval), 1000);
});
