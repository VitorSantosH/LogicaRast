import React from "react";
import { useState, useEffect } from "react";
import connect from "../../../../../connect";

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
            NewUsers.push(ret)



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

    return (
        <div className="Home"
            onClick={e => {
                console.log(state)
            }}>
            Home
        </div>
    )
}



export default Home;