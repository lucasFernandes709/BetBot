function openBets() {
    const wallet = document.querySelectorAll('.wallet > *');
    if (wallet[1].style.display == 'flex') {
        return closeBets();
    }
    wallet.forEach(element => {
        if (element.tagName !== "HEADER") {
            element.style.display = "flex";
        }
    })
}

function closeBets() {
    const wallet = document.querySelectorAll('.wallet > *');
    wallet.forEach(element => {
        if (element.tagName !== "HEADER") {
            element.style.display = "none";
        }
    })
}

function clearBets() {
    const bets = document.querySelectorAll('.wallet li');
    bets.forEach(element => {
        element.style.display = "none";
    })
    document.querySelector(
        '.wallet .wallet-balance p + p'
    ).textContent = "R$0,00"

    const account = JSON.parse(
        localStorage.getItem('account'));
    account.search = [];
    localStorage.setItem('account', JSON.stringify(account));

    document.querySelectorAll('.operation input').forEach(
        element => {
            element.checked = false;
            element.value = '';
    })
}

function addBet(betTitle, betInfo) {
    function createCloseButton() {
        const closeBet = document.createElement("button");
        const closeImg = document.createElement("img");
        closeBet.className = "close-bet";
        closeImg.src = "images/x.svg";
        closeBet.appendChild(closeImg)
        return closeBet;    
    }
    function createInfos() {
        const infos = document.createElement("div");
        infos.className = "bet-information";
        infos.appendChild(createText(betTitle));
        infos.appendChild(createText(betInfo));
        return infos;
    }
    function createText(text) {
        const p = document.createElement("p");
        p.textContent = text
        return p
    }
    function createInput() {
        const input = document.createElement("input");
        input.type = "text";
        input.className = "bet-value";
        input.placeholder = "Valor de Aposta";
        input.addEventListener('input', function() {
            moneyFormatter(input) 
            calculateAmount();
        })
        input.oninput = "moneyFormatter(this)";
        return input;
    }
    const bets = document.querySelector('.wallet ul');
    const newBet = document.createElement("li");
    newBet.appendChild(createCloseButton());
    newBet.appendChild(createInfos());
    newBet.appendChild(createInput());
    bets.appendChild(newBet);

    const counter = document.querySelector(
        '.wallet .wallet-counter');
    counter.textContent = parseInt(counter.textContent) + 1;
}

function removeBet(betTitle, betInfo) {
    const bets = document.querySelectorAll('.wallet li');
    bets.forEach(bet => {
        const [title, option] = bet.querySelectorAll("p");
        if (title.textContent === betTitle && 
            option.textContent === betInfo) {
            document.querySelector(
                '.wallet ul'
            ).removeChild(bet)
        }
    })
    const counter = document.querySelector(
        '.wallet .wallet-counter');
    counter.textContent = parseInt(counter.textContent) - 1;
}

function calculateAmount() {
    const inputs = document.querySelectorAll('.wallet input');
    let amount = 0;
    inputs.forEach(input => {
        if (input.value !== "") {
            amount += parseFloat(input.value.replace(
                "R$", ""
            ).replace(",", "."));
        }
    })
    document.querySelector(
        '.wallet .wallet-balance p + p'
    ).textContent = `R$${amount.toFixed(2)}`
}