import './styles.scss'

const LeaderBoard = ({ data, userMap }) => {
    const players = Object.keys(data)
    return (
            <div class="container">
                <div class="leaderboard">
                    <div class="body">
                        <ol>
                            {
                                players.map((player) => (
                                    <li>
                                        <mark>{userMap[player] || player}</mark>
                                        <small>{data[player]}</small>
                                    </li>
                                ))
                            }
                        </ol>
                    </div>
                </div>
            </div>
    )
}

export default LeaderBoard