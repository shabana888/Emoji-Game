/* 
Quick Tip 

- Use the below function in the EmojiGame Component to shuffle the emojisList every time when an emoji is clicked.

const shuffledEmojisList = () => {
  const {emojisList} = this.props
  return emojisList.sort(() => Math.random() - 0.5)
}

*/

// Write your code here.
import {Component} from 'react'

import EmojiCard from '../EmojiCard'
import NavBar from '../NavBar'
import WinOrLoseCard from '../WinOrLoseCard'

import './index.css'

class EmojiGame extends Component {
  state = {
    clickedEmojisList: [],
    isGameInProgress: true,
    topScore: 0,
  }

  resetGame = () => {
    this.setState({clickedEmojisList: [], isGameInProgress: true})
  }

  renderScoreCard = () => {
    const {emojisList} = this.props
    const {clickedEmojisList} = this.state
    const isWon = clickedEmojisList.length === emojisList.length

    return (
      <WinOrLoseCard
        isWon={isWon}
        score={clickedEmojisList.length}
        onClickPlayAgain={this.resetGame}
      />
    )
  }

  finishGameAndSetTopScore = currentScore => {
    const {topScore} = this.state
    let newTopScore = topScore

    if (currentScore > newTopScore) {
      newTopScore = currentScore
    }

    this.setState({topScore: newTopScore, isGameInProgress: false})
  }

  clickEmoji = id => {
    const {emojisList} = this.props
    const {clickedEmojisList} = this.state
    const isEmojiClicked = clickedEmojisList.includes(id)
    const clickedEmojisLength = clickedEmojisList.length

    if (isEmojiClicked) {
      this.finishGameAndSetTopScore(clickedEmojisLength)
    } else {
      if (clickedEmojisLength === emojisList.length - 1) {
        this.finishGameAndSetTopScore(emojisList.length)
      }

      this.setState(prevState => ({
        clickedEmojisList: [...prevState.clickedEmojisList, id],
      }))
    }
  }

  getShuffledEmojisList = () => {
    const {emojisList} = this.props

    return emojisList.sort(() => Math.random() - 0.5)
  }

  renderEmojisList = () => {
    const shuffledEmojisList = this.getShuffledEmojisList()

    return (
      <ul className="emojis-list-container">
        {shuffledEmojisList.map(eachEmoji => (
          <EmojiCard
            key={eachEmoji.id}
            emojiDetails={eachEmoji}
            clickEmoji={this.clickEmoji}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {clickedEmojisList, topScore, isGameInProgress} = this.state

    return (
      <div className="main-container">
        <NavBar
          topScore={topScore}
          isGameInProgress={isGameInProgress}
          currentScore={clickedEmojisList.length}
        />
        <div className="emoji-body-container">
          {isGameInProgress ? this.renderEmojisList() : this.renderScoreCard()}
        </div>
      </div>
    )
  }
}

export default EmojiGame

// import {Component} from 'react'
// import {v4 as uuidv4} from 'uuid'
// import NavBar from '../NavBar'
// import EmojiCard from '../EmojiCard'
// import WinOrLoseCard from '../WinOrLoseCard'
// import './index.css'

// class EmojiGame extends Component {
//   state = {
//     gameList: [{id: uuidv4(), emojiName: '', emojiUrl: ''}],
//     gameScore: 0,
//     topScore: 0,
//     top: 0,
//     WinOrLose: false,
//   }

//   emoji = id => {
//     const {emojisList} = this.props
//     const {gameList} = this.state
//     const gameEmoji = emojisList.filter(eachEmoji => eachEmoji.id === id)
//     const sameEmoji = gameEmoji.filter(eachEmoji => eachEmoji.id === id)

//     if (sameEmoji.length === 0) {
//       this.setState(prevState => ({
//         gameList: [...prevState.gameList, ...gameEmoji],
//         gameScore: prevState.gameScore + 1,
//         topScore: prevState.topScore,
//         top: prevState.top + 1,
//       }))
//     } else {
//       this.setState({WinOrLose: true})
//     }
//   }

//   playMode = () => {
//     this.setState(prevState =>
//       prevState.top > prevState.topScore
//         ? {
//             gameList: [{id: uuidv4(), emojiName: '', emojiUrl: ''}],
//             WinOrLose: false,
//             gameScore: 0,
//             top: 0,
//             topScore: prevState.top,
//           }
//         : {
//             gameList: [{id: uuidv4(), emojiName: '', emojiUrl: ''}],
//             WinOrLose: false,
//             gameScore: 0,
//             top: 0,
//             topScore: prevState.topScore,
//           },
//     )
//   }

//   render() {
//     const {emojisList} = this.props
//     const {gameScore, topScore, WinOrLose} = this.state
//     let shuffledList = emojisList
//     if (WinOrLose === false) {
//       shuffledList = emojisList.sort(() => Math.random() - 0.5)
//     }

//     return (
//       <>
//         <NavBar score={gameScore} top={topScore} />
//         <div className="bg-container">
//           {WinOrLose === false && gameScore < 12 ? (
//             <ul className="card-container">
//               {shuffledList.map(each => (
//                 <EmojiCard item={each} key={each.id} clickEmoji={this.emoji} />
//               ))}
//             </ul>
//           ) : (
//             <WinOrLoseCard
//               playOneMore={this.playMode}
//               score={gameScore}
//               top={topScore}
//             />
//           )}
//         </div>
//       </>
//     )
//   }
// }

// export default EmojiGame
