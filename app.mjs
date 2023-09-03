const cells = document.querySelectorAll('.container > div > div');
const outer_cells = document.querySelectorAll('.container > div');
const play_area = [0,1,2,3,4,5,6,7,8];
const unplay_area = [];
const color = "violet";
let vari = 'O';
function text(){
    if(vari == 'O')
    {
        vari = 'X';
        return 'X';
    }
    else
    {
        vari = 'O';
        return 'O';
    }
}
const Celebrate = (col) => {
    let txt;
    if(col == 'green')
        txt = 'Player 1 won';
    if(col == 'blue')
        txt = 'Player 2 won';
    document.querySelector('h2').innerText = `${txt}`;
    return;
}
let winner;
function check_for_end(){
    for(let p of ['p1', 'p2'])
    {
        const a = outer_cells[0].classList.contains(`${p}`)?1:0;
        const b = outer_cells[1].classList.contains(`${p}`)?1:0;
        const c = outer_cells[2].classList.contains(`${p}`)?1:0;
        const d = outer_cells[3].classList.contains(`${p}`)?1:0;
        const e = outer_cells[4].classList.contains(`${p}`)?1:0;
        const f = outer_cells[5].classList.contains(`${p}`)?1:0;
        const g = outer_cells[6].classList.contains(`${p}`)?1:0;
        const h = outer_cells[7].classList.contains(`${p}`)?1:0;
        const i = outer_cells[8].classList.contains(`${p}`)?1:0;
        if(a*b*c + d*e*f + g*h*i + a*e*i + c*e*g + a*d*g + b*e*h + c*f*i)
        {
            winner = `${p}`;
        }
    }
    let win_col;
    if(winner)
    {
        if(winner == 'p1')
            win_col = 'green';
        if(winner == 'p2')
            win_col = 'blue';
        for(let cell of outer_cells)
        {
            cell.classList.remove('available')
        }
        console.log(win_col)
        Celebrate(win_col);
    }
    return;
}
function check_for_area(){
    for(let cell of outer_cells)
    {
        const a = cell.children[0].innerText;
        const b = cell.children[1].innerText;
        const c = cell.children[2].innerText;
        const d = cell.children[3].innerText;
        const e = cell.children[4].innerText;
        const f = cell.children[5].innerText;
        const g = cell.children[6].innerText;
        const h = cell.children[7].innerText;
        const i = cell.children[8].innerText;
        if(( a == 'X' && b == 'X' && c == 'X') ||
        ( d == 'X' && e == 'X' && f == 'X') ||
        ( g == 'X' && h == 'X' && i == 'X') ||
        ( a == 'X' && d == 'X' && g == 'X') ||
        ( b == 'X' && e == 'X' && h == 'X') ||
        ( c == 'X' && f == 'X' && i == 'X') ||
        ( a == 'X' && e == 'X' && i == 'X') ||
        ( c == 'X' && e == 'X' && g == 'X'))
        {
            //Player 1 won
            cell.classList.add('p1');
            cell.style.backgroundColor = 'green';
        }
        if(( a == 'O' && b == 'O' && c == 'O') ||
        ( d == 'O' && e == 'O' && f == 'O') ||
        ( g == 'O' && h == 'O' && i == 'O') ||
        ( a == 'O' && d == 'O' && g == 'O') ||
        ( b == 'O' && e == 'O' && h == 'O') ||
        ( c == 'O' && f == 'O' && i == 'O') ||
        ( a == 'O' && e == 'O' && i == 'O') ||
        ( c == 'O' && e == 'O' && g == 'O'))
        {
            //Player 2 won
            cell.classList.add('p2');
            cell.style.backgroundColor = 'blue';
        }
    }
    for(let ele of play_area)
    {
        if(outer_cells[ele].classList.contains('p1') || outer_cells[ele].classList.contains('p2'))
        {
            unplay_area.push(ele);
            const ind = play_area.indexOf(ele);
            if(ind > -1)
            {
                play_area.splice(ind, 1);
            }
        }
    }
    return;
}
function flow(cell){
    let stat,r,c;
    if(!cell)
    {
        stat = 9;
        state(9)
        return;
    }
    if(cell.classList.contains('fr'))
        r = 1;
    else if(cell.classList.contains('sr'))
        r = 2;
    else
        r = 3;
    if(cell.classList.contains('fc'))
        c = 1;
    else if(cell.classList.contains('sc'))
        c = 2;
    else
        c = 3;
    stat = 3 * (r - 1) + c - 1;
    const ch = play_area.indexOf(stat);
    if(ch == -1)
    {
        stat = 9;
    }
    state(stat)
    return;
}
function state(num)
{
    document.querySelector(".container").style.backgroundColor = `black`;
    for(let cell of outer_cells)
    {
        cell.classList.remove('available');
        if(!(cell.classList.contains('p1')||cell.classList.contains('p2')))
        cell.style.backgroundColor = "black";
    }
    if(num == 0)
    {
        document.querySelector(".FR.FC").style.backgroundColor = `${color}`;
        document.querySelector(".FR.FC").classList.add('available');   
    }
    else if(num == 1)
    {
        document.querySelector(".FR.SC").style.backgroundColor = `${color}`;
        document.querySelector(".FR.SC").classList.add('available');
    }
    else if(num == 2)
    {
        document.querySelector(".FR.TC").style.backgroundColor = `${color}`;        
        document.querySelector(".FR.TC").classList.add('available');        
    }
    else if(num == 3)
    {
        document.querySelector(".SR.FC").style.backgroundColor = `${color}`;
        document.querySelector(".SR.FC").classList.add('available');
    }
    else if(num == 4)
    {
        document.querySelector(".SR.SC").style.backgroundColor = `${color}`;
        document.querySelector(".SR.SC").classList.add('available');
    }
    else if(num == 5)
    {
        document.querySelector(".SR.TC").style.backgroundColor = `${color}`;
        document.querySelector(".SR.TC").classList.add('available');
    }
    else if(num == 6)
    {
        document.querySelector(".TR.FC").style.backgroundColor = `${color}`;
        document.querySelector(".TR.FC").classList.add('available');
    }
    else if(num == 7)
    {
        document.querySelector(".TR.SC").style.backgroundColor = `${color}`;
        document.querySelector(".TR.SC").classList.add('available');
    }
    else if(num == 8)
    {
        document.querySelector(".TR.TC").style.backgroundColor = `${color}`;
        document.querySelector(".TR.TC").classList.add('available');
    }
    else
    {
        for(let cell of outer_cells)
        {
            if(!(cell.classList.contains('p1')||cell.classList.contains('p2')))
            {
                cell.style.backgroundColor = `${color}`;
                cell.classList.add('available');
            }
        }
    }
    return;
}
for(let cell of cells)
{
    cell.addEventListener('dblclick',() => {
        if((cell.innerText != 'X') && (cell.innerText != 'O') && !((cell.parentElement.classList.contains('p1') || cell.parentElement.classList.contains('p2'))))
        {
            if(cell.parentElement.classList.contains('available'))
            {
                if(!winner)
                {
                    cell.innerText = text();
                    check_for_area();
                    check_for_end();
                    flow(cell);
                }
            }
        }
    })
}
flow();
for(let cell of outer_cells)
{
    cell.classList.add('available');
}