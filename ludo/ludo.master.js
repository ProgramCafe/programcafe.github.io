
(function () {
    console.log('Welocme!');

    document.addEventListener('DOMContentLoaded', (event) => {
        drawGame();

    });
    
}
)();

function drawGame()
{
    var divOuter = document.createElement('div');
    divOuter.setAttribute('class', 'outer');

    
    for (var row = 0; row < 15 ; row++)
    {
        var divRow = document.createElement('div');
        divRow.setAttribute('class', 'row');
        var column = 0;

        while (column < 15) {
            var block = document.createElement('span');
            highightEntranceBlock(block, row, column);
            //Append all 15 columns into each row
            divRow.appendChild(block);
            column++;
        }
        //Append Each Row
        divOuter.appendChild(divRow);        
    }
    document.getElementById('platform').appendChild(divOuter);

    //Now Draw play home
    drawPlayerHome();
    addArrows();
    homeWhitePlate();
    
}

function drawPlayerHome()
{
    var $rows = document.getElementsByClassName('row');
    
    if ($rows.length > 0)
    {
        var isGreen = false;
        var isBlue = false;
        var isYellow = false;
        var isRed = false;

        var index = 0;
        while (index < $rows.length)
        {
            var $blocks = $rows[index].children;
            for (var i = 0; i < $blocks.length; i++) {

                isGreen = (index < 6 & i < 6) ? true : false;
                isYellow = (index < 6 & i > 8) ? true : false;
                isRed = (index > 8 & i < 6) ? true : false;
                isBlue = (index > 8 & i > 8) ? true : false;
                
                var class_name = ((((isGreen) ? 'home-green' : (isYellow) ? 'home-yellow' : (isRed) ? 'home-red' : (isBlue) ? 'home-blue' : 'default')));
                $blocks[i].classList.add(class_name);
            }
            index++;
        }
    }   

}


function highightEntranceBlock(element, rowindex, colIndex) {

    var isYellow = ((rowindex > 0 && rowindex <= 5) && (colIndex == 7));
    var isGreen = ((rowindex === 7) && (colIndex > 0 && colIndex <= 5));
    var isRed = ((rowindex > 8 && rowindex <= 13) && (colIndex == 7));
    var isBlue = ((rowindex === 7) && (colIndex > 8 && colIndex <= 13));
    var value = ((((isGreen) ? 'green' : (isYellow) ? 'yellow' : (isRed) ? 'red' : (isBlue) ? 'blue' : '')));

    if (isYellow || isGreen || isRed || isBlue) {
        element.setAttribute('data-entrance', value);
    }

    higlighHomeStamp(element, rowindex, colIndex);
    highlightOuterStamp(element, rowindex, colIndex);
    drawEntranceArrow(element, rowindex, colIndex);

}

function higlighHomeStamp(element, rowindex, colIndex) {

    var isYellow = (rowindex === 1 && colIndex === 8);
    var isGreen = (rowindex === 6 && colIndex === 1);
    var isBlue = (rowindex === 8 && colIndex === 13);
    var isRed = (rowindex === 13 && colIndex === 6);
    var value = ((((isGreen) ? 'green' : (isYellow) ? 'yellow' : (isRed) ? 'red' : (isBlue) ? 'blue' : '')));
    element.setAttribute('data-stamp', value);
}

function highlightOuterStamp(element, rowindex, colIndex) {
    var isGreen = (rowindex === 2 && colIndex === 6);
    var isYellow = (rowindex === 6 && colIndex === 12);
    var isBlue = (rowindex === 12 && colIndex === 8);
    var isRed = (rowindex === 8 && colIndex === 2);

    if (isGreen || isYellow || isRed || isBlue) {
       element.setAttribute('data-outer-stamp', 'stamp-common');
    }
}


//Add Arrows to construct Home
function addArrows()
{
    var arrows = ['arrow-green', 'arrow-yellow', 'arrow-red', 'arrow-blue'];
    var divArrowContainer = document.createElement('div');

    for (var i = 0; i < arrows.length; i++) {
        var arrowDiv = document.createElement('div');
        arrowDiv.setAttribute('class', arrows[i]);
        divArrowContainer.appendChild(arrowDiv);
    }

    var $outer = document.getElementsByClassName('outer')[0];
    $outer.appendChild(divArrowContainer);
}

function homeWhitePlate()
{
    var color = ['green', 'yellow', 'red', 'blue']
    for (var index = 0; index < color.length; index++) {
        var $elements = document.getElementsByClassName('home-' + color[index]);
        var startIndex = 6;
        for (var i = 1; i < 5; i++) {
            for (var j = 0; j < 6; j++) {
                if (j != 0 && j != 5) {
                    $elements[startIndex].classList.add('white-plate');
                }
                startIndex++;

            }
        }
    }

    markHomeDicePlace();
}

function markHomeDicePlace() {
    var color = ['green', 'yellow', 'red', 'blue']
    for (var index = 0; index < color.length; index++) {
        var $whiteBlocks = document.getElementsByClassName('home-' + color[index] + ' white-plate');
        $whiteBlocks[0].classList.add(color[index]);
        $whiteBlocks[3].classList.add(color[index]);
        $whiteBlocks[12].classList.add(color[index]);
        $whiteBlocks[15].classList.add(color[index]);
        
    }
}


function drawEntranceArrow(element,rowindex,colIndex)
{
    var forYellow = (rowindex === 0 && colIndex === 7);
    var forBlue = (rowindex === 7 && colIndex === 14);
    var forGreen = (rowindex === 7 && colIndex === 0);
    var forRed = (rowindex === 14 && colIndex === 7);

    if (forGreen || forYellow || forRed || forBlue) {

        var color_class = (((forGreen)? 'green' : (forYellow) ? 'yellow' : (forBlue) ? 'blue' : 'red'))
        var iTag = document.createElement('i');
        iTag.setAttribute('class', 'entrance-arrow '+ color_class);
        element.appendChild(iTag);
    }

}