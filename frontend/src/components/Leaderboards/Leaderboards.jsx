import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../store/user';
import { fetchCompletedBounties } from '../../store/completedBounty';
import './Leaderboards.css'

export default function Leaderboards() {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const completedBounties = useSelector(state => state.completedBounty);
    const [leaderboard, setLeaderboard] = useState([]);
    console.log("COMPLETEDBOUNTIES FIRST", completedBounties)

    useEffect(() => {
        const getData = async () => {
            await dispatch(fetchUsers());
            await dispatch(fetchCompletedBounties());
        };
        getData();
    }, [dispatch]);

    useEffect(() => {
        console.log("COMPLETEDBOUNTIES IN USEEFFECT", completedBounties)
        const tallyBounties = () => {
            const counts = {};

            Object.values(completedBounties).forEach(bounty => {
                counts[bounty.userId] = (counts[bounty.userId] || 0) + 1;
            });

            const leaderboardData = Object.keys(counts).map(userId => ({
                userId,
                count: counts[userId],
                username: users[userId]?.username // Fetching username from users
            })).sort((a, b) => b.count - a.count);

            setLeaderboard(leaderboardData);
        };

        tallyBounties();
        console.log("LEADERBOARD IN USEEFFECT", leaderboard)
    }, [completedBounties, users, leaderboard]);

    return (
        <>
            <div className='leaderboards-container'>
                <h1>Leaderboards</h1>
                <div className='leaderboards-greater-container'>
                    {/* <div className='leaderboards-text'>
                        <div>Challengers</div>
                        <div>Completions</div>
                    </div> */}
                    
                    <div className='leaderboards-users-container'>
                        {leaderboard.map(({ userId, count, username }) => (
                            <div className='leaderboards-individual' key={userId}>
                                <div className='leaderbaords-username'>{username}</div>
                                <div className='leaderboards-count'>{count}</div>
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>
        </>
    )
}