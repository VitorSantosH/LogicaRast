import React from "react";
import { useState, useEffect } from "react";
import connect from "../../../../../connect";
import "./Home.css";

const Home = (props) => {

    const [state, setState] = useState({
        loaded: false,
        users: []
    })
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (!state.loaded && !loading) {
            getUsers();
        }

    }, [state.loaded])

    const getUsers = async (props) => {

        if (state.loaded) return;

        try {
            let ret = await connect.getUsers(state)
            console.log(ret)

            let NewUsers = state.users
            NewUsers.push(...ret)

            return setState(prevState => ({
                ...prevState,
                loaded: true,
                users: NewUsers
            }))

        } catch (error) {

            return setState(prevState => ({
                ...prevState,
                loaded: true,
            }))

        } finally {
            setLoading(true)
        }


    }

    const CreatUsersCards = () => {
        let container = [];

        for (let index = 0; index < state.users.length; index++) {

            let user = state.users[index];

            let card = (
                <div className="card" key={user.id + "" + index}>
                    <h3>{user.first_name}</h3>
                    <p>{user.id}</p>
                    <img src={user.avatar} alt="" />
                </div>
            )

            container.push(card)

        }

        return container;

    }

    return (
        <div className="Home"
            onClick={e => {
                console.log(state)
            }}>
            <h1>
                Home
            </h1>

            <div className="listUsers">
                {state.users.length > 0 && (
                    CreatUsersCards()
                )}
            </div>
        </div>
    )
}



export default Home;