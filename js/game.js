const phrases = [
    'it takes more muscles to frown than to smile',
    'it is always darkest before the dawn',
    'practice makes perfect',
    'a watched pot never boils',
    'actions speak louder than words',
    'better late than never',
    'if you play with fire you will get burned',
    'knowledge is power',
    'laughter is the best medicine',
    'time is money'
];

let missed = 0;
let matchedLetters = 0;

const hearts = `<ol>
<li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
<li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
<li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
<li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
<li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
</ol>`

$('.btn__reset').on('click', () => {
    $('#overlay').hide();

    const activePhrase = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(activePhrase);
});

const getRandomPhraseAsArray = (array) => {
    let randomIndex = Math.floor(Math.random() * array.length);
    let randomPhrase = array[randomIndex];

    let randomPhraseArray = randomPhrase.split(' ');

    return randomPhraseArray;
};

const addPhraseToDisplay = (array) => {
    for (let i = 0; i < array.length; i++) {
        getLetterDiv(array[i]); 
    }

    missed = 0;
    matchedLetters = 0;
    $('ol').html(hearts);
};


/*
I  place lis with letters inside divs;
Every div is a word;
I do it because I noticed when words don't have enough room on a line 
they break and it looks ugly;
I set the divs display to inline-block and now if a word doesn't fit it goes 
on the next line, all of it;
*/

const getLetterDiv = (word) => {
  
        const div = $('<div></div>');
        div.textContent = word;

        $('#phrase ul').append(div);

        const splitDiv = div.textContent.split('');
        div.textContent = '';

        for (let i = 0; i < splitDiv.length; i++) {
            const li = $('<li></li>');
            li.text(splitDiv[i]);
            li.addClass('letter');
            div.append(li);
        } 
};



/*
in this function there're two variables for counting guessed letters;
score and matchedLetters;
score is used in the scope of one guess to check if the user 
guessed correctly;
it always zeros out when the next letter is being checked;
matchedLetters is used in the global scope to count all guessed letters
per game, compare their number with the number of phrase letters and check 
the wining condition;
*/ 

const checkLetter = (key) => {
   const letters = $('.letter');
   let score = 0;

   for (let i = 0; i < letters.length; i++) {
       let li = $(letters[i]);
       let letter = $(letters[i]).text();

       if (key === letter) {
          li.addClass('show');
          matchedLetters++;
          score++;
       } 
   }

   lose(score);
   win(matchedLetters);
};

$('.keyrow').on('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        $(e.target).addClass('chosen').attr('disabled', 'true');
        const letter = $(e.target).text();
   
        checkLetter(letter);
  }
}
);

const lose = (score) => {
    if (score === 0) {
        missed++;
        if ($('.tries').length !== 0) {
          $('.tries')[0].remove();
        } else {
            $('#overlay').show().removeClass('win').addClass('lose');
            $('#overlay h2').text('YOU LOST');
            $('#overlay a').text('Another Game');
 
            reset($('button'), $('#phrase ul div'));
            
        }
    }
};

const win = (matchedLetters) => {
    if ($('ul li').length === matchedLetters) {
            
        $('#overlay').show().removeClass('lose').addClass('win');
        $('#overlay h2').text('YOU WON!');
        $('#overlay a').text('Another Game');
        
        reset($('button'), $('#phrase ul div'));
 
    }
};

const reset = (btnCollection, phrase) => {
    for (let i = 0; i < btnCollection.length; i++) {
        let btn = btnCollection[i];
        if (btn.className === 'chosen') {
           $(btn).prop('disabled', false);
           $(btn).removeClass('chosen');
        }
    }

    $(phrase).remove();
};