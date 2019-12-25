let secOneGuess = []
let secTwoGuess = []
let secOneResult = []
let secTwoResult = []
let guessOneWin = [] //猜中第一區的陣列
let guessTwoWin = [] //猜中第二區的陣列
let count = 0 //用來確認6個數字迴圈做了幾次,確保確認重覆數字的部分有被執行
const dataPanel = document.querySelector('#data-panel')
const option = document.querySelector('#option')

function playGame() {
  let x = confirm('要電腦選號嗎??')
  if (x) {
    randomResult(secOneGuess, secTwoGuess)
    option.innerHTML = `<h3>電腦選號猜獎結果</h3>`
  } else {
    for (i = 0; i <= 5; i++) {
      let assignNoOne = Number(prompt(`來下注威力彩吧! 請輸入第一區第${i + 1}個數字(1-38)`))
      //如何將判斷已重覆的數字 不要push進去呢? 處理方式, 將repeatNPushOne()放在判斷完<38, >1 push前, 由repeatNPushOne來統一push
      if (assignNoOne > 38 || assignNoOne < 1 || !Number.isInteger(assignNoOne)) {
        console.log('wrong input, please reassign a number between 1-38')
        i--
      } else {
        repeatNPushOne(secOneGuess, assignNoOne)
      }
    }
    for (let asNoTwo = 0; asNoTwo < 1; asNoTwo++) {
      let secTwo = Number(prompt('來下注威力彩吧! 請輸入一個第二區數字1-8)'))
      if (secTwo > 8 || secTwo < 1 || !Number.isInteger(secTwo)) {
        console.log('wrong input, please reassign a number between 1-8')
        asNoTwo--
      } else {
        secTwoGuess.push(secTwo)
      }
    }
    option.innerHTML = `<h3>自行選號猜獎結果</h3 >`
  }
  randomResult(secOneResult, secTwoResult)
  Correct(secOneGuess, secOneResult, guessOneWin) //第二區猜中多少 guessCorrectOne()
  Correct(secTwoGuess, secTwoResult, guessTwoWin) //第二區猜中多少 guessCorrectTwo()
  let htmlContet = `
    <h4>...開獎號碼...</h4>
    <div>第一區開獎數字為: ${secOneResult}</div>
    <div>第一區開獎數字為(由小到大): ${secOneResult.sort(comSort)}</div>
    <div>第二區開獎數字為: ${secTwoResult}</div>
    <h5>...玩家的選號...</h5>
    <div>第一區選號數字為: ${secOneGuess}</div>
    <div>第一區選號數字為(由小到大): ${secOneGuess.sort(comSort)}</div>
    <div>第二區選號數字為: ${secTwoGuess}</div>
    <h5>遊戲結果 : ${result()}</h5>
    <div>玩家猜中第一區${guessOneWin.length}個數字, 號碼為: ${guessOneWin}, 第二區${guessTwoWin.length}個數字, 號碼為:${guessTwoWin}</div>
`
  dataPanel.innerHTML = htmlContet
}

// 建立隨機號碼產生函式 !! 就只要專注做產生隨機號碼, 判斷的處理到另一個地方做
function randomNo(max, min) {
  return (Math.floor(Math.random() * (max - min + 1) + min))
}

//隨機選號函式, 投注電腦選號&開獎結果第一區6個數字,第二區1個數字函式, 並呼叫repeatNPushOne function判斷是否有重覆
function randomResult(arya, aryb) {
  for (i = 0; i <= 5; i++) {
    let rand = randomNo(38, 1) //隨機數字產生 第一區(1-38)
    repeatNPushOne(arya, rand)
  }
  aryb.push(sectoionTwoRandom())
}

// 第二區隨選, 1-8數字, 電腦或玩家皆可
function sectoionTwoRandom() {
  let two = randomNo(8, 1) //隨機數字產生 第一區(1-8)
  return two
}

// 找出重覆的隨機數字函式, 不要放入陣列中
function repeatNPushOne(ary, r) {
  // 如何找出重複然後去掉, 用indexOf 來確認
  if (ary.indexOf(r) < 0) { //若array裡已經有包含rand這個數字(產生了重覆的數字)就會回傳>0, 沒有重覆就回傳-1
    ary.push(r)
  } else {
    i -= 1 //發現數列裡有重覆數字, 重做
  }
  count++
}

// 第一區是否猜中函式, 用3個參數(陣列)呼叫判斷函式
/* function guessCorrectOne() {
  Correct(secOneGuess, secOneResult, guessOneWin)
}

//第二區是否猜中函式, 用3個參數(陣列)呼叫判斷函式
function guessCorrectTwo() {
  Correct(secTwoGuess, secTwoResult, guessTwoWin)
}
*/

// 判斷猜中數字的函式 有三個參數, 玩家猜的陣列, 開獎結果陣列, 及猜中數字陣列
function Correct(ary1, ary2, ary3) {
  for (let corr in ary2) {
    if (ary1.includes(ary2[corr])) {
      ary3.push(ary2[corr])
    }
  }
}

// 排列數字由小到大的函式, 除錯及美觀
function comSort(a, b) {
  return a - b
}

//結果判斷函式
function result() {
  let prize = ''
  let g2L = guessTwoWin.length
  let g1L = guessOneWin.length

  if (g2L === 1) {
    if (g1L === 1) {
      prize = '普獎! 獎金 1百元'
    } else if (g1L === 2) {
      prize = '捌獎! 獎金 2百元'
    } else if (g1L === 3) {
      prize = '柒獎! 獎金 4百元'
    } else if (g1L === 4) {
      prize = '伍獎! 獎金 4千元'
    } else if (g1L === 5) {
      prize = '參獎! 獎金 15萬元'
    } else if (g1L === 6) {
      prize = '頭獎!!!!! 獎金 1億元'
    } else if (g1L === 0) {
      prize = '沒中......'
    }
  } else if (g1L === 3) {
    prize = '玖獎! 獎金 1百元'
  } else if (g1L === 4) {
    prize = '陸獎! 獎金 8百元'
  } else if (g1L === 5) {
    prize = '肆獎! 獎金 兩萬元'
  } else if (g1L === 6) {
    prize = '貳獎! 獎金 1千兩百萬元'
  } else {
    prize = '沒中......'
  }
  console.log(prize)
  return prize
}

// 執行
playGame()

// 顯示結果 console.log

console.log(`第一區開獎數字為: ${secOneResult}`)
console.log(secOneResult)
secOneResult.sort(comSort)
console.log(`第一區開獎數字為(由小到大): ${secOneResult}`)
console.log(secOneResult)
console.log(`第二區開獎數字為: ${secTwoResult}`) //隨機數字產生 第二區(1-8)
console.log('...玩家的選號...')
console.log(`第一區選號數字為: ${secOneGuess}`)
console.log(secOneGuess)
secOneGuess.sort(comSort)
console.log(`第一區選號數字為(由小到大): ${secOneGuess}`)
console.log(secOneGuess)
console.log(`共做了幾次重覆驗算(變成相加了, 沒關係這個會去掉)? ${count}`)
console.log(`第二區選號數字為: ${secTwoGuess}`) //隨機數字產生 第二區(1-8)
console.log(`...玩家猜中第一區${guessOneWin.length}個數字, 號碼為: ${guessOneWin}, 第二區${guessTwoWin.length}個數字, 號碼為:${guessTwoWin}`)
console.log('=== 遊戲結果 ===')
result()