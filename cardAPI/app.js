
// Request for a single card
$(function () {
    let baseURL = 'https://deckofcardsapi.com/api/deck';

    axios.get(`${baseURL}/new/draw`)
        .then(res => {
            let drawInfo = res.data.cards[0];
            let value = drawInfo.value;
            let suit = drawInfo.suit
            console.log(`${value} of spades is ${suit}`)
        })

    // Drawing one more card from the same deck.
    let firstCard = null;
    axios.get(`${baseURL}/new/draw/`)
        .then(data => {
            firstCard = data.data.cards[0];
            let deckId = data.data.deck_id
            return $.getJSON(`${baseURL}/${deckId}/draw/`);
        })
        .then(data => {
            console.log(data.cards[0])
            let secondCard = data.cards[0];
            [firstCard, secondCard].forEach(function (card) {
                console.log(
                    `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
            });
        })

    let deckId = null;
    let $btn = $('button');
    let $cardArea = $('#card-area');

    axios.get(`${baseURL}/new/shuffle/`).then(data => {
        deckId = data.deck_id;
        $btn.show();
    });

    $btn.on('click', function () {
        axios.get(`${baseURL}/${deckId}/draw/`).then(data => {
            let cardSrc = data.cards[0].image;
            let angle = Math.random() * 90 - 45;
            let randomX = Math.random() * 40 - 20;
            let randomY = Math.random() * 40 - 20;
            $cardArea.append(
                $('<img>', {
                    src: cardSrc,
                    css: {
                        transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                    }
                })
            );
            if (data.remaining === 0) $btn.remove();
        });
    });


});


